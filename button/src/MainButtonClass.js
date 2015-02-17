function MainButtonClass()
{
	base.MainButtonClass.call(this);
}

MainButtonClass.prototype = $extend(base.MainButtonClass.prototype,
{
	onMouseDown: function(e)
	{
		if (this.hitTest(e.localX, e.localY))
		{
			console.log("click!");
		}
	}
});