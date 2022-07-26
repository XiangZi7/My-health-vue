import request from './request'




// 获取学生信息
// export const getstuinfo = (params) => request.get(`student/stuAll?current=${params.current}&size=${params.size}`)
export const getstuinfo = (params) => request.get("student/stuAll", { params })
// 新增学生信息
export const addstuinfo = (params) => request.get("student/addStu", { params })
// 获取学生模糊搜索信息
export const stufuQuery = (params) => request.get("student/fuQuery", { params })
// 根据ID查找学生信息
export const getstuByIdinfo = (params) => request.get("student/DisplayData", { params })
// 根据ID修改学生数据
export const updatestuByIdinfo = (params) => request.get("student/UpdateStu", { params })
// 根据ID删除学生数据
export const deletestuByIdinfo = (params) => request.get("student/deleteById", { params })
// 根据ID删除学生数据
export const deletestusByIdsinfo = (params) => request.get(`student/deleteByIds?bh=${params.bh}`)
// 获取性别人数
export const getstuSexCount = () => request.get("student/stuSexCount")





