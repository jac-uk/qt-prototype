import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';
import ResetPassword from '@/views/ResetPassword';
import ConfirmResetPassword from '@/views/ConfirmResetPassword';

// Online Tests
import QualifyingTests from '@/views/QualifyingTests/QualifyingTests';
import QualifyingTest from '@/views/QualifyingTests/QualifyingTest';
import QualifyingTestInformation from '@/views/QualifyingTests/QualifyingTest/Information';
import QualifyingTestQuestion from '@/views/QualifyingTests/QualifyingTest/Question';
import QualifyingTestScenario from '@/views/QualifyingTests/QualifyingTest/Scenario';
import QualifyingTestReview from '@/views/QualifyingTests/QualifyingTest/Review';
import QualifyingTestSubmitted from '@/views/QualifyingTests/QualifyingTest/Submitted';

// Error pages
import NotFound from '@/views/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/online-tests',
    },
    {
      path: '*',
      component: NotFound,
      name: 'not-found',
      meta: {
        title: 'Error',
      },
    },
    {
      path: '/online-tests',
      component: QualifyingTests,
      name: 'qualifying-tests',
      meta: {
        requiresAuth: true,
        title: 'Online Tests | List',
      },
    },
    {
      path: '/online-tests/:qualifyingTestId',
      component: QualifyingTest,
      children: [
        {
          path: 'information',
          component: QualifyingTestInformation,
          name: 'qualifying-test-information',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Information',
          },
        },
        {
          path: 'question/:questionNumber',
          component: QualifyingTestQuestion,
          name: 'qualifying-test-question',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Question',
            fullPageMode: true,
          },
        },
        {
          path: 'scenario/:scenarioNumber/:questionNumber',
          component: QualifyingTestScenario,
          name: 'qualifying-test-scenario',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Scenario',
            fullPageMode: true,
          },
        },
        {
          path: 'review',
          component: QualifyingTestReview,
          name: 'qualifying-test-review',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Review',
            fullPageMode: true,
          },
        },
        {
          path: 'submitted',
          component: QualifyingTestSubmitted,
          name: 'qualifying-test-submitted',
          meta: {
            requiresAuth: true,
            title: 'Online Test | Submitted',
          },
        },
      ],
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        title: 'Sign In',
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        title: 'Create an account',
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        title: 'Reset your password',
      },
    },
    {
      path: '/confirm-reset-password',
      name: 'confirm-reset-password',
      component: ConfirmResetPassword,
      meta: {
        title: 'Confirm your password reset',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Global before guard to verify if a user can have access to other than sign-in pages.
// It redirects unauthorized users to a sign-in page.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isSignedIn = store.getters['auth/isSignedIn'];
  if (requiresAuth && !isSignedIn) {
    // @todo Save destination so we can navigate there after sign-in
    return next({ name: 'sign-in' });
  } else {
    return next();
  }
});

// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | Judicial Appointments Commission`;
});

export default router;
