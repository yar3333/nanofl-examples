WaterLogic-haxe: WaterLogic-haxe/WaterLogic.nfl
WaterLogic-haxe/WaterLogic.nfl: WaterLogic-flash/WaterLogic.xfl
	../ide/standalone/nanoflc.exe WaterLogic-flash/WaterLogic.xfl -generator CreateJS/Haxe/FlashDevelop -export $@

WaterLogic-typescript: WaterLogic-typescript/WaterLogic.nfl
WaterLogic-typescript/WaterLogic.nfl: WaterLogic-flash/WaterLogic.xfl
	../ide/standalone/nanoflc.exe WaterLogic-flash/WaterLogic.xfl -generator CreateJS/TypeScript/FlashDevelop -export $@
