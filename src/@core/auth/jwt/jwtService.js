import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
import dotenv from 'dotenv'

dotenv.config()

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    axios.interceptors.request.use(
      config => {
        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error
        if (response && response.status === 406) {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  registerAdmin(data) {
    return axios.post(this.jwtConfig.registerAdminEndpoint, data)
  }

  getProfile() {
    return axios.get(this.jwtConfig.getOwnProfileEndPoint)
  }

  updateProfile(data) {
    return axios.put(this.jwtConfig.updateOwnProfileEndPoint, data)
  }

  updatePassword(data) {
    return axios.put(this.jwtConfig.updatePasswordEndPoint, data)
  }

  getAdmin(id) {
    const endPoint = `${this.jwtConfig.getAdminEndPoint}${id}`
    return axios.get(endPoint)
  }

  getAdmins(page, limit, searchKeyword = null) {
    let endPoint = `${this.jwtConfig.getAdminsEndPoint}?page=${page}&limit=${limit}`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint)
  }

  updateAdmin(id, data) {
    const endPoint = `${this.jwtConfig.updateAdminEndPoint}${id}`
    return axios.put(endPoint, data)
  }

  deleteAdmin(id) {
    const endPoint = `${this.jwtConfig.deleteAdminEndPoint}${id}`
    return axios.delete(endPoint)
  }

  getSupportTickets(page, limit, severityFilter, statusFilter, searchKeyword) {
    let endPoint = `${this.jwtConfig.getSupportTicketsEndPoint}?page=${page}&limit=${limit}`
    if (severityFilter) {
      endPoint = `${endPoint}&severity=${severityFilter}`
    }
    if (statusFilter) {
      endPoint = `${endPoint}&status=${statusFilter}`
    }
    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint)
  }

  closeSupportTicket(id) {
    const endPoint = `${this.jwtConfig.closeSupportTicketEndPoint}${id}`
    return axios.put(endPoint, {})
  }

  getAdSettings() {

    const endPoint = `${this.jwtConfig.getAdSettingsEndPoint}`
    return axios.get(endPoint)
  }

  updateAdSettings(data) {

    const endPoint = `${this.jwtConfig.updateAdSettingsEndPoint}`
    return axios.put(endPoint, data)
  }

  getPaymentSettings() {

    const endPoint = `${this.jwtConfig.getPaymentSettingsEndPoint}`
    return axios.get(endPoint)
  }

  updatePaymentSettings(data) {

    const endPoint = `${this.jwtConfig.updatePaymentSettingsEndPoint}`
    return axios.put(endPoint, data)
  }

  getInAppUpdateSettings() {

    const endPoint = `${this.jwtConfig.getInAppUpdateSettingsEndPoint}`
    return axios.get(endPoint)
  }

  updateInAppUpdateSettings(data) {

    const endPoint = `${this.jwtConfig.updateInAppUpdateSettingsEndPoint}`
    return axios.put(endPoint, data)
  }

  getBlockedAppsSettings() {

    const endPoint = `${this.jwtConfig.getBlockedAppsSettingsEndPoint}`
    return axios.get(endPoint)
  }
  updateBlockedAppsSettings(data) {

    const endPoint = `${this.jwtConfig.updateBlockedAppsSettingsEndPoint}`
    return axios.put(endPoint, data)
  }

  addSSHKey(data) {

    const endPoint = `${this.jwtConfig.addSSHKeyEndPoint}`
    return axios.post(endPoint, data)
  }

  getPlans() {
    const endPoint = `${this.jwtConfig.getPlansEndPoint}`
    return axios.get(endPoint)
  }

  getTransactions(
    page,
    limit,
    modeFilter,
    statusFilter,
    planIdFilter,
    transactionTimeFromFilter,
    transactionTimeToFilter,
    searchKeyword
  ) {
    let endPoint = `${this.jwtConfig.getTransactionsEndPoint}?page=${page}&limit=${limit}`

    if (modeFilter) {
      endPoint = `${endPoint}&mode=${modeFilter}`
    }

    if (statusFilter) {
      endPoint = `${endPoint}&status=${statusFilter}`
    }

    if (planIdFilter) {
      endPoint = `${endPoint}&planId=${planIdFilter}`
    }

    if (transactionTimeFromFilter) {
      endPoint = `${endPoint}&transactionTimeFrom=${transactionTimeFromFilter}`
    }

    if (transactionTimeToFilter) {
      endPoint = `${endPoint}&transactionTimeTo=${transactionTimeToFilter}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint)
  }

  addPlan(data) {
    const endPoint = `${this.jwtConfig.addPlanEndPoint}`
    return axios.post(endPoint, data)
  }

  deletePlan(id) {
    const endPoint = `${this.jwtConfig.deletePlanEndPoint}/${id}`
    return axios.delete(endPoint)
  }

  getPlan(id) {
    const endPoint = `${this.jwtConfig.getPlanEndPoint}/${id}`
    return axios.get(endPoint)
  }

  updatePlan(data, id) {
    const endPoint = `${this.jwtConfig.updatePlanEndPoint}/${id}`
    return axios.patch(endPoint, data)
  }

  getCountries(page, limit, continentFilterValue, searchKeyword) {

    let endPoint = `${this.jwtConfig.getCountriesEndPoint}?page=${page}&limit=${limit}&detail=full`

    if (continentFilterValue) {
      endPoint = `${endPoint}&continent=${continentFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint)
  }

  getAllCountries(limit) {

    const endPoint = `${this.jwtConfig.getCountriesEndPoint}?limit=${limit}&detail=short`

    return axios.get(endPoint)
  }

  getContinents() {
    return axios.get(this.jwtConfig.getContinentsEndPoint)
  }

  getCities(page, limit, continentFilter, countryIdFilter, searchKeyword) {

    let endPoint = `${this.jwtConfig.getCitiesEndPoint}?page=${page}&limit=${limit}&detail=full`

    if (continentFilter) {
      endPoint = `${endPoint}&continent=${continentFilter}`
    }

    if (countryIdFilter) {
      endPoint = `${endPoint}&countryId=${countryIdFilter}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint)
  }

  addCity(data) {
    return axios.post(this.jwtConfig.addCityEndPoint, data)
  }

  getCity(id) {
    const endPoint = `${this.jwtConfig.getCityEndPoint}/${id}`
    return axios.get(endPoint)
  }

  updateCity(data, id) {

    const endPoint = `${this.jwtConfig.updateCityEndPoint}/${id}`
    return axios.patch(endPoint, data)
  }

  getSubscriptions(
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
  ) {

    let endPoint = `${this.jwtConfig.getSubscriptionsEndPoint}?page=${page}&limit=${limit}`

    if (statusFilter) {
      endPoint = `${endPoint}&status=${statusFilter}`
    }

    if (autoRenewalFilter !== "") {
      endPoint = `${endPoint}&autoRenewal=${autoRenewalFilter}`
    }

    if (onTrialFilter !== "") {
      endPoint = `${endPoint}&onTrial=${onTrialFilter}`
    }

    if (planIdFilter) {
      endPoint = `${endPoint}&planId=${planIdFilter}`
    }

    if (startTimeFromFilter) {
      endPoint = `${endPoint}&startTimeFrom=${startTimeFromFilter}`
    }

    if (startTimeToFilter) {
      endPoint = `${endPoint}&startTimeTo=${startTimeToFilter}`
    }

    if (expiryTimeFromFilter) {
      endPoint = `${endPoint}&expiryTimeFrom=${expiryTimeFromFilter}`
    }

    if (expiryTimeToFilter) {
      endPoint = `${endPoint}&expiryTimeTo=${expiryTimeToFilter}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint)
  }

  disableSubscription(customerId) {
    const endPoint = `${this.jwtConfig.disableSubscriptionsEndPoint}/${customerId}`
    return axios.put(endPoint, {})
  }

  enableSubscription(customerId) {
    const endPoint = `${this.jwtConfig.enableSubscriptionsEndPoint}/${customerId}`
    return axios.put(endPoint, {})
  }

  getCloudProviders() {
    return axios.get(this.jwtConfig.getCloudProvidersEndPoint)
  }

  getContinentsWithCloudId(cloudId) {
    const endPoint = `${this.jwtConfig.getContinentsEndPointCloudId}/${cloudId}`

    return axios.get(endPoint)
  }

  getCountriesByContinent(cloudId, continent) {
    const endPoint = `${this.jwtConfig.getCountriesByContinentEndPoint}/${cloudId}/${continent}`
    return axios.get(endPoint)
  }

  getCitiesByCountry(cloudId, countryId) {
    const endPoint = `${this.jwtConfig.getCitiesByCountryEndPoint}/${cloudId}/${countryId}`
    return axios.get(endPoint)
  }

  getRegionsByCity(countryId, cityId) {
    const endPoint = `${this.jwtConfig.getRegionsByCityEndPoint}/${countryId}/${cityId}`
    return axios.get(endPoint)
  }

  getInstancesByRegion(cloudId, regionId, instanceType) {
    const endPoint = `${this.jwtConfig.getInstancesByRegionEndPoint}/${cloudId}/${regionId}/${instanceType}`
    return axios.get(endPoint)
  }

  getInstanceSummary(cloudId, regionId, instanceType, instanceId) {
    const endPoint = `${this.jwtConfig.getInstanceSummaryEndPoint}/${cloudId}/${regionId}/${instanceType}/${instanceId}`
    return axios.get(endPoint)
  }

  getImages(id, region) {
    const endPoint = `${this.jwtConfig.getImagesEndPoint}/${id}/${region}`
    return axios.get(endPoint)
  }

  getDNSProviders() {
    return axios.get(this.jwtConfig.getDNSProvidersEndPoint)
  }

  addServer(data) {
    return axios.post(this.jwtConfig.addServerEndPoint, data)
  }

  getServers(
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
  ) {

    let endPoint = `${this.jwtConfig.getServersEndPoint}?page=${page}&limit=${limit}`

    if (countryIdFilter) {
      endPoint = `${endPoint}&countryId=${countryIdFilter}`
    }

    if (cloudIdFilter) {
      endPoint = `${endPoint}&cloudId=${cloudIdFilter}`
    }

    if (instanceTypeFilter) {
      endPoint = `${endPoint}&instanceType=${instanceTypeFilter}`
    }

    if (typeFilter) {
      endPoint = `${endPoint}&type=${typeFilter}`
    }

    if (accessTypeFilter) {
      endPoint = `${endPoint}&accessType=${accessTypeFilter}`
    }

    if (protocolFilter) {
      endPoint = `${endPoint}&protocol=${protocolFilter}`
    }

    if (statusFilter) {
      endPoint = `${endPoint}&status=${statusFilter}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint)
  }

  startServer(id) {
    const endPoint = `${this.jwtConfig.startServerEndPoint}/${id}`
    return axios.put(endPoint, {})
  }

  stopServer(id) {
    const endPoint = `${this.jwtConfig.stopServerEndPoint}/${id}`
    return axios.put(endPoint, {})
  }

  getCustomers(page, limit, keyword) {
    let endPoint = `${this.jwtConfig.getCustomersEndPoint}?page=${page}&limit=${limit}`

    if (keyword) {
      endPoint = `${endPoint}&searchKeyword=${keyword}`
    }
    return axios.get(endPoint)
  }

  getSubscriptionDetails(id, subscriptionStatus) {

    const endPoint = `${this.jwtConfig.getCustomersEndPoint}?customerId=${id}&subscription=true&subscriptionStatus=${subscriptionStatus}`
    return axios.get(endPoint)
  }

  getCustomerDetails(id, subscriptionStatus) {

    const endPoint = `${this.jwtConfig.getCustomersEndPoint}?customerId=${id}&subscription=true&subscriptionStatus=${subscriptionStatus}`
    return axios.get(endPoint)
  }

  getVPNConnectionLogs(
    page,
    limit,
    continentFilter,
    countryIdFilter,
    protocolFilter,
    connectionTimeFromFilter,
    connectionTimeToFilter,
    searchKeyword
  ) {

    let endPoint = `${this.jwtConfig.getVPNConnectionLogsEndPoint}?page=${page}&limit=${limit}`

    if (continentFilter) {
      endPoint = `${endPoint}&continent=${continentFilter}`
    }

    if (countryIdFilter) {
      endPoint = `${endPoint}&countryId=${countryIdFilter}`
    }

    if (protocolFilter) {
      endPoint = `${endPoint}&protocol=${protocolFilter}`
    }

    if (connectionTimeFromFilter) {
      endPoint = `${endPoint}&connectionTimeFrom=${connectionTimeFromFilter}`
    }

    if (connectionTimeToFilter) {
      endPoint = `${endPoint}&connectionTimeTo=${connectionTimeToFilter}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }
    return axios.get(endPoint)
  }

  getConnectionLogsDetails(id, page, limit) {

    let endPoint = `${this.jwtConfig.getConnectionLogsEndPoint}?customerId=${id}`

    if (page & limit) {
      endPoint = `${endPoint}&page=${page}&limit=${limit}`
    }

    return axios.get(endPoint)
  }

  getSupportTicketsDetails(id, page, limit) {

    let endPoint = `${this.jwtConfig.defaultSupportTicketsEndPoint}?customerId=${id}`

    if (page && limit) {
      endPoint = `${endPoint}&page=${page}&limit=${limit}`
    }

    return axios.get(endPoint)
  }

  getTransactionDetails(id, page, limit) {

    let endPoint = `${this.jwtConfig.getTransactionsEndPoint}?customerId=${id}`

    if (page && limit) {
      endPoint = `${endPoint}&page=${page}&limit=${limit}`
    }

    return axios.get(endPoint)
  }

  getPendingCustomers(page, limit, searchKeyword) {

    let endPoint = `${this.jwtConfig.getCustomersEndPoint}?page=${page}&limit=${limit}&subscription=false&type=anonymous`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint)
  }

  getCompletedCustomers(page, limit, subscriptionStatus, planIdFilterValue, searchKeyword) {

    let endPoint = `${this.jwtConfig.getCustomersEndPoint}?page=${page}&limit=${limit}&subscription=true&subscriptionStatus=${subscriptionStatus}&type=registered`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    if (planIdFilterValue) {
      endPoint = `${endPoint}&subscriptionPlanId=${planIdFilterValue}`
    }

    return axios.get(endPoint)
  }

  getServerLoadTypes() {
    return axios.get(this.jwtConfig.getServerLoadTypesEndPoint)
  }

  getCountryServersLoadStats(
    page,
    limit,
    loadTypeIdFilter,
    countryIdFilter,
    cloudIdFilter,
    instanceTypeFilter,
    accessTypeFilter,
    protocolFilter,
    searchKeyword
  ) {

    let endPoint = `${this.jwtConfig.getCountryServersLoadStatsEndPoint}?page=${page}&limit=${limit}`

    if (loadTypeIdFilter) {
      endPoint = `${endPoint}&loadTypeId=${loadTypeIdFilter}`
    }

    if (countryIdFilter) {
      endPoint = `${endPoint}&countryId=${countryIdFilter}`
    }

    if (cloudIdFilter) {
      endPoint = `${endPoint}&cloudId=${cloudIdFilter}`
    }

    if (instanceTypeFilter) {
      endPoint = `${endPoint}&instanceType=${instanceTypeFilter}`
    }

    if (accessTypeFilter) {
      endPoint = `${endPoint}&accessType=${accessTypeFilter}`
    }

    if (protocolFilter) {
      endPoint = `${endPoint}&protocol=${protocolFilter}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint)
  }

  getMainVpnProtocols() {
    return axios.get(this.jwtConfig.getMainVpnProtocolsEndPoint)
  }

  getVpnProtocols() {
    return axios.get(this.jwtConfig.getMainVpnProtocolsEndPoint)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }

  getStats() {
    return axios.get(this.jwtConfig.getStatsEndPoint)
  }
}