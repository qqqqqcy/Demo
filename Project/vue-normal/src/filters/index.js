export default {
  // 将时间戳转换为标准时间格式
  stampDate: (value) => {
    let str = "";
    let date = new Date(value);
    str += date.getFullYear() + '-'; //年
    str += date.getMonth() + 1 + '-'; //月 月比实际月份要少1
    str += date.getDate();
    return str
  }
}
