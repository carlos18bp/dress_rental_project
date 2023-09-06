import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

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

export async function create_request(url, params) {
  return await makeRequest("POST", url, params);
}

export async function edit_request(url, params) {
  return await makeRequest("PUT", url, params);
}

export async function get_request(url) {
  return await makeRequest("GET", url);
}

export async function delete_request(url) {
  return await makeRequest("DELETE", url);
}

export async function update_request(url) {
  return await makeRequest("PUT", url);
}
