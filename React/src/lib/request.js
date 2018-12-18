/* eslint-disable no-param-reassign */
import 'isomorphic-fetch'

const codeMessage = {
  200: 'Success',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  415: 'Unsupported Media Type',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
}

class ResponseError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const formData = obj =>
  Object.keys(obj).reduce((data, key) => {
    data.append(key, obj[key])
    return data
  }, new FormData())

/**
 * Encode a javascript object into a query string
 * @param obj
 * @returns {string} query string
 */
const serialize = query =>
  Object.keys(query)
    .filter(key => query[key] !== null && query[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&')

const isOk = response => response.status >= 200 && response.status < 300

const isJson = (response) => {
  if (response.status === 204) {
    return false
  }

  if (response.headers.get('content-length') === '0') {
    return false
  }

  const type = response.headers.get('content-type')
  return (
    // @see https://github.com/vivedu/VIVEDU-Store/issues/474
    (type && type.indexOf('application/json') !== -1) ||
    type.indexOf('text/plain') !== -1
  )
}

const checkStatus = (response) => {
  if (isOk(response)) return response

  const errorMessage = codeMessage[response.status] || 'Failed'
  const error = new ResponseError(response.status, errorMessage)

  throw error
}

export const defaultConfig = {
  method: 'GET',
  credentials: 'include',
  baseUrl: '',
  headers: null,
}

/**
 * HTTP
 *
 * 带有参数的 GET 请求：
 *   http('/api/messages', {query: {limit: 10}})
 *
 * 表单提交：
 *   http('/api/user/create', {method: 'POST', form: {name: "vivedu"}})
 *   http('/api/user/create', {method: 'POST', form: new FormData})
 *   http('/api/user/create', {method: 'POST', body: new FormData})
 *
 * Restful JSON 请求：
 *   http('/api/users', {method: 'POST', body: {name: 'vivedu'}})
 */
const request = (url, options = {}) => {
  options = Object.assign({}, defaultConfig, options, {
    headers: {
      ...defaultConfig.headers,
      ...options.headers,
      accept: 'application/json, text/plain, */*',
    },
  })

  if (typeof options.query === 'object') {
    url += (url.indexOf('?') === -1 ? '?' : '') + serialize(options.query)
    delete options.query
  }

  if (
    options.body &&
    typeof options.body !== 'string' &&
    !(options.body instanceof FormData) &&
    (options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH')
  ) {
    options.body = JSON.stringify(options.body)
    Object.assign(options.headers, {
      'Content-Type': 'application/json',
    })
  }

  if (options.form) {
    options.body =
      options.form instanceof FormData ? options.form : formData(options.form)
    delete options.form
  }

  return fetch(
    url.startsWith('http') || url.startsWith('//')
      ? url
      : defaultConfig.baseUrl + url,
    options
  )
    .then(checkStatus)
    .then(
      // eslint-disable-next-line no-confusing-arrow
      response =>
        // @see https://github.com/vivedu/VIVEDU-Store/issues/24
        isJson(response)
          ? response.json().then((data) => {
              // @see https://github.com/vivedu/VIVEDU-Store/issues/474
            if (!data.errcode) return data

            throw new ResponseError(data.errcode, data.errormsg)
          })
          : response.text()
    )
    .catch(error => Promise.reject(error))
}

export default request
