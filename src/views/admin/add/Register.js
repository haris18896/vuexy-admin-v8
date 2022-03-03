import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { isObjEmpty } from "@utils"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from "reactstrap"
import { handleRegisterAdmin } from "../../../redux/actions/admin/register/registerAdminActions"
import { RESET_REGISTER_STATE } from "../../../redux/actions/actionType/admin/register"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import InputPasswordToggle from "@components/input-password-toggle"
import "@styles/base/pages/page-auth.scss"

const Register = () => {
  
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().min(8).required()
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { inProcess, success, error } = useSelector((state) => state.register)

  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleRegisterAdmin(formData))
      reset(formData)
    }
  }

  useEffect(() => {
    if (success) reset({})
  }, [success])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_REGISTER_STATE })
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Admin</CardTitle>
      </CardHeader>

      {inProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                
              <FormGroup>
                <Label className="form-label" for="name">
                  Name
                </Label>
                <Input
                  autoFocus
                  type="text"
                  name="name"
                  id="name"
                  className={classnames({ "is-invalid": errors["name"] })}
                  innerRef={register({ required: true })}
                  placeholder="Abdullah"
                />
              </FormGroup>

              <FormGroup>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className={classnames({ "is-invalid": errors["email"] })}
                  innerRef={register({ required: true })}
                  placeholder="abdullah@example.com"
                />
              </FormGroup>

              <FormGroup>
                <Label className="form-label" for="password">
                  Password
                </Label>
                <InputPasswordToggle
                  name="password"
                  id="password"
                  className="input-group-merge"
                  className={classnames({ "is-invalid": errors["password"] })}
                  innerRef={register({ required: true, minLength: 8 })}
                />
              </FormGroup>

              <FormGroup>
                <Label className="form-label" for="confirmPassword">
                  Confirm Password
                </Label>
                <InputPasswordToggle
                  name="confirmPassword"
                  className="input-group-merge"
                  id="confirmPassword"
                  className={classnames({ "is-invalid": errors["confirmPassword"] })}
                  innerRef={register({ required: true, minLength: 8 })}
                />
              </FormGroup>

                {success && (
                  <p className="text-success">
                    Admin added successfully!
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

export default Register
