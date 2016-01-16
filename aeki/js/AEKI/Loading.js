/**
*	Loading class is responsible for handling loading bar at the bottom of the application.
*/
var Loading = function(){

	var Loading     = {},
	node            = document.getElementById( "loading" ),
	progressNode    = document.getElementById( "progress" ),
	initialPosition = -200,
	nextPosition    = -40;
	increment       = 0.2;

	/**
	*	Loading
	*	@constructs
	*/
	Loading.init = function(){

		node.style.marginBottom = initialPosition + "px";

		return Loading;

	}

	Loading.position = nextPosition;
	Loading.animateShow = function( ){

		if( Loading.position <= 0){

			node.style.marginBottom = Loading.position + "px";
			Loading.position += increment;

		}else{
								
			clearInterval( Loading.showInteval );
			Loading.showInteval = null;
		}

	}

	Loading.animateHide = function( ){

		if( Loading.position >= nextPosition ){

			node.style.marginBottom = Loading.position + "px";
			Loading.position -= increment;

		}else{

			clearInterval( Loading.showHideInterval );
			Loading.showHideInterval = null;
		}

	}

	Loading.showInteval;
	Loading.show = function(){

		if( Loading.showHideInterval ){

			clearInterval( Loading.showHideInterval );

		}

		Loading.showInteval = setInterval( Loading.animateShow , 1 );

	}

	Loading.showHideInterval;
	Loading.hide = function(){

		if( Loading.showInteval ){

			clearInterval( Loading.showInteval );

		}

		Loading.showHideInterval = setInterval( Loading.animateHide , 1 );

		Loading.setProgress( 0 );

	}

	Loading.setProgress = function( progress ){

		progressNode.style.width = progress + "%";

	}

	return Loading.init();

}();