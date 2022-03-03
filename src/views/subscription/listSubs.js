/* eslint-disable */
import React, { useState, useEffect, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import { handleFetchPlans } from "../../redux/actions/plans/fetch";
import { handleSubscriptionsFetch, handleSubscriptionsFetchNoUpdatesVersion } from "../../redux/actions/subscription/fetch";
import { handleSelectChangeListSubsciptions } from "../../redux/actions/subscription/select/limitChange";
import { handlePageChangeListSubscriptions } from "../../redux/actions/subscription/select/pageChange";
import { handleDisableSubscription } from "../../redux/actions/subscription/disable";
import { handleEnableSubscription } from "../../redux/actions/subscription/enable";
import { RESET_SUBSCRIPTIONS_LIST_STATE } from "../../redux/actions/actionType/subscription/fetch";
import { formatDate } from "../../utility/Utils";
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner"
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ListSubscriptions = () => {

  const [searchKeyword, setSearchKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [autoRenewalFilter, setAutoRenewalFilter] = useState("")
  const [onTrialFilter, setOnTrialFilter] = useState("")
  const [planIdFilter, setPlanIdFilter] = useState("")
  const [startTimeFilter, setStartTimeFilter] = useState("")
  const [startTimeFromFilter, setStartTimeFromFilter] = useState("")
  const [startTimeToFilter, setStartTimeToFilter] = useState("")
  const [expiryTimeFilter, setExpiryTimeFilter] = useState("")
  const [expiryTimeFromFilter, setExpiryTimeFromFilter] = useState("")
  const [expiryTimeToFilter, setExpiryTimeToFilter] = useState("")

  const dispatch = useDispatch();

  const { plans } = useSelector((state) => state.plan);

  const {
    page,
    limit,
    inProcess,
    subscriptionsListData,
    totalPages,
    totalRecords,
    disableSubInProcess,
    enableSubInProcess,
  } = useSelector((state) => state.subscription);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'statusFilter') setStatusFilter(value)
    else if (name === 'autoRenewalFilter') setAutoRenewalFilter(value)
    else if (name === 'onTrialFilter') setOnTrialFilter(value)
    else if (name === 'planIdFilter') setPlanIdFilter(value)
  }

  const handleLimitChange = (e) => {
    dispatch(
      handleSelectChangeListSubsciptions(
        e.target.value,
        limit,
        statusFilter,
        autoRenewalFilter,
        onTrialFilter,
        planIdFilter,
        startTimeFromFilter,
        startTimeToFilter,
        expiryTimeFromFilter,
        expiryTimeToFilter,
        searchKeyword
      )
    );
  };

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListSubscriptions(
        page,
        limit,
        statusFilter,
        autoRenewalFilter,
        onTrialFilter,
        planIdFilter,
        startTimeFromFilter,
        startTimeToFilter,
        expiryTimeFromFilter,
        expiryTimeToFilter,
        searchKeyword
      )
    );
  };

  const onStartTimeChangeHandler = (dates) => {
    if (dates.length === 1) {
      setStartTimeFromFilter(dates[0].toISOString())
      setStartTimeToFilter("")
    }
    if (dates.length === 2) {
      setStartTimeFromFilter(dates[0].toISOString())
      setStartTimeToFilter(dates[1].toISOString())
    }
  }

  const onExpiryTimeChangeHandler = (dates) => {
    if (dates.length === 1) {
      setExpiryTimeFromFilter(dates[0].toISOString())
      setExpiryTimeToFilter("")
    }
    if (dates.length === 2) {
      setExpiryTimeFromFilter(dates[0].toISOString())
      setExpiryTimeToFilter(dates[1].toISOString())
    }
  }

  const resetFilters = () => {
    setStatusFilter("")
    setAutoRenewalFilter("")
    setOnTrialFilter("")
    setPlanIdFilter("")
    setStartTimeFromFilter("")
    setStartTimeToFilter("")
    setStartTimeFilter([])
    setExpiryTimeFromFilter("")
    setExpiryTimeToFilter("")
    setExpiryTimeFilter([])
  };

  useEffect(() => {
    dispatch(
      handleSubscriptionsFetchNoUpdatesVersion(
        page,
        limit,
        statusFilter,
        autoRenewalFilter,
        onTrialFilter,
        planIdFilter,
        startTimeFromFilter,
        startTimeToFilter,
        expiryTimeFromFilter,
        expiryTimeToFilter,
        searchKeyword
      )
    );
  }, [
    statusFilter,
    autoRenewalFilter,
    onTrialFilter,
    planIdFilter,
    startTimeFromFilter,
    startTimeToFilter,
    expiryTimeFromFilter,
    expiryTimeToFilter,
    searchKeyword
  ]);

  useEffect(() => {
    dispatch(
      handleSubscriptionsFetch(
        page,
        limit,
        statusFilter,
        autoRenewalFilter,
        onTrialFilter,
        planIdFilter,
        startTimeFromFilter,
        startTimeToFilter,
        expiryTimeFromFilter,
        expiryTimeToFilter,
        searchKeyword
      )
    );
    dispatch(handleFetchPlans());
  }, []);

  const enableSubscriptionHandler = (customerId) => {
    if (
      confirm(
        "Are you sure you want to enable subscription for customer having ID: " +
        customerId
      )
    ) {
      dispatch(
        handleEnableSubscription(
          customerId,
          page,
          limit,
          statusFilter,
          autoRenewalFilter,
          onTrialFilter,
          planIdFilter,
          startTimeFromFilter,
          startTimeToFilter,
          expiryTimeFromFilter,
          expiryTimeToFilter,
          searchKeyword
        )
      );
    }
  };

  const disableSubscriptionHandler = (customerId) => {
    if (
      confirm(
        "Are you sure you want to disable subscription for customer having ID: " +
        customerId
      )
    ) {
      dispatch(
        handleDisableSubscription(
          customerId,
          page,
          limit,
          statusFilter,
          autoRenewalFilter,
          onTrialFilter,
          planIdFilter,
          startTimeFromFilter,
          startTimeToFilter,
          expiryTimeFromFilter,
          expiryTimeToFilter,
          searchKeyword
        )
      );
    }
  };

  useEffect(() => {
    return () => dispatch({ type: RESET_SUBSCRIPTIONS_LIST_STATE });
  }, []);

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Subscriptions</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1">
          <Col sm={12} md={6} lg={3}>
            <div className="d-flex align-items-center">
              <Label className="mr-1" for="limit">
                Show
              </Label>
              <Input
                style={{ width: "70px" }}
                className="dataTable-select mr-1"
                type="select"
                id="limit"
                name="limit"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
            </div>
          </Col>
        </Row>

        <Row className="mx-0 mt-1 mb-75">
          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="statusFilter" className="mr-1">
                Status
              </Label>
              <Input
                type="select"
                id="statusFilter"
                name="statusFilter"
                value={statusFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
                <option value="expired">Expired</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="autoRenewalFilter" className="mr-1">
                Auto Renewal
              </Label>
              <Input
                type="select"
                id="autoRenewalFilter"
                name="autoRenewalFilter"
                value={autoRenewalFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Input>
            </div>
          </Col>
          
          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="onTrialFilter" className="mr-1">
                On Trial
              </Label>
              <Input
                type="select"
                id="onTrialFilter"
                name="onTrialFilter"
                value={onTrialFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="planIdFilter" className="mr-1">
                Plan
              </Label>
              <Input
                type="select"
                id="planIdFilter"
                name="planIdFilter"
                value={planIdFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>
                {plans && plans.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name}
                    </option>
                  ))}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="startTime" className="mr-1">
                Start Time
              </Label>
              <Flatpickr
                id="startTime"
                name="startTime"
                value={startTimeFilter}
                className="form-control"
                onChange={onStartTimeChangeHandler}
                options={{
                  mode: "range",
                  enableTime: true
                }}
              />
            </div>
          </Col>


          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="startTime" className="mr-1">
                Expiry Time
              </Label>
              <Flatpickr
                id="expiryTime"
                name="expiryTime"
                value={expiryTimeFilter}
                className="form-control"
                onChange={onExpiryTimeChangeHandler}
                options={{
                  mode: "range",
                  enableTime: true
                }}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} style={{ marginTop: 7 }}>
            <Label for="Reset Filters" className="mr-1">
              Reset Filters
            </Label>
            <RefreshCw
              style={{ cursor: "pointer" }}
              onClick={resetFilters}
              size={20}
            />
          </Col>
        </Row>

        <Row className="mx-0 mb-75">
          <Col sm={12} md={6} lg={4} className="d-flex align-items-center mt-sm-0">
            <Label className="mr-1" for="searchKeyword">
              Search
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="searchKeyword"
              name="searchKeyword"
              onChange={onChangeHandler}
            />
          </Col>
        </Row>

        {inProcess || enableSubInProcess || disableSubInProcess ? (
          <Spinner />
        ) : subscriptionsListData &&
          subscriptionsListData.customers?.length ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Plan</th>
                <th>Auto Renewal</th>
                <th>On Trial</th>
                <th>Next Plan</th>
                <th>Subscription Start Time</th>
                <th>Subscription End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionsListData.customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id.slice(customer._id.length - 5)}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.subscription?.status || 'N/A'}</td>
                  <td>{customer.subscription?.plan?.name || 'N/A'}</td>
                  <td>{customer.subscription?.autoRenewal ? 'True' : 'False'}</td>
                  <td>{customer.subscription?.onTrial ? 'True' : 'False'}</td>
                  <td>{customer.subscription?.nextPlan?.name || 'N/A'}</td>
                  <td>{customer.subscription?.startTime ? formatDate(customer.subscription.startTime) : "N/A"}</td>
                  <td>{customer.subscription?.expiryTime ? formatDate(customer.subscription.expiryTime) : "N/A"}</td>
                  <td>
                    {customer.subscription.status === "enabled" ? (
                      <Button.Ripple
                        onClick={disableSubscriptionHandler.bind(
                          this,
                          customer._id
                        )}
                        size="sm"
                        color="primary"
                      >
                        Disable
                      </Button.Ripple>
                    ) : customer.subscription.status === "disabled" ? (
                      <Button.Ripple
                        onClick={enableSubscriptionHandler.bind(
                          this,
                          customer._id
                        )}
                        size="sm"
                        className="mb-1"
                        color="primary"
                      >
                        Enable
                      </Button.Ripple>
                    ) : (
                      "Expired"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}

        <Row className="mx-0 justify-content-between">
          <Col className="mt-1" sm="12" md={6}>
            <span>
              <b>Total Records:</b> {totalRecords}
            </span>
          </Col>
          <Col sm="12" md={6}>
            <CustomPagination />
          </Col>
        </Row>

      </Card>
    </Fragment>
  );
};

export default memo(ListSubscriptions);
