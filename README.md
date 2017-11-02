# lxSelect
## 背景
> 该插件是为了在不修改原有项目的基础上通过自定义模板来修改select的样式而设计。
## 简述
> 因项目中有很多select下拉选择框，为了不影响其页面结构，表单提交数据和原有js对select的修改，所以设计时采用保留原来的select标签，并添加自定义的下拉选择框样式覆盖select。
## 使用
> 该项不是基于jquery的，因此得先引入jquery：
```
<link rel="stylesheet" type="text/css" href="lx_select.css"/>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js" ></script>
<script type="text/javascript" src="lx_select.js" ></script>
```
> 对应select设置id,并获得节点，初始化之定义样式：
```
<script>
$("#openBankName").Lx_SelectInit({
  width : 160,//下拉框固定宽度
  height : 35,//下拉框高度也是行高
  maxWidth : 300,//下拉框下拉选项最大宽度
  optionMinNum : 3,//下拉框下拉选项最小展示条数
  optionMaxNum : 8,//下拉框下拉选项最大展示条数
  zIndex:10 
});
</script>
```
> 如js改变select的状态请触发change事件：
```
$("#openBankName").find("option:eq(3)").prop("selected",true).change();//选中第三个选项
$("#openBankName").find("option:eq(4)").prop("disabled",true).change();//禁用第四个选项

```

以上就是这个插件的一些介绍和使用方法，初次分享自己的代码，还存在很多问题。希望各位多多给予指正

