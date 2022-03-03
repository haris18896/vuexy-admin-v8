/* eslint-disable */
import React, { useState, useEffect, Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "react-feather";
import { formatDate } from '@utils'
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
import { handleFetchVpnConnectionLogs, handleLogsFetchNoUpdatesVersion } from "../../redux/actions/logs/vpn/fetch";
import { handleSelectChangeListLogs } from "../../redux/actions/logs/vpn/select/onLimitChange";
import { handlePageChangeListLogs } from "../../redux/actions/logs/vpn/select/onPageChange";
import { RESET_LOGS_LIST_STATE } from "../../redux/actions/actionType/logs/fetch";
import { handleFetchAllCountriesRecords } from "../../redux/actions/country/fetch";
import { handleFetchContinents } from "../../redux/actions/continent/fetch";
import { RESET_COUNTRIES_LIST_STATE } from "../../redux/actions/actionType/country/fetch";
import { RESET_CITY_STATE } from "../../redux/actions/actionType/city/reset";
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner"
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ConnectionLogs = () => {

  const [searchKeyword, setSearchKeyword] = useState("")
  const [continentFilter, setContinentFilter] = useState("")
  const [countryIdFilter, setCountryIdFilter] = useState("")
  const [protocolFilter, setProtocolFilter] = useState("")
  const [connectionTimeFilter, setConnectionTimeFilter] = useState("")
  const [connectionTimeFromFilter, setConnectionTimeFromFilter] = useState("")
  const [connectionTimeToFilter, setConnectionTimeToFilter] = useState("")

  const dispatch = useDispatch();

  const { countriesFetchInProcess, countries } = useSelector(
    (state) => state.country
  );
  const { continents, fetchContinentsInProcess } = useSelector(
    (state) => state.city
  );

  const {
    limit,
    page,
    inProcess,
    vpnConnectionLogData,
    totalPages,
    totalRecords
  } = useSelector((state) => state.logs);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'continentFilter') setContinentFilter(value)
    else if (name === 'countryIdFilter') setCountryIdFilter(value)
    else if (name === 'protocolFilter') setProtocolFilter(value)
  }

  const onConectionTimeChangHandler = (dates) => {
    if (dates.length === 1) {
      setConnectionTimeFromFilter(dates[0].toISOString())
      setConnectionTimeToFilter("")
    }
    if (dates.length === 2) {
      setConnectionTimeFromFilter(dates[0].toISOString())
      setConnectionTimeToFilter(dates[1].toISOString())
    }
  }

  const handleLimitChange = (e) => {
    dispatch(
      handleSelectChangeListLogs(
        e.target.value,
        limit,
        continentFilter,
        countryIdFilter,
        protocolFilter,
        connectionTimeFromFilter,
        connectionTimeToFilter,
        searchKeyword
      )
    );
  };

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListLogs(
        page,
        limit,
        continentFilter,
        countryIdFilter,
        protocolFilter,
        connectionTimeFromFilter,
        connectionTimeToFilter,
        searchKeyword
      )
    );
  };

  const resetFilters = () => {
    setContinentFilter("")
    setCountryIdFilter("")
    setProtocolFilter("")
    setConnectionTimeFromFilter("")
    setConnectionTimeToFilter("")
    setConnectionTimeFilter([])
  };

  useEffect(() => {
    dispatch(
      handleLogsFetchNoUpdatesVersion(
        page,
        limit,
        continentFilter, 
        countryIdFilter, 
        protocolFilter, 
        connectionTimeFromFilter, 
        connectionTimeToFilter, 
        searchKeyword
      )
    );
  }, [
    continentFilter, 
    countryIdFilter, 
    protocolFilter, 
    connectionTimeFromFilter, 
    connectionTimeToFilter, 
    searchKeyword
  ]);

  useEffect(() => {
    dispatch(handleFetchVpnConnectionLogs(
      page, 
      limit, 
      continentFilter, 
      countryIdFilter, 
      protocolFilter, 
      connectionTimeFromFilter, 
      connectionTimeToFilter, 
      searchKeyword
    ));
    dispatch(handleFetchContinents());
    dispatch(handleFetchAllCountriesRecords(500));
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_LOGS_LIST_STATE });
      dispatch({ type: RESET_COUNTRIES_LIST_STATE });
      dispatch({ type: RESET_CITY_STATE });
    };
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
          <CardTitle tag="h4">VPN Connection Logs</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1">
          <Col sm={12} md={6} lg={4} className="">
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
              <Label for="continentFilter" className="mr-1">
                Continent
              </Label>

              <Input
                name="continentFilter"
                type="select"
                id="continentFilter"
                value={continentFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>

                {fetchContinentsInProcess ? (
                  <option value="">Loading...</option>
                ) : (
                  <>
                    {continents &&
                      continents.map((continent) => (
                        <option key={continent} value={continent}>
                          {continent}
                        </option>
                      ))}
                  </>
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="countryIdFilter" className="mr-1">
                Country
              </Label>

              <Input
                name="countryIdFilter"
                type="select"
                id="countryIdFilter"
                value={countryIdFilter}
                onChange={onChangeHandler}
              >
                <option value="">Choose...</option>

                {countriesFetchInProcess ? (
                  <option value="">Loading...</option>
                ) : (
                  <>
                    <option value="n/a">N/A</option>
                    {countries &&
                      countries.map((country) => (
                        <option key={country._id} value={country._id}>
                          {country.name}
                        </option>
                      ))}
                  </>
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='protocolFilter' className='mr-1'>
                Status
              </Label>
              <Input
                type='select'
                id='protocolFilter'
                name='protocolFilter'
                value={protocolFilter}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                <option value='wireguard'>WireGuard</option>
                <option value='openvpn-udp'>OpenVPN UDP</option>
                <option value='openvpn-tcp'>OpenVPN TCP</option>
              </Input>
            </div>
          </Col>
        
          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="connectionTime" className="mr-1">
                Connection Time
              </Label>
              <Flatpickr
                id="connectionTime"
                name="connectionTime"
                value={connectionTimeFilter}
                className="form-control"
                onChange={onConectionTimeChangHandler}
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
          <Col
            className="d-flex align-items-center mt-sm-0"
            sm={12}
            md={6}
            lg={4}
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
        ) : vpnConnectionLogData &&
          vpnConnectionLogData.vpnConnectionLogs?.length ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Continent</th>
                <th>Country</th>
                <th>City</th>
                <th>ISP</th>
                <th>Real IP</th>
                <th>Protocol</th>
                <th>Connection Time</th>
                <th>Virtual IP</th>
                <th>OS Platform</th>
                <th>OS Version</th>
                <th>OpenVPN Version</th>
                <th>OpenVPN GUI Version</th>
                <th>Mac Address</th>
                <th>Port</th>
                <th>Server ID</th>
                <th>Server Country</th>
                <th>Server City</th>
                <th>Server IP</th>
              </tr>
            </thead>
            <tbody>
              {vpnConnectionLogData.vpnConnectionLogs.map((log) => (
                <tr key={log._id}>
                  <td>
                    <span className="align-middle font-weight-bold">
                      {log._id.slice(log._id.length - 5)}
                    </span>
                  </td>

                  <td>{log.customer?.name || 'N/A'}</td>
                  <td>{log.customer?.email || 'N/A'}</td>
                  <td>{log.continent || 'N/A'}</td>
                  <td>{log.country?.name || 'N/A'}</td>
                  <td>{log.city || 'N/A'}</td>
                  <td>{log.isp || 'N/A'}</td>
                  <td>{log.realIP}</td>
                  <td>{log.protocol}</td>
                  <td>{formatDate(log.connectionTime)}</td>
                  <td>{log.virtualIP}</td>
                  <td>{log.osPlatform || "N/A"}</td>
                  <td>{log.osVersion || "N/A"}</td>
                  <td>{log.openvpnVersion || "N/A"}</td>
                  <td>{log.openvpnGUIVersion || "N/A"}</td>
                  <td>{log.macAddress || "N/A"}</td>
                  <td>{log.port}</td>
                  <td>{log.server._id}</td>
                  <td>{log.server?.country?.name || 'N/A'}</td>
                  <td>{log.server?.city?.name || 'N/A'}</td>
                  <td>{log.server.ipv4Address || "N/A"}</td>
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

export default memo(ConnectionLogs);
