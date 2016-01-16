/**
*	CanvasHandler 
*/
var CanvasHandler = function(){

	var CanvasHandler = {};

	CanvasHandler.intPerFrame = 5;

	CanvasHandler.init = function(){

		var lastTime = 0,
		vendors      = [ 'ms', 'moz', 'webkit', 'o' ];

	    for( var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i ){

	        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
	        window.cancelAnimationFrame  = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	    }
	 
	    if ( !window.requestAnimationFrame ){

	        window.requestAnimationFrame = function( callback, element ) {

	            var currTime = new Date().getTime(),
	            timeToCall   = Math.max( 0, 5 - ( currTime - lastTime ) ),
	            id           = window.setTimeout( function(){ 

	            	callback( currTime + timeToCall ); 

	            }, timeToCall );

	            lastTime = currTime + timeToCall;

	            return id;

	        };

	 	}

	    if ( !window.cancelAnimationFrame ){

	        window.cancelAnimationFrame = function( id ){

	            clearTimeout( id );

	        };
	    }

	    return CanvasHandler;

	}

	return CanvasHandler.init();

}();


var mainContainer = View.get( "#mainContainer" ).node,
containerWidth    = mainContainer.clientWidth,
containerHeight   = mainContainer.clientHeight;