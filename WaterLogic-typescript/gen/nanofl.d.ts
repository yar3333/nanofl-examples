declare module nanofl
{
	export class Bitmap extends createjs.Bitmap
	{
		constructor(symbol:any);
	}
	
	export class Button extends MovieClip
	{
		constructor(symbol:any);
	}
	
	export class DisplayObjectTools
	{
		static smartUncache(obj:createjs.DisplayObject) : void;
	}
	
	export class MovieClip extends createjs.Container
	{
		paused : boolean;
		loop : boolean;
		
		currentFrame : number;
		
		constructor(symbol:any);
		
		play() : void;
		stop() : void;
		gotoAndStop(labelOrIndex:any) : void;
		gotoAndPlay(labelOrIndex:any) : void;
		getTotalFrames() : number;
		
		onEnterFrame() : void;
		onMouseDown(e:createjs.MouseEvent) : void;
		onMouseMove(e:createjs.MouseEvent) : void;
		onMouseUp(e:createjs.MouseEvent) : void;
	}
	
	export class Player
	{
		static library : { getItem(namePath:string) : any; };
		static stage : createjs.Stage;
		static scene : nanofl.MovieClip;
	}
	
	export class SeamlessSoundLoop
	{
		constructor(sound:createjs.AbstractSoundInstance);
		stop() : void;
	}
	
	export class TextField extends createjs.Container
	{
		border : boolean;
		height : number;
		minHeight : number;
		minWidth : number;
		selectable : boolean;
		text : string;
		textRuns : TextRun[];
		width : number;
		
		constructor();
		update() : void;
	}
	
	export class TextRun
	{
		align : string;
		characters : string;
		family : string;
		fillColor : string;
		size : number;
		strokeColor : string;
		strokeSize : number;
		style : string;
		
		constructor(characters:string, fillColor:string, family:string, style:string, size:number, align:string, strokeSize:number, strokeColor:string);
		clone() : TextRun;
	}
}