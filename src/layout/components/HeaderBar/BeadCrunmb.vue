<template>
        <el-breadcrumb>
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
</template>
<script setup lang='ts'>
    import { onMounted, ref, Ref, watch } from 'vue'
    import { RouteLocationMatched, useRoute } from 'vue-router'
    const route = useRoute()

    const breadcrumb: Ref<RouteLocationMatched[]> = ref([])
    const getBreadCrumb = () => {
        // route.matched获取路由的信息
        let matched = route.matched.filter((item) => item.meta && item.meta.title && item.children.length !== 1)

        // const frist = matched[0]

        // if (frist.path !== '/index') {
        //     matched = [{ path: '/index', meta: { title: '首页' } } as any].concat(matched)
        // }
        breadcrumb.value = matched
    }

    onMounted(() => {
        getBreadCrumb()
    })

    watch(() => route.path, () => {
        getBreadCrumb()
    })
    // console.log(route.matched);
</script>
<style lang='scss'>


</style>