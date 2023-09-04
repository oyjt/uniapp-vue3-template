let baseUrl = '/dev-api'
if (process.env.NODE_ENV === 'production') {
  baseUrl = '/prod-api'
}

export default {
  baseUrl
}
