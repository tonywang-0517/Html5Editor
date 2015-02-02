/**
 * Created by wangpy on 2014/12/29.
 */
var model = require('../lib/Model');
var templet = require('../lib/Templet');
var text = require('../lib/text');
var image = require('../lib/Image');
var mysql = require('mysql');
var LinkedList = require('./LinkedList');
var EventEmitter = require('events').EventEmitter;
var MysqlUtil = function (){
    var event = new EventEmitter();
    var self = this;
    var conn = mysql.createConnection({host: 'localhost',user: 'root',password: '12345678', database: 'h5factory',port: 3306});
    conn.connect();
    this.saveModel = function (m) {
        var flag = false;
        var saveModelSQL = "insert into Model(bgmHref,title,pic,description) values('"+ m.bgmHref +"','"+ m.title +"','"+ m.pic+"','"+ m.description+"');";
        conn.query(saveModelSQL, function (err1, res1) {
            if (err1) {
                console.log(err1);
            }
            else {
                for(var i=0;i< m.templetList.size();i++)
                {
                var saveTempletSQL = "insert into Templet(backgroundHref,view_id,model_id) values('"+ m.templetList.get(i).backgroundHref +"','"+ m.templetList.get(i).view_id +"','"+res1.insertId+"');";
                conn.query(saveTempletSQL, function (err2, res2) {
                    if (err2) {
                        console.log(err2);
                    }
                    else {
                        if(i>=0) {i--;}
                        for(var j=0;j< m.templetList.get(i).textList.size();j++) {
                            var saveTextSQL = "insert into Text(source,backgroundColor,x,y,opacity,templet_id) values('" + m.templetList.get(i).textList.get(j).source +"','" + m.templetList.get(i).textList.get(j).backgroundColor +"','" +m.templetList.get(i).textList.get(j).x +"','" + m.templetList.get(i).textList.get(j).y+"','" +m.templetList.get(i).textList.get(j).opacity  +"','" + res2.insertId + "');";
                            conn.query(saveTextSQL, function (err3, res2) {
                                if (err3) {
                                    console.log(err3);
                                }
                                else {
                                    flag = true;

                                }
                            });
                            var saveImageSQL = "insert into Image(href,x,y,width,height,opacity,templet_id) values('"+ m.templetList.get(i).imageList.get(j).href +"','"+ m.templetList.get(i).imageList.get(j).x +"','"+m.templetList.get(i).imageList.get(j).y+"','"+ m.templetList.get(i).imageList.get(j).width +"','"+ m.templetList.get(i).imageList.get(j).height +"','"+ m.templetList.get(i).imageList.get(j).opacity +"','"+ res2.insertId+"');";
                            conn.query(saveImageSQL, function (err4, res4) {
                                if (err4) {
                                    console.log(err4);
                                }
                                else {
                                    flag = true;
                                }

                            });

                        }
                    }
                });
                }
            }
        });
        console.log("saveModel complete!");
    }

    this.getModel = function (n,next) {
        var resultModel = new model();
        var getModel = 'select * from Model where model_id='+n;
        conn.query(getModel, function (err1, rows) {
            if (err1) {
                console.log(err1);
            }
            else {
                console.log("SELECT ==>model ");
                    resultModel.bgmHref = rows[0].bgmHref;
                    resultModel.description = rows[0].description;
                    resultModel.model_id = rows[0].model_id;
                    resultModel.pic = rows[0].pic;
                    resultModel.title = rows[0].title;
                var getTemplet = 'select * from Templet where model_id='+n;
                conn.query(getTemplet, function (err2, rows) {
                    if (err2) {
                        console.log(err2);
                    }
                    else {
                        var k = 0;
                        var tempTemplet = new templet();
                        event.on('do', function() {
                            if(k<rows.length){
                            console.log("SELECT ==>templet ");
                            tempTemplet.backgroundHref = rows[k].backgroundHref;
                            tempTemplet.templet_id = rows[k].templet_id;
                            tempTemplet.view_id = rows[k].view_id;
                            tempTemplet.model_id = rows[k].model_id;
                            var getImage = 'select * from Image where templet_id='+rows[k].templet_id;
                            conn.query(getImage, function (err3, rows) {
                                if (err3) {
                                    console.log(err3);
                                }
                                else {
                                    console.log("SELECT ==>image ");

                                    for (var i in rows) {
                                        var tempImage = new image();

                                        tempImage.height = rows[i].height;
                                        tempImage.href = rows[i].href;
                                        tempImage.opacity = rows[i].opacity;
                                        tempImage.image_id = rows[i].image_id;
                                        tempImage.src = rows[i].src;
                                        tempImage.width = rows[i].width;
                                        tempImage.x = rows[i].x;
                                        tempImage.y = rows[i].y;
                                        tempImage.templet_id = rows[i].templet_id;
                                        tempTemplet.imageList.addLast(tempImage);
                                    }
                                    var getText = 'select * from Text where templet_id='+rows[i].templet_id;
                                    conn.query(getText, function (err3, rows) {
                                        if (err3) {
                                            console.log(err3);
                                        }
                                        else {
                                            console.log("SELECT ==>text ");

                                            for (var i in rows) {
                                                var tempText = new text();
                                                tempText.text_id = rows[i].text_id;
                                                tempText.source = rows[i].source;
                                                tempText.backgroundColor = rows[i].backgroundColor;
                                                tempText.x = rows[i].x;
                                                tempText.y = rows[i].y;
                                                tempText.opacity = rows[i].opacity;
                                                tempText.templet_id = rows[i].templet_id;
                                                tempTemplet.textList.addLast(tempText);
                                            }
                                            k++;
                                            resultModel.templetList.addLast(tempTemplet);
                                            event.emit("do");

                                        }
                                    });
                                }
                            });
                            }
                            else{

                                next(resultModel);
                            }

                        });

                        event.emit('do');
                    }
                });
            }
        });
    }
    this.sss = function (n,next) {
        var resultModel = new model();
        var getModel = 'select * from Model m,Templet t,Image i,Text te where m.model_id=t.model_id and t.templet_id = i.templet_id and t.templet_id = te.templet_id';
        conn.query(getModel, function (err1, rows) {
            if (err1) {
                console.log(err1);
            }
            else {
                for(var i in rows)
                {
                    console.log(rows[i]);
                }
            }
        });
    }
};

module.exports = MysqlUtil;

















