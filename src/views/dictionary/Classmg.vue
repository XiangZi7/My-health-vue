<template>
    <!-- 模糊搜索开始 -->
    <el-form :inline="true" :model="likesearck" class="demo-form-inline">
        <el-form-item label="班级编号">
            <el-input v-model="likesearck.cdId" placeholder="请输入班级编号" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
            <el-input v-model="likesearck.cdName" placeholder="请输入班级名称" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
            <el-button type="primary" @click="likesearck.cdId = '', likesearck.cdName = ''">清空</el-button>
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
        <el-form ref="ruleFormRef" :model="class_idt" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="班级编号" prop="cdId">
                <el-input v-model="class_idt.cdId" />
            </el-form-item>
            <el-form-item label="班级名称" prop="cdName">
                <el-input v-model="class_idt.cdName" />
            </el-form-item>
            <el-form-item label="排序号" prop="cdIndex">
                <el-input v-model.number="class_idt.cdIndex" />
            </el-form-item>
            <el-form-item label="学校编号" prop="schId">
                <el-input v-model.number="class_idt.schId" />
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
                <el-input v-model="class_idt.linkman" />
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
                <el-input v-model.number="class_idt.telephone" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="class_idt.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(index, class_idt.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addclass">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 新增和批量删除结束 -->
    <!-- 表格开始 -->
    <el-table :data="classtableData.dataList" style="width: 100%" @selection-change="handleSelectionChange"
        ref="multipleTableRef">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="70" label="序号" />
        <el-table-column prop="cdId" label="班别编号" />
        <el-table-column prop="cdName" label="班别名称" />
        <el-table-column prop="cdIndex" label="排序号" />
        <el-table-column prop="schId" label="学校编号" />
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
        <el-form ref="ruleFormRef" :model="class_idt.dataLst" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="班级编号" prop="cdId">
                <el-input v-model="class_idt.dataLst.cdId" />
            </el-form-item>
            <el-form-item label="班级名称" prop="cdName">
                <el-input v-model="class_idt.dataLst.cdName" />
            </el-form-item>
            <el-form-item label="排序号" prop="cdIndex">
                <el-input v-model="class_idt.dataLst.cdIndex" />
            </el-form-item>
            <el-form-item label="学校编号" prop="schId">
                <el-input v-model="class_idt.dataLst.schId" />
            </el-form-item>
            <el-form-item label="联系人" prop="linkman">
                <el-input v-model="class_idt.dataLst.linkman" />
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
                <el-input v-model="class_idt.dataLst.telephone" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="class_idt.dataLst.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(index, class_idt.dataLst.sfyx)" />
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
import { getclassmginfo, getclassmglikeinfo, getaddclassmginfo, getclassmgByIdinfo, updateclassmgByIdinfo, deleteclassmgByIdinfo, deleteclassmgByIdsinfo } from "@/request/Classapi.js";
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
    cdId: String,
    cdName: String,
    cdIndex: Number,
    schId: String,
    linkman: String,
    telephone: String,
    sfyx: Number
}
// 表单
const classtableData: User[] = reactive({ dataList: [] })
// 表格数据
const class_idt = reactive({
    dataLst: [],
    cdId: '',
    cdName: '',
    cdIndex: '',
    schId: '',
    linkman: '',
    telephone: '',
    sfyx: ""
})

// 获取班级信息
const searchall = () => {
    getclassmginfo({
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        classtableData.dataList = res.data.data.records
        countpage.value = res.data.data.total
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
    getaddclassmginfo({
        cdId: class_idt.cdId,
        cdName: class_idt.cdName,
        cdIndex: class_idt.cdIndex,
        schId: class_idt.schId,
        linkman: class_idt.linkman,
        telephone: class_idt.telephone,
        sfyx: class_idt.sfyx,
    }).then(res => {
        if (res.data == 1) {
            addSuccess("班级添加成功")
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
    getclassmgByIdinfo({
        bh: row.bh
    }).then(res => {
        // console.log(res);
        class_idt.dataLst = res.data;
        // console.log(class_idt.dataLst);
    })
}
const updatesubmitForm = (formEl: FormInstance | undefined) => {
    updateclassmgByIdinfo({
        bh: class_idt.dataLst.bh,
        cdId: class_idt.dataLst.cdId,
        cdName: class_idt.dataLst.cdName,
        cdIndex: class_idt.dataLst.cdIndex,
        schId: class_idt.dataLst.schId,
        linkman: class_idt.dataLst.linkman,
        telephone: class_idt.dataLst.telephone,
        sfyx: class_idt.dataLst.sfyx,
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
    deleteclassmgByIdinfo({
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
    deleteclassmgByIdsinfo({
        bh: selectIds
    }).then(res => {
            searchall()
    })
}
// 查询
const likesearck = reactive({
    cdId: '',
    cdName: '',
})
const searchSubmit = () => {
    getclassmglikeinfo({
        cdid: likesearck.cdId,
        cdname: likesearck.cdName,
        current: currentPage.value,
        size: pageSize.value
    }).then(res => {
        // console.log(res.data);
        classtableData.dataList = res.data.records
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