var AudioViewHelper = function(){

	var AudioViewHelper = {},
	twoPI = 2 * Math.PI;

	AudioViewHelper.init = function(){

		return AudioViewHelper
	}

	AudioViewHelper.drawBase = function( param ){

		var context = param.context;

		context.beginPath();
		context.arc( param.x, param.y, param.size, 0, twoPI, false );
		context.arc( param.x , param.y, param.size - 10, 0 , twoPI, false );
		context.lineWidth   = 1 ;
		context.strokeStyle = "white" ;
		context.stroke();

		context.closePath();

		context.beginPath();
		context.arc( param.x, param.y, param.size + 5, 0, twoPI / 4, false );
		context.lineWidth   = 1 ;
		context.strokeStyle = "grey" ;
		context.stroke();
		context.closePath();

		context.beginPath();
		context.arc( param.x, param.y, param.size + 10, 0, twoPI / 4, false );
		context.lineWidth   = 4 ;
		context.strokeStyle = Global.colors.audioLevel ;
		context.stroke();

		context.closePath();
		

		if( param.state == 0 ){

			context.beginPath();
		    context.moveTo( param.x - 15 + 10, param.y - 7 );
		    context.lineTo( param.x - 15 + 10, param.y + 7 );
		    context.lineTo( param.x + 5, param.y );
		    context.fillStyle = "white";
		    context.fill();

		}else{

		    context.beginPath();
			context.rect( param.x - 2.5 - 4.5, param.y - 7.5, 5, 15 );
			context.rect( param.x - 2.5 + 4.5, param.y - 7.5, 5, 15 );
			context.fillStyle = "white";
			context.fill();
			

		}

	}

	AudioViewHelper.drawPlayhead = function( param ){
		
		param.context.beginPath();
		param.context.arc( param.x, param.y, param.size - 5, 0, twoPI * param.position, false );					
		param.context.lineWidth = 5 ;
		param.context.strokeStyle = "rgb(200,200,200)" ;
		param.context.stroke();
		param.context.closePath();
		// param.context.font = "8px Open Sans";
		// param.context.textAlign = "center";
		// param.context.fillText( param.currentTime + "/" + param.duration, param.x, param.y + 20);

	}

	return AudioViewHelper.init();

}();

/**
*
*	@param {string} param.url
*	@param {HTMLElement} param.parent
*	@param {HTMLElement} param.grandParent
*	@param {int} param.x
*	@param {int} param.y
*	@param {int} param.size
*/
var AudioSegment = function( param ){

	var AudioSegment = {},
	node,
	canvas,
	context,
	url,
	parent,
	grandParent,
	x,
	y,
	size,
	offsetX,
	offsetY,
	ratio,
	position = 0,
	state = 0,
	loaded = false,
	hover = false,
	twoPI = 2 * Math.PI;

	AudioSegment.init = function(){

		this.setUrl( param.url );
		this.setParent( param.parent );
		this.setGrandParent( param.grandParent );
		this.setNode();
		this.setCanvas();
		this.setTotalTime( param.totalTime );
		this.setSize( param.size );
		this.setX( param.x );
		this.setY( param.y );
		
		this.addEventListenrs();
		this.drawBase();

		return AudioSegment;

	}

	AudioSegment.setCanvas = function(){

		canvas = document.createElement( "canvas" );
		canvas.setAttribute( "data-src", url );
		canvas.setAttribute( "width",    parent.offsetWidth );
		canvas.setAttribute( "height",   parent.offsetHeight );

		ratio = parent.offsetWidth/parent.offsetWidth;

		context = canvas.getContext( "2d" );
		context.translate( 0.5, 0.5 );
		
	}

	AudioSegment.getCanvas = function(){

		return canvas;
	}

	AudioSegment.setTotalTime = function( _totalTime ){

		totalTime = _totalTime
	}

	AudioSegment.setX = function( _x ){

		x = _x;	

	}

	AudioSegment.setY = function( _y ){

		y = _y;
		
	}

	AudioSegment.setSize = function( _size ){

		size = _size;

	}

	AudioSegment.setNode = function(){

		var self = this;
		node 	 = new Audio();

		node.addEventListener('canplaythrough', function( event ){

			loaded = true;

		});		

		node.addEventListener( "timeupdate", function(){

			self.drawPlayhead( node.currentTime , node.duration );
			position = node.currentTime / node.duration;


		})

		node.addEventListener('progress', function( event ) {

		    var ranges = [];
		  	for( var i = 0; i < node.buffered.length; i ++){

		    	ranges.push([

		      		node.buffered.start(i),
		      		node.buffered.end(i)

		      	]);

		  	}

		  	for(var i = 0; i < node.buffered.length; i ++)
			{
				
					// self.drawPlayhead();
					// position = ( 100 / node.duration ) *  (ranges[i][1] - ranges[i][0]);

			}
		  	

		});

		node.src = url;

	}

	AudioSegment.setParent = function( _parent ){

		parent = _parent;

	}

	AudioSegment.setGrandParent = function( _grandParent ){

		grandParent = _grandParent;

	}

	AudioSegment.setUrl = function( _url ){

		url = _url;
	}

	AudioSegment.getUrl = function(){

		return url;

	}

	AudioSegment.setOffsetX = function( _offsetX ){

		offsetX = _offsetX;
	}

	AudioSegment.setOffsetY = function( _offsetY ){

		offsetY = _offsetY;
	}

	AudioSegment.play = function(){

		state = 1;
		node.play();

	}

	AudioSegment.pause = function(){

		state = 0;
		node.pause();
		
	}

	AudioSegment.changeState = function(){

		state++;
		state = state % 2;

		if( state == 0 ){

			// alert( "pause" );
			this.pause();		

		}else{

		    this.play();
		    
		}

	}

	AudioSegment.drawBase = function(){

		AudioViewHelper.drawBase({

			context: context,
			x: x,
			y: y,
			size: size,
			state: state

		})

		
	}

	AudioSegment.drawPlayhead = function( currentTime , duration ){

		AudioViewHelper.drawPlayhead({

			context: context,
			x: x,
			y: y,
			size: size,
			currentTime: currentTime,
			duration: duration,
			position: position
			
		})

	}

	AudioSegment.clear = function(){

		context.clearRect( 0, 0, 500, 500 );

	}

	AudioSegment.addEventListenrs = function(){

		var self = this;

		canvas.addEventListener( "click", function( event ){					

			var offsetY = grandParent.offsetTop  + parent.offsetTop,
			offsetX     = grandParent.offsetLeft + parent.offsetLeft,
			mouseX      = event.clientX - offsetX,
			mouseY      = event.clientY - offsetY,
			angle 		= Math.atan2( ( mouseY - y ), ( mouseX - x ) );

			if( angle < 0 ){

				angle = angle + twoPI;

			}

					
			var innerEdgeX = x + ( ( ( size - 10 ) + 1 / 2 ) ) * ratio  * Math.cos( angle ),
			innerEdgeY     = y + ( ( ( size - 10 ) + 1 / 2 ) ) * ratio  * Math.sin( angle ),
			onInnerEdge    = false;


		    if ( angle  <= ( 2 * Math.PI) * 0.25 ) {

		        if ( mouseX > innerEdgeX || mouseY > innerEdgeY ){

		        	onInnerEdge = true;

		        }

		    }else if ( angle <= ( 2 * Math.PI) * 0.5 ) {

		        if ( mouseX < innerEdgeX || mouseY > innerEdgeY){

		        	onInnerEdge = true;

		        }
		            
		    }else if ( angle <= ( 2 * Math.PI) * 0.75 ) {

		        if ( mouseX < innerEdgeX || mouseY < innerEdgeY){
		          
		            onInnerEdge = true;

		        }

		    }else {

		        if ( mouseX > innerEdgeX || mouseY < innerEdgeY){
		         
		            onInnerEdge = true;

		        }

		    }

		    var outerEdgeX = x + ( ( size + 1 / 2 ) ) * ratio * Math.cos( angle ),
		    outerEdgeY     = y + ( ( size + 1 / 2 ) ) * ratio * Math.sin( angle ),
		    onOuterEdge    = true;

		    if ( angle  <= twoPI * 0.25 ) {

		        if ( mouseX > outerEdgeX || mouseY > outerEdgeY ){

		            onOuterEdge = false;

		        }

		    }else if ( angle <= twoPI * 0.5 ) {

		        if ( mouseX < outerEdgeX || mouseY > outerEdgeY ){

		            onOuterEdge = false;

		        }

		    }else if ( angle <= twoPI * 0.75 ) {

		        if ( mouseX < outerEdgeX || mouseY < outerEdgeY ){

		            onOuterEdge = false;

		        }

		    }else {

		        if ( mouseX > outerEdgeX || mouseY < outerEdgeY ){

		            onOuterEdge = true;

		        }
		    }


		    if( onOuterEdge ){

		    	if( loaded ){

		    				    			    	
			    	// self.clear();
					// self.drawBase();

				}

		    }

		    if( onInnerEdge && onOuterEdge ){

				position = angle / twoPI;

				node.currentTime = node.duration * position;

				self.clear();
				self.drawBase();
				self.drawPlayhead( node.currentTime, node.duration );

			}

			if( ( mouseX < x + 10 && mouseX > x - 10 ) && ( mouseY < y + 10 && mouseY > y - 10 ) ) {

				self.changeState();
				self.clear();
				self.drawBase();
				self.drawPlayhead( node.currentTime, node.duration );
	
			}

		});	

	}

	return AudioSegment.init();

}

var AudioPlayer = function(){

	var AudioPlayer = {},
	segments        = {};

	AudioPlayer.init = function(){

		return AudioPlayer;

	}

	AudioPlayer.pauseAll = function(){


		for( var key in segments ){

			segments[ key ].pause();

		}

	}

	AudioPlayer.loadAudio = function( param ){
		
		this.pauseAll();		

		if( segments[ param.url ] == undefined ){

			var audio = new AudioSegment( param );
			segments[ param.url ] = audio;

			return segments[ param.url ];

		}
		
		
		return segments[ param.url ];
		

	}

	return AudioPlayer.init();

}();