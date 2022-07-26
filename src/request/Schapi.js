import request from './request'



// 获取学校信息
export const getschmginfo = (params) => request.get(`sch/schAll?current=${params.current}&size=${params.size}`)
// 获取学校模糊搜索信息
export const getschlikeinfo = (params) => request.get(`sch/likeselect?sdid=${params.sdid}&sdname=${params.sdname}&current=${params.current}&size=${params.size}`)
// 新增学校信息
export const getaddschmginfo = (params) => request.get(`sch/addsch?sdId=${params.sdId}&sdName=${params.sdName}&sdIndex=${params.sdIndex}&address=${params.address}&linkman=${params.linkman}&telephone=${params.telephone}&sfyx=${params.sfyx}`)
// 根据ID查找学校信息
export const getschmgByIdinfo = (params) => request.get(`sch/showupdate?bh=${params.bh}`)
// 根据ID修改学校数据
export const updateschmgByIdinfo = (params) => request.get(`sch/updatesch?bh=${params.bh}&sdId=${params.sdId}&sdName=${params.sdName}&sdIndex=${params.sdIndex}&address=${params.address}&linkman=${params.linkman}&telephone=${params.telephone}&sfyx=${params.sfyx}`)
// 根据ID删除学校数据
export const deleteschmgByIdinfo = (params) => request.get(`sch/deleteById?bh=${params.bh}`)
// 根据ID删除学校数据
export const deleteschmgByIdsinfo = (params) => request.get(`sch/deleteByIds?bh=${params.bh}`)


export const selectBySdId = (params) => request.get("sch/selectBysdId", { params })



