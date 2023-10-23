<template>
  <div :class="classes.root">
    <span :class="classes.pre" @click="goPre" v-if="showPre">cd ..</span>
    <span :class="classes.copyright">世界那么大，一起去看看 © Sheriff</span>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNamespace } from '@/hooks';

const { bem } = useNamespace('footer');
const classes = reactive({
  root: computed(() => bem()),
  pre: computed(() => bem('pre')),
  copyright: computed(() => bem('copyright'))
});

const showPre = computed(() => {
  return route.path !== '/';
});

const route = useRoute();
const router = useRouter();
const goPre = () => {
  let path = route.path.split('/').slice(0, -1).join('/') || '/';
  router.push(path);
};
</script>

<style lang="less" scoped>
.blog-footer {
  padding: 10px 20px 20px;
  text-align: center;

  &__pre {
    display: inline-block;
    margin-bottom: 20px;
  }
  &__copyright {
    display: block;
  }
}
</style>
