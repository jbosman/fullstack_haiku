/****** IMPORTED LIBRARIES ******/
var fs = require("fs");
var wordF = require("./wordObjectFactory.js");
var util = require("./utilityFunctions.js");


/************************************ MAIN STRUCTURE FUNCTION TO CALL ************************************/

// createHaiku
// Accecpts the desired strucure for a haiku and generates a haiku

function createHaiku(structure){
	console.log("this should log a haiku with the structure..." + structure);

	// Grab the word library and syllable count info
	var cmuDictFile = readCmuDictFile();

	// Variables used to help with library info
	var wordObjDict = [];		/* Dictionary object used to store initial word syllable count */
	var word_sylCount = [];		/* Value pair array to access syllable count index = word; value = syllable count */
	var sylCount_word = [];		/* 2D array used to access words via syllable count */

	// Populate our variables to make them useful
	formatData( cmuDictFile, wordObjDict, word_sylCount, sylCount_word);
	var updatedStructure = generateNewStructure(structure);

	// Actuall print the haiku on the randomly generated structure
	for( var line in updatedStructure ) {
		var printline = "";
		for( var wordSylCount in updatedStructure[line] ) {
			printline += gethaikuWordWithSyllableCount( sylCount_word, updatedStructure[line][wordSylCount]) + " ";
		}
		console.log(printline);
	}
}

/************************************ HELPER FUNCTIONS ************************************/

// readCmuDictFile
// Read ths cmudict.text file in via fs.readFileSync
// and returns the object from it

function readCmuDictFile(){
	return fs.readFileSync("./cmudict.txt");
}

// formatData
// Accepts a files content variable (from fs read), an array to hold word objects, 
// and an array that will be populated the words from the file and their syllable count
// in a key value pair.

function formatData( data, wordObjDictRef, arrayRef, twoD_ArrayRef){    
	var lines = data.toString().split("\n"),
		lineSplit

	// Iterate over each line in data and store desired contents
	lines.forEach(function(line){ 

		// lineSplit[0] = word
		// lineSplit[1] = pronunciation format   
    	lineSplit = line.split("  ");    
    	// for debug only -- console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]); 

    	// Populate passed in structures
    	var currentWordObj = new wordF.wordObjFactory( lineSplit[0], lineSplit[1]);
    	wordObjDictRef.push(currentWordObj);

    	arrayRef[lineSplit[0]] = currentWordObj.sylCount;

    	util.addTo2DArray( twoD_ArrayRef, currentWordObj.sylCount, lineSplit[0]);
	});
}

// generateNewStructure
// Returns a random structure with an array that sums to the orignal structure array value

function generateNewStructure( structure ){
	// Update the new structure 
	var updatedStructure = structure.map( function( currentVal, index){
		var newArray = [];
		var currentSum = 0;

		while( currentSum != currentVal ) {
			newArray.push( Math.floor( Math.random() * (currentVal - currentSum) ) + 1 );
			currentSum = newArray.reduce( function(a,b){return a + b;} );
		}

		return newArray;
	});

	return updatedStructure;
}

// gethaikuWordWithSyllableCount
// Returns a random work the number of syllables provided with syllableNum from twoD_ArrayRef

function gethaikuWordWithSyllableCount( twoD_ArrayRef, syllableNum) {
	return twoD_ArrayRef[syllableNum][Math.floor(Math.random() * twoD_ArrayRef[syllableNum].length ) + 1];
}

/****** EXPORTING FUNCTIONS ******/

module.exports = {
	createHaiku: createHaiku
};


