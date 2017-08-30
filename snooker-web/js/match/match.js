$(document).ready(function(){
	var season = new Date().getFullYear();
	$("#top-title").append(season+"/"+(season+1)+"赛季");
	$(".poster-img").click(function(){
		var matchId = $(this).attr("matchId");
		self.location = "singelmatch.html?id="+matchId;
	});
	$("#calendar").bind("click",function(){
		$("#cal-choose").css("display","block");
	});
	for(var i=2010;i<2018;i++){
		$("#cal-choose").append("<div class='year' onclick='loadData("+i+")'>"+i+"/"+(i+1)+"</div>");
	}
	loadData(season);
	
	// var matchsDivHeight = $("#matchsDiv").height();
	// $("#matchsDiv").css("margin-bottom",bottomHeight+matchsDivHeight);
	
});
function loadData(season){
	$("#top-title").text(season+"/"+(season+1)+"赛季");
	$("#matchsDiv").children().remove();
	$.ajax({
		url:static.apiUrl+"/api/v1/match/list?season="+season,
		dataType:"json",
		type:"get",
		success:function(data){
			if(data&&data.data&&data.data.length>0){
				$.each(data.data,function(index,item){
					var posterUrl = item.posterUrl;
					if($.trim(posterUrl)==""){
						posterUrl="http://oodlprgqg.bkt.clouddn.com/%E6%9C%80%E7%BB%88%E7%89%88_meitu_12.png";
					}
					$("#matchsDiv").append("<div class='matchDiv' onclick='openSingle("+item.id+")'><div class='img'><img class='poster-img' src='"+posterUrl+"'/></div>"
						+"<div class='match-describe'><div class='match-title'>"+item.name+"</div>"
						+"<div class='h32'>"
						+"<span class='text-part'><img class='img-s' src='../../image/type.png'/></span><span class='text-part'>赛事性质："+item.type+"</span>"
						+"</div>"
						+"<div class='h32'>"
						+"<span class='text-part'><img class='img-s' src='../../image/time.png'/></span><span class='text-part clo-red'>时间："+item.time+"</span>"
						+"</div>"
						+"<div class='h32'>"
						+"<span class='text-part'><img class='img-s' src='../../image/number.png'/></span><span class='text-part'>参赛人数："+item.number+"</span>"
						+"</div>"
						+"</div></div>");
				});
			}
		}
	});
	$("#cal-choose").css("display","none");
}
function openSingle(matchId){
	self.location = "singlematch.html?id="+matchId;
}