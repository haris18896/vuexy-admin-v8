/* eslint-disable */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { handleAddSSHKey } from '../../../redux/actions/key/add'
import { RESET_SSH_KEY_STATE } from '../../../redux/actions/actionType/key/add'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import "@styles/base/pages/page-auth.scss"

const AddSSHKeys = () => {

  const schema = yup.object().shape({
    keyId: yup.string().oneOf(['controller', 'ca-server', 'vpn-server']).required(),
    type: yup.string().oneOf(['ed25519']).required(),
    privateKey: yup.string().required(),
    publicKey: yup.string().optional(),
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { inProcess, success, error } = useSelector(state => state.key)

  const dispatch = useDispatch()

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      dispatch(handleAddSSHKey(formData))
      reset(formData)
    }
  }

  useEffect(() => {
    if (success) reset({})
  }, [success])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_SSH_KEY_STATE })
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add SSH Keys</CardTitle>
      </CardHeader>

      {inProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='keyId'>
                    Key ID
                  </Label>

                  <Input
                    type='select'
                    id='keyId'
                    name='keyId'
                    className={classnames({ 'is-invalid': errors['keyId'] })}
                    innerRef={register({ required: true })}
                  >
                    <option value=''>Choose...</option>
                    <option value='controller'>Controller</option>
                    <option value='ca-server'>Certificate Authority</option>
                    <option value='vpn-server'>VPN Server</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='type'>
                    Type
                  </Label>
                  <Input
                    readOnly 
                    type='text' 
                    id='type' 
                    name='type' 
                    value="ed25519"
                    innerRef={register({ required: true })} 
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='privateKey'>
                    Private Key
                  </Label>
                  <Input
                    type='textarea'
                    id='privateKey'
                    name='privateKey'
                    className={classnames({ 'is-invalid': errors['privateKey'] })}
                    innerRef={register({ required: true })}
                    rows={10}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='publicKey'>
                    Public Key <span className='text-primary'>(optional)</span>
                  </Label>
                  <Input
                    type='textarea'
                    id='publicKey'
                    name='publicKey'
                    innerRef={register()}
                    rows={10}
                  />
                </FormGroup>

                {success && (
                  <p className="text-success">
                    SSH key has been added successfully!
                  </p>
                )}

                {error && (
                  <p className="text-danger">
                    {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : error.msg}
                  </p>
                )}
                
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Add
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default AddSSHKeys
