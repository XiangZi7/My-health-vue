
import request from './request'

export const getzwid = (params) => request.get(`mang/selectByid?zwid=${params.zwid}`)