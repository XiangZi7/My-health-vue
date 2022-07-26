<template>
    <template v-for="menu in menus" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length>1" :index="menu.path">
            <template #title>
                <el-icon>
                    <component :is=" menu.meta.icon">
                    </component>
                </el-icon>
                <span>{{menu.meta.title}}</span>
            </template>

            <Menuitem :menus="menu.children">
            </Menuitem>

        </el-sub-menu>
        <el-menu-item v-else @click="toPath(menu.name)" :index="menu.path">
            <el-icon>
                <component :is="menu.meta.icon"></component>
            </el-icon>
            <span>{{menu.meta.title}}</span>
        </el-menu-item>

    </template>

</template>
<script setup lang='ts'>
    const router = useRouter();
    // 接受父组件传来的数据
    defineProps(['menus'])

    const toPath = (item: string) => {
        router.push({ name: item })

    }

</script>
<style lang='scss'>


</style>