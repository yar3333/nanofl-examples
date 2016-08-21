WaterLogic-haxe: WaterLogic-haxe/WaterLogic.nfl
WaterLogic-haxe/WaterLogic.nfl: WaterLogic-flash/WaterLogic.xfl
	../ide/standalone/nanoflc.exe WaterLogic-flash/WaterLogic.xfl -generator CreateJS,mode=Haxe/FlashDevelop -export $@
