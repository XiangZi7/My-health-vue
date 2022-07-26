// 判断移动端
export const isMoblie = ():boolean => {
    let flag = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
    if (flag === null) {
        return false
    } else {
        return true
    }


}