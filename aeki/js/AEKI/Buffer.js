/**
*	Buffer Class is reponsible for caching currently and previously selected Space, Box, and Inputs.
*/
var Buffer = function(){

	var Buffer = {},
	currentAsset,
	currentInput,
	currentBox,
	currentFolder,
	previousBox,
	boxToRearrange,
	currentSpace,
	previousSpace,
	tempCurrentSpace,
	tempPreviousSpace,
	currentSelectedType,
	saveIndicators,
	shiftOn = false;

	/**
	*	Buffer
	*	@constructs
	*/
	Buffer.init = function(){

		Buffer.setSaveIndicators( View.initSaveIndicators() );

		return Buffer;
	}

	/**
	*	@param {string} _currentAsset - An URL of currently selected asset.
	*/
	Buffer.setCurrentAsset = function( _currentAsset ){

		currentAsset = _currentAsset;

	}

	/**
	*	@return {string} currentAsset
	*/
	Buffer.getCurrentAsset = function(){

		return currentAsset;
		
	}

	/**
	*	@param {HTMLElement} _currentInput - A dom element of currently focused input.
	*/
	Buffer.setCurrentInput = function( _currentInput ){

		currentInput = _currentInput;

	}

	/**
	*	@return {HTMLElement} currentInput
	*/
	Buffer.getCurrentInput = function(){

		return currentInput;
		
	}

	/**
	*	@param {Folder} _currentFolder
	*/
	Buffer.setCurrentFolder = function( _currentFolder ){

		currentFolder = _currentFolder

	}

	/**
	*	@return {Folder} currentFolder
	*/
	Buffer.getCurrentFolder = function(){

		return currentFolder;
		
	}

	/**
	*	@param {Box} _currentBox
	*/
	Buffer.setCurrentBox = function( _currentBox ){

		if( !shiftOn ){

			if( currentBox != null ){

				previousBox = currentBox;
				previousBox.dehighlight();
			}

			currentBox = _currentBox;

			if( currentBox != null ){

				currentBox.highlight();
				
			}
			

		}else{

			/** When shift key is pressed. */

		}

	}

	/**
	*	@return {Box} currentBox
	*/
	Buffer.getCurrentBox = function(){

		return currentBox;
		
	}

	/**
	*	@param {Space} _currentSpace
	*/
	Buffer.setCurrentSpace = function( _currentSpace ){

		if( currentSpace != null ){

			previousSpace = currentSpace;

			if( previousSpace.getIndex() % 2 == 0 ){

				previousSpace.setBackground( Global.colors.cellOddNumbered );

			}else{

				previousSpace.setBackground( Global.colors.cellEvenNumbered );

			}

		}

		currentSpace = _currentSpace;
		currentSpace.setBackground( Global.colors.spaceHighlight );

	}

	/**
	*	@return {Space} currentSpace
	*/
	Buffer.getCurrentSpace = function(){

		return currentSpace;

	}

	/**
	*	@param {Space} _tempCurrentSpace
	*/
	Buffer.setTempCurrentSpace = function( _tempCurrentSpace ){

		if( tempCurrentSpace != null ){

			tempPreviousSpace = tempCurrentSpace;

		}

		tempCurrentSpace = _tempCurrentSpace;


	}

	/**
	*	@return {Space} tempCurrentSpace
	*/
	Buffer.getTempCurrentSpace = function(){

		return tempCurrentSpace;

	}

	Buffer.getSaveIndicators = function(){

		return saveIndicators;

	}

	Buffer.setSaveIndicators = function( _saveIndicators ){

		saveIndicators = _saveIndicators;
		
	}

	/**
	*	Change background color, dehiglight, of Space node.
	*/
	Buffer.dehighlightSpace = function(){

		if( previousSpace != null ){

			if( previousSpace.getIndex() % 2 == 0 ){

				previousSpace.setBackground( Global.colors.cellOddNumbered );

			}else{

				previousSpace.setBackground( Global.colors.cellEvenNumbered );

			}

		}

		if( currentSpace.getIndex() % 2 == 0 ){

			currentSpace.setBackground( Global.colors.cellOddNumbered );

		}else{

			currentSpace.setBackground( Global.colors.cellEvenNumbered );

		}

	}

	/**
	*	Check if currently selected Space object is reselected.
	*	@return {boolean} 
	*/
	Buffer.isItSameSpace = function(){

		return ( tempCurrentSpace == tempPreviousSpace );

	}

	/**
	*	Sets currently selected Box to be rearranged, {Box} boxToRearrange
	*/
	Buffer.setBoxToRearrange = function(){

		boxToRearrange = currentBox;

	}

	/**
	*	@return {Box} boxToRearrange
	*/
	Buffer.getBoxToRearrange = function(){

		return boxToRearrange;

	}

	/**
	*	Set {Box} boxToRearrange to null
	*/
	Buffer.resetBoxToRearrange = function(){

		boxToRearrange = null;

	}

	/**
	*	Not implemented yet.
	*/
	Buffer.setShiftOn = function( _shiftOn){

		shiftOn = _shiftOn;

	}

	/**
	*	Not implemented yet.
	*/
	Buffer.getShiftOn = function(){

		return shiftOn;
	}

	return Buffer.init();

}();