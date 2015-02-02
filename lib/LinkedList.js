/**
 * Created by wangpy on 2014/12/29.
 */
/**
 * 单向链表
 * by wangpy 2014
/*
 API:
add(index, obj)  在指定索引处插入元素obj
get(index)  根据索引获取元素
set(index, obj) 重新设置元素的值
size() 返回元素的个数
clear() 清空所有元素
remove(obj) 删除元素obj
isEmpty() 空链表则返回true，否则false
addLast(obj) 在末尾添加元素obj
addFirst(obj) 在第一个位置插入元素obj
contains(obj) 链表是否包含元素obj，是返回true，否则false
toString() 直接alert该对象，返回如下结构'[x1, x2, ...]'
*/

var LinkedList = function(){

    function Node(data, next) {
        this.data = data || null;
        this.next = next || null;
    }

    Node.prototype = {
        getValue: function() {
            return this.data;
        },
        setValue: function(obj) {
            this.data = obj;
        },
        getNext: function() {
            return this.next;
        },
        setNext: function(node) {
            this.next = node;
        }
    };
    Node.prototype.constructor = Node;


    function nodeByIndex(index, head) {
        var node = head;
        var i = 0;
        // 第一个
        if(index===0) {
            return node;
        }
        while(node.next) {
            if(i===index) {
                return node;
            }
            node = node.next && node.next;
            i++;
        }
        // 最后 一个
        return node;

    }

// 一次循环获取当前节点和其前驱
    function nodeByData(data, list) {
        var prev = null,
            node = list.head;
        while(node.next) {
            if(node.data == data) {
                if(node==list.head) {
                    return {
                        prev: null,
                        curr: node
                    };
                }
                else {
                    return {
                        prev: prev,
                        curr: node
                    };
                }
            }
            prev = node;
            node = node.next;
        }
        if(node.data == data) {
            // 链表只有一个元素时，第一个元素没有前驱，不会进入while内
            if(list.size() === 1) {
                return {
                    prev: null,
                    curr: node
                };
            }
            // 最后一个元素没有后继，不会进入while内
            else {
                return {
                    prev: prev,
                    curr: node
                };
            }
        }
        // 没有找到
        return null;
    }

    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    LinkedList.prototype = {
        add: function(index, obj) {
            if(obj === undefined || obj === null || typeof index != 'number') {
                throw new Error('add failed, invalid param');
            }
            // 逆向取 -1，如取最后一个元素
            if(index < 0) {
                index = this.length + index;
            }
            // 空链表/索引越界
            if(index<0 || index>this.length) {
                throw new Error('add failed, invalid index');
            }

            var newNode = new Node(obj);
            if(index==0) {
                if(this.head) {
                    newNode.setNext(this.head);
                    this.head = newNode;
                }
                else {
                    this.head = this.tail = newNode;
                }
            }
            else {
                var node = nodeByIndex(index-1, this.head),
                    next = node.next;
                node.setNext(newNode);
                newNode.setNext(next);
            }
            this.length++;

        },
        get: function(index) {
            if(typeof index !== 'number') {
                throw new Error('get failed, invalid param');
            }
            // 逆向取 -1，如取最后一个元素
            if(index < 0) {
                index = this.length + index;
            }
            // 空链表/索引越界
            if(this.isEmpty() || index<0 || index>=this.length) {
                throw new Error('Index: ' + index + ', Size: ' + this.length);
            }

            var node = nodeByIndex(index, this.head);

            return node.data;
        },
        getFirst: function() {
            return this.get(0);
        },
        getLast: function() {
            return this.get(this.length-1);
        },
        set: function(index, obj) {

            // 逆向取 -1，如取最后一个元素
            if(index < 0) {
                index = this.length + index;
            }
            // 空链表/索引越界
            if(this.isEmpty() || index<0 || index>=this.length) {
                throw new Error('Index: ' + index + ', Size: ' + this.length);
            }

            var node = nodeByIndex(index, this.head);

            node.data = obj;

        },
        size: function() {
            return this.length;
        },
        clear: function() {
            this.head.next = null;
            this.head = null;
        },
        remove: function(obj) {
            var nodes = nodeByData(obj, this);

            if(nodes === null) {
                throw new Error('remove failed, the node does not exist');
            }

            var curr = nodes.curr,
                prev = nodes.prev;

            // 删除第一个元素，注意第一个元素没有前驱
            if(prev === null) {
                this.head = curr.next;
                curr.next = null;
                curr = null;
            }
            else {
                prev.setNext(curr.next);
                curr.next = null;
                curr = null;
            }
            this.length--;
            // 维护tail，但开销太大
            //this.tail = nodeByIndex(this.length-1, this.head);
        },
        isEmpty: function() {
            return this.head === null;
        },
        addLast: function(obj) {
            this.add(this.length, obj);
        },
        addFirst: function(obj) {
            this.add(0, obj);
        },
        contains: function(obj) {
            var node = this.head;
            if(this.isEmpty()) {
                return false;
            }
            while(node.next) {
                if(node.data == obj) {
                    return true;
                }
                node = node.next;
            }
            // 第一个(length为1时)和最后一个元素
            if(node.data == obj) {
                return true;
            }
            return false;
        },
        toString: function() {
            var str = '',
                node = this.head;

            if(this.isEmpty()) {
                return '[]';
            }
            str = '[' + node.data;
            while(node.next) {
                node = node.next;
                str += ',' + node.data;
            }
            str += ']';

            return str;
        }

    };

    LinkedList.prototype.constructor = LinkedList;

    return LinkedList;

}();
module.exports = LinkedList;

