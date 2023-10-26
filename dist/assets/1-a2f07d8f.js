import{o as e,c,w as p,_ as l,a as n,d as s}from"./app-9ae950a6.js";const i=n("div",{class:"markdown-body"},[n("h2",null,"入口文件"),n("p",null,"Vite 默认会把项目根目录下的index.html作为入口文件。入口文件的路径可以更改。"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// vite.config.ts"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" defineConfig "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite'"),s(`
`),n("span",{class:"token keyword"},"import"),s(" path "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'path'"),s(`
`),n("span",{class:"token keyword"},"import"),s(" react "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'@vitejs/plugin-react'"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token function"},"defineConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// 重新指定项目根目录位置"),s(`
  root`),n("span",{class:"token operator"},":"),s(" path"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"join"),n("span",{class:"token punctuation"},"("),s("__dirname"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'src'"),n("span",{class:"token punctuation"},")"),s(`
  plugins`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token function"},"react"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"]"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("h2",null,"构建命令"),n("pre",{class:"language-json"},[n("code",{class:"language-json"},[n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},'"scripts"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token property"},'"build"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"tsc && vite build"'),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("pre",{class:"language-json"},[n("code",{class:"language-json"},[n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token property"},'"compilerOptions"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 省略其他配置"),s(`
    `),n("span",{class:"token comment"},"// 1. noEmit 表示只做类型检查，而不会输出产物文件"),s(`
    `),n("span",{class:"token comment"},"// 2. 这行配置与 tsc --noEmit 命令等效"),s(`
    `),n("span",{class:"token property"},'"noEmit"'),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("p",null,"tsc 作为 TypeScript 的官方编译命令，可以用来编译 TypeScript 代码并进行类型检查，而这里的作用主要是用来做类型检查。虽然 Vite 提供了开箱即用的 TypeScript 以及 JSX 的编译能力，但实际上底层并没有实现 TypeScript 的类型校验系统，因此需要借助 tsc 来完成类型校验(在 Vue 项目中使用 vue-tsc 这个工具来完成)，在打包前提早暴露出类型相关的问题，保证代码的健壮性。"),n("h2",null,"重点"),n("p",null,"一个 import 语句代表一个 HTTP 请求。正是 Vite 的 Dev Server 来接收这些请求、进行文件转译以及返回浏览器可以运行的代码，从而让项目正常运行。")],-1),d="深入浅出vite 基础概念",g="2023-10-24T17:26:38.000Z",_=["vite","vue"],y=["#41b883","#34495e"],f="5min",v="《深入浅出Vite》读书笔记",w=!0,h={__name:"1",setup(u,{expose:a}){const t={title:"深入浅出vite 基础概念",date:"2023-10-24T17:26:38.000Z",tags:["vite","vue"],tagsColor:["#41b883","#34495e"],duration:"5min",subtitle:"《深入浅出Vite》读书笔记",display:!0};return a({frontmatter:t}),(r,k)=>{const o=l;return e(),c(o,{frontmatter:t},{default:p(()=>[i]),_:1})}}};export{g as date,h as default,w as display,f as duration,v as subtitle,_ as tags,y as tagsColor,d as title};
