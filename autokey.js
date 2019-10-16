// Global variables
var table = new Array(26);
var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
makeTable();

/* Create tabula recta */
function makeTable(){
	/* Makes the 2D array */
	for (var i = 0; i < table.length; i++){
		table[i] = new Array(26);
	}
	/* Makes tabula recta */
	for (var i = 0; i < 26; i++){
		for (var j = 0; j < 26; j++){
			var let = i + j;
			if (let >= 26){
				let -= 26;
			}
			let += 65;

			table[i][j] = String.fromCharCode(let);
		}
	}
/*
	for (var i = 0; i < 26; i++){
		for (var j = 0; j < 26; j++){
			document.write(table[i][j] + " ");
    }
    document.write("<br>");
}
*/
}

/* Encipher functions by extending plain text */
function encipher_Clicked(){
	var input = document.getElementById("pText").value.replace(/[^A-Za-z]+/g, "").toUpperCase();
	var key = document.getElementById("keyword").value.replace(/[^A-Za-z]+/g, "").toUpperCase();
	var keyword = key + input;

	/* Error checking for empty input fields */

	if (document.getElementById("radioPlain").checked){
		var cryptText = extendPlain_encipher(keyword, input);
		cryptText = output(cryptText);
		cText.value = cryptText;
	}
	else{
		var cryptText = extendCrypt_encipher(key, input);
		cryptText = output(cryptText);
		cText.value = cryptText;
	}
}

function extendPlain_encipher(keyword, plainText){
	var len = plainText.length;
	var cryptText = "";

	for (var i = 0; i < len; i++){
		var keyLetter = keyword.charCodeAt(i);
		var pText = plainText.charCodeAt(i);
    var row = keyLetter - 65;
    var col = pText - 65;
		cryptText = cryptText + table[row][col];
	}
	return cryptText;
}

function extendCrypt_encipher(key, plainText){
	var len = plainText.length;
	var keyword = key + plainText;
	var cText = extendPlain_encipher(keyword, plainText);
	var extend = key + cText;
	var cryptText = "";

	for (var i = 0; i < len; i++){
		var keyLetter = extend.charCodeAt(i);
		var pText = plainText.charCodeAt(i);
    var row = keyLetter - 65;
    var col = pText - 65;
		cryptText = cryptText + table[row][col];
	}
	return cryptText;
}

/* Decipher functions by extending by plain text or cipher text depending on the radio button selection */
function decipher_Clicked(){
	var cText = document.getElementById("cText").value.replace(/[^A-Za-z]+/g, "").toUpperCase();
	var key = document.getElementById("keyword").value.replace(/[^A-Za-z]+/g, "").toUpperCase();

	if (document.getElementById("radioPlain").checked){
		var plainText = extendPlain_decipher(key, cText);
		plainText = output(plainText);
		pText.value = plainText.toLowerCase();
	}
	else{
		var plainText = extendCrypt_decipher(key, cText);
		plainText = output(plainText);
		cText.value = plainText;
	}
}

function extendPlain_decipher(key, cText){
	var len = cText.length;
	var current = key;
	var plainMsg = "";

	for (var i = 0; i < len; i++){
		var cryptLet = alpha.indexOf(cText.charAt(i));
		var keyLet = alpha.indexOf(current.charAt(i));
		var total = (cryptLet - keyLet) % 26;
		total = (total < 0) ? total + 26 : total;
		plainMsg += alpha.charAt(total);
		current += alpha.charAt(total);
	}
	return plainMsg;
}

function extendCrypt_decipher(key, cText){

}

/*
	String pText = "the most famous rotor machine was engima";
		String key = "norse";
		String cText = "gvv esla jmagnx rahij dovvzze yha rrciee";
*/

/* Clear Inputs */
function clear_Clicked(){
    document.getElementById("keyword").value = "";
    document.getElementById("pText").value = "";
    document.getElementById("cText").value = "";
}

function output(text){
	var blockText = "";
	for (var i = 0; i < text.length; i++){
		if (i % 5 === 0 && i !== 0)
			blockText += " " + text.charAt(i);
		else
			blockText += text.charAt(i);
	}
	return blockText;
}
