/* eslint-disable */
import React, { useState, useEffect, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Edit, Trash } from "react-feather";
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
import { handleAdminsFetch, handleAdminsFetchNoUpdatesVersion, handlePageChange, handleSelectChange } from "../../../redux/actions/admin/fetch.admins/fetchAdminsActions";
import { handleDeleteAdmin } from "../../../redux/actions/admin/delete.admin/deleteAdminActions";
import { RESET_ADMINS_LIST_STATE } from "../../../redux/actions/actionType/admin/fetch";
import ReactPaginate from "react-paginate"
import classnames from "classnames"
import Spinner from "../../common/Spinner"
import "@styles/react/libs/flatpickr/flatpickr.scss";

const Admins = () => {

  const [searchKeyword, setSearchKeyword] = useState("")

  const dispatch = useDispatch();

  const { inProcess, adminsListData, page, limit, totalPages, totalRecords } = useSelector((state) => state.adminsList);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
  }

  const handlePagination = (page) => {
    dispatch(handlePageChange(page, limit, searchKeyword));
  };

  const handleLimitChange = (e) => {
    dispatch(handleSelectChange(e.target.value, limit, searchKeyword));
  };

  const deleteAdminHandler = (adminId) => {
    if (confirm("Are you sure you want to delete the admin with ID: " + adminId)) {
      dispatch(handleDeleteAdmin(adminId, page, limit, searchKeyword));
    }
  };

  useEffect(() => {
    dispatch(handleAdminsFetchNoUpdatesVersion(page, limit, searchKeyword));
  }, [searchKeyword]);

  useEffect(() => {
    dispatch(handleAdminsFetch(page, limit, searchKeyword));
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ADMINS_LIST_STATE });
    };
  }, []);

  // ** CUSTOM PAGINATION COMPONENT
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
          <CardTitle tag="h4">Admins</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-75 justify-content-between">
          <Col>
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
              <Label for="limit">Records</Label>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="4"
          >
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
        ) : adminsListData && adminsListData.admins.length ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminsListData.admins.map((admin) => (
                <tr key={admin._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {admin._id}
                    </span>
                  </td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role === 'spradmin' ? 'Super Admin': 'Admin'}</td>
                  <td>
                    <Link to={`/admins/update/${admin._id}`} 
                      className={classnames({ "link-disabled": admin.role === 'spradmin' })}>
                      <Edit
                        style={{ cursor: "pointer" }}
                        className="mr-50 text-success"
                        size={15}
                      />
                    </Link>
                    <Trash
                      onClick={deleteAdminHandler.bind(this, admin._id)}
                      style={{ cursor: "pointer" }}
                      className="mr-50 text-danger"
                      className={classnames({ "link-disabled": admin.role === 'spradmin' })}
                      size={15}
                    />
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

export default memo(Admins);
