$(document).ready(function(){
		//设置比分页面两个面板的位置
		var toptabsHeight = $("#toptabs").height();
		$(".disPanel").css("margin-top",toptabsHeight);
		//加载今日赛程
		loadScheduleData();
		var interval ;
		//今日赛程tab绑定点击事件
		$("#toptab1").bind("click",function(){
			// $(this).css({"border-bottom":"red 1px solid","color":"#cc0000"});
			// $("#toptab2").css({"border-bottom":"none","color":"black"});
			$(this).addClass("bg-red");
			$("#toptab2").removeClass("bg-red");

			$("#scheduleDiv").css("display","block");
			$("#liveDiv").css("display","none");
			//加载今日赛程
		  	loadScheduleData();
		  	if(interval){
		  		window.clearInterval(interval);
		  	}
		});

		//比分直播tab绑定点击事件
		$("#toptab2").bind("click",function(){
			// $(this).css({"border-bottom":"red 1px solid","color":"#cc0000"});
			// $("#toptab1").css({"border-bottom":"none","color":"black"});
			$(this).addClass("bg-red");
			$("#toptab1").removeClass("bg-red");

			$("#scheduleDiv").css("display","none");
			$("#liveDiv").css("display","block");
			//加载比分直播
			loadLiveData();
			interval = setInterval("loadLiveData()",10000);
		});
	});
	//加载比分直播
	function loadLiveData(){
		$("#liveDiv").children().remove();
		$.ajax({
			url:static.apiUrl+"/api/v1/match/livescore",
			dataType:"json",
			type:"get",
			success:function(data){
				if(data&&data.data&&data.data.length>0){
					$.each(data.data,function(index,against){
						var p1breakScore = against.player1.breakScore;
						if($.trim(p1breakScore) ==""){
							p1breakScore = "&nbsp";
						}
						$("#liveDiv").append("<div class='live-against xx-s'>"
												+"<div class='p1head mid'>"
													+"<div class='pImg'><img onclick='openPlayerInfo("+against.player1.uid+")' src='"+against.player1.headImgUrl+"'/></div>"
													+"<div class='pname'>"+against.player1.name+"</div>"
												+"</div>"
												+"<div class='live-against-set mid'>"
													+"<div class='bo'>BO<span class='red'>"+against.common.bestOf+"</span></div>"
													+"<div class='1-score-2'>"
														+"<div class='s-left red'>"+against.player1.totalSetScore+"</div>"
														+"<div class='s-mid'>局分</div>"
														+"<div class='s-right red'>"+against.player2.totalSetScore+"</div>"
													+"</div>"
													+"<div class='1-score-2'>"
														+"<div class='s-left red'>"+against.player1.thisSetScore+"</div>"
														+"<div class='s-mid'>本局比分</div>"
														+"<div class='s-right red'>"+against.player2.thisSetScore+"</div>"
													+"</div>"
													+"<div class='1-score-2'>"
														+"<div class='s-left red'>"+p1breakScore+"</div>"
														+"<div class='s-mid'>单杆得分</div>"
														+"<div class='s-right red'>"+against.player2.breakScore+"</div>"
													+"</div>"
													+"<div class='live-mid'>台面剩余</div>"
													+"<div class='live-mid red'>"+against.common.leftScore+"</div>"
												+"</div>"
												+"<div class='p2head mid'>"
													+"<div class='pImg'><img onclick='openPlayerInfo("+against.player2.uid+")' src='"+against.player2.headImgUrl+"'/></div>"
													+"<div class='pname'>"+against.player2.name+"</div>"
												+"</div>"
											+"</div>");
					});
				}
			}
		});
	}
	//加载今日赛程
	function loadScheduleData(){
		$("#scheduleDiv").children().remove();
		$.ajax({
			url:static.apiUrl+"/api/v1/match/today",
			type:"get",
			dataType: "json",
			success: function(data) {
				if(data&&data.data&&data.data.length>0){
					$.each(data.data,function(index,session){
						$("#scheduleDiv").append("<div class='sessionhead x-s'>序号<span class='sessionhead-time'>"+session.time+"</span><span class='sessionhead-round'>"+session.round+"</span></div>");
						$.each(session.againstList,function(index,against){
							var borderBottom = "grey-b-b";
							if(index == session.againstList.length-1){
								borderBottom = "";
							}
							$("#scheduleDiv").append("<div class='against xx-s "+borderBottom+"' onclick='openDetail(&quot;"+against.dzid+"&quot;,&quot;"+session.time+"&quot;)'>"
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
				}
			}
		});
	}
	//打开对阵详情页面
	function openDetail(dzid,time){
		var date = getNowFormatDate();
		self.location = "../match/detail.html?dzid="+dzid+"&date="+date+" "+time;
	}

	//打开球员详情页面
	function openPlayerInfo(uid){
		self.location = "../ranking/playerinfo.html?uid="+uid;
	}
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	    return currentdate;
	}