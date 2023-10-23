<template>
  <div :class="classes.root">
    <router-link
      v-for="(item, index) in routes"
      :key="index"
      :to="item.path"
      :class="classes.item"
      ><Item :route="item"
    /></router-link>
  </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { listProps } from './types';
import { useNamespace } from '@/hooks';

const { bem } = useNamespace('list');
const classes = reactive({
  root: computed(() => bem()),
  item: computed(() => bem('item'))
});

const props = defineProps(listProps);
const { routeName } = toRefs(props);

const getFrontmatter = (route: any) => {
  return route.meta.frontmatter;
};
const router = useRouter();
const routes = router
  .getRoutes()
  .filter(
    (item) =>
      item.path.startsWith(`/${routeName.value}`) && getFrontmatter(item).date
  )
  .sort(
    (a: any, b: any) =>
      +new Date(getFrontmatter(b).date) - +new Date(getFrontmatter(a).date)
  );
</script>

<style scoped lang="less">
.blog-list {
  padding-top: 10px;
  &__item {
    display: block;
    margin-bottom: 15px;
  }
}
</style>
