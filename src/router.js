import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mainview',
      component: () => import('./views/MainView.vue'),
      meta: { title: 'mainview' },
      children: [
        {
          path: '/mainview/introduction',
          name: 'introduction',
          component: () => import('./components/Introduction.vue'),
          meta: { title: 'Introduction' }
        },
        {
          path: '/mainview/resumen',
          name: 'resumen',
          component: () => import('./components/Resumen.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/mainview/HW_Diseno',
          name: 'HW_Diseno',
          component: () => import('./components/HW_Diseno.vue'),
          meta: { title: 'HW' }
        },
        {
          path: '/mainview/FW_IA',
          name: 'FW_IA',
          component: () => import('./components/FW_IA.vue'),
          meta: { title: 'FW' }
        },
        {
          path: '/mainview/Testing_IA',
          name: 'Testing_IA',
          component: () => import('./components/Testing_IA.vue'),
          meta: { title: 'Testing' }
        },
        {
          path: '/mainview/GestionDocumental',
          name: 'GestionDocumental',
          component: () => import('./components/GestionDocumental.vue'),
          meta: { title: 'GestionDocumental' }
        },
        {
          path: '/mainview/GestionPersonal',
          name: 'GestionPersonal',
          component: () => import('./components/GestionPersonal.vue'),
          meta: { title: 'GestionPersonal' }
        },
        {
          path: '/mainview/GestionCompañia',
          name: 'GestionCompañia',
          component: () => import('./components/GestionCompañia.vue'),
          meta: { title: 'GestionCompañia' }
        },
        {
          path: '/mainview/GestionIncidencias',
          name: 'GestionIncidencias',
          component: () => import('./components/GestionIncidencias.vue'),
          meta: { title: 'GestionIncidencias' }
        },
        {
          path: '/mainview/GestionBOM',
          name: 'GestionBOM',
          component: () => import('./components/GestionBOM.vue'),
          meta: { title: 'GestionBOM' }
        },
        {
          path: '/mainview/DescripcionDiseñoHW',
          name: 'DescripcionDiseñoHW',
          component: () => import('./components/DescripcionDiseñoHW.vue'),
          meta: { title: 'DescripcionDiseñoHW' }
        },
        {
          path: '/mainview/ConsultaBBDDNoSQL',
          name: 'ConsultaBBDDNoSQL',
          component: () => import('./components/ConsulaBBDDNoSQL.vue'),
          meta: { title: 'ConsultaBBDDNoSQL' }
        },
        {
          path: '/mainview/AutomatizacionTest',
          name: 'AutomatizacionTest',
          component: () => import('./components/AutomatizacionTest.vue'),
          meta: { title: 'AutomatizacionTest' }
        },
        {
          path: '/mainview/AWS',
          name: 'AWS',
          component: () => import('./components/AWS.vue'),
          meta: { title: 'AWS' }
        },
        {
          path: '/mainview/ChatBotWhatsapp',
          name: 'ChatBotWhatsapp',
          component: () => import('./components/ChatBotWhatsapp.vue'),
          meta: { title: 'ChatBotWhatsapp' }
        },
        {
          path: '/mainview/IncidenciasLlamadas',
          name: 'IncidenciasLlamadas',
          component: () => import('./components/IncidenciasLlamadas.vue'),
          meta: { title: 'IncidenciasLlamadas' }
        },
        {
          path: '/mainview/STM32_DL_IA',
          name: 'STM32_DL_IA',
          component: () => import('./components/STM32_DL_IA.vue'),
          meta: { title: 'STM32_DL_IA' }
        },
        {
          path: '/mainview/Check_Tests_IA',
          name: 'Check_Tests_IA',
          component: () => import('./components/Check_Tests_IA.vue'),
          meta: { title: 'Check_Tests_IA' }
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
  document.title = to.meta.title ? to.meta.title + ' | ' + 'Manager AI' : 'Manager AI'
  next()
})

export default router
