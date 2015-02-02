var express = require('express');
var router = express.Router();
var rf=require("fs");
/* GET home page. */
router.get('/', function(req, res) {
    if(! req.session.page){req.session.page = [];}
    if(! req.session.pagescript){req.session.pagescript = [];}
    res.render('index', { title: 'Express' });
});

router.get('/creatCode', function(req, res) {
    var pagenumber = req.query.pagenumber;
    var pic = req.query.pic;
    var bgm = req.query.bgm;
    var title = req.query.title;
    var description = req.query.description;
    var arrow = req.query.arrow;
    var weixinhref = req.query.weixinhref;
    var pagecontent = '';
    var pagescriptall = '';
    var  slides = function(s){return '<div class="swiper-slide"  >'+s+'</div>'}
    for(var j=1;j<=pagenumber;j++){
        pagecontent = pagecontent +slides(req.session.page[j]);
        pagescriptall = pagescriptall +req.session.pagescript[j];
    }
    var data=rf.readFileSync("lib/model.html","utf-8");
    var data =data.replace("pageslide",pagecontent);
    var data =data.replace("weixinpic",pic);
    if(bgm==''){
        var data =data.replace('$("#music").click(function(){$(this).hide();$("#close").show();yinyue.pause();});','');
        var data =data.replace('$("#close").click(function(){$(this).hide();$("#music").show();yinyue.play();});','');
        var data =data.replace('<img src="http://y1.ifengimg.com/wzc/2014/1229/music.png" id="music" />','');
        var data =data.replace('<img src="http://y1.ifengimg.com/wzc/2014/1229/close.png" id="close" />','');
    }
    else{
        var data =data.replace("yinyuehref",bgm);
    }
    var data =data.replace("weixintitle",title);
    var data =data.replace("weixindescription",description);
    var data = data.replace('<img class="arrow" src="">',arrow);
    var data = data.replace("weixinhref",weixinhref);
    var data = data.replace("meiyededongzuo",pagescriptall);

    res.end(data);
});
router.route('/addModel')
    .post(function(req, res) {
        req.session.model = new Object();
        req.session.model.title=req.body.title;
        //插入数据库
        });
router.route('/creatView')
    .post(function(req, res) {
        var jsonInfop = req.body.infop;
        var infop = JSON.parse(jsonInfop);
        if(infop.modelId==1){


            var data=rf.readFileSync("lib/model1","utf-8");
            var data =data.replace("beijing",infop.bg);
            req.session.page[infop.pageId] = data;
            req.session.pagescript[infop.pageId] = '';
            res.send({"data":data,"modelId":infop.modelId,"pageId":infop.pageId});
        }
        if(infop.modelId==2){

            var data=rf.readFileSync("lib/model2","utf-8");
             data =data.replace("beijing",infop.bg);
             var pagescript = '$("body").animate({opacity:"1"},1000,function(){})';
            data =data.replace("tupian1id",'p'+infop.pageId+'pic1');
              data =data.replace("tupian1src",infop.image[1].src);
              data =data.replace("tupian1width",infop.image[1].width);
              data =data.replace("tupian1height",infop.image[1].height);

              if(infop.image[1].action=='wudongzuo'){
                    data =data.replace("tupian1x",infop.image[1].x);
                    data =data.replace("tupian1y",infop.image[1].y);
                    data =data.replace("tupian1opacity",1);
                };
              if(infop.image[1].action=='jianxian') {
                    data = data.replace("tupian1x", infop.image[1].x);
                    data = data.replace("tupian1y", infop.image[1].y);
                  data = data.replace("tupian1opacity", 0);
                    pagescript = pagescript.replace('function(){}', 'function(){$("#' + 'p'+infop.pageId+'pic1' + '").animate({opacity:"1"},1000,function(){});}');
              };

                    if(infop.image[1].action=='shangdaoxia'){
                        data =data.replace("tupian1x",infop.image[1].x);
                        data =data.replace("tupian1y",'-100%');
                        data =data.replace("tupian1opacity",0);

                        pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic1'+'").animate({top:"'+infop.image[1].y+'"},1000,function(){});}');

                    };
                    if(infop.image[1].action=='xiaxiangshang'){
                        data =data.replace("tupian1x",infop.image[1].x);
                         data =data.replace("tupian1y",'100%');
                        data = data.replace("tupian1opacity",0);
                        pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic1'+'").animate({top:"'+infop.image[1].y+'"},1000,function(){});}');
                    };
                    if(infop.image[1].action=='zuodaoyou'){
                         data =data.replace("tupian1x",'-100%');
                         data =data.replace("tupian1y",infop.image[1].y);
                        data = data.replace("tupian1opacity", 0);
                        pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic1'+'").animate({left:"'+infop.image[1].x+'"},1000,function(){});}');
                    };
                    if(infop.image[1].action=='youdaozuo'){
                         data =data.replace("tupian1x",'100%');
                         data =data.replace("tupian1y",infop.image[1].y);
                        data = data.replace("tupian1opacity", 0);
                        pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic1'+'").animate({left:"'+infop.image[1].x+'"},1000,function(){});}');
                    };

            data =data.replace("tupian2id",'p'+infop.pageId+'pic2');
            data =data.replace("tupian2src",infop.image[2].src);
            data =data.replace("tupian2width",infop.image[2].width);
            data =data.replace("tupian2height",infop.image[2].height);

            if(infop.image[2].action=='wudongzuo'){
                data =data.replace("tupian2x",infop.image[2].x);
                data =data.replace("tupian2y",infop.image[2].y);
                data =data.replace("tupian2opacity",1);
            };
            if(infop.image[2].action=='jianxian') {
                data = data.replace("tupian2x", infop.image[2].x);
                data = data.replace("tupian2y", infop.image[2].y);
                data = data.replace("tupian2opacity", 0);
                pagescript = pagescript.replace('function(){}', 'function(){$("#'+'p'+infop.pageId+'pic2'+'").css("opacity","1");$("#' + 'p'+infop.pageId+'pic2' + '").animate({opacity:"1"},1000,function(){});}');
            };
            if(infop.image[2].action=='shangdaoxia'){
                data =data.replace("tupian2x",infop.image[2].x);
                data =data.replace("tupian2y",'-100%');
                data = data.replace("tupian2opacity", 0);

                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic2'+'").animate({top:"'+infop.image[2].y+'"},1000,function(){});}');

            };
            if(infop.image[2].action=='xiaxiangshang'){
                data =data.replace("tupian2x",infop.image[2].x);
                data =data.replace("tupian2y",'100%');
                data = data.replace("tupian2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic2'+'").animate({top:"'+infop.image[2].y+'"},1000,function(){});}');
            };
            if(infop.image[2].action=='zuodaoyou'){
                data =data.replace("tupian2x",'-100%');
                data =data.replace("tupian2y",infop.image[2].y);
                data = data.replace("tupian2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic2'+'").animate({left:"'+infop.image[2].x+'"},1000,function(){});}');
            };
            if(infop.image[2].action=='youdaozuo'){
                data =data.replace("tupian2x",'100%');
                data =data.replace("tupian2y",infop.image[2].y);
                data = data.replace("tupian2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic2'+'").animate({left:"'+infop.image[2].x+'"},1000,function(){});}');
            };


            data =data.replace("tupian3id",'p'+infop.pageId+'pic3');
            data =data.replace("tupian3src",infop.image[3].src);
            data =data.replace("tupian3width",infop.image[3].width);
            data =data.replace("tupian3height",infop.image[3].height);

            if(infop.image[3].action=='wudongzuo'){
                data =data.replace("tupian3x",infop.image[3].x);
                data =data.replace("tupian3y",infop.image[3].y);
                data =data.replace("tupian3opacity",1);
            };
            if(infop.image[3].action=='jianxian') {
                data = data.replace("tupian3x", infop.image[3].x);
                data = data.replace("tupian3y", infop.image[3].y);
                data = data.replace("tupian3opacity", 0);
                pagescript = pagescript.replace('function(){}', 'function(){$("#'+'p'+infop.pageId+'pic3'+'").css("opacity","1");$("#' + 'p'+infop.pageId+'pic3' + '").animate({opacity:"1"},1000,function(){});}');
            };
            if(infop.image[3].action=='shangdaoxia'){
                data =data.replace("tupian3x",infop.image[3].x);
                data =data.replace("tupian3y",'-100%');
                data = data.replace("tupian3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic3'+'").animate({top:"'+infop.image[3].y+'"},1000,function(){});}');

            };
            if(infop.image[3].action=='xiaxiangshang'){
                data =data.replace("tupian3x",infop.image[3].x);
                data =data.replace("tupian3y",'100%');
                data = data.replace("tupian3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic3'+'").animate({top:"'+infop.image[3].y+'"},1000,function(){});}');
            };
            if(infop.image[3].action=='zuodaoyou'){
                data =data.replace("tupian3x",'-100%');
                data =data.replace("tupian3y",infop.image[3].y);
                data = data.replace("tupian3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic3'+'").animate({left:"'+infop.image[3].x+'"},1000,function(){});}');
            };
            if(infop.image[3].action=='youdaozuo'){
                data =data.replace("tupian3x",'100%');
                data =data.replace("tupian3y",infop.image[3].y);
                data = data.replace("tupian3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic3'+'").animate({left:"'+infop.image[3].x+'"},1000,function(){});}');
            };
            data =data.replace("tupian4id",'p'+infop.pageId+'pic4');
            data =data.replace("tupian4src",infop.image[4].src);
            data =data.replace("tupian4width",infop.image[4].width);
            data =data.replace("tupian4height",infop.image[4].height);

            if(infop.image[4].action=='wudongzuo'){
                data =data.replace("tupian4x",infop.image[4].x);
                data =data.replace("tupian4y",infop.image[4].y);
                data =data.replace("tupian4opacity",1);
            };
            if(infop.image[4].action=='jianxian') {
                data = data.replace("tupian4x", infop.image[4].x);
                data = data.replace("tupian4y", infop.image[4].y);
                data = data.replace("tupian4opacity", 0);
                pagescript = pagescript.replace('function(){}', 'function(){$("#'+'p'+infop.pageId+'pic4'+'").css("opacity","1");$("#' + 'p'+infop.pageId+'pic4' + '").animate({opacity:"1"},1000,function(){});}');
            };
            if(infop.image[4].action=='shangdaoxia'){
                data =data.replace("tupian4x",infop.image[4].x);
                data =data.replace("tupian4y",'-100%');
                data = data.replace("tupian4opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic4'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic4'+'").animate({top:"'+infop.image[4].y+'"},1000,function(){});}');

            };
            if(infop.image[4].action=='xiaxiangshang'){
                data =data.replace("tupian4x",infop.image[4].x);
                data =data.replace("tupian4y",'100%');
                data = data.replace("tupian4opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic4'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic4'+'").animate({top:"'+infop.image[4].y+'"},1000,function(){});}');
            };
            if(infop.image[4].action=='zuodaoyou'){
                data =data.replace("tupian4x",'-100%');
                data =data.replace("tupian4y",infop.image[4].y);
                data = data.replace("tupian4opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic4'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic4'+'").animate({left:"'+infop.image[4].x+'"},1000,function(){});}');
            };
            if(infop.image[4].action=='youdaozuo'){
                data =data.replace("tupian4x",'100%');
                data =data.replace("tupian4y",infop.image[4].y);
                data = data.replace("tupian4opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'pic4'+'").css("opacity","1");$("#'+'p'+infop.pageId+'pic4'+'").animate({left:"'+infop.image[4].x+'"},1000,function(){});}');
            };
            data =data.replace("wenzi1id",'p'+infop.pageId+'text1');
            data =data.replace("wenzi1content",infop.text[1].content);
            data =data.replace("wenzi1width",infop.text[1].width);
            data =data.replace("wenzi1height",infop.text[1].height);
            data =data.replace("wenzi1rgba",infop.text[1].bgc);
            data = data.replace("wenzi1opacity", 0);
            if(infop.text[1].action=='wudongzuo'){
                data =data.replace("wenzi1x",infop.text[1].x);
                data =data.replace("wenzi1y",infop.text[1].y);
                data =data.replace("wenzi1opacity",1);
            };
            if(infop.text[1].action=='jianxian') {
                data = data.replace("wenzi1x", infop.text[1].x);
                data = data.replace("wenzi1y", infop.text[1].y);
                data = data.replace("wenzi1opacity", 0);
                pagescript = pagescript.replace('function(){}', 'function(){$("#'+'p'+infop.pageId+'text1'+'").css("opacity","1");$("#' + 'p'+infop.pageId+'text1' + '").animate({opacity:"1"},1000,function(){});}');
            };
            if(infop.text[1].action=='shangdaoxia'){
                data =data.replace("wenzi1x",infop.text[1].x);
                data =data.replace("wenzi1y",'-100%');
                data = data.replace("wenzi1opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text1'+'").animate({top:"'+infop.text[1].y+'"},1000,function(){});}');

            };
            if(infop.text[1].action=='xiaxiangshang'){
                data =data.replace("wenzi1x",infop.text[1].x);
                data =data.replace("wenzi1y",'100%');
                data = data.replace("wenzi1opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text1'+'").animate({top:"'+infop.text[1].y+'"},1000,function(){});}');
            };
            if(infop.text[1].action=='zuodaoyou'){
                data =data.replace("wenzi1x",'-100%');
                data =data.replace("wenzi1y",infop.text[1].y);
                data = data.replace("wenzi1opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text1'+'").animate({left:"'+infop.text[1].x+'"},1000,function(){});}');
            };
            if(infop.text[1].action=='youdaozuo'){
                data =data.replace("wenzi1x",'100%');
                data =data.replace("wenzi1y",infop.text[1].y);
                data = data.replace("wenzi1opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text1'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text1'+'").animate({left:"'+infop.text[1].x+'"},1000,function(){});}');
            };
            data =data.replace("wenzi2id",'p'+infop.pageId+'text2');
            data =data.replace("wenzi2content",infop.text[2].content);
            data =data.replace("wenzi2width",infop.text[2].width);
            data =data.replace("wenzi2height",infop.text[2].height);
            data =data.replace("wenzi2rgba",infop.text[2].bgc);

            if(infop.text[2].action=='wudongzuo'){
                data =data.replace("wenzi2x",infop.text[2].x);
                data =data.replace("wenzi2y",infop.text[2].y);
                data =data.replace("wenzi2opacity",1);
            };
            if(infop.text[2].action=='jianxian') {
                data = data.replace("wenzi2x", infop.text[2].x);
                data = data.replace("wenzi2y", infop.text[2].y);
                data = data.replace("wenzi2opacity", 0);
                pagescript = pagescript.replace('function(){}', 'function(){$("#'+'p'+infop.pageId+'text2'+'").css("opacity","1");$("#' + 'p'+infop.pageId+'text2' + '").animate({opacity:"1"},1000,function(){});}');
            };
            if(infop.text[2].action=='shangdaoxia'){
                data =data.replace("wenzi2x",infop.text[2].x);
                data =data.replace("wenzi2y",'-100%');
                data = data.replace("wenzi2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text2'+'").animate({top:"'+infop.text[2].y+'"},1000,function(){});}');

            };
            if(infop.text[2].action=='xiaxiangshang'){
                data =data.replace("wenzi2x",infop.text[2].x);
                data =data.replace("wenzi2y",'100%');
                data = data.replace("wenzi2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text2'+'").animate({top:"'+infop.text[2].y+'"},1000,function(){});}');
            };
            if(infop.text[2].action=='zuodaoyou'){
                data =data.replace("wenzi2x",'-100%');
                data =data.replace("wenzi2y",infop.text[2].y);
                data = data.replace("wenzi2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text2'+'").animate({left:"'+infop.text[2].x+'"},1000,function(){});}');
            };
            if(infop.text[2].action=='youdaozuo'){
                data =data.replace("wenzi2x",'100%');
                data =data.replace("wenzi2y",infop.text[2].y);
                data = data.replace("wenzi2opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text2'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text2'+'").animate({left:"'+infop.text[2].x+'"},1000,function(){});}');
            };
            data =data.replace("wenzi3id",'p'+infop.pageId+'text3');
            data =data.replace("wenzi3content",infop.text[3].content);
            data =data.replace("wenzi3width",infop.text[3].width);
            data =data.replace("wenzi3height",infop.text[3].height);
            data =data.replace("wenzi3rgba",infop.text[3].bgc);

            if(infop.text[3].action=='wudongzuo'){
                data =data.replace("wenzi3x",infop.text[3].x);
                data =data.replace("wenzi3y",infop.text[3].y);
                data =data.replace("wenzi3opacity",1);
            };
            if(infop.text[3].action=='jianxian') {
                data = data.replace("wenzi3x", infop.text[3].x);
                data = data.replace("wenzi3y", infop.text[3].y);
                data = data.replace("wenzi3opacity", 0);
                pagescript = pagescript.replace('function(){}', 'function(){$("#'+'p'+infop.pageId+'text3'+'").css("opacity","1");$("#' + 'p'+infop.pageId+'text3' + '").animate({opacity:"1"},1000,function(){});}');
            };
            if(infop.text[3].action=='shangdaoxia'){
                data =data.replace("wenzi3x",infop.text[3].x);
                data =data.replace("wenzi3y",'-100%');
                data = data.replace("wenzi3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text3'+'").animate({top:"'+infop.text[3].y+'"},1000,function(){});}');

            };
            if(infop.text[3].action=='xiaxiangshang'){
                data =data.replace("wenzi3x",infop.text[3].x);
                data =data.replace("wenzi3y",'100%');
                data = data.replace("wenzi3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text3'+'").animate({top:"'+infop.text[3].y+'"},1000,function(){});}');
            };
            if(infop.text[3].action=='zuodaoyou'){
                data =data.replace("wenzi3x",'-100%');
                data =data.replace("wenzi3y",infop.text[3].y);
                data = data.replace("wenzi3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text3'+'").animate({left:"'+infop.text[3].x+'"},1000,function(){});}');
            };
            if(infop.text[3].action=='youdaozuo'){
                data =data.replace("wenzi3x",'100%');
                data =data.replace("wenzi3y",infop.text[3].y);
                data = data.replace("wenzi3opacity", 0);
                pagescript = pagescript.replace('function(){}','function(){$("#'+'p'+infop.pageId+'text3'+'").css("opacity","1");$("#'+'p'+infop.pageId+'text3'+'").animate({left:"'+infop.text[3].x+'"},1000,function(){});}');
            };
            req.session.page[infop.pageId] = data;
            pagescript = 'if(pageIndex=='+(infop.pageId-1)+'){'+pagescript+'}'
            req.session.pagescript[infop.pageId] = pagescript;
            res.send({"data":data,"modelId":infop.modelId,"pageId":infop.pageId});
        }

        if(infop.modelId==3){
            console.log(123);
            var data=rf.readFileSync("lib/model3","utf-8");
             data =data.replace("beijing",infop.bg);
             data =data.replace("tupian1src",infop.image[1].src);
             data =data.replace("tupian1x",infop.image[1].x);
             data =data.replace("tupian1y",infop.image[1].y);
             data =data.replace("tupian1width",infop.image[1].width);
             data =data.replace("tupian1height",infop.image[1].height);
             data =data.replace("tupian2src",infop.image[2].src);
             data =data.replace("tupian2x",infop.image[2].x);
             data =data.replace("tupian2y",infop.image[2].y);
             data =data.replace("tupian2width",infop.image[2].width);
             data =data.replace("tupian2height",infop.image[2].height);
             data =data.replace("tupian3src",infop.image[3].src);
             data =data.replace("tupian3x",infop.image[3].x);
             data =data.replace("tupian3y",infop.image[3].y);
             data =data.replace("tupian3width",infop.image[3].width);
             data =data.replace("tupian3height",infop.image[3].height);
             data =data.replace("wenzi1content",infop.text[1].content);
             data =data.replace("wenzi1x",infop.text[1].x);
             data =data.replace("wenzi1y",infop.text[1].y);
             data =data.replace("wenzi1width",infop.text[1].width);
             data =data.replace("wenzi1height",infop.text[1].height);
             data =data.replace("wenzi1rgba",infop.text[1].bgc);
             data =data.replace("wenzi2content",infop.text[2].content);
             data =data.replace("wenzi2x",infop.text[2].x);
             data =data.replace("wenzi2y",infop.text[2].y);
             data =data.replace("wenzi2width",infop.text[2].width);
             data =data.replace("wenzi2height",infop.text[2].height);
             data =data.replace("wenzi2rgba",infop.text[2].bgc);
             data =data.replace("wenzi3content",infop.text[3].content);
             data =data.replace("wenzi3x",infop.text[3].x);
             data =data.replace("wenzi3y",infop.text[3].y);
             data =data.replace("wenzi3width",infop.text[3].width);
             data =data.replace("wenzi3height",infop.text[3].height);
             data =data.replace("wenzi3rgba",infop.text[3].bgc);

             data =data.replace(new RegExp("pagenumber", "g"),infop.pageId);
            req.session.page[infop.pageId] = data;
            res.send({"data":data,"modelId":infop.modelId,"pageId":infop.pageId});
        }
        if(infop.modelId==4){
            var data=rf.readFileSync("lib/model4","utf-8");
             data =data.replace("beijing",infop.bg);
             data =data.replace("tupian1src",infop.image[1].src);
             data =data.replace("tupian1x",infop.image[1].x);
             data =data.replace("tupian1y",infop.image[1].y);
             data =data.replace("tupian1width",infop.image[1].width);
             data =data.replace("tupian1height",infop.image[1].height);
             data =data.replace("tupian2src",infop.image[2].src);
             data =data.replace("tupian2x",infop.image[2].x);
             data =data.replace("tupian2y",infop.image[2].y);
             data =data.replace("tupian2width",infop.image[2].width);
             data =data.replace("tupian2height",infop.image[2].height);
             data =data.replace("tupian2adress",infop.image[2].adress);
             data =data.replace("tupian3src",infop.image[3].src);
             data =data.replace("tupian3x",infop.image[3].x);
             data =data.replace("tupian3y",infop.image[3].y);
             data =data.replace("tupian3width",infop.image[3].width);
             data =data.replace("tupian3height",infop.image[3].height);
             data =data.replace("tupian3share",infop.image[3].share);
             data =data.replace("tupian4src",infop.image[4].src);
             data =data.replace("tupian4x",infop.image[4].x);
             data =data.replace("tupian4y",infop.image[4].y);
             data =data.replace("tupian4width",infop.image[4].width);
             data =data.replace("tupian4height",infop.image[4].height);
             data =data.replace("wenzi1content",infop.text[1].content);
             data =data.replace("wenzi1x",infop.text[1].x);
             data =data.replace("wenzi1y",infop.text[1].y);
             data =data.replace("wenzi1width",infop.text[1].width);
             data =data.replace("wenzi1height",infop.text[1].height);
             data =data.replace("wenzi1rgba",infop.text[1].bgc);
             data =data.replace("wenzi2content",infop.text[2].content);
             data =data.replace("wenzi2x",infop.text[2].x);
             data =data.replace("wenzi2y",infop.text[2].y);
             data =data.replace("wenzi2width",infop.text[2].width);
             data =data.replace("wenzi2height",infop.text[2].height);
             data =data.replace("wenzi2rgba",infop.text[2].bgc);
             data =data.replace("wenzi3content",infop.text[3].content);
             data =data.replace("wenzi3x",infop.text[3].x);
             data =data.replace("wenzi3y",infop.text[3].y);
             data =data.replace("wenzi3width",infop.text[3].width);
             data =data.replace("wenzi3height",infop.text[3].height);
             data =data.replace("wenzi3rgba",infop.text[3].bgc);
            req.session.page[infop.pageId] = data;
            res.send({"data":data,"modelId":infop.modelId,"pageId":infop.pageId});
        }




    });
module.exports = router;
