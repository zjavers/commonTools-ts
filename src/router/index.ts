import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
// import { setupPageGuard } from './permission'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta:{title:'首页'},
  },
  {
    path: '/data8583',
    name: 'data8583',
    component: () => import('@/views/tools/Data8583.vue'),
    meta:{title:'8583报文解析'},
  },
  {
    path: '/param',
    name: 'param',
    component: () => import('@/views/tools/Params.vue'),
    meta:{title:'参数解析'},
  },
  {
    path: '/json',
    name: 'json',
    component: () => import('@/views/tools/BeautyJson.vue'),
    meta:{title:'美化json'},
  },
  {
    path: '/decode',
    name: 'decode',
    component: () => import('@/views/tools/UrlDecode.vue'),
    meta:{title:'Url转码'},
  },
  {
    path: '/binary',
    name: 'binaryChange',
    component: () => import('@/views/tools/BinaryChange.vue'),
    meta:{title:'进制转换'},
  },
  {
    path: '/changeImg',
    name: 'changeImg',
    component: () => import('@/views/tools/ChangeImg16.vue'),
    meta:{title:'图片转16进制'},
  },
  {
    path: '/toImg',
    name: 'toImg',
    component: () => import('@/views/tools/ToImg.vue'),
    meta:{title:'16进制转图片'},
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})


// setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
  });
  await router.isReady()
}
