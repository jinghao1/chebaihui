

$(document).ready(function(){
 	var kkurl = "http://h5.qlh520.top";
 	//var kkurl = "http://xy.qichedaquan.com";
 	var encrystr = $("input[name='encrystr']").val();
	
	//默认状态下，将‘省’的值传入
	$.getJSON(kkurl+"/medias/public/index.php/port/Userreg/listdata", { han: "list"}, function(json){
		//console.log(json);
		$.each(json,function(index,value){
			//console.log(index,value);
			if(index == "DealerData"){
				$.each(value,function(i,v){
					var option_html = '<option value='+v.dealer_id+'>'+v.dealer_name+'</option>';
	  				$("#province").append(option_html);
				})
			}
		})
	})
	//点击‘省’之后，将‘市’遍历进去
	$("#province").change(function(){
		var dealer_id = $("#province").val();
		if(dealer_id == "省份"){
			var option_htmls = '<option>'+"城市"+'</option>';
		  		$("#city").html(option_htmls);
	  		var option_htmlss = '<option>'+"经销商"+'</option>';
	  			$("#dealer").html(option_htmlss);
		}else if(dealer_id != "省份"){
			$.getJSON(kkurl+"/medias/public/index.php/port/Userreg/undercitybydealerid", { han: "dealist",dealer_id:dealer_id}, function(json){
				/*if(dealer_id != "省份"){*/
					$("#city").html('<option>'+"城市"+'</option>');
					$.each(json,function(index,value){ 
						var option_html = '<option value='+value.dealer_id+'>'+value.dealer_name+'</option>';
			  			$("#city").append(option_html);
			  			//$("body").data("thedal",value.dealer_id);
			  			/*$("#dealer").append(option_html); */
					})
				/*}*/
				//$("#city").trigger("click");
				//$("#city").val($("body").data("thedal"));
				var dealer_id = $("#city").val();
				if(dealer_id == '城市'){
			  		var option_htmlss = '<option>'+"经销商"+'</option>';
			  			$("#dealer").html(option_htmlss);
				}else if(dealer_id != "城市"){
					$.getJSON(kkurl+"/medias/public/index.php/port/Userreg/undercitybydealerid", { han: "dealist",dealer_id:dealer_id}, function(json){
						//console.log(dealer_id);
						$("#dealer").html("<option>经销商</option>");
						$.each(json,function(index,value){
							var option_html = '<option value='+value.dealer_id+'>'+value.dealer_name+'</option>';
				  			$("#dealer").append(option_html); 
						})
					})	
				} 
			})
		}		
	})
	//点击‘市’之后，将‘经销商’遍历进去
	$("#city").click(function(){
		var dealer_id = $("#city").val();
		if(dealer_id == '城市'){
	  		var option_htmlss = '<option>'+"经销商"+'</option>';
	  			$("#dealer").html(option_htmlss);
		}else if(dealer_id != "城市"){
		$.getJSON(kkurl+"/medias/public/index.php/port/Userreg/undercitybydealerid", { han: "dealist",dealer_id:dealer_id}, function(json){
			//console.log(dealer_id);
			$("#dealer").html('<option>'+"经销商"+'</option>');
			$.each(json,function(index,value){
				var option_html = '<option value='+value.dealer_id+'>'+value.dealer_name+'</option>';
	  			$("#dealer").append(option_html); 
			})
		})	
		}
	})
	$("#city").change(function(){
		var dealer_id = $("#city").val();
		if(dealer_id == '城市'){
	  		var option_htmlss = '<option>'+"经销商"+'</option>';
	  			$("#dealer").html(option_htmlss);
		}else if(dealer_id != "城市"){
		$.getJSON(kkurl+"/medias/public/index.php/port/Userreg/undercitybydealerid", { han: "dealist",dealer_id:dealer_id}, function(json){
			//console.log(dealer_id);
			$("#dealer").html('<option>'+"经销商"+'</option>');
			$.each(json,function(index,value){
				var option_html = '<option value='+value.dealer_id+'>'+value.dealer_name+'</option>';
	  			$("#dealer").append(option_html); 
			})
		})	
		}
	})
 
	//鼠标放入input框值清空
	$('input').each(function(){
		var default_value = this.value;
		$(this).focus(function(){  
            if(this.value == default_value) {  
                this.value = '';  
            }  
        });
        $(this).blur(function(){  
            if(this.value == '') {  
                this.value = default_value;  
            }  
        });    
	})
 
	//信息提交
	$(".btn").click(function(){
		//名字不为空
	 	var name = $("input[name='name']").val();
	 	if(name == "" || name == "姓名" ){
	 		$.dialog({
			contentHtml : '<p>请输入姓名</p>'
			});
	 		/*$("input[name='name']").focus();*/
	 		return false;
	 	}
	 	if (!name.match(/^([\u4E00-\u9FA5]{2,4}$)|(^[a-zA-Z]{1,8}$)/)){ 
	 		$.dialog({
			contentHtml : '<p>抱歉，姓名需要输入2-4位汉字或八个英文字母</p>'
			});
			/*alert("抱歉，姓名需要输入2-4位汉字或八个英文字母");*/
			return false;
		}
	 	//性别，必选
	 	var sex = $("select[name='sexId']").val(); 
	 	 	//性别，必选
	 	//var sex = $("select[name='sexId']:checked").val();
	 	//alert(sex); 
	 	//if(sex == "请选择性别"){
	 	//	alert("请选择性别");
	 	//	$("select[name='sexId']").focus();
	 	//	return false; 
	 	//}
	 	//手机号验证
	 	var phone = $("input[name='phone']").val();
	 	if (phone == "" || phone == "手机号") { 
	 		$.dialog({
			contentHtml : '<p>手机号不能为空！</p>'
			});
	 		/*alert("手机号码不能为空！"); */ 
	 		/*$("input[name='phone']").focus(); */
	 		return false; 
	 	}  
	 	if (!phone.match(/^(((1[3|5|7|8][0-9]{1}))+\d{8})$/)) { 
	 		$.dialog({
			contentHtml : '<p>手机号码格式不正确！</p>'
			});
	 		/*alert("手机号码格式不正确！"); */ 
	 		/*$("input[name='phone']").focus();*/ 
	 		return false; 
	 	}
	  

	 	//省，必选
	 	var province = $("select[name='provinceId']").val();
	 	//console.log(province);
	 	if(province == "省份"){
	 		$.dialog({
			contentHtml : '<p>请选择省份</p>'
			});
	 		/*alert("请选择省份");*/
	 		/*$("select[name='provinceId']").focus();*/
	 		return false; 
	 	}
	 	//市，必选
	 	var city = $("select[name='cityId']").val(); 
	 	if(city == "城市"){
	 		$.dialog({
			contentHtml : '<p>请选择城市</p>'
			});
	 		/*alert("请选择城市");*/
	 		/*$("select[name='cityId']").focus();*/
	 		return false; 
	 	}
	 	//经销商，必选
	 	var dealer = $("select[name='dealer']").val(); 
	 	if(dealer == "经销商"){
	 		$.dialog({
			contentHtml : '<p>请选择经销商</p>'
			});
	 		/*alert("请选择经销商");*/
	 		/*$("select[name='dealer']").focus();*/
	 		return false; 
	 	}
	 	//车系必选
	 	var carid = $("select[name='car_series_id']").val();
	 	if(carid == "意向车型"){
	 		$.dialog({
			contentHtml : '<p>请选择车型</p>'
			});
	 		/*alert("请选择车型");*/
	 		/*$("select[name='car_series_id[]']").focus();*/
			return false; 
	 	}
	 	var dealer_name = province+","+city+","+dealer;
	 	//
	
	 	$.ajax({
		  	type: 'POST',
		  	url: 'http://fld.xingyuanauto.com/public/index.php/port/Userdblotter/DuserBphone',
		  	data: {numberphone:phone,key:encrystr},
		  	dataType: "json",
		    success: function(data){  //验证下游是否有注册,
			    if(data.start=="2008"){
				    $.getJSON(kkurl+"/medias/public/index.php/port/Userreg/Comreg", { han: "dealreg",username:name,thesex:sex,numberphone:phone,dealer:dealer_name,model:carid,key:encrystr}, function(json){ 
						if(jQuery.type(json)=="string"){
							var json = eval('('+json+')'); //字符串转为json格式
						} 
						/*alert(json.msg);*/
						$.dialog({
						contentHtml : '<p>'+json.msg+'</p>'
						});
						console.log(json);
						 
					})
			    }else{
				    /*alert(data.msg);*/
				    $.dialog({
						contentHtml : '<p>'+data.msg+'</p>'
					});
				    console.log(data);
			    } 
			},
			error:function(err){
				$.dialog({
				contentHtml : '<p>注册人数较多，请稍后</p>'
				});
				/*alert("注册人数较多，请稍后");*/
			} 
		}); 
	});
	//微信分享 
	
	var url = kkurl+"/weixin/jssdk/wx_token.php";
	$.post(url,function(msg){
		if(msg.start == 0){ 
          return alert(msg.message);
        }
		
		var title ='东风标致SUV盛会'; // 分享标题
        var link = kkurl+'/201703/peugeot';
        var desc = '“0”息“0”税“0”元保养'; // 分享描述
        var imgUrl = kkurl+'/201703/peugeot/images/log1.jpg';
	
	    var wx_appId = msg.appId; 
		var wx_timestamp = msg.timestamp;
		var wx_nonceStr = msg.nonceStr;
		var wx_signature = msg.signature;
	
		        /*
             * 注意：
             * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
             * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
             * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
             *
             * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
             * 邮箱地址：weixin-open@qq.com
             * 邮件主题：【微信JS-SDK反馈】具体问题
             * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
             */
        wx.config({
            debug: false,
            appId: wx_appId,
            timestamp: wx_timestamp,
            nonceStr: wx_nonceStr,
            signature: wx_signature,
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline',//分享到朋友圈
                'onMenuShareAppMessage',//分享给朋友
                'onMenuShareQQ',//分享到QQ
				'onMenuShareQZone',//分享到QQ空间
                'onMenuShareWeibo'//分享到腾讯微博
            ]
        });
       
	   wx.ready(function () {
            // 在这里调用 API
			
			//分享到朋友圈
            wx.onMenuShareTimeline({
                title:title, // 分享标题
                link: link, // 分享链接
                desc: desc, // 分享描述
                imgUrl:imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
			
			//分享到朋友
			wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
			
            //分享到QQ
			wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
			
			//分享到QQ空间
			wx.onMenuShareQZone({
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () { 
				   // 用户确认分享后执行的回调函数
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
			
			//分享到腾讯微博
            wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        });
			
	},'json')
})