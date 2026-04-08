# TypeScript 检查技能

在当前 Astro 项目中编写或审查 TypeScript 代码时应用本技能。只读审查，不要修改任何文件。

## 项目关键信息

- Astro 版本：6.1.4（使用 `post.id`，非 `post.slug`）
- Content Collections：`src/content.config.ts`（Astro 6 专用路径）
- BASE 路径：`src/utils/base.ts` 导出的 `BASE` 常量
- tsconfig：严格模式（`astro/tsconfigs/strict`）
- 现有 `.ts` 文件：`src/content.config.ts`、`src/utils/base.ts`
- Tailwind：`@tailwindcss/vite` v4

## 第一步：复用检查（编写 TS 前必做）

在创建任何新的 `.ts` 文件前，必须先搜索确认不存在重复：

1. **复用 `src/utils/base.ts`** — base path 逻辑已在此文件中，直接 import `BASE`
2. **复用 `src/content.config.ts`** — 内容集合 schema 已定义，直接使用 Astro 生成类型
3. **搜索 `src/types/`** — 如需共享类型，先检查是否已存在
4. **搜索 `src/utils/`** — 如需工具函数，先检查是否已存在

```bash
# 搜索是否已有相关工具函数
grep -r "functionName" src/utils/ src/types/ --include="*.ts"
```

## 第二步：TypeScript 规范

### 必须遵守

| 规则 | 说明 |
|------|------|
| 禁止 `any` | 使用 `unknown` + 类型收窄，或定义具体类型 |
| 禁止 `// @ts-ignore` | 项目使用 strict 模式，不允许跳过检查 |
| 禁止 `// @ts-expect-error` | 同上 |
| Props 必须定义接口 | `.astro` 文件 frontmatter 中必须定义 `interface Props` |
| 导出函数必须有返回类型 | `function foo(): string { ... }` |
| 布尔值和数字必须有显式类型 | 不依赖类型推断 |

### 变量声明

```typescript
// ✅ 正确
const name: string = 'Bauhaus';
const count: number = 10;
const isActive: boolean = true;

// ❌ 错误
const name = 'Bauhaus';        // 缺少类型
const anyValue: any = ...     // 禁止 any
```

### 函数声明

```typescript
// ✅ 正确
function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN');
}

// ❌ 错误
const formatDate = (date) => { return date.toISOString(); }; // 缺少返回类型
```

## 第三步：Astro 特定模式

### Props 接口（所有 .astro 组件必须）

```typescript
---
// ✅ 正确
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { title, description = '默认描述', variant = 'primary' } = Astro.props;
---

// ❌ 错误：缺少 interface Props
const { title } = Astro.props;
```

### Content Collection 类型

```typescript
---
import { getCollection, type CollectionEntry } from 'astro:content';

// ✅ 正确：使用 Astro 生成的类型
const posts: CollectionEntry<'blog'>[] = await getCollection('blog', ({ data }) => !data.draft);

// ❌ 错误：手动定义类型
type Post = { id: string; data: { title: string; ... } };
```

### getStaticPaths 返回值

```typescript
---
// ✅ 正确：Astro 6 使用 post.id
export function getStaticPaths() {
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

// ❌ 错误：使用 post.slug（Astro 6 不存在）
params: { slug: post.slug }
```

### Client Script 类型断言

```typescript
---
// ✅ 正确
const searchInput = document.getElementById('search-input') as HTMLInputElement | null;

// ❌ 错误：使用 any
const el: any = document.getElementById('search-input');
---
```

### 动态 Props 类型

```typescript
---
// ✅ 正确：定义完整类型
interface PageProps {
  type: 'post' | 'pagination' | 'category';
  post?: CollectionEntry<'blog'>;
  category?: string;
  page?: number;
}

const { type, post, category, page } = Astro.props as PageProps;

// ❌ 错误：使用 Record<string, any>
const { type, post } = Astro.props as Record<string, any>;
---
```

## 第四步：常见错误检查

在审查或修改 `.ts` / `.astro` 文件时，检查以下常见问题：

1. **硬编码路径** → 使用 `BASE` 从 `src/utils/base.ts` 导入
2. **手动定义 Collection 类型** → 使用 Astro 生成的 `CollectionEntry<'blog'>`
3. **使用 `post.slug`** → 改为 `post.id`
4. **`any` 类型** → 替换为具体类型或 `unknown`
5. **缺少 Zod schema 字段** → 对照 `src/content.config.ts` 检查
6. **缺少 `draft` 过滤** → `getCollection` 调用必须过滤 `!data.draft`
7. **内联 `<script>` 未类型化** → 使用 `as` 断言 DOM 元素类型

## 输出格式

审查时输出以下报告：

```
## TypeScript 审查报告

### ✅ 通过项
- [文件] 描述

### ⚠️ 建议
- [文件:行号] 建议描述

### ❌ 问题（需修复）
- [文件:行号] 问题描述及修复方案
```

使用 Glob 和 Grep 搜索相关文件进行审查。只报告 TS 相关问题，不涉及样式或布局。
