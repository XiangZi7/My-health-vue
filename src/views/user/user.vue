<template>
    <!-- 模糊搜索开始 -->
    <el-form :inline="true" :model="fuquery" class="demo-form-inline">
        <el-form-item label="学号" >
            <el-input v-model="fuquery.sid" placeholder="请输入学号" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
            <el-input v-model="fuquery.name" placeholder="请输入学生姓名" @keyup.enter="searchSubmit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
            <el-button type="primary" @click="fuquery.sid = '', fuquery.name = ''">清空</el-button>
            <!-- 导入 -->
            <el-button type="primary" @click="importExcel = true">导入</el-button>
            <el-button type="primary" @click="exportExcel = true">导出</el-button>
        </el-form-item>
    </el-form>



    <!-- 模糊搜索开始结束 -->
    <!-- 新增和批量删除开始 -->
    <el-row class="mb-4">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-popconfirm title="确定删除该数据?" @confirm="deleteByIds">
            <template #reference>
                <el-button type="danger">批量删除</el-button>Array
            </template>
        </el-popconfirm>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="新增学生">
        <!-- 新增表单 -->
        <el-form ref="ruleFormRef" :model="UserLogin" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sid">
                <el-input v-model="UserLogin.sid" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="UserLogin.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="UserLogin.password" />
            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="UserLogin.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(index, UserLogin.sfyx)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addclass">创建</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 新增和批量删除结束 -->
    <!-- 表格开始 -->
    <el-table :data="UsertableData.dataList" style="width: 100%" @selection-change="handleSelectionChange"
        ref="multipleTableRef">
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="sid" label="学号" sortable  />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="avatar" label="头像" width="70">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-image :src="scope.row.avatar" />
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="sfyx" property="sfyx" label="是否有效" width="120">
            <template v-slot="scope">
                <el-switch disabled v-model="scope.row.sfyx" :active-value="1" :inactive-value="0"
                    active-color="#17BF6D" @change="changestatus(scope.$index, scope.row.sfyx)">
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
    <!-- 导入excel表 -->
    <!-- 导入 -->
    <el-dialog v-model="importExcel" title="导入excel">
        <el-upload class="upload-demo" drag action="/" :on-change="onChange" :auto-upload="false" accept=".xlsx, .xls">
            <el-icon class="el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">
                点击上传或拖到区域
            </div>
        </el-upload>
        <el-table v-if="UsertableData1.dataList != ''" :data="UsertableData1.dataList" style="width: 100%"
            ref="multipleTableRef">
            <el-table-column type="index" label="序号" />
            <el-table-column prop="学号" label="学号" />
            <el-table-column prop="姓名" label="姓名" />
            <el-table-column prop="密码" label="密码" />
            <el-table-column prop="头像" label="头像" width="70">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.头像" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-button v-if="UsertableData1.dataList != ''" class="ml-3 " style="margin:10px !important;" type="success"
            @click="submitUpload">
            提交
        </el-button>
    </el-dialog>
    <!-- 导出excel表 -->
    <el-dialog v-model="exportExcel" title="导出Excel预览">
        <div id="table">
            <el-table :data="UsertableData.dataList" style="width: 100%" ref="multipleTableRef">
                <el-table-column type="index" label="序号" />
                <el-table-column prop="sid" label="学号" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="password" label="密码" />
                <el-table-column prop="avatar" label="头像" />
                <el-table-column prop="statusStr" label="是否有效" />
            </el-table>
        </div>
        <el-button type="primary" @click="exportClick">导出</el-button>
    </el-dialog>
    <!-- 修改表格 -->
    <el-dialog v-model="edit_stulVisible" title="修改用户">
        <el-form ref="ruleFormRef" :model="UserLogin.dataLst" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item label="学号" prop="sid">
                <el-input v-model="UserLogin.dataLst.sid" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="UserLogin.dataLst.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="UserLogin.dataLst.password" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <!-- <el-image :src="UserLogin.dataLst.avatar"  /> -->
                <el-avatar shape="square" :size="100" :fit="fit" :src="UserLogin.dataLst.avatar" />
                <!-- 修改头像 -->
                <!-- :before-upload="beforeAvatarUpload" -->

            </el-form-item>
            <el-form-item label="是否有效" prop="sfyx">
                <el-switch v-model="UserLogin.dataLst.sfyx" :active-value="1" :inactive-value="0" active-color="#17BF6D"
                    @change="changestatus(index, UserLogin.sfyx)" />
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
import { getuserinfo, adduserinfo, userfuQuery, getuserByIdinfo, updateuserByIdinfo, deleteuserByIdinfo, deleteusersByIdsinfo } from "@/request/UserLogin.js";
import { getExcel } from "@/utils/excel";
import xlsx from "xlsx"; // 注意处理方法引入方式

// 对话框
const importExcel = ref(false)

// 读取文件
const readFile = (file: any) => {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);//以二进制的方式读取
        reader.onload = ev => {
            resolve(ev.target.result);
        }
    })
}

const onChange = async (ev: any) => {
    let file = ev.raw;
    console.log(file)
    if (!file) {
        console.log("文件打开失败")
        return;
    } else {
        let data = await readFile(file);
        let workbook = xlsx.read(data, { type: "binary" });//解析二进制格式数据
        // console.log('二进制数据的解析:')
        // console.log(workbook)
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];//获取第一个Sheet
        let result = xlsx.utils.sheet_to_json(worksheet);//json数据格式
        // console.log('最终解析的 json 格式数据:')
        UsertableData1.dataList = result;
        console.log(result)
    }
}

const UsertableData1: User[] = reactive({ dataList: [] })

// 提交数据
const submitUpload = () => {
    console.log("点击" + UsertableData1.dataList.length);

    for (let i = 0; i < 2; i++) {
        adduserinfo({
            sid: UsertableData1.dataList[i].学号,
            name: UsertableData1.dataList[i].姓名,
            password: UsertableData1.dataList[i].密码,
            sfyx: 1,
        }).then((res: { data: number; }) => {
            if (res.data == 1) {
                addSuccess("用户添加成功")
                searchall()
                dialogFormVisible.value = false;
            }
        })
    }


}

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
    dataList: Array<any[]>,
    sid: String,
    name: String,
    password: String,
    sfyx: Number,

}
// 表单
const UsertableData: User[] = reactive({ dataList: [] })
// 表格数据
const UserLogin = reactive({
    dataLst: [],
    sid: '',
    name: '',
    password: '',
    sfyx: '',

})

// 获取班级信息
const searchall = () => {
    getuserinfo({
        current: currentPage.value,
        size: pageSize.value
    }).then((res: { data: { records: any; total: number; }; }) => {
        UsertableData.dataList = res.data.records
        // console.log(classtableData);
        countpage.value = res.data.total
    })
}
// 更改表格状态
const changestatus = (index: any, row: any) => {
    // console.log(index);
    // console.log(row);
}
onMounted(() => {
    searchall();
})

// 新增
const addSuccess = (msg: string) => {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    })
}
const dialogFormVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const addclass = () => {
    adduserinfo({
        sid: UserLogin.sid,
        name: UserLogin.name,
        password: UserLogin.password,
        sfyx: UserLogin.sfyx,

    }).then((res: { data: number; }) => {
        if (res.data == 1) {
            addSuccess("用户添加成功")
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
    // console.log(row.sid)
    getuserByIdinfo({
        sid: row.sid
    }).then((res: { data: never[]; }) => {
        console.log(res.data);
        UserLogin.dataLst = res.data;
        // console.log(class_idt.dataLst);
    })
}
const updatesubmitForm = (formEl: FormInstance | undefined) => {
    updateuserByIdinfo({
        sid: UserLogin.dataLst.sid,
        name: UserLogin.dataLst.name,
        password: UserLogin.dataLst.password,
        sfyx: UserLogin.dataLst.sfyx,
    }).then((res: { data: number; }) => {
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
    deleteuserByIdinfo({
        sid: row.sid
    }).then((res: { data: number; }) => {
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
let selectIds: { [x: number]: string; toString: () => string; charAt: (pos: number) => string; charCodeAt: (index: number) => number; concat: (...strings: string[]) => string; indexOf: (searchString: string, position?: number | undefined) => number; lastIndexOf: (searchString: string, position?: number | undefined) => number; localeCompare: { (that: string): number; (that: string, locales?: string | string[] | undefined, options?: Intl.CollatorOptions | undefined): number; }; match: { (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }; replace: { (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string; (searchValue: { [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string; }, replacer: (substring: string, ...args: any[]) => string): string; }; search: { (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }; slice: (start?: number | undefined, end?: number | undefined) => string; split: { (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }; substring: (start: number, end?: number | undefined) => string; toLowerCase: () => string; toLocaleLowerCase: (locales?: string | string[] | undefined) => string; toUpperCase: () => string; toLocaleUpperCase: (locales?: string | string[] | undefined) => string; trim: () => string; readonly length: number; substr: (from: number, length?: number | undefined) => string; valueOf: () => string; codePointAt: (pos: number) => number | undefined; includes: (searchString: string, position?: number | undefined) => boolean; endsWith: (searchString: string, endPosition?: number | undefined) => boolean; normalize: { (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string; (form?: string | undefined): string; }; repeat: (count: number) => string; startsWith: (searchString: string, position?: number | undefined) => boolean; anchor: (name: string) => string; big: () => string; blink: () => string; bold: () => string; fixed: () => string; fontcolor: (color: string) => string; fontsize: { (size: number): string; (size: string): string; }; italics: () => string; link: (url: string) => string; small: () => string; strike: () => string; sub: () => string; sup: () => string; padStart: (maxLength: number, fillString?: string | undefined) => string; padEnd: (maxLength: number, fillString?: string | undefined) => string; trimEnd: () => string; trimStart: () => string; trimLeft: () => string; trimRight: () => string; matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>; replaceAll: { (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }; at: (index: number) => string | undefined;[Symbol.iterator]: () => IterableIterator<string>; }[] = [];
const deleteByIds = () => {
    for (let i = 0; i < multipleSelection.value.length; i++) {
        let selectionElement = multipleSelection.value[i];
        selectIds[i] = selectionElement.sid;
    }
    deleteusersByIdsinfo({
        sid: selectIds
    }).then((res: any) => {
        searchall()
    })
}
// 查询
const fuquery = reactive({
    sid: '',
    name: '',
})
const searchSubmit = () => {
    userfuQuery({
        sid: fuquery.sid,
        name: fuquery.name,
        current: currentPage.value,
        size: pageSize.value
    }).then((res: { data: { records: any; total: number; }; }) => {
        // console.log(res.data);
        UsertableData.dataList = res.data.records
        countpage.value = res.data.total

    })
}

</script>


<style lang='scss'>
.upload_demo {
    margin: 0 12px;
}

.el-upload-list {
    margin: 0;
}

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