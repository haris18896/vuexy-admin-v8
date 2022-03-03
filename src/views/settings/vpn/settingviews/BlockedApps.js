/* eslint-disable */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { Card, CardBody, Form, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'
import { handleFetchBlockedAppsSettings } from '../../../../redux/actions/settings/vpn/fetch/blockedapps'
import { handleUpdateBlockedAppsSettings } from '../../../../redux/actions/settings/vpn/update/blockedapps'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"

const BlockedApps = () => {

  const schema = yup.object().shape({
    blockedApps: yup.string()
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { inProcess, blockedApps, success } = useSelector(state => state.setting)

  const dispatch = useDispatch()

  // EXTRACTING STUFF FROM REDUX

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      let blockedAppsList = formData.blockedApps.split('\n')
      dispatch(handleUpdateBlockedAppsSettings({ 
        blockedApps: blockedAppsList
      }))
    } 
  }

  useEffect(() => {
    if (blockedApps) {
      reset({ 
        blockedApps: Array.isArray(blockedApps) ? blockedApps.join('\n') : '' 
      })
    }
  }, [blockedApps])

  useEffect(() => {
    dispatch(handleFetchBlockedAppsSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <CardBody>
        <Menu currentActive='blockedApps' />

      {inProcess ? (
        <Spinner />
      ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md='6' sm='12' className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' for='blockedApps'>
                    Blocked Apps List
                  </Label>

                  <Input
                    autoFocus
                    type='textarea'
                    id='blockedApps'
                    name='blockedApps'
                    className={classnames({ 'is-invalid': errors['blockedApps'] })}
                    innerRef={register()}
                    rows={(blockedApps && blockedApps.length) || 10}
                  />
                </FormGroup>
              </Col>

              <Col sm='12'>
                {success && (<p className='text-success'>Blocked App setting has been updated successfully!</p>)}

                <FormGroup className='d-flex mt-1'>
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

export default BlockedApps
