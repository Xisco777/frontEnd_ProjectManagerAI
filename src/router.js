import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { title: '' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { title: 'Home' }
    },
    {
      path: '/examples',
      name: 'examples',
      component: () => import('./views/Examples.vue'),
      meta: { title: 'Examples' },
      children: [
        {
          path: '/examples/introduction',
          name: 'introduction',
          component: () => import('./components/Introduction.vue'),
          meta: { title: 'Introduction' }
        },
        {
          path: '/examples/helloworld',
          name: 'helloworld',
          component: () => import('./components/HelloWorld.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/examples/HW_Diseno',
          name: 'HW_Diseno',
          component: () => import('./components/HW_Diseno.vue'),
          meta: { title: 'HW' }
        },
        {
          path: '/examples/FW_IA',
          name: 'FW_IA',
          component: () => import('./components/FW_IA.vue'),
          meta: { title: 'FW' }
        },
        {
          path: '/examples/Testing_IA',
          name: 'Testing_IA',
          component: () => import('./components/Testing_IA.vue'),
          meta: { title: 'Testing' }
        },
        {
          path: '/examples/GestionDocumental',
          name: 'GestionDocumental',
          component: () => import('./components/GestionDocumental.vue'),
          meta: { title: 'GestionDocumental' }
        },
        {
          path: '/examples/GestionPersonal',
          name: 'GestionPersonal',
          component: () => import('./components/GestionPersonal.vue'),
          meta: { title: 'GestionPersonal' }
        },
        {
          path: '/examples/GestionCompañia',
          name: 'GestionCompañia',
          component: () => import('./components/GestionCompañia.vue'),
          meta: { title: 'GestionCompañia' }
        },
        {
          path: '/examples/GestionIncidencias',
          name: 'GestionIncidencias',
          component: () => import('./components/GestionIncidencias.vue'),
          meta: { title: 'GestionIncidencias' }
        },
        {
          path: '/examples/GestionBOM',
          name: 'GestionBOM',
          component: () => import('./components/GestionBOM.vue'),
          meta: { title: 'GestionBOM' }
        },
        {
          path: '/examples/DescripcionDiseñoHW',
          name: 'DescripcionDiseñoHW',
          component: () => import('./components/DescripcionDiseñoHW.vue'),
          meta: { title: 'DescripcionDiseñoHW' }
        }
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('./views/NotFound.vue'),
      meta: { title: 'Notfound' }
    }
  ]
})

// router guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title + ' | ' + 'Vue D3 V5 Examples' : 'Vue D3 V5 Examples'
  next()
})

export default router
