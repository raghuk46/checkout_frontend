import fetch from "isomorphic-fetch";

const commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const authenticate = body => {
  const endpoint = "/login";
  const payload = {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify(body)
  };
  return handleRequest(endpoint, payload);
};

const handleRequest = (endpoint, payload) => {
  const requestUrl = `http://localhost:4000/api/v1${endpoint}`;
  return fetch(requestUrl, payload).then(res => res.json());
};
