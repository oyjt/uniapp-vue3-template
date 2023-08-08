let baseUrl = '/dev-api'
if (process.env.NODE_ENV === 'production') {
  imageUrl = '/prod-api'
}

export default {
  baseUrl
}