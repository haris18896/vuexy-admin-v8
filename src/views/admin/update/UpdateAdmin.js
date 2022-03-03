import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
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
import { isObjEmpty } from "@utils"
import { handleFetchAdmin } from "../../../redux/actions/admin/fetch.admin/fetchAdminActions"
import { handleUpdateAdmin, resetState } from "../../../redux/actions/admin/update.admin/updateAdminActions"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import "@styles/base/pages/page-auth.scss"

const UpdateAdmin = () => {

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const { inProcess, profile, profileUpdationInProcess, success, error } = useSelector((state) => state.adminUpdate)

  const dispatch = useDispatch()

  const { id } = useParams()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleUpdateAdmin(id, formData))
      reset(formData)
    }
  }

 useEffect(() => {
    dispatch(handleFetchAdmin(id))
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      const { name, email } = profile
      reset({ name, email })
    }
  }, [profile])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Admin</CardTitle>
      </CardHeader>

      {inProcess || profileUpdationInProcess ? (
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

                {success && (
                  <p className="text-success">
                    Admin has been successfully updated!
                  </p>
                )}

                {error && (
                  <p className="text-danger">
                    {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : error.msg}
                  </p>
                )}
                
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Update
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default UpdateAdmin
