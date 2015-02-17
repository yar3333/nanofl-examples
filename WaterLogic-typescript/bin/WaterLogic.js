var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var base;
(function (base) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, nanofl.Player.library.getItem("game"));
        }
        return Game;
    })(nanofl.MovieClip);
    base.Game = Game;
})(base || (base = {}));
var base;
(function (base) {
    var McBucket = (function (_super) {
        __extends(McBucket, _super);
        function McBucket() {
            _super.call(this, nanofl.Player.library.getItem("bucket"));
        }
        return McBucket;
    })(nanofl.MovieClip);
    base.McBucket = McBucket;
})(base || (base = {}));
var base;
(function (base) {
    var MusicButton = (function (_super) {
        __extends(MusicButton, _super);
        function MusicButton() {
            _super.call(this, nanofl.Player.library.getItem("musicButton"));
        }
        return MusicButton;
    })(nanofl.MovieClip);
    base.MusicButton = MusicButton;
})(base || (base = {}));
var base;
(function (base) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.call(this, nanofl.Player.library.getItem("scene"));
        }
        return Scene;
    })(nanofl.MovieClip);
    base.Scene = Scene;
})(base || (base = {}));
var Sounds = (function () {
    function Sounds() {
    }
    Sounds.bucket = function (options) {
        return createjs.Sound.play("bucket", options);
    };
    Sounds.music = function (options) {
        return createjs.Sound.play("music", options);
    };
    Sounds.tap = function (options) {
        return createjs.Sound.play("tap", options);
    };
    Sounds.trash = function (options) {
        return createjs.Sound.play("trash", options);
    };
    Sounds.water = function (options) {
        return createjs.Sound.play("water", options);
    };
    return Sounds;
})();
var BaseBucket = (function () {
    function BaseBucket(total, mc) {
        this.fill = 0;
        this.total = total;
        this.mc = mc;
    }
    BaseBucket.prototype.setFill = function (v) {
    };
    BaseBucket.prototype.getNeckPos = function () {
        return new createjs.Point(this.mc.x, this.mc.y);
    };
    return BaseBucket;
})();
var Bucket = (function (_super) {
    __extends(Bucket, _super);
    function Bucket(baseMovie, total, x) {
        _super.call(this, total, new McBucket());
        this.fallProcessPhase = 0; // 0 - nothing to do
        // 1 - moving to preffered position
        // 2 - rotation forward
        // 3 - waiting water to fall out
        // 4 - rotation backward
        // 5 - moving to mouse position
        this.fillProcessDest = null;
        this.fillProcessFallFrame = 0;
        this.baseMovie = baseMovie;
        baseMovie.addChild(this.mc);
        this.mc.x = x;
        this.mc.y = 345;
        this.mc.scaleX = this.mc.scaleY = Math.sqrt(total) * 40 / 100;
        this.setFill(0);
        this.activate(false);
    }
    Bucket.prototype.activate = function (act) {
        var mcForeColor = this.mc.getChildByName("mcForeColor");
        mcForeColor.visible = act;
    };
    Bucket.prototype.getNeckPos = function () {
        var mcNeck = this.mc.getChildByName("mcNeck");
        return new createjs.Point(this.mc.x + mcNeck.x * this.mc.scaleX, this.mc.y + mcNeck.y * this.mc.scaleY);
    };
    Bucket.prototype.setFill = function (v) {
        this.fill = v;
        this.mc.getChildByName("tfLabel").text = this.fill + "/" + this.total;
        this.mc.gotoAndStop(Math.round(this.fill / this.total * 100));
    };
    Bucket.prototype.fallToBucket = function (dest) {
        var freeDest = dest.total - dest.fill;
        if (freeDest > this.fill) {
            dest.setFill(dest.fill + this.fill);
            this.setFill(0);
        }
        else {
            dest.setFill(dest.total);
            this.setFill(this.fill - freeDest);
        }
    };
    Bucket.prototype.startFallToBucketProcess = function (dest) {
        if (this.fallProcessPhase != 0) {
            console.log("StartFallProcess error 1");
            return;
        }
        this.fallProcessPhase = 1;
        this.fillProcessDest = dest;
        this.fillProcessFallFrame = 0;
    };
    Bucket.prototype.fallProcessStep = function (mouseDX, mouseDY) {
        if (this.fallProcessPhase == 0)
            return true;
        if (this.fallProcessPhase == 1) {
            var thisNeck = this.getNeckPos();
            var destNeck = this.fillProcessDest.getNeckPos();
            var b = this.mc.getChildByName("mcBox").getBounds();
            var mustPos = new createjs.Point(destNeck.x + b.height * this.mc.scaleY, destNeck.y);
            if (this.moveStepTo(mustPos, 6))
                this.fallProcessPhase++;
        }
        else if (this.fallProcessPhase == 2) {
            if (this.fill == 0 || this.fillProcessDest.fill == this.fillProcessDest.total)
                this.fallProcessPhase++;
            else {
                if (this.mc.rotation > -90)
                    this.mc.rotation -= 4;
                else
                    this.fallProcessPhase++;
            }
        }
        else if (this.fallProcessPhase == 3) {
            if (this.fill == 0 || this.fillProcessDest.fill == this.fillProcessDest.total)
                this.fallProcessPhase++;
        }
        else if (this.fallProcessPhase == 4) {
            if (this.mc.rotation < 0)
                this.mc.rotation += 4;
            else
                this.fallProcessPhase++;
        }
        else if (this.fallProcessPhase == 5) {
            var r = this.moveStepTo(new createjs.Point(this.mc.stage.mouseX + mouseDX, this.mc.stage.mouseY + mouseDY), 10);
            if (r == true)
                this.fallProcessPhase = 0;
            return r;
        }
        if ((this.fallProcessPhase == 2 && this.mc.rotation < -40) || this.fallProcessPhase == 3) {
            this.fillProcessFallFrame++;
            if (this.fillProcessFallFrame % 7 == 6) {
                if (this.fill > 0 && this.fillProcessDest.fill < this.fillProcessDest.total) {
                    this.setFill(this.fill - 1);
                    this.fillProcessDest.setFill(this.fillProcessDest.fill + 1);
                    Sounds.water();
                }
            }
        }
        return false;
    };
    Bucket.prototype.moveStepTo = function (dest, step) {
        var dx = dest.x - this.mc.x;
        var dy = dest.y - this.mc.y;
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len < step) {
            this.mc.x = dest.x;
            this.mc.y = dest.y;
            return true;
        }
        else {
            this.mc.x += dx / len * step;
            this.mc.y += dy / len * step;
            return false;
        }
    };
    return Bucket;
})(BaseBucket);
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.apply(this, arguments);
        this.level = 0;
        this.g = 1; // physic constant
        this.midX = 520 / 2;
        this.midY = 390 / 2;
        this.buckets = new Array();
        this.carry = null;
        this.action = 0; // what to do with "carry" if user release it
        // 0 - nothing
        // 1-4 - see gameMode
        this.fallTo = null;
        this.gameMode = 0; // 0 - waiting to user
        // 1 - tansfuse water from "carry" into "fallTo"
        // 2 - filling "carry" from tap
        // 3 - falling out from carry to trash
        // 4 - moving bucket to floor
        this.fallIntoBucketPhase = 0; // 0 - rotation for falling
        // 1 - going to original position
        this.tapWaiting = 0; // tick counter
        this.fillBeforeTrash = 0;
    }
    Game.prototype.init = function () {
        this.parent.stop();
        this.mcTap = this.parent.getChildByName("mcTap");
        this.mcTrash = this.parent.getChildByName("mcTrash");
        this.level = Globals.level;
        this.parent.getChildByName("tfLevel").text = this.level + "";
        var tfTask = this.parent.getChildByName("tfTask");
        switch (this.level) {
            case 1:
                tfTask.text = "You need to measure 4 litres of water,\nusing two buckets of 5 and 7 litres.\nUse barrel (at the right) for filling buckets.\nTo make buckets empty, use trash (at the left).";
                this.buckets.push(new Bucket(this, 5, 220));
                this.buckets.push(new Bucket(this, 7, 320));
                break;
            case 2:
                tfTask.text = "You need to measure 1 liter of water.";
                this.buckets.push(new Bucket(this, 3, 180));
                this.buckets.push(new Bucket(this, 6, 280));
                this.buckets.push(new Bucket(this, 8, 380));
                break;
            case 3:
                tfTask.text = "You need to measure 1 liter of water.";
                this.buckets.push(new Bucket(this, 3, 220));
                this.buckets.push(new Bucket(this, 5, 320));
                break;
            case 4:
                tfTask.text = "You need to got 1 liter of water in any two buckets.";
                this.buckets.push(new Bucket(this, 3, 180));
                this.buckets.push(new Bucket(this, 4, 280));
                this.buckets.push(new Bucket(this, 6, 380));
                break;
            case 5:
                tfTask.text = "You need to got 6 litres of water in bigger bucket,\n4 liters in 5-bucket and 4 litres in 8-bucket.";
                this.buckets.push(new Bucket(this, 3, 180));
                this.buckets.push(new Bucket(this, 5, 250));
                this.buckets.push(new Bucket(this, 8, 320));
                this.buckets.push(new Bucket(this, 12, 400));
                break;
            case 6:
                tfTask.text = "You need to got 2 liter of water in any three buckets.";
                this.buckets.push(new Bucket(this, 3, 180));
                this.buckets.push(new Bucket(this, 3, 250));
                this.buckets.push(new Bucket(this, 8, 320));
                this.buckets.push(new Bucket(this, 11, 400));
                break;
            case 7:
                tfTask.text = "You need to got 1 liter of water in any two buckets.";
                this.buckets.push(new Bucket(this, 2, 180));
                this.buckets.push(new Bucket(this, 3, 280));
                this.buckets.push(new Bucket(this, 9, 380));
                break;
            case 8:
                tfTask.text = "You need to got 1 liter of water in small three buckets.";
                this.buckets.push(new Bucket(this, 5, 180));
                this.buckets.push(new Bucket(this, 7, 250));
                this.buckets.push(new Bucket(this, 9, 320));
                this.buckets.push(new Bucket(this, 11, 400));
                break;
            case 9:
                tfTask.text = "You need to fill buckets on increase:\nsmallest bust be empty, next must contain 1 liter,\nnext - 2 litres and bigger - 3 litres.";
                this.buckets.push(new Bucket(this, 7, 180));
                this.buckets.push(new Bucket(this, 11, 250));
                this.buckets.push(new Bucket(this, 13, 320));
                this.buckets.push(new Bucket(this, 17, 400));
                break;
            case 10:
                tfTask.text = "You must to got 18 litres in 19-bucket and 5 litres in 6-bucket.";
                this.buckets.push(new Bucket(this, 2, 180));
                this.buckets.push(new Bucket(this, 6, 280));
                this.buckets.push(new Bucket(this, 19, 380));
                break;
        }
    };
    Game.prototype.onEnterFrame = function () {
        switch (this.gameMode) {
            case 0:
                if (this.checkWin())
                    this.parent.gotoAndStop("Win");
                break;
            case 1:
                this.fallTo.activate(false);
                if (this.carry.fallProcessStep(this.carryDX, this.carryDY)) {
                    this.gameMode = 0;
                    this.selectAction();
                }
                break;
            case 2:
                if (this.carry.fill < this.carry.total) {
                    if (this.mcTap.currentFrame != 2)
                        this.mcTap.gotoAndStop(2);
                    this.tapWaiting++;
                    if (this.tapWaiting % 10 == 9) {
                        this.carry.setFill(this.carry.fill + 1);
                        Sounds.tap();
                        Sounds.water();
                    }
                }
                else {
                    this.mcTap.gotoAndStop(0);
                    if (this.carry.moveStepTo(new createjs.Point(this.stage.mouseX + this.carryDX, this.stage.mouseY + this.carryDY), 10)) {
                        this.tapWaiting = 0;
                        this.gameMode = 0;
                        this.selectAction();
                    }
                }
                break;
            case 3:
                if (this.carry.fallProcessStep(this.carryDX, this.carryDY)) {
                    this.gameMode = 0;
                    this.selectAction();
                }
                else {
                    if (this.fillBeforeTrash > 0 && this.carry.fill < this.fillBeforeTrash) {
                        this.fillBeforeTrash = this.carry.fill;
                        Sounds.trash();
                    }
                }
                break;
            case 4:
                if (this.carry.moveStepTo(new createjs.Point(this.carry.mc.x, 345), 6)) {
                    this.carry = null;
                    this.gameMode = 0;
                    this.selectAction();
                }
                break;
        }
    };
    Game.prototype.onMouseDown = function (e) {
        if (this.gameMode != 0)
            return;
        if (this.carry == null) {
            for (var i = 0; i < this.buckets.length; i++) {
                var pos = this.buckets[i].mc.globalToLocal(e.stageX, e.stageY);
                if (this.buckets[i].mc.hitTest(pos.x, pos.y)) {
                    this.carry = this.buckets[i];
                    this.carryDX = this.buckets[i].mc.x - e.stageX;
                    this.carryDY = this.buckets[i].mc.y - e.stageY;
                    for (var j = 0; j < this.buckets.length; j++) {
                        if (this.getChildIndex(this.buckets[j].mc) > this.getChildIndex(this.carry.mc)) {
                            this.swapChildren(this.buckets[j].mc, this.carry.mc);
                        }
                    }
                    console.log("carry " + new createjs.Point(this.carry.mc.x, this.carry.mc.y));
                    console.log("neck " + this.carry.getNeckPos());
                    break;
                }
            }
        }
        else {
            this.gameMode = this.action;
            if (this.gameMode == 1)
                this.carry.startFallToBucketProcess(this.fallTo);
            else if (this.gameMode == 2) {
                this.tapWaiting = 0;
                this.carry.mc.x = this.mcTap.x;
            }
            else if (this.gameMode == 3) {
                this.fillBeforeTrash = this.carry.fill;
                var trash = new BaseBucket(1000, this.mcTrash);
                this.carry.startFallToBucketProcess(trash);
            }
        }
    };
    Game.prototype.onMouseUp = function (e) {
        if (this.gameMode != 0)
            return;
    };
    Game.prototype.onMouseMove = function (e) {
        if (this.gameMode != 0)
            return;
        this.selectAction();
        if (this.carry != null) {
            this.carry.mc.x = e.stageX + this.carryDX;
            this.carry.mc.y = e.stageY + this.carryDY;
        }
    };
    Game.prototype.selectAction = function () {
        this.action = 0;
        if (this.carry == null)
            return;
        var carryNeckPos = this.carry.getNeckPos();
        // want to fill from tap?
        if (Math.abs(carryNeckPos.x - this.mcTap.x) < this.carry.mc.scaleX * 8 && carryNeckPos.y - this.mcTap.y > -5 && carryNeckPos.y - this.mcTap.y < 40) {
            this.action = 2;
            this.mcTap.gotoAndStop(1);
            return;
        }
        this.mcTap.gotoAndStop(0);
        // want to fall out to trash?
        if (this.carry.mc.x < 165 && this.carry.mc.y <= 350) {
            this.action = 3;
            this.mcTrash.gotoAndStop(1);
            return;
        }
        this.mcTrash.gotoAndStop(0);
        // want to transfuse to another bucket?
        var bucket = this.findNearestBucket();
        if (this.carry.mc.getTransformedBounds().intersects(bucket.mc.getTransformedBounds())) {
            this.action = 1;
            this.fallTo = bucket;
            bucket.activate(true);
            for (var i = 0; i < this.buckets.length; i++) {
                if (this.buckets[i] != this.fallTo)
                    this.buckets[i].activate(false);
            }
        }
        else {
            for (var i = 0; i < this.buckets.length; i++) {
                this.buckets[i].activate(false);
            }
        }
        // want to release bucket (move to floor)
        if (this.action == 0) {
            this.action = 4;
        }
    };
    Game.prototype.findNearestBucket = function () {
        var bestBot = null;
        var bestDist = 1e10;
        for (var i = 0; i < this.buckets.length; i++) {
            var b = this.buckets[i];
            if (b == this.carry)
                continue;
            var dx = this.carry.mc.x - b.mc.x;
            var dy = this.carry.mc.y - b.mc.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < bestDist) {
                bestBot = b;
                bestDist = dist;
            }
        }
        return bestBot;
    };
    Game.prototype.checkWin = function () {
        switch (this.level) {
            case 1: return this.buckets[0].fill == 4 || this.buckets[1].fill == 4;
            case 2: return this.buckets[0].fill == 1 || this.buckets[1].fill == 1 || this.buckets[2].fill == 1;
            case 3: return this.buckets[0].fill == 1 || this.buckets[1].fill == 1;
            case 4: return this.buckets.filter(function (bucket) {
                return bucket.fill == 1;
            }).length >= 2;
            case 5: return this.buckets[1].fill == 4 && this.buckets[2].fill == 4 && this.buckets[3].fill == 6;
            case 6: return this.buckets.filter(function (bucket) {
                return bucket.fill == 2;
            }).length >= 3;
            case 7: return this.buckets.filter(function (bucket) {
                return bucket.fill == 1;
            }).length >= 2;
            case 8: return this.buckets[0].fill == 1 && this.buckets[1].fill == 1 && this.buckets[2].fill == 1;
            case 9: return this.buckets[0].fill == 0 && this.buckets[1].fill == 1 && this.buckets[2].fill == 2 && this.buckets[3].fill == 3;
            case 10: return this.buckets[1].fill == 5 && this.buckets[2].fill == 18;
        }
        return false;
    };
    return Game;
})(base.Game);
var Globals = (function () {
    function Globals() {
    }
    Globals.level = 1;
    return Globals;
})();
var McBucket = (function (_super) {
    __extends(McBucket, _super);
    function McBucket() {
        _super.apply(this, arguments);
    }
    return McBucket;
})(base.McBucket);
var MusicButton = (function (_super) {
    __extends(MusicButton, _super);
    function MusicButton() {
        _super.call(this);
        this.cursor = "pointer";
        this.musicOn();
    }
    MusicButton.prototype.onMouseUp = function (e) {
        if (this.getBounds().contains(e.localX, e.localY)) {
            if (this.currentFrame == 1)
                this.musicOn();
            else
                this.musicOff();
        }
    };
    MusicButton.prototype.musicOn = function () {
        this.gotoAndStop(0);
        this.soundLoop = new nanofl.SeamlessSoundLoop(Sounds.music());
        this.addEventListener("removed", function (e) {
            this.soundLoop.stop();
        });
    };
    MusicButton.prototype.musicOff = function () {
        this.gotoAndStop(1);
        this.soundLoop.stop();
    };
    return MusicButton;
})(base.MusicButton);
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.apply(this, arguments);
        this.lastInitFrame = null;
    }
    Scene.prototype.onEnterFrame = function () {
        var self = this;
        if (this.currentFrame != this.lastInitFrame) {
            this.lastInitFrame = this.currentFrame;
            this.addButtonHandler("btGotoGame", function () {
                self.gotoAndStop("Game");
            });
            this.addButtonHandler("btRules", function () {
                self.gotoAndStop("Rules");
            });
            this.addButtonHandler("btScores", function () {
                self.gotoAndStop("Scores");
            });
            this.addButtonHandler("btGotoOrigin", function () {
                self.gotoAndStop("Origin");
            });
        }
    };
    Scene.prototype.addButtonHandler = function (name, f) {
        var bt = this.getChildByName(name);
        if (bt != null)
            bt.addEventListener("click", function (e) {
                f();
            });
    };
    return Scene;
})(base.Scene);
//# sourceMappingURL=WaterLogic.js.map