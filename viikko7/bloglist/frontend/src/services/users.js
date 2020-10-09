import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/users'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, getConfig())
  return request.then(response => response.data)
}

export default { getAll }