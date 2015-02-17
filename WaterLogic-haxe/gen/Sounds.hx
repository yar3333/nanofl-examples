import createjs.AbstractSoundInstance;
import createjs.Sound;
import createjs.SoundOptions;

class Sounds
{
	public static function bucket(?options:SoundOptions) : AbstractSoundInstance return Sound.play("bucket", options);
	public static function music(?options:SoundOptions) : AbstractSoundInstance return Sound.play("music", options);
	public static function tap(?options:SoundOptions) : AbstractSoundInstance return Sound.play("tap", options);
	public static function trash(?options:SoundOptions) : AbstractSoundInstance return Sound.play("trash", options);
	public static function water(?options:SoundOptions) : AbstractSoundInstance return Sound.play("water", options);
}