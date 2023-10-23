<template>
  <div :class="classes.root" @click="toogleDark">
    <img
      :class="classes.icon"
      v-show="!isDark"
      src="../assets/img/sun.png"
      alt=""
    />
    <img
      :class="classes.icon"
      v-show="isDark"
      src="../assets/img/moon.png"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { isDark, useNamespace } from '@/hooks';

const { bem } = useNamespace('theme');
const classes = reactive({
  root: computed(() => bem()),
  icon: computed(() => bem('icon'))
});

const toogleDark = () => {
  isDark.value = !isDark.value;
};
</script>

<style lang="less" scoped>
.blog-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  &__icon {
    width: 26px;
    height: 26px;
  }
}
</style>
