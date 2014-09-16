/*! ring - v1.0.0 - 2014-09-15
* https://github.com/dilidilidi/ring
* Copyright (c) 2014 孙斌; Licensed MIT */
(function ($) {
    "use strict";
    /**
     * 构造函数
     * @param element 容器canvas
     * @param options 传入的构造参数
     * @constructor Ring
     */
    var Ring = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Ring.DEFAULTS, options);
    };
    //版本号
    Ring.VERSION = '1.0.0';
    /**
     * 默认参数
     * @type {{size: number, outerCircleColor: string, innerCircleColor: string, sectorColor: string, ringWidth: number, text: number, fontSize: number, fontFamily: string, textColor: string}}
     */
    Ring.DEFAULTS = {
        size: 100,
        outerCircleColor: "#e9e9e9",
        innerCircleColor: "#ffffff",
        sectorColor: "#ca2b45",
        ringWidth: 20,
        text: 1,
        fontSize: 14,
        fontFamily: "arial",
        textColor: "#ff1616"
    };
    /**
     * 创建Ring的方法
     */
    Ring.prototype.create = function () {
        var $this = this.$element.get(0), options = this.options;
        $this.width = $this.height = options.size;
        drawCircle($this, options.size / 2, options.size / 2, options.size / 2, options.outerCircleColor);
        drawSector($this, options.size / 2, options.size / 2, 0, Math.PI * 2 * parseFloat(options.text), options.size / 2, true, options.sectorColor, false);
        drawCircle($this, options.size / 2, options.size / 2, options.size / 2 - options.ringWidth, options.innerCircleColor);
        fillText($this, options.size / 2, options.size / 2, options.text, options.fontSize, options.fontFamily, options.textColor);
    };
    /**
     * 画一个圆形
     * @param canvas canvas画布对象
     * @param pointX 扇形中心点的X坐标
     * @param pointY 扇形中心点的Y坐标
     * @param radius 半径
     * @param color 文本的颜色 例如#ffff00
     */
    function drawCircle(canvas, pointX, pointY, radius, color) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pointX, pointY, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * 画一个扇形
     * @param canvas canvas画布对象
     * @param pointX 扇形中心点的X坐标
     * @param pointY 扇形中心点的Y坐标
     * @param start_angle 起始角度
     * @param end_angle 结束角度
     * @param radius 半径
     * @param is_fill 是否填充
     * @param color 文本的颜色 例如#ffff00
     * @param anticlockwise 是否逆时针
     */
    function drawSector(canvas, pointX, pointY, start_angle, end_angle, radius, is_fill, color, anticlockwise) {
        var centerPoint = {x: pointX, y: pointY};
        start_angle = start_angle || 0;
        if (canvas.getContext) {
            //开始绘制路径
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = color;
            ctx.beginPath();
            //画出弧线
            ctx.arc(centerPoint.x, centerPoint.y, radius, start_angle, end_angle, anticlockwise);
            //画出结束半径
            ctx.lineTo(centerPoint.x, centerPoint.y);
            //如果需要填充就填充，不需要就算了
            if (is_fill) {
                ctx.fill();
            } else {
                ctx.closePath();
                ctx.stroke();
            }
        } else {
            console.log('您的浏览器不支持CANVAS 2D绘图!');
        }
    }

    /**
     * 填充圆中心的文本
     * @param canvas canvas画布对象
     * @param pointX 扇形中心点的X坐标
     * @param pointY 扇形中心点的Y坐标
     * @param text 需要填充的文本
     * @param fontSize 文本的尺寸 14px就写14
     * @param fontFamily 文本的字体 例如arial
     * @param color 文本的颜色 例如#ffff00
     */
    function fillText(canvas, pointX, pointY, text, fontSize, fontFamily, color) {
        text = (parseFloat(text).toFixed(2) * 100).toString() + "%";
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.font = fontSize + "px " + fontFamily;
        var textWidth = ctx.measureText(text).width;
        ctx.fillText(text, parseInt(pointX - textWidth / 2), parseInt(pointY + fontSize / 2));
    }

    //jquery插件
    var old = $.fn.ring;
    $.fn.ring = function (option) {
        return this.each(function () {
            var data = new Ring(this, option);
            data.create();
        });
    };
    $.fn.ring.Constructor = Ring;
    $.fn.ring.noConflict = function () {
        $.fn.ring = old;
        return this;
    };
})(jQuery);