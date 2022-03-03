/* eslint-disable */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import { Card, CardBody, Form, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'
import { handleFetchPaymentSettings } from '../../../../redux/actions/settings/app/fetch/payment'
import { handlePaymentUpdate } from '../../../../redux/actions/settings/app/update/payment'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"

const Payment = () => {
  const schema = yup.object().shape({
    stripePublishableKey: yup.string().required()
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const { inProcess, payment, success } = useSelector(state => state.setting)

  const dispatch = useDispatch()

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      dispatch(handlePaymentUpdate(formData))
    }
  }

  useEffect(() => {
    if (payment) {
      reset({
        stripePublishableKey: payment.stripePublishableKey
      })
    }
  }, [payment])

  useEffect(() => {
    dispatch(handleFetchPaymentSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <CardBody>
        <Menu currentActive='payment' />

        {inProcess ? (
          <Spinner />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <Row>
              <Col md='6' sm='12' className='mb-3 mb-md-0'>
                <FormGroup className='mb-2'>
                  <Label className='form-label' for='stripePublishableKey'>
                    Stripe Publishable Key
                  </Label>
                  <Input
                    type='text'
                    id='stripePublishableKey'
                    name='stripePublishableKey'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['stripePublishableKey'] })}
                    innerRef={register({ required: true })}
                  />
                </FormGroup>
                {success && (<p className='text-success'>Payment setting has been updated successfully!</p>)}
                
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Update
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
          // </CardBody>
        )}
      </CardBody>
    </Card>
  )
}

export default Payment
