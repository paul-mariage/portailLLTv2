/**
 *
 *
 * @author	Actuate Corporation
 *			Copyright (C) 2001 Actuate Corporation. All rights reserved.
 * @version	1.0
 */

/**************************************************************************
 Contains javascript encode and unencode functions.
***************************************************************************/

var hexArray = new Array(
	"00", "01", "02", "03", "04", "05", "06", "07",
	"08", "09", "0a", "0b", "0c", "0d", "0e", "0f",
	"10", "11", "12", "13", "14", "15", "16", "17",
	"18", "19", "1a", "1b", "1c", "1d", "1e", "1f",
	"20", "21", "22", "23", "24", "25", "26", "27",
	"28", "29", "2a", "2b", "2c", "2d", "2e", "2f",
	"30", "31", "32", "33", "34", "35", "36", "37",
	"38", "39", "3a", "3b", "3c", "3d", "3e", "3f",
	"40", "41", "42", "43", "44", "45", "46", "47",
	"48", "49", "4a", "4b", "4c", "4d", "4e", "4f",
	"50", "51", "52", "53", "54", "55", "56", "57",
	"58", "59", "5a", "5b", "5c", "5d", "5e", "5f",
	"60", "61", "62", "63", "64", "65", "66", "67",
	"68", "69", "6a", "6b", "6c", "6d", "6e", "6f",
	"70", "71", "72", "73", "74", "75", "76", "77",
	"78", "79", "7a", "7b", "7c", "7d", "7e", "7f",
	"80", "81", "82", "83", "84", "85", "86", "87",
	"88", "89", "8a", "8b", "8c", "8d", "8e", "8f",
	"90", "91", "92", "93", "94", "95", "96", "97",
	"98", "99", "9a", "9b", "9c", "9d", "9e", "9f",
	"a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7",
	"a8", "a9", "aa", "ab", "ac", "ad", "ae", "af",
	"b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7",
	"b8", "b9", "ba", "bb", "bc", "bd", "be", "bf",
	"c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7",
	"c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf",
	"d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7",
	"d8", "d9", "da", "db", "dc", "dd", "de", "df",
	"e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7",
	"e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef",
	"f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7",
	"f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"
);

/**
 * Encode a string to the "x-www-form-urlencoded" form, enhanced
 * with the UTF-8-in-URL proposal. This is what happens:
 *
 * <ul>
 * <li><p>The ASCII characters 'a' through 'z', 'A' through 'Z',
 *        and '0' through '9' remain the same.
 *
 * <li><p>The unreserved characters - _ . ! ~ * ' ( ) remain the same.
 *
 * <li><p>The space character ' ' is converted into a plus sign '+'.
 *
 * <li><p>All other ASCII characters are converted into the
 *        3-character string "%xy", where xy is
 *        the two-digit hexadecimal representation of the character
 *        code
 *
 * <li><p>All non-ASCII characters are encoded in two steps: first
 *        to a sequence of 2 or 3 bytes, using the UTF-8 algorithm;
 *        secondly each of these bytes is encoded as "%xx".
 * </ul>
 *
 * @param s The string to be encoded
 * @return The encoded string
 */
function encode(s, charEnc)
{
	s = new String(s);
	if(charEnc)
	{
		charEnc = new String(charEnc);
	}
	else
	{
		charEnc = "%";
	}

	var sbuf = new String("");

	var len = s.length;
	for (var i = 0; i < len; i++)
	{
		var ch = s.charAt(i);
		var chCode = s.charCodeAt(i);
		if ('A' <= ch && ch <= 'Z')
		{		// 'A'..'Z'
			sbuf+=ch;
		}
		else if ('a' <= ch && ch <= 'z')	// 'a'..'z'
		{
			sbuf+=ch;
		}
		else if ('0' <= ch && ch <= '9')	// '0'..'9'
		{
			sbuf+=ch;
		}
		else if (chCode <= 0x007f)	// other ASCII
		{
			sbuf += charEnc+hexArray[chCode];
		}
		else if (chCode <= 0x07FF)		// non-ASCII <= 0x7FF
		{
			sbuf += charEnc+(hexArray[0xc0 | (chCode >> 6)]);
			sbuf += charEnc+(hexArray[0x80 | (chCode & 0x3F)]);
		}
		else					// 0x7FF < ch <= 0xFFFF
		{
			sbuf += charEnc+(hexArray[0xe0 | (chCode >> 12)]);
			sbuf += charEnc+(hexArray[0x80 | ((chCode >> 6) & 0x3F)]);
			sbuf += charEnc+(hexArray[0x80 | (chCode & 0x3F)]);
		}
	}
	return sbuf;
}

/**
 * This method is used to encode the non-breaking space char with code '160' to
 * a " ". This method is used to solve a Netscape bug.
 */
function encodeNonBreakingCode(s)
{
	s = new String(s);
	var sbuf = new String("");
	var len = s.length;

	for (var i = 0; i < len; i++)
	{
		var ch = s.charAt(i);
		var chCode = s.charCodeAt(i);
		if (chCode == 160)
		{
			sbuf+=' ';
		}
		else
		{
			sbuf+=ch;
		}
	}
	return sbuf;
}

/**
 * This method is used to decode an encoded string.
 */
function decode(s, charEnc)
{
	s = new String(s);
	if(charEnc)
	{
		charEnc = new String(charEnc);
	}
	else
	{
		charEnc = "%";
	}

	var sbuf = new String("") ;
	var l  = s.length;
	var ch = -1 ;
	var b, sumb = 0;
	for (var i = 0, more = -1 ; i < l ; i++)
	{
		ch = s.charAt(i);
		if (ch == charEnc)
		{
			 ch = s.charAt (++i) ;
			 var hb = (isDigit (ch)
					   ? ch - '0'
						 : 10+ (toLowerCase(ch)).charCodeAt(0) - (new String('a')).charCodeAt(0)) & 0xF ;
			 ch = s.charAt (++i) ;
			 var lb = (isDigit (ch)
					   ? ch - '0'
						 : 10+(toLowerCase(ch)).charCodeAt(0) - (new String('a')).charCodeAt(0)) & 0xF ;
			 b = (String.fromCharCode((hb << 4) | lb)).charCodeAt(0) ;
		 }
		 else
		 {
			 b = ch.charCodeAt(0);
		 }
		if ((b & 0xc0) == 0x80)		// 10xxxxxx (continuation byte)
		{
			sumb = sumb.toString();
			sumb = String.fromCharCode(((sumb.charCodeAt(0) << 6) | (b & 0x3f))) ;	// Add 6 bits to sumb
			if (--more == 0)
			{
				sbuf += sumb;
			}
		}
		else if ((b & 0x80) == 0x00)		// 0xxxxxxx (yields 7 bits)
		{
			sbuf+=String.fromCharCode(b);
		}
		else if ((b & 0xe0) == 0xc0)		// 110xxxxx (yields 5 bits)
		{
			sumb = String.fromCharCode(b & 0x1f);
			more = 1;						// Expect 1 more byte
		}
		else if ((b & 0xf0) == 0xe0)		// 1110xxxx (yields 4 bits)
		{
			sumb = String.fromCharCode(b & 0x0f);
			more = 2;						// Expect 2 more bytes
		}
		else if ((b & 0xf8) == 0xf0)		// 11110xxx (yields 3 bits)
		{
			sumb = String.fromCharCode(b & 0x07);
			more = 3;						// Expect 3 more bytes
		}
		else if ((b & 0xfc) == 0xf8)		// 111110xx (yields 2 bits)
		{
			sumb = String.fromCharCode(b & 0x03);
			more = 4;						// Expect 4 more bytes
		}
		else 								// 1111110x (yields 1 bit)
		{
			sumb = String.fromCharCode(b & 0x01);
			more = 5;						// Expect 5 more bytes
		}
	}
	return sbuf;
}

//returns true or false.
function isDigit(charVal)
{
	return (charVal >= '0' && charVal <= '9');
}

function toLowerCase(charVal)
{
	var str = new String(charVal);
	str = str.toLowerCase();
	return str.charAt(0);
}

/**
 *
 */
function htmlEncode(s)
{
	s = new String(s);
	var sbuf = new String("");

	var len = s.length;
	for (var i = 0; i < len; i++)
	{
		var ch = s.charAt(i);
		var chCode = s.charCodeAt(i);
		if (('A' <= ch && ch <= 'Z') || ('a' <= ch && ch <= 'z') || ('0' <= ch && ch <= '9'))
		{
			sbuf+=ch;
		}
		else if (ch == ' ')
		{
			sbuf+="&nbsp;";
		}
		else if(chCode <= 255)
		{
			sbuf+="&#"+chCode+";";
		}
		else
		{
			sbuf+=ch;
		}
	}
	return sbuf;
}

function formEncode(s)
{
	s = new String(s);
	var sbuf = new String("");

	var len = s.length;
	for (var i = 0; i < len; i++)
	{
		var ch = s.charAt(i);
		var chCode = s.charCodeAt(i);
		if (('A' <= ch && ch <= 'Z') || ('a' <= ch && ch <= 'z') || ('0' <= ch && ch <= '9'))
		{
			sbuf+=ch;
		}
		else if (ch == ' ')
		{
			sbuf+="&#"+"32"+";";
		}
		else if(chCode <= 255)
		{
			sbuf+="&#"+chCode+";";
		}
		else
		{
			sbuf+=ch;
		}
	}
	return sbuf;
}

/**
 * This is used to encode values which are stored in cookies.
 * This is exactly similar to the encode() method above,
 * however, instead of "%", it uses "#".
 *
 * @param s The string to be encoded
 * @return The encoded string
 */
function encodeCookie(s)
{
	return encode(s, "#");
}

/**
 * This method is used to decode an string using encodeCookie method.
 * Again, it is similar to decode method above, except that it uses
 * "#" instead of "%" to recognise an encoded value.
 */
function decodeCookie(s)
{
	return decode(s, "#");
}

/**
 * Encodes the separator chars being used in cookie values.
 * This is used in all main pages to encode the text filter value
 * before being passed to the setFilterCookie method.
 */
function encodeCookieSeparators(cookieValue)
{
	cookieValue = "" + cookieValue;
	var returnStr = "";
	for (var i=0; i < cookieValue.length; i++)
	{
		switch (cookieValue.charAt(i))
		{
			case ':':
				returnStr += "#"+cookieValue.charCodeAt(i)+";";
				break;
			case '^':
				returnStr += "#"+cookieValue.charCodeAt(i)+";";
				break;
			case '|':
				returnStr += "#"+cookieValue.charCodeAt(i)+";";
				break;
			case '#':
				returnStr += "#"+cookieValue.charCodeAt(i)+";";
				break;
			case ';':
				returnStr += "#"+cookieValue.charCodeAt(i)+";";
				break;
			default :
				returnStr += cookieValue.charAt(i);
				break;
		}
	}
	return returnStr;
}

/**
 * Decodes the separator chars in cookie value.
 */
function decodeCookieSeparators(cookieValue)
{
	cookieValue = "" + cookieValue;
	var returnStr = "";

	var arrAllHashTokens = cookieValue.split("#");
	for (var allItr=0; allItr < arrAllHashTokens.length; allItr++)
	{
		var token = arrAllHashTokens[allItr];
		var semiColIndex = token.indexOf(";");
		if (semiColIndex != -1)
		{
			returnStr += String.fromCharCode(token.substring(0, semiColIndex));
			if (token.length > semiColIndex+1)
			{
				returnStr += token.substring(semiColIndex+1, token.length);
			}
		}
		else
		{
			returnStr += token;
		}
	}

	return returnStr;
}

/**
 * Decodes a string value which has been retrieved using the HTMLElement.innerHTML property.
 * In IE we can use innerText property. This method is required for Netscape support.
 */
function decodeInnerHTML(s)
{
	var s = "" + s;
	var returnStr = "";

	var arrAllAmpTokens = s.split("&");
	for (var allItr=0; allItr < arrAllAmpTokens.length; allItr++)
	{
		var token = arrAllAmpTokens[allItr];

		var semiColIndex = token.indexOf(";");
		if (semiColIndex != -1)
		{
			var encodedValue = token.substring(0, semiColIndex);
			switch (encodedValue)
			{
				case "nbsp": //Space
					returnStr += " ";
					break;
				case "amp": //Ampersand
					returnStr += "&";
					break;
				case 'lt': //Less than
					returnStr += "<";
					break;
				case 'gt': //Greater than
					returnStr += ">";
					break;
			}
			if (token.length > semiColIndex+1)
			{
				returnStr += token.substring(semiColIndex+1, token.length);
				returnStr = encodeNonBreakingCode(returnStr);
			}
		}
		else
		{
			returnStr += encodeNonBreakingCode(token);
		}
	}

	return returnStr;
}