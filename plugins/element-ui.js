import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import moment from 'moment'

Vue.use(Element, { locale })
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment;

Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD'){
  if (dateStr == null){
    return "至今"
  }
  return moment(dateStr).format(pattern);
})
