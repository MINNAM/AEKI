var Focus = function(){

	var Focus = {},
	office = 0,
	space = 0,
	box = 0,
	currentAt = 0;

	/**Static Variable*/
	Focus.focusType = [ "office", "space", "box" ];

	/**
	*	Focus
	*	@constructs
	*/
	Focus.init = function(){
		
		this.setCurrentAt( 0 );

		return Focus;

	}
	

	Focus.getOffice = function(){

		return office;

	}

	Focus.setOffice = function( _office ){

		office = _office;

	}

	Focus.getSpace = function(){
		return space;
	}

	Focus.setSpace = function( _space ){

		space = parseInt( _space );
		
	}

	Focus.getBox = function(){

		return box;

	}

	Focus.setBox = function( _box ){

		box = parseInt( _box );

	}

	Focus.getCurrentAt = function(){

		return currentAt;

	}

	Focus.setCurrentAt = function( index ){

		currentAt = Focus.focusType[ index ];

	}

	return Focus.init();

}();

