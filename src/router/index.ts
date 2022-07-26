import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'
import { checkToken } from "@/request/UserLogin.js";
import axios from 'axios'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },

    {
        path: '/reg',
        component: () => import('@/views/login/reg.vue')
    },
    {
        // 展示学生体检信息
        path: '/stuped',
        name: 'stuped',
        component: () => import('@/layout/components/User/index.vue')
    },
    {
        path: '/',
        redirect: '/index',
        name: 'Index',
        component: Layout,
        meta: {
            title: '首页',
            icon: 'house',
        },
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import('@/views/index/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'house',
                }
            }
        ]
    },
    {
        path: '/user',
        redirect: '/user/manger',
        name: 'user',
        component: Layout,
        meta: {
            title: '用户管理',
            affix: true,
            icon: 'UserFilled',
        },
        children: [
            {
                path: 'manger',
                name: 'usermanger',
                component: () => import('@/views/user/user.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'UserFilled',
                }
            },
            {
                path: 'admin',
                name: 'adminmanger',
                component: () => import('@/views/user/admin.vue'),
                meta: {
                    title: '管理员',
                    icon: 'UserFilled',
                }
            }
        ]
    },
    {
        // 体检信息
        path: '/phex',
        name: 'phex',
        component: Layout,
        meta: {
            title: '体检信息采集',
            icon: 'Notebook',
            rolos: ['amdin', 'editor']
        },
        children: [
            {
                path: 'TJ_entry',
                name: 'TJ_entry',
                component: () => import('@/views/phex/TJ_entry.vue'),
                meta: {
                    title: '体检数据录入',
                    icon: 'Notification',
                },
            },
            {
                path: 'pdma',
                name: 'pdma',
                component: () => import('@/views/phex/TJ_maintenance.vue'),
                meta: {
                    title: '体检数据维护',
                    icon: 'money',
                },
            }
        ]
    },
    // 学生信息
    {
        path: '/stuinfo',
        name: 'stuinfo',
        component: Layout,
        meta: {
            title: '学生信息管理',
            icon: 'School',
        },
        children: [
            {
                path: 'stuQuery',
                name: 'stuQuery',
                component: () => import('@/views/studentinfo/student.vue'),
                meta: {
                    title: '学生信息',
                    icon: 'soldOut',
                },
            },
            {
                path: 'stuentry',
                name: 'stuentry',
                component: () => import('@/views/studentinfo/studententry.vue'),
                meta: {
                    title: '学生信息录入',
                    icon: 'soldOut',
                },
            },
            {
                path: 'stuinfoma',
                name: 'stuinfoma',
                component: () => import('@/views/studentinfo/stuweihu.vue'),
                meta: {
                    title: '学生信息维护',
                    icon: 'soldOut',
                },
            }
        ]
    },
    {
        // 统计分析
        path: '/statistics',
        name: 'statistics',
        component: Layout,
        meta: {
            title: '统计分析',
            icon: 'DataAnalysis',
            rolos: ['amdin', 'editor']
        },
        children: [
            {
                path: 'collinfogat',
                name: 'collinfogat',
                component: () => import('@/views/statistics/collinfogat.vue'),
                meta: {
                    title: '统计分析1',
                    icon: 'Notification',
                },
            },
            {
                path: 'collinfogat2',
                name: 'collinfogat2',
                component: () => import('@/views/statistics/collinfogat2.vue'),
                meta: {
                    title: '统计分析2',
                    icon: 'money',
                },
            }
        ]
    },
    {
        // 字典信息管理
        path: '/dictionary',
        name: 'dictionary',
        component: Layout,
        meta: {
            title: '字典信息管理',
            icon: 'Notebook',
            rolos: ['amdin', 'editor']
        },
        children: [
            {
                path: 'schoolmg',
                name: 'schoolmg',
                component: () => import('@/views/dictionary/Schoolmg.vue'),
                meta: {
                    title: '学校管理',
                    icon: 'shoppingBag',
                },
            },
            {
                path: 'classmg',
                name: 'classmg',
                component: () => import('@/views/dictionary/Classmg.vue'),
                meta: {
                    title: '班级管理',
                    icon: 'soldOut',
                },
            }
        ]
    },
    {
        // 系统管理
        path: '/systemmain',
        name: 'systemmain',
        component: Layout,
        meta: {
            title: '系统管理',
            icon: 'Tools',
            rolos: ['amdin', 'editor']
        },
    },
    {
        // 主题
        path: '/theme',
        name: 'theme',
        redirect: '/theme/bg',
        component: Layout,
        meta: {
            title: '主题',
            icon: 'Sunny',
        },
        children: [
            {
                path: 'bg',
                name: 'bg',
                component: () => import('@/views/theme/theme.vue'),
                meta: {
                    title: '背景',
                    icon: 'Sunny',
                },
            },

        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
    const usertoken = ref(JSON.parse(localStorage.getItem("usertoken")))
    const adintoken = ref(JSON.parse(localStorage.getItem("admintoken")))
    // let stutoken = localStorage.getItem("stutoken");
    // let admintoken = localStorage.getItem("admintoken");
    if (usertoken.value || adintoken.value || to.path === "/login" || to.path === "/reg") {
        checkToken({
            // axios({
            // url: "user/checkToken",
            // headers: {
            //     token: userinfo.dataList.token
            // }
        }).then(res => {
            if (!res.data) {
                console.log(res.data);
                console.log("校验失败");
                next("/login")
            } else {
                console.log(res.data);
                console.log("验证成功");
            }
        })
        next();
    } else {
        next("/login")
    }

    // if (to.path.startsWith('/login')) {
    //     window.localStorage.removeItem('stutoken')
    //     next()
    // } else {

    //     const usertoken = ref(JSON.parse(localStorage.getItem("usertoken")))
    //     const adintoken = ref(JSON.parse(localStorage.getItem("admintoken")))
    //     if (!usertoken.value ||adintoken.value) {
    //         next('/login')
    //     } else {
    //         checkToken({
    //             // axios({
    //             // url: "user/checkToken",
    //             // headers: {
    //             //     token: userinfo.dataList.token
    //             // }
    //         }).then(res => {
    //             if (!res.data) {
    //                 console.log(res.data);
    //                 console.log("校验失败");
    //                 // next("/error")
    //             }
    //         })
    //         next()
    //     }
    // }
})

export default router