const BASE = "/api/travel";
const CLIENT_ID = "demo-aigerim";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

export const api = {
  clientId: CLIENT_ID,
  getStatus: () => request(`/status/${CLIENT_ID}`),
  activate: (consent) =>
    request("/activate", { method: "POST", body: JSON.stringify({ clientId: CLIENT_ID, consent }) }),
  deactivate: () => request("/deactivate", { method: "POST", body: JSON.stringify({ clientId: CLIENT_ID }) }),
  getBranches: () => request("/branches"),
  getFaq: (lang) => request(`/faq?lang=${lang}`),
  convert: (amountKzt) => request("/convert", { method: "POST", body: JSON.stringify({ amountKzt }) }),
  getTransactions: () => request(`/transactions/${CLIENT_ID}`),
};
