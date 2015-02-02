/**
 * Created by wangpy on 2014/12/29.
 */
var LinkedList = require('./LinkedList');
var Model = function()
{
    this.model_id='';
    this.bgmHref='';
    this.title='';
    this.pic='';
    this.description='';
    this.templetList = new LinkedList();
};

module.exports = Model;