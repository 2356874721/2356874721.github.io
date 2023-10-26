import{o as e,c as p,w as c,_ as l,a as n,d as s}from"./app-9ae950a6.js";const u=n("div",{class:"markdown-body"},[n("h2",null,"不使用css工程化方案的弊端"),n("p",null,"1.开发体验差，原生 CSS 不支持选择器的嵌套。"),n("p",null,"2.样式覆盖问题，出现同样的类名，很容易造成不同的样式互相覆盖和污染。"),n("p",null,"3.浏览器兼容问题，对一些属性需要加浏览器前缀。"),n("p",null,"4.代码体积问题，所有的 CSS 代码都将打包到产物中，即使有部分样式并没有在代码中使用。"),n("h2",null,"社区的解决方案"),n("p",null,"1.CSS 预处理器：主流的包括Sass/Scss、Less和Stylus。这些方案各自定义了一套语法，让 CSS 也能使用嵌套规则，甚至能像编程语言一样定义变量、写条件判断和循环语句，大大增强了样式语言的灵活性，解决原生 CSS 的开发体验问题"),n("p",null,"2.CSS Modules：能将 CSS 类名处理成哈希值，这样就可以避免同名的情况下样式污染的问题"),n("p",null,"3.CSS 后处理器PostCSS，用来解析和处理 CSS 代码，可以实现的功能非常丰富，比如将 px 转换为 rem、根据目标浏览器情况自动加上类似于–moz–、-o-的属性前缀等等"),n("p",null,"4.CSS 原子化框架，如Tailwind CSS、Windi CSS，通过类名来指定样式，大大简化了样式写法，提高了样式开发的效率，主要解决了原生 CSS 开发体验的问题"),n("h2",null,"css预处理器"),n("p",null,"自动引入全局的样式文件。可以在任何文件中使用全局变量。"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// vite.config.ts"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" normalizePath "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite'"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token comment"},"// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D"),s(`
`),n("span",{class:"token keyword"},"import"),s(" path "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'path'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// 全局 scss 文件的路径"),s(`
`),n("span",{class:"token comment"},"// 用 normalizePath 解决 window 下的路径问题"),s(`
`),n("span",{class:"token keyword"},"const"),s(" variablePath "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"normalizePath"),n("span",{class:"token punctuation"},"("),s("path"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"resolve"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'./src/variable.scss'"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token function"},"defineConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// css 相关的配置"),s(`
  css`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    preprocessorOptions`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      scss`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"// additionalData 的内容会在每个 scss 文件的开头自动注入"),s(`
        additionalData`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},'@import "'),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),s("variablePath"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},'";'),n("span",{class:"token template-punctuation string"},"`")]),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("h2",null,"CSS Modules"),n("p",null,"Vite 会对后缀带有.module的样式文件自动应用 CSS Modules。"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// index.tsx"),s(`
`),n("span",{class:"token keyword"},"import"),s(" styles "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'./index.module.scss'"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"Header"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token operator"},"<"),s("p className"),n("span",{class:"token operator"},"="),n("span",{class:"token punctuation"},"{"),s("styles"),n("span",{class:"token punctuation"},"."),s("header"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token operator"},">"),s("This "),n("span",{class:"token keyword"},"is"),s(" Header"),n("span",{class:"token operator"},"<"),n("span",{class:"token operator"},"/"),s("p"),n("span",{class:"token operator"},">"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("p",null,"打开浏览器，可以看见 p 标签的类名已经被处理成了哈希值的形式，也可以在配置文件中的css.modules选项来配置 CSS Modules 的功能。"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// vite.config.ts"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  css`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    modules`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义"),s(`
      `),n("span",{class:"token comment"},"// 其中，name 表示当前文件名，local 表示类名"),s(`
      generateScopedName`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'[name]__[local]___[hash:base64:5]'"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("h2",null,"PostCSS"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// vite.config.ts 增加如下的配置"),s(`
`),n("span",{class:"token keyword"},"import"),s(" autoprefixer "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'autoprefixer'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  css`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 进行 PostCSS 配置"),s(`
    postcss`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      plugins`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
        `),n("span",{class:"token function"},"autoprefixer"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token comment"},"// 指定目标浏览器"),s(`
          overrideBrowserslist`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'Chrome > 40'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'ff > 31'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'ie 11'"),n("span",{class:"token punctuation"},"]"),s(`
        `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"]"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("h2",null,"CSS In JS"),n("p",null,"社区中有两款主流的CSS In JS 方案: styled-components和emotion。"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// vite.config.ts"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" defineConfig "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite'"),s(`
`),n("span",{class:"token keyword"},"import"),s(" react "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'@vitejs/plugin-react'"),s(`

`),n("span",{class:"token comment"},"// https://vitejs.dev/config/"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token function"},"defineConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
  plugins`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token function"},"react"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
      babel`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"// 加入 babel 插件"),s(`
        `),n("span",{class:"token comment"},"// 以下插件包都需要提前安装"),s(`
        `),n("span",{class:"token comment"},"// 当然，通过这个配置你也可以添加其它的 Babel 插件"),s(`
        plugins`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
          `),n("span",{class:"token comment"},"// 适配 styled-component"),s(`
          `),n("span",{class:"token string"},'"babel-plugin-styled-components"'),s(`
          `),n("span",{class:"token comment"},"// 适配 emotion"),s(`
          `),n("span",{class:"token string"},'"@emotion/babel-plugin"'),s(`
        `),n("span",{class:"token punctuation"},"]"),s(`
      `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token comment"},"// 注意: 对于 emotion，需要单独加上这个配置"),s(`
      `),n("span",{class:"token comment"},"// 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法"),s(`
      jsxImportSource`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},'"@emotion/react"'),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"]"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("h2",null,"CSS 原子化框架"),n("h3",null,"Windi CSS 接入"),n("pre",{class:"language-js"},[n("code",{class:"language-js"},[s("pnpm i windicss vite"),n("span",{class:"token operator"},"-"),s("plugin"),n("span",{class:"token operator"},"-"),s("windicss "),n("span",{class:"token operator"},"-"),n("span",{class:"token constant"},"D"),s(`
`)])]),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// vite.config.ts"),s(`
`),n("span",{class:"token keyword"},"import"),s(" windi "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite-plugin-windicss'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token punctuation"},"{"),s(`
  plugins`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token comment"},"// 省略其它插件"),s(`
    `),n("span",{class:"token function"},"windi"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"]"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// main.tsx"),s(`
`),n("span",{class:"token comment"},"// 用来注入 Windi CSS 所需的样式，一定要加上！"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token string"},"'virtual:windi.css'"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("pre",{class:"language-tsx"},[n("code",{class:"language-tsx"},[n("span",{class:"token comment"},"// src/components/Header/index.tsx"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" devDependencies "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'../../../package.json'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"Header"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"className"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("p-20px text-center"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("h1")]),s(),n("span",{class:"token attr-name"},"className"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("font-bold text-2xl mb-2"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
        vite version: `),n("span",{class:"token punctuation"},"{"),s("devDependencies"),n("span",{class:"token punctuation"},"."),s("vite"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token plain-text"},`
      `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("h1")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token plain-text"},`
    `),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
  `),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("p",null,"除了本身的原子化 CSS 能力，Windi CSS 还有一些非常好用的高级功能，在此我给大家推荐自己常用的两个能力: attributify 和 shortcuts。"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"// windi.config.ts"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" defineConfig "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite-plugin-windicss'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token function"},"defineConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// 开启 attributify"),s(`
  attributify`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("p",null,"首先我们来看看attributify，翻译过来就是属性化，也就是说我们可以用 props 的方式去定义样式属性，如下所示:"),n("pre",{class:"language-html"},[n("code",{class:"language-html"},[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("button")]),s(`
  `),n("span",{class:"token attr-name"},"bg"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token attr-name"},"text"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("sm white"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token attr-name"},"font"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("mono light"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token attr-name"},"p"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("y-2 x-4"),n("span",{class:"token punctuation"},'"')]),s(`
  `),n("span",{class:"token attr-name"},"border"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("2 rounded blue-200"),n("span",{class:"token punctuation"},'"')]),s(`
`),n("span",{class:"token punctuation"},">")]),s(`
  Button
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("button")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("p",null,"这样的开发方式不仅省去了繁琐的 className 内容，还加强了语义化，让代码更易维护，大大提升了开发体验。 不过使用attributify的时候需要注意类型问题，你需要添加types/shim.d.ts来增加类型声明，以防类型报错:"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" AttributifyAttributes "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'windicss/types/jsx'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"declare"),s(),n("span",{class:"token keyword"},"module"),s(),n("span",{class:"token string"},"'react'"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"type"),s(),n("span",{class:"token class-name"},[s("HTMLAttributes"),n("span",{class:"token operator"},"<"),n("span",{class:"token constant"},"T"),n("span",{class:"token operator"},">")]),s(),n("span",{class:"token operator"},"="),s(" AttributifyAttributes"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("p",null,"shortcuts 用来封装一系列的原子化能力，尤其是一些常见的类名集合，我们在 windi.config.ts来配置它:"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[n("span",{class:"token comment"},"//windi.config.ts"),s(`
`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"{"),s(" defineConfig "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},"'vite-plugin-windicss'"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token function"},"defineConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),s(`
  attributify`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
  shortcuts`),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token string-property property"},"'flex-c'"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'flex justify-center items-center'"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("p",null,"比如这里封装了flex-c的类名，接下来我们可以在业务代码直接使用这个类名:"),n("pre",{class:"language-html"},[n("code",{class:"language-html"},[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"className"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("flex-c"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`),n("span",{class:"token comment"},"<!-- 等同于下面这段 -->"),s(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),s("div")]),s(),n("span",{class:"token attr-name"},"className"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),s("flex justify-center items-center"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),s("div")]),n("span",{class:"token punctuation"},">")]),s(`
`)])]),n("h3",null,"Tailwind CSS 接入"),n("pre",{class:"language-ts"},[n("code",{class:"language-ts"},[s("pnpm install "),n("span",{class:"token operator"},"-"),n("span",{class:"token constant"},"D"),s(` tailwindcss postcss autoprefixer
`)])]),n("p",null,"然后新建两个配置文件tailwind.config.js和postcss.config.js:"),n("pre",{class:"language-js"},[n("code",{class:"language-js"},[n("span",{class:"token comment"},"// tailwind.config.js"),s(`
module`),n("span",{class:"token punctuation"},"."),s("exports "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token literal-property property"},"content"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'./index.html'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'./src/**/*.{vue,js,ts,jsx,tsx}'"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"theme"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token literal-property property"},"extend"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"plugins"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`

`),n("span",{class:"token comment"},"// postcss.config.js"),s(`
`),n("span",{class:"token comment"},"// 从中你可以看到，Tailwind CSS 的编译能力是通过 PostCSS 插件实现的"),s(`
`),n("span",{class:"token comment"},"// 而 Vite 本身内置了 PostCSS，因此可以通过 PostCSS 配置接入 Tailwind CSS"),s(`
`),n("span",{class:"token comment"},"// 注意: Vite 配置文件中如果有 PostCSS 配置的情况下会覆盖掉 post.config.js 的内容!"),s(`
module`),n("span",{class:"token punctuation"},"."),s("exports "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token literal-property property"},"plugins"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token literal-property property"},"tailwindcss"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"autoprefixer"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("p",null,"接着在项目的入口 CSS 中引入必要的样板代码:"),n("pre",{class:"language-css"},[n("code",{class:"language-css"},[n("span",{class:"token atrule"},[n("span",{class:"token rule"},"@tailwind"),s(" base"),n("span",{class:"token punctuation"},";")]),s(`
`),n("span",{class:"token atrule"},[n("span",{class:"token rule"},"@tailwind"),s(" components"),n("span",{class:"token punctuation"},";")]),s(`
`),n("span",{class:"token atrule"},[n("span",{class:"token rule"},"@tailwind"),s(" utilities"),n("span",{class:"token punctuation"},";")]),s(`
`)])])],-1),m="深入浅出Vite 样式方案",g="2023-10-24T17:52:21.000Z",f=["vite","vue","css"],y=["#41b883","#34495e","#3498db"],w="5min",S="《深入浅出Vite》读书笔记",x=!0,v={__name:"2",setup(i,{expose:t}){const a={title:"深入浅出Vite 样式方案",date:"2023-10-24T17:52:21.000Z",tags:["vite","vue","css"],tagsColor:["#41b883","#34495e","#3498db"],duration:"5min",subtitle:"《深入浅出Vite》读书笔记",display:!0};return t({frontmatter:a}),(k,r)=>{const o=l;return e(),p(o,{frontmatter:a},{default:c(()=>[u]),_:1})}}};export{g as date,v as default,x as display,w as duration,S as subtitle,f as tags,y as tagsColor,m as title};
