<template>
    <el-dropdown class="eh-avatar">
        <div class="eh-avatar-wz">
            <span class="el-dropdown-link">
                <div>
                    <el-avatar :src="userinfo.dataList.avatar" />
                </div>
            </span>
            <span class="username">{{ userinfo.dataList.name }}</span>
        </div>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>系统消息</el-dropdown-item>
                <el-dropdown-item @click="drawer = true">修改密码</el-dropdown-item>
                <el-dropdown-item @click="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <!-- 修改密码 -->
    <el-drawer v-model="drawer" title="修改密码">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="新密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script lang="ts" setup>
import { updateuserByIdinfo } from "@/request/UserLogin.js";
// 修改密码
const drawer = ref(false)



const ruleFormRef = ref<FormInstance>()

const router = useRouter();
const userinfo = reactive({
    dataList: []
})
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("密码不一致"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
})

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})
const msg = () => {
    ElMessage('修改成功')
}
const submitForm = () => {
    updateuserByIdinfo({
        sid: userinfo.dataList.sid,
        name: userinfo.dataList.name,
        password: ruleForm.pass,
        sfyx: userinfo.dataList.sfyx,
    }).then(res => {
        // console.log(res);
        if (res.data == 1) {
            msg()
        }
    })

}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}



userinfo.dataList = JSON.parse(localStorage.getItem("userdata"))


const logout = () => {
    localStorage.removeItem('usertoken');
    router.replace("/login")

}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.eh-avatar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px;
    margin-right: 30px;
}

.eh-avatar-wz {
    display: flex;
    flex-direction: row;
}

.username {
    line-height: 40px;
    margin-left: 10px;
}
</style>
