export default async function ({ uri, method = "GET", body }) {
  return fetch(uri, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
      try {
        return response.json();
      } catch (e) {
        return true;
      }
    }
    const errorMsg = [response.status, await response.json()];
    return errorMsg;
  });
}
