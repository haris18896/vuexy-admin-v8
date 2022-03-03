import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap"
import { isObjEmpty } from "@utils"
import { handleFetchPlan } from "../../../redux/actions/plan/fetch"
import { handleUpdatePlan } from "../../../redux/actions/plan/update"
import { RESET_PLAN_STATE } from "../../../redux/actions/actionType/plan/reset"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import Menu from "../menu/Menu"
import "@styles/base/pages/page-auth.scss"

const UpdatePlan = () => {
  const schema = yup.object().shape({
    priceType: yup
      .string()
      .oneOf(["monthlyFee", "totalFee", "discount"])
      .required(),
    monthlyFee: yup.number().when("priceType", {
      is: "monthlyFee",
      then: yup.number().positive().required(),
    }),
    totalFee: yup.number().when("priceType", {
      is: "totalFee",
      then: yup.number().positive().required(),
    }),
    discount: yup.number().when("priceType", {
      is: "discount",
      then: yup.number().min(1).max(100).required(),
    }),
    trialAllowed: yup.boolean().required(),
    trialPeriodInDays: yup.number().when("trialAllowed", {
      is: true,
      then: yup.number().min(1).max(30).required(),
    }),
  })

  const { register, watch, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const priceType = watch("priceType")
  const trialAllowed = watch("trialAllowed")

  const { fetchPlanInProcess, updatePlanInProcess, success, error, plan } =
    useSelector((state) => state.plan)

  const dispatch = useDispatch()

  const { id } = useParams()

  const onSubmit = (formData) => {
    if (isObjEmpty(errors)) {
      dispatch(handleUpdatePlan(formData, id))
      reset(formData)
    }
  }

  // FETCH PLAN WITH ID COMMING FROM THE PARAMS
  useEffect(() => {
    if (id) {
      dispatch(handleFetchPlan(id))
    }
  }, [id])

  // IF PLAN THEN UPDATE LOCAL STATE
  useEffect(() => {
    if (plan) {
      const { interval, intervalCount, trialAllowed, trialPeriodInDays } = plan
      reset({ interval, intervalCount, trialAllowed, trialPeriodInDays })
    }
  }, [plan])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_PLAN_STATE })
    }
  }, [])

  return (
    <Card>
      <CardBody>
        <Menu currentActive="updatePlan" />
        {fetchPlanInProcess || updatePlanInProcess ? (
          <Spinner />
        ) : (
          <Form
            className="auth-register-form mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col xs={12} md={10} lg={7} xl={5}>
                <FormGroup>
                  <Label className="form-label" for="interval">
                    Interval
                  </Label>

                  <Input
                    name="interval"
                    type="text"
                    id="interval"
                    className={classnames({ "is-invalid": errors["interval"] })}
                    innerRef={register({ required: true })}
                    placeholder="year"
                    readOnly
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-label" for="intervalCount">
                    Interval Count
                  </Label>

                  <Input
                    name="intervalCount"
                    type="number"
                    id="intervalCount"
                    className={classnames({
                      "is-invalid": errors["intervalCount"],
                    })}
                    innerRef={register({ required: true })}
                    placeholder="1"
                    min={1}
                    readOnly
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-label" for="priceType">
                    Price Type
                  </Label>

                  <Input
                    name="priceType"
                    type="select"
                    id="priceType"
                    className={classnames({
                      "is-invalid": errors["priceType"],
                    })}
                    innerRef={register({ required: true })}
                    autoFocus
                  >
                    <option value="">Select Price Type</option>
                    <option value="monthlyFee">Monthly Fee</option>
                    <option value="totalFee">Total Fee</option>
                    <option value="discount">Discount</option>
                  </Input>
                </FormGroup>

                {priceType === "monthlyFee" && (
                  <FormGroup>
                    <Label className="form-label" for="monthlyFee">
                      Monthly Fee
                    </Label>

                    <Input
                      name="monthlyFee"
                      type="text"
                      id="monthlyFee"
                      className={classnames({
                        "is-invalid": errors["monthlyFee"],
                      })}
                      innerRef={register({ required: true })}
                      placeholder="3"
                    />
                  </FormGroup>
                )}

                {priceType === "totalFee" && (
                  <FormGroup>
                    <Label className="form-label" for="totalFee">
                      Total Fee
                    </Label>

                    <Input
                      name="totalFee"
                      type="text"
                      id="totalFee"
                      className={classnames({
                        "is-invalid": errors["totalFee"],
                      })}
                      innerRef={register({ required: true })}
                      placeholder="10"
                    />
                  </FormGroup>
                )}

                {priceType === "discount" && (
                  <FormGroup>
                    <Label className="form-label" for="discount">
                      Discount (%)
                    </Label>

                    <Input
                      name="discount"
                      type="text"
                      id="discount"
                      className={classnames({
                        "is-invalid": errors["discount"],
                      })}
                      innerRef={register({ required: true, min: 0, max: 100 })}
                      placeholder="50"
                    />
                  </FormGroup>
                )}

                <FormGroup>
                  <Label className="form-label" for="trialAllowed">
                    Trial Allowed
                  </Label>

                  <Input
                    name="trialAllowed"
                    type="select"
                    id="trialAllowed"
                    className={classnames({
                      "is-invalid": errors["trialAllowed"],
                    })}
                    innerRef={register({
                      required: true,
                      setValueAs: (value) => value === "true",
                    })}
                    defaultValue={false}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Input>
                </FormGroup>

                {trialAllowed && (
                  <FormGroup className="mb-2">
                    <Label className="form-label" for="trialPeriodInDays">
                      Trial Period (Days)
                    </Label>

                    <Input
                      name="trialPeriodInDays"
                      type="number"
                      id="trialPeriodInDays"
                      className={classnames({
                        "is-invalid": errors["trialPeriodInDays"],
                      })}
                      innerRef={register({ required: true })}
                      placeholder="3"
                      min={1}
                      max={30}
                    />
                  </FormGroup>
                )}
                {success && (
                  <p className="text-success">
                    Plan has been successfully updated!
                  </p>
                )}
                {error && (
                  <p className="text-danger">
                    {error.errors && error.errors.length ? `${error.errors[0].param}: ${error.errors[0].msg}` : error.msg}
                  </p>
                )}

                <Button.Ripple className="mt-2" type="submit" color="primary">
                  Update Plan
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        )}
      </CardBody>
    </Card>
  )
}

export default UpdatePlan
