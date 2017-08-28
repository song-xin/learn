$(document).ready(function(){
	var params = location.search;
	var matchId = params.substring(params.indexOf("=")+1);
	$.ajax({
		url:static.apiUrl+"/api/v1/match/schedule?id="+matchId,
		dataType:"json",
		type:"get",
		success:function(data){
			if(data&&data.data&&data.data.length>0){
				$.each(data.data,function(index,data){
					$("#againstDiv").append("<div class='date'>"+data.date+data.day+"</div>");
					$.each(data.sessionList,function(index,session){
						$("#againstDiv").append(
							"<div class='sessionhead'>序号<span class='sessionhead-time'>"+session.time+"</span><span class='sessionhead-round'>"+session.round+"</span></div>");
						$.each(session.againstList,function(index,against){
							$("#againstDiv").append("<div class='against' onclick='openDetail(&quot;"+against.dzid+"&quot;,&quot;"+data.date+"&quot;,&quot;"+session.time+"&quot;)'>"
														+"<span class='against-no'>"+against.no+"</span>"
														+"<span class='against-p1name'>"+against.p1name+"</span>"
														+"<div class='against-set'>"
															+"<div class='mid'>"+against.p1set+"</div>"
															+"<div class='mid'>VS</div>"
															+"<div class='mid'>"+against.p2set+"</div>"
														+"</div>"
														+"<span class='against-p2name'>"+against.p2name+"</span>"
													+"</div>");
						});
					});
				});
			}
		}
	});
	
});
function openDetail(dzid,date,time){
	var url = "detail.html?dzid="+dzid+"&date="+date+" "+time;
	self.location = "detail.html?dzid="+dzid+"&date="+date+" "+time;
}