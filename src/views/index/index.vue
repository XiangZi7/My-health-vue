<template >
    <el-carousel :interval="4000" type="card" height="200px" style="margin-top: 50px;">
        <el-carousel-item v-for="item in preset" :key="item">
            <img :src="getAssetImgs(item.bannerUrl)" alt="">
        </el-carousel-item>
    </el-carousel>
</template>
<script setup lang='ts'>
const getAssetImgs = (imgname: string) => {
    return new URL(`../../static/img/banner/${imgname}`, import.meta.url).href
}

const preset = reactive([
    {
        bannerName: '1',
        bannerUrl: '1.jpg',

    },
    {
        bannerName: '5',
        bannerUrl: '5.gif',

    },
    {
        bannerName: '2',
        bannerUrl: '2.jpg',

    },
    {
        bannerName: '3',
        bannerUrl: '3.jpg',

    },
    {
        bannerName: '4',
        bannerUrl: '4.gif',

    },

    {
        bannerName: '6',
        bannerUrl: '6.gif',

    },
])

</script>
<style lang='scss'>
.content-wrapper-header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    border-radius: 14px;
    margin-top: 50px;
}
</style>