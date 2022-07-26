<template>
  <el-form ref="ruleFormRef" :label-position="labelPosition" label-width="140px" :model="stu_peditform"
    style="max-width: 460px" class="nit">
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
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { addstupeditinfo } from "@/request/StuPeditapi.js";
// 更改表格状态
const changestatus = (index, row) => {
  // console.log(index);
  // console.log(row);
}
const labelPosition = ref('right')
// 重置表格数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const ruleFormRef = ref<FormInstance>()
// do not use same name with ref
const stu_peditform = reactive({
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
  rbrq1: '',
  sfyx: '',
})

const onSubmit = () => {
  // console.log('submit!')
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
    rbrq: stu_peditform.rbrq + stu_peditform.rbrq1,
    sfyx: stu_peditform.sfyx,
  }).then(res => {
    if (res.data == 1) {
      addSuccess("学生添加成功")
    }
  })
}
// 新增
const addSuccess = (msg) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: 'success',
  })
}
</script>
