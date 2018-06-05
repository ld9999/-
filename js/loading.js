/// <reference path="../../jquery-1.4.1-vsdoc.js" />
///<summary> 
///作用：小插件集合
///插件类型：jquery插件
///</summary>



(function ($) {
    ///<summary> 
    ///作用：图片加载插件
    ///</summary> 
    $.fn.umloadImage = function (options) {
        // 重绑参数
        var opts = $.extend({}, $.fn.umloadImage.defaults, options);
        // 迭代和重新格式化每个匹配的元素

        opts.imgLength = this.length;

        return this.each(function () {
            var $this = $(this)

            var img = new Image(); //创建一个Image对象，实现图片的预下载
            img.src = this.src;

            if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
                callback(opts);
            } else {
                img.onerror = function () { //图片无法加载时异步调用callback函数。
                    callback(opts);
                };

                img.onload = function () { //图片下载完毕时异步调用callback函数。
                    callback(opts);
                };
            }

            function callback(opts) {
                opts.loadImgLength++;
                opts.percentageNu = Math.round(opts.loadImgLength / opts.imgLength * 100);

                opts.oneCallback && opts.oneCallback(opts);
                if (opts.imgLength == opts.loadImgLength) {
                    opts.allCallback && opts.allCallback(opts);
                }
            }

        });
    };

    // 插件的defaults  
    $.fn.umloadImage.defaults = {
        allCallback: null
        , oneCallback: null
        , allCallback: null
        , imgLength: 0
        , loadImgLength: 0
        , percentageNu: 0
    };
    // 闭包结束  

})(jQuery);
