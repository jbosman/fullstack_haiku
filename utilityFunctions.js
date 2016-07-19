
function addTo2DArray( TwoD_Array, index, value ) {
	// If current array position hasn't been initialized to array make it so
	if( !Array.isArray(TwoD_Array[index]) )
		TwoD_Array[index] = [];

	// Then add the value in
	TwoD_Array[index].push(value);
}

module.exports = {
	addTo2DArray: addTo2DArray
}