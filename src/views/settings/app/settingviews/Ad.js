/* eslint-disable */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from "@utils"
import { Card, CardBody, CardTitle, Form, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap'
import { handleAdUpdate } from '../../../../redux/actions/settings/app/update/ad'
import { handleFetchAdSettings } from '../../../../redux/actions/settings/app/fetch/ad'
import { CLEAR_APP_SETTING_STATE } from '../../../../redux/actions/actionType/settings/clear'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"

const Ad = () => {

  const schema = yup.object().shape({
    android: yup.object().shape({
      adMob: yup.object().shape({
        isActive: yup.boolean().required(),
        appId: yup.string(),
        appOpenId: yup.string(),
        bannerId: yup.string(),
        interstitialId: yup.string(),
        rewardedId: yup.string(),
        rewardedInterstitialId: yup.string(),
        nativeId: yup.string()
      })
    }),
    ios: yup.object().shape({
      adMob: yup.object().shape({
        isActive: yup.boolean().required(),
        appId: yup.string(),
        appOpenId: yup.string(),
        bannerId: yup.string(),
        interstitialId: yup.string(),
        rewardedId: yup.string(),
        rewardedInterstitialId: yup.string(),
        nativeId: yup.string()
      })
    })
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { inProcess, ad, success } = useSelector(state => state.setting)

  const dispatch = useDispatch()

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      dispatch(handleAdUpdate(formData))
    } 
  }

  useEffect(() => {
    if (ad) {
      reset({ 
        android: ad.android,
        ios: ad.ios
      })
    }
  }, [ad])

  useEffect(() => {
    dispatch(handleFetchAdSettings())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_APP_SETTING_STATE })
    }
  }, [])
  return (
    <Card>
      <CardBody>
        <Menu currentActive='ad' />

        {inProcess ? (
          <Spinner />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <Row>

              <Col md='6' sm='12'>
                <FormGroup>
                  <CardTitle className='text-primary'>AdMob (Android)</CardTitle>
                  <Label className='form-label' for='android.adMob.isActive'>
                    Active
                  </Label>
                  <Input
                    type='select'
                    id='android.adMob.isActive'
                    name='android.adMob.isActive'
                    className={classnames({ 'is-invalid': errors['android.adMob.isActive'] })}
                    innerRef={register()}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.appId'>
                    App ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.appId'
                    name='android.adMob.appId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.appId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.appOpenId'>
                    Banner ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.appOpenId'
                    name='android.adMob.appOpenId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.appOpenId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.bannerId'>
                    Banner ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.bannerId'
                    name='android.adMob.bannerId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.bannerId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.interstitialId'>
                    Interstitial ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.interstitialId'
                    name='android.adMob.interstitialId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.interstitialId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.rewardedId'>
                    Rewarded ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.rewardedId'
                    name='android.adMob.rewardedId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.rewardedId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.rewardedInterstitialId'>
                    Rewarded Interstitial ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.rewardedInterstitialId'
                    name='android.adMob.rewardedInterstitialId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.rewardedInterstitialId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='android.adMob.nativeId'>
                    Native ID
                  </Label>
                  <Input
                    type='text'
                    id='android.adMob.nativeId'
                    name='android.adMob.nativeId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['android.adMob.nativeId'] })}
                    innerRef={register()}
                  />
                </FormGroup>
              </Col>

              <Col md='6' sm='12'>
                <FormGroup>
                  <CardTitle className='text-primary'>AdMob (iOS)</CardTitle>
                  <Label className='form-label' for='ios.adMob.isActive'>
                    Active
                  </Label>
                  <Input
                    type='select'
                    id='ios.adMob.isActive'
                    name='ios.adMob.isActive'
                    className={classnames({ 'is-invalid': errors['ios.adMob.isActive'] })}
                    innerRef={register()}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.appId'>
                    App ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.appId'
                    name='ios.adMob.appId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.appId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.appOpenId'>
                    Banner ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.appOpenId'
                    name='ios.adMob.appOpenId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.appOpenId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.bannerId'>
                    Banner ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.bannerId'
                    name='ios.adMob.bannerId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.bannerId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.interstitialId'>
                    Interstitial ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.interstitialId'
                    name='ios.adMob.interstitialId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.interstitialId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.rewardedId'>
                    Rewarded ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.rewardedId'
                    name='ios.adMob.rewardedId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.rewardedId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.rewardedInterstitialId'>
                    Rewarded Interstitial ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.rewardedInterstitialId'
                    name='ios.adMob.rewardedInterstitialId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.rewardedInterstitialId'] })}
                    innerRef={register()}
                  />
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' for='ios.adMob.nativeId'>
                    Native ID
                  </Label>
                  <Input
                    type='text'
                    id='ios.adMob.nativeId'
                    name='ios.adMob.nativeId'
                    placeholder='123'
                    className={classnames({ 'is-invalid': errors['ios.adMob.nativeId'] })}
                    innerRef={register()}
                  />
                </FormGroup>
              </Col>

              <Col sm='12'>
                {success && (<p className='text-success'>Ad setting has been updated successfully!</p>)}
                
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

export default Ad
