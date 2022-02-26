export default async function apiCall({ method, body: data }) {
  const path = "http://localhost:4000/api/auth/login";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return await fetch(path, {
    method,
    headers,
    body: JSON.stringify(data),
  });
}
