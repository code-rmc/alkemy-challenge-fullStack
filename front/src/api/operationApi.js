export default async function apiCall({ token, method, body: data, id }) {
  const path = "http://localhost:4000/api/operation" + (id ? `/${id}` : "");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    mode: "no-cors",
    Authorization: "Bearer " + token, // + JWT
  };
  return await fetch(path, {
    method,
    headers,
    body: JSON.stringify(data),
  });
}
