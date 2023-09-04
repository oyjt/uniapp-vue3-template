import {
  createPinia
} from 'pinia';
import { createUnistorage } from 'pinia-plugin-unistorage'

const store = createPinia();
// pinia数据持久化
store.use(createUnistorage());
export default store
