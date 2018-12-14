import Vue from 'vue'
import moment from 'moment'
import filters from './filter'

// 时间格式化
export function formatDate (date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}
export default {
  ...filters,
  formatDate
}



