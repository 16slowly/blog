
## React 脚手架，包含以下内容
- devServer - mock data
  - [express](https://expressjs.com/zh-cn/)
  - [配合 webpack 的前后端开发分离](https://github.com/16slowly/blog/issues/5)
- [Webpack 打包🔧](https://webpack.js.org/)
- CI-Jenkins
  - [Jenkins](https://jenkins.io/)
  - [CI](https://github.com/16slowly/blog/issues/10)
- [Storybook](https://storybook.js.org)
- [Babel](https://babeljs.io/)
- ESLint
  - [eslint](https://eslint.org/)
  - [JavaScript Style for Airbnb](https://github.com/airbnb/javascript)
- [es6](https://github.com/airbnb/javascript)
- [React](https://reactjs.org)
- [Redux](https://redux.js.org/)
- [React-redux](https://cn.redux.js.org/docs/react-redux/)
- [Reselect](https://github.com/reduxjs/reselect)
- [Immutable](https://facebook.github.io/immutable-js/)

## Command
- 执行 `npm install` 安装依赖
- 执行 `npm run start` 启动 local server，在浏览器中访问 `localhost:3000` 查看
- 执行 `npm run storybook` 启动 storybook 对 UI 组件的测试，启动成功后，浏览器访问 `localhost:6006` 进行查看
- 执行 `npm run build` 进行 prod 环境下的打包
- 执行 `npm run upload` 打包文件将上传至阿里云
- 成功配置 CI 之后，执行 `git push` 操作将触发 CI, CI 会自动执行以上命令

## 组件：
- 无限滚动列表 Ref [#14](https://github.com/16slowly/blog/issues/14)
