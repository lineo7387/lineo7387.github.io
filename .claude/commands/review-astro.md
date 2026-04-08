# Astro 代码审查

请审查当前项目中的 Astro 代码，重点关注 layouts 和组件。只读审查，不要修改任何文件。

## 项目关键信息
- Astro 版本：6.1.4（使用 post.id，非 post.slug）
- Content Collections 配置：src/content.config.ts
- BASE 路径：src/utils/base.ts 导出的 BASE 常量
- Tailwind：@tailwindcss/vite v4.2.2
- 设计系统：Bauhaus（红 #D02020、蓝 #1040C0、黄 #F0C020，阴影 4px 4px 0px 0px #121212，字体 Outfit）

## 审查维度（必须全部覆盖）

### 1. Layout 审查 (src/layouts/*.astro)
- SEO meta tags 完整性（title、description、og:*）
- {BASE} 前缀使用正确性（内部链接必须加 BASE）
- <head> 结构规范性
- <slot /> 使用是否正确
- Props 类型定义是否完整

### 2. Astro 组件审查 (src/components/**/*.astro)
- Props 接口是否定义且类型安全
- 条件渲染逻辑是否健壮
- 图片 <img> 是否有 alt 属性
- 链接 <a> 是否有 href

### 3. 页面路由审查 (src/pages/**/*.astro)
- getStaticPaths() 返回格式是否正确
- params 使用 id（Astro 6）
- Content Collection 查询是否过滤了 draft

### 4. Bauhaus 设计系统一致性
- 颜色使用主题变量（primary-red/primary-blue/primary-yellow）
- 阴影为 4px 4px 0px 0px #121212
- 字体使用 Outfit

### 5. 通用最佳实践
- 无 console.log
- 无 TODO/FIXME
- 组件命名规范

## 输出格式

请输出以下结构的审查报告：

## 代码审查报告

### 1. Layout 审查
#### ✅ 通过项
- ...
#### ⚠️ 建议
- ...
#### ❌ 问题（需修复）
- [文件:行号] 问题描述

### 2. 组件审查
...

### 3. 页面路由审查
...

### 4. Bauhaus 设计系统一致性
...

### 5. 通用最佳实践
...

### 📋 总结
共发现 ❌ N 项问题，⚠️ M 项建议。优先修复问题后提交。

使用 Glob 和 Grep 工具搜索文件，逐个阅读关键文件内容进行审查。报告必须涵盖全部 5 个维度。
