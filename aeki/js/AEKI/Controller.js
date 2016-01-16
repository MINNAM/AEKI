/**
*	@constructor
*/
var Controller = function(){

	var Controller = {},
	office;

	Controller.init = function(){

		this.setOffice();
		this.populateBiblelistButtons();

		return Controller;

	}

	/**
	* 	@memberof Controller
	* 	@returns {Office}
	*/
	Controller.getOffice = function(){

		return office;

	}

	/**
	* 	@memberof Controller
	* 	@param {Office} _office
	*/
	Controller.setOffice = function( _office ){

		/**		
		* 	@default {Office}
		*/
		if( _office === undefined || _office === null){

			office = new Office()

		}else{

			office = _office;

		}	

	}	

	/**
	* 	@memberof Controller
	* 	@param {int} param.row Row of space
	* 	@param {string} param.spaceId for loading saved project
	* 	@param {string} param.spaceClass for loading saved project
	*/
	Controller.createSpace = function( param ){

		var row    = param.row,
		at 		   = param.at,
		type 	   = param.type,
		spaceId    = param.spaceId,
		spaceClass = param.spaceClass,
		spacesSize = this.getOffice().getSpaces().length;

	    if( row !== 0 && !isNaN( row ) ){	    	

	    	var space = this.getOffice().createSpace({ row: row, at: at, type: type });

	    	if( spaceId !== undefined ){
	    		
	    		space.setAttribute( spaceId, spaceClass );

	    	}else{

	    		var input   = spacesSize, 
	    		ids 	    = this.getOffice().getSpaceIds(),
	    		validate    = false,  
	    		input 	    = 0, 
	    		validatedId = 0;	    		

				while( !Global.util.isItUnique( ids, "space"+ input ) ){
										
					validatedId = ++input;
					
				}
								
	    		space.setAttribute( "space" + validatedId, "", 0, "" );	    		

	    	}
						

			if( spacesSize < 1){

				this.updateSpaceViewDefault();

			}else{

				this.updateSpaceView( space.getIndex() );
			}											
			
	    }	    
	    
	}

	/**
	*	Get currently focused Space object
	* 	@memberof Controller
	*/
	Controller.getCurrentSpace = function(){
		
		return this.getOffice().getSpaces()[ this.getFocus().getSpace() ];

	}

	/**
	*	Duplicate Space.
	* 	@memberof Controller
	*	@param {int} row Set number of row
	*/
	Controller.duplicateSpace = function( row ){
		
		var space = Controller.getCurrentSpace();

		space.setRow( row );

		var current = 4;
		for( var i = 0; i < current; i++ ){

		}

		/**Update Space object*/
		space.updateSpace();

	}

	/**
	*	Swap Space.
	* 	@memberof Controller
	*	@param {int} row Set number of row
	*/
	Controller.swapSpace = function( a, b ){
		
		var office = this.getOffice();
		
		office.swapSpace( a, b);

		var officeNode = document.getElementById("mainContainer"),
		temp = document.createElement("div"), 
	    obj1 = officeNode.childNodes[ a ], 
	    obj2 = officeNode.childNodes[ b ];

	    obj1.parentNode.insertBefore( temp, obj1 );	    
	    obj2.parentNode.insertBefore( obj1, obj2 );
	    temp.parentNode.insertBefore( obj2, temp );
	    temp.parentNode.removeChild( temp );	    

	}

	/**
	*	Edit Space.
	* 	@memberof Controller
	*	@param {int} row Set number of row
	*/
	Controller.editSpace = function( row ){
		
		var space = Controller.getCurrentSpace();

		space.setRow( row );

		/**Update Space object*/
		space.updateSpace();

	}

	/**
	*	Same as Controller.updateSpaceView but focus the first Space object.
	* 	@memberof Controller
	*/
	Controller.updateSpaceViewDefault = function(){
		
		Buffer.setCurrentSpace( this.getOffice().getSpaces()[ 0 ] );

		this.updateBibleList({ 

			index: 0, 
			type: "space" 

		});

	}

	/**
	*	Update view focus to specified Space object
	* 	@memberof Controller
	*/
	Controller.updateSpaceView = function( index ){

		var space = this.getOffice().getSpaces()[ index ];

		Buffer.setCurrentSpace( space );
		
		this.updateBibleList({ 

			index: index, 
			type: "space" 
			
		});

		this.showElementInfo({  

			element: space,
			type: "space"

		});

		/**Switch to Space object's attribute menu*/
		AttributeMenu.switchAttribute( 0 );
		AttributeMenu.updateSpaceAttribute( index );
		
	}

	/**
	* 	Create box by coordinate
	* 	@memberof Controller
	* 	@param {int} param.start Start index of Cells to create Box
	* 	@param {int} param.width Width of Box
	* 	@param {int} param.height Height of Box
	* 	@param {string} param.boxId Box Id
	* 	@param {string} param.boxClass Box Class
	* 	@param {string} param.boxTag Box Tag
	*/
	Controller.createBoxByCoordinate = function( param ){

		var space = Buffer.getCurrentSpace(),
		start 	  = param.start,
		width 	  = param.width,
		height 	  = param.height,
		type      = param.type
		boxId 	  = param.attr.boxId,
		boxClass  = param.attr.boxClass,
		boxTag 	  = param.attr.boxTag,
		box 	  = new Box({ 

			index: space.getBoxes().length,
			space: space, 
			startIndex: start, 
			width: width, 
			height: height,
			type: type

		});

		box.setAttribute({ 

			boxId: boxId, 
			boxClass: boxClass, 
			boxTag: boxTag

		});

		for( var i = 0; i < height; i++ ) {

			for( var j = 0; j < width; j++ ) {
				
				var cell = space.getCells()[ ( start + i * 100 ) + j ];

				if( cell !== undefined ){

					cell.setReserved( true );
					cell.setSelected( true );				
					cell.setBox( box );
					cell.drawCell();
					box.addCell( cell );

				}
				
			}

		}

		space.addBox( box );
		space.updateCells();

		this.updateBoxView({ 

			boxIndex: space.getBoxes().length - 1, 
			spaceIndex: space.getIndex() 

		});

		return box;

	}

	/**
	*	Update box view
	* 	@memberof Controller
	*	@param {int} param.boxIndex - Index of Box
	*	@param {int} param.spaceIndex - Index of Space
	*/
	Controller.updateBoxView = function( param ){
		
		var space = this.getOffice().getSpaces()[ param.spaceIndex ],
		box       = space.getBoxes()[ param.boxIndex ];

		this.updateBibleList({
		
			index: param.boxIndex, 
			type: "box", 
			parentIndex: param.spaceIndex 

		});

		this.showElementInfo({  

			element: box,
			type: "box"

		});

		Buffer.setCurrentSpace( space );
		Buffer.setCurrentBox( box );
		Buffer.dehighlightSpace();
		
		AttributeMenu.switchAttribute( 1 );
		AttributeMenu.updateBoxAttribute( param.boxIndex );

		// StyleSelector.updateStyleSelector( "box", box );

		

	}

	/**
	*	Count all elements( spaces and boxes ) in the Office object.
	* 	@memberof Controller
	*/	
	Controller.countAllElements = function(){

		var index = 0;

		for( var i = 0, max = Controller.getOffice().getSpaces().length; i < max; i++ ){							

			for( var j = 0, maxx = Controller.getOffice().getSpaces()[ i ].getBoxes().length; j < maxx; j++ ){

				index++;

			}							

			index++

		}

		return index - 1;

	}

	Controller.bibleListToArray = []; 
	Controller.bibleListType = 0;
	/**
	*	Update Bible list.
	* 	@memberof Controller
	*/
	Controller.updateBibleList = function( param ){

		var self  			= this,
		index 				= param.index,
		type 				= param.type,
		parentIndex         = param.parentIndex,
		bibleListContainer 	= View.get( "#bibleListContainer" ),
		bibleList 			= View.get( "#bibleList" ),
		spaces    			= this.getOffice().getSpaces();

		/** Empty bibleList */
		bibleList.style({ position: "relative" })		
		bibleList.setInnerHTML( "" );

		var countElement = 0;

		for( var i = 0, max = spaces.length; i < max; i++ ){

			// Updating Space 
			var node     = View.createElement({ type: "ol" }),
			nodeTitle    = View.createElement({ type: "legend", parent: node }),
			toggleButton = View.createElement({ type: "button", parent: nodeTitle });
			textSpan     = View.createElement({ type: "span", parent: nodeTitle, name: spaces[ i ].getAttribute().spaceId }),
						
			node.set({

				"data-index": i,
				"data-type": "space",
				"data-keyevent": countElement

			})			

			/**
			*	Sets toggleButton corresponding to it's Space's display state.
			*/
			if( Controller.getOffice().getSpaces()[ i ].getNode().style.display == "none" ){

				toggleButton.set({ "data-state": 1 });
				toggleButton.style({ background: "white" });
				

			}else{

				toggleButton.set({ "data-state": 0 });
				toggleButton.style({ background: "none" });

			}			

			toggleButton.addEventListener( "click", function(){

				var space 	   = this.parentNode.parentNode,
				spaceDataIndex = space.getAttribute("data-index");				


				if( this.getAttribute( "data-state" ) == "0" ){

					this.setAttribute( "data-state", 1 );
					this.style.background = "white";

					Controller.getOffice().getSpaces()[ spaceDataIndex ].getNode().style.display = "none";
					Controller.getOffice().updateSpaceOffset();


				}else{

					this.setAttribute( "data-state", 0 );
					this.style.background = "none";

					Controller.getOffice().getSpaces()[ spaceDataIndex ].getNode().style.display = "";
					Controller.getOffice().updateSpaceOffset();

				}

			});			

			this.bibleListToArray[ countElement++ ] = { type: "space" , index:  spaces[ i ].getIndex() };

			/** When Space is clicked */
			textSpan.addEventListener( "click", function(){				

				var spaceNode  = this.parentNode.parentNode,
				spaceDataIndex = spaceNode.getAttribute( "data-index" ),
				spaceDataType  = spaceNode.getAttribute( "data-type" ),
				spaceKeyEvent  = spaceNode.getAttribute( "data-keyevent" ),
				space          = self.getOffice().getSpaces()[ spaceDataIndex ];

				self.updateSpaceView( spaceDataIndex );

				Buffer.setCurrentBox( null );
				Buffer.setCurrentSpace( space );

				StyleSelector.setCurrentStyleParent( ".Global" ); 				
				StyleSelector.updateStyleSelector( "space", space );
							

				KeyEvent.index = spaceKeyEvent;
				
			});

			if( i == index && type == "space" ){

				nodeTitle.style({ background: Global.colors.listHighlight });
				KeyEvent.index =  node.get( "data-keyevent" );

			}

			/** Updating Box */
			var boxes = spaces[ i ].getBoxes();

			for( var j = 0, maxx = spaces[ i ].getBoxes().length; j < maxx; j++ ){

				var boxNode = View.createElement({ type: "li", name: boxes[ j ].getAttribute().boxId });

				/** Change color if the box type is a guide box */
				if( boxes[ j ].getType() == "guide" ){

					boxNode.style({ color: Global.colors.guideBox });

				}

				boxNode.set({

					class: "boxListItem",
					"data-index": boxes[ j ].getIndex(),
					"data-parent": i,
					"data-type": "box",
					"data-keyevent": countElement

				});

				this.bibleListToArray[ countElement++ ] = { type: "box" , index:  spaces[ i ].getBoxes()[ j ].getIndex(), parentIndex: i };

				boxNode.addEventListener( "click", function(){			

					var dataIndex  = this.getAttribute( "data-index" ),
					dataType   	   = this.getAttribute( "data-type" ),
					dataParent 	   = this.getAttribute( "data-parent" ),
					dataKeyEvent   = this.getAttribute( "data-keyevent" );
					
					KeyEvent.index = dataKeyEvent;

					self.updateBoxView({

						boxIndex: dataIndex,
						spaceIndex: dataParent

					});					
					
					StyleSelector.setCurrentStyleParent( "#" + self.getOffice().getSpaces()[ dataParent ].getAttribute().spaceId );										
					StyleSelector.updateStyleSelector( "box", self.getOffice().getSpaces()[ dataParent ].getBoxes()[ dataIndex ] );					

				});

				if( j == index && type == "box" && parentIndex == i ){

					boxNode.style({ background: Global.colors.listHighlight });
					KeyEvent.index =  boxNode.get( "data-keyevent" );

				}

				node.appendChild( boxNode );

			}

			bibleList.appendChild( node );

		}

	}

	/**
	*	Update Element info.
	* 	@memberof Controller
	*	@param {int} param.id - An id of Space or Box object.
	*	@param {int} param.parent - A parent object of Space or Box object.
	*	@param {int} param.type - A type of Space or Box object.
	*	@param {int} param.width - A width if given object is a Box.
	*	@param {int} param.height - A height of Space or Box object.
	*	@param {int} param.col - A column of Space or Box object.
	*	@param {int} param.row - A row of Space or Box object.
	*/
	Controller.updateElementInfo = function( param ){
		
		var table = View.createTable({ 

			tableData: [

				[ "ID",     param.id     ],
				[ "PARENT", param.parent ],
				[ "TYPE",   param.type   ],
				[ "WIDTH",  param.width  ],
				[ "HEIGHT", param.height ],
				[ "COLUMN", param.col    ],
				[ "ROW",    param.row    ],

			], 

			parent: View.get( "#elementInfo" ).clear()

		});
		
		
	}

	/**
	*	Show element info.
	* 	@memberof Controller
	*	@param {int} param.element - A Space or box object.
	*	@param {int} param.type - A type of element, Space or Box.
	*/
	Controller.showElementInfo = function( param ){

		var element = param.element,
		elementType = param.type;		
		
		switch( elementType ){

			case "box":

				this.updateElementInfo({

					id:     element.getAttribute().boxId,
					parent: this.getOffice().getSpaces()[ element.getSpaceIndex() ].getAttribute().spaceId ,
					type:   element.getType(),
					width:  element.getWidth(),
					height: element.getHeight(),
					col:    element.getStartIndex() % Global.preference.column,
					row:    element.getStartIndex() % element.getHeight() + 1

				});

				break;

			case "space":

				this.updateElementInfo({

					id:     element.getAttribute().spaceId,
					parent: "office1",
					type:   "N/A",
					width:  Global.preference.column,
					height: element.getRow(),
					col:    "N/A",
					row:    "N/A"

				});

				break;

		}

	}

	/**
	*	Populates buttons for swapping elements in the Biblelist and the element info tab.
	* 	@memberof Controller
	*/
	Controller.populateBiblelistButtons = function(){

			var bibleListContainer = View.get( "#bibleListContainer" ),
			bibleList = View.get( "#bibleList" ),
			infoButton = View.createElement({ type: "div", parent: bibleListContainer, id: "bibleListButton" }),
			swapUpButton = View.createElement({ type: "div", parent: bibleListContainer, id: "swapUpButton" }),
			swapDownButton = View.createElement({ type: "div", parent: bibleListContainer, id: "swapDownButton" });

			infoButton.addEventListener( "click", function(){

				Controller.bibleListType++;
				Controller.bibleListType %= 2;

				switch( Controller.bibleListType ){

					case 0:

						bibleList.style({ display: "inherit" });
						View.get( "#elementInfo" ).style({ display: "none" });

						break;

					case 1: 
						
						bibleList.style({ display: "none" });
						View.get( "#elementInfo" ).style({ display: "inherit" });
						
						break;

				}

			});

			swapUpButton.addEventListener("click", function(){
				
				var index = Buffer.getCurrentSpace().getIndex() - 1; 

				if( index >= 0 ){

					Buffer.setCurrentSpace( Controller.getOffice().getSpaces()[ index ] );					
					Controller.swapSpace( index, index + 1 );
					Buffer.getCurrentSpace().updateOffset(); /** Update offset because spaces' positions has changed.*/
					Controller.updateBibleList({ 

						index: index , 
						type: "space" 
						
					});

				}			    

			});

			swapDownButton.addEventListener("click", function(){
				
				var index = Buffer.getCurrentSpace().getIndex() + 1; 

				if( index < Controller.getOffice().getSpaces().length ){

					Buffer.setCurrentSpace( Controller.getOffice().getSpaces()[ index ] );
					Controller.swapSpace( index, index - 1 );
					Buffer.getCurrentSpace().updateOffset(); /** Update offset because spaces' positions has changed.*/
					Controller.updateBibleList({ 

						index: index, 
						type: "space" 
					
					});

				}

			});

			bibleListContainer.addEventListener("scroll", function(){ 	
				
				infoButton.style({ marginBottom: -1 * bibleListContainer.get( "scrollTop" ) + "px" });
				swapUpButton.style({ marginBottom: -1 * bibleListContainer.get( "scrollTop" ) + "px" });
				swapDownButton.style({ marginBottom: -1 * bibleListContainer.get( "scrollTop" ) + "px" });				
				
			});

			bibleListContainer.addEventListener("click", function(){ 	
				
				infoButton.style({ marginBottom: -1 * bibleListContainer.get( "scrollTop" ) + "px" });
				swapUpButton.style({ marginBottom: -1 * bibleListContainer.get( "scrollTop" ) + "px" });
				swapDownButton.style({ marginBottom: -1 * bibleListContainer.get( "scrollTop" ) + "px" });				
				
			});

	}

	return Controller.init();

}();

	