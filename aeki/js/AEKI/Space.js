/**
*	Space class is resposible for containing a Box and Cell objects.
*	In a built project, Space is a div container that contains Box nodes.
*
*	@param {int} param.row - Start index of Cell objects to create Box.
*	@param {int} param.index - Width of Box
*	@param {int} param.at - Height of Box
*	@param {string} param.type - Box Id
*/
var Space = function( param ){

	var Space = {},
	row,
	index,	
	at,
	type,
	boxes,
	cells,
	style,
	attributes,
	node,
	canvas,
	context,
	offsetX,
	offsetY,
	width,
	rearrange,
	ratio;

	/**
	*	Space
	*	@constructs
	*/
	Space.init = function(){	

		this.setIndex( param.index );
		this.setRow( param.row );
		this.setType( param.type );
		this.setBoxes();			
		this.setStyle();
		this.setAt( param.at );

		if( param.type == "copy"){

			return Space;
			
		}else{

			this.setNode();
			this.setCells();
			this.addEventListeners();
			
		}		
		
		return Space;
		
	}

	/**
	*	Getter for index.
	*	@returns {int}
	*/
	Space.getIndex = function(){

		return index;

	}

	/**
	*	Setter for index.
	*	@param {int} _index - Index for Space object.
	*/
	Space.setIndex = function( _index ){

		index = _index;

	}

	/**
	*	Getter for row.
	*	@returns {int}
	*/
	Space.getRow = function(){

		return row;

	}

	/**
	*	Setter for row.
	*	@param {int} _row - A number of row that Space object contains.
	*/
	Space.setRow = function( _row ){

		row = _row;

	}

	Space.getContext = function(){

		return context;

	}


	/**
	*	Getter for type.
	*	@returns {string}
	*/
	Space.getType = function(){

		return type;

	}

	/**
	*	Setter for type.
	*	@param {string} _index - Type of a Space object. It can be "default" or "guide".
	*/
	Space.setType = function( _type ){

		if( _type === undefined ){

			type = "default";

		}else{

			type = _type;

		}
		
	}

	/**
	*	Getter for boxes.
	*	@returns {Array.<Box>}
	*/
	Space.getBoxes = function(){

		return boxes;

	}

	/**
	*	Setter for boxes.
	*	@param {Array.<Box>} _boxes - Array of Box objects.
	*/
	Space.setBoxes = function( _boxes ){

		if( _boxes === undefined || _boxes === null ){

			boxes = [];

		}else{

			boxes = _boxes;

		}

	}

	/**
	*	@param {integer} _at - An index of whole Spaces.
	*/
	Space.setAt = function( _at ){

		at = _at;

	}

	/**
	*	@param {string} _background - A color code for the Space's background color.
	*/
	Space.setBackground = function( _background ){

		node.style({ background: _background });

	}

	/**
	*	Updates space background colors.
	*/
	Space.updateSpace = function(){

		/** Index for cells array */
		var _index = 0;

		for( var i = 0; i < Global.preference.column; i++ ){

			for( var j = 0; j < row; j++ ){
				
				if( cells[ _index ] !== undefined ){

					var cellNode = cells[ _index++ ].getNode();								
					this.getNode().appendChild( cellNode );

				}else{

					var cell; 

					if( this.getIndex() % 2 == 0 ){

						cell = new Cell({ 

							index: _index,
							parent: this, 
							background: Global.colors.cellOddNumbered

						});

					}else{

						cell = new Cell({ 

							index: _index,
							parent: this, 
							background: Global.colors.cellEvenNumbered

						});
						
					}					
					 			
					this.addCell( cell );

					var cellNode = cells[ _index++ ].getNode();								
					node.appendChild( cellNode );

				}

			}

		}

	}

	/**
	*	Getter for node.
	*	@returns {HTMLElement}
	*/
	Space.getNode = function(){

		return node;

	}

	/**
	*	Create node.
	*	@param {int} at - If defined, Space will be inserted to given position. 
	*/
	Space.setNode = function(){

		var background = "";		

		if( index % 2 == 0 ){

			background = Global.colors.cellOddNumbered;

		}else{

			background = Global.colors.cellEvenNumbered;

		}

		ratio = ( containerWidth / 100 ) * row ;

		node = View.createElement({ type: "div" });	
		node.set({

			class: "space",
			"data-index": index, 
			width: containerWidth,
			height: ratio

		});
		
		node.style({

			height: ratio + "px",
			background: background

		});	
		
		canvas = View.createElement({ type: "canvas", parent: node });
		canvas.set({

			class:  "canvasContainer",
			width:  containerWidth,
			height: ratio

		});
		
		canvas.style({ height: ratio + "px" });

		context = canvas.node.getContext('2d');				
		offsetX = node.get( "offsetLeft" );
		offsetY = node.get( "offsetTop" );
		
		if( at !== undefined && at !== ""){

			if( at - 1 < 0 ){

				Global.mainContainer.node.insertBefore( node, Global.mainContainer.node.child()[ 0 ] );

			}else{

				Global.mainContainer.node.insertBefore( node, Global.mainContainer.node.child()[ at ] );

			}

		}else{

			Global.mainContainer.node.appendChild( node );

		}		
		
		return this;

	}

	/**
	*	Getter for cells.
	*	@returns {Array.<Cell>} 
	*/
	Space.getCells = function(){

		return cells;

	}

	/**
	*	Set and draw cells.
	*	@param {Array.<Cell>} _cells - Array of Cell objects.
	*/
	Space.setCells = function( _cells ){

		if( _cells === undefined || _cells === null ){

			cells = [];

		}else{

			cells = _cells;

		}

		ratioRow = ratio / row,
		cIndex   = 0; /** Index for Cell object */		
		
		for( var i = 0; i < row; i++ ){

			for( var j = 0; j < 100; j++){

				cells[ cIndex ] = new Cell({

					index:      cIndex,
					context:    context,
					background: "",
					x: 			ratioRow * j,
					y: 			i * ratioRow,
					size: 		ratioRow

				});				

				cIndex++;

			}

		}

	}

	/** 
	*	Adds blank cells to Space object 
	*	@param {Cell} _cell - A Cell object to add.
	*/
	Space.addCell = function( _cell ){

		cells.push( _cell );

	}

	/**
	*	Clear canvas and update Cell objects.
	*/
	Space.updateCells = function(){

		context.clearRect( 0,0, containerWidth, row * ratio );
		
		this.getCells().forEach( function( element ){

			element.drawCell();

		});
	
	}

	/**
	*	Getter for Style.
	*	@returns {Style} 
	*/
	Space.getStyle = function(){

		return style;

	}

	/**
	*	Setter for Style.
	*	@returns {Style} 
	*/
	Space.setStyle = function( _style ){

		if(_style === undefined || _style === null){


		}else{

			style = _style;

		}

	}

	/**
	*	Getter for attributes.
	*	@returns {Object.<string, string>}
	*/
	Space.getAttribute = function(){

		return attributes;

	}

	/**
	*	Setter for attributes.
	*	@returns {Object.<string, string>}
	*/
	Space.setAttribute = function( spaceId, spaceClass ){

		attributes = {

			spaceId: spaceId,
			spaceClass: spaceClass

		}

	}

	/**
	*	Return an array of all Box Ids.
	*	@returns {Array.<string>}
	*/
	Space.getBoxIds = function(){

		var boxIds = [];

		boxes.forEach( function( element ){

			boxIds.push( element.getAttribute().boxId );

		});

		return boxIds;
	}
	
	/**
	*	Add Box object to boxes.
	*/
	Space.addBox = function( _box ){

		boxes.push( _box );

	}

	/**
	*	Update Space node's offset X and Y.
	*/
	Space.updateOffset = function(){

		offsetX = node.get( "offsetLeft" );
		offsetY = node.get( "offsetTop" ) - window.pageYOffset;

	}

	/** A flag indicating if the Space node has been clicked. */
	Space.clicked 		   = false;
	/** A counter for clicks. */
	Space.clickedIndex 	   = 0;
	/** An index of cell that has been clicked first. */
	Space.from 			   = 0;
	/** An index of cell that has been clicked second. */
	Space.to 			   = 0;
	/** A x,y coordinate of clicked Cell. */
	Space.clickedPosition  = { x: 0, y: 0 };
	/** A flag indicating if a clicked cell has been reserved for a Box. */
	Space.cellReserved     = false;

	/**
	*	A callback function for click event listener.
	*/
	Space.getDefaultClickEvent = function( event ){		

		if( Space.cellReserved && Space.clickedIndex == 1 ){

				self.clickedIndex = 0;
				self.cellReserved = false;
				self.clicked 	  = false;

		}else if( Space.clickedIndex == 1 ){

			Space.cellReserved = false;

			var boxHeight = parseInt( ( Space.to - Space.from ) / 100 ), 
    		boxWidth	  = ( Space.to % 100 ) - ( Space.from  % 100 ),
			tempCell      = null,
			cellIndex	  = 0,
			tempBox;

				tempBox = new Box({

					index: 		boxes.length,
					space: 		Space,
					startIndex: 0,	/** Will be set in the later part of the code */
					width: 		Math.abs( boxWidth )  + 1,
					height: 	Math.abs( boxHeight ) + 1,
					type: 		"default"

				});

				tempBox.setAttribute({ 

					boxId:    "box" + tempBox.getIndex(),
					boxClass: "",
					boxTag :  ""

				});
									
			/**
			*
			*	   |
			*  ____|____
			*	   | 
			*      |  x
			*/
			if( boxHeight  >= 0 && boxWidth >= 0 ){

				var cellIndex = 0;

				tempBox.setStartIndex( Space.from );

				for( var i = 0; i <= boxHeight; i++ ){

					for( var j = Space.from, max = Space.from + boxWidth; j <= max; j++ ){
						
						cellIndex = j + ( i * 100 );

						if( cells[ cellIndex ].getReserved() ){
							
							Space.cellReserved = true;

						}

						tempCell = cells[ j + ( i * 100 ) ];

						tempBox.addCell( tempCell );

					}

				}

			/**
			*
			*	   |
			*  ____|____
			*	   | 
			*   x  |  
			*/
			}else if( boxHeight  >= 0 && boxWidth <= 0 ){

				var cellIndex = 0;
				
				for( var i = 0; i <= boxHeight; i++ ){						

					for( var j = Space.from, max = Space.from + boxWidth; j >= max; j-- ){
						
						cellIndex = j + ( i * 100 );

						if( i == 0 && j == max){

							tempBox.setStartIndex( cellIndex );
							
						}
						
						if( cells[ cellIndex ].getReserved() ){
							
							Space.cellReserved = true;

						}

						tempCell = cells[ cellIndex ];							
						tempBox.addCell( tempCell );

					}

				}
			
			/**
			*
			*	   |  x
			*  ____|____
			*	   | 
			*      |  
			*/	
			}else if( boxHeight  <= 0 && boxWidth >= 0  ){

				var cellIndex = 0;

				for( var i = 0; i >= boxHeight; i-- ){

					for( var j = Space.from, max = Space.from + boxWidth; j <= max; j++ ){
						
						cellIndex = j + ( i * 100 );

						if( i == boxHeight && j == Space.from ){

							tempBox.setStartIndex( cellIndex );

						}

						if( cells[ cellIndex ].getReserved() ){
							
							Space.cellReserved = true;

						}

						tempCell = cells[ cellIndex ];							
						tempBox.addCell( tempCell );

					}

				}

			/**
			*
			*	x  |  
			*  ____|____
			*	   | 
			*      |  
			*/	
			}else if( boxHeight <= 0 && boxWidth <= 0){

				var cellIndex = 0;

				tempBox.setStartIndex( Space.to );

				for( var i = 0; i >= boxHeight; i-- ){

					for( var j = Space.from, max = Space.from + boxWidth; j >= max; j-- ){
						
						cellIndex = j + ( i * 100 );

						if( cells[ cellIndex ].getReserved() ){
							
							Space.cellReserved = true;

						}

						tempCell = cells[ cellIndex ];							
						tempBox.addCell( tempCell );

					}

				}

			}

			/* Rearranging box */
			if( !Space.cellReserved && Buffer.getBoxToRearrange() ){									

				var boxToRearrange = Buffer.getBoxToRearrange();

				boxToRearrange.setSpace( tempBox.getSpace() );
				boxToRearrange.setWidth( tempBox.getWidth() );
				boxToRearrange.setHeight( tempBox.getHeight() );
				boxToRearrange.setStartIndex( tempBox.getStartIndex() );
				boxToRearrange.deleteCells();

				tempBox.getCells().forEach( function( element ){

					boxToRearrange.addCell( element )

				})

				Buffer.resetBoxToRearrange();
				boxToRearrange.drawCells();

				Buffer.setCurrentBox( boxToRearrange );

				Controller.updateBibleList({

					index: boxToRearrange.getIndex(),
					type: "box",
					parentIndex: boxToRearrange.getSpaceIndex()

				});

				Controller.updateBoxView({

					boxIndex: boxToRearrange.getIndex(),
					spaceIndex: boxToRearrange.getSpaceIndex()

				});	

				StyleSelector.setCurrentStyleParent( "#" + Space.getAttribute().spaceId );										
				StyleSelector.updateStyleSelector( "box", boxToRearrange );


								
			}else{

				if( !Space.cellReserved ){

					boxes.push( tempBox );	
					tempBox.drawCells();

					Buffer.setCurrentBox( tempBox );

					Controller.updateBibleList({

						index: tempBox.getIndex(),
						type: "box",
						parentIndex: tempBox.getSpaceIndex()

					});

					Controller.updateBoxView({

						boxIndex: tempBox.getIndex(),
						spaceIndex: tempBox.getSpaceIndex()

					});	

					StyleSelector.setCurrentStyleParent( "#" + Space.getAttribute().spaceId );										
					StyleSelector.updateStyleSelector( "box", tempBox );

				}
				

			}							
			
			/* Reseting clicked index after box is created or rearranged. */
			Space.clicked      = false;
			Space.clickedIndex = 0;
			Space.updateCells();				

		}else{				

			Buffer.setTempCurrentSpace( Space );

			var mouseX    = parseInt( ( event.clientX - offsetX ) / containerWidth * 100 ),
	    		mouseY    = parseInt( ( event.clientY - offsetY ) / containerWidth * 100 ),
	    		cellIndex = mouseX + ( mouseY * 100 );

	    	Space.from = mouseX + ( mouseY * 100 );	

	    	/* Select box */
	    	

				if( Space.getCells()[ cellIndex ].getReserved()  ){

					var box = cells[ cellIndex ].getBox();

					Buffer.setCurrentBox( cells[ cellIndex ].getBox() );
					
					Controller.updateBibleList({

						index: box.getIndex(),
						type: "box",
						parentIndex: box.getSpaceIndex()

					});

					Controller.updateBoxView({

						boxIndex: box.getIndex(),
						spaceIndex: box.getSpaceIndex()

					});	

					StyleSelector.setCurrentStyleParent( "#" + Space.getAttribute().spaceId );										
					StyleSelector.updateStyleSelector( "box", box );

				}else{    				

					/* If clicked cell is not reserved for a box, starting creating one. */
		    		Space.clickedPosition.x = ( event.clientX - offsetX );
		    		Space.clickedPosition.y = ( event.clientY - offsetY );

		    		cells[ mouseX + ( mouseY * 100 ) ].highlight();
		    		Space.clicked = true;		    		

		    		Space.clickedIndex = 1;

				}

			

		}

	}

	/**
	*	A callback function for mouseover event listener.
	*/
	Space.getHoverEvent = function( event ){			

		Buffer.setTempCurrentSpace( Space );
		// Space.updateOffset();

		if( Buffer.isItSameSpace() ){

			var mouseX = parseInt( ( event.clientX - offsetX ) / containerWidth * 100 ),
	    		mouseY = parseInt( ( event.clientY - offsetY ) / containerWidth * 100 ),
	    		cell; /** For holding indexed Cell obejct */

	    	/** If clicked Cell is reserved for a Box */
			if( Space.clicked ){

				Space.updateCells();				
	    		Space.to = mouseX + ( mouseY * 100 );

	    		var boxHeight = parseInt( ( Space.to - Space.from ) / 100 ), 
	    		boxWidth	  = ( Space.to % 100 ) - ( Space.from  % 100 );
	    		
	    		/**
    			*
    			*	   |
    			*  ____|____
    			*	   | 
    			*      |  x
    			*/
				if( boxHeight  >= 0 && boxWidth >= 0 ){

					for( var i = 0; i <= boxHeight; i++ ){

						for( var j = Space.from, max = Space.from + boxWidth; j <= max; j++ ){
							
							cell = cells[ j + ( i * 100 ) ];
						
							if( cell.getReserved() ){
								
								cell.error();
								Space.cellReserved = true;

							}else if( cell.getRearrange() ){

								cell.allowed();
								
							}else if( Ruler.getMarkedCells().indexOf( j % 100 ) > -1 ){

								cell.drawGuide();
								
							}else{
								
								cell.highlight();
								Space.cellReserved = false;

							}

						}

					}

				/**
    			*
    			*	   |
    			*  ____|____
    			*	   | 
    			*   x  |  
    			*/
				}else if( boxHeight  >= 0 && boxWidth <= 0 ){

					for( var i = 0; i <= boxHeight; i++ ){

						for( var j = Space.from, max = Space.from + boxWidth; j >= max; j-- ){
							
							cell = cells[ j + ( i * 100 ) ];

							if( cell.getReserved() ){

								cell.error();
								Space.cellReserved = true;

							}else{
								
								cell.highlight();
								Space.cellReserved = false;

							}

						}

					}
				
				/**
    			*
    			*	   |  x
    			*  ____|____
    			*	   | 
    			*      |  
    			*/	
				}else if( boxHeight  <= 0 && boxWidth >= 0  ){

					for( var i = 0; i >= boxHeight; i-- ){

						for( var j = Space.from, max = Space.from + boxWidth; j <= max; j++ ){
							
							cell = cells[ j + ( i * 100 ) ];

							if( cell.getReserved() ){

								cell.error();
								Space.cellReserved = true;

							}else{
								
								cell.highlight();
								Space.cellReserved = false;

							}

						}

					}

				/**
    			*
    			*	x  |  
    			*  ____|____
    			*	   | 
    			*      |  
    			*/	
				}else if( boxHeight <= 0 && boxWidth <= 0){

					for( var i = 0; i >= boxHeight; i-- ){

						for( var j = Space.from, max = Space.from + boxWidth; j >= max; j-- ){
							
							cell = cells[ j + ( i * 100 ) ];

							if( cell.getReserved() ){

								cell.error();
								Space.cellReserved = true;

							}else{
								
								cell.highlight();
								Space.cellReserved = false;

							}

						}

					}

				}

				context.beginPath();
	    		context.font = "10px Open Sans";
	    		context.fillStyle = "black";
				context.fillText( "(" + boxWidth + "," + boxHeight + ")", ( event.clientX - offsetX ), ( event.clientY - offsetY ));

			/**
			*	Blink Cell to indicate cursor position.
			*/
			}else{					
				
				Space.updateCells();

				cells[ mouseX + ( mouseY * 100 ) ].blink();
								

				context.beginPath();
	    		context.font = "10px Open Sans";
	    		context.fillStyle = "black";
				context.fillText( "(" + mouseX + "," + mouseY + ")", ( event.clientX - offsetX ), ( event.clientY - offsetY ));
				
			
			}

		/** If the clicked Space is not the same Space as currently pointed Space */
		}else{

			Space.clicked = false;
			Space.clickedIndex = 0;

		}

	}

	/**
	*	Adds event listners for click, mousemove, and mouseout events.
	*/
	Space.addEventListeners = function(){

		var self = this;		

		node.addEventListener( "click", Space.getDefaultClickEvent );
		node.addEventListener( "mousemove", Space.getHoverEvent );
		node.addEventListener( "mouseout", function(){ self.updateCells(); } );

	}

	/**
	*	Delete Box object.
	*/
	Space.deleteBox = function( _box ){

		var boxIndex = _box.getIndex();

		_box.deleteBox();

		StyleSet.deleteStyle( "#" + attributes.spaceId, "#" + boxes[ boxIndex ].getAttribute().boxId );

		boxes.splice( boxIndex, 1 );

		for( var i = 0, max = boxes.length; i < max; i++ ){

			boxes[ i ].setIndex( i );

		}

		Space.updateCells();

	}

	/**
	*	Delete All Box objects.
	*/
	Space.deleteAllBox = function(){
		
		for( var i = 0, j = 0, max = boxes.length; i < max; i++){

			this.deleteBox( boxes[ j ] );
					
		}

	}

	/**
	*	@returns {string} XML tag set of a Space object
	*/
	Space.toXml = function(){

		var xml = "<space>" +
		"<type>"       +  this.getType()  + "</type>"    +
		"<index>"      +  this.getIndex() + "</index>"   +
		"<row>"        +  this.getRow()   +	"</row>"     +
		"<attr>"  +
		"<spaceId>"    +  this.getAttribute().spaceId    + "</spaceId>" +
		"<spaceClass>" +  this.getAttribute().spaceClass + "</spaceClass>" +
		"</attr>" + "<boxes>";

		for( var i = 0, max = this.getBoxes().length; i < max; i++ ){
			
			xml += boxes[ i ].toXml();

		}

		xml += "</boxes>" + "</space>";

		return xml;

	}

	return Space.init();

}