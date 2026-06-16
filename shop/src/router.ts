import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import ProductView from "./views/ProductView.vue";
import PromotionView from "./views/PromotionView.vue";
import Donation from "./views/Donation.vue";

const router = createRouter({
  history: createWebHistory("/app/"),
  routes: [
    { path: "/login", name: "login", component: Login },
    { path: "/donation", name: "donation", component: Donation },
    { path: "/", name: "dashboard", component: Dashboard, meta: { auth: true } },
    { path: "/products/:id", name: "product", component: ProductView, meta: { auth: true } },
    { path: "/promotions/:id", name: "promotion", component: PromotionView, meta: { auth: true } },
  ],
});

router.beforeEach(async (to) => {
  if (!to.meta.auth) return true;
  const token = localStorage.getItem("token");
  if (!token) return { name: "login" };
  try {
    const { api } = await import("./api");
    const { isValid } = await api.validateToken(token);
    if (!isValid) {
      localStorage.removeItem("token");
      return { name: "login" };
    }
  } catch {
    return { name: "login" };
  }
  return true;
});

export default router;
