## introduction
a demo
## preview
![image](./assets/tree-select.git)
## start
<pre>
1. git clone git@github.com:sunyongjian/checkbox-demo.git
2. yarn / npm i
3. npm start
</pre>


## 实现
> 两个公共组件，CheckBox 和 CheckBoxGroup。 LeftMenu 作为顶级 Container 去处理请求，把数据传下来。 Combine 组件 负责一部分逻辑，处理函数，把data 数据渲染，并把onChange的 value 返回给 上级 Container，用于提交。

### work time
15:00 - 16: 30;

21:00 - 00: 00;

### 未实现功能
> 关于数量的问题，因为这里是无意义的数字，跟实际代码是无关的，便没有加。

> UI问题，并没有做到跟pdf完全一样。

### issue
> 在引入icon 和 babel-plugins (git 上有issue)浪费了时间， 还有一开始没考虑好实现，其实后来才发现是一个treeSelect，之后打算做成一个开源组件

> 关于全选跟child联动的问题，是用两个state去维护的，实现方式不是很满意。多次setState还好，因为setState在同一个栈内只是相当于 push Event，统一patch。
