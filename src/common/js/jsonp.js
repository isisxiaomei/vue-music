import jsonp from 'jsonp'


const params = (data) => {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.subString(1) : ''
}

export default function JsonP (url, data, option) {
  url += (url.indexOf('?') !== -1 ? '&' : '?') + param(data)
  return new Promise((resolve, reject) => {
    jsonp(url, option, (error, data) => {
      if (!error) {
        resolve(data)
      } else {
        reject(error)
      }
    })
  })
}

