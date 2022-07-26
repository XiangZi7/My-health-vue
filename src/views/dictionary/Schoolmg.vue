<template>
    <!-- 模糊搜索开始 -->
    <el-form :inline="true" :model="likesearck" class="demo-form-inline">
        <el-form-item label="学校编号">
            <el-input v-model="likesearck.sdId" placeholder="请输入班级编号" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="学校名称">
            <el-input v-model="likesearck.sdName" placeholder="请输入班级名称" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
            <el-button type="primary" @click="likesearck.sdId = '', likesearck.sdName = ''">清空</el-button>
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
    <el-dialog v-model="dialogFormVisible" title="新增学校">
        <!-- 新增表单 -->
        <el-form ref="ruleFormRef" :model="school_idt" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学校编号" prop="sdId">
                <el-input v-model="school_idt.sdId" />
            </el-form-item>
            <el-form-item label="学校名称" prop="sdName">
                <el-input v-model="school_idt.sdName" />
            </el-form-item>
            <el-form-item label="排序号" prop="sdIndex">
                <el-input v-model.number="school_idt.sdIndex" />
            </el-form-item>
            <el-form-item label="学校地址" prop="address">
                <el-input v-model.number="school_idt.address" />
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
                <el-input v-model="school_idt.linkman" />
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
                <el-input v-model.number="school_idt.telephone" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="school_idt.dataLst.sfyx" :active-value="1" :inactive-value="0"
                    active-color="#17BF6D" @change="changestatus(index, school_idt.dataLst.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addsch">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 新增和批量删除结束 -->
    <!-- 表格开始 -->
    <el-table :data="schtableData.dataList" style="width: 100%" @selection-change="handleSelectionChange"
        ref="multipleTableRef">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="70" label="序号" />
        <el-table-column prop="sdId" label="学校编号" />
        <el-table-column prop="sdName" label="学校名称" />
        <el-table-column prop="sdIndex" label="排序号" />
        <el-table-column prop="address" label="学校地址" />
        <el-table-column prop="linkman" label="联系人" />
        <el-table-column prop="telephone" label="电话号码" />
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
    <el-dialog v-model="edit_schoolVisible" title="修改学校">
        <el-form ref="ruleFormRef" :model="school_idt.dataLst" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="班级编号" prop="sdId">
                <el-input v-model="school_idt.dataLst.sdId" />
            </el-form-item>
            <el-form-item label="班级名称" prop="sdName">
                <el-input v-model="school_idt.dataLst.sdName" />
            </el-form-item>
            <el-form-item label="排序号" prop="sdIndex">
                <el-input v-model="school_idt.dataLst.sdIndex" />
            </el-form-item>
            <el-form-item label="学校编号" prop="address">
                <el-input v-model="school_idt.dataLst.address" />
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
                <el-input v-model="school_idt.dataLst.linkman" />
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
                <el-input v-model="school_idt.dataLst.telephone" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="school_idt.dataLst.sfyx" :active-value="1" :inactive-value="0"
                    active-color="#17BF6D" @change="changestatus(index, school_idt.dataLst.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatesubmitForm(ruleFormRef)">修改</el-button>
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

import { reactive, ref, onMounted } from 'vue'
import { getschmginfo, getschlikeinfo, getaddschmginfo, getschmgByIdinfo, updateschmgByIdinfo, deleteschmgByIdinfo, deleteschmgByIdsinfo } from "@/request/Schapi.js";
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
    sdId: String,
    sdName: String,
    sdIndex: Number,
    address: String,
    linkman: String,
    telephone: String,
    sfyx: String
}
// 表单
const schtableData: User[] = reactive({ dataList: [] })

// 表格模型
const school_idt = reactive({
    dataLst: [],
    sdId: '',
    sdName: '',
    sdIndex: '',
    address: '',
    linkman: '',
    telephone: '',
    sfyx: ""
})
// 获取学校信息
const searchall = () => {
    getschmginfo({
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        schtableData.dataList = res.data.records
        // console.log(classtableData);
        countpage.value = res.data.total
    })
}
// 更改表格状态
const changestatus = (index, row) => {
    // console.log(index);
    console.log(row);
    school_idt.sfyx = row;

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
const addsch = () => {
    getaddschmginfo({
        sdId: school_idt.sdId,
        sdName: school_idt.sdName,
        sdIndex: school_idt.sdIndex,
        address: school_idt.address,
        linkman: school_idt.linkman,
        telephone: school_idt.telephone,
        sfyx: school_idt.sfyx,
    }).then(res => {
        if (res.data == 1) {
            addSuccess("学校添加成功")
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
const edit_schoolVisible = ref(false)
const handleEdit = (index: number, row: User) => {
    edit_schoolVisible.value = true;
    // console.log(index)
    // console.log(row.bh)
    getschmgByIdinfo({
        bh: row.bh
    }).then(res => {
        // console.log(res);
        school_idt.dataLst = res.data;
        // console.log(class_idt.dataLst);
    })
}
const updatesubmitForm = (formEl: FormInstance | undefined) => {
    updateschmgByIdinfo({
        bh: school_idt.dataLst.bh,
        sdId: school_idt.dataLst.sdId,
        sdName: school_idt.dataLst.sdName,
        sdIndex: school_idt.dataLst.sdIndex,
        address: school_idt.dataLst.address,
        linkman: school_idt.dataLst.linkman,
        telephone: school_idt.dataLst.telephone,
        sfyx: school_idt.dataLst.sfyx,
    }).then(res => {
        // console.log(res);
        if (res.data == 1) {
            edit_schoolVisible.value = false;
            searchall()
        }
    })
}
// 删除
const handleDelete = (index: number, row: User) => {
    // console.log(index, row)
    deleteschmgByIdinfo({
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
    deleteschmgByIdsinfo({
        bh: selectIds
    }).then(res => {
        searchall()
    })
}
// 查询
const likesearck = reactive({
    sdId: '',
    sdName: '',
})
const searchSubmit = () => {
    getschlikeinfo({
        sdid: likesearck.sdId,
        sdname: likesearck.sdName,
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        // console.log(res.data);
        schtableData.dataList = res.data.records
        countpage.value = res.data.total

    })
}
</script>


<style lang='scss'>
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