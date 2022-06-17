import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/List",
      name: "List",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/List.vue")
    },
    {
      path: "/Cart",
      name: "Cart",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Cart.vue")
    },
    {
      path: "/My",
      name: "My",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/My.vue")
    }
  ]
});
