import Vue from 'vue'
import moment from 'moment'
import filters from './filter'

// 时间格式化
export function formatDate (date, fmt) {
  return moment(date).format('YYYY-MM-DD');
}
export default {
  ...filters,
  formatDate
}



