import request from './request'


export const stuinfo = (params) => request.get("student/selectBySid", { params })
export const stupeditinfo = (params) => request.get("stupedit/selectBySid", { params })
