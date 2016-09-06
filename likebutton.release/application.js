var console = Function("return typeof console != 'undefined' ? console : {log:function(){}}")();
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var base_MyButton = function() {
	nanofl.Button.call(this,nanofl.Player.library.getItem("myButton"));
};
base_MyButton.__super__ = nanofl.Button;
base_MyButton.prototype = $extend(nanofl.Button.prototype,{
});
var MyButton = function() {
	base_MyButton.call(this);
};
MyButton.__super__ = base_MyButton;
MyButton.prototype = $extend(base_MyButton.prototype,{
	init: function() {
	}
	,onEnterFrame: function() {
	}
	,onMouseDown: function(e) {
	}
});
createjs.DisplayObject.prototype.setBounds = function(x, y, width, height) { this._bounds = x != null ? (this._bounds || new createjs.Rectangle()).setValues(x, y, width, height) : null; };;
