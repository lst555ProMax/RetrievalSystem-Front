# RetrievalSystem

以下是该项目的部署说明。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并禁用 Vetur）。



## 项目设置

克隆项目代码到本地：

   ```bash
   git clone https://github.com/lst555ProMax/RetrievalSystem-Front.git
   ```

进入项目文件夹：

   ```bash
   cd RetrievalSystem
   ```

安装依赖：

   ```bash
   npm install
   ```

### 启动开发服务器

在开发模式下编译并热重载：

```bash
npm run dev
```

### 生产环境打包

进行类型检查、编译并为生产环境压缩代码：

```bash
npm run build
```

### Lint 和修复文件

执行 ESLint 进行代码检查并修复问题：

```bash
npm run lint
```

### 部署项目

使用生产环境构建的输出文件夹：

   ```bash
   npm run build
   ```

构建完成后，生成的文件将位于 `dist` 文件夹。你可以将该文件夹的内容部署到任何静态文件托管服务（如 Netlify、Vercel、GitHub Pages 等）。

## 注意事项

### 1. Node.js 版本要求
- 请确保你的开发环境使用的是 Node.js 的最新 LTS 版本（建议使用 18.x 或以上），以保证依赖项的兼容性和稳定性。

### 2. 安装依赖
- 使用 `npm install` 安装项目所需的所有依赖，确保在安装过程中没有错误提示。
- 如果遇到安装依赖失败的问题，请尝试删除 `node_modules` 文件夹和 `package-lock.json` 文件，然后重新运行 `npm install`。

### 3. 启动项目
- 开发环境使用 `npm run dev` 启动开发服务器。如果遇到端口被占用的问题，可以在 `vite.config.js` 中修改开发服务器的默认端口配置。

### 4.前后端联通
-在src/config/apiConfig.js中配置api地址

### 4. 生产环境构建
- 使用 `npm run build` 进行生产环境构建。
- 构建脚本同时执行了类型检查（`type-check`）和构建任务（`build-only`），如果只需要构建输出文件，可单独执行 `npm run build-only`。

### 5. 类型检查
- `type-check` 脚本使用 `vue-tsc` 对项目进行强制类型检查（`--force`），确保代码符合 TypeScript 的类型要求。该步骤会在构建时自动运行，如果不需要强制检查，可以移除 `--force` 参数。

### 6. 依赖使用注意
- **`@fortawesome/fontawesome-free`**：用于图标字体集成，请确保在需要使用的组件或页面中正确引入相应的图标。
- **`@kangc/v-md-editor`**：Markdown 编辑器组件，请根据官方文档配置样式和插件。
- **`axios`**：用于 HTTP 请求，确保在请求时处理错误状态以提升用户体验。
- **`element-plus`**：Vue 3 的 UI 框架，使用时请注意版本的兼容性，特别是在样式或 API 变动较大的更新时。
- **`pinia`**：Vue 3 的状态管理库，请遵循模块化的原则管理全局状态。
- **`vue-cookies`**：用于处理 Cookie 数据，确保使用正确的路径和有效期设置。




