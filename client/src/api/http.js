import axios from "axios";

const BASE_URL = "http://localhost:5000";

const successHandler = response => response.data;

const errorHandler = error => console.log(error);

export const generateHttpHandler = (handler, onSuccess = successHandler, onError = errorHandler) =>
    handler
        .then(onSuccess)
        .catch(onError);

export const Http = {
  get(url, config) {
    return generateHttpHandler(axios.get(url, config))
  },
  post(url, data, config) {
    return generateHttpHandler(axios.post(url, data, config))
  },
  put(url, data, config) {
    return generateHttpHandler(axios.put(url, data, config))
  },
  delete(url, config) {
    return generateHttpHandler(axios.delete(url, config))
  }
};

export default {
  getAllEmployees: () => Http.get(`${BASE_URL}/employees`),
  getEmployeeById: id => Http.get(`${BASE_URL}/employees:${id}`),
  updateEmployee: (id, employee) => Http.put(`${BASE_URL}/employees:${id}`, employee),
  createEmployee: employee => Http.post(`${BASE_URL}/employees`, employee),
  deleteEmployee: id => Http.delete(`${BASE_URL}/employees:${id}`),
  searchEmployees: query => Http.post(`${BASE_URL}/employees/search`, {query: query})
};