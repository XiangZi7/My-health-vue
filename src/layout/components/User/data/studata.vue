<template>
    <!-- 个人信息 -->
    <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size" border>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <Key />
                    </el-icon>
                    学号
                </div>
            </template>
            {{ stuinfodata.dataList.sid }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    姓名
                </div>
            </template>
            {{ stuinfodata.dataList.name }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    性别
                </div>
            </template>
            {{ stuinfodata.dataList.sex }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    所在班级
                </div>
            </template>
            {{ stuinfodata.dataList.myclass }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    民族
                </div>
            </template>
            {{ stuinfodata.dataList.national }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <Fries />
                    </el-icon>
                    出生日期
                </div>
            </template>
            {{ stuinfodata.dataList.birthday }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <location />
                    </el-icon>
                    地区
                </div>
            </template>
            Suzhou
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    老师寄语
                </div>
            </template>
            <el-tag size="small"> {{ stuinfodata.dataList.lsjy }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <office-building />
                    </el-icon>
                    学校
                </div>
            </template>
            {{ stuinfodata.dataList.school }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    父亲
                </div>
            </template>
            {{ stuinfodata.dataList.father }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <PhoneFilled />
                    </el-icon>
                    联系方式
                </div>
            </template>
            {{ stuinfodata.dataList.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <office-building />
                    </el-icon>
                    地址
                </div>
            </template>
            {{ stuinfodata.dataList.address }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    母亲
                </div>
            </template>
            {{ stuinfodata.dataList.mother }}

        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <PhoneFilled />
                    </el-icon>
                    联系方式
                </div>
            </template>
            {{ stuinfodata.dataList.telephone1 }}
        </el-descriptions-item>

    </el-descriptions>
    <!-- 体检信息 -->
    <el-descriptions class="margin-top" title="体检信息" :column="3" :size="size" :style="blockMargin">
        <el-descriptions-item label="学号">{{ stuPeditdata.dataList.sid }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ stuPeditdata.dataList.name }}</el-descriptions-item>
        <el-descriptions-item label="学校"> {{ stuinfodata.dataList.school }}</el-descriptions-item>
        <el-descriptions-item label="班级"> {{ stuinfodata.dataList.myclass }}</el-descriptions-item>
        <el-descriptions-item label="身高">{{ stuPeditdata.dataList.height }}</el-descriptions-item>
        <el-descriptions-item label="体重">{{ stuPeditdata.dataList.weight }}</el-descriptions-item>
        <el-descriptions-item label="血压">{{ stuPeditdata.dataList.xy }}</el-descriptions-item>
        <el-descriptions-item label="肺活量">{{ stuPeditdata.dataList.fhl }}</el-descriptions-item>
        <el-descriptions-item label="视力">{{ stuPeditdata.dataList.sl }}</el-descriptions-item>
        <el-descriptions-item label="色觉">{{ stuPeditdata.dataList.sm }}</el-descriptions-item>
        <el-descriptions-item label="血常规">{{ stuPeditdata.dataList.xcg }}</el-descriptions-item>
        <el-descriptions-item label="心脏">{{ stuPeditdata.dataList.xz }}</el-descriptions-item>
        <el-descriptions-item label="胸部X光">{{ stuPeditdata.dataList.sid }}</el-descriptions-item>
        <el-descriptions-item label="医生寄语">
            <el-tag size="small">{{ stuPeditdata.dataList.ysjy }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="意见建议">{{ stuPeditdata.dataList.yjjy }}</el-descriptions-item>
        <el-descriptions-item label="填表人">{{ stuPeditdata.dataList.tbr }}</el-descriptions-item>
        <el-descriptions-item label="填写日期">{{ stuPeditdata.dataList.rbrq }}</el-descriptions-item>
        <el-descriptions-item label="是否有效">{{ stuPeditdata.dataList.sfyx }}</el-descriptions-item>
    </el-descriptions>
</template>
<script setup lang='ts'>
import { stuinfo, stupeditinfo } from "@/request/userinfo.js";
import { selectBycdId } from "@/request/Classapi.js";
import { selectBySdId } from "@/request/Schapi.js";
const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
    }
})
const blockMargin = computed(() => {
    const marginMap = {
        large: '32px',
        default: '28px',
        small: '24px',
    }
    return {
        marginTop: marginMap[size.value] || marginMap.default,
    }
})
const studata = reactive({
    dataList: []
});
const SchAndClass = reactive({
    dataList: []
})
studata.dataList = JSON.parse(localStorage.getItem("userdata"))
onMounted(() => {
    // console.log(studata.dataList);
    stuinfo1();
    stuPedit();
})
const stuinfodata = reactive({
    dataList: []
})
const stuinfo1 = () => {

    // 学生信息
    stuinfo({
        sid: studata.dataList.sid
    }).then(res => {
        stuinfodata.dataList = res.data
        selectBycdId({
            cdId: stuinfodata.dataList.myclass
        }).then(res => {
            stuinfodata.dataList.myclass = res.data[0].cdName
        })
    })
}


const stuPeditdata = reactive({
    dataList: []
})
const stuPedit = () => {
    stupeditinfo({
        sid: studata.dataList.sid
    }).then(res => {
        // console.log(res.data);
        stuPeditdata.dataList = res.data[0]
        // console.log(stuPeditdata.dataList);

        selectBySdId({
            sdId: stuPeditdata.dataList.school
        }).then(res => {
            stuinfodata.dataList.school = res.data[0].sdName
        })
    })
}


</script>
<style lang='scss'>
.el-descriptions {
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    padding: 30px;
    margin: 50px;

}

.el-descriptions__body {
    background-color: transparent
}

.el-descriptions__label.el-descriptions__cell.is-bordered-label {
    background-color: transparent
}
</style>