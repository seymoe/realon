"use strict";
var Canvas2DUtil = /** @class */ (function () {
    function Canvas2DUtil(canvas) {
        this.context = canvas.getContext('2d');
    }
    Canvas2DUtil.prototype.drawText = function (text) {
        if (this.context !== null) {
            var c = this.context;
            c.save();
            c.textBaseline = 'middle';
            c.textAlign = 'center';
            // 计算cnavas中心坐标
            var centerX = c.canvas.width * 0.5;
            var centerY = c.canvas.height * 0.5;
            c.font = 'normal 80px Arial';
            c.fillStyle = '#000000';
            c.strokeStyle = 'red';
            c.strokeText(text, centerX, centerY);
            c.restore();
        }
    };
    return Canvas2DUtil;
}());
// 调用
var canvas = document.getElementById('canvas');
if (canvas !== null) {
    var canvas2d = new Canvas2DUtil(canvas);
    canvas2d.drawText('Hello World!');
}
