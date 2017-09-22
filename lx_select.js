
/**
 * 初始化select表单样式样式
 * @param selectId select标签ID
 * @param width 选择框宽度
 * @param con_width 选择列表宽度 
 * @author 刘夏(lx)
 * @date 2017-01-22
 */

(function( $ ){
    "use strict"

	$.fn.extend({
		/**
		 * 初始化方法
		 * @param {Object} opt 传入参数集合
		 */
		Lx_SelectInit:function(opt){
            var defaultOpt = {
                width : 160,//下拉框固定宽度
                height : 30,//下拉框高度也是行高
                maxWidth : 300,//下拉框下拉选项最大宽度
                optionMinNum : 3,//下拉框下拉选项最小展示条数
                optionMaxNum : 8,//下拉框下拉选项最大展示条数
                zIndex:100
            }
            var opts = $.extend({},defaultOpt,opt);

			var $select = $(this);
			var selectId = $select.attr("id");
			var $options = $select.children("option");
			/*获取option的值*/
			var val=[];
			var txt=[];
			var index = 0;//option值索引
			var disabled_idx = 0;//被禁用的option数组索引
			var selected_idx = 0;//选中项的序列
			var disabled = [];//禁止选择选项
			var parameter = {
                width : opts.width ,//下拉框固定宽度
                height : opts.height ,//下拉框高度也是行高
                maxWidth : opts.maxWidth ,//下拉框下拉选项最大宽度
                optionMinNum : opts.optionMinNum ,//下拉框下拉选项最小展示条数
                optionMaxNum : opts.optionMaxNum ,//下拉框下拉选项最大展示条数
                zIndex : opts.zIndex,//展示层数
			}
			if($select.parent("#"+selectId+"_box").length>0){

				return false;
			}
			
			
			$options.each(function(){
				val[index] = $(this).val(); 
				txt[index] = $(this).text();
				if($(this).prop("disabled")){
					disabled[disabled_idx]=index;
					disabled_idx++;
				}
				if($(this).prop("selected")){
					selected_idx = index;
				}
				index++;
			});
			
			
			
			if($select.parent(".lx_select_box ").length>0){
				//如果已经初始化过
				$select.siblings(".lx_select_show").remove();
				$select.siblings(".lx_select_option").remove();
			}else{
				$select.parent().addClass("lx_select");
				if($select.is(":hidden")){
					$select.show();
					$select.wrap("<div class='lx_select_box' style='display: none;z-index: "+ parameter.zIndex +"' id="+selectId+"_box"+"></div>");
					/*$select.wrap("<div class='select-box' id="+selectId+"_box"+" style='display:none;'></div>");*/
				}else{
					$select.wrap("<div class='lx_select_box' style='z-index: "+ parameter.zIndex +"' id="+selectId+"_box"+"></div>");
				}
			}
			
			
			var select_show = $("<button id="+selectId+"_show"+" class='lx_select_show'></button>").insertBefore($select);
			
			//设置属性
			select_show.css({
				"width" : parameter.width,
				"height" : parameter.height,
				"line-height" : parameter.height+'px',
			});
			
			var ul = $("<ul class='lx_select_option' id="+selectId+"_option"+"/>").insertBefore($select);
			//设置内容的宽度
			ul.css({
				"min-width" : parameter.width,
				"max-width" : parameter.maxWidth,
				"min-height" : parameter.height * parameter.optionMinNum,
				"max-height" : parameter.height * parameter.optionMaxNum,
			});
			
			//ul.width(width);//设置内容的宽度
			for(var i=0;i < $options.length;i++){
				var active = null;
				if(selected_idx==i){
					active = "active"
				}else{
					active = null;
				}
				
				var li;
				for(var j=0;j <= disabled.length;j++){
					if(i==disabled[j]){
						li = "<li class='disabled "+active+"' style='height:"+parameter.height+";line-height:"+parameter.height+"px' data-val="+val[i]+" title="+txt[i]+"><a href='javascript:;'>"+txt[i]+"</a></li>";
						break;
					}else{
						li = "<li class='enabled "+active+"' style='height:"+parameter.height+";line-height:"+parameter.height+"px' data-val="+val[i]+" title="+txt[i]+"><a href='javascript:;'>"+txt[i]+"</a></li>";
						//li.click(selectOptionClick);
						$(li).click(function(){
							selectOptionClick(this);
						});
					}
				}
				
				$(li).appendTo(ul);
				
			}
			//初始换显示
			select_show.text($select.children("option:selected").text());
			
			/* 主键绑定事件 */
			$select.bind("change",function(){
				select_show.text($select.children("option:selected").text());
				selected_idx = $select.children("option:selected").index();
				ul.find("li:eq("+selected_idx+")").addClass("active").siblings().removeClass("active");
				$options =$(this).children("option");
				for(var i = 0;i<$options.length;i++){
				   if($(this).children("option:eq("+i+")").prop("disabled")){
				   	  ul.find("li:eq("+i+")").removeClass("enabled").addClass("disabled");
				   }else{
				   	  ul.find("li:eq("+i+")").removeClass("disabled").addClass("enabled"); 
				   }
				}
			});
			
			select_show.click(function(){
                if($select.attr("disabled")!="disabled") {//判断是否禁用
                    selectShowClick(this);
                    $(".lx_select_box .lx_select_show").not(this).removeClass("unfold");
                    $(".lx_select_box .lx_select_show").not(this).parent(".lx_select_box").css("z-index", parameter.zIndex);
                    $(".lx_select_box .lx_select_show").not(this).siblings("ul.lx_select_option").hide();
                }
			})

			//绑定键盘事件
			select_show.keydown(function(event){
				console.log("keydown");
			  	var key = event.keyCode;
			  	var li;
			  	li = ul.find("li:eq(" + selected_idx + ")");
	            if (key == 13){
	            	selectOptionClick(selected_idx)
	            }; /*回车搜索*/
	           
                if (key == 38) { /*向上按钮*/  
	                selected_idx--; 
	                li = ul.find("li:eq(" + selected_idx + ")");
	                
	                while(li.hasClass("disabled")&& selected_idx >= 0 ){
	            		selected_idx--;
	            		li = ul.find("li:eq(" + selected_idx + ")");
	            	}
	                
	                if(selected_idx<0){
	                	selected_idx =0;
	                }
            	} else if (key == 40) {/*向下按钮*/  
	                selected_idx++;
	                li = ul.find("li:eq(" + selected_idx + ")");
	                
	                while (li.hasClass("disabled") && selected_idx != $options.length ){
	            		selected_idx++;
	            		li = ul.find("li:eq(" + selected_idx + ")");
	            	}
	                
	                if(selected_idx == $options.length){
	                	selected_idx = $options.length-1;
	                }
            	}  
            	li = ul.find("li:eq(" + selected_idx + ")"); 
            	
                li.addClass("active").siblings().removeClass("active");  
            	toSelected(li);
            	
            	/*改变滚动条位置使选中项显示*/
            	
            	
			})
			
			ul.find("li.enabled").click(function(){
				selectOptionClick(this);
			});
		}
		
	});
	
	/*点击事件*/
	function selectShowClick(_this){
		var $option = $(_this).siblings(".lx_select_option");
		var zIndex = $(_this).parent(".lx_select_box").css("z-index");
		if($option.is(":hidden")){
			$option.show();
			$(_this).parent(".lx_select_box").css("z-index",parseInt(zIndex)+1);
			$(_this).addClass("unfold");
		}else{
			$option.hide();
			$(_this).parent(".lx_select_box").css("z-index",parseInt(zIndex)-1);
			$(_this).removeClass("unfold");
		}
	}
	//选项点击事件
	function selectOptionClick(_this){
		if( ! $(_this).hasClass("disabled")){
            var zIndex = $(_this).parent(".lx_select_box").css("z-index");
            //给显示框赋值
            $(_this).parents(".lx_select_box").css("z-index",parseInt(zIndex)-1);
            toSelected(_this);
            $(_this).parent().hide();
            $(_this).parent().siblings(".lx_select_show").removeClass("unfold");
		}

	}
	
	/*根据选中值，选中select中的对应项*/
	function toSelected(th){
		$(th).addClass("active").siblings().removeClass("active");
		var $selected = $(th).text();
		$(th).parent().siblings(".lx_select_show").text($selected);
		$(th).parent().siblings("select").find("option").each(function(){
			if($.trim($(this).text()) == $.trim($selected)){
				$(this).siblings("option").removeAttr("selected");
				$(this).prop("selected", true);
			};
		});
		$(th).parent().siblings("select").change();
	}
	/*判断是否使用默认值*/
	function getValue(obj, defaultValue) {
        return obj === void 0 ? defaultValue : obj;
    }
	
})(jQuery)



