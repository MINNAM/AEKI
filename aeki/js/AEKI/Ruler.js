

/**
*	RulerCell class is a visual segment for Ruler Class. By clicking on one of them leaves a mark 
*	which gives a guideline when creating a Box object.
*/
var RulerCell = function( param ){

	var RulerCell = {},
	index,
	context,
	x,
	y,
	accent,
	clickedCount = 1,
	ratio = ( Global.mainContainer.width / 100 );

	/**
	*	RulerCell
	*	@constructs
	*/
	RulerCell.init = function(){

		index   = param.index;
		context = param.context;
		x 		= param.x;
		y		= param.y;
		accent	= param.accent;

		if( param.clickedCount ){

			clickedCount = param.clickedCount;

		}else{

			clickedCount = 1;

		}

		return RulerCell;

	}

	/**
	*	@return {int} index
	*/
	RulerCell.getIndex = function(){

		return index;

	}

	/**
	*	@return {int} clickedCount
	*/
	RulerCell.getClickedCount = function(){

		return clickedCount;

	}

	/**
	*	Increment clicked count.
	*/
	RulerCell.incrementClick = function(){

		clickedCount = clickedCount % 2;
		clickedCount++;

	}

	/**
	*	Draw individual Cell with accent which indicates the cell's position.
	*/
	RulerCell.drawCell = function(){
		
		context.beginPath();
		context.moveTo( x, y + 3);
		context.lineTo( x + ratio, y + 3);
    	context.strokeStyle = "rgba(40,40,40, " + accent + " )";			    
	    context.lineWidth   = 6;
	    context.stroke();

	    if( clickedCount % 2 == 0 ){

	    	RulerCell.mark();

	    }

	}

	/**
	*	Draw mark on the Cell.
	*/
	RulerCell.mark = function(){
		
		context.beginPath();
		context.moveTo( x + 2, y + 7 );
	    context.lineTo( x + ratio / 2, y + ratio );
	    context.lineTo( x - 2 + ratio, y + 7 );
	    context.fillStyle = "rgb(90, 197, 158)";			    
	    context.fill();

	}

	/**
	*	Parse Cells data to xml definition.
	*/
	RulerCell.toXml = function(){

		return "<rulerCell>" + "<index>" + index + "</index>" + "</rulerCell>";

	}

	return RulerCell.init();

}

/**
*	Ruler class is a container class for RulerCell which gives a guideline when creating a Box object.
*/
var Ruler = function(){

	var Ruler   = {},
	parentNode  = View.get( "#subMenu" ),
	canvas, 
	context,
	cells       = [],
	markedCells = [],
	offsetX;

	/**
	*	Ruler
	*	@construct
	*/
	Ruler.init = function(){

		Ruler.setCanvas();
		Ruler.createCells();
		Ruler.addEventHandlers();

		offsetX = parentNode.get( "offsetLeft" );

		return Ruler;
	}

	/**
	*	Initialize canvas
	*/
	Ruler.setCanvas = function(){

		canvas = View.createElement({ type: "canvas" });
		canvas.set({ 

			width: Global.mainContainer.width,
			height: parentNode.get( "clientHeight" )

		});		

		context = canvas.node.getContext('2d');

		parentNode.appendChild( canvas );

	}

	/**
	*	Add event handlers for the node of Ruler object.
	*/
	Ruler.addEventHandlers = function(){

		parentNode.addEventListener( "click", function( event ){			

			var mouseX = parseInt( ( event.clientX - offsetX ) / Global.mainContainer.width * 100 );

			cells[ mouseX ].incrementClick();

			Ruler.updateCells();

		});

	}

	/**
	*	@return {Cell}
	*/
	Ruler.getCell = function( index ){

		return cells[ index ];

	}

	/**
	*	@return {Array.<Cell>} cells
	*/
	Ruler.getCells = function(){

		return cells;
	}

	/**
	*	@return {Array.<Cell>} markedCells
	*/
	Ruler.getMarkedCells = function(){

		return markedCells;
		
	}

	/**
	*	Update the canvas of Ruler object.
	*/
	Ruler.updateCells = function(){

		context.clearRect( 0, 0, Global.mainContainer.width, 50 );

		markedCells = [];
		
		cells.forEach( function( element ){

			element.drawCell();

			if( element.getClickedCount() == 2 ){

				markedCells.push( element.getIndex() );

			}

		});

	}

	Ruler.createCells = function(){

		var ratio = ( Global.mainContainer.width / 100 );

		for( var i = 0; i < Global.preference.column; i++ ){

			var cell;

			if( i  == 50 ){

				cell = new RulerCell({

					index:   i,
					context: context,
					x:       i * ratio ,
					y:       0,
					accent:    0.6

				});

			}else if( i % 10 == 0 ){

				cell = new RulerCell({

					index:   i,
					context: context,
					x:       i * ratio ,
					y:       0,
					accent:    0.4

				});

			}else if( i % 5 == 0 ){

				cell = new RulerCell({

					index:   i,
					context: context,
					x:       i * ratio ,
					y:       0,
					accent:    0.4

				});

			}else{

				cell = new RulerCell({

					index:   i,
					context: context,
					x:       i * ratio ,
					y:       0,
					accent:    0.3

				});

			}			

			cell.drawCell();
			cells.push( cell );

		}
		
	}

	/**
	*	Parse Ruler's data to xml definition.
	*/
	Ruler.toXml = function(){

		var xml = "<ruler>";

		cells.forEach( function( element ){

			if( element.getClickedCount() == 2 ){

				xml += element.toXml();

			}			

		});

		xml += "</ruler>";

		return xml;
		
	}

	return Ruler.init();

}();