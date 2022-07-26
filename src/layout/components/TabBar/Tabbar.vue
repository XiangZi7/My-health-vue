<template>
    <el-tabs v-model="editableTabsValue" type="card" @tab-click="clickHandle" @tab-remove="removeTab">
        <el-tab-pane v-for="item in tablist" :key="item.path" :label="item.title" :name="item.path" closable>
            {{ item.content }}
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { Itab } from '@/store/type'
const store = useStore();
const route = useRoute();
const router = useRouter();
const editableTabsValue = ref()

const tablist = computed(() => {
    return store.getters.getAddTab
})



// 索引
const activeKey = ref('')

// 添加tab
const addTab = () => {
    const { meta, path } = route
    const tab: Itab = {
        path: path,
        title: meta.title as string
    }
    store.commit('addTab', tab)
}
watch(() => route.path, () => {
    activeKey.value = route.path
    addTab()
})


watch(() => route.path, () => {
    activeKey.value = route.path
})
// 点击Tab事件 进行跳转
const clickHandle = (event: any) => {
    // console.log(event);
    // console.log(event.props.name);
    router.push({ path: event.props.name })
}
const removeTab = (targetName: string) => {
    if (tablist.value.length === 1) {
        return alert("这是最后一页了")

    }
    if (activeKey.value === targetName) {
        tablist.value.forEach((tab: Itab, index: number) => {
            if (tab.path === targetName) {
                const nextTab = tablist.value[index + 1] || tablist.value[index - 1]
                if (nextTab) {
                    activeKey.value = nextTab.path
                }
            }
        })
    }
    store.commit('closeCurrentTab', targetName)
}
// 数据持久化
const refresh = () => {
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('TABS_ROUTES', JSON.stringify(tablist.value))
    })

    let session = sessionStorage.getItem('TABS_ROUTES')
    if (session) {
        let tabItem = JSON.parse(session)
        tabItem.forEach((tab: Itab) => {
            store.commit('addTab', tab)
        })
    }
}
onMounted(() => {
    // 初始化页面
    addTab()
    // 刷新保存数据
    refresh()
})
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs__nav-wrap {
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9 ;
    border-radius: 12px;
}
</style>