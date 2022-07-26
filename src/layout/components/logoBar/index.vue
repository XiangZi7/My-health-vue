<template>
    <div class="logo">
        <img src="@/assets/logo.png" alt="">
        <h2 v-show="!collapsed" class="title">健康体检管理系统</h2>
    </div>

</template>

<script lang="ts" setup>
    defineProps({
        collapsed: {
            type: Boolean
        }
    })
</script>

<style lang="scss" scoped>
    .logo {
        display: flex;
        align-items: center;
        padding-left: 14px;
        height: 64px;
        overflow: hidden;
        white-space: nowrap;

        img {
            height: 50px;
            margin-right: 8px;
        }

        .title {
            font-size: 16px;
            color: #000;            
        }
    }
</style>