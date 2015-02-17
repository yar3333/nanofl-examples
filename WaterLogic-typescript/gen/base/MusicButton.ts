module base
{
	export class MusicButton extends nanofl.MovieClip
	{
		constructor()
		{
			super(nanofl.Player.library.getItem("musicButton"));
		}
	}
}