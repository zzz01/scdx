// JavaScript Document
//用户信息展示
function websiteInforShow(page) {
    $.ajax({
        type: "post",
        url: "/domain/selectDomain",
        data: {
            start: (parseInt(10 * page - 10)),
            limit: 10
        },
        dataType: "json",
        beforeSend : function() {
			begin();
			},
        success: function (msg) {
        	$('#domain_content').html("");
            if (msg.status == "OK") {                
                // alert("success");
                var result = msg.result;
                var one = result.one;
                var two = result.two;
                $.each(one, function (idx, item) {
                    row = '<summary style="margin-bottom:10px;" onclick="pullDown(this)">'
                        + '<p data-id="'+item.uuid+'">'
                        + '<span style="width: 220px; min-height: 10px; display: inline; float: left;">'
                        + '<span class="glyphicon glyphicon-chevron-right" aria-label="true" style="float: left; padding: 1px 3px;"></span>'
                        + '<a href="http://'+item.url+'" target="_blank">'+item.url+'</a>'
                        + '</span>'
                        + '<span style="width: 170px;min-height: 10px; display: inline; float: left;">'+item.name+'</span>'
                        + '<span style="width: 110px;min-height: 10px; display: inline; float: left">'+item.rank+'</span>'
                        + '<span style="width: 100px;min-height: 10px; display: inline; float: left">'+item.weight+'</span>'
                        + '<span><a href="javascript:" style="margin: 2px 0px; text-decoration:underline" onclick="showOneDetails(this)">详情</a> <a href="javascript:" style="margin: 2px 0px;text-decoration:underline" onclick="delDomainOne(this)">删除</a></span>'
                        + '</p>'
                        + '</summary>';
                    $.each(two[idx],function(idx,item){
                        row +='<p data-id="'+item.uuid+'">'
                            + '<span style="width: 220px; min-height: 10px; display: inline; float: left;">'
                            + '<a href="http://'+item.url+'" target="_blank">----'+item.url+'</a>'
                            + '</span>'
                            + '<span style="width: 170px;min-height: 10px; display: inline; float: left;">'+item.name+'</span>'
                            + '<span style="width: 110px;min-height: 10px; display: inline; float: left">'+item.rank+'</span>'
                            + '<span style="width: 100px;min-height: 10px; display: inline; float: left">'+item.weight+'</span>'
                            + '<span><a href="javascript:" style="margin: 2px 0px; text-decoration:underline" onclick="showTwoDetails(this)">详情</a> <a href="javascript:" style="margin: 2px 0px;text-decoration:underline" onclick="delDomainTwo(this)">删除</a></span>'
                            + '</p>'
                    })
                    row = '<details style="font-size: 16px">'+row+'</details>';
                    $('#domain_content').append(row);
                });
            } else {
                alert(msg.result);
                $('#domain_content').html("");
            }
        },
        error: function () {
        	 alert("您没有权限使用该资源...");
        },
        complete:function(){
			stop();
		}
    })
}
function initShowPage(currenPage) {
    var listCount = 0;
    if ("undefined" == typeof(currenPage) || null == currenPage) {
        currenPage = 1;
    }
    $.ajax({
        type: "post",
        url: "/domain/selectDomainCount",
        dataType: "json",
        beforeSend : function() {
			begin();
			},
        success: function (msg) {
            if (msg.status == "OK") {
                // alert("success");
                listCount = msg.result;
                $("#page").initPage(listCount, currenPage, websiteInforShow);
            } else {
                //              console.log(msg.result);
            }
        },
        error: function () {
        	 alert("您没有权限使用该资源...");
        },
        complete:function(){
			stop();
		}
    })
}

function initSearchPage(currenPage) {
    var listCount = 0;
    if ("undefined" == typeof(currenPage) || null == currenPage) {
        currenPage = 1;
    }
    var obj2 = $("#web_name").val();
    var obj3 = $("#web_level").val();
    var obj4 = $("#web_weight").val();
    $.ajax({
        type: "post",
        url: "/domain/searchDomainOneCount",
        data: {
            url: $("#web_url").val(),
            name: obj2,
            rank: obj3,
            weight: obj4
        },
        dataType: "json",
        beforeSend : function() {
			begin();
			},
        success: function (msg) {
            if (msg.status == "OK") {
                // alert("success");
                listCount = msg.result;
                $("#page").initPage(listCount, currenPage, websiteInforSearch);
            } else {
                alert(msg.result);
            }
        },
        error: function () {
        	 alert("您没有权限使用该资源...");
        },
        complete:function(){
			stop();
		}
    })
}

// 信息搜索
function websiteInforSearch(page) {
    search_click = true;
    // var obj1 = $("#web_url").val();
    var obj2 = $("#web_name").val();
    var obj3 = $("#web_level").val();
    var obj4 = $("#web_weight").val();
    $.ajax({
        type: "post",
        url: "/domain/searchDomainOne",
        data: {
            url: $("#web_url").val(),
            name: obj2,
            // level:obj3,
            rank: obj3,
            weight: obj4,
            start: (parseInt(10 * page - 10)),
            limit: 10
        },
        dataType: "json",
        beforeSend : function() {
			begin();
			},
        success: function (msg) {
        	$('#domain_content').html("");
            if (msg.status == "OK") {                
                // alert("success");
                var result = msg.result;
                var one = result.one;
                var two = result.two;
                $.each(one, function (idx, item) {
                    row = '<summary style="margin-bottom:10px;" onclick="pullDown(this)">'
                        + '<p data-id="'+item.uuid+'">'
                        + '<span style="width: 220px; min-height: 10px; display: inline; float: left;">'
                        + '<span class="glyphicon glyphicon-chevron-right" aria-label="true" style="float: left; padding: 1px 3px;"></span>'
                        + '<a href="http://'+item.url+'" target="_blank">'+item.url+'</a>'
                        + '</span>'
                        + '<span style="width: 170px;min-height: 10px; display: inline; float: left;">'+item.name+'</span>'
                        + '<span style="width: 110px;min-height: 10px; display: inline; float: left">'+item.rank+'</span>'
                        + '<span style="width: 100px;min-height: 10px; display: inline; float: left">'+item.weight+'</span>'
                        + '<span><a href="javascript:" style="margin: 2px 0px; text-decoration:underline" onclick="showOneDetails(this)">详情</a> <a href="javascript:" style="margin: 2px 0px;text-decoration:underline" onclick="delDomainOne(this)">删除</a></span>'
                        + '</p>'
                        + '</summary>';
                    $.each(two[idx],function(idx,item){
                        row +='<p data-id="'+item.uuid+'">'
                            + '<span style="width: 220px; min-height: 10px; display: inline; float: left;">'
                            + '<a href="http://'+item.url+'" target="_blank">----'+item.url+'</a>'
                            + '</span>'
                            + '<span style="width: 170px;min-height: 10px; display: inline; float: left;">'+item.name+'</span>'
                            + '<span style="width: 110px;min-height: 10px; display: inline; float: left">'+item.rank+'</span>'
                            + '<span style="width: 100px;min-height: 10px; display: inline; float: left">'+item.weight+'</span>'
                            + '<span><a href="javascript:" style="margin: 2px 0px; text-decoration:underline" onclick="showTwoDetails(this)">详情</a> <a href="javascript:" style="margin: 2px 0px;text-decoration:underline" onclick="delDomainTwo(this)">删除</a></span>'
                            + '</p>'
                    })
                    row = '<details style="font-size: 16px">'+row+'</details>';
                    $('#domain_content').append(row);
                });
            } else {
                alert(msg.result);
                $('#domain_content').html("");
            }
        },
        error: function () {
        	 alert("您没有权限使用该资源...");
        },
        complete:function(){
			stop();
		}
    })
}

// 用户添加
function websiteInforAdd() {
    jumpto("website-add");
}
// 用户编辑


//查看一级域名详细信息
function showOneDetails(e) {
	var uuid = $(e).parent().parent("p").attr("data-id");
    /*var minutes = 20; // 此 cookie 将被保存 20分钟
    var exp = new Date();
    exp.setTime(exp.getTime() + minutes * 60 * 1000);
    document.cookie = "domain_id" + "=" + escape(uuid) + ";expires=" + exp.toGMTString();*/
	setCookie("domain_id",uuid);
    jumpto("website-one-details");
}

//查看二级域名详细信息
function showTwoDetails(e){
	var uuid = $(e).parent().parent("p").attr("data-id");
    /*var minutes = 20; // 此 cookie 将被保存 20分钟
    var exp = new Date();
    exp.setTime(exp.getTime() + minutes * 60 * 1000);
    document.cookie = "domain_id" + "=" + escape(uuid) + ";expires=" + exp.toGMTString();*/
	setCookie("domain_id",uuid);
    jumpto("website-two-details");
}

//删除一级域名
function delDomainOne(e) {
	if(!confirm("该删除操作会连同二级域名一起删除！\n\n                 确定删除吗？"))
		return ;
	var uuid = $(e).parent().parent("p").attr("data-id");
    $.ajax({
        type:"post",
        url:"/domain/deleteDomainOne",
        data:{
            uuid:uuid
        },
        dataType: "json",
        beforeSend : function() {
			begin();
			},
        success: function (msg) {
            if (msg.status == "OK") {
                alert(msg.result);
                jumpto("website-infor");
            }else
                alert(msg.result);
        },
        error: function () {
        	 alert("您没有权限删除一级域名。");
        },
        complete:function(){
			stop();
		}
    })
}

//删除二级域名
function delDomainTwo(e) {
    var uuid = $(e).parent().parent("p").attr("data-id");
    $.ajax({
        type:"post",
        url:"/domain/deleteDomainTwo",
        data:{
            uuid:uuid
        },
        dataType: "json",
        beforeSend : function() {
			begin();
			},
        success: function (msg) {
            if (msg.status == "OK") {
                alert(msg.result);
                jumpto("website-infor");
            }else
                alert(msg.result);
        },
        error: function () {
        	 alert("您没有权限删除二级域名。");
        },
        complete:function(){
			stop();
		}
    })
}


function pullDown(th){
	if($(th).parent("details").attr("open")=="open"){
        $(th).parent("details").attr("open","");
        $(th).find(".glyphicon").removeClass("glyphicon-chevron-down");
        $(th).find(".glyphicon").addClass("glyphicon-chevron-right");
    }else {
        $("details").removeAttr("open");
        $(".glyphicon").removeClass("glyphicon-chevron-down");
        $(".glyphicon").addClass("glyphicon-chevron-right");
        $(th).parent("details").attr("open");
        $(th).find(".glyphicon").removeClass("glyphicon-chevron-right");
        $(th).find(".glyphicon").addClass("glyphicon-chevron-down");
    }
}