# AI VisionPrompt Hub | AI 视觉提示词平台

这是一个专为 AI 创作者设计的视觉化提示词学习与生成平台。通过结构化的分类维度和丰富的视觉展示，帮助用户掌握 AI 绘画（如 Midjourney, Stable Diffusion）与 AI 视频（如 Runway, Sora）的核心语法。

## 🚀 核心功能

### 1. 国际化支持 (i18n)
- **中英文实时切换**：全站 UI、28 个分类名称、330+ 特征标签及描述均支持中英文双语显示。
- **智能提示词生成**：生成器会根据当前语言环境自动切换标签语言，确保创作构思的连贯性。

### 2. 双模图库 (Dual-mode Gallery)
- **AI 绘画图库**：包含 16 个分类维度（画风、材质、主题、分辨率等），192 个精选视觉示例。
- **AI 视频图库**：包含 12 个分类维度（运镜、灯光、色调、特效等），144 个动态效果示例。
- **特征详情页**：点击任意特征可进入详情视图，查看大图展示、双语描述及一键复制专业 Prompt。

### 3. 结构化提示词生成器 (Prompt Generator)
- **标签云选择**：基于 `categories.ts` 数据源，支持 28+ 维度下的全量标签选择。
- **布局优化**：采用紧凑 de 3 列网格布局，提升信息密度与视觉美感。
- **万能公式 (Universal Formulas)**：内置 AI 绘画与视频的万能公式弹窗，包含核心结构、完整公式及记忆口诀。

### 4. 视觉方案恢复与优化
- **沉浸式背景**：恢复了 About 模块的深色背景，与 Hero 区形成视觉呼应。
- **层级分明**：通过 Hero(深) -> Gallery(白) -> Generator(浅灰) -> About(深) 的交替设计，增强了页面的流动感。

## 🛠 技术栈
- **前端框架**：React 19 + TypeScript
- **状态管理**：React Context API (用于全局语言切换)
- **构建工具**：Vite
- **样式方案**：Tailwind CSS (响应式布局、玻璃拟态效果)
- **图标库**：Lucide React

## 📂 项目结构
- `src/data/categories.ts`: 全站核心知识库（多语言数据源）。
- `src/data/translations.ts`: UI 静态文本翻译文件。
- `src/sections/Gallery.tsx`: 列表与详情交互核心。
- `src/sections/PromptGenerator.tsx`: 提示词生成引擎。
- `src/sections/About.tsx`: 平台介绍与功能特性展示。

## 🛠 开发与运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

---

**当前版本状态**：v2.2.0 - 已完成全站国际化翻译、背景视觉方案恢复、生成器逻辑优化及品牌名称更新。
