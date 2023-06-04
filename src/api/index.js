export * as analyzeApi from './analyze.js';
export * as userbookApi from './userbook.js';
export * as marketApi from './marketing.js';
export * as compareApi from './compare.js';
export * as raredataApi from './raredata.js';

const API_URL = 'http://localhost:8000'
// const API_URL = 'https://donghua.website:8008'

export function get (path,data) {
    return request(`${API_URL}/${path}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export function post (path, data) {
    return request(`${API_URL}/${path}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export function put (path, data) {
    return request(`${API_URL}/${path}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export function del (path) {
    return request(`${API_URL}/${path}`, {
        method: 'DELETE'
    })
}

export function request (url, options) {
  return fetch(url, options).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  })
}