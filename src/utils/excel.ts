import FileSaver from "file-saver";
import xlxs from "xlsx";

// 导出excel
const state = reactive({
    excelTitle: "用户数据",
});
export const getExcel = () => {
    // 设置当前日期
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let name = year + "" + month + "" + day;
    // 导出文件名
    const filename = state.excelTitle;
    // 通过id，获取导出的表格数据
    const wb = xlxs.utils.table_to_book(document.getElementById("table"), {
        raw: true,
    });
    const wbout = xlxs.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    try {
        FileSaver.saveAs(
            new Blob([wbout], {
                type: "application/octet-stream",
            }),
            name + ".xlsx"
        );
    } catch (e) {
        console.log(e);
    }
    return wbout;
}