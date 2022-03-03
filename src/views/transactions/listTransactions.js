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
} from "reactstrap";
import { handleFetchPlans } from "../../redux/actions/plans/fetch";
import { handleTransactionsFetch, handleTransactionsFetchNoUpdatesVersion } from "../../redux/actions/transaction/fetch";
import { handleSelectChangeListTransactions } from "../../redux/actions/transaction/select/onSelectLimit";
import { handlePageChangeListTransactions } from "../../redux/actions/transaction/select/onSelectPage";
import { RESET_TRANSACTIONS_LIST_STATE } from "../../redux/actions/actionType/transaction/fetch";
import { formatDate } from "../../utility/Utils";
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner"
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ListTransactions = () => {
  
  const [searchKeyword, setSearchKeyword] = useState("")
  const [modeFilter, setModeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [planIdFilter, setPlanIdFilter] = useState("")
  const [transactionTimeFilter, setTransactionTimeFilter] = useState("")
  const [transactionTimeFromFilter, setTransactionTimeFromFilter] = useState("")
  const [transactionTimeToFilter, setTransactionTimeToFilter] = useState("")

  const dispatch = useDispatch();
  
  const { plans } = useSelector((state) => state.plan);

  const {
    limit,
    page,
    inProcess,
    transactionsListData,
    totalPages,
    totalRecords
  } = useSelector((state) => state.transaction);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'modeFilter') setModeFilter(value)
    else if (name === 'statusFilter') setStatusFilter(value)
    else if (name === 'planIdFilter') setPlanIdFilter(value)
  }

  const onTransactionTimeChangeHandler = (dates) => {
    if (dates.length === 1) {
      setTransactionTimeFromFilter(dates[0].toISOString())
      setTransactionTimeToFilter("")
    }
    if (dates.length === 2) {
      setTransactionTimeFromFilter(dates[0].toISOString())
      setTransactionTimeToFilter(dates[1].toISOString())
    }
  }

  const handleLimitChange = (e) => {
    dispatch(
      handleSelectChangeListTransactions(
        e.target.value,
        limit,
        modeFilter,
        statusFilter,
        planIdFilter,
        transactionTimeFromFilter,
        transactionTimeToFilter,
        searchKeyword
      )
    );
  };

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListTransactions(
        page,
        limit,
        modeFilter,
        statusFilter,
        planIdFilter,
        transactionTimeFromFilter,
        transactionTimeToFilter,
        searchKeyword
      )
    );
  };

  const resetFilters = () => {
    setModeFilter("")
    setStatusFilter("")
    setPlanIdFilter("")
    setTransactionTimeFromFilter("")
    setTransactionTimeToFilter("")
    setTransactionTimeFilter([])
  };

  useEffect(() => {
    dispatch(
      handleTransactionsFetchNoUpdatesVersion(
        page,
        limit,
        modeFilter,
        statusFilter,
        planIdFilter,
        transactionTimeFromFilter,
        transactionTimeToFilter,
        searchKeyword
      )
    );
  }, [
    modeFilter, 
    statusFilter,
    planIdFilter,
    transactionTimeFromFilter,
    transactionTimeToFilter,
    searchKeyword
  ]);

  useEffect(() => {
    dispatch(handleTransactionsFetch(
      page, 
      limit, 
      modeFilter,
      statusFilter,
      planIdFilter,
      transactionTimeFromFilter,
      transactionTimeToFilter,
      searchKeyword
    ));
    dispatch(handleFetchPlans());
  }, []);

  useEffect(() => {
    return () => dispatch({ type: RESET_TRANSACTIONS_LIST_STATE });
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
          <CardTitle tag="h4">Transactions</CardTitle>
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
              <Label for="modeFilter" className="mr-1">
                Mode
              </Label>
              <Input
                type="select"
                id="modeFilter"
                name="modeFilter"
                value={modeFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>
                <option value="auto">Auto</option>
                <option value="manual">Manual</option>
              </Input>
            </div>
          </Col>

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
                <option value="succeeded">Succeeded</option>
                <option value="failed">Failed</option>
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
              <Label for="transactionTime" className="mr-1">
                Date
              </Label>
              <Flatpickr
                id="transactionTime"
                name="transactionTime"
                value={transactionTimeFilter}
                className="form-control"
                onChange={onTransactionTimeChangeHandler}
                options={{
                  mode: "range",
                  enableTime: true
                }}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} style={{ marginTop: 7 }}>
            <Label for="resetFilters" className="mr-1">
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

        {inProcess ? (
          <Spinner />
        ) : transactionsListData &&
          transactionsListData.transactions?.length ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Plan</th>
                <th>Total Fee</th>
                <th>Transaction Time</th>
                <th>Subscription Start Time</th>
                <th>Subscription End Time</th>
                <th>Internal ID</th>
              </tr>
            </thead>
            <tbody>
              {transactionsListData.transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id.slice(transaction._id.length - 5)}</td>
                  <td>{transaction.customer?.name || 'N/A'}</td>
                  <td>{transaction.customer?.email || 'N/A'}</td>
                  <td>{transaction.mode}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.plan?.name || 'N/A'}</td>
                  <td>{`${transaction.currency} ${transaction.totalFee}`}</td>
                  <td>{formatDate(transaction.transactionTime)}</td>
                  <td>{formatDate(transaction.subscriptionStartTime)}</td>
                  <td>{formatDate(transaction.subscriptionExpiryTime)}</td>
                  <td>{transaction.internalId}</td>
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

export default memo(ListTransactions);
