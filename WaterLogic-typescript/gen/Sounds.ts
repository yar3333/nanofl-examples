type AbstractSoundInstance = createjs.AbstractSoundInstance;
type SoundOptions = createjs.SoundOptions;

class Sounds
{
	public static bucket(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play("bucket", options); }
	public static music(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play("music", options); }
	public static tap(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play("tap", options); }
	public static trash(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play("trash", options); }
	public static water(options?:SoundOptions) : AbstractSoundInstance { return createjs.Sound.play("water", options); }
}