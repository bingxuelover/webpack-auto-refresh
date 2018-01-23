webpack

# 内容

- webpack.config.js中是本地配置文件，支持多入口文件的打包，支持Es6、css、less、sass

# 启动

## npm start

- 使用webpack-dev-server启动项目，项目打包到build文件夹中，修改后会实时刷新页面内容。
- 使用的是webpack.config.js

## npm run build

- 一次性执行打包到public文件夹中，生成home.html入口文件;
- 使用的是webpack.production.config.js

## npm run watch

- 监视文件修改，进行打包，但不会自动刷新页面；想实现自动刷新，请使用npm start

## npm run dev

- 开发模式启动服务，webpack-dev-server进行了一些配置
- --devtool eval 为你的代码创建源地址，当有任何报错的时候可以让你更加精确地定位到文件和行号
- --progress 运行进度输出到控制台
- --colors 命令行中显示颜色
- --hot 热更新
- --compress gzip压缩
- --contentBase 启动时加载的目录
- --port 启动端口

# 知识点

- scss支持，需要 style-loader、css-loader、sass-loader、node-sass
- extract-text-webpack-plugin 将css文件单独打包成.css文件
- html-webpack-plugin 生成一个index.html页面，其中自动引入打包好的js和css文件；title: html的title. filename: 输出的html页面的路径和名称，默认为index.html.
