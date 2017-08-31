var interval;
$(document).ready(function(){
	var params = location.search;
	var dzid = "";
	var date = "";
	var strs = {};
	
	
	if(params.indexOf("?")!=-1){
		var str = params.substring(1);
		strs = str.split("&");
		dzid = unescape(strs[0].split("=")[1]);
		date = unescape(strs[1].split("=")[1]);
	}
	var clear = loadDetail(dzid,date);
	interval=setInterval("loadDetail('"+dzid+"','"+date+"')",10000);
	
});
function loadDetail(dzid,date){
	var clear = false;
	$("#header").children().remove();
	$("#content").children().remove();
	$.ajax({
		url:static.apiUrl+"/api/v1/match/detail?dzid="+dzid+"&date="+date,
		dataType:"json",
		type:"get",
		success:function(data){
			if(data&&data.data){
				var nstate = '已结束';
				if(data.data.nstate=='live'){
					nstate = data.data.live.points1+'&nbsp&nbsp:&nbsp&nbsp'+data.data.live.points2;
				}else{
					if(interval){
						window.clearInterval(interval);
					}
					
				}
				$("#header").append("<div id='person1' class='top-30' ><img class='photo' src='"+data.data.photo1+"'/><div class='player-font'>"+data.data.player1+"</div></div>");
				$("#header").append("<div id='describe' class='top-mid'>"
										+"<div id='matchname'>"+data.data.matchname+"&nbsp"+data.data.luncititle+"</div>"
										+"<div id='nstate' class='f-bold x-l'>"+nstate+"</div>"
										+"<div id='fen'>"+data.data.player1fen+"&nbsp:&nbsp"+data.data.player2fen+"</div>"
									+"</div>");
				$("#header").append("<div id='person2' class='top-30'><img class='photo' src='"+data.data.photo2+"'/><div class='player-font'>"+data.data.player2+"</div></div>");
				if(data.data.nstate=='live'){
					var breakpot = data.data.live.break1;
					var vs = '';
					if(data.data.live.break1=='0'||data.data.live.break2=='0'){
						vs="<div class='bg-grey vs-l'>&nbsp</div>VS<div class='bg-grey vs-r'>&nbsp</div>";
					}else if(data.data.live.break1!='0'&&data.data.live.break2==''){
						vs="<div class='bg-red vs-l'>&nbsp</div>VS<div class='bg-grey vs-r'>&nbsp</div>";
					}else{
						vs="<div class='bg-grey vs-l'>&nbsp</div>VS<div class='bg-red vs-r'>&nbsp</div>";
					}
					if(breakpot==""){
						breakpot = data.data.live.break2;
					}
					$("#content").append("<div class='live-box'>"+vs+"</div>"
										+"<div class='live-box live-bo'>BO <span class='red'>"+data.data.live.bestof+"</span></div>"
										+"<div class='live-box live-bo'>单杆得分 <span class='red'>"+breakpot+"</span></div>"
										+"<div class='live-box live-pointsleft'>台面剩余 <span class='red'>"+data.data.live.pointsleft+"</span></div>"
										);
				}
				$("#content").append("<div class='score font-bold'><div class='left'>50+</div> <div class='m-left'>分数</div> <div class='mid'>#</div> <div class='m-right'>分数</div> <div class='right'>50+</div></div>");
				$.each(data.data.duijulist,function(index,duiju){
					if(duiju.winid=='1'){
						$("#content").append("<div class='score'><div class='left'>"+duiju.player1more+"</div> <div class='m-left red'>"+duiju.player1fen+"</div><div class='mid'>("+duiju.junum+")</div><div class='m-right'>"+duiju.player2fen+"</div> <div class='right'>"+duiju.player2more+"</div></div>");
					}else{
						$("#content").append("<div class='score'><div class='left'>"+duiju.player1more+"</div> <div class='m-left'>"+duiju.player1fen+"</div><div class='mid'>("+duiju.junum+")</div><div class='m-right red'>"+duiju.player2fen+"</div> <div class='right'>"+duiju.player2more+"</div></div>");
					}
					
				});
			}
		}
	});
	return clear;
}