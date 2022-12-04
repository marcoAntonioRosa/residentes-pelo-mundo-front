import { createRouter, createWebHistory } from "vue-router";

import Home from './views/Home.vue';
import Company from './views/Company.vue';
import Login from './views/Login.vue';
import Testimony from './views/Testimony.vue';
import User from './views/User.vue';
import UserUpdateSingle from './views/UserUpdateSingle.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/company',
        name: 'company',
        component: Company
    },
    {
        path: '/testimony',
        name: 'testimony',
        component: Testimony
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/user/:id',
        name: 'userId',
        component: UserUpdateSingle
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;