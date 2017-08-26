$(document).ready(function(){
	//比分tab绑定点击事件
	$("#tab1").bind("click",function(){
		self.location='../discovery/discovery.html';
	});
	//赛事tab绑定点击事件
	$("#tab2").bind("click",function(){
		self.location='../match/match.html';
	});

	//世界排名tab绑定点击事件
	$("#tab3").bind("click",function(){
		self.location='../ranking/ranking.html';
	});
	var bottomHeight = $("#bottomtabs").height();
	$(".fill").css("height",bottomHeight);
});

