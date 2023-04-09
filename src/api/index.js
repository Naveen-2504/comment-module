export default async function ({  uri, method = "GET", body }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(apiUrl + uri, {
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
