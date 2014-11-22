(function(global){
    'use strict';

    // 创建名称为name的节点，并为string类型孩子创建文本节点
    global.elem = function elem(name, attrs, children){
        attrs = attrs || {};
        children = children || [];
        var e = document.createElement(name);
        Object.keys(attrs).forEach(function(key){
            e.setAttribute(key, attrs[key]);
        });
        children.forEach(function(child){
            if (typeof child === 'string'){
                child = document.createTextNode(child);
            }
            e.appendChild(child);
        });
        return e;
    };

    // 获取matches函数
    if (document.body.matches){
        global.matches = function matches(elem, selector){ return elem.matches(selector); };
    }else if(document.body.mozMatchesSelector){
        global.matches = function matches(elem, selector){ return elem.mozMatchesSelector(selector); };
    }else if (document.body.webkitMatchesSelector){
        global.matches = function matches(elem, selector){ return elem.webkitMatchesSelector(selector); };
    }else if (document.body.msMatchesSelector){
        global.matches = function matches(elem, selector){ return elem.msMatchesSelector(selector); };
    }else if(document.body.oMatchesSelector){
        global.matches = function matches(elem, selector){ return elem.oMatchesSelector(selector); };
    }

    // 从本节点开始，向上回溯，直到找到符合selector的节点，返回该节点
    global.closest = function closest(elem, selector){
        while(elem){
            if (matches(elem, selector)){ return elem };
            elem = elem.parentElement;
        }
        return null;
    };

    // requestAnimationFrame
    global.requestAnimationFrame = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.msRequestAnimationFrame || global.webkitRequestAnimationFrame || function(fn){
        setTimeout(fn, 20);
    };

    // 触发事件
    global.trigger = function trigger(name, target){
        target.dispatchEvent(new CustomEvent(name, {bubbles: true, cancelable: false}));
    };

})(window);
