$(document).ready(function(){
	$.ajax({
		url:static.apiUrl+"/api/v1/player/ranking",
		dataType:"json",
		type:"get",
		success:function(data){
			if(data&&data.data&&data.data.length>0){
				$.each(data.data,function(index,player){
					var bgcolor = "white";
					if(player.no%2 ==0){
						bgcolor = "grey";
					}
					$("#rankingDiv").append("<div class='"+bgcolor+" x-s' onclick='openPlayerInfo("+player.uid+")'>"
						+"<div class='left'>"+player.no+"</div>"
						+"<div class='mid f-bold'>"+player.name+"</div>"
						+"<div class='right'>"+player.prize+"</div>"
						+"</div>");
				});
			}
		}
	});
});
function openPlayerInfo(uid){
	self.location = "playerinfo.html?uid="+uid;
}