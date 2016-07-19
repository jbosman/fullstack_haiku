/****** WORD OBJECT FACTORY FUNCTION ******/

// CONSTRUCTOR FOR WORD OBJECT

function wordObjFactory( word, proSyl){
	this.word = word;
	this.proSyl = proSyl;
	this.sylCount = this.getNumCountFromString(this.proSyl);
}

// getNumCountFromString
// Accepts a 'string' and returns the number of
// numbers found in that string

wordObjFactory.prototype.getNumCountFromString = function(string) {

	if( /\d/.test(string) )
		return string.match(/\d/g).length;
	else
		return 0;
}

// Prints out readible wordObj crated by factory

wordObjFactory.prototype.printWordObjectContents = function() {
		console.log( "Word: " + this.word );
		console.log( "Syllable Count: " + this.sylCount );
		console.log( "Pronunciation Syllable: " + this.proSyl );
}


module.exports = {
	wordObjFactory: wordObjFactory
};