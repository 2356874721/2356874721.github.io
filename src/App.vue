<template>
  <div :class="classes.root">
    <Header></Header>
    <div :class="classes.main">
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useNamespace } from '@/hooks';

const { bem } = useNamespace('wrap');
const classes = reactive({
  root: computed(() => bem()),
  main: computed(() => bem('main'))
});
</script>

<style lang="less" scoped>
.blog-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &__main {
    flex: 1;
    padding: 0 16px;
    box-sizing: border-box;
    overflow-x: scroll;
    width: 375px;
    margin: 0 auto;
  }
}
</style>
