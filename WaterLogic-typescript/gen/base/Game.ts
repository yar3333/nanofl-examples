module base
{
	export class Game extends nanofl.MovieClip
	{
		constructor()
		{
			super(nanofl.Player.library.getItem("game"));
		}
	}
}