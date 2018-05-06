import fetch from "isomorphic-fetch";

const commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const fetchUserPriceRules = (token, id) => {
  const endpoint = `/getuser/${id}`;
  const extraHeaders = { Authorization: `${token}` };
  const payload = {
    method: "GET",
    headers: { ...commonHeaders, ...extraHeaders }
  };
  return handleRequest(endpoint, payload);
};

const handleRequest = (endpoint, payload) => {
  const requestUrl = `http://localhost:4000/api/v1${endpoint}`;
  return fetch(requestUrl, payload).then(res => res.json());
};
