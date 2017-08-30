var descData ;
$(document).ready(function(){
	var params = location.search;
	var uid = params.substring(params.indexOf("=")+1);
	
	$.ajax({
		url:static.apiUrl+"/api/v1/player/info?uid="+uid,
		dataType:"json",
		type:"get",
		success:function(data){
			if(data&&data.data){
				$("#head-img").attr("src",data.data.avatarUrl);
				$("#name").text(data.data.name);
				descData = data.data.desc;
				$("#desc p").text(descData);
				minDesc();
				
				$("#player-desc").append("<div class='detail'><span class='s-box red'>&nbsp&nbsp</span><span class='k-v'>国籍："+data.data.country+"</span></div>"
										+"<div class='detail'><span class='s-box red'>&nbsp&nbsp</span><span class='k-v'>转职年份："+data.data.turnedPro+"</span></div>"
										+"<div class='detail w100'><span class='s-box red'>&nbsp&nbsp</span><span class='k-v'>出生日期："+data.data.birthday+"</span></div>"
										);
				$("#career").append("<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>世界排名："+data.data.rank+"</span></div>"
									+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>破百数："+data.data.centuryBreak+"</span></div>"
									+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>大型排名比赛冠军数："+data.data.largeTitles+"</span></div>"
									+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>邀请赛冠军数："+data.data.inviteTitles+"</span></div>"
									+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>小型排名比赛冠军数："+data.data.microTitles+"</span></div>"
									+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>147数："+data.data.maxBreak+"</span></div>"
									+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp</span><span class='k-v'>冠军总数："+data.data.titles+"</span></div>"
									);
			}
		}
	});
	
	// var $p = $("#desc");
	// while ($p.outerHeight() > 100) {
	// 	$p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));	
	// }
});
function openDesc(){
	var text = $("#desc-open").text();
	if(text == "点击展开"){
		$("#desc p").text(descData);
		$("#desc").height("auto");
		$("#desc-open").text("收起");
	}else{
		minDesc();
		$("#desc-open").text("点击展开");
	}
}
function minDesc(){
	$(".desc").each(function (i) {  
		var divH = 50;
		var $p = $("p", $(this)).eq(0);
		var h = $p.outerHeight();
		if(h<divH){
			$("#desc").height("auto");
			$("#desc-open").hide();
			return;
		}
		while ($p.outerHeight() > divH) {
			$p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));	
		}
	});
}
