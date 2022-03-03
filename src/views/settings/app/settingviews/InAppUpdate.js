/* eslint-disable */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { Card, CardTitle, CardBody, Form, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'
import { handleFetchInAppUpdateSettings } from '../../../../redux/actions/settings/app/fetch/inappupdate'
import { handleInAppUpdate } from '../../../../redux/actions/settings/app/update/inappupdate'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"

const InAppUpdate = () => {

  const schema = yup.object().shape({
    android: yup.object().shape({
      minVersion: yup.string().required(),
      showUpdate: yup.boolean().required(),
      forceUpdate: yup.boolean().required()
    }),
    ios: yup.object().shape({
      minVersion: yup.string().required(),
      showUpdate: yup.boolean().required(),
      forceUpdate: yup.boolean().required()
    })
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { inProcess, inAppUpdate, success } = useSelector(state => state.setting)

  const dispatch = useDispatch()

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      dispatch(handleInAppUpdate(formData))
    } 
  }

  useEffect(() => {
    if (inAppUpdate) {
      reset({ 
        android: inAppUpdate.android,
        ios: inAppUpdate.ios
      })
    }
  }, [inAppUpdate])

  useEffect(() => {
    dispatch(handleFetchInAppUpdateSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <CardBody>
        <Menu currentActive='inappupdate' />

        {inProcess ? (
          <Spinner />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <Row>

              <Col md='6' sm='12'>

              <FormGroup>
                <CardTitle className='text-primary'>Android</CardTitle>
                  <Label className='form-label' for='android.minVersion'>
                    Minimum Version
                  </Label>
                  <Input
                    type='text'
                    id='android.minVersion'
                    name='android.minVersion'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.minVersion'] })}
                    innerRef={register({ required: true })}
                  />
              </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.showUpdate'>
                    Show Update
                  </Label>
                  <Input
                    type='select'
                    id='android.showUpdate'
                    name='android.showUpdate'
                    className={classnames({ 'is-invalid': errors['android.showUpdate'] })}
                    innerRef={register({ required: true })}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.forceUpdate'>
                    Force Update
                  </Label>
                  <Input
                    type='select'
                    id='android.forceUpdate'
                    name='android.forceUpdate'
                    className={classnames({ 'is-invalid': errors['android.forceUpdate'] })}
                    innerRef={register({ required: true })}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

              </Col>

              <Col md='6' sm='12'>

              <FormGroup>
                <CardTitle className='text-primary'>iOS</CardTitle>
                  <Label className='form-label' for='ios.minVersion'>
                    Minimum Version
                  </Label>
                  <Input
                    type='text'
                    id='ios.minVersion'
                    name='ios.minVersion'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.minVersion'] })}
                    innerRef={register({ required: true })}
                  />
              </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.showUpdate'>
                    Show Update
                  </Label>
                  <Input
                    type='select'
                    id='ios.showUpdate'
                    name='ios.showUpdate'
                    className={classnames({ 'is-invalid': errors['ios.showUpdate'] })}
                    innerRef={register({ required: true })}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.forceUpdate'>
                    Force Update
                  </Label>
                  <Input
                    type='select'
                    id='ios.forceUpdate'
                    name='ios.forceUpdate'
                    className={classnames({ 'is-invalid': errors['ios.forceUpdate'] })}
                    innerRef={register({ required: true })}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

              </Col>

              <Col sm='12'>
                {success && (<p className='text-success'>InAppUpdate setting has been updated successfully!</p>)}
                
                <FormGroup className='d-flex mb-0'>
                  <Button.Ripple className='mr-1' color='primary' type='submit'>
                    Update
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}

export default InAppUpdate
