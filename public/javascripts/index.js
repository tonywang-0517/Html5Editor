/**
 * Created by wangpy on 2015/1/14.
 */
var oldpage = 1;
var um = [];
document.getElementById("creatcomplete").onclick=function(){document.getElementById("creatModel").style.visibility="hidden"};
var newH = document.documentElement.clientHeight;
$(".swiper-container").height(newH*0.6);
$(".swiper-model").height(newH);
var swiperList = new Swiper('.swiper-list',{
    mode: 'vertical',
    pagination: '.paginationList',
    paginationClickable: true,
    slidesPerView: 7
    });
var swiperModel = new Swiper('.swiper-model',{
    mode: 'horizontal',
    pagination: '.paginationModel',
    paginationClickable: true,
    slidesPerView: 1
    });


$('#addpage').click(function(e) {
    e.preventDefault();
    // page[oldpage] = document.getElementById("editArea").innerHTML;
    oldpage=swiperList.slides.length+1;
    swiperList.appendSlide( '<div class="pagebtn" onclick="pageSelected(this)">'+ (swiperList.slides.length+1)+'</div>');
    document.getElementById("selectModel").style.visibility="visible";
    });

function pageSelected(self){
    oldpage = self.innerHTML;
    hiddenExceptN(parseInt(self.innerHTML));
    };

document.getElementById("changeModel").onclick=function(){
    document.getElementById("selectModel").style.visibility="visible";
    };
var selectModelComplete = function(n){
    um[oldpage]=[];
    var editArea = function(n,content){
    var temp = '<div id="editArea'+n+'" style="position: absolute;width: 100%">'+content+'</div>';
    return temp;
    };
    var beijing=function(p){
    var  temp = '<hr/>背景图片<input id="p'+p+'bg" type="text">';
    return temp;
    };
    var tupian = function (p,n){
    var temp=' <hr/>图片'+n+'<input id="p'+p+'pic'+n+'Src" type="text"> 交互动作：<select id="p'+p+'pic'+n+'Action" data-am-selected><option value="wudongzuo">无动作</option><option value="jianxian">渐现</option><option value="shangdaoxia">从上向下划出</option><option value="xiaxiangshang">从下向上划出</option><option value="zuodaoyou">从左向右</option><option value="youdaozuo">从右向左</option></select><br/>x坐标:<input id="p'+p+'pic'+n+'x" type="text" placeholder="0%/0px">y坐标:<input id="p'+p+'pic'+n+'y" type="text" placeholder="0%/0px"><br/>&nbsp;宽度:<input id="p'+p+'pic'+n+'Width" type="text" placeholder="0%/0px">&nbsp;高度:<input id="p'+p+'pic'+n+'Height" type="text" placeholder="0%/0px"> ';
    return temp;
    };
    var wudongzuotupian = function (p,n){
        var temp=' <hr/>图片'+n+'<input id="p'+p+'pic'+n+'Src" type="text"> <br/>x坐标:<input id="p'+p+'pic'+n+'x" type="text" placeholder="0%/0px">y坐标:<input id="p'+p+'pic'+n+'y" type="text" placeholder="0%/0px"><br/>&nbsp;宽度:<input id="p'+p+'pic'+n+'Width" type="text" placeholder="0%/0px">&nbsp;高度:<input id="p'+p+'pic'+n+'Height" type="text" placeholder="0%/0px"> ';
        return temp;
    };
    var fenxiang = function (p,n){
        var temp=' <hr/>分享'+n+'<input id="p'+p+'pic'+n+'Src" type="text"> 交互动作：<select id="p'+p+'pic'+n+'Action" data-am-selected><option value="wudongzuo">无动作</option><option value="jianxian">渐现</option><option value="shangdaoxia">从上向下划出</option><option value="xiaxiangshang">从下向上划出</option><option value="zuodaoyou">从左向右</option><option value="youdaozuo">从右向左</option></select><br/>x坐标:<input id="p'+p+'pic'+n+'x" type="text" placeholder="0%/0px">y坐标:<input id="p'+p+'pic'+n+'y" type="text" placeholder="0%/0px"><br/>&nbsp;宽度:<input id="p'+p+'pic'+n+'Width" type="text" placeholder="0%/0px">&nbsp;高度:<input id="p'+p+'pic'+n+'Height" type="text" placeholder="0%/0px"><br/>&nbsp;分享遮罩：<input id="p'+p+'pic'+n+'Share" type="text" placeholder="http://..."> ';
        return temp;
    };
    var chongkan = function (p,n){
        var temp=' <hr/>重看一遍'+n+'<input id="p'+p+'pic'+n+'Src" type="text"> 交互动作：<select id="p'+p+'pic'+n+'Action" data-am-selected><option value="wudongzuo">无动作</option><option value="jianxian">渐现</option><option value="shangdaoxia">从上向下划出</option><option value="xiaxiangshang">从下向上划出</option><option value="zuodaoyou">从左向右</option><option value="youdaozuo">从右向左</option></select><br/>x坐标:<input id="p'+p+'pic'+n+'x" type="text" placeholder="0%/0px">y坐标:<input id="p'+p+'pic'+n+'y" type="text" placeholder="0%/0px"><br/>&nbsp;宽度:<input id="p'+p+'pic'+n+'Width" type="text" placeholder="0%/0px">&nbsp;高度:<input id="p'+p+'pic'+n+'Height" type="text" placeholder="0%/0px"><br/>&nbsp;链接地址：<input id="p'+p+'pic'+n+'Adress" type="text" placeholder="http://...">';
        return temp;
    };
    var logo = function (p,n){
        var temp=' <hr/>logo'+n+'<input id="p'+p+'pic'+n+'Src" type="text"> 交互动作：<select id="p'+p+'pic'+n+'Action" data-am-selected><option value="wudongzuo">无动作</option><option value="jianxian">渐现</option><option value="shangdaoxia">从上向下划出</option><option value="xiaxiangshang">从下向上划出</option><option value="zuodaoyou">从左向右</option><option value="youdaozuo">从右向左</option></select><br/>x坐标:<input id="p'+p+'pic'+n+'x" type="text" placeholder="0%/0px">y坐标:<input id="p'+p+'pic'+n+'y" type="text" placeholder="0%/0px"><br/>&nbsp;宽度:<input id="p'+p+'pic'+n+'Width" type="text" placeholder="0%/0px">&nbsp;高度:<input id="p'+p+'pic'+n+'Height" type="text" placeholder="0%/0px"> ';
        return temp;
    };
    var wenzi = function (p,n){
    var temp='<hr/><p>文字'+n+'</p>背景颜色：<input id="p'+p+'text'+n+'bgc" type="text" placeholder="rgba(0,0,0,0.1);">交互动作：<select id="p'+p+'text'+n+'Action" data-am-selected><option value="wudongzuo">无动作</option><option value="jianxian">渐现</option><option value="shangdaoxia">从上向下划出</option> <option value="xiaxiangshang">从下向上划出</option></select><br/> x坐标:<input id="p'+p+'text'+n+'x" type="text" placeholder="0%/0px">y坐标:<input type="text"id="p'+p+'text'+n+'y" placeholder="0%/0px"><br/>&nbsp;宽度:<input type="text" id="p'+p+'text'+n+'Width" placeholder="0%/0px">&nbsp;高度:<input type="text" id="p'+p+'text'+n+'Height"placeholder="0%/0px"><textarea id="p'+p+'myEditor'+n+'" style="color:#000000;width:100%;height:10%;"></textarea>';
    return temp;
    };
    var wudongzuowenzi = function (p,n){
        var temp='<hr/><p>文字'+n+'</p>背景颜色：<input id="p'+p+'text'+n+'bgc" type="text" placeholder="rgba(0,0,0,0.1);"><br/> x坐标:<input id="p'+p+'text'+n+'x" type="text" placeholder="0%/0px">y坐标:<input type="text"id="p'+p+'text'+n+'y" placeholder="0%/0px"><br/>&nbsp;宽度:<input type="text" id="p'+p+'text'+n+'Width" placeholder="0%/0px">&nbsp;高度:<input type="text" id="p'+p+'text'+n+'Height"placeholder="0%/0px"><textarea id="p'+p+'myEditor'+n+'" style="color:#000000;width:100%;height:10%;"></textarea>';
        return temp;
    };
    var hiddenModelId = function(p,n){
        var temp = '<input id="p'+p+'model" value="'+n+'" style="visibility: hidden">'
        return temp;
    }
    var tijiao=function (p){
    var temp = '<hr/><button onclick="submitToView('+p+')" id="p'+p+'pageSubmit" style="width: 100%;height: 44px;">点击预览</button>';
    return temp;
    }
    if(n==1){//单背景
        var temp1 = editArea(oldpage,beijing(oldpage)+hiddenModelId(oldpage,1)+tijiao(oldpage));
        if(document.getElementById('editArea'+oldpage)){
            document.getElementById('editArea'+oldpage).innerHTML=temp1;
        }
        else{
            $('#content').append(temp1);
        }
    }

    if(n==2){//4图3文字以下
        var temp2 = editArea(oldpage,beijing(oldpage)+tupian(oldpage,1)+tupian(oldpage,2)+tupian(oldpage,3)+tupian(oldpage,4)+wenzi(oldpage,1)+wenzi(oldpage,2)+wenzi(oldpage,3)+hiddenModelId(oldpage,2)+tijiao(oldpage));
        if(document.getElementById('editArea'+oldpage)){
            document.getElementById('editArea'+oldpage).innerHTML=temp2;
        }
        else{
            $('#content').append(temp2);

        }
        creatEditor(oldpage,1);
        creatEditor(oldpage,2);
        creatEditor(oldpage,3);

    //实例化编辑器


    }
    if(n==3){//轮播 三图三文字
        var temp3 = editArea(oldpage,beijing(oldpage)+wudongzuotupian(oldpage,1)+wudongzuotupian(oldpage,2)+wudongzuotupian(oldpage,3)+wudongzuowenzi(oldpage,1)+wudongzuowenzi(oldpage,2)+wudongzuowenzi(oldpage,3)+hiddenModelId(oldpage,3)+tijiao(oldpage));
        if(document.getElementById('editArea'+oldpage)){
            document.getElementById('editArea'+oldpage).innerHTML=temp3;
        }
        else {
            $('#content').append(temp3);
        }
        creatEditor(oldpage,1);
        creatEditor(oldpage,2);
        creatEditor(oldpage,2);
        creatEditor(oldpage,3);

    //实例化编辑器


    }
    if(n==4){
        var temp2 = editArea(oldpage,beijing(oldpage)+tupian(oldpage,1)+chongkan(oldpage,2)+fenxiang(oldpage,3)+logo(oldpage,4)+wenzi(oldpage,1)+wenzi(oldpage,2)+wenzi(oldpage,3)+hiddenModelId(oldpage,4)+tijiao(oldpage));
        if(document.getElementById('editArea'+oldpage)){
            document.getElementById('editArea'+oldpage).innerHTML=temp2;
        }
        else{
            $('#content').append(temp2);
        }
        creatEditor(oldpage,1);
        creatEditor(oldpage,2);
        creatEditor(oldpage,3);

    }

    hiddenExceptN(oldpage);
    document.getElementById("selectModel").style.visibility="hidden";

    }

var hiddenExceptN = function(n){
    var allPages = swiperList.slides.length;
    for(var i=1;i<=allPages;i++){
    $('#editArea'+i).hide();
    }
    $('#editArea'+n).show(200);

    };
var creatEditor = function(p,n){
    var temp = UM.createEditor('p'+p+'myEditor'+n+'',{
    initialFrameHeight:250,//设置编辑器高度
    scaleEnabled:true
    });

    um[oldpage].push(temp);
    }
var submitToView = function(p){

    var infop = getInfo(p);
var jsonInfop = JSON.stringify(infop);
    var obj = JSON.parse(jsonInfop);
    $.ajax( {
        url:'/creatView',
        data:{"infop":jsonInfop},
        type:'post',
        dataType:'json',
        success:function(data) {
            var temp = data.data;
            document.getElementById('view').innerHTML = temp;
            if (data.modelId == 3) {
                var swipernested = ".swiper-nested-"+data.pageId;
                var paginationnested = ".pagination-nested-"+data.pageId;
           $(swipernested).height(newH);
            var swiperNested = new Swiper(".swiper-nested-"+data.pageId, {
               pagination: paginationnested,
               paginationClickable: true
          });
        }
        },
        error : function() {
            alert("error");
        }
    });











};
var getInfo = function(p){
    var info={};
    var image = [];
    var text = [];
    var modelId = document.getElementById('p'+p+'model').value;
    if(modelId==1){
        info.modelId = modelId;
        info.pageId = p;
        info.bg = document.getElementById('p'+p+'bg').value;
    };
    if(modelId==2){
        info.modelId = modelId;
        info.pageId = p;
        info.bg = document.getElementById('p'+p+'bg').value;
        image[1] ={};
        image[1].src = document.getElementById('p'+p+'pic1Src').value;
        image[1].action = document.getElementById('p'+p+'pic1Action').value;
        image[1].x = document.getElementById('p'+p+'pic1x').value;
        image[1].y= document.getElementById('p'+p+'pic1y').value;
        image[1].width = document.getElementById('p'+p+'pic1Width').value;
        image[1].height = document.getElementById('p'+p+'pic1Height').value;
        image[2] ={};
        image[2].src = document.getElementById('p'+p+'pic2Src').value;
        image[2].action = document.getElementById('p'+p+'pic2Action').value;
        image[2].x = document.getElementById('p'+p+'pic2x').value;
        image[2].y= document.getElementById('p'+p+'pic2y').value;
        image[2].width = document.getElementById('p'+p+'pic2Width').value;
        image[2].height = document.getElementById('p'+p+'pic2Height').value;
        image[3] ={};
        image[3].src = document.getElementById('p'+p+'pic3Src').value;
        image[3].action = document.getElementById('p'+p+'pic3Action').value;
        image[3].x = document.getElementById('p'+p+'pic3x').value;
        image[3].y = document.getElementById('p'+p+'pic3y').value;
        image[3].width = document.getElementById('p'+p+'pic3Width').value;
        image[3].height = document.getElementById('p'+p+'pic3Height').value;
        image[4] ={};
        image[4].src = document.getElementById('p'+p+'pic4Src').value;
        image[4].action = document.getElementById('p'+p+'pic4Action').value;
        image[4].x= document.getElementById('p'+p+'pic4x').value;
        image[4].y= document.getElementById('p'+p+'pic4y').value;
        image[4].width = document.getElementById('p'+p+'pic4Width').value;
        image[4].height = document.getElementById('p'+p+'pic4Height').value;
        text[1]={};
        text[1].bgc = document.getElementById('p'+p+'text1bgc').value;
        text[1].action = document.getElementById('p'+p+'text1Action').value;
        text[1].x = document.getElementById('p'+p+'text1x').value;
        text[1].y = document.getElementById('p'+p+'text1y').value;
        text[1].width = document.getElementById('p'+p+'text1Width').value;
        text[1].height = document.getElementById('p'+p+'text1Height').value;
        text[1].content = um[parseInt(oldpage)][0].getContent();
        text[2]={};
        text[2].bgc = document.getElementById('p'+p+'text2bgc').value;
        text[2].action = document.getElementById('p'+p+'text2Action').value;
        text[2].x = document.getElementById('p'+p+'text2x').value;
        text[2].y = document.getElementById('p'+p+'text2y').value;
        text[2].width = document.getElementById('p'+p+'text2Width').value;
        text[2].height = document.getElementById('p'+p+'text2Height').value;
        text[2].content = um[parseInt(oldpage)][1].getContent();
        text[3]={};
        text[3].bgc = document.getElementById('p'+p+'text3bgc').value;
        text[3].action = document.getElementById('p'+p+'text3Action').value;
        text[3].x = document.getElementById('p'+p+'text3x').value;
        text[3].y = document.getElementById('p'+p+'text3y').value;
        text[3].width = document.getElementById('p'+p+'text3Width').value;
        text[3].height = document.getElementById('p'+p+'text3Height').value;
        text[3].content = um[parseInt(oldpage)][2].getContent();
        info.image = image;
        info.text = text;
    };
    if(modelId==3){
        info.modelId = modelId;
        info.pageId = p;
        info.bg = document.getElementById('p'+p+'bg').value;
        image[1] ={};
        image[1].src = document.getElementById('p'+p+'pic1Src').value;
        image[1].x = document.getElementById('p'+p+'pic1x').value;
        image[1].y= document.getElementById('p'+p+'pic1y').value;
        image[1].width = document.getElementById('p'+p+'pic1Width').value;
        image[1].height = document.getElementById('p'+p+'pic1Height').value;
        image[2] ={};
        image[2].src = document.getElementById('p'+p+'pic2Src').value;
        image[2].x = document.getElementById('p'+p+'pic2x').value;
        image[2].y= document.getElementById('p'+p+'pic2y').value;
        image[2].width = document.getElementById('p'+p+'pic2Width').value;
        image[2].height = document.getElementById('p'+p+'pic2Height').value;
        image[3] ={};
        image[3].src = document.getElementById('p'+p+'pic3Src').value;
        image[3].x = document.getElementById('p'+p+'pic3x').value;
        image[3].y = document.getElementById('p'+p+'pic3y').value;
        image[3].width  = document.getElementById('p'+p+'pic3Width').value;
        image[3].height = document.getElementById('p'+p+'pic3Height').value;
        text[1]={};
        text[1].bgc = document.getElementById('p'+p+'text1bgc').value;
        text[1].x = document.getElementById('p'+p+'text1x').value;
        text[1].y = document.getElementById('p'+p+'text1y').value;
        text[1].width = document.getElementById('p'+p+'text1Width').value;
        text[1].height = document.getElementById('p'+p+'text1Height').value;
        text[1].content = um[parseInt(oldpage)][0].getContent();
        text[2]={};
        text[2].bgc = document.getElementById('p'+p+'text2bgc').value;
        text[2].x = document.getElementById('p'+p+'text2x').value;
        text[2].y = document.getElementById('p'+p+'text2y').value;
        text[2].width  = document.getElementById('p'+p+'text2Width').value;
        text[2].height = document.getElementById('p'+p+'text2Height').value;
        text[2].content = um[parseInt(oldpage)][1].getContent();
        text[3]={};
        text[3].bgc = document.getElementById('p'+p+'text3bgc').value;
        text[3].x = document.getElementById('p'+p+'text3x').value;
        text[3].y = document.getElementById('p'+p+'text3y').value;
        text[3].width  = document.getElementById('p'+p+'text3Width').value;
        text[3].height = document.getElementById('p'+p+'text3Height').value;
        text[3].content = um[parseInt(oldpage)][2].getContent();
        info.image = image;
        info.text = text;
    };
    if(modelId==4){
        info.modelId = modelId;
        info.pageId = p;
        info.bg = document.getElementById('p'+p+'bg').value;
        image[1] ={};
        image[1].src = document.getElementById('p'+p+'pic1Src').value;
        image[1].action = document.getElementById('p'+p+'pic1Action').value;
        image[1].x = document.getElementById('p'+p+'pic1x').value;
        image[1].y= document.getElementById('p'+p+'pic1y').value;
        image[1].width = document.getElementById('p'+p+'pic1Width').value;
        image[1].height = document.getElementById('p'+p+'pic1Height').value;
        image[2] ={};
        image[2].src = document.getElementById('p'+p+'pic2Src').value;
        image[2].action = document.getElementById('p'+p+'pic2Action').value;
        image[2].x = document.getElementById('p'+p+'pic2x').value;
        image[2].y= document.getElementById('p'+p+'pic2y').value;
        image[2].width = document.getElementById('p'+p+'pic2Width').value;
        image[2].height = document.getElementById('p'+p+'pic2Height').value;
        image[2].adress = document.getElementById('p'+p+'pic2Adress').value;
        image[3] ={};
        image[3].src = document.getElementById('p'+p+'pic3Src').value;
        image[3].action = document.getElementById('p'+p+'pic3Action').value;
        image[3].x = document.getElementById('p'+p+'pic3x').value;
        image[3].y = document.getElementById('p'+p+'pic3y').value;
        image[3].width = document.getElementById('p'+p+'pic3Width').value;
        image[3].height = document.getElementById('p'+p+'pic3Height').value;
        image[3].share = document.getElementById('p'+p+'pic3Share').value;
        image[4] ={};
        image[4].src = document.getElementById('p'+p+'pic4Src').value;
        image[4].action = document.getElementById('p'+p+'pic4Action').value;
        image[4].x= document.getElementById('p'+p+'pic4x').value;
        image[4].y= document.getElementById('p'+p+'pic4y').value;
        image[4].width = document.getElementById('p'+p+'pic4Width').value;
        image[4].height = document.getElementById('p'+p+'pic4Height').value;
        text[1]={};
        text[1].bgc = document.getElementById('p'+p+'text1bgc').value;
        text[1].action = document.getElementById('p'+p+'text1Action').value;
        text[1].x = document.getElementById('p'+p+'text1x').value;
        text[1].y = document.getElementById('p'+p+'text1y').value;
        text[1].width = document.getElementById('p'+p+'text1Width').value;
        text[1].height = document.getElementById('p'+p+'text1Height').value;
        text[1].content = um[parseInt(oldpage)][0].getContent();
        text[2]={};
        text[2].bgc = document.getElementById('p'+p+'text2bgc').value;
        text[2].action = document.getElementById('p'+p+'text2Action').value;
        text[2].x = document.getElementById('p'+p+'text2x').value;
        text[2].y = document.getElementById('p'+p+'text2y').value;
        text[2].width = document.getElementById('p'+p+'text2Width').value;
        text[2].height = document.getElementById('p'+p+'text2Height').value;
        text[2].content = um[parseInt(oldpage)][1].getContent();
        text[3]={};
        text[3].bgc = document.getElementById('p'+p+'text3bgc').value;
        text[3].action = document.getElementById('p'+p+'text3Action').value;
        text[3].x = document.getElementById('p'+p+'text3x').value;
        text[3].y = document.getElementById('p'+p+'text3y').value;
        text[3].width = document.getElementById('p'+p+'text3Width').value;
        text[3].height = document.getElementById('p'+p+'text3Height').value;
        text[3].content = um[parseInt(oldpage)][2].getContent();
        info.image = image;
        info.text = text;
    };
    return info;
};
$('#creatCode').click(function(){
    var pic = document.getElementById('pic').value;
    var bgm = document.getElementById('bgm').value;
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var arrow = document.getElementById('arrow').value;
   var weixinhref = document.getElementById('weixinhref').value;
    window.open( "/creatCode?pagenumber="+swiperList.slides.length+"&pic="+pic+"&bgm="+bgm+"&title="+title+"&description="+description+"&arrow="+arrow+"&weixinhref="+weixinhref);
});
