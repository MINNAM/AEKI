var AEKI = function(){

	var AEKI = {},
	spaces;

	AEKI.onLoad = null;

	AEKI.getSpaces = function(){

		return spaces;

	}

	AEKI.init = function(){

		try{
			
				var  width = window.screen.availWidth - (window.outerWidth - window.innerWidth),
				height     = window.screen.availHeight - (window.outerHeight - window.innerHeight),
				ratio 	   = width/height,
				x          = width / 100,
				y          = height / 64,
				yy         = height / 100;

				
				spaces = document.getElementsByTagName( "article" );

				for( var i = 0; i < spaces.length; i++ ){

					var row = spaces[ i ].getAttribute("data-row");


					spaces[ i ].style.height = y * ( row );
					spaces[ i ].style.width  = width + "px";
					// spaces[ i ].style.overflow = "hidden";
					// spaces[ i ].style.position = "relative";
					// spaces[ i ].style.display = "inline-block";
					spaces[ i ].style.margin = "auto";

					

					var boxes = spaces[ i ].getElementsByTagName( "section" ); 

					for( var j = 0, maxx = boxes.length; j < maxx; j++  ){

						var boxRow = boxes[ j ].getAttribute( "data-row"),
						boxCol 	   = boxes[ j ].getAttribute( "data-col"),
						boxWidth   = boxes[ j ].getAttribute( "data-width"),
						boxHeight  = boxes[ j ].getAttribute( "data-height");

						boxes[ j ].style.position   = "absolute";			

						
						boxes[ j ].style.marginTop  = ( (boxRow - 1 ) * y  ) + "px"
						boxes[ j ].style.marginLeft = ( ( boxCol ) * x) + "px";
						boxes[ j ].style.width 		= (boxWidth * x ) + "px";
						boxes[ j ].style.height 	= (boxHeight * y ) + "px";

					}

				
				
			}

			// window.addEventListener( "resize", function(){
				
			// 	var sizeRatio = 2,
			// 	width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
			// 	height = (window.innerHeight > 0) ? window.innerHeight : screen.height,
			// 	ratio = width/height,
			// 	x     = width / 100,
			// 	y     = height / 64	,
			// 	yy    = height / 64 ;

				
			// 	var spaces = document.getElementsByTagName( "article" );

			// 	for( var i = 0; i < spaces.length; i++ ){

			// 		var row = spaces[ i ].getAttribute("data-row");


			// 		spaces[ i ].style.height = y * ( row );
			// 		spaces[ i ].style.width  = width + "px";
			// 		spaces[ i ].style.overflow = "hidden";
			// 		spaces[ i ].style.position = "relative";
			// 		spaces[ i ].style.display = "inline-block";
			// 		spaces[ i ].style.margin = "0px auto";

					

			// 		var boxes = spaces[ i ].getElementsByTagName( "section" ); 

			// 		for( var j = 0, maxx = boxes.length; j < maxx; j++  ){

			// 			var boxRow = boxes[ j ].getAttribute( "data-row"),
			// 			boxCol 	   = boxes[ j ].getAttribute( "data-col"),
			// 			boxWidth   = boxes[ j ].getAttribute( "data-width"),
			// 			boxHeight  = boxes[ j ].getAttribute( "data-height");

			// 			// boxes[ j ].style.position   = "absolute";			

						
			// 			boxes[ j ].style.marginTop  = ( (boxRow - 1 ) * x ) + "px"
			// 			boxes[ j ].style.marginLeft = ( ( boxCol ) * x ) + "px";
			// 			boxes[ j ].style.width 		= (boxWidth * x ) + "px";
			// 			boxes[ j ].style.height 	= (boxHeight * x) + "px";

			// 		}

			// 	}

			// })

			if( AEKI.onLoad != null ){

				AEKI.onLoad();

			}


		} catch( e ){
			
		}

		return AEKI;

	}

	AEKI.scrollTo = function( index ){

		var id, increment = 1;

		var downward = function(){

			id = window.requestAnimationFrame( downward );

			if( document.body.scrollTop < spaces[ index ].offsetTop ){

				document.body.scrollTop += increment;
				increment++;


			}else{

				window.cancelAnimationFrame( id ); 	
				increment = 1;

			}

		},
		upward = function(){

			id = window.requestAnimationFrame( upward );

			if( document.body.scrollTop > spaces[ index ].offsetTop ){

				document.body.scrollTop -= increment;
				increment = 1;

			}else{

				window.cancelAnimationFrame( id ); 	
				increment = 1;			
			}			

		};


		if( document.body.scrollTop < spaces[ index ].offsetTop ){
			
			id = window.requestAnimationFrame( downward );			

		}else{

			id = window.requestAnimationFrame( upward );
		}

	}

	AEKI.CanvasHandler = function(){

		var CanvasHandler = {};

		CanvasHandler.intPerFrame = 50;

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

		CanvasHandler.getCanvas = function( boxId ){

			var box 	  = document.getElementById( boxId ),
			canvas  	  = box.getElementsByTagName( "canvas" )[ 0 ],
			context 	  = canvas.getContext( "2d" );
			canvas.width  = box.offsetWidth;
			canvas.height = box.offsetHeight;

			return { canvas: canvas, context: context, container: box };

		}


		return CanvasHandler.init();

	}();


	return AEKI.init();

}();