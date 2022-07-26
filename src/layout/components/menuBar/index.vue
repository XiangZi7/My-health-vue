<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="collapsed">
        <!-- :menus="menus" 父传子 -->
        <Menuitem :menus="menus" />
    </el-menu>
</template>

<script lang="ts" setup>
import Menuitem from './Menuitem.vue'

defineProps({
    collapsed: {
        type: Boolean
    }
})

const menus = reactive([
    {
        path: '/',
        redirect: '/index',
        name: 'Index',
        meta: {
            title: '首页',
            icon: 'house',
        },
        children: [
            {
                path: 'index',
                name: 'Index',
                meta: {
                    title: '首页',
                    icon: 'house',
                },
            }
        ]
    },
    {
        // 用户管理
        path: '/user',
        name: 'user',
        meta: {
            title: '用户管理',
            icon: 'UserFilled',
        },
        children: [
            {
                path: 'manger',
                name: 'usermanger',
                meta: {
                    title: '用户管理',
                    icon: 'UserFilled',
                }
            },
            {
                path: 'admin',
                name: 'adminmanger',
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
        meta: {
            title: '体检信息采集',
            icon: 'Notebook',
            rolos: ['amdin', 'editor']
        },
        children: [
            {
                path: 'TJ_entry',
                name: 'TJ_entry',
                meta: {
                    title: '体检数据录入',
                    icon: 'Notification',
                },
            },
            {
                path: 'pdma',
                name: 'pdma',
                meta: {
                    title: '体检数据维护',
                    icon: 'money',
                },
            }
        ]
    },
    {
        path: '/stuinfo',
        name: 'stuinfo',
        meta: {
            title: '学生信息管理',
            icon: 'School',
        },
        children: [
            {
                path: 'stuQuery',
                name: 'stuQuery',
                meta: {
                    title: '学生信息',
                    icon: 'soldOut',
                },
            },
            {
                path: 'stuentry',
                name: 'stuentry',
                meta: {
                    title: '学生信息录入',
                    icon: 'soldOut',
                },
            },
            {
                path: 'stuinfoma',
                name: 'stuinfoma',
                meta: {
                    title: '学生信息维护',
                    icon: 'soldOut',
                },
            }

        ]
    },
    // 统计分析
    {
        path: '/statistics',
        name: 'statistics',
        meta: {
            title: '统计分析',
            icon: 'DataAnalysis',
        },
        children: [
            {
                path: 'collinfogat',
                name: 'collinfogat',
                meta: {
                    title: '统计分析1',
                    icon: 'shoppingBag',
                },
            },
            {
                path: 'collinfogat2',
                name: 'collinfogat2',
                meta: {
                    title: '统计分析2',
                    icon: 'soldOut',
                },
            }
        ]
    },
    // 字典信息管理
    {
        path: '/dictionary',
        name: 'dictionary',
        meta: {
            title: '字典信息管理',
            icon: 'Notebook',
        },
        children: [
            {
                path: 'schoolmg',
                name: 'schoolmg',
                meta: {
                    title: '学校管理',
                    icon: 'shoppingBag',
                },
            },
            {
                path: 'classmg',
                name: 'classmg',
                meta: {
                    title: '班级管理',
                    icon: 'soldOut',
                },
            },
        ]
    },
    // 主题
    // 字典信息管理
    {
        path: '/theme',
        name: 'theme',
        meta: {
            title: '主题',
            icon: 'Sunny',
        },
        children: [
            {
                path: 'bg',
                name: 'bg',
                meta: {
                    title: '背景',
                    icon: 'Sunny',
                },
            },

        ]
    },
    // 系统管理
    {
        path: '/systemmain',
        name: 'systemmain',
        meta: {
            title: '系统管理',
            icon: 'Tools',
        },
    },
])
</script>

<style lang="scss" scoped>
.el-menu {
    --el-menu-bg-color: #ecf0f3 !important;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
}
</style>