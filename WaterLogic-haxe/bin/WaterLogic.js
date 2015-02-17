function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var BaseBucket = function(total,mc) {
	this.fill = 0;
	this.total = total;
	this.mc = mc;
};
BaseBucket.__name__ = true;
BaseBucket.prototype = {
	setFill: function(v) {
	}
	,getNeckPos: function() {
		return new createjs.Point(this.mc.x,this.mc.y);
	}
	,__class__: BaseBucket
};
var Bucket = function(baseMovie,total,x) {
	this.fillProcessFallFrame = 0;
	this.fillProcessDest = null;
	this.fallProcessPhase = 0;
	BaseBucket.call(this,total,new McBucket());
	this.baseMovie = baseMovie;
	baseMovie.addChild(this.mc);
	this.mc.x = x;
	this.mc.y = 345;
	this.mc.scaleX = this.mc.scaleY = Math.sqrt(total) * 40 / 100;
	this.setFill(0);
	this.activate(false);
};
Bucket.__name__ = true;
Bucket.__super__ = BaseBucket;
Bucket.prototype = $extend(BaseBucket.prototype,{
	activate: function(act) {
		var mcForeColor = this.mc.getChildByName("mcForeColor");
		mcForeColor.visible = act;
	}
	,getNeckPos: function() {
		var mcNeck = this.mc.getChildByName("mcNeck");
		return new createjs.Point(this.mc.x + mcNeck.x * this.mc.scaleX,this.mc.y + mcNeck.y * this.mc.scaleY);
	}
	,setFill: function(v) {
		this.fill = v;
		(js.Boot.__cast(this.mc.getChildByName("tfLabel") , nanofl.TextField)).set_text(this.fill + "/" + this.total);
		this.mc.gotoAndStop(Math.round(this.fill / this.total * 100));
	}
	,fallToBucket: function(dest) {
		var freeDest = dest.total - dest.fill;
		if(freeDest > this.fill) {
			dest.setFill(dest.fill + this.fill);
			this.setFill(0);
		} else {
			dest.setFill(dest.total);
			this.setFill(this.fill - freeDest);
		}
	}
	,startFallToBucketProcess: function(dest) {
		if(this.fallProcessPhase != 0) {
			console.log("StartFallProcess error 1");
			return;
		}
		this.fallProcessPhase = 1;
		this.fillProcessDest = dest;
		this.fillProcessFallFrame = 0;
	}
	,fallProcessStep: function(mouseDX,mouseDY) {
		if(this.fallProcessPhase == 0) return true;
		if(this.fallProcessPhase == 1) {
			var thisNeck = this.getNeckPos();
			var destNeck = this.fillProcessDest.getNeckPos();
			var b = this.mc.getChildByName("mcBox").getBounds();
			var mustPos = new createjs.Point(destNeck.x + b.height * this.mc.scaleY,destNeck.y);
			if(this.moveStepTo(mustPos,6)) this.fallProcessPhase++;
		} else if(this.fallProcessPhase == 2) {
			if(this.fill == 0 || this.fillProcessDest.fill == this.fillProcessDest.total) this.fallProcessPhase++; else if(this.mc.rotation > -90) this.mc.rotation -= 4; else this.fallProcessPhase++;
		} else if(this.fallProcessPhase == 3) {
			if(this.fill == 0 || this.fillProcessDest.fill == this.fillProcessDest.total) this.fallProcessPhase++;
		} else if(this.fallProcessPhase == 4) {
			if(this.mc.rotation < 0) this.mc.rotation += 4; else this.fallProcessPhase++;
		} else if(this.fallProcessPhase == 5) {
			var r = this.moveStepTo(new createjs.Point(this.mc.stage.mouseX + mouseDX,this.mc.stage.mouseY + mouseDY),10);
			if(r == true) this.fallProcessPhase = 0;
			return r;
		}
		if(this.fallProcessPhase == 2 && this.mc.rotation < -40 || this.fallProcessPhase == 3) {
			this.fillProcessFallFrame++;
			if(this.fillProcessFallFrame % 7 == 6) {
				if(this.fill > 0 && this.fillProcessDest.fill < this.fillProcessDest.total) {
					this.setFill(this.fill - 1);
					this.fillProcessDest.setFill(this.fillProcessDest.fill + 1);
					Sounds.water();
				}
			}
		}
		return false;
	}
	,moveStepTo: function(dest,step) {
		var dx = dest.x - this.mc.x;
		var dy = dest.y - this.mc.y;
		var len = Math.sqrt(dx * dx + dy * dy);
		if(len < step) {
			this.mc.x = dest.x;
			this.mc.y = dest.y;
			return true;
		} else {
			this.mc.x += dx / len * step;
			this.mc.y += dy / len * step;
			return false;
		}
	}
	,__class__: Bucket
});
var base = base || {};
base.Game = function() {
	nanofl.MovieClip.call(this,nanofl.Player.library.getItem("game"));
};
base.Game.__name__ = true;
base.Game.__super__ = nanofl.MovieClip;
base.Game.prototype = $extend(nanofl.MovieClip.prototype,{
	__class__: base.Game
});
var Game = function() {
	this.fillBeforeTrash = 0;
	this.tapWaiting = 0;
	this.fallIntoBucketPhase = 0;
	this.gameMode = 0;
	this.fallTo = null;
	this.action = 0;
	this.carry = null;
	this.buckets = new Array();
	this.midY = 195.;
	this.midX = 260.;
	this.g = 1;
	this.level = 0;
	base.Game.call(this);
};
Game.__name__ = true;
Game.__super__ = base.Game;
Game.prototype = $extend(base.Game.prototype,{
	init: function() {
		(js.Boot.__cast(this.parent , nanofl.MovieClip)).stop();
		this.mcTap = this.parent.getChildByName("mcTap");
		this.mcTrash = this.parent.getChildByName("mcTrash");
		this.level = Globals.level;
		(js.Boot.__cast(this.parent.getChildByName("tfLevel") , nanofl.TextField)).set_text(Std.string(this.level));
		var tfTask;
		tfTask = js.Boot.__cast(this.parent.getChildByName("tfTask") , nanofl.TextField);
		var _g = this.level;
		switch(_g) {
		case 1:
			tfTask.set_text("You need to measure 4 litres of water,\nusing two buckets of 5 and 7 litres.\nUse barrel (at the right) for filling buckets.\nTo make buckets empty, use trash (at the left).");
			this.buckets.push(new Bucket(this,5,220));
			this.buckets.push(new Bucket(this,7,320));
			break;
		case 2:
			tfTask.set_text("You need to measure 1 liter of water.");
			this.buckets.push(new Bucket(this,3,180));
			this.buckets.push(new Bucket(this,6,280));
			this.buckets.push(new Bucket(this,8,380));
			break;
		case 3:
			tfTask.set_text("You need to measure 1 liter of water.");
			this.buckets.push(new Bucket(this,3,220));
			this.buckets.push(new Bucket(this,5,320));
			break;
		case 4:
			tfTask.set_text("You need to got 1 liter of water in any two buckets.");
			this.buckets.push(new Bucket(this,3,180));
			this.buckets.push(new Bucket(this,4,280));
			this.buckets.push(new Bucket(this,6,380));
			break;
		case 5:
			tfTask.set_text("You need to got 6 litres of water in bigger bucket,\n4 liters in 5-bucket and 4 litres in 8-bucket.");
			this.buckets.push(new Bucket(this,3,180));
			this.buckets.push(new Bucket(this,5,250));
			this.buckets.push(new Bucket(this,8,320));
			this.buckets.push(new Bucket(this,12,400));
			break;
		case 6:
			tfTask.set_text("You need to got 2 liter of water in any three buckets.");
			this.buckets.push(new Bucket(this,3,180));
			this.buckets.push(new Bucket(this,3,250));
			this.buckets.push(new Bucket(this,8,320));
			this.buckets.push(new Bucket(this,11,400));
			break;
		case 7:
			tfTask.set_text("You need to got 1 liter of water in any two buckets..");
			this.buckets.push(new Bucket(this,2,180));
			this.buckets.push(new Bucket(this,3,280));
			this.buckets.push(new Bucket(this,9,380));
			break;
		case 8:
			tfTask.set_text("You need to got 1 liter of water in small three buckets.");
			this.buckets.push(new Bucket(this,5,180));
			this.buckets.push(new Bucket(this,7,250));
			this.buckets.push(new Bucket(this,9,320));
			this.buckets.push(new Bucket(this,11,400));
			break;
		case 9:
			tfTask.set_text("You need to fill buckets on increase:\nsmallest bust be empty, next must contain 1 liter,\nnext - 2 litres and bigger - 3 litres.");
			this.buckets.push(new Bucket(this,7,180));
			this.buckets.push(new Bucket(this,11,250));
			this.buckets.push(new Bucket(this,13,320));
			this.buckets.push(new Bucket(this,17,400));
			break;
		case 10:
			tfTask.set_text("You must to got 18 litres in 19-bucket and 5 litres in 6-bucket.");
			this.buckets.push(new Bucket(this,2,180));
			this.buckets.push(new Bucket(this,6,280));
			this.buckets.push(new Bucket(this,19,380));
			break;
		}
	}
	,onEnterFrame: function() {
		var _g = this.gameMode;
		switch(_g) {
		case 0:
			if(this.checkWin()) (js.Boot.__cast(this.parent , nanofl.MovieClip)).gotoAndStop("Win");
			break;
		case 1:
			this.fallTo.activate(false);
			if(this.carry.fallProcessStep(this.carryDX,this.carryDY)) {
				this.gameMode = 0;
				this.selectAction();
			}
			break;
		case 2:
			if(this.carry.fill < this.carry.total) {
				if(this.mcTap.currentFrame != 2) this.mcTap.gotoAndStop(2);
				this.tapWaiting++;
				if(this.tapWaiting % 10 == 9) {
					this.carry.setFill(this.carry.fill + 1);
					Sounds.tap();
					Sounds.water();
				}
			} else {
				this.mcTap.gotoAndStop(0);
				if(this.carry.moveStepTo(new createjs.Point(this.stage.mouseX + this.carryDX,this.stage.mouseY + this.carryDY),10)) {
					this.tapWaiting = 0;
					this.gameMode = 0;
					this.selectAction();
				}
			}
			break;
		case 3:
			if(this.carry.fallProcessStep(this.carryDX,this.carryDY)) {
				this.gameMode = 0;
				this.selectAction();
			} else if(this.fillBeforeTrash > 0 && this.carry.fill < this.fillBeforeTrash) {
				this.fillBeforeTrash = this.carry.fill;
				Sounds.trash();
			}
			break;
		case 4:
			if(this.carry.moveStepTo(new createjs.Point(this.carry.mc.x,345),6)) {
				this.carry = null;
				this.gameMode = 0;
				this.selectAction();
			}
			break;
		}
	}
	,onMouseDown: function(e) {
		if(this.gameMode != 0) return;
		if(this.carry == null) {
			var _g1 = 0;
			var _g = this.buckets.length;
			while(_g1 < _g) {
				var i = _g1++;
				var pos = this.buckets[i].mc.globalToLocal(e.stageX,e.stageY);
				if(this.buckets[i].mc.hitTest(pos.x,pos.y)) {
					this.carry = this.buckets[i];
					this.carryDX = this.buckets[i].mc.x - e.stageX;
					this.carryDY = this.buckets[i].mc.y - e.stageY;
					var _g3 = 0;
					var _g2 = this.buckets.length;
					while(_g3 < _g2) {
						var j = _g3++;
						if(this.getChildIndex(this.buckets[j].mc) > this.getChildIndex(this.carry.mc)) this.swapChildren(this.buckets[j].mc,this.carry.mc);
					}
					console.log("carry " + Std.string(new createjs.Point(this.carry.mc.x,this.carry.mc.y)));
					console.log("neck " + Std.string(this.carry.getNeckPos()));
					break;
				}
			}
		} else {
			this.gameMode = this.action;
			if(this.gameMode == 1) this.carry.startFallToBucketProcess(this.fallTo); else if(this.gameMode == 2) {
				this.tapWaiting = 0;
				this.carry.mc.x = this.mcTap.x;
			} else if(this.gameMode == 3) {
				this.fillBeforeTrash = this.carry.fill;
				var sliv = new BaseBucket(1000,this.mcTrash);
				this.carry.startFallToBucketProcess(sliv);
			}
		}
	}
	,onMouseUp: function(e) {
		if(this.gameMode != 0) return;
	}
	,onMouseMove: function(e) {
		if(this.gameMode != 0) return;
		this.selectAction();
		if(this.carry != null) {
			this.carry.mc.x = e.stageX + this.carryDX;
			this.carry.mc.y = e.stageY + this.carryDY;
		}
	}
	,selectAction: function() {
		this.action = 0;
		if(this.carry == null) return;
		var carryNeckPos = this.carry.getNeckPos();
		if(Math.abs(carryNeckPos.x - this.mcTap.x) < this.carry.mc.scaleX * 8 && carryNeckPos.y - this.mcTap.y > -5 && carryNeckPos.y - this.mcTap.y < 40) {
			this.action = 2;
			this.mcTap.gotoAndStop(1);
			return;
		}
		this.mcTap.gotoAndStop(0);
		if(this.carry.mc.x < 165 && this.carry.mc.y <= 350) {
			this.action = 3;
			this.mcTrash.gotoAndStop(1);
			return;
		}
		this.mcTrash.gotoAndStop(0);
		var bucket = this.findNearestBucket();
		if(this.carry.mc.getTransformedBounds().intersects(bucket.mc.getTransformedBounds())) {
			this.action = 1;
			this.fallTo = bucket;
			bucket.activate(true);
			var _g = 0;
			var _g1 = this.buckets;
			while(_g < _g1.length) {
				var bucket1 = _g1[_g];
				++_g;
				if(bucket1 != this.fallTo) bucket1.activate(false);
			}
		} else {
			var _g2 = 0;
			var _g11 = this.buckets;
			while(_g2 < _g11.length) {
				var bucket2 = _g11[_g2];
				++_g2;
				bucket2.activate(false);
			}
		}
		if(this.action == 0) this.action = 4;
	}
	,findNearestBucket: function() {
		var bestBot = null;
		var bestDist = 1e10;
		var _g = 0;
		var _g1 = this.buckets;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			if(b == this.carry) continue;
			var dx = this.carry.mc.x - b.mc.x;
			var dy = this.carry.mc.y - b.mc.y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if(dist < bestDist) {
				bestBot = b;
				bestDist = dist;
			}
		}
		return bestBot;
	}
	,checkWin: function() {
		var _g = this.level;
		switch(_g) {
		case 1:
			return this.buckets[0].fill == 4 || this.buckets[1].fill == 4;
		case 2:
			return this.buckets[0].fill == 1 || this.buckets[1].fill == 1 || this.buckets[2].fill == 1;
		case 3:
			return this.buckets[0].fill == 1 || this.buckets[1].fill == 1;
		case 4:
			return this.buckets.filter(function(bucket) {
				return bucket.fill == 1;
			}).length >= 2;
		case 5:
			return this.buckets[1].fill == 4 && this.buckets[2].fill == 4 && this.buckets[3].fill == 6;
		case 6:
			return this.buckets.filter(function(bucket1) {
				return bucket1.fill == 2;
			}).length >= 3;
		case 7:
			return this.buckets.filter(function(bucket2) {
				return bucket2.fill == 1;
			}).length >= 2;
		case 8:
			return this.buckets[0].fill == 1 && this.buckets[1].fill == 1 && this.buckets[2].fill == 1;
		case 9:
			return this.buckets[0].fill == 0 && this.buckets[1].fill == 1 && this.buckets[2].fill == 2 && this.buckets[3].fill == 3;
		case 10:
			return this.buckets[1].fill == 5 && this.buckets[2].fill == 18;
		}
		return false;
	}
	,__class__: Game
});
var Globals = function() { };
Globals.__name__ = true;
Math.__name__ = true;
base.McBucket = function() {
	nanofl.MovieClip.call(this,nanofl.Player.library.getItem("bucket"));
};
base.McBucket.__name__ = true;
base.McBucket.__super__ = nanofl.MovieClip;
base.McBucket.prototype = $extend(nanofl.MovieClip.prototype,{
	__class__: base.McBucket
});
var McBucket = function() {
	base.McBucket.call(this);
};
McBucket.__name__ = true;
McBucket.__super__ = base.McBucket;
McBucket.prototype = $extend(base.McBucket.prototype,{
	__class__: McBucket
});
base.MusicButton = function() {
	nanofl.MovieClip.call(this,nanofl.Player.library.getItem("musicButton"));
};
base.MusicButton.__name__ = true;
base.MusicButton.__super__ = nanofl.MovieClip;
base.MusicButton.prototype = $extend(nanofl.MovieClip.prototype,{
	__class__: base.MusicButton
});
var MusicButton = function() {
	base.MusicButton.call(this);
	this.cursor = "pointer";
	this.musicOn();
};
MusicButton.__name__ = true;
MusicButton.__super__ = base.MusicButton;
MusicButton.prototype = $extend(base.MusicButton.prototype,{
	onMouseUp: function(e) {
		if(this.getBounds().contains(e.localX,e.localY)) {
			if(this.currentFrame == 1) this.musicOn(); else this.musicOff();
		}
	}
	,musicOn: function() {
		var _g = this;
		this.gotoAndStop(0);
		this.soundLoop = new nanofl.SeamlessSoundLoop(Sounds.music());
		this.addEventListener("removed",function(_) {
			_g.soundLoop.stop();
		},null);
	}
	,musicOff: function() {
		this.gotoAndStop(1);
		this.soundLoop.stop();
	}
	,__class__: MusicButton
});
base.Scene = function() {
	nanofl.MovieClip.call(this,nanofl.Player.library.getItem("scene"));
};
base.Scene.__name__ = true;
base.Scene.__super__ = nanofl.MovieClip;
base.Scene.prototype = $extend(nanofl.MovieClip.prototype,{
	__class__: base.Scene
});
var Scene = function() {
	this.lastInitFrame = null;
	base.Scene.call(this);
};
Scene.__name__ = true;
Scene.__super__ = base.Scene;
Scene.prototype = $extend(base.Scene.prototype,{
	onEnterFrame: function() {
		var _g = this;
		if(this.currentFrame != this.lastInitFrame) {
			this.lastInitFrame = this.currentFrame;
			this.addButtonHandler("btGotoGame",function() {
				_g.gotoAndStop("Game");
			});
			this.addButtonHandler("btRules",function() {
				_g.gotoAndStop("Rules");
			});
			this.addButtonHandler("btScores",function() {
				_g.gotoAndStop("Scores");
			});
			this.addButtonHandler("btGotoOrigin",function() {
				_g.gotoAndStop("Origin");
			});
		}
	}
	,addButtonHandler: function(name,f) {
		var bt = this.getChildByName(name);
		if(bt != null) bt.addEventListener("click",function(e) {
			f();
		},null);
	}
	,__class__: Scene
});
var Sounds = function() { };
Sounds.__name__ = true;
Sounds.bucket = function(options) {
	return createjs.Sound.play("bucket",options);
};
Sounds.music = function(options) {
	return createjs.Sound.play("music",options);
};
Sounds.tap = function(options) {
	return createjs.Sound.play("tap",options);
};
Sounds.trash = function(options) {
	return createjs.Sound.play("trash",options);
};
Sounds.water = function(options) {
	return createjs.Sound.play("water",options);
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var js = js || {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
createjs.DisplayObject.prototype.setBounds = function(x, y, width, height) { this._bounds = x != null ? (this._bounds || new createjs.Rectangle()).setValues(x, y, width, height) : null; };;
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
Globals.level = 1;
