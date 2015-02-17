class BaseBucket
{
	public total : number;
	public fill = 0;
	public mc : nanofl.MovieClip;
	
	public constructor(total:number, mc:nanofl.MovieClip) 
	{
		this.total = total;
		this.mc = mc;
	}
	
	public setFill(v:number) : void { }
	
	public getNeckPos() : createjs.Point { return new createjs.Point(this.mc.x, this.mc.y); }
}