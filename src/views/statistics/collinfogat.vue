<script lang="ts" setup>
import { getstuSexCount } from "@/request/StuInfoapi.js";
//  按需引入 echarts
import * as echarts from "echarts";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
// 默认数量
// const girlcoun = ref()
// const boycoun = ref()
const studata = reactive([
  {
    name: '',
    num: 0
  },
  {
    name: '',
    num: 0
  }
])
//先声明一个myChart
let myChart: echarts.ECharts;
onMounted(
  () => {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(main.value);
  }
)

onBeforeMount(() => {
  getsexcount()
})


const getsexcount = () => {
  getstuSexCount({}).then((res: { data: { num: number, sex: string }[]; }) => {
    // console.log(res.data);
    // girlcoun.value = res.data[0].num
    // boycoun.value = res.data[1].num

    studata[0].num = res.data[0].num
    studata[0].name = res.data[0].sex

    studata[1].num = res.data[1].num
    studata[1].name = res.data[1].sex

    // console.log(studata[0].name);
    // console.log(boycoun.value);

    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '性别比例',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: studata[1].num, name: studata[1].name },
            { value: studata[0].num, name: studata[0].name },
          ]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  })

}

</script>

<template>
  <div ref="main" style="width: 100%; height: 400px"></div>
</template>

<style scoped>
</style>

