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
import { handleServersFetch, handleServersFetchNoUpdatesVersion } from "../../../redux/actions/server/fetch/servers/fetch";
import { handleFetchCloudProviders } from "../../../redux/actions/server/fetch/cloudProviders";
import { handleSelectChangeListServers } from "../../../redux/actions/server/fetch/servers/select/onSelectLimit";
import { handlePageChangeListServers } from "../../../redux/actions/server/fetch/servers/select/onPageSelect";
import { handleStartServer } from "../../../redux/actions/server/start";
import { handleStopServer } from "../../../redux/actions/server/stop";
import { RESET_SERVERS_LIST_STATE } from "../../../redux/actions/actionType/server/fetch/servers";
import { RESET_COUNTRIES_LIST_STATE } from "../../../redux/actions/actionType/country/fetch";
import { handleFetchAllCountriesRecords } from "../../../redux/actions/country/fetch";
import { handleGetMainVPNProtocols } from "../../../redux/actions/server/fetch/protocols";
import ReactPaginate from "react-paginate";
import Spinner from "../../common/Spinner"

const ListServers = () => {
  
  const [searchKeyword, setSearchKeyword] = useState("")
  const [countryIdFilter, setCountryIdFilter] = useState("")
  const [cloudIdFilter, setCloudIdFilter] = useState("")
  const [instanceTypeFilter, setInstanceTypeFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [accessTypeFilter, setAccessTypeFilter] = useState("")
  const [protocolFilter, setProtocolFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // DISPATCH
  const dispatch = useDispatch();

  const { countriesFetchInProcess, countries } = useSelector(
    (state) => state.country
  );
  const {
    page,
    limit,
    fetchServersInProcess,
    serversListData,
    totalPages,
    cloudProvidersFetchInProcess,
    providers,
    initServerInProcess,
    stopServerInProcess,
    fetchMainVpnProtocolsInProcess,
    protocols,
    totalRecords
  } = useSelector((state) => state.server);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'countryIdFilter') setCountryIdFilter(value)
    else if (name === 'cloudIdFilter') setCloudIdFilter(value)
    else if (name === 'instanceTypeFilter') setInstanceTypeFilter(value)
    else if (name === 'typeFilter') {
      if (value === 'ca') {
        setAccessTypeFilter("")
        setProtocolFilter("")
      }
      setTypeFilter(value)
    }
    else if (name === 'accessTypeFilter') setAccessTypeFilter(value)
    else if (name === 'protocolFilter') setProtocolFilter(value)
    else if (name === 'statusFilter') setStatusFilter(value)
  }

  const handleLimitChange = (e) => {
    dispatch(
      handleSelectChangeListServers(
        e.target.value,
        limit,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        typeFilter,
        accessTypeFilter,
        protocolFilter,
        statusFilter,
        searchKeyword
      )
    );
  };

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListServers(
        page,
        limit,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        typeFilter,
        accessTypeFilter,
        protocolFilter,
        statusFilter,
        searchKeyword
      )
    );
  };

  const resetFilters = () => {
    setCountryIdFilter("")
    setCloudIdFilter("")
    setInstanceTypeFilter("")
    setTypeFilter("")
    setAccessTypeFilter("")
    setProtocolFilter("")
    setStatusFilter("")
  };

  const startServerHandler = (serverId) => {
    if (confirm("Are you sure you want to start this server with ID: " + serverId)) {
      dispatch(
        handleStartServer(
          serverId,
          page,
          limit,
          countryIdFilter,
          cloudIdFilter,
          instanceTypeFilter,
          typeFilter,
          accessTypeFilter,
          protocolFilter,
          statusFilter,
          searchKeyword
        )
      );
    }
  };

  // ** HALT SERVER
  const haltServerHandler = (serverId) => {
    if (confirm("Are you sure you want to stop this server with ID: " + serverId)) {
      dispatch(
        handleStopServer(
          serverId,
          page,
          limit,
          countryIdFilter,
          cloudIdFilter,
          instanceTypeFilter,
          typeFilter,
          accessTypeFilter,
          protocolFilter,
          statusFilter,
          searchKeyword
        )
      );
    }
  };

  useEffect(() => {
    dispatch(
      handleServersFetchNoUpdatesVersion(
        page,
        limit,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        typeFilter,
        accessTypeFilter,
        protocolFilter,
        statusFilter,
        searchKeyword
      )
    );
  }, [
    countryIdFilter, cloudIdFilter, instanceTypeFilter, 
    typeFilter, accessTypeFilter, protocolFilter, 
    statusFilter, searchKeyword
  ]);

  // ** ON MOUNT
  useEffect(() => {
    dispatch(
      handleServersFetch(
        page,
        limit,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        typeFilter,
        accessTypeFilter,
        protocolFilter,
        statusFilter,
        searchKeyword
      )
    );

    dispatch(handleFetchAllCountriesRecords(500));
    dispatch(handleFetchCloudProviders());
    dispatch(handleGetMainVPNProtocols());
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_COUNTRIES_LIST_STATE });
      dispatch({ type: RESET_SERVERS_LIST_STATE });
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
          <CardTitle tag="h4">Servers</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1">
          <Col sm={12} md={6} lg={4}>
            <div className="d-flex align-items-center">
              <Label className="mr-1" for="limit">
                Show
              </Label>
              <Input
                style={{ width: "70px" }}
                className="dataTable-select mr-1"
                type="select"
                id="limit"
                value={limit}
                name="limit"
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
                  countries &&
                  countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="cloudIdFilter" className="mr-1">
                Cloud Provider
              </Label>
              <Input
                type="select"
                name="cloudIdFilter"
                id="cloudIdFilter"
                onChange={onChangeHandler}
                value={cloudIdFilter}
              >
                <option value="">Choose...</option>
                {cloudProvidersFetchInProcess ? (
                  <option value="">Loading...</option>
                ) : (
                  providers &&
                  providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  ))
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="instanceTypeFilter" className="mr-1">
                Instance Type
              </Label>
              <Input
                type="select"
                name="instanceTypeFilter"
                id="instanceTypeFilter"
                onChange={onChangeHandler}
                value={instanceTypeFilter}
              >
              <option value="">Choose...</option>
              <option value="shared">Shared</option>
              <option value="dedicated">Dedicated</option>  
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="typeFilter" className="mr-1">
                Type
              </Label>
              <Input
                type="select"
                id="typeFilter"
                name="typeFilter"
                onChange={onChangeHandler}
                value={typeFilter}
              >
                <option value="">Choose...</option>
                <option value="ca">Certificate Authority</option>
                <option value="vpn">VPN Server</option>
              </Input>
            </div>
          </Col>

          {typeFilter === "vpn" && (
            <Col sm={12} md={6} lg={4} className="mb-1">
              <div className="d-flex align-items-center justify-content-lg-start">
                <Label for="accessTypeFilter" className="mr-1">
                  Access Type
                </Label>
                <Input
                  type="select"
                  name="accessTypeFilter"
                  id="accessTypeFilter"
                  onChange={onChangeHandler}
                  value={accessTypeFilter}
                >
                <option value="">Choose...</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>  
                </Input>
              </div>
            </Col>
          )}

          {typeFilter === "vpn" && (
            <Col sm={12} md={6} lg={4} className="mb-1">
              <div className="d-flex align-items-center justify-content-lg-start">
                <Label for="protocolFilter" className="mr-1">
                  Protocol
                </Label>
                <Input
                  type="select"
                  name="protocolFilter"
                  id="protocolFilter"
                  onChange={onChangeHandler}
                  value={protocolFilter}
                >
                  {fetchMainVpnProtocolsInProcess ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      <option value="">Choose...</option>
                      {protocols && protocols.map((protocol) => (
                        <option key={protocol.id} value={protocol.id}>
                          {protocol.name}
                        </option>
                      ))}
                    </>
                  )}
                </Input>
              </div>
            </Col>
          )}

          <Col sm={12} md={6} lg={4} className="mb-1">
            <div className="d-flex align-items-center justify-content-lg-start">
              <Label for="statusFilter" className="mr-1">
                Status
              </Label>
              <Input
                type="select"
                name="statusFilter"
                id="statusFilter"
                onChange={onChangeHandler}
                value={statusFilter}
              >
                <option value="">Choose...</option>
                <option value="initializing">Initializing</option>
                <option value="running">Running</option>
                <option value="halted">Halted</option>
              </Input>
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
              type="search"
              bsSize="sm"
              id="searchKeyword"
              name="searchKeyword"
              onChange={onChangeHandler}
            />
          </Col>
        </Row>

        {fetchServersInProcess || initServerInProcess || stopServerInProcess ? (
          <Spinner />
        ) : serversListData && serversListData.servers && serversListData.servers.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Cloud ID</th>
                <th>Continent</th>
                <th>Country</th>
                <th>City</th>
                <th>Region ID</th>
                <th>Instance ID</th>
                <th>OS Name</th>
                <th>DNS Provider</th>
                <th>VPN Connections</th>
                <th>Protocols</th>
                <th>Init Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {serversListData.servers.map((server) => (
                <tr key={server._id}>
                  <td className="text-truncate">
                    <span className="align-middle font-weight-bold">
                      {server._id}
                    </span>
                  </td>
                  <td className="text-truncate">{server.type === 'ca' ? 'CA Server' : 'VPN Server'}</td>
                  <td>{server.status}</td>
                  <td>{server.cloudId}</td>
                  <td>{server.continent}</td>
                  <td>
                    {server.country && server.country.name
                      ? server.country.name
                      : "N/A"}
                  </td>
                  <td>
                    {server.city && server.city.name
                      ? server.city.name
                      : "N/A"}
                  </td>
                  <td>{server.regionId}</td>
                  <td className="text-truncate">{server.instanceId}</td>
                  <td className="text-truncate">{server.os.imageName}</td>
                  <td>
                    {server.metadata && server.metadata.dnsProviderId
                      ? server.metadata.dnsProviderId
                      : "N/A"}
                  </td>
                  <td>{server.totalVPNConnections || 0}</td>
                  <td>{server.protocols && server.protocols.length ? server.protocols.join(', ') : 'N/A'}</td>
                  <td>{server.initProgress}</td>
                  <td>
                    {server.status === "running" ? (
                      <Button.Ripple
                        onClick={haltServerHandler.bind(this, server._id)}
                        size="sm"
                        color="primary"
                      >
                        Halt
                      </Button.Ripple>
                    ) : server.status === "halted" ? (
                      <Button.Ripple
                        onClick={startServerHandler.bind(this, server._id)}
                        size="sm"
                        className="mb-1"
                        color="primary"
                      >
                        Start
                      </Button.Ripple>
                    ) : (
                      "Initializing"
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

export default memo(ListServers);
