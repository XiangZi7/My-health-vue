<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <LogBar></LogBar>
                <!-- :collapsed="collapsed"判断折叠 -->
                <AppHeader :collapsed="collapsed" />
            </el-header>
            <el-container>
                <el-aside :style="'width:' + autowidth">
                    <MenuBar :collapsed="collapsed"></MenuBar>
                </el-aside>
                <el-main>
                    <el-row>
                        <el-icon style="font-size: 26px;margin-right: 15px;" @click="() => (collapsed = !collapsed)">
                            <component :is="collapsed ? Expand : Fold"> </component>
                        </el-icon>
                        <HeaderBar />
                    </el-row>
                    <TabBar />
                    <AppMain></AppMain>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import LogBar from './components/logoBar/index.vue'
import MenuBar from './components/menuBar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { isMoblie } from '../utils/isMoblie'
import AppMain from './components/AppMain/AppMani.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import TabBar from './components/TabBar/Tabbar.vue'
import AppHeader from './components/header/index.vue'



const collapsed = ref<boolean>(false)
// 判断是否移动端
const autowidth = computed(() => {
    if (collapsed.value && isMoblie()) {
        return "0px"
    } else if (collapsed.value) {
        return "84px"
    } else {
        return "220px"

    }
})

// console.log(isMoblie());
</script>
<style lang="scss">
.el-pagination button:disabled{
    background-color:transparent !important
}
.el-pager li {
    background: transparent !important;
}

.demo-pagination-block {
    margin-top: 15px;
}

.el-table--fit {
    margin-top: 15px;
    background-color: #ecf0f3 !important;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
}

// .el-table tr {
//     background-color: #ecf0f3;
// }

.el-row {
    // background-color: #ecf0f3;
    // box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    // border-radius: 12px;
    margin-bottom: 5px;
}

.el-main {
    padding: 7px 20px 7px 15px;
}

.el-aside {
    transition: 0.7s;
}

.el-menu {
    --el-menu-text-color: var(--theme-color);
    font-family: var(--body-font);
}

.el-tabs__item {
    color: var(--theme-color);
    font-family: var(--body-font);
}

.common-layout {
    display: flex;
    height: 100vh;
}

.el-header {
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px solid var(--border-color);
    // display: flex;
    // flex-wrap: nowrap;
    // align-items: center;
    // height: 100px;
}

.el-breadcrumb {
    line-height: 2;
}

// 头部
// .el-header{
//     padding: 0;
//     height: 155px;
// }
</style>