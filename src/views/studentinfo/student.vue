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
            <el-button type="primary" @click="exportExcel = true">导出Excel</el-button>
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
        <el-form ref="ruleFormRef" :model="studentsinfo" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sid">
                <el-input v-model="studentsinfo.sid" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="studentsinfo.name" />
            </el-form-item>
            <el-form-item label="所在学校" prop="school">
                <el-input v-model="studentsinfo.school" />
            </el-form-item>
            <el-form-item label="入学年份" prop="rxnf">
                <el-input v-model="studentsinfo.rxnf" />
            </el-form-item>
            <el-form-item label="所在班级" prop="myclass">
                <el-input v-model="studentsinfo.myclass" />
            </el-form-item>
            <el-form-item label="民族" prop="national">
                <el-input v-model="studentsinfo.national" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="studentsinfo.sex" />
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <el-input v-model="studentsinfo.birthday" />
            </el-form-item>
            <el-form-item label="老师寄语" prop="lsjy">
                <el-input v-model="studentsinfo.lsjy" />
            </el-form-item>
            <el-form-item label="父亲" prop="father">
                <el-input v-model="studentsinfo.father" />
            </el-form-item>
            <el-form-item label="联系方式" prop="telephone">
                <el-input v-model="studentsinfo.telephone" />
            </el-form-item>
            <el-form-item label="母亲" prop="mother">
                <el-input v-model="studentsinfo.mother" />
            </el-form-item>
            <el-form-item label="联系方式" prop="telephone">
                <el-input v-model="studentsinfo.telephone1" />
            </el-form-item>
            <el-form-item label="联系地址" prop="telephone">
                <el-input v-model="studentsinfo.telephone" />
            </el-form-item>
            <el-form-item label="登记人" prop="djr">
                <el-input v-model="studentsinfo.djr" />
            </el-form-item>
            <el-form-item label="登记日期" prop="djrq">
                <el-input v-model="studentsinfo.djrq" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="studentsinfo.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(index, studentsinfo.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addclass">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 新增和批量删除结束 -->
    <!-- 表格开始 -->
    <el-table :data="stuinfotableData.dataList" style="width: 100%" @selection-change="handleSelectionChange"
        ref="multipleTableRef">
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="sid" label="学号" sortable  />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="school" label="所在学校" />
        <el-table-column prop="rxnf" label="入学年份" />
        <el-table-column prop="myclass" label="所在班级" />
        <el-table-column prop="national" label="民族" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="birthday" label="出生日期" />
        <el-table-column prop="lsjy" label="老师寄语" />
        <el-table-column prop="father" label="父亲" />
        <el-table-column prop="telephone" label="电话号码" />
        <el-table-column prop="mother" label="母亲" />
        <el-table-column prop="telephone1" label="电话号码" />
        <el-table-column prop="address" label="联系地址" />
        <el-table-column prop="djr" label="登记人" />
        <el-table-column prop="djrq" label="登记日期"  />
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
    <!-- 导出excel表 -->
    <el-dialog v-model="exportExcel" title="导出Excel预览">
        <div id="table">
            <el-table :data="stuinfotableData.dataList" style="width: 100%" ref="multipleTableRef">
                <el-table-column type="index" label="序号" />
                <el-table-column prop="sid" label="学号" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="school" label="所在学校" />
                <el-table-column prop="rxnf" label="入学年份" />
                <el-table-column prop="myclass" label="所在班级" />
                <el-table-column prop="national" label="民族" />
                <el-table-column prop="sex" label="性别" />
                <el-table-column prop="birthday" label="出生日期" />
                <el-table-column prop="lsjy" label="老师寄语" />
                <el-table-column prop="father" label="父亲" />
                <el-table-column prop="telephone" label="电话号码" />
                <el-table-column prop="mother" label="母亲" />
                <el-table-column prop="telephone1" label="电话号码" />
                <el-table-column prop="address" label="联系地址" />
                <el-table-column prop="djr" label="登记人" />
                <el-table-column prop="djrq" label="登记日期" />
                <el-table-column prop="statusStr" label="是否启用" />
            </el-table>
        </div>
        <el-button type="primary" @click="exportClick">导出</el-button>
    </el-dialog>
    <!-- 修改表格 -->
    <el-dialog v-model="edit_stulVisible" title="修改学校">
        <el-form ref="ruleFormRef" :model="studentsinfo.dataLst" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sid">
                <el-input v-model="studentsinfo.dataLst.sid" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="studentsinfo.dataLst.name" />
            </el-form-item>
            <el-form-item label="所在学校" prop="school">
                <el-input v-model="studentsinfo.dataLst.school" />
            </el-form-item>
            <el-form-item label="入学年份" prop="rxnf">
                <el-input v-model="studentsinfo.dataLst.rxnf" />
            </el-form-item>
            <el-form-item label="所在班级" prop="myclass">
                <el-input v-model="studentsinfo.dataLst.myclass" />
            </el-form-item>
            <el-form-item label="民族" prop="national">
                <el-input v-model="studentsinfo.dataLst.national" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="studentsinfo.dataLst.sex" />
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
                <el-input v-model="studentsinfo.dataLst.birthday" />
            </el-form-item>
            <el-form-item label="老师寄语" prop="lsjy">
                <el-input v-model="studentsinfo.dataLst.lsjy" />
            </el-form-item>
            <el-form-item label="父亲" prop="father">
                <el-input v-model="studentsinfo.dataLst.father" />
            </el-form-item>
            <el-form-item label="联系方式" prop="telephone">
                <el-input v-model="studentsinfo.dataLst.telephone" />
            </el-form-item>
            <el-form-item label="母亲" prop="mother">
                <el-input v-model="studentsinfo.dataLst.mother" />
            </el-form-item>
            <el-form-item label="联系方式" prop="telephone">
                <el-input v-model="studentsinfo.dataLst.telephone1" />
            </el-form-item>
            <el-form-item label="联系地址" prop="telephone">
                <el-input v-model="studentsinfo.dataLst.telephone" />
            </el-form-item>
            <el-form-item label="登记人" prop="djr">
                <el-input v-model="studentsinfo.dataLst.djr" />
            </el-form-item>
            <el-form-item label="登记日期" prop="djrq">
                <el-input v-model="studentsinfo.dataLst.djrq" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="studentsinfo.dataLst.sfyx" :active-value="1" :inactive-value="0"
                    active-color="#17BF6D" @change="changestatus(index, studentsinfo.sfyx)" />
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
import { getExcel } from "@/utils/excel";
import { getstuinfo, addstuinfo, stufuQuery, getstuByIdinfo, updatestuByIdinfo, deletestuByIdinfo, deletestusByIdsinfo } from "@/request/StuInfoapi.js";


// 导出excel
const exportExcel = ref(false)
const exportClick = () => {
    getExcel()
};
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
    bh: String,
    name: String,
    sid: String,
    school: String,
    rxnf: String,
    myclass: String,
    national: String,
    sex: String,
    birthday: String,
    lsjy: String,
    mother: String,
    father: String,
    telphone: String,
    telphone1: String,
    address: String,
    djr: String,
    djrq: String,
    sfyx: String
}
// 表单
const stuinfotableData: User[] = reactive({ dataList: [] })
// 表格数据
const studentsinfo = reactive({
    dataLst: [],
    sid: '',
    name: '',
    school: '',
    rxnf: '',
    myclass: '',
    national: '',
    sex: '',
    birthday: '',
    lsjy: '',
    mother: '',
    father: '',
    telephone: '',
    telephone1: '',
    address: '',
    djr: '',
    djrq: '',
    sfyx: ""
})

// 获取班级信息
const searchall = () => {
    getstuinfo({
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        stuinfotableData.dataList = res.data.records
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
    addstuinfo({
        sid: studentsinfo.sid,
        name: studentsinfo.name,
        school: studentsinfo.school,
        rxnf: studentsinfo.rxnf,
        myclass: studentsinfo.myclass,
        national: studentsinfo.national,
        sex: studentsinfo.sex,
        birthday: studentsinfo.birthday,
        lsjy: studentsinfo.lsjy,
        mother: studentsinfo.mother,
        father: studentsinfo.father,
        telephone: studentsinfo.telephone,
        telephone1: studentsinfo.telephone1,
        address: studentsinfo.address,
        djr: studentsinfo.djr,
        djrq: studentsinfo.djrq,
        sfyx: studentsinfo.sfyx
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
    getstuByIdinfo({
        bh: row.bh
    }).then(res => {
        // console.log(res);
        studentsinfo.dataLst = res.data;
        // console.log(class_idt.dataLst);
    })
}
const updatesubmitForm = (formEl: FormInstance | undefined) => {
    updatestuByIdinfo({
        bh: studentsinfo.dataLst.bh,
        sid: studentsinfo.dataLst.sid,
        name: studentsinfo.dataLst.name,
        school: studentsinfo.dataLst.school,
        rxnf: studentsinfo.dataLst.rxnf,
        myclass: studentsinfo.dataLst.myclass,
        national: studentsinfo.dataLst.national,
        sex: studentsinfo.dataLst.sex,
        birthday: studentsinfo.dataLst.birthday,
        lsjy: studentsinfo.dataLst.lsjy,
        mother: studentsinfo.dataLst.mother,
        father: studentsinfo.dataLst.father,
        telephone: studentsinfo.dataLst.telephone,
        telephone1: studentsinfo.dataLst.telephone1,
        address: studentsinfo.dataLst.address,
        djr: studentsinfo.dataLst.djr,
        djrq: studentsinfo.dataLst.djrq,
        sfyx: studentsinfo.dataLst.sfyx
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
    deletestuByIdinfo({
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
    deletestusByIdsinfo({
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
    stufuQuery({
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