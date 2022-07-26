import request from './request'





// 获取班级信息
export const getclassmginfo = (params) => request.get(`class/classldtAll?current=${params.current}&size=${params.size}`)
// 获取班级模糊搜索信息
export const getclassmglikeinfo = (params) => request.get(`class/likeselect?cdid=${params.cdid}&cdname=${params.cdname}&current=${params.current}&size=${params.size}`)
// 新增班级信息
export const getaddclassmginfo = (params) => request.get(`class/addclass?cdId=${params.cdId}&cdName=${params.cdName}&cdIndex=${params.cdIndex}&linkman=${params.linkman}&telephone=${params.telephone}&schId=${params.schId}&sfyx=${params.sfyx}`)
// 根据ID查找班级信息
export const getclassmgByIdinfo = (params) => request.get(`class/showupdate?bh=${params.bh}`)
// 根据ID修改班级数据
export const updateclassmgByIdinfo = (params) => request.get(`class/updateClass?bh=${params.bh}&cdId=${params.cdId}&cdName=${params.cdName}&cdIndex=${params.cdIndex}&linkman=${params.linkman}&telephone=${params.telephone}&schId=${params.schId}&sfyx=${params.sfyx}`)
// 根据ID删除班级数据
export const deleteclassmgByIdinfo = (params) => request.get(`class/deleteById?bh=${params.bh}`)
// 根据ID删除班级数据
export const deleteclassmgByIdsinfo = (params) => request.get(`class/deleteByIds?bh=${params.bh}`)

export const selectBycdId = (params) => request.get("class/selectByCdid", { params })





