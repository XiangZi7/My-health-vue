import request from './request'




// 获取学生信息
// export const getstuinfo = (params) => request.get(`stupedit/stuAll?current=${params.current}&size=${params.size}`)
export const getstupeditinfo = (params) => request.get("stupedit/stupeditAll", { params })
// 新增学生信息
export const addstupeditinfo = (params) => request.get("stupedit/addstupedit", { params })
// 获取学生模糊搜索信息
export const stupeditfuQuery = (params) => request.get("stupedit/fuQuery", { params })
// 根据ID查找学生信息
export const getstupeditByIdinfo = (params) => request.get("stupedit/DisplayData", { params })
// 根据ID修改学生数据
export const updatestupeditByIdinfo = (params) => request.get("stupedit/Updatestupedit", { params })
// 根据ID删除学生数据
export const deletestupeditByIdinfo = (params) => request.get("stupedit/deleteById", { params })
// 根据ID删除学生数据
export const deletestupeditsByIdsinfo = (params) => request.get(`stupedit/deleteByIds?bh=${params.bh}`)





