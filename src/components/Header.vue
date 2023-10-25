<template>
  <div :class="classes.root">
    <img
      :class="classes.avatar"
      src="@/assets/img/avatar.jpg"
      alt=""
      @click="goHome"
    />
    <ul :class="classes.nav">
      <router-link
        v-for="(item, index) in navList"
        :to="item.path"
        :key="index"
        :class="[
          classes['nav-item'],
          { active: item.active, hide: !item.display }
        ]"
        >{{ item.title }}</router-link
      >
      <Theme></Theme>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watchEffect, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNamespace } from '@/hooks';

const activePath = ref('');
const route = useRoute();
watchEffect(() => {
  activePath.value = route.path;
});

const { bem } = useNamespace('header');
const classes = reactive({
  root: computed(() => bem()),
  avatar: computed(() => bem('avatar')),
  nav: computed(() => bem('nav')),
  'nav-item': computed(() => bem('nav-item'))
});
const navList = computed(() => {
  let routes = [
    {
      title: '技术',
      path: '/technology',
      active: false,
      display: true
    },
    {
      title: '日常',
      path: '/life',
      active: false,
      display: false
    },
    {
      title: '文章',
      path: '/articles',
      active: false,
      display: true
    }
  ];
  let firstLevelPath = `/${activePath.value.split('/')[1]}`;
  routes.forEach((item) => {
    if (item.path === firstLevelPath) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
  return routes;
});

const router = useRouter();
const goHome = () => {
  router.push('/');
};
</script>

<style lang="less" scoped>
.blog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #eee;
  }
  &__nav {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__nav-item {
    margin-right: 15px;
  }
  &__nav-item.active {
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: -3px;
    }
  }
  &__nav-item.hide {
    display: none;
  }
}
</style>
