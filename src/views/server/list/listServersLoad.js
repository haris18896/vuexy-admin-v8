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
import { handleFetchCloudProviders } from "../../../redux/actions/server/fetch/cloudProviders";
import { RESET_SERVERS_LIST_STATE } from "../../../redux/actions/actionType/server/fetch/servers";
import { handleFetchServerLoadTypes } from "../../../redux/actions/server/fetch/serverLoad";
import { handleFetchCountryServersLoadStats, handleFetchCountryServersLoadStatsNoUpdatesVersion } from "../../../redux/actions/server/fetch/servers/fetch/countryServersLoadStats";
import { handleSelectChangeListServersLoadStats } from "../../../redux/actions/server/fetch/serverLoad/select/onLimitSelect";
import { handlePageChangeListServersLoadStats } from "../../../redux/actions/server/fetch/serverLoad/select/onPageSelect";
import { RESET_SERVERS_LOAD_STATS_LIST_STATE } from "../../../redux/actions/actionType/server/fetch/countryServersLoadStats";
import { RESET_COUNTRIES_LIST_STATE } from "../../../redux/actions/actionType/country/fetch";
import { handleFetchAllCountriesRecords } from "../../../redux/actions/country/fetch";
import { handleGetMainVPNProtocols } from "../../../redux/actions/server/fetch/protocols";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import Spinner from "../../common/Spinner"

const ListServersLoadStats = () => {
  
  const [searchKeyword, setSearchKeyword] = useState("")
  const [loadTypeIdFilter, setLoadTypeIdFilter] = useState("")
  const [countryIdFilter, setCountryIdFilter] = useState("")
  const [cloudIdFilter, setCloudIdFilter] = useState("")
  const [instanceTypeFilter, setInstanceTypeFilter] = useState("")
  const [accessTypeFilter, setAccessTypeFilter] = useState("")
  const [protocolFilter, setProtocolFilter] = useState("")

  // DISPATCH
  const dispatch = useDispatch();

  const { 
    cloudProvidersFetchInProcess, 
    providers, 
    fetchMainVpnProtocolsInProcess,
    protocols,
  } = useSelector((state) => state.server);

  const { countriesFetchInProcess, countries } = useSelector(
    (state) => state.country
  );

  const {
    page,
    limit,
    totalPages,
    fetchLoadTypesInProcess,
    serverLoadTypes,
    fetchCountryLoadServersInProcess,
    countryServersLoadStatsData,
    totalRecords
  } = useSelector((state) => state.countryServers);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'loadTypeIdFilter') setLoadTypeIdFilter(value)
    else if (name === 'countryIdFilter') setCountryIdFilter(value)
    else if (name === 'cloudIdFilter') setCloudIdFilter(value)
    else if (name === 'instanceTypeFilter') setInstanceTypeFilter(value)
    else if (name === 'accessTypeFilter') setAccessTypeFilter(value)
    else if (name === 'protocolFilter') setProtocolFilter(value)
  }

  const handleLimitChange = (e) => {
    dispatch(
      handleSelectChangeListServersLoadStats(
        e.target.value,
        limit,
        loadTypeIdFilter,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        accessTypeFilter,
        protocolFilter,
        searchKeyword
      )
    );
  };

  const handlePagination = (page) => {
    dispatch(
      handlePageChangeListServersLoadStats(
        page,
        limit,
        loadTypeIdFilter,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        accessTypeFilter,
        protocolFilter,
        searchKeyword
      )
    );
  };

  const resetFilters = () => {
    setLoadTypeIdFilter("")
    setCountryIdFilter("")
    setCloudIdFilter("")
    setInstanceTypeFilter("")
    setAccessTypeFilter("")
    setProtocolFilter("")
  };

  useEffect(() => {
    dispatch(
      handleFetchCountryServersLoadStatsNoUpdatesVersion(
        page,
        limit,
        loadTypeIdFilter,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        accessTypeFilter,
        protocolFilter,
        searchKeyword
      )
    );
  }, [
    loadTypeIdFilter, countryIdFilter, cloudIdFilter, 
    instanceTypeFilter, accessTypeFilter, protocolFilter, 
    searchKeyword
  ]);

  useEffect(() => {
    dispatch(handleFetchServerLoadTypes());
    dispatch(
      handleFetchCountryServersLoadStats(
        page,
        limit,
        loadTypeIdFilter,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        accessTypeFilter,
        protocolFilter,
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
      dispatch({ type: RESET_SERVERS_LOAD_STATS_LIST_STATE });
      dispatch({ type: RESET_SERVERS_LIST_STATE });
    };
  }, []);

  const checkLowLoad = (loadPercentage) => {
    let result = false;
    const loadTypeLow = serverLoadTypes.find(
      (loadType) => loadType.id === "low"
    );
    if (
      loadPercentage >= loadTypeLow.loadPercentage.min &&
      loadPercentage < loadTypeLow.loadPercentage.max
    ) {
      result = true;
    }
    return result;
  };

  const checkMediumLoad = (loadPercentage) => {
    let result = false;
    const loadTypeMedium = serverLoadTypes.find(
      (loadType) => loadType.id === "medium"
    );
    if (
      loadPercentage >= loadTypeMedium.loadPercentage.min &&
      loadPercentage < loadTypeMedium.loadPercentage.max
    ) {
      result = true;
    }
    return result;
  };

  const checkHighLoad = (loadPercentage) => {
    let result = false;
    const loadTypeHigh = serverLoadTypes.find(
      (loadType) => loadType.id === "high"
    );
    if (
      loadPercentage >= loadTypeHigh.loadPercentage.min &&
      loadPercentage < loadTypeHigh.loadPercentage.max
    ) {
      result = true;
    }
    return result;
  };

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
          <CardTitle tag="h4">Servers Load Stats</CardTitle>
        </CardHeader>

        <Row className="mx-0 mt-1">
          <Col sm={12} md={6} lg={4} className="">
            <div className="d-flex align-items-center">
              <Label className="mr-1" for="sort-select">
                Show
              </Label>
              <Input
                style={{ width: "70px" }}
                className="dataTable-select mr-1"
                type="select"
                id="sort-select"
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
                <Label for="loadTypeIdFilter" className="mr-1">
                  Load Type
                </Label>
                <Input
                  type="select"
                  name="select"
                  id="loadTypeIdFilter"
                  onChange={onChangeHandler}
                  name="loadTypeIdFilter"
                  value={loadTypeIdFilter}
                >
                  <option value="">Choose...</option>
                  {serverLoadTypes &&
                    serverLoadTypes.map((load) => (
                      <option key={load.id} value={load.id}>
                        {load.name}
                      </option>
                    ))}
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

          <Col sm={12} md={6} lg={4} style={{ marginTop: 7 }}>
            <Label for="RresetFilter" className="mr-1">
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

        {fetchCountryLoadServersInProcess || fetchLoadTypesInProcess ? (
          <Spinner />
        ) : countryServersLoadStatsData &&
          countryServersLoadStatsData.countryServersLoadStats &&
          countryServersLoadStatsData.countryServersLoadStats.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Country Name</th>
                <th>Total Servers</th>
                <th>Total VPN Connections</th>
                <th>Load Percentage (%)</th>
              </tr>
            </thead>
            <tbody>
              {countryServersLoadStatsData.countryServersLoadStats.map(
                (loadStat) => {
                  const myClass = classNames({
                    "bg-success bg-lighten-3": checkLowLoad(
                      loadStat.loadPercentage
                    ),
                    "bg-warning": checkMediumLoad(loadStat.loadPercentage),
                    "bg-danger": checkHighLoad(loadStat.loadPercentage),
                  });

                  return (
                    <tr key={loadStat._id} className={myClass}>
                      <td className="text-white">
                        <span className="align-middle font-weight-bold">
                          {loadStat._id}
                        </span>
                      </td>
                      <td className="text-white">{loadStat.country.name}</td>
                      <td className="text-white">{loadStat.totalServers}</td>
                      <td className="text-white">
                        {loadStat.totalVPNConnections}
                      </td>
                      <td className="text-white">{parseInt(loadStat.loadPercentage)}</td>
                    </tr>
                  );
                }
              )}
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

export default memo(ListServersLoadStats);
