module base
{
	export class Scene extends nanofl.MovieClip
	{
		constructor()
		{
			super(nanofl.Player.library.getItem("scene"));
		}
	}
}