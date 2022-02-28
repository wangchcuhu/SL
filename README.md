# sl

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

<!-- 注意点 -->
<!-- 使用饿了么组件作为库element-ui@2.15.3 地址：https://element.eleme.cn -->
<!-- 本系统使用了eslint进行代码检验在.eslintrc.js中可以自定义去除一些不太习惯的规则 -->
<!-- 可以使用vscode中自带的插件eslint进行自动修复一些基本的错误提示 -->
<!-- 本系统使用sass作为一种预编译的css，可以使用编程的思想使用样式，列入定义一些变量，还有一些全局变量，以及从外部引用sass的一些文件 -->
<!--  一些简单的规则 https://blog.csdn.net/zhouzuoluo/article/details/81010331 -->
<!-- .npmrc文件的目的是在npm下载依赖度时候使用淘宝的地址，而不是gitLub的地址，会超时导致下载失败 -->
<!-- scss和less的区别，都是高级css语言，scss可以看作sass的升级版，scss更像编程语言，Less有很好的的前段UI库Bootstrap -->
<!-- index.css文件定义全局的样式 -->


<!-- 安装过程中出现的问题 -->
<!-- 在使用sass-loader是由于版本过高，可能是和sass当前版本不匹配导致一直报错。降低sass-loader的版本即可 -->
