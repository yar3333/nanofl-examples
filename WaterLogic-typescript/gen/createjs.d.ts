declare module createjs.AbstractLoader
{
	type AbstractLoaderLoadstartEvent =
	{
		target : any;
		type : string;
	}
	
	type AbstractLoaderCompleteEvent =
	{
		target : any;
		type : string;
	}
	
	type AbstractLoaderFileerrorEvent =
	{
		The : any;
		target : any;
		type : string;
	}
	
	type AbstractLoaderFileloadEvent =
	{
		item : any;
		rawResult : any;
		result : any;
		target : any;
		type : string;
	}
	
	type AbstractLoaderInitializeEvent =
	{
		loader : createjs.AbstractLoader;
		target : any;
		type : string;
	}
}

declare module createjs.SpriteSheetBuilder
{
	type SpriteSheetBuilderCompleteEvent =
	{
		target : any;
		type : string;
	}
	
	type SpriteSheetBuilderProgressEvent =
	{
		progress : number;
		target : any;
		type : string;
	}
}

declare module createjs
{
	/**
	 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
	 *
	 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
	 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
	 *
	 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
	 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
	 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
	 *
	 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
	 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The
	 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
	 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
	 *
	 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
	 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also
	 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
	 *
	 * <h4>Example</h4>
	 * Add EventDispatcher capabilities to the "MyClass" class.
	 *
	 *      EventDispatcher.initialize(MyClass.prototype);
	 *
	 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
	 *
	 *      instance.addEventListener("eventName", handlerMethod);
	 *      function handlerMethod(event) {
	 *          console.log(event.target + " Was Clicked");
	 *      }
	 *
	 * <b>Maintaining proper scope</b><br />
	 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
	 * method to subscribe to events simplifies this.
	 *
	 *      instance.addEventListener("click", function(event) {
	 *          console.log(instance == this); // false, scope is ambiguous.
	 *      });
	 *
	 *      instance.on("click", function(event) {
	 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
	 *      });
	 *
	 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage scope.
	 */
	export class EventDispatcher
	{
		constructor();
		/**
		 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
		 * multiple callbacks getting fired.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.addEventListener("click", handleClick);
		 *      function handleClick(event) {
		 *         // Click happened.
		 *      }
		 */
		addEventListener(type:string, listener:any, useCapture?:boolean) : any;
		/**
		 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
		 * only run once, associate arbitrary data with the listener, and remove the listener.
		 *
		 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
		 * The created anonymous function is returned for use with .removeEventListener (or .off).
		 *
		 * <h4>Example</h4>
		 *
		 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
		 * 		function handleClick(evt, data) {
		 * 			data.count -= 1;
		 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
		 * 			if (data.count == 0) {
		 * 				alert("clicked 3 times!");
		 * 				myBtn.off("click", listener);
		 * 				// alternately: evt.remove();
		 * 			}
		 * 		}
		 */
		on(type:string, listener:any, scope?:any, once?:boolean, data?:any, useCapture?:boolean) : any;
		/**
		 * Removes the specified event listener.
		 *
		 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
		 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
		 * closure will not work.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.removeEventListener("click", handleClick);
		 */
		removeEventListener(type:string, listener:any, useCapture?:boolean) : void;
		/**
		 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
		 * .on method.
		 */
		off(type:string, listener:any, useCapture?:boolean) : void;
		/**
		 * Removes all listeners for the specified type, or all listeners of all types.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Remove all listeners
		 *      displayObject.removeAllEventListeners();
		 *
		 *      // Remove all click listeners
		 *      displayObject.removeAllEventListeners("click");
		 */
		removeAllEventListeners(type?:string) : void;
		/**
		 * Dispatches the specified event to all listeners.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Use a string event
		 *      this.dispatchEvent("complete");
		 *
		 *      // Use an Event instance
		 *      var event = new createjs.Event("progress");
		 *      this.dispatchEvent(event);
		 */
		dispatchEvent(eventObj:any) : boolean;
		/**
		 * Indicates whether there is at least one listener for the specified event type.
		 */
		hasEventListener(type:string) : boolean;
		/**
		 * Indicates whether there is at least one listener for the specified event type on this object or any of its
		 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
		 * specified type is dispatched from this object, it will trigger at least one listener.
		 *
		 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
		 * event flow for a listener, not just this object.
		 */
		willTrigger(type:string) : boolean;
		toString() : string;
		/**
		 * Static initializer to mix EventDispatcher methods into a target object or prototype.
		 *
		 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
		 * 		EventDispatcher.initialize(myObject); // add to a specific instance
		 */
		static initialize(target:any) : void;
	}
	
	/**
	 * The base loader, which defines all the generic methods, properties, and events. All loaders extend this class,
	 * including the {{#crossLink "LoadQueue"}}{{/crossLink}}.
	 */
	export class AbstractLoader extends createjs.EventDispatcher
	{
		/**
		 * If the loader has completed loading. This provides a quick check, but also ensures that the different approaches
		 * used for loading do not pile up resulting in more than one `complete` {{#crossLink "Event"}}{{/crossLink}}.
		 */
		loaded : boolean;
		/**
		 * Determine if the loader was canceled. Canceled loads will not fire complete events. Note that this property
		 * is readonly, so {{#crossLink "LoadQueue"}}{{/crossLink}} queues should be closed using {{#crossLink "LoadQueue/close"}}{{/crossLink}}
		 * instead.
		 */
		canceled : boolean;
		/**
		 * The current load progress (percentage) for this item. This will be a number between 0 and 1.
		 *
		 * <h4>Example</h4>
		 *
		 *     var queue = new createjs.LoadQueue();
		 *     queue.loadFile("largeImage.png");
		 *     queue.on("progress", function() {
		 *         console.log("Progress:", queue.progress, event.progress);
		 *     });
		 */
		progress : number;
		/**
		 * The type of item this loader will load. See {{#crossLink "AbstractLoader"}}{{/crossLink}} for a full list of
		 * supported types.
		 */
		type : string;
		/**
		 * Defines a POST request, use for a method value when loading data.
		 */
		POST : string;
		/**
		 * Defines a GET request, use for a method value when loading data.
		 */
		GET : string;
		/**
		 * A custom result formatter function, which is called just before a request dispatches its complete event. Most
		 * loader types already have an internal formatter, but this can be user-overridden for custom formatting. The
		 * formatted result will be available on Loaders using {{#crossLink "getResult"}}{{/crossLink}}, and passing `true`.
		 */
		resultFormatter : any;
		/**
		 * Get a reference to the manifest item that is loaded by this loader. In some cases this will be the value that was
		 * passed into {{#crossLink "LoadQueue"}}{{/crossLink}} using {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} or
		 * {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}. However if only a String path was passed in, then it will
		 * be a {{#crossLink "LoadItem"}}{{/crossLink}}.
		 */
		getItem(value?:string) : any;
		/**
		 * Get a reference to the content that was loaded by the loader (only available after the {{#crossLink "complete:event"}}{{/crossLink}}
		 * event is dispatched.
		 */
		getResult(raw?:any, rawResult?:boolean) : any;
		/**
		 * Return the `tag` this object creates or uses for loading.
		 */
		getTag() : any;
		/**
		 * Set the `tag` this item uses for loading.
		 */
		setTag(tag:any) : void;
		/**
		 * Begin loading the item. This method is required when using a loader by itself.
		 *
		 * <h4>Example</h4>
		 *
		 *      var queue = new createjs.LoadQueue();
		 *      queue.on("complete", handleComplete);
		 *      queue.loadManifest(fileArray, false); // Note the 2nd argument that tells the queue not to start loading yet
		 *      queue.load();
		 */
		load() : void;
		/**
		 * Close the the item. This will stop any open requests (although downloads using HTML tags may still continue in
		 * the background), but events will not longer be dispatched.
		 */
		cancel() : void;
		/**
		 * Clean up the loader.
		 */
		destroy() : void;
		/**
		 * Get any items loaded internally by the loader. The enables loaders such as {{#crossLink "ManifestLoader"}}{{/crossLink}}
		 * to expose items it loads internally.
		 */
		getLoadedItems() : any[];
		toString() : string;
		/**
		 * The preload type for generic binary types. Note that images are loaded as binary files when using XHR.
		 */
		static BINARY : string;
		/**
		 * The preload type for css files. CSS files are loaded using a &lt;link&gt; when loaded with XHR, or a
		 * &lt;style&gt; tag when loaded with tags.
		 */
		static CSS : string;
		/**
		 * The preload type for image files, usually png, gif, or jpg/jpeg. Images are loaded into an &lt;image&gt; tag.
		 */
		static IMAGE : string;
		/**
		 * The preload type for javascript files, usually with the "js" file extension. JavaScript files are loaded into a
		 * &lt;script&gt; tag.
		 *
		 * Since version 0.4.1+, due to how tag-loaded scripts work, all JavaScript files are automatically injected into
		 * the body of the document to maintain parity between XHR and tag-loaded scripts. In version 0.4.0 and earlier,
		 * only tag-loaded scripts are injected.
		 */
		static JAVASCRIPT : string;
		/**
		 * The preload type for json files, usually with the "json" file extension. JSON data is loaded and parsed into a
		 * JavaScript object. Note that if a `callback` is present on the load item, the file will be loaded with JSONP,
		 * no matter what the {{#crossLink "LoadQueue/preferXHR:property"}}{{/crossLink}} property is set to, and the JSON
		 * must contain a matching wrapper function.
		 */
		static JSON : string;
		/**
		 * The preload type for jsonp files, usually with the "json" file extension. JSON data is loaded and parsed into a
		 * JavaScript object. You are required to pass a callback parameter that matches the function wrapper in the JSON.
		 * Note that JSONP will always be used if there is a callback present, no matter what the {{#crossLink "LoadQueue/preferXHR:property"}}{{/crossLink}}
		 * property is set to.
		 */
		static JSONP : string;
		/**
		 * The preload type for json-based manifest files, usually with the "json" file extension. The JSON data is loaded
		 * and parsed into a JavaScript object. PreloadJS will then look for a "manifest" property in the JSON, which is an
		 * Array of files to load, following the same format as the {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}
		 * method. If a "callback" is specified on the manifest object, then it will be loaded using JSONP instead,
		 * regardless of what the {{#crossLink "LoadQueue/preferXHR:property"}}{{/crossLink}} property is set to.
		 */
		static MANIFEST : string;
		/**
		 * The preload type for sound files, usually mp3, ogg, or wav. When loading via tags, audio is loaded into an
		 * &lt;audio&gt; tag.
		 */
		static SOUND : string;
		/**
		 * The preload type for video files, usually mp4, ts, or ogg. When loading via tags, video is loaded into an
		 * &lt;video&gt; tag.
		 */
		static VIDEO : string;
		/**
		 * The preload type for SpriteSheet files. SpriteSheet files are JSON files that contain string image paths.
		 */
		static SPRITESHEET : string;
		/**
		 * The preload type for SVG files.
		 */
		static SVG : string;
		/**
		 * The preload type for text files, which is also the default file type if the type can not be determined. Text is
		 * loaded as raw text.
		 */
		static TEXT : string;
		/**
		 * The preload type for xml files. XML is loaded into an XML document.
		 */
		static XML : string;
	}
	
	/**
	 * The AbstractMediaLoader is a base class that handles some of the shared methods and properties of loaders that
	 * handle HTML media elements, such as Video and Audio.
	 */
	export class AbstractMediaLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean, type:string);
	}
	
	/**
	 * A default plugin class used as a base for all other plugins.
	 */
	export class AbstractPlugin
	{
		constructor();
		/**
		 * Pre-register a sound for preloading and setup. This is called by {{#crossLink "Sound"}}{{/crossLink}}.
		 * Note all plugins provide a <code>SoundLoader</code> instance, which <a href="http://preloadjs.com" target="_blank">PreloadJS</a>
		 * can use to assist with preloading.
		 */
		register(loadItem:string, instances:number) : any;
		/**
		 * Internally preload a sound.
		 */
		preload(loader:createjs.SoundLoader) : void;
		/**
		 * Checks if preloading has started for a specific source. If the source is found, we can assume it is loading,
		 * or has already finished loading.
		 */
		isPreloadStarted(src:string) : boolean;
		/**
		 * Checks if preloading has finished for a specific source.
		 */
		isPreloadComplete(src:string) : boolean;
		/**
		 * Remove a sound added using {{#crossLink "WebAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
		 */
		removeSound(src:string) : void;
		/**
		 * Remove all sounds added using {{#crossLink "WebAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
		 */
		removeAllSounds(src:string) : void;
		/**
		 * Create a sound instance. If the sound has not been preloaded, it is internally preloaded here.
		 */
		create(src:string, startTime:number, duration:number) : createjs.AbstractSoundInstance;
		/**
		 * Set the master volume of the plugin, which affects all SoundInstances.
		 */
		setVolume(value:number) : boolean;
		/**
		 * Get the master volume of the plugin, which affects all SoundInstances.
		 */
		getVolume() : number;
		/**
		 * Mute all sounds via the plugin.
		 */
		setMute(value:boolean) : boolean;
		/**
		 * Determine if the plugin can be used in the current browser/OS.
		 */
		static isSupported() : boolean;
	}
	
	/**
	 * A base class for actual data requests, such as {{#crossLink "XHRRequest"}}{{/crossLink}}, {{#crossLink "TagRequest"}}{{/crossLink}},
	 * and {{#crossLink "MediaRequest"}}{{/crossLink}}. PreloadJS loaders will typically use a data loader under the
	 * hood to get data.
	 */
	export class AbstractRequest
	{
		constructor(item:createjs.LoadItem);
		/**
		 * Begin a load.
		 */
		load() : void;
		/**
		 * Clean up a request.
		 */
		destroy() : void;
		/**
		 * Cancel an in-progress request.
		 */
		cancel() : void;
	}
	
	/**
	 * A AbstractSoundInstance is created when any calls to the Sound API method {{#crossLink "Sound/play"}}{{/crossLink}} or
	 * {{#crossLink "Sound/createInstance"}}{{/crossLink}} are made. The AbstractSoundInstance is returned by the active plugin
	 * for control by the user.
	 *
	 * <h4>Example</h4>
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *
	 * A number of additional parameters provide a quick way to determine how a sound is played. Please see the Sound
	 * API method {{#crossLink "Sound/play"}}{{/crossLink}} for a list of arguments.
	 *
	 * Once a AbstractSoundInstance is created, a reference can be stored that can be used to control the audio directly through
	 * the AbstractSoundInstance. If the reference is not stored, the AbstractSoundInstance will play out its audio (and any loops), and
	 * is then de-referenced from the {{#crossLink "Sound"}}{{/crossLink}} class so that it can be cleaned up. If audio
	 * playback has completed, a simple call to the {{#crossLink "AbstractSoundInstance/play"}}{{/crossLink}} instance method
	 * will rebuild the references the Sound class need to control it.
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3", {loop:2});
	 *      myInstance.on("loop", handleLoop);
	 *      function handleLoop(event) {
	 *          myInstance.volume = myInstance.volume * 0.5;
	 *      }
	 *
	 * Events are dispatched from the instance to notify when the sound has completed, looped, or when playback fails
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *      myInstance.on("complete", handleComplete);
	 *      myInstance.on("loop", handleLoop);
	 *      myInstance.on("failed", handleFailed);
	 */
	export class AbstractSoundInstance extends createjs.EventDispatcher
	{
		constructor(src:string, startTime:number, duration:number, playbackResource:any);
		/**
		 * The source of the sound.
		 */
		src : string;
		/**
		 * The unique ID of the instance. This is set by {{#crossLink "Sound"}}{{/crossLink}}.
		 */
		uniqueId : any;
		/**
		 * The play state of the sound. Play states are defined as constants on {{#crossLink "Sound"}}{{/crossLink}}.
		 */
		playState : string;
		/**
		 * The volume of the sound, between 0 and 1.
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower and Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "AbstractSoundInstance/setVolume"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/getVolume"}}{{/crossLink}}.
		 *
		 * The actual output volume of a sound can be calculated using:
		 * <code>myInstance.volume * createjs.Sound.getVolume();</code>
		 */
		volume : number;
		/**
		 * The pan of the sound, between -1 (left) and 1 (right). Note that pan is not supported by HTML Audio.
		 *
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "AbstractSoundInstance/setPan"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/getPan"}}{{/crossLink}}.
		 * <br />Note in WebAudioPlugin this only gives us the "x" value of what is actually 3D audio.
		 */
		pan : number;
		/**
		 * The length of the audio clip, in milliseconds.
		 *
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "AbstractSoundInstance/setDuration"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/getDuration"}}{{/crossLink}}.
		 */
		duration : number;
		/**
		 * Object that holds plugin specific resource need for audio playback.
		 * This is set internally by the plugin.  For example, WebAudioPlugin will set an array buffer,
		 * HTMLAudioPlugin will set a tag, FlashAudioPlugin will set a flash reference.
		 */
		playbackResource : any;
		/**
		 * The position of the playhead in milliseconds. This can be set while a sound is playing, paused, or stopped.
		 *
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "AbstractSoundInstance/setPosition"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/getPosition"}}{{/crossLink}}.
		 */
		position : number;
		/**
		 * The number of play loops remaining. Negative values will loop infinitely.
		 *
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "AbstractSoundInstance/setLoop"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/getLoop"}}{{/crossLink}}.
		 */
		loop : number;
		/**
		 * Determines if the audio is currently muted.
		 *
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "AbstractSoundInstance/setMute"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/getMute"}}{{/crossLink}}.
		 */
		muted : boolean;
		/**
		 * Tells you if the audio is currently paused.
		 *
		 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
		 * and Internet Explorer 8 or lower.
		 * Use {{#crossLink "AbstractSoundInstance/pause:method"}}{{/crossLink}} and {{#crossLink "AbstractSoundInstance/resume:method"}}{{/crossLink}} to set.
		 */
		paused : boolean;
		/**
		 * Play an instance. This method is intended to be called on SoundInstances that already exist (created
		 * with the Sound API {{#crossLink "Sound/createInstance"}}{{/crossLink}} or {{#crossLink "Sound/play"}}{{/crossLink}}).
		 *
		 * <h4>Example</h4>
		 *
		 *      var myInstance = createjs.Sound.createInstance(mySrc);
		 *      myInstance.play({offset:1, loop:2, pan:0.5});	// options as object properties
		 *      myInstance.play(createjs.Sound.INTERRUPT_ANY);	// options as parameters
		 *
		 * Note that if this sound is already playing, this call will do nothing.
		 */
		play(interrupt?:any, delay?:number, offset?:number, loop?:number, volume?:number, pan?:number) : createjs.AbstractSoundInstance;
		/**
		 * Stop playback of the instance. Stopped sounds will reset their position to 0, and calls to {{#crossLink "AbstractSoundInstance/resume"}}{{/crossLink}}
		 * will fail.  To start playback again, call {{#crossLink "AbstractSoundInstance/play"}}{{/crossLink}}.
		 *
		 * <h4>Example</h4>
		 *
		 *     myInstance.stop();
		 */
		stop() : createjs.AbstractSoundInstance;
		/**
		 * Remove all external references and resources from AbstractSoundInstance.  Note this is irreversible and AbstractSoundInstance will no longer work
		 */
		destroy() : void;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/paused:property"}}{{/crossLink}} can be accessed directly as a property,
		 * and getPaused remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Returns true if the instance is currently paused.
		 */
		getPaused() : boolean;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/paused:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setPaused remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Pause or resume the instance.  Note you can also resume playback with {{#crossLink "AbstractSoundInstance/play"}}{{/crossLink}}.
		 */
		setPaused(value:boolean) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/volume:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setVolume remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Set the volume of the instance.
		 *
		 * <h4>Example</h4>
		 *
		 *      myInstance.setVolume(0.5);
		 *
		 * Note that the master volume set using the Sound API method {{#crossLink "Sound/setVolume"}}{{/crossLink}}
		 * will be applied to the instance volume.
		 */
		setVolume(value:number) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/volume:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getVolume remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Get the volume of the instance. The actual output volume of a sound can be calculated using:
		 * <code>myInstance.getVolume() * createjs.Sound.getVolume();</code>
		 */
		getVolume() : number;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/muted:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setMuted exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Mute and unmute the sound. Muted sounds will still play at 0 volume. Note that an unmuted sound may still be
		 * silent depending on {{#crossLink "Sound"}}{{/crossLink}} volume, instance volume, and Sound muted.
		 *
		 * <h4>Example</h4>
		 *
		 *     myInstance.setMuted(true);
		 */
		setMute(value:boolean) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/muted:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getMuted remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Get the mute value of the instance.
		 *
		 * <h4>Example</h4>
		 *
		 *      var isMuted = myInstance.getMuted();
		 */
		getMute() : boolean;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/pan:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getPan remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Set the left(-1)/right(+1) pan of the instance. Note that {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}} does not
		 * support panning, and only simple left/right panning has been implemented for {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.
		 * The default pan value is 0 (center).
		 *
		 * <h4>Example</h4>
		 *
		 *     myInstance.setPan(-1);  // to the left!
		 */
		setPan(value:number) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/pan:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getPan remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Get the left/right pan of the instance. Note in WebAudioPlugin this only gives us the "x" value of what is
		 * actually 3D audio.
		 *
		 * <h4>Example</h4>
		 *
		 *     var myPan = myInstance.getPan();
		 */
		getPan() : number;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/position:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getPosition remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Get the position of the playhead of the instance in milliseconds.
		 *
		 * <h4>Example</h4>
		 *
		 *     var currentOffset = myInstance.getPosition();
		 */
		getPosition() : number;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/position:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setPosition remains to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Set the position of the playhead in the instance. This can be set while a sound is playing, paused, or
		 * stopped.
		 *
		 * <h4>Example</h4>
		 *
		 *      myInstance.setPosition(myInstance.getDuration()/2); // set audio to its halfway point.
		 */
		setPosition(value:number) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/duration:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getDuration exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Get the duration of the instance, in milliseconds.
		 * Note a sound needs to be loaded before it will have duration, unless it was set manually to create an audio sprite.
		 *
		 * <h4>Example</h4>
		 *
		 *     var soundDur = myInstance.getDuration();
		 */
		getDuration() : number;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/duration:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setDuration exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Set the duration of the audio.  Generally this is not called, but it can be used to create an audio sprite out of an existing AbstractSoundInstance.
		 */
		setDuration(value:number) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/playbackResource:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setPlaybackResource exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * An object containing any resources needed for audio playback, set by the plugin.
		 * Only meant for use by advanced users.
		 */
		setPlaybackResource(value:any) : createjs.AbstractSoundInstance;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/playbackResource:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getPlaybackResource exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * An object containing any resources needed for audio playback, usually set by the plugin.
		 */
		getPlaybackResource(value:any) : any;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/loop:property"}}{{/crossLink}} can be accessed directly as a property,
		 * getLoop exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * The number of play loops remaining. Negative values will loop infinitely.
		 */
		getLoop() : number;
		/**
		 * NOTE {{#crossLink "AbstractSoundInstance/loop:property"}}{{/crossLink}} can be accessed directly as a property,
		 * setLoop exists to allow support for IE8 with FlashAudioPlugin.
		 *
		 * Set the number of play loops remaining.
		 */
		setLoop(value:number) : void;
	}
	
	/**
	 * Base class that all filters should inherit from. Filters need to be applied to objects that have been cached using
	 * the {{#crossLink "DisplayObject/cache"}}{{/crossLink}} method. If an object changes, please cache it again, or use
	 * {{#crossLink "DisplayObject/updateCache"}}{{/crossLink}}. Note that the filters must be applied before caching.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.filters = [
	 *          new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0),
	 *          new createjs.BlurFilter(5, 5, 10)
	 *      ];
	 *      myInstance.cache(0,0, 100, 100);
	 *
	 * Note that each filter can implement a {{#crossLink "Filter/getBounds"}}{{/crossLink}} method, which returns the
	 * margins that need to be applied in order to fully display the filter. For example, the {{#crossLink "BlurFilter"}}{{/crossLink}}
	 * will cause an object to feather outwards, resulting in a margin around the shape.
	 *
	 * <h4>EaselJS Filters</h4>
	 * EaselJS comes with a number of pre-built filters. Note that individual filters are not compiled into the minified
	 * version of EaselJS. To use them, you must include them manually in the HTML.
	 * <ul><li>{{#crossLink "AlphaMapFilter"}}{{/crossLink}} : Map a greyscale image to the alpha channel of a display object</li>
	 *      <li>{{#crossLink "AlphaMaskFilter"}}{{/crossLink}}: Map an image's alpha channel to the alpha channel of a display object</li>
	 *      <li>{{#crossLink "BlurFilter"}}{{/crossLink}}: Apply vertical and horizontal blur to a display object</li>
	 *      <li>{{#crossLink "ColorFilter"}}{{/crossLink}}: Color transform a display object</li>
	 *      <li>{{#crossLink "ColorMatrixFilter"}}{{/crossLink}}: Transform an image using a {{#crossLink "ColorMatrix"}}{{/crossLink}}</li>
	 * </ul>
	 */
	export class Filter
	{
		constructor();
		/**
		 * Provides padding values for this filter. That is, how much the filter will extend the visual bounds of an object it is applied to.
		 */
		getBounds(rect?:createjs.Rectangle) : createjs.Rectangle;
		/**
		 * Applies the filter to the specified context.
		 */
		applyFilter(ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, targetCtx?:CanvasRenderingContext2D, targetX?:number, targetY?:number) : boolean;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * Returns a clone of this Filter instance.
		 */
		clone() : createjs.Filter;
	}
	
	/**
	 * Applies a greyscale alpha map image (or canvas) to the target, such that the alpha channel of the result will
	 * be copied from the red channel of the map, and the RGB channels will be copied from the target.
	 *
	 * Generally, it is recommended that you use {{#crossLink "AlphaMaskFilter"}}{{/crossLink}}, because it has much
	 * better performance.
	 *
	 * <h4>Example</h4>
	 * This example draws a red->blue box, caches it, and then uses the cache canvas as an alpha map on a 100x100 image.
	 *
	 *       var box = new createjs.Shape();
	 *       box.graphics.beginLinearGradientFill(["#ff0000", "#0000ff"], [0, 1], 0, 0, 0, 100)
	 *       box.graphics.drawRect(0, 0, 100, 100);
	 *       box.cache(0, 0, 100, 100);
	 *
	 *       var bmp = new createjs.Bitmap("path/to/image.jpg");
	 *       bmp.filters = [
	 *           new createjs.AlphaMapFilter(box.cacheCanvas)
	 *       ];
	 *       bmp.cache(0, 0, 100, 100);
	 *       stage.addChild(bmp);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
	 */
	export class AlphaMapFilter extends createjs.Filter
	{
		constructor(alphaMap:any);
		/**
		 * The greyscale image (or canvas) to use as the alpha value for the result. This should be exactly the same
		 * dimensions as the target.
		 */
		alphaMap : any;
	}
	
	/**
	 * Applies the alpha from the mask image (or canvas) to the target, such that the alpha channel of the result will
	 * be derived from the mask, and the RGB channels will be copied from the target. This can be used, for example, to
	 * apply an alpha mask to a display object. This can also be used to combine a JPG compressed RGB image with a PNG32
	 * alpha mask, which can result in a much smaller file size than a single PNG32 containing ARGB.
	 *
	 * <b>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters correctly.</b>
	 *
	 * <h4>Example</h4>
	 * This example draws a gradient box, then caches it and uses the "cacheCanvas" as the alpha mask on a 100x100 image.
	 *
	 *      var box = new createjs.Shape();
	 *      box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, 100, 100)
	 *      box.graphics.drawRect(0, 0, 100, 100);
	 *      box.cache(0, 0, 100, 100);
	 *
	 *      var bmp = new createjs.Bitmap("path/to/image.jpg");
	 *      bmp.filters = [
	 *          new createjs.AlphaMaskFilter(box.cacheCanvas)
	 *      ];
	 *      bmp.cache(0, 0, 100, 100);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for more information on applying filters.
	 */
	export class AlphaMaskFilter extends createjs.Filter
	{
		constructor(mask:any);
		/**
		 * The image (or canvas) to use as the mask.
		 */
		mask : any;
		/**
		 * Applies the filter to the specified context.
		 *
		 * <strong>IMPORTANT NOTE: This filter currently does not support the targetCtx, or targetX/Y parameters
		 * correctly.</strong>
		 */
		applyFilter(ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, targetCtx?:CanvasRenderingContext2D, targetX?:number, targetY?:number) : boolean;
	}
	
	/**
	 * A loader for binary files. This is useful for loading web audio, or content that requires an ArrayBuffer.
	 */
	export class BinaryLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/BINARY:property"}}{{/crossLink}}
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * DisplayObject is an abstract class that should not be constructed directly. Instead construct subclasses such as
	 * {{#crossLink "Container"}}{{/crossLink}}, {{#crossLink "Bitmap"}}{{/crossLink}}, and {{#crossLink "Shape"}}{{/crossLink}}.
	 * DisplayObject is the base class for all display classes in the EaselJS library. It defines the core properties and
	 * methods that are shared between all display objects, such as transformation properties (x, y, scaleX, scaleY, etc),
	 * caching, and mouse handlers.
	 */
	export class DisplayObject extends createjs.EventDispatcher
	{
		constructor();
		/**
		 * The alpha (transparency) for this display object. 0 is fully transparent, 1 is fully opaque.
		 */
		alpha : number;
		/**
		 * If a cache is active, this returns the canvas that holds the cached version of this display object. See {{#crossLink "cache"}}{{/crossLink}}
		 * for more information.
		 */
		cacheCanvas : HTMLCanvasElement;
		/**
		 * Returns an ID number that uniquely identifies the current cache for this display object. This can be used to
		 * determine if the cache has changed since a previous check.
		 */
		cacheID : number;
		/**
		 * Unique ID for this display object. Makes display objects easier for some uses.
		 */
		id : number;
		/**
		 * Indicates whether to include this object when running mouse interactions. Setting this to `false` for children
		 * of a {{#crossLink "Container"}}{{/crossLink}} will cause events on the Container to not fire when that child is
		 * clicked. Setting this property to `false` does not prevent the {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}
		 * method from returning the child.
		 *
		 * <strong>Note:</strong> In EaselJS 0.7.0, the mouseEnabled property will not work properly with nested Containers. Please
		 * check out the latest NEXT version in <a href="https://github.com/CreateJS/EaselJS/tree/master/lib">GitHub</a> for an updated version with this issue resolved. The fix will be
		 * provided in the next release of EaselJS.
		 */
		mouseEnabled : boolean;
		/**
		 * If false, the tick will not run on this display object (or its children). This can provide some performance benefits.
		 * In addition to preventing the "tick" event from being dispatched, it will also prevent tick related updates
		 * on some display objects (ex. Sprite & MovieClip frame advancing, DOMElement visibility handling).
		 */
		tickEnabled : boolean;
		/**
		 * An optional name for this display object. Included in {{#crossLink "DisplayObject/toString"}}{{/crossLink}} . Useful for
		 * debugging.
		 */
		name : string;
		/**
		 * A reference to the {{#crossLink "Container"}}{{/crossLink}} or {{#crossLink "Stage"}}{{/crossLink}} object that
		 * contains this display object, or null if it has not been added
		 * to one.
		 */
		parent : createjs.Container;
		/**
		 * The left offset for this display object's registration point. For example, to make a 100x100px Bitmap rotate
		 * around its center, you would set regX and {{#crossLink "DisplayObject/regY:property"}}{{/crossLink}} to 50.
		 */
		regX : number;
		/**
		 * The y offset for this display object's registration point. For example, to make a 100x100px Bitmap rotate around
		 * its center, you would set {{#crossLink "DisplayObject/regX:property"}}{{/crossLink}} and regY to 50.
		 */
		regY : number;
		/**
		 * The rotation in degrees for this display object.
		 */
		rotation : number;
		/**
		 * The factor to stretch this display object horizontally. For example, setting scaleX to 2 will stretch the display
		 * object to twice its nominal width. To horizontally flip an object, set the scale to a negative number.
		 */
		scaleX : number;
		/**
		 * The factor to stretch this display object vertically. For example, setting scaleY to 0.5 will stretch the display
		 * object to half its nominal height. To vertically flip an object, set the scale to a negative number.
		 */
		scaleY : number;
		/**
		 * The factor to skew this display object horizontally.
		 */
		skewX : number;
		/**
		 * The factor to skew this display object vertically.
		 */
		skewY : number;
		/**
		 * A shadow object that defines the shadow to render on this display object. Set to `null` to remove a shadow. If
		 * null, this property is inherited from the parent container.
		 */
		shadow : createjs.Shadow;
		/**
		 * Indicates whether this display object should be rendered to the canvas and included when running the Stage
		 * {{#crossLink "Stage/getObjectsUnderPoint"}}{{/crossLink}} method.
		 */
		visible : boolean;
		/**
		 * The x (horizontal) position of the display object, relative to its parent.
		 */
		x : number;
		y : number;
		/**
		 * If set, defines the transformation for this display object, overriding all other transformation properties
		 * (x, y, rotation, scale, skew).
		 */
		transformMatrix : createjs.Matrix2D;
		/**
		 * The composite operation indicates how the pixels of this display object will be composited with the elements
		 * behind it. If `null`, this property is inherited from the parent container. For more information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#compositing">
		 * whatwg spec on compositing</a>.
		 */
		compositeOperation : string;
		/**
		 * Indicates whether the display object should be drawn to a whole pixel when
		 * {{#crossLink "Stage/snapToPixelEnabled"}}{{/crossLink}} is true. To enable/disable snapping on whole
		 * categories of display objects, set this value on the prototype (Ex. Text.prototype.snapToPixel = true).
		 */
		snapToPixel : boolean;
		/**
		 * An array of Filter objects to apply to this display object. Filters are only applied / updated when {{#crossLink "cache"}}{{/crossLink}}
		 * or {{#crossLink "updateCache"}}{{/crossLink}} is called on the display object, and only apply to the area that is
		 * cached.
		 */
		filters : any[];
		/**
		 * A Shape instance that defines a vector mask (clipping path) for this display object.  The shape's transformation
		 * will be applied relative to the display object's parent coordinates (as if it were a child of the parent).
		 */
		mask : createjs.Shape;
		/**
		 * A display object that will be tested when checking mouse interactions or testing {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}.
		 * The hit area will have its transformation applied relative to this display object's coordinate space (as though
		 * the hit test object were a child of this display object and relative to its regX/Y). The hitArea will be tested
		 * using only its own `alpha` value regardless of the alpha value on the target display object, or the target's
		 * ancestors (parents).
		 *
		 * If set on a {{#crossLink "Container"}}{{/crossLink}}, children of the Container will not receive mouse events.
		 * This is similar to setting {{#crossLink "mouseChildren"}}{{/crossLink}} to false.
		 *
		 * Note that hitArea is NOT currently used by the `hitTest()` method, nor is it supported for {{#crossLink "Stage"}}{{/crossLink}}.
		 */
		hitArea : createjs.DisplayObject;
		/**
		 * A CSS cursor (ex. "pointer", "help", "text", etc) that will be displayed when the user hovers over this display
		 * object. You must enable mouseover events using the {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}} method to
		 * use this property. Setting a non-null cursor on a Container will override the cursor set on its descendants.
		 */
		cursor : string;
		/**
		 * Returns the Stage instance that this display object will be rendered on, or null if it has not been added to one.
		 */
		stage : createjs.Stage;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns <code>true</code> if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Applies this display object's transformation, alpha, globalCompositeOperation, clipping path (mask), and shadow
		 * to the specified context. This is typically called prior to {{#crossLink "DisplayObject/draw"}}{{/crossLink}}.
		 */
		updateContext(ctx:CanvasRenderingContext2D) : void;
		/**
		 * Draws the display object into a new canvas, which is then used for subsequent draws. For complex content
		 * that does not change frequently (ex. a Container with many children that do not move, or a complex vector Shape),
		 * this can provide for much faster rendering because the content does not need to be re-rendered each tick. The
		 * cached display object can be moved, rotated, faded, etc freely, however if its content changes, you must
		 * manually update the cache by calling <code>updateCache()</code> or <code>cache()</code> again. You must specify
		 * the cache area via the x, y, w, and h parameters. This defines the rectangle that will be rendered and cached
		 * using this display object's coordinates.
		 *
		 * <h4>Example</h4>
		 * For example if you defined a Shape that drew a circle at 0, 0 with a radius of 25:
		 *
		 *      var shape = new createjs.Shape();
		 *      shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 25);
		 *      myShape.cache(-25, -25, 50, 50);
		 *
		 * Note that filters need to be defined <em>before</em> the cache is applied. Check out the {{#crossLink "Filter"}}{{/crossLink}}
		 * class for more information. Some filters (ex. BlurFilter) will not work as expected in conjunction with the scale param.
		 *
		 * Usually, the resulting cacheCanvas will have the dimensions width*scale by height*scale, however some filters (ex. BlurFilter)
		 * will add padding to the canvas dimensions.
		 */
		cache(x:number, y:number, width:number, height:number, scale?:number) : void;
		/**
		 * Redraws the display object to its cache. Calling updateCache without an active cache will throw an error.
		 * If compositeOperation is null the current cache will be cleared prior to drawing. Otherwise the display object
		 * will be drawn over the existing cache using the specified compositeOperation.
		 *
		 * <h4>Example</h4>
		 * Clear the current graphics of a cached shape, draw some new instructions, and then update the cache. The new line
		 * will be drawn on top of the old one.
		 *
		 *      // Not shown: Creating the shape, and caching it.
		 *      shapeInstance.clear();
		 *      shapeInstance.setStrokeStyle(3).beginStroke("#ff0000").moveTo(100, 100).lineTo(200,200);
		 *      shapeInstance.updateCache();
		 */
		updateCache(compositeOperation:string) : void;
		/**
		 * Clears the current cache. See {{#crossLink "DisplayObject/cache"}}{{/crossLink}} for more information.
		 */
		uncache() : void;
		/**
		 * Returns a data URL for the cache, or null if this display object is not cached.
		 * Uses cacheID to ensure a new data URL is not generated if the cache has not changed.
		 */
		getCacheDataURL() : string;
		/**
		 * Transforms the specified x and y position from the coordinate space of the display object
		 * to the global (stage) coordinate space. For example, this could be used to position an HTML label
		 * over a specific point on a nested display object. Returns a Point instance with x and y properties
		 * correlating to the transformed coordinates on the stage.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.x = 300;
		 *      displayObject.y = 200;
		 *      stage.addChild(displayObject);
		 *      var point = myDisplayObject.localToGlobal(100, 100);
		 *      // Results in x=400, y=300
		 */
		localToGlobal(x:number, y:number, pt?:any) : createjs.Point;
		/**
		 * Transforms the specified x and y position from the global (stage) coordinate space to the
		 * coordinate space of the display object. For example, this could be used to determine
		 * the current mouse position within the display object. Returns a Point instance with x and y properties
		 * correlating to the transformed position in the display object's coordinate space.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.x = 300;
		 *      displayObject.y = 200;
		 *      stage.addChild(displayObject);
		 *      var point = myDisplayObject.globalToLocal(100, 100);
		 *      // Results in x=-200, y=-100
		 */
		globalToLocal(x:number, y:number, pt?:any) : createjs.Point;
		/**
		 * Transforms the specified x and y position from the coordinate space of this display object to the coordinate
		 * space of the target display object. Returns a Point instance with x and y properties correlating to the
		 * transformed position in the target's coordinate space. Effectively the same as using the following code with
		 * {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}} and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
		 *
		 *      var pt = this.localToGlobal(x, y);
		 *      pt = target.globalToLocal(pt.x, pt.y);
		 */
		localToLocal(x:number, y:number, target:createjs.DisplayObject, pt?:any) : createjs.Point;
		/**
		 * Shortcut method to quickly set the transform properties on the display object. All parameters are optional.
		 * Omitted parameters will have the default value set.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.setTransform(100, 100, 2, 2);
		 */
		setTransform(x?:number, y?:number, scaleX?:number, scaleY?:number, rotation?:number, skewX?:number, skewY?:number, regX?:number, regY?:number) : createjs.DisplayObject;
		/**
		 * Returns a matrix based on this object's current transform.
		 */
		getMatrix(matrix?:createjs.Matrix2D) : createjs.Matrix2D;
		/**
		 * Generates a Matrix2D object representing the combined transform of the display object and all of its
		 * parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}). This can
		 * be used to transform positions between coordinate spaces, such as with {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
		 * and {{#crossLink "DisplayObject/globalToLocal"}}{{/crossLink}}.
		 */
		getConcatenatedMatrix(matrix?:createjs.Matrix2D) : createjs.Matrix2D;
		/**
		 * Generates a DisplayProps object representing the combined display properties of the  object and all of its
		 * parent Containers up to the highest level ancestor (usually the {{#crossLink "Stage"}}{{/crossLink}}).
		 */
		getConcatenatedDisplayProps(props?:createjs.DisplayProps) : createjs.DisplayProps;
		/**
		 * Tests whether the display object intersects the specified point in local coordinates (ie. draws a pixel with alpha > 0 at
		 * the specified position). This ignores the alpha, shadow, hitArea, mask, and compositeOperation of the display object.
		 *
		 * <h4>Example</h4>
		 *
		 *      stage.addEventListener("stagemousedown", handleMouseDown);
		 *      function handleMouseDown(event) {
		 *          var hit = myShape.hitTest(event.stageX, event.stageY);
		 *      }
		 *
		 * Please note that shape-to-shape collision is not currently supported by EaselJS.
		 */
		hitTest(x:number, y:number) : boolean;
		/**
		 * Provides a chainable shortcut method for setting a number of properties on the instance.
		 *
		 * <h4>Example</h4>
		 *
		 *      var myGraphics = new createjs.Graphics().beginFill("#ff0000").drawCircle(0, 0, 25);
		 *      var shape = stage.addChild(new Shape()).set({graphics:myGraphics, x:100, y:100, alpha:0.5});
		 */
		set(props:any) : createjs.DisplayObject;
		/**
		 * Returns a rectangle representing this object's bounds in its local coordinate system (ie. with no transformation).
		 * Objects that have been cached will return the bounds of the cache.
		 *
		 * Not all display objects can calculate their own bounds (ex. Shape). For these objects, you can use
		 * {{#crossLink "DisplayObject/setBounds"}}{{/crossLink}} so that they are included when calculating Container
		 * bounds.
		 *
		 * <table>
		 * 	<tr><td><b>All</b></td><td>
		 * 		All display objects support setting bounds manually using setBounds(). Likewise, display objects that
		 * 		have been cached using cache() will return the bounds of their cache. Manual and cache bounds will override
		 * 		the automatic calculations listed below.
		 * 	</td></tr>
		 * 	<tr><td><b>Bitmap</b></td><td>
		 * 		Returns the width and height of the sourceRect (if specified) or image, extending from (x=0,y=0).
		 * 	</td></tr>
		 * 	<tr><td><b>Sprite</b></td><td>
		 * 		Returns the bounds of the current frame. May have non-zero x/y if a frame registration point was specified
		 * 		in the spritesheet data. See also {{#crossLink "SpriteSheet/getFrameBounds"}}{{/crossLink}}
		 * 	</td></tr>
		 * 	<tr><td><b>Container</b></td><td>
		 * 		Returns the aggregate (combined) bounds of all children that return a non-null value from getBounds().
		 * 	</td></tr>
		 * 	<tr><td><b>Shape</b></td><td>
		 * 		Does not currently support automatic bounds calculations. Use setBounds() to manually define bounds.
		 * 	</td></tr>
		 * 	<tr><td><b>Text</b></td><td>
		 * 		Returns approximate bounds. Horizontal values (x/width) are quite accurate, but vertical values (y/height) are
		 * 		not, especially when using textBaseline values other than "top".
		 * 	</td></tr>
		 * 	<tr><td><b>BitmapText</b></td><td>
		 * 		Returns approximate bounds. Values will be more accurate if spritesheet frame registration points are close
		 * 		to (x=0,y=0).
		 * 	</td></tr>
		 * </table>
		 *
		 * Bounds can be expensive to calculate for some objects (ex. text, or containers with many children), and
		 * are recalculated each time you call getBounds(). You can prevent recalculation on static objects by setting the
		 * bounds explicitly:
		 *
		 * 	var bounds = obj.getBounds();
		 * 	obj.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
		 * 	// getBounds will now use the set values, instead of recalculating
		 *
		 * To reduce memory impact, the returned Rectangle instance may be reused internally; clone the instance or copy its
		 * values if you need to retain it.
		 *
		 * 	var myBounds = obj.getBounds().clone();
		 * 	// OR:
		 * 	myRect.copy(obj.getBounds());
		 */
		getBounds() : createjs.Rectangle;
		/**
		 * Returns a rectangle representing this object's bounds in its parent's coordinate system (ie. with transformations applied).
		 * Objects that have been cached will return the transformed bounds of the cache.
		 *
		 * Not all display objects can calculate their own bounds (ex. Shape). For these objects, you can use
		 * {{#crossLink "DisplayObject/setBounds"}}{{/crossLink}} so that they are included when calculating Container
		 * bounds.
		 *
		 * To reduce memory impact, the returned Rectangle instance may be reused internally; clone the instance or copy its
		 * values if you need to retain it.
		 *
		 * Container instances calculate aggregate bounds for all children that return bounds via getBounds.
		 */
		getTransformedBounds() : createjs.Rectangle;
		/**
		 * Allows you to manually specify the bounds of an object that either cannot calculate their own bounds (ex. Shape &
		 * Text) for future reference, or so the object can be included in Container bounds. Manually set bounds will always
		 * override calculated bounds.
		 *
		 * The bounds should be specified in the object's local (untransformed) coordinates. For example, a Shape instance
		 * with a 25px radius circle centered at 0,0 would have bounds of (-25, -25, 50, 50).
		 */
		setBounds(x:number, y:number, width:number, height:number) : void;
		/**
		 * Returns a clone of this DisplayObject. Some properties that are specific to this instance's current context are
		 * reverted to their defaults (for example .parent). Caches are not maintained across clones, and some elements
		 * are copied by reference (masks, individual filter instances, hit area)
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * Suppresses errors generated when using features like hitTest, mouse events, and {{#crossLink "getObjectsUnderPoint"}}{{/crossLink}}
		 * with cross domain content.
		 */
		static suppressCrossDomainErrors : boolean;
	}
	
	/**
	 * A Bitmap represents an Image, Canvas, or Video in the display list. A Bitmap can be instantiated using an existing
	 * HTML element, or a string.
	 *
	 * <h4>Example</h4>
	 *
	 *      var bitmap = new createjs.Bitmap("imagePath.jpg");
	 *
	 * <strong>Notes:</strong>
	 * <ol>
	 *     <li>When a string path or image tag that is not yet loaded is used, the stage may need to be redrawn before it
	 *      will be displayed.</li>
	 *     <li>Bitmaps with an SVG source currently will not respect an alpha value other than 0 or 1. To get around this,
	 *     the Bitmap can be cached.</li>
	 *     <li>Bitmaps with an SVG source will taint the canvas with cross-origin data, which prevents interactivity. This
	 *     happens in all browsers except recent Firefox builds.</li>
	 *     <li>Images loaded cross-origin will throw cross-origin security errors when interacted with using a mouse, using
	 *     methods such as `getObjectUnderPoint`, or using filters, or caching. You can get around this by setting
	 *     `crossOrigin` flags on your images before passing them to EaselJS, eg: `img.crossOrigin="Anonymous";`</li>
	 * </ol>
	 */
	export class Bitmap extends createjs.DisplayObject
	{
		constructor(imageOrUri:any);
		/**
		 * The image to render. This can be an Image, a Canvas, or a Video. Not all browsers (especially
		 * mobile browsers) support drawing video to a canvas.
		 */
		image : any;
		/**
		 * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
		 * Note that video sources must have a width / height set to work correctly with `sourceRect`.
		 */
		sourceRect : createjs.Rectangle;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
		 *
		 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
		 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
		 * method.
		 */
		cache(x:number, y:number, width:number, height:number, scale?:number) : void;
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
		 *
		 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
		 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
		 * method.
		 */
		updateCache(compositeOperation:string) : void;
		/**
		 * Because the content of a Bitmap is already in a simple format, cache is unnecessary for Bitmap instances.
		 * You should <b>not</b> cache Bitmap instances as it can degrade performance.
		 *
		 * <strong>However: If you want to use a filter on a Bitmap, you <em>MUST</em> cache it, or it will not work.</strong>
		 * To see the API for caching, please visit the DisplayObject {{#crossLink "DisplayObject/cache"}}{{/crossLink}}
		 * method.
		 */
		uncache() : void;
		/**
		 * Returns a clone of the Bitmap instance.
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * Displays text using bitmap glyphs defined in a sprite sheet. Multi-line text is supported
	 * using new line characters, but automatic wrapping is not supported. See the
	 * {{#crossLink "BitmapText/spriteSheet:property"}}{{/crossLink}}
	 * property for more information on defining glyphs.
	 *
	 * <strong>Important:</strong> BitmapText extends Container, but is not designed to be used as one.
	 * As such, methods like addChild and removeChild are disabled.
	 */
	export class BitmapText extends createjs.DisplayObject
	{
		constructor(text?:string, spriteSheet?:createjs.SpriteSheet);
		/**
		 * The text to display.
		 */
		text : string;
		/**
		 * A SpriteSheet instance that defines the glyphs for this bitmap text. Each glyph/character
		 * should have a single frame animation defined in the sprite sheet named the same as
		 * corresponding character. For example, the following animation definition:
		 *
		 * 		"A": {frames: [0]}
		 *
		 * would indicate that the frame at index 0 of the spritesheet should be drawn for the "A" character. The short form
		 * is also acceptable:
		 *
		 * 		"A": 0
		 *
		 * Note that if a character in the text is not found in the sprite sheet, it will also
		 * try to use the alternate case (upper or lower).
		 *
		 * See SpriteSheet for more information on defining sprite sheet data.
		 */
		spriteSheet : string;
		/**
		 * The height of each line of text. If 0, then it will use a line height calculated
		 * by checking for the height of the "1", "T", or "L" character (in that order). If
		 * those characters are not defined, it will use the height of the first frame of the
		 * sprite sheet.
		 */
		lineHeight : number;
		/**
		 * This spacing (in pixels) will be added after each character in the output.
		 */
		letterSpacing : number;
		/**
		 * If a space character is not defined in the sprite sheet, then empty pixels equal to
		 * spaceWidth will be inserted instead. If 0, then it will use a value calculated
		 * by checking for the width of the "1", "l", "E", or "A" character (in that order). If
		 * those characters are not defined, it will use the width of the first frame of the
		 * sprite sheet.
		 */
		spaceWidth : number;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * <strong>Disabled in BitmapText.</strong>
		 */
		addChild() : void;
		/**
		 * <strong>Disabled in BitmapText.</strong>
		 */
		addChildAt() : void;
		/**
		 * <strong>Disabled in BitmapText.</strong>
		 */
		removeChild() : void;
		/**
		 * <strong>Disabled in BitmapText.</strong>
		 */
		removeChildAt() : void;
		/**
		 * <strong>Disabled in BitmapText.</strong>
		 */
		removeAllChildren() : void;
		/**
		 * BitmapText uses Sprite instances to draw text. To reduce the creation and destruction of instances (and thus garbage collection), it maintains
		 * an internal object pool of sprite instances to reuse. Increasing this value can cause more sprites to be
		 * retained, slightly increasing memory use, but reducing instantiation.
		 */
		static maxPoolSize : number;
	}
	
	/**
	 * Applies a box blur to DisplayObjects. Note that this filter is fairly CPU intensive, particularly if the quality is
	 * set higher than 1.
	 *
	 * <h4>Example</h4>
	 * This example creates a red circle, and then applies a 5 pixel blur to it. It uses the {{#crossLink "Filter/getBounds"}}{{/crossLink}}
	 * method to account for the spread that the blur causes.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      var blurFilter = new createjs.BlurFilter(5, 5, 1);
	 *      shape.filters = [blurFilter];
	 *      var bounds = blurFilter.getBounds();
	 *
	 *      shape.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 */
	export class BlurFilter extends createjs.Filter
	{
		constructor(blurX?:number, blurY?:number, quality?:number);
		/**
		 * Horizontal blur radius in pixels
		 */
		blurX : number;
		/**
		 * Vertical blur radius in pixels
		 */
		blurY : number;
		/**
		 * Number of blur iterations. For example, a value of 1 will produce a rough blur. A value of 2 will produce a
		 * smoother blur, but take twice as long to run.
		 */
		quality : number;
	}
	
	/**
	 * The ButtonHelper is a helper class to create interactive buttons from {{#crossLink "MovieClip"}}{{/crossLink}} or
	 * {{#crossLink "Sprite"}}{{/crossLink}} instances. This class will intercept mouse events from an object, and
	 * automatically call {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} or {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}},
	 * to the respective animation labels, add a pointer cursor, and allows the user to define a hit state frame.
	 *
	 * The ButtonHelper instance does not need to be added to the stage, but a reference should be maintained to prevent
	 * garbage collection.
	 *
	 * Note that over states will not work unless you call {{#crossLink "Stage/enableMouseOver"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      var helper = new createjs.ButtonHelper(myInstance, "out", "over", "down", false, myInstance, "hit");
	 *      myInstance.addEventListener("click", handleClick);
	 *      function handleClick(event) {
	 *          // Click Happened.
	 *      }
	 */
	export class ButtonHelper
	{
		constructor(target:any, outLabel?:string, overLabel?:string, downLabel?:string, play?:boolean, hitArea?:createjs.DisplayObject, hitLabel?:string);
		/**
		 * The target for this button helper.
		 */
		target : any;
		/**
		 * The label name or frame number to display when the user mouses out of the target. Defaults to "over".
		 */
		overLabel : any;
		/**
		 * The label name or frame number to display when the user mouses over the target. Defaults to "out".
		 */
		outLabel : any;
		/**
		 * The label name or frame number to display when the user presses on the target. Defaults to "down".
		 */
		downLabel : any;
		/**
		 * If true, then ButtonHelper will call gotoAndPlay, if false, it will use gotoAndStop. Default is false.
		 */
		play : boolean;
		/**
		 * Enables or disables the button functionality on the target.
		 */
		enabled : boolean;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A loader for CSS files.
	 */
	export class CSSLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/CSS:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * A TweenJS plugin for working with numeric CSS string properties (ex. top, left). To use simply install after
	 * TweenJS has loaded:
	 *
	 *      createjs.CSSPlugin.install();
	 *
	 * You can adjust the CSS properties it will work with by modifying the <code>cssSuffixMap</code> property. Currently,
	 * the top, left, bottom, right, width, height have a "px" suffix appended.
	 *
	 * Please note that the CSS Plugin is not included in the TweenJS minified file.
	 */
	export class CSSPlugin
	{
		constructor();
		/**
		 * Defines the default suffix map for CSS tweens. This can be overridden on a per tween basis by specifying a
		 * cssSuffixMap value for the individual tween. The object maps CSS property names to the suffix to use when
		 * reading or setting those properties. For example a map in the form {top:"px"} specifies that when tweening
		 * the "top" CSS property, it should use the "px" suffix (ex. target.style.top = "20.5px"). This only applies
		 * to tweens with the "css" config property set to true.
		 */
		static cssSuffixMap : any;
		/**
		 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
		 */
		static install() : void;
	}
	
	/**
	 * Applies a color transform to DisplayObjects.
	 *
	 * <h4>Example</h4>
	 * This example draws a red circle, and then transforms it to Blue. This is accomplished by multiplying all the channels
	 * to 0 (except alpha, which is set to 1), and then adding 255 to the blue channel.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      shape.filters = [
	 *          new createjs.ColorFilter(0,0,0,1, 0,0,255,0)
	 *      ];
	 *      shape.cache(-50, -50, 100, 100);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 */
	export class ColorFilter extends createjs.Filter
	{
		constructor(redMultiplier?:number, greenMultiplier?:number, blueMultiplier?:number, alphaMultiplier?:number, redOffset?:number, greenOffset?:number, blueOffset?:number, alphaOffset?:number);
		/**
		 * Red channel multiplier.
		 */
		redMultiplier : number;
		/**
		 * Green channel multiplier.
		 */
		greenMultiplier : number;
		/**
		 * Blue channel multiplier.
		 */
		blueMultiplier : number;
		/**
		 * Alpha channel multiplier.
		 */
		alphaMultiplier : number;
		/**
		 * Red channel offset (added to value).
		 */
		redOffset : number;
		/**
		 * Green channel offset (added to value).
		 */
		greenOffset : number;
		/**
		 * Blue channel offset (added to value).
		 */
		blueOffset : number;
		/**
		 * Alpha channel offset (added to value).
		 */
		alphaOffset : number;
	}
	
	/**
	 * Provides helper functions for assembling a matrix for use with the {{#crossLink "ColorMatrixFilter"}}{{/crossLink}}.
	 * Most methods return the instance to facilitate chained calls.
	 *
	 * <h4>Example</h4>
	 *
	 *      myColorMatrix.adjustHue(20).adjustBrightness(50);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an example of how to apply filters, or {{#crossLink "ColorMatrixFilter"}}{{/crossLink}}
	 * for an example of how to use ColorMatrix to change a DisplayObject's color.
	 */
	export class ColorMatrix
	{
		constructor(brightness:number, contrast:number, saturation:number, hue:number);
		/**
		 * Resets the instance with the specified values.
		 */
		setColor(brightness:number, contrast:number, saturation:number, hue:number) : createjs.ColorMatrix;
		/**
		 * Resets the matrix to identity values.
		 */
		reset() : createjs.ColorMatrix;
		/**
		 * Shortcut method to adjust brightness, contrast, saturation and hue.
		 * Equivalent to calling adjustHue(hue), adjustContrast(contrast),
		 * adjustBrightness(brightness), adjustSaturation(saturation), in that order.
		 */
		adjustColor(brightness:number, contrast:number, saturation:number, hue:number) : createjs.ColorMatrix;
		/**
		 * Adjusts the brightness of pixel color by adding the specified value to the red, green and blue channels.
		 * Positive values will make the image brighter, negative values will make it darker.
		 */
		adjustBrightness(value:number) : createjs.ColorMatrix;
		/**
		 * Adjusts the contrast of pixel color.
		 * Positive values will increase contrast, negative values will decrease contrast.
		 */
		adjustContrast(value:number) : createjs.ColorMatrix;
		/**
		 * Adjusts the color saturation of the pixel.
		 * Positive values will increase saturation, negative values will decrease saturation (trend towards greyscale).
		 */
		adjustSaturation(value:number) : createjs.ColorMatrix;
		/**
		 * Adjusts the hue of the pixel color.
		 */
		adjustHue(value:number) : createjs.ColorMatrix;
		/**
		 * Concatenates (multiplies) the specified matrix with this one.
		 */
		concat(matrix:any[]) : createjs.ColorMatrix;
		/**
		 * Returns a clone of this ColorMatrix.
		 */
		clone() : createjs.ColorMatrix;
		/**
		 * Return a length 25 (5x5) array instance containing this matrix's values.
		 */
		toArray() : any[];
		/**
		 * Copy the specified matrix's values to this matrix.
		 */
		copy(matrix:any[]) : createjs.ColorMatrix;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * Allows you to carry out complex color operations such as modifying saturation, brightness, or inverting. See the
	 * {{#crossLink "ColorMatrix"}}{{/crossLink}} for more information on changing colors. For an easier color transform,
	 * consider the {{#crossLink "ColorFilter"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 * This example creates a red circle, inverts its hue, and then saturates it to brighten it up.
	 *
	 *      var shape = new createjs.Shape().set({x:100,y:100});
	 *      shape.graphics.beginFill("#ff0000").drawCircle(0,0,50);
	 *
	 *      var matrix = new createjs.ColorMatrix().adjustHue(180).adjustSaturation(100);
	 *      shape.filters = [
	 *          new createjs.ColorMatrixFilter(matrix)
	 *      ];
	 *
	 *      shape.cache(-50, -50, 100, 100);
	 *
	 * See {{#crossLink "Filter"}}{{/crossLink}} for an more information on applying filters.
	 */
	export class ColorMatrixFilter extends createjs.Filter
	{
		constructor(matrix:any);
		/**
		 * A 4x5 matrix describing the color operation to perform. See also the {{#crossLink "ColorMatrix"}}{{/crossLink}}
		 */
		matrix : any;
	}
	
	/**
	 * A Container is a nestable display list that allows you to work with compound display elements. For  example you could
	 * group arm, leg, torso and head {{#crossLink "Bitmap"}}{{/crossLink}} instances together into a Person Container, and
	 * transform them as a group, while still being able to move the individual parts relative to each other. Children of
	 * containers have their <code>transform</code> and <code>alpha</code> properties concatenated with their parent
	 * Container.
	 *
	 * For example, a {{#crossLink "Shape"}}{{/crossLink}} with x=100 and alpha=0.5, placed in a Container with <code>x=50</code>
	 * and <code>alpha=0.7</code> will be rendered to the canvas at <code>x=150</code> and <code>alpha=0.35</code>.
	 * Containers have some overhead, so you generally shouldn't create a Container to hold a single child.
	 *
	 * <h4>Example</h4>
	 *
	 *      var container = new createjs.Container();
	 *      container.addChild(bitmapInstance, shapeInstance);
	 *      container.x = 100;
	 */
	export class Container extends createjs.DisplayObject
	{
		constructor();
		/**
		 * The array of children in the display list. You should usually use the child management methods such as
		 * {{#crossLink "Container/addChild"}}{{/crossLink}}, {{#crossLink "Container/removeChild"}}{{/crossLink}},
		 * {{#crossLink "Container/swapChildren"}}{{/crossLink}}, etc, rather than accessing this directly, but it is
		 * included for advanced uses.
		 */
		children : any[];
		/**
		 * Indicates whether the children of this container are independently enabled for mouse/pointer interaction.
		 * If false, the children will be aggregated under the container - for example, a click on a child shape would
		 * trigger a click event on the container.
		 */
		mouseChildren : boolean;
		/**
		 * If false, the tick will not be propagated to children of this Container. This can provide some performance benefits.
		 * In addition to preventing the "tick" event from being dispatched, it will also prevent tick related updates
		 * on some display objects (ex. Sprite & MovieClip frame advancing, DOMElement visibility handling).
		 */
		tickChildren : boolean;
		/**
		 * Returns the number of children in the container.
		 */
		numChildren : number;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Adds a child to the top of the display list.
		 *
		 * <h4>Example</h4>
		 *
		 *      container.addChild(bitmapInstance);
		 *
		 *  You can also add multiple children at once:
		 *
		 *      container.addChild(bitmapInstance, shapeInstance, textInstance);
		 */
		addChild(child:createjs.DisplayObject) : createjs.DisplayObject;
		/**
		 * Adds a child to the display list at the specified index, bumping children at equal or greater indexes up one, and
		 * setting its parent to this Container.
		 *
		 * <h4>Example</h4>
		 *
		 *      addChildAt(child1, index);
		 *
		 * You can also add multiple children, such as:
		 *
		 *      addChildAt(child1, child2, ..., index);
		 *
		 * The index must be between 0 and numChildren. For example, to add myShape under otherShape in the display list,
		 * you could use:
		 *
		 *      container.addChildAt(myShape, container.getChildIndex(otherShape));
		 *
		 * This would also bump otherShape's index up by one. Fails silently if the index is out of range.
		 */
		addChildAt(child:createjs.DisplayObject, index:number) : createjs.DisplayObject;
		/**
		 * Removes the specified child from the display list. Note that it is faster to use removeChildAt() if the index is
		 * already known.
		 *
		 * <h4>Example</h4>
		 *
		 *      container.removeChild(child);
		 *
		 * You can also remove multiple children:
		 *
		 *      removeChild(child1, child2, ...);
		 *
		 * Returns true if the child (or children) was removed, or false if it was not in the display list.
		 */
		removeChild(child:createjs.DisplayObject) : boolean;
		/**
		 * Removes the child at the specified index from the display list, and sets its parent to null.
		 *
		 * <h4>Example</h4>
		 *
		 *      container.removeChildAt(2);
		 *
		 * You can also remove multiple children:
		 *
		 *      container.removeChild(2, 7, ...)
		 *
		 * Returns true if the child (or children) was removed, or false if any index was out of range.
		 */
		removeChildAt(index:number) : boolean;
		/**
		 * Removes all children from the display list.
		 *
		 * <h4>Example</h4>
		 *
		 *      container.removeAlLChildren();
		 */
		removeAllChildren() : void;
		/**
		 * Returns the child at the specified index.
		 *
		 * <h4>Example</h4>
		 *
		 *      container.getChildAt(2);
		 */
		getChildAt(index:number) : createjs.DisplayObject;
		/**
		 * Returns the child with the specified name.
		 */
		getChildByName(name:string) : createjs.DisplayObject;
		/**
		 * Performs an array sort operation on the child list.
		 *
		 * <h4>Example: Display children with a higher y in front.</h4>
		 *
		 *      var sortFunction = function(obj1, obj2, options) {
		 *          if (obj1.y > obj2.y) { return 1; }
		 *          if (obj1.y < obj2.y) { return -1; }
		 *          return 0;
		 *      }
		 *      container.sortChildren(sortFunction);
		 */
		sortChildren(sortFunction:any) : void;
		/**
		 * Returns the index of the specified child in the display list, or -1 if it is not in the display list.
		 *
		 * <h4>Example</h4>
		 *
		 *      var index = container.getChildIndex(child);
		 */
		getChildIndex(child:createjs.DisplayObject) : number;
		/**
		 * Swaps the children at the specified indexes. Fails silently if either index is out of range.
		 */
		swapChildrenAt(index1:number, index2:number) : void;
		/**
		 * Swaps the specified children's depth in the display list. Fails silently if either child is not a child of this
		 * Container.
		 */
		swapChildren(child1:createjs.DisplayObject, child2:createjs.DisplayObject) : void;
		/**
		 * Changes the depth of the specified child. Fails silently if the child is not a child of this container, or the index is out of range.
		 */
		setChildIndex(child:createjs.DisplayObject, index:number) : void;
		/**
		 * Returns true if the specified display object either is this container or is a descendent (child, grandchild, etc)
		 * of this container.
		 */
		contains(child:createjs.DisplayObject) : boolean;
		/**
		 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at the
		 * specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
		 * transform properties including regX/Y.
		 */
		hitTest(x:number, y:number) : boolean;
		/**
		 * Returns an array of all display objects under the specified coordinates that are in this container's display
		 * list. This routine ignores any display objects with mouseEnabled set to false. The array will be sorted in order
		 * of visual depth, with the top-most display object at index 0. This uses shape based hit detection, and can be an
		 * expensive operation to run, so it is best to use it carefully. For example, if testing for objects under the
		 * mouse, test on tick (instead of on mousemove), and only if the mouse's position has changed.
		 *
		 * By default this method evaluates all display objects. By setting the `mode` parameter to `1`, the `mouseEnabled`
		 * and `mouseChildren` properties will be respected.
		 * Setting it to `2` additionally excludes display objects that do not have active mouse event listeners
		 * or a `cursor` property. That is, only objects that would normally intercept mouse interaction will be included.
		 * This can significantly improve performance in some cases by reducing the number of
		 * display objects that need to be tested.
		 *
		 * Accounts for both {{#crossLink "DisplayObject/hitArea:property"}}{{/crossLink}} and {{#crossLink "DisplayObject/mask:property"}}{{/crossLink}}.
		 */
		getObjectsUnderPoint(x:number, y:number, mode?:number) : createjs.DisplayObject[];
		/**
		 * Similar to {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}}, but returns only the top-most display
		 * object. This runs significantly faster than <code>getObjectsUnderPoint()</code>, but is still potentially an expensive
		 * operation. See {{#crossLink "Container/getObjectsUnderPoint"}}{{/crossLink}} for more information.
		 */
		getObjectUnderPoint(x:number, y:number, mode?:number) : createjs.DisplayObject;
		/**
		 * Returns a clone of this Container. Some properties that are specific to this instance's current context are
		 * reverted to their defaults (for example .parent).
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * <b>This class is still experimental, and more advanced use is likely to be buggy. Please report bugs.</b>
	 *
	 * A DOMElement allows you to associate a HTMLElement with the display list. It will be transformed
	 * within the DOM as though it is child of the {{#crossLink "Container"}}{{/crossLink}} it is added to. However, it is
	 * not rendered to canvas, and as such will retain whatever z-index it has relative to the canvas (ie. it will be
	 * drawn in front of or behind the canvas).
	 *
	 * The position of a DOMElement is relative to their parent node in the DOM. It is recommended that
	 * the DOM Object be added to a div that also contains the canvas so that they share the same position
	 * on the page.
	 *
	 * DOMElement is useful for positioning HTML elements over top of canvas content, and for elements
	 * that you want to display outside the bounds of the canvas. For example, a tooltip with rich HTML
	 * content.
	 *
	 * <h4>Mouse Interaction</h4>
	 *
	 * DOMElement instances are not full EaselJS display objects, and do not participate in EaselJS mouse
	 * events or support methods like hitTest. To get mouse events from a DOMElement, you must instead add handlers to
	 * the htmlElement (note, this does not support EventDispatcher)
	 *
	 *      var domElement = new createjs.DOMElement(htmlElement);
	 *      domElement.htmlElement.onclick = function() {
	 *          console.log("clicked");
	 *      }
	 */
	export class DOMElement extends createjs.DisplayObject
	{
		constructor(htmlElement:Element);
		/**
		 * The DOM object to manage.
		 */
		htmlElement : Element;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Not applicable to DOMElement.
		 */
		cache(x:number, y:number, width:number, height:number, scale?:number) : void;
		/**
		 * Not applicable to DOMElement.
		 */
		uncache() : void;
		/**
		 * Not applicable to DOMElement.
		 */
		updateCache(compositeOperation:string) : void;
		/**
		 * Not applicable to DOMElement.
		 */
		hitTest(x:number, y:number) : boolean;
		/**
		 * Not applicable to DOMElement.
		 */
		localToGlobal(x:number, y:number, pt?:any) : createjs.Point;
		/**
		 * Not applicable to DOMElement.
		 */
		globalToLocal(x:number, y:number, pt?:any) : createjs.Point;
		/**
		 * Not applicable to DOMElement.
		 */
		localToLocal(x:number, y:number, target:createjs.DisplayObject, pt?:any) : createjs.Point;
		/**
		 * DOMElement cannot be cloned. Throws an error.
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A few data utilities for formatting different data types.
	 */
	export class DataUtils
	{
		/**
		 * Parse a string into an Object.
		 */
		parseJSON(value:string) : any;
		/**
		 * Parse XML using the DOM. This is required when preloading XML or SVG.
		 */
		static parseXML(text:string, type:string) : Document;
	}
	
	/**
	 * Used for calculating and encapsulating display related properties.
	 */
	export class DisplayProps
	{
		constructor(visible?:number, alpha?:number, shadow?:number, compositeOperation?:number, matrix?:number);
		/**
		 * Property representing the alpha that will be applied to a display object.
		 */
		alpha : number;
		/**
		 * Property representing the shadow that will be applied to a display object.
		 */
		shadow : createjs.Shadow;
		/**
		 * Property representing the compositeOperation that will be applied to a display object.
		 * You can find a list of valid composite operations at:
		 * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
		 */
		compositeOperation : string;
		/**
		 * Property representing the value for visible that will be applied to a display object.
		 */
		visible : boolean;
		/**
		 * The transformation matrix that will be applied to a display object.
		 */
		matrix : createjs.Matrix2D;
		/**
		 * Reinitializes the instance with the specified values.
		 */
		setValues(visible?:number, alpha?:number, shadow?:number, compositeOperation?:number, matrix?:number) : createjs.DisplayProps;
		/**
		 * Appends the specified display properties. This is generally used to apply a child's properties its parent's.
		 */
		append(visible:boolean, alpha:number, shadow:createjs.Shadow, compositeOperation:string, matrix?:createjs.Matrix2D) : createjs.DisplayProps;
		/**
		 * Prepends the specified display properties. This is generally used to apply a parent's properties to a child's.
		 * For example, to get the combined display properties that would be applied to a child, you could use:
		 *
		 * 	var o = myDisplayObject;
		 * 	var props = new createjs.DisplayProps();
		 * 	do {
		 * 		// prepend each parent's props in turn:
		 * 		props.prepend(o.visible, o.alpha, o.shadow, o.compositeOperation, o.getMatrix());
		 * 	} while (o = o.parent);
		 */
		prepend(visible:boolean, alpha:number, shadow:createjs.Shadow, compositeOperation:string, matrix?:createjs.Matrix2D) : createjs.DisplayProps;
		/**
		 * Resets this instance and its matrix to default values.
		 */
		identity() : createjs.DisplayProps;
		/**
		 * Returns a clone of the DisplayProps instance. Clones the associated matrix.
		 */
		clone() : createjs.DisplayProps;
	}
	
	/**
	 * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
	 * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
	 *
	 * Most methods on Ease can be passed directly as easing functions:
	 *
	 *      Tween.get(target).to({x:100}, 500, Ease.linear);
	 *
	 * However, methods beginning with "get" will return an easing function based on parameter values:
	 *
	 *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
	 *
	 * Please see the <a href="http://www.createjs.com/#!/TweenJS/demos/sparkTable">spark table demo</a> for an overview
	 * of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
	 *
	 * <i>Equations derived from work by Robert Penner.</i>
	 */
	export class Ease
	{
		static linear(t:number) : number;
		/**
		 * Identical to linear.
		 */
		static none(t:number) : number;
		/**
		 * Mimics the simple -100 to 100 easing in Flash Pro.
		 */
		static get(amount:number) : any;
		/**
		 * Configurable exponential ease.
		 */
		static getPowIn(pow:number) : any;
		/**
		 * Configurable exponential ease.
		 */
		static getPowOut(pow:number) : any;
		/**
		 * Configurable exponential ease.
		 */
		static getPowInOut(pow:number) : any;
		static quadIn(t:number) : number;
		static quadOut(t:number) : number;
		static quadInOut(t:number) : number;
		static cubicIn(t:number) : number;
		static cubicOut(t:number) : number;
		static cubicInOut(t:number) : number;
		static quartIn(t:number) : number;
		static quartOut(t:number) : number;
		static quartInOut(t:number) : number;
		static quintIn(t:number) : number;
		static quintOut(t:number) : number;
		static quintInOut(t:number) : number;
		static sineIn(t:number) : number;
		static sineOut(t:number) : number;
		static sineInOut(t:number) : number;
		/**
		 * Configurable "back in" ease.
		 */
		static getBackIn(amount:number) : any;
		static backIn(t:number) : number;
		/**
		 * Configurable "back out" ease.
		 */
		static getBackOut(amount:number) : any;
		static backOut(t:number) : number;
		/**
		 * Configurable "back in out" ease.
		 */
		static getBackInOut(amount:number) : any;
		static backInOut(t:number) : number;
		static circIn(t:number) : number;
		static circOut(t:number) : number;
		static circInOut(t:number) : number;
		static bounceIn(t:number) : number;
		static bounceOut(t:number) : number;
		static bounceInOut(t:number) : number;
		/**
		 * Configurable elastic ease.
		 */
		static getElasticIn(amplitude:number, period:number) : any;
		static elasticIn(t:number) : number;
		/**
		 * Configurable elastic ease.
		 */
		static getElasticOut(amplitude:number, period:number) : any;
		static elasticOut(t:number) : number;
		/**
		 * Configurable elastic ease.
		 */
		static getElasticInOut(amplitude:number, period:number) : any;
		static elasticInOut(t:number) : number;
	}
	
	/**
	 * A general error {{#crossLink "Event"}}{{/crossLink}}, that describes an error that occurred, as well as any details.
	 */
	export class ErrorEvent
	{
		constructor(title?:string, message?:string, data?:any);
		/**
		 * The short error title, which indicates the type of error that occurred.
		 */
		title : string;
		/**
		 * The verbose error message, containing details about the error.
		 */
		message : string;
		/**
		 * Additional data attached to an error.
		 */
		data : any;
	}
	
	/**
	 * Contains properties and methods shared by all events for use with
	 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
	 *
	 * Note that Event objects are often reused, so you should never
	 * rely on an event object's state outside of the call stack it was received in.
	 */
	export class Event
	{
		constructor(type:string, bubbles:boolean, cancelable:boolean);
		/**
		 * The type of event.
		 */
		type : string;
		/**
		 * The object that generated an event.
		 */
		target : any;
		/**
		 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
		 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
		 * is generated from childObj, then a listener on parentObj would receive the event with
		 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
		 */
		currentTarget : any;
		/**
		 * For bubbling events, this indicates the current event phase:<OL>
		 * 	<LI> capture phase: starting from the top parent to the target</LI>
		 * 	<LI> at target phase: currently being dispatched from the target</LI>
		 * 	<LI> bubbling phase: from the target to the top parent</LI>
		 * </OL>
		 */
		eventPhase : number;
		/**
		 * Indicates whether the event will bubble through the display list.
		 */
		bubbles : boolean;
		/**
		 * Indicates whether the default behaviour of this event can be cancelled via
		 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
		 */
		cancelable : boolean;
		/**
		 * The epoch time at which this event was created.
		 */
		timeStamp : number;
		/**
		 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
		 * on this event.
		 */
		defaultPrevented : boolean;
		/**
		 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
		 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
		 */
		propagationStopped : boolean;
		/**
		 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
		 * on this event.
		 */
		immediatePropagationStopped : boolean;
		/**
		 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
		 */
		removed : boolean;
		/**
		 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true.
		 * Mirrors the DOM event standard.
		 */
		preventDefault() : void;
		/**
		 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
		 * Mirrors the DOM event standard.
		 */
		stopPropagation() : void;
		/**
		 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
		 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
		 * Mirrors the DOM event standard.
		 */
		stopImmediatePropagation() : void;
		/**
		 * Causes the active listener to be removed via removeEventListener();
		 *
		 * 		myBtn.addEventListener("click", function(evt) {
		 * 			// do stuff...
		 * 			evt.remove(); // removes this listener.
		 * 		});
		 */
		remove() : void;
		/**
		 * Returns a clone of the Event instance.
		 */
		clone() : createjs.Event;
		/**
		 * Provides a chainable shortcut method for setting a number of properties on the instance.
		 */
		set(props:any) : createjs.Event;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * Loader provides a mechanism to preload Flash content via PreloadJS or internally. Instances are returned to
	 * the preloader, and the load method is called when the asset needs to be requested.
	 */
	export class FlashAudioLoader extends createjs.AbstractLoader
	{
		/**
		 * ID used to facilitate communication with flash.
		 * Not doc'd because this should not be altered externally
		 */
		flashId : string;
		/**
		 * Set the Flash instance on the class, and start loading on any instances that had load called
		 * before flash was ready
		 */
		setFlash(flash:any) : void;
	}
	
	/**
	 * Play sounds using a Flash instance. This plugin is not used by default, and must be registered manually in
	 * {{#crossLink "Sound"}}{{/crossLink}} using the {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method. This
	 * plugin is recommended to be included if sound support is required in older browsers such as IE8.
	 *
	 * This plugin requires FlashAudioPlugin.swf and swfObject.js, which is compiled
	 * into the minified FlashAudioPlugin-X.X.X.min.js file. You must ensure that {{#crossLink "FlashAudioPlugin/swfPath:property"}}{{/crossLink}}
	 * is set when using this plugin, so that the script can find the swf.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio";
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
	 *      // Adds FlashAudioPlugin as a fallback if WebAudio and HTMLAudio do not work.
	 *
	 * Note that the SWF is embedded into a container DIV (with an id and classname of "SoundJSFlashContainer"), and
	 * will have an id of "flashAudioContainer". The container DIV is positioned 1 pixel off-screen to the left to avoid
	 * showing the 1x1 pixel white square.
	 *
	 * <h4>Known Browser and OS issues for Flash Audio</h4>
	 * <b>All browsers</b><br />
	 * <ul><li> There can be a delay in flash player starting playback of audio.  This has been most noticeable in Firefox.
	 * Unfortunely this is an issue with the flash player and the browser and therefore cannot be addressed by SoundJS.</li></ul>
	 */
	export class FlashAudioPlugin extends createjs.AbstractPlugin
	{
		constructor();
		/**
		 * A developer flag to output all flash events to the console (if it exists).  Used for debugging.
		 *
		 *      createjs.Sound.activePlugin.showOutput = true;
		 */
		showOutput : boolean;
		/**
		 * Determines if the Flash object has been created and initialized. This is required to make <code>ExternalInterface</code>
		 * calls from JavaScript to Flash.
		 */
		flashReady : boolean;
		/**
		 * The path relative to the HTML page that the FlashAudioPlugin.swf resides. Note if this is not correct, this
		 * plugin will not work.
		 */
		static swfPath : string;
		/**
		 * Determine if the plugin can be used in the current browser/OS.
		 */
		static isSupported() : boolean;
	}
	
	/**
	 * The Graphics class exposes an easy to use API for generating vector drawing instructions and drawing them to a
	 * specified context. Note that you can use Graphics without any dependency on the EaselJS framework by calling {{#crossLink "Graphics/draw"}}{{/crossLink}}
	 * directly, or it can be used with the {{#crossLink "Shape"}}{{/crossLink}} object to draw vector graphics within the
	 * context of an EaselJS display list.
	 *
	 * There are two approaches to working with Graphics object: calling methods on a Graphics instance (the "Graphics API"), or
	 * instantiating Graphics command objects and adding them to the graphics queue via {{#crossLink "Graphics/append"}}{{/crossLink}}.
	 * The former abstracts the latter, simplifying beginning and ending paths, fills, and strokes.
	 *
	 *      var g = new createjs.Graphics();
	 *      g.setStrokeStyle(1);
	 *      g.beginStroke("#000000");
	 *      g.beginFill("red");
	 *      g.drawCircle(0,0,30);
	 *
	 * All drawing methods in Graphics return the Graphics instance, so they can be chained together. For example,
	 * the following line of code would generate the instructions to draw a rectangle with a red stroke and blue fill:
	 *
	 *      myGraphics.beginStroke("red").beginFill("blue").drawRect(20, 20, 100, 50);
	 *
	 * Each graphics API call generates a command object (see below). The last command to be created can be accessed via
	 * {{#crossLink "Graphics/command:property"}}{{/crossLink}}:
	 *
	 *      var fillCommand = myGraphics.beginFill("red").command;
	 *      // ... later, update the fill style/color:
	 *      fillCommand.style = "blue";
	 *      // or change it to a bitmap fill:
	 *      fillCommand.bitmap(myImage);
	 *
	 * For more direct control of rendering, you can instantiate and append command objects to the graphics queue directly. In this case, you
	 * need to manage path creation manually, and ensure that fill/stroke is applied to a defined path:
	 *
	 *      // start a new path. Graphics.beginCmd is a reusable BeginPath instance:
	 *      myGraphics.append(createjs.Graphics.beginCmd);
	 *      // we need to define the path before applying the fill:
	 *      var circle = new createjs.Graphics.Circle(0,0,30);
	 *      myGraphics.append(circle);
	 *      // fill the path we just defined:
	 *      var fill = new createjs.Graphics.Fill("red");
	 *      myGraphics.append(fill);
	 *
	 * These approaches can be used together, for example to insert a custom command:
	 *
	 *      myGraphics.beginFill("red");
	 *      var customCommand = new CustomSpiralCommand(etc);
	 *      myGraphics.append(customCommand);
	 *      myGraphics.beginFill("blue");
	 *      myGraphics.drawCircle(0, 0, 30);
	 *
	 * See {{#crossLink "Graphics/append"}}{{/crossLink}} for more info on creating custom commands.
	 *
	 * <h4>Tiny API</h4>
	 * The Graphics class also includes a "tiny API", which is one or two-letter methods that are shortcuts for all of the
	 * Graphics methods. These methods are great for creating compact instructions, and is used by the Toolkit for CreateJS
	 * to generate readable code. All tiny methods are marked as protected, so you can view them by enabling protected
	 * descriptions in the docs.
	 *
	 * <table>
	 *     <tr><td><b>Tiny</b></td><td><b>Method</b></td><td><b>Tiny</b></td><td><b>Method</b></td></tr>
	 *     <tr><td>mt</td><td>{{#crossLink "Graphics/moveTo"}}{{/crossLink}} </td>
	 *     <td>lt</td> <td>{{#crossLink "Graphics/lineTo"}}{{/crossLink}}</td></tr>
	 *     <tr><td>a/at</td><td>{{#crossLink "Graphics/arc"}}{{/crossLink}} / {{#crossLink "Graphics/arcTo"}}{{/crossLink}} </td>
	 *     <td>bt</td><td>{{#crossLink "Graphics/bezierCurveTo"}}{{/crossLink}} </td></tr>
	 *     <tr><td>qt</td><td>{{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}} (also curveTo)</td>
	 *     <td>r</td><td>{{#crossLink "Graphics/rect"}}{{/crossLink}} </td></tr>
	 *     <tr><td>cp</td><td>{{#crossLink "Graphics/closePath"}}{{/crossLink}} </td>
	 *     <td>c</td><td>{{#crossLink "Graphics/clear"}}{{/crossLink}} </td></tr>
	 *     <tr><td>f</td><td>{{#crossLink "Graphics/beginFill"}}{{/crossLink}} </td>
	 *     <td>lf</td><td>{{#crossLink "Graphics/beginLinearGradientFill"}}{{/crossLink}} </td></tr>
	 *     <tr><td>rf</td><td>{{#crossLink "Graphics/beginRadialGradientFill"}}{{/crossLink}} </td>
	 *     <td>bf</td><td>{{#crossLink "Graphics/beginBitmapFill"}}{{/crossLink}} </td></tr>
	 *     <tr><td>ef</td><td>{{#crossLink "Graphics/endFill"}}{{/crossLink}} </td>
	 *     <td>ss</td><td>{{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} </td></tr>
	 *     <tr><td>s</td><td>{{#crossLink "Graphics/beginStroke"}}{{/crossLink}} </td>
	 *     <td>ls</td><td>{{#crossLink "Graphics/beginLinearGradientStroke"}}{{/crossLink}} </td></tr>
	 *     <tr><td>rs</td><td>{{#crossLink "Graphics/beginRadialGradientStroke"}}{{/crossLink}} </td>
	 *     <td>bs</td><td>{{#crossLink "Graphics/beginBitmapStroke"}}{{/crossLink}} </td></tr>
	 *     <tr><td>es</td><td>{{#crossLink "Graphics/endStroke"}}{{/crossLink}} </td>
	 *     <td>dr</td><td>{{#crossLink "Graphics/drawRect"}}{{/crossLink}} </td></tr>
	 *     <tr><td>rr</td><td>{{#crossLink "Graphics/drawRoundRect"}}{{/crossLink}} </td>
	 *     <td>rc</td><td>{{#crossLink "Graphics/drawRoundRectComplex"}}{{/crossLink}} </td></tr>
	 *     <tr><td>dc</td><td>{{#crossLink "Graphics/drawCircle"}}{{/crossLink}} </td>
	 *     <td>de</td><td>{{#crossLink "Graphics/drawEllipse"}}{{/crossLink}} </td></tr>
	 *     <tr><td>dp</td><td>{{#crossLink "Graphics/drawPolyStar"}}{{/crossLink}} </td>
	 *     <td>p</td><td>{{#crossLink "Graphics/decodePath"}}{{/crossLink}} </td></tr>
	 * </table>
	 *
	 * Here is the above example, using the tiny API instead.
	 *
	 *      myGraphics.s("red").f("blue").r(20, 20, 100, 50);
	 */
	export class Graphics
	{
		constructor();
		/**
		 * Holds a reference to the last command that was created or appended. For example, you could retain a reference
		 * to a Fill command in order to dynamically update the color later by using:
		 * 		myFill = myGraphics.beginFill("red").command;
		 * 		// update color later:
		 * 		myFill.style = "yellow";
		 */
		command : any;
		/**
		 * Returns the graphics instructions array. Each entry is a graphics command object (ex. Graphics.Fill, Graphics.Rect)
		 * Modifying the returned array directly is not recommended, and is likely to result in unexpected behaviour.
		 *
		 * This property is mainly intended for introspection of the instructions (ex. for graphics export).
		 */
		instructions : any[];
		/**
		 * Returns true if this Graphics instance has no drawing commands.
		 */
		isEmpty() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, data?:any) : void;
		/**
		 * Draws only the path described for this Graphics instance, skipping any non-path instructions, including fill and
		 * stroke descriptions. Used for <code>DisplayObject.mask</code> to draw the clipping path, for example.
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		drawAsPath(ctx:CanvasRenderingContext2D) : void;
		/**
		 * Moves the drawing point to the specified position. A tiny API method "mt" also exists.
		 */
		moveTo(x:number, y:number) : createjs.Graphics;
		/**
		 * Draws a line from the current drawing point to the specified position, which become the new current drawing
		 * point. A tiny API method "lt" also exists.
		 *
		 * For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-(paths)">
		 * whatwg spec</a>.
		 */
		lineTo(x:number, y:number) : createjs.Graphics;
		/**
		 * Draws an arc with the specified control points and radius.  For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arcto">
		 * whatwg spec</a>. A tiny API method "at" also exists.
		 */
		arcTo(x1:number, y1:number, x2:number, y2:number, radius:number) : createjs.Graphics;
		/**
		 * Draws an arc defined by the radius, startAngle and endAngle arguments, centered at the position (x, y). For
		 * example, to draw a full circle with a radius of 20 centered at (100, 100):
		 *
		 *      arc(100, 100, 20, 0, Math.PI*2);
		 *
		 * For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-arc">whatwg spec</a>.
		 * A tiny API method "a" also exists.
		 */
		arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:boolean) : createjs.Graphics;
		/**
		 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
		 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
		 * whatwg spec</a>. A tiny API method "qt" also exists.
		 */
		quadraticCurveTo(cpx:number, cpy:number, x:number, y:number) : createjs.Graphics;
		/**
		 * Draws a bezier curve from the current drawing point to (x, y) using the control points (cp1x, cp1y) and (cp2x,
		 * cp2y). For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-beziercurveto">
		 * whatwg spec</a>. A tiny API method "bt" also exists.
		 */
		bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number) : createjs.Graphics;
		/**
		 * Draws a rectangle at (x, y) with the specified width and height using the current fill and/or stroke.
		 * For detailed information, read the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-rect">
		 * whatwg spec</a>. A tiny API method "r" also exists.
		 */
		rect(x:number, y:number, w:number, h:number) : createjs.Graphics;
		/**
		 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
		 * since the fill or stroke was last set. A tiny API method "cp" also exists.
		 */
		closePath() : createjs.Graphics;
		/**
		 * Clears all drawing instructions, effectively resetting this Graphics instance. Any line and fill styles will need
		 * to be redefined to draw shapes following a clear call. A tiny API method "c" also exists.
		 */
		clear() : createjs.Graphics;
		/**
		 * Begins a fill with the specified color. This ends the current sub-path. A tiny API method "f" also exists.
		 */
		beginFill(color:string) : createjs.Graphics;
		/**
		 * Begins a linear gradient fill defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
		 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
		 * square to display it:
		 *
		 *      myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		 *
		 * A tiny API method "lf" also exists.
		 */
		beginLinearGradientFill(colors:any[], ratios:any[], x0:number, y0:number, x1:number, y1:number) : createjs.Graphics;
		/**
		 * Begins a radial gradient fill. This ends the current sub-path. For example, the following code defines a red to
		 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a circle to display it:
		 *
		 *      myGraphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50).drawCircle(100, 100, 50);
		 *
		 * A tiny API method "rf" also exists.
		 */
		beginRadialGradientFill(colors:any[], ratios:any[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number) : createjs.Graphics;
		/**
		 * Begins a pattern fill using the specified image. This ends the current sub-path. A tiny API method "bf" also
		 * exists.
		 */
		beginBitmapFill(image:any, repetition?:string, matrix?:createjs.Matrix2D) : createjs.Graphics;
		/**
		 * Ends the current sub-path, and begins a new one with no fill. Functionally identical to <code>beginFill(null)</code>.
		 * A tiny API method "ef" also exists.
		 */
		endFill() : createjs.Graphics;
		/**
		 * Sets the stroke style for the current sub-path. Like all drawing methods, this can be chained, so you can define
		 * the stroke style and color in a single line of code like so:
		 *
		 *      myGraphics.setStrokeStyle(8,"round").beginStroke("#F00");
		 *
		 * A tiny API method "ss" also exists.
		 */
		setStrokeStyle(thickness:number, caps?:any, joints?:any, miterLimit?:number, ignoreScale?:boolean) : createjs.Graphics;
		/**
		 * Begins a stroke with the specified color. This ends the current sub-path. A tiny API method "s" also exists.
		 */
		beginStroke(color:string) : createjs.Graphics;
		/**
		 * Begins a linear gradient stroke defined by the line (x0, y0) to (x1, y1). This ends the current sub-path. For
		 * example, the following code defines a black to white vertical gradient ranging from 20px to 120px, and draws a
		 * square to display it:
		 *
		 *      myGraphics.setStrokeStyle(10).
		 *          beginLinearGradientStroke(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		 *
		 * A tiny API method "ls" also exists.
		 */
		beginLinearGradientStroke(colors:any[], ratios:any[], x0:number, y0:number, x1:number, y1:number) : createjs.Graphics;
		/**
		 * Begins a radial gradient stroke. This ends the current sub-path. For example, the following code defines a red to
		 * blue radial gradient centered at (100, 100), with a radius of 50, and draws a rectangle to display it:
		 *
		 *      myGraphics.setStrokeStyle(10)
		 *          .beginRadialGradientStroke(["#F00","#00F"], [0, 1], 100, 100, 0, 100, 100, 50)
		 *          .drawRect(50, 90, 150, 110);
		 *
		 * A tiny API method "rs" also exists.
		 */
		beginRadialGradientStroke(colors:any[], ratios:any[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number) : createjs.Graphics;
		/**
		 * Begins a pattern fill using the specified image. This ends the current sub-path. Note that unlike bitmap fills,
		 * strokes do not currently support a matrix parameter due to limitations in the canvas API. A tiny API method "bs"
		 * also exists.
		 */
		beginBitmapStroke(image:any, repetition?:string) : createjs.Graphics;
		/**
		 * Ends the current sub-path, and begins a new one with no stroke. Functionally identical to <code>beginStroke(null)</code>.
		 * A tiny API method "es" also exists.
		 */
		endStroke() : createjs.Graphics;
		/**
		 * Maps the familiar ActionScript <code>curveTo()</code> method to the functionally similar {{#crossLink "Graphics/quadraticCurveTo"}}{{/crossLink}}
		 * method.
		 */
		curveTo(cpx:number, cpy:number, x:number, y:number) : createjs.Graphics;
		/**
		 * Maps the familiar ActionScript <code>drawRect()</code> method to the functionally similar {{#crossLink "Graphics/rect"}}{{/crossLink}}
		 *  method.
		 */
		drawRect(x:number, y:number, w:number, h:number) : createjs.Graphics;
		/**
		 * Draws a rounded rectangle with all corners with the specified radius.
		 */
		drawRoundRect(x:number, y:number, w:number, h:number, radius:number) : createjs.Graphics;
		/**
		 * Draws a rounded rectangle with different corner radii. Supports positive and negative corner radii. A tiny API
		 * method "rc" also exists.
		 */
		drawRoundRectComplex(x:number, y:number, w:number, h:number, radiusTL:number, radiusTR:number, radiusBR:number, radiusBL:number) : createjs.Graphics;
		/**
		 * Draws a circle with the specified radius at (x, y).
		 *
		 *      var g = new createjs.Graphics();
		 * 	    g.setStrokeStyle(1);
		 * 	    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
		 * 	    g.beginFill(createjs.Graphics.getRGB(255,0,0));
		 * 	    g.drawCircle(0,0,3);
		 *
		 * 	    var s = new createjs.Shape(g);
		 * 		s.x = 100;
		 * 		s.y = 100;
		 *
		 * 	    stage.addChild(s);
		 * 	    stage.update();
		 *
		 * A tiny API method "dc" also exists.
		 */
		drawCircle(x:number, y:number, radius:number) : createjs.Graphics;
		/**
		 * Draws an ellipse (oval) with a specified width (w) and height (h). Similar to {{#crossLink "Graphics/drawCircle"}}{{/crossLink}},
		 * except the width and height can be different. A tiny API method "de" also exists.
		 */
		drawEllipse(x:number, y:number, w:number, h:number) : createjs.Graphics;
		/**
		 * Draws a star if pointSize is greater than 0, or a regular polygon if pointSize is 0 with the specified number of
		 * points. For example, the following code will draw a familiar 5 pointed star shape centered at 100, 100 and with a
		 * radius of 50:
		 *
		 *      myGraphics.beginFill("#FF0").drawPolyStar(100, 100, 50, 5, 0.6, -90);
		 *      // Note: -90 makes the first point vertical
		 *
		 * A tiny API method "dp" also exists.
		 */
		drawPolyStar(x:number, y:number, radius:number, sides:number, pointSize:number, angle:number) : createjs.Graphics;
		/**
		 * Appends a graphics command object to the graphics queue. Command objects expose an "exec" method
		 * that accepts two parameters: the Context2D to operate on, and an arbitrary data object passed into
		 * {{#crossLink "Graphics/draw"}}{{/crossLink}}. The latter will usually be the Shape instance that called draw.
		 *
		 * This method is used internally by Graphics methods, such as drawCircle, but can also be used directly to insert
		 * built-in or custom graphics commands. For example:
		 *
		 * 		// attach data to our shape, so we can access it during the draw:
		 * 		myShape.color = "red";
		 *
		 * 		// append a Circle command object:
		 * 		myShape.graphics.append(new Graphics.Circle(50, 50, 30));
		 *
		 * 		// append a custom command object with an exec method that sets the fill style
		 * 		// based on the shape's data, and then fills the circle.
		 * 		myShape.graphics.append({exec:function(ctx, shape) {
		 * 			ctx.fillStyle = shape.color;
		 * 			ctx.fill();
		 * 		}});
		 */
		append(command:any, clean:boolean) : createjs.Graphics;
		/**
		 * Decodes a compact encoded path string into a series of draw instructions.
		 * This format is not intended to be human readable, and is meant for use by authoring tools.
		 * The format uses a base64 character set, with each character representing 6 bits, to define a series of draw
		 * commands.
		 *
		 * Each command is comprised of a single "header" character followed by a variable number of alternating x and y
		 * position values. Reading the header bits from left to right (most to least significant): bits 1 to 3 specify the
		 * type of operation (0-moveTo, 1-lineTo, 2-quadraticCurveTo, 3-bezierCurveTo, 4-closePath, 5-7 unused). Bit 4
		 * indicates whether position values use 12 bits (2 characters) or 18 bits (3 characters), with a one indicating the
		 * latter. Bits 5 and 6 are currently unused.
		 *
		 * Following the header is a series of 0 (closePath), 2 (moveTo, lineTo), 4 (quadraticCurveTo), or 6 (bezierCurveTo)
		 * parameters. These parameters are alternating x/y positions represented by 2 or 3 characters (as indicated by the
		 * 4th bit in the command char). These characters consist of a 1 bit sign (1 is negative, 0 is positive), followed
		 * by an 11 (2 char) or 17 (3 char) bit integer value. All position values are in tenths of a pixel. Except in the
		 * case of move operations which are absolute, this value is a delta from the previous x or y position (as
		 * appropriate).
		 *
		 * For example, the string "A3cAAMAu4AAA" represents a line starting at -150,0 and ending at 150,0.
		 * <br />A - bits 000000. First 3 bits (000) indicate a moveTo operation. 4th bit (0) indicates 2 chars per
		 * parameter.
		 * <br />n0 - 110111011100. Absolute x position of -150.0px. First bit indicates a negative value, remaining bits
		 * indicate 1500 tenths of a pixel.
		 * <br />AA - 000000000000. Absolute y position of 0.
		 * <br />I - 001100. First 3 bits (001) indicate a lineTo operation. 4th bit (1) indicates 3 chars per parameter.
		 * <br />Au4 - 000000101110111000. An x delta of 300.0px, which is added to the previous x value of -150.0px to
		 * provide an absolute position of +150.0px.
		 * <br />AAA - 000000000000000000. A y delta value of 0.
		 *
		 * A tiny API method "p" also exists.
		 */
		decodePath(str:string) : createjs.Graphics;
		/**
		 * Stores all graphics commands so they won't be executed in future draws. Calling store() a second time adds to
		 * the existing store. This also affects `drawAsPath()`.
		 *
		 * This is useful in cases where you are creating vector graphics in an iterative manner (ex. generative art), so
		 * that only new graphics need to be drawn (which can provide huge performance benefits), but you wish to retain all
		 * of the vector instructions for later use (ex. scaling, modifying, or exporting).
		 *
		 * Note that calling store() will force the active path (if any) to be ended in a manner similar to changing
		 * the fill or stroke.
		 *
		 * For example, consider a application where the user draws lines with the mouse. As each line segment (or collection of
		 * segments) are added to a Shape, it can be rasterized using {{#crossLink "DisplayObject/updateCache"}}{{/crossLink}},
		 * and then stored, so that it can be redrawn at a different scale when the application is resized, or exported to SVG.
		 *
		 * 	// set up cache:
		 * 	myShape.cache(0,0,500,500,scale);
		 *
		 * 	// when the user drags, draw a new line:
		 * 	myShape.graphics.moveTo(oldX,oldY).lineTo(newX,newY);
		 * 	// then draw it into the existing cache:
		 * 	myShape.updateCache("source-over");
		 * 	// store the new line, so it isn't redrawn next time:
		 * 	myShape.store();
		 *
		 * 	// then, when the window resizes, we can re-render at a different scale:
		 * 	// first, unstore all our lines:
		 * 	myShape.unstore();
		 * 	// then cache using the new scale:
		 * 	myShape.cache(0,0,500,500,newScale);
		 * 	// finally, store the existing commands again:
		 * 	myShape.store();
		 */
		store() : createjs.Graphics;
		/**
		 * Unstores any graphics commands that were previously stored using {{#crossLink "Graphics/store"}}{{/crossLink}}
		 * so that they will be executed in subsequent draw calls.
		 */
		unstore() : createjs.Graphics;
		/**
		 * Returns a clone of this Graphics instance. Note that the individual command objects are not cloned.
		 */
		clone() : createjs.Graphics;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * A reusable instance of {{#crossLink "Graphics/BeginPath"}}{{/crossLink}} to avoid
		 * unnecessary instantiation.
		 */
		static beginCmd : any;
		/**
		 * Map of Base64 characters to values. Used by {{#crossLink "Graphics/decodePath"}}{{/crossLink}}.
		 */
		static BASE_64 : any;
		/**
		 * Maps numeric values for the caps parameter of {{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} to
		 * corresponding string values. This is primarily for use with the tiny API. The mappings are as follows: 0 to
		 * "butt", 1 to "round", and 2 to "square".
		 * For example, to set the line caps to "square":
		 *
		 *      myGraphics.ss(16, 2);
		 */
		static STROKE_CAPS_MAP : any[];
		/**
		 * Maps numeric values for the joints parameter of {{#crossLink "Graphics/setStrokeStyle"}}{{/crossLink}} to
		 * corresponding string values. This is primarily for use with the tiny API. The mappings are as follows: 0 to
		 * "miter", 1 to "round", and 2 to "bevel".
		 * For example, to set the line joints to "bevel":
		 *
		 *      myGraphics.ss(16, 0, 2);
		 */
		static STROKE_JOINTS_MAP : any[];
		/**
		 * Returns a CSS compatible color string based on the specified RGB numeric color values in the format
		 * "rgba(255,255,255,1.0)", or if alpha is null then in the format "rgb(255,255,255)". For example,
		 *
		 *      createjs.Graphics.getRGB(50, 100, 150, 0.5);
		 *      // Returns "rgba(50,100,150,0.5)"
		 *
		 * It also supports passing a single hex color value as the first param, and an optional alpha value as the second
		 * param. For example,
		 *
		 *      createjs.Graphics.getRGB(0xFF00FF, 0.2);
		 *      // Returns "rgba(255,0,255,0.2)"
		 */
		static getRGB(r:number, g:number, b:number, alpha?:number) : string;
		/**
		 * Returns a CSS compatible color string based on the specified HSL numeric color values in the format "hsla(360,100,100,1.0)",
		 * or if alpha is null then in the format "hsl(360,100,100)".
		 *
		 *      createjs.Graphics.getHSL(150, 100, 70);
		 *      // Returns "hsl(150,100,70)"
		 */
		static getHSL(hue:number, saturation:number, lightness:number, alpha?:number) : string;
	}
	
	/**
	 * Play sounds using HTML &lt;audio&gt; tags in the browser. This plugin is the second priority plugin installed
	 * by default, after the {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.  For older browsers that do not support html
	 * audio, include and install the {{#crossLink "FlashAudioPlugin"}}{{/crossLink}}.
	 *
	 * <h4>Known Browser and OS issues for HTML Audio</h4>
	 * <b>All browsers</b><br />
	 * Testing has shown in all browsers there is a limit to how many audio tag instances you are allowed.  If you exceed
	 * this limit, you can expect to see unpredictable results.  This will be seen as soon as you register sounds, as
	 * tags are precreated to allow Chrome to load them.  Please use {{#crossLink "Sound.MAX_INSTANCES"}}{{/crossLink}} as
	 * a guide to how many total audio tags you can safely use in all browsers.
	 *
	 * <b>IE html limitations</b><br />
	 * <ul><li>There is a delay in applying volume changes to tags that occurs once playback is started. So if you have
	 * muted all sounds, they will all play during this delay until the mute applies internally. This happens regardless of
	 * when or how you apply the volume change, as the tag seems to need to play to apply it.</li>
	 * <li>MP3 encoding will not always work for audio tags if it's not default.  We've found default encoding with
	 * 64kbps works.</li>
	 * <li>Occasionally very short samples will get cut off.</li>
	 * <li>There is a limit to how many audio tags you can load and play at once, which appears to be determined by
	 * hardware and browser settings.  See {{#crossLink "HTMLAudioPlugin.MAX_INSTANCES"}}{{/crossLink}} for a safe estimate.
	 * Note that audio sprites can be used as a solution to this issue.</li></ul>
	 *
	 * <b>Safari limitations</b><br />
	 * <ul><li>Safari requires Quicktime to be installed for audio playback.</li></ul>
	 *
	 * <b>iOS 6 limitations</b><br />
	 * <ul><li>Note it is recommended to use {{#crossLink "WebAudioPlugin"}}{{/crossLink}} for iOS (6+)</li>
	 * 		<li>HTML Audio is disabled by default because</li>
	 * 		<li>can only have one &lt;audio&gt; tag</li>
	 * 		<li>can not preload or autoplay the audio</li>
	 * 		<li>can not cache the audio</li>
	 * 		<li>can not play the audio except inside a user initiated event.</li>
	 * 		<li>audio sprites can be used to mitigate some of these issues and are strongly recommended on iOS</li>
	 * </ul>
	 *
	 * <b>Android Native Browser limitations</b><br />
	 * <ul><li>We have no control over audio volume. Only the user can set volume on their device.</li>
	 *      <li>We can only play audio inside a user event (touch/click).  This currently means you cannot loop sound or use a delay.</li></ul>
	 * <b> Android Chrome 26.0.1410.58 specific limitations</b><br />
	 * <ul> <li>Can only play 1 sound at a time.</li>
	 *      <li>Sound is not cached.</li>
	 *      <li>Sound can only be loaded in a user initiated touch/click event.</li>
	 *      <li>There is a delay before a sound is played, presumably while the src is loaded.</li>
	 * </ul>
	 *
	 * See {{#crossLink "Sound"}}{{/crossLink}} for general notes on known issues.
	 */
	export class HTMLAudioPlugin extends createjs.AbstractPlugin
	{
		constructor();
		/**
		 * The default number of instances to allow.  Used by {{#crossLink "Sound"}}{{/crossLink}} when a source
		 * is registered using the {{#crossLink "Sound/register"}}{{/crossLink}} method.  This is only used if
		 * a value is not provided.
		 *
		 * <b>NOTE this property only exists as a limitation of HTML audio.</b>
		 */
		defaultNumChannels : number;
		/**
		 * The maximum number of instances that can be loaded and played. This is a browser limitation, primarily limited to IE9.
		 * The actual number varies from browser to browser (and is largely hardware dependant), but this is a safe estimate.
		 * Audio sprites work around this limitation.
		 */
		static MAX_INSTANCES : number;
		/**
		 * Determine if the plugin can be used in the current browser/OS. Note that HTML audio is available in most modern
		 * browsers, but is disabled in iOS because of its limitations.
		 */
		static isSupported() : boolean;
	}
	
	/**
	 * The TagPool is an object pool for HTMLAudio tag instances. In Chrome, we have to pre-create the number of HTML
	 * audio tag instances that we are going to play before we load the data, otherwise the audio stalls.
	 * (Note: This seems to be a bug in Chrome)
	 */
	export class HTMLAudioTagPool
	{
	
	}
	
	/**
	 * A loader for image files.
	 */
	export class ImageLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/IMAGE:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * A loader for JSON files. To load JSON cross-domain, use JSONP and the {{#crossLink "JSONPLoader"}}{{/crossLink}}
	 * instead. To load JSON-formatted manifests, use {{#crossLink "ManifestLoader"}}{{/crossLink}}, and to
	 * load EaselJS SpriteSheets, use {{#crossLink "SpriteSheetLoader"}}{{/crossLink}}.
	 */
	export class JSONLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/JSON:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * A loader for JSONP files, which are JSON-formatted text files, wrapped in a callback. To load regular JSON
	 * without a callback use the {{#crossLink "JSONLoader"}}{{/crossLink}} instead. To load JSON-formatted manifests,
	 * use {{#crossLink "ManifestLoader"}}{{/crossLink}}, and to load EaselJS SpriteSheets, use
	 * {{#crossLink "SpriteSheetLoader"}}{{/crossLink}}.
	 */
	export class JSONPLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/JSONP:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * A loader for JavaScript files.
	 */
	export class JavaScriptLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/JAVASCRIPT:property"}}{{/crossLink}}
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * All loaders accept an item containing the properties defined in this class. If a raw object is passed instead,
	 * it will not be affected, but it must contain at least a {{#crossLink "src:property"}}{{/crossLink}} property. A
	 * string path or HTML tag is also acceptable, but it will be automatically converted to a LoadItem using the
	 * {{#crossLink "create"}}{{/crossLink}} method by {{#crossLink "AbstractLoader"}}{{/crossLink}}
	 */
	export class LoadItem
	{
		constructor();
		/**
		 * The source of the file that is being loaded. This property is <b>required</b>. The source can either be a
		 * string (recommended), or an HTML tag.</li>
		 */
		src : string;
		/**
		 * The source of the file that is being loaded. This property is <strong>required</strong>. The source can
		 * either be a string (recommended), or an HTML tag. See the {{#crossLink "AbstractLoader"}}{{/crossLink}}
		 * class for the full list of supported types.
		 */
		type : string;
		/**
		 * A string identifier which can be used to reference the loaded object. If none is provided, this will be
		 * automatically set to the {{#crossLink "src:property"}}{{/crossLink}}.
		 */
		id : string;
		/**
		 * Determines if a manifest will maintain the order of this item, in relation to other items in the manifest
		 * that have also set the `maintainOrder` property to `true`. This only applies when the max connections has
		 * been set above 1 (using {{#crossLink "LoadQueue/setMaxConnections"}}{{/crossLink}}). Everything with this
		 * property set to `false` will finish as it is loaded. Ordered items are combined with script tags loading in
		 * order when {{#crossLink "LoadQueue/maintainScriptOrder:property"}}{{/crossLink}} is set to `true`.
		 */
		maintainOrder : boolean;
		/**
		 * A callback used by JSONP requests that defines what global method to call when the JSONP content is loaded.
		 */
		callback : string;
		/**
		 * An arbitrary data object, which is included with the loaded object.
		 */
		data : any;
		/**
		 * The request method used for HTTP calls. Both {{#crossLink "AbstractLoader/GET:property"}}{{/crossLink}} or
		 * {{#crossLink "AbstractLoader/POST:property"}}{{/crossLink}} request types are supported, and are defined as
		 * constants on {{#crossLink "AbstractLoader"}}{{/crossLink}}.
		 */
		method : string;
		/**
		 * An object hash of name/value pairs to send to the server.
		 */
		values : any;
		/**
		 * An object hash of headers to attach to an XHR request. PreloadJS will automatically attach some default
		 * headers when required, including "Origin", "Content-Type", and "X-Requested-With". You may override the
		 * default headers by including them in your headers object.
		 */
		headers : any;
		/**
		 * Enable credentials for XHR requests.
		 */
		withCredentials : boolean;
		/**
		 * Set the mime type of XHR-based requests. This is automatically set to "text/plain; charset=utf-8" for text
		 * based files (json, xml, text, css, js).
		 */
		mimeType : string;
		/**
		 * Sets the crossOrigin attribute for CORS-enabled images loading cross-domain.
		 */
		crossOrigin : boolean;
		/**
		 * The duration in milliseconds to wait before a request times out. This only applies to tag-based and and XHR
		 * (level one) loading, as XHR (level 2) provides its own timeout event.
		 */
		loadTimeout : number;
		/**
		 * Provides a chainable shortcut method for setting a number of properties on the instance.
		 *
		 * <h4>Example</h4>
		 *
		 *      var loadItem = new createjs.LoadItem().set({src:"image.png", maintainOrder:true});
		 */
		set(props:any) : createjs.LoadItem;
		/**
		 * Create/validate a LoadItem.
		 * <ul>
		 *     <li>String-based items are converted to a LoadItem with a populated {{#crossLink "src:property"}}{{/crossLink}}.</li>
		 *     <li>LoadItem instances are returned as-is</li>
		 *     <li>Objectss are returned as-is</li>
		 * </ul>
		 */
		static create(value:any) : any;
	}
	
	/**
	 * The LoadQueue class is the main API for preloading content. LoadQueue is a load manager, which can preload either
	 * a single file, or queue of files.
	 *
	 * <b>Creating a Queue</b><br />
	 * To use LoadQueue, create a LoadQueue instance. If you want to force tag loading where possible, set the preferXHR
	 * argument to false.
	 *
	 *      var queue = new createjs.LoadQueue(true);
	 *
	 * <b>Listening for Events</b><br />
	 * Add any listeners you want to the queue. Since PreloadJS 0.3.0, the {{#crossLink "EventDispatcher"}}{{/crossLink}}
	 * lets you add as many listeners as you want for events. You can subscribe to the following events:<ul>
	 *     <li>{{#crossLink "AbstractLoader/complete:event"}}{{/crossLink}}: fired when a queue completes loading all
	 *     files</li>
	 *     <li>{{#crossLink "AbstractLoader/error:event"}}{{/crossLink}}: fired when the queue encounters an error with
	 *     any file.</li>
	 *     <li>{{#crossLink "AbstractLoader/progress:event"}}{{/crossLink}}: Progress for the entire queue has
	 *     changed.</li>
	 *     <li>{{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}}: A single file has completed loading.</li>
	 *     <li>{{#crossLink "LoadQueue/fileprogress:event"}}{{/crossLink}}: Progress for a single file has changes. Note
	 *     that only files loaded with XHR (or possibly by plugins) will fire progress events other than 0 or 100%.</li>
	 * </ul>
	 *
	 *      queue.on("fileload", handleFileLoad, this);
	 *      queue.on("complete", handleComplete, this);
	 *
	 * <b>Adding files and manifests</b><br />
	 * Add files you want to load using {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} or add multiple files at a
	 * time using a list or a manifest definition using {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}. Files are
	 * appended to the end of the active queue, so you can use these methods as many times as you like, whenever you
	 * like.
	 *
	 *      queue.loadFile("filePath/file.jpg");
	 *      queue.loadFile({id:"image", src:"filePath/file.jpg"});
	 *      queue.loadManifest(["filePath/file.jpg", {id:"image", src:"filePath/file.jpg"}]);
	 *
	 *      // Use an external manifest
	 *      queue.loadManifest("path/to/manifest.json");
	 *      queue.loadManifest({src:"manifest.json", type:"manifest"});
	 *
	 * If you pass `false` as the `loadNow` parameter, the queue will not kick of the load of the files, but it will not
	 * stop if it has already been started. Call the {{#crossLink "AbstractLoader/load"}}{{/crossLink}} method to begin
	 * a paused queue. Note that a paused queue will automatically resume when new files are added to it with a
	 * `loadNow` argument of `true`.
	 *
	 *      queue.load();
	 *
	 * <b>File Types</b><br />
	 * The file type of a manifest item is auto-determined by the file extension. The pattern matching in PreloadJS
	 * should handle the majority of standard file and url formats, and works with common file extensions. If you have
	 * either a non-standard file extension, or are serving the file using a proxy script, then you can pass in a
	 * <code>type</code> property with any manifest item.
	 *
	 *      queue.loadFile({src:"path/to/myFile.mp3x", type:createjs.AbstractLoader.SOUND});
	 *
	 *      // Note that PreloadJS will not read a file extension from the query string
	 *      queue.loadFile({src:"http://server.com/proxy?file=image.jpg", type:createjs.AbstractLoader.IMAGE});
	 *
	 * Supported types are defined on the {{#crossLink "AbstractLoader"}}{{/crossLink}} class, and include:
	 * <ul>
	 *     <li>{{#crossLink "AbstractLoader/BINARY:property"}}{{/crossLink}}: Raw binary data via XHR</li>
	 *     <li>{{#crossLink "AbstractLoader/CSS:property"}}{{/crossLink}}: CSS files</li>
	 *     <li>{{#crossLink "AbstractLoader/IMAGE:property"}}{{/crossLink}}: Common image formats</li>
	 *     <li>{{#crossLink "AbstractLoader/JAVASCRIPT:property"}}{{/crossLink}}: JavaScript files</li>
	 *     <li>{{#crossLink "AbstractLoader/JSON:property"}}{{/crossLink}}: JSON data</li>
	 *     <li>{{#crossLink "AbstractLoader/JSONP:property"}}{{/crossLink}}: JSON files cross-domain</li>
	 *     <li>{{#crossLink "AbstractLoader/MANIFEST:property"}}{{/crossLink}}: A list of files to load in JSON format, see
	 *     {{#crossLink "AbstractLoader/loadManifest"}}{{/crossLink}}</li>
	 *     <li>{{#crossLink "AbstractLoader/SOUND:property"}}{{/crossLink}}: Audio file formats</li>
	 *     <li>{{#crossLink "AbstractLoader/SPRITESHEET:property"}}{{/crossLink}}: JSON SpriteSheet definiteions. This
	 *     will also load sub-images, and provide a {{#crossLink "SpriteSheet"}}{{/crossLink}} instance.</li>
	 *     <li>{{#crossLink "AbstractLoader/SVG:property"}}{{/crossLink}}: SVG files</li>
	 *     <li>{{#crossLink "AbstractLoader/TEXT:property"}}{{/crossLink}}: Text files - XHR only</li>
	 *     <li>{{#crossLink "AbstractLoader/XML:property"}}{{/crossLink}}: XML data</li>
	 * </ul>
	 *
	 * <em>Note: Loader types used to be defined on LoadQueue, but have been moved to AbstractLoader for better
	 * portability of loader classes, which can be used individually now. The properties on LoadQueue still exist, but
	 * are deprecated.</em>
	 *
	 * <b>Handling Results</b><br />
	 * When a file is finished downloading, a {{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}} event is
	 * dispatched. In an example above, there is an event listener snippet for fileload. Loaded files are usually a
	 * formatted object that can be used immediately, including:
	 * <ul>
	 *     <li>Binary: The binary loaded result</li>
	 *     <li>CSS: A &lt;link /&gt; tag</li>
	 *     <li>Image: An &lt;img /&gt; tag</li>
	 *     <li>JavaScript: A &lt;script /&gt; tag</li>
	 *     <li>JSON/JSONP: A formatted JavaScript Object</li>
	 *     <li>Manifest: A JavaScript object.
	 *     <li>Sound: An &lt;audio /&gt; tag</a>
	 *     <li>SpriteSheet: A {{#crossLink "SpriteSheet"}}{{/crossLink}} instance, containing loaded images.
	 *     <li>SVG: An &lt;object /&gt; tag</li>
	 *     <li>Text: Raw text</li>
	 *     <li>XML: An XML DOM node</li>
	 * </ul>
	 *
	 *      function handleFileLoad(event) {
	 *          var item = event.item; // A reference to the item that was passed in to the LoadQueue
	 *          var type = item.type;
	 *
	 *          // Add any images to the page body.
	 *          if (type == createjs.LoadQueue.IMAGE) {
	 *              document.body.appendChild(event.result);
	 *          }
	 *      }
	 *
	 * At any time after the file has been loaded (usually after the queue has completed), any result can be looked up
	 * via its "id" using {{#crossLink "LoadQueue/getResult"}}{{/crossLink}}. If no id was provided, then the
	 * "src" or file path can be used instead, including the `path` defined by a manifest, but <strong>not including</strong>
	 * a base path defined on the LoadQueue. It is recommended to always pass an id if you want to look up content.
	 *
	 *      var image = queue.getResult("image");
	 *      document.body.appendChild(image);
	 *
	 * Raw loaded content can be accessed using the <code>rawResult</code> property of the {{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}}
	 * event, or can be looked up using {{#crossLink "LoadQueue/getResult"}}{{/crossLink}}, passing `true` as the 2nd
	 * argument. This is only applicable for content that has been parsed for the browser, specifically: JavaScript,
	 * CSS, XML, SVG, and JSON objects, or anything loaded with XHR.
	 *
	 *      var image = queue.getResult("image", true); // load the binary image data loaded with XHR.
	 *
	 * <b>Plugins</b><br />
	 * LoadQueue has a simple plugin architecture to help process and preload content. For example, to preload audio,
	 * make sure to install the <a href="http://soundjs.com">SoundJS</a> Sound class, which will help load HTML audio,
	 * Flash audio, and WebAudio files. This should be installed <strong>before</strong> loading any audio files.
	 *
	 *      queue.installPlugin(createjs.Sound);
	 *
	 * <h4>Known Browser Issues</h4>
	 * <ul>
	 *     <li>Browsers without audio support can not load audio files.</li>
	 *     <li>Safari on Mac OS X can only play HTML audio if QuickTime is installed</li>
	 *     <li>HTML Audio tags will only download until their <code>canPlayThrough</code> event is fired. Browsers other
	 *     than Chrome will continue to download in the background.</li>
	 *     <li>When loading scripts using tags, they are automatically added to the document.</li>
	 *     <li>Scripts loaded via XHR may not be properly inspectable with browser tools.</li>
	 *     <li>IE6 and IE7 (and some other browsers) may not be able to load XML, Text, or JSON, since they require
	 *     XHR to work.</li>
	 *     <li>Content loaded via tags will not show progress, and will continue to download in the background when
	 *     canceled, although no events will be dispatched.</li>
	 * </ul>
	 */
	export class LoadQueue extends createjs.AbstractLoader
	{
		constructor(preferXHR?:boolean, basePath?:string, crossOrigin?:any);
		/**
		 * Determines if the LoadQueue will stop processing the current queue when an error is encountered.
		 */
		stopOnError : boolean;
		/**
		 * Ensure loaded scripts "complete" in the order they are specified. Loaded scripts are added to the document head
		 * once they are loaded. Scripts loaded via tags will load one-at-a-time when this property is `true`, whereas
		 * scripts loaded using XHR can load in any order, but will "finish" and be added to the document in the order
		 * specified.
		 *
		 * Any items can be set to load in order by setting the {{#crossLink "maintainOrder:property"}}{{/crossLink}}
		 * property on the load item, or by ensuring that only one connection can be open at a time using
		 * {{#crossLink "LoadQueue/setMaxConnections"}}{{/crossLink}}. Note that when the `maintainScriptOrder` property
		 * is set to `true`, scripts items are automatically set to `maintainOrder=true`, and changing the
		 * `maintainScriptOrder` to `false` during a load will not change items already in a queue.
		 *
		 * <h4>Example</h4>
		 *
		 *      var queue = new createjs.LoadQueue();
		 *      queue.setMaxConnections(3); // Set a higher number to load multiple items at once
		 *      queue.maintainScriptOrder = true; // Ensure scripts are loaded in order
		 *      queue.loadManifest([
		 *          "script1.js",
		 *          "script2.js",
		 *          "image.png", // Load any time
		 *          {src: "image2.png", maintainOrder: true} // Will wait for script2.js
		 *          "image3.png",
		 *          "script3.js" // Will wait for image2.png before loading (or completing when loading with XHR)
		 *      ]);
		 */
		maintainScriptOrder : boolean;
		/**
		 * The next preload queue to process when this one is complete. If an error is thrown in the current queue, and
		 * {{#crossLink "LoadQueue/stopOnError:property"}}{{/crossLink}} is `true`, the next queue will not be processed.
		 */
		next : createjs.LoadQueue;
		/**
		 * Register a custom loaders class. New loaders are given precedence over loaders added earlier and default loaders.
		 * It is recommended that loaders extend {{#crossLink "AbstractLoader"}}{{/crossLink}}. Loaders can only be added
		 * once, and will be prepended to the list of available loaders.
		 */
		registerLoader(The:createjs.AbstractLoader) : void;
		/**
		 * Remove a custom loader added usig {{#crossLink "registerLoader"}}{{/crossLink}}. Only custom loaders can be
		 * unregistered, the default loaders will always be available.
		 */
		unregisterLoader(loader:createjs.AbstractLoader) : void;
		/**
		 * Change the {{#crossLink "preferXHR:property"}}{{/crossLink}} value. Note that if this is set to `true`, it may
		 * fail, or be ignored depending on the browser's capabilities and the load type.
		 */
		setPreferXHR(value:boolean) : boolean;
		/**
		 * Stops all queued and loading items, and clears the queue. This also removes all internal references to loaded
		 * content, and allows the queue to be used again.
		 */
		removeAll() : void;
		/**
		 * Stops an item from being loaded, and removes it from the queue. If nothing is passed, all items are removed.
		 * This also removes internal references to loaded item(s).
		 *
		 * <h4>Example</h4>
		 *
		 *      queue.loadManifest([
		 *          {src:"test.png", id:"png"},
		 *          {src:"test.jpg", id:"jpg"},
		 *          {src:"test.mp3", id:"mp3"}
		 *      ]);
		 *      queue.remove("png"); // Single item by ID
		 *      queue.remove("png", "test.jpg"); // Items as arguments. Mixed id and src.
		 *      queue.remove(["test.png", "jpg"]); // Items in an Array. Mixed id and src.
		 */
		remove(idsOrUrls:any) : void;
		/**
		 * Stops all open loads, destroys any loaded items, and resets the queue, so all items can
		 * be reloaded again by calling {{#crossLink "AbstractLoader/load"}}{{/crossLink}}. Items are not removed from the
		 * queue. To remove items use the {{#crossLink "LoadQueue/remove"}}{{/crossLink}} or
		 * {{#crossLink "LoadQueue/removeAll"}}{{/crossLink}} method.
		 */
		reset() : void;
		/**
		 * Register a plugin. Plugins can map to load types (sound, image, etc), or specific extensions (png, mp3, etc).
		 * Currently, only one plugin can exist per type/extension.
		 *
		 * When a plugin is installed, a <code>getPreloadHandlers()</code> method will be called on it. For more information
		 * on this method, check out the {{#crossLink "SamplePlugin/getPreloadHandlers"}}{{/crossLink}} method in the
		 * {{#crossLink "SamplePlugin"}}{{/crossLink}} class.
		 *
		 * Before a file is loaded, a matching plugin has an opportunity to modify the load. If a `callback` is returned
		 * from the {{#crossLink "SamplePlugin/getPreloadHandlers"}}{{/crossLink}} method, it will be invoked first, and its
		 * result may cancel or modify the item. The callback method can also return a `completeHandler` to be fired when
		 * the file is loaded, or a `tag` object, which will manage the actual download. For more information on these
		 * methods, check out the {{#crossLink "SamplePlugin/preloadHandler"}}{{/crossLink}} and {{#crossLink "SamplePlugin/fileLoadHandler"}}{{/crossLink}}
		 * methods on the {{#crossLink "SamplePlugin"}}{{/crossLink}}.
		 */
		installPlugin(plugin:any) : void;
		/**
		 * Set the maximum number of concurrent connections. Note that browsers and servers may have a built-in maximum
		 * number of open connections, so any additional connections may remain in a pending state until the browser
		 * opens the connection. When loading scripts using tags, and when {{#crossLink "LoadQueue/maintainScriptOrder:property"}}{{/crossLink}}
		 * is `true`, only one script is loaded at a time due to browser limitations.
		 *
		 * <h4>Example</h4>
		 *
		 *      var queue = new createjs.LoadQueue();
		 *      queue.setMaxConnections(10); // Allow 10 concurrent loads
		 */
		setMaxConnections(value:number) : void;
		/**
		 * Load a single file. To add multiple files at once, use the {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}
		 * method.
		 *
		 * Files are always appended to the current queue, so this method can be used multiple times to add files.
		 * To clear the queue first, use the {{#crossLink "AbstractLoader/close"}}{{/crossLink}} method.
		 */
		loadFile(file:any, loadNow?:boolean, basePath?:string) : void;
		/**
		 * Load an array of files. To load a single file, use the {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} method.
		 * The files in the manifest are requested in the same order, but may complete in a different order if the max
		 * connections are set above 1 using {{#crossLink "LoadQueue/setMaxConnections"}}{{/crossLink}}. Scripts will load
		 * in the right order as long as {{#crossLink "LoadQueue/maintainScriptOrder"}}{{/crossLink}} is true (which is
		 * default).
		 *
		 * Files are always appended to the current queue, so this method can be used multiple times to add files.
		 * To clear the queue first, use the {{#crossLink "AbstractLoader/close"}}{{/crossLink}} method.
		 */
		loadManifest(manifest:any, loadNow?:boolean, basePath?:string) : void;
		/**
		 * Start a LoadQueue that was created, but not automatically started.
		 */
		load() : void;
		/**
		 * Look up a {{#crossLink "LoadItem"}}{{/crossLink}} using either the "id" or "src" that was specified when loading it. Note that if no "id" was
		 * supplied with the load item, the ID will be the "src", including a `path` property defined by a manifest. The
		 * `basePath` will not be part of the ID.
		 */
		getItem(value?:string) : any;
		/**
		 * Look up a loaded result using either the "id" or "src" that was specified when loading it. Note that if no "id"
		 * was supplied with the load item, the ID will be the "src", including a `path` property defined by a manifest. The
		 * `basePath` will not be part of the ID.
		 */
		getResult(value?:any, rawResult?:boolean) : any;
		/**
		 * Generate an list of items loaded by this queue.
		 */
		getItems(loaded:boolean) : any[];
		/**
		 * Pause or resume the current load. Active loads will not be cancelled, but the next items in the queue will not
		 * be processed when active loads complete. LoadQueues are not paused by default.
		 *
		 * Note that if new items are added to the queue using {{#crossLink "LoadQueue/loadFile"}}{{/crossLink}} or
		 * {{#crossLink "LoadQueue/loadManifest"}}{{/crossLink}}, a paused queue will be resumed, unless the `loadNow`
		 * argument is `false`.
		 */
		setPaused(value:boolean) : void;
		/**
		 * Close the active queue. Closing a queue completely empties the queue, and prevents any remaining items from
		 * starting to download. Note that currently any active loads will remain open, and events may be processed.
		 *
		 * To stop and restart a queue, use the {{#crossLink "LoadQueue/setPaused"}}{{/crossLink}} method instead.
		 */
		close() : void;
	}
	
	/**
	 * A loader for JSON manifests. Items inside the manifest are loaded before the loader completes. To load manifests
	 * using JSONP, specify a {{#crossLink "LoadItem/callback:property"}}{{/crossLink}} as part of the
	 * {{#crossLink "LoadItem"}}{{/crossLink}}. Note that the {{#crossLink "JSONLoader"}}{{/crossLink}} and
	 * {{#crossLink "JSONPLoader"}}{{/crossLink}} are higher priority loaders, so manifests <strong>must</strong>
	 * set the {{#crossLink "LoadItem"}}{{/crossLink}} {{#crossLink "LoadItem/type:property"}}{{/crossLink}} property
	 * to {{#crossLink "AbstractLoader/MANIFEST:property"}}{{/crossLink}}.
	 */
	export class ManifestLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/MANIFEST:property"}}{{/crossLink}}
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * Represents an affine transformation matrix, and provides tools for constructing and concatenating matrices.
	 *
	 * This matrix can be visualized as:
	 *
	 * 	[ a  c  tx
	 * 	  b  d  ty
	 * 	  0  0  1  ]
	 *
	 * Note the locations of b and c.
	 */
	export class Matrix2D
	{
		constructor(a?:number, b?:number, c?:number, d?:number, tx?:number, ty?:number);
		/**
		 * Position (0, 0) in a 3x3 affine transformation matrix.
		 */
		a : number;
		/**
		 * Position (0, 1) in a 3x3 affine transformation matrix.
		 */
		b : number;
		/**
		 * Position (1, 0) in a 3x3 affine transformation matrix.
		 */
		c : number;
		/**
		 * Position (1, 1) in a 3x3 affine transformation matrix.
		 */
		d : number;
		/**
		 * Position (2, 0) in a 3x3 affine transformation matrix.
		 */
		tx : number;
		/**
		 * Position (2, 1) in a 3x3 affine transformation matrix.
		 */
		ty : number;
		/**
		 * Sets the specified values on this instance.
		 */
		setValues(a?:number, b?:number, c?:number, d?:number, tx?:number, ty?:number) : createjs.Matrix2D;
		/**
		 * Appends the specified matrix properties to this matrix. All parameters are required.
		 * This is the equivalent of multiplying `(this matrix) * (specified matrix)`.
		 */
		append(a:number, b:number, c:number, d:number, tx:number, ty:number) : createjs.Matrix2D;
		/**
		 * Prepends the specified matrix properties to this matrix.
		 * This is the equivalent of multiplying `(specified matrix) * (this matrix)`.
		 * All parameters are required.
		 */
		prepend(a:number, b:number, c:number, d:number, tx:number, ty:number) : createjs.Matrix2D;
		/**
		 * Appends the specified matrix to this matrix.
		 * This is the equivalent of multiplying `(this matrix) * (specified matrix)`.
		 */
		appendMatrix(matrix:createjs.Matrix2D) : createjs.Matrix2D;
		/**
		 * Prepends the specified matrix to this matrix.
		 * This is the equivalent of multiplying `(specified matrix) * (this matrix)`.
		 * For example, you could calculate the combined transformation for a child object using:
		 *
		 * 	var o = myDisplayObject;
		 * 	var mtx = o.getMatrix();
		 * 	while (o = o.parent) {
		 * 		// prepend each parent's transformation in turn:
		 * 		o.prependMatrix(o.getMatrix());
		 * 	}
		 */
		prependMatrix(matrix:createjs.Matrix2D) : createjs.Matrix2D;
		/**
		 * Generates matrix properties from the specified display object transform properties, and appends them to this matrix.
		 * For example, you can use this to generate a matrix representing the transformations of a display object:
		 *
		 * 	var mtx = new Matrix2D();
		 * 	mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 */
		appendTransform(x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number, skewY:number, regX?:number, regY?:number) : createjs.Matrix2D;
		/**
		 * Generates matrix properties from the specified display object transform properties, and prepends them to this matrix.
		 * For example, you could calculate the combined transformation for a child object using:
		 *
		 * 	var o = myDisplayObject;
		 * 	var mtx = new createjs.Matrix2D();
		 * 	do  {
		 * 		// prepend each parent's transformation in turn:
		 * 		mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
		 * 	} while (o = o.parent);
		 *
		 * 	Note that the above example would not account for {{#crossLink "DisplayObject/transformMatrix:property"}}{{/crossLink}}
		 * 	values. See {{#crossLink "Matrix2D/prependMatrix"}}{{/crossLink}} for an example that does.
		 */
		prependTransform(x:number, y:number, scaleX:number, scaleY:number, rotation:number, skewX:number, skewY:number, regX?:number, regY?:number) : createjs.Matrix2D;
		/**
		 * Applies a clockwise rotation transformation to the matrix.
		 */
		rotate(angle:number) : createjs.Matrix2D;
		/**
		 * Applies a skew transformation to the matrix.
		 */
		skew(skewX:number, skewY:number) : createjs.Matrix2D;
		/**
		 * Applies a scale transformation to the matrix.
		 */
		scale(x:number, y:number) : createjs.Matrix2D;
		/**
		 * Translates the matrix on the x and y axes.
		 */
		translate(x:number, y:number) : createjs.Matrix2D;
		/**
		 * Inverts the matrix, causing it to perform the opposite transformation.
		 */
		invert() : createjs.Matrix2D;
		/**
		 * Returns true if the matrix is an identity matrix.
		 */
		isIdentity() : boolean;
		/**
		 * Returns true if this matrix is equal to the specified matrix (all property values are equal).
		 */
		equals(matrix:createjs.Matrix2D) : boolean;
		/**
		 * Transforms a point according to this matrix.
		 */
		transformPoint(x:number, y:number, pt?:any) : createjs.Point;
		/**
		 * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that these values
		 * may not match the transform properties you used to generate the matrix, though they will produce the same visual
		 * results.
		 */
		decompose(target?:any) : any;
		/**
		 * Copies all properties from the specified matrix to this matrix.
		 */
		copy(matrix:createjs.Matrix2D) : createjs.Matrix2D;
		/**
		 * Returns a clone of the Matrix2D instance.
		 */
		clone() : createjs.Matrix2D;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * Multiplier for converting degrees to radians. Used internally by Matrix2D.
		 */
		static DEG_TO_RAD : number;
		/**
		 * An identity matrix, representing a null transformation.
		 */
		static identity : createjs.Matrix2D;
	}
	
	/**
	 * An {{#crossLink "TagRequest"}}{{/crossLink}} that loads HTML tags for video and audio.
	 */
	export class MediaTagRequest
	{
		constructor(loadItem:createjs.LoadItem, tag:any, srcAttribute:string);
	}
	
	/**
	 * A TweenJS plugin for working with motion guides.
	 *
	 * To use, install the plugin after TweenJS has loaded. Next tween the 'guide' property with an object as detailed below.
	 *
	 *       createjs.MotionGuidePlugin.install();
	 *
	 * <h4>Example</h4>
	 *
	 *      // Using a Motion Guide
	 * 	    createjs.Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
	 * 	    // Visualizing the line
	 * 	    graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
	 *
	 * Each path needs pre-computation to ensure there's fast performance. Because of the pre-computation there's no
	 * built in support for path changes mid tween. These are the Guide Object's properties:<UL>
	 *      <LI> path: Required, Array : The x/y points used to draw the path with a moveTo and 1 to n curveTo calls.</LI>
	 *      <LI> start: Optional, 0-1 : Initial position, default 0 except for when continuing along the same path.</LI>
	 *      <LI> end: Optional, 0-1 : Final position, default 1 if not specified.</LI>
	 *      <LI> orient: Optional, string : "fixed"/"auto"/"cw"/"ccw"<UL>
	 * 				<LI>"fixed" forces the object to face down the path all movement (relative to start rotation),</LI>
	 *      		<LI>"auto" rotates the object along the path relative to the line.</LI>
	 *      		<LI>"cw"/"ccw" force clockwise or counter clockwise rotations including flash like behaviour</LI>
	 * 		</UL></LI>
	 * </UL>
	 * Guide objects should not be shared between tweens even if all properties are identical, the library stores
	 * information on these objects in the background and sharing them can cause unexpected behaviour. Values
	 * outside 0-1 range of tweens will be a "best guess" from the appropriate part of the defined curve.
	 */
	export class MotionGuidePlugin
	{
		constructor();
		/**
		 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
		 */
		static install() : void;
	}
	
	/**
	 * Passed as the parameter to all mouse/pointer/touch related events. For a listing of mouse events and their properties,
	 * see the {{#crossLink "DisplayObject"}}{{/crossLink}} and {{#crossLink "Stage"}}{{/crossLink}} event listings.
	 */
	export class MouseEvent extends createjs.Event
	{
		constructor(type:string, bubbles:boolean, cancelable:boolean, stageX:number, stageY:number, nativeEvent:createjs.MouseEvent, pointerID:number, primary:boolean, rawX:number, rawY:number);
		/**
		 * The normalized x position on the stage. This will always be within the range 0 to stage width.
		 */
		stageX : number;
		/**
		 * The normalized y position on the stage. This will always be within the range 0 to stage height.
		 */
		stageY : number;
		/**
		 * The raw x position relative to the stage. Normally this will be the same as the stageX value, unless
		 * stage.mouseMoveOutside is true and the pointer is outside of the stage bounds.
		 */
		rawX : number;
		/**
		 * The raw y position relative to the stage. Normally this will be the same as the stageY value, unless
		 * stage.mouseMoveOutside is true and the pointer is outside of the stage bounds.
		 */
		rawY : number;
		/**
		 * The native MouseEvent generated by the browser. The properties and API for this
		 * event may differ between browsers. This property will be null if the
		 * EaselJS property was not directly generated from a native MouseEvent.
		 */
		nativeEvent : MouseEvent;
		/**
		 * The unique id for the pointer (touch point or cursor). This will be either -1 for the mouse, or the system
		 * supplied id value.
		 */
		pointerID : number;
		/**
		 * Indicates whether this is the primary pointer in a multitouch environment. This will always be true for the mouse.
		 * For touch pointers, the first pointer in the current stack will be considered the primary pointer.
		 */
		primary : boolean;
		/**
		 * Returns the x position of the mouse in the local coordinate system of the current target (ie. the dispatcher).
		 */
		localX : number;
		/**
		 * Returns the y position of the mouse in the local coordinate system of the current target (ie. the dispatcher).
		 */
		localY : number;
		/**
		 * Indicates whether the event was generated by a touch input (versus a mouse input).
		 */
		isTouch : boolean;
		/**
		 * Returns a clone of the MouseEvent instance.
		 */
		clone() : createjs.Event;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * The MovieClip class associates a TweenJS Timeline with an EaselJS {{#crossLink "Container"}}{{/crossLink}}. It allows
	 * you to create objects which encapsulate timeline animations, state changes, and synched actions. Due to the
	 * complexities inherent in correctly setting up a MovieClip, it is largely intended for tool output and is not included
	 * in the main EaselJS library.
	 *
	 * Currently MovieClip only works properly if it is tick based (as opposed to time based) though some concessions have
	 * been made to support time-based timelines in the future.
	 *
	 * <h4>Example</h4>
	 * This example animates two shapes back and forth. The grey shape starts on the left, but we jump to a mid-point in
	 * the animation using {{#crossLink "MovieClip/gotoAndPlay"}}{{/crossLink}}.
	 *
	 *      var stage = new createjs.Stage("canvas");
	 *      createjs.Ticker.addEventListener("tick", stage);
	 *
	 *      var mc = new createjs.MovieClip(null, 0, true, {start:20});
	 *      stage.addChild(mc);
	 *
	 *      var child1 = new createjs.Shape(
	 *          new createjs.Graphics().beginFill("#999999")
	 *              .drawCircle(30,30,30));
	 *      var child2 = new createjs.Shape(
	 *          new createjs.Graphics().beginFill("#5a9cfb")
	 *              .drawCircle(30,30,30));
	 *
	 *      mc.timeline.addTween(
	 *          createjs.Tween.get(child1)
	 *              .to({x:0}).to({x:60}, 50).to({x:0}, 50));
	 *      mc.timeline.addTween(
	 *          createjs.Tween.get(child2)
	 *              .to({x:60}).to({x:0}, 50).to({x:60}, 50));
	 *
	 *      mc.gotoAndPlay("start");
	 *
	 * It is recommended to use <code>tween.to()</code> to animate and set properties (use no duration to have it set
	 * immediately), and the <code>tween.wait()</code> method to create delays between animations. Note that using the
	 * <code>tween.set()</code> method to affect properties will likely not provide the desired result.
	 */
	export class MovieClip extends createjs.Container
	{
		constructor(mode?:string, startPosition?:number, loop?:boolean, labels?:any);
		/**
		 * Controls how this MovieClip advances its time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
		 * See each constant for a description of the behaviour.
		 */
		mode : string;
		/**
		 * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
		 */
		startPosition : number;
		/**
		 * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
		 */
		loop : boolean;
		/**
		 * The current frame of the movieclip.
		 */
		currentFrame : number;
		/**
		 * The TweenJS Timeline that is associated with this MovieClip. This is created automatically when the MovieClip
		 * instance is initialized. Animations are created by adding <a href="http://tweenjs.com">TweenJS</a> Tween
		 * instances to the timeline.
		 *
		 * <h4>Example</h4>
		 *
		 *      var tween = createjs.Tween.get(target).to({x:0}).to({x:100}, 30);
		 *      var mc = new createjs.MovieClip();
		 *      mc.timeline.addTween(tween);
		 *
		 * Elements can be added and removed from the timeline by toggling an "_off" property
		 * using the <code>tweenInstance.to()</code> method. Note that using <code>Tween.set</code> is not recommended to
		 * create MovieClip animations. The following example will toggle the target off on frame 0, and then back on for
		 * frame 1. You can use the "visible" property to achieve the same effect.
		 *
		 *      var tween = createjs.Tween.get(target).to({_off:false})
		 *          .wait(1).to({_off:true})
		 *          .wait(1).to({_off:false});
		 */
		timeline : createjs.Timeline;
		/**
		 * If true, the MovieClip's position will not advance when ticked.
		 */
		paused : boolean;
		/**
		 * If true, actions in this MovieClip's tweens will be run when the playhead advances.
		 */
		actionsEnabled : boolean;
		/**
		 * If true, the MovieClip will automatically be reset to its first frame whenever the timeline adds
		 * it back onto the display list. This only applies to MovieClip instances with mode=INDEPENDENT.
		 * <br><br>
		 * For example, if you had a character animation with a "body" child MovieClip instance
		 * with different costumes on each frame, you could set body.autoReset = false, so that
		 * you can manually change the frame it is on, without worrying that it will be reset
		 * automatically.
		 */
		autoReset : boolean;
		/**
		 * An array of bounds for each frame in the MovieClip. This is mainly intended for tool output.
		 */
		frameBounds : any[];
		/**
		 * By default MovieClip instances advance one frame per tick. Specifying a framerate for the MovieClip
		 * will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
		 * framerate.
		 *
		 * For example, if a MovieClip with a framerate of 10 is placed on a Stage being updated at 40fps, then the MovieClip will
		 * advance roughly one frame every 4 ticks. This will not be exact, because the time between each tick will
		 * vary slightly between frames.
		 *
		 * This feature is dependent on the tick event object (or an object with an appropriate "delta" property) being
		 * passed into {{#crossLink "Stage/update"}}{{/crossLink}}.
		 */
		framerate : number;
		/**
		 * Returns an array of objects with label and position (aka frame) properties, sorted by position.
		 * Shortcut to TweenJS: Timeline.getLabels();
		 */
		labels : any[];
		/**
		 * Returns the name of the label on or immediately before the current frame. See TweenJS: Timeline.getCurrentLabel()
		 * for more information.
		 */
		currentLabel : string;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Sets paused to false.
		 */
		play() : void;
		/**
		 * Sets paused to true.
		 */
		stop() : void;
		/**
		 * Advances this movie clip to the specified position or label and sets paused to false.
		 */
		gotoAndPlay(positionOrLabel:any) : void;
		/**
		 * Advances this movie clip to the specified position or label and sets paused to true.
		 */
		gotoAndStop(positionOrLabel:any) : void;
		/**
		 * Advances the playhead. This occurs automatically each tick by default.
		 */
		advance(time?:number) : void;
		/**
		 * MovieClip instances cannot be cloned.
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * The MovieClip will advance independently of its parent, even if its parent is paused.
		 * This is the default mode.
		 */
		static INDEPENDENT : string;
		/**
		 * The MovieClip will only display a single frame (as determined by the startPosition property).
		 */
		static SINGLE_FRAME : string;
		/**
		 * The MovieClip will be advanced only when its parent advances and will be synched to the position of
		 * the parent MovieClip.
		 */
		static SYNCHED : string;
	}
	
	/**
	 * This plugin works with <a href="http://tweenjs.com" target="_blank">TweenJS</a> to prevent the startPosition
	 * property from tweening.
	 */
	export class MovieClipPlugin
	{
		constructor();
		tween(tween:createjs.Tween, prop:string, value:any, startValues:any[], endValues:any[], ratio:number, wait:any, end:any) : any;
	}
	
	/**
	 * Represents a point on a 2 dimensional x / y coordinate system.
	 *
	 * <h4>Example</h4>
	 *
	 *      var point = new createjs.Point(0, 100);
	 */
	export class Point
	{
		constructor(x?:number, y?:number);
		/**
		 * X position.
		 */
		x : number;
		/**
		 * Y position.
		 */
		y : number;
		/**
		 * Sets the specified values on this instance.
		 */
		setValues(x?:number, y?:number) : createjs.Point;
		/**
		 * Copies all properties from the specified point to this point.
		 */
		copy(point:createjs.Point) : createjs.Point;
		/**
		 * Returns a clone of the Point instance.
		 */
		clone() : createjs.Point;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A createjs {{#crossLink "Event"}}{{/crossLink}} that is dispatched when progress changes.
	 */
	export class ProgressEvent
	{
		constructor(loaded:number, total?:number);
		/**
		 * The amount that has been loaded (out of a total amount)
		 */
		loaded : number;
		/**
		 * The total "size" of the load.
		 */
		total : number;
		/**
		 * The percentage (out of 1) that the load has been completed. This is calculated using `loaded/total`.
		 */
		progress : number;
		/**
		 * Returns a clone of the ProgressEvent instance.
		 */
		clone() : createjs.ProgressEvent;
	}
	
	/**
	 * Represents a rectangle as defined by the points (x, y) and (x+width, y+height).
	 *
	 * <h4>Example</h4>
	 *
	 *      var rect = new createjs.Rectangle(0, 0, 100, 100);
	 */
	export class Rectangle
	{
		constructor(x?:number, y?:number, width?:number, height?:number);
		/**
		 * X position.
		 */
		x : number;
		/**
		 * Y position.
		 */
		y : number;
		/**
		 * Width.
		 */
		width : number;
		/**
		 * Height.
		 */
		height : number;
		/**
		 * Sets the specified values on this instance.
		 */
		setValues(x?:number, y?:number, width?:number, height?:number) : createjs.Rectangle;
		/**
		 * Extends the rectangle's bounds to include the described point or rectangle.
		 */
		extend(x:number, y:number, width?:number, height?:number) : createjs.Rectangle;
		/**
		 * Adds the specified padding to the rectangle's bounds.
		 */
		pad(top?:number, left?:number, right?:number, bottom?:number) : createjs.Rectangle;
		/**
		 * Copies all properties from the specified rectangle to this rectangle.
		 */
		copy(rectangle:createjs.Rectangle) : createjs.Rectangle;
		/**
		 * Returns true if this rectangle fully encloses the described point or rectangle.
		 */
		contains(x:number, y:number, width?:number, height?:number) : boolean;
		/**
		 * Returns a new rectangle which contains this rectangle and the specified rectangle.
		 */
		union(rect:createjs.Rectangle) : createjs.Rectangle;
		/**
		 * Returns a new rectangle which describes the intersection (overlap) of this rectangle and the specified rectangle,
		 * or null if they do not intersect.
		 */
		intersection(rect:createjs.Rectangle) : createjs.Rectangle;
		/**
		 * Returns true if the specified rectangle intersects (has any overlap) with this rectangle.
		 */
		intersects(rect:createjs.Rectangle) : boolean;
		/**
		 * Returns true if the width or height are equal or less than 0.
		 */
		isEmpty() : boolean;
		/**
		 * Returns a clone of the Rectangle instance.
		 */
		clone() : createjs.Rectangle;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * Utilities that assist with parsing load items, and determining file types, etc.
	 */
	export class RequestUtils
	{
		/**
		 * The Regular Expression used to test file URLS for an absolute path.
		 */
		static ABSOLUTE_PATH : any;
		/**
		 * The Regular Expression used to test file URLS for a relative path.
		 */
		static RELATIVE_PATH : any;
		/**
		 * The Regular Expression used to test file URLS for an extension. Note that URIs must already have the query string
		 * removed.
		 */
		static EXTENSION_PATT : any;
		/**
		 * Parse a file path to determine the information we need to work with it. Currently, PreloadJS needs to know:
		 * <ul>
		 *     <li>If the path is absolute. Absolute paths start with a protocol (such as `http://`, `file://`, or
		 *     `//networkPath`)</li>
		 *     <li>If the path is relative. Relative paths start with `../` or `/path` (or similar)</li>
		 *     <li>The file extension. This is determined by the filename with an extension. Query strings are dropped, and
		 *     the file path is expected to follow the format `name.ext`.</li>
		 * </ul>
		 */
		static parseURI(path:string) : any;
		/**
		 * Formats an object into a query string for either a POST or GET request.
		 */
		static formatQueryString(data:any, query?:any[]) : void;
		/**
		 * A utility method that builds a file path using a source and a data object, and formats it into a new path.
		 */
		static buildPath(src:string, data?:any) : string;
		static isCrossDomain(item:any) : boolean;
		static isLocal(item:any) : boolean;
		/**
		 * Determine if a specific type should be loaded as a binary file. Currently, only images and items marked
		 * specifically as "binary" are loaded as binary. Note that audio is <b>not</b> a binary type, as we can not play
		 * back using an audio tag if it is loaded as binary. Plugins can change the item type to binary to ensure they get
		 * a binary result to work with. Binary files are loaded using XHR2. Types are defined as static constants on
		 * {{#crossLink "AbstractLoader"}}{{/crossLink}}.
		 */
		static isBinary(type:string) : boolean;
		/**
		 * Check if item is a valid HTMLImageElement
		 */
		static isImageTag(item:any) : boolean;
		/**
		 * Check if item is a valid HTMLAudioElement
		 */
		static isAudioTag(item:any) : boolean;
		/**
		 * Check if item is a valid HTMLVideoElement
		 */
		static isVideoTag(Objectitem:any) : boolean;
		/**
		 * Determine if a specific type is a text-based asset, and should be loaded as UTF-8.
		 */
		static isText(type:string) : boolean;
		/**
		 * Determine the type of the object using common extensions. Note that the type can be passed in with the load item
		 * if it is an unusual extension.
		 */
		static getTypeByExtension(extension:string) : string;
	}
	
	/**
	 * A loader for SVG files.
	 */
	export class SVGLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/SVG:property"}}{{/crossLink}}
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * A PreloadJS plugin provides a way to inject functionality into PreloadJS to load file types that are unsupported,
	 * or in a way that PreloadJS does not.
	 *
	 * <strong>Note that this class is mainly for documentation purposes, and is not a real plugin.</strong>
	 *
	 * Plugins are registered based on file extension, or supported preload types, which are defined as constants on
	 * the {{#crossLink "LoadQueue"}}{{/crossLink}} class. Available load types are:
	 * <ul>
	 *     <li>binary ({{#crossLink "LoadQueue/BINARY:property"}}{{/crossLink}})</li>
	 *     <li>css ({{#crossLink "LoadQueue/CSS:property"}}{{/crossLink}})</li>
	 *     <li>image ({{#crossLink "LoadQueue/IMAGE:property"}}{{/crossLink}})</li>
	 *     <li>javascript ({{#crossLink "LoadQueue/JAVASCRIPT:property"}}{{/crossLink}})</li>
	 *     <li>json ({{#crossLink "LoadQueue/JSON:property"}}{{/crossLink}})</li>
	 *     <li>jsonp ({{#crossLink "LoadQueue/JSONP:property"}}{{/crossLink}})</li>
	 *     <li>manifest ({{#crossLink "LoadQueue/MANIFEST:property"}}{{/crossLink}})</li>
	 *     <li>sound ({{#crossLink "LoadQueue/SOUND:property"}}{{/crossLink}})</li>
	 *     <li>spriteSheet ({{#crossLink "LoadQueue/SPRITESHEET:property"}}{{/crossLink}})</li>
	 *     <li>svg ({{#crossLink "LoadQueue/SVG:property"}}{{/crossLink}})</li>
	 *     <li>text ({{#crossLink "LoadQueue/TEXT:property"}}{{/crossLink}})</li>
	 *     <li>xml ({{#crossLink "LoadQueue/XML:property"}}{{/crossLink}})</li>
	 * </ul>
	 *
	 * A plugin defines what types or extensions it handles via a {{#crossLink "SamplePlugin/getPreloadHandlers"}}{{/crossLink}}
	 * method, which is called when a plugin is first registered.
	 *
	 * To register a plugin with PreloadJS, simply install it into a LoadQueue before files begin to load using the
	 * {{#crossLink "LoadQueue/installPlugin"}}{{/crossLink}} method:
	 *
	 *      var queue = new createjs.LoadQueue();
	 *      queue.installPlugin(createjs.SamplePlugin);
	 *      queue.loadFile("test.jpg");
	 *
	 * The {{#crossLink "SamplePlugin/getPreloadHandlers"}}{{/crossLink}} method can also return a `callback`
	 * property, which is a function that will be invoked before each file is loaded. Check out the {{#crossLink "SamplePlugin/preloadHandler"}}{{/crossLink}}
	 * for more information on how the callback works. For example, the SoundJS plugin allows PreloadJS to manage a
	 * download that uses the Flash Player.
	 */
	export class SamplePlugin
	{
		/**
		 * When a plugin is installed, this method will be called to let PreloadJS know when to invoke the plugin.
		 *
		 * PreloadJS expects this method to return an object containing:
		 * <ul>
		 *     <li><strong>callback:</strong> The function to call on the plugin class right before an item is loaded. Check
		 *     out the {{#crossLink "SamplePlugin/preloadHandler"}}{{/crossLink}} method for more information. The callback
		 *     is automatically called in the scope of the plugin.</li>
		 *     <li><strong>types:</strong> An array of recognized PreloadJS load types to handle. Supported load types are
		 *     "binary","image", "javascript", "json", "jsonp", "sound", "svg", "text", and "xml".</li>
		 *     <li><strong>extensions:</strong> An array of strings containing file extensions to handle, such as "jpg",
		 *     "mp3", etc. This only fires if an applicable type handler is not found by the plugin.</li>
		 * </ul>
		 *
		 * Note that currently, PreloadJS only supports a single handler for each extension or file type.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Check out the SamplePlugin source for a more complete example.
		 *      SamplePlugin.getPreloadHandlers = function() {
		 *          return {
		 *              callback: SamplePlugin.preloadHandler,
		 *              extensions: ["jpg", "jpeg", "png", "gif"]
		 *          }
		 *      }
		 *
		 * If a plugin provides both "type" and "extension" handlers, the type handler will take priority, and will only
		 * fire once per file. For example if you have a handler for type=sound, and for extension=mp3, the callback will
		 * fire when it matches the type.
		 */
		getPreloadHandlers() : any;
		/**
		 * This is a sample method to show how to handle the callback specified in the {{#crossLink "LoadQueue/getPreloadHandlers"}}{{/crossLink}}.
		 * Right before a file is loaded, if a plugin for the file type or extension is found, then the callback for that
		 * plugin will be invoked. This gives the plugin an opportunity to modify the load item, or even cancel the load.
		 * The return value of the callback determines how PreloadJS will handle the file:
		 * <ul>
		 *     <li><strong>false:</strong> Skip the item. This allows plugins to determine if a file should be loaded or
		 *     not. For example,the plugin could determine if a file type is supported at all on the current system, and
		 *     skip those that do not.</li>
		 *     <li><strong>true:</strong> Continue normally. The plugin will not affect the load.</li>
		 *     <li><strong>AbstractLoader instance:</strong> Used as the loader for the content. This is new in 0.6.0.</li>
		 * </ul>
		 *
		 * Since the {{#crossLink "LoadItem"}}{{/crossLink}} is passed by reference, a plugin can modify as needed, even
		 * appending additional data to it. Note that if the {{#crossLink "LoadItem/src:property"}}{{/crossLink}} is
		 * modified, PreloadJS will automatically update the {{#crossLink "LoadItem/ext:property"}}{{/crossLink}} property.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Cancel a load
		 *      SamplePlugin.preloadHandler = function(loadItem, queue) {
		 *          if (loadItem.id.indexOf("thumb") { return false; } // Don't load items like "image-thumb.png"
		 *          return true;
		 *      }
		 *
		 *      // Specify a completeHandler
		 *      SamplePlugin.preloadHandler = function(loadItem, queue) {
		 *          item.completeHandler = SamplePlugin.fileLoadHandler;
		 *      }
		 *
		 *      // Check out the SamplePlugin source to see another example.
		 *
		 * <em>Note: In 0.4.2 and earlier, instead of a {{#crossLink "LoadItem"}}{{/crossLink}}, arguments were passed in,
		 * and a modified object was returned to PreloadJS. This has been changed to passing a reference to the LoadItem,
		 * which can be directly modified.</em>
		 */
		preloadHandler(loadItem:any, queue:createjs.LoadQueue) : any;
		/**
		 * This is a sample method to show a `completeHandler`, which is optionally specified by the return object in the
		 * {{#crossLink "SamplePlugin/preloadHandler"}}{{/crossLink}}. This sample provides a `completeHandler` to the
		 * {{#crossLink "LoadItem"}}{{/crossLink}}. This method is called after the item has completely loaded, but before
		 * the {{#crossLink "LoadQueue/fileload:event"}}{{/crossLink}} event is dispatched from the {{#crossLink "LoadQueue"}}{{/crossLink}}.
		 *
		 * The provided sample also listens for the {{#crossLink "AbstractLoader/complete:event"}}{{/crossLink}}
		 * event on the loader it returns to show a different usage.
		 */
		fileLoadHandler(event:createjs.Event) : void;
	}
	
	/**
	 * This class encapsulates the properties required to define a shadow to apply to a {{#crossLink "DisplayObject"}}{{/crossLink}}
	 * via its <code>shadow</code> property.
	 *
	 * <h4>Example</h4>
	 *
	 *      myImage.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	 */
	export class Shadow
	{
		constructor(color:string, offsetX:number, offsetY:number, blur:number);
		/**
		 * property color
		 */
		color : string;
		/**
		 * property offsetX
		 */
		offsetX : number;
		/**
		 * property offsetY
		 */
		offsetY : number;
		/**
		 * property blur
		 */
		blur : number;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * Returns a clone of this Shadow instance.
		 */
		clone() : createjs.Shadow;
		/**
		 * An identity shadow object (all properties are set to 0).
		 */
		static identity : createjs.Shadow;
	}
	
	/**
	 * A Shape allows you to display vector art in the display list. It composites a {{#crossLink "Graphics"}}{{/crossLink}}
	 * instance which exposes all of the vector drawing methods. The Graphics instance can be shared between multiple Shape
	 * instances to display the same vector graphics with different positions or transforms.
	 *
	 * If the vector art will not
	 * change between draws, you may want to use the {{#crossLink "DisplayObject/cache"}}{{/crossLink}} method to reduce the
	 * rendering cost.
	 *
	 * <h4>Example</h4>
	 *
	 *      var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
	 *      var shape = new createjs.Shape(graphics);
	 *
	 *      //Alternatively use can also use the graphics property of the Shape class to renderer the same as above.
	 *      var shape = new createjs.Shape();
	 *      shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
	 */
	export class Shape extends createjs.DisplayObject
	{
		constructor(graphics?:createjs.Graphics);
		/**
		 * The graphics instance to display.
		 */
		graphics : createjs.Graphics;
		/**
		 * Returns true or false indicating whether the Shape would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the Shape into the specified context ignoring its visible, alpha, shadow, and transform. Returns true if
		 * the draw was handled (useful for overriding functionality).
		 *
		 * <i>NOTE: This method is mainly for internal use, though it may be useful for advanced uses.</i>
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Returns a clone of this Shape. Some properties that are specific to this instance's current context are reverted to
		 * their defaults (for example .parent).
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * The Sound class is the public API for creating sounds, controlling the overall sound levels, and managing plugins.
	 * All Sound APIs on this class are static.
	 *
	 * <b>Registering and Preloading</b><br />
	 * Before you can play a sound, it <b>must</b> be registered. You can do this with {{#crossLink "Sound/registerSound"}}{{/crossLink}},
	 * or register multiple sounds using {{#crossLink "Sound/registerSounds"}}{{/crossLink}}. If you don't register a
	 * sound prior to attempting to play it using {{#crossLink "Sound/play"}}{{/crossLink}} or create it using {{#crossLink "Sound/createInstance"}}{{/crossLink}},
	 * the sound source will be automatically registered but playback will fail as the source will not be ready. If you use
	 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a>, registration is handled for you when the sound is
	 * preloaded. It is recommended to preload sounds either internally using the register functions or externally using
	 * PreloadJS so they are ready when you want to use them.
	 *
	 * <b>Playback</b><br />
	 * To play a sound once it's been registered and preloaded, use the {{#crossLink "Sound/play"}}{{/crossLink}} method.
	 * This method returns a {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} which can be paused, resumed, muted, etc.
	 * Please see the {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} documentation for more on the instance control APIs.
	 *
	 * <b>Plugins</b><br />
	 * By default, the {{#crossLink "WebAudioPlugin"}}{{/crossLink}} or the {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}
	 * are used (when available), although developers can change plugin priority or add new plugins (such as the
	 * provided {{#crossLink "FlashAudioPlugin"}}{{/crossLink}}). Please see the {{#crossLink "Sound"}}{{/crossLink}} API
	 * methods for more on the playback and plugin APIs. To install plugins, or specify a different plugin order, see
	 * {{#crossLink "Sound/installPlugins"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashAudioPlugin]);
	 *      createjs.Sound.alternateExtensions = ["mp3"];
	 *      createjs.Sound.on("fileload", createjs.proxy(this.loadHandler, (this));
	 *      createjs.Sound.registerSound("path/to/mySound.ogg", "sound");
	 *      function loadHandler(event) {
	 *          // This is fired for each sound that is registered.
	 *          var instance = createjs.Sound.play("sound");  // play using id.  Could also use full source path or event.src.
	 *          instance.on("complete", createjs.proxy(this.handleComplete, this));
	 *          instance.volume = 0.5;
	 *      }
	 *
	 * The maximum number of concurrently playing instances of the same sound can be specified in the "data" argument
	 * of {{#crossLink "Sound/registerSound"}}{{/crossLink}}.  Note that if not specified, the active plugin will apply
	 * a default limit.  Currently HTMLAudioPlugin sets a default limit of 2, while WebAudioPlugin and FlashAudioPlugin set a
	 * default limit of 100.
	 *
	 *      createjs.Sound.registerSound("sound.mp3", "soundId", 4);
	 *
	 * Sound can be used as a plugin with PreloadJS to help preload audio properly. Audio preloaded with PreloadJS is
	 * automatically registered with the Sound class. When audio is not preloaded, Sound will do an automatic internal
	 * load. As a result, it may fail to play the first time play is called if the audio is not finished loading. Use the
	 * {{#crossLink "Sound/fileload"}}{{/crossLink}} event to determine when a sound has finished internally preloading.
	 * It is recommended that all audio is preloaded before it is played.
	 *
	 *      var queue = new createjs.LoadQueue();
	 * 		queue.installPlugin(createjs.Sound);
	 *
	 * <b>Audio Sprites</b><br />
	 * SoundJS has added support for Audio Sprites, available as of version 0.6.0.
	 * For those unfamiliar with audio sprites, they are much like CSS sprites or sprite sheets: multiple audio assets
	 * grouped into a single file.
	 *
	 * Benefits of Audio Sprites
	 * <ul><li>More robust support for older browsers and devices that only allow a single audio instance, such as iOS 5.</li>
	 * <li>They provide a work around for the Internet Explorer 9 audio tag limit, which until now restricted how many
	 * different sounds we could load at once.</li>
	 * <li>Faster loading by only requiring a single network request for several sounds, especially on mobile devices
	 * where the network round trip for each file can add significant latency.</li></ul>
	 *
	 * Drawbacks of Audio Sprites
	 * <ul><li>No guarantee of smooth looping when using HTML or Flash audio.  If you have a track that needs to loop
	 * smoothly and you are supporting non-web audio browsers, do not use audio sprites for that sound if you can avoid it.</li>
	 * <li>No guarantee that HTML audio will play back immediately, especially the first time. In some browsers (Chrome!),
	 * HTML audio will only load enough to play through – so we rely on the “canplaythrough” event to determine if the audio is loaded.
	 * Since audio sprites must jump ahead to play specific sounds, the audio may not yet have downloaded.</li>
	 * <li>Audio sprites share the same core source, so if you have a sprite with 5 sounds and are limited to 2
	 * concurrently playing instances, that means you can only play 2 of the sounds at the same time.</li></ul>
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Sound.initializeDefaultPlugins();
	 * 		var assetsPath = "./assets/";
	 * 		var sounds = [{
	 * 			src:"MyAudioSprite.ogg", data: {
	 * 				audioSprite: [
	 * 					{id:"sound1", startTime:0, duration:500},
	 * 					{id:"sound2", startTime:1000, duration:400},
	 * 					{id:"sound3", startTime:1700, duration: 1000}
	 * 				]}
	 * 				}
	 * 		];
	 * 		createjs.Sound.alternateExtensions = ["mp3"];
	 * 		createjs.Sound.on("fileload", loadSound);
	 * 		createjs.Sound.registerSounds(sounds, assetsPath);
	 * 		// after load is complete
	 * 		createjs.Sound.play("sound2");
	 *
	 * You can also create audio sprites on the fly by setting the startTime and duration when creating an new AbstractSoundInstance.
	 *
	 * 		createjs.Sound.play("MyAudioSprite", {startTime: 1000, duration: 400});
	 *
	 * <b>Mobile Safe Approach</b><br />
	 * Mobile devices require sounds to be played inside of a user initiated event (touch/click) in varying degrees.
	 * As of SoundJS 0.4.1, you can launch a site inside of a user initiated event and have audio playback work. To
	 * enable as broadly as possible, the site needs to setup the Sound plugin in its initialization (for example via
	 * <code>createjs.Sound.initializeDefaultPlugins();</code>), and all sounds need to be played in the scope of the
	 * application.  See the MobileSafe demo for a working example.
	 *
	 * <h4>Example</h4>
	 *
	 *     document.getElementById("status").addEventListener("click", handleTouch, false);    // works on Android and iPad
	 *     function handleTouch(event) {
	 *         document.getElementById("status").removeEventListener("click", handleTouch, false);    // remove the listener
	 *         var thisApp = new myNameSpace.MyApp();    // launch the app
	 *     }
	 *
	 * <h4>Known Browser and OS issues</h4>
	 * <b>IE 9 HTML Audio limitations</b><br />
	 * <ul><li>There is a delay in applying volume changes to tags that occurs once playback is started. So if you have
	 * muted all sounds, they will all play during this delay until the mute applies internally. This happens regardless of
	 * when or how you apply the volume change, as the tag seems to need to play to apply it.</li>
	 * <li>MP3 encoding will not always work for audio tags, particularly in Internet Explorer. We've found default
	 * encoding with 64kbps works.</li>
	 * <li>Occasionally very short samples will get cut off.</li>
	 * <li>There is a limit to how many audio tags you can load and play at once, which appears to be determined by
	 * hardware and browser settings.  See {{#crossLink "HTMLAudioPlugin.MAX_INSTANCES"}}{{/crossLink}} for a safe estimate.</li></ul>
	 *
	 * <b>Firefox 25 Web Audio limitations</b>
	 * <ul><li>mp3 audio files do not load properly on all windows machines, reported
	 * <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=929969" target="_blank">here</a>. </br>
	 * For this reason it is recommended to pass another FF supported type (ie ogg) first until this bug is resolved, if possible.</li></ul>
	 *
	 * <b>Safari limitations</b><br />
	 * <ul><li>Safari requires Quicktime to be installed for audio playback.</li></ul>
	 *
	 * <b>iOS 6 Web Audio limitations</b><br />
	 * <ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event
	 * (touch/click).</li>
	 * <li>A bug exists that will distort un-cached web audio when a video element is present in the DOM that has audio at a different sampleRate.</li>
	 * <li>Note HTMLAudioPlugin is not supported on iOS by default.  See {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}
	 * for more details.</li>
	 * </ul>
	 *
	 * <b>Android HTML Audio limitations</b><br />
	 * <ul><li>We have no control over audio volume. Only the user can set volume on their device.</li>
	 * <li>We can only play audio inside a user event (touch/click).  This currently means you cannot loop sound or use
	 * a delay.</li></ul>
	 */
	export class Sound
	{
		toString() : string;
		/**
		 * The interrupt value to interrupt any currently playing instance with the same source, if the maximum number of
		 * instances of the sound are already playing.
		 */
		static INTERRUPT_ANY : string;
		/**
		 * The interrupt value to interrupt the earliest currently playing instance with the same source that progressed the
		 * least distance in the audio track, if the maximum number of instances of the sound are already playing.
		 */
		static INTERRUPT_EARLY : string;
		/**
		 * The interrupt value to interrupt the currently playing instance with the same source that progressed the most
		 * distance in the audio track, if the maximum number of instances of the sound are already playing.
		 */
		static INTERRUPT_LATE : string;
		/**
		 * The interrupt value to not interrupt any currently playing instances with the same source, if the maximum number of
		 * instances of the sound are already playing.
		 */
		static INTERRUPT_NONE : string;
		/**
		 * Defines the playState of an instance that is still initializing.
		 */
		static PLAY_INITED : string;
		/**
		 * Defines the playState of an instance that is currently playing or paused.
		 */
		static PLAY_SUCCEEDED : string;
		/**
		 * Defines the playState of an instance that was interrupted by another instance.
		 */
		static PLAY_INTERRUPTED : string;
		/**
		 * Defines the playState of an instance that completed playback.
		 */
		static PLAY_FINISHED : string;
		/**
		 * Defines the playState of an instance that failed to play. This is usually caused by a lack of available channels
		 * when the interrupt mode was "INTERRUPT_NONE", the playback stalled, or the sound could not be found.
		 */
		static PLAY_FAILED : string;
		/**
		 * A list of the default supported extensions that Sound will <i>try</i> to play. Plugins will check if the browser
		 * can play these types, so modifying this list before a plugin is initialized will allow the plugins to try to
		 * support additional media types.
		 *
		 * NOTE this does not currently work for {{#crossLink "FlashAudioPlugin"}}{{/crossLink}}.
		 *
		 * More details on file formats can be found at <a href="http://en.wikipedia.org/wiki/Audio_file_format" target="_blank">http://en.wikipedia.org/wiki/Audio_file_format</a>.<br />
		 * A very detailed list of file formats can be found at <a href="http://www.fileinfo.com/filetypes/audio" target="_blank">http://www.fileinfo.com/filetypes/audio</a>.
		 */
		static SUPPORTED_EXTENSIONS : string[];
		/**
		 * Some extensions use another type of extension support to play (one of them is a codex).  This allows you to map
		 * that support so plugins can accurately determine if an extension is supported.  Adding to this list can help
		 * plugins determine more accurately if an extension is supported.
		 *
		 * A useful list of extensions for each format can be found at <a href="http://html5doctor.com/html5-audio-the-state-of-play/" target="_blank">http://html5doctor.com/html5-audio-the-state-of-play/</a>.
		 */
		static EXTENSION_MAP : any;
		/**
		 * Determines the default behavior for interrupting other currently playing instances with the same source, if the
		 * maximum number of instances of the sound are already playing.  Currently the default is {{#crossLink "Sound/INTERRUPT_NONE:property"}}{{/crossLink}}
		 * but this can be set and will change playback behavior accordingly.  This is only used when {{#crossLink "Sound/play"}}{{/crossLink}}
		 * is called without passing a value for interrupt.
		 */
		static defaultInterruptBehavior : string;
		/**
		 * An array of extensions to attempt to use when loading sound, if the default is unsupported by the active plugin.
		 * These are applied in order, so if you try to Load Thunder.ogg in a browser that does not support ogg, and your
		 * extensions array is ["mp3", "m4a", "wav"] it will check mp3 support, then m4a, then wav. The audio files need
		 * to exist in the same location, as only the extension is altered.
		 *
		 * Note that regardless of which file is loaded, you can call {{#crossLink "Sound/createInstance"}}{{/crossLink}}
		 * and {{#crossLink "Sound/play"}}{{/crossLink}} using the same id or full source path passed for loading.
		 *
		 * <h4>Example</h4>
		 *
		 * 	var sounds = [
		 * 		{src:"myPath/mySound.ogg", id:"example"},
		 * 	];
		 * 	createjs.Sound.alternateExtensions = ["mp3"]; // now if ogg is not supported, SoundJS will try asset0.mp3
		 * 	createjs.Sound.on("fileload", handleLoad); // call handleLoad when each sound loads
		 * 	createjs.Sound.registerSounds(sounds, assetPath);
		 * 	// ...
		 * 	createjs.Sound.play("myPath/mySound.ogg"); // works regardless of what extension is supported.  Note calling with ID is a better approach
		 */
		static alternateExtensions : any[];
		/**
		 * The currently active plugin. If this is null, then no plugin could be initialized. If no plugin was specified,
		 * Sound attempts to apply the default plugins: {{#crossLink "WebAudioPlugin"}}{{/crossLink}}, followed by
		 * {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}.
		 */
		static activePlugin : any;
		/**
		 * Register a list of Sound plugins, in order of precedence. To register a single plugin, pass a single element in the array.
		 *
		 * <h4>Example</h4>
		 *
		 *      createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio/";
		 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
		 */
		static registerPlugins(plugins:any[]) : boolean;
		/**
		 * Initialize the default plugins. This method is automatically called when any audio is played or registered before
		 * the user has manually registered plugins, and enables Sound to work without manual plugin setup. Currently, the
		 * default plugins are {{#crossLink "WebAudioPlugin"}}{{/crossLink}} followed by {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}.
		 *
		 * <h4>Example</h4>
		 *
		 * 	if (!createjs.initializeDefaultPlugins()) { return; }
		 */
		static initializeDefaultPlugins() : boolean;
		/**
		 * Determines if Sound has been initialized, and a plugin has been activated.
		 *
		 * <h4>Example</h4>
		 * This example sets up a Flash fallback, but only if there is no plugin specified yet.
		 *
		 * 	if (!createjs.Sound.isReady()) {
		 * 		createjs.FlashAudioPlugin.swfPath = "../src/soundjs/flashaudio/";
		 * 		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
		 * 	}
		 */
		static isReady() : boolean;
		/**
		 * Get the active plugins capabilities, which help determine if a plugin can be used in the current environment,
		 * or if the plugin supports a specific feature. Capabilities include:
		 * <ul>
		 *     <li><b>panning:</b> If the plugin can pan audio from left to right</li>
		 *     <li><b>volume;</b> If the plugin can control audio volume.</li>
		 *     <li><b>tracks:</b> The maximum number of audio tracks that can be played back at a time. This will be -1
		 *     if there is no known limit.</li>
		 * <br />An entry for each file type in {{#crossLink "Sound/SUPPORTED_EXTENSIONS:property"}}{{/crossLink}}:
		 *     <li><b>mp3:</b> If MP3 audio is supported.</li>
		 *     <li><b>ogg:</b> If OGG audio is supported.</li>
		 *     <li><b>wav:</b> If WAV audio is supported.</li>
		 *     <li><b>mpeg:</b> If MPEG audio is supported.</li>
		 *     <li><b>m4a:</b> If M4A audio is supported.</li>
		 *     <li><b>mp4:</b> If MP4 audio is supported.</li>
		 *     <li><b>aiff:</b> If aiff audio is supported.</li>
		 *     <li><b>wma:</b> If wma audio is supported.</li>
		 *     <li><b>mid:</b> If mid audio is supported.</li>
		 * </ul>
		 */
		static getCapabilities() : any;
		/**
		 * Get a specific capability of the active plugin. See {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} for a
		 * full list of capabilities.
		 *
		 * <h4>Example</h4>
		 *
		 *      var maxAudioInstances = createjs.Sound.getCapability("tracks");
		 */
		static getCapability(key:string) : any;
		/**
		 * Register an audio file for loading and future playback in Sound. This is automatically called when using
		 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.  It is recommended to register all sounds that
		 * need to be played back in order to properly prepare and preload them. Sound does internal preloading when required.
		 *
		 * <h4>Example</h4>
		 *
		 *      createjs.Sound.alternateExtensions = ["mp3"];
		 *      createjs.Sound.on("fileload", handleLoad); // add an event listener for when load is completed
		 *      createjs.Sound.registerSound("myAudioPath/mySound.ogg", "myID", 3);
		 */
		static registerSound(src:any, id?:string, data?:any, basePath?:string) : any;
		/**
		 * Register an array of audio files for loading and future playback in Sound. It is recommended to register all
		 * sounds that need to be played back in order to properly prepare and preload them. Sound does internal preloading
		 * when required.
		 *
		 * <h4>Example</h4>
		 *
		 *      var sounds = [
		 *          {src:"asset0.ogg", id:"example"},
		 *          {src:"asset1.ogg", id:"1", data:6},
		 *          {src:"asset2.mp3", id:"works"}
		 *      ];
		 *      createjs.Sound.alternateExtensions = ["mp3"];	// if the passed extension is not supported, try this extension
		 *      createjs.Sound.on("fileload", handleLoad); // call handleLoad when each sound loads
		 *      createjs.Sound.registerSounds(sounds, assetPath);
		 */
		static registerSounds(sounds:any[], basePath:string) : any;
		/**
		 * Deprecated.  Please use {{#crossLink "Sound/registerSounds"}}{{/crossLink} instead.
		 */
		static registerManifest(sounds:any[], basePath:string) : any;
		/**
		 * Remove a sound that has been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
		 * {{#crossLink "Sound/registerSounds"}}{{/crossLink}}.
		 * <br />Note this will stop playback on active instances playing this sound before deleting them.
		 * <br />Note if you passed in a basePath, you need to pass it or prepend it to the src here.
		 *
		 * <h4>Example</h4>
		 *
		 *      createjs.Sound.removeSound("myAudioBasePath/mySound.ogg");
		 *      createjs.Sound.removeSound("myID");
		 */
		static removeSound(src:any, basePath:string) : boolean;
		/**
		 * Remove an array of audio files that have been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
		 * {{#crossLink "Sound/registerSounds"}}{{/crossLink}}.
		 * <br />Note this will stop playback on active instances playing this audio before deleting them.
		 * <br />Note if you passed in a basePath, you need to pass it or prepend it to the src here.
		 *
		 * <h4>Example</h4>
		 *
		 *      var sounds = [
		 *          {src:"asset0.ogg", id:"example"},
		 *          {src:"asset1.ogg", id:"1", data:6},
		 *          {src:"asset2.mp3", id:"works"}
		 *      ];
		 *      createjs.Sound.removeSounds(sounds, assetPath);
		 */
		static removeSounds(sounds:any[], basePath:string) : any;
		/**
		 * Remove all sounds that have been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
		 * {{#crossLink "Sound/registerSounds"}}{{/crossLink}}.
		 * <br />Note this will stop playback on all active sound instances before deleting them.
		 *
		 * <h4>Example</h4>
		 *
		 *     createjs.Sound.removeAllSounds();
		 */
		static removeAllSounds() : void;
		/**
		 * Check if a source has been loaded by internal preloaders. This is necessary to ensure that sounds that are
		 * not completed preloading will not kick off a new internal preload if they are played.
		 *
		 * <h4>Example</h4>
		 *
		 *     var mySound = "assetPath/asset0.ogg";
		 *     if(createjs.Sound.loadComplete(mySound) {
		 *         createjs.Sound.play(mySound);
		 *     }
		 */
		static loadComplete(src:string) : boolean;
		/**
		 * Play a sound and get a {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} to control. If the sound fails to play, a
		 * AbstractSoundInstance will still be returned, and have a playState of {{#crossLink "Sound/PLAY_FAILED:property"}}{{/crossLink}}.
		 * Note that even on sounds with failed playback, you may still be able to call AbstractSoundInstance {{#crossLink "AbstractSoundInstance/play"}}{{/crossLink}},
		 * since the failure could be due to lack of available channels. If the src does not have a supported extension or
		 * if there is no available plugin, a default AbstractSoundInstance will be returned which will not play any audio, but will not generate errors.
		 *
		 * <h4>Example</h4>
		 *
		 *      createjs.Sound.on("fileload", handleLoad);
		 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
		 *      function handleLoad(event) {
		 *      	createjs.Sound.play("myID");
		 *      	// we can pass in options we want to set inside of an object, and store off AbstractSoundInstance for controlling
		 *      	var myInstance = createjs.Sound.play("myID", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
		 *      	// alternately, we can pass full source path and specify each argument individually
		 *      	var myInstance = createjs.Sound.play("myAudioPath/mySound.mp3", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 1, 0);
		 *      }
		 *
		 * NOTE to create an audio sprite that has not already been registered, both startTime and duration need to be set.
		 * This is only when creating a new audio sprite, not when playing using the id of an already registered audio sprite.
		 */
		static play(src:string, options:SoundOptions) : AbstractSoundInstance;
		static play(src:string, interrupt?:string, delay?:number, offset?:number, loop?:number, volume?:number, pan?:number, startTime?:number, duration?:number) : createjs.AbstractSoundInstance;
		/**
		 * Creates a {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} using the passed in src. If the src does not have a
		 * supported extension or if there is no available plugin, a default AbstractSoundInstance will be returned that can be
		 * called safely but does nothing.
		 *
		 * <h4>Example</h4>
		 *
		 *      var myInstance = null;
		 *      createjs.Sound.on("fileload", handleLoad);
		 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
		 *      function handleLoad(event) {
		 *      	myInstance = createjs.Sound.createInstance("myID");
		 *      	// alternately we could call the following
		 *      	myInstance = createjs.Sound.createInstance("myAudioPath/mySound.mp3");
		 *      }
		 *
		 * NOTE to create an audio sprite that has not already been registered, both startTime and duration need to be set.
		 * This is only when creating a new audio sprite, not when playing using the id of an already registered audio sprite.
		 */
		static createInstance(src:string, startTime?:number, duration?:number) : createjs.AbstractSoundInstance;
		/**
		 * Set the master volume of Sound. The master volume is multiplied against each sound's individual volume.  For
		 * example, if master volume is 0.5 and a sound's volume is 0.5, the resulting volume is 0.25. To set individual
		 * sound volume, use AbstractSoundInstance {{#crossLink "AbstractSoundInstance/setVolume"}}{{/crossLink}} instead.
		 *
		 * <h4>Example</h4>
		 *
		 *     createjs.Sound.setVolume(0.5);
		 */
		static setVolume(value:number) : void;
		/**
		 * Get the master volume of Sound. The master volume is multiplied against each sound's individual volume.
		 * To get individual sound volume, use AbstractSoundInstance {{#crossLink "AbstractSoundInstance/volume:property"}}{{/crossLink}} instead.
		 *
		 * <h4>Example</h4>
		 *
		 *     var masterVolume = createjs.Sound.getVolume();
		 */
		static getVolume() : number;
		/**
		 * Mute/Unmute all audio. Note that muted audio still plays at 0 volume. This global mute value is maintained
		 * separately and when set will override, but not change the mute property of individual instances. To mute an individual
		 * instance, use AbstractSoundInstance {{#crossLink "AbstractSoundInstance/setMute"}}{{/crossLink}} instead.
		 *
		 * <h4>Example</h4>
		 *
		 *     createjs.Sound.setMute(true);
		 */
		static setMute(value:boolean) : boolean;
		/**
		 * Returns the global mute value. To get the mute value of an individual instance, use AbstractSoundInstance
		 * {{#crossLink "AbstractSoundInstance/getMute"}}{{/crossLink}} instead.
		 *
		 * <h4>Example</h4>
		 *
		 *     var muted = createjs.Sound.getMute();
		 */
		static getMute() : boolean;
		/**
		 * Stop all audio (global stop). Stopped audio is reset, and not paused. To play audio that has been stopped,
		 * call AbstractSoundInstance {{#crossLink "AbstractSoundInstance/play"}}{{/crossLink}}.
		 *
		 * <h4>Example</h4>
		 *
		 *     createjs.Sound.stop();
		 */
		static stop() : void;
		/**
		 * Static initializer to mix EventDispatcher methods into a target object or prototype.
		 *
		 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
		 * 		EventDispatcher.initialize(myObject); // add to a specific instance
		 */
		static initialize(target:any) : void;
		/**
		 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
		 * multiple callbacks getting fired.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.addEventListener("click", handleClick);
		 *      function handleClick(event) {
		 *         // Click happened.
		 *      }
		 */
		static addEventListener(type:string, listener:any, useCapture?:boolean) : any;
		/**
		 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
		 * only run once, associate arbitrary data with the listener, and remove the listener.
		 *
		 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
		 * The created anonymous function is returned for use with .removeEventListener (or .off).
		 *
		 * <h4>Example</h4>
		 *
		 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
		 * 		function handleClick(evt, data) {
		 * 			data.count -= 1;
		 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
		 * 			if (data.count == 0) {
		 * 				alert("clicked 3 times!");
		 * 				myBtn.off("click", listener);
		 * 				// alternately: evt.remove();
		 * 			}
		 * 		}
		 */
		static on(type:string, listener:any, scope?:any, once?:boolean, data?:any, useCapture?:boolean) : any;
		/**
		 * Removes the specified event listener.
		 *
		 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
		 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
		 * closure will not work.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.removeEventListener("click", handleClick);
		 */
		static removeEventListener(type:string, listener:any, useCapture?:boolean) : void;
		/**
		 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
		 * .on method.
		 */
		static off(type:string, listener:any, useCapture?:boolean) : void;
		/**
		 * Removes all listeners for the specified type, or all listeners of all types.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Remove all listeners
		 *      displayObject.removeAllEventListeners();
		 *
		 *      // Remove all click listeners
		 *      displayObject.removeAllEventListeners("click");
		 */
		static removeAllEventListeners(type?:string) : void;
		/**
		 * Dispatches the specified event to all listeners.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Use a string event
		 *      this.dispatchEvent("complete");
		 *
		 *      // Use an Event instance
		 *      var event = new createjs.Event("progress");
		 *      this.dispatchEvent(event);
		 */
		static dispatchEvent(eventObj:any) : boolean;
		/**
		 * Indicates whether there is at least one listener for the specified event type.
		 */
		static hasEventListener(type:string) : boolean;
		/**
		 * Indicates whether there is at least one listener for the specified event type on this object or any of its
		 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
		 * specified type is dispatched from this object, it will trigger at least one listener.
		 *
		 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
		 * event flow for a listener, not just this object.
		 */
		static willTrigger(type:string) : boolean;
	}
	
	/**
	 * A loader for HTML audio files. PreloadJS can not load WebAudio files, as a WebAudio context is required, which
	 * should be created by either a library playing the sound (such as <a href="http://soundjs.com">SoundJS</a>, or an
	 * external framework that handles audio playback. To load content that can be played by WebAudio, use the
	 * {{#crossLink "BinaryLoader"}}{{/crossLink}}, and handle the audio context decoding manually.
	 */
	export class SoundLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/SOUND:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	type SoundOptions =
	{
		/**
		 * The delay in milliseconds before the sound starts.
		 */
		delay : number;
		/**
		 * To create an audio sprite (with startTime), the amount of time to play the clip for, in milliseconds.
		 */
		duration : number;
		interrupt : string;
		/**
		 * The number of times to loop the audio. Use -1 for infinite loops.
		 */
		loop : number;
		/**
		 * How far into the sound to begin playback, in milliseconds.
		 */
		offset : number;
		/**
		 * The pan of the sound between -1 (left) and 1 (right). Note that pan is not supported for HTML Audio.
		 */
		pan : number;
		/**
		 * To create an audio sprite (with duration), the initial offset to start playback and loop from, in milliseconds.
		 */
		startTime : number;
		/**
		 * The volume of the sound, between 0 and 1.
		 */
		volume : number;
	}
	
	/**
	 * Displays a frame or sequence of frames (ie. an animation) from a SpriteSheet instance. A sprite sheet is a series of
	 * images (usually animation frames) combined into a single image. For example, an animation consisting of 8 100x100
	 * images could be combined into a 400x200 sprite sheet (4 frames across by 2 high). You can display individual frames,
	 * play frames as an animation, and even sequence animations together.
	 *
	 * See the {{#crossLink "SpriteSheet"}}{{/crossLink}} class for more information on setting up frames and animations.
	 *
	 * <h4>Example</h4>
	 *
	 *      var instance = new createjs.Sprite(spriteSheet);
	 *      instance.gotoAndStop("frameName");
	 *
	 * Until {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} or {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}} is called,
	 * only the first defined frame defined in the sprite sheet will be displayed.
	 */
	export class Sprite extends createjs.DisplayObject
	{
		constructor(spriteSheet:createjs.SpriteSheet, frameOrAnimation?:any);
		/**
		 * The frame index that will be drawn when draw is called. Note that with some {{#crossLink "SpriteSheet"}}{{/crossLink}}
		 * definitions, this will advance non-sequentially. This will always be an integer value.
		 */
		currentFrame : number;
		/**
		 * Returns the name of the currently playing animation.
		 */
		currentAnimation : string;
		/**
		 * Prevents the animation from advancing each tick automatically. For example, you could create a sprite
		 * sheet of icons, set paused to true, and display the appropriate icon by setting <code>currentFrame</code>.
		 */
		paused : boolean;
		/**
		 * The SpriteSheet instance to play back. This includes the source image, frame dimensions, and frame
		 * data. See {{#crossLink "SpriteSheet"}}{{/crossLink}} for more information.
		 */
		spriteSheet : createjs.SpriteSheet;
		/**
		 * Specifies the current frame index within the currently playing animation. When playing normally, this will increase
		 * from 0 to n-1, where n is the number of frames in the current animation.
		 *
		 * This could be a non-integer value if
		 * using time-based playback (see {{#crossLink "Sprite/framerate"}}{{/crossLink}}, or if the animation's speed is
		 * not an integer.
		 */
		currentAnimationFrame : number;
		/**
		 * By default Sprite instances advance one frame per tick. Specifying a framerate for the Sprite (or its related
		 * SpriteSheet) will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
		 * framerate.
		 *
		 * For example, if a Sprite with a framerate of 10 is placed on a Stage being updated at 40fps, then the Sprite will
		 * advance roughly one frame every 4 ticks. This will not be exact, because the time between each tick will
		 * vary slightly between frames.
		 *
		 * This feature is dependent on the tick event object (or an object with an appropriate "delta" property) being
		 * passed into {{#crossLink "Stage/update"}}{{/crossLink}}.
		 */
		framerate : number;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Because the content of a Sprite is already in a raster format, cache is unnecessary for Sprite instances.
		 * You should not cache Sprite instances as it can degrade performance.
		 */
		cache(x:number, y:number, width:number, height:number, scale?:number) : void;
		/**
		 * Because the content of a Sprite is already in a raster format, cache is unnecessary for Sprite instances.
		 * You should not cache Sprite instances as it can degrade performance.
		 */
		updateCache(compositeOperation:string) : void;
		/**
		 * Because the content of a Sprite is already in a raster format, cache is unnecessary for Sprite instances.
		 * You should not cache Sprite instances as it can degrade performance.
		 */
		uncache() : void;
		/**
		 * Play (unpause) the current animation. The Sprite will be paused if either {{#crossLink "Sprite/stop"}}{{/crossLink}}
		 * or {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} is called. Single frame animations will remain
		 * unchanged.
		 */
		play() : void;
		/**
		 * Stop playing a running animation. The Sprite will be playing if {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}}
		 * is called. Note that calling {{#crossLink "Sprite/gotoAndPlay"}}{{/crossLink}} or {{#crossLink "Sprite/play"}}{{/crossLink}}
		 * will resume playback.
		 */
		stop() : void;
		/**
		 * Sets paused to false and plays the specified animation name, named frame, or frame number.
		 */
		gotoAndPlay(frameOrAnimation:any) : void;
		/**
		 * Sets paused to true and seeks to the specified animation name, named frame, or frame number.
		 */
		gotoAndStop(frameOrAnimation:any) : void;
		/**
		 * Advances the playhead. This occurs automatically each tick by default.
		 */
		advance(time?:number) : void;
		/**
		 * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the current frame relative to
		 * the origin. For example, a 90 x 70 frame with <code>regX=50</code> and <code>regY=40</code> would return a
		 * rectangle with [x=-50, y=-40, width=90, height=70]. This ignores transformations on the display object.
		 *
		 * Also see the SpriteSheet {{#crossLink "SpriteSheet/getFrameBounds"}}{{/crossLink}} method.
		 */
		getBounds() : createjs.Rectangle;
		/**
		 * Returns a clone of the Sprite instance. Note that the same SpriteSheet is shared between cloned
		 * instances.
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A SpriteContainer is a nestable display list that enables aggressively optimized rendering of bitmap content.
	 * In order to accomplish these optimizations, SpriteContainer enforces a few restrictions on its content.
	 *
	 * Restrictions:
	 *     - only Sprite, SpriteContainer, BitmapText and DOMElement are allowed to be added as children.
	 *     - a spriteSheet MUST be either be passed into the constructor or defined on the first child added.
	 *     - all children (with the exception of DOMElement) MUST use the same spriteSheet.
	 *
	 * <h4>Example</h4>
	 *
	 *      var data = {
	 *          images: ["sprites.jpg"],
	 *          frames: {width:50, height:50},
	 *          animations: {run:[0,4], jump:[5,8,"run"]}
	 *      };
	 *      var spriteSheet = new createjs.SpriteSheet(data);
	 *      var container = new createjs.SpriteContainer(spriteSheet);
	 *      container.addChild(spriteInstance, spriteInstance2);
	 *      container.x = 100;
	 *
	 * <strong>Note:</strong> SpriteContainer is not included in the minified version of EaselJS.
	 */
	export class SpriteContainer extends createjs.Container
	{
		constructor(spriteSheet?:createjs.SpriteSheet);
		/**
		 * The SpriteSheet that this container enforces use of.
		 */
		spriteSheet : createjs.SpriteSheet;
		/**
		 * Adds a child to the top of the display list.
		 * Only children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement are allowed.
		 * The child must have the same spritesheet as this container (unless it's a DOMElement).
		 * If a spritesheet hasn't been defined, this container uses this child's spritesheet.
		 *
		 * <h4>Example</h4>
		 *      container.addChild(bitmapInstance);
		 *
		 *  You can also add multiple children at once:
		 *
		 *      container.addChild(bitmapInstance, shapeInstance, textInstance);
		 */
		addChild(child:createjs.DisplayObject) : createjs.DisplayObject;
		/**
		 * Adds a child to the display list at the specified index, bumping children at equal or greater indexes up one, and
		 * setting its parent to this Container.
		 * Only children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement are allowed.
		 * The child must have the same spritesheet as this container (unless it's a DOMElement).
		 * If a spritesheet hasn't been defined, this container uses this child's spritesheet.
		 *
		 * <h4>Example</h4>
		 *      addChildAt(child1, index);
		 *
		 * You can also add multiple children, such as:
		 *
		 *      addChildAt(child1, child2, ..., index);
		 *
		 * The index must be between 0 and numChildren. For example, to add myShape under otherShape in the display list,
		 * you could use:
		 *
		 *      container.addChildAt(myShape, container.getChildIndex(otherShape));
		 *
		 * This would also bump otherShape's index up by one. Fails silently if the index is out of range.
		 */
		addChildAt(child:createjs.DisplayObject, index:number) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * Encapsulates the properties and methods associated with a sprite sheet. A sprite sheet is a series of images (usually
	 * animation frames) combined into a larger image (or images). For example, an animation consisting of eight 100x100
	 * images could be combined into a single 400x200 sprite sheet (4 frames across by 2 high).
	 *
	 * The data passed to the SpriteSheet constructor defines:<ol>
	 * 	<li> The source image or images to use.</li>
	 * 	<li> The positions of individual image frames.</li>
	 * 	<li> Sequences of frames that form named animations. Optional.</li>
	 * 	<li> The target playback framerate. Optional.</li>
	 * </OL>
	 *
	 * <h3>SpriteSheet Format</h3>
	 *
	 * SpriteSheets are an object with two required properties (`images` and `frames`), and two optional properties
	 * (`framerate` and `animations`). This makes them easy to define in javascript code, or in JSON.
	 *
	 * <h4>images</h4>
	 * An array of source images. Images can be either an HTMLImage
	 * instance, or a uri to an image. The former is recommended to control preloading.
	 *
	 * 	images: [image1, "path/to/image2.png"],
	 *
	 * <h4>frames</h4>
	 * Defines the individual frames. There are two supported formats for frame data:<OL>
	 * <LI> when all of the frames are the same size (in a grid), use an object with `width`, `height`, `regX`, `regY`, and `count` properties.
	 * `width` & `height` are required and specify the dimensions of the frames.
	 * `regX` & `regY` indicate the registration point or "origin" of the frames.
	 * `spacing` indicate the spacing between frames.
	 * `margin` specify the margin around the image(s).
	 * `count` allows you to specify the total number of frames in the spritesheet; if omitted, this will be calculated
	 * based on the dimensions of the source images and the frames. Frames will be assigned indexes based on their position
	 * in the source images (left to right, top to bottom).
	 *
	 * 	frames: {width:64, height:64, count:20, regX: 32, regY:64, spacing:0, margin:0}
	 *
	 * <LI> if the frames are of different sizes, use an array of frame definitions. Each definition is itself an array
	 * with 4 required and 3 optional entries, in the order: `x`, `y`, `width`, `height`, `imageIndex`, `regX`, `regY`. The first
	 * four entries are required and define the frame rectangle. The fifth specifies the index of the source image (defaults to 0). The
	 * last two specify the registration point of the frame.
	 *
	 * 	frames: [
	 * 		// x, y, width, height, imageIndex*, regX*, regY*
	 * 		[64, 0, 96, 64],
	 * 		[0, 0, 64, 64, 1, 32, 32]
	 * 		// etc.
	 * 	]
	 *
	 * </OL>
	 *
	 * <h4>animations</h4>
	 * Optional. An object defining sequences of frames to play as named animations. Each property corresponds to an
	 * animation of the same name. Each animation must specify the frames to play, and may
	 * also include a relative playback `speed` (ex. 2 would playback at double speed, 0.5 at half), and
	 * the name of the `next` animation to sequence to after it completes.
	 *
	 * There are three formats supported for defining the frames in an animation, which can be mixed and matched as appropriate:<OL>
	 * <LI> for a single frame animation, you can simply specify the frame index
	 *
	 * 	animations: {
	 * 		sit: 7
	 * 	}
	 *
	 * <LI> for an animation of consecutive frames, you can use an array with two required, and two optional entries
	 * in the order: `start`, `end`, `next`, and `speed`. This will play the frames from start to end inclusive.
	 *
	 * 	animations: {
	 * 		// start, end, next*, speed*
	 * 		run: [0, 8],
	 * 		jump: [9, 12, "run", 2]
	 * 	}
	 *
	 * <LI> for non-consecutive frames, you can use an object with a `frames` property defining an array of frame indexes to
	 * play in order. The object can also specify `next` and `speed` properties.
	 *
	 * 	animations: {
	 * 		walk: {
	 * 			frames: [1,2,3,3,2,1]
	 * 		},
	 * 		shoot: {
	 * 			frames: [1,4,5,6],
	 * 			next: "walk",
	 * 			speed: 0.5
	 * 		}
	 * 	}
	 *
	 * </OL>
	 * <strong>Note:</strong> the `speed` property was added in EaselJS 0.7.0. Earlier versions had a `frequency`
	 * property instead, which was the inverse of `speed`. For example, a value of "4" would be 1/4 normal speed in earlier
	 * versions, but is 4x normal speed in 0.7.0+.
	 *
	 * <h4>framerate</h4>
	 * Optional. Indicates the default framerate to play this spritesheet at in frames per second.
	 * See {{#crossLink "SpriteSheet/framerate:property"}}{{/crossLink}} for more information.
	 *
	 * 	framerate: 20
	 *
	 * <h4>Example</h4>
	 * To define a simple sprite sheet, with a single image "sprites.jpg" arranged in a regular 50x50 grid with three
	 * animations: "stand" showing the first frame, "run" looping frame 1-5 inclusive, and "jump" playing  frame 6-8 and sequencing back to run.
	 *
	 * 	var data = {
	 * 		images: ["sprites.jpg"],
	 * 		frames: {width:50, height:50},
	 * 		animations: {
	 * 			stand:0,
	 * 			run:[1,5],
	 * 			jump:[6,8,"run"]
	 * 		}
	 * 	};
	 * 	var spriteSheet = new createjs.SpriteSheet(data);
	 * 	var animation = new createjs.Sprite(spriteSheet, "run");
	 *
	 *
	 * <strong>Warning:</strong> Images loaded cross-origin will throw cross-origin security errors when interacted with
	 * using a mouse, using methods such as `getObjectUnderPoint`, using filters, or caching. You can get around this by
	 * setting `crossOrigin` flags on your images before passing them to EaselJS, eg: `img.crossOrigin="Anonymous";`
	 */
	export class SpriteSheet extends createjs.EventDispatcher
	{
		constructor(data:any);
		/**
		 * Indicates whether all images are finished loading.
		 */
		complete : boolean;
		/**
		 * Specifies the framerate to use by default for Sprite instances using the SpriteSheet. See
		 * Sprite.framerate for more information.
		 */
		framerate : number;
		/**
		 * Returns an array of all available animation names available on this sprite sheet as strings.
		 */
		animations : any[];
		/**
		 * Returns the total number of frames in the specified animation, or in the whole sprite
		 * sheet if the animation param is omitted. Returns 0 if the spritesheet relies on calculated frame counts, and
		 * the images have not been fully loaded.
		 */
		getNumFrames(animation:string) : number;
		/**
		 * Returns an object defining the specified animation. The returned object contains:<UL>
		 * 	<LI>frames: an array of the frame ids in the animation</LI>
		 * 	<LI>speed: the playback speed for this animation</LI>
		 * 	<LI>name: the name of the animation</LI>
		 * 	<LI>next: the default animation to play next. If the animation loops, the name and next property will be the
		 * 	same.</LI>
		 * </UL>
		 */
		getAnimation(name:string) : any;
		/**
		 * Returns an object specifying the image and source rect of the specified frame. The returned object has:<UL>
		 * 	<LI>an image property holding a reference to the image object in which the frame is found</LI>
		 * 	<LI>a rect property containing a Rectangle instance which defines the boundaries for the frame within that
		 * 	image.</LI>
		 * 	<LI> A regX and regY property corresponding to the regX/Y values for the frame.
		 * </UL>
		 */
		getFrame(frameIndex:number) : any;
		/**
		 * Returns a {{#crossLink "Rectangle"}}{{/crossLink}} instance defining the bounds of the specified frame relative
		 * to the origin. For example, a 90 x 70 frame with a regX of 50 and a regY of 40 would return:
		 *
		 * 	[x=-50, y=-40, width=90, height=70]
		 */
		getFrameBounds(frameIndex:number, rectangle?:createjs.Rectangle) : createjs.Rectangle;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * SpriteSheet cannot be cloned. A SpriteSheet can be shared by multiple Sprite instances without cloning it.
		 */
		clone() : void;
	}
	
	/**
	 * The SpriteSheetBuilder allows you to generate sprite sheets at run time from any display object. This can allow
	 * you to maintain your assets as vector graphics (for low file size), and render them at run time as sprite sheets
	 * for better performance.
	 *
	 * Sprite sheets can be built either synchronously, or asynchronously, so that large sprite sheets can be generated
	 * without locking the UI.
	 *
	 * Note that the "images" used in the generated sprite sheet are actually canvas elements, and that they will be sized
	 * to the nearest power of 2 up to the value of <code>maxWidth</code> or <code>maxHeight</code>.
	 */
	export class SpriteSheetBuilder extends createjs.EventDispatcher
	{
		constructor();
		/**
		 * The maximum width for the images (not individual frames) in the generated sprite sheet. It is recommended to use
		 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
		 * additional images will be created as needed.
		 */
		maxWidth : number;
		/**
		 * The maximum height for the images (not individual frames) in the generated sprite sheet. It is recommended to use
		 * a power of 2 for this value (ex. 1024, 2048, 4096). If the frames cannot all fit within the max dimensions, then
		 * additional images will be created as needed.
		 */
		maxHeight : number;
		/**
		 * The sprite sheet that was generated. This will be null before a build is completed successfully.
		 */
		spriteSheet : createjs.SpriteSheet;
		/**
		 * The scale to apply when drawing all frames to the sprite sheet. This is multiplied against any scale specified
		 * in the addFrame call. This can be used, for example, to generate a sprite sheet at run time that is tailored to
		 * the a specific device resolution (ex. tablet vs mobile).
		 */
		scale : number;
		/**
		 * The padding to use between frames. This is helpful to preserve antialiasing on drawn vector content.
		 */
		padding : number;
		/**
		 * A number from 0.01 to 0.99 that indicates what percentage of time the builder can use. This can be
		 * thought of as the number of seconds per second the builder will use. For example, with a timeSlice value of 0.3,
		 * the builder will run 20 times per second, using approximately 15ms per build (30% of available time, or 0.3s per second).
		 * Defaults to 0.3.
		 */
		timeSlice : number;
		/**
		 * A value between 0 and 1 that indicates the progress of a build, or -1 if a build has not
		 * been initiated.
		 */
		progress : number;
		/**
		 * Adds a frame to the {{#crossLink "SpriteSheet"}}{{/crossLink}}. Note that the frame will not be drawn until you
		 * call {{#crossLink "SpriteSheetBuilder/build"}}{{/crossLink}} method. The optional setup params allow you to have
		 * a function run immediately before the draw occurs. For example, this allows you to add a single source multiple
		 * times, but manipulate it or its children to change it to generate different frames.
		 *
		 * Note that the source's transformations (x, y, scale, rotate, alpha) will be ignored, except for regX/Y. To apply
		 * transforms to a source object and have them captured in the sprite sheet, simply place it into a {{#crossLink "Container"}}{{/crossLink}}
		 * and pass in the Container as the source.
		 */
		addFrame(source:createjs.DisplayObject, sourceRect?:createjs.Rectangle, scale?:number, setupFunction?:any, setupData?:any) : number;
		/**
		 * Adds an animation that will be included in the created sprite sheet.
		 */
		addAnimation(name:string, frames:any[], next?:string, frequency?:number) : void;
		/**
		 * This will take a MovieClip instance, and add its frames and labels to this builder. Labels will be added as an animation
		 * running from the label index to the next label. For example, if there is a label named "foo" at frame 0 and a label
		 * named "bar" at frame 10, in a MovieClip with 15 frames, it will add an animation named "foo" that runs from frame
		 * index 0 to 9, and an animation named "bar" that runs from frame index 10 to 14.
		 *
		 * Note that this will iterate through the full MovieClip with actionsEnabled set to false, ending on the last frame.
		 */
		addMovieClip(source:createjs.MovieClip, sourceRect?:createjs.Rectangle, scale?:number, setupFunction?:any, setupData?:any, labelFunction?:any) : void;
		/**
		 * Builds a SpriteSheet instance based on the current frames.
		 */
		build() : createjs.SpriteSheet;
		/**
		 * Asynchronously builds a {{#crossLink "SpriteSheet"}}{{/crossLink}} instance based on the current frames. It will
		 * run 20 times per second, using an amount of time defined by <code>timeSlice</code>. When it is complete it will
		 * call the specified callback.
		 */
		buildAsync(timeSlice?:number) : void;
		/**
		 * Stops the current asynchronous build.
		 */
		stopAsync() : void;
		/**
		 * SpriteSheetBuilder instances cannot be cloned.
		 */
		clone() : void;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A loader for EaselJS SpriteSheets. Images inside the spritesheet definition are loaded before the loader
	 * completes. To load SpriteSheets using JSONP, specify a {{#crossLink "LoadItem/callback:property"}}{{/crossLink}}
	 * as part of the {{#crossLink "LoadItem"}}{{/crossLink}}. Note that the {{#crossLink "JSONLoader"}}{{/crossLink}}
	 * and {{#crossLink "JSONPLoader"}}{{/crossLink}} are higher priority loaders, so SpriteSheets <strong>must</strong>
	 * set the {{#crossLink "LoadItem"}}{{/crossLink}} {{#crossLink "LoadItem/type:property"}}{{/crossLink}} property
	 * to {{#crossLink "AbstractLoader/SPRITESHEET:property"}}{{/crossLink}}.
	 */
	export class SpriteSheetLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/SPRITESHEET:property"}}{{/crossLink}}
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * The SpriteSheetUtils class is a collection of static methods for working with {{#crossLink "SpriteSheet"}}{{/crossLink}}s.
	 * A sprite sheet is a series of images (usually animation frames) combined into a single image on a regular grid. For
	 * example, an animation consisting of 8 100x100 images could be combined into a 400x200 sprite sheet (4 frames across
	 * by 2 high). The SpriteSheetUtils class uses a static interface and should not be instantiated.
	 */
	export class SpriteSheetUtils
	{
		/**
		 * Returns a single frame of the specified sprite sheet as a new PNG image. An example of when this may be useful is
		 * to use a spritesheet frame as the source for a bitmap fill.
		 *
		 * <strong>WARNING:</strong> In almost all cases it is better to display a single frame using a {{#crossLink "Sprite"}}{{/crossLink}}
		 * with a {{#crossLink "Sprite/gotoAndStop"}}{{/crossLink}} call than it is to slice out a frame using this
		 * method and display it with a Bitmap instance. You can also crop an image using the {{#crossLink "Bitmap/sourceRect"}}{{/crossLink}}
		 * property of {{#crossLink "Bitmap"}}{{/crossLink}}.
		 *
		 * The extractFrame method may cause cross-domain warnings since it accesses pixels directly on the canvas.
		 */
		static extractFrame(spriteSheet:any, frameOrAnimation:any) : any;
	}
	
	/**
	 * A stage is the root level {{#crossLink "Container"}}{{/crossLink}} for a display list. Each time its {{#crossLink "Stage/tick"}}{{/crossLink}}
	 * method is called, it will render its display list to its target canvas.
	 *
	 * <h4>Example</h4>
	 * This example creates a stage, adds a child to it, then uses {{#crossLink "Ticker"}}{{/crossLink}} to update the child
	 * and redraw the stage using {{#crossLink "Stage/update"}}{{/crossLink}}.
	 *
	 *      var stage = new createjs.Stage("canvasElementId");
	 *      var image = new createjs.Bitmap("imagePath.png");
	 *      stage.addChild(image);
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          image.x += 10;
	 *          stage.update();
	 *      }
	 */
	export class Stage extends createjs.Container
	{
		constructor(canvas:any);
		/**
		 * Indicates whether the stage should automatically clear the canvas before each render. You can set this to <code>false</code>
		 * to manually control clearing (for generative art, or when pointing multiple stages at the same canvas for
		 * example).
		 *
		 * <h4>Example</h4>
		 *
		 *      var stage = new createjs.Stage("canvasId");
		 *      stage.autoClear = false;
		 */
		autoClear : boolean;
		/**
		 * The canvas the stage will render to. Multiple stages can share a single canvas, but you must disable autoClear for all but the
		 * first stage that will be ticked (or they will clear each other's render).
		 *
		 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
		 * new canvas or mouse events will not work as expected. For example:
		 *
		 *      myStage.enableDOMEvents(false);
		 *      myStage.canvas = anotherCanvas;
		 *      myStage.enableDOMEvents(true);
		 */
		canvas : any;
		/**
		 * The current mouse X position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
		 * position over the canvas, and mouseInBounds will be set to false.
		 */
		mouseX : number;
		/**
		 * The current mouse Y position on the canvas. If the mouse leaves the canvas, this will indicate the most recent
		 * position over the canvas, and mouseInBounds will be set to false.
		 */
		mouseY : number;
		/**
		 * Specifies the area of the stage to affect when calling update. This can be use to selectively
		 * re-draw specific regions of the canvas. If null, the whole canvas area is drawn.
		 */
		drawRect : createjs.Rectangle;
		/**
		 * Indicates whether display objects should be rendered on whole pixels. You can set the
		 * {{#crossLink "DisplayObject/snapToPixel"}}{{/crossLink}} property of
		 * display objects to false to enable/disable this behaviour on a per instance basis.
		 */
		snapToPixelEnabled : boolean;
		/**
		 * Indicates whether the mouse is currently within the bounds of the canvas.
		 */
		mouseInBounds : boolean;
		/**
		 * If true, tick callbacks will be called on all display objects on the stage prior to rendering to the canvas.
		 */
		tickOnUpdate : boolean;
		/**
		 * If true, mouse move events will continue to be called when the mouse leaves the target canvas. See
		 * {{#crossLink "Stage/mouseInBounds:property"}}{{/crossLink}}, and {{#crossLink "MouseEvent"}}{{/crossLink}}
		 * x/y/rawX/rawY.
		 */
		mouseMoveOutside : boolean;
		/**
		 * Prevents selection of other elements in the html page if the user clicks and drags, or double clicks on the canvas.
		 * This works by calling `preventDefault()` on any mousedown events (or touch equivalent) originating on the canvas.
		 */
		preventSelection : boolean;
		/**
		 * The hitArea property is not supported for Stage.
		 */
		nextStage : createjs.Stage;
		/**
		 * Default event handler that calls the Stage {{#crossLink "Stage/update"}}{{/crossLink}} method when a {{#crossLink "DisplayObject/tick:event"}}{{/crossLink}}
		 * event is received. This allows you to register a Stage instance as a event listener on {{#crossLink "Ticker"}}{{/crossLink}}
		 * directly, using:
		 *
		 *      Ticker.addEventListener("tick", myStage");
		 *
		 * Note that if you subscribe to ticks using this pattern, then the tick event object will be passed through to
		 * display object tick handlers, instead of <code>delta</code> and <code>paused</code> parameters.
		 */
		handleEvent : any;
		/**
		 * Each time the update method is called, the stage will call {{#crossLink "Stage/tick"}}{{/crossLink}}
		 * unless {{#crossLink "Stage/tickOnUpdate:property"}}{{/crossLink}} is set to false,
		 * and then render the display list to the canvas.
		 */
		update(props?:any) : void;
		/**
		 * Propagates a tick event through the display list. This is automatically called by {{#crossLink "Stage/update"}}{{/crossLink}}
		 * unless {{#crossLink "Stage/tickOnUpdate:property"}}{{/crossLink}} is set to false.
		 *
		 * If a props object is passed to `tick()`, then all of its properties will be copied to the event object that is
		 * propagated to listeners.
		 *
		 * Some time-based features in EaselJS (for example {{#crossLink "Sprite/framerate"}}{{/crossLink}} require that
		 * a {{#crossLink "Ticker/tick:event"}}{{/crossLink}} event object (or equivalent object with a delta property) be
		 * passed as the `props` parameter to `tick()`. For example:
		 *
		 * 	Ticker.on("tick", handleTick);
		 * 	function handleTick(evtObj) {
		 * 		// clone the event object from Ticker, and add some custom data to it:
		 * 		var evt = evtObj.clone().set({greeting:"hello", name:"world"});
		 *
		 * 		// pass it to stage.update():
		 * 		myStage.update(evt); // subsequently calls tick() with the same param
		 * 	}
		 *
		 * 	// ...
		 * 	myDisplayObject.on("tick", handleDisplayObjectTick);
		 * 	function handleDisplayObjectTick(evt) {
		 * 		console.log(evt.delta); // the delta property from the Ticker tick event object
		 * 		console.log(evt.greeting, evt.name); // custom data: "hello world"
		 * 	}
		 */
		tick(props?:any) : void;
		/**
		 * Clears the target canvas. Useful if {{#crossLink "Stage/autoClear:property"}}{{/crossLink}} is set to `false`.
		 */
		clear() : void;
		/**
		 * Returns a data url that contains a Base64-encoded image of the contents of the stage. The returned data url can
		 * be specified as the src value of an image element.
		 */
		toDataURL(backgroundColor?:string, mimeType?:string) : string;
		/**
		 * Enables or disables (by passing a frequency of 0) mouse over ({{#crossLink "DisplayObject/mouseover:event"}}{{/crossLink}}
		 * and {{#crossLink "DisplayObject/mouseout:event"}}{{/crossLink}}) and roll over events ({{#crossLink "DisplayObject/rollover:event"}}{{/crossLink}}
		 * and {{#crossLink "DisplayObject/rollout:event"}}{{/crossLink}}) for this stage's display list. These events can
		 * be expensive to generate, so they are disabled by default. The frequency of the events can be controlled
		 * independently of mouse move events via the optional `frequency` parameter.
		 *
		 * <h4>Example</h4>
		 *
		 *      var stage = new createjs.Stage("canvasId");
		 *      stage.enableMouseOver(10); // 10 updates per second
		 */
		enableMouseOver(frequency?:number) : void;
		/**
		 * Enables or disables the event listeners that stage adds to DOM elements (window, document and canvas). It is good
		 * practice to disable events when disposing of a Stage instance, otherwise the stage will continue to receive
		 * events from the page.
		 *
		 * When changing the canvas property you must disable the events on the old canvas, and enable events on the
		 * new canvas or mouse events will not work as expected. For example:
		 *
		 *      myStage.enableDOMEvents(false);
		 *      myStage.canvas = anotherCanvas;
		 *      myStage.enableDOMEvents(true);
		 */
		enableDOMEvents(enable?:boolean) : void;
		/**
		 * Stage instances cannot be cloned.
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A sprite stage is the root level {{#crossLink "Container"}}{{/crossLink}} for an aggressively optimized display list. Each time its {{#crossLink "Stage/tick"}}{{/crossLink}}
	 * method is called, it will render its display list to its target canvas. WebGL content is fully compatible with the existing Context2D renderer.
	 * On devices or browsers that don't support WebGL, content will automatically be rendered via canvas 2D.
	 *
	 * Restrictions:
	 *     - only Sprite, SpriteContainer, BitmapText, Bitmap and DOMElement are allowed to be added to the display list.
	 *     - a child being added (with the exception of DOMElement) MUST have an image or spriteSheet defined on it.
	 *     - a child's image/spriteSheet MUST never change while being on the display list.
	 *
	 * <h4>Example</h4>
	 * This example creates a sprite stage, adds a child to it, then uses {{#crossLink "Ticker"}}{{/crossLink}} to update the child
	 * and redraw the stage using {{#crossLink "SpriteStage/update"}}{{/crossLink}}.
	 *
	 *      var stage = new createjs.SpriteStage("canvasElementId", false, false);
	 *      stage.updateViewport(800, 600);
	 *      var image = new createjs.Bitmap("imagePath.png");
	 *      stage.addChild(image);
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          image.x += 10;
	 *          stage.update();
	 *      }
	 *
	 * <strong>Note:</strong> SpriteStage is not included in the minified version of EaselJS.
	 */
	export class SpriteStage extends createjs.Stage
	{
		constructor(canvas:any, preserveDrawingBuffer:boolean, antialias:boolean);
		/**
		 * Indicates whether WebGL is being used for rendering. For example, this would be false if WebGL is not
		 * supported in the browser.
		 */
		isWebGL : boolean;
		/**
		 * Adds a child to the top of the display list.
		 * Only children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement are allowed.
		 * Children also MUST have either an image or spriteSheet defined on them (unless it's a DOMElement).
		 *
		 * <h4>Example</h4>
		 *      container.addChild(bitmapInstance);
		 *
		 *  You can also add multiple children at once:
		 *
		 *      container.addChild(bitmapInstance, shapeInstance, textInstance);
		 */
		addChild(child:createjs.DisplayObject) : createjs.DisplayObject;
		/**
		 * Adds a child to the display list at the specified index, bumping children at equal or greater indexes up one, and
		 * setting its parent to this Container.
		 * Only children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement are allowed.
		 * Children also MUST have either an image or spriteSheet defined on them (unless it's a DOMElement).
		 *
		 * <h4>Example</h4>
		 *
		 *      addChildAt(child1, index);
		 *
		 * You can also add multiple children, such as:
		 *
		 *      addChildAt(child1, child2, ..., index);
		 *
		 * The index must be between 0 and numChildren. For example, to add myShape under otherShape in the display list,
		 * you could use:
		 *
		 *      container.addChildAt(myShape, container.getChildIndex(otherShape));
		 *
		 * This would also bump otherShape's index up by one. Fails silently if the index is out of range.
		 */
		addChildAt(child:createjs.DisplayObject, index:number) : createjs.DisplayObject;
		/**
		 * Clears the target canvas. Useful if {{#crossLink "Stage/autoClear:property"}}{{/crossLink}} is set to `false`.
		 */
		clear() : void;
		/**
		 * Draws the stage into the specified context (using WebGL) ignoring its visible, alpha, shadow, and transform.
		 * If WebGL is not supported in the browser, it will default to a 2D context.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 *
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Update the WebGL viewport. Note that this does NOT update the canvas element's width/height.
		 */
		updateViewport(width:number, height:number) : void;
		/**
		 * Clears an image's texture to free it up for garbage collection.
		 */
		clearImageTexture(image:any) : void;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * The number of properties defined per vertex in p._verticesBuffer.
		 * x, y, textureU, textureV, alpha
		 */
		static NUM_VERTEX_PROPERTIES : number;
		/**
		 * The number of points in a box...obviously :)
		 */
		static POINTS_PER_BOX : number;
		/**
		 * The number of vertex properties per box.
		 */
		static NUM_VERTEX_PROPERTIES_PER_BOX : number;
		/**
		 * The number of indices needed to define a box using triangles.
		 * 6 indices = 2 triangles = 1 box
		 */
		static INDICES_PER_BOX : number;
		/**
		 * The maximum size WebGL allows for element index numbers: 16 bit unsigned integer
		 */
		static MAX_INDEX_SIZE : number;
		/**
		 * The amount used to increment p._maxBoxesPointsPerDraw when the maximum has been reached.
		 * If the maximum size of element index WebGL allows for (SpriteStage.MAX_INDEX_SIZE) was used,
		 * the array size for p._vertices would equal 1280kb and p._indices 192kb. But since mobile phones
		 * with less memory need to be accounted for, the maximum size is somewhat arbitrarily divided by 4,
		 * reducing the array sizes to 320kb and 48kb respectively.
		 */
		static MAX_BOXES_POINTS_INCREMENT : number;
	}
	
	/**
	 * An {{#crossLink "AbstractRequest"}}{{/crossLink}} that loads HTML tags, such as images and scripts.
	 */
	export class TagRequest
	{
	
	}
	
	/**
	 * Display one or more lines of dynamic text (not user editable) in the display list. Line wrapping support (using the
	 * lineWidth) is very basic, wrapping on spaces and tabs only. Note that as an alternative to Text, you can position HTML
	 * text above or below the canvas relative to items in the display list using the {{#crossLink "DisplayObject/localToGlobal"}}{{/crossLink}}
	 * method, or using {{#crossLink "DOMElement"}}{{/crossLink}}.
	 *
	 * <b>Please note that Text does not support HTML text, and can only display one font style at a time.</b> To use
	 * multiple font styles, you will need to create multiple text instances, and position them manually.
	 *
	 * <h4>Example</h4>
	 *
	 *      var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
	 *      text.x = 100;
	 *      text.textBaseline = "alphabetic";
	 *
	 * CreateJS Text supports web fonts (the same rules as Canvas). The font must be loaded and supported by the browser
	 * before it can be displayed.
	 *
	 * <strong>Note:</strong> Text can be expensive to generate, so cache instances where possible. Be aware that not all
	 * browsers will render Text exactly the same.
	 */
	export class Text extends createjs.DisplayObject
	{
		constructor(text?:string, font?:string, color?:string);
		/**
		 * The text to display.
		 */
		text : string;
		/**
		 * The font style to use. Any valid value for the CSS font attribute is acceptable (ex. "bold 36px Arial").
		 */
		font : string;
		/**
		 * The color to draw the text in. Any valid value for the CSS color attribute is acceptable (ex. "#F00"). Default is "#000".
		 * It will also accept valid canvas fillStyle values.
		 */
		color : string;
		/**
		 * The horizontal text alignment. Any of "start", "end", "left", "right", and "center". For detailed
		 * information view the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>. Default is "left".
		 */
		textAlign : string;
		/**
		 * The vertical alignment point on the font. Any of "top", "hanging", "middle", "alphabetic", "ideographic", or
		 * "bottom". For detailed information view the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>. Default is "top".
		 */
		textBaseline : string;
		/**
		 * The maximum width to draw the text. If maxWidth is specified (not null), the text will be condensed or
		 * shrunk to make it fit in this width. For detailed information view the
		 * <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-styles">
		 * whatwg spec</a>.
		 */
		maxWidth : number;
		/**
		 * If greater than 0, the text will be drawn as a stroke (outline) of the specified width.
		 */
		outline : number;
		/**
		 * Indicates the line height (vertical distance between baselines) for multi-line text. If null or 0,
		 * the value of getMeasuredLineHeight is used.
		 */
		lineHeight : number;
		/**
		 * Indicates the maximum width for a line of text before it is wrapped to multiple lines. If null,
		 * the text will not be wrapped.
		 */
		lineWidth : number;
		/**
		 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
		 * This does not account for whether it would be visible within the boundaries of the stage.
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		isVisible() : boolean;
		/**
		 * Draws the Text into the specified context ignoring its visible, alpha, shadow, and transform.
		 * Returns true if the draw was handled (useful for overriding functionality).
		 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
		 */
		draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean) : boolean;
		/**
		 * Returns the measured, untransformed width of the text without wrapping. Use getBounds for a more robust value.
		 */
		getMeasuredWidth() : number;
		/**
		 * Returns an approximate line height of the text, ignoring the lineHeight property. This is based on the measured
		 * width of a "M" character multiplied by 1.2, which provides an approximate line height for most fonts.
		 */
		getMeasuredLineHeight() : number;
		/**
		 * Returns the approximate height of multi-line text by multiplying the number of lines against either the
		 * <code>lineHeight</code> (if specified) or {{#crossLink "Text/getMeasuredLineHeight"}}{{/crossLink}}. Note that
		 * this operation requires the text flowing logic to run, which has an associated CPU cost.
		 */
		getMeasuredHeight() : number;
		/**
		 * Returns an object with width, height, and lines properties. The width and height are the visual width and height
		 * of the drawn text. The lines property contains an array of strings, one for
		 * each line of text that will be drawn, accounting for line breaks and wrapping. These strings have trailing
		 * whitespace removed.
		 */
		getMetrics() : any;
		/**
		 * Returns a clone of the Text instance.
		 */
		clone(recursive?:boolean) : createjs.DisplayObject;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * A loader for Text files.
	 */
	export class TextLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader loads items that are of type {{#crossLink "AbstractLoader/TEXT:property"}}{{/crossLink}},
		 * but is also the default loader if a file type can not be determined.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * The Ticker provides a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
	 * event to be notified when a set time interval has elapsed.
	 *
	 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
	 * when under high CPU load. The Ticker class uses a static interface (ex. `Ticker.framerate = 30;`) and
	 * can not be instantiated.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          // Actions carried out each tick (aka frame)
	 *          if (!event.paused) {
	 *              // Actions carried out when the Ticker is not paused.
	 *          }
	 *      }
	 */
	export class Ticker
	{
		toString() : string;
		/**
		 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
		 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
		 * dispatches the tick when the time is within a certain threshold.
		 *
		 * This mode has a higher variance for time between frames than TIMEOUT, but does not require that content be time
		 * based as with RAF while gaining the benefits of that API (screen synch, background throttling).
		 *
		 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
		 * framerates of 10, 12, 15, 20, and 30 work well.
		 *
		 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
		 */
		static RAF_SYNCHED : string;
		/**
		 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
		 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
		 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the tick event object's "delta" properties
		 * to make this easier.
		 *
		 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
		 */
		static RAF : string;
		/**
		 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
		 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
		 */
		static TIMEOUT : string;
		/**
		 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
		 * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
		 * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
		 */
		static timingMode : string;
		/**
		 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
		 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
		 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
		 * (ex. maxDelta=50 when running at 40fps).
		 *
		 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
		 * when using both delta and other values.
		 *
		 * If 0, there is no maximum.
		 */
		static maxDelta : number;
		/**
		 * When the ticker is paused, all listeners will still receive a tick event, but the <code>paused</code> property of the event will be false.
		 * Also, while paused the `runTime` will not increase. See {{#crossLink "Ticker/tick:event"}}{{/crossLink}},
		 * {{#crossLink "Ticker/getTime"}}{{/crossLink}}, and {{#crossLink "Ticker/getEventTime"}}{{/crossLink}} for more info.
		 *
		 * <h4>Example</h4>
		 *
		 *      createjs.Ticker.addEventListener("tick", handleTick);
		 *      createjs.Ticker.paused = true;
		 *      function handleTick(event) {
		 *          console.log(event.paused,
		 *          	createjs.Ticker.getTime(false),
		 *          	createjs.Ticker.getTime(true));
		 *      }
		 */
		static paused : boolean;
		/**
		 * Indicates the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
		 * Note that actual time between ticks may be more than specified depending on CPU load.
		 * This property is ignored if the ticker is using the `RAF` timing mode.
		 */
		static interval : number;
		/**
		 * Indicates the target frame rate in frames per second (FPS). Effectively just a shortcut to `interval`, where
		 * `framerate == 1000/interval`.
		 */
		static framerate : number;
		/**
		 * Starts the tick. This is called automatically when the first listener is added.
		 */
		static init() : void;
		/**
		 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
		 */
		static reset() : void;
		/**
		 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
		 * because it only measures the time spent within the tick execution stack.
		 *
		 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between
		 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that
		 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
		 *
		 * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
		 * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
		 * other than the tick is using ~80ms (another script, DOM rendering, etc).
		 */
		static getMeasuredTickTime(ticks?:number) : number;
		/**
		 * Returns the actual frames / ticks per second.
		 */
		static getMeasuredFPS(ticks?:number) : number;
		/**
		 * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
		 * Returns -1 if Ticker has not been initialized. For example, you could use
		 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
		 */
		static getTime(runTime?:boolean) : number;
		/**
		 * Similar to getTime(), but returns the time on the most recent tick event object.
		 */
		static getEventTime(runTime:boolean) : number;
		/**
		 * Returns the number of ticks that have been broadcast by Ticker.
		 */
		static getTicks(pauseable:boolean) : number;
		/**
		 * Static initializer to mix EventDispatcher methods into a target object or prototype.
		 *
		 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
		 * 		EventDispatcher.initialize(myObject); // add to a specific instance
		 */
		static initialize(target:any) : void;
		/**
		 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
		 * multiple callbacks getting fired.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.addEventListener("click", handleClick);
		 *      function handleClick(event) {
		 *         // Click happened.
		 *      }
		 */
		static addEventListener(type:string, listener:any, useCapture?:boolean) : any;
		/**
		 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
		 * only run once, associate arbitrary data with the listener, and remove the listener.
		 *
		 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
		 * The created anonymous function is returned for use with .removeEventListener (or .off).
		 *
		 * <h4>Example</h4>
		 *
		 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
		 * 		function handleClick(evt, data) {
		 * 			data.count -= 1;
		 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
		 * 			if (data.count == 0) {
		 * 				alert("clicked 3 times!");
		 * 				myBtn.off("click", listener);
		 * 				// alternately: evt.remove();
		 * 			}
		 * 		}
		 */
		static on(type:string, listener:any, scope?:any, once?:boolean, data?:any, useCapture?:boolean) : any;
		/**
		 * Removes the specified event listener.
		 *
		 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
		 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
		 * closure will not work.
		 *
		 * <h4>Example</h4>
		 *
		 *      displayObject.removeEventListener("click", handleClick);
		 */
		static removeEventListener(type:string, listener:any, useCapture?:boolean) : void;
		/**
		 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
		 * .on method.
		 */
		static off(type:string, listener:any, useCapture?:boolean) : void;
		/**
		 * Removes all listeners for the specified type, or all listeners of all types.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Remove all listeners
		 *      displayObject.removeAllEventListeners();
		 *
		 *      // Remove all click listeners
		 *      displayObject.removeAllEventListeners("click");
		 */
		static removeAllEventListeners(type?:string) : void;
		/**
		 * Dispatches the specified event to all listeners.
		 *
		 * <h4>Example</h4>
		 *
		 *      // Use a string event
		 *      this.dispatchEvent("complete");
		 *
		 *      // Use an Event instance
		 *      var event = new createjs.Event("progress");
		 *      this.dispatchEvent(event);
		 */
		static dispatchEvent(eventObj:any) : boolean;
		/**
		 * Indicates whether there is at least one listener for the specified event type.
		 */
		static hasEventListener(type:string) : boolean;
		/**
		 * Indicates whether there is at least one listener for the specified event type on this object or any of its
		 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
		 * specified type is dispatched from this object, it will trigger at least one listener.
		 *
		 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
		 * event flow for a listener, not just this object.
		 */
		static willTrigger(type:string) : boolean;
	}
	
	/**
	 * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
	 * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
	 */
	export class Timeline extends createjs.EventDispatcher
	{
		constructor(tweens:any[], labels:any, props:any);
		/**
		 * Causes this timeline to continue playing when a global pause is active.
		 */
		ignoreGlobalPause : boolean;
		/**
		 * Read-only property specifying the total duration of this timeline in milliseconds (or ticks if useTicks is true).
		 * This value is usually automatically updated as you modify the timeline. See updateDuration for more information.
		 */
		duration : number;
		/**
		 * If true, the timeline will loop when it reaches the end. Can be set via the props param.
		 */
		loop : boolean;
		/**
		 * Read-only. The current normalized position of the timeline. This will always be a value between 0 and duration.
		 * Changing this property directly will have no effect.
		 */
		position : any;
		/**
		 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the normal ticking system)
		 * and managed by this timeline. Adding a tween to multiple timelines will result in unexpected behaviour.
		 */
		addTween(tween:any) : createjs.Tween;
		/**
		 * Removes one or more tweens from this timeline.
		 */
		removeTween(tween:any) : boolean;
		/**
		 * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
		 */
		addLabel(label:string, position:number) : void;
		/**
		 * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
		 */
		setLabels(o:any) : void;
		/**
		 * Returns a sorted list of the labels defined on this timeline.
		 */
		getLabels() : any[];
		/**
		 * Returns the name of the label on or immediately before the current position. For example, given a timeline with
		 * two labels, "first" on frame index 4, and "second" on frame 8, getCurrentLabel would return:<UL>
		 * <LI>null if the current position is 2.</LI>
		 * <LI>"first" if the current position is 4.</LI>
		 * <LI>"first" if the current position is 7.</LI>
		 * <LI>"second" if the current position is 15.</LI></UL>
		 */
		getCurrentLabel() : string;
		/**
		 * Unpauses this timeline and jumps to the specified position or label.
		 */
		gotoAndPlay(positionOrLabel:any) : void;
		/**
		 * Pauses this timeline and jumps to the specified position or label.
		 */
		gotoAndStop(positionOrLabel:any) : void;
		/**
		 * Advances the timeline to the specified position.
		 */
		setPosition(value:number, actionsMode?:number) : boolean;
		/**
		 * Pauses or plays this timeline.
		 */
		setPaused(value:boolean) : void;
		/**
		 * Recalculates the duration of the timeline.
		 * The duration is automatically updated when tweens are added or removed, but this method is useful
		 * if you modify a tween after it was added to the timeline.
		 */
		updateDuration() : void;
		/**
		 * Advances this timeline by the specified amount of time in milliseconds (or ticks if useTicks is true).
		 * This is normally called automatically by the Tween engine (via Tween.tick), but is exposed for advanced uses.
		 */
		tick(delta:number) : void;
		/**
		 * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
		 * corresponding frame label will be returned, or null if a matching label is not defined.
		 */
		resolve(positionOrLabel:any) : any;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
	}
	
	/**
	 * Global utility for working with multi-touch enabled devices in EaselJS. Currently supports W3C Touch API (iOS and
	 * modern Android browser) and the Pointer API (IE), including ms-prefixed events in IE10, and unprefixed in IE11.
	 *
	 * Ensure that you {{#crossLink "Touch/disable"}}{{/crossLink}} touch when cleaning up your application. You do not have
	 * to check if touch is supported to enable it, as it will fail gracefully if it is not supported.
	 *
	 * <h4>Example</h4>
	 *
	 *      var stage = new createjs.Stage("canvasId");
	 *      createjs.Touch.enable(stage);
	 *
	 * <strong>Note:</strong> It is important to disable Touch on a stage that you are no longer using:
	 *
	 *      createjs.Touch.disable(stage);
	 */
	export class Touch
	{
		/**
		 * Returns `true` if touch is supported in the current browser.
		 */
		static isSupported() : boolean;
		/**
		 * Enables touch interaction for the specified EaselJS {{#crossLink "Stage"}}{{/crossLink}}. Currently supports iOS
		 * (and compatible browsers, such as modern Android browsers), and IE10/11. Supports both single touch and
		 * multi-touch modes. Extends the EaselJS {{#crossLink "MouseEvent"}}{{/crossLink}} model, but without support for
		 * double click or over/out events. See the MouseEvent {{#crossLink "MouseEvent/pointerId:property"}}{{/crossLink}}
		 * for more information.
		 */
		static enable(stage:createjs.Stage, singleTouch?:boolean, allowDefault?:boolean) : boolean;
		/**
		 * Removes all listeners that were set up when calling `Touch.enable()` on a stage.
		 */
		static disable(stage:createjs.Stage) : void;
	}
	
	/**
	 * A Tween instance tweens properties for a single target. Instance methods can be chained for easy construction and sequencing:
	 *
	 * <h4>Example</h4>
	 *
	 *      target.alpha = 1;
	 * 	    Tween.get(target)
	 * 	         .wait(500)
	 * 	         .to({alpha:0, visible:false}, 1000)
	 * 	         .call(handleComplete);
	 * 	    function handleComplete() {
	 * 	    	//Tween complete
	 * 	    }
	 *
	 * Multiple tweens can point to the same instance, however if they affect the same properties there could be unexpected
	 * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass <code>override:true</code>
	 * in the props argument.
	 *
	 *      Tween.get(target, {override:true}).to({x:100});
	 *
	 * Subscribe to the "change" event to get notified when a property of the target is changed.
	 *
	 *      Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
	 *      function handleChange(event) {
	 *          // The tween changed.
	 *      }
	 *
	 * See the Tween {{#crossLink "Tween/get"}}{{/crossLink}} method for additional param documentation.
	 */
	export class Tween extends createjs.EventDispatcher
	{
		constructor(target:any, props?:any, pluginData?:any);
		/**
		 * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using {{#crossLink "Ticker"}}{{/crossLink}},
		 * then setting this to true (the default) will cause this tween to be paused when <code>Ticker.setPaused(true)</code>
		 * is called. See the Tween {{#crossLink "Tween/tick"}}{{/crossLink}} method for more info. Can be set via the props
		 * parameter.
		 */
		ignoreGlobalPause : boolean;
		/**
		 * If true, the tween will loop when it reaches the end. Can be set via the props param.
		 */
		loop : boolean;
		/**
		 * Read-only. Specifies the total duration of this tween in milliseconds (or ticks if useTicks is true).
		 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
		 * behaviour.
		 */
		duration : number;
		/**
		 * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
		 * you specify data by setting it to a property of pluginData with the same name as the plugin class.
		 */
		pluginData : any;
		/**
		 * Read-only. The target of this tween. This is the object on which the tweened properties will be changed. Changing
		 * this property after the tween is created will not have any effect.
		 */
		target : any;
		/**
		 * Read-only. The current normalized position of the tween. This will always be a value between 0 and duration.
		 * Changing this property directly will have no effect.
		 */
		position : any;
		/**
		 * Read-only. Indicates the tween's current position is within a passive wait.
		 */
		passive : boolean;
		/**
		 * Queues a wait (essentially an empty tween).
		 */
		wait(duration:number, passive:boolean) : createjs.Tween;
		/**
		 * Queues a tween from the current values to the target properties. Set duration to 0 to jump to these value.
		 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
		 * properties will be set at the end of the specified duration.
		 */
		to(props:any, duration?:number, ease?:any) : createjs.Tween;
		/**
		 * Queues an action to call the specified function.
		 */
		call(callback:any, params?:any[], scope?:any) : createjs.Tween;
		/**
		 * Queues an action to set the specified props on the specified target. If target is null, it will use this tween's
		 * target.
		 */
		set(props:any, target?:any) : createjs.Tween;
		/**
		 * Queues an action to to play (unpause) the specified tween. This enables you to sequence multiple tweens.
		 */
		play(tween:createjs.Tween) : createjs.Tween;
		/**
		 * Queues an action to to pause the specified tween.
		 */
		pause(tween:createjs.Tween) : createjs.Tween;
		/**
		 * Advances the tween to a specified position.
		 */
		setPosition(value:number, actionsMode?:number) : boolean;
		/**
		 * Advances this tween by the specified amount of time in milliseconds (or ticks if <code>useTicks</code> is true).
		 * This is normally called automatically by the Tween engine (via <code>Tween.tick</code>), but is exposed for
		 * advanced uses.
		 */
		tick(delta:number) : void;
		/**
		 * Pauses or plays this tween.
		 */
		setPaused(value:boolean) : createjs.Tween;
		/**
		 * Returns a string representation of this object.
		 */
		toString() : string;
		/**
		 * Constant defining the none actionsMode for use with setPosition.
		 */
		static NONE : number;
		/**
		 * Constant defining the loop actionsMode for use with setPosition.
		 */
		static LOOP : number;
		/**
		 * Constant defining the reverse actionsMode for use with setPosition.
		 */
		static REVERSE : number;
		/**
		 * Constant returned by plugins to tell the tween not to use default assignment.
		 */
		static IGNORE : any;
		/**
		 * Returns a new tween instance. This is functionally identical to using "new Tween(...)", but looks cleaner
		 * with the chained syntax of TweenJS.
		 */
		static get(target:any, props?:any, pluginData?:any, override_?:boolean) : createjs.Tween;
		/**
		 * Removes all existing tweens for a target. This is called automatically by new tweens if the <code>override</code>
		 * property is <code>true</code>.
		 */
		static removeTweens(target:any) : void;
		/**
		 * Stop and remove all existing tweens.
		 */
		static removeAllTweens() : void;
		/**
		 * Indicates whether there are any active tweens (and how many) on the target object (if specified) or in general.
		 */
		static hasActiveTweens(target?:any) : boolean;
		/**
		 * Installs a plugin, which can modify how certain properties are handled when tweened. See the {{#crossLink "CSSPlugin"}}{{/crossLink}}
		 * for an example of how to write TweenJS plugins.
		 */
		static installPlugin(plugin:any, properties:any[]) : void;
	}
	
	/**
	 * Global utility for generating sequential unique ID numbers. The UID class uses a static interface (ex. <code>UID.get()</code>)
	 * and should not be instantiated.
	 */
	export class UID
	{
		/**
		 * Returns the next unique id.
		 */
		static get() : number;
	}
	
	/**
	 * A loader for video files.
	 */
	export class VideoLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any, preferXHR:boolean);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/VIDEO:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
	
	/**
	 * A preloader that loads items using XHR requests, usually XMLHttpRequest. However XDomainRequests will be used
	 * for cross-domain requests if possible, and older versions of IE fall back on to ActiveX objects when necessary.
	 * XHR requests load the content as text or binary data, provide progress and consistent completion events, and
	 * can be canceled during load. Note that XHR is not supported in IE 6 or earlier, and is not recommended for
	 * cross-domain loading.
	 */
	export class XHRRequest extends createjs.AbstractLoader
	{
		constructor(item:any);
		/**
		 * Look up the loaded result.
		 */
		getResult(raw?:any, rawResult?:boolean) : any;
		/**
		 * Get all the response headers from the XmlHttpRequest.
		 *
		 * <strong>From the docs:</strong> Return all the HTTP headers, excluding headers that are a case-insensitive match
		 * for Set-Cookie or Set-Cookie2, as a single string, with each header line separated by a U+000D CR U+000A LF pair,
		 * excluding the status line, and with each header name and header value separated by a U+003A COLON U+0020 SPACE
		 * pair.
		 */
		getAllResponseHeaders() : string;
		/**
		 * Get a specific response header from the XmlHttpRequest.
		 *
		 * <strong>From the docs:</strong> Returns the header field value from the response of which the field name matches
		 * header, unless the field name is Set-Cookie or Set-Cookie2.
		 */
		getResponseHeader(header:string) : string;
	}
	
	/**
	 * Loader provides a mechanism to preload Web Audio content via PreloadJS or internally. Instances are returned to
	 * the preloader, and the load method is called when the asset needs to be requested.
	 */
	export class WebAudioLoader extends createjs.XHRRequest
	{
		/**
		 * web audio context required for decoding audio
		 */
		static context : any;
	}
	
	/**
	 * Play sounds using Web Audio in the browser. The WebAudioPlugin is currently the default plugin, and will be used
	 * anywhere that it is supported. To change plugin priority, check out the Sound API
	 * {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method.
	 *
	 * <h4>Known Browser and OS issues for Web Audio</h4>
	 * <b>Firefox 25</b>
	 * <ul><li>mp3 audio files do not load properly on all windows machines, reported
	 * <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=929969" target="_blank">here</a>. </br>
	 * For this reason it is recommended to pass another FF supported type (ie ogg) first until this bug is resolved, if possible.</li></ul>
	 * <br />
	 * <b>Webkit (Chrome and Safari)</b>
	 * <ul><li>AudioNode.disconnect does not always seem to work.  This can cause the file size to grow over time if you
	 * are playing a lot of audio files.</li></ul>
	 * <br />
	 * <b>iOS 6 limitations</b>
	 * 	<ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event (touch/click).</li>
	 * 	<li>A bug exists that will distort uncached audio when a video element is present in the DOM.  You can avoid this bug
	 * 	by ensuring the audio and video audio share the same sampleRate.</li>
	 * </ul>
	 */
	export class WebAudioPlugin extends createjs.AbstractPlugin
	{
		constructor();
		/**
		 * A DynamicsCompressorNode, which is used to improve sound quality and prevent audio distortion.
		 * It is connected to <code>context.destination</code>.
		 *
		 * Can be accessed by advanced users through createjs.Sound.activePlugin.dynamicsCompressorNode.
		 */
		dynamicsCompressorNode : any;
		/**
		 * A GainNode for controlling master volume. It is connected to {{#crossLink "WebAudioPlugin/dynamicsCompressorNode:property"}}{{/crossLink}}.
		 *
		 * Can be accessed by advanced users through createjs.Sound.activePlugin.gainNode.
		 */
		gainNode : any;
		/**
		 * The web audio context, which WebAudio uses to play audio. All nodes that interact with the WebAudioPlugin
		 * need to be created within this context.
		 *
		 * Advanced users can set this to an existing context, but <b>must</b> do so before they call
		 * {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} or {{#crossLink "Sound/initializeDefaultPlugins"}}{{/crossLink}}.
		 */
		static context : any;
		/**
		 * Determine if the plugin can be used in the current browser/OS.
		 */
		static isSupported() : boolean;
		/**
		 * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
		 * require the first sound to be played inside of a user initiated event (touch/click).  This is called when
		 * {{#crossLink "WebAudioPlugin"}}{{/crossLink}} is initialized (by Sound {{#crossLink "Sound/initializeDefaultPlugins"}}{{/crossLink}}
		 * for example).
		 *
		 * <h4>Example</h4>
		 *
		 *     function handleTouch(event) {
		 *         createjs.WebAudioPlugin.playEmptySound();
		 *     }
		 */
		static playEmptySound() : void;
	}
	
	/**
	 * WebAudioSoundInstance extends the base api of {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} and is used by
	 * {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.
	 *
	 * WebAudioSoundInstance exposes audioNodes for advanced users.
	 */
	export class WebAudioSoundInstance extends createjs.AbstractSoundInstance
	{
		constructor(src:string, startTime:number, duration:number, playbackResource:any);
		/**
		 * NOTE this is only intended for use by advanced users.
		 * <br />GainNode for controlling <code>WebAudioSoundInstance</code> volume. Connected to the {{#crossLink "WebAudioSoundInstance/destinationNode:property"}}{{/crossLink}}.
		 */
		gainNode : any;
		/**
		 * NOTE this is only intended for use by advanced users.
		 * <br />A panNode allowing left and right audio channel panning only. Connected to WebAudioSoundInstance {{#crossLink "WebAudioSoundInstance/gainNode:property"}}{{/crossLink}}.
		 */
		panNode : any;
		/**
		 * NOTE this is only intended for use by advanced users.
		 * <br />sourceNode is the audio source. Connected to WebAudioSoundInstance {{#crossLink "WebAudioSoundInstance/panNode:property"}}{{/crossLink}}.
		 */
		sourceNode : any;
		/**
		 * Note this is only intended for use by advanced users.
		 * <br />Audio context used to create nodes.  This is and needs to be the same context used by {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.
		 */
		static context : any;
		/**
		 * Note this is only intended for use by advanced users.
		 * <br /> Audio node from WebAudioPlugin that sequences to <code>context.destination</code>
		 */
		static destinationNode : any;
	}
	
	/**
	 * A loader for CSS files.
	 */
	export class XMLLoader extends createjs.AbstractLoader
	{
		constructor(loadItem:any);
		/**
		 * Determines if the loader can load a specific item. This loader can only load items that are of type
		 * {{#crossLink "AbstractLoader/XML:property"}}{{/crossLink}}.
		 */
		static canLoadItem(item:any) : boolean;
	}
}

declare module createjs.Sound
{
	type SoundFileloadEvent =
	{
		data : any;
		id : string;
		src : string;
		target : any;
		type : string;
	}
	
	type SoundFileerrorEvent =
	{
		data : any;
		id : string;
		src : string;
		target : any;
		type : string;
	}
}

declare module createjs.DisplayObject
{
	type DisplayObjectTickEvent =
	{
		params : any[];
		target : any;
		type : string;
	}
}

declare module createjs.Ticker
{
	type TickerTickEvent =
	{
		delta : number;
		paused : boolean;
		runTime : number;
		target : any;
		time : number;
		type : string;
	}
}

declare module createjs.DOMElement
{
	type DOMElementTickEvent =
	{
		params : any[];
		target : any;
		type : string;
	}
}

declare module createjs.SpriteSheet
{
	type SpriteSheetCompleteEvent =
	{
		target : any;
		type : string;
	}
	
	type SpriteSheetGetframeEvent =
	{
		frame : any;
		index : number;
	}
}

declare module createjs.LoadQueue
{
	type LoadQueueFileloadEvent =
	{
		item : any;
		rawResult : any;
		result : any;
		target : any;
		type : string;
	}
	
	type LoadQueueFilestartEvent =
	{
		The : any;
		item : any;
		type : string;
	}
}

declare module createjs.AbstractSoundInstance
{
	type AbstractSoundInstanceSucceededEvent =
	{
		target : any;
		type : string;
	}
	
	type AbstractSoundInstanceInterruptedEvent =
	{
		target : any;
		type : string;
	}
	
	type AbstractSoundInstanceFailedEvent =
	{
		target : any;
		type : string;
	}
	
	type AbstractSoundInstanceLoopEvent =
	{
		target : any;
		type : string;
	}
	
	type AbstractSoundInstanceCompleteEvent =
	{
		target : any;
		type : string;
	}
}

declare module createjs.Sprite
{
	type SpriteAnimationendEvent =
	{
		name : string;
		next : string;
		target : any;
		type : string;
	}
	
	type SpriteChangeEvent =
	{
		target : any;
		type : string;
	}
}