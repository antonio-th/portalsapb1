// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import {Button, Container, Header, Main, Aside, Footer,
  Message, Alert, Loading, MessageBox, Confirm, Notification,
  Row, Col, Input, Select, DatePicker, Table, TableColumn, Pagination,
  Option, Card, Autocomplete, Form, FormItem, Dialog, Collapse, CollapseItem
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/es'
import locale from 'element-ui/lib/locale'
import moment from 'moment'

moment.locale('es')

locale.use(lang)

Vue.directive('loading', Loading)

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Autocomplete)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(CollapseItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.$ELEMENT = {size: 'small'}
Vue.prototype.$loading = Loading
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = Alert
Vue.prototype.$confirm = Confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
