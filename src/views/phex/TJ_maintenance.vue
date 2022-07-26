<template>
    <!-- 模糊搜索开始 -->
    <el-form :inline="true" :model="fuquery" class="demo-form-inline">
        <el-form-item label="学号">
            <el-input v-model="fuquery.sid" placeholder="请输入学号" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
            <el-input v-model="fuquery.name" placeholder="请输入学生姓名" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
            <el-button type="primary" @click="fuquery.sid = '', fuquery.name = ''">清空</el-button>
        </el-form-item>
    </el-form>
    <!-- 模糊搜索开始结束 -->
    <!-- 新增和批量删除开始 -->
    <el-row class="mb-4">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-popconfirm title="确定删除该数据?" @confirm="deleteByIds">
            <template #reference>
                <el-button type="danger">批量删除</el-button>
            </template>
        </el-popconfirm>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="新增学生">
        <!-- 新增表单 -->
        <el-form ref="ruleFormRef" :model="stu_peditform" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sid">
                <el-input v-model="stu_peditform.sid" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="stu_peditform.name" />
            </el-form-item>
            <el-form-item label="所在学校" prop="name">
                <el-select v-model="stu_peditform.school" placeholder="选择学校">
                    <el-option label="南宁师范大学" value="南宁师范大学" />
                    <el-option label="广西生态工程专业技术学院" value="广西生态工程专业技术学院" />
                </el-select>
            </el-form-item>
            <el-form-item label="所在班级" prop="myclass">
                <el-input v-model="stu_peditform.myclass" />
            </el-form-item>
            <el-form-item label="身高" prop="height">
                <el-input v-model="stu_peditform.height" />
            </el-form-item>
            <el-form-item label="体重" prop="weight">
                <el-input v-model="stu_peditform.weight" />
            </el-form-item>
            <el-form-item label="血压" prop="xy">
                <el-input v-model="stu_peditform.xy" />
            </el-form-item>
            <el-form-item label="肺活量" prop="fhl">
                <el-input v-model="stu_peditform.fhl" />
            </el-form-item>
            <el-form-item label="视力" prop="sl">
                <el-input v-model="stu_peditform.sl" />
            </el-form-item>
            <el-form-item label="色觉" prop="sm">
                <el-input v-model="stu_peditform.sm" />
            </el-form-item>
            <el-form-item label="血常规" prop="xcg">
                <el-input v-model="stu_peditform.xcg" />
            </el-form-item>
            <el-form-item label="心脏" prop="xz">
                <el-input v-model="stu_peditform.xz" />
            </el-form-item>
            <el-form-item label="胸部X光" prop="xbxg">
                <el-input v-model="stu_peditform.xbxg" />
            </el-form-item>
            <el-form-item label="医生寄语" prop="ysjy">
                <el-input v-model="stu_peditform.ysjy" />
            </el-form-item>
            <el-form-item label="意见建议" prop="yjjy">
                <el-input v-model="stu_peditform.yjjy" />
            </el-form-item>
            <el-form-item label="填表人" prop="tbr">
                <el-input v-model="stu_peditform.tbr" />
            </el-form-item>

            <el-form-item label="填表日期" prop="rbrq">
                <el-col :span="11">
                    <el-date-picker v-model="stu_peditform.rbrq" type="date" placeholder="选择日期" style="width: 100%" />
                </el-col>

            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="stu_peditform.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(index, stu_peditform.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addclass">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 新增和批量删除结束 -->
    <!-- 表格开始 -->
    <el-table :data="stu_pedittableData.dataList" style="width: 100%" @selection-change="handleSelectionChange"
        ref="multipleTableRef">
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="sid" label="学号" />
        <el-table-column prop="school" label="姓名" />
        <el-table-column prop="myclass" label="所在学校" />
        <el-table-column prop="height" label="入学年份" />
        <el-table-column prop="weight" label="所在班级" />
        <el-table-column prop="xy" label="民族" />
        <el-table-column prop="fhl" label="性别" />
        <el-table-column prop="sl" label="出生日期" />
        <el-table-column prop="sm" label="老师寄语" />
        <el-table-column prop="xcg" label="父亲" />
        <el-table-column prop="xz" label="电话号码" />
        <el-table-column prop="xbxg" label="母亲" />
        <el-table-column prop="ysjy" label="电话号码" />
        <el-table-column prop="yjjy" label="联系地址" />
        <el-table-column prop="tbr" label="登记人" />
        <el-table-column prop="rbrq" label="登记日期" />
        <el-table-column property="sfyx" label="是否有效">
            <template v-slot="scope">
                <el-switch v-model="scope.row.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(scope.$index, scope.row.sfyx)">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-popconfirm title="确定删除该数据?" @confirm="handleDelete(scope.$index, scope.row)">
                    <template #reference>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 修改表格 -->
    <el-dialog v-model="edit_stulVisible" title="修改学生健康信息">
        <el-form ref="ruleFormRef" :model="stu_peditform.dataLst" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sid">
                <el-input v-model="stu_peditform.dataLst.sid" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="stu_peditform.dataLst.name" />
            </el-form-item>
            <el-form-item label="所在学校" prop="name">
                <el-select v-model="stu_peditform.dataLst.school" placeholder="选择学校">
                    <el-option label="南宁师范大学" value="南宁师范大学" />
                    <el-option label="广西生态工程专业技术学院" value="广西生态工程专业技术学院" />
                </el-select>
            </el-form-item>
            <el-form-item label="所在班级" prop="myclass">
                <el-input v-model="stu_peditform.dataLst.myclass" />
            </el-form-item>
            <el-form-item label="身高" prop="height">
                <el-input v-model="stu_peditform.dataLst.height" />
            </el-form-item>
            <el-form-item label="体重" prop="weight">
                <el-input v-model="stu_peditform.dataLst.weight" />
            </el-form-item>
            <el-form-item label="血压" prop="xy">
                <el-input v-model="stu_peditform.dataLst.xy" />
            </el-form-item>
            <el-form-item label="肺活量" prop="fhl">
                <el-input v-model="stu_peditform.dataLst.fhl" />
            </el-form-item>
            <el-form-item label="视力" prop="sl">
                <el-input v-model="stu_peditform.dataLst.sl" />
            </el-form-item>
            <el-form-item label="色觉" prop="sm">
                <el-input v-model="stu_peditform.dataLst.sm" />
            </el-form-item>
            <el-form-item label="血常规" prop="xcg">
                <el-input v-model="stu_peditform.dataLst.xcg" />
            </el-form-item>
            <el-form-item label="心脏" prop="xz">
                <el-input v-model="stu_peditform.dataLst.xz" />
            </el-form-item>
            <el-form-item label="胸部X光" prop="xbxg">
                <el-input v-model="stu_peditform.dataLst.xbxg" />
            </el-form-item>
            <el-form-item label="医生寄语" prop="ysjy">
                <el-input v-model="stu_peditform.dataLst.ysjy" />
            </el-form-item>
            <el-form-item label="意见建议" prop="yjjy">
                <el-input v-model="stu_peditform.dataLst.yjjy" />
            </el-form-item>
            <el-form-item label="填表人" prop="tbr">
                <el-input v-model="stu_peditform.dataLst.tbr" />
            </el-form-item>

            <el-form-item label="填表日期" prop="rbrq">
                <el-col :span="11">
                    <el-date-picker v-model="stu_peditform.dataLst.rbrq" type="date" placeholder="选择日期"
                        style="width: 100%" />
                </el-col>

            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="stu_peditform.dataLst.sfyx" :active-value="1" :inactive-value="0"
                    active-color="#17BF6D" @change="changestatus(index, stu_peditform.dataLst.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatesubmitForm">修改</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <div class="demo-pagination-block">
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="countpage" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
    <!-- 分页结束 -->
</template>
<script lang="ts" setup>
import { getstupeditinfo, addstupeditinfo, stupeditfuQuery, getstupeditByIdinfo, updatestupeditByIdinfo, deletestupeditByIdinfo, deletestupeditsByIdsinfo } from "@/request/StuPeditapi.js";
// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const countpage = ref(1)
const handleSizeChange = (val: number) => {
    // console.log(`${val} items per page`)
    pageSize.value = val
    searchall()
}
const handleCurrentChange = (val: number) => {
    // console.log(`current page: ${val}`)
    currentPage.value = val
    searchall()
}
// 表格模型
interface User {
    sid: String,
    name: String,
    school: String,
    myclass: String,
    height: String,
    weight: String,
    xy: String,
    fhl: String,
    sl: String,
    sm: String,
    xcg: String,
    xz: String,
    xbxg: String,
    ysjy: String,
    yjjy: String,
    tbr: String,
    rbrq: String,
    rbrq1: String,
    sfyx: Number
}
// 表单
const stu_pedittableData: User[] = reactive({ dataList: [] })
// 表格数据
const stu_peditform = reactive({
    dataLst: [],
    sid: '',
    name: '',
    school: '',
    myclass: '',
    height: '',
    weight: '',
    xy: '',
    fhl: '',
    sl: '',
    sm: '',
    xcg: '',
    xz: '',
    xbxg: '',
    ysjy: '',
    yjjy: '',
    tbr: '',
    rbrq: '',
    sfyx: '',
})

// 获取班级信息
const searchall = () => {
    getstupeditinfo({
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        stu_pedittableData.dataList = res.data.records
        // console.log(classtableData);
        countpage.value = res.data.total
    })
}
// 更改表格状态
const changestatus = (index, row) => {
    // console.log(index);
    console.log(row);
}
onMounted(() => {
    searchall();
})

// 新增
const addSuccess = (msg) => {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    })
}
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const addclass = () => {
    addstupeditinfo({
        sid: stu_peditform.sid,
        name: stu_peditform.name,
        school: stu_peditform.school,
        myclass: stu_peditform.myclass,
        height: stu_peditform.height,
        weight: stu_peditform.weight,
        xy: stu_peditform.xy,
        fhl: stu_peditform.fhl,
        sl: stu_peditform.sl,
        sm: stu_peditform.sm,
        xcg: stu_peditform.xcg,
        xz: stu_peditform.xz,
        xbxg: stu_peditform.xbxg,
        ysjy: stu_peditform.ysjy,
        yjjy: stu_peditform.yjjy,
        tbr: stu_peditform.tbr,
        rbrq: stu_peditform.rbrq,
        sfyx: stu_peditform.sfyx,
    }).then(res => {
        if (res.data == 1) {
            addSuccess("学生添加成功")
            searchall()
            dialogFormVisible.value = false;
        }
    })
}
// 重置表格数据
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 修改
const edit_stulVisible = ref(false)
const handleEdit = (index: number, row: User) => {
    edit_stulVisible.value = true;
    // console.log(index)
    // console.log(row.bh)
    getstupeditByIdinfo({
        bh: row.bh
    }).then(res => {
        // console.log(res);
        stu_peditform.dataLst = res.data;
        // console.log(class_idt.dataLst);
    })
}
const updatesubmitForm = (formEl: FormInstance | undefined) => {
    updatestupeditByIdinfo({
        bh: stu_peditform.dataLst.bh,
        sid: stu_peditform.dataLst.sid,
        name: stu_peditform.dataLst.name,
        school: stu_peditform.dataLst.school,
        myclass: stu_peditform.dataLst.myclass,
        height: stu_peditform.dataLst.height,
        weight: stu_peditform.dataLst.weight,
        xy: stu_peditform.dataLst.xy,
        fhl: stu_peditform.dataLst.fhl,
        sl: stu_peditform.dataLst.sl,
        sm: stu_peditform.dataLst.sm,
        xcg: stu_peditform.dataLst.xcg,
        xz: stu_peditform.dataLst.xz,
        xbxg: stu_peditform.dataLst.xbxg,
        ysjy: stu_peditform.dataLst.ysjy,
        yjjy: stu_peditform.dataLst.yjjy,
        tbr: stu_peditform.dataLst.tbr,
        rbrq: stu_peditform.dataLst.rbrq,
        sfyx: stu_peditform.dataLst.sfyx,
    }).then(res => {
        // console.log(res);
        if (res.data == 1) {
            edit_stulVisible.value = false;
            searchall()
        }
    })
}
// 删除
const handleDelete = (index: number, row: User) => {
    // console.log(index, row)
    deletestupeditByIdinfo({
        bh: row.bh
    }).then(res => {
        if (res.data == 1) {
            searchall()
        }
    })
}
// 批量删除
// 选项框
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
    console.log(multipleSelection.value);
}
let selectIds = [];
const deleteByIds = () => {
    for (let i = 0; i < multipleSelection.value.length; i++) {
        let selectionElement = multipleSelection.value[i];
        selectIds[i] = selectionElement.bh;
    }
    deletestupeditsByIdsinfo({
        bh: selectIds
    }).then(res => {
        searchall()
    })
}
// 查询
const fuquery = reactive({
    sid: '',
    name: '',
})
const searchSubmit = () => {
    stupeditfuQuery({
        sid: fuquery.sid,
        name: fuquery.name,
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        // console.log(res.data);
        stuinfotableData.dataList = res.data.records
        countpage.value = res.data.total

    })
}

</script>


<style lang='scss'>
.el-pagination {
    justify-content: center;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>