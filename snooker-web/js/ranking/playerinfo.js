$(document).ready(function(){
	var params = location.search;
	var uid = params.substring(params.indexOf("=")+1);
	$.ajax({
		url:static.apiUrl+"/api/v1/player/info?uid="+uid,
		dataType:"json",
		type:"get",
		success:function(data){
			if(data&&data.data){
				$("#content").append("<div id='player-name'>"
										+"<img id='head-img' src='"+data.data.avatarUrl+"'/>"
										+"<div id='name'>"+data.data.name+"</div><div id='desc-open' onclick='openDesc()'>点击展开</div>"
										+"<div id='desc'>"+data.data.desc+"</div>"
									+"</div>"
									+"<div class='detail-head'>球员详情</div>"
									+"<div class='player-detail'>"
										+"<div class='detail'><span class='s-box red'>&nbsp&nbsp&nbsp</span><span class='k-v'>国籍："+data.data.country+"</span></div>"
										+"<div class='detail'><span class='s-box red'>&nbsp&nbsp&nbsp</span><span class='k-v'>转职年份："+data.data.turnedPro+"</span></div>"
										+"<div class='detail'><span class='s-box red'>&nbsp&nbsp&nbsp</span><span class='k-v'>出生日期："+data.data.birthday+"</span></div>"
									+"</div>"
									+"<div class='detail-head'>职业生涯统计</div>"
									+"<div class='player-detail'>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>世界排名："+data.data.rank+"</span></div>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>破百数："+data.data.centuryBreak+"</span></div>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>大型排名比赛冠军数："+data.data.largeTitles+"</span></div>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>邀请赛冠军数："+data.data.inviteTitles+"</span></div>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>小型排名比赛冠军数："+data.data.microTitles+"</span></div>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>147数："+data.data.maxBreak+"</span></div>"
										+"<div class='detail'><span class='s-box grey'>&nbsp&nbsp&nbsp</span><span class='k-v'>冠军总数："+data.data.titles+"</span></div>"
									+"</div>"
									);
			}
		}
	});
});
function openDesc(){
	var text = $("#desc-open").text();
	if(text == "点击展开"){
		$("#desc").height("min-content");
		$("#desc-open").text("收起");
	}else{
		$("#desc").height("100px");
		$("#desc-open").text("点击展开");
	}
}