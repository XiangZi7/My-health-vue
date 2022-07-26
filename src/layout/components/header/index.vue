<template>
    <el-dropdown class="eh-avatar">
        <div class="eh-avatar-wz">
            <span class="el-dropdown-link">
                <div>
                    <el-avatar :src="userinfo.dataList.avatar" />
                </div>
            </span>
            <span class="username">{{ userinfo.dataList.name }}</span>
        </div>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="drawer = true">个人中心</el-dropdown-item>
                <el-dropdown-item>系统消息</el-dropdown-item>
                <el-dropdown-item @click="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <live2d></live2d>
    <!-- 个人中心 -->
    <el-drawer v-model="drawer" title="个人中心">
       
    </el-drawer>
</template>

<script lang="ts" setup>
import live2d from '@/layout/components/vue-live2d/index.vue'


// 个人中心
const drawer = ref(false)

const router = useRouter();
const userinfo = reactive({
    dataList: []
})


userinfo.dataList = JSON.parse(localStorage.getItem("admindata"))


const logout = () => {
    localStorage.removeItem('admintoken');
    router.replace("/login")

}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.eh-avatar {
    display: flex;
    /* justify-content: flex-end; */
    align-items: center;
    height: 60px;
}

.eh-avatar-wz {
    display: flex;
    flex-direction: row;
}

.username {
    line-height: 40px;
    margin-left: 10px;
}
</style>
