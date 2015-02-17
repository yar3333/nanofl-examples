package nanofl;

extern class Player
{
	static var library : { function getItem(namePath:String) : Dynamic; };
	static var stage : createjs.Stage;
	static var scene : nanofl.MovieClip;
}