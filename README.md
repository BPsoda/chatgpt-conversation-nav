# ChatGPT 对话预览与跳转

一个 Tampermonkey 用户脚本，为 ChatGPT 网页端添加对话导航、预览和快速跳转功能。

## 功能特性

### 🎯 核心功能

- **对话目录导航**：在页面右侧显示所有用户对话的目录列表
- **序号标识**：每个对话项都有两位数字序号（01, 02, 03...）
- **快速跳转**：点击任意对话项即可平滑滚动到对应位置
- **显示/隐藏控制**：通过右上角按钮控制目录的显示和隐藏

### ✨ 增强功能

- **按钮悬停预览**：鼠标悬停在切换按钮上时，会在左侧显示对话列表预览窗口
- **对话项悬停展开**：鼠标悬停在对话项上时，会自动展开显示完整文本（约10行）
- **自动更新**：当页面添加新对话时，目录会自动更新
- **ChatGPT 风格 UI**：界面设计匹配 ChatGPT 网页风格，无缝融入

## 安装说明

### 前置要求

- 浏览器（Chrome、Firefox、Edge、Safari 等）
- [Tampermonkey](https://www.tampermonkey.net/) 扩展

### 安装步骤

1. **安装 Tampermonkey 扩展**
   - Chrome: [Chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - Edge: [Edge 外接程序](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. **安装脚本**
   - 从 [Greasy Fork](https://greasyfork.org/zh-CN/scripts/563105-chatgpt-%E5%AF%B9%E8%AF%9D%E9%A2%84%E8%A7%88%E4%B8%8E%E8%B7%B3%E8%BD%AC) 安装

3. **验证安装**
   - 访问 [ChatGPT](https://chatgpt.com/)
   - 在页面右上角应该能看到一个切换按钮（━ 符号）
   - 点击按钮后，右侧应该显示对话目录

## 使用方法

### 基本操作

1. **显示/隐藏目录**
   - 点击页面右上角的切换按钮（━ 或 ▶）
   - 按钮显示 `━` 时，目录可见
   - 按钮显示 `▶` 时，目录隐藏

2. **跳转到对话**
   - 在目录中点击任意对话项
   - 页面会平滑滚动到对应的对话位置

3. **预览功能**
   - 将鼠标悬停在切换按钮上
   - 会在按钮左侧显示对话列表预览窗口
   - 即使目录已隐藏，也可以通过预览查看

4. **查看完整文本**
   - 将鼠标悬停在目录中的任意对话项上
   - 对话项会自动展开，显示完整文本（约10行）
   - 移开鼠标后自动收起

### 界面说明

- **切换按钮**：位于页面右上角，用于控制目录显示/隐藏
- **主目录**：位于页面右侧，显示所有对话项的列表
- **预览窗口**：悬停按钮时显示，位置在主目录左侧

## 更新日志

### v0.2（当前版本）
- ✅ 优化 selector ，适配新版UI
- ✅ 优化自动更新性能
- ✅ 定期 UI 检查了，避免被清除

### v0.1

- ✨ 初始版本发布
- ✅ 对话目录导航功能
- ✅ 按钮悬停预览功能
- ✅ 对话项悬停展开功能
- ✅ 自动更新机制
- ✅ ChatGPT 风格 UI

## 开发信息

- **作者**: BPsoda
- **版本**: 0.1
- **许可证**: 本项目为开源项目，可自由使用和修改

## 鸣谢
本项目基于[ChatGPT 对话问题导航](https://greasyfork.org/zh-CN/scripts/495341-chatgpt-%E5%AF%B9%E8%AF%9D%E9%97%AE%E9%A2%98%E5%AF%BC%E8%88%AA)开发。

## 贡献

欢迎提交 Issue 和 Pull Request！


