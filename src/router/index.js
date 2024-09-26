import { createRouter, createWebHistory } from "vue-router";
import Register from "@/components/Register.vue";
import SignIn from "@/components/SignIn.vue";

const routes = [
    { path: "/register", component: Register },
    { path: "/sign-in", component: SignIn },
    { path: "/", redirect: "/sign-in" }, // Redirect to Sign In by default
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
