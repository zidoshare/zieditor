# draftjs 学习笔记

## 认识

draftjs是纯React的,是函数式的,富文本的渲染适合在本质上被理解为函数.如果使用 Draft.js，富文本的状态被封装到一个 EditorState 类型的 immutable 对象中，这个对象作为组件属性（函数参数）输入给 Editor 组件（函数）。一旦用户进行操作，比如敲一个回车，Editor 组件的 onChange 事件触发，onChange 函数返回一个全新的 EditorState 实例，Editor 接收这个新的输入，渲染新的内容。
