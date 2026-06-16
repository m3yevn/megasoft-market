const API = "/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const api = {
  login: (username: string, password: string) =>
    request("/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  validateToken: (token: string) =>
    request("/token", { method: "POST", body: JSON.stringify({ token }) }),
  getPromotions: () => request("/promotions"),
  getPromotion: (id: string) => request(`/promotions?id=${id}`),
  getProducts: () => request("/products"),
  getProduct: (id: string) => request(`/products/${id}`),
  submitTxn: (productId: string, creditTo: Record<string, string>) =>
    request("/transactions", {
      method: "POST",
      body: JSON.stringify({ productId, creditTo }),
    }),
  getDonation: () => request("/donation"),
};
