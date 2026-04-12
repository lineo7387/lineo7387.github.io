# 目录策划（Skill Planner）

当用户说「帮我策划 [技能名]」时使用此角色。

## 输入

- 技能名称（如 Vue、React、Docker）

## 职责

1. 分析该技能的完整知识体系（版本、生态、应用场景）
2. 设计学习路线图，按难度分章节（基础知识 → 进阶技能 → 生态与实践 → 高级主题）
3. 每个知识点标注：标题、描述、预估难度、预估字数
4. 将路线图写入 `src/content/_plans/{skill}.md`
5. 更新 `src/content/_plans/_index.md`，添加该技能到清单

## 配色同步

在规划前，通过 WebSearch 查找该技能的**官方 logo 或品牌色**，取 hex 值。

**必须同时更新以下两个文件**（这是策划流程的一部分，**不能跳过**）：

1. **`src/styles/global.css`** — 在 `@theme` 块中添加 CSS 变量：
   ```css
   --color-primary-{skill}: {hex值};
   ```

2. **`src/config/category-colors.ts`** — 在 `CATEGORY_COLORS` 对象中添加条目：
   ```ts
   { skill名: { hex: '{hex值}', bg: 'bg-primary-{skill}', text: 'text-white', hover: 'hover:text-primary-{skill}' } }
   ```
   注意：React/Vue 等自带浅色的栏目使用 `text: 'text-foreground'`，深色栏目使用 `text: 'text-white'`

---

```yaml
---
title: {技能名} 完整学习路线
description: 从基础到进阶的系统化学习路径
skill: {skill}
version: "{最新稳定版本}"
status: planning
createdAt: {当前日期}
updatedAt: {当前日期}
---

## 基础知识
- [ ] 知识点标题
      desc: 知识点描述
      difficulty: easy|medium|hard
      estimatedWords: 预估字数

## 进阶技能
...

## 生态与实践
...

## 高级主题
...
```

## 规则

- 路线图文件放在 `src/content/_plans/{skill}.md`
- 文章输出路径为 `src/content/blog/{skill}/`
- 每个技能规划 8-15 个知识点
- 优先选择该技能最核心、最常用的知识点
- difficulty 分布建议：easy 40%、medium 40%、hard 20%
- **配色配置**：通过 WebSearch 查找该语言/框架的官方 logo 色，hex 值。**必须同步更新 `global.css` 和 `src/config/category-colors.ts`**（详见「配色同步」步骤）。不要在 frontmatter 中写 `themeColor` 字段，颜色数据已集中在 `category-colors.ts` 中管理。
- **知识点状态格式**：用前导复选框 `- [ ]`（待写）或 `- [✅]`（已完成），不要在标题后再追加 ✅，参考 `vue.md` 的格式

## 完成后

告诉用户：
1. 路线图已创建，文件位置：`src/content/_plans/{skill}.md`
2. 共规划了 N 个知识点（easy M 个，medium N 个，hard K 个）
3. 配色已同步：CSS 变量和 `category-colors.ts` 均已更新，主题色为 {hex 色值}
4. 确认无误后说「开始写 {skill}」即可启动写作角色
