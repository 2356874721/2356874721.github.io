<template>
  <div :class="classes.root">
    <div :class="classes.title">
      {{ frontmatter.title }}
      <span :class="classes.badge" :style="badgeStyle" v-if="badgeData.name">{{
        badgeData.name
      }}</span>
    </div>
    <div :class="classes.date">
      {{ useDate(frontmatter.date) }}
      <span :class="classes.duration" v-if="frontmatter.duration"
        >· {{ frontmatter.duration }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, toRefs } from 'vue';
import { useNamespace, useDate } from '@/hooks';
import { itemProps } from './types';

const { bem } = useNamespace('item');
const classes = reactive({
  root: computed(() => bem()),
  title: computed(() => bem('title')),
  badge: computed(() => bem('badge', 'border')),
  date: computed(() => bem('date')),
  duration: computed(() => bem('duration'))
});

const props = defineProps(itemProps);
const { route } = toRefs(props);

const frontmatter = computed(() => (route.value.meta as any).frontmatter);
const badgeData = computed(() => {
  const { badge, badgeColor } = frontmatter.value;
  if (badge) {
    return {
      name: badge.trim(),
      color: badgeColor ? badgeColor.trim() : 'currentcolor'
    };
  }
  return {};
});
const badgeStyle = computed(() => ({
  color: badgeData.value.color,
  borderColor: badgeData.value.color
}));
</script>

<style scoped lang="less">
.blog-item {
  &__badge {
    padding: 2px 3px;
    position: relative;
    top: -8px;
    &::after {
      content: '';
      display: block;
      border-radius: 5px;
    }
  }
}
</style>
