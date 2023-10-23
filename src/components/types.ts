import type { ExtractPropTypes, PropType } from 'vue';
import { RouteRecordNormalized } from 'vue-router';

export const listProps = {
  routeName: {
    type: String as PropType<'technology' | 'articles' | 'life'>,
    default: 'technology'
  }
};

export const itemProps = {
  route: {
    type: Object as PropType<RouteRecordNormalized>,
    default: {}
  }
};

export type ListProps = Partial<ExtractPropTypes<typeof listProps>>;
export type ItemProps = Partial<ExtractPropTypes<typeof itemProps>>;
