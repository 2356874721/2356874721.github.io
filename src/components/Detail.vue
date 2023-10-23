<template>
  <div :class="classes.root" v-if="title">
    <div :class="classes.title">{{ title }}</div>
    <div :class="classes.tags">
      <span
        :class="classes.tag"
        v-for="(item, index) in tags"
        :key="item"
        :style="{ color: tagsColor[index], borderColor: tagsColor[index] }"
        >{{ item }}</span
      >
    </div>
    <div :class="classes.date" v-if="date">
      {{ useDate(date) }}
      · <span :class="classes.duration">{{ duration }}</span>
    </div>
    <p :class="classes.subtitle" v-if="subtitle">
      {{ subtitle }}
    </p>
  </div>
  <slot />
</template>

<script setup lang="ts">
import { reactive, computed, toRefs } from 'vue';
import { useNamespace, useDate } from '@/hooks';

const { bem } = useNamespace('detail');
const classes = reactive({
  root: computed(() => bem()),
  title: computed(() => bem('title')),
  tags: computed(() => bem('tags')),
  tag: computed(() => bem('tag', 'border')),
  date: computed(() => bem('date')),
  duration: computed(() => bem('duration')),
  subtitle: computed(() => bem('subtitle'))
});

const { frontmatter } = defineProps<{ frontmatter: any }>();
const { title, tags, date, duration, subtitle, tagsColor } =
  toRefs(frontmatter);
</script>

<style scoped lang="less">
.blog-detail {
  padding-top: 10px;
  margin-bottom: 20px;
  &__title {
    font-weight: bold;
    margin-bottom: 15px;
  }
  &__tags {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;
  }
  &__tag {
    padding: 2px 3px;
    margin-right: 5px;
    &::after {
      content: '';
      display: block;
      border-radius: 4px;
    }
  }
  &__date {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &__subtitle {
    font-style: italic;
    margin-top: 5px;
  }
}
</style>
