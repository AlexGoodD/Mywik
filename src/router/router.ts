import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/authView.vue'
import NotFound from '../components/utils/notFound.vue'
import DashboardView from '../views/dashboardView.vue'
import SchedulePage from '@/components/schedule/pageSchedule.vue'
import { supabase } from '../utils/supabase'
import { checkAuthStatus } from '../composables/useAuth'
import { getSchedules } from '../services/schedule'

const routes = [
    {
        path: '/',
        component: AuthView,
        meta: { layout: 'none' }
    },
    {
        path: '/dashboard',
        component: DashboardView,
        meta: { layout: 'default', title: 'Dashboard', requiresAuth: true, showTopbar: true }
    },
    {
        path: '/dashboard/schedule/:scheduleId',
        name: 'SchedulePage',
        component: SchedulePage,
        meta: { layout: 'default', requiresAuth: true, title: 'Schedule Detail', showTopbar: false }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { layout: 'none' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _, next) => {
    await checkAuthStatus();
    const { data: { user } } = await supabase.auth.getUser();
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
        next('/');
    } else if (user && to.path === '/') {
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
            next('/');
        }
    } else {
        next();
    }
});

export default router;