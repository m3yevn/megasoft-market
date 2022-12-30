import Vue from "vue";
import Router from "vue-router";
import loginService from "./services/login-service";

Vue.use(Router);

export const authContext = {};

const getAuthUser = (token) => {
  const user = {};
  const dataContents = token.split("|");
  dataContents.map((dataString) => {
    const [key, value] = dataString.split("==>");
    user[key] = value;
  });

  return { ...user };
};

const checkAuthenticated = async () => {
  const token = localStorage.getItem("token");
  const isAuthenticated =
    !!authContext.user || (await loginService.validateToken(token));
  return [isAuthenticated, token];
};

const authGuard = async (to, _, next) => {
  const [isAuthenticated, token] = await checkAuthenticated();
  if (!isAuthenticated) {
    next({ path: "/login" });
  } else {
    authContext.user = getAuthUser(token);
    if (authContext?.user?.type === "admin") {
      return next({ path: "/admin" });
    }
    next();
  }
};

const adminGuard = async (to, _, next) => {
  const [isAuthenticated, token] = await checkAuthenticated();
  if (!isAuthenticated) {
    next({ path: "/login" });
  } else {
    authContext.user = getAuthUser(token);
    if (authContext?.user?.type !== "admin") {
      return next({ path: "/" });
    }
    next();
  }
};

const loginGuard = async (to, _, next) => {
  const [isAuthenticated] = await checkAuthenticated();
  if (isAuthenticated) {
    next({ path: "/" });
  } else {
    next();
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./views/public/Home.vue"),
      beforeEnter: authGuard,
      children: [
        {
          path: "/",
          name: "dashboard",
          component: () => import("./views/public/Dashboard.vue"),
        },
        {
          path: "/promotions/:id",
          name: "promotion",
          component: () => import("./views/public/Promotion.vue"),
        },
        {
          path: "/products/:id",
          name: "product",
          component: () => import("./views/public/Product.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
      beforeEnter: loginGuard,
    },
    {
      path: "/admin",
      component: () => import("./views/admin/Home.vue"),
      beforeEnter: adminGuard,
      children: [
        {
          path: "/",
          name: "admin-dashboard",
          component: () => import("./views/admin/Dashboard.vue"),
        },
        {
          path: "/admin/products/:id",
          name: "admin-product",
          component: () => import("./views/admin/Product.vue"),
        },
      ],
    },
    {
      path: "*",
      component: () => import("./views/NotFound.vue"),
    },
  ],
});
