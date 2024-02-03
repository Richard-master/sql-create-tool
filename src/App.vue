<script setup lang="ts">
import { RouterLink, RouterView,useRouter } from 'vue-router'
const router = useRouter()
import {
  CalendarOutlined
} from '@ant-design/icons-vue';
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    icon: () => h(CalendarOutlined),
    label: '首页',
    router: '/about',
    title: '首页',
  },
  {
    key: '2',
    icon: () => h(CalendarOutlined),
    label: 'SQL生成',
    title: 'SQL生成',
  },
  {
    key: '3',
    icon: () => h(CalendarOutlined),
    label: '项目管理',
    title: '项目管理',
  },{
    key: '4',
    icon: () => h(CalendarOutlined),
    label: '更新记录',
    title: '更新记录',
  },
]);

const handleClick: MenuProps['onClick'] = menuInfo => {
  console.log('click ', menuInfo);
  if (menuInfo.key === '1'){
    router.push('/')
  }
  if (menuInfo.key === '2'){
    router.push('/SQLCreate')
  }
  if (menuInfo.key === '3'){
    router.push('/project')
  }
  if (menuInfo.key === '4'){
    router.push('/updateinfo')
  }
};
import {h, ref} from "vue";
import type {MenuProps} from "ant-design-vue";
import Footer from "@/components/Footer.vue";
let navData =  [
  {
    name: "首页",
    path: "/"
  },
  {
    name: "站长：观风"
  },{
    name: "个人网站",
    path: "https://javastudy.fun/"
  },{
    name: "代码已开源",
    path: "/contact"
  }
]
let copyright =  '程序员观风'
</script>

<template>
  <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width:100%;display: flex;justify-content: center"
      mode="horizontal"
      :items="items"
      @click="handleClick"
  />
  <div style="background: #f8fbf8;padding-top: 20px;padding-bottom:20px;min-height: calc(100vh - 54.8px)">
    <RouterView />
  </div>
  <div style="clear: both;">
    <Footer :navigation="navData" :copyright="copyright"></Footer>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
