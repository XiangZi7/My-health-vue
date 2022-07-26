import request from './request'



// 管理员登录
export const adminlogin = (params) => request.get("admin/login", { params })
// 获取学生信息
export const getadmininfo = (params) => request.get("admin/adminAll", { params })
// 新增学生信息
export const addadmininfo = (params) => request.get("admin/addAdmin", { params })
// 获取学生模糊搜索信息
export const adminfuQuery = (params) => request.get("admin/fuQuery", { params })
// 根据ID查找学生信息
export const getadminByIdinfo = (params) => request.get("admin/DisplayData", { params })
// 根据ID修改学生数据
export const updateadminByIdinfo = (params) => request.get("admin/AdminUpdate", { params })
// 根据ID删除学生数据
export const deleteadminByIdinfo = (params) => request.get("admin/deleteById", { params })
// 根据ID删除学生数据
export const deleteadminsByIdsinfo = (params) => request.get(`admin/deleteByIds?sid=${params.aid}`)


export const checkToken = () =>request.get("admin/checkToken")


