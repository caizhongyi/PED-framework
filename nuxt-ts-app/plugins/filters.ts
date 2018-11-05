import Vue from 'vue'
import filters from '../filters/index'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters;
