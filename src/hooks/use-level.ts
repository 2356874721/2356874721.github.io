// 判断当前路由是一级路由还是二级路由
export const useLevel = (pathname: string) => {
  const level = pathname.split('/').filter(Boolean).length;
  return level;
};
