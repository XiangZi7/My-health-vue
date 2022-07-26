<script lang="ts" setup>
//  按需引入 echarts
import * as echarts from "echarts";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

//先声明一个myChart
let myChart: echarts.ECharts;
onMounted(
    () => {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(main.value);
         getsexcount()
    }
)

// onBeforeMount(() => {
   
// })


const getsexcount = () => {

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各中小学每周体检人数情况'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['良乡小学', '燕山前进第二小学', '北京市房山区坨里中学', '北京市博问学校', '首都师范附属房山中学']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '良乡小学',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '燕山前进第二小学',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '北京市房山区坨里中学',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '北京市博问学校',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '首都师范附属房山中学',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]

    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

</script>

<template>
    <div ref="main" style="width: 100%; height: 400px"></div>
</template>

<style scoped>
</style>

