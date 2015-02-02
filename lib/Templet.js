/**
 * Created by wangpy on 2014/12/30.
 */
var  Templet = function()
{
    var LinkedList = require('./LinkedList');
    this.templet_id='';
    this.backgroundHref='';
    this.view_id='';
    this.textList = new LinkedList();
    this.imageList = new LinkedList();
};
module.exports = Templet;