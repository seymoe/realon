"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            this._appId = requestAnimationFrame(this.step.bind(this));
        }
    };
    /**
     * stop 停止
     */
    Application.prototype.stop = function () {
        if (this._start) {
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
        // console.log(`[count] timeStamp = ${timeStamp}`);
        // console.log(`[count] intervalSec = ${intervalSec}`);
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
var PlayGround = /** @class */ (function (_super) {
    __extends(PlayGround, _super);
    function PlayGround(canvas) {
        var _this = _super.call(this) || this;
        _this.context = canvas.getContext("2d");
        return _this;
    }
    PlayGround.prototype.render = function () {
        this.drawText('' + this._appId);
    };
    PlayGround.prototype.drawText = function (text) {
        if (this.context !== null) {
            var c = this.context;
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            c.save();
            c.textBaseline = "middle";
            c.textAlign = "center";
            // 计算cnavas中心坐标
            var centerX = c.canvas.width * 0.5;
            var centerY = c.canvas.height * 0.5;
            c.font = "normal 100px Arial";
            c.fillStyle = "pink";
            c.strokeStyle = "yellow";
            c.fillText(text, centerX, centerY);
            c.strokeText(text, centerX, centerY);
            c.restore();
        }
    };
    return PlayGround;
}(Application));
var init = function () {
    // 调用
    var canvas = document.getElementById("canvas");
    var startBtn = document.getElementById('btnStart');
    var stopBtn = document.getElementById('btnStop');
    var playground;
    if (canvas !== null) {
        playground = new PlayGround(canvas);
    }
    startBtn.onclick = function () {
        if (playground !== null) {
            playground.start();
        }
    };
    stopBtn.onclick = function () {
        if (playground !== null) {
            playground.stop();
        }
    };
};
init();
