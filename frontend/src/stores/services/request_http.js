import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

/**
 * Request endpoint
 * @param {string} method - Type request.
 * @param {string} url - Endpoint
 * @param {object} params - Params.
 * @returns {object} - Data and status from endpoint.
 */
async function makeRequest(method, url, params = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;
      case "POST":
        response = await axios.post(url, params, { headers });
        break;
      case "PUT":
        response = await axios.put(url, params, { headers });
        break;
      case "DELETE":
        response = await axios.delete(url);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Create request.
 * @param {string} url - Endpoint.
 * @param {object} params - Params.
 * @returns {object} - Data and status from endpoint.
 */
export async function create_request(url, params) {
  return await makeRequest("POST", url, params);
}

/**
 * Edit request.
 * @param {string} url - Endpoint.
 * @param {object} params - Params.
 * @returns {object} - Data and status from endpoint.
 */
export async function edit_request(url, params) {
  return await makeRequest("PUT", url, params);
}

/**
 * Get request.
 * @param {string} url - Endpoint.
 * @returns {object} - Data and status from endpoint.
 */
export async function get_request(url) {
  return await makeRequest("GET", url);
}

/**
 * Delete request.
 * @param {string} url - Endpoint.
 * @returns {object} - Data and status from endpoint.
 */
export async function delete_request(url) {
  return await makeRequest("DELETE", url);
}

/**
 * Update request.
 * @param {string} url - Endpoint.
 * @returns {object} - Data and status from endpoint.
 */
export async function update_request(url) {
  return await makeRequest("PUT", url);
}
