import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/authView.vue';
import HomeView from '../views/homeView.vue';
import DashboardView from '../views/dashboardView.vue';
import SchedulePage from '../components/Schedule/schedulePage.vue';
import NotFound from '../components/utils/notFound.vue';
import { supabase } from '../utils/supabase';
import { checkAuthStatus } from '../composables/useAuth';
import { getSchedules } from '../services/schedule';

const routes = [
    { path: '/', component: HomeView },
    { path: '/auth', component: AuthView },
    { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/dashboard/:scheduleId', name: 'SchedulePage', component: SchedulePage, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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
    } else if (to.name === 'SchedulePage') {
        const schedules = await getSchedules();
        if (user) {
            const schedule = schedules.find(s => s.id === to.params.scheduleId && s.user_id === user.id);
            if (!schedule) {
                next({ name: 'NotFound' });
            } else {
                next();
            }
        } else {
            next('/auth');
        }
    } else {
        next();
    }
});

export default router;