<template>
    <div class="preview">
        <div class="loader">
            <span>桂平市中二病中小学生健康管理系统</span>
        </div>
        <div class="card">
            <el-tabs v-model="activeName" class="demo-tabs1">
                <el-tab-pane label="登录" name="first">
                    <login></login>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <reg></reg>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <!-- <live2d></live2d> -->


</template>
<script setup lang='ts'>
import live2d from '@/layout/components/vue-live2d/index.vue'
import login from './login.vue'
import reg from './reg.vue'
const activeName = ref('first')




</script>
<style lang='scss'>
.el-tabs__nav-wrap {
    background-color: #ecf0f3;
    box-shadow: none;
    border-radius: 12px;
}

.demo-tabs1 {
    margin-top: 10px;
    // box-shadow: none
}
</style>