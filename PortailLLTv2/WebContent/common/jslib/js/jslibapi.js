/******************************************************************************
 *	Copyright (c) 2012 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/

/**
 * create initial namespace
 */
if ( !self["actuate"]  )
{
	actuate = {};
}

if ( actuate.common == undefined )
{
	actuate.common = {};
}

if ( actuate.common.web == undefined )
{
	actuate.common.web = {};
}

/**
 * @class class to manage namespace packages.
 * @static
 */
actuate.common.web.Package =
{
	PACKAGE_SEPARATOR : ".",
	_evalPackageSupported : null,
	
	initialize : function( )
	{
		try
		{
			if ( eval("actuate.common.web") == actuate.common.web )
			{
				this._evalPackageSupported = true;
			}
		}
		catch (e)
		{
			// not supported
			this._evalPackageSupported = false;
		}
	},
	
	/**
	 * Defines a package or object by generating its namespace,
	 * if it doesn't exist yet.
	 * @param packageName Java-style package name (actuate.util.xxx)
	 * @param object optional object to be stored in the last attribute
	 * defined (in actuate.umc.util.xxx it would be xxx)
	 * @return reference to the latest package
	 */
	define : function( packageName, object )
	{
		var parts = packageName.split(this.PACKAGE_SEPARATOR);
		var pk = window;
		var lastPackage = null;
		for ( var i = 0; i < parts.length; i++ )
		{
			lastPackage = pk;
			if ( !pk[parts[i]] )
			{
				pk = pk[parts[i]] = {};
			}
			else
			{
				pk = pk[parts[i]];
			}
		}

		if ( object )
		{
			lastPackage[parts[parts.length - 1]] = object;
		}

		return pk;
	}
};
actuate.common.web.Package.initialize( );
/******************************************************************************
 *	Copyright (c) 2012 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/

/**
 * Actuate Class utility. Ported snipet from iPortal's jsapi's Class.js
 * @class This is a utility class.
 * @visibility default
 */
actuate.common.web.Class =
{
	/**
	 * Create a new class. Execute initialize() method.
	 * @return {Object} created object
	 * @memberOf actuate.common.web.Class
	 */
	create : function( newPrototype )
	{
		var aClass = function( )
		{
			if( this.initialize == undefined )
			{
				this.initialize = function( ){ };
			}
			
			this.initialize.apply( this, arguments );
		};
		
		// 34428. unique instance id. User could create 
		aClass._instanceCount = -1;
		
		return aClass;
	},

	/**
	 * Extend class.
	 * @param {Object} destination to be extended
	 * @param {Object} source extending from
	 * @return {Object} extended object
	 * @memberOf actuate.common.web.Class
	 */
	extend : function( destination, source )
	{
		for( property in source )
		{
			destination[property] = source[property];
		}
		return destination;
	},

	
	/**
	 * Create a new class. Execute initialize() method.
	 * @param {Object} newProto prototype for the new class
	 * @return {Object} created object
	 * @memberOf actuate.common.web.Class
	 */
	createClass : function( newPrototype )
	{
		var aClass = function( )
		{
			if( this.initialize == undefined )
			{
				this.initialize = function( ){ };
			}
			
			this.initialize.apply( this, arguments );
		};
		
		if ( newPrototype )
		{
			aClass.prototype = newPrototype;
		}
		
		aClass._instanceCount = -1;
		
		return aClass;
	},
	
	/**
	 * Create a new class based on the given class and prototype.
	 * @param {Class} baseClass reference to the base class object
	 * @param {Object} newProto prototype for the extended class
	 */
	extendClass : function( baseClass, newProto )
	{
		var aClass = actuate.common.web.Class.create();
		aClass.superclass = baseClass.prototype;
		baseClass.prototype.__extending = true;
		aClass.prototype = actuate.common.web.Class.extend( new baseClass(), newProto );
		delete baseClass.prototype.__extending;
		return aClass;
	}
};/*!
 * jQuery JavaScript Library v1.9.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-1-14
 * Actuate:
 * Do not expose jQuery as a global variable to prevent namespace collision.  Instead, it will be referenced internally as
 * actuate.common.web.jQuery or actuate.common.web.$
 * 
 * Date: Thu Aug 30 2012 17:17:22 GMT-0400 (Eastern Daylight Time)
 */
(function( window, undefined ) {
"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.0",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a, select, opt, input, fragment, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			body.style.zoom = 1;
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;
	
function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt /* For internal use only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i, l,

		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data, false );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name, false );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},
	
	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== "undefined" ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			elemData = elem.nodeType !== 3 && elem.nodeType !== 8 && jQuery._data( elem );

		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = event.type || event,
			namespaces = event.namespace ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						if(this.className === 'modal hide fade in ui-draggable' && !this.isContentEditable){
							
						}else{
							this.focus();
						}
							return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /\{\s*\[native code\]\s*\}/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				for ( ; (elem = results[i]); i++ ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return ( ~b.sourceIndex || MAX_NEGATIVE ) - ( contains( preferredDoc, a ) && ~a.sourceIndex || MAX_NEGATIVE );

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = a && b && a.nextSibling;

	for ( ; cur; cur = cur.nextSibling ) {
		if ( cur === b ) {
			return -1;
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			// `i` starts as a string, so matchedCount would equal "00" if there are no elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["needsContext"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < self.length; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < this.length; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( jQuery.unique( ret ) );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent && this.nodeType === 1 || this.nodeType === 11 ) {

				jQuery( this ).remove();

				if ( next ) {
					next.parentNode.insertBefore( elem, next );
				} else {
					parent.appendChild( elem );
				}
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, data, e;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, srcElements, node, i, clone,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var contains, elem, tag, tmp, wrap, tbody, j,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var curCSS, getStyles, iframe,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else if ( !values[ index ] && !isHidden( elem ) ) {
			jQuery._data( elem, "olddisplay", jQuery.css( elem, "display" ) );
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									xml = xhr.responseXML;
									responseHeaders = xhr.getAllResponseHeaders();

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing a non empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "auto" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
actuate.common.web.Package.define("actuate.common.web");

// if application loads this js files multiple times.
// save the previous version.  This is being done because
// twitter bootstrap has a global listener for their 
// collapse, dropdown, modal, and tab class.  Multiple loading
// of the same twitter bootstrap js class causes the click event to
// not function correctly for these global listeners.
if ( actuate.common.web.jQuery )
{
	jQuery._acPrev$ = actuate.common.web.jQuery;
}
actuate.common.web.jQuery = actuate.common.web.$ = jQuery;


// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
/******************************************************************************
 *	Copyright (c) 2007 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/
actuate.common.web.Package.define("actuate.common.web.util");

/**
 * @class Utility class.
 * @static
 */
actuate.common.web.util.Utility =
{
		
	initialize : function()
	{
	},
	
	getRootCSSNamespace : function( )
	{
		return "ac";
	},
	
	/**
     * Shows a modal message dialog showing the error
     * @param id container id
     * @param error actuate.common.web.Exception object or string
     * @param type "error", "info", "warning", "severe"
     */
    showMsgDlg : function( id, error, type, dialogConfig )
    {
        var dlg = new actuate.common.web.widget.dialog.MsgDialog( {id:id, msg:error, type:"error", dialogConfig: dialogConfig} );
        dlg.render( );
    },
    
    createControlItem : function( type, config )
    {
        var ctrl = null;
        switch ( type )
        {
            case 'password':
                ctrl = new actuate.common.web.widget.control.Password(config);
                break;
    
            case 'date':
                ctrl = new actuate.common.web.widget.control.DatePicker(config);
                break;

            case 'checkbox':
                ctrl = new actuate.common.web.widget.control.CheckBox(config);
                break;

            case 'combobox':
                ctrl = new actuate.common.web.widget.control.ComboBox(config);
                break;

            case 'label':
                ctrl = new actuate.common.web.widget.control.Label(config);
                break;

            case 'listbox':
                ctrl = new actuate.common.web.widget.control.ListBox(config);
                break;

            case 'radio':
                ctrl = new actuate.common.web.widget.control.Radio(config);
                break;

            case 'button':
                ctrl = new actuate.common.web.widget.control.Button(config);
                break;

            case 'file':
                ctrl = new actuate.common.web.widget.control.File(config);
                break;
                
            default:
                ctrl = new actuate.common.web.widget.control.TextField(config);
        }

        return ctrl;

    },
	
	/**
	 * Returns whether the given exception is an actuate common web exception.
	 */
	isActuateException : function(e)
	{
		return ( e instanceof actuate.common.web.Exception || ( e.getType && e.getErrCode ) );
	},
	
	/**
	 * Create an exception based on a javascript error.
	 * If e is an actuate exception, return it directly.
	 * If e is a string, encapsulate it in an actuate.common.web.Exception
	 * and return it.
	 * @param e javascript error
	 * @param {Class} exceptionClass optional exception class
	 * @return {actuate.common.web.Exception} instance
	 */
	createException : function(e, exceptionClass)
	{
		if ( this.isActuateException(e) )
		{
			return e;
		}
		else if ( typeof(e) == "string" )
		{
			return new actuate.common.web.Exception( actuate.common.web.Exception.ERR_CLIENT, e );
		}
		
		if ( !exceptionClass )
		{
			exceptionClass = actuate.common.web.Exception;
		}
		var errMsg = e.message? e.message : e.description;
		if( !errMsg ) errMsg = e; // If there really isn't any message property, then "e" must be the message.
		
		// Create errCode if available (IE specific)
		var errCode = e.number? e.number : null;
		
		// Create errDetail
		var errDetail = "";
		if( e.fileName )
			errDetail += "\n fileName=" + e.fileName;
		else if( e.filename )
			errDetail += "\n filename=" + e.filename;
			
		if( e.lineNumber )
			errDetail += "\n lineNumber=" + e.lineNumber;
		if( e.stack )
			errDetail += "\n stack=" + e.stack;
			
		if( e.description && e.description != errMsg ) // If we haven't captured the description
			errDetail += "\n description=" + e.description;
			
		return new exceptionClass( actuate.common.web.Exception.ERR_CLIENT, errMsg, errDetail, errCode );
	}, 

	/**
	 * Same as chainCallbacks, but takes the function list as an array.
	 * @param {Array<Function>} functions function array
	 * @param {Function} exceptionHandler exception handler
	 */
	chainCallbacksArray : function( functions, exceptionHandler )
	{
//		console.log("utility.chainCallbacksArray");		
		var callbackChain = new this._CallbackChain( functions, exceptionHandler );
		callbackChain.start();
	},
	
	/**
	 * Returns unique elements of an array
	 * @param {Array} a
	 * @return {Array}
	 */
	arrayUnique : function( arrayName )
    {
        var newArray = new Array();
        label: for( var i = 0; i < arrayName.length; i++ )
        {  
            for( var j = 0; j < newArray.length; j++ )
            {
                if( newArray[j] == arrayName[i]) 
                    continue label;
            }
            newArray[newArray.length] = arrayName[i];
        }
        return newArray;
    },
    
	/**
	 * Makes an absolute url based on the current page out of a relative one.
	 * @param {String} url relative url
	 * @param {String} baseUrl base url. Uses current page url if null.
	 * @return {String} absolute relative based on the current page 
	 */
	makeAbsoluteUrl : function( url, baseUrl )
	{

		if ( !url || url.length == 0 )
		{
			url = ".";
		}
		
		// if url is relative
		if ( !url.match(/^[a-zA-Z]*:\/\//) )
		{
			// make it absolute using the current page's URL
			if ( !baseUrl )
			{
				baseUrl = location.href;
			}
			
			var baseUrlParts = baseUrl.match(/(^[a-zA-Z]*:\/\/[^\/]*)\//);
			if ( baseUrlParts )
			{
				var protocol = baseUrlParts[1];
				var pathRootIndex = baseUrl.substr(protocol.length).indexOf("/");
				var pathName = baseUrl.substr(protocol.length + pathRootIndex);
				
				if ( url.charAt(0) == "/" )
				{
					pathName = pathName.substr( 0, pathName.indexOf("/") + 1 );
				}
				else
				{
					// remove request part
					var requestPartIndex = pathName.indexOf("?");
					if ( requestPartIndex < 0 )
					{
						requestPartIndex = pathName.length;
					}
					
					// remove file/document name
					var lastSlash = pathName.lastIndexOf("/", requestPartIndex);
					if ( lastSlash >= 0 )
					{
						pathName = pathName.substr(0,lastSlash) + "/";
					}
				}
				
				var urlRequestIndex = url.indexOf("?");
				if ( urlRequestIndex < 0 )
				{
					urlRequestIndex = url.length;
				}
				var urlLastSlash = url.lastIndexOf("/", urlRequestIndex);
				var urlFilePart = url.substr( urlLastSlash + 1 );
				if ( urlFilePart != "." && urlFilePart != ".." )
				{
					url = url.substr(0, urlLastSlash);
				}
				else
				{
					urlFilePart = "";
				}
				
				// remove trailing slash
				pathName = pathName.substr(0, pathName.length - 1);
				
				var urlParts = url.split("/");
				for ( var i = 0; i < urlParts.length; i++ )
				{
					var urlPart = urlParts[i];
					if ( urlPart == ".." )
					{
						var lastSlash = pathName.lastIndexOf("/");
						pathName = pathName.substr(0, lastSlash);
					}
					else if ( urlPart != "." && urlPart != "" )
					{
						pathName += "/" + urlPart;
					}
				}
				
				// var lastChar = url.charAt( url.length - 1 );
				
				// if given relative url had a trailing slash, add one as well
				if ( pathName != "/" )
				{
					pathName += "/" + urlFilePart;
				}
				
				url = protocol + pathName;
			}
		}
		return url;
	},
	
    getValidationTitleKey : function ( type ) 
    {
    	var title = "Dlg.Title.Information";
    	
    	if ( type === 'warning' )
		{
			title = "Dlg.Title.Warning";
		}
		else if ( type === 'error' )
		{
			title = "Dlg.Title.Error";
		}
		else if ( type === 'severe' )
		{
			title = "Dlg.Title.Severe";
		}
		else if ( type === 'confirmation' )
		{
			title = "Dlg.Title.Confirmation";
		}
    	
    	return title;
    },
    
    _getLocalizedModule : function( moduleName )
    {
		var _2_modName = actuate.common.web.resourcesBundle.localizedStrings[ moduleName ];
		if ( !_2_modName )
		{
			return null;
		}

		return _2_modName;
    },
    
    _getLocalizedString : function( moduleName, key )
    {
		var _2_modName = actuate.common.web.util.Utility._getLocalizedModule( moduleName );
		if ( !_2_modName )
		{
			return null;
		}
		
		var _2 = _2_modName[ key ];
		if ( !_2 )
		{
			// if the key is not found in the localized module, try to use the default module
			_2_modName = actuate.common.web.util.Utility._getLocalizedModule( "default" );
			if ( _2_modName )
			{
				_2_modName = _2_modName[ moduleName ];
			}	
		}

		return _2_modName;
    },
    
	/**
	 * Get localized string
	 * @param moduleName component module name
	 * @param key localization key
	 */
	getLocalizedString : function( )
	{
		if ( !actuate.common.web.resourcesBundle )
		{
			return "";
		}
		
		var moduleName 	= arguments[0];
		var _1 			= arguments[1];

		if ( !moduleName || !_1 )
		{
			return "";
		}	
		
		// label keys are case insensitive that are returned by resource servlet
		_1 = _1.toLowerCase();
		
		/*
		var _2 = actuate.common.web.resourcesBundle.localizedStrings[moduleName][_1];
		if ( !_2 )
		{
			return "";
		} */
		
		var _2_modName = actuate.common.web.util.Utility._getLocalizedString( moduleName, _1 );
		if ( !_2_modName )
		{
			return "";
		}
		
		var _2 = _2_modName[_1];
		if ( !_2 )
		{
			return "";
		}
		
		//Replace input into the localized message
		for( var i = 2; i<arguments.length; i++ )
		{
			var j = i-2;
			var re = new RegExp( "\\{" + j + "\\}", "g" );
			_2 = _2.replace( re,arguments[i] );
		}
		
		return _2;
	},
	
    createUniqueControlID : function ()
    {
    	var uniqueID = (this.S4()+this.S4()+this.S4()+this.S4()).toUpperCase();
    	return uniqueID;
    },

    S4 : function()
    {
    	var random = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    	return random;
    },
    
    /**
     * Converts the ms date value into a string.
     * 
     * @param timeInMs time in MS offset value
     * @returns a localized date value
     */
    convertMsToDateString : function(timeInMs)
    {
        // TODO: Convert this to a localized date
        
        var dt = new Date(timeInMs);
        var ret = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        return ret;
    }
};

/**
 * @class Private utility class for chaining callback methods.
 */
actuate.common.web.util.Utility._CallbackChain = actuate.common.web.Class.create();
/** @ignore */
actuate.common.web.util.Utility._CallbackChain.prototype =
{
		_functions : null,
		_currentFunction : null,
		_onException : null,
		
		/**
		 * Creates a callback chain.
		 * @param {Array<Function>} functions array of functions accepting an unique argument "callback"
		 * @param {Function} exceptionHandler exception handler (optional)
		 */
		initialize : function( functions, exceptionHandler )
		{
			this._functions = functions;
			this._nextClosure = actuate.common.web.Method.bind( this._next, this );
			this._onException = exceptionHandler;
		},
		
		/**
		 * Starts the call chain.
		 */
		start : function( )
		{
			this._next( );
		},
		
		/**
		 * Executes the next function in the chain.
		 * @param arguments arguments to be passed to the next function
		 */
		_next : function( )
		{
			try
			{
				if ( this._functions.length > 0 )
				{
					this._currentFunction = this._functions.shift( );
					
					if ( !this._currentFunction )
					{
						throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Null function found in the array passed to chainCallbacks");
					}
					
					var args = [];
					args.push( this._nextClosure );
				    for( var i = 0; i < arguments.length; i++ )
				    {
				    	args.push( arguments[i] );
				    }
					
					if ( this._currentFunction.apply( null, args ) )
					{
						// if the function returns true, go on chaining
						this._next( );
					}
				}
			}
			catch ( e )
			{
				if ( this._onException )
				{
					this._onException(e);
				}
				else
				{
					throw e;
				}
			}
		}
};

actuate.common.web.util.Utility.initialize();

/**
 * Actuate common web resource bundle.
 */
actuate.common.web.Package.define( "actuate.common.web.resourcesBundle.localizedStrings" );
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Control class
 * 
 */

actuate.common.web.widget.control.Control = actuate.common.web.Class.create();
actuate.common.web.widget.control.Control.prototype = 
{
    // Default attributes used by input tag
    /**
    *
    * 	id			: null,
    *	allowBlank	: true,
    *	readOnly	: false,
    *	width		: null,
    *	height		: null,
    *	label		: null,
    *	type		: null,
    *	disabled	: false,
    *	align		: null,
    *	alt			: null,
    *	title		: null,
    *	cssClass	: null,
    *	appendTo	: null,
    *	value		: null,
    *
    */
    _defaults : {
        readOnly : false,
        disabled : false
    },

    _element : null,
    _lblElement : null,
    _curSettings : null,
    _width : null,
    _height : null,
    _label : null,
    _css : null,

    /**
     * initialize - base control class
     * @param config
     * @return {void}
     */
    initialize : function(config)
    {
        if (this.__extending)
            return;

        this._initControlSettings(config);
        this._createElement();

        this._initComponent();
    },

    _initControlSettings : function(config)
    {
        this._curSettings = actuate.common.web.$.extend({}, this._defaults, config);

        this._width = this._curSettings.width;
        this._height = this._curSettings.height;
        this._label = this._curSettings.label;
        this._css = this._curSettings.cssClass;

        delete this._curSettings.width;
        delete this._curSettings.height;
        delete this._curSettings.label;
        delete this._curSettings.cssClass;
    },

    /**
     * sets appendTo container for this element.
     * @param appendTo
     */
    appendTo : function(appendTo)
    {
        this._curSettings.appendTo = appendTo;

        if (this._curSettings.appendTo)
        {
            if (this._lblElement)
            {
                this._lblElement.appendTo(this._curSettings.appendTo);
            }
            this._element.appendTo(this._curSettings.appendTo);
        }
    },

    /**
     * gets the value of this element
     */
    getValue : function()
    {
        return this._element.val();
    },

    /**
     * Sets the value of this element.
     * 
     * @param value to set
     */
    setValue : function(value)
    {
        this._element.attr("value", value);
        this._element.val(value);
    },

    enable : function()
    {
        this._curSettings.disabled = false;
        this._element.attr("disabled", true);
    },

    disable : function()
    {
        this._curSettings.disabled = true;
        this._element.attr("disabled", false);
    },

    isEnabled : function()
    {
        return !this._curSettings.disabled;
    },

    /**
     * Add a class to this element
     * @param className
     */
    addClass : function(className)
    {
        return this._element.addClass(className);
    },

    /**
     * Remove a class from this element
     * @param className
     */
    removeClass : function(className)
    {
        return this._element.removeClass(className);
    },

    /**
     * Checks if this element has the given class
     * @param className
     * @returns {boolean} true if found
     */
    hasClass : function(className)
    {
        return this._element.hasClass(className);
    },

    /**
     * Set's the size of this control
     * @param size 
     * 	<p>{width:"10px", height:"10px" }</p>		
     */
    setSize : function(size)
    {
        //Setting the width and height of the text box
        this._element.css({
            'width' : size.width,
            'height' : size.height
        });
    },

    /**
     * initialize the component with other default values
     */
    _initComponent : function()
    {
        this.setSize({
            width : this._width,
            height : this._height
        });

        //set CSS class for this control
        this.addClass(this._css);
    },

    /**
     * Returns the default input tag syntax to create the control with
     * @returns {String}
     * 		<p>&lt;input&gt;</p>
     */
    _getHTMLTag : function()
    {
        return "<input>";
    },

    _getPrefixID : function()
    {
        // Actuate Control
        return "acctrl";
    },

    _getSuffixID : function()
    {
        //Actuate Count
        return "accnt";
    },

    /**
     * default implementation class to create html element
     */
    _createElement : function()
    {
        var tagType = this._getHTMLTag();
        this._curSettings.id = this.getID();

        this._element = new actuate.common.web.$(tagType);
        this._element.attr(this._curSettings);

        // Add a label if label exist.
        if (this._label)
        {
            var lblSettings = actuate.common.web.$.extend({}, {}, this._curSettings);
            lblSettings.id = this.getUniqueID();

            this._lblElement = new actuate.common.web.widget.control.Label(lblSettings);
        }
    },

    focus : function()
    {
    	return this._element.focus();
    },
    
    /**
     * sets a data-name attribute to this control
     * @param value
     */
    setDataNameAttr : function( value )
    {
    	this._element.attr( { "data-name" : value });
    },
    
    /**
     * returns the data-name attribute value for this control
     * @returns
     */
    getDataNameAttr : function( )
    {
    	return this._element.attr( "data-name" );
    },
    
    /**
     * Add a listener to this element control
     * @param event
     * @param handler function called when the event is called
     */
    addListener : function( event, handler )
    {
    	this._element[event] = handler;
    },
    
    /**
     * Returns the title of this control
     * @returns {String} title
     */
    getTitle : function()
    {
    	if ( !this._curSettings.title )
		{
    		return "";
		}
        return this._curSettings.title;
    },

    /**
     * Gets the id of this control
     * @returns The ID of this control
     */
    getID : function()
    {
        if (this._element)
        {
            return actuate.common.web.$(this._element).attr('id');
        }

        if (this._curSettings.id)
        {
            return this._curSettings.id;
        }
        return this.getUniqueID();
    },

    getUniqueID : function()
    {
        var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
        var nextID = this._getNextCtrlCntID();
        var prefix = this._getPrefixID();
        var suffix = this._getSuffixID();

        uniqueID = prefix + nextID + "-" + uniqueID + "-" + suffix + nextID;
        return uniqueID;
    },

    _getNextCtrlCntID : function()
    {
        return actuate.common.web.widget.control.Counter.getNextCtrlCntId();
    }

};

//Create a global control counter
actuate.common.web.widget.control.Counter = 
{
    _nextCntrlCnt_ : 0,

    getNextCtrlCntId : function()
    {
        return this._nextCntrlCnt_++;
    }
};
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new BaseInputTag class
 * 
 */

actuate.common.web.widget.control.InputTag = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.Control,
{
	/**
	 * initialize - base input tag class
	 * 
	 * @param config
	 * @return
	 */
	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	actuate.common.web.widget.control.InputTag.superclass.initialize.call( this, config );
	},
	
    /**
     * initialize the component with other default values
     */
    _initComponent : function()
    {
        actuate.common.web.widget.control.InputTag.superclass._initComponent.call( this );
        this.addClass("actuTextField");
    },
	
	/**
	 * Returns the default input tag syntax to create the control with
	 * @returns {String}
	 * 		<p>&lt;input&gt;</p>
	 */
	_getHTMLTag : function( )
	{
		return "<input>";
	}
});
/*!
 * jQuery UI Widget 1.9.1
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: basePrototype.widgetEventPrefix || name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		// TODO remove widgetBaseClass, see #8155
		widgetBaseClass: fullName,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					new object( options, this );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			// 1.9 BC for #7810
			// TODO remove dual storage
			$.data( element, this.widgetName, this );
			$.data( element, this.widgetFullName, this );
			this._on( this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( element, handlers ) {
		var delegateElement,
			instance = this;
		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			// accept selectors, DOM elements
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( instance.options.disabled === true ||
						$( this ).hasClass( "ui-state-disabled" ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && ( $.effects.effect[ effectName ] || $.uiBackCompat !== false && $.effects[ effectName ] ) ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

// DEPRECATED
if ( $.uiBackCompat !== false ) {
	$.Widget.prototype._getCreateOptions = function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	};
}

})( actuate.common.web.jQuery );
/******************************************************************************
 *	Copyright (c) 2007 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/

/**
 * Exception object.
 * @class Exception Exception object sent to the callback function when an exception occurs
 * @visibility apiuser
 */
actuate.common.web.Exception = actuate.common.web.Class.create( );
// add static members
actuate.common.web.Class.extend(actuate.common.web.Exception,
/** @lends actuate.common.web.Exception */
{
	/**
	 * Exception type for server error. 
	 * @constant
	 * @type {String}
	 */
	ERR_SERVER : 'err_server',
	
	/**
	 * Exception type for client side error
	 * @constant
	 * @type {String}
	 */
	ERR_CLIENT : 'err_client',
	
	/**
	 * Exception type for api usage error
	 * @constant
	 * @type {String}
	 */
	ERR_USAGE : 'err_usage'
});

actuate.common.web.Exception.prototype =
{
	_type : null, // Type of exception ( ERR_SERVER, ERR_CLIENT, ERR_USER )
	_code : null, // Error code 
	_msg : null, // Error message
	_detail : null, // Detailed description of error
	
	/**
	 * Create an Exception object with details about error
	 * @see ERR_SERVER
 	 * @see ERR_CLIENT
 	 * @see ERR_USAGE
	 * @param {String} errType Type of error (see ERR_SERVER, ERR_CLIENT, ERR_USAGE)
	 * @param {String} errMsg Short error message
	 * @param {String} errDetail Detailed description of error
	 * @param {String} errCode Error code
	 */
	initialize : function( errType, errMsg, errDetail, errCode, errParams )
	{
		if ( arguments.length == 1 ) 
		{
			this.initJSException( errType );
			return;
		}
		
		this._type = errType;
		this._msg = errMsg;
		this._detail = errDetail;
		this._errorParams = errParams;
		this._code = errCode;
	},
	
	/**
	 * Create an exception message based on the javascript exception object e given
	 * This will generate ERR_CLIENT for this type of error
	 * Detail description error message is created from following based on e:
	 *  fileName
	 *  lineNumber
	 *  message
	 *  name
	 * @param {Exception} e
	 * @private
	 */
	initJSException : function ( e )
	{
		var detailMsg = "";
		if ( e )
		{
			var tabNbreak = "\n\t";
			if ( e.fileName )
			{
				detailMsg += tabNbreak + "fileName: " + e.fileName;
			}
			if ( e.lineNumber )
			{
				detailMsg += tabNbreak + "lineNumber: " + e.lineNumber;
			}
			if ( e.message )
			{
				detailMsg += tabNbreak + "message: " + e.message;
				this._msg = e.message;
			} 
			if ( e.name )
			{
				detailMsg += tabNbreak + "name: " + e.name;
			}
		}
		this._type = actuate.common.web.Exception.ERR_CLIENT;
		this._detail = detailMsg;
	},
	
	/**
	 * Return the type of exception error
	 * @return {String} errType Type of exception
	 */
	getType : function()
	{
		return this._type;
	},
	
	/**
	 * Return short message about exception
	 * @return {String} errMsg short message about the exception
	 */
	getMessage : function()
	{
		return this._msg;
	},

	/**	
	 * Return description 
	 * - soap string for ERR_SERVER, 
	 * - fileName+number+stack for ERR_CLIENT(firefox only), 
	 * - And as for ERR_USER anything set when creating this object
	 * @return {String} detail description of error
	 */
	getDescription: function()
	{
/*		var description = 
		{
				msg     : this._msg,
				param	: this._errorParams
		}*/
		return this._detail;
	},
	
	getParameters: function()
	{
		return this._errorParams;
	},
	
	/**
 	 * Return error code for ERR_SERVER
	 * @return {String} error code for ERR_SERVER
	 */
	getErrCode : function()
	{
		return this._code;
	},
	
	/**
	 * Returns whether this exception instance is of the given type.
	 * @param {Object} exceptionType exception type as string, or exception class.
	 * Examples: "actuate.viewer.ViewerException" or actuate.viewer.ViewerException
	 * @return {boolean} true if the exception is of the given type
	 */
	isExceptionType : function( exceptionType )
	{
		if ( typeof(exceptionType) == "string" )
		{
			return exceptionType == this._getName();
		}
		return this instanceof exceptionType;
	},
	
	/**
	 * Returns the exception name.
	 * @return {String} exception name
	 * @visibility default
	 */
	_getName : function()
	{
		return "actuate.common.web.Exception";
	},
	
	/**
	 * Returns the exception message.
	 * @return {String} exception message
	 * @visibility default
	 */
	toString : function()
	{
		var message = this._getName() + ": ";
		if ( this.getType() )
		{
			message += "<br/><b>Type:</b> " + this.getType();
		}
		if ( this.getErrCode() )
		{
			message += "<br/><b>Error code:</b> " + this.getErrCode();
		}
		message += "<br/><b>Message:</b> " + this.getMessage();
		if ( this.getDescription() )
		{
			message += "<br/><b>Description:</b> " + this.getDescription();
		}
		
		return message;
	}	
};	
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/

/**
 * Entry point to the JS API library.
 * 
 * @srcfile Loader
 * @name Loader
 * @visibility apiuser
 * @namespace Entry point to JS API library.<br/> The
 *            load() method must be called first with appropriate module names,
 *            followed by a call to the initialize() method to initialize the
 *            API.<br/> The initialize() method will do the authentication and
 *            load related resources.
 * @see actuate.common.web.Loader.load()
 * @see actuate.common.web.Loader.initialize()
 */
actuate.common.web.Loader =
{
	/**
	 * Maps the user module names to the real module names.
	 */
	_moduleMappings : {
	    "myfiles"  : "actuate.myfiles",
	    "ac"       : "actuate.ac",
		"umc"      : "actuate.umc",
		"jqueryui" : "jquery.ui",
		"jslibcss" : "webjslib.css",
		"uxumc"    : "uxumc.css"
	},
	/**
	 * Specifies whether the library has been initialized or not.
	 */
		_initialized : false,
		_running : false,	
    /**
	 * Callback function, called whenever an error occurred during the Actuate
	 * initialization. This function can take two parameters: URL and message.
	 * The URL parameter is the URL which failed loading (or null).
	 */
    _onError : null,

    /**
     * Callback function, called after Loader has finished
     * its initialization.
     */
    _onAfterInit : null,
	/**
	 * iPortal URL from where to load the global resources, also used by default
	 * by the created viewers.
	 */
	_baseUrl : null,
	
	/**
	 * Module loaded in initialization
	 */
	_initModules : new Array( ),
	
	/**
	 * IServer request options. Contains an instance of actuate.common.web.RequestOptions,
	 * or null.
	 */
	_requestOptions : null,
		
	/**
	 * Initializes the JS API library.
	 * 
	 * loads the API selected by the load() method, then calls the passed
	 * callback method. If an error occurred, the error callback will be called,
	 * if defined.
	 * 
	 * @param {String}
	 *            baseUrl server base URL from where to load the needed
	 *            resources.
	 * @param {actuate.common.web.RequestOptions}
	 *            requestOptions optional requestOptions, can be null, missing,
	 *            or an instance of actuate.common.web.RequestOptions.
	 * @param {Function}
	 *            callback callback function to be called once the
	 *            initialization of the API is complete.<br/>The callback takes
	 *            the following arguments:
	 *            <ul>
	 *            <li>baseUrl: same as the passed URL</li>
	 *            </ul>
	 * @param {Function}
	 *            errorCallback optional callback function whenever an error
	 *            occurred during initialization. The possible exceptions are
	 *            the following:
	 *            <ul>
	 *            <li>actuate.ConnectionException: if the resource loading
	 *            failed, due to an invalid baseUrl.</li>
	 *            <li>actuate.AuthenticationException: the authentication has
	 *            failed/li>
	 *            <li>actuate.common.web.Exception: other exceptions</li>
	 *            </ul>
	 * @see actuate.common.web.Exception
	 * @see actuate.common.web.load
	 */
	initialize : function( baseUrl, requestOptions,
			callback, errorCallback )
	{

//		console.log("loader.initialize:" + baseUrl);
		if ( this._initialized || this._running )
		{
			return;
		}
		
		if ( !baseUrl )
		{
			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Missing argument baseUrl");
		}
  		if ( this._initModules.length == 0 )
  		{
  			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "No modules have been selected with the load() method.");
  		}
		
		
		if ( callback && ( typeof(callback) != "function" ) )
		{
			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Argument \"callback\" contains an invalid callback function.");
		}

		if ( errorCallback && ( typeof(errorCallback) != "function" ) )
		{
			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Argument \"errorCallback\" contains an invalid callback function.");
		}
		
		this._initialized = false;
		this._running = true;
		this._onAfterInit = callback;
		this._onError = errorCallback;
		
		if ( baseUrl && baseUrl.charAt( baseUrl.length - 1) != "/" )
		{
			baseUrl += "/";
		}
		
		this._baseUrl = baseUrl;
		if ( requestOptions )
		{
			if ( !( requestOptions instanceof actuate.common.web.RequestOptions ) )
			{
				throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Invalid request options, it must be an instance of \"actuate.RequestOptions\".");
			}
			this._requestOptions = new actuate.common.web.RequestOptions( requestOptions );
		}
		else
		{
			this._requestOptions = null;
		}
		
		this._errorClosure = actuate.common.web.Method.bind( this._error, this );


		var chain = new Array( );	
		chain.push( actuate.common.web.Method.bind( this._loadResources, this ) );
		chain.push( actuate.common.web.Method.bind( this._resourcesLoaded, this ) );

		// Execute callback chain
		window.setTimeout(function(){
			actuate.common.web.util.Utility.chainCallbacksArray(
					chain,
					this._errorClosure
					);
		},100);				

	},		
	/**
	 * Specifies the name of an API module to load. This method must be called
	 * before initialize(). The available module names are the following:
	 * <dl>
	 * <li>"umc": provides the actuate.umc package and actuate.umc
	 * class.</li>
	 * <li>"dialog": provides the actuate.dialog package.</li>
	 * </dl>
	 * 
	 * @param {String}
	 *            moduleName module name to import
	 * 
	 * @see actuate.initialize()
	 */
	load : function( moduleName )
	{  				

		// if module is available
		var realModuleName = this._moduleMappings[moduleName];
  		if ( realModuleName )
  		{
  			this._initModules.push( moduleName );
  		}
  		else
 		{
  			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Invalid module name \"" + moduleName + "\".");
  		}
  		
	},
	
	/**
	 * Loads resources using the ResourceLoader. Chains to _resourcesLoaded when
	 * finished, or to _error if an error occured.
	 * 
	 * @param callback
	 *            callback to call once the resource loading is finished
	 */
	_loadResources : function(callback)
	{
//		console.log("Loader.loadResources:");
		var normalizedNames = [];
		normalizedNames.push( this._moduleMappings["jslibcss"] );
		for( var i = 0; i < this._initModules.length; i++ )
		{
			var moduleName = this._initModules[i];
			if ( moduleName === 'umc' )
			{
				normalizedNames.push( this._moduleMappings["uxumc"] );	
			}	
			normalizedNames.push( this._moduleMappings[moduleName] );
		}
		
		actuate.common.web.resource.module.require( normalizedNames, callback );
	},
	
	/**
	 * Callback method which is called after the ResourceLoader has
	 * finished loading the resources. 
	 */
	_resourcesLoaded : function()
	{
//		console.log("Loader._resourcesLoaded:");
		this._initialized = true;
		this._running = false;
		if ( this._onAfterInit )
		{		
			
			var that = this;
			// 	defer callback call to event queue		
			self.setTimeout(
					function()
					{
						that._onAfterInit();
					}
					,0 
					);
		}
	},
	


	/**
	 * Callback method which is called if an error occurred in the
	 * ResourceLoader.
	 * 
	 * @param {Object}
	 *            e exception
	 */
	_error : function( e )
	{

		e = actuate.common.web.util.Utility.createException(e);
		if ( this._onError )
		{			
			this._onError( e );
		}
		// status code 555 stands for license check error
		else if( e.getErrCode( ) == 555 )
		{
			alert( e.getDescription( ) );
		}
		else
		{
			alert( e );
		}
	},
	
	/**
	 * Returns whether the library is already initialized.
	 * 
	 * @return {boolean} true, if the library is already initialized
	 */
	isInitialized : function()
	{
		return this._initialized;
	},
	
	/**
	 * Returns the default base URL.
	 * 
	 * @return default base URL
	 */
	getDefaultBaseUrl : function( )
	{
		return this._baseUrl;
	},
	
	/**
	 * Returns the default request options.
	 * 
	 * @return default request options (instance of actuate.RequestOptions)
	 */
	getDefaultRequestOptions : function( )
	{
		return this._requestOptions;
	}
};


/******************************************************************************
 *	Copyright (c) 2012 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/

/**
 * Actuate common Method utility. Ported from prototype.
 * @class This is a utility class.
 * @visibility default
 */
actuate.common.web.Method =
{
	/**
	 * Empty method.
	 */
	empty : function( )
	{
	},

	/**
	 * Try multiple functions.
	 */
	tryThese : function( )
	{
		var returnValue = null;
		for( var i = 0; i < arguments.length; i++ )
		{
			var lambda = arguments[i];
			try
			{
				returnValue = lambda( );
				break;
			}
			catch( e )
			{
			}
		}
		return returnValue;
	},


	/**
	 * Simple bind. Create a closure for method within object.
	 * This version try to reduce the unnecessary overhead
	 * compare to prototype's implementation.
	 * @param {Object} method
	 * @param {Object} object
	 * @param {Object} options {single:true, event:event name}
	 * @return {Object} closure
	 */
    bind : function( method, object, option )
    {
//    	console.log("Method.bind");
		//  create single-use handler
		if( option && option.single == true && option.event )
		{
			var handler = function( )
			{
				var dispatcher = option.dispatcher;
				if( !dispatcher )
				{
					dispatcher = object;
				}

				if( dispatcher.unregisterEventHandler )
				{
					dispatcher.unregisterEventHandler( option.event, handler );
				}
				if ( method )
				{
					return method.apply( object, arguments );
				}
			};

			return handler;
		}

		return function( )
		{
			if ( method )
			{
				return method.apply( object, arguments );
			}
		};

    },


	/**
	 * Binding as event listener.
	 * @param {Object} method
	 * @param {Object} object
	 * @return {Object} closure for event listener
	 */
	bindAsEventListener : function( method, object )
	{
		return function( event )
		{
			if ( method )
			{
				return method.call(object, event || window.event);
			}
		};
	},

	/**
	 * Create a closure for method within object as well as other parameters.
	 * @param {Object} method
	 * @param {Object} object
	 * @return {Object} closure
	 */
	bind2 : function( method, object )
	{
		var args = [];
	    for( var i = 2; i < arguments.length; i++ )
	    {
	    	args.push( arguments[i] );
	    }

	    return function( )
		{
	    	var argCopy = [];
	    	for ( var i = 0; i < args.length; i++ )
	    	{
	    		argCopy.push( args[i] );
	    	}
	    	
		    for( var i = 0; i < arguments.length; i++ )
		    {
		    	argCopy.push( arguments[i] );
		    }
			if ( method )
			{
				return method.apply( object, argCopy );
			}
		};
	},
	
    defer : function(millis, method, obj, args, appendArgs){
        var fn = this.createDelegate(method, obj, args, appendArgs);
        if(millis){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },
    
    createDelegate : function(method, obj, args, appendArgs){
        return function() {
            var callArgs = args || arguments;
            if(appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if(typeof appendArgs == "number"){
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
			if ( method )
			{
				return method.apply(obj || window, callArgs);
			}
        };
    },

    createInterceptor : function(method, fcn, scope){
        if(typeof fcn != "function"){
            return method;
        }

        return function() {
            fcn.target = this;
            fcn.method = method;
            if(fcn.apply(scope || this || window, arguments) === false){
                return;
            }
			if ( method )
			{
				return method.apply(this || window, arguments);
			}
        };
    },
    
    createSequence : function(method, scopeMethod, fcn, scopeFcn){
        if(typeof fcn != "function"){
            return method;
        }
        return function() {
            var retval = method.apply( scopeMethod || method || window, arguments);
            fcn.apply(scopeFcn || method || window, arguments);
            return retval;
        };
    },  
    
    callback : function(cb, scope, args, delay){
        if(typeof cb == "function"){
            if(delay){
                actuate.Method.defer(delay, cb, scope, args || []);
            }else{
                cb.apply(scope, args || []);
            }
        }
    },
    
    createCallback : function(func /*, args...*/){
        // make args available, in function below
        var args = [];
        for ( var i = 1; i < arguments.length; i++ )
        {
        	args.push(arguments[i]);
        }
        var method = func;
        return function() {
			if ( method )
			{
				return method.apply(window, args);
			}
        };
    }
};
/*******************************************************************************
 * Copyright (c) 2007 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web");

/**
 * The RequestOptions class contains common attributes used to connect such as the user's locale
 * @param {actuate.RequestOptions} requestOptions optional requestOptions to copy the values
 * from.
 * @class RequestOptions contains common attributes that are used for connection such as the user's locale
 * @visibility apiuser
 */
actuate.common.web.RequestOptions = actuate.common.web.Class.create();

// add static attributes
actuate.common.web.RequestOptions.prototype = 
{
	_customParameters 	: null,
	_locale 			: null,
	_authID				: null,
	_url				: null,
	
	/**
	 * Creates a new RequestOptions instance.
	 * @param {actuate.common.web.RequestOptions} requestOptions optional requestOptions to copy the values
	 * from.
	 */
	initialize : function( requestOptions )
	{
		if( requestOptions && requestOptions.__getCustomParameters )
		{
			this._locale = requestOptions._locale;
			this._authID = requestOptions._authID;
			this._url = requestOptions._url;
			
			
			this._customParameters = new Object( );
			for( var i in requestOptions._customParameters )
			{
				this._customParameters[i] = requestOptions._customParameters[i];
			}

		}
		else
		{
			this._customParameters 	= new Object();
			this._locale 			= null;
			this._authID			= null;
		}
	},
	
	/**
	 * Sets custom URL parameters.
	 * @param {Map} parameters map of custom URL parameters
	 * (map of string to string)
	 */
	setCustomParameters : function( parameters )
	{
		this._customParameters = parameters;
	},

	/**
	 * Returns the locale string or null if none has been set.
	 * @return {String} locale string
	 */
	getAuthId : function()
	{
		return this._authID;
	},
	
	/**
	 * Sets the authID string.
	 * @param {String} authID string
	 */
	setAuthId : function( authID )
	{
		this._authID = authID;
	},
	
	/**
	 * Returns the locale string or null if none has been set.
	 * @return {String} locale string
	 */
	getLocale : function()
	{
		return this._locale;
	},
	
	/**
	 * Sets the locale string.
	 * @param {String} locale string or null for default
	 */
	setLocale : function( locale )
	{
		this._assertString(locale, "locale");
		this._locale = locale;
	},

	/**
	 * Returns the default URL for this request
	 */
	getDefaultURL : function( )
	{
		return this._url;
	},
	
	/**
	 * Default URL used to connect to the backend
	 */
	setDefaultURL : function( url )
	{
		this._url = url;
	},
	
	/**
	 * Returns the custom URL parameters.
	 * @return {String} custom URL parameters map
	 */
	__getCustomParameters : function()
	{
		return this._customParameters;
	},
	
	/**
	 * get jession id from bootstrap call of /jsapi 
	 * if user disable the cookie, in the backend, <jsp:rewrite> tag would
	 * rewrite url to append jsessionid. so in front end, we need to retrive
	 * it to relay the url rewriting
	 * 
	 * @private
	 * @type string
	 * @returns jessionid from url
	 */
	__getJsessionId : function( )
	{
		var jsessionid = null;
		// jsessionid is injected by server side
		if( actuate.common.web.jsessionId &&  actuate.common.web.jsessionId != "null"  )
		{	
			jsessionid = actuate.common.web.jsessionId;
		}
		return jsessionid;
	},
	
	/**
	 * Returns the attributes as a map.
	 * @return {Map} attributes map
	 */
	__toMap : function( )
	{
		var map = new Object( );
		
		// copy the custom parameters
		for ( var i in this._customParameters )
		{
			if( i != "jsessionid" )
			{
				map[i] = this._customParameters[i];
			}
		}
		
		if ( this._locale != null )
		{
			map.locale = this._locale;
		}
		
		return map;
	},
	
	/**
	 * Asserts that the given argument is a string, if not null.
	 * @param {Object} arg argument object
	 * @param {String} argName argument name
	 * @throws exception string if the argument is not a string
	 */
	_assertString : function( arg, argName )
	{
		if ( arg && typeof(arg) != "string" )
		{
			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_USAGE, "Argument \"" + argName + "\" must be a string.");
		}
	},
	
	/**
	 * Returns a string representation of this request options
	 * instance.
	 * @return {String} string
	 * @visibility default
	 */
	toString : function()
	{
		var message = "RequestOptions: ";
		return message;
	}
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.core");

/**
 * Construct a new Content class
 * 
 */
actuate.common.web.core.ContentHelper = actuate.common.web.Class.create();
actuate.common.web.core.ContentHelper.prototype = 
{
		_config			: null,
		_ajaxServlet 	: "ajax",
		_progressBar	: null,
		
		initialize : function( config )
		{
	    	if ( this.__extending )
				return;
	    	
			this._config = config;
			
			var progressConfig =
			{
				msg 		: "",
				id			: null,
				dlgConfig 	: [ ]
			};
			
			this._progressBar = new actuate.common.web.widget.dialog.ProgressDialog( progressConfig.id, "" , progressConfig.msg, progressConfig.dlgConfig );
		},
		
	    /**
	     * Construct a request structure data to send to ajax servlet
	     * @param operation
	     * @param requestData
	     * @param resultDef
	     * @returns {json}
	     */ 
	    getRequestData : function(operation, requestData, resultDef)
	    {
	        var requestString = actuate.common.web.$.toJSON(requestData);
	        var ret = {
	            "operation" : operation,
	            "data" 		: requestString,
	            "locale"	: this.getRequestOptions( ).getLocale( ),
	            "resultDef"	: actuate.common.web.$.toJSON(resultDef)
	        };

	        return ret;
	    },
	    
	    _contentSendRequestCB : function( )
	    {
	    	this._progressBar.close( );
	    	
			var args = [];
			// the first arg is the callback function
		    for( var i = 1; i < arguments.length; i++ )
		    {
		    	args.push( arguments[i] );
		    }
		    
		    if ( arguments[0] )
		    {	
		    	arguments[0].apply( this, args );
		    }
	    },
	    
	    /**
	     * Sends an ajax request to be processed
	     * @param data data to send to the backend
	     * @param successCB callback function for successful condition
	     * @param errorCB callback function for error condition
	     */
	    sendRequest : function( data, successCB, errorCB, progressConfig )
	    {
	    	var request 		= this.getRequestOptions( );

	    	var msg = "";
	    	if ( progressConfig && progressConfig.msg )
    		{
	    		msg = progressConfig.msg;
    		}
	    	this._progressBar.render( msg );
	    	
	    	var _successCB 	= actuate.common.web.Method.bind2( this._contentSendRequestCB, this, successCB );
	    	var _errorCB 	= actuate.common.web.Method.bind2( this._contentSendRequestCB, this, errorCB );
	    	
	        var ajax = new actuate.common.web.core.Request( data, _successCB, _errorCB );
	        ajax.setURL( this._getAjaxURL( request ) );

	        // send ajax request to the backend
	        ajax.sendMsg();
	    },
	    
	    /**
	     * Super class should implement this
	     * @param {function} cb callback function to invoke on successful download
	     */
	    download : function( cb )
	    {
	    	// NOOP
	    },
	    
	    /**
	     * Returns the default request options
	     * @returns {actuate.common.web.RequestOptions}
	     */
	    getRequestOptions : function( )
	    {
	    	return this._config.requestOptions;
	    },
	    
	    /**
	     * Returns the ajax servlet used
	     * @param {actuate.common.web.RequestOptions} requestOptions
	     * @returns {string}
	     */
	    _getAjaxURL : function( requestOptions )
	    {
	    	var url = requestOptions.getDefaultURL( );
	    	
			var indexSlash = url.lastIndexOf( '/' );
			if ( indexSlash !== ( url.length - 1 ) )
			{
				url = url + "/";
			}
			
			var ajaxServletPath = this.getAjaxServletPath( );
			url += ajaxServletPath + "?" + actuate.common.web.Version.getVersionParam( );
			 
			return url;
	    },
	    
	    /**
	     * If ajax is not the default servlet that handles this ajax request, then this 
	     * needs to be overridden.
	     */
	    getAjaxServletPath : function( )
	    {
	    	return "ajax";
	    }
};// Create actuate namespace object
actuate.common.web.Package.define("actuate.common.web.core");

actuate.common.web.core.Request = actuate.common.web.Class.create( );
actuate.common.web.core.Request.prototype =
{
	// Default attributes for this ajax request	
	_defaults : {
				url			: 'ajax',
				cache 		: false,
				type 		: 'post',
				traditional	: true,
				dataType 	: 'json',
				async		: true,
				data		: {},
				contentType	: "application/x-www-form-urlencoded; charset=UTF-8",
				dataType	: "json"
	},

	/**
	 * the message to send to the backend 
	 */
	_requestData 	: null,
	
	/**
	 * a success call back function to be called when the request/response is successful
	 */
	_successCB		: null,
	
	/**
	 * an error call back function to be called when the request failed.
	 */
	_errorCB		: null,
	
	/**
	 * Custom url used instead of default
	 */
	_url			: null,
	
	/**
	 * Session time out handler
	 */
	_timeOutHandler : null,
	
	/**
	 * Construct a new Ajax object to send an ajax request to the backend.
	 * @param requestData the message data in json format to be sent to the backend
	 * @param successCB the callback function to be called on a successful response.<br/>
	 * 			The single argument passed to this callback is the json response sent by the server
	 * @param errorCB the callback function to be call on an error response. </br>
	 * 			The single argument passed to this callback is the json response sent by the server.
	 * @param timeOutHandler callback function to be called an session time out occurred.
	 */
	initialize : function( requestData, successCB, errorCB )
	{
		this._requestData 	   = requestData;
		this._successCB		   = successCB;
		this._errorCB		   = errorCB;
	},
	
	setURL : function( url )
	{
		this._url = url;
	},
	
	/**
	 * The actual data sent to the backend should be stored in data attributes of options
	 * Here are the default options used:
	 * <ul>
	 * 	<li>url			: 'ajax'</li>
	 * 	<li>cache 		: false</li>
	 * 	<li>type 		: 'post'</li>
	 * 	<li>traditional	: true</li>
	 * 	<li>dataType 	: 'json'</li>
	 * 	<li>async		: true</li>
	 * 	<li>data		: {}</li>
	 * 	<li>success		: this.success</li>
	 * 	<li>error		: this.error</li>
	 * 	<li>complete	: this.complete</li>
	 * 	<li>contentType	: "application/x-www-form-urlencoded; charset=UTF-8"</li>
	 * 	<li>dataType	: "json"</li>
	 * </ul>
	 * 
	 * In most cases, only "data" attribute in options is updated as this data contains the actual request
	 * message sent to the backend.  The value of "data" is the json object passed by the caller during instantiation.
	 */
	sendMsg : function( )
	{
		// Prepare the default ajax handler
		this._defaults.success	= actuate.common.web.Method.bind( this.success, this );
		this._defaults.error	= actuate.common.web.Method.bind( this.error, this );
		this._defaults.complete	= actuate.common.web.Method.bind( this.complete, this );

		// use custom url if supplied
		if ( this._url )
		{
			this._defaults.url = this._url;
		}
		
		// prepare the request data
		var dataValue = {data:this._requestData};
		
		// Call the ajax jQuery plugin
		actuate.common.web.plugin.Ajax.sendMsg( this._defaults, dataValue );
	},
	
	/**
	 * if the response is successful, this method is called to further process the response from the backend.
	 * By default, this method calls the success callback function of the consumer if supplied.
	 * @param response
	 * @param textStatus
	 * @param jqXHR
	 */
	success : function( response, textStatus, jqXHR )
	{
		if ( !response )
		{
			this.error( jqXHR, "Unknown Exception", "Unknown Exception" );
			return;
		}
		// There was an operation exception occurred in java backend.
		// Hence, the request failed so call the error handler of the caller if necessary
		if ( response && response.exception )
		{
		    var e = this._createWebException( response.exception );
            this._errorCB( e );
            return;
		}

		if ( this._successCB )
		{
			this._successCB( response );
		}	
	},

	/**
	 * if the response is an unknown error, this method is called to further process the error response from the backend.
	 * By default, this method calls the error callback function of the consumer if supplied.
	 * @param jqXHR
	 * @param textStatus
	 * @param errorThrown
	 */
	error : function( jqXHR, textStatus, errorThrown )
	{
		var errType 	= actuate.common.web.Exception.ERR_CLIENT;
		var errMsg 		= textStatus;
		var errDetail 	= errorThrown;
		var errCode 	= jqXHR.status;
		
		var e = new actuate.common.web.Exception( errType, errMsg, errDetail, errCode );

		if ( this._errorCB )
		{
			this._errorCB( e );
			return;
		}
		
		throw e;	
	},

	/**
	 * Currently, this method does nothing.
	 */
	complete : function( )
	{
		// NOOP
	},
	
	_createWebException : function( serverException )
	{
		var e = new actuate.common.web.Exception( serverException.type, serverException.msg, serverException.detail, serverException.code, serverException.params );
		return e;
	}
};
// Create actuate namespace object
actuate.common.web.Package.define("actuate.common.web.plugin");

(function($) {

    actuate.common.web.plugin.Ajax = 
	{
		sendMsg : function( defaults, options )
		{
			var settings = $.extend( {}, defaults, options );
			
			// call the jQuery ajax mechanism with the customized options
			$.ajax({
				type 		: settings.type,
				async 		: settings.async,
				cache 		: settings.cache,
				timeout 	: settings.timeout,
				url 		: settings.url,
				data 		: settings.data,
				contentType	: settings.contentType,
				dataType	: settings.dataType,
				success		: settings.success,
				complete	: settings.complete,
				error		: settings.error
			});
		}
	};
})(actuate.common.web.jQuery);/*!
 * jQuery UI Autocomplete 1.8.22
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete#theming
 */

/*
 * jQuery UI Menu 1.8.22
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu#theming
 */


(function( $ ) {
        $.widget( "ui.combobox", {
            _create: function() {
                var input,
                    self = this,
                    select = this.element.hide(),
                    selected = select.children( ":selected" ),
                    value = selected.val() ? selected.text() : "",
                    wrapper = this.wrapper = $( "<span>" )
                        .addClass( "ui-combobox" )
                        .insertAfter( select );

                input = $( "<input>" )
                    .appendTo( wrapper )
                    .val( value )
                    .addClass( "ui-state-default ui-combobox-input" )
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: function( request, response ) {
                            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                            response( select.children( "option" ).map(function() {
                                var text = $( this ).text();
                                if ( this.value && ( !request.term || matcher.test(text) ) )
                                    return {
                                        label: text.replace(
                                            new RegExp(
                                                "(?![^&;]+;)(?!<[^<>]*)(" +
                                                $.ui.autocomplete.escapeRegex(request.term) +
                                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                            ), "<strong>$1</strong>" ),
                                        value: text,
                                        option: this
                                    };
                            }) );
                        },
                        select: function( event, ui ) {
                            ui.item.option.selected = true;
                            self._trigger( "selected", event, {
                                item: ui.item.option
                            });
                        },
                        change: function( event, ui ) {
                            if ( !ui.item ) {
                                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                                    valid = false;
                                select.children( "option" ).each(function() {
                                    if ( $( this ).text().match( matcher ) ) {
                                        this.selected = valid = true;
                                        return false;
                                    }
                                });
                                if ( !valid ) {
                                    // remove invalid value, as it didn't match anything
                                    $( this ).val( "" );
                                    select.val( "" );
                                    input.data( "autocomplete" ).term = "";
                                    return false;
                                }
                            }
                        }
                    })
                    .addClass( "ui-widget ui-widget-content ui-corner-left" );

                input.data( "autocomplete" )._renderItem = function( ul, item ) {
                    return $( "<li></li>" )
                        .data( "item.autocomplete", item )
                        .append( "<a>" + item.label + "</a>" )
                        .appendTo( ul );
                };

                $( "<a>" )
                    .attr( "tabIndex", -1 )
                    .attr( "title", "Show All Items" )
                    .appendTo( wrapper )
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass( "ui-corner-all" )
                    .addClass( "ui-corner-right ui-combobox-toggle" )
                    .click(function() {
                        // close if already visible
                        if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                            input.autocomplete( "close" );
                            return;
                        }

                        // work around a bug (likely same cause as #5265)
                        $( this ).blur();

                        // pass empty string as value to search for, displaying all results
                        input.autocomplete( "search", "" );
                        input.focus();
                    });
            },

            destroy: function() {
                this.wrapper.remove();
                this.element.show();
                $.Widget.prototype.destroy.call( this );
            }
        });
    })( actuate.common.web.jQuery );
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.resource" );

/**
 * @class The static class Module is used to handle modules. The method
 * actuate.resource.module.define() must be used within ModuleDefinition files to
 * define their modules. The module name given must be the exact name that the
 * loader will use.
 * @static
 */
actuate.common.web.resource.module =
{
	/**
	 * Maintain list of module loaders
	 * @type {Object}
	 */
	modules : new Object( ),
	
	/**
	 * 
	 * @param moduleName
	 *            module name, must be the same than the name to be used in the
	 *            ModuleDefinitionLoader.
	 * @param moduleDefinition
	 *            map redefining the private attributes of the ModuleDefinition
	 *            class.
	 * @return instance of ModuleDefinition extended by the given
	 *         moduleDefinition, where the given attributes overwrite the
	 *         default ones.
	 */
	define : function( moduleName, moduleDefinition )
	{
//		console.log("module.define");
		if ( this.modules[moduleName] )
		{
			throw new actuate.common.web.Exception(actuate.common.web.Exception.ERR_CLIENT, "Module \"" + moduleName + "\" already defined");
		}

		actuate.common.web.Package.define( moduleName );
		return this.modules[moduleName] = actuate.common.web.Class.extend(
				new actuate.common.web.resource.ModuleLoader( moduleName ),
				moduleDefinition );
	},

 	/**
 	 * Specifies the name of an API module to load on demand.
 	 * The available module names are the following:
 	 * <dl>
 	 * 		<li>"dataservice": provides the actuate.dataService package and actuate.Dataservice class.</li>
 	 * 		<li>"viewer": provides the actuate.viewer package and actuate.Viewer class.</li>
 	 * 		<li>"parameter": provides the actuate.parameter package and the actuate.Parameter.</li>
 	 * </dl>
 	 * @param {String} moduleName module name to import
 	 * 
 	 * @see actuate.initialize()
 	 */
 	require : function( moduleNames, callback, errorCallback, baseUrl, requestOptions )
 	{  		
 		// var utility = actuate.common.web.util.Utility;  // NOTE: not used
 	    
 		if( moduleNames && moduleNames.length > 0 )
 		{	
			// prevent repeated loading of any module
//			moduleNames = utility.arrayUnique( moduleNames );
			
 			var resourceLoader = new actuate.common.web.resource.ResourceLoader(
 			       baseUrl || actuate.common.web.Loader.getDefaultBaseUrl( ),
 					requestOptions ||actuate.common.web.Loader.getDefaultRequestOptions( ),
 					moduleNames
 					);
 			resourceLoader.setOnLoad( callback );
 			resourceLoader.setOnError( errorCallback );
 			resourceLoader.load( );
 		}
 	},

	/**
	 * Returns the ID of the DOM resources container associated with the given
	 * module name.
	 * 
	 * @param moduleName
	 *            module name
	 * @return resource container ID
	 */
	getResourcesContainerId : function( moduleName )
	{
		moduleName += ".resourcesContainer";
		return moduleName.replace( /\./g, "_" );
	}
};

/**
 * @class Base class for defining module definitions.
 */
actuate.common.web.resource.ModuleLoader = actuate.common.web.Class.create( );
actuate.common.web.resource.ModuleLoader.prototype =
{	
	/**
	 * Whether module has been loaded 
	 */
	loaded : false,
	
	/**
	 * Whether module loading has been issued 
	 */
	_loading : false,

	/**
     * license check flag
     */		
	_licenseFailure :false,
	
	/**
     * Session timeout check flag
     */		
	_sessionTimeout :false,	
	
	/**
	 * Module name.
	 */
	_moduleName :null,

	/**
	 * Array of module names on which this module depends.
	 */
	_moduleDependencies :null,

	/**
	 * Base path for the packages.
	 */
	_jsPath :null,

	/**
	 * Array of classes (JS files) to load.
	 */
	_jsFiles :null,

	/**
	 * Array of CSS files to load.
	 */
	_cssFiles : null,

	/**
	 * style sheet file path
	 */
	_cssPath : null,

	/**
	 * Defines the URI from where to fetch the resources, relative to the
	 * service URL used for resource loading.
	 */
	_htmlResourcesUri :null,

	/**
	 * List of classes to publish using facades. The facades only include the
	 * public methods. Key: name of the published class (facade). Value: name of
	 * the class to publish.
	 * 
	 * Note: only export classes that the end-user will need to instantiate.
	 */
	_publicClasses :null,

	/**
	 * Handler called after the HTML resources have been created.
	 */
	_onAfterHtmlResourcesLoaded : null,

	/**
	 * Handler called after the module parts loading has finished.
	 */
	_onLoad : null,
	
	/**
	 * Flag to check if js package resources loading finished.
	 * @type boolean
	 */
	_packageLoaded: false,
	
	/**
	 * Flag to check if html resources loading finished.
	 * @type boolean
	 */
	_htmlLoaded : true,
	
	/**
	 * Flag to check whether localized string loading finished.
	 * @type boolean
	 */
	_localizedStringLoaded : false,

	/**
	 * Module html resource container instance
	 * @type Object
	 */
	_container : null,
	
	/**
	 * Initializes the module definition.
	 * @param moduleName
	 *            module name
	 */
	initialize : function( moduleName )
	{
		this._moduleName = moduleName;
		this._exceptionClosure = actuate.common.web.Method.bind( this._exception, this );
	},

	/**
	 * Returns the module name.
	 * 
	 * @return module name
	 */
	getModuleName : function()
	{
		return this._moduleName;
	},

	/**
	 * Returns the module dependencies.
	 * 
	 * @return array of module names
	 */
	getModuleDependencies : function()
	{
		return this._moduleDependencies;
	},

	/**
	 * Loads the module's resources.
	 * 
	 * @param callback
	 *            callback
	 */
	load : function( baseUrl, requestOptions, errorCallback )
	{
//		actuate.common.web.util.Logging.log("enter ModoleLoader.load: baseUrl=" + baseUrl);
		var that = this;		
		this._exceptionHandler = errorCallback;
		this._baseUrl = actuate.common.web.util.Utility.makeAbsoluteUrl( baseUrl );

		this._requestOptions = requestOptions;

		// Already loaded or loading has been issued.
		if( this.loaded || this._loading )
		{
			return;
		}
		
		actuate.common.web.util.Logging.log( "loading..." + baseUrl );
		// Issue loading
		this._loading = true;

		if( this._localizedString )
        {
            this._loadLocalizedString( function( ) {actuate.common.web.util.Logging.log( "localized resource is now loaded..." );that._localizedStringLoaded = true;} );
        }
        else
        {
        	actuate.common.web.util.Logging.log( "localize string is not set..." );
            this._localizedStringLoaded = true;
        }
		
		//css files
		if( this._cssFiles != null && this._cssFiles.length > 0 )
		{
			this._loadCss( this._cssPath, this._cssFiles );
		}
		
		//js files
		if( this._jsFiles && this._jsFiles.length > 0 )
		{
			this._loadScripts( function( ) {that._packageLoaded = true;} );
		}
		else
		{
			this._packageLoaded = true;
		}
		
		this.timerInterval = window.setInterval(
				function( ) { that._rendezvous( ); },
				10
				);
	},

	/**
	 * Called whenever the resources loading is finished.
	 */
	_rendezvous : function( ) 
	{ 
		// if the license check failed
		// don't load resource, directly return
		if( this._licenseFailure == true || this._sessionTimeout == true )
		{
			clearInterval( this.timerInterval ); 
			this._loading = false;
			return;
		}
		
		if( this._packageLoaded == true && this._localizedStringLoaded == true )
		{			
			clearInterval( this.timerInterval ); 
			this._loading = false;

			actuate.common.web.util.Logging.log( "All resources are loaded..." );
			
			// add onLoad handler in the chain
			if( this._onLoad )
			{
				this._onLoad( );
			}

			// Finish loading module
			this.loaded = true;
		}
	},
	

	/**
	 * Loads the (mobile) style sheets for the current module.
	 * @param{String} css path
	 * @param{Array} css files
	 */
	_loadCss : function( path, files )
	{
		if( path && path.charAt( path.length - 1 ) != "/" )
		{
			path += "/";
		}
		
		for( var i = 0; i < files.length; i++ )
		{
			actuate.common.web.util.Style.addExternalStyleSheet(
					this._baseUrl + path + files[i] );
		}
	},
	
	/**
     * Loads the style sheets for the current module.
     * @param {Function} callback
     */
    _loadLocalizedString : function( callback )
    {
        var locale = this._requestOptions.getLocale( );
        if( !locale )
        {
            locale = this._requestOptions._customParameters["__locale"];
        }
        var servlet = this._localizedStringServlet;
        var url = servlet;
        if( this._requestOptions && this._requestOptions.__getJsessionId( ) )
        {
            url += ";" + "jsessionid=" + this._requestOptions.__getJsessionId( );         
        }
       // url += "?__localizedstrings=module::module.System";
        url += "?__localizedstrings=module::" + this._moduleName
            + "&__locale=" + ( locale? locale : "" );
        actuate.common.web.resource.Script.loadScripts( this._baseUrl,
                url, callback );
    },


	/**
	 * Loads the given script URLs. If an error occured while loading one of the
	 * scripts, throws an exception.
	 * @param {Function} callback
	 */
	_loadScripts : function( callback )
	{
//		console.log("enter Module._loadScripts: ");
		var fileList = new Array( );
		for( var i = 0; i < this._jsFiles.length; i++ )
		{
			fileList.push( this._jsFiles[i] );
		}

		var baseUrl = this._baseUrl + ( this._jsPath && this._jsPath!=""? this._jsPath +"/" : "" );
		var me = this;
		actuate.common.web.resource.Script.loadScripts(
				baseUrl,
				fileList,
				function __cb_loadScripts( loader )
				{
					var failedUrls = loader.failedUrls;
					if ( failedUrls && failedUrls.length > 0 )
					{
						me._throwFailedUrls( failedUrls );
					}
					else
					{
						callback( );
					}
				}

		);
	},

	/**
	 * Throws an exception containing the given failed urls.
	 * 
	 * @param failedUrls
	 *            urls which failed loading
	 */
	_throwFailedUrls : function _throwFailedUrls( failedUrls )
	{	
		var message = "Failed to load the following files:";
		for ( var i = 0; i < failedUrls.length; i++ )
		{
			message += "\n" + failedUrls[i];
		}

		this._exception( new actuate.common.web.Exception( failedUrls, actuate.common.web.Exception.ERR_CLIENT, message ) );
	},

	/**
	 * Internal handler which is called whenever an exception occured in one of
	 * the callbacks. Will call _error() with a null url and with the exception
	 * instead of the message argument.
	 * 
	 * @param e
	 *            exception.
	 */
	_exception : function( e )
	{
		e = actuate.common.web.util.Utility.createException(e);
		// if status code is 555, which means this is a license failure exception
		if( e.getErrCode( ) == 555 )
		{
			this._licenseFailure = true;
		}
		else if( e.getErrCode( ) == 556 )
		//Session Timeout
		{
			this._sessionTimeout = true;	
		}
		
		if ( this._exceptionHandler )
		{
			this._exceptionHandler( e );
		}
		else
		{
			throw e;
		}
	}
};/******************************************************************************
 *	Copyright (c) 2012 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.resource" );

/**
 * @class Resource loader for loading global IV resources into a given document.
 *
 * Before the resource loader can be used, the following classes must already
 * be available:
 * - actuate.resource.module
 * - actuate.util.Utility
 * These are loaded by the Actuate class before calling the ResourceLoader.  
 * 
 * The resource loading sequence is the following:
 * <ul>
 * <li>authenticate using the actuate.util.SecurityManager</li>
 * <li>load the module definitions in the module names given in the constructor
 * (requested modules)</li>
 * <li>load the module definitions from the dependencies</li>
 * <li>create a module loading order based on all the loaded definitions and
 * their dependencies.</li>
 * <li>process each module in the ordered list:
 * 		<ul>
 * 		<li>call the module definition's onBeforeLoad handler, if any</li>
 * 		<li>load the packages (JavaScript files) of the current module, if
 * any</li>
 * 		<li>call the module definition's onAfterPackagesLoaded handler, if
 * any</li>
 * 		<li>load the CSS resources, if any</li>
 * 		<li>load the HTML resources into the resource container, if any</li>
 * 		<li>call the module definition's onAfterHtmlResourcesLoaded handler, if
 * any</li>
 * 		<li>instantiate the HTML resources' objects, if any, using the
 * ResourceFactory</li>
 * 		<li>call the module definition's onAfterResourcesObjectsCreated handler, if
 * any</li>
 * 		<li>export the public classes using facades, if any</li>
 * 		<li>mark the module as loaded</li>
 * 		<li>call the module definition's onLoad handler, if
 * any</li>
 * 		<li>go on with the next module, if any, else exit loop</li>
 * </li>
 * <li>call the event handler set using ResourceLoader.setOnLoad()</li>
 * </ul>
 * In case of exception happening in the sequence, the event handler
 * defined with setOnError() will be called.
 */
actuate.common.web.resource.ResourceLoader = actuate.common.web.Class.create( );
actuate.common.web.resource.ResourceLoader.prototype =
{
	/**
	 * Callback function. Called after the ResourceLoader has finished
	 * loading all the resources.
	 */
	_onLoad : null,
	
	/**
	 * Callback function. Called whenever an error occurs during
	 * resource loading. The callback function takes the following
	 * parameters:
	 * @param url URL url of the resource which failed, or null
	 * @param message error message
	 */		
	_onError : null,

	/**
	 *  Server base URL.  
	 */
	_baseUrl : null,
	
	/**
	 * Instance of actuate.RequestOptions or null.
	 */		
	_requestOptions : null,
	
	/**
	 * Closure for the handler function which is called whenever
	 * an exception occurs.
	 */
	_exceptionClosure : null,
	
	/**
	 * Array of module names requested to load.
	 */
	_requestedModuleNames : null,
	
	/**
	 * Array of feature names requested to load.
	 */
	_requestedFeatures : null,
		
	/**
	 * Constructor of the ResourceLoader.
	 * @param iportalUrl server base URL from where to load the global
	 * resources.
	 * @param requestOptions instance of actuate.RequestOptions or null
	 * @param requestedModuleNames array of module names to load
	 */
	initialize : function( baseUrl, requestOptions, requestedModuleNames, requestedFeatures )
	{
		this._baseUrl = baseUrl;
		this._requestOptions = requestOptions;
		this._onLoad = null;
		this._onError = null;
		
		this._requestedModuleNames = requestedModuleNames;
		this._requestedFeatures = requestedFeatures;
		this._exceptionClosure = actuate.common.web.Method.bind( this._exception, this );
		 
	},
	
	/**
	 * Sets the handler to be called after all resources
	 * have been successfully loaded.
	 * @param onLoad handler function
	 */
	setOnLoad : function( onLoad )
	{
		this._onLoad = onLoad;
	},

	/**
	 * Sets the handler to be called whenever an error occurs during
	 * resource loading.
	 * @param onError handler function
	 */
	setOnError : function( onError )
	{
		this._onError = onError;
	},


	/**
	 * Starts the resource loading process,
	 * then calls the user's onload event handler.
	 */
	load : function( )
	{
		if ( this._requestedModuleNames )
		{
			for( var i = 0; i < this._requestedModuleNames.length; i++ )
			{
				var moduleLoader = actuate.common.web.resource.module.modules[this._requestedModuleNames[i]];
				moduleLoader.load(
						this._baseUrl,
						this._requestOptions,
						this._exceptionClosure 
						);
			}
		}
		
		var that = this;
		this.timerInterval = window.setInterval(
				function( )
				{
					that._rendezvous( );
				},
				10
				);	
	},

	/**
	 * Rendezvous point for multiple modules.
	 */
	_rendezvous : function( )
	{
		for( var i = 0; i < this._requestedModuleNames.length; i++ )
		{
			var moduleLoader = actuate.common.web.resource.module.modules[this._requestedModuleNames[i]];
			if ( !moduleLoader.loaded )
			{
				return;
			}
		}
		
		clearInterval( this.timerInterval ); 					
		if ( this._onLoad )
		{
			window.setTimeout( this._onLoad, 0 );
		}
	},

	/**
	 * Internal handler which is called whenever an exception occured
	 * in one of the callbacks.
	 * Will call _error() with a null url and with the exception
	 * instead of the message argument.
	 * @param e exception.
	 */
	_exception : function( e )
	{
		e = actuate.common.web.util.Utility.createException( e );	
		
		if ( this._onError )
		{				
			// if callback returns true, go on loading				
			return this._onError( e );
		}			
		else
		{
			throw e;
		}
	}		
};
/*******************************************************************************
 * Copyright (c) 2007 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.resource");

/**
 * @class Base class for the script loader. Note that the loading of external
 *        script is done by inserting a SCRIPT tag into the HEAD tag of the
 *        current document. After finished loading, the onLoad event handler
 *        will be called.
 */
actuate.common.web.resource.ScriptLoader = actuate.common.web.Class.create();
actuate.common.web.resource.ScriptLoader.prototype = {
	/**
	 * Dom element refers to html header.
	 * 
	 * @type {Object}
	 */
	_headElement : null,

	/**
	 * Callback on load success.
	 * 
	 * @type {Function}
	 */
	onLoad : null,

	/**
	 * Callback on load error.
	 * 
	 * @type {Function}
	 */
	onError : null,

	/**
	 * Script base path.
	 * 
	 * @type {String}
	 */
	basePath : null,

	/**
	 * Array holding resource urls
	 * 
	 * @type {Array}
	 */
	_urlList : null,

	/**
	 * URL currently working on
	 * 
	 * @type {String}
	 */
	_currentUrl : null,

	/**
	 * Generated closures.
	 * 
	 * @type {Function}
	 */
	_loadedClosure : null,
	_errorClosure : null,
	_finishClosure : null,

	/**
	 * Content charset
	 * 
	 * @type {String}
	 */
	_charset : "utf-8",

	/**
	 * Flag whether clean up the script tag
	 * 
	 * @type {boolean}
	 */
	_cleanUpScripts : true,

	/**
	 * Array that holding created script tags
	 * 
	 * @{Array}
	 */
	_scriptTagsList : null,

	/**
	 * Array that holding failed URLs
	 * 
	 * @{Array}
	 */
	failedUrls : null,

	/**
	 * Busy flag
	 * 
	 * @{boolean}
	 */
	_busy : false,

	/**
	 * Initializes the script loaded with a given document.
	 */
	initialize : function() {
		this._headElement = document.getElementsByTagName("head")[0];
		this._loadedClosure = actuate.common.web.Method.bindAsEventListener(
				this._loaded, this);
		this._errorClosure = actuate.common.web.Method.bindAsEventListener(
				this._error, this);
		this._finishClosure = actuate.common.web.Method.bindAsEventListener(
				this._finish, this);
		this.failedUrls = new Array();
		this._scriptTagsList = new Array();
		this._busy = false;
		this._urlList = new Array();
	},

	/**
	 * Loads a list of script URLs by calling this._loadScript().
	 * 
	 * @param urlList
	 *            list of script URLs
	 */
	loadScripts : function(urlList) {
//		console.log("Script.loadScripts: " + urlList);
		this._urlList = this._urlList.concat(urlList);

		// already in progress?
		if (this._busy) {
			return;
		}

		this._busy = true;
		this._next();
	},

	/**
	 * Load next script using this._loadScript(), or calls this._finish() if
	 * there is no more script to load.
	 */
	_next : function() {

		if (this._urlList.length > 0) {
			var url = this._urlList.shift();
			if (this.basePath && this.basePath != "") {
				url = this.basePath + url;
			}

			url = actuate.common.web.util.Utility.makeAbsoluteUrl(url);

			this._currentUrl = url;
			if( url.indexOf('?') > -1 ) {
				this._loadScript(url + "&" + actuate.common.web.Version.getVersionParam( ));
				 
				}
				else {
					this._loadScript(url + "?" + actuate.common.web.Version.getVersionParam( ) );
				}
			
		} else {
			self.setTimeout(this._finishClosure, 0);
		}
	},

	/**
	 * Finalize the loading by cleaning up the script tags, then calls
	 * _callOnLoad().
	 */
	_finish : function() {
		if (this._cleanUpScripts) {
			while (this._scriptTagsList.length > 0) {
				var script = this._scriptTagsList.pop();
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}
			}
		}

		this._urlList = null;
		this._busy = false;
		if (this.onLoad) {
			this.onLoad(this);
		}
	},

	/**
	 * Callback function called whenever an error occurred while loading a
	 * script. Calls the onError handler. If this handler returns true, goes on
	 * loading.
	 */
	_error : function(event) {
		this.failedUrls.unshift(this._currentUrl);
		var abort = false;
		if (this.onError) {
			abort = !this.onError(this._currentUrl);
		}

		if (!abort) {
			this._next();
		}
	}
};

/**
 * @class Generic script loader. It inserts all the given JavaScript files URLs
 *        into the HEAD part of the given document, then fires the onLoad event.
 */
actuate.common.web.resource.GenericScriptLoader = actuate.common.web.Class
		.create();
actuate.common.web.resource.GenericScriptLoader.prototype = actuate.common.web.Class
		.extend(new actuate.common.web.resource.ScriptLoader(),
		/** @lends actuate.common.web.resource.GenericScriptLoader.prototype */
		{
			_currentScript : null,

			/**
			 * Initializes the script loaded with a given document. will be used
			 * to insert SCRIPT tags.
			 */
			initialize : function() {
				actuate.common.web.resource.ScriptLoader.prototype.initialize
						.call(this);
			},

			/**
			 * Loads a given script URL by inserting a SCRIPT tag into the HEAD
			 * of the document specified in the constructor.
			 * 
			 * @param url
			 *            script URL
			 */
			_loadScript : function(url) {
				this._currentScript = document.createElement("script");
				this._currentScript.setAttribute("type", "text/javascript");
				this._currentScript.setAttribute("src", url);
				this._currentScript.setAttribute("charset", this._charset);
				 actuate.common.web.util.Event.observe( this._currentScript ,
				 "load", this._loadedClosure );
				 actuate.common.web.util.Event.observe( this._currentScript ,
				 "error", this._errorClosure );

				this._headElement.appendChild(this._currentScript);
				this._scriptTagsList.push(this._currentScript);
			},

			/**
			 * Deregister event handlers, then calls super._loaded().
			 * 
			 * @see ScriptLoader#_loaded()
			 */
			_loaded : function() {
				// deregister event handlers
				 actuate.common.web.util.Event.stopObserving(
				 this._currentScript , "load", this._loadedClosure );
				 actuate.common.web.util.Event.stopObserving(
				 this._currentScript , "error", this._errorClosure );
				 this._next( );
			}

		});

/**
 * @class Script loader for Microsoft Internet Explorer. It sequentially inserts
 *        all the given JavaScript files URLs into the HEAD part, one by one,
 *        and each time waits until the inserted SCRIPT has successfully been
 *        loaded. This is a workaround because Internet Explorer tends to load
 *        and execute all the given scripts at the same time, which can lead to
 *        dependency issues between the scripts.
 */
actuate.common.web.resource.IEScriptLoader = actuate.common.web.Class.create();
actuate.common.web.resource.IEScriptLoader.prototype = actuate.common.web.Class
		.extend(new actuate.common.web.resource.ScriptLoader(),
		/** @lends actuate.resource.IEScriptLoader.prototype */
		{
			_currentScript : null,

			/**
			 * Initializes the script loaded with a given document. will be used
			 * to insert SCRIPT tags.
			 */
			initialize : function() {
				actuate.common.web.resource.ScriptLoader.prototype.initialize
						.call(this);
			},

			/**
			 * Loads a given script URL by inserting a SCRIPT tag into the HEAD
			 * of the document specified in the constructor. Waits for the
			 * script to be loaded using the internal _callback method.
			 * 
			 * @param url
			 *            script URL
			 */
			_loadScript : function(url) {

				this._currentScript = document.createElement("script");
				this._currentScript.setAttribute("type", "text/javascript");
				this._currentScript.setAttribute("src", url);
				this._currentScript.setAttribute("charset", this._charset);
				actuate.common.web.util.Event.observe(this._currentScript,
						"readystatechange", this._loadedClosure);

				this._headElement.appendChild(this._currentScript);
				this._scriptTagsList.push(this._currentScript);
			},

			/**
			 * Waits that the current script (defined in this._currentScript)
			 * has finished loading, then calls the next script in this._urls.
			 * When all the scripts have been loaded, calls the onLoad event
			 * handler.
			 */
			_loaded : function() {
				// downloaded scripts finish with "loaded", and cached scripts
				// with "complete"
				if (this._currentScript.readyState == "complete"
						|| this._currentScript.readyState == "loaded") {
					actuate.common.web.util.Event.stopObserving(
							this._currentScript, "readystatechange",
							this._loadedClosure);
					this._next();
				}
			}
		});

/**
 * @class Utility class which makes it easy to use the script loader. It will
 *        select the proper script loader according to the current browser type.
 *        For Internet Explorer: uses IEScriptLoader. For other browsers: uses
 *        GenericScriptLoader.
 * @static
 */
actuate.common.web.resource.Script = {
	/**
	 * Returns an instance of ScriptLoader according to the current browser.
	 * 
	 * @return instance of IEScriptLoader if the current browser is Internet
	 *         Explorer, else returns an instance of GenericScriptLoader.
	 */
	_getScriptLoader : function() {
		var loader;
		if (navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
			loader = new actuate.common.web.resource.IEScriptLoader();
		} else {
			loader = new actuate.common.web.resource.GenericScriptLoader();
		}
		return loader;
	},

	/**
	 * Loads the given scripts sequencially.
	 * 
	 * @param basePath
	 *            base path to be used for the given URL, if relative
	 * @param urls
	 *            relative URLs to script files. The basePath will be prepended.
	 * @param callback
	 *            callback function which will be called after all the scripts
	 *            are loaded.
	 */
	loadScripts : function(basePath, urls, callback, errorCallback) {
		var scriptLoader = this._getScriptLoader();
		scriptLoader.onLoad = callback;
		if (errorCallback != null) {
			scriptLoader.onError = errorCallback;
		}
		scriptLoader.basePath = basePath;
		
		scriptLoader.loadScripts(urls);
	}
};
/* =============================================================
 * bootstrap-collapse.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */
  $.fn.collapse.acSetEventListeners = function( )
  {
		var off = function( $ )
		{
			$('body').off('click.ac.collapse.data-api');
		};
		  
		var on = function( $ )
		{
		    $('body').on('click.ac.collapse.data-api', '[data-toggle=collapse]', function (e) {
		      var $this = $(this), href
		        , target = $this.attr('data-target')
		          || e.preventDefault()
		          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
		        , option = $(target).data('collapse') ? 'toggle' : $this.data()
		      $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
		      $(target).collapse(option)
		    })
		  		          
		};
	  
		if ( $._acPrev$ )
		{
			off( $._acPrev$ );
		}
		
		on( $ );
  };

  $(function ()
  {
	  $.fn.collapse.acSetEventListeners( );
  })

}(actuate.common.web.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
        $this.focus()
      }

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider) a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    getParent($(toggle))
      .removeClass('open')
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */
  $.fn.dropdown.acSetEventListeners = function( )
  {
		var off = function( $ )
		{
			$('html').off('click.ac.dropdown.data-api');
			$('body').off('click.ac.dropdown');
			$('body').off('click.ac.dropdown.data-api');
			$('body').off('keydown.ac.dropdown.data-api');
		};
		  
		var on = function( $ )
		{
			$('html')
				.on('click.ac.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
			$('body')
				.on('click.ac.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
				.on('click.ac.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
				.on('keydown.ac.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)
		};
	  
		if ( $._acPrev$ )
		{
			off( $._acPrev$ );
		}
		
		on( $ );
  };

  $(function ()
  {
	  $.fn.dropdown.acSetEventListeners( );
  })

}(actuate.common.web.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('modal-open')

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)
            .focus()

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('modal-open')

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
        	//if it is video , disabled the keyup event.
        	if(e.currentTarget.innerHTML.indexOf("resources/video/iHub3_Highlevelview4_beta.mp4") > -1)
          	{
        		return false;
          	}
            e.which == 27 && that.hide();
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          if (this.options.backdrop != 'static') {
              //When clicked outside the dialog box, the dialog box disappears. Commented out the below line to prevent this.
          //  this.$backdrop.click($.proxy(this.hide, this))
          }

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */
  $.fn.modal.acSetEventListeners = function( )
  {
		var off = function( $ )
		{
			$('body').off('click.ac.modal.data-api');
		};
		  
		var on = function( $ )
		{
		    $('body').on('click.ac.modal.data-api', '[data-toggle="modal"]', function ( e ) {
		        var $this = $(this)
		          , href = $this.attr('href')
		          , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
		          , option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

		        e.preventDefault()

		        $target
		          .modal(option)
		          .one('hide', function () {
		            $this.focus()
		          })
		    }) 
		          
		};
	  
		if ( $._acPrev$ )
		{
			off( $._acPrev$ );
		}
		
		on( $ );
  };

  $(function ()
  {
	  $.fn.modal.acSetEventListeners( );
  })

}( actuate.common.web.jQuery );

/* ========================================================
 * bootstrap-tab.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */
  $.fn.tab.acSetEventListeners = function( )
  {
		var off = function( $ )
		{
			$('body').off('click.ac.tab.data-api');
		};
		  
		var on = function( $ )
		{
		    $('body').on('click.ac.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
		        e.preventDefault()
		        $(this).tab('show')
		      })
		          
		};
	  
		if ( $._acPrev$ )
		{
			off( $._acPrev$ );
		}
		
		on( $ );
  };

  $(function ()
  {
	  $.fn.tab.acSetEventListeners( );
  })

}(actuate.common.web.jQuery);

/******************************************************************************
 *	Copyright (c) 2004 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/
actuate.common.web.Package.define("actuate.common.web.util");
/**
 *	Actuate Event utility. Ported from prototype.
 */

actuate.common.web.util.Event =
{
	KEY_BACKSPACE	: 8,
	KEY_TAB			: 9,
	KEY_RETURN		: 13,
	KEY_ESC			: 27,
	KEY_LEFT		: 37,
	KEY_UP			: 38,
	KEY_RIGHT		: 39,
	KEY_DOWN		: 40,
	KEY_DELETE		: 46,

	observers : false,

	/**
	 * Get event source element
	 * @param {Event} event
	 * @return {Object}
	 */
	element : function( event )
	{
		var obj = event.target || event.srcElement;
		if( event.touches && event.touches.length ==1 )
		{
			obj = event.touches[0].target;
		}
		return obj;
	},
	
	/**
	 * Find designated element
	 * @param {Event} event 
	 * @param {String} class name
	 * @return {Object}
	 */
	findElement : function( event, className )
	{
		var element = event.target || event.srcElement;
		if( event.touches && event.touches.length ==1 )
		{
			element = event.touches[0].target;
		}
        while ( element && element.className != className )
        {
            element = element.parentNode;
        }
   		return element;
	},
	
	/**
	 * Check the mouse click button
	 * @param {Event} event 
	 * @return {boolean}
	 */
	isLeftClick : function( event )
	{
		if( event.touches )
		{
			return true;
		}
		return ( ( ( event.which ) && ( event.which == 1 ) ) ||
				( ( event.button ) && ( event.button == 1 ) ) );
	},

	/**
	 * Get mouse position
	 * @param {Event} event 
	 * @return {Array}
	 */
	pointer : function( event )
	{
		if( event.touches )
    	{
    		var touch = event.touches[0];
    		return {
				x: touch.pageX ,
				y: touch.pageY 
			};
		}
		var docElement = document.documentElement,
		body = document.body || { scrollLeft: 0, scrollTop: 0 };
		return {
			x: event.pageX || (event.clientX +
			  (docElement.scrollLeft || body.scrollLeft) -
			  (docElement.clientLeft || 0)),
			y: event.pageY || (event.clientY +
			  (docElement.scrollTop || body.scrollTop) -
			  (docElement.clientTop || 0))
		};
	},

	/**
	 * Get mouse position X
	 * @param {Event} event 
	 * @return {Integer}
	 */
	pointerX : function( event )
	{
	
		if( event.touches )
    	{
    		var touch = event.touches[0];
    		if( touch && touch.pageX )
    		{
	    		return touch.pageX;
    		}
		}
		return event.pageX || ( event.clientX +
				( document.documentElement.scrollLeft || document.body.scrollLeft ) );
	},

	/**
	 * Get mouse position Y
	 * @param {Event} event 
	 * @return {Integer}
	 */
	pointerY : function( event )
	{
		if( event.touches )
    	{
    		var touch = event.touches[0];
    		return touch.pageY;
		}
		return event.pageY || ( event.clientY +
				( document.documentElement.scrollTop || document.body.scrollTop ) );
	},

	/**
	 * Stop event propogation
	 * @param {Event} event 
	 */
	stop : function( event )
	{
		if( event.type == "touchstart" && event.touches && event.touches.length > 1 )
    	{
			return;
    	}
		if ( event.preventDefault )
		{
			event.preventDefault( );
			event.stopPropagation( );
		}
		else
		{
			event.returnValue = false;
			event.cancelBubble = true;
		}
	},

	/**
	 * Cache event observer to avoid memory leak.
	 * @param {Object} element
	 * @param {String} event name
	 * @param {Object} event handler
	 * @param {boolean} use capture or not
	 */
	_observeAndCache : function( element, name, observer, useCapture )
	{
		element = this.getDom( element ); 
		if( !this.observers )
		{
			this.observers = [];
		}

		if ( navigator )
		{
		    var ua = navigator.userAgent;
	
			if ( ua && ua.toLowerCase( ).indexOf( "msie" ) >= 0 )
			{
				this.stopObserving( element, name, observer );
			}
		}
		
		if( element.addEventListener )
		{
			this.observers.push( [element, name, observer, useCapture] );
			element.addEventListener( name, observer, useCapture );
		}
		else if( element.attachEvent )
		{
			this.observers.push( [element, name, observer, useCapture] );
			element.attachEvent( 'on' + name, observer );
		}
	},

	/**
	 * Unload all cached event observer.
	 * Hookup with window's unload event
	 */
	unloadCache : function( )
	{
		if( !actuate.common.web.util.Event.observers )
		{
			return;
		}

		for( var i = 0; i < actuate.common.web.util.Event.observers.length; i++ )
		{
			actuate.common.web.util.Event.stopObserving.apply( this, actuate.common.web.util.Event.observers[i] );
			actuate.common.web.util.Event.observers[i][0] = null;
		}
		actuate.common.web.util.Event.observers = false;
	},

	/**
	 * Observe event for designated element.
	 * @param {Object} element
	 * @param {String} event name
	 * @param {Object} event handler
	 * @param {boolean} use capture or not
	 */
	observe : function( element, name, observer, useCapture )
	{
		if( element )
		{
			element = this.getDom( element );
			useCapture = useCapture || false;
	

			this._observeAndCache( element, name, observer, useCapture );
		}
	},

	/**
	 * Stop observe event for designated element.
	 * @param {Object} element
	 * @param {String} event name
	 * @param {Object} event handler
	 * @param {boolean} use capture or not
	 */

        
	stopObserving:  function( element, name, observer, useCapture )
	{
		if( element )
		{
			useCapture = useCapture || false;
	
			if( element.removeEventListener )
			{
				element.removeEventListener( name, observer, useCapture );
			}
			else if( element.detachEvent )
			{
				element.detachEvent( 'on' + name, observer );
			}
		}
	},
	
	getDom: function( element )
	{
		if( !element || !document )
		{
			return null;
		}
		
		return element.dom ? element.dom :
			( typeof element == "string" ? document.getElementById( element) : element );
	}
	
};

/* prevent memory leaks in IE */
actuate.common.web.util.Event.observe( window, 'unload', actuate.common.web.util.Event.unloadCache, false );
/******************************************************************************
 *	Copyright (c) 2012 Actuate Corporation and others.
 *	All rights reserved. This program and the accompanying materials 
 *	are made available under the terms of the Eclipse Public License v1.0
 *	which accompanies this distribution, and is available at
 *		http://www.eclipse.org/legal/epl-v10.html
 *	
 *	Contributors:
 *		Actuate Corporation - Initial implementation.
 *****************************************************************************/
actuate.common.web.Package.define("actuate.common.web.util");

/**
 * By default logging is turned off. If it is on, the default logging is to log using the browser debug console.
 */
actuate.common.web.util.Logging =
{
		_CONSOLE_LOGGING: 'console',
		
		_isLoggingOn 	: false, // set it to true if you want to turn on logging by default.
		
		_loggingType	: null,
		
		log : function( msg )
		{
			if ( this._isLoggingOn )
			{	
				var logger = this._getLogger( );
				logger.log( msg );
			}
		},
		
		/**
		 * if isLogging is true, client side logging will be enabled.
		 * @param isLogging
		 */
		setLogging : function( isLogging )
		{
			this._isLoggingOn = isLogging;
		},
		
		/**
		 * Set the type of logging.  The following logging types are available:
		 * <ul>
		 * 	<li>console</li>
		 * </ul>
		 * @param type
		 */
		setLoggingType : function( type )
		{
			this._loggingType = type;
		},
		
		/**
		 * Returns the correct logger object.  if not logger is set, use console log by default.
		 * @returns {actuate.common.web.util.Logging.Console}
		 */
		_getLogger : function( )
		{
			if ( this._loggingType == this._CONSOLE_LOGGING || this._loggingType == null )
			{
				return new actuate.common.web.util.Logging.Console( );
			}
			
			return new actuate.common.web.util.Logging.Console( );
		}
};

actuate.common.web.util.Logging.Console = actuate.common.web.Class.create( );
actuate.common.web.util.Logging.Console.prototype = 
{
	log : function( msg )
	{
		try
		{
			if ( console )
			{
				var strings = actuate.common.web.$.toJSON( msg );
				console.log( strings );
			}
		}
		catch( err )
		{
			// NOOP
		}
	}
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.util" );

/**
 * @class Style utility.
 */
actuate.common.web.util.Style =
{
	/**
	 * Refer to document header element.
	 * @type {Object}
	 */
	_headElement : null,
	
	/**
	 * Adds a style sheet into the managed document.
	 * 
	 * @param {String} styleContent
	 *            style sheet content
	 * @param {String} title style sheet title
	 */
	addStyleSheet : function( styleContent, title )
	{			
		var element = document.createElement( "style" );
		element.type = "text/css";
		if ( title )
		{
			element.title = title;
		}
		if ( styleContent )
		{
			if ( element.styleSheet )
			{
				element.styleSheet.cssText = styleContent;
			}
			else
			{
				element.appendChild( document.createTextNode( styleContent ) );
			}
		}
			
		if ( !this._headElement )
		{
			this._headElement = document.getElementsByTagName("head")[0];
		}
		this._headElement.appendChild( element );
		return element;
	},

	/**
	 * Adds an external style sheet into the managed document.
	 * @param {String }url
	 *            URL of the CSS file to add
	 */
	addExternalStyleSheet : function( url )
	{
		url = actuate.common.web.util.Utility.makeAbsoluteUrl( url );
		
		// Add the unique version identifier for the jsapi version.
		url += "?" + actuate.common.web.Version.getVersionParam( );
//		var styles = "@import url(' " + url + "  ');";				
		var newSS = document.createElement( 'link' );
		newSS.rel = 'stylesheet';
		newSS.type = 'text/css';
		newSS.href = url;				
		
		if( !this._headElement )
		{
			this._headElement = document.getElementsByTagName( "head" )[0];
		}
		this._headElement.appendChild( newSS );
	},

	/**
	 * Returns a CSS rule.
	 * Beware that this method will loop over all the available style
	 * sheets to find the given rule, which might cause some performance
	 * issues.
	 * @param {Object} styleSheet style sheet
	 * @param {String} ruleName rule name
	 * @param {boolean} deleteFlag delete flag
	 * @return
	 */
	findCSSRule : function( styleSheet, ruleName, deleteFlag )
	{
		if( !styleSheet )
		{
			return;
		}
		
		var cssRule = false;
		var rules;
		if (styleSheet.cssRules)
		{
			rules = styleSheet.cssRules;
		}
		else
		{
			rules = styleSheet.rules;
		}
		
		for ( var i = 0; i < rules.length; i++ )
		{
			cssRule = rules[i];
			if ( cssRule )
			{														
				if ( cssRule.selectorText == ruleName )
				{
					if (deleteFlag)
					{
											
						if ( styleSheet.deleteRule )
						{
							styleSheet.deleteRule( i );
						}
						else
						{
							styleSheet.removeRule( i );
						}
						return true;                        
					}
					else
					{													
						return cssRule;
					}
				}
			}                                       
		}							
	},
	
	
	/**
	 * Returns a style sheet by index.
	 * @param {int} styleSheetIndex style sheet index to return
	 * @return {Object} style sheet instance
	 */
	getStyleSheet : function( styleSheetIndex )
	{
		if ( document.styleSheets )
		{
			return document.styleSheets[ styleSheetIndex ];
		}
	},

	/**
	 * Finds a style sheet by title.
	 * @param {String} title style sheet title
	 * @return {Object} style sheet instance
	 */
	findStyleSheet : function( title )
	{
		if ( document.styleSheets )
		{
			for ( var i = 0; i < document.styleSheets.length; i++ )
			{
				var css = document.styleSheets[i];
				// style sheet must be modifiable
				if ( css.title == title )
				{
					return css;
				}
			}
		}
		return null;
	},
	
	/**
	 * Returns a style sheet instance that supports adding
	 * styles.
	 * @return {Object} style sheet instance
	 */
	findFreeStyleSheet : function()
	{
		if ( document.styleSheets )
		{
			for ( var i = 0; i < document.styleSheets.length; i++ )
			{
				var css = document.styleSheets[i];
				// style sheet must be modifiable
				if ( ( !css.ownerNode || css.ownerNode.tagName.toLowerCase( ) == "style" ) )
				{
					return css;
				}
			}
		}
		return null;
	},
	
	/**
	 * Deletes the given CSS rule.
	 * @param ruleName rule name
	 * @return {boolean} whether the rule was found and removed
	 */
	deleteCSSRule : function( css, ruleName)
	{                      
			return this.getCSSRule( css, ruleName, true );             
	},                                                     

	/**
	 * Adds a CSS rule.
	 * @param {Object} optional css style sheet instance
	 * @param {String} ruleName rule name
	 * @param {String} ruleContent optional rule body
	 */
	addCSSRule : function( css, ruleName, ruleBody )
	{                        
		if ( document.styleSheets )
		{
			if ( !css )
			{
				css = this.findFreeStyleSheet( );
				if ( !css )
				{
					return;
				}
			}
			
			if ( css.addRule )
			{
				css.addRule(ruleName, ruleBody?ruleBody:null, 0);
			}
			else
			{
				css.insertRule(
						ruleName + " {" +
						(ruleBody?ruleBody:"") +
						"}", 0);
			}
		}
	}		
};actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Anchor class tab
 * 
 */

actuate.common.web.widget.control.Anchor = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.Control,
{
	_click : null,
	
	/**
	 * initialize - base input tag class
	 * 
	 * @param config
	 * @return
	 */
	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings = actuate.common.web.$.extend( {}, {}, config );
    	this._text 	= settings.text;
    	this._click = settings.click;
    	this._name 	= settings.name; 
    	
    	delete settings.type;
    	delete settings.text;
    	delete settings.click;
    	delete settings.allowblank;
    	
    	actuate.common.web.widget.control.Anchor.superclass.initialize.call( this, settings );
	},
	
    /**
     * initialize the component with other default values
     */
    _initComponent : function()
    {
        actuate.common.web.widget.control.Anchor.superclass._initComponent.call( this );
        this.setText( this._text );
    },

	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
		actuate.common.web.widget.control.Anchor.superclass.appendTo.call( this, appendTo );
		actuate.common.web.$(this._element).click( actuate.common.web.Method.bind2( this._onClick, this, this._name ) );
	},
	
	_onClick : function( name, event )
	{
		if ( this._click )
		{
			this._click( name );
		}
	},
	
	/**
	 * Sets the text value for this label element
	 * @param text
	 */
	setText : function( text )
	{
		this._text = text;
		this._element.text( this._text );
	},
	
	/**
	 * Sets the value for this label element
	 * @param text
	 */
	setValue: function( value )
	{
        this._element.attr("value", value);
        this.setText(value);
	},
	
	/**
	 * Returns the default input tag syntax to create the control with
	 * @returns {String}
	 * 		<p>&lt;input&gt;</p>
	 */
	_getHTMLTag : function( )
	{
		return "<a href='#'>";
	}
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Button class
 */

actuate.common.web.widget.control.Button = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.Control,
{
	_click : null,
	_buttonType : null,
	_class : null,
	
	/**
	 * initialize
	 * 
	 * @param config
	 * @return
	 */
	
	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings = {};
    	settings = actuate.common.web.$.extend( {}, settings, config );
    	
    	// Delay the click association of this element until this element is appended.
    	// TODO: need to figure out how to prevent it from getting triggered if it is not deleted.
    	this._click = settings.click;
    	this._buttonType = settings.buttonType;
    	this._class = config.btnClass;
    	
    	delete settings.click;
    	
    	actuate.common.web.widget.control.Button.superclass.initialize.call( this, settings );
	},
	
	_getHTMLTag : function( )
	{
		var buttonType = "";
		var buttonClass = "";
		if ( this._buttonType )
		{
			buttonType = " btn-" + this._buttonType;
		}	
		if(this._class)
		{
			buttonClass = this._class;
			return '<button type="button" class="' + buttonClass + '">' + this.getTitle() + '</button>';

		}
		else
		{
			buttonClass = "btn " + buttonType; 
		}
			
		return '<button type="button" class="' + buttonClass + '">'+  this.getTitle() + '</button>';
		
	},
	
	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
	    actuate.common.web.widget.control.Button.superclass.appendTo.call( this, appendTo );
		actuate.common.web.$(this._element).click(this._click);
	},
	
    /**
     * Add a listener to this element control
     * @param event
     * @param handler function called when the event is called
     */
    addListener : function( event, handler )
    {
    	if ( "click" === event )
		{
    		this._click = handler;
		}
    	else
		{
    	    actuate.common.web.widget.control.Button.superclass.addListener.call( this, arguments );
		}
    }
    
	
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new TextField class
 * 
 */

actuate.common.web.widget.control.CheckBox = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.InputTag,
{
	/**
	 * initialize - Calls the _createTextField function
	 * 
	 * @param options
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings = actuate.common.web.$.extend( {}, {}, config );
    	settings.type = 'checkbox';
    	
    	var checkBoxCSS = 'actuCheckBox';
    	if ( settings.cssClass )
    	{
    		checkBoxCSS = 'actuCheckBox ' + settings.cssClass;
    	}
    	settings.cssClass = checkBoxCSS;
    	
    	actuate.common.web.widget.control.CheckBox.superclass.initialize.call( this, settings );
	},
	
	_getbooleanValue : function( value )
	{
		var booleanValue = ( true === value || "true" === value || "True" === value ) ? true : false;
		
		return booleanValue
	},
	
    /**
     * gets the value of this element
     */
    getValue : function()
    {
    	var checked = actuate.common.web.$( this._element ).prop('checked') ;
    	checked = (checked)?true:false;
    	
    	return checked;
    },
	
    /**
     * Sets the value of this element.
     * 
     * @param value to set
     */
    setValue : function(value)
    {
    	var booleanValue = this._getbooleanValue( value );
    	actuate.common.web.$( this._element ).prop( 'checked', booleanValue );
    },
    
    onSelect : function(callBack)
    {
        this._callBack = callBack;
    },
    
    /**
     * sets appendTo container for this element.
     * @param appendTo
     */
    appendTo : function(appendTo)
    {
        this._curSettings.appendTo = appendTo;

        if (this._curSettings.appendTo)
        {
            if (this._lblElement)
            {
                this._lblElement.appendTo(this._curSettings.appendTo);
            }
            this._element.appendTo(this._curSettings.appendTo);
            
            if(this.getValue()) 
            {
                this._imgCheckBox = actuate.common.web.$('<i name=imgcheckbox_' + this._curSettings.name + ' class="actuImgCheckBoxChecked"></i>');
            }
            else
            {
                this._imgCheckBox = actuate.common.web.$('<i name=imgcheckbox_' + this._curSettings.name + ' class="actuImgCheckBoxUnChecked"></i>');
            }
            this._imgCheckBox.click(actuate.common.web.Method.bind(this.onClick,this));
            this._imgCheckBox.appendTo(this._curSettings.appendTo);
        }
    },
    
    onClick : function() 
    {
        if( this._imgCheckBox.hasClass('actuImgCheckBoxUnChecked') ) 
        {
            this._imgCheckBox.removeClass('actuImgCheckBoxUnChecked');
            this._imgCheckBox.addClass('actuImgCheckBoxChecked');
            this.setValue(true);
        }
        else
        {
            this._imgCheckBox.removeClass('actuImgCheckBoxChecked');
            this._imgCheckBox.addClass('actuImgCheckBoxUnChecked');
            this.setValue(false);
        }
        
        if( this._callBack ) 
        {
            this._callBack(this._curSettings.name);
        }
    }

});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new ComboBox class
 * 
 */

actuate.common.web.widget.control.ComboBox = actuate.common.web.Class.extendClass(actuate.common.web.widget.control.Control, {
    /**
     * initialize
     * 
     * @param options
     * @return
     */
    _id : null,

    initialize : function(options, list, appendTo)
    {
        if (this.__extending)
            return;

        var listBox = new actuate.common.web.widget.control.ListBox(options);
        listBox.addToList(list);

        if (appendTo)
        {
            listBox.appendTo(appendTo);
        }

        this._id = options.id;
        if (this._id)
        {
            actuate.common.web.$("#" + this._id).combobox();
        }
    }

});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new DatePicker class
 * 
 */

actuate.common.web.widget.control.DatePicker = actuate.common.web.Class.extendClass(actuate.common.web.widget.control.Control, {
	/**
     * initialize
     * 
     * @param options
     * @return
     */
    initialize : function( config )
    {
        if (this.__extending)
            return;
        
        var settings = actuate.common.web.$.extend( {}, {}, config );
        
        actuate.common.web.widget.control.DatePicker.superclass.initialize.call( this, settings );
    },
    
    /**
     * initialize the component with other default values
     */
    _initComponent : function()
    {
        actuate.common.web.widget.control.DatePicker.superclass._initComponent.call( this );
        this.addClass("actuTextField");
    },
    
	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
	    actuate.common.web.widget.control.DatePicker.superclass.appendTo.call( this, appendTo );
		var id = this.getID();
		actuate.common.web.$("#" + id).datepicker( );
	}

});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Dropdown Button class
 */

actuate.common.web.widget.control.DropdownButton = actuate.common.web.Class.extendClass(actuate.common.web.widget.control.Button,
    {

        _config  	: null,

        /**
         * Map with HTML ID keys and menu item values.
         */
        _menuItems : null,

        initialize : function( config )
        {
            if ( this.__extending )
                return;
            this._config = config;
            
            actuate.common.web.widget.control.DropdownButton.superclass.initialize.call( this, config );
        },

        _getCogHeaderTemplate : function( )
        {
        	var id = this.getID( );
        	var template = '<div id="' + id + '" class="ac-filebar-actuate-menu-inner" data-toggle="dropdown">' +
        						'<i class="icon-ygg-cog"></i>' +
        						'<i class="icon-ygg-caret-down ac-filebar-actuate-menu-icon-caret"></i>' +
        					'</div>' +
        					this._addDropDownList( );
        	
        	return template;
        },
        
        _getNormalDropdownTemplate : function( )
        {
        	var id = this.getID( );
            var customCls = ( this._config.customClass ) ? " " + this._config.customClass : "";

            var display = ( this._config.display ) ? this._config.display : this.getTitle( );
        	var template = '<span><div class="btn-group">' +
        						'<button id="' + id + '" class="btn ' + customCls + '" data-toggle="dropdown">' +
        						display +    
        							'<span class="icon-ygg-caret-down ac-filebar-actuate-menu-icon-caret"></span>' +
        						'</button>' +	
        						this._addDropDownList( ) +
        					'</div></span>';

        	return template;
        },
        
        /**
         * default implementation class to create html element
         */
        _createElement : function()
        {
        	this._curSettings.id = this.getID();
        	
            var tagType = this._getHTMLTag();

            this._element = new  actuate.common.web.$(tagType);
            var curId = this._curSettings.id;
            delete this._curSettings.id;
            
            // Do not include the id property since it could apply them to all html fragment element.
            this._element.attr(this._curSettings);
            
            this._curSettings.id = curId;
            
        },
        
        /**
         * Gets the id of this control
         * @returns The ID of this control
         */
        getID : function()
        {
            if ( this._curSettings.id )
            {
                return this._curSettings.id;
            }
            return this.getUniqueID( );
        },

        _getHTMLTag : function( item )
        {
            var html 	= '';
            var type 	= item ? item.type : 'none';
            var id		= this.getID();
            switch( type )
            {
                // none in this case means button itself, all other types are for menu items
            	case 'none':
            		var title 	= this.getTitle();
            		this._templateType = ( !title ) ? 'cog' : 'normal';
                    if ( this._templateType === 'cog' )
                	{	
                		html += this._getCogHeaderTemplate( );
                	}
                	else
            		{
                		html += this._getNormalDropdownTemplate( );
            		}
                	
                    break;
                default:
                    var iconId 	= "grdItem-" + actuate.common.web.util.Utility.createUniqueControlID( );
                    html = this._anchorHtml( type, iconId, item );
            }
            return html;

        },

        _anchorHtml : function( type, id, item )
        {
            var dataNameAttr = " data-name='" + type + "'";
            var clsAttr = "";
            if ( item.cls )
            {
                clsAttr = " class='" + item.cls + "'";
            }

            var html = "<a title =\""+item.title+"\" href='#'" + dataNameAttr + clsAttr + " id=\"" + id + "\">";

            if(type != 'back')
            {
                if ( item.title )
                {
                    html += " " + item.title;
                }
            }

            html += "</a>";

            this._addItemHandler( id, item );
            return html;
        },

        _attachClickHandler : function( )
        {
            var _this = this;
            for ( var id in this._menuItems )
            {
                actuate.common.web.$( "#" + id ).click(
                    function()
                    {
                        _this._menuItems[ this.id ].listener.onItemClick( _this );
                    }
                );
            }
        },

        _addItemHandler : function( id, item )
        {
            if ( !this._menuItems )
            {
                this._menuItems = {};
            }
            this._menuItems[ id ] = item;
        },

        /**
         * sets appendTo container for this element.
         * @param appendTo
         */
        appendTo : function( appendTo )
        {
            actuate.common.web.widget.control.DropdownButton.superclass.appendTo.call( this, appendTo );
            actuate.common.web.$(this._element).click(this._click);
            this._attachClickHandler( );
        },

        updateMenuItem : function( menuItem )
        {
			var menus = this._menuItems;
			if ( menus )
			{
				for ( var i in menus )
				{
					var menu = menus[ i ];
					if ( !menu.data || !menu.data.name ) continue;
					
					if ( menu.data.name == menuItem.data.name )
					{
						var menuId = i;
						var anchorEl = actuate.common.web.$("#" + menuId );
						anchorEl.text( menuItem.title );
						this.hideMenuItem( menuId, menuItem.isHidden );
						break;
					}	
				}
			}        	
        },

        hideMenuItem : function( id, hideItem )
        {
        	var anchorEl = actuate.common.web.$("#" + id );
        	var closestLI = anchorEl.closest( 'li' );
        	if ( hideItem )
        	{
        		closestLI.removeClass("show").addClass("hide");	
        	}
        	else
        	{
        		closestLI.removeClass("hide");	
        	}
        },
        
        _addDropDownList : function( )
        {
        	var id	= this.getID( );
        	var html = '';
        	var wrenchId = "wrench" + id;
            if ( this._config.items && this._config.items.items )
            {
                var menus = this._config.items.items;
                var cssClass = "dropdown-menu";
                if ( this._config.listPosition )
            	{
                	if ( this._config.listPosition === 'left' )
                	{
                		cssClass += " pull-right";
                	}	
            	}
                html += '<ul id="' + wrenchId + '" class="'+ cssClass + '" role="menu" aria-labelledby="' + id + '">';

                for ( var i=0; i<menus.length; i++ )
                {
                    var menu = menus[ i ];
                    var menuId = 'submenu' + i + '_' + id;

                    var hideItem = "";
                    if ( menu.isHidden )
                	{
                    	hideItem = ' class="hide"';
                	}

                    html += '<li id="' + menuId + '"' + hideItem + '>';
                    html += this._getHTMLTag( menu );
                    html += '</li>';
                }
                html += '</ul>';
            }
        	
            return html;
        },
        
        _createWrenchOptions : function( clsIcon, type, id )
        {
            var html  = '<div class="dropdown">';
            var items =
            {
                icon : this._iconHtml( clsIcon )
            };

            html += this._wrenchIconHtml( clsIcon, type, id, null, null, items );
            html += this._addDropDownList( id );
            html += "</div>";
            return html;
        },

        _createNameValueAttr : function( name, value )
        {
            var attr = " " + name + "='" + value + "'";
            return attr;
        },

        _wrenchIconHtml : function( clsIcon, type, id, cls, title, items )
        {
            var dataNameAttr 	= this._createNameValueAttr( "data-name", type );
            var roleAttr 		= this._createNameValueAttr( "role", "button" );
            var dataToggleAttr 	= this._createNameValueAttr( "data-toggle", "dropdown" );

            var clsAttr = "";
            if ( cls )
            {
                clsAttr = " " + cls;
            }
            clsAttr = this._createNameValueAttr( "class", "dropdown-toggle wrench" + clsAttr );

            var html = "<a " + dataToggleAttr + roleAttr + dataNameAttr + clsAttr + " class='icon-no-underline' style=\"text-decoration:none;\" id=\"" + id + "\">";

            for ( var key in items )
            {
                html +=  items[ key ];
            }

            if ( title )
            {
                html += " " + title;
            }
            html += "</a>";

            return html;
        },

        _iconHtml : function( clsIcon )
        {
            if ( !clsIcon ) return "";

            var html = "<i class=\"" + clsIcon + "\"></i>";
            return html;
        },

        getConfig : function( )
        {
            return this._config;
        },

        /**
         * @param hideCaret
         */
        hideDropdownCaret : function( hideCaret )
        {
        	var id = this.getID();
        	var container = actuate.common.web.$( '#' + id );
        	
        	var caretClass = "icon-ygg-caret-down";
        	
        	var caretContainer = container.find( 'span' );
        	if ( this._templateType === 'cog' )
        	{	
        		caretContainer = actuate.common.web.$( container.find( 'i' )[1] );
        	}
        	
        	caretContainer.removeClass( caretClass );
        	if ( !hideCaret )
        	{
        		caretContainer.addClass( caretClass );
        	}	
        },
        
        changeCustomClass : function( customClass )
        {
        	var id = this.getID();
            if( this._config.customClass )
            {
                actuate.common.web.$( '#' + id ).removeClass( this._config.customClass ).addClass( customClass );
            }
            else
            {
                actuate.common.web.$( '#' + id ).addClass( customClass );
            }
            this._config.customClass = customClass;
        },

        getMenuItems : function( )
        {
            return this._menuItems;
        }

    });actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new File class
 * 
 */

actuate.common.web.widget.control.File = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.InputTag,
{
    /**
     * initialize 
     * 
     * @param options
     * @return
     */

    initialize : function( config )
    {
        if ( this.__extending )
            return;
        
        var settings = actuate.common.web.$.extend( {}, {}, config );
        settings.type = 'file';
        settings.cssClass = 'actuFile';
        
        actuate.common.web.widget.control.File.superclass.initialize.call( this, settings );
    }

});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.control" );

actuate.common.web.widget.control.GridUtil =
{
	initialize : function( )
	{
	},
	
	
	/**
	 * Generate a grid item object based on the passed in data
	 * 
	 * @param type
	 *            type of control to show, by default it uses &lt;p&gt;
	 * @param title
	 *            text used to show in the grid
	 * @param name
	 *            data name used
	 * @param label
	 *            data label name used for headers
	 * @param state
	 *            state of item
	 * @param onItemClick
	 *            event handler that is called if this item is clicked
	 * @param template
	 * @param isHidden
	 * @param listener
	 * 		
	 * @returns {object}
	 */
	generateItem : function( type , title , name , label , state , onItemClick , cls ,
			template, isHidden, listener )
	{
		var itemListener = listener; 
		if ( !listener )
		{
			var config =
			{	
				onItemClick : onItemClick
			};
			
			itemListener = new actuate.common.web.widget.control.GridItemListener( config );
		}
		
		var isClickable = itemListener.isClickableItem( );
		
		var gridItem = {
			type 	: type,
			title 	: title,
			state 	: state,
			data 	: 
			{
				name 	: name,
				label 	: label
			},
			listener 	: itemListener,
			cls			: cls,
			template 	: template,
			isHidden	: isHidden,
			isClickable	: isClickable
		};
		
		return gridItem;
	},
	
	getHeaderLabel : function( item )
	{
		var label = "";
		if ( item && item.data )
		{
			label = item.data.label;
		}
		return label;
	}
};

actuate.common.web.widget.control.GridUtil.initialize( );

/**
 * Default icon action handler/listener for the grid item.
 */
actuate.common.web.widget.control.GridItemListener = actuate.common.web.Class.create( );
actuate.common.web.widget.control.GridItemListener.prototype =
{
    initialize : function( config )
    {
        if ( this.__extending )
            return;

        this._config = config;
        if ( config && config.onItemClick )
    	{
        	this._onItemClick = config.onItemClick; 
    	}
    },
	
    /**
     * true if item is clickable.  It is clickable if this item is listening on onclick event.
     * @return {boolean}
     */
    isClickableItem : function( )
    {
    	if ( this._onItemClick )
    		return true;
    	
    	return false;
    },
    
	/**
	 * Concrete class should implement this
	 * @param event
	 * @param data
	 */
	onItemClick : function( event, data )
	{
		if ( this._onItemClick )
		{
			return this._onItemClick.apply( this, arguments );
		}
	},
	
	/**
	 * Get the label based on the icon type.
	 * @param type
	 * @param state
	 */
	getIconLabel : function( type, state )
	{
		return null;
	},
	
	/**
	 * 
	 * @param type
	 * @param icon
	 * @param iconEl
	 * @returns cls the class name that is set to
	 */
	toggleIcon : function( type, icon, iconEl )
	{
		if ( !icon ) return;
		
		var cls = iconEl.hasClass( icon.active ) ? icon.deactive : icon.active;

		switch ( type )
		{
			case 'flag' :
			case 'star' :
			case 'startstop' :
				iconEl.removeClass( icon.deactive + " " + icon.active );
				iconEl.addClass( cls );
				break;
			default:
				break;
		}
		
		return cls;
	}
};

/**
 * Construct a new Grid Item control class that can handle the different control used by the grid layout.
 */
actuate.common.web.widget.control.GridItem = actuate.common.web.Class.create( );
actuate.common.web.widget.control.GridItem.prototype =
{
		/**
		 * icon list class name/value pair used by Grid control to specify the state of the icon<br/>Icon
		 * attributes:
		 * <ul>
		 * <li>default</li>
		 * <li>active</li>
		 * <li>deactive</li>
		 * </ul>
		 * 
		 * Each icon type such as below will have the icon attributes mentioned
		 * above.
		 * <ul>
		 * <li>star</li>
		 * <li>flag</li>
		 * <li>trash</li>
		 * <li>edit</li>
		 * </ul>
		 */
		_icons :
		{
//			add :
//			{
//				'default' 	: 'icon-plus-sign',
//				'active' 	: 'icon-plus-sign',
//				'deactive' 	: 'icon-plus-sign'
//			},
			back :
			{
				'default'	: 'icon-ygg-back back-icon'
			},
			//edit :
			//{
				//'default' 	: 'icon-ygg-edit',
				//'active' 	: 'icon-ygg-edit',
				//'deactive' 	: 'icon-ygg-edit '
			//},
			flag :
			{
				'default' 	: 'icon-ygg-flag',
				'active' 	: 'icon-ygg-flag',
				'deactive' 	: ''
			},
			next :
			{
				'default' 	: 'icon-ygg-chevron-right icon-large icon-no-underline'
			},
			prev :
			{
				'default' 	: 'icon-ygg-chevron-left icon-large icon-no-underline'
			},
			refresh :
			{
				'default' 	: 'icon-ygg-refresh'
			},
			search :
			{
				'default' 	: 'icon-ygg-search'
			},
			star :
			{
				'default' 	: 'pointer icon-ygg-star',
				'active' 	: 'pointer icon-ygg-star',
				'deactive' 	: 'pointer icon-ygg-star-empty'
			},
			startstop:
			{
				//'default' 	: 'icon-ygg-play',
				//'active' 	: 'icon-ygg-play',
				//'deactive' 	: 'icon-ygg-stop'
			},	
			//trash :
			//{
				//'default' 	: 'icon-ygg-trash',
				//'active' 	: 'icon-ygg-trash',
				//'deactive' 	: 'icon-ygg-trash'
			//},
			wrench :
			{
				'default'	: 'icon-ygg-caret-down icon-large pointer'
			},
			file :
			{
			    'default'   : 'icon-ygg-file-alt'
			},
			folder :
            {
                'default'   : 'icon-ygg-folder-close'
            },
			volume :
            {
                'default'   : 'icon-ygg-volume-add' //TODO org: icon-hdd
            },
			dot :
            {
                'default'   : 'icon-ygg-dot icon-large' //TODO org: icon-hdd
            },
			check :
            {
                'default'   : 'icon-ygg-menu-check icon-large' //TODO org: icon-hdd
            },
			alert :
            {
                'default'   : 'icon-ygg-alert-triangle icon-large' //TODO org: icon-hdd
            },
			error :
            {
                'default'   : 'icon-ygg-alert-triangle icon-large' //TODO org: icon-hdd
            }
		},
		
		_config	: null,
		_id 	: null,
		_handler: null,

		/**
		 * Sample config to initialize Grid control
		 * <pre> 
		  	var config = 
		  	{
				type 	: type,
				title 	: title,
				state 	: state,
				data 	: 
				{
					name 	: name,
					label 	: label
				},
				handler 	: handler,
				cls			: cls,
				template 	: template
			};
			</pre>
		 * @param config
		 */
		initialize : function( config )
		{
			this._config = config;
			this._createElement( );
		},
		
		/**
		 * Get the icon class name based on the type and state of the grid item
		 * 
		 * @param {object}
		 *            type
		 * @param {String}
		 *            state
		 *            <ul>
		 *            <li>active</li>
		 *            <li>deactive</li>
		 *            <li>default</li>
		 *            </ul>
		 * @returns
		 */
		getIconClass : function( type , state )
		{
			var iconObj = this._icons[ type ];
			if ( !iconObj ) return "";

			var stateAttr = ( state === "active" ) ? "active" : "deactive";
			var cls = null;
			switch ( type )
			{
				case 'star' :
					cls = iconObj[ stateAttr ];
					break;
			}

			// if class is not found, then use the default class for this type
			if ( !cls ) cls = iconObj[ 'default' ];

			return cls;
		},
		
		/**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
			if ( this._isHidden( ) === true ) return;
			
            this._element.appendTo(appendTo);

			this._attachClickHandler( );
		},
		
		 /**
	     * default implementation class to create html element
	     */
	    _createElement : function()
	    {
	    	if ( this._isHidden( ) === true ) return;
	    	
	        var tagType = this._getHTMLTag( this._config );

	        this._element = new actuate.common.web.$(tagType);
	       /* if(this._config.type == 'selectItems')
	        {
	        	 this._element.find('input').eq(1).click(function(){
	        		
	        		var state = null;
	        		if(this.checked === true)
	        		{
	        			state='checked';
	        		}
	        		else
	        		{
	        			state='unchecked';
	        		}
	        		actuate.common.web.$('table').find(':checkbox').attr('data-value', state);
	 	        	actuate.common.web.$('table').find(':checkbox').prop('checked', this.checked);
	 	        });
	        }*/
	       	this._click = actuate.common.web.Method.bind2( this._iconHandler, this, actuate.common.web.Method.bind( this._config.listener.onItemClick, this._config.listener ) );
	    },
	    
	    _isHidden : function( )
	    {
	    	return this._config.isHidden;
	    },
	    
		/**
		 * Generic icon click handler. Currently this does nothing but to
		 * change/toggle the icon state
		 * 
		 * @param event
		 */
		_iconHandler : function( cb , event )
		{
			var el = actuate.common.web.$( actuate.common.web
					.$( event.currentTarget )[ 0 ] );
			
			var closestI  = null;
			var selectAll = null;
            var type        = el.attr( "data-name" );
            var elId = el.attr("id");
            if(typeof(elId) === 'string' && elId.indexOf('selectItemsmask') > 0)
            {
            	 var dataValue   = el.attr( "data-value");
            	 if(dataValue === 'unchecked')
            	 {
            		dataValue = 'checked'; 
            	 }
            	 else
            	 {
            		 dataValue = 'unchecked';
            	 }
            	 el.attr("data-value",dataValue);
            }
           
            
            // We use the "i" tag to render the image icon for all types except checkbox. For checkbox we use input tags
            if( type === "checkbox") 
            {
                selectAll    = actuate.common.web.$('.checkbox-in-btn');
            }
            else
            {
            	closestI     = el.find('i');
            }
                        
            var icon  = this._icons[ type ];
            var state = this._updateIconState( type, icon, closestI, el );
			
			if ( cb )
			{
				var data = { };
				var id = el.attr("id");
				var isSearchClear = ( type === "clear" && id.indexOf( "searchClear" ) >= 0 ) ? true : false;
				if ( type === "search" || isSearchClear )
				{
					if ( isSearchClear )
					{
						var idx = id.lastIndexOf( 'searchClear' );
						if ( idx !== ( id.length - 1 ) )
						{
							id = id.substr( 0, idx );
						}
					}
					
					var searchTextId = id + "searchTxt";
					var textEl = actuate.common.web.$("#" + searchTextId );
					
					if ( isSearchClear )
					{
						// clear the text field.
						textEl.val("");
					}
					else
					{	
						var val = textEl.val( );
						data.data = val;
					}
				}
				else if ( type === "checkbox")
                {
                	var isChecked = el.prop('checked');
                	
                	if( isChecked )
                    {
                    	el.prop('checked',true);
                    }
                    else 
                    {
                    	el.prop('checked', false);
                    }
                    
                    selectAll.prop('checked', false);
                    
                    state = ( isChecked) ? "checked" : "unchecked";
                    
                    data.data = state;
                }
				else if (type === "star")
				{
					state =  closestI.hasClass( icon.active ) ? 'active' : 'deactive';
					data.data = state;
				}
				else if ( type == "startstop")
				{
					var menus = this._config.items;
					if ( menus )
					{
						for ( var i=0; i<menus.length; i++ )
						{
							var menu = menus[ i ];
							if ( menu.type == 'startstop' )
							{
								data.menuState = menu.state;
								break;
							}
						}
					}
				}	
				
				data.elementId 	= id;
				data.state 		= state;
				cb( type, event, data );
			}
		},

		/**
		 * @param type the item type that was clicked on
		 * @param icon icon item associated with this type
		 * @param iconEl the icon element
		 * @param el the anchor element that holds the icon
		 */
		_updateIconState : function( type, icon, iconEl, el )
		{
			var clsIcon = this._config.listener.toggleIcon( type, icon, iconEl );
			var iconHtml = this._iconHtml( clsIcon );
			var state = 'active';
			switch ( type )
			{
				case 'startstop':
					state = ( clsIcon === icon.active ) ? 'active' : 'deactive';
					var label = this._config.listener.getIconLabel( type, state );
					if ( label )
					{	
						el[0].innerHTML = label;
					}
					break;
				default :
					break;
			}
			return state;
		},

		/**
		 * Generate an html item fragment for the grid based on the configuration data
		 * @param config
		 * @returns {String}
		 */
		_getHTMLTag : function( config )
		{
			var item = config;
			
			var html 	= "";
			var iconId 	= "grdItem-" + actuate.common.web.util.Utility.createUniqueControlID( );
			var hasId 	= true;

			var template = item.template? item.template : this._getDefaultTemplate( config);
			
			switch ( item.type )
			{
				case 'add' :
				case 'back' :
				case 'cancel' :
				case 'checkbox' :
				case 'edit' :
				case 'flag' :
				case 'next' :
				case 'prev' :
				case 'refresh' :
				case 'save' :
				case 'search' :
				case 'selectItems' :
				case 'star' :
				case 'startstop':
				case 'trash':
				case 'wrench':
				case 'file':
				case 'folder':
				case 'volume':
				case 'onlineoffline':
				case 'setaccess':
				case 'dropDownButton':
				case 'dot':
				case 'check':
				case 'alert':
				case 'error':
				case 'button' :
					html = this._generateClickableHTML( iconId,
														item.type,
														item.state,
														item.cls,
														item.title,
														item.data.label);
					break;
				case 'pageinfo':
					// TODO: template should be a template. page info should be modified to not use the passed in
					// template variable as the id.
					var pageinfoId = item.template;
					html = this._pageInfoHtml( item.type, pageinfoId, item.cls, item.title );
					break;
				default :
					if ( item.isClickable )
					{
						html = this._generateClickableHTML( iconId,
								item.type,
								item.state,
								item.cls,
								item.title);
					}
					else
					{	
						hasId = false;
						html = this._getTemplate( template, item.data.name, item.data.label, item.title );
					}
					break;
			}

			if ( hasId )
			{
				this._id = iconId;
			}
			return html;
		},

		_getDefaultHTMLTemplate : function( template, item )
		{
			var html = this._getTemplate( template, item.data.name, item.data.label, item.title );
			if ( item.isClickable )
			{
				html = this._generateClickableHTML( iconId,
						item.type,
						item.state,
						item.cls,
						item.title);
			}
			return html;
		},
		
		_getDefaultTemplate : function(config )
		{
			var cls = "";
			if( config.cls ) 
			{
				cls = config.cls;
			}
			
			var template = "<p class=\"acgridtext " + cls + "\"";
			
			if( cls.indexOf("cliptext") !== -1 ) 
			{
				template += " title=\"" + "{value}" + "\"";
			}
				
			template += " data-name=\"" + "{data.name}" + "\" data-label=\""
	            + "{data.label}" + "\">" + "{value}" + "</p>";
			
			return template;
		},
		
		_getTemplate : function( template, name, label, value )
		{
	    	var template = template.replace( /{data.name}/g, name );
	    	template = template.replace( /{data.label}/g, label );
	    	template = template.replace( /{value}/g, value );

	    	return template;
		},
		/**
		 * Create an html fragment that is clickable using the anchor tag
		 * 
		 * @param id
		 * @param type
		 * @param state
		 * @param cls
		 * @returns {String}
		 */
		_generateClickableHTML : function( id , type , state, cls, title, label )
		{
			var clsIcon = this.getIconClass( type, state );

			var defaultItems = this._iconHtml( clsIcon, title );

			var html = "";
			switch ( type )
			{
				case 'save'   :
				case 'cancel' :
				case 'button' :
				case 'refresh':
				case 'add'	  :
					html = this._createButtonHtml( type, id, cls, title, state, label );
					break;
				case 'checkbox':
					html = this._checkboxHtml( type, id, cls, title, state );
					break;
				case 'search':
					html = this._searchHtml( clsIcon, type, id, cls, title );
					break;
				case 'selectItems':
					html = this._selectItemsHtml( type, id, cls, title, state );
					break;
				case 'wrench':
					html = this._createWrenchOptions( clsIcon, type, id, cls, title );
					break;
				case 'dropDownButton':
                    html = this._createdropDownButtonOptions( clsIcon, type, id, cls, title, label );
                    break;
				/*case 'add':
					html = this._createAddButton(type, id, cls, title);
					break;*/
				case 'alert':
				case 'error':
					html = this._createAlertErrorHtml( type, id, cls, title, { icon : defaultItems } );
					break;
				case 'check':
				case 'dot':
					html = this._createDotCheckHtml( type, id, cls, title, { icon : defaultItems } );
					break;				
				default:
					html = this._anchorHtml( type, id, cls, title, { icon : defaultItems } );
					break;
			};
		    
			return html;
		},
		
		_pageInfoHtml : function( type, id, cls, title )
		{
//			case 'pageinfo' :
//                html = "<p id='pageinfo-" + item.template + "' class='muted pageinfo'></p>";
//                break;

                
			//TODO: based on the size of the button adjust the text box height.
			
			var iconId 	= "grdItem-" + actuate.common.web.util.Utility.createUniqueControlID( );
			var html = "<li>";
			// left navigation
			var clsIcon = this.getIconClass( 'prev', 'active' );
			var defaultItems = this._iconHtml( clsIcon );
			html += this._anchorHtml( 'prev', iconId + 'prev', null, null, { icon : defaultItems } );
			
			// page-info
			var textId = "pageinfo-" + id;
			html +="</li><li id='" + textId + "' class='pageinfo-text'>";
			html += "</li><li>";
			
			// right navigation
			clsIcon = this.getIconClass( 'next', 'active' );
			defaultItems = this._iconHtml( clsIcon );
			html += this._anchorHtml( 'next', iconId + 'next', null, null, { icon : defaultItems } );
			html += "</li>";
			
			return html;
		},

		_checkboxHtml : function( type, id, cls, title, state )
        {
            var dataNameAttr = " data-name='" + type + "'";
            this._addHandlerId( id );
            var html = null;
            
            if( state === 'checked') 
            {
                html = '<input id=' + id + ' type="checkbox" '+ state + ' class="table-select-checkbox" ' + dataNameAttr + '>&nbsp;</input>';
            }
            else 
            {
                html = '<input id=' + id + ' type="checkbox" '+ state + ' class="table-select-checkbox" ' + dataNameAttr + '>&nbsp;</input>'; 
            }
                
            
            return html;
        },
        
        _addDropDownItemsToList : function( ) 
        {
            var dropDownConfig = this._config.items;
            var dropDownList = "<ul class=\"dropdown-menu\">";
            
            if( dropDownConfig && dropDownConfig.length ) 
            {
            	for(var i = 0; i < dropDownConfig.length; i++) 
                {
                    var name = dropDownConfig[i].name;
                    var title = dropDownConfig[i].title;
                    var itemId  = "grdItem-" + actuate.common.web.util.Utility.createUniqueControlID( );
                    var item = "";

                    item = "<li><a id=\"" + itemId + "\" data-name=\"" + name + "\" href=\"#\">" + title + "</a></li>";
                    
                    //TODO: This is temporary. Cannot render <i> tag this way. change config in application level to send info like type and use getHtmlTag( ) to render the <a> tag
                    /*if( this._icons[name] && this._icons[name]['default'] ) 
                    {
                        item = "<li><a id=\"" + itemId + "\" data-name=\"" + name + "\" href=\"#\"><i class=" + this._icons[name]['default'] + "></i>" + title + "</a></li>";
                    }
                    else 
                    {
                        item = "<li><a id=\"" + itemId + "\" data-name=\"" + name + "\" href=\"#\">" + title + "</a></li>";
                    }*/
                    
                    this._addHandlerId( itemId );
                    dropDownList += item;
                }
            }
            
            dropDownList += "</ul>";
            
            return dropDownList;
        },
        
        _createdropDownButtonOptions : function( clsIcon, type, id, cls, title, label )
        {
        	if( ! label ) 
        	{
        		label = "";
        	}
        	var html = "<div title='" + label + "' class=\"btn-group\">";
        	//this is for adding css to the parent element. that is to the div element
        	if( this._config.listener.addAdditionalCssToElement ) 
        	{
        		var additionalCssClass = this._config.listener.addAdditionalCssToElement(this._config.data.name, cls);
            	
            	if( additionalCssClass ) 
            	{
            		html = "<div title='" + label + "' class=\"btn-group " + additionalCssClass + " \">";
            	}
        	}

            if( !cls ) 
            {
            	cls = "";
            }
            /*if( this._config.data.name == "actions") 
            {*/
                html += "<button type=\"button\" class=\"btn " + cls + "\" data-toggle=\"dropdown\">" + title+ "&nbsp;&nbsp; &nbsp;<span class=\"caret\"></span></button>";
            //}
            //This is not used anymore
/*            else 
            {
                html += "<button class=\"btn btn-inverse header-button acnewdropdownbutton\" data-toggle=\"dropdown\"><i class=\"icon-folder-close\"></i>&nbsp;&nbsp;" + title+ "&nbsp;&nbsp; &nbsp;<span class=\"caret\"></span></button>";
            }*/

            html += this._addDropDownItemsToList( );
            html += "</div>";
            return html;
        },
        
        _createButtonHtml : function( type, id, cls, title, state, label )
        {
        	var dataNameAttr 	= this._createNameValueAttr( "data-name", type );
        	var iconHtml = "";
        	var cssClass = cls;
        	
        	if( !cls ) 
            {
            	cls = "";
            }
        	
        	if( !label ) 
        	{
        		label = "";
        	}
        	
        	if( type == 'add' ) 
        	{
        		cls = 'btn-inner-green';
        		iconHtml = '<i class=\'icon-ygg-add icon-large\'></i>';
        	}else if(type == 'refresh' ) 
        	{
        		cls = 'btn-inner-green';
        		iconHtml = '<i class=\'icon-ygg-refresh icon-large\'></i>';
        	}
            var html = "<button title=\""+ label +"\" type=\"button\" "  + dataNameAttr + "  id=\"" + id + "\" class='btn " + cls + "\'>" + iconHtml + title +  "</button>";
			
            if( this._config.listener.wrapHtmlTemplate ) 
        	{
				html = this._config.listener.wrapHtmlTemplate(type, cssClass, html);
			}
            
            this._addHandlerId( id );
            
            return html;
        },
        
/*		_createAddButton : function(type, id, cls, title)
		{
			var dataNameAttr = " data-name='" + type + "'";
			var html = "<button type=\"button\" "  + dataNameAttr + "  id=\"" + id + "\" class='btn btn-inner-green'><i class='icon-ygg-add icon-large'></i>" + title +  "</button>";
			
			
        	if( this._config.listener.wrapHtmlTemplate ) 
        	{
				html = this._config.listener.wrapHtmlTemplate(type, cls, html);
			}

			this._addHandlerId( id );
			return html;
		},*/
        
        updateMenuItem : function( menuItem )
        {
			var menus = this._config.items;
			if ( menus )
			{
				for ( var i=0; i<menus.length; i++ )
				{
					var menu = menus[ i ];
					if ( !menu.data || !menu.data.name ) continue;
					
					if ( menu.data.name == menuItem.data.name )
					{
						var menuId = 'submenu' + i + '_' + this._id;
						var menuEl = actuate.common.web.$("#" + menuId );

						var anchorEl = menuEl.find( 'a' )[0];
						anchorEl.innerHTML = menuItem.title;
						
						if ( menuItem.isHidden )
						{
							menuEl.removeClass("show").addClass("hide");
						}
						else
						{
							menuEl.removeClass("hide");
						}
							
						break;
					}	
				}
			}        	
        },
        
		_createWrenchOptions : function( clsIcon, type, id, cls, title )
		{
			var wrenchId = id + "wrench";
			var html  = '<div class="dropdown">';
			var items =
			{
				icon : this._iconHtml( clsIcon )
			};
			
			html += this._wrenchIconHtml( clsIcon, type, id, cls, title, items );
		
			var menus = this._config.items;
			if ( menus )
			{
				html += '<ul id="' + wrenchId + '" class="dropdown-menu" role="menu" aria-labelledby="' + id + '">';

				for ( var i=0; i<menus.length; i++ )
				{
					var menu = menus[ i ];
					var menuId = 'submenu' + i + '_' + id; 
					var hideItem = "";
                    if ( menu.isHidden )
                	{
                    	hideItem = ' class="hide"';
                	}

                    html += '<li id="' + menuId + '"' + hideItem + '>';
                    
					html += this._getHTMLTag( menu );
					html += '</li>';
				}
	    		html += '</ul>';
			}
			html += "</div>";
			return html;
		},
		
		_createNameValueAttr : function( name, value )
		{
			var attr = " " + name + "='" + value + "'";
			return attr;
		},
		
		_wrenchIconHtml : function( clsIcon, type, id, cls, title, items )
		{
			var dataNameAttr 	= this._createNameValueAttr( "data-name", type );
			var roleAttr 		= this._createNameValueAttr( "role", "button" );
			var dataToggleAttr 	= this._createNameValueAttr( "data-toggle", "dropdown" );

			var clsAttr = "";
			if ( cls )
			{
				clsAttr = " " + cls;
			}
			clsAttr = this._createNameValueAttr( "class", "dropdown-toggle wrench" + clsAttr );

			var html = "<a " + dataToggleAttr + roleAttr + dataNameAttr + clsAttr + " class='icon-no-underline' style=\"text-decoration:none;\" id=\"" + id + "\">";
			
			for ( var key in items )
			{
				html +=  items[ key ];
			}
			
			if ( title )
			{	
				html += " " + title;
			}
			html += "</a>";
			
			return html;
		},
		
		_attachClickHandler : function( )
		{
			if ( !this._handler ) return;

			for ( var id = 0; id < this._handler.length; id++ )
			{	
				actuate.common.web.$("#" + this._handler[ id ] ).click(this._click);
			}	
		},
		
		_addHandlerId : function( id )
		{
			if ( !this._handler )
			{
				this._handler = [];
			}
			this._handler.push( id );
		},
		
		_anchorHtml : function( type, id, cls, title, items )
		{
			var dataNameAttr = " data-name='" + type + "'";
			var clsAttr = "";
			if ( cls )
			{
				clsAttr = " class='" + cls + "'";
			}

			var html = "<a href='#'" + dataNameAttr + clsAttr + " id=\"" + id + "\">";
			
			for ( var key in items )
			{
				html +=  items[ key ];
			}
			
			if(type != 'back')
			{
				if ( title )
				{	
					html += " " + title;
				}
			}
			
			html += "</a>";
			
			this._addHandlerId( id );
			return html;
		},
		
		_createAlertErrorHtml : function( type, id, cls, title, items )
		{
			var dataNameAttr = " data-name='" + type + "'";
			var clsAttr = "";
			if ( cls )
			{
				clsAttr = " class='" + cls + "'";
			}

			var html = "<div style=\"text-align:center\"><a href='#'" + dataNameAttr + clsAttr + " id=\"" + id + "\">";
			
			for ( var key in items )
			{
				html +=  items[ key ];
			}			
			
			html += "</a></div>";
			
			this._addHandlerId( id );
			return html;
		},
		
		_createDotCheckHtml : function( type, id, cls, title, items )
		{
			var dataNameAttr = " data-name='" + type + "'";
			var clsAttr = "";
			if ( cls )
			{
				clsAttr = " class='" + cls + "'";
			}

			var html = "<div "+ clsAttr +" style=\"text-align:center\">";
			
			for ( var key in items )
			{
				html +=  items[ key ];
			}
			
			if(type != 'back')
			{
				if ( title )
				{	
					html += " " + title;
				}
			}
			
			html += "</div>";
			
			this._addHandlerId( id );
			return html;
		},
		_iconHtml : function( clsIcon, title)
		{
			if ( !clsIcon ) return "";
			
			if ( title ) {
				var html = "<i class=\"" + clsIcon + "\" title=\""+ title + "\"></i>";
			}
			else {
				var html = "<i class=\"" + clsIcon + "\"></i>";
			}
			return html;
		},

		// Generates select all element
		_selectItemsHtml : function( type, id, cls, title, state )
        {
            var html = "<div class='btn-group'>";
            html += "<button class='btn' data-toggle='dropdown'>";
            var dataNameAttr = " data-name='" + type + "'";
            var checkboxId = id + "selectItems";
                        
            html += "<span style='width:13px;height:13px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"+   
                 	"<span class='caret'></span>";
            html += "</button>";
            
            html += this._addDropDownSelectToList(id, checkboxId);
            
            html += "<input style='position: absolute; z-index: 2000; left: 19px; top: 19px; width: 13px; height: 13px;' data-value='unchecked' data-name='" + type + "' id='" + checkboxId + "mask' class='checkbox-in-btn' type='checkbox'"+ state+" /> "  
            
            this._addHandlerId( checkboxId + 'mask');
            return html;
            
        },
        
        // Add dropdown to select list
        _addDropDownSelectToList : function(id, checkboxId)
        {
        	var dropDownList = "<ul class=\"dropdown-menu\">";
            
            var selectName = "selectItems" ;
            var selectTitle = "Select All";
            var unselectTitle = "Select None";
            
            var itemId  = "grdItem-" + actuate.common.web.util.Utility.createUniqueControlID( );
            var unselectId  = "grdItem-" + actuate.common.web.util.Utility.createUniqueControlID( );
                     
            var selectItem = "";
            
            selectItem = "<li><a data-value='checked' id=\"" + itemId + "\" data-name=\"" + selectName + "\" >" + selectTitle + "</a></li>";
            this._addHandlerId( itemId );
            dropDownList += selectItem;
            
            var unselectItem = "<li><a data-value='unchecked' id=\"" + unselectId + "\" data-name=\"" + selectName + "\">" + unselectTitle + "</a></li>";
            this._addHandlerId( unselectId );
            dropDownList += unselectItem;
            
            dropDownList += "</ul></div>";
            
            this._click = actuate.common.web.Method.bind2( this._selectItemsHandler, this, this._config.listener.onItemClick );
            this._config.listener.onItemClick = this._click;
                        
            return dropDownList;
        },
        
        // Select All handler
        _selectItemsHandler : function(cb ,type, event, data)
        {
        	var closestI  = null;
            closestI      = actuate.common.web.$('.checkbox-in-btn');
            var id = closestI.attr("id");
            if(cb)
            {
            	var data = {};
            	var state = (event.target.getAttribute('data-value') === "checked" ) ? "checked" : "unchecked";
                if( state == "checked" )
                {
                		closestI.prop('checked',true);
                }
                else 
                {
                		closestI.prop('checked',false);
                }
                data.data = state;
                data.id = id;
                event.data = data;
                cb( type, event, data );
            }
            
        },
        
		_searchHtml : function( clsIcon, type, id, cls, title )
		{
			//TODO: based on the size of the button adjust the text box height.
			var searchCss = "search";
			var buttonSize = "";
			if ( buttonSize )
			{
				searchCss += "-" + buttonSize;
			}
			var textId = id + "searchTxt";
			
			var html  = '<i class="icon-ygg-search"></i><input type="text" placeholder="Search" class="' + searchCss + '" id="' + textId + '">';
			html += '<i class="icon-ygg-close-circle search-delete-text-icon" style="display:none;"></i></input>';
			
			var items =
			{
				icon : this._iconHtml( clsIcon )
			};
			
			// drop down icon
			// html += this._anchorHtml( type, id, cls, title, items );
			
			// search icon
			//html += this._anchorHtml( type, id, cls + " acsearchPadRight", title, items );
			
			//html += this._anchorHtml( "clear", id + "searchClear", cls, title, { icon : this._iconHtml(  "icon-ygg-close" ) } );
			return html;
		}
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.control.Grid" );

/**
 * Construct a new Grid control class that can handle the different control used by the grid layout.
 * 
 */
actuate.common.web.widget.control.Grid.Column = actuate.common.web.Class.create( );
actuate.common.web.widget.control.Grid.Column.prototype =
{
		/**
		 <pre>
			var config =
			{
				items 	: columnItems,
				colSize	: size,
				handler : rowHandler
			}
		  </pre>
		 * @param config
		 */
		initialize : function( config )
		{
			this._config = config;
			this._createElement( );
		},

		/**
	     * default implementation class to create html element
	     */
	    _createElement : function()
	    {
	        var tagType = this._getHTMLTag();

	        this._element = new actuate.common.web.$(tagType);
	    },

	    _getHTMLTag : function( )
	    {
	    	var customCss = ( this._config.css ) ? " " + this._config.css : "";
	    	
	    	var template = this._config.template ? this._config.template : "<div class=\"span" + this._config.colSize + customCss + "\">";
	    	var header = this._config.colHeader;
	    	var name = "";
	    	var label = "";
	    	if ( header && header.items && header.items.data )
	    	{	
	    		name = header.items.data.name;
	    		label = header.items.data.label;
	    	}
	    	template = this._getTemplate( name, label, template );
	    	return template;
	    },
	    
	    _getTemplate : function( name, label, template )
	    {
	    	var template = template.replace( /{data.name}/g, name );
	    	template = template.replace( /{data.label}/g, label );
	    	if(name === "actionItems" || name === "checkbox" || name === "star")
	    	{
	    		template = template.replace( /{class.name}/g, "check-column" );
	    	}
	    	else if(name === "wrench")
	    	{
	    		template = template.replace( /{class.name}/g, "caret-column" );
	    	}
	    	else
	    	{
	    		var customCss = ( this._config.css ) ? this._config.css : "";
	    		template = template.replace( /{class.name}/g, customCss );
	    	}
	    	
	    	return template;
	    },
	    
	    getItems : function( )
	    {
	    	return this._config.items;
	    },
	    
	    getGridControl : function( )
	    {
	    	return this._gridControl;
	    },
	    
		/**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
            this._element.appendTo(appendTo);
            
			// append all the column items into the container.
			this._appendItems( );
		},

		_appendItems : function( )
		{
			var items 			= this._config.items;
			this._gridControl 	= [];
			var idxCount		= 0;
			
			var gridItem 		= null;
			if ( actuate.common.web.$.isArray( items ) )
			{
			   for ( var itemCount in items )
			   {
				   gridItem = this._appendItem( items[itemCount], this._element );
				   this._gridControl.push( gridItem );
			   }
			}
			else
			{
				gridItem = this._appendItem( items, this._element );
				this._gridControl.push( gridItem );
			}
			
		},
		
		_appendItem : function( item, appendTo )
		{
			var listenerCB = actuate.common.web.Method.bind( item.listener.onItemClick, item.listener );
			var click = actuate.common.web.Method.bind2( this._colHandler, this, listenerCB );
			
			// Override the item click event so that we can propagate 
			// additional data to the handler responsible of sending data to the backend. 
			item.listener.onItemClick = click;
			
			var gridControl = new actuate.common.web.widget.control.GridItem( item );
			gridControl.appendTo( appendTo );
			
			return gridControl;
		},
		
		_colHandler : function( )
		{
			// propagate data about this clicked item back to the row so
			// that the row can add additional data to this item that was just
			// clicked on.
			if ( this._config.handler )
			{
				this._config.handler.apply( this, arguments );
			}
		}
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.control.Grid" );

/**
 * Construct a new Grid control class that can handle the different control used by the grid layout.
 * 
 */
actuate.common.web.widget.control.Grid.Row = actuate.common.web.Class.create( );
actuate.common.web.widget.control.Grid.Row.prototype =
{
		_ROW_INDEX_ATTR 		: "row-index",
		_DEFAULT_COLUMN_COUNT 	: 12,
		_cols					: null, // handle to the different column object
		
		/**
		 * The default colCount if not specified is 12.
		 <pre>
			var config =
			{
				row 		: columns,
				colCount	: 12,
				rowIndex 	: index
			}
		  </pre>
		 * @param config
		 */
		initialize : function( config )
		{
			this._cols			= [ ];
			this._colIdx		= 0;
			this._config 		= config;
			this._colCount 		= this._DEFAULT_COLUMN_COUNT;
			if ( config.colCount )
				this._colCount = config.colCount;
			
			
			this._createElement( );
		},
		
		/**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
            this._element.appendTo(appendTo);
            
			// append all the column items into the container.
			this._appendItems( );
		},

		getData : function( row )
		{
			var data 	= this._config.row;
			var record 	= this._generateRecord( data );
			var ret =
			{
				'data' 		: record
			};

			return ret;
		},

		_generateRecord : function( data )
		{
			var record 	= null;
			var items 	= data.items;
			
			for ( var key in items )
			{
				var data = { };

				var colItems = items[ key ].items;
				if ( actuate.common.web.$.isArray( colItems ) )
				{
					var subItem = this._generateRecord( colItems );
					
					// merge the record items
					if ( subItem )
					{
						record = actuate.common.web.$.extend( {}, record, subItem );
					}
				}
				else if ( colItems ) // IE has the indexOf property which causes NPE
				{
					data.name 	= colItems.data.name;
					data.value 	= colItems.title;

					if ( data.name )
					{
						if ( !record )
						{
							record = { };
						}
						record[ data.name ] = data.value;	
					}
				}
			}	
			
			return record;
		},
		
		_appendItems : function( )
		{
			if ( !this._config.row )
			{
				return;
			}
			
	        var customCss = this._config.row["css"];
	        if ( customCss )
        	{
	        	this._element.addClass( customCss );
        	}
	        
			
			var i 			= 0;
			var colIdx 		= 0;
			var row 		= this._config.row["items"];
			var template	= this._config.row["template"];
			var colSize 	= this._calcColSize( row );
			var colHeaders	= this._config.colHeaders;
			var rowHandler	= actuate.common.web.Method.bind( this._rowHandler,	this );
			
			for ( var key in row )
			{
				// Ignore the rest of the items in the row if it exceeds the number of column
				if ( i >= this._colCount ) break;
				
				var colItems = row[ key ].items;
				
				if ( colItems.isHidden == true ) continue;
				
				var curColSize 	= row[ key ].colSize ? row[ key ].colSize : colSize;
				var colHeader 	= null;
				var css 		= row[ key ].css;
				if ( colHeaders && colHeaders.items )
				{	
					colHeader = colHeaders.items[key];
				}	
				var columnConfig = 
				{
						items		: colItems,
						colSize		: curColSize,
						css			: css,
						handler		: rowHandler,
						template	: template,
						colHeader	: colHeader
				};
				
				var column = new actuate.common.web.widget.control.Grid.Column( columnConfig );
				this._appendColumn( column, colIdx++ )
				
				i += curColSize;
			}
		},
		
		getColumn : function( idx )
		{
			return this._cols[ idx ];
		},
		
		_appendColumn : function( column, idx )
		{
			column.appendTo( this._element );
			this._cols[ idx ] = column;
		},
		
		_rowHandler : function( cb, type, event, data )
		{
			if ( cb )
			{
				var rowData = null;
				rowData = {
							    event: data,
							    row : this.getData()
					      };
				
				cb( type, rowData );
			}
		},

		/**
	     * default implementation class to create html element
	     */
	    _createElement : function()
	    {
	        var tagType = this._getHTMLTag();

	        this._element = new actuate.common.web.$(tagType);
	    },

	    _getHTMLTag : function( )
	    {
	    	var rowIndex = this._config.rowIndex;
	    	var rowAttr = this._getRowIndexAttr( rowIndex );
	    	
	    	var template = this._config.template ? this._config.template : "<div {rowAttr} class='row-fluid'>";
	    	var rowHtml = this._getTemplate( null, rowAttr, template );
	    	return rowHtml;
	    },
	    
	    _getTemplate : function( id, rowAttr, template )
	    {
	    	template = template.replace(/{rowAttr}/g, rowAttr);
	    	template = template.replace(/\{id\}/g, id);
	    	return template;
	    },
	    
		/**
		 * Returns attribute name/value pair of the row index
		 * @param index row index
		 * @returns {String}
		 */
		_getRowIndexAttr : function( index )
		{
			if ( index === undefined ) return "";
			
			return " " + this._ROW_INDEX_ATTR + "='" + index + "'";
		},
		
		/**
		 * 
		 * @param items
		 * @returns
		 */
		_getItemsLength : function( items )
		{
			if ( !items ) return 0;
			
			if ( items.length ) return items.length;
			
			var len=0;
			for(var key in items)
			{
				len += Number( items.hasOwnProperty(key) );
			}
				
			return len;
		},
		   
	   /**
	    * Calculate the column size evenly based on the number items in the row. 
	    * @return int the integer value of the column size
	    */
	   _calcColSize : function( colItems )
	   {
		   var colSize = 1;
		   var nItems = this._getItemsLength(colItems);
		   if ( nItems < this._colCount ) colSize = Math.floor( this._colCount/nItems );
		   
		   return colSize;
	   }	    
};actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new TextField class
 * 
 */

actuate.common.web.widget.control.HiddenField = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.InputTag,
{
	/**
	 * initialize - Calls the _createTextField function
	 * 
	 * @param options
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings 	= { value : "" };
    	settings		= actuate.common.web.$.extend( {}, settings, config );
    	settings.type 	= "hidden";
    	
    	actuate.common.web.widget.control.HiddenField.superclass.initialize.call( this, settings );
	}
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new label class
 * 
 */

actuate.common.web.widget.control.Label = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.Control,
{
	_text : null,

	/**
	 * initialize
	 * 
	 * @param config
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings = actuate.common.web.$.extend( {}, {}, config );
    	this._text = settings.text;
    	
    	delete settings.type;
    	delete settings.text;
    	delete settings.allowblank;
    	
    	actuate.common.web.widget.control.Label.superclass.initialize.call( this, settings );
	},

	/**
	 * initialize the component with other default values
	 */
	_initComponent : function( )
	{
	    actuate.common.web.widget.control.Label.superclass._initComponent.call( this );
		this.setText( this._text );
	},
	
	/**
	 * Sets the text value for this label element
	 * @param text
	 */
	setText : function( text )
	{
		this._text = text;
		this._element.text( this._text );
	},
	
	/**
	 * Sets the value for this label element
	 * @param text
	 */
	setValue: function( value )
	{
        this._element.attr("value", value);
        this.setText(value);
	},
	
	   /**
     * gets the value for this label element
     * @param text
     */
    getText: function( )
    {
        return this._text;
    },
    
    updateForValue : function( value )
    {
    	this._element.attr("for", value);
    },
    
	/**
	 * Returns the default label tag syntax to create the control with
	 * @returns {String}
	 * 		<p>&lt;input&gt;</p>
	 */
	_getHTMLTag : function( )
	{
		return "<label>";
	}
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new ListBox class
 * 
 */

actuate.common.web.widget.control.ListBox = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.Control,
{
    /**
     * initialize 
     * 
     * @param options
     * @return
     */

    initialize : function( config )
    {
        if ( this.__extending )
            return;
        
        
        var settings = actuate.common.web.$.extend( {}, {}, config );
        
        actuate.common.web.widget.control.ListBox.superclass.initialize.call( this, settings );
    },
    
    setSize : function(size)
    {
    	//NOT supported at this time.
    },
    
    _getStyle : function( )
    {
    	var style = this._curSettings.style;
    	if ( style )
    	{
    		return style;
    	}	
    	
    	return "";
    },
    
    _getLegacyHTMLTag : function( cssClass, style )
    {
    	var template = '<input type="hidden">' + 
							'<a class="btn actuListBoxDisplayButton dropdown-toggle cliptext ' + cssClass + ' " data-toggle="dropdown" style="' + style + '"></a>' +
							'<a class="btn btn-secondary dropdown-toggle actuListBoxDropdownButton" data-toggle="dropdown">' +
								'<span class="caret"></span>' +
							'</a>';
    	
    	return template;
    },
    
    _getMinTextWidth : function( )
    {
    	return 15;
    },
    
    _createStyleWidthText : function( width )
    {
    	if ( !width ) return "";
    	
    	var minwidth	= "min-width: " + width + 'px;';
    	var maxWidth 	= "max-width: " + width + 'px;';
    	
    	var style = 'style="' + minwidth + maxWidth + '"';
    	
    	return style;
    },
    
    _dropDownListMinWidth : function( userWidth )
    {
    	var listWidth 	= this._getUXPaddingWidth( ) + this._getMinTextWidth( );
    	var width 		= listWidth;
    	if ( userWidth && userWidth > width )
    	{	
    		width = userWidth;
    	}

    	if ( width < listWidth )
		{
    		width = listWidth;
		}
    	
    	return width;
    },
    
    _getUXPaddingWidth : function( )
    {
		var btnBorder 	= 1 + 1; 	//	left and right padding: border: 1px solid #CCCCCC
		var btnPadding 	= 12 + 12; 	//	left and right padding: .ac .btn{ padding: 4px 12px }
		var caretPadding= 4 + 4; 	//	left and right border:
							    	//	border-left: 4px solid rgba(0, 0, 0, 0);
							    	//  border-right: 4px solid rgba(0, 0, 0, 0);
		var extraPadding= 3 + 3;	//  haven't figured out where this extra 6 pixel is coming from	

		var minWidth = btnBorder + btnPadding + caretPadding + extraPadding;
		
		return minWidth;
    },
    
    /**
     * @param {Integer} width
     * @return 0 if width is not set by end user. Otherwise, return a new suggested width
     */
    _getBtnBoxMinWidth : function( width )
    {
    	if ( !width ) return 0;
    	
    	var minWidth 		= this._getUXPaddingWidth( );
		var minTextPadding 	= this._getMinTextWidth( );	// minimum text padding just in case it is one character list.
		
		var newWidth = width - minWidth;
		
		// if this is explicitly defined width by consumer,
		// make sure the width meets the minimum size.
		if ( this._width && newWidth < minTextPadding )
		{
			newWidth = minTextPadding
		}	
		
		return newWidth;
    },
    
    _getDefaultListBoxTemplate : function( )
    {
    	var width 	= this._width;
    	width 		= this._getBtnBoxMinWidth( width );
    	var style 	= this._createStyleWidthText( width );
    	var template=  
						'<button class="actuListBoxDropdownButton actuListBoxDropdownList btn" data-toggle="dropdown">' +
							'<span class="actuListBoxDisplayButton dropdown-trunc-text"' + style + '></span>' +
							'&nbsp;&nbsp;<span class="caret"></span>' +
						'</button>';

    	return template;
    },
    
    _getMainContMinWidth : function( )
    {
    	var uxWidth = this._getUXPaddingWidth( );
    	var txtWidth = this._getMinTextWidth( );
    	
    	return uxWidth + txtWidth;
    },
    
    _getHTMLTag : function( )
    {
        this._divElement = actuate.common.web.$('<div class="btn-group actuListBoxContainer"></div>');        
        
        var htmlTemplate 	= this._getDefaultListBoxTemplate( );
        this._listBoxButton = actuate.common.web.$( htmlTemplate );

		this._list = actuate.common.web.$('<ul class="actuListBoxDropdownList dropdown-menu"></ul>');
        
        this._listBoxButton.appendTo(this._divElement);
        this._list.appendTo(this._divElement);

    	var myCssClass 		= this._css ? this._css  : '';
    	var wrapTemplate 	= '<div class="'  + myCssClass + '"></div>';
    	var wrapEl = actuate.common.web.$( wrapTemplate );
        this._divElement.appendTo( wrapEl );
        
        return wrapEl;
    },
    
    resetList : function( list, defaultOption, callBack )
    {
    	this._list.empty( );
    	this.addToList( list, defaultOption, callBack );
    },
    
    /**
     * sets appendTo container for this element.
     * @param appendTo
     */
    appendTo : function(appendTo)
    {
    	actuate.common.web.widget.control.ListBox.superclass.appendTo.call( this, appendTo );
        this._divElement.click(actuate.common.web.Method.bind(this._scrollToElement, this));
    },

    addToList : function( list, defaultOption, callBack )
    {
    	var flag = true;
    	this._listOfItems = list;
    	
    	this._idList = {};
        for(var value in list)
        {	
        	var displayName = list[value];
         	if( typeof defaultOption == "undefined" && flag == true ) 
        	{
        		this.setValue(value, displayName);
        		flag = false;
        	}
        	else if( value == defaultOption )
        	{
           		this.setValue(value, displayName);
        	}

        	var id 				= 'aclist-' + actuate.common.web.util.Utility.createUniqueControlID( );
        	this._idList[value] = id;
        	var encodedText 	= actuate.common.web.$("<div/>").text( displayName ).html();
        	var listItem		= actuate.common.web.$('<li id=' + id + '><a class="trunc" title="' + encodedText + '">' + encodedText + '</a></li>');

            listItem.click({value : value, name: displayName}, actuate.common.web.Method.bind(this._onSelect, this));
            listItem.hover(actuate.common.web.Method.bind(this._removeDefaultHighlight, this));
            this._list.append(listItem);
        }
        
        if( callBack )
        {
        	this._callBack = callBack;
            actuate.common.web.Method.bind(this._callBack, this);
        }
    },
    
    //This function is to remove the highlight from the current selected option, when the mouse is hovered on some other item in the list 
    _removeDefaultHighlight : function ( )
    {
    	if ( this._scrollTo )
    	{	
	    	this._scrollTo.css('background-color', '');
	    	this._scrollTo.find('a').css('color', '');
    	}
    },
    
    /**
     * gets the value of this element
     */
    
    getValue : function( )
    {
    	var value = this._divElement.attr("value");
        return value;
    },
    
    /**
     * Sets the value of this element.
     * 
     * @param value to set
     */
    
    setValue : function(value)
    {
    	this._divElement.attr("value", value);
    	
    	var displayValue = this._listOfItems[value];
    	if ( !displayValue )
    	{
    		// if the actual value does not exist, set the display value to be the same as the actual value.
    		displayValue = value;
    	}
    	
    	var displayEl = this._divElement.find(".actuListBoxDisplayButton");
    	displayEl.text( displayValue );
    	this._divElement.attr('title', displayValue);
    },
    
    _onSelect : function(event)
    {
        this._divElement.attr("value", event.data.value);
        
    	var displayEl = this._divElement.find(".actuListBoxDisplayButton");
    	
    	displayEl.text(event.data.name);
    	this._divElement.attr('title', event.data.name);
        
        if( this._callBack ) 
        {
        	this._callBack( this.getValue( ) );
        }
    },
    
    _setDefaultBtnWidth : function( )
    {
    	var mainContainer 	= this._divElement[0];
    	var width 			= mainContainer.offsetWidth;

    	// If width is not specified by end user, set the width based on the default size of the main container.
    	if ( !this._width && !this._isWidthInitialized )
    	{	
    		var spanEl = this._divElement.find(".actuListBoxDisplayButton");
    		this._isWidthInitialized = true;

    		var minWidth = this._getBtnBoxMinWidth( width );
    		spanEl.css(
					{
						'min-width' : minWidth,
						'max-width' : minWidth
					}
	    			);
    	}
    	
    	return width;
    },
    
    _updateDropDownWidth : function( )
    {
    	var width = this._setDefaultBtnWidth( );
    	
    	var ulEl = this._divElement.find(".actuListBoxDropdownList").closest('ul');
    	ulEl.css(
					{
						'min-width' : width,
						'max-width' : width
					}
    			);
    	
    },
    
    //This is for scrolling to the default element in the list and highlighting it when the dropdown list box is clicked.
    _scrollToElement : function( ) 
    {
    	// update the drop down list box based on the initial text control.
    	this._updateDropDownWidth( );
    	
    	// TODO: this does not look like it is safe search.
    	var classes = '.actuListBoxContainer.' +  this._curSettings.name;
    	actuate.common.web.$(classes).toggleClass('open');
    	
    	var container = this._list;
    	
        var id = this._idList[this.getValue()];
        if(id)
        {
        	this._scrollTo = this._divElement.find(".actuListBoxDropdownList").find('#' + id);
        	container.scrollTop(
        			this._scrollTo.offset().top - container.offset().top + container.scrollTop()
        		);
        	this._scrollTo.css('background-color', '#303030');
        	this._scrollTo.find('a').css('color', '#FFFFFF');
        }
        
    //	actuate.common.web.$(classes).toggleClass('open');
    }
    
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Multi Select ListBox class
 * 
 */

actuate.common.web.widget.control.MultiSelectListBox = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.Control,
{
	_addedItems   : null,
	_removedItems : null,
	
    /**
     * initialize 
     * 
     * @param options
     * @return
     */
    
    initialize : function( config )
    {
        if ( this.__extending )
            return;
        
        var settings = actuate.common.web.$.extend( {}, {}, config );
        
        this._title = config.title;
        
        if( config.filter ) 
        {
        	this._filterConfig = config.filter
        }
        
        delete settings.title;
        delete settings.filter;
        
        this._addedItems = {};
        this._removedItems = {};
        //Keeping track of all items.. i.e items that are retrieved even after search
        this._leftAllItems = {};
        this._rightAllItems = {};
        this._searchFilters = new Array();
        
        actuate.common.web.widget.control.MultiSelectListBox.superclass.initialize.call( this, settings );
        actuate.common.web.$(this._leftMultiSelectBox).attr('multiple','multiple');
        actuate.common.web.$(this._rightMultiSelectBox).attr('multiple','multiple');
        
        var renderSearchFilter = false;
        
        if( config.filter && config.filter.left ) 
        {
        	this.renderSearchBox( this._leftSearchDiv, config.filter.left.callBack, this._refreshLeftListBoxList, config.filter.left.title );
        	renderSearchFilter = true;
        }
        
        if( config.filter && config.filter.right ) 
        {
        	this.renderSearchBox( this._rightSearchDiv, config.filter.right.callBack, this._refreshRightListBoxList, config.filter.right.title );
        	renderSearchFilter  = true;
        }

        if( ! renderSearchFilter )
        {
        	this._leftSearchDiv.remove();
        	this._rightSearchDiv.remove();
        }
    },
    
    _getHTMLTag : function( )
    {
        var mainContainer = actuate.common.web.$('<div></div>');        
        
        var elementsLeft = this._getMultiSelectListBoxTag(this._title.left, 'left');
        var leftContainer = elementsLeft.container;
        this._leftMultiSelectBox = elementsLeft.multiSelectBox;
        this._leftSearchDiv = elementsLeft.searchBox;
        
        var middleContainer = actuate.common.web.$('<div class="multiselectlistboxcontainer assign-column assign-column-thin"><button id="forwardButton" class="btn btn-success assign-group-move-btn"><i class="icon-ygg-sort-right icon-large"></i></button><br><button id="backwardButton" class="btn btn-success assign-group-move-btn"><i class="icon-ygg-sort-left icon-large"></i></button></div>');
        
        var elementsRight = this._getMultiSelectListBoxTag(this._title.right, 'right');
        var rightContainer = elementsRight.container;
        this._rightMultiSelectBox = elementsRight.multiSelectBox;
        this._rightSearchDiv = elementsRight.searchBox;
        
        this._forwardButton = middleContainer.find('#forwardButton');
        this._forwardButton.click(actuate.common.web.Method.bind2( this.addRemoveItems, this, this._leftMultiSelectBox, this._rightMultiSelectBox ));
        
        this._backwardButton = middleContainer.find('#backwardButton');
        this._backwardButton.click(actuate.common.web.Method.bind2( this.addRemoveItems, this, this._rightMultiSelectBox, this._leftMultiSelectBox ));
        
        leftContainer.appendTo(mainContainer);
        middleContainer.appendTo(mainContainer);
        rightContainer.appendTo(mainContainer);
        
        if( this._filterConfig && this._filterConfig.helpText ) 
        {
        	var helpTextContainer = actuate.common.web.$('<div style="width:500px;padding-left:10px;" name="helptext">' + this._filterConfig.helpText + '</div>');   
            helpTextContainer.appendTo(mainContainer);
        }
        
        return mainContainer;
    },
    
    _getMultiSelectListBoxTag : function(title, leftRight) 
    {
    	var container = actuate.common.web.$('<div class="multiselectlistboxcontainer"></div>');
        var title = actuate.common.web.$('<div><h4 style="font-weight:900;" align="left">' + title + '</h4></div>');
        var searchId = actuate.common.web.util.Utility.createUniqueControlID();
        searchDiv = actuate.common.web.$('<div style="height: 50px;" name="search" id="' + searchId + '"></div>');
        
        title.appendTo( container );
        var multiSelectBox = actuate.common.web.$('<select name=' + leftRight + ' style="margin-top: 10px;" size="20">');
        multiSelectBox.appendTo( container );
        searchDiv.appendTo( container );
        
        var elements = 
        {
        		searchBox  	   : searchDiv,
        		multiSelectBox : multiSelectBox,
        		container      : container
        }
        
        return elements;
    },
    
    /**
     * sets appendTo container for this element.
     * @param appendTo
     */
    appendTo : function(appendTo)
    {
    	actuate.common.web.widget.control.MultiSelectListBox.superclass.appendTo.call(this, appendTo);
    	this.attachEvents();
    },
    
    _unbindEvent : function( element, event ) 
    {
    	element.unbind(event);
    },
    
    attachEvents : function() 
    {
    	this._unbindEvent(this._forwardButton, 'click');
    	this._forwardButton.click(actuate.common.web.Method.bind2( this.addRemoveItems, this, this._leftMultiSelectBox, this._rightMultiSelectBox ));
    	this._unbindEvent(this._backwardButton, 'click');
    	this._backwardButton.click(actuate.common.web.Method.bind2( this.addRemoveItems, this, this._rightMultiSelectBox, this._leftMultiSelectBox ));
    	
    	//This is because after clicking another category tab and coming back to this tab, the element loses all events attached to it. So we need to re-attach it.
    	for( var i = 0; i < this._searchFilters.length; i++ ) 
    	{
    		var searchBox = this._searchFilters[i];
    		searchBox.attachEvents();
    	}
    },
    
    renderSearchBox : function( container, searchCallBack, refreshListCallBack, title ) 
    {
    	if( searchCallBack ) 
    	{
    		var config = 
        	{
        			width 				 : '215px',
        			placeholder 		 : title,
        			searchCallBack		 : searchCallBack,
        			refreshListCallBack  : actuate.common.web.Method.bind( refreshListCallBack, this )
        	}
        	
        	var searchBox = new actuate.common.web.widget.control.SearchBox( config );
        	searchBox.appendTo(container);
        	this._searchFilters.push(searchBox);
    	}
    },
    
    //TODO: _refreshRightListBoxList and _refreshLeftListBoxList can be merged into one. Atleast most of the code.
    _refreshLeftListBoxList : function( config ) 
    {
    	this._leftMultiSelectBox.empty();
    	var searchFilter = this._leftSearchDiv.find('input').val();
    	
    	var items = config.items;
    	
    	var searchFilter = this._leftSearchDiv.find('input');
    	
    	if( searchFilter ) 
    	{
    		//Iterate the items that have been moved to the left box and check if they have match with the text entered in the filter box
    		for( var item in this._removedItems ) 
        	{
    			var name = this._removedItems[item].name;
    			var value = this._removedItems[item].value;
    			var searchFilterLength = searchFilter.val().length;
    			
        		if( name.substring(0,searchFilterLength).toLowerCase()  == searchFilter.val().toLowerCase() ) 
        		{
        			var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
            		this._leftMultiSelectBox.append("<option id=\"" + uniqueID +  "\" value=\"" + value +  "\" title=\"" + name + "\">" + name + "</option>");
        		}
        	}
    	}

    	for( var i = 0; i < items.length; i++ ) 
    	{
    		var item = items[i];
    		var name = item.name;
    		var value = item.value;
    		
    		//Do not display items that already exist on the right. And, do not display items that have been rendered by the previous for.. loop
    		if( ! this._rightAllItems[name] && ! this._removedItems[name] ) 
    		{
    			this._leftAllItems[name] = name;
    			var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
        		this._leftMultiSelectBox.append("<option id=\"" + uniqueID +  "\" value=\"" + value +  "\" title=\"" + name + "\">" + name + "</option>");
    		}
    	}
    },
    
    //TODO: _refreshRightListBoxList and _refreshLeftListBoxList can be merged into one function. Atleast most of the code.
    _refreshRightListBoxList : function( config ) 
    {
    	this._rightMultiSelectBox.empty();
    	
    	var items = config.items;
    	
    	var searchFilter = this._rightSearchDiv.find('input');
    	
    	if( searchFilter ) 
    	{
    		//Iterate the items that have been moved to the right box and check if they have match with the text entered in the filter box
    		for( var item in this._addedItems ) 
        	{
    			var name = this._addedItems[item].name;
    			var value = this._addedItems[item].value;
    			var searchFilterLength = searchFilter.val().length;
    			
        		if( name.substring(0,searchFilterLength).toLowerCase()  == searchFilter.val().toLowerCase() ) 
        		{
        			var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
            		this._rightMultiSelectBox.append("<option id=\"" + uniqueID +  "\" value=\"" + value +  "\" title=\"" + name + "\">" + name + "</option>");
        		}
        	}
    	}

    	//Do not display items that already exist on the left. And, do not display items that have been rendered by the previous for.. loop
    	for( var i = 0; i < items.length; i++ ) 
    	{
    		var item = items[i];
    		var name = item.name;
    		var value = item.value;
    		
    		if( ! this._leftAllItems[name] && ! this._addedItems[name] ) 
    		{
    			this._rightAllItems[name] = name;
    			var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
        		this._rightMultiSelectBox.append("<option id=\"" + uniqueID +  "\" value=\"" + value +  "\" title=\"" + name + "\">" + name + "</option>");
    		}
    	}
    },
    
    addRemoveItems : function( fromContainer, toContainer ) 
    {
    	var fromLeftOrRight = fromContainer.attr('name');
        var selectedValues = fromContainer.val();
        
        if( selectedValues ) 
        {
            for(var i=0; i < selectedValues.length; i++) 
            {
            	var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
            	var option = fromContainer.find( "option[value=\"" + selectedValues[i] + "\"]" )
            	optionName = option.text();
            	option.remove(); 
            	
                toContainer.prepend("<option id=\"" + uniqueID +  "\" value=\"" + selectedValues[i] +  "\" title=\"" + optionName + "\">" + optionName + "</option>").css('width', toContainer.css('width'));
                
                var item = 
            	{
            		name  : optionName,
            		value : selectedValues[i]
            	}
                
                if( fromLeftOrRight == 'left' ) 
                {
                	delete this._leftAllItems[optionName];
                	this._rightAllItems[optionName] = optionName;
                	
                	if( this._removedItems && this._removedItems[selectedValues[i]] ) 
                	{
                		delete this._removedItems[selectedValues[i]];
                	}
                	else 
                	{
                		this._addedItems[selectedValues[i]] = item;
                	}
                }
                else 
                {
                	delete this._rightAllItems[selectedValues[i]];
                	this._leftAllItems[selectedValues[i]] = selectedValues[i];
                	
                	if( this._addedItems && this._addedItems[selectedValues[i]] ) 
                	{
                		delete this._addedItems[selectedValues[i]];
                	}
                	else 
                	{
                		this._removedItems[selectedValues[i]] = item;
                	}
                }
            } 
        }
    },
    
    addToList : function( list, defaultItems )
    {
    	this._defaultItems = defaultItems;
        //Move default selected items to the right box
    	var defaultListMap = {};
    	
        if( defaultItems ) 
        {
            for(var j=0; j < defaultItems.length; j++) 
            {
                var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
                defaultListMap[defaultItems[j].name] = defaultItems[j].name;
                
                if( ! this._rightAllItems[defaultItems[j].name] ) 
                {
                	this._rightAllItems[defaultItems[j].name] = defaultItems[j].name;
                }

                this._rightMultiSelectBox.append("<option id=\"" + uniqueID +  "\" value=\"" + defaultItems[j].value +  "\" title=\"" + defaultItems[j].name + "\">" + defaultItems[j].name + "</option>");
            }
        }
        
        //Use defaultListMap to fill in items in the left box
        if( list ) 
        {
            for(var i=0;i < list.length; i++)
            {
                var uniqueID = actuate.common.web.util.Utility.createUniqueControlID();
                
                var name = list[i].name;
                
                if( ! defaultListMap[name] ) 
                {
                	 if( ! this._leftAllItems[name] ) 
                     {
                     	this._leftAllItems[name] = name;
                     }

                	 this._leftMultiSelectBox.append("<option id=\"" + uniqueID +  "\" value=\"" + list[i].value + "\" title=\"" + list[i].name + "\">" + name + "</option>");
                }
            } 
        }
    },
    
    /**
     * gets the value of this element
     */
    getValue : function()
    {
    	var config = {};

    	config.addedItems = this._convertObjectToArray(this._addedItems);
    	config.removedItems = this._convertObjectToArray(this._removedItems);
    	
    	return config;
    },
    
    _convertObjectToArray : function( obj ) 
    {
    	return actuate.common.web.$.map(obj, function(value, index) {
    	    return [value.value];
    	});
    }
        
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Radio class
 * 
 */

actuate.common.web.widget.control.Password = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.InputTag,
{
	/**
	 * initialize
	 * 
	 * @param config
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings 	= { value : "" };
    	settings 		= actuate.common.web.$.extend( {}, settings, config );
    	settings.type 	= 'password';
    	
    	actuate.common.web.widget.control.Password.superclass.initialize.call( this, settings );
	}
	
});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new Radio class
 * 
 */

actuate.common.web.widget.control.Radio = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.InputTag,
{
	_click : null,
	
	/**
	 * initialize
	 * 
	 * @param config
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings = actuate.common.web.$.extend( {}, {}, config );
    	settings.type = 'radio';
    	this._click = settings.click;
    	
    	actuate.common.web.widget.control.Radio.superclass.initialize.call( this, settings );
    	
        if( config && config.value )
        {
            this.setValue( config.value );
        }
	},
	
	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
	    actuate.common.web.widget.control.Radio.superclass.appendTo.call( this, appendTo );
		actuate.common.web.$(this._element).click(this._click);
	},
	
    /**
     * Checks this radio button if value provided equals to value it holds.
     * If no value has been initialized - will just set the value.
     * 
     * @param value to set
     */
    setValue : function(value)
    {
        if( !this._element.attr('value') )
        {
        	// if it is not set, set it.
            actuate.common.web.widget.control.Radio.superclass.setValue.call( this, value );
        }
        else if(this._element.attr('value') === value)
        {
            this._element.attr('checked', 'checked');
        }
        else
        {
            this._element.removeAttr('checked');
        }
    },
    
    /**
     * Tells whether this radio is checked.
     */
    isChecked : function( )
    {
        return this._element.attr('checked') === 'checked';
    },
    
    getSelectedValue : function( )
    {
    	var name = this._element.attr('name');
    	
    	//TODO: this may not be unique enough.
    	var lastChecked = actuate.common.web.$('input[name='+ name +']:radio:checked');
    	return lastChecked.val();
    }

});
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new SearchBox class
 * 
 */

actuate.common.web.widget.control.SearchBox = actuate.common.web.Class.create();
actuate.common.web.widget.control.SearchBox.prototype =
{
	/**
	 * initialize
	 * 
	 * @param config
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings = actuate.common.web.$.extend( {}, {}, config );
    	this._filterConfig = config;
	},
	
    /**
     * sets appendTo container for this element.
     * @param appendTo
     */
    appendTo : function( appendTo )
    {
    	var me = this;
    	var config = 
    	{
    			width 		: this._filterConfig.width,
    			placeholder : this._filterConfig.placeholder
    	}
    	
    	var searchBox = actuate.common.web.$('<div style="margin-right:2px;" class="header-bar-search-box"></div>');
    	var textBox = new actuate.common.web.widget.control.TextField( config );
    	textBox.appendTo(searchBox);
    	
    	this._deleteIcon = actuate.common.web.$('<i class="icon-ygg-close-circle search-delete-text-icon" style="display:none;"></i>');
    	this._deleteIcon.appendTo( searchBox );
    	searchBox.appendTo( appendTo );
    	
    	this._textBoxElement = appendTo.find("input");
    	this._textBoxElement.css('padding-left', '1px');
    	this._textBoxElement.css('padding-right', '1px');
    	
    	this.attachEvents();
    },
    
  //This is because after clicking another category tab and coming back to this tab, the element loses all events attached to it. So we need to re-attach it.
    attachEvents : function() 
    {
    	var timer;
    	var me = this;
    	
    	this._unbindEvent(this._textBoxElement, 'keyup');
    	
    	this._textBoxElement.keyup(actuate.common.web.Method.bind2(function(e){
    		
    		clearTimeout(timer);
    		
    		timer = setTimeout(function() {
    			if(e.keyCode != 0)
    	    	{
    	       	   if(e.keyCode != 13)
    	       	   {
    	       		   data = me._textBoxElement.val() ;
    	       	   }
    	       	me._deleteIcon.css("display","block");
    	    	}
    	    	else
    	    	{
    	    	   data = me._textBoxElement.val().substring(0, me._textBoxElement.val().length-1);
    	      	}
    	    	
    	    	var refreshListCallBack = actuate.common.web.Method.bind( me._filterConfig.refreshListCallBack, me );
    	    	
    	    	var searchConfig = 
        		{
        				filter  				: data,
        				refreshListCallBack		: refreshListCallBack
        		} 
    			
    			me._filterConfig.searchCallBack(searchConfig);
    		} , 500);
	    	
	    	
    	}, this._textBoxElement));
    	
    	this._unbindEvent(this._deleteIcon, 'click');
    	
    	this._deleteIcon.click(function(e){
	    	data = "";
	    	me._textBoxElement.val("");
	    	
	    	var refreshListCallBack = actuate.common.web.Method.bind( me._filterConfig.refreshListCallBack, me );
	    	
	    	var searchConfig = 
    		{
    				filter  				: data,
    				refreshListCallBack		: refreshListCallBack
    		} 
			
			me._filterConfig.searchCallBack(searchConfig);
	    	
	    	me._deleteIcon.css("display","none");
	    });
    },
    
  //This is because after clicking another category tab and coming back to this tab, the element loses all events attached to it. So we need to re-attach it.
    _unbindEvent : function( element, event ) 
    {
    	element.unbind(event);
    }
}
actuate.common.web.Package.define("actuate.common.web.widget.control");

/**
 * Construct a new TextField class
 * 
 */

actuate.common.web.widget.control.TextField = actuate.common.web.Class.extendClass( actuate.common.web.widget.control.InputTag,
{
	/**
	 * initialize - Calls the _createTextField function
	 * 
	 * @param options
	 * @return
	 */

	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
    	var settings 	= { value : "" };
    	settings		= actuate.common.web.$.extend( {}, settings, config );
    	settings.type 	= "text";
    	
    	actuate.common.web.widget.control.TextField.superclass.initialize.call( this, settings );
	}
});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.dialog");

/**
 * Construct a new add edit dialog
 * 
 */
actuate.common.web.widget.dialog.AddEditDialog = actuate.common.web.Class.create();
actuate.common.web.widget.dialog.AddEditDialog.prototype = 
{
	_config 	: null,
	_listener	: null,

   	/**
   	 * config =
   	 * {
   	 * 		id				: addeditId,
   	 * 		mainId			: mainId,
   	 * 		titleKey		: titleKey,
   	 * 		operation		: operation,
   	 * 		renderer 		: renderer,
   	 * 		dataProcessor	: dataProcessor,
   	 *      features        : features
   	 * }
   	 * @param config configuration attributes used to show and process the add edit dialog
   	 */
   	initialize : function( config )
   	{
        if ( this.__extending )
            return;
        
   		this._config = config;
   		this._listener = new actuate.common.web.widget.layout.LayoutListener( );
   	},
   	
   	showAddEdit : function( show )
   	{
        var mainContainer = actuate.common.web.$( '#' + this._config.mainId );
        var dlg = actuate.common.web.$( '#' + this._config.id );
        
        if ( show )
        {
        	mainContainer.hide();
        	dlg.show();
        }
        else
    	{
        	mainContainer.show();
        	dlg.hide();
    	}
   	},
   	
   	showDialog : function( )
   	{
   		var me = this;
    	var dlgCallback = function( type, data )
    	{
        	switch ( type )
        	{
        		case 'save':
        			if ( data )
        			{
        				me.sendDlgData( data ); 
        			};
        			me.invokeListener( 'ON_SAVE_CLICK' );
        			break;
        		default:
        			me.showAddEdit( false );
        			if ( type === 'back' )
        			{
        				me.invokeListener( 'ON_BACKARROW_CLICK' );
        			}
        			else if ( type === 'cancel' )
    				{
        				me.invokeListener( 'ON_CANCEL_CLICK' );
    				}
        		break;
        	};
    	};

        var config =
    	{
        		id			: me._config.id,
        		titleKey 	: me._config.titleKey,
        		title		: me._config.title,
        		operation 	: me._config.operation,
   	        	renderer	: me._config.renderer,
   	        	callback	: actuate.common.web.Method.bind( dlgCallback, this )
   	    };

		me.showAddEdit( true );
		me.showActionDlgBasic( config );
   	},
   	
    /**
     * Add a listener that can be called when certain action is executed from this add edit dialog
     * Possible Event names are:
     * <ul>
     * <li>ON_BACKARROW_CLICK</li>
     * <li>ON_CANCEL_CLICK</li>
     * <li>ON_SAVE_CLICK</li>
     * </ul>
     * @param {String} eventName
     * @param {function} handler
     */
    addListener : function( eventName, handler )
    {
    	this._listener.addListener( eventName, handler );
    },
    
    invokeListener : function( eventName )
    {
   		this._listener.invokeListener( eventName, eventName );
    },
   	
   	isSupportedFeature : function( feature )
    {
    	// By default if the features is not setup,
    	// all features are allowed.
    	if( !this._config.features ) return true;
    	
    	if ( "backarrow" === feature )
		{
        	if ( this._config.features.backarrow )
        	{
        		return true;
        	}	
		}
    	else if ( "cancel" === feature )
		{
        	if ( this._config.features.cancel )
        	{
        		return true;
        	}	
		}
    	else if ( "save" === feature )
		{
        	if ( this._config.features.save )
        	{
        		return true;
        	}	
		}
    	
    	return false;
    },
    
    showActionDlgBasic : function( config )
    {
    	var dlg = null;
         
    	var cb = function( type )
        {
        	var data = null;
        	if ( type === 'save' )
        	{
                var valid = dlg.getContent( ).validate( );
                if (valid === true)
                {
                    data = dlg.getContent( ).getData( );
                }
                else
                {
                	var dialogConfig = this.getMsgDialogConfig( "info" );
                    actuate.common.web.util.Utility.showMsgDlg( config.id, valid, "info", dialogConfig );
                }
        	}
        	
        	if ( config.callback )
    		{
        		return config.callback( type, data );
    		}
         };

         var handlers = {};
         if( this.isSupportedFeature( 'backarrow' ) )
         {
             handlers['backarrow'] =
                 {
                     handler : actuate.common.web.Method.bind2( cb, this, 'back' ),
                     title   : this.getDefaultLabel( 'backarrow', config.renderer )
                 }
         }
         if( this.isSupportedFeature( 'cancel' ) )
         {
             handlers['cancel'] =
             {
                 handler : actuate.common.web.Method.bind2( cb, this, 'cancel' ),
                 title   : this.getDefaultLabel( 'cancel', config.renderer )
             }
         }
         if( this.isSupportedFeature( 'save' ) )
         {
             handlers['save'] =
             {
                 handler : actuate.common.web.Method.bind2( cb, this, 'save' ),
                 title   : this.getDefaultLabel( 'save', config.renderer )
             }
         };
         
         var options =
         {
             handlers : handlers
         };

         var title = this.getLocalizedString( config.titleKey );
         if ( config.title )
    	 {
        	 title = config.title;
    	 }
         
         dlg = new actuate.common.web.widget.layout.AddEdit( config.id, title, config.renderer, options);
         dlg.render();
    },
    
    /**
     * Send request to backend without confirmation
     */
    sendRequest : function( data )
    {
    	var me = this;

    	var dataProcessor 	= me._config.dataProcessor;
    	data['authToken'] 	= dataProcessor.getRequestOptions( ).getAuthId( );
        var request 		= dataProcessor.getRequestData( me._config.operation, data );
        var progressConfig =
    	{
    		msg : me.getLocalizedString( "Lbl.SavingChanges" )
    	};
        
       	dataProcessor.sendRequest( request, actuate.common.web.Method.bind( me._onSuccess, me ), actuate.common.web.Method.bind( me._onError, me ), progressConfig );
    },
    
    /**
     * Ask for confirmation before sending
     */
    sendDlgData : function( data )
    {
    	var me = this;
        
        var dialogConfig = this.getConfirmDialogConfig("confirmation");
        dialogConfig.okButton.handler = actuate.common.web.Method.bind2( this.sendRequest, this, data );
        
        var confirmMsg 		= me.getLocalizedString( "Lbl.SaveChanges" );    	
        var confirmDlg = new actuate.common.web.widget.dialog.ConfirmDialog( {id:me._config.id, msg:confirmMsg, type:"confirmation", dialogConfig : dialogConfig});
        confirmDlg.render();
    },
    
    _onSuccess : function( )
    {
    	this.showAddEdit( false );
    	this._config.dataProcessor.refreshContent( );
    },
    
    _onError : function( error )
    {
       var dialogConfig = this.getMsgDialogConfig("error");
	   actuate.common.web.util.Utility.showMsgDlg( this._config.id, error, "error", dialogConfig );
    },
    
    getDefaultLabel : function( type, renderer )
    {
    	var label = "";
    	if ( renderer && renderer.getLabel )
		{
    		label = renderer.getLabel( type );
    		if ( label ) return label;
		}
    	
    	switch ( type )
    	{
    		case 'backarrow' : 
    			label = this.getLocalizedString("Lbl.Btn.Back");
    			break;
    		case 'cancel' :
    			label = this.getLocalizedString("Lbl.Btn.Cancel");
    			break;
    		case 'save' :
    			label = this.getLocalizedString("Lbl.Btn.Save");
    			break;
    	}
    	return label;
    },

    getConfirmDialogConfig : function ( type ) 
    {
    	var title = this._getTitle(type);
    	
    	var dialogConfig = {
   			 title : this.getLocalizedString( title ),
   			 okButton : {
   				label 	: this.getLocalizedString( 'Lbl.Btn.OK' ),
   				handler : actuate.common.web.Method.bind( this.okCallBack, this )
   			 },
   			 cancelButton : {
   				label : this.getLocalizedString( 'Lbl.Btn.Cancel' )
   			 }
    	};
    	
    	return dialogConfig;
    },
    
    getMsgDialogConfig : function ( type ) 
    {
    	var title = this._getTitle(type);
    	
    	var dialogConfig = {
      			 title : this.getLocalizedString( title ),
      			 okButton : {
      				label 	: this.getLocalizedString( 'Lbl.Btn.OK' ),
      				handler : actuate.common.web.Method.bind( this.okCallBack, this )
      			 }
      	};
    	
    	return dialogConfig;
    },
    
    okCallBack : function ( )
    {
    	//No Operation.
    },
    
    _getTitle : function ( type ) 
    {
    	var title = "Dlg.Title.Information";
    	
    	if ( type === 'warning' )
		{
			title = "Dlg.Title.Warning";
		}
		else if ( type === 'error' )
		{
			title = "Dlg.Title.Error";
		}
		else if ( type === 'severe' )
		{
			title = "Dlg.Title.Severe";
		}
		else if ( type === 'confirmation' )
		{
			title = "Dlg.Title.Confirmation";
		}
    	
    	return title;
    },
    
    /**
     * Gets the localized string based on the message key
     * @param {String} key key to return the localized string for
     */
    getLocalizedString : function ( key )
    {
    	return key;
    }
	    
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.dialog" );

actuate.common.web.widget.dialog.ConfirmDialog = actuate.common.web.Class.create();
actuate.common.web.widget.dialog.ConfirmDialog.prototype = 
{

		_type 			: null,
		_msg			: null,
		_dialogID		: null,
		_containerID 	: null,
		_callbackOK     : null,
		_hideCloseButton:true,

		_infoMap :
		{
			"error" :
			{
				icon 	: "icon-exclamation-sign",
				cls 	: "alert alert-error"
			},
			"info" :
			{
				icon 	: "icon-info-sign",
				cls 	: "alert alert-info"
			},
			"warning" :
			{
				icon 	: "icon-warning-sign",
				cls 	: "alert alert-block"
			},
			"severe" :
			{
				icon 	: "icon-exclamation-sign",
				cls 	: "alert alert-error"
			},
			"confirmation":
			{
				icon 	: "icon-warning-sign",
				cls 	: "alert alert-block"
			}
		},

		/**
		 * 
		 * @param config
		 */
		initialize : function( config )
		{
			if ( this.__extending ) return;

			this._type = "info";
			if ( config )
			{
				this._containerID = config.id;
				if ( config.type === 'warning' )
				{
					this._type = "warning";
				}
				else if ( config.type === 'error' )
				{
					this._type = "error";
				}
				else if ( config.type === 'severe' )
				{
					this._type = "severe";
				}
				this._containerID = config.id;
				this._msg = config.msg;
				this._dialogConfig = config.dialogConfig;
				this._title = config.dialogConfig.title;
			}

			this._dialogID = this._containerID + "-" + actuate.common.web.util.Utility.createUniqueControlID( ) + '-' + actuate.common.web.$('.act_dlg').size();
			var wrapperEl = actuate.common.web.$("<div id='" + this._dialogID + "'>");
			wrapperEl.appendTo( actuate.common.web.$( "#" + this._containerID ) );
		},

		render : function( )
		{
			var dlg = null;
			var me = this;
			
			var onCallbackCancel = function( )
			{
				dlg.close();
				if ( me._dialogConfig.cancelButton.handler )
				{
					me._dialogConfig.cancelButton.handler( );
				}	
			};
			
			var onCallbackOK = function()
			{
				dlg.close();
				if ( me._dialogConfig.okButton.handler )
				{
					me._dialogConfig.okButton.handler( );
				}	
			};
								
			var render = function( id )
			{
				var template = actuate.common.web.$( this._getTemplate( ) );
				var container = actuate.common.web.$( "#" + id );
				template.appendTo( container );
			};
			var content =
			{
				render : actuate.common.web.Method.bind(render, this)
			};

			var buttons =
			[
				{
					label   : this._dialogConfig.cancelButton.label,
					handler : actuate.common.web.Method.bind( onCallbackCancel, this ),
					type    : 'secondary'   
				},
				{
					label 	: this._dialogConfig.okButton.label,
					handler : actuate.common.web.Method.bind( onCallbackOK, this ),
					type 	: 'primary'
				}
			];

			var options =
			{
				buttons : buttons,
				modal : true
			};

			dlg = new actuate.common.web.widget.dialog.Dialog( this._dialogID, this._title, content, options );
			dlg.setHideCloseButton(this._hideCloseButton);
			dlg.render( );
		},

		_getTemplate : function( )
		{
		    var infoType = this._infoMap[ this._type ];
		    var template = '<div style="max-width: 500px;" id="' + this._dialogID + '-msg">';
		    template += '<span class="' + infoType.icon   + '" style="float:left; margin:0 7px 50px 0;"></span>';
		    
			var message = this._msg;
	        
	       	template += message;
			template += '</div>';

			return template;
		},

		/**
	     * For escaping HTML elements in message. This is for preventing Xss from execution
		 * @param str - Message that needs HTML escaping
		 */
		_escapeHtml : function( str )
		{
			var divElement = document.createElement( 'div' );
			divElement.appendChild( document.createTextNode( str ) );
			return divElement.innerHTML;
		},		
		
		setHideCloseButton : function(str) {
			this._hideCloseButton = str;
		}
	
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.dialog");

/**
 * Construct a new Dialog class
 * 
 */
actuate.common.web.widget.dialog.Dialog = actuate.common.web.Class.create();
actuate.common.web.widget.dialog.Dialog.prototype = {
		
	_autoOpen		: false,
	_containerId 	: null,
	// dialog DOM element
	_element 		: null,

	// Dialog content div container
	_contentID		: null,
	
	// Dialog main container id
	_dialogID		: null,
	
	// Content objects
	_content 		: null,
	_modal          : false,
	_rendered 		: false,
	_width			: null,
	_height			: null,
	
	_buttons		: null,
	_dlgEl			: null,
	_hideCloseButton: true,
	_primaryHandler	: null,

	/**
	 * Initializes Dialog creating DIV element in the process.
	 * @param containerId - ID of the parent component.
	 * @param title - dialog title
	 * @param content - dialog content
	 * @param options - a map of:
	 * <ul>
	 * <li>modal - boolean showing if this dialog is modal</li>
	 * <li>width - width in pixels</li>
	 * <li>height - height in pixels</li>
	 * <li>
	 * 	buttons - buttons to include for the dialog
	 * 	<ul>
	 * 		<li>syntax: {label: function}</li>
	 * 		<li>Ok -- {Ok: function}</li>
	 * 		<li>Cancel -- {Cancel: function}</li>
	 * 	<ul>
	 * </li>
	 * </ul>
	 */
	initialize : function(containerId, title, content, options)
	{
		this._containerId 	= containerId;
		this._title			= title;
		this._content 		= content;
		
	    if(options)
        {
    		if(options['modal'])
    	    {
    	        this._modal = true;
    	    }
    
    		this._width 	= options['width'] || this._width;
    		this._height 	= options['height'] || this._height;
    		this._buttons	= options['buttons'];
    		this._autoOpen 	= options['autoOpen'];
    		this._isMsgDlg	= options['isMsgDlg'];
    		
    		// Default behavior is to hide the close(X) button.
    		this._hideCloseButton = ( options['hideCloseButton'] === false ) ? false : true;
    		
    		if( options.minheight ) 
    		{
    		    this._minheight = options.minheight;
    		}
    		if( options.minwidth ) 
    		{
    		    this._minwidth = options.minwidth;
    		}

        }
		
		if ( this._autoOpen != true )
		{
			this._autoOpen = false;
		}
		
		this._dialogID 	= 'act_dlg-' + this._containerId + '-' + actuate.common.web.$('.act_dlg').size();
		this._element 	= actuate.common.web.$( this._getDialogTemplate( ) );
	
	},
	
    _getDialogHeader : function( )
    {
        
    	var header = actuate.common.web.$('<div class="modal-header"></div>');
        
    	var dialogTitle = actuate.common.web.$('<h3>' + this._title + '</h3>');
          	
    	if( !this._hideCloseButton )
        {
            var closeDialog = actuate.common.web.$('<a style="text-decoration:none;" href="#" class="close">&times;</a>');
            closeDialog.click( actuate.common.web.Method.bind( this.close, this ));
            closeDialog.appendTo(dialogTitle);
        }
    	dialogTitle.appendTo(header);
    	       
        return header;
    },
    
	_getDialogTemplate : function( )
	{
		return '<div id="' + this._dialogID + '" class="act-dlg"/>';
	},
	
	_getContentTemplate : function( )
	{
		return '<div id="' + this._getContentDivId( ) + '" class="act-dlg-cnt form-horizontal modal-body"  style="max-height:none; overflow-y:visible;"/>';
	},
	
	_getMasterDialogTemplate : function( )
	{
		var width = "width: ";
		var height = "height: ";
		var maxheight = "max-height: ";
		var minheight = "min-height: ";
		var minwidth = "min-width: ";
		
		if ( this._width )
		{
			width += this._width + 'px;';
		}
		else
		{
			width += 'auto;';
		}	
		
		if ( this._height )
		{
			height += this._height + 'px;';
		}
		else
		{
			height += 'auto;';
		}	
		
		if( this._minheight ) 
		{
		    minheight += this._minheight + 'px;';
		}
		else
		{
			minheight += 'auto;'
		}	
		
		if ( this._minwidth )
		{
			minwidth += this._minwidth + 'px;';
		}
		else
		{
			minwidth += 'auto;';
		}
		
		var style = "";
		if ( width || height || minheight)
		{
			style = ' style="' + height + ' ' + minheight + ' ' + width + ' ' + minwidth + '"';
		}	

		var msgDlgClass = "";
		if ( this._isMsgDlg === true )
		{
			msgDlgClass = "acmsgdlg ";
		}
			
	    return '<div id="' + this._getMasterDialogDivId( ) + '" class="' + msgDlgClass + 'modal hide fade" tabindex="-1"' + style + '/>';
	},
	
	_getMasterDialogDivId : function()
	{
	    return this._dialogID + '-main';
	},
	
    _getDialogFooter : function( )
    {
        var footer = actuate.common.web.$('<div class="modal-footer"></div>');

        for ( var index = 0; index < this._buttons.length; index++)
        {
            var buttonObject = this._buttons[index];

            var label = buttonObject.label;
            var handler = buttonObject.handler;
            
            var buttonLabel = label;
            
            var config = {
                    
                    buttonType   : buttonObject.type,
                    title        : buttonLabel,
                    click        : handler,
                    width		 : '100px'
            };
            
            if ( buttonObject.type === 'inverse' || buttonObject.type === 'primary' )
            {
            	this._primaryHandler = handler;
            }	
            var button = new actuate.common.web.widget.control.Button(config);
            button.appendTo(footer);
        }

        return footer;
    },
    
	/**
	 * Sets Dialog content.
	 * @param content
	 */
	setContent : function(content)
	{
		this._content = content;
		// if Dialog is already rendered we need to re-render its content
		if(this._rendered)
		{
			this._renderDialogContent( );
		}
	},
	
	/**
	 * Gets this Dialog content.
	 * @returns content
	 */
	getContent : function()
	{
		return this._content;
	},
	
	/**
	 * Gets this Dialog content DIV id.
	 * @returns content DIV id
	 */
	_getContentDivId : function()
	{
		return this._dialogID + '-cnt';
	},
	
	_renderDialogContent : function( )
	{
		if ( this._content )
		{	
			var contentDivID = this._getContentDivId( );
			
			var el = actuate.common.web.$('#' + contentDivID );
			// clear out the content
			el.html('');
			this._content.render( contentDivID );
 			this._rendered = true;
 			el.bind("keypress", actuate.common.web.Method.bind2( this._onEnterKey, this, this._primaryHandler ) )
		}
	},

	/**
	 * Render this Dialog.
	 * Will call render of content.
	 */
	render : function( )
	{
		if( !this._rendered )
		{
			this._renderDialogDiv( );
			this._renderDialogContent( );
		}		
		// Look for any notification if there is any close it before proceeding
        var notificationModal = actuate.common.web.$(".modal-notification");
        if(notificationModal)
        {
        	notificationModal.remove();
        }
        
        //This is for centering the dialog to the screen
     	var windowHeight = actuate.common.web.$(window).height();
        var dlgHeight = this._dlgEl.height();
        
        var windowWidth = actuate.common.web.$(window).width();
        var dlgWidth = this._dlgEl.width();
        //If the page is long and if it was scrolled , then we need to move to that position first.
        var scrollTop = actuate.common.web.$(window).scrollTop();
      //If the page is too wide and if it was scrolled , then we need to move to that position as well.
        var scrollLeft = actuate.common.web.$(window).scrollLeft();
        var yPos = windowHeight/2 - dlgHeight/2;
        var xPos = windowWidth/2 - dlgWidth/2;
        //The dialog is rendered too low, so we use half of yPos.
        this._dlgEl.offset({ top: (scrollTop + ((1/2)*yPos)), left: (scrollLeft + xPos)});
	},

	/**
	 * Adds dialog DIV if it is needed.
	 */
	_renderDialogDiv : function()
	{
		if( actuate.common.web.$('#' + this._getMasterDialogDivId( )).length > 0 ) {
		    actuate.common.web.$('#' + this._getMasterDialogDivId( )).remove();
		}
		
		this._dlgEl = actuate.common.web.$( this._getMasterDialogTemplate( ) );
		
		var dlgHeader = this._getDialogHeader( );
	    var dlgFooter = this._getDialogFooter( ); 
	        
	    dlgHeader.appendTo(this._dlgEl); 
	    var contentEl  = actuate.common.web.$( this._getContentTemplate( ) );
	        
	    contentEl.appendTo(this._dlgEl);
	    dlgFooter.appendTo(this._dlgEl);
	   
	    this._dlgEl.appendTo( this._element );
	    
	    var mainContainerEl	= actuate.common.web.$( "#" + this._containerId );
	    this._element.appendTo( mainContainerEl );

		var modalOption = 'show';
		if ( this._isMsgDlg === true )
		{	
			modalOption = { backdrop : false }
		}
		
		this._dlgEl.modal( modalOption );
		this._dlgEl.keyup( actuate.common.web.Method.bind( this._onESCKey, this ) );
	    
		this._dlgEl.draggable( {
            handle: ".modal-header"
        });

		// custom backdrop for msg dialog
		if ( this._isMsgDlg === true )
		{	
	        this._backdrop = actuate.common.web.$( this._getMsgBackDropTemplate( ) );
	        this._backdrop.appendTo(document.body)
		}
	},
	
	_getMsgBackDropTemplate : function( )
	{
		var html = '<div class="act-msgDlg"><div class="modal-backdrop"></div></div>';
		
		return html;
	},
	
	_getIgnoreEnterKey : function( )
	{
		if ( this._ignoreEnterKey === undefined)
		{	
			var curTime = (new Date()).getTime();
			if ( this._startTimeDelay ) 
			{	
	    		if ( curTime < this._startTimeDelay )
	    		{
	    			return false;
	    		}
			}
			this._startTimeDelay = (new Date()).getTime() + 600;
			return true;
		}
		
		// get variable that holds the state
		return this._ignoreEnterKey;
	},
	
	okToListenOnEnterKey : function( ok )
	{
		this._ignoreEnterKey = ok;
	},

	_onESCKey : function( e )
	{
    	if ( e.keyCode == 27 )
		{
    		this.close( );
    		return false;
		}
	},
	
	_onEnterKey : function( cb, e )
    {
    	if ( e.keyCode == 13 && cb )
    	{
    		if (this._getIgnoreEnterKey( ) === true)
			{
    			cb( );
			}
        	return false;
    	}
    },
    
	/**
	 * Cancel button click handler.
	 */
	close : function( )
	{
		this._dlgEl.modal( 'hide' );
		this._dlgEl.remove( );
		this._element.remove( );
		
		if ( this._backdrop )
		{	
			this._backdrop.remove( );
		}
	},		
	
	setHideCloseButton : function(str) {
		this._hideCloseButton = str;
	}
	
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.dialog" );

/**
 * Construct a new Message dialog
 * 
 */
actuate.common.web.widget.dialog.MsgDialog = actuate.common.web.Class.create( );
actuate.common.web.widget.dialog.MsgDialog.prototype =
{

	_type 			: null,
	_msg			: null,
	_containerID 	: null,
	_showDetail		: true,

	_infoMap :
	{
		"error" :
		{
			icon 	: "icon-exclamation-sign",
			cls 	: "alert alert-error"
		},
		"info" :
		{
			icon 	: "icon-info-sign",
			cls 	: "alert alert-info"
		},
		"warning" :
		{
			icon 	: "icon-warning-sign",
			cls 	: "alert alert-block"
		},
		"severe" :
		{
			icon 	: "icon-exclamation-sign",
			cls 	: "alert alert-error"
		}
	},

	/**
	 * 
	 * @param config
	 */
	initialize : function( config )
	{
		if ( this.__extending ) return;

		this._type = "info";
		if ( config )
		{
			this._containerID = config.id;
			if ( config.type === 'warning' )
			{
				this._type = "warning";
			}
			else if ( config.type === 'error' )
			{
				this._type = "error";
			}
			else if ( config.type === 'severe' )
			{
				this._type = "severe";
			}
			this._containerID = config.id;
			this._msg = config.msg;
		}

		if ( config.showDetail !== undefined )
		{
			this._showDetail = config.showDetail;
		}
		this._dialogConfig = config.dialogConfig;
	},

	render : function( )
	{
		var dlg = null;
		var me = this;
		var onCallback = function( )
		{
			dlg.close( );
			if ( me._dialogConfig.okButton.handler )
			{
				me._dialogConfig.okButton.handler( );
			}
		};

		var render = function( id )
		{
			var template = actuate.common.web.$( this._getTemplate( ) );
			var container = actuate.common.web.$( "#" + id );
			template.appendTo( container );
		};
		var content =
		{
			render : actuate.common.web.Method.bind(render, this)
		};

		var buttons =
		[
			{
				label 	: this._dialogConfig.okButton.label,
				handler : onCallback,
				type 	: 'primary'
			}
		];

		var options =
		{
			buttons 	: buttons,
			modal 		: true,
			isMsgDlg 	: true
			
		};

		dlg = new actuate.common.web.widget.dialog.MsgDialogEx( this._containerID, this._dialogConfig.title, content, options );
		dlg.render( );
	},

	_isEmptyString : function( string )
	{
		var tempStr = string + "";
		if ( tempStr.length === 0 )
		{	
			return true;
		}	
		
		return false;
	},
	
	_getTemplate : function( )
	{
	    var infoType = this._infoMap[ this._type ];
	    
	    var dlgMsgId = actuate.common.web.util.Utility.createUniqueControlID( );
	    var template = '<div id="' + dlgMsgId + '-msg">';
	    template += '<span class="' + infoType.icon   + '" style="float:left; margin:0 0px 50px 0;"></span>';
	    
		var finalMessage = " ";
        
        if ( this._msg instanceof actuate.common.web.Exception )
        {
        	var errCodeStr 	= !this._isEmptyString( this._msg.getErrCode( ) )  ? this._msg.getErrCode( ) + ": " : "";
            finalMessage 	= errCodeStr + this._escapeHtml( this._msg.getMessage( )) + "<br>"; 
            
            if ( this._showDetail === true )
            {	
	            var detail = this._msg.getParameters( );
	            
	            if( detail ) 
	            {
	            	for( var i = 0; i < detail.length; i++ ) 
	                {
	                	finalMessage += 'Parameter' + i  + ': ' + detail[i] + "<br>";
	                }
	            }
            }
        }
        else
        {
            for(var i=0; i < this._msg.length; i++) {
                
                var msg = this._msg[i];
                
                if( msg.successLabel && msg.successMessage ) 
                {
                    label = msg.successLabel;
                    message = msg.successMessage;
                }
                else 
                {
                    label = msg.errorLabel;
                    message = msg.errorMessage;
                }
                finalMessage += label + ' ' + message + '<br>';
            }               
        }
        
		template += finalMessage;
		template += '</div>';

		return template;
	},

	/**
     * For escaping HTML elements in message. This is for preventing Xss from execution
	 * @param str - Message that needs HTML escaping
	 */
	_escapeHtml : function( str )
	{
		var divElement = document.createElement( 'div' );
		divElement.appendChild( document.createTextNode( str ) );
		return divElement.innerHTML;
	}
};

actuate.common.web.widget.dialog.MsgDialogEx = actuate.common.web.Class.extendClass( actuate.common.web.widget.dialog.Dialog,
{
	_dialogID		: null,
	
	initialize : function( containerId, title, content, options )
	{
       	if ( this.__extending )
   			return;
       	
		this._dialogID = containerId + "-" + actuate.common.web.util.Utility.createUniqueControlID( ) + '-' + actuate.common.web.$('.act_dlg').size();
		this._wrapperEl = actuate.common.web.$("<div id='" + this._dialogID + "'>");
		this._wrapperEl.appendTo( actuate.common.web.$( "#" + containerId ) );

		actuate.common.web.widget.dialog.MsgDialogEx.superclass.initialize.call( this, this._dialogID, title, content, options );
	},
	
	close : function( )
	{
		actuate.common.web.widget.dialog.MsgDialogEx.superclass.close.apply( this, arguments );
		this._wrapperEl.remove( );
	}
});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.dialog" );

actuate.common.web.widget.dialog.MyProfileDialog = actuate.common.web.Class.create();
actuate.common.web.widget.dialog.MyProfileDialog.prototype = 
{
	_data 		: null,
	_listener 	: null,
	
    initialize : function( )
    {
        if (this.__extending)
            return;
        
        this._listener 		= new actuate.common.web.widget.layout.LayoutListener( );
        this._viewProfile 	= new actuate.common.web.widget.ui.view.common.MyProfile( );
    },

    /**
     * Add a listener that can be called when certain action is executed from this profile dialog
     * Possible Event names are:
     * <ul>
     * <li>ON_GETLOCALIZATION_STRING</li>
     * <li>ON_OK</li>
     * <li>ON_CANCEL</li>
     * </ul>
     * @param {String} eventName
     * @param {function} handler
     */
    addListener : function( eventName, handler )
    {
    	this._listener.addListener( eventName, handler );
    	if ( eventName === 'ON_GETLOCALIZATION_STRING' )
		{
    		this._viewProfile.addListener( eventName, handler );
		}
    },
    
    _invokeListener : function(  )
    {
   		return this._listener.invokeListener.apply( this._listener, arguments );
    },
    
    setData : function( data )
    {
    	this._viewProfile.setData( data );
    },
    
    getData : function( )
    {
    	return this._viewProfile.getData( );
    },
    
    _NOOP : function( )
    {
    	return;
    },
    
    _getMsgDialogConfig : function ( type ) 
    {
    	var title = actuate.common.web.util.Utility.getValidationTitleKey( type );
    	
    	var dialogConfig = {
      			 title : this._invokeListener( 'ON_GETLOCALIZATION_STRING', title ),
      			 okButton : {
      				label 	: this._invokeListener( 'ON_GETLOCALIZATION_STRING', 'Lbl.Btn.OK' ),
      				handler : actuate.common.web.Method.bind( this._NOOP, this )
      			 }
      	};
    	
    	return dialogConfig;
    },
    
    render : function( id )
    {
    	var dlg = null;
        
    	var config =
    	{
    		titleKey 	: this._invokeListener( 'ON_GETLOCALIZATION_STRING', 'Lbl.MyProfile.Settings' ),
    		renderer	: this._viewProfile
    	};

    	var onOKCallback = function( )
    	{
            var valid = dlg.getContent().validate();
            if (valid === true)
            {
            	var data = dlg.getContent( ).getData( );
            	this._invokeListener( 'ON_OK', dlg );
            	//dlg.close();
            }
            else
            {
                var dialogConfig = this._getMsgDialogConfig("info");
                actuate.common.web.util.Utility.showMsgDlg( id, valid, "info", dialogConfig);
            }	
    	};
    	
        var onCancel = function()
        {
        	this._invokeListener( 'ON_CANCEL' );
        	dlg.close();
        };

        var buttons = [{
                 label      : this._invokeListener( 'ON_GETLOCALIZATION_STRING', 'Lbl.Btn.Cancel' ),
                 handler    : actuate.common.web.Method.bind( onCancel, this ),
                 type       : 'secondary'
             },
             {
                 label      : this._invokeListener( 'ON_GETLOCALIZATION_STRING', 'Lbl.Btn.Save' ),
                 handler    : actuate.common.web.Method.bind( onOKCallback, this ),
                 type       : 'primary'
             }];

        var options =
        {
            buttons : buttons,
            modal : true
        };

        var title = this._invokeListener( 'ON_GETLOCALIZATION_STRING', 'Lbl.MyProfile.Title');
        dlg = new actuate.common.web.widget.dialog.Dialog( id, title, config.renderer, options );
        dlg.render();
    }
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define( "actuate.common.web.widget.dialog" );

/**
 * Construct a new Message dialog
 * 
 */
actuate.common.web.widget.dialog.ProgressDialog = actuate.common.web.Class.create( );
actuate.common.web.widget.dialog.ProgressDialog.prototype =
{

		_autoOpen		: false,
		_containerId 	: null,
		// dialog DOM element
		_element 		: null,

		// Dialog content div container
		_contentID		: null,
		
		// Dialog main container id
		_dialogID		: null,
		
		// Content objects
		_content 		: null,
		_modal          : false,
		_rendered 		: false,
		_width			: null,
		_height			: null,
		
		_dlgEl			: null,
		_hideCloseButton: true,
		_primaryHandler	: null,
		_progressBarConfig	: { },
		
		_delay 		: 1*1000, 	// 1 seconds delay to show the progress dialog
		_timer 		: null, 	// timer used
		_counterIdx : 0,


		/**
		 * Initializes Dialog creating DIV element in the process.
		 * @param containerId - ID of the parent component.
		 * @param title - dialog title
		 * @param content - dialog content
		 * @param options - a map of:
		 * <ul>
		 * <li>modal - boolean showing if this dialog is modal</li>
		 * <li>width - width in pixels</li>
		 * <li>height - height in pixels</li>
		 * <li>
		 * 	buttons - buttons to include for the dialog
		 * 	<ul>
		 * 		<li>syntax: {label: function}</li>
		 * 		<li>Ok -- {Ok: function}</li>
		 * 		<li>Cancel -- {Cancel: function}</li>
		 * 	<ul>
		 * </li>
		 * </ul>
		 */
		initialize : function(containerId, title, content, options)
		{
			this._containerId 	= containerId;
			this._title			= title;
			this._content 		= content;
			
		    if(options)
	        {
	    		if(options['modal'])
	    	    {
	    	        this._modal = true;
	    	    }
	    
	    		this._width 	= options['width'] || this._width;
	    		this._height 	= options['height'] || this._height;
	    		
	    		this._autoOpen 	= options['autoOpen'];
	    		
	    		// Default behavior is to hide the close(X) button.
	    		this._hideCloseButton = ( options['hideCloseButton'] === false ) ? false : true;
	    		
	    		if( options.minheight ) 
	    		{
	    		    this._minheight = options.minheight;
	    		}
	    		if( options.minwidth ) 
	    		{
	    		    this._minwidth = options.minwidth;
	    		}

	        }
			
			if ( this._autoOpen != true )
			{
				this._autoOpen = false;
			}
			
			this._dialogID 	= 'act_dlg-' + this._containerId + '-' + actuate.common.web.$('.act_dlg').size();
			this._element 	= actuate.common.web.$( this._getDialogTemplate( ) );
		
		},
		
	   	    
		_getDialogTemplate : function( )
		{
			return '<div id="' + this._dialogID + '" class="act-dlg"/>';
		},
		
		_getContentTemplate : function( )
		{
			return '<div id="' + this._getContentDivId( ) + '" class="act-dlg-cnt modal-body"/>';
		},
		
		_getMasterDialogTemplate : function( )
		{
			var width = "width: ";
			var height = "height: ";
			var maxheight = "max-height: ";
			var minheight = "min-height: ";
			var minwidth = "min-width: ";
			
			if ( this._width )
			{
				width += this._width + 'px;';
			}
			else
			{
				width += 'auto;';
			}	
			
			if ( this._height )
			{
				height += this._height + 'px;';
			}
			else
			{
				height += 'auto;';
			}	
			
			if( this._minheight ) 
			{
			    minheight += this._minheight + 'px;';
			}
			else
			{
				minheight += 'auto;'
			}	
			
			if ( this._minwidth )
			{
				minwidth += this._minwidth + 'px;';
			}
			else
			{
				minwidth += 'auto;';
			}
			
			var style = "";
			if ( width || height || minheight)
			{
				style = ' style="' + height + ' ' + minheight + ' ' + width + ' ' + minwidth + '"';
			}	

		    return '<div id="' + this._getMasterDialogDivId( ) + '" class="modal hide fade" tabindex="-1"' + style + '/>';
		},
		
		_getMasterDialogDivId : function()
		{
		    return this._dialogID + '-main';
		},
		
	    
		/**
		 * Gets this Dialog content DIV id.
		 * @returns content DIV id
		 */
		_getContentDivId : function()
		{
			return this._dialogID + '-cnt';
		},
		
		_renderDialogContent : function( )
		{
			var contentDivID = this._getContentDivId( );

			var el = actuate.common.web.$('#' + contentDivID );
			// clear out the content
			el.html('');
			
			var template = "";
			if(this._content)	
			{
				template = '<div><i class="icon-ygg-spinner icon-large icon-spin"></i> '+this._content+' </div>';
			}
			else
			{
				template = '<div><i class="icon-ygg-spinner icon-large icon-spin"></i></div>';
			}
			
			actuate.common.web.$(template).appendTo(el);
			
			//This is for centering the dialog to the screen
	     	var windowHeight = actuate.common.web.$(window).height();
	        var dlgHeight = this._dlgEl.height();
	        
	        var windowWidth = actuate.common.web.$(window).width();
	        var dlgWidth = this._dlgEl.width();
	        //If the page is long and if it was scrolled , then we need to move to that position first.
	        var scrollTop = actuate.common.web.$(window).scrollTop();
	      //If the page is too wide and if it was scrolled , then we need to move to that position as well.
	        var scrollLeft = actuate.common.web.$(window).scrollLeft();
	        var yPos = windowHeight/2 - dlgHeight/2;
	        var xPos = windowWidth/2 - dlgWidth/2;
	        //The dialog is rendered too low, so we use half of yPos.
	        this._dlgEl.offset({ top: (scrollTop + ((1/2)*yPos)), left: (scrollLeft + xPos)});
		},
		
		/**
		 * Render this Dialog.
		 * Will call render of content.
		 */
		render : function( msg )
		{
			// if counter is 1 or more, that means that the progress dialog is already showing,
			// there is no need to show it again albiet the message string will not change.
			if ( this._counterIdx <= 0 )
			{
				this._rendered = false;
				
				this._showGlobalContainer( );
				var func = actuate.common.web.Method.bind2( this._showProgressDlg, this, msg );
				this._timer = window.setTimeout( func, this._delay );
			}

			this._counterIdx++;
		},

		_showGlobalContainer : function( )
		{
			var	mainContainerEl = this._getGlobalContainerEl( );
	    	mainContainerEl.empty( );
	    	mainContainerEl.show( );
		},
		
		_getGlobalContainerEl : function( )
		{
		    var	mainContainerEl = actuate.common.web.$( "#" + this._getGlobalId( ) );
	    	
	    	if ( mainContainerEl.length === 0 )
	    	{	
		    	var globalTemplate = this._bodyHtmlTemplate( );
		    	mainContainerEl	= actuate.common.web.$( globalTemplate );
		    	mainContainerEl.appendTo( document.body );
	    	}

	    	return mainContainerEl;
		},
		
		/**
		 * Adds dialog DIV if it is needed.
		 */
		_renderDialogDiv : function()
		{
			if( actuate.common.web.$('#' + this._getMasterDialogDivId( )).length > 0 ) {
			    actuate.common.web.$('#' + this._getMasterDialogDivId( )).remove();
			}
			
			this._dlgEl = actuate.common.web.$( this._getMasterDialogTemplate( ) );
			
		    var contentEl  = actuate.common.web.$( this._getContentTemplate( ) );
		    contentEl.appendTo(this._element);
		 
		    this._element.appendTo(this._dlgEl);
		    
		    var	mainContainerEl = this._getGlobalContainerEl( );
	    	this._dlgEl.appendTo( mainContainerEl );
		        
		    this._dlgEl.modal( 'show' );
		    
	        this._dlgEl.draggable({
	            handle: ".modal-header"
	        });
	        
	   	},
		
	   	_getGlobalId : function( )
	   	{
	   		if ( !this._progressBarConfig.globalId )
   			{
	   			this._progressBarConfig.globalId = 'acwebprogid' + actuate.common.web.util.Utility.createUniqueControlID( );
   			}

	   		return this._progressBarConfig.globalId;
	   	},
	   	
	   	_bodyHtmlTemplate : function( )
	   	{
	   		var id = this._getGlobalId( );
	   		var template = '<div class="' + actuate.common.web.util.Utility.getRootCSSNamespace( )  + ' ac-progressbar" id="' + id + '"></div>';
	   		return template;
	   	},
	   	
		_showProgressDlg : function( msg )
		{
			if( this._rendered == false && this._timer != null )
			{
				this._clearTimeOut( );
				
				this._rendered = true;
				this._content = "";
				if ( msg )
				{
					this._content = msg;
				}
			
				
				this._element.empty( );
				this._renderDialogDiv( );
				this._renderDialogContent( );
				
			}		
		},
		
		_clearTimeOut : function( )
		{
			if ( this._timer )
			{	
				window.clearTimeout( this._timer );
				this._timer = null;
			}
		},
		
	   	/**
		 * Cancel button click handler.
		 */
		close : function( )
		{
			this._counterIdx--;
			
			this._clearTimeOut( );
			
			if ( this._counterIdx <= 0 )
			{
				this._rendered = false;
				if ( this._dlgEl )
				{	
					this._dlgEl.modal('hide');
					this._dlgEl.remove();
				}
				
				var	mainContainerEl = actuate.common.web.$( "#" + this._getGlobalId( ) );
				if ( mainContainerEl.length != 0 )
				{
					mainContainerEl.hide( );
				}
				this._counterIdx = 0;
			}
		}
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * layout class for add / edit view.
 */
actuate.common.web.widget.layout.AddEdit = actuate.common.web.Class.create();
actuate.common.web.widget.layout.AddEdit.prototype =
{
    _config : null,

    /**
     * Initializes Content.
     */
    initialize : function(containerId, title, content, options)
    {
        if (this.__extending)
            return;
        
        this._config = 
    	{
    		containerId : containerId,
    		title 		: title,
    		content 	: content,
    		handlers	: options.handlers
    	};
        
        this._initView( );
    },
    
    render : function( )
    {
    	var container = actuate.common.web.$( "#" + this._config.containerId );
		// clear out the content
    	container.html('');
		
    	this._el.appendTo( container );
    	
    	this._createHeader( this._el );
    	this._createContent( this._el );

    	//this._createFooter( footer_el );
    },
    
    _createHeader : function( appendTo )
    {
    	var header = actuate.common.web.$('<div id="header' + this._config.containerId + '" class="view-header-bar"></div>');
    	header.appendTo( appendTo );
    	var headerinner = actuate.common.web.$('<div class="view-header-bar-inner"></div>');
    	headerinner.appendTo(header);
    	
    	var handlers 	= this._config.handlers;
    	var template = "<h2 class='view-header-title view-header-title-left'>" + "{value}" + "</h2>";
    	
    	var titleItem	= actuate.common.web.widget.control.GridUtil.generateItem( null, this._config.title, null, null, null, null, null, template );
		var backItem	= handlers["backarrow"] ? actuate.common.web.widget.control.GridUtil.generateItem( 'back', handlers["backarrow"].title, null, null, null, handlers["backarrow"].handler, "acaddedit-back", null ) : null;
		
		var headerConfig =
		{
			items	:
			[
			 	{
			 		items : [titleItem]
			 	},
			 	{
			 		items : [backItem]
			 	}
			]
		};
		
		var config = {store : [headerConfig]};
		var headerGrid = new actuate.common.web.widget.layout.EditHeaderBar ( config );
		headerGrid.appendTo( headerinner );
    },
    
    _createContent : function( appendTo )
    {
    	var contentID = "content" + this._config.containerId;
    	var content = actuate.common.web.$('<div id="' + contentID + '" class="view-update-content"></div>');
    	content.appendTo( appendTo );
    	
		if ( this._config.content )
		{	
			// clear out the content
			content.html('');
			this._config.content.render( contentID, actuate.common.web.Method.bind( this._createFooter, this) );
			
			this._rendered = true;
		}
    	
    	return content;
    },
    
	/**
	 * Gets this content's renderer.
	 * @returns content
	 */
	getContent : function()
	{
		return this._config.content;
	},
	
	_createFooter : function( appendTo )
    {
		var handlers 	= this._config.handlers;
		
    	if( handlers.save && handlers.cancel ) 
    	{
    		actuate.common.web.$('<br>').appendTo( appendTo );
        	var footer = actuate.common.web.$('<div style="float:right;" id="footer' + this._config.containerId + '" class="view-update-footer"></div>');
        	footer.appendTo( appendTo );
        	
        	var cancelButtonDiv = actuate.common.web.$('<div class="btn-group"></div>');
        	var saveButtonDiv = actuate.common.web.$('<div class="btn-group"></div>');
        	
        	cancelButtonDiv.appendTo( footer );
        	saveButtonDiv.appendTo( footer );
        	
    		var config =
    		{	
    			onItemClick : handlers["save"].handler
    		};	
        	
    		var listener = new actuate.common.web.widget.control.GridItemListener( config );
    		var saveItem	= handlers["save"] ? actuate.common.web.widget.control.GridUtil.generateItem( 'save', handlers["save"].title, "save", null, null, null, "btn-primary header-right-button btn-wide", null, null, listener ) : null;
    		
    		config =
    		{	
    			onItemClick : handlers["cancel"].handler
    		};	
    		
    		listener = new actuate.common.web.widget.control.GridItemListener( config );
    		var cancelItem	= handlers["cancel"] ? actuate.common.web.widget.control.GridUtil.generateItem( 'cancel', handlers["cancel"].title, "cancel", null, null, null, "header-right-button btn-wide", null, null, listener ) : null;

    		var cancelGridItem = new actuate.common.web.widget.control.GridItem( cancelItem );
    		cancelGridItem.appendTo(cancelButtonDiv);
    		var saveGriditem = new actuate.common.web.widget.control.GridItem( saveItem );
    		saveGriditem.appendTo(saveButtonDiv);
    	}
    },
    
    _renderView : function( )
    {
    	
    },
    
    _initView : function( )
    {
    	this._el = actuate.common.web.$('<div class="view-update"></div>');
    }

};
/*******************************************************************************
 * Copyright (c) 2013 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout BaseHeaderbar class. 
 * 
 */
actuate.common.web.widget.layout.BaseHeaderbar = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.BaseHeaderbar.prototype =
{
		_config : null,
		
		/**
		 * Initializes Headerbar
		 */
		initialize : function(config)
		{
	        if (this.__extending)
	            return;

	        this._config = config;
	    	this._createElement( );
		},	
		
		/**
	     * default implementation class to create html element
	     */
	    _createElement : function()
	    {
	        var tagType = this._getHTMLTag();

	        this._element = new actuate.common.web.$(tagType);
	    },

	    _getHTMLTag : function( )
	    {
	    	var headerId = actuate.common.web.util.Utility.createUniqueControlID( );
	    	
	    	var html = "<div id=\"headerwrap_" + headerId + "\" class='view-header-content'>";
	    	return html;
	    },
	    
	    /**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
	        this._element.appendTo(appendTo);
	        
			// append all the items into the container.
			this._appendHeader();
		},
		
		onUnload : function( )
		{
			this._element.html( "" );
		},
		
		_appendHeader : function( )
		{
			// Add div container for search box and title
			this._divObject = actuate.common.web.$("<div id='titleandsearch'></div>")
			for ( var i = 0; i < this._config.items.length; i++)
			{
				this._appendItems(this._config.items[i]);
			}
			this._divObject.appendTo(this._element);
			setTimeout(function(){        	
	        	if(actuate.common.web.$('.search') && actuate.common.web.$('.search').length > 0)
	        		actuate.common.web.$('.search')[0].focus();
			}, 0);
			
		},
		
		// Add comfigured items to header
		_appendItems : function(component)
		{
			var componentObject = null;
			switch(component.items.type)
			{
				case 'add' :
					componentObject = this._getAddComponent(component.items);
					componentObject.appendTo(this._element);
					break;
				case 'search':
					componentObject = this._getSearchComponent(component.items);
					componentObject.prependTo(this._divObject);
					break;
				case 'emptyadd' :
					componentObject = this._getEmptyAddComponent(component.items);
					componentObject.prependTo(this._element);
					break;
				default:
					if(component.items.length != 0)
					{
						componentObject = this._getTextComponent(component.items);
						componentObject.appendTo(this._divObject);
					}
					else
					{
						componentObject = actuate.common.web.$("<a></a>");
						componentObject.appendTo(this._element);
					}
				    break;
			}
		},
		
		// Generate Add button for header
		_getAddComponent :function(items)
		{
			var addComponent = actuate.common.web.$("<div class='view-header-bar-left'></div>");
			var listenerCB = actuate.common.web.Method.bind( items.listener.onItemClick, items.listener );
			var click = actuate.common.web.Method.bind2(this._buttonHandler, this, listenerCB);
									
			var griditem = new actuate.common.web.widget.control.GridItem( items );
			griditem.appendTo(addComponent);
				
			addComponent.click(function(){
				click(items.type);
			});
			
			return addComponent;
		},
		
		// Generate Empty block
		_getEmptyAddComponent: function(items)
		{
			var addComponent = actuate.common.web.$("<div class='view-header-bar-left'><div class='hiddenplaceholder' style='visibility:hidden'>ACTUATE</div></div>");
			return addComponent;
		},
		
		// Generate Search item
		_getSearchComponent :function(items)
		{
			var searchComponent = actuate.common.web.$("<div class='header-bar-search-box'></div>");
									
			var listenerCB = actuate.common.web.Method.bind( items.listener.onItemClick, items.listener );
			var click = actuate.common.web.Method.bind2(this._buttonHandler, items, listenerCB);
			items.listener.onItemClick = click;
			
			var griditem = new actuate.common.web.widget.control.GridItem( items );
			griditem.appendTo(searchComponent);
			var me = this;
			var timer;
			
		    searchComponent.find("input").keyup(function(e){
		    	
		    	var _this = searchComponent.find("input");
		    	//this function cancels the previous request using timer.
		    	clearTimeout(timer);
		    	
		    	timer = setTimeout(function() {
		    		
		    		if(e.keyCode != 0)
			    	{
			       	   if(e.keyCode != 13)
			       	   {
			       		   items.data = _this.val() ;
			       	   }
			       	   actuate.common.web.$(".search-delete-text-icon").css("display","block");
			    	}
			    	else
			    	{
			    	   items.data = _this.val().substring(0,_this.val().length-1);
			      	}
			    	
			        click(items.type,items.data);
			    	
			    	if(items.data == "")
			    	{
			    		actuate.common.web.$(".search-delete-text-icon").css("display","none");
			    	}
			    	
		    	} , 500);
		    	
		    });
		    
		    searchComponent.find(".search-delete-text-icon").click(function(e){
		    	items.data = "";
		    	this.value = "";
		    	actuate.common.web.$('.header-bar-search-box').find('input').val("");
		    	click(items.type,items.data);
		    	actuate.common.web.$(".search-delete-text-icon").css("display","none");
		    });
			
			return searchComponent;
		},
		
		//Generate text Item
		_getTextComponent :function(items)
		{
			var griditem = new actuate.common.web.widget.control.GridItem( items ); 
			return griditem;
		},

		// Handle actions performed by header items
		_buttonHandler : function(cb, type, event, data)
		{
			var buttonData = null;
			if(cb)
			{
				if(event != null)
				{
					var buttonData = 
					{
						 event: 
						 {
							 data : event
						 }
				    };
				}
				
				cb(type, buttonData);
			}
		}
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Base Navigation Menu class
 * 
 */
actuate.common.web.widget.layout.BaseMenubar = actuate.common.web.Class.create();
actuate.common.web.widget.layout.BaseMenubar.prototype =
{
	    CONTENT_ID_PREFIX   : 'act_menu_cnt_',
	    HREF_ID_PREFIX      : 'act_menu_href_',
	    _configMenus		: null,
		_selectedMenu 		: null,
		_idsOfMainItems		: null,
		_idsOfSubItems		: null,
		
	    initialize : function( containerId )
	    {
	    	if ( this.__extending )
				return;

	    	this._configMenus	= 
    		{
    			main :
    			{	
    				name	: 'main',
    				items	: [ ]
    			}
    		};
	    	
	    	this._containerId	= containerId;
	    	this._selectedMenu	= { };
	    	this.initComponent( );
	    },

	    /**
	     * Initializes the navigation menu component
	     */
	    initComponent : function( )
	    {
	    	var template = this.getTemplate( );
	    	var cssNameSpace = actuate.common.web.util.Utility.getRootCSSNamespace( );
	    	
	    	// wrap this template with another div to include ac class.
			template = '<div class="' + cssNameSpace + '">' + template + '</div>';

	    	
	    	// Create a dom object based on this html template
	    	this._element = actuate.common.web.$( template );
	    	this._element.attr('id', 'act_menu_panel-' + this._containerId + '-' + actuate.common.web.$('.act_menu_panel').size());
	    },
	    
	    /**
	     * Add a new menu item to the menu navigation 
	     * @param menuConfig
	     * <pre>
	     * 		// Single level Menu
	     * 		var myMenu =
	     * 		{
	     * 			name		: "settings", // internal name of the menu
	     * 			text		: "Settings", // localized text shown as a menu
	     * 			renderer 	: contentRenderer
	     * 		}
	     * 
	     * 		// Double level Menu
	     * 		var myMenuWithSubMenu =
	     * 		{
	     * 			name		: "settings", // internal name of the menu
	     * 			text		: "Settings", // localized text shown as a menu
	     * 			menu		:
	     * 			[
	     * 				{
	     * 					name		: "users", // internal name of the sub menu		
	     * 					text		: "Users", // localized text shown as a sub menu	
	     * 					renderer 	: contentRenderer
	     * 				},
	     * 				{
	     * 					name		: "others", // internal name of the sub menu		
	     * 					text		: "Others", // localized text shown as a sub menu	
	     * 					renderer 	: contentRenderer
	     * 				}
	     * 			]
	     * 		}
	     * </pre>
	     */
	    addMenuItem : function( configMenu )
	    {
	    	this._configMenus.main.items.push(  configMenu );
	    },
	    
	    /**
	     * Handler that is called when the menu is clicked
	     * @param index
	     * @param config the menu config that this index comes from
	     */
	    onMainMenuClick : function( index, config )
	    {
	    	var liId = 'li_'+this._getHrefId( index, config );
	    	var liElement = actuate.common.web.$( '#'+liId );
	    	if( liElement && liElement.hasClass('disabled'))
	    	{
	    		arguments[2].stopPropagation();
	    	}else
	    	{
	    		var menuClicked = config.items[index];
	    		var renderer = menuClicked.renderer;
	    		if ( renderer )
	    		{
	    			var arrayOfMenuIds = this._getArrayOfMenuItemIds( index, config );
	    			renderer.render( menuClicked, arrayOfMenuIds );
	    		}
	    	}
	    },
	    
	    onMenuClick : function( index, config )
	    {
	    	this._setActiveMenu( index, config );
	    	this._renderContentMenu( index, config );
	    },
	    
	    onSubMenuClick : function ( index, config )
	    {
	    	var renderer = config.renderer;
	    	if ( renderer )
	    	{	
	    		var elemId = 'submemuItem_'+this._getContentId( index , config );
	    		//var menuItem = config.items[ index];
	    		renderer.render( elemId, config );
	    	}
	    },
	    
	    _getArrayOfMenuItemIds : function( index, config )
	    {
	    	var arrayOfMenuIDs = null;
	    	var menuClicked = config.items[index];
	    	var menuItems = menuClicked.menu;
	    	if( menuItems && menuItems.length > 0 )
	    	{
	    		arrayOfMenuIDs = new Array();
	    		for( var i = 0; i < menuItems.length; i++ )
	    			arrayOfMenuIDs.push('li_memuItem_'+this._getContentId( index+'_'+i , config ) );
	    	}
	    	return arrayOfMenuIDs;
	    },
	    
	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
	        if( this._rendered )
	        {
	            actuate.common.web.util.Logging.log("Not rendering Menu - already rendered");
	        }
	        else
	        {
	            this._renderMenus( );
	            
	            // By default set the first menu as active
	            this._setActiveMenu( 0, this._configMenus.main );
	            this._rendered = true;
	        }
	    },
	    
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getTemplate : function( )
	    {
	    	var template = 
    			'<div class="acnavbar"><div class="navbar">' +
					'<ul class="acmenu nav">' +
					'</ul>' +
    			'</div>'; 
	    	
	    	return template;
	    },
	    
	    _getContentId : function( index, config )
	    {
	    	return this.CONTENT_ID_PREFIX + this._containerId + config.name + '-' + index;
	    },
	    
	    _getHrefId : function( index, config )
	    {
	    	return this.HREF_ID_PREFIX + this._containerId + config.name + '-' + index;
	    },
	    
	    _setActiveMenu : function( index, config )
	    {
	    	// hide current active menu
	    	var currentIdx = this._selectedMenu.idx;
	    	if ( this._selectedMenu.config )
	    	{	
	            actuate.common.web.$('#' + this._getHrefId( currentIdx, this._selectedMenu.config ) ).removeClass('active');
	            actuate.common.web.$('#' + this._getContentId( currentIdx, this._selectedMenu.config ) ).hide();
	    	}
	    	
            // now set the new active menu
            this._selectedMenu.idx = index;
            this._selectedMenu.config = config;
	        actuate.common.web.$('#' + this._getHrefId( index, config )).addClass('active');
	        actuate.common.web.$('#' + this._getContentId( index, config ) ).show();
	    },
	    
	    /**
	     * Render the menus
	     */
	    _renderMenus : function( )
	    {
            this._element.prependTo( actuate.common.web.$( '#' + this._containerId ) );

            var menuContainerEl = this._element.find('.nav');
            
            this._idsOfMainItems = new Array();
            this._idsOfSubItems = new Array();
            for(var i = 0; i < this._configMenus.main.items.length; i++)
            {
            	this._createMenuItem( i, this._configMenus.main.items[i], menuContainerEl, this._configMenus.main );
            }
            this._rendertoolbarSpecificItems();
	    },

	    _rendertoolbarSpecificItems : function()
	    {
	    	//TO be implemented by the menus extending the base class.
	    },
	    
	    _updateParentLabel : function( label, index, config )
	    {
	    	var hrefId = this._getHrefId( index, config );
	    	var el = this._element.find( '#' + hrefId )[0];
	    	el.innerHTML = "";
	    	el.innerHTML = label;
	    },
	    
	    /**
	     * Render the content of this menu.
	     * @param menuItem
	     * @param config the menu config that this menu came from
	     */
	    _renderContentMenu : function( index, config )
	    {
	    	var renderer = this._getContentRenderer( index, config );
	    	if ( renderer )
	    	{	
	    		renderer.render( this._getContentId( index, config ) );
	    	}
	    },
	    
	    _getContentRenderer : function( index, config )
	    {
	    	var menuItem = config.items[index];

	    	if ( menuItem )
    		{
	    		return menuItem.renderer;	
    		}

	    	// this has no menu so return.
	    	if ( config.items.length == 0 ) return;
	    	
	    	// The menu based on the index must be a submenu
	    	var nMenu = index.split("_");
	    	menuItem = config.items[ nMenu[ 0 ] ];
	    	var menuIdx = 0;
	    	for ( var i = 1; i < nMenu.length; i++ )
    		{
	    		menuIdx = nMenu[ i ];
	    		menuItem 	= menuItem.menu[ menuIdx ];
    		}

            var menuItemType = menuItem.type;
            if( menuItemType != "external" )
            {	
            	this._updateParentLabel( menuItem.text, nMenu[ 0 ], config );
            }
	    	
	    	return menuItem.renderer;
	    }
	    
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Base Navigation Menu class
 * 
 */
actuate.common.web.widget.layout.BaseNav = actuate.common.web.Class.create();
actuate.common.web.widget.layout.BaseNav.prototype =
{
	    CONTENT_ID_PREFIX   : 'act_menu_cnt_',
	    HREF_ID_PREFIX      : 'act_menu_href_',
	    _configMenus		: null,
		_selectedMenu 		: null,
		
	    initialize : function( containerId )
	    {
	    	if ( this.__extending )
				return;

	    	this._configMenus	= 
    		{
    			main :
    			{	
    				name	: 'main',
    				items	: [ ]
    			}
    		};
	    	
	    	this._containerId	= containerId;
	    	this._selectedMenu	= { };
	    	this.initComponent( );
	    },

	    /**
	     * Initializes the navigation menu component
	     */
	    initComponent : function( )
	    {
	    	var template = this.getTemplate( );
	    	
	    	var cssNameSpace = actuate.common.web.util.Utility.getRootCSSNamespace( );

	    	// wrap this template with another div to include ac class.
			template = '<div class="' + cssNameSpace + '">' + template + '</div>';

	    	
	    	// Create a dom object based on this html template
	    	this._element = actuate.common.web.$( template );
	    	this._element.attr('id', 'act_menu_panel-' + this._containerId + '-' + actuate.common.web.$('.act_menu_panel').size());
	    },
	    
	    /**
	     * Add a new menu item to the menu navigation 
	     * @param menuConfig
	     * <pre>
	     * 		// Single level Menu
	     * 		var myMenu =
	     * 		{
	     * 			name		: "settings", // internal name of the menu
	     * 			text		: "Settings", // localized text shown as a menu
	     * 			renderer 	: contentRenderer
	     * 		}
	     * 
	     * 		// Double level Menu
	     * 		var myMenuWithSubMenu =
	     * 		{
	     * 			name		: "settings", // internal name of the menu
	     * 			text		: "Settings", // localized text shown as a menu
	     * 			menu		:
	     * 			[
	     * 				{
	     * 					name		: "users", // internal name of the sub menu		
	     * 					text		: "Users", // localized text shown as a sub menu	
	     * 					renderer 	: contentRenderer
	     * 				},
	     * 				{
	     * 					name		: "others", // internal name of the sub menu		
	     * 					text		: "Others", // localized text shown as a sub menu	
	     * 					renderer 	: contentRenderer
	     * 				}
	     * 			]
	     * 		}
	     * </pre>
	     */
	    addMenuItem : function( configMenu )
	    {
	    	this._configMenus.main.items.push(  configMenu );
	    },
	    
	    
	    
	    
	    /**
	     * Handler that is called when the menu is clicked
	     * @param index
	     * @param config the menu config that this index comes from
	     */
	    onMenuClick : function( index, config )
	    {
	    	this._setActiveMenu( index, config );
	    },
	    
	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
	        if( this._rendered )
	        {
	            actuate.common.web.util.Logging.log("Not rendering Menu - already rendered");
	        }
	        else
	        {
	            this._renderMenus( );
	            
	            // By default set the first menu as active
	            this._setActiveMenu( 0, this._configMenus.main );
	            this._rendered = true;
	        }
	    },
	    
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getTemplate : function( )
	    {
	    	var template = 
    			'<div class="application-nav">' + 
    				'<div class="application-nav-inner">' +
    				    '<ul class="nav-right pull-right">' +
    				    '</ul>' +
						'<ul class="nav nav-tabs">' +
						'</ul>' +
					'</div>' +
	    		'</div>';
	    	
	    	return template;
	    },
	    
	    _getSubMenuLabelTemplate : function( label )
	    {
	    	return label + ' <i class="caret"></i>';
	    },
	    
	    getSubMenuTemplate : function( id, label )
	    {
	    	var template = 
	    		'<li><div class="dropdown submenu">' +
	    			'<a id="{id}" role="button" class="dropdown-toggle" data-toggle="dropdown">' + this._getSubMenuLabelTemplate( label ) + '</a>' +
		    		'<ul id="sub{id}" class="dropdown-menu" role="menu" aria-labelledby="{id}">' +
		    		'</ul>' +
	    		'</div></li>';
	    	
	    	template = template.replace( /{id}/g, id );
	    	template = template.replace( /\{label\}/g, label );
	    	
	    	return template;
	    },
	    
	    getMenuLinkTemplate : function ( label ) 
	    {
	        return '<a class="acmenu" data-toggle="pill">' + label + '</a>';
	    },
	    
	    _createSingleMenuItem : function( index, menuItem, config, flagSetFirstActive )
	    {
	    	
	    	var menuItemEl = actuate.common.web.$('<li>');
	    	
	        if(menuItem.cssClass && menuItem.cssClass == 'divider') 
            {
	        	menuItemEl.addClass('divider');
            }
            else 
            {
                var label  = menuItem.text;
                var menuItemType = menuItem.type;
                
                var menuLink = actuate.common.web.$( this.getMenuLinkTemplate(label) );
                menuLink.click( actuate.common.web.Method.bind2( this.onMenuClick, this, index, config ) );
                
                menuItemEl.append(menuLink);
            
                menuItemEl.addClass (menuItem.cssClass);
                if( menuItemType == "external" ) 
                {
                    menuLink.append(actuate.common.web.$('<i class="icon-share"></i>'));
                }
				
				var divId = this._getContentId( index, config );
    	    	var cssNameSpace = actuate.common.web.util.Utility.getRootCSSNamespace( );

                var contDiv = actuate.common.web.$('<div id="' + divId + '" class="' + cssNameSpace + '"></div>');
                actuate.common.web.$('#' + this._containerId).append(contDiv);
                                            
            }
	        // set the style of index(0) active
            if(index == 0 && flagSetFirstActive === true){
            	menuItemEl.addClass('active');
            }
	        // save the menuItem's index position
	        menuItem.index = index;
	        
            return menuItemEl;
	    },
	    
	    _createMenuItem : function( index, menuItem, mainEl, config )
	    {
	    	var subMenus = menuItem.menu;
	    	
	    	// if menu is not set, then this is a single level menu
	    	if ( !subMenus )
	    	{
	    		var item = this._createSingleMenuItem( index, menuItem, config, false );
	    		mainEl.append( item );
	    		
	    		return;
	    	}	
	    	
	    	// handle subMenus
	    	var hrefId = this._getHrefId( index, config );
	    	var template = this.getSubMenuTemplate( hrefId, menuItem.text );
	    	var menuContainer = actuate.common.web.$( template );
	    	mainEl.append( menuContainer );
	    	
	    	var menuEl = menuContainer.find("#sub"+ hrefId );
	    	
	    	for ( var i = 0; i < subMenus.length; i++ )
    		{
	    		var menu = subMenus[ i ];
	    		var item = this._createSingleMenuItem( index + "_" + i, menu, config, true );
	    		menuEl.append( item );
    		}
	    },
	    
	    _getContentId : function( index, config )
	    {
	    	return this.CONTENT_ID_PREFIX + this._containerId + config.name + '-' + index;
	    },
	    
	    _getHrefId : function( index, config )
	    {
	    	return this.HREF_ID_PREFIX + this._containerId + config.name + '-' + index;
	    },
	    
	    _setActiveMenu : function( index, config )
	    {
	    	// hide current active menu
	    	var currentIdx = this._selectedMenu.idx;
	    	if ( this._selectedMenu.config )
	    	{	
	            actuate.common.web.$('#' + this._getHrefId( currentIdx, this._selectedMenu.config ) ).removeClass('active');
	            actuate.common.web.$('#' + this._getContentId( currentIdx, this._selectedMenu.config ) ).hide();
	    	}
	    	
            // now set the new active menu
            this._selectedMenu.idx = index;
            this._selectedMenu.config = config;
	        actuate.common.web.$('#' + this._getHrefId( index, config )).addClass('active');
	        actuate.common.web.$('#' + this._getContentId( index, config ) ).show();

            this._renderContentMenu( index, config );
	    },
	    
	    /**
	     * Render the menus
	     */
	    _renderMenus : function( )
	    {
            this._element.prependTo( actuate.common.web.$( '#' + this._containerId ) );

            var menuContainerEl = this._element.find('.nav');
            
            for(var i = 0; i < this._configMenus.main.items.length; i++)
            {
            	this._createMenuItem( i, this._configMenus.main.items[i], menuContainerEl, this._configMenus.main );
            }
	    },

	    _updateParentLabel : function( label, index, config )
	    {
	    	var hrefId = this._getHrefId( index, config );
	    	var el = this._element.find( '#' + hrefId )[0];
	    	var labelTemplate = this._getSubMenuLabelTemplate( label );
	    	el.innerHTML = "";
	    	el.innerHTML = labelTemplate;
	    },
	    
	    /**
	     * Render the content of this menu.
	     * @param menuItem
	     * @param config the menu config that this menu came from
	     */
	    _renderContentMenu : function( index, config )
	    {
	    	var renderer = this._getContentRenderer( index, config );
	    	if ( renderer )
	    	{	
	    		renderer.render( this._getContentId( index, config ) );
	    	}
	    },
	    
	    _getContentRenderer : function( index, config )
	    {
	    	var menuItem = config.items[index];

	    	if ( menuItem )
    		{
	    		return menuItem.renderer;	
    		}

	    	// this has no menu so return.
	    	if ( config.items.length == 0 ) return;
	    	
	    	// The menu based on the index must be a submenu
	    	var nMenu = index.split("_");
	    	menuItem = config.items[ nMenu[ 0 ] ];
	    	var menuIdx = 0;
	    	for ( var i = 1; i < nMenu.length; i++ )
    		{
	    		menuIdx = nMenu[ i ];
	    		menuItem 	= menuItem.menu[ menuIdx ];
    		}

            var menuItemType = menuItem.type;
            if( menuItemType != "external" )
            {	
            	this._updateParentLabel( menuItem.text, nMenu[ 0 ], config );
            }
	    	
	    	return menuItem.renderer;
	    },

	    _findMenuItem : function( menuName, config )
	    {
	    	for ( var i = 0; i < config.length; i++ )
    		{
	    		var menuItem = config[ i ];
	    		if ( menuItem.name == menuName )
    			{
	    			return menuItem;
    			}
	    		var subMenu = menuItem.menu;
	    		if ( subMenu )
	    		{
	    			return this._findMenuItem( menuName, subMenu );
	    		}
    		}
	    	
	    	return null;
	    },
	    
	    /**
	     * update the parent menu label based on the active menu name found in the configuration
	     */
	    updateParentMenuLabel : function( activeMenuName, config )
	    {
	    	var menuItem = this._findMenuItem( activeMenuName, config.items );
	    	if ( menuItem )
    		{
	    		// find parent menu index.
	    		// Update the root label menu.  TODO: how to update the second label menu when there are multi-level menu.
	    		var menuIdx = menuItem.index.split("_");
	    		this._updateParentLabel( menuItem.text, menuIdx[0], config );
    		}
	    }
	    
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

actuate.common.web.widget.layout.CategoryNavList = actuate.common.web.Class.create();
actuate.common.web.widget.layout.CategoryNavList.prototype =
{	
	/**
	 *
	  var blankRowTemplate = "<p class='acaddedit-emptyrow'></p>";
	  var blankRowItem	= actuate.common.web.widget.control.GridUtil.generateItem( null, "", null, null, null, null, null, blankRowTemplate );
	  var header =
	  {
  			items :
			[
			 	{
			 		colSize : 12,
			 		items	: [ blankRowItem ]
			 	}
			]
	  };
	  var category = 
    	[
 			{
 				name		: "SysAdmin" + "_" + "SystemInfo", // internal name of the menu
 				text		: actuate.umc.util.Utility.getLocalizedString( "Lbl.System.Information" ), // localized text shown as a menu
		 		renderer 	: new actuate.umc.widget.ui.view.settings.Version( )
 			},
 			{
 				name		: "SysAdmin" + "_" + "SystemAdmin", // internal name of the menu
 				text		: actuate.umc.util.Utility.getLocalizedString( "Lbl.System.Admin.Users" ), // localized text shown as a menu
 				renderer 	: this._users
 			}
 		];
 		
 		var config =
 		{
 			category 	: category,
 			header		: header
 		};
 	 *	
	 * @param config
	 */	
	initialize : function( config )
	{
    	if ( this.__extending )
			return;

    	this._categoryConfig= config.category;
    	this._headerConfig	= config.header;
    	
    	this._isconfigNav = this.isConfigNav(this._categoryConfig);
    	
      	if(this._isconfigNav)
    	{
    		this._navlist 		= new actuate.common.web.widget.layout.ConfigNavList( this._categoryConfig );
    	}
    	else
    	{
    		this._navlist 		= new actuate.common.web.widget.layout.NavList( this._categoryConfig );
    	}
    	
    	var onClick 		= actuate.common.web.Method.bind( this._onCategoryClick, this );
    	this._navlist.setOnCategoryClick( onClick );
    	
    	this._categoryId 	= actuate.common.web.util.Utility.createUniqueControlID( );
		var template 		= this.getTemplate( this._categoryId );
		this._element 		= actuate.common.web.$( template );

	},
	
	setCurrentMenu : function( name, triggerCategoryClickEvent )
	{
		this._navlist.setCurrentMenu( name, triggerCategoryClickEvent );
	},
	
	/*
	 * Determines if the navigation should be filter or config navigation
	 * @param navConfig
	 * @returns boolean
	 */
	isConfigNav : function(navconfig)
	{
		var isconfig = true;
		for(config in navconfig)
		{
	        // if there is menu then it is a filter nav
			if(navconfig[config].menu)
			{
				isconfig = false;
				break;
			}
		}
		return isconfig;
	},
	
	getTemplate : function( id )
	{
	    //TODO: Remove <br> and add logic to introduce new line
		var template =  "<div id='acheader_{id}' class='view-header-bar'></div>";
		template 	+= "<div id='{id}'>" + "</div>";
							
		template = template.replace( /{id}/g, id );
		return template;
	},
	
    /**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
        this._element.appendTo( appendTo );
    	this.render( );
	},
	
	refresh : function( name )
	{
		this._navlist.refresh( name );
	},
	
	render : function( )
	{
		if(this._headerConfig.items)
		{
			this.renderHeader( this._headerConfig );
		}	   
		var wrapEl = actuate.common.web.$( '#' + this._categoryId );
		wrapEl.empty();
		this._navlist.appendTo( wrapEl );
		
	},
	
	renderHeader : function( config )
	{
		var el = actuate.common.web.$( '#acheader_' + this._categoryId );
		el.empty();
		var headerinner = actuate.common.web.$("<div class='view-header-bar-inner'></div>");
		headerinner.appendTo(el);
	
		var headerItems = [ config];
        
		var gridConfig = {
        		store	: headerItems
        };
		
		this._header = new actuate.common.web.widget.layout.BaseHeaderbar(config);
		this._header.appendTo(headerinner); 
		
	},
	
	/**
	 * @param {String} name -- name of the category clicked on
	 * @param {String} previousCategory -- name of previous category
	 */
	_onCategoryClick : function( )
	{
		if ( this._onCategoryClick )
		{
			return this._onCategoryClick.apply( this, arguments );
		}	
	},
	
	setOnCategoryClick : function( onClick )
	{
		this._onCategoryClick = onClick;
	},
	
	onUnload : function( )
	{
		this._navlist.onUnload( );
	},

    getNavigationList : function( )
    {
        return this._navlist;
    }


};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout component navigation cenu class
 * 
 */
actuate.common.web.widget.layout.ComponentNav = actuate.common.web.Class.extendClass( actuate.common.web.widget.layout.BaseNav,
{
	    initialize : function( containerId )
	    {
	        if (this.__extending)
	            return;

	        actuate.common.web.widget.layout.ComponentNav.superclass.initialize.call(this, containerId);
	    }
});
/*******************************************************************************
 * Copyright (c) 2013 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Navigation Menu class
 * 
 */

/* Sample Configuration for NavList 
this._config =
	[
		configNav :
		[
			{
		    	name       	: "Header2",
		    	text       	: "Header2",
		    	renderer   	: "Sometext"
			},
			{
			 	name       : "Header3",
    		 	text       : "Header3",
    		 	renderer   : "Sometext"
			}
		]
	];
*/
 
actuate.common.web.widget.layout.ConfigNavList = actuate.common.web.Class.create();
actuate.common.web.widget.layout.ConfigNavList.prototype =
{
        _wizardStateCallback : null,
	    _config			: null,
	    _onCategoryClick: null,
	    _activeMenu		: null,
	    _innerItemArray : new Array(),
	    _listener		: null,
						
	    initialize : function( config )
	    {
	        this._config = config;
	        this._listener = new actuate.common.web.widget.layout.LayoutListener( );
	    	this.initComponent();
	    },

	    /**
	     * Initializes the side-navigation menu component
	     */
	    initComponent : function( )
	    {
	    	var id = actuate.common.web.util.Utility.createUniqueControlID( );
	    	this._navlistId = id;
	    	var template = this.getTemplate( );
	    	
	    	// Create a dom object based on this html template
	    	this._element = actuate.common.web.$(template);
	    },
	    
	    /**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
	        this._element.appendTo(appendTo);
	    	this.render( );
		},
	    
		getLeftNavId : function( )
		{
			return "navleft" + this._navlistId;
		},
		
		getRightNavId : function( )
		{
			return "navcnt_" + this.getLeftNavId( );
		},
		
		getTemplate : function( )
		{
			var id = this.getLeftNavId( );
            var template ="<div class='ac-main-content-area'>" +
            					   	"<div class='ac-side-menu'>" +
		         					   			"<div id='navwrap" + id + "'>" + 
		         					   				this.getLeftNavTemplate( id ) +
		         					   			"</div>" +
		         					"</div>" +
		         					"<div class='ac-right-content-container ac-table-content-area' id='" + this.getRightNavId( ) + "'>" + "</div>" +   		
		         		   "</div>";
           	return template;	               
		},
		
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getLeftNavTemplate : function( id )
	    {
	    	var template = "<div class='vertical-side-menu' initially-selected-index='0' id='{id}' items=''>" +
	         		       "</div>";
	    	
	    	template = template.replace( /{id}/g, id );
	    	
	    	return template;
	    },

	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
            this._renderMenus();
            this._rendered = true;
	    },   
	    
	    /**
	     * Render the menus
	     */
	    _renderMenus : function( )
	    {
	    	var template = "<ul></ul>";
	    		    	
	       	if(this._config != null)
	    	{
	       		var id 		= this.getLeftNavId( );
	       		var navEl 	= actuate.common.web.$( "#" + id );
	       		navEl.empty();
	       		
	       		outerList = actuate.common.web.$(template);
	       		outerList.appendTo(navEl);
	       		
	       		var grpIdx 	= 0;
	    		for(var items in this._config)
		    	{
	    			var menuItem = this._config[items]; 
	    			
	    			if( menuItem.isActive || !this._activeMenu )
	    			{
	    			 // Attempt to set the active menu if no active menu is set yet.
	    			    this.setActiveMenu( menuItem ); 
	    			}
	    			
	    			if( !menuItem.isHidden )
	    			{
	    			    this._renderListHeader( grpIdx, menuItem, menuItem.name, outerList );
            		}
		    		
		    		grpIdx += 1;
		       	}
	    	}
	       	
       		// show the default active Menu, if none is found, the first menu content will be shown.
       		this.renderContent( this._activeMenu );
	       	
	    },
	    
	    _getMenuItemListId : function( index )
	    {
	    	return this.getLeftNavId( ) + "_menuitem_" + index;
	    },
	    
	    /**
	     * Renders the List Header
	     */
	    _renderListHeader : function(index, menuItem, hreftext, appendTo )
	    {
	    	var leftNavId = this.getLeftNavId( );
	    	var template = "";
	    	var disabledClass = "";
	    	if ( menuItem.enableMenu == false )
	    	{
	    		disabledClass = " disabled";
	    	}	
	    	if(index == 0)
	    	{
	    		template = "<li class='selected" + disabledClass + "' id='" +this._getMenuItemListId(index)+ "'></li>";
	    	}
	    	else
	    	{
	    		template = "<li class='" + disabledClass + "' id='" +this._getMenuItemListId(index)+ "'></li>";
	    	}
	    	
	    	this._innerItemArray.push(this._getMenuItemListId(index));
	    	
	    	var templateEl = actuate.common.web.$( template );
	    	templateEl.appendTo( appendTo );

	    	var anchorTemplate = "<a>" + menuItem.text + "</a>"; 
            
	    	var categoryItem = actuate.common.web.$(anchorTemplate);
	    	categoryItem.appendTo( templateEl );
	    	
	    	// attach a click event on the anchor element if this header does not have a 
	    	// sub menu.
	    	if( !menuItem.menu )
	    	{	
	    		templateEl.click( actuate.common.web.Method.bind2( this.onMenuClick, this, menuItem ) );
	    	}
	    },
	    
	    /**
	     * @param {boolean} enable true/false flag use to determine if this menu should be enabled or disabled.
	     * @param {String} menuName name of the menu to enable or disable
	     */
	    enableMenu : function( enable, menuName )
	    {
            for(var menuItemIdx in this._config)
            {
                if( this._config[menuItemIdx].name === menuName )
                {
                	actuate.common.web.$( '#' + this._getMenuItemListId( menuItemIdx ) ).removeClass( "disabled" )
                	if ( enable == false )
                	{	
                		actuate.common.web.$( '#' + this._getMenuItemListId( menuItemIdx ) ).addClass( "disabled" )
                	}
                    break;
                }
            }
	    },
	    
	    setActiveMenu : function( menuItem )
	    {
	    	if ( menuItem.isActive || !this._activeMenu )
	    	{	
		    	if ( menuItem.renderer )
		    	{
		    		this._activeMenu = menuItem;
		       	}
	    	}
	    },
	    
	    renderContent : function( menuItem )
	    {
	    	if ( menuItem.renderer )
	    	{	
	    		var id = this.getRightNavId( );
	    		var el = actuate.common.web.$('#' + id);
	    		el.empty();
	    		
	    		if( menuItem.text && !menuItem.isHidden) 
	    		{
	    		    menuItem.renderer.render( id, menuItem.text );
	    		}
	    		else 
	    		{
	    		    menuItem.renderer.render( id );
	    		}
	    	}
	    },
	    
	    _findMenuItem : function( menuItem, name )
	    {
	    	if ( !menuItem ) return null;
	    	
    		if ( menuItem.name === name )
    		{
    			return menuItem;
    		}
    		
    		if ( menuItem.menu )
    		{
    			var menu = menuItem.menu;
    			for ( var items in menu )
    			{	
    				var item = this._findMenuItem( menu[ items ], name );
    				if ( item )
					{
    					return item;
					}
    			}
    			
    		}	
	    	return null;
	    },
	    
	    /**
	     * refresh the content of this menu item
	     * @param name name of the menu
	     */
	    refresh : function( name )
	    {
    		for( var items in this._config )
	    	{
    			var menuItem = this._findMenuItem( this._config[ items ], name );
    			if ( menuItem )
    			{
    				this.renderContent( menuItem );
    				return true;
    			}	
	    	}
	    },

        getActiveMenu : function( )
        {
            return this._activeMenu;
        },
        
        getActiveMenuName : function( )
        {
        	return this._activeMenu.name;
        },

        /**
         * Get the total number of menus.
         */
        getMenuCount : function( )
        {
            return this._config.length;
        },

        getActiveMenuIdx : function( )
        {
            var activeMenuName = this._activeMenu.name;
            var menuItemIdx = null;
            for(var menuItemIdx in this._config)
            {
                if( this._config[menuItemIdx].name === activeMenuName )
                {
                    return menuItemIdx;
                }
            }
            return null;
        },

        /**
         * returns the next menu associated with this navigation list.  if no available menu next, return null.
         * @return {String} menu name.  null if next menu is not present
         */
        getNextMenu : function( )
        {
            var activeMenuIdx = this.getActiveMenuIdx();
            if( this._config.length > activeMenuIdx - 1 )
            {
                var nextMenu = this._config[ Math.abs(this.getActiveMenuIdx()) + 1 ];
                if( nextMenu && nextMenu.name )
                {
                    return nextMenu.name;
                }
            }
            return null;
        },
        
        goToNext : function( )
        {
        	var nextMenu = this.getNextMenu( );
        	if ( nextMenu )
    		{
                this.setCurrentMenu( nextMenu );
    		}
        },

        _onCategoryClick : function( menuItemIdx, menuItemName, activeMenuName )
        {
        	if ( actuate.common.web.$( '#' + this._getMenuItemListId( menuItemIdx ) ).hasClass( "disabled" ) )
        	{	
        		return false;
        	}
        	var status = this._listener.invokeListener( 'ON_CATEGORY_CLICK', menuItemName, this._activeMenu.name );
        	return status;
        },
        
        /**
         * @param {String} menuItemName -- name of the menu to set current
         * @param {boolean} triggerCategoryClick -- if triggerCategoryClick !== false, trigger click event else do not trigger event.
         */
        setCurrentMenu : function( menuItemName, triggerCategoryClick )
        {
            var menuItem = null;
            var menuItemIdx = null;
            for(var menuItemIdx in this._config)
            {
                if( this._config[menuItemIdx].name === menuItemName )
                {
                    menuItem = this._config[menuItemIdx];
                    break;
                }
            }

            if( !menuItem )
            {
                return;
            }

            if ( triggerCategoryClick !== false )
            {	
	            var status = this._onCategoryClick( menuItemIdx, menuItemName, this._activeMenu.name );
	            if ( status == false ) return;
            }
            
            this.renderContent( menuItem );

            this._activeMenu = menuItem;

            // Remove class selected from any innerItem
            for( var item in this._innerItemArray )
            {
                if(actuate.common.web.$("#"+ this._innerItemArray[item]).hasClass("selected"))
                {
                    actuate.common.web.$("#"+ this._innerItemArray[item]).removeClass("selected");
                }
            }

            actuate.common.web.$( '#' + this._getMenuItemListId( menuItemIdx ) ).addClass( "selected" );

            if( this._wizardStateCallback )
            {
                this._wizardStateCallback( {activeIdx: this.getActiveMenuIdx()} );
            }
        },
        
        /**
         * deprecated
         */
	    setCurrent : function( menuItemName )
        {
	    	this.setCurrentMenu( menuItemName );
        },

	    onMenuClick : function( menuItem, e )
	    {
	    	if( menuItem )
            {
                this.setCurrent( menuItem.name );
            }
	    },
	    
	    onUnload : function( )
		{
			this._element.remove();
		},
	    
		setOnCategoryClick : function( click )
	    {
			this.addListener( 'ON_CATEGORY_CLICK', click );
	    },

	    /**
	     * Add a listener that can be called when certain action is executed from this nav list
	     * Possible Event names are:
	     * <ul>
	     * <li>ON_CATEGORY_CLICK</li>
	     * </ul>
	     * @param {String} eventName
	     * @param {function} handler
	     */
	    addListener : function( eventName, handler )
	    {
	    	this._listener.addListener( eventName, handler );
	    }
};
/*******************************************************************************
 * Copyright (c) 2013 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout EditHeaderbar class. 
 * 
 */
actuate.common.web.widget.layout.EditHeaderBar = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.EditHeaderBar.prototype =
{
		_config : null,
		
		/**
		 * Initializes Headerbar
		 */
		initialize : function(config)
		{
	        if (this.__extending)
	            return;

	        this._config = config;
	    	this._createElement( );
		},	
		
		/**
	     * default implementation class to create html element
	     */
	    _createElement : function()
	    {
	        var tagType = this._getHTMLTag();

	        this._element = new actuate.common.web.$(tagType);
	    },
	    
	    _getHTMLTag : function( )
	    {
	    	var headerId = actuate.common.web.util.Utility.createUniqueControlID( );
	    	
	    	var html = "<div class='view-header-content'></div>";
	    	return html;
	    },
	    
	    /**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
	        this._element.appendTo(appendTo);
	        
			// append all the items into the container.
			this._appendHeader();
		},
		
		onUnload : function( )
		{
			this._element.html( "" );
		},
		
		_appendHeader : function( )
		{
			this._backContainer = new actuate.common.web.$("<div class='view-header-bar-left'></div>");
			this._backContainer.appendTo(this._element);
			
			this._divContainer = new actuate.common.web.$("<div></div>");
			this._divContainer.appendTo(this._element);
			
			this._buttonContainer = new actuate.common.web.$("<div class='pull-right view-header-bar-content-right'></div>");
			this._buttonContainer.appendTo(this._divContainer);
			
			//this._titleContainer = new actuate.common.web.$("<h2 class='view-header-title'></h2>");
			//this._titleContainer.appendTo(this._divContainer);
			
			for(var i = 0; i < this._config.store[0].items.length; i++)
			{
				for(var j = 0; j < this._config.store[0].items[i].items.length; j++)
				{
					this._appendItems(this._config.store[0].items[i].items[j]);
				}
			}
		},
		
		_appendItems : function(items)
		{
		    if( items )
	        {
    			var componentObject = null;
    			var itemHandler	= actuate.common.web.Method.bind(this._toolbarHandler,	this );
    			items.handler = itemHandler;
    			switch(items.type)
    			{
    				case 'save':
    					items.element = this._buttonContainer;
    					componentObject = new actuate.common.web.widget.layout.ToolbarItem(items);
    					break;
    				case 'cancel':
    					items.element = this._buttonContainer;
    					componentObject = new actuate.common.web.widget.layout.ToolbarItem(items);
    					break;
    				case 'back':
    					items.element = this._backContainer
    					componentObject = new actuate.common.web.widget.layout.ToolbarItem(items);
    					break;
    				default:
    					items.element = this._divContainer;
    					componentObject = new actuate.common.web.widget.layout.ToolbarItem(items);
    					break;
    			}
	        }
		},
		
		// Handler to handle header items actions 
		_toolbarHandler : function(cb, type, event, data)
		{
			if(cb)
			{
				if (data )
				{	
					var _itemData = 
					{
						 event: data
				    };
				}
								
				cb(type, _itemData);
			}
		}
		
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Global Navigation Menu class
 * 
 */
actuate.common.web.widget.layout.GlobalIconbar = actuate.common.web.Class.extendClass( actuate.common.web.widget.layout.BaseMenubar,
{
	_subContainerId : null,
	_showCloseButton : false,
	
	    initialize : function( containerId, subContainerId )
	    {
	    	this._configMenus	= 
    		{
    			main :
    			{	
    				name	: 'main',
    				items	: [ ]
    			}
    		};
	    	
	    	this._containerId	= containerId;
	    	this._subContainerId = subContainerId;
	    	this._selectedMenu	= { };
	    	this.initComponent( );
	    },

	    showCloseButton : function( show )
	    {
	    	this._showCloseButton = show;
	    },
	    
	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
	        if( this._rendered )
	        {
	            actuate.common.web.util.Logging.log("Not rendering Menu - already rendered");
	        }
	        else
	        {
	            this._renderMenus( );
	            this._rendered = true;
	        }
	    },
	    
	    onCloseButtonClick : function()
	    {
	    	actuate.common.web.$('#' + this._containerId).hide();
	    },
	    
	    /**
	     * Render the content of this menu.
	     * @param menuItem
	     * @param config the menu config that this menu came from
	     */
	    _renderContentMenu : function( index, config )
	    {
	    	var renderer = this._getContentRenderer( index, config );
	    	if ( renderer )
	    	{	
	    		// The menu based on the index must be a submenu
	    		renderer.render( this._getContentId( index, config ),  config.items[ index ] );
	    	}
	    },
	    
	    _createMenuItem : function( index, menuItem, mainEl, config )
	    {
	    	var subMenus = menuItem.menu;
	    	
	    	// if menu is not set, then this is a single level menu
	    	if ( !subMenus )
	    	{
	    			var item = this._createSingleIconItem( index, menuItem, config );
	    			mainEl.append( item );
	    			return;
	    	}	
	    	
	    	// handle subMenus
	    	var hrefId = this._getHrefId( index, config );
	    	var template = this.getMenuItemsTemplate( hrefId, menuItem.text );
	    	
	    	var menuContainer = actuate.common.web.$( template );
	    	mainEl.append( menuContainer );
	    	
	    	var menuEl = menuContainer.find("#sub"+ hrefId );
	    	
	    	for ( var i = 0; i < subMenus.length; i++ )
    		{
	    		var menu = subMenus[ i ];
	    		var item = this._createSingleMenuItem( index + "_" + i, menu, config );
	    		menuEl.append( item );
    		}
	    },
	    
	    _createSingleIconItem : function( index, menuItem, config )
	    {
	    	var icon = menuItem.icon;
	    	var name = menuItem.name;
	    	var menuLink = null;
	    	var items = menuItem.items;
	    	var liId = 'icon_'+this._getContentId( index, config );
	    	var	liMenuContainer = actuate.common.web.$('<li id="'+liId+'" class="icon-bar-icon-item" name="'+name+'">');
	    	this._idsOfMainItems.push( liMenuContainer );
	    	
	    	if(name == "vertical-divider" )
	    	{
	    		menuLink = actuate.common.web.$('<div class="divider-vertical"></div>');
	    		liMenuContainer.append(menuLink);
	    	}
	    	else
	    	{
	    		menuLink = actuate.common.web.$('<a class="dropdown-toggle" href="#" data-toggle="dropdown" title="'+ menuItem.tooltip +'"><i class="'+icon+'"></i></a>'); 
	    		menuLink.click( actuate.common.web.Method.bind2( this.onIconMenuClick, this, index, config ) );
	    		liMenuContainer.append(menuLink);
	    		
	    		//if there are sub menuitems then create second level of menus
	    		if( items && items[0].length > 0 )
	    		{
	    			var subMenuUl = actuate.common.web.$('<ul class="dropdown-menu dashboard-items-submenu-dropdown">');
	    			var subItemConfig = items[0];
	    			for( var i = 0; i < subItemConfig.length;  i++)
	    			{	
	    				var subName = subItemConfig[i].displayName;
	    				var subIcon = subItemConfig[i].icon;
	    				var subMenuLi = actuate.common.web.$('<li id="'+this._getContentId( index, subItemConfig[i] )+'">');
	    				subMenuLi.click( actuate.common.web.Method.bind2( this.onSubMenuClick, this, i, subItemConfig[i] ) );
		    			var subIcon = actuate.common.web.$('<i class="'+subIcon+'"></i><div class="dashboard-items-popup-title">'+subName+'</div>');
		    			subMenuLi.append(subIcon);
		    			subMenuUl.append( subMenuLi );
	    			}
	    			liMenuContainer.append( subMenuUl );
	    		}
	    	}
	    	return liMenuContainer;
	    },
	    
	    onIconMenuClick : function(index, config)
	    {
	    	var liId = 'icon_'+this._getContentId( index, config );
	    	var liElement = actuate.common.web.$( '#'+liId );
	    	if( liElement && !liElement.hasClass('disabled'))
	    	{
	    		var el_open = actuate.common.web.$('.open');
	    		el_open.removeClass("open"); 

	    		if( this._selectedMenu.idx == index )
	    		{
	    			var menuContainer = actuate.common.web.$('#' + 'icon_'+this._getContentId(index, config ));
	    			if( config.items && config.items[index].items )
	    			{
	    				if( menuContainer.hasClass('open') )
	    					menuContainer.removeClass('open');
	    				else
	    					menuContainer.addClass('open');
	    			}
	    			else
	    			{
	    				this._renderContentMenu( index, config );
	    			}
	    		}
	    		else
	    		{
	    			//remove open class name from items to close any open sub-menu items
	    			var items = config.items;
	    			for( var i = 0; i < items.length; i++ )
	    			{
	    				var subConfig = items[i];
	    				var oldMenuContainer = actuate.common.web.$('#' + 'icon_'+this._getContentId(i, config ));
	    				oldMenuContainer.removeClass('open')
	    			}
	    			//open the submenu for selected item if any
	    			if( config.items && config.items[index].items )
	    			{
	    				var menuContainer = actuate.common.web.$('#' + 'icon_'+this._getContentId(index, config ));
	    				menuContainer.addClass('open');
	    			}
	    			else
	    			{
	    				this._renderContentMenu( index, config );
	    			}
	    		}
	    		this._selectedMenu.idx = index;
	    		this._selectedMenu.config = config;
	    	}
	    	arguments[2].stopPropagation();
	    },
	    
	    _rendertoolbarSpecificItems : function()
	    {
	    	 if( this._showCloseButton )
	        	{
	        		var closeButtonLink = actuate.common.web.$('<i class="dashboard-close-button-icon icon-ygg-close-circle icon-large"></i>');
	        		closeButtonLink.click( actuate.common.web.Method.bind( this.onCloseButtonClick, this ) );
	        		var iconContainer =  actuate.common.web.$("#mainIconDiv_"+ this._containerId );
	        		if(iconContainer)
	        			iconContainer.append(closeButtonLink);
	        	}
	    },
	    
	    /**
	     * Gets the base html template used to render the icons 
	     * @returns {String}
	     */
	    getTemplate : function( )
	    {
	    	var template = '<div class="iconbar">' +
	    		'<div class="iconbar-inner">' +
	    		'<ul id="sub{id}" class="nav nav-pills nav-icon-pills"></ul>' +
	    		'</div>' +
	    		'</div>';
	    	template = template.replace( /{id}/g, this._containerId );
	    	return template;
	    },
	    
	    getIconItems : function()
	    {
	    	return this._idsOfMainItems;
	    }
});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Global Navigation Menu class
 * 
 */
actuate.common.web.widget.layout.GlobalMenubar = actuate.common.web.Class.extendClass( actuate.common.web.widget.layout.BaseMenubar,
{
	_title : '',
	_mainHiglightedSaveConfig : null,
	_mainProfileTemplate : null,
	

	    initialize : function( containerId , title, saveConfig, profileTemplate)
	    {
	    	this._configMenus	= 
    		{
    			main :
    			{	
    				name	: 'main',
    				items	: [ ]
    			}
    		};
	    	
	    	this._containerId	= containerId;
	    	this._title = title;
	    	if( saveConfig )
	    		this._mainHiglightedSaveConfig = saveConfig;
	    	if (profileTemplate)
	    		this._mainProfileTemplate = profileTemplate;
	    	
	    	this._selectedMenu	= { };
	    	this.initComponent( );
	    },
	    
	    onSaveClick : function()
	    {
	    	var renderer = this._mainHiglightedSaveConfig.renderer;
	    	if ( renderer )
	    	{	
	    		renderer.render(null,this._mainHiglightedSaveConfig)
	    	}
	    },
	    
	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
	        if( this._rendered )
	        {
	            actuate.common.web.util.Logging.log("Not rendering Menu - already rendered");
	        }
	        else
	        {
	            this._renderMenus( );
	            this._renderProfile( );
	            if( this._mainHiglightedSaveConfig )
	        	{
	        		var mainSaveElm = actuate.common.web.$('#mainSave');
	        		if( mainSaveElm )
	        			mainSaveElm.click( actuate.common.web.Method.bind( this.onSaveClick, this ) );
	        	}
	        	
	            this._rendered = true;
	        }
	    },
	    
	    /**
	     * Render the content of this menu.
	     * @param menuItem
	     * @param config the menu config that this menu came from
	     */
	    _renderContentMenu : function( index, config )
	    {
	    	var renderer = this._getContentRenderer( index, config );
	    	if ( renderer )
	    	{	
	    		// The menu based on the index must be a submenu
		    	var nMenu = index.split("_");
		    	menuItem = config.items[ nMenu[ 0 ] ];
		    	var menuIdx = 0;
		    	for ( var i = 1; i < nMenu.length; i++ )
	    		{
		    		menuIdx = nMenu[ i ];
		    		menuItem 	= menuItem.menu[ menuIdx ];
	    		}
		    	var elemId = 'memuItem_' + this._getContentId( index, config );
		    	var liElement = actuate.common.web.$( '#li_' + elemId );
		    	if( liElement && !liElement.hasClass('disabled'))
		    	{
		    		if( renderer.render )
		    			renderer.render( menuItem, elemId );
		    	}
	    	}
	    },
	    
	    _createMenuItem : function( index, menuItem, mainEl, config )
	    {
	    	var subMenus = menuItem.menu;
	    	
	    	// if menu is not set, then this is a single level menu
	    	if ( !subMenus )
	    	{
	    			var item = this._createSingleMenuItem( index, menuItem, config );
	    			mainEl.append( item );
		    		return;
	    	}	
	    	
	    	// handle subMenus
	    	var hrefId = this._getHrefId( index, config );
	    	var template = this.getMenuItemsTemplate( hrefId, menuItem.text, menuItem.name );
	    	
	    	var menuContainer = actuate.common.web.$( template );
	    	this._idsOfMainItems.push( menuContainer );
	    	menuContainer.click( actuate.common.web.Method.bind2( this.onMainMenuClick, this, index, config ) );
	    	mainEl.append( menuContainer );
	    	
	    	var menuEl = menuContainer.find("#sub"+ hrefId );
	    	
	    	for ( var i = 0; i < subMenus.length; i++ )
    		{
	    		var menu = subMenus[ i ];
	    		var item = this._createSingleMenuItem( index + "_" + i, menu, config );
	    		menuEl.append( item );
    		}
	    },
	    
	    _createSingleMenuItem : function( index, menuItem, config )
	    {
	    	var label 	= menuItem.text;
	    	var menuItemType = menuItem.type;
	    	var icon = menuItem.icon;
	    	var items = menuItem.items;
	    	var subMenuItem = null;
	    	var name = menuItem.name;
	    	
	    	var liMenuItem = actuate.common.web.$('<li id="li_memuItem_'+this._getContentId( index, config )+'" name='+name+'>');
	    	this._idsOfSubItems.push( liMenuItem );
	    	var menuLink = null;
	    	if(name == "divider" )
	    	{
	    		menuLink = actuate.common.web.$('<div class="divider"></div>');
	    	}
	    	else
	    	{
	    		//if there are sub menuitems then create second level of menus
	    		if( items && items[0].length > 0 )
	    		{
	    			var subItemConfig = items[0];
	    			menuLink = actuate.common.web.$('<a href="#" id="memuItem_'+this._getContentId( index, subItemConfig )+'" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-ygg-caret-right icon-large pull-right dropdown-menu-caret"></i><i class="'+icon+'"></i>'+ label + '</a>');
	    			subMenuItem = actuate.common.web.$('<ul class="dropdown-menu sub-menu">');
	    			for( var i = 0; i < subItemConfig.length;  i++)
	    			{	
	    				var subItem = subItemConfig[i];
	    				var subMenuLink = actuate.common.web.$('<li><a href="#" id="submemuItem_'+this._getContentId( i, subItem )+'"><i class="'+subItem.icon+'"></i>'+ subItem.text +'</a></li>');
	    				subMenuLink.click( actuate.common.web.Method.bind2( this.onSubMenuClick, this, i,  subItem ) );
	    				subMenuItem.append( subMenuLink );
	    			}
	    		}
	    		else
	    			menuLink = actuate.common.web.$('<a href="#" id="memuItem_'+this._getContentId( index, config )+'"><i class="'+icon+'"></i>'+ label + '</a>'); 
	    		
	    		menuLink.click( actuate.common.web.Method.bind2( this.onMenuClick, this, index, config ) );
	    	}

	    	liMenuItem.append(menuLink);
	    	if( subMenuItem )
	    		liMenuItem.append( subMenuItem );
	    	
	    	return liMenuItem;
	    },
	    
	    getMenuItemsTemplate : function(id, label, name)
	    {
	    	var template = 
	    		'<li id="li_{id}" name="'+name+'" class="btn-group">'+
					'<a id="{id}" class="dropdown-toggle" data-toggle="dropdown" href="#">'+label+'</a>' +
						'<ul id="sub{id}" class="dropdown-menu" aria-labelledby="{id}">' + 
						'</ul>' +
				'</li>';
	    	template = template.replace( /{id}/g, id );
	    	template = template.replace( /\{label\}/g, label );
	    	
	    	return template;
	    },
	    
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getTemplate : function( )
	    {
	    	var template;
			if(this._mainHiglightedSaveConfig || this._mainProfileTemplate)
			{
				template = '<div class="filebar">' +
								'<div class="filebar-inner">' +
									'<div class="filebar-right">' ;
				if (this._mainProfileTemplate) {
					template += '<div id="' + this._getProfileId( )+ '"' + 'class="pull-right ac-filebar-actuate-menu"></div>';
				}
				
				if (this._mainHiglightedSaveConfig) {
					template += '<button type="button" id="mainSave" class="btn btn-primary pull-right">' +
					 			'<i class="'+this._mainHiglightedSaveConfig.icon+'"></i>' + this._mainHiglightedSaveConfig.text +'</button>';
				}
																					
				template +='<h2 class="filebar-title pull-right ng-binding">'+this._title+'</h2>' +
									'</div>' +
								'<ul class="nav nav-pills nav-file-pills"></ul>' +
								'</div>' +
							'</div>';
			}
			else
			{
				template = '<div class="filebar">' +
								'<div class="filebar-inner">' +
									'<div class="filebar-right">' +
										'<h2 class="filebar-title pull-right ng-binding">'+this._title+'</h2>' +
									'</div>' +
									'<ul class="nav nav-pills nav-file-pills"></ul>' +
								'</div>' +
							'</div>';
			}
			return template;
	    },
	    
	    _getProfileId : function( )
	    {
	    	return this.PROFILE_ID_PREFIX + this._containerId;
	    },
	    
	    _renderProfile : function( )
	    {
	    	var id = this._getProfileId( );
	    	var templateId 	= id + "_" + actuate.common.web.util.Utility.createUniqueControlID( );
	    				    	
	    	var menuContainer = actuate.common.web.$( this._mainProfileTemplate );
	    	var mainEl = actuate.common.web.$( '#' + id );
	    	mainEl.append( menuContainer );
	    	
	    },
	    
	    getMenuItems : function()
	    {
	    	return this._idsOfMainItems;
	    },
	    
	    getSubMenuItems : function()
	    {
	    	return this._idsOfSubItems;
	    }
});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Global Navigation Menu class
 * 
 */
actuate.common.web.widget.layout.GlobalNavMenu = actuate.common.web.Class.extendClass( actuate.common.web.widget.layout.BaseNav,
{
	    PROFILE_ID_PREFIX	: 'act_menu_profile_',
	    LOGOUT_ID_PREFIX    : 'act_menu_logout_',
		_logoutHandler		: null,
		username			: '',
		
	    initialize : function( containerId, config )
	    {
	    	this._configMenus	= 
    		{
    			main :
    			{	
    				name	: 'main',
    				items	: [ ]
    			},	
    			profile : 
    			{
    				name	: 'profile',
    				items :	[ ]
    			}
    		};
	    	
	    	this._hideLogOut = false;
	    	
	    	if( config ) 
            {
	    		if( config.hideLogOut )
	    			this._hideLogOut = config.hideLogOut;
	    		
	    		if( config.helpConfig)
	    			this._helpConfig = config.helpConfig;
	    		
	    		if(config.username)
	    			this.username	=	config.username;
	    	}
	    	
	    	this._containerId	= containerId;
	    	this._selectedMenu	= { };
	    	this.initComponent( );
	    },
	    
	    addProfileMenuItem : function( configMenu )
	    {
	    	this._configMenus.profile.items.push( configMenu );
	    },
	    
	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
	        if( this._rendered )
	        {
	            actuate.common.web.util.Logging.log("Not rendering Menu - already rendered");
	        }
	        else
	        {
	            this._renderMenus( );
	            
	            // By default set the first menu as active
	            this._setActiveMenu( 0, this._configMenus.main );
		        
	            this._renderProfile( );
	            this._rendered = true;
	        }
	    },
	    
	    _getSubMenuLabelTemplate : function( label )
	    {
	    	return label + ' <i class="icon-ygg-caret-down"></i>';
	    },
	    
	    getSubMenuTemplate : function( id, label )
	    {
	        var template = 
	                '<li>' +
	                    '<a id="{id}" role="button" class="dropdown-toggle" data-toggle="dropdown">' + this._getSubMenuLabelTemplate( label ) + '</a>' +
	                    '<ul id="sub{id}" class="dropdown-menu" role="menu" aria-labelledby="{id}">' +
	                    '</ul>' +
	                '</li>';
	            
	            template = template.replace( /{id}/g, id );
	            template = template.replace( /\{label\}/g, label );
	    	
	    	return template;
	    },    
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getTemplate : function( )
	    {
			var template =
				'<div class="acGlblNavBar">' +
					'<div class="navbar">' +
						'<div class="navbar-inner">' +
							'<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' +
								'<span class="icon-bar"></span>' +
								'<span class="icon-bar"></span>' +
								'<span class="icon-bar"></span>' +
							'</a>' +
							'<i class="actuate"></i>' +
							'<ul class="nav"></ul>' +
							'<ul  id="' + this._getProfileId( )+ '"' + ' class="right-icons"></ul>' +
						'</div>' +
					'</div>' +
				'</div>';
			return template;
	    },

	    getUserProfileTemplate : function( id, label, usernameLabel )
	    {
	        var template = '';
            if( ! this._hideLogOut ) 
            {
            	if( this._helpConfig )
            	{
            		template =
            			'<li><a id="help_{id}" href="#">'+this._helpConfig.text+'</a></li>' +
            			'<li><div class="divider"></div></li>';
            	}
                     
                template = template + 
                		'<li>' +    
                    		'<a id="user-drop-down{id}" role="button" data-toggle="dropdown"><span class="user-name">{username}</span><i class="icon-large icon-ygg-user"></i> <i class="icon-ygg-caret-down"></i></a>' +
                    		'<ul id="sub{id}" class="dropdown-menu user-profile-submenu" role="menu" aria-labelledby="user-drop-down{id}">' +
                    		'</ul>' +
                    	'</li>';
                
                template = template.replace( /{id}/g, id );
                template = template.replace( /\{label\}/g, label );
                template = template.replace( /\{username\}/g, usernameLabel );

            }
            
            return template;
	    },
	    getProfileTemplate : function( id, label )
	    {
	        var template = '';
            if( ! this._hideLogOut ) 
            {
            	if( this._helpConfig )
            	{
            		template =
            			'<li><a id="help_{id}" href="#">'+this._helpConfig.text+'</a></li>' +
            			'<li><div class="divider"></div></li>';
            	}
                     
                template = template + 
                		'<li>' +    
                    		'<a id="user-drop-down{id}" role="button" data-toggle="dropdown"><span class="user-name">&nbsp;</span><i class="icon-large icon-ygg-user"></i> <i class="icon-ygg-caret-down"></i></a>' +
                    		'<ul id="sub{id}" class="dropdown-menu" role="menu" aria-labelledby="user-drop-down{id}">' +
                    		'</ul>' +
                    	'</li>';
                
                template = template.replace( /{id}/g, id );
                template = template.replace( /\{label\}/g, label );
 
            }
            
            return template;
	    },

	    _getLogoutId : function( )
	    {
	    	return this.LOGOUT_ID_PREFIX + this._containerId;
	    },
	    
	    _getProfileId : function( )
	    {
	    	return this.PROFILE_ID_PREFIX + this._containerId;
	    },
	    
	    onHelpClicked : function()
	    {
	    	if( this._helpConfig && this._helpConfig.renderer )
	    		this._helpConfig.renderer.render( );
	    },
	    
	    _renderProfile : function( )
	    {
	    	var id = this._getProfileId( );
	    	var templateId 	= id + "_" + actuate.common.web.util.Utility.createUniqueControlID( );
	    	
	    	var template;
	    	if(!this.username || (this.username.length===0))
	    	{
		    	template = this.getProfileTemplate( templateId, null );
	    	}else
	    	{
	    		template = this.getUserProfileTemplate( templateId, null, this.username );
	    	}
	    	var menuContainer = actuate.common.web.$( template );
	    	
	    	var mainEl = actuate.common.web.$( '#' + id );
	    	mainEl.append( menuContainer );
	    	
	    	var helpEl = actuate.common.web.$("#help_"+ templateId );
	    	if( helpEl )
	    		helpEl.click(actuate.common.web.Method.bind( this.onHelpClicked, this ) );
	    	
	    	var menuProfEl = mainEl.find("#sub"+ templateId );
            for(var i = 0; i < this._configMenus.profile.items.length; i++)
            {
            	this._createMenuItem( i, this._configMenus.profile.items[i], menuProfEl, this._configMenus.profile );
            }
	    },
	    
	    getMenuLinkTemplate : function ( label ) 
        {
            return '<a class="acmenu">' + label + '</a>';
        },
        
        setActiveLabel : function( menuName )
        {
        	this.updateParentMenuLabel( menuName, this._configMenus.main );
        }
});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Grid class.  By default this class uses a 960 px grid with 12 columns
 * 
 */
actuate.common.web.widget.layout.Grid = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.Grid.prototype =
{

	_config : null,
	
	/**
	 * Initializes Grid.
	 */
	initialize : function(config)
	{
        if (this.__extending)
            return;

        this._config = config;
        
		this._createElement( );
	},
	
	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
        this._element.appendTo(appendTo);
        
		// append all the items into the container.
		this._appendItems( );
	},
	
	onUnload : function( )
	{
		this._element.html( "" );
	},
	
	_appendItems : function( )
	{
		this._appendHeader( );
		
		var store = this._config.store;

		if ( !store )  return ;
		
		for ( var i = 0; i < store.length; i++ )
		{
			var rowConfig =
			{
				row 		: store[ i ],
				rowIndex 	: i
			};
			
			var row = new actuate.common.web.widget.control.Grid.Row( rowConfig );
			row.appendTo( this._element );
		}
	},
	
	/**
	 * This will add a row to the UI as well as add this row to the store.
	 * @param row
	 */
	addRow : function( row )
	{
		var store 	= this._config.store;
		if ( !store )
		{
			store = [];
			this._config.store = store;
		}
		store.push( row );
		
		var rowConfig =
		{
				row	: row,
				rowIndex : store.length
		};
		
		var row = new actuate.common.web.widget.control.Grid.Row( rowConfig );
		row.appendTo( this._element );
	},
	
	_appendHeader : function( )
	{
		var headerConfig = 
		{
			row : this._config.headers
		};
		
		var header = new actuate.common.web.widget.control.Grid.Row( headerConfig );
		header.appendTo( this._element );
	},
	
	/**
     * default implementation class to create html element
     */
    _createElement : function()
    {
        var tagType = this._getHTMLTag();

        this._element = new actuate.common.web.$(tagType);
    },

    _getHTMLTag : function( )
    {
    	var gridId = actuate.common.web.util.Utility.createUniqueControlID( );
    	
    	var html = "<div id=\"gridwrap_" + gridId + "\" " + " class=\"acGridContainer\"" + ">" ; 
    	return html;
    }
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout listener class to hold all the handlers.  It is up to the user to call the handler.
 * 
 */
actuate.common.web.widget.layout.LayoutListener = actuate.common.web.Class.create();
actuate.common.web.widget.layout.LayoutListener.prototype =
{
	_listener : null,
	
    initialize : function( )
    {
    	this._listener = [ ];
    },
    
    addListener : function( eventName, handler )
    {
    	this._listener[ eventName ] = handler;
    },
    
    removeListener : function( eventName )
    {
    	delete this._listener[ eventName ];
    },
    
    /**
     * @param {String} eventName
     * @param {args} arguments passed to the handler
     */
    invokeListener : function( )
    {
    	var eventName = arguments[0];
    	
    	if ( !eventName ) return;
    		
    	var handler = this._listener[ eventName ];
    	if ( handler )
		{
    		var args = [];
    	    for( var i = 1; i < arguments.length; i++ )
    	    {
    	    	args.push( arguments[i] );
    	    }

    		return handler.apply( this, args );
		}
    }
}/*******************************************************************************
 * Copyright (c) 2013 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Navigation Menu class
 * 
 */
/* Sample Configuration for NavList 
	    	this._config =
	    		[
	    			{
	    				name		: "Header", // internal name of the menu
	    				text		: "Header", // localized text shown as a menu
	    				menu		:
		    			[
		    			 	{
		    			 		name		: "Overview", // internal name of the sub menu		
		    			 		text		: "Overview", // localized text shown as a sub menu	
		    			 		renderer 	: "contentRenderer"
		    			 	},
		    			 	{
		    			 		name		: "others", // internal name of the sub menu		
		    			        text		: "Clusters", // localized text shown as a sub menu	
		    			        renderer 	: "contentRenderer"
		    			    }
		    			]
	    			},
	    			{
		    		    name       	: "Header2",
		    		    text       	: "Header2",
		    		    renderer   	: "Sometext"
		    		},
		    		{
		    			 name       : "Header3",
			    		 text       : "Header3",
			    		 renderer   : "Sometext"
		    		},
		    		{
		    			 name       : "Header4",
			    		 text       : "Header4",
			    		 menu       : 
			    		 [
		    			 	{
		    			 		name		: "Users", // internal name of the sub menu		
		    			 		text		: "Users", // localized text shown as a sub menu	
		    			 		renderer 	: "contentRenderer"
		    			 	},
		    			 	{
		    			 		name		: "servers", // internal name of the sub menu		
		    			        text		: "Servers", // localized text shown as a sub menu	
		    			        renderer 	: "contentRenderer"
		    			    }
			    		 ]
		    		}
	    		];
*/
 
actuate.common.web.widget.layout.NavList = actuate.common.web.Class.create();
actuate.common.web.widget.layout.NavList.prototype =
{
	    _config			   : null,
	    _onCategoryClick   : null,
	    _activeMenu		   : null,
	    _innerItemArray    : new Array(),
	    _overflowThreshold : 20,
						
	    initialize : function( config )
	    {
	        this._config = config;
	    	this.initComponent();
	    },

	    /**
	     * Initializes the side-navigation menu component
	     */
	    initComponent : function( )
	    {
	    	var id = actuate.common.web.util.Utility.createUniqueControlID( );
	    	this._navlistId = id;
	    	var template = this.getTemplate( );
	    	
	    	// Create a dom object based on this html template
	    	this._element = actuate.common.web.$(template);
	    },
	    
	    /**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
	        this._element.appendTo(appendTo);
	    	this.render( );
		},
	    
		getLeftNavId : function( )
		{
			return "navleft" + this._navlistId;
		},
		
		getRightNavId : function( )
		{
			return "navcnt_" + this.getLeftNavId( );
		},
		
		getTemplate : function( )
		{
			var id = this.getLeftNavId( );
            var template ="<div class='ac-main-content-area'>" +
            					   	"<div class='ac-side-menu'>" +
		         					   			"<div id='navwrap" + id + "'>" + 
		         					   				this.getLeftNavTemplate( id ) +
		         					   			"</div>" +
		         					"</div>" +
		         					"<div class='ac-right-content-container ac-table-content-area' id='" + this.getRightNavId( ) + "'>" + "</div>" +   		
		         		   "</div>";
           	return template;	               
		},
		
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getLeftNavTemplate : function( id )
	    {
	    	var template = "<div class='accordion' id='{id}'>" +
	         		       "</div>";
	    	
	    	template = template.replace( /{id}/g, id );
	    	
	    	return template;
	    },

	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
            this._renderMenus();
            this._rendered = true;
	    },   
	    
	    refreshLeftNavContents : function( config ) 
	    {
	    	this._renderInnerListDiv( config.itemIndex, config.items, config.appendTo );
	    },
	    
	    /**
	     * Render the menus
	     */
	    _renderMenus : function( )
	    {
	    	var template 		= "<div class='accordion-group'></div>";
	    	var accordionGroup 	= null;
	    	var me = this;
	    	
	       	if(this._config)
	    	{
	       		var id 		= this.getLeftNavId( );
	       		var navEl 	= actuate.common.web.$( "#" + id );
	       		navEl.empty();
	       		
	    		for(var grpIdx = 0; grpIdx < this._config.length; grpIdx++)
		    	{
	    			var menuItem = this._config[grpIdx]; 
	    			
	    			if( (!menuItem.isHidden && menuItem.isActive) || !this._activeMenu) 
	    			{
	    			 // Attempt to set the active menu if no active menu is set yet.
	    			    this.setActiveMenu( menuItem ); 
	    			}
	    			
	    			if( !menuItem.isHidden )
	    			{
	    			    accordionGroup = actuate.common.web.$(template);
	                    accordionGroup.appendTo( navEl );
	                    this._renderListHeader( grpIdx, menuItem, menuItem.name, accordionGroup );
	                    
                        //Check if there is a second level
                        if( menuItem.menu != undefined )
                        {
                            this._renderMenuItemDiv( grpIdx, menuItem, accordionGroup );
                        }
	    			}
		       	}
	    	}
	       	
       		// show the default active Menu, if none is found, the first menu content will be shown.
       		this.renderContent( this._activeMenu );
	       	
	    },
	    
	    _getMenuItemId : function( index )
	    {
	    	return this.getLeftNavId( ) + "_" + index;
	    },
	    
	    _getMenuInnerItemId : function( index )
	    {
	    	return this.getLeftNavId( ) + "_inneritem_" + index;
	    },
	    
	    /**
	     * Renders the List Header
	     */
	    _renderListHeader : function(index, menuItem, hreftext, appendTo )
	    {
	    	var leftNavId = this.getLeftNavId( );
	    	var template = "<div class='accordion-heading' title='"+menuItem.text +"'></div>";
	    	var templateEl = actuate.common.web.$( template );
	    	templateEl.appendTo( appendTo );

	    	var anchorTemplate = "<a data-parent='#" + leftNavId + "' href='#" + this._getMenuItemId( index ) + "'>"; 
            if( menuItem.menu != undefined )
            {	
            	anchorTemplate += "<a class='accordion-toggle  collapse in' data-toggle='collapse' data-parent='#" + 
            	leftNavId + "' href='#" + this._getMenuItemId( index ) + "'> ";
            	anchorTemplate += "<i class='icon-ygg-chevron-down accordion-toggle-icon'></i>";
            }
            anchorTemplate += menuItem.text + "</a>";

	    	var categoryItem = actuate.common.web.$(anchorTemplate);
	    	categoryItem.appendTo( templateEl );
	    	
	    	// attach a click event on the anchor element if this header does not have a 
	    	// sub menu.
	    	if( !menuItem.menu )
	    	{	
	    		categoryItem.click( actuate.common.web.Method.bind2( this.onMenuClick, this, menuItem ) );
	    	}
	    },
	    	
	    _renderMenuItemDiv : function(index, menuItem, accordionGroup) 
	    {
	    	var me = this;
	    	var searchBoxId 	= actuate.common.web.util.Utility.createUniqueControlID( );
	    	var searchResultDivId = actuate.common.web.util.Utility.createUniqueControlID( );
	    	
	    	var template = "<div id='" + this._getMenuItemId( index ) + "' class='accordion-body collapse in'>" +
						    	"<div id='" + searchBoxId + "'></div>" + 
								"<div id='" + searchResultDivId + "' style='height:500px;'>" +
									"<ul class='accordion-inner selectable'>"+
									"</ul>"+
								"</div>" +
							"</div>";
	    	
	    	var innerDiv = actuate.common.web.$(template);
	    	innerDiv.appendTo(accordionGroup);
	    	
	    	if(menuItem.menu.length > this._overflowThreshold) 
	    	{
	    		innerDiv.find('#' + searchResultDivId).css('overflow-y','scroll');
	    	}
	    	
	    	if( menuItem.searchconfig ) 
            {
	    		var searchComponent =  actuate.common.web.$("#" + searchBoxId);
    	    	
    	    	var config = 
    	    	{
    	    			width 		: '170px',
    	    			placeholder : menuItem.searchconfig.placeHolder
    	    	}
    	    	var searchBox = new actuate.common.web.widget.control.TextField( config );
    	    	searchBox.appendTo( searchComponent );
    	    	
    	    	searchComponent.find("input").keyup(actuate.common.web.Method.bind2(function(index, e){
    		    	if(e.keyCode != 0)
    		    	{
    		       	   if(e.keyCode != 13)
    		       	   {
    		       		   data = this[0].value ;
    		       	   }
    		       	   actuate.common.web.$(".search-delete-text-icon").css("display","block");
    		    	}
    		    	else
    		    	{
    		    	   data = this[0].value.substring(0,this.value.length-1);
    		      	}
    		    	
    		    	var config = 
    		    	{
    		    			refreshLeftNavContents : actuate.common.web.Method.bind(me.refreshLeftNavContents, me),
    		    			itemIndex	   		   : index,
    		    			name		   		   : menuItem.name,
    		    			appendTo			   : innerDiv,
    		    			filter				   : data
    		    	}
    		    	
    		    	menuItem.searchconfig.searchCallBack(null, config);
    		    	
    	    	}, searchComponent.find("input"), index));
            }
	    	
	    	this._renderInnerListDiv( index, menuItem.menu, innerDiv );
	    },
	    
	    /**
	     * Render inner Div
	     */
	    
	    _renderInnerListDiv  : function(index, menu, innerDiv) 
	    {
	    	if( innerDiv.length ) 
	    	{
	    		innerDiv.find("ul").empty();
	    	}
	    	
	       	if ( menu )
	       	{
		       	//Render accordion inner items
		    	for(var i = 0; i < menu.length; i++)
				{
					this._renderListInnerItems(menu[i], i).appendTo(innerDiv.find("ul"));
				}
	       	}
	    },
	    
	    setActiveMenu : function( menuItem )
	    {
	    	if ( menuItem.isActive || !this._activeMenu )
	    	{	
		    	if ( menuItem.renderer )
		    	{
		    		this._activeMenu = menuItem;
		       	}
	    	}
	    },
	    
	    /**
	     * Render the List Items
	     */
	    _renderListInnerItems : function(menuItem, index)
	    {
	    	var template = "<li id='" + this._getMenuInnerItemId(index) + "'><a><div>" +menuItem.text+ "</div></a></li>"; // class=\"sidenav\"
	    				   
	    	var innerItem = actuate.common.web.$(template);
	    	
	    	if ( menuItem.isActive || !this._activeMenu )
	    	{
	    		innerItem.addClass("selected");
	    	}
	    	var divElement = innerItem.find('div');
	    	divElement.addClass('cliptext');
	    	
	    	var onMouseEnter = function() {
	    	    divElement.attr('title', menuItem.text);
	    	};
	    	
/*	    	var onMouseOut = function() {
                divElement.attr('title', '');
            }*/
	    	
	    	innerItem.mouseenter(onMouseEnter);
	    //	innerItem.mouseout(onMouseOut);
	    	this._innerItemArray.push(this._getMenuInnerItemId(index));
	    	innerItem.click( actuate.common.web.Method.bind2( this.onMenuClick, this, menuItem ) );
	    	
	    	this.setActiveMenu( menuItem );

	    	return innerItem;
	    },
	    
	    renderContent : function( menuItem )
	    {
	    	if ( menuItem.renderer )
	    	{	
	    		var id = this.getRightNavId( );
	    		var el = actuate.common.web.$('#' + id);
	    		el.empty();
	    		
	    		if( menuItem.text && !menuItem.isHidden) 
	    		{
	    		    menuItem.renderer.render( id, menuItem.text );
	    		}
	    		else 
	    		{
	    		    menuItem.renderer.render( id );
	    		}
	    	}
	    },
	    
	    _findMenuItem : function( menuItem, name )
	    {
	    	if ( !menuItem ) return null;
	    	
    		if ( menuItem.name === name )
    		{
    			return menuItem;
    		}
    		
    		if ( menuItem.menu )
    		{
    			var menu = menuItem.menu;
    			for ( var items in menu )
    			{	
    				var item = this._findMenuItem( menu[ items ], name );
    				if ( item )
					{
    					return item;
					}
    			}
    			
    		}	
	    	return null;
	    },
	    
	    /**
	     * refresh the content of this menu item
	     * @param name name of the menu
	     */
	    refresh : function( name )
	    {
    		for(var i = 0; i < this._config.length; i++ )
	    	{
    			var menuItem = this._findMenuItem( this._config[ items ], name );
    			if ( menuItem )
    			{
    				this.renderContent( menuItem );
    				return true;
    			}	
	    	}
	    },
	    
	    onMenuClick : function( menuItem, e )
	    {
	    	if ( this._onCategoryClick )
	    	{
	    		this._onCategoryClick( menuItem.name );    		
	    	}	
	    	this.renderContent( menuItem );
	    	
	    	// Remove class selected from any innerItem
	    	for(var item in this._innerItemArray)
	    	{
	    		if(actuate.common.web.$("#"+ this._innerItemArray[item]).hasClass("selected"))
		    	{
		    		actuate.common.web.$("#"+ this._innerItemArray[item]).removeClass("selected");
		    	}
	    	}
	    	// Add class selected to clicked innerItem
	       	actuate.common.web.$("#"+e.currentTarget.id).addClass("selected");
	    },
	    
	    onUnload : function( )
		{
			this._element.remove();
		},
	    
		setOnCategoryClick : function( click )
	    {
	    	this._onCategoryClick = click;
	    }
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Navigation Menu class
 * 
 */
actuate.common.web.widget.layout.NavMenu = actuate.common.web.Class.create();
actuate.common.web.widget.layout.NavMenu.prototype =
{
	    CONTENT_ID_PREFIX   : 'act_menu_cnt_',
	    HREF_ID_PREFIX      : 'act_menu_href_',
	    LOGOUT_ID_PREFIX    : 'act_menu_logout_',
	    PROFILE_ID_PREFIX	: 'act_menu_profile_',
	    _configMenus		: null,
		_selectedMenu 		: null,
		_logoutHandler		: null,
		
	    initialize : function( containerId )
	    {
	    	this._configMenus	= 
    		{
    			main :
    			{	
    				name	: 'main',
    				items	: [ ]
    			},	
    			profile : 
    			{
    				name	: 'profile',
    				items :	[ ]
    			}
    		};
	    	
	    	this._containerId	= containerId;
	    	this._selectedMenu	= { };
	    	this.initComponent( );
	    },

	    /**
	     * Initializes the navigation menu component
	     */
	    initComponent : function( )
	    {
	    	var template = this.getTemplate( );
	    	
	    	// Create a dom object based on this html template
	    	this._element = actuate.common.web.$( template );
	    	this._element.attr('id', 'act_menu_panel-' + this._containerId + '-' + actuate.common.web.$('.act_menu_panel').size());
	    },
	    
	    /**
	     * Add a new menu item to the menu navigation 
	     * @param menuConfig
	     * <pre>
	     * 		// Single level Menu
	     * 		var myMenu =
	     * 		{
	     * 			name		: "settings", // internal name of the menu
	     * 			text		: "Settings", // localized text shown as a menu
	     * 			renderer 	: contentRenderer
	     * 		}
	     * 
	     * 		// Double level Menu
	     * 		var myMenuWithSubMenu =
	     * 		{
	     * 			name		: "settings", // internal name of the menu
	     * 			text		: "Settings", // localized text shown as a menu
	     * 			menu		:
	     * 			[
	     * 				{
	     * 					name		: "users", // internal name of the sub menu		
	     * 					text		: "Users", // localized text shown as a sub menu	
	     * 					renderer 	: contentRenderer
	     * 				},
	     * 				{
	     * 					name		: "others", // internal name of the sub menu		
	     * 					text		: "Others", // localized text shown as a sub menu	
	     * 					renderer 	: contentRenderer
	     * 				}
	     * 			]
	     * 		}
	     * </pre>
	     */
	    addMenuItem : function( configMenu )
	    {
	    	this._configMenus.main.items.push(  configMenu );
	    },
	    
	    addProfileMenuItem : function( configMenu )
	    {
	    	this._configMenus.profile.items.push( configMenu );
	    },
	    
	    /**
	     * Handler that is called when the menu is clicked
	     * @param index
	     * @param config the menu config that this index comes from
	     */
	    onMenuClick : function( index, config )
	    {
	    	this._setActiveMenu( index, config );
	    },
	    
	    /**
	     * Render the navigation menu
	     */
	    render : function( )
	    {
	        if( this._rendered )
	        {
	            actuate.common.web.util.Logging.log("Not rendering Menu - already rendered");
	        }
	        else
	        {
	            this._renderMenus( );
	            
	            // By default set the first menu as active
	            this._setActiveMenu( 0, this._configMenus.main );
		        
	            this._renderProfile( );
	            this._rendered = true;
	        }
	    },
	    
	    /**
	     * Gets the base html template used to render the menus 
	     * @returns {String}
	     */
	    getTemplate : function( )
	    {
	    	var template = '<div class="">' +
	    			          '<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner">' +
					            '<div class="container">' +
					              '<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' +
					                '<span class="icon-bar"></span>' +
					                '<span class="icon-bar"></span>' +
					                '<span class="icon-bar"></span>' +
					              '</a>' +
					              '<a class="aclogo brand" href="#">ACTUATE</a>' +
					              '<div class="nav-collapse collapse">' +
					                 '<div  id="' + this._getProfileId( )+ '"' + ' class="dropdown acprofile"></div>' +
					              '</div>' +
					            '</div>' +
					          '</div></div>' +
					          '<div class="acnavbar"><div class="navbar">' +
					            '<div class="container">' +
					          	   '<ul class="acmenu nav pull-right">' +
					          	   '</ul>' +
					          	'</div>' +
					          '</div></div>' +
					       '</div>';
	    	
	    	return template;
	    },

	    getProfileTemplate : function( id, label )
	    {
	    	var template = 
	    			'<a id="{id}" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user icon-white"></i> <i class="accaret-white"></i></a>' +
		    		'<ul id="sub{id}" class="dropdown-menu" role="menu" aria-labelledby="{id}">' +
		    		'</ul>';
	    	
	    	template = template.replace( /{id}/g, id );
	    	template = template.replace( /\{label\}/g, label );
	    	
	    	return template;
	    	
	    },
	    
	    _getSubMenuLabelTemplate : function( label )
	    {
	    	return label + ' <i class="caret"></i>';
	    },
	    
	    getSubMenuTemplate : function( id, label )
	    {
	    	var template = 
	    		'<li><div class="dropdown submenu">' +
	    			'<a id="{id}" role="button" class="dropdown-toggle" data-toggle="dropdown">' + this._getSubMenuLabelTemplate( label ) + '</a>' +
		    		'<ul id="sub{id}" class="dropdown-menu" role="menu" aria-labelledby="{id}">' +
		    		'</ul>' +
	    		'</div></li>';
	    	
	    	template = template.replace( /{id}/g, id );
	    	template = template.replace( /\{label\}/g, label );
	    	
	    	return template;
	    },
	    
	    _createSingleMenuItem : function( index, menuItem, config )
	    {
            var label 	= menuItem.text;
            var menuItemType = menuItem.type;
            
            var menuLink = actuate.common.web.$('<a class="acmenu">' + label + '</a>');
            menuLink.click( actuate.common.web.Method.bind2( this.onMenuClick, this, index, config ) );
            
            var menuItem = actuate.common.web.$('<li>');
            menuItem.append(menuLink);
            
            if( menuItemType == "external" ) 
            {
                menuLink.append(actuate.common.web.$('<i class="icon-share"></i>'));
            }
            
            return menuItem;
	    },
	    
	    _createMenuItem : function( index, menuItem, mainEl, config )
	    {
	    	var subMenus = menuItem.menu;
	    	
	    	// if menu is not set, then this is a single level menu
	    	if ( !subMenus )
	    	{
	    		var item = this._createSingleMenuItem( index, menuItem, config );
	    		mainEl.append( item );
	    		return;
	    	}	
	    	
	    	// handle subMenus
	    	var hrefId = this._getHrefId( index, config );
	    	var template = this.getSubMenuTemplate( hrefId, menuItem.text );
	    	var menuContainer = actuate.common.web.$( template );
	    	mainEl.append( menuContainer );
	    	
	    	var menuEl = menuContainer.find("#sub"+ hrefId );
	    	
	    	for ( var i = 0; i < subMenus.length; i++ )
    		{
	    		var menu = subMenus[ i ];
	    		var item = this._createSingleMenuItem( index + "_" + i, menu, config );
	    		menuEl.append( item );
    		}
	    },
	    
	    _getContentId : function( index, config )
	    {
	    	return this.CONTENT_ID_PREFIX + this._containerId + config.name + '-' + index;
	    },
	    
	    _getHrefId : function( index, config )
	    {
	    	return this.HREF_ID_PREFIX + this._containerId + config.name + '-' + index;
	    },
	    
	    _getLogoutId : function( )
	    {
	    	return this.LOGOUT_ID_PREFIX + this._containerId;
	    },
	    
	    _getProfileId : function( )
	    {
	    	return this.PROFILE_ID_PREFIX + this._containerId;
	    },
	    
	    _setActiveMenu : function( index, config )
	    {
	    	// hide current active menu
	    	var currentIdx = this._selectedMenu.idx;
	    	if ( this._selectedMenu.config )
	    	{	
	            actuate.common.web.$('#' + this._getHrefId( currentIdx, this._selectedMenu.config ) ).removeClass('active');
	            actuate.common.web.$('#' + this._getContentId( currentIdx, this._selectedMenu.config ) ).hide();
	    	}
	    	
            // now set the new active menu
            this._selectedMenu.idx = index;
            this._selectedMenu.config = config;
	        actuate.common.web.$('#' + this._getHrefId( index, config )).addClass('active');
	        actuate.common.web.$('#' + this._getContentId( index, config ) ).show();

            this._renderContentMenu( index, config );
	    },
	    
	    _renderProfile : function( )
	    {
	    	var id = this._getProfileId( );
	    	var templateId 	= id + "_" + actuate.common.web.util.Utility.createUniqueControlID( );
	    	
	    	var template = this.getProfileTemplate( templateId, null );
	    	var menuContainer = actuate.common.web.$( template );
	    	
	    	var mainEl = actuate.common.web.$( '#' + id );
	    	mainEl.append( menuContainer );
	    	
	    	var menuProfEl = mainEl.find("#sub"+ templateId );

            for(var i = 0; i < this._configMenus.profile.items.length; i++)
            {
            	this._createMenuItem( i, this._configMenus.profile.items[i], menuProfEl, this._configMenus.profile );
            }
	    },
	    
	    /**
	     * Render the menus
	     */
	    _renderMenus : function( )
	    {
            this._element.prependTo( actuate.common.web.$( '#' + this._containerId ) );

          //  var menuContainerEl = actuate.common.web.$('.nav');
            var menuContainerEl = this._element.find('.nav');
            
            for(var i = 0; i < this._configMenus.main.items.length; i++)
            {
            	this._createMenuItem( i, this._configMenus.main.items[i], menuContainerEl, this._configMenus.main );
            }
	    },

	    _updateParentLabel : function( label, index, config )
	    {
	    	var hrefId = this._getHrefId( index, config );
	    	var el = this._element.find( '#' + hrefId )[0];
	    	var labelTemplate = this._getSubMenuLabelTemplate( label );
	    	el.innerHTML = "";
	    	el.innerHTML = labelTemplate;
	    },
	    
	    /**
	     * Render the content of this menu.
	     * @param menuItem
	     * @param config the menu config that this menu came from
	     */
	    _renderContentMenu : function( index, config )
	    {
	    	var renderer = this._getContentRenderer( index, config );
	    	renderer.render( this._getContentId( index, config ) );
	    },
	    
	    _getContentRenderer : function( index, config )
	    {
	    	var menuItem = config.items[index];

	    	if ( menuItem )
    		{
	    		return menuItem.renderer;	
    		}

	    	// The menu based on the index must be a submenu
	    	var nMenu = index.split("_");
	    	menuItem = config.items[ nMenu[ 0 ] ];
	    	var menuIdx = 0;
	    	for ( var i = 1; i < nMenu.length; i++ )
    		{
	    		menuIdx = nMenu[ i ];
	    		menuItem 	= menuItem.menu[ menuIdx ];
    		}

	    	this._updateParentLabel( menuItem.text, nMenu[ 0 ], config );
	    	
	    	return menuItem.renderer;
	    }
	    
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout TabPanel class
 * 
 */
actuate.common.web.widget.layout.TabPanel = actuate.common.web.Class.create();
actuate.common.web.widget.layout.TabPanel.prototype = {
	// tab content DIV id prefix will get its final value in initialize method
	CONTENT_ID_PREFIX 	: 'act_tab_cnt_',
	_containerId 		: null,
	_element 			: null,
	_tabNames 			: null, 	// array of tab names
	_tabContentDivIds 	: null, 	// array of tab content DIV ids
	_tabContents 		: null, 	// array of TabContent objects
	_rendered 			: false,
	_defaultSize 		: null,     // default container size
	_tabs               : null,

	/**
	 * Initializes TabPanel creating DIV element in the process.
	 * @param containerId - ID of the parent component. 
	 */
	initialize : function(containerId, component)
	{
		this._tabNames 			= new Array();
		this._tabContentDivIds 	= new Array();
		this._tabContents 		= new Array();
		this._containerId 		= containerId;
		this.CONTENT_ID_PREFIX += containerId;
		
		this._component = component;
		var el = actuate.common.web.$('<div class="act-tab-panel tab-content"/>');
		this._tabPanelName = component + '_act_tab_panel-' + containerId + '-' + actuate.common.web.$('.act_tab_panel').size();
	    el.attr('id', 'act_tab_panel-' + containerId + '-' + actuate.common.web.$('.act_tab_panel').size());
	    el.attr('name', this._tabPanelName);
	    var tabs = actuate.common.web.$('<ul class="nav nav-tabs"></ul>');
	    el.append(tabs);
		this._element = el;
		this._tabs = tabs;
	},

	/**
	 * Selection handler. Shouldn't be normally called from outside.
	 * @param event
	 * @param ui - object representing UI element (has index, tab and panel)
	 */
	onSelect : function(event)
	{
	    var _this = event.data._this;
	    var index = event.data.index;
		actuate.common.web.util.Logging.log('selected index ' + index);
		
		for(var i = 0;i < _this._tabContentDivIds.length; i++)
		{
		    actuate.common.web.$('#' + _this._tabContentDivIds[i]).removeClass('acwebtive');
		    actuate.common.web.$('#link_' + _this._tabContentDivIds[i]).removeClass('acwebtive');
		}
		actuate.common.web.$('#link_' + _this._tabContentDivIds[index]).addClass('acwebtive');
		actuate.common.web.$('#' + _this._tabContentDivIds[index]).addClass('acwebtive');
		_this.renderTab(index);
	},
	
	/**
	 * Render this TabPanel.
	 * Will call render of currently selected tab.
	 */
	render : function( contentID )
	{
		if(this._rendered)
		{
			actuate.common.web.util.Logging.log("Not rendering TabPanel - already rendered");
		}
		else
		{
			this._element.appendTo(actuate.common.web.$('#' + contentID));
			this._rendered = true;
		}
		
		this.reSize(this._defaultSize);
		var selectedContent = this.getSelectedContent();
		if(selectedContent)
		{
			selectedContent.render(this.getSelectedContentDivId());
		}
	},

	/**
	 * Renders TabContent at given index.
	 * Will call render of currently selected tab.
	 */
	renderTab : function(index)
	{
		this._tabContents[index].render(this._tabContentDivIds[index]);
	},
	
	/**
	 * Gets index of currently selected tab.
	 * @return int index of selected tab or -1 is there are no tabs
	 */
	getSelectedTabIndex : function()
	{
		return actuate.common.web.$.inArray(this.getSelectedContentDivId(), this._tabContentDivIds);
	},
	
	/**
	 * Gets selected TabContent.
	 * @returns selected TabContent
	 */
	getSelectedContent : function()
	{
		var content;
		if(this._tabContents.length == 0)
		{
			content = null;
		}
		else
		{
			var idx = this.getSelectedTabIndex();
			if(idx != -1)
			{
				content = this._tabContents[idx];
			}
			else
			{
				content = null;
			}
		}
		return content;
	},
	
	/**
	 * Gets selected content DIV id.
	 * @returns content DIV id, or null if nothing is selected
	 */
	getSelectedContentDivId : function()
	{
	    var currentTabPanel = actuate.common.web.$('div[name=' + this._tabPanelName + ']');
	    var selectedHref= currentTabPanel.find('.tab-pane.acwebtive');
        var divId = null;
        if(selectedHref) 
        {
            divId = selectedHref.attr('id');
        }
        else
        {
            actuate.common.web.util.Logging.log("Failed to find selected tab by '.tab-pane.acwebtive'");
        }
        return divId;
	},
	
	/**
	 * Adds a new tab to this TabPanel.
	 * @param name - tab name
	 * @param label - tab label
	 * @param content - tab content
	 * @returns index of the new tab
	 */
	addTab : function(name, label, content, active)
    {
        if (actuate.common.web.$.inArray(name, this._tabNames) != -1)
        {
            actuate.common.web.util.Logging.log("Tab with the same name already exists: " + name);
            actuate.common.web.jQuery.error("Tab with the same name already exists: " + name);
        }
        var el = this._element;
        var totalTabs = this._tabContents.length;
        var divId = this._component + '_' + this.CONTENT_ID_PREFIX + '-' + totalTabs;
        
        if( ! active ) {
            active = '';
        }
        
        var contentEl = actuate.common.web.$('<div class="tab-pane ' + active + '" id="' + divId + '"></div>');
        el.append(contentEl);
        
        var onSelect = actuate.common.web.Method.bind( this.onSelect, this );
        ahrefId = "#" + divId;
        linkId = 'link_' + divId;
        var tab = actuate.common.web.$('<li id=' + linkId + ' class=' + active + '><a data-toggle="tab" href=' + ahrefId + '>' + label + '</a></li>');
        
        tab.click({index: totalTabs, _this : this}, onSelect);
        this._tabs.append(tab);
        this._tabNames[totalTabs] = name;
        this._tabContents[totalTabs] = content;
        this._tabContentDivIds[totalTabs] = divId;
        return totalTabs;
    },

	/**
	 * Removes a tab from this TabPanel.
	 * @param index - tab index
	 */
	removeTab : function(index)
	{
		this._element.tabs('remove', index);
		this._tabNames.splice(index, 1);
		this._tabContentDivIds.splice(index, 1);
		this._tabContents.splice(index, 1);
	},

	/**
	 * Gets TabContent of the tab.
	 * @param index - tab index
	 * @returns tab content
	 */
	getTabContent : function(index)
	{
		return this._tabContents[index];
	},

	/**
	 * Gets Tab index by name.
	 * @param name - tab name
	 * @returns int index
	 */
	getTabIndex : function(name)
	{
		return actuate.common.web.$.inArray(name, this._tabNames);
	},
	
	/**
	 * Clears tab, leaving its content object intact.
	 * @param index - tab index
	 */
	clearTab : function(index)
	{
		actuate.common.web.$('#' + this._tabContentDivIds[index], actuate.common.web.$('#' + this._containerId)).html('');
	},

	/**
	 * Sets content of the tab
	 * @param index - tab index
	 * @param content - tab content
	 */
	setTabContent : function(index, content)
	{
		this._tabContents[index] = content;
		if(this.getSelectedTabIndex() == index)
		{
			this.renderTab(index);
		}
	},
	
	/**
	 * Selects a tab in this TabPanel
	 * @param index - tab index
	 */
	selectTab : function(index)
	{
		this._element.tabs('select', index);
	},
	
	/**
	 * Set's the default size of the tab container
	 * @param size
	 */
	setSize : function(size)
	{
		this._defaultSize = size;
	},
	
	reSize : function(size)
	{
		if ( this._rendered && size )
		{
			if ( size.width )
			{
				this._element[0].style.width = size.width;
			}
			
			if ( size.height )
			{
				this._element[0].style.height = size.height;
			}

		}		
	}
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Table class
 * 
 */
actuate.common.web.widget.layout.Table = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.Table.prototype =
{

	_config : null,
	_rows	: null,
	
	/**
	 * Initializes Grid.
	 */
	initialize : function(config)
	{
        if (this.__extending)
            return;

        this._config = config;
        this._rows 	 = [];
        
		this._createElement( );
	},
	
	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
        this._element.appendTo(appendTo);
        
		// append all the items into the container.
		this._appendItems( );
	},

	onUnload : function( )
	{
		this._rows = null;
		this._element.html( "" );
		this._element.remove( );
	},
	
	_appendItems : function( )
	{
		var tableTag = this._getTableTag( );
		this._tableEl = new actuate.common.web.$(tableTag);
		this._tableEl.appendTo( this._element );
		
		this._appendHeader( this._tableEl );

        this._appendColgroup( this._tableEl );

		var store = this._config.store;

		if ( !store )  return ;
		
		for ( var i = 0; i < store.length; i++ )
		{
			var rowIndex = i;
			var rowConfig =
			{
				row 		: this._configColumn( store[ i ] ),
				rowIndex 	: rowIndex,
				//template	: "<td data-name=\"" + "{data.name}" + "\"data-label=\"" + "{data.label}" + "\">" + "{html}" + "</td>"
				template	: "<tr class=''" + "{rowAttr}" + ">" + "</tr>",
				colHeaders	: this._config.headers
			};
			
			var row = new actuate.common.web.widget.control.Grid.Row( rowConfig );
			this._appendRow( row, rowIndex );
		}
	},
	
	getRow : function( index )
	{
		return this._rows[ index ];
	},
	
	_appendRow : function( row, idx )
	{
		row.appendTo( this._tableEl );
		
		// update the row
		this._rows[ idx ] = row;
	},
	
	/**
	 * This will add a row to the UI as well as add this row to the store.
	 * @param row
	 */
	addRow : function( row )
	{
		var store 	= this._config.store;
		if ( !store )
		{
			store = [];
			this._config.store = store;
		}
		store.push( row );
		
		var rowIndex = store.length;
		var rowConfig =
		{
				row	: this._configColumn( row ),
				rowIndex : rowIndex,
				template	: "<tr class='' " + "{rowAttr}" + ">" + "</tr>",
				colHeaders	: this._config.headers
		};
		
		var row = new actuate.common.web.widget.control.Grid.Row( rowConfig );
		this._appendRow ( row, rowIndex );
	},
	
	_configColumn : function( row )
	{
		row.template = "<td class=\"" + "{class.name}" + "\"data-name=\"" + "{data.name}" + "\"data-label=\"" + "{data.label}" + "\">" + "</td>";
		return row;
	},
	
	_configHeaderColumn : function( row )
	{
		if ( !row ) return null;
		
		row.template = "<th></th>";
		return row;
	},
	
	_appendHeader : function( appendTo )
	{
		var headerConfig = 
		{
			row : this._configHeaderColumn( this._config.headers ),
			template : "<tr></tr>"
		};
		
		var headerEl = new actuate.common.web.$("<thead></thead>");
		
		var header = new actuate.common.web.widget.control.Grid.Row( headerConfig );
		header.appendTo( headerEl );
		headerEl.appendTo( appendTo );
	},
	
	_appendColgroup : function( appendTo )
	{
        if( this._config.widths )
        {
            var colgroupEl = new actuate.common.web.$( "<colgroup></colgroup>" );
            for( var i in this._config.widths )
            {
                var colEl = new actuate.common.web.$( '<col span="1" style="width: ' + this._config.widths[i] + ';">' );
                colEl.appendTo( colgroupEl );
            }
            colgroupEl.appendTo( appendTo );
        }
	},

	/**
     * default implementation class to create html element
     */
    _createElement : function()
    {
        var tagType = this._getHTMLTag();

        this._element = new actuate.common.web.$(tagType);
    },
   
	_getTableTag : function( )
	{
		var tableId = actuate.common.web.util.Utility.createUniqueControlID( );
		var html =	"<table class='table table-hover table-bordered-bottom' id=\"tablwrap_" + tableId + "\">";
		return html;
	},
   
	_getHTMLTag : function( )
	{
		var tableId = actuate.common.web.util.Utility.createUniqueControlID( );
		var html = "<div id=\"tblwrap_" + tableId + "\"" + " class=\"acTblDivContainer\"" + ">";
		return html;
	}
};actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Helps generating grid item . 
 * 
 */
actuate.common.web.widget.layout.ToolbarItem = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.ToolbarItem.prototype =
{
		initialize : function( config )
		{
			this._config = config;
			this._appendItem(this._config);
			
		},
		
		_appendItem : function( item )
		{
			var listenerCB = actuate.common.web.Method.bind( item.listener.onItemClick, item.listener );
			var click = actuate.common.web.Method.bind2( this._itemHandler, this, listenerCB );
			
			// Override the item click event so that we can propagate 
			// additional data to the handler responsible of sending data to the backend. 
			item.listener.onItemClick = click;
			
			var gridControl = new actuate.common.web.widget.control.GridItem( item );
			gridControl.appendTo(item.element );
		},
		
		/*
		 * propagate data and event to higher layer
		 */
		_itemHandler : function( )
		{
			// propagate data about this clicked item back to the row so
			// that the row can add additional data to this item that was just
			// clicked on.
			if ( this._config.handler )
			{
				this._config.handler.apply( this, arguments );
			}
		}
};/*******************************************************************************
 * Copyright (c) 2013 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout ToolbarLayout class. 
 * 
 */
actuate.common.web.widget.layout.ToolbarLayout = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.ToolbarLayout.prototype =
{
		_config : null,
		
		/**
		 * Initializes Toolbar
		 */
		initialize : function(config)
		{
	        if (this.__extending)
	            return;

	        this._config = config;
	     	this._createElement( );
		},	
		
		/**
	     * default implementation class to create html element
	     */
	    _createElement : function()
	    {
	        var tagType = this._getHTMLTag();

	        this._element = new actuate.common.web.$(tagType);
	    },

	    _getHTMLTag : function( )
	    {
	    	var toolbarId = actuate.common.web.util.Utility.createUniqueControlID( );
	    	
	    	var html = "<div id=\"toolbarwrap_" + toolbarId + "\" class='table-data-header'></div>" ;
	    	return html;
	    },
	    
	    /**
		 * sets appendTo container for this element.
		 * @param appendTo
		 */
		appendTo : function( appendTo )
		{
	        this._element.appendTo(appendTo);
	        // if the configuration contains header
	        if(this._config.headers.items)
	        {
	        	this._header = new actuate.common.web.widget.layout.BaseHeaderbar(this._config.headers);
	        	this._header.appendTo(this._element);
	        }
	        else
	        {
	        	// append all the items into the container.
				this._appendToolbarItems();
	        }
			
		},
		
		onUnload : function( )
		{
			this._element.html( "" );
		},
		
		_appendToolbarItems : function( )
		{
			// Add div container for page
			this._wrapper = actuate.common.web.$("<div class='table-data-header-inner'></div>");
			this._wrapper.appendTo(this._element);
			
			this._pageObject = actuate.common.web.$("<ul class='pull-right text-pagination'></ul>");
			this._pageObject.appendTo(this._wrapper);
			
			// Items other than menu
			this._menuObject = actuate.common.web.$("<ul class='data-table-inline-menu-items'></ul>");	
			this._menuObject.appendTo(this._wrapper);
			
			for ( var i = 0; i < this._config.store.length; i++)
			{
				for(var j = 0; j < this._config.store[i].items.length; j++)
				{
					this._appendItems(this._config.store[i].items[j]);
				}
				
			}
			
		},
		
		//Append items in config
		_appendItems : function(component)
		{
			var componentObject = null;
			var itemHandler	= actuate.common.web.Method.bind(this._toolbarHandler,	this );
			for( var i = 0; i < component.items.length; i++)
			{
				component.items[i].handler = itemHandler;
				switch(component.items[i].type)
				{
				    case 'pageinfo' :
						component.items[i].element = this._pageObject;
						componentObject = new actuate.common.web.widget.layout.ToolbarItem(component.items[i]);
						break;
					case 'emptyadd' :
						componentObject = this._getEmptyAddComponent(component.items[i]);
						componentObject.appendTo(this._menuObject);
						break;
					default:
						var listElement = new actuate.common.web.$("<li class='inline-item'></li>");
						listElement.appendTo(this._menuObject);
						component.items[i].element =  listElement;
						componentObject = new actuate.common.web.widget.layout.ToolbarItem(component.items[i]);
						break;
				}
			}
			
		},
		
				
		_getEmptyAddComponent: function(items)
		{
			var addComponent = actuate.common.web.$("<li class='inline-item'></li>");
			return addComponent;
		},
		
		// Handler to handle toolbar items actions 
		_toolbarHandler : function(cb, type, event, data)
		{
			if(cb)
			{
				if (data )
				{	
					var _itemData = 
					{
						 event: data
				    };
				}
								
				cb(type, _itemData);
			}
		}
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.layout");

/**
 * Construct a new layout Table class
 * 
 */
actuate.common.web.widget.layout.ToolbarTable = actuate.common.web.Class.create( );
actuate.common.web.widget.layout.ToolbarTable.prototype =
{

	_config : null,
	
	/**
	 * Initializes Grid.
	 */
	initialize : function(config)
	{
        if (this.__extending)
            return;

        this._config = config;
        
		this._createElement( );
	},
	
	/**
	 * sets appendTo container for this element.
	 * @param appendTo
	 */
	appendTo : function( appendTo )
	{
        this._element.appendTo(appendTo);
        
		// append all the items into the container.
        if(this._config.headers.items)
        {
        	this._header = new actuate.common.web.widget.layout.BaseHeaderbar(this._config.headers);
        	this._header.appendTo(this._element);
        }
        else
        {
        	this._appendItems( );
        }
		
	},

	onUnload : function( )
	{
		this._element.html( "" );
		this._element.remove( );
	},
	
	_appendItems : function( )
	{
		var tableTag = this._getTableTag( );
		this._tableEl = new actuate.common.web.$(tableTag);
		this._tableEl.appendTo( this._element );
		
		this._appendHeader( this._tableEl );
		
		var store = this._config.store;

		if ( !store )  return ;
		
		for ( var i = 0; i < store.length; i++ )
		{
			var rowConfig =
			{
				row 		: this._configColumn( store[ i ] ),
				rowIndex 	: i,
				//template	: "<td data-name=\"" + "{data.name}" + "\"data-label=\"" + "{data.label}" + "\">" + "{html}" + "</td>"
				template	: "<tr class='pointer'" + "{rowAttr}" + ">" + "</tr>",
				colHeaders	: this._config.headers
			};
			
			var row = new actuate.common.web.widget.control.Grid.Row( rowConfig );
			row.appendTo( this._tableEl );
		}
	},
	
	
	/**
	 * This will add a row to the UI as well as add this row to the store.
	 * @param row
	 */
	addRow : function( row )
	{
		var store 	= this._config.store;
		if ( !store )
		{
			store = [];
			this._config.store = store;
		}
		store.push( row );
		
		var rowConfig =
		{
				row	: this._configColumn( row ),
				rowIndex : store.length,
				template	: "<tr class='pointer' " + "{rowAttr}" + ">" + "</tr>",
				colHeaders	: this._config.headers
		};
		
		var row = new actuate.common.web.widget.control.Grid.Row( rowConfig );
		row.appendTo( this._tableEl );
	},
	
	_configColumn : function( row )
	{
		row.template = "<td data-name=\"" + "{data.name}" + "\"data-label=\"" + "{data.label}" + "\">" + "</td>";
		return row;
	},
	
	_configHeaderColumn : function( row )
	{
		if ( !row ) return null;
		
		row.template = "<th></th>";
		return row;
	},
	
	_appendHeader : function( appendTo )
	{
		var headerConfig = 
		{
			row : this._configHeaderColumn( this._config.headers ),
			template : "<tr></tr>"
		};
		
		var headerEl = new actuate.common.web.$("<thead></thead>");
		
		var header = new actuate.common.web.widget.control.Grid.Row( headerConfig );
		header.appendTo( headerEl );
		headerEl.appendTo( appendTo );
	},
	
	/**
     * default implementation class to create html element
     */
    _createElement : function()
    {
        var tagType = this._getHTMLTag();

        this._element = new actuate.common.web.$(tagType);
    },
   
	_getTableTag : function( )
	{
		var tableId = actuate.common.web.util.Utility.createUniqueControlID( );
		var html =	"<table class='toolbartable table-hover' id=\"tablwrap_" + tableId + "\">";
		return html;
	},
   
	_getHTMLTag : function( )
	{
		var tableId = actuate.common.web.util.Utility.createUniqueControlID( );
		var html = "<div id=\"tblwrap_" + tableId + "\"" + " class=\"acTblDivContainer\"" + ">";
		return html;
	}
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.notification");

/**
 * layout class for notification.
 */
actuate.common.web.widget.notification.DefaultNotification = actuate.common.web.Class.create();
actuate.common.web.widget.notification.DefaultNotification.prototype =
{
	_prefix 				: 'ac_notif_',
	_notifWrapCont			: 'ac_wrap_',
	_globalNotificationId 	: null,
	_delay					: 15000,
		
    /**
     * Initializes Content.
     */
    initialize : function( )
    {
        if ( this.__extending )
            return;
        
        this._globalNotificationId = this._prefix + actuate.common.web.util.Utility.createUniqueControlID( );
    },
    
    setNotificationMessage : function( msg )
    {
    	this._msg = msg;
    },
    
    getNotificationMessage : function( )
    {
    	return this._msg;
    },
    
    getNotificationClass : function( )
    {
    	return "modal-notification";
    },
    
    getTemplate : function( id )
    {
    	var notificationClass = this.getNotificationClass( );
		var template = 
				'<div class="modal ' + notificationClass + ' hide fade" tabindex="-1" role="dialog" aria-hidden="true" id="' + id + '">' +
					'<i class="icon-ygg-close modal-notification-close-icon" data-dismiss="modal"></i>' +
						this.getNotificationMessage( ) + 
				'</div>';
							
		return template;			
    },
    
    render : function( id )
    {
    	this._containerId = id;
    	this._showNotification( );
    	
    	// Delay the hiding of the notification
    	this._delayHideNotification( );
    },
    
    _getNotificationId : function( )
    {
    	if ( this._containerId )
		{
    		return this._prefix + this._containerId; 
		}
    	return this._globalNotificationId;
    },

    _getNotificationTemplate : function( id )
    {
    	var wrapper = '<div class="ac" id="' + this._getNotificationWrapperId( ) + '">' +
    				this.getTemplate( id ) +
    				'</div>';
    	
    	return wrapper;
    	
    },
    
    _getNotificationWrapperId : function( )
    {
    	return this._notifWrapCont + this._getNotificationId( );
    },
    
    _initNotification : function( )
    {
    	this._removeNotification( );

    	var notificationId 	= this._getNotificationId( );

    	var template 		= this._getNotificationTemplate( notificationId );
    	var notificationEl 	= actuate.common.web.$( template );
    	
    	var appendTo 		= actuate.common.web.$( '#' + this._containerId );
		if ( appendTo.length != 0 )
		{
			notificationEl.appendTo ( appendTo );
		}
		else
		{
			notificationEl.appendTo( document.body );
		}	
    },
    
    _getCurrentNotification : function( )
    {
    	var notificationId 		= this._getNotificationId( );
    	var notificationEl = actuate.common.web.$( '#' + notificationId );
    	
		return notificationEl;
    },
    
    _showNotification : function( )
    {
    	this._initNotification( );

		var currentNotification = this._getCurrentNotification( );
		// Show the current notification without the backdrop/background mask
		currentNotification.modal( { backdrop : false } );
		
		this.addNotificationListeners( );
    },
    
	addNotificationListeners : function( )
	{
		var clearTimeOut 		= actuate.common.web.Method.bind( this._clearTimeOut, this );
		var hideNotification 	= actuate.common.web.Method.bind( this._delayHideNotification, this );
		
		var currentNotification = this._getCurrentNotification( );
		
		//currentNotification.mouseenter( clearTimeOut );
		//currentNotification.mouseleave( hideNotification );
	},

	_removeNotification : function( )
	{
    	var wrapperEl = actuate.common.web.$( '#' + this._getNotificationWrapperId( ) );
    	if ( wrapperEl.length != 0 )
		{
    		wrapperEl.remove( );
		}
	},
	
	_clearTimeOut : function( )
	{
		if ( this._timer )
		{	
			window.clearTimeout( this._timer );
			this._timer = null;
		}
		this._removeNotification( );
	},
	
	_delayHideNotification : function( )
	{
		var func = actuate.common.web.Method.bind( this._hideNotification, this );
		this._timer = window.setTimeout( func, this._delay );
	},
	
	_hideNotification : function( )
	{
		var currentNotification = this._getCurrentNotification( );
		currentNotification.modal( 'hide' );
		
		this._clearTimeOut( );
	}
}/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.notification");

/**
 * layout class for notification.
 */
actuate.common.web.widget.notification.ErrorNotification = actuate.common.web.Class.extendClass( actuate.common.web.widget.notification.DefaultNotification,
{
	    /**
	     * Initializes Content.
	     */
	    initialize : function( )
	    {
	        if ( this.__extending )
	            return;
	        
	        actuate.common.web.widget.notification.ErrorNotification.superclass.initialize.call( this );
	    },
	    
	    getNotificationClass : function( )
	    {
	    	return "modal-notification-error";
	    }
});/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.notification");

/**
 * layout class for notification.
 */
actuate.common.web.widget.notification.InfoNotification = actuate.common.web.Class.extendClass( actuate.common.web.widget.notification.DefaultNotification,
{
	    /**
	     * Initializes Content.
	     */
	    initialize : function( )
	    {
	        if ( this.__extending )
	            return;
	        
	        actuate.common.web.widget.notification.InfoNotification.superclass.initialize.call( this );
	    },
	    
	    getNotificationClass : function( )
	    {
	    	return "modal-notification-info";
	    }
});/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.notification");

/**
 * This encapsulates all the different notification types
 */
actuate.common.web.widget.notification.Notification = actuate.common.web.Class.create();
actuate.common.web.widget.notification.Notification.prototype =
{
    /**
     * Initializes Content.
     */
    initialize : function( )
    {
        if ( this.__extending )
            return;
        
        this._defaultNotification 	= new actuate.common.web.widget.notification.DefaultNotification( );
        this._errorNotification 	= new actuate.common.web.widget.notification.ErrorNotification( );
        this._infoNotification		= new actuate.common.web.widget.notification.InfoNotification( );
    },

    _showNotification : function( viewObj, msg )
    {
    	viewObj.setNotificationMessage( msg );
    	viewObj.render( );
    },
    
    showDefaultNotification : function( msg )
    {
    	this._showNotification( this._defaultNotification, msg );
    },
    
    showErrorNotification : function( msg )
    {
    	this._showNotification( this._errorNotification, msg );
    },
    
    showInfoNotification : function( msg )
    {
    	this._showNotification( this._infoNotification, msg );
    }
}/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui");

actuate.common.web.widget.ui.AbstractNavList = actuate.common.web.Class.create();
actuate.common.web.widget.ui.AbstractNavList.prototype =
{		
	initialize : function( config )
	{
    	if ( this.__extending )
			return;
    	
	},

	/**
	 * When a category is clicked from the navigation list, this method will
	 * be triggered.  This method should update the navigation header if needed.
	 * @param name
	 */
	onCategoryClick : function( name )
	{
		// NOOP
		// Based on the category name, get the correct header config
		// Update the header based on this header config
		// ie: this.updateHeader( config )
	},
	
    /**
     * Generates Configuration for navigation bar
     * @return config 
     */
    getNavConfig : function()
	{
    	// NOOP
	},

	getHeaderConfigItems : function( )
	{
		// NOOP
	},
	
	/**
	 * Concrete class should implement this to handle specific action based on the toolbar button
	 * @param action
	 * @param data data that this event carries
	 */
	onHeaderClickItems : function( action, data )
	{
		// NOOP
	},

	getTitle : function( )
	{
		// NOOP
	},
	
	getIconText : function( icon )
	{
		// NOOP
	},

	/**
	 * Return the localized string.  Concrete class should implement this to return the localized string based on the key.
	 * @param {String} localized string
	 */
	getLocalizedString : function( key )
	{
		return key;
	},
	
	/**
	 * Return the id of the add edit container.
	 * @returns {String}
	 */
	getAddEditId : function( )
	{
		return this._addEditId;
	},
	
	getMainId : function( )
	{
		return this._mainId;
	},
	
    showAddEdit : function( show )
    {
        var userContainer = actuate.common.web.$('#' + this._mainId);
        var dlg = actuate.common.web.$('#' + this._addEditId);
        
        if ( show )
        {
        	userContainer.hide();
        	dlg.show();
        }
        else
    	{
        	userContainer.show();
        	dlg.hide();
    	}
    },

    refresh : function( name )
    {
    	this._nav.refresh( name );
    },
    
	render : function( id )
	{
		var userContainer = actuate.common.web.$( '#' + id );
		userContainer.empty();
		
		this._viewID = id;
		
        this._addEditId	= "addedit_" + this._viewID;
        this._mainId   	= "main_" + this._viewID;
        
        var mainCont = actuate.common.web.$("<div id=\"" + this._mainId + "\"></div>"); 
        mainCont.appendTo( userContainer );
        
        var addEditCont = actuate.common.web.$("<div id=\"" + this._addEditId + "\"></div>"); 
        addEditCont.appendTo( userContainer );

 		var config =
 		{
 			category 	: this.getNavConfig( ),
 			header		: this.getDefaultConfigHeader( )
 		};
 		
		this._nav = new actuate.common.web.widget.layout.CategoryNavList( config );
		this._nav.setOnCategoryClick( actuate.common.web.Method.bind( this.onCategoryClick, this ) );
		this._nav.appendTo( mainCont );
	},
	
    getHeaderConfigTlbarItems : function( )
    {
		var state = 'deactive';
		var handler = actuate.common.web.Method.bind( this.onHeaderClickItems, this);
		
		var template 	= "<h2 class='view-header-title view-header-title-left'>" + "{value}" + "</h2>";
		var title 		= actuate.common.web.widget.control.GridUtil.generateItem( null, this.getTitle( ), null, null, null, null, null, template );

		//var addItem		= actuate.common.web.widget.control.GridUtil.generateItem( 'add', this.getIconText( 'add' ), "add", null, state, handler, "btn btn-inverse acTlbrBtnTextOnly", null );
		var searchItem 	= actuate.common.web.widget.control.GridUtil.generateItem( 'search', null, "search", null, state, handler, "btn", null );
		var row =
		{
			items	: 
			[
			 	{
			 		colSize : 2,
			 		items	: ''
			 	},
			 	{
			 		colSize : 5,
			 		items	: title
			 	},
			 	{
					colSize : 4,
					css		: 'acsearch-right',
					items 	: searchItem
				}
		    ]
		};

		return row;
    	
    },

    getDefaultConfigHeader : function( )
    {
		var state = 'deactive';
		var template 	= "<h2 class='view-header-title view-header-title-left'>" + "{value}" + "</h2>";
		var title 		= actuate.common.web.widget.control.GridUtil.generateItem( null, this.getTitle( ), null, null, null, null, null, template );
		var row =
		{
			items	: 
			[
			 	{
			 		colSize : 12,
			 		items	: title
			 	}
		    ]
		};

		return row;
    },
    
	updateHeader : function( config )
	{
		this._nav.renderHeader( config );
	},
	
	onUnload : function( )
	{
		this._nav.onUnload( );
	}

};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui.model");

/**
 * This is a generic model that bases its data from the control item's name
 */
actuate.common.web.widget.ui.model.ControlModel = actuate.common.web.Class.create();
actuate.common.web.widget.ui.model.ControlModel.prototype =
{
    initialize : function( items )
    {
        if (this.__extending)
            return;
        
        this._items = items;
        this.initConfig( );
    },
    
    /**
     * Initializes the configuration for this Model
     *
     *     	    ...
	 *          name 		: 'options',
	 *          type		: 'string',
	 *          ...
	 *
     */
    initConfig : function( )
    {
    	this._fields = [ ];
    	this._config = [ ];
    	
    	this._initConfig( this._items );
    },

    _initFields : function( item )
    {
    	var field = {
			name : item.name,
			type : ( item.type ) ? item.type : 'string'
    	};

    	this._fields.push( field );
        this._config[ field.name ] = field;
    },
    
    _initConfig : function( configItems )
    {
    	for ( var i = 0; i < configItems.length; i++ )
    	{
    		var item = configItems[ i ];
	    	this._initFields( item );
	    	if ( configItems.items )
	    	{
	    		this._initConfig( configItems.items );
	    	}
    	}
    },

    setFields : function( fields )
    {
    	this._fields = fields;
    },
    
    /**
     * Returns the type of the field.
     * 
     * @param name name of the field
     * @returns the type of the field
     */
    getType : function(name)
    {
        var field = this._config[name];
        if (undefined === field)
            return null;

        var ret = field.type;
        return ret;
    },
    
    /**
     * Returns the data as a json object.
     *  
     * @returns {String}
     */
    getJson : function()
    {
        var jsonObj = {};

        for ( var idx = 0; idx < this._fields.length; idx++)
        {
            var field = this._fields[idx];
            if ( field.name !== "passwordConfirm" )
        	{
                jsonObj[field.name] = field.value;
        	}
        }

        // what is the difference?
        return jsonObj;
    },

    resetDirty : function( )
    {
    	for ( var key in this._config )
		{
    		var field = this._config[ key ];
    		if ( field && field.name )
			{
    			delete field.orgValue;
			}
		}
    },
    
    isDirty : function( )
    {
    	for ( var key in this._config )
		{
    		var field = this._config[ key ];
    		if ( field && field.name )
			{
    			if ( field.orgValue !== undefined )
    			{	
	    			if ( field.value !== field.orgValue )
	    			{
	    				return true;
	    			}
    			}
			}
		}
    	return false;
    },
    
    /**
     * Sets the data into the model.
     * 
     * @param namme field name
     * @param data data value to set
     */
    setData : function(name, data)
    {
    	var model = this._config[name];
    	model.value = data;
    	if ( model.orgValue === undefined )
    	{
    		model.orgValue = data;
    	}	
    },
    
    getData : function( name )
    {
    	var fieldName = this._config[name];
    	if ( fieldName )
		{
    		return fieldName.value;
		}
    	return undefined;
    }
};/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui.view.common");

/**
 * AbstractControlItems.
 */
actuate.common.web.widget.ui.view.common.AbstractControlItems = actuate.common.web.Class.create();
actuate.common.web.widget.ui.view.common.AbstractControlItems.prototype =
{
    // array of control items
    _items : [],
    
    // configuration information
    _config : null,
    
    _isDirty : null,
    
    /**
     * Initializes Content.
     */
    initialize : function( )
    {
        if ( this.__extending )
            return;
        
        this.initControls( );
    },

    /**
     * derived class should implement this
     * 
     * Returns the configuration information for the dialog. 
     */
    getConfiguration : function()
    {
    	var items = this.getControlItems( );
        var config =
        {
            labelClass : 'dlgLabelBox',
            objectModel : new actuate.common.web.widget.ui.model.ControlModel( items )
        };

        return config;
    },
    
    /**
     * derived class should implement this
     * 
     * Returns an array of control items that make up the dialog.
     * 
     * @return an array of control items that make up the dialog
     */
    getControlItems : function()
    {
    	return [];
    },

    /**
     * derived class should implement this
     */
    getLocalizedString : function( key )
    {
    	return "";
    },
    
    setHiddenItems : function( hiddenItems )
    {
    	this._hiddenItems = hiddenItems;
    },
    
    /** 
     * check if this control item is hidden or not from the dialog UI
     * based on the hidden list of this dialog
     * @param name name of the item
     * @param item control item object
     * @returns {Boolean}
     */
    isHiddenItem : function( name, item )
    {
    	if ( this._hiddenItems && this._hiddenItems[ name ] )
		{
    		return true;
		}
    	
    	if ( item )
		{
    		return item.isHidden( );
		}
    	
    	return false;
    },
    
    /**
     * Default implementation for initializing the controls
     */
    initControls : function()
    {
        var configuration	= this.getConfiguration();
        var controlItems	= this.getControlItems();
        
        this._config = configuration;

        this._items = [];

        var localizeKeyHandler = actuate.common.web.Method.bind( this.getLocalizedString, this );
        for ( var int = 0; int < controlItems.length; int++)
        {
            var control = controlItems[int];
            var dlgControl = new actuate.common.web.widget.ui.view.common.ControlItem( control, localizeKeyHandler );
            this._items.push( dlgControl );
        }
    },

    getItems : function( )
    {
    	return this._items;
    },
    
    getGroupItems : function( item )
    {
    	return item.items;
    },

    /**
     * Validates the data in the dialog.
     * 
     * @returns true if everything is just swell, and errors if not
     */
    validate : function()
    {
        var errors = new Array();

        // go through each of the items and run the validations on the controls
        var password        = null;
        var confirmPassword = null;
        
        for ( var idx = 0; idx < this._items.length; idx++)
        {
            var item = this._items[idx];

            // Do not validate hidden fields.
            if ( item.isHidden( ) )
        	{
            	continue;
        	}
            
            var ctrlInfo = item.getControlInfo( );
            var value = item.getValue();
            var label = this.getLocalizedString(ctrlInfo.labelKey);

            // check for blank value
            var status = item.validate( );
            if ( status === item.status.IS_EMPTY )
            {
                errors.push({ 
                              errorLabel : label, 
                              errorMessage : this.getLocalizedString("Msg.Dlg.Field.Is.Empty") 
                           });
            }
            
            if ( ctrlInfo.fieldControl === "password" )
            {
                if ( ctrlInfo.name === "password" )
                {
                    password = value;
                }
                else if ( ctrlInfo.name === "passwordConfirm" || ctrlInfo.name === "confirmpassword" )
                {
                    confirmPassword = value;
                }   

                if ( password != null && confirmPassword != null )
                {
                    if ( password != confirmPassword )
                    {
                        errors.push({ errorLabel : ' ', errorMessage : this.getLocalizedString("Msg.Passwords.Not.Match")});
                    }
                }
            }
            
            if ( status === item.status.REG_EX_NOT_MATCH )
            {
                var message = (ctrlInfo.regexTextKey) ? ctrlInfo.regexTextKey : Msg.Dialog.Bad.Regex;
                errors.push({ errorLabel : ' ', errorMessage : this.getLocalizedString( message ) });
            }
        }

        if( errors.length > 0 ) {
            return errors;
        } 
        else {
            return true;
        }
    },

    _updateModelDataItem : function( items, model )
    {
        for ( var idx = 0; idx < items.length; idx++)
        {
        	var item = items[idx];
        	if ( item.isGroupItem() )
        	{	
        		// iterate through the items within this group item.
        		var groupItems = item.getGroupItems();
        		this._updateModelDataItem( groupItems, model );
        		continue;
        	}
    	
	        // some data should not be submitted, like second password value
	        var ctrlInfo = item.getControlInfo( );
	        if (undefined === ctrlInfo.submitValue || ctrlInfo.submitValue)
	        {
	            var value 		= item.getValue();
	            var fieldName 	= item.getName( );
	            var type 		= model.getType(fieldName);
	
	            if( value && typeof value == 'string'  && ctrlInfo.fieldControl != 'password' ) 
	            {
	            	value = actuate.common.web.$.trim(value);
	            }
	            	
	            if (type === 'date')
	            {
	                value = this._makeJSONDate(value);
	            }
	
	            if ( type != null )
	        	{
	            	if ( ctrlInfo.fieldType === 'group' && ctrlInfo.fieldControl === 'radio' )
	            	{
	            		value = item.getInputCtrl( ).getSelectedValue( );
	            	}
	            	
	            	// if isdirty flag is not set yet, set it to false so that we can tell
	            	// that some layer has already called getData.
	            	if ( this._isDirty === null )
            		{
	            		this._isDirty = false;
            		}
	            	
	            	if ( !this._isDirty && value != undefined )
	            	{	
		            	if ( !this.isHiddenItem( fieldName, item ) )
		            	{	
		            		var orgValue = model.getData(fieldName);
		            		if( orgValue != undefined ) 
		            		{
		            			if ( orgValue.toString() != value.toString() )
		            			{
			            			this._isDirty = true;
		            			}
		            		}
		            	}
	            	}
	                model.setData(fieldName, value);
	        	}
	        }
        }
    },
    
    resetDirty : function( )
    {
    	this._isDirty = null;
    	var model = this._config.objectModel;
    	if ( model && model.resetDirty )
    	{	
    		model.resetDirty( );
    	}
    },
    
    isDirty : function( )
    {
    	if ( this._isDirty === null )
		{
    		// data is not retrieved yet.
    		var jsonData = this.getData( );
		}
    	
    	if ( this._isDirty )
    	{
    		// double check to see if the value is dirty or not from the model.
    		var model = this._config.objectModel;
    		if ( model && model.isDirty )
    		{
    			this._isDirty = model.isDirty( );
    		}	
    	}	
    	return ( this._isDirty ) ? true : false;
    },
    
    /**
     * Returns the values from the dialog.
     * 
     * @returns the values from the dialog
     */
    getData : function()
    {
        // TODO: boolean values should be passed to the ajax servlet as a boolean instead of
        // a string.  

        var model = this._config.objectModel;

        // go through each of the items and gather the values to be submitted
        this._updateModelDataItem( this._items, model );

        var json = model.getJson();

        return json;
    },

    _updateItemData : function( items, inData )
    {
        // go through each of the items and gather the values to be submitted
        for ( var idx = 0; idx < items.length; idx++)
        {
            var item = items[idx];
        	if ( item.isGroupItem() )
        	{	
        		// iterate through the items within this group item.
        		var groupItems = item.getGroupItems();
        		this._updateItemData( groupItems, inData );
        		continue;
        	}
        	
            var fieldName = item.getName( );

            var value = inData[fieldName];
            
            if (undefined != value)
            {
                // TODO: set the value based on the type
                var type = this._config.objectModel.getType(fieldName);

				switch (type)
				{
				    case 'boolean':
						value = this._getbooleanStringValue( value );
						break;
						
					case 'date':
					        var strDate = this._makeStringDate(value);
					        value = strDate;
					        break;
				 }
				this._config.objectModel.setData( fieldName, value );
               	item.setValue(value);
            }
        }

    },
    
    /**
     * Sets data into the control values of the dialog.
     * 
     * The data is expected to be an array in the form of:
     *  {"name" : fieldName, "value" : fieldValue}
     * 
     * @param inData incoming data
     */
    setData : function(inData)
    {
        if (inData != null)
        {
        	this._updateItemData( this._items, inData );
        }
    },

    _getbooleanStringValue : function( value )
    {
    	var value = this._getbooleanValue( value );
    	return value + "";
    },
    
    _getbooleanValue : function( value )
    {
    	if ( typeof value === "boolean" )
    	{
    		return value;
    	}
    	
    	value = value + '';

    	if (value.toLowerCase().charAt(0) !== 'f')
		{
			return true;
		}
    	return false;
    },
    
    /**
     * Convert the date value from the control to a JSON object date. 
     * @param dt
     * @returns {___anonymous8280_8557}
     */
    _makeJSONDate : function(dt)
    {
        // TODO: for now assume mm/dd/yyyy.  When we are using a calendar control then we should have a 
        // real date that we will not have to parse.  This is VERY quick and dirty conversion.

        var dateParts = dt.split("/");
        var month = dateParts[0] - 1;
        var day = dateParts[1];
        var year = dateParts[2] - 1900;

        var jsonDate =
        {
            "minutes" : 0,
            "seconds" : 0,
            "hours" : 0,
            "month" : month,
            "year" : year,
            "date" : day
        };

        return jsonDate;
    },

    /**
     * Converts a jsonDate object to a string.
     * A jsonDate has the following fields:
     * <li>minutes</li>
     * <li>seconds</li>
     * <li>hours</li>
     * <li>month</li>
     * <li>year</li>
     * <li>date</li>
     * @param jsonDate
     * @returns {String}
     */
    _makeStringDate : function(jsonDate)
    {
        // TODO: localize format
        
        var stringDate = "";
        stringDate += jsonDate.month + 1;
        stringDate += "/";
        stringDate += jsonDate.date;
        stringDate += "/";
        stringDate += jsonDate.year + 1900;

        return stringDate;
    }

};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui.view.common");

/**
 * layout class for add / edit view.
 */
actuate.common.web.widget.ui.view.common.AddEdit = actuate.common.web.Class.create();
actuate.common.web.widget.ui.view.common.AddEdit.prototype =
{
    _config : null,

    /**
     * Initializes Content.
     */
    initialize : function(containerId, title, content, options)
    {
        if (this.__extending)
            return;
        
        this._config = 
    	{
    		containerId : containerId,
    		title 		: title,
    		content 	: content,
    		handlers	: options.handlers
    	};
        
        this._initView( );
    },
    
    render : function( )
    {
    	var container = actuate.common.web.$( "#" + this._config.containerId );
		// clear out the content
    	container.html('');
		
    	this._el.appendTo( container );
    	
    	this._createHeader( this._el );
    	this._createContent( this._el );
    	this._createFooter( this._el );
    },
    
    _createHeader : function( appendTo )
    {
    	var header = actuate.common.web.$('<div id="header' + this._config.containerId + '" class="view-update-header"></div>');
    	header.appendTo( appendTo );

		var template	= "<h1 class='acaddedit'>" + "{value}" + "</h1>";
		var handlers 	= this._config.handlers;
		var titleItem	= actuate.common.web.widget.control.GridUtil.generateItem( null, this._config.title, null, null, null, null, null, template );
		var backItem	= actuate.common.web.widget.control.GridUtil.generateItem( 'back', handlers["backarrow"].title, "back", null, null, handlers["backarrow"].handler, "acaddedit-back", null );
		
		var saveItem	= actuate.common.web.widget.control.GridUtil.generateItem( 'save', handlers["save"].title, "save", null, null, handlers["save"].handler, "btn btn-inverse acAddEditPadRight", null );
		var cancelItem	= actuate.common.web.widget.control.GridUtil.generateItem( 'cancel', handlers["cancel"].title, "cancel", null, null, handlers["cancel"].handler, "btn", null );

		var blankRowTemplate = "<p class='acaddedit-emptyrow'></p>"; 
		var blankRowItem	= actuate.common.web.widget.control.GridUtil.generateItem( null, "", null, null, null, null, null, blankRowTemplate );
		var mainHeader =
		{
			items	:
			[
				{
					colSize : 10,
					items	: [ titleItem ]
				},
				{
					colSize : 2,
					items	: [ saveItem, cancelItem ] 
				}
		    ]
		};
		
		var backHeader =
		{
			items	:
			[
				{
					colSize : 12,
					items	: [ backItem ]
				}
		    ]
		};
		
		var emptyRow =
		{
				items :
				[
				 	{
				 		colSize : 12,
				 		items	: [ blankRowItem ]
				 	}
				]	
		};
		var saveCancel =
		{	
			 items :
			 [
				{
					colSize : 2,
					items	: [ saveItem, cancelItem ]
				}
			 ]
		};

		var config = { store : [ mainHeader, backHeader, emptyRow ] };
		
		var headerGrid = new actuate.common.web.widget.layout.Grid( config );
		headerGrid.appendTo( header );
    },
    
    _createContent : function( appendTo )
    {
    	var contentID = "content" + this._config.containerId;
    	var content = actuate.common.web.$('<div id="' + contentID + '" class="view-update-content"></div>');
    	content.appendTo( appendTo );
    	
		if ( this._config.content )
		{	
			// clear out the content
			content.html('');
			this._config.content.render( contentID );
			
			this._rendered = true;
		}
    	
    	return content;
    },
    
	/**
	 * Gets this content's renderer.
	 * @returns content
	 */
	getContent : function()
	{
		return this._config.content;
	},
	
    _createFooter : function( appendTo )
    {
    	var footer = actuate.common.web.$('<div id="footer' + this._config.containerId + '" class="view-update-footer"></div>');
    },
    
    _renderView : function( )
    {
    	
    },
    
    _initView : function( )
    {
    	this._el = actuate.common.web.$('<div class="view-update"></div>');
    }

};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui.view.common.");

/**
 * Base class for add / edit dialogs.
 */
actuate.common.web.widget.ui.view.common.BaseDlgRenderer = actuate.common.web.Class.extendClass( actuate.common.web.widget.ui.view.common.AbstractControlItems,
{
    // unique container id
    _containerId : null,
    
    _rendered : null,
    
    /**
     * Initializes Content.
     */
    initialize : function()
    {
        if (this.__extending)
            return;
        
        actuate.common.web.widget.ui.view.common.BaseDlgRenderer.superclass.initialize.call(this);
    },

    /**
     * Actual dialog implementation should do the refreshing of this content
     * NOOP
     */
    refreshContent : function( )
    {
    	// NOOP
    },

    /**
     * derived class should implement this
     * 
     * Returns an array of control items that make up the dialog.
     * 
     * @return an array of control items that make up the dialog
     */
    getControlItems : function()
    {
    	return [];
    },
    
    /**
     * concrete class should implement this so that each item is rendered in the correct place. 
     * Otherwise, it uses default rendering where each item is shown as a row.
     * @param id
     * @returns
     */
    getTemplate : function( id )
    {
    	return null;
    },
    

    _initContainer : function( )
    {
    	var container = actuate.common.web.$('#' + this._containerId);
    	container.html("");
    	
    	var html = this.getTemplate( this._containerId );
    	if ( html )
		{
    		var htmlEl = actuate.common.web.$(html);
    		htmlEl.appendTo(container);
		}

    	return container;
    },
    
    setContainerId : function( containerId )
    {
    	this._containerId = containerId;
    },
    
    /**
     * Render this the content.
     * Calls render on all contained components.
     * 
     * @param containerId - ID of the parent component. 
     */
    render : function(containerId)
    {
        actuate.common.web.util.Logging.log('base dialog render: ' + containerId);

        if (this._containerId != containerId)
        {
            actuate.common.web.util.Logging.log('Assigning new container Id for dialog: ' + containerId);
            this._containerId = containerId;
        }
        
        var container = this._initContainer( );
        
        var content = actuate.common.web.$('<table class="acbasedlg"></table>');
        content.appendTo(container);

        var items = this.getItems( );
        // go through the list of our controls and write them out
        for ( var i = 0; i < items.length; i++)
        {
            this.renderItem( items[i], content);
        }
        var row = actuate.common.web.$('<tr class="control-group" ><td></td><td class="acdlgcolumn controls" id="footerButtons'+containerId+'"></td></tr>');
        row.appendTo(content);
       
        
        setTimeout(function(){ 
        	if(actuate.common.web.$('.actuTextField') && actuate.common.web.$('.actuTextField').length > 0)
			actuate.common.web.$('.actuTextField')[0].focus();
		}, 0);
//        setTimeout(function(){
//            content.find('.actuTextField').focus()
//		}, 0);

    },

    renderItem : function( item, container )
    {
    	this._renderRow( item, container );
    },

    _renderGroup : function( item, container )
    {
        if ( this.isHiddenItem( item.getName( ) ) ) return;

        // go through the list of our controls and write them out
        var groupItems = item.getGroupItems( );

        var rowLabel = actuate.common.web.$('<tr></tr>');
        rowLabel.appendTo(container);
    	
    	// create group label
    	var colLbl = actuate.common.web.$('<td></td>');
    	item.getInputCtrl( ).appendTo( colLbl );
    	colLbl.appendTo(rowLabel);

    	var colInput = actuate.common.web.$('<td></td>');
    	colInput.appendTo(rowLabel);
    	
        for ( var i = 0; i < groupItems.length; i++)
        {
            var row = actuate.common.web.$('<tr></tr>');
        	row.appendTo(container);

        	this._renderGroupCols( groupItems[i], row );
        }
    },
    
    _renderRow : function( item, container )
    {
    	if ( item.isGroupItem( ) )
    	{
    		this._renderGroup( item, container );
    		return;
    	}

    	var row = actuate.common.web.$('<tr class="control-group"></tr>');
    	row.appendTo(container);
    	this._renderCols( item, row );
    },

    /**
     * Render a specific item.
     * The item should only be concerned with rendering its label and control.   
     * 
     * @param item to render
     * @param appendTo element to append to
     */
    _renderGroupCols : function(item, appendTo)
    {
        if ( this.isHiddenItem( item.getName( ) ) ) return;

    	var blnkCol = actuate.common.web.$( '<td></td>' );
    	blnkCol.appendTo( appendTo );

    	var colWrap = actuate.common.web.$( '<td></td>' );
    	colWrap.appendTo( appendTo );
    	
    	// There seems to be problem with the no wrap attribute.
    	// use table rendering as a workaround for now
    	this._renderUsingTable( item, colWrap );
    },

    _renderUsingTable : function( item, appendTo )
    {
    	var table = actuate.common.web.$('<table class="acbasedlg" style="margin-top:0px;"></table>');
    	table.appendTo( appendTo );
    	
    	var tr = actuate.common.web.$( '<tr></tr>' );
    	tr.appendTo( table );
    	
    	var inputCtrl = actuate.common.web.$( '<td></td>' );
    	var labelCtrl = actuate.common.web.$( '<td class="acdlgcolumn"></td>' );
    	inputCtrl.appendTo( tr );
    	labelCtrl.appendTo( tr );
    	
    	item.getInputCtrl( ).appendTo( inputCtrl );
    	if ( !( item.isAnchor( ) || item.isLabelItem( ) ) )
    	{	
    		item.getLblCtrl( ).appendTo( labelCtrl );
    	}
    },
    
    /**
     * Render a specific item.
     * The item should only be concerned with rendering its label and control.   
     * 
     * @param item to render
     * @param appendTo element to append to
     */
    _renderCols : function(item, appendTo)
    {
        if ( this.isHiddenItem( item.getName( ) ) ) return;

    	var colLbl = actuate.common.web.$('<td></td>');
    	
    	var lblCtrl = item.getLblCtrl( ); 
    	lblCtrl.appendTo(colLbl);
    	lblCtrl.addClass("control-label");
    	colLbl.appendTo(appendTo);

    	var colInput = actuate.common.web.$('<td class="acdlgcolumn controls"></td>');
    	
    	if ( !item.isLabelItem( ) )
    	{	
    		var inputCtrl = item.getInputCtrl( );
    		inputCtrl.appendTo(colInput);
    		
    		var inputID = inputCtrl.getID( );
    		if ( inputID )
			{
    			lblCtrl.updateForValue( inputID );
			}
    		
    	}
    	colInput.appendTo(appendTo);
    	
    	if (item.hasHint()) {
    		var colTitle = actuate.common.web.$('<td class="acdlgcolumn"></td>');
        	item.getHintCtrl().appendTo(colTitle);
        	colTitle.appendTo(appendTo);
    	}
    }
    
});
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui.view.common");

/**
 * ControlItem.
 */
actuate.common.web.widget.ui.view.common.ControlItem = actuate.common.web.Class.create();
actuate.common.web.widget.ui.view.common.ControlItem.prototype =
{
		/**
		 * validation status value
		 */
		status :
		{
			SUCCESS 			: 'SUCCESS',
			IS_EMPTY 			: 'IS_EMPTY',
			REG_EX_NOT_MATCH 	: 'REG_EX_NOT_MATCH'
		},
		
		_item : null,
		_localizeKeyHandler : null,
		
	    /**
	     * Initializes Content.
	     */
	    initialize : function( controInfo, localizeKeyHandler )
	    {
	        if ( this.__extending )
	            return;
	        
	        this._localizeKeyHandler = localizeKeyHandler;
	        this._item = this._createControl( controInfo );
	    },
	    
	    /**
	     * Creates a control with the supplied information in JSON format.
	     * 
	     * id, name        // id of the control
	     * fieldControl    // control type to use 
	     * labelKey        // label key for the field
	     * minValue        // optional min value
	     * maxValue        // optional max value
	     * validator       // validation method
	     * hidden          // true to show
	     * allowBlank      // true if it has to be there
	     * regex           // regular expression test  
	     * regexTextKey    // key for the bad regex message
	     * hint			  //Column hint
	     */
	    _createControl : function(controlInfo)
	    {
	        var controlItem = this.createControlItem( controlInfo );
	        var groupItems = controlInfo.items;
	        if ( groupItems )
	        {
	        	controlItem.items = [];
	            for ( var i = 0; i < groupItems.length; i++)
	            {
	            	var groupItem = groupItems[ i ];
	            	var item = new actuate.common.web.widget.ui.view.common.ControlItem( groupItem, this._localizeKeyHandler );
	            	controlItem.items.push( item );
	            }
	        }	
	        
	        return controlItem;
	    },
	    
	    getLocalizedString : function( key )
	    {
	    	if ( this._localizeKeyHandler )
    		{
	    		return this._localizeKeyHandler( key );
    		}
	    	
	    	return key;
	    },
	    
		createControlItem : function( controlInfo )
		{
		    var item =
		    {
		        inputCtrl 	: this.getControlType( controlInfo ),
		        lblCtrl 	: this.getControlLabel( controlInfo ),
		        hintCtrl 	: this.getControlHint( controlInfo ),
		        controlInfo : controlInfo
		    };
		    
		    return item;
		},
		
	    getId: function( )
	    {
	    	return this._item.controlInfo.id;
	    },
	    
	    getName : function( )
	    {
	        return this._item.controlInfo.name;
	    },
	    
	    getTitle : function( )
	    {
	        return this._item.controlInfo.title;
	    },
	    
	    getValue : function( )
	    {
	    	return this.getInputCtrl( ).getValue();
	    },
	    
	    setValue : function( value )
	    {
	    	this.getInputCtrl( ).setValue( value );
	    },
	    
	    focus : function( )
	    {
	    	this.getInputCtrl( ).focus( );
	    },
	    
	    getControlInfo : function( )
	    {
	    	return this._item.controlInfo;
	    },
	    
	    getInputCtrl : function( )
	    {
	    	return this._item.inputCtrl;
	    },
	    
	    getLblCtrl : function( )
	    {
	    	return this._item.lblCtrl;
	    },
	    
	    getHintCtrl : function( )
	    {
	        return this._item.hintCtrl;
	    },

	    isHidden : function( )
	    {
	    	return ( this._item.controlInfo.isHidden === true ) ? true : false;
	    },
	    
	    isAnchor : function( )
	    {
	    	return ( this._item.controlInfo.fieldControl === 'anchor' ) ? true : false;
	    },
	    
	    /**
	     * Returns a control based on the controlInfo.
	     * 
	     * @param controlInfo control information and options
	     * @returns a control
	     */
	    getControlType : function(controlInfo)
	    {  
	        var name = controlInfo.name;
	        var config =
	        {
	            name 		: name,
	            value 		: controlInfo.value ? controlInfo.value : '',
	            cssClass 	: controlInfo.cssClass,
	            width 		: controlInfo.width,
	            height 		: controlInfo.height,
	            fieldType 	: controlInfo.fieldType ? controlInfo.fieldType : '',
	            placeholder : controlInfo.placeholder ? controlInfo.placeholder : '',
	            disabled 	: controlInfo.disabled ? controlInfo.disabled : false,
	            hint		: controlInfo.hint	            		
	        };
	        var inputCtrl = null;
	        switch (controlInfo.fieldControl)
	        {
		        case 'password':
		            inputCtrl = new actuate.common.web.widget.control.Password(config);
		            if(controlInfo.value == null) 
	                {
	                    inputCtrl.setValue('');
	                }
	                else 
	                {
	                    inputCtrl.setValue(controlInfo.value);
	                }
		            break;
		
		        case 'date':
		            inputCtrl = new actuate.common.web.widget.control.DatePicker(config);
		            break;

		        case 'checkbox':
		            inputCtrl = new actuate.common.web.widget.control.CheckBox(config);
		            if( controlInfo.checked ) 
	                {
	                    inputCtrl.setValue(controlInfo.checked);
	                }
		            else if( controlInfo.selected ) 
		            {
		                inputCtrl.setValue(controlInfo.selected);
		            }
	                
	                if( controlInfo.callBack )
	                {
	                    inputCtrl.onSelect(controlInfo.callBack);
	                }
	                break;

		        case 'combobox':
		            inputCtrl = new actuate.common.web.widget.control.ComboBox(config);
		            break;

		        case 'label':
		            inputCtrl = this.getControlLabel( controlInfo );
		            break;

		        case 'listbox':
		        	if ( controlInfo.style )
	        		{
		        		config.style = controlInfo.style;
	        		}
		            inputCtrl = new actuate.common.web.widget.control.ListBox(config);
		            if( controlInfo.content )
		            {
		                inputCtrl.addToList(controlInfo.content, controlInfo.defaultOption, controlInfo.click );
		            }
		            
		            break;
		        case 'multiselectlistbox':
                    
		        	config.title = controlInfo.title;
		        	if( controlInfo.filter ) 
		        	{
		        		config.filter = controlInfo.filter;
		        	}
		        	
                    inputCtrl = new actuate.common.web.widget.control.MultiSelectListBox(config);
                    if( controlInfo.content )
                    {
                        inputCtrl.addToList(controlInfo.content, controlInfo.defaultItems);
                    }
                    
                    break;

		        case 'radio':
		        	var radioConfig		= config;
		        	radioConfig.click 	= controlInfo.click;
		            inputCtrl 			= new actuate.common.web.widget.control.Radio( radioConfig );
		            break;

		        case 'button':
		        	config.title = controlInfo.title ? controlInfo.title : '';
		        	config.click = controlInfo.click;
		        	config.buttonType = controlInfo.buttonType;
		            inputCtrl = new actuate.common.web.widget.control.Button(config);
		            break;

		        case 'file':
		            inputCtrl = new actuate.common.web.widget.control.File(config);
		            break;
		        case 'anchor':
		        	var anchorConfig 	= config;
		        	anchorConfig.text 	= this.getLocalizedString( controlInfo.labelKey );
		        	anchorConfig.click 	= controlInfo.click;
		        	inputCtrl = new actuate.common.web.widget.control.Anchor(anchorConfig);
		        	break;
		        case 'hidden':
		            inputCtrl = new actuate.common.web.widget.control.HiddenField(config);
		            break;
		        default:
		            inputCtrl = new actuate.common.web.widget.control.TextField(config);
		            if(controlInfo.value == "null") 
		            {
		                inputCtrl.setValue('');
		            }
		            else 
		            {
		                inputCtrl.setValue(controlInfo.value);
		            }
	        }

	        return inputCtrl;
	    },

	    /**
	     * Returns a label control.
	     * 
	     * @param controlInfo information for the control
	     * @returns {actuate.common.web.widget.control.Label}
	     */
	    getControlLabel : function( controlInfo )
	    {
    		var labelText = '';
    		if( controlInfo.labelKey )
		    {
    		    labelText = this.getLocalizedString( controlInfo.labelKey );
		    }
    		else if( controlInfo.labelText )
		    {
    		    labelText = controlInfo.labelText;
		    }
	    		
    		if( !controlInfo.allowBlank && labelText && (controlInfo.fieldControl !== "label") ) 
    		{
    			labelText = "*" + labelText;
    		}
    		
    		if( labelText !== '' ) 
    		{
    			labelText += ":";
    		}
    		
	        var lblConfig =
	        {
	            'for' 		: controlInfo.name,
	            text 		: labelText,
	            cssClass 	: controlInfo.labelClass,
	            title 		: controlInfo.title ? controlInfo.title : ''
	        };

	        var lblCtrl = new actuate.common.web.widget.control.Label(lblConfig);
	        return lblCtrl;
	    },
	    
	    /**
	     * Returns a Hint control.
	     * 
	     * @param controlInfo information for the control
	     * @returns {actuate.common.web.widget.control.Label}
	     */
	    getControlHint : function( controlInfo )
	    {
    		var hintText = '';
    		hintText = this.getLocalizedString( controlInfo.hint );
		   	    		
	        var lblConfig =
	        {
	            'for' 		: controlInfo.name,
	            text 		: hintText,
	            cssClass 	: controlInfo.labelClass
	        };

	        var lblCtrl = new actuate.common.web.widget.control.Label(lblConfig);
	        return lblCtrl;
	    },
	    
	    isLabelItem : function( )
	    {
	    	return ( this._item.controlInfo && this._item.controlInfo.fieldControl === 'label' ) ? true : false;
	    },
	    
	    hasHint : function( )
	    {
	    	return ( this._item.controlInfo && this._item.controlInfo.hint) ? true : false;
	    },
	    
	    isGroupItem : function( )
	    {
	    	return ( this._item.controlInfo && this._item.controlInfo.items ) ? true : false;
	    },
	    
	    getGroupItems : function( )
	    {
	    	return this._item.items;
	    },
	    
	    /**
	     * Do some basic validation of the value
	     * @return {String} validation status
	     * 		SUCCESS -- validation is successful
	     * 		IS_EMPTY -- field is empty
	     *  	REG_EX_NOT_MATCH -- the value does not match the regular expression
	     */
	    validate : function( )
	    {
	    	var value = this.getValue();
	    	
	    	if( value && typeof value == 'string' ) 
	    	{
	    		value = actuate.common.web.$.trim(value);
	    	}
	    	
	    	if ( !this._item.controlInfo.allowBlank && !value )
	    	{
	    		return this.status.IS_EMPTY;
	    	}
	    	
	    	if ( this._item.controlInfo.regex && !value.match( this._item.controlInfo.regex ) && value != "" )
	    	{
	    		return this.status.REG_EX_NOT_MATCH;
	    	}
	    	
	    	return this.status.SUCCESS;
	    }
};
/*******************************************************************************
 * Copyright (c) 2012 Actuate Corporation and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Actuate Corporation - Initial implementation.
 ******************************************************************************/
actuate.common.web.Package.define("actuate.common.web.widget.ui.view.common");

/**
 * Construct a new My Profile class
 */
actuate.common.web.widget.ui.view.common.MyProfile = actuate.common.web.Class.extendClass( actuate.common.web.widget.ui.view.common.BaseDlgRenderer,
{
    _locales       : 
    {
        "sq_AL"    :     "Albanian",
        "ar_DZ"    :     "Arabic (Algeria)",
        "ar_BH"    :     "Arabic (Bahrain)",
        "ar_EG"    :     "Arabic (Egypt)",
        "ar_IQ"    :     "Arabic (Iraq)",
        "ar_JO"    :     "Arabic (Jordan)",
        "ar_KW"    :     "Arabic (Kuwait)",
        "ar_LB"    :     "Arabic (Lebanon)",
        "ar_LY"    :     "Arabic (Libya)",
        "ar_MA"    :     "Arabic (Morocco)",
        "ar_OM"    :     "Arabic (Oman)",
        "ar_QA"    :     "Arabic (Qatar)",
        "ar_SA"    :     "Arabic (Saudi Arabia)",
        "ar_SY"    :     "Arabic (Syria)",
        "ar_TN"    :     "Arabic (Tunisia)",
        "ar_AE"    :     "Arabic (U.A.E)",
        "ar_YE"    :     "Arabic (Yemen)",
        "bg_BG"    :     "Bulgarian",
        "zh_HK"    :     "Chinese (Hong Kong SAR)",
        "zh_CN"    :     "Chinese (PRC)",
        "zh_SG"    :     "Chinese (Singapore)",
        "zh_TW"    :     "Chinese (Taiwan)",
        "hr_HR"    :     "Croatian",
        "cs_CZ"    :     "Czech",
        "da_DK"    :     "Danish (Denmark)",
        "nl_BE"    :     "Dutch (Belgium)",
        "nl_NL"    :     "Dutch (Netherlands)",
        "en_AU"    :     "English (Australia)",
        "en_BZ"    :     "English (Belize)",
        "en_CA"    :     "English (Canada)",
        "en_IE"    :     "English (Ireland)",
        "en_NZ"    :     "English (New Zealand)",
        "en_ZA"    :     "English (South Africa)",
        "en_GB"    :     "English (United Kingdom)",
        "en_US"    :     "English (United States)",
        "et_EE"    :     "Estonian",
        "fa_IR"    :     "Farsi",
        "fi_FI"    :     "Finnish",
        "fr_CA"    :     "French (Canada)",
        "fr_FR"    :     "French (France)",
        "fr_CH"    :     "French (Switzerland)",
        "de_AT"    :     "German (Austria)",
        "de_DE"    :     "German (Germany)",
        "de_LI"    :     "German (Liechtenstein)",
        "de_CH"    :     "German (Switzerland)",
        "el_GR"    :     "Greek",
        "he_IL"    :     "Hebrew",
        "iw_IL"    :     "Hebrew (iw_IL)",
        "hu_HU"    :     "Hungarian",
        "id_ID"    :     "Indonesian",
        "in_ID"    :     "Indonesian (in_ID)",
        "it_IT"    :     "Italian (Italy)",
        "it_CH"    :     "Italian (Switzerland)",
        "ja_JP"    :     "Japanese",
        "ko_KR"    :     "Korean",
        "lv_LV"    :     "Latvian",
        "no_NO"    :     "Norwegian (Bokmal)",
        "no_NY"    :     "Norwegian (Nynorsk)",
        "pl_PL"    :     "Polish",
        "pt_BR"    :     "Portuguese (Brazil)",
        "pt_PT"    :     "Portuguese (Portugal)",
        "ro_RO"    :     "Romanian",
        "ru_RU"    :     "Russian",
        "sr_YU"    :     "Serbian (Latin)  (Yugoslavia)",
        "sk_SK"    :     "Slovak",
        "sl_SI"    :     "Slovenian",
        "es_MX"    :     "Spanish (Mexico)",
        "es_ES"    :     "Spanish (Spain)",
        "sv_FI"    :     "Swedish (Finland)",
        "sv_SE"    :     "Swedish (Sweden)",
        "th_TH"    :     "Thai",
        "tr_TR"    :     "Turkish (Turkey)",
        "uk_UA"    :     "Ukrainian (Ukraine)"
    },

    _timeZones  : 
    {
	    "Pacific/Apia"           :   "Pacific/Apia",
	    "America/Adak"           :   "America/Adak",
	    "Pacific/Fakaofo"        :   "Pacific/Fakaofo",
	    "Pacific/Honolulu"       :   "Pacific/Honolulu",
	    
	    "Pacific/Rarotonga"      :   "Pacific/Rarotonga",
	    "Pacific/Tahiti"         :   "Pacific/Tahiti",
	    "Pacific/Marquesas"      :   "Pacific/Marquesas",
	    "America/Anchorage"      :   "America/Anchorage",
	    "Pacific/Gambier"        :   "Pacific/Gambier",
	    "America/Los_Angeles"    :   "America/Los_Angeles",
	    "Pacific/Pitcairn"       :   "Pacific/Pitcairn",
	    "America/Denver"         :   "America/Denver",
	    "America/Mazatlan"       :   "America/Mazatlan",
	    
	    "America/Phoenix"        :   "America/Phoenix",
	    "America/Chicago"        :   "America/Chicago",
	    "America/Guatemala"      :   "America/Guatemala",
	    "America/Mexico_City"    :   "America/Mexico_City",
	    "America/Regina"         :   "America/Regina",
	    "Pacific/Easter"         :   "Pacific/Easter",
	    "America/Bogota"         :   "America/Bogota",
	    "America/Grand_Turk"     :   "America/Grand_Turk",
	    "America/Havana"         :   "America/Havana",
	    
	    "America/New_York"       :   "America/New_York",
	    "America/Antigua"        :   "America/Antigua",
	    "America/Asuncion"       :   "America/Asuncion",
	    "America/Cuiaba"         :   "America/Cuiaba",
	    "America/Halifax"        :   "America/Halifax",
	    "America/La_Paz"         :   "America/La_Paz",
	    "America/Santiago"       :   "America/Santiago",
	    "America/Thule"          :   "America/Thule",
	    "Atlantic/Stanley"       :   "Atlantic/Stanley",
	    
	    "America/St_Johns"       :   "America/St_Johns",
	    "America/Buenos_Aires"   :   "America/Buenos_Aires",
	    "America/Godthab"        :   "America/Godthab",
	    "America/Miquelon"       :   "America/Miquelon",
	    "America/Sao_Paulo"      :   "America/Sao_Paulo",
	    "Atlantic/South_Georgia" :   "Atlantic/South_Georgia",
	    "Atlantic/Azores"        :   "Atlantic/Azores",
	    "Atlantic/Cape_Verde"    :   "Atlantic/Cape_Verde",
	    "Europe/London"          :   "Europe/London",
	    
	    "UTC"                    :   "UTC",
	    "Africa/Lagos"           :   "Africa/Lagos",
	    "Europe/Berlin"          :   "Europe/Berlin",
	    "Europe/Budapest"        :   "Europe/Budapest",
	    "Europe/Paris"           :   "Europe/Paris",
	    "Europe/Warsaw"          :   "Europe/Warsaw",
	    "Africa/Cairo"           :   "Africa/Cairo",
	    "Africa/Johannesburg"    :   "Africa/Johannesburg",
	    "Asia/Amman"             :   "Asia/Amman",
	    
	    "Asia/Beirut"            :   "Asia/Beirut",
	    "Asia/Damascus"          :   "Asia/Damascus",
	    "Europe/Bucharest"       :   "Europe/Bucharest",
	    "Europe/Istanbul"        :   "Europe/Istanbul",
	    "Europe/Kiev"            :   "Europe/Kiev",
	    "Europe/Minsk"           :   "Europe/Minsk",
	    "Africa/Nairobi"         :   "Africa/Nairobi",
	    "Asia/Baghdad"           :   "Asia/Baghdad",
	    "Asia/Riyadh"            :   "Asia/Riyadh",
	    
	    "Europe/Moscow"          :   "Europe/Moscow",
	    "Asia/Tehran"            :   "Asia/Tehran",
	    "Asia/Baku"              :   "Asia/Baku",
	    "Asia/Dubai"             :   "Asia/Dubai",
	    "Asia/Tbilisi"           :   "Asia/Tbilisi",
	    "Asia/Yerevan"           :   "Asia/Yerevan",
	    "Asia/Kabul"             :   "Asia/Kabul",
	    "Asia/Karachi"           :   "Asia/Karachi",
	    "Asia/Tashkent"          :   "Asia/Tashkent",
	    
	    "Asia/Yekaterinburg"     :   "Asia/Yekaterinburg",
	    "Asia/Calcutta"          :   "Asia/Calcutta",
	    "Asia/Colombo"           :   "Asia/Colombo",
	    "Asia/Katmandu"          :   "Asia/Katmandu",
	    "Asia/Bishkek"           :   "Asia/Bishkek",
	    "Asia/Dhaka"             :   "Asia/Dhaka",
	    "Asia/Novosibirsk"       :   "Asia/Novosibirsk",
	    "Asia/Rangoon"           :   "Asia/Rangoon",
	    "Asia/Bangkok"           :   "Asia/Bangkok",
	    
	    "Asia/Ho_Chi_Minh"       :   "Asia/Ho_Chi_Minh",
	    "Asia/Krasnoyarsk"       :   "Asia/Krasnoyarsk",
	    "Asia/Hong_Kong"         :   "Asia/Hong_Kong",
	    "Asia/Irkutsk"           :   "Asia/Irkutsk",
	    "Asia/Shanghai"          :   "Asia/Shanghai",
	    "Asia/Singapore"         :   "Asia/Singapore",
	    "Asia/Taipei"            :   "Asia/Taipei",
	    "Australia/Perth"        :   "Australia/Perth",
	    "Asia/Pyongyang"         :   "Asia/Pyongyang",
	    
	    "Asia/Seoul"             :   "Asia/Seoul",
	    "Asia/Tokyo"             :   "Asia/Tokyo",
	    "Asia/Yakutsk"           :   "Asia/Yakutsk",
	    "Pacific/Palau"          :   "Pacific/Palau",
	    "Australia/Adelaide"     :   "Australia/Adelaide",
	    "Australia/Darwin"       :   "Australia/Darwin",
	    "Asia/Vladivostok"       :   "Asia/Vladivostok",
	    "Australia/Brisbane"     :   "Australia/Brisbane",
	    "Australia/Hobart"       :   "Australia/Hobart",
	    
	    "Australia/Sydney"       :   "Australia/Sydney",
	    "Australia/Lord_Howe"    :   "Australia/Lord_Howe",
	    "Asia/Kamchatka"         :   "Asia/Kamchatka",
	    "Asia/Magadan"           :   "Asia/Magadan",
	    "Pacific/Guadalcanal"    :   "Pacific/Guadalcanal",
	    "Pacific/Norfolk"        :   "Pacific/Norfolk",
	    "Pacific/Auckland"       :   "Pacific/Auckland",
	    "Pacific/Fiji"           :   "Pacific/Fiji",
	    "Pacific/Kwajalein"      :   "Pacific/Kwajalein",
	    
	    "Pacific/Chatham"        :   "Pacific/Chatham",
	    "Pacific/Tongatapu"      :   "Pacific/Tongatapu",
	    "Pacific/Kiritimati"     :   "Pacific/Kiritimati"
    },
    
    _myProfileData	: null,

    /**
     * Initializes My Profile Content.
     */
    initialize : function(config)
    {
        if (this.__extending)
            return;
        
        this._defaultLocale 	= "en_US";
        this._defaultTimeZone 	= "America/Chicago";
        
        this._listener = new actuate.common.web.widget.layout.LayoutListener( );
        
        actuate.common.web.widget.ui.view.common.MyProfile.superclass.initialize.call(this);
    },
    
    initControls : function()
    {
    	// NOOP. Delay the initialization of controls
    },
    
    _initControls : function( )
    {
    	actuate.common.web.widget.ui.view.common.MyProfile.superclass.initControls.call(this);
    	this._isControlsInitialized = true;
    },
    
    setData : function( data )
    {
    	this._myProfileData = data;
    	if ( this._isControlsInitialized && data )
		{
    		actuate.common.web.widget.ui.view.common.MyProfile.superclass.setData.call( this, data );
		}
    },
    
    getTemplate : function( id )
    {
    	var template = '<div>' +
        '<div class="control-group" id="userName{id}"></div>' +
        '<div class="control-group" id="description{id}"></div>' +
        '<div class="control-group" id="email{id}"></div>' +
        '<div class="control-group" id="language{id}"></div>' +
        '<div class="control-group" id="timeZone{id}"></div>' +
        '<div class="control-group" id="homeFolder{id}"></div>' +
        '<div class="control-group" id="dashboard{id}"></div>' +
        '<div><h2 class="control-title control-title-small control-title-top">'+this.getLocalizedString("Lbl.MyProfile.ChangePassword")+'</h2></div>' +
        '<div><h5>'+this.getLocalizedString("Lbl.MyProfile.ChangePasswordHint")+'</h5></div>' +
        '<div class="control-group" id="existingPassword{id}"></div>' +
        '<div class="control-group" id="currentPassword{id}"></div>' +
        '<div class="control-group" id="newpasswordConfirm{id}"></div>' +
        '</div>';
        
        template = template.replace( /{id}/g, id );
        return template;
    }, 
    
    /**
     * Returns an array of control items that make up the dialog.
     * 
     * @return an array of control items that make up the dialog
     */
    getControlItems : function()
    {
        var items = [
        {
            fieldControl 	: 'text',
            name 			: 'userName',
            labelKey 		: 'Lbl.MyProfile.UserName',
            allowBlank 		: false,
            disabled 		: true
        },
        {
            fieldControl 	: 'text',
            name 			: 'description',
            labelKey 		: 'Lbl.MyProfile.Description',
            allowBlank 		: true
        },
        {
            fieldControl 	: 'text',
            name 			: 'email',
            labelKey 		: 'Lbl.MyProfile.Email',
            allowBlank 		: false,
            regex 			: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            regexTextKey 	: "Msg.Email.Not.Valid"
        },
        {
            fieldControl 	: 'listbox',
            name 			: 'language',
            labelKey 		: 'Lbl.MyProfile.Language',
            content  		: this._locales,
            allowBlank 		: true
        },
        {
            fieldControl 	: 'listbox',
            name 			: 'timeZone',
            labelKey 		: 'Lbl.MyProfile.TimeZone',
            content 		: this._timeZones,
            allowBlank 		: true
        },
        {
            fieldControl 	: 'text',
            name 			: 'homeFolder',
            labelKey 		: 'Lbl.MyProfile.HomeFolder',
            allowBlank 		: true
        },
        {
            fieldControl 	: 'text',
            name 			: 'dashboard',
            labelKey 		: 'Lbl.MyProfile.Dashboard',
            allowBlank 		: true
        },
        {
            fieldControl 	: 'password',
            name 			: 'existingPassword',
            labelKey 		: 'Lbl.MyProfile.CurrentPassword',
            allowBlank 		: true,
            disabled 		: this._myProfileData['disablePwd']
        },
        {
            fieldControl 	: 'password',
            name 			: 'currentPassword',
            labelKey 		: 'Lbl.MyProfile.Password',
            allowBlank 		: true,
            disabled 		: this._myProfileData['disablePwd'],
            regex			:  '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{8,}$',
            regexTextKey 	: "Msg.Password.Not.Valid"
        },
        {
            fieldControl 	: 'password',
            name 			: 'newpasswordConfirm',
            labelKey 		: 'Lbl.MyProfile.PasswordConfirm',
            allowBlank 		: true,
            disabled 		: this._myProfileData['disablePwd']
        }
        ];
        
        return items;
    },
    
    /**
     * Render this the content.
     * Calls render on all contained components.
     * 
     * @param containerId - ID of the parent component. 
     */
    render : function( containerId )
    {
    	if ( !this._isControlsInitialized )
		{
    		this._initControls( );
    		this.setData( this._myProfileData );
		}
    	
    	actuate.common.web.widget.ui.view.common.MyProfile.superclass.render.call( this, containerId );
    },
    
    _renderItem : function( item, appendTo )
    {
        var controlInfo = item.getControlInfo( );
        if(controlInfo.fieldControl === 'radio')
        {
            item.getInputCtrl( ).appendTo(appendTo);
            item.getInputCtrl( )._element.css('margin-left', '10px');
            item.getLblCtrl( ).appendTo(appendTo);
            item.getLblCtrl( )._element.css('display', 'inline');
            item.getLblCtrl( )._element.css('margin-left', '10px');
            if(controlInfo.name === 'userType' || controlInfo.name === 'isExternal')
            {
                appendTo.css('float', 'left');
            }
        }
        else
        {
            item.getLblCtrl( ).appendTo(appendTo);
            item.getLblCtrl( )._element.css('margin-right', '10px');
            item.getLblCtrl( )._element.css('margin-top', '5px');
            item.getLblCtrl( )._element.css('text-align', 'right');
            item.getLblCtrl( )._element.css('width', '200px');
            item.getLblCtrl( )._element.css('float', 'left');
            item.getInputCtrl( )._element.width(controlInfo.width);
            item.getInputCtrl( ).appendTo(appendTo);
        }
    },
    
    renderItem : function( item, container )
    {
        var itemId = (item.getId() || item.getName()) + this._containerId;
        var itemCont = actuate.common.web.$( '#' + itemId );
        if ( itemCont.length )
        {
            this._renderItem( item, itemCont );
        }
    },
    
    /**
     * Add a listener that can be called when certain action is executed from this profile dialog
     * Possible Event names are:
     * <ul>
     * <li>ON_GETLOCALIZATION_STRING</li>
     * 		<ul>
     * 			<li></li>
     * 			<li></li>
     * 			<li></li>
     * 			<li></li>
     * 			<li></li>
     * 			<li></li>
     * 		</ul>
     * </ul>
     * @param {String} eventName
     * @param {function} handler
     */
    addListener : function( eventName, handler )
    {
    	this._listener.addListener( eventName, handler );
    },
    
    _invokeListener : function(  )
    {
   		return this._listener.invokeListener.apply( this._listener, arguments );
    },
    
    /**
     * The localized resource should be avialable when this dialog is shown.
     */
    getLocalizedString : function( )
    {
    	var args = [];
    	args.push( "ON_GETLOCALIZATION_STRING" );
    	for( var i = 0; i < arguments.length; i++ )
    	{
    		args.push( arguments[i] );
    	}
	    
    	return this._invokeListener.apply( this, args );
    }
        
});/**
 * jQuery JSON Plugin
 * version: 2.3 (2011-09-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is
 * copyrighted 2005 by Bob Ippolito.
 * 
 * This source is download from
 * http://code.google.com/p/jquery-json/downloads/detail?name=jquery.json-2.3.js&can=2&q=
 */

(function( $ ) {

	var	escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		};

	/**
	 * jQuery.toJSON
	 * Converts the given argument into a JSON respresentation.
	 *
	 * @param o {Mixed} The json-serializble *thing* to be converted
	 *
	 * If an object has a toJSON prototype, that will be used to get the representation.
	 * Non-integer/string keys are skipped in the object, as are keys that point to a
	 * function.
	 *
	 */
	$.toJSON = typeof JSON === 'object' && JSON.stringify
		? JSON.stringify
		: function( o ) {

		if ( o === null ) {
			return 'null';
		}

		var type = typeof o;

		if ( type === 'undefined' ) {
			return undefined;
		}
		if ( type === 'number' || type === 'boolean' ) {
			return '' + o;
		}
		if ( type === 'string') {
			return $.quoteString( o );
		}
		if ( type === 'object' ) {
			if ( typeof o.toJSON === 'function' ) {
				return $.toJSON( o.toJSON() );
			}
			if ( o.constructor === Date ) {
				var	month = o.getUTCMonth() + 1,
					day = o.getUTCDate(),
					year = o.getUTCFullYear(),
					hours = o.getUTCHours(),
					minutes = o.getUTCMinutes(),
					seconds = o.getUTCSeconds(),
					milli = o.getUTCMilliseconds();

				if ( month < 10 ) {
					month = '0' + month;
				}
				if ( day < 10 ) {
					day = '0' + day;
				}
				if ( hours < 10 ) {
					hours = '0' + hours;
				}
				if ( minutes < 10 ) {
					minutes = '0' + minutes;
				}
				if ( seconds < 10 ) {
					seconds = '0' + seconds;
				}
				if ( milli < 100 ) {
					milli = '0' + milli;
				}
				if ( milli < 10 ) {
					milli = '0' + milli;
				}
				return '"' + year + '-' + month + '-' + day + 'T' +
					hours + ':' + minutes + ':' + seconds +
					'.' + milli + 'Z"';
			}
			if ( o.constructor === Array ) {
				var ret = [];
				for ( var i = 0; i < o.length; i++ ) {
					ret.push( $.toJSON( o[i] ) || 'null' );
				}
				return '[' + ret.join(',') + ']';
			}
			var	name,
				val,
				pairs = [];
			for ( var k in o ) {
				type = typeof k;
				if ( type === 'number' ) {
					name = '"' + k + '"';
				} else if (type === 'string') {
					name = $.quoteString(k);
				} else {
					// Keys must be numerical or string. Skip others
					continue;
				}
				type = typeof o[k];

				if ( type === 'function' || type === 'undefined' ) {
					// Invalid values like these return undefined
					// from toJSON, however those object members
					// shouldn't be included in the JSON string at all.
					continue;
				}
				val = $.toJSON( o[k] );
				pairs.push( name + ':' + val );
			}
			return '{' + pairs.join( ',' ) + '}';
		}
	};

	/**
	 * jQuery.evalJSON
	 * Evaluates a given piece of json source.
	 *
	 * @param src {String}
	 */
	$.evalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function( src ) {
		return eval('(' + src + ')');
	};

	/**
	 * jQuery.secureEvalJSON
	 * Evals JSON in a way that is *more* secure.
	 *
	 * @param src {String}
	 */
	$.secureEvalJSON = typeof JSON === 'object' && JSON.parse
		? JSON.parse
		: function( src ) {

		var filtered = 
			src
			.replace( /\\["\\\/bfnrtu]/g, '@' )
			.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace( /(?:^|:|,)(?:\s*\[)+/g, '');

		if ( /^[\],:{}\s]*$/.test( filtered ) ) {
			return eval( '(' + src + ')' );
		} else {
			throw new SyntaxError( 'Error parsing JSON, source is not valid.' );
		}
	};

	/**
	 * jQuery.quoteString
	 * Returns a string-repr of a string, escaping quotes intelligently.
	 * Mostly a support function for toJSON.
	 * Examples:
	 * >>> jQuery.quoteString('apple')
	 * "apple"
	 *
	 * >>> jQuery.quoteString('"Where are we going?", she asked.')
	 * "\"Where are we going?\", she asked."
	 */
	$.quoteString = function( string ) {
		if ( string.match( escapeable ) ) {
			return '"' + string.replace( escapeable, function( a ) {
				var c = meta[a];
				if ( typeof c === 'string' ) {
					return c;
				}
				c = a.charCodeAt();
				return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + string + '"';
	};

})( actuate.common.web.jQuery );
/*!
 * jQuery UI Core 1.9.1
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.9.1",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.ui.ie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,'position')) && (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().andSelf().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	// access offsetHeight before setting the style to prevent a layout bug
	// in IE 9 which causes the element to continue to take up space even
	// after it is removed from the DOM (#8026)
	div.offsetHeight;

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});





// deprecated

(function() {
	var uaMatch = /msie ([\w.]+)/.exec( navigator.userAgent.toLowerCase() ) || [];
	$.ui.ie = uaMatch.length ? true : false;
	$.ui.ie6 = parseFloat( uaMatch[ 1 ], 10 ) === 6;
})();

$.fn.extend({
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.extend( $.ui, {
	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	contains: $.contains,

	// only used by resizable
	hasScroll: function( el, a ) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	// these are odd functions, fix the API or move into individual plugins
	isOverAxis: function( x, reference, size ) {
		//Determines when x coordinate is over "b" element axis
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( actuate.common.web.jQuery );
/*!
 * jQuery UI Datepicker 1.9.1
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function( $, undefined ) {

$.extend($.ui, { datepicker: { version: "1.9.1" } });

var PROP_NAME = 'datepicker';
var dpuuid = new Date().getTime();
var instActive;

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this.debug = false; // Change this to true to start debugging
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
	this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
	this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
	this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
	this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
	this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
	this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
	this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
	this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		closeText: 'Done', // Display text for close link
		prevText: 'Prev', // Display text for previous month link
		nextText: 'Next', // Display text for next month link
		currentText: 'Today', // Display text for current month link
		monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'], // Names of months for drop-down and formatting
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
		weekHeader: 'Wk', // Column header for week of the year
		dateFormat: 'mm/dd/yy', // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: '' // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
		showAnim: 'fadeIn', // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: '', // Display text following the input box, e.g. showing the format
		buttonText: '...', // Text for trigger button
		buttonImage: '', // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: 'fast', // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: '', // Selector for an alternate field to store selected dates into
		altFormat: '', // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional['']);
	this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: 'hasDatepicker',

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	/* Debug logging (if enabled). */
	log: function () {
		if (this.debug)
			console.log.apply('', arguments);
	},

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	   @param  settings  object - the new settings to use as defaults (anonymous object)
	   @return the manager object */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span
	   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
	_attachDatepicker: function(target, settings) {
		// check for settings on the control itself - in namespace 'date:'
		var inlineSettings = null;
		for (var attrName in this._defaults) {
			var attrValue = target.getAttribute('date:' + attrName);
			if (attrValue) {
				inlineSettings = inlineSettings || {};
				try {
					inlineSettings[attrName] = eval(attrValue);
				} catch (err) {
					inlineSettings[attrName] = attrValue;
				}
			}
		}
		var nodeName = target.nodeName.toLowerCase();
		var inline = (nodeName == 'div' || nodeName == 'span');
		if (!target.id) {
			this.uuid += 1;
			target.id = 'dp' + this.uuid;
		}
		var inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {}, inlineSettings || {});
		if (nodeName == 'input') {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName))
			return;
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp).
			bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
		this._autoSize(inst);
		$.data(target, PROP_NAME, inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var appendText = this._get(inst, 'appendText');
		var isRTL = this._get(inst, 'isRTL');
		if (inst.append)
			inst.append.remove();
		if (appendText) {
			inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
			input[isRTL ? 'before' : 'after'](inst.append);
		}
		input.unbind('focus', this._showDatepicker);
		if (inst.trigger)
			inst.trigger.remove();
		var showOn = this._get(inst, 'showOn');
		if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
			var buttonText = this._get(inst, 'buttonText');
			var buttonImage = this._get(inst, 'buttonImage');
			inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
				$('<img/>').addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$('<button type="button"></button>').addClass(this._triggerClass).
					html(buttonImage == '' ? buttonText : $('<img/>').attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? 'before' : 'after'](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
					$.datepicker._hideDatepicker();
				else if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else
					$.datepicker._showDatepicker(input[0]);
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, 'autoSize') && !inst.inline) {
			var date = new Date(2009, 12 - 1, 20); // Ensure double digits
			var dateFormat = this._get(inst, 'dateFormat');
			if (dateFormat.match(/[DM]/)) {
				var findMax = function(names) {
					var max = 0;
					var maxI = 0;
					for (var i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					'monthNames' : 'monthNamesShort'))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
			}
			inst.input.attr('size', this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName))
			return;
		divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.datepicker", function(event, key, value){
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key){
				return this._get(inst, key);
			});
		$.data(target, PROP_NAME, inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	   @param  input     element - ignored
	   @param  date      string or Date - the initial date to display
	   @param  onSelect  function - the function to call when a date is selected
	   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	   @param  pos       int[2] - coordinates for the dialog's position within the screen or
	                     event - with x/y coordinates or
	                     leave empty for default (screen centre)
	   @return the manager object */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var inst = this._dialogInst; // internal instance
		if (!inst) {
			this.uuid += 1;
			var id = 'dp' + this.uuid;
			this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; top: -100px; width: 0px;"/>');
			this._dialogInput.keydown(this._doKeyDown);
			$('body').append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], PROP_NAME, inst);
		}
		extendRemove(inst.settings, settings || {});
		date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			var browserWidth = document.documentElement.clientWidth;
			var browserHeight = document.documentElement.clientHeight;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI)
			$.blockUI(this.dpDiv);
		$.data(this._dialogInput[0], PROP_NAME, inst);
		return this;
	},

	/* Detach a datepicker from its control.
	   @param  target    element - the target input field or division or span */
	_destroyDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName == 'input') {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).
				unbind('keyup', this._doKeyUp);
		} else if (nodeName == 'div' || nodeName == 'span')
			$target.removeClass(this.markerClassName).empty();
	},

	/* Enable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_enableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = false;
			inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({opacity: '1.0', cursor: ''});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().removeClass('ui-state-disabled');
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	   @param  target    element - the target input field or division or span */
	_disableDatepicker: function(target) {
		var $target = $(target);
		var inst = $.data(target, PROP_NAME);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		var nodeName = target.nodeName.toLowerCase();
		if (nodeName == 'input') {
			target.disabled = true;
			inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({opacity: '0.5', cursor: 'default'});
		}
		else if (nodeName == 'div' || nodeName == 'span') {
			var inline = $target.children('.' + this._inlineClass);
			inline.children().addClass('ui-state-disabled');
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	   @param  target    element - the target input field or division or span
	   @return boolean - true if disabled, false if enabled */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] == target)
				return true;
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	   @param  target  element - the target input field or division or span
	   @return  object - the associated instance data
	   @throws  error if a jQuery problem getting data */
	_getInst: function(target) {
		try {
			return $.data(target, PROP_NAME);
		}
		catch (err) {
			throw 'Missing instance data for this datepicker';
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span
	   @param  name    object - the new settings to update or
	                   string - the name of the setting to change or retrieve,
	                   when retrieving also 'all' for all instance settings or
	                   'defaults' for all global defaults
	   @param  value   any - the new value for the setting
	                   (omit if above is an object or to retrieve a value) */
	_optionDatepicker: function(target, name, value) {
		var inst = this._getInst(target);
		if (arguments.length == 2 && typeof name == 'string') {
			return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}
		var settings = name || {};
		if (typeof name == 'string') {
			settings = {};
			settings[name] = value;
		}
		if (inst) {
			if (this._curInst == inst) {
				this._hideDatepicker();
			}
			var date = this._getDateDatepicker(target, true);
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			extendRemove(inst.settings, settings);
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
				inst.settings.minDate = this._formatDate(inst, minDate);
			if (maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	   @param  target  element - the target input field or division or span */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	   @param  target   element - the target input field or division or span
	   @param  date     Date - the new date */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	   @param  target     element - the target input field or division or span
	   @param  noDefault  boolean - true if no default date is to be used
	   @return Date - the current date */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline)
			this._setDateFromField(inst, noDefault);
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var inst = $.datepicker._getInst(event.target);
		var handled = true;
		var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing)
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' +
									$.datepicker._currentClass + ')', inst.dpDiv);
						if (sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
							var onSelect = $.datepicker._get(inst, 'onSelect');
							if (onSelect) {
								var dateStr = $.datepicker._formatDate(inst);

								// trigger custom callback
								onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
							}
						else
							$.datepicker._hideDatepicker();
						return false; // don't submit the form
						break; // select the value on enter
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, 'stepBigMonths') :
							-$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, 'stepBigMonths') :
							+$.datepicker._get(inst, 'stepMonths')), 'M');
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, 'stepBigMonths') :
									-$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, 'stepBigMonths') :
									+$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		else {
			handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if ($.datepicker._get(inst, 'constrainInput')) {
			var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
			var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var inst = $.datepicker._getInst(event.target);
		if (inst.input.val() != inst.lastVal) {
			try {
				var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));
				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (err) {
				$.datepicker.log(err);
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	   If false returned from beforeShow event handler do not show.
	   @param  input  element - the input field attached to the date picker or
	                  event - if triggered by focus */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
			input = $('input', input.parentNode)[0];
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
			return;
		var inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst != inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}
		var beforeShow = $.datepicker._get(inst, 'beforeShow');
		var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			//false
			return;
		}
		extendRemove(inst.settings, beforeShowSettings);
		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);
		if ($.datepicker._inDialog) // hide cursor
			input.value = '';
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}
		var isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css('position') == 'fixed';
			return !isFixed;
		});
		var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		//to avoid flashes on Firefox
		inst.dpDiv.empty();
		// determine sizing offscreen
		inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
			left: offset.left + 'px', top: offset.top + 'px'});
		if (!inst.inline) {
			var showAnim = $.datepicker._get(inst, 'showAnim');
			var duration = $.datepicker._get(inst, 'duration');
			var postProcess = function() {
				var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
				if( !! cover.length ){
					var borders = $.datepicker._getBorders(inst.dpDiv);
					cover.css({left: -borders[0], top: -borders[1],
						width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
				}
			};
			inst.dpDiv.zIndex($(input).zIndex()+1);
			$.datepicker._datepickerShowing = true;

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) )
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
			if (!showAnim || !duration)
				postProcess();
			if (inst.input.is(':visible') && !inst.input.is(':disabled'))
				inst.input.focus();
			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		var borders = $.datepicker._getBorders(inst.dpDiv);
		instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);
		var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
		if( !!cover.length ){ //avoid call to outerXXXX() when not in IE6
			cover.css({left: -borders[0], top: -borders[1], width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()})
		}
		inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
		var numMonths = this._getNumberOfMonths(inst);
		var cols = numMonths[1];
		var width = 17;
		inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
		if (cols > 1)
			inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
		inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
		inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
		if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				// #6694 - don't focus the input if it's already focused
				// this breaks the change event in IE
				inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
			inst.input.focus();
		// deffered render of the years select (to avoid flashes on Firefox)
		if( inst.yearshtml ){
			var origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//assure that inst.yearshtml didn't change.
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	/* Retrieve the size of left and top borders for an element.
	   @param  elem  (jQuery object) the element of interest
	   @return  (number[2]) the left and top borders */
	_getBorders: function(elem) {
		var convert = function(value) {
			return {thin: 1, medium: 2, thick: 3}[value] || value;
		};
		return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth();
		var dpHeight = inst.dpDiv.outerHeight();
		var inputWidth = inst.input ? inst.input.outerWidth() : 0;
		var inputHeight = inst.input ? inst.input.outerHeight() : 0;
		var viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft());
		var viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var inst = this._getInst(obj);
		var isRTL = this._get(inst, 'isRTL');
		while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
		}
		var position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
	   @param  input  element - the input field attached to the date picker */
	_hideDatepicker: function(input) {
		var inst = this._curInst;
		if (!inst || (input && inst != $.data(input, PROP_NAME)))
			return;
		if (this._datepickerShowing) {
			var showAnim = this._get(inst, 'showAnim');
			var duration = this._get(inst, 'duration');
			var postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) )
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
			else
				inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
			if (!showAnim)
				postProcess();
			this._datepickerShowing = false;
			var onClose = this._get(inst, 'onClose');
			if (onClose)
				onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);
			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
				if ($.blockUI) {
					$.unblockUI();
					$('body').append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst)
			return;

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id != $.datepicker._mainDivId &&
				$target.parents('#' + $.datepicker._mainDivId).length == 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst ) )
			$.datepicker._hideDatepicker();
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		}
		else {
			var date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value,10);
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var target = $(id);
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}
		var inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $('a', td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		this._selectDate(target, '');
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var target = $(id);
		var inst = this._getInst(target[0]);
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input)
			inst.input.val(dateStr);
		this._updateAlternate(inst);
		var onSelect = this._get(inst, 'onSelect');
		if (onSelect)
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		else if (inst.input)
			inst.input.trigger('change'); // fire the change event
		if (inst.inline)
			this._updateDatepicker(inst);
		else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) != 'object')
				inst.input.focus(); // restore focus
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	   @param  date  Date - the date to customise
	   @return [boolean, string] - is this date selectable?, what is its CSS class? */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ''];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	   @param  date  Date - the date to get the week for
	   @return  number - the number of the week within the year that contains this date */
	iso8601Week: function(date) {
		var checkDate = new Date(date.getTime());
		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	   See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
	   @param  value     string - the date in the above format
	   @param  settings  Object - attributes include:
	                     shortYearCutoff  number - the cutoff year for determining the century (optional)
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  Date - the extracted date value or null if value is blank */
	parseDate: function (format, value, settings) {
		if (format == null || value == null)
			throw 'Invalid arguments';
		value = (typeof value == 'object' ? value.toString() : value + '');
		if (value == '')
			return null;
		var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		var year = -1;
		var month = -1;
		var day = -1;
		var doy = -1;
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Extract a number from the string value
		var getNumber = function(match) {
			var isDoubled = lookAhead(match);
			var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
			var digits = new RegExp('^\\d{1,' + size + '}');
			var num = value.substring(iValue).match(digits);
			if (!num)
				throw 'Missing number at position ' + iValue;
			iValue += num[0].length;
			return parseInt(num[0], 10);
		};
		// Extract a name from the string value and convert to an index
		var getName = function(match, shortNames, longNames) {
			var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
				return [ [k, v] ];
			}).sort(function (a, b) {
				return -(a[1].length - b[1].length);
			});
			var index = -1;
			$.each(names, function (i, pair) {
				var name = pair[1];
				if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
					index = pair[0];
					iValue += name.length;
					return false;
				}
			});
			if (index != -1)
				return index + 1;
			else
				throw 'Unknown name at position ' + iValue;
		};
		// Confirm that a literal character matches the string value
		var checkLiteral = function() {
			if (value.charAt(iValue) != format.charAt(iFormat))
				throw 'Unexpected literal at position ' + iValue;
			iValue++;
		};
		var iValue = 0;
		for (var iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					checkLiteral();
			else
				switch (format.charAt(iFormat)) {
					case 'd':
						day = getNumber('d');
						break;
					case 'D':
						getName('D', dayNamesShort, dayNames);
						break;
					case 'o':
						doy = getNumber('o');
						break;
					case 'm':
						month = getNumber('m');
						break;
					case 'M':
						month = getName('M', monthNamesShort, monthNames);
						break;
					case 'y':
						year = getNumber('y');
						break;
					case '@':
						var date = new Date(getNumber('@'));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case '!':
						var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'"))
							checkLiteral();
						else
							literal = true;
						break;
					default:
						checkLiteral();
				}
		}
		if (iValue < value.length){
			var extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}
		if (year == -1)
			year = new Date().getFullYear();
		else if (year < 100)
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				var dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim)
					break;
				month++;
				day -= dim;
			} while (true);
		}
		var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
			throw 'Invalid date'; // E.g. 31/02/00
		return date;
	},

	/* Standard date formats. */
	ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
	COOKIE: 'D, dd M yy',
	ISO_8601: 'yy-mm-dd',
	RFC_822: 'D, d M y',
	RFC_850: 'DD, dd-M-y',
	RFC_1036: 'D, d M y',
	RFC_1123: 'D, d M yy',
	RFC_2822: 'D, d M yy',
	RSS: 'D, d M y', // RFC 822
	TICKS: '!',
	TIMESTAMP: '@',
	W3C: 'yy-mm-dd', // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	   The format can be combinations of the following:
	   d  - day of month (no leading zero)
	   dd - day of month (two digit)
	   o  - day of year (no leading zeros)
	   oo - day of year (three digit)
	   D  - day name short
	   DD - day name long
	   m  - month of year (no leading zero)
	   mm - month of year (two digit)
	   M  - month name short
	   MM - month name long
	   y  - year (two digit)
	   yy - year (four digit)
	   @ - Unix timestamp (ms since 01/01/1970)
	   ! - Windows ticks (100ns since 01/01/0001)
	   '...' - literal text
	   '' - single quote

	   @param  format    string - the desired format of the date
	   @param  date      Date - the date value to format
	   @param  settings  Object - attributes include:
	                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
	                     dayNames         string[7] - names of the days from Sunday (optional)
	                     monthNamesShort  string[12] - abbreviated names of the months (optional)
	                     monthNames       string[12] - names of the months (optional)
	   @return  string - the date in the above format */
	formatDate: function (format, date, settings) {
		if (!date)
			return '';
		var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
		var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
		var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
		var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		// Format a number, with leading zero if necessary
		var formatNumber = function(match, value, len) {
			var num = '' + value;
			if (lookAhead(match))
				while (num.length < len)
					num = '0' + num;
			return num;
		};
		// Format a name, short or long as requested
		var formatName = function(match, value, shortNames, longNames) {
			return (lookAhead(match) ? longNames[value] : shortNames[value]);
		};
		var output = '';
		var literal = false;
		if (date)
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						output += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							output += formatNumber('d', date.getDate(), 2);
							break;
						case 'D':
							output += formatName('D', date.getDay(), dayNamesShort, dayNames);
							break;
						case 'o':
							output += formatNumber('o',
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case 'm':
							output += formatNumber('m', date.getMonth() + 1, 2);
							break;
						case 'M':
							output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
							break;
						case 'y':
							output += (lookAhead('y') ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
							break;
						case '@':
							output += date.getTime();
							break;
						case '!':
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'"))
								output += "'";
							else
								literal = true;
							break;
						default:
							output += format.charAt(iFormat);
					}
			}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var chars = '';
		var literal = false;
		// Check whether a format character is doubled
		var lookAhead = function(match) {
			var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
			if (matches)
				iFormat++;
			return matches;
		};
		for (var iFormat = 0; iFormat < format.length; iFormat++)
			if (literal)
				if (format.charAt(iFormat) == "'" && !lookAhead("'"))
					literal = false;
				else
					chars += format.charAt(iFormat);
			else
				switch (format.charAt(iFormat)) {
					case 'd': case 'm': case 'y': case '@':
						chars += '0123456789';
						break;
					case 'D': case 'M':
						return null; // Accept anything
					case "'":
						if (lookAhead("'"))
							chars += "'";
						else
							literal = true;
						break;
					default:
						chars += format.charAt(iFormat);
				}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() == inst.lastVal) {
			return;
		}
		var dateFormat = this._get(inst, 'dateFormat');
		var dates = inst.lastVal = inst.input ? inst.input.val() : null;
		var date, defaultDate;
		date = defaultDate = this._getDefaultDate(inst);
		var settings = this._getFormatConfig(inst);
		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			this.log(event);
			dates = (noDefault ? '' : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		};
		var offsetString = function(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
					offset, $.datepicker._getFormatConfig(inst));
			}
			catch (e) {
				// Ignore
			}
			var date = (offset.toLowerCase().match(/^c/) ?
				$.datepicker._getDate(inst) : null) || new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 'd') {
					case 'd' : case 'D' :
						day += parseInt(matches[1],10); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1],10) * 7; break;
					case 'm' : case 'M' :
						month += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1],10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		};
		var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
		newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	   Hours may be non-zero on daylight saving cut-over:
	   > 12 when midnight changeover, but then cannot generate
	   midnight datetime, so jump to 1AM, otherwise reset.
	   @param  date  (Date) the date to check
	   @return  (Date) the corrected date */
	_daylightSavingAdjust: function(date) {
		if (!date) return null;
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date;
		var origMonth = inst.selectedMonth;
		var origYear = inst.selectedYear;
		var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
			this._notifyChange(inst);
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? '' : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	_attachHandlers: function(inst) {
		var stepMonths = this._get(inst, 'stepMonths');
		var id = '#' + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.find('[data-handler]').map(function () {
			var handler = {
				prev: function () {
					window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, -stepMonths, 'M');
				},
				next: function () {
					window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, +stepMonths, 'M');
				},
				hide: function () {
					window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
				},
				today: function () {
					window['DP_jQuery_' + dpuuid].datepicker._gotoToday(id);
				},
				selectDay: function () {
					window['DP_jQuery_' + dpuuid].datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
					return false;
				},
				selectMonth: function () {
					window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'M');
					return false;
				},
				selectYear: function () {
					window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'Y');
					return false;
				}
			};
			$(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var today = new Date();
		today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
		var isRTL = this._get(inst, 'isRTL');
		var showButtonPanel = this._get(inst, 'showButtonPanel');
		var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
		var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
		var numMonths = this._getNumberOfMonths(inst);
		var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
		var stepMonths = this._get(inst, 'stepMonths');
		var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
		var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var drawMonth = inst.drawMonth - showCurrentAtPos;
		var drawYear = inst.drawYear;
		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;
		var prevText = this._get(inst, 'prevText');
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
		var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' +
			' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
		var nextText = this._get(inst, 'nextText');
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
		var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' +
			' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
			(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
		var currentText = this._get(inst, 'currentText');
		var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
		var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' +
			this._get(inst, 'closeText') + '</button>' : '');
		var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
			(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"' +
			'>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
		var firstDay = parseInt(this._get(inst, 'firstDay'),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);
		var showWeek = this._get(inst, 'showWeek');
		var dayNames = this._get(inst, 'dayNames');
		var dayNamesShort = this._get(inst, 'dayNamesShort');
		var dayNamesMin = this._get(inst, 'dayNamesMin');
		var monthNames = this._get(inst, 'monthNames');
		var monthNamesShort = this._get(inst, 'monthNamesShort');
		var beforeShowDay = this._get(inst, 'beforeShowDay');
		var showOtherMonths = this._get(inst, 'showOtherMonths');
		var selectOtherMonths = this._get(inst, 'selectOtherMonths');
		var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
		var defaultDate = this._getDefaultDate(inst);
		var html = '';
		for (var row = 0; row < numMonths[0]; row++) {
			var group = '';
			this.maxRows = 4;
			for (var col = 0; col < numMonths[1]; col++) {
				var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				var cornerClass = ' ui-corner-all';
				var calender = '';
				if (isMultiMonth) {
					calender += '<div class="ui-datepicker-group';
					if (numMonths[1] > 1)
						switch (col) {
							case 0: calender += ' ui-datepicker-group-first';
								cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
							case numMonths[1]-1: calender += ' ui-datepicker-group-last';
								cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
							default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
						}
					calender += '">';
				}
				calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
					(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
					(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' +
					'<tr>';
				var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
				for (var dow = 0; dow < 7; dow++) { // days of the week
					var day = (dow + firstDay) % 7;
					thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
				}
				calender += thead + '</tr></thead><tbody>';
				var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				var curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += '<tr>';
					var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
						this._get(inst, 'calculateWeek')(printDate) + '</td>');
					for (var dow = 0; dow < 7; dow++) { // create date picker days
						var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
						var otherMonth = (printDate.getMonth() != drawMonth);
						var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
							(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
							(printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + '</tr>';
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
							((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
				group += calender;
			}
			html += group;
		}
		html += buttonPanel + ($.ui.ie6 && !inst.inline ?
			'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {
		var changeMonth = this._get(inst, 'changeMonth');
		var changeYear = this._get(inst, 'changeYear');
		var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
		var html = '<div class="ui-datepicker-title">';
		var monthHtml = '';
		// month selection
		if (secondary || !changeMonth)
			monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
		else {
			var inMinYear = (minDate && minDate.getFullYear() == drawYear);
			var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
			monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
			for (var month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
					monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
			}
			monthHtml += '</select>';
		}
		if (!showMonthAfterYear)
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
		// year selection
		if ( !inst.yearshtml ) {
			inst.yearshtml = '';
			if (secondary || !changeYear)
				html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
			else {
				// determine range of years to display
				var years = this._get(inst, 'yearRange').split(':');
				var thisYear = new Date().getFullYear();
				var determineYear = function(value) {
					var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				var year = determineYear(years[0]);
				var endYear = Math.max(year, determineYear(years[1] || ''));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
				for (; year <= endYear; year++) {
					inst.yearshtml += '<option value="' + year + '"' +
						(year == drawYear ? ' selected="selected"' : '') +
						'>' + year + '</option>';
				}
				inst.yearshtml += '</select>';

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}
		html += this._get(inst, 'yearSuffix');
		if (showMonthAfterYear)
			html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
		html += '</div>'; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period == 'Y' ? offset : 0);
		var month = inst.drawMonth + (period == 'M' ? offset : 0);
		var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
		var date = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period == 'M' || period == 'Y')
			this._notifyChange(inst);
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		var newDate = (minDate && date < minDate ? minDate : date);
		newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
		return newDate;
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, 'onChangeMonthYear');
		if (onChange)
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, 'numberOfMonths');
		return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst);
		var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
		if (offset < 0)
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, 'min');
		var maxDate = this._getMinMaxDate(inst, 'max');
		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, 'shortYearCutoff');
		shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
			monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day == 'object' ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function bindHover(dpDiv) {
	var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
	return dpDiv.delegate(selector, 'mouseout', function() {
			$(this).removeClass('ui-state-hover');
			if (this.className.indexOf('ui-datepicker-prev') != -1) $(this).removeClass('ui-datepicker-prev-hover');
			if (this.className.indexOf('ui-datepicker-next') != -1) $(this).removeClass('ui-datepicker-next-hover');
		})
		.delegate(selector, 'mouseover', function(){
			if (!$.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
				$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
				$(this).addClass('ui-state-hover');
				if (this.className.indexOf('ui-datepicker-prev') != -1) $(this).addClass('ui-datepicker-prev-hover');
				if (this.className.indexOf('ui-datepicker-next') != -1) $(this).addClass('ui-datepicker-next-hover');
			}
		});
}

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props)
		if (props[name] == null || props[name] == undefined)
			target[name] = props[name];
	return target;
};

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
	                Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick).
			find(document.body).append($.datepicker.dpDiv);
		$.datepicker.initialized = true;
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
		return $.datepicker['_' + options + 'Datepicker'].
			apply($.datepicker, [this[0]].concat(otherArgs));
	return this.each(function() {
		typeof options == 'string' ?
			$.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.9.1";

// Workaround for #4055
// Add another global to avoid noConflict issues with inline event handlers
window['DP_jQuery_' + dpuuid] = $;

})( actuate.common.web.jQuery );
/*!
 * jQuery UI Mouse 1.9.1
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function( e ) {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	version: "1.9.1",
	options: {
		cancel: 'input,textarea,button,select,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
					$.removeData(event.target, that.widgetName + '.preventClickEvent');
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
		if ( this._mouseMoveDelegate ) {
			$(document)
				.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
				.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if( mouseHandled ) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
			$.removeData(event.target, this.widgetName + '.preventClickEvent');
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.ui.ie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + '.preventClickEvent', true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})( actuate.common.web.jQuery );
/*!
 * jQuery UI Draggable 1.9.1
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.draggable", $.ui.mouse, {
	version: "1.9.1",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	},
	_create: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	_destroy: function() {
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {

		var o = this.options;

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;

		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
			$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
			.css({
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.positionAbs = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		//Trigger event + callbacks
		if(this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);


		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) $.ui.ddmanager.dragStart(this, event);

		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if(this._trigger('drag', event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		//if a drop comes from outside (a sortable)
		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		//if the original element is no longer in the DOM don't bother to continue (see #8269)
		var element = this.element[0], elementInDom = false;
		while ( element && (element = element.parentNode) ) {
			if (element == document ) {
				elementInDom = true;
			}
		}
		if ( !elementInDom && this.options.helper === "original" )
			return false;

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var that = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if(that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if(this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function(event) {
		//Remove frame helpers
		$("div.ui-draggable-iframeFix").each(function() {
			this.parentNode.removeChild(this);
		});

		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if( $.ui.ddmanager ) $.ui.ddmanager.dragStop(this, event);

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function() {

		if(this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone().removeAttr('id') : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.ui.ie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0),
			right: (parseInt(this.element.css("marginRight"),10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			o.containment == 'document' ? 0 : $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
			o.containment == 'document' ? 0 : $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
			(o.containment == 'document' ? 0 : $(window).scrollLeft()) + $(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			(o.containment == 'document' ? 0 : $(window).scrollTop()) + ($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
			var c = $(o.containment);
			var ce = c[0]; if(!ce) return;
			var co = c.offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				(parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0),
				(parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0),
				(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
				(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top  - this.margins.bottom
			];
			this.relative_container = c;

		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options
			var containment;
			if(this.containment) {
			if (this.relative_container){
				var co = this.relative_container.offset();
				containment = [ this.containment[0] + co.left,
					this.containment[1] + co.top,
					this.containment[2] + co.left,
					this.containment[3] + co.top ];
			}
			else {
				containment = this.containment;
			}

				if(event.pageX - this.offset.click.left < containment[0]) pageX = containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < containment[1]) pageY = containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > containment[2]) pageX = containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > containment[3]) pageY = containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? (!(top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3]) ? top : (!(top - this.offset.click.top < containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? (!(left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2]) ? left : (!(left - this.offset.click.left < containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ( ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.Widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: 'valid/invalid'
				if(this.shouldRevert) this.instance.options.revert = true;

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), that = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {

			var innermostIntersecting = false;
			var thisSortable = this;
			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;

			if(this.instance._intersectsWith(this.instance.containerCache)) {
				innermostIntersecting = true;
				$.each(inst.sortables, function () {
					this.instance.positionAbs = inst.positionAbs;
					this.instance.helperProportions = inst.helperProportions;
					this.instance.offset.click = inst.offset.click;
					if  (this != thisSortable
						&& this.instance._intersectsWith(this.instance.containerCache)
						&& $.ui.contains(thisSortable.instance.element[0], this.instance.element[0]))
						innermostIntersecting = false;
						return innermostIntersecting;
				});
			}


			if(innermostIntersecting) {
				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(that).clone().removeAttr('id').appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;

					//Prevent reverting on this forced stop
					this.instance.options.revert = false;

					// The out event needs to be triggered independently
					this.instance._trigger('out', event, this.instance._uiHash(this.instance));

					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);
		});
		if (!group.length) { return; }

		var min = parseInt(group[0].style.zIndex) || 0;
		$(group).each(function(i) {
			this.style.zIndex = min + i;
		});

		this[0].style.zIndex = min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})( actuate.common.web.jQuery );
actuate.common.web.resource.module.define("uxumc.css",
{
	_cssPath : "common/jslib/themes/default",
	_cssFiles : new Array( 
			"umc.css"
			),
	_noComma : null
});
actuate.common.web.resource.module.define("webjslib.css",
{
_cssPath : "common/jslib/themes/default",
_cssFiles : new Array( 
		"jslibapi.css",
		"yggdrasil.css"
		),
_noComma : null
});
actuate.common.web.resource.module.define("actuate.ac",
{
_jsPath : "admin/jsapi/ac",
_jsFiles : new Array( "ac.js" ),
_cssPath : "admin/jsapi/ac/themes/default",
_cssFiles : new Array( "ac.css" ),
	_localizedStringServlet : "acadmin/acresource",
	_localizedString : true,
_noComma : null
});
actuate.common.web.resource.module.define("actuate.myfiles",
{
_jsPath : "myfiles/jsapi/myfiles",
_jsFiles : new Array( "myfiles.js" ),
_cssPath : "myfiles/jsapi/myfiles/themes/default",
_cssFiles : new Array( "myfiles.css" ),
	_localizedStringServlet : "acmyfiles/myfilesresource",
	_localizedString : true,
_noComma : null
});
