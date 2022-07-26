import request from './request'



// 用户登录
export const userlogin = (params) => request.get("user/login", { params })
// 获取学生信息
export const getuserinfo = (params) => request.get("user/userAll", { params })
// 新增学生信息
export const adduserinfo = (params) => request.get("user/addUser", { params })
// 获取学生模糊搜索信息
export const userfuQuery = (params) => request.get("user/fuQuery", { params })
// 根据ID查找学生信息
export const getuserByIdinfo = (params) => request.get("user/DisplayData", { params })
// 根据ID修改学生数据
export const updateuserByIdinfo = (params) => request.get("user/UserUpdate", { params })
// 根据ID删除学生数据
export const deleteuserByIdinfo = (params) => request.get("user/deleteById", { params })
// 根据ID删除学生数据
export const deleteusersByIdsinfo = (params) => request.get(`user/deleteByIds?sid=${params.sid}`)

export const checkToken = () =>request.get("user/checkToken")





