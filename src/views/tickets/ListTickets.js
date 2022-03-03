/* eslint-disable */
import React, { useState, useEffect, Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RefreshCw } from 'react-feather'
import { truncateString, formatDate } from '@utils'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table, Button } from 'reactstrap'
import { handleTicketsFetch, handleTicketsFetchNoUpdatesVersion } from '../../redux/actions/ticket/fetch/fetchTicketsActions'
import { handleSelectChangeListTickets } from '../../redux/actions/ticket/fetch/select/onSelectLimit'
import { handlePageChangeListTickets } from '../../redux/actions/ticket/fetch/select/onSelectPage'
import { handleCloseSupportTicket } from '../../redux/actions/ticket/close/closeSupportTicketActions'
import { RESET_TICKETS_LIST_STATE } from '../../redux/actions/actionType/ticket/fetch'
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner"

const ListTickets = () => {

  const [searchKeyword, setSearchKeyword] = useState("")
  const [severityFilter, setSeverityFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const dispatch = useDispatch()

  const { 
    inProcess,
    page, 
    limit,  
    totalPages, 
    ticketsListData,
    totalRecords
  } = useSelector(state => state.ticketList)

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'severityFilter') setSeverityFilter(value)
    else if (name === 'statusFilter') setStatusFilter(value)
  }

  const handleLimitChange = e => {
    dispatch(
      handleSelectChangeListTickets(
        e.target.value, 
        limit, 
        severityFilter, 
        statusFilter, 
        searchKeyword
      )
    )
  }

  const handlePagination = page => {
    dispatch(
      handlePageChangeListTickets(
        page, 
        limit, 
        severityFilter, 
        statusFilter, 
        searchKeyword
      )
    )
  }

  const resetFilters = () => {
    setSeverityFilter("")
    setStatusFilter("")
  };

  useEffect(() => {
    dispatch(
      handleTicketsFetchNoUpdatesVersion(
        page, 
        limit, 
        severityFilter, 
        statusFilter, 
        searchKeyword
      )
    )
  }, [severityFilter, statusFilter, searchKeyword])

  useEffect(() => {
    dispatch(handleTicketsFetch(page, limit, severityFilter, statusFilter, searchKeyword))
  }, [])

  const closeTicketHandler = (ticketId) => {
    if (confirm('Are you sure you want to close the ticket with ID: ' + ticketId)) {
      dispatch(handleCloseSupportTicket(ticketId, page, limit, severityFilter, statusFilter, searchKeyword))
    }
  }

  useEffect(() => {
    return () => dispatch({ type: RESET_TICKETS_LIST_STATE })
  }, [])

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'}
      />
    )
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Support Tickets</CardTitle>
        </CardHeader>

        <Row className='mx-0 justify-content-between'>
          <Col sm={12} md={6} lg={4}>
            <div className='d-flex align-items-center'>
              <Label className='mr-1' for='limit'>
                Show
              </Label>
              <Input
                style={{ width: '70px' }}
                className='dataTable-select mr-1'
                type='select'
                id='limit'
                name='limit'
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
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='severityFilter' className='mr-1'>
                Serverity
              </Label>
              <Input
                type='select'
                name='severityFilter'
                id='severityFilter'
                value={severityFilter}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='statusFilter' className='mr-1'>
                Status
              </Label>
              <Input
                type='select'
                id='statusFilter'
                name='statusFilter'
                value={statusFilter}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                <option value='opened'>Opened</option>
                <option value='closed'>Closed</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} style={{ marginTop: 7 }}>
            <Label for='Reset Filters' className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
        </Row>

        <Row className="mx-0 mb-75">
          <Col className='d-flex align-items-center mt-sm-0' 
           sm={12}
           md={6}
           lg={4}
          >
            <Label className='mr-1' for='searchKeyword'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='searchKeyword'
              name='searchKeyword'
              onChange={onChangeHandler}
            />
          </Col>
        </Row>

        {inProcess ? (
          <Spinner />
        ) : ticketsListData && ticketsListData.supportTickets?.length ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Opened At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketsListData.supportTickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{ticket._id}</span>
                  </td>
                  <td>{ticket.subject}</td>
                  <td>{truncateString(ticket.message)}</td>
                  <td>{ticket.customer?.name || 'N/A'}</td>
                  <td>{ticket.customer?.email || 'N/A'}</td>
                  <td>{ticket.severity}</td>
                  <td>{ticket.status}</td>
                  <td>{formatDate(new Date(ticket.openedAt))}</td>
                  <td>
                    {ticket.status === "opened" ? (
                      <Button.Ripple
                        onClick={closeTicketHandler.bind(this, ticket._id)}
                        size="sm"
                        color="primary"
                      >
                        Close
                      </Button.Ripple>
                    ) : (
                      "Closed"
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
  )
}

export default memo(ListTickets)
