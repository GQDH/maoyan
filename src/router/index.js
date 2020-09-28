// import Vue from 'vue';
// import VueRouter from 'vue-router';
import Vue from 'vue';
import VueRouter from 'vue-router';


// 去除重复点击时的警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 我的

// 使用vue-router
// Vue.use(VueRouter);
Vue.use(VueRouter);

const routes = [{
        //重定向  如果路径为'/',则将路径转换为''index
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: () =>
            import ('../views/Index.vue'),
        // 路由嵌套,即在同一页面的部分进行 更换  (子路由)
        children: [{
                path: '/index',
                redirect: '/hot'
            },
            {
                path: '/hot',
                component: () =>
                    import ('../components/index/Hot.vue')
            },
            {
                path: '/cinema',
                component: () =>
                    import ('../components/index/Cinema.vue')
            },

            {
                path: '/wait',
                component: () =>
                    import ('../components/index/Wait.vue')
            },
            {
                path: '/classics',
                component: () =>
                    import ('../components/index/Classics.vue')
            },
        ]
    },
    {
        path: '/video',
        component: () =>
            import ('../views/Video.vue')
    },
    {
        path: '/mini-video',
        component: () =>
            import ('../views/MiniVideo.vue')
    },
    {
        path: '/show',
        component: () =>
            import ('../views/Show.vue'),
        meta: { requireAuth: true },
        // 路由独享的守卫
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')) {
                next();
            } else {
                console.log(1);
                next('/login');
            }
        }
    },
    {
        path: '/mine',
        component: () =>
            import ('../views/Mine.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () =>
            import ('../views/Detail.vue')
    },
    {
        path: '/login',
        component: () =>
            import ('../views/Login.vue')



    },
    {
        path: '/cities',
        component: () =>
            import ('../views/Cities.vue')

    },
    {
        path: '*',
        component: () =>
            import ('../views/NotFound.vue')
    }
]

const router = new VueRouter({
    // routes: routes  或
    routes
})


// router.beforeEach((to, from, next) => {
//     // console.log('to', to);
//     // console.log('from', from);
//     // next();

//     // if (to.meta.requireAuth) { //判断该路由是否需要登录权限
//     //     if (localStorage.getItem('token')) {
//     //         // 如果有token，说明登录过了
//     //         next();
//     //     } else {
//     //         // 如果没有token，那么调到登录页
//     //         console.log(1);
//     //         // next('/login');
//     //         next('/login');
//     //     }
//     // }

//     next();
// })


export default router