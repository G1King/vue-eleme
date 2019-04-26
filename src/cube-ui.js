import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  TabBar,
  Dialog,
  Toast,
  Form,
  Input,
  Rate

} from 'cube-ui'

Vue.use(Button)
Vue.use(TabBar)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(Input)
Vue.use(Rate)
