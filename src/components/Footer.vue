<template>
  <div :class="classes.root" v-if="showFooter">
    <span :class="classes.copyright">世界那么大，一起去看看 © Sheriff</span>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNamespace, useLevel } from '@/hooks';

const { bem } = useNamespace('footer');
const classes = reactive({
  root: computed(() => bem()),
  copyright: computed(() => bem('copyright'))
});

const route = useRoute();
const showFooter = computed(() => {
  return useLevel(route.path) > 1;
});
</script>

<style lang="less" scoped>
.blog-footer {
  padding: 30px 20px 20px;
  text-align: center;

  &__copyright {
    display: block;
  }
}
</style>
