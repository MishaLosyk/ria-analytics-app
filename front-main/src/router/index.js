import Vue from "vue";
import VueRouter from "vue-router";
import Constructor from "../views/Constructor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Constructor",
    component: Constructor,
  },
  {
    path: "/admin",
    name: "Admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
  },
  {
    // path: "/user/:user_id",
    path: "/user",
    name: "User",
    // props: true,
    component: () => import("../views/User.vue"),
  }
];

const router = new VueRouter({
  routes,
});

export default router;
