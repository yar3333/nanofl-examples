base = typeof base != 'undefined' ? base : {};
base.MainButtonClass = function() { nanofl.MovieClip.call(this, nanofl.Player.library.getItem("MainButton")); }
base.MainButtonClass.prototype = $extend(nanofl.MovieClip.prototype, {});