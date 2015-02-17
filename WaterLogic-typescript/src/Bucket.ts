class Bucket extends BaseBucket
{
	baseMovie : nanofl.MovieClip;
	
	fallProcessPhase = 0;	// 0 - nothing to do
							// 1 - moving to preffered position
							// 2 - rotation forward
							// 3 - waiting water to fall out
							// 4 - rotation backward
							// 5 - moving to mouse position
	
	fillProcessDest : BaseBucket = null;
	fillProcessFallFrame = 0;
	
	constructor(baseMovie:nanofl.MovieClip, total:number, x:number)
	{
		super(total, new McBucket());
		
		this.baseMovie = baseMovie;
		baseMovie.addChild(this.mc);
		
		this.mc.x = x;
		this.mc.y = 345;
		
		this.mc.scaleX = this.mc.scaleY = Math.sqrt(total) * 40 / 100;
		
		this.setFill(0);
		
		this.activate(false);
	}
	
	public activate(act:boolean)
	{
		var mcForeColor = this.mc.getChildByName("mcForeColor");
		mcForeColor.visible = act;
	}
	
	public getNeckPos() : createjs.Point
	{
		var mcNeck = this.mc.getChildByName("mcNeck");
		return new createjs.Point(this.mc.x + mcNeck.x * this.mc.scaleX, this.mc.y + mcNeck.y * this.mc.scaleY);
	}
	
	public setFill(v:number)
	{
		this.fill = v;
		(<nanofl.TextField> this.mc.getChildByName("tfLabel")).text = this.fill + "/" + this.total;
		this.mc.gotoAndStop(Math.round(this.fill / this.total * 100));
	}
	
	fallToBucket(dest:Bucket)
	{
		var freeDest = dest.total - dest.fill;
		if (freeDest > this.fill)
		{
			dest.setFill(dest.fill + this.fill);
			this.setFill(0);
		}
		else
		{
			dest.setFill(dest.total);
			this.setFill(this.fill - freeDest);
		}
	}
	
	public startFallToBucketProcess(dest:BaseBucket)
	{
		if (this.fallProcessPhase != 0) { console.log("StartFallProcess error 1"); return; }

		this.fallProcessPhase = 1;
		this.fillProcessDest = dest;
		this.fillProcessFallFrame = 0;
	}
	
	public fallProcessStep(mouseDX:number, mouseDY:number) : boolean
	{
		if (this.fallProcessPhase == 0) return true;
		if (this.fallProcessPhase == 1)
		{
			var thisNeck = this.getNeckPos();
			var destNeck = this.fillProcessDest.getNeckPos();
			var b = this.mc.getChildByName("mcBox").getBounds();
			var mustPos = new createjs.Point(destNeck.x + b.height * this.mc.scaleY, destNeck.y);
			if (this.moveStepTo(mustPos, 6)) this.fallProcessPhase++;
		}
		else
		if (this.fallProcessPhase == 2)
		{
			if (this.fill == 0 || this.fillProcessDest.fill == this.fillProcessDest.total) this.fallProcessPhase++;
			else
			{
				if (this.mc.rotation > -90) this.mc.rotation -= 4;
				else this.fallProcessPhase++;
			}
		}
		else
		if (this.fallProcessPhase == 3)
		{
			if (this.fill == 0 || this.fillProcessDest.fill == this.fillProcessDest.total) this.fallProcessPhase++;
		}
		else
		if (this.fallProcessPhase == 4)
		{
			if (this.mc.rotation < 0) this.mc.rotation += 4;
			else this.fallProcessPhase++;
		}
		else
		if (this.fallProcessPhase == 5)
		{
			var r = this.moveStepTo(new createjs.Point(this.mc.stage.mouseX + mouseDX, this.mc.stage.mouseY + mouseDY), 10);
			if (r == true) this.fallProcessPhase = 0;
			return r;
		}
		
		if ((this.fallProcessPhase == 2 && this.mc.rotation<-40) || this.fallProcessPhase == 3)
		{
			this.fillProcessFallFrame++;
			if (this.fillProcessFallFrame % 7 == 6)
			{
				if (this.fill > 0 && this.fillProcessDest.fill < this.fillProcessDest.total)
				{
					this.setFill(this.fill - 1);
					this.fillProcessDest.setFill(this.fillProcessDest.fill + 1);
					Sounds.water();
				}
			}
		}
		
		return false;
	}
	
	public moveStepTo(dest:createjs.Point, step:number) : boolean
	{
		var dx = dest.x - this.mc.x;
		var dy = dest.y - this.mc.y;
		var len = Math.sqrt(dx * dx + dy * dy);
		if (len < step)
		{
			this.mc.x = dest.x;
			this.mc.y = dest.y;
			return true;
		}
		else
		{
			this.mc.x += dx / len * step;
			this.mc.y += dy / len * step;
			return false;
		}
	}
}
