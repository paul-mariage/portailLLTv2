/**
 * Actuate Corporation
 * Copyright (C) 2003 Actuate Corporation. All rights reserved.
 */

var g_cookieWritingEnabled = true;
var g_cookieSecure = false;

///////////////////////////////////////////////////////////////////////////////
// Globals
///////////////////////////////////////////////////////////////////////////////

function dbout(value)
{
//	alert(value);
}

///////////////////////////////////////////////////////////////////////////////

function readCookie( key )
{
	var value = "";

	var allcookies = document.cookie;

	dbout( allcookies );

	var pos = allcookies.indexOf( key + "=");

	if ( pos != -1 )
	{
		var start = pos + key.length;

		var end = allcookies.indexOf( ";", start );

		if ( end == -1 )
			end = allcookies.length;

		value = allcookies.slice( start+1, end );

		value = decodeCookie(value);
	}

	return value;
}

///////////////////////////////////////////////////////////////////////////////

function writeCookie( key, value, expirationDate, path )
{
	if (!g_cookieWritingEnabled) {
		return;
	}

	cookieString = key + "=" + encodeCookie(value);
	if ( expirationDate )
	{
		cookieString += ";expires=" + expirationDate;
	}

	if ( path )
	{
        cookieString += ";path=" + path;
	}

	if ( g_cookieSecure )
	{
		cookieString += ";secure";
	}

	document.cookie = cookieString;
}

///////////////////////////////////////////////////////////////////////////////

function listCookies()
{
	dbout( 'in listCookies cookies = ' + document.cookie );
}

///////////////////////////////////////////////////////////////////////////////

function clearCookies()
{
	document.cookie = "";
}




