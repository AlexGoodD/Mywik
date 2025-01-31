import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/authView.vue';
import HomeView from '../views/homeView.vue';
import DashboardView from '../views/dashboardView.vue';
import { supabase } from '../utils/supabase';
import { checkAuthStatus } from '../composables/useAuth';

const routes = [
    { path: '/', component: HomeView },
    { path: '/auth', component: AuthView },
    { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    await checkAuthStatus();
    const { data: { user } } = await supabase.auth.getUser();
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
        next('/auth');
    } else if (user && to.path === '/auth') {
        next('/');
    } else {
        next();
    }
});

export default router;