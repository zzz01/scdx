/**
 * 拖拽
 */
var fileBuf = new Array();
$(function() {
	// 阻止浏览器默认行。
	$(document).on({
		dragleave : function(e) { // 拖离
			e.preventDefault();
		},
		drop : function(e) { // 拖后放
			e.preventDefault();
		},
		dragenter : function(e) { // 拖进
			e.preventDefault();
		},
		dragover : function(e) { // 拖来拖去
			e.preventDefault();
		}
	});
	// 用javascript来侦听drop事件，首先要判断拖入的文件是否符合要求，包括图片类型、大小等，
	// 然后获取本地图片信息，实现预览，最后上传
	var box = document.getElementById('drop_area'); // 拖拽区域
	box.addEventListener("drop", function(e) {
		e.preventDefault(); // 取消默认浏览器拖拽效果
		var fileList = e.dataTransfer.files; // 获取文件对象
		// 检测是否是拖拽文件到页面的操作
		if (fileList.length == 0) {
			return false;
		}
		// 检测文件是不是excel文件
		for (var index = 0; index < fileList.length; index++) {
			var filename = fileList[index].name;
			if (filename.lastIndexOf("xls") !== -1
					|| filename.lastIndexOf("xlsx") !== -1) {
				var origfile = fileList[index];
				var fd = new FormData();
				fd.append("origfile", origfile);
				$.ajax({
					async : false,
					crossDomain : true,
					url : "/extfile/checkExtfile",
					method : "POST",
					processData : false,
					contentType : false,
					mimeType : "multipart/form-data",
					data : fd,
					success : function(msg) {
						addOrigfile(filename);
						$(".btn_del_all").removeAttr("disabled");
						$(".btn_upl_all").removeAttr("disabled");
					},
					error : function() {
						stop();
					}
				});
				fileBuf.push(origfile);
			} else {
				alert(filename + " 不是Excel文件");
			}
		}
	}, false);
});

/**
 * 将原始文件名显示在界面
 */
function addOrigfile(filename) {
	var btn_content = '<a href="#" class="btn btn-info disabled" role="button">'
			+ filename + '</a>';
	$("#filelist").append(btn_content);
}

/**
 * 上传所有文件
 */
function uploadAll() {
	var flag = true;
	for (var i = 0; i < fileBuf.length; i++) {
		var form = new FormData();
		form.append("origfile", fileBuf[i]);
		form.append("topicId", getCookie("topicId"));
		$.ajax({
			async : false,
			crossDomain : true,
			url : "/extfile/upload",
			method : "POST",
			processData : false,
			contentType : false,
			mimeType : "multipart/form-data",
			data : form,
			error : function() {
				alert("上传失败");
				flag = false;
				stop();
			}
		});
	}

	if (flag) {
		$("#drop_area").text("上传成功。");
		setTimeout(function() {
			jumpto("ext-cluster");
		}, 250);

	}
}

/**
 * 删除所有文件
 */
function deleteAll() {
	fileBuf = new Array();
	$("#filelist").text("");
	$(".btn_del_all").attr("disabled", true);
	$(".btn_upl_all").attr("disabled", true);
}