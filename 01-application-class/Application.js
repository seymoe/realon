"use strict";
var Application = /** @class */ (function () {
    function Application() {
        this._start = false;
        this._appId = -1;
    }
    /**
     * start 开始
     */
    Application.prototype.start = function () {
        if (!this._start) {
            this._start = true;
            this._appId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            console.log(this);
            this._appId = requestAnimationFrame(this.step.bind(this));
        }
    };
    /**
     * stop 停止
     */
    Application.prototype.stop = function () {
        if (this._start) {
            console.log("appid", this._appId);
            cancelAnimationFrame(this._appId);
            this._appId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    };
    /**
     * isRunning
     */
    Application.prototype.isRunning = function () {
        return this._start;
    };
    /**
     * step 每帧执行的函数
     */
    Application.prototype.step = function (timeStamp) {
        var _this = this;
        if (this._startTime === -1)
            this._startTime = timeStamp;
        if (this._lastTime === -1)
            this._lastTime = timeStamp;
        // 计算当前时间点距离第一次调用时间点的差值
        var elapsedMsec = timeStamp - this._startTime;
        // 计算当前时间距离上一次调用时间点的差值
        var intervalSec = timeStamp - this._lastTime;
        // 更新上一次的时间点
        this._lastTime = timeStamp;
        console.log("[count] timeStamp = " + timeStamp);
        console.log("[count] intervalSec = " + intervalSec);
        // 更新
        this.update(elapsedMsec, intervalSec);
        // 渲染
        this.render();
        this._appId = requestAnimationFrame(function (elapsedMsec) {
            _this.step(elapsedMsec);
        });
    };
    Application.prototype.update = function (elapsedMsec, intervalSec) {
        console.log("已经运行", elapsedMsec, "ms");
    };
    Application.prototype.render = function () { };
    return Application;
}());
var Canvas2DUtil = /** @class */ (function () {
    function Canvas2DUtil(canvas) {
        this.context = canvas.getContext("2d");
    }
    Canvas2DUtil.prototype.drawText = function (text) {
        if (this.context !== null) {
            var c = this.context;
            c.save();
            c.textBaseline = "middle";
            c.textAlign = "center";
            // 计算cnavas中心坐标
            var centerX = c.canvas.width * 0.5;
            var centerY = c.canvas.height * 0.5;
            c.font = "normal 80px Arial";
            c.fillStyle = "#000000";
            c.strokeStyle = "red";
            c.strokeText(text, centerX, centerY);
            c.restore();
        }
    };
    return Canvas2DUtil;
}());
// 调用
var canvas = document.getElementById("canvas");
if (canvas !== null) {
    var canvas2d = new Canvas2DUtil(canvas);
    canvas2d.drawText("Hello World!");
}
var app = new Application();
app.start();
