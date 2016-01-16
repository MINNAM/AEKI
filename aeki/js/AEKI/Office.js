/**
*	Box class is the most parent of all containers. 
*	Built project's meta data is also stored in here.
*/
var Office = function(){

	var Office = {},
	title,
	spaces,
	spaceIds = [],
	style,
	head = "",
	meta = {

		title: "",
		author: "",
		description: "",
		keywords: ""

	};

	/**
	*	Office
	*	@constructs
	*/
	Office.init = function(){

		this.setTitle();
		this.setSpaces();
		this.setStyle();		

		document.addEventListener( "scroll", function( event ){
			
			Office.updateSpaceOffset();

		});

		
		
		return Office;

	}

	/**
	*	Getter for title.
	*	@returns {string}
	*/
	Office.getTitle = function(){

		return title;

	}

	/**
	*	Setter for title.
	*	@param {string} _title - A title for office object or the project.
	*/
	Office.setTitle = function( _title ){

		if( _title === undefined){

			title = "";

		}else{

			title = _title;

		}

	}

	/**
	*	Getter for spaces.
	*	@returns {Array.<Space>} 
	*/
	Office.getSpaces = function(){
		
		return spaces;
		
	}

	/**
	*	Setter for spaces.
	*	@param {Array.<Space>} _spaces - An array of Space objects.
	*/
	Office.setSpaces = function( _spaces ){

		if( _spaces === undefined || _spaces === null ){

			spaces = [];

		}else{

			spaces = _spaces;

		}

	}

	/**
	*	Getter for style.
	*	@returns {Style} 
	*/
	Office.getStyle = function(){

		return style;

	}

	/**
	*	Setter for style.
	*	@param {Style} _style
	*/
	Office.setStyle = function( _style ){

		if( _style === undefined || _style === null ){

			

		}else{

			style = _style;

		}

	}

	/**
	*	Getter for meta.
	*	@returns {Object.<string, string, string>}
	*/
	Office.getMeta = function(){

		if( meta.title == "" && meta.author == "" && meta.description == "" && meta.keywords == "" ){

			return "";

		}else{

			return meta;

		}

	}

	/**
	*	Setter for meta.
	*	@param {Object.<string, string, string>}
	*/
	Office.setMeta = function( title, author, description, keywords ){

		if( title !== "" || title !== undefined ){

			meta.title = title;	

		}else{

			meta.title = "";
		}

		if( author !== "" || author !== undefined ){

			meta.author = author;	

		}else{

			meta.author = "";
		}

		if( description !== "" || description !== undefined ){

			meta.description = description;	

		}else{
			
			meta.description = "";
		}

		if( keywords !== "" || keywords !== undefined ){

			meta.keywords = keywords;	

		}else{
			
			meta.keywords = "";

		}

	}

	/**
	*	Getter for head.
	*	@returns {string}
	*/
	Office.getHead = function(){

		return head;

	}

	/**
	*	Setter for head.
	*	@param {string} _head
	*/
	Office.setHead = function( _head ){

		head = _head;

	}

	/**
	*	Setter for head.
	*	@return {string} spaceIds
	*/
	Office.getSpaceIds = function(){

		this.updateSpaceIds();

		return spaceIds;

	}

	/**
	*	Populate all space ids in to spaceIds array.
	*/
	Office.updateSpaceIds = function(){
		
		for( var i = 0, max = spaces.length; i < max; i++ ){

			if( spaces[ i ].getAttribute() ){

				spaceIds[ i ] = spaces[ i ].getAttribute().spaceId;

			}

		}

	}

	/**
	*	Add a Space object to desired index.
	*/
	Office.addSpace = function( space, at ){
		
		if( !at ){
			
			spaces.push( space );

		}else{		

			spaces.splice( at , 0, space);
			this.updateSpaceIndex();
			
		}

	}



	/**
	*	Update index of space and it's corresponding children( boxes and cells to reference new space index )
	*/
	Office.updateSpaceIndex = function(){

		var spaceNodes = document.getElementsByClassName("space");				

		for( var i = 0, max = spaces.length; i < max; i++ ){

			spaces[ i ].setIndex( i );
			spaceNodes[ i ].setAttribute( "data-index", i );

			for( var j = 0, maxx = spaces[i].getCells().length; j < maxx; j++ ){

				spaces[ i ].getCells()[ i ].setContext( spaces[ i ].getContext() ); 

			}

			for( var k = 0, maxx = spaces[ i ].getBoxes().length; k < maxx; k++ ){

				spaces[ i ].getBoxes()[ k ].setSpaceIndex( i );

			}

		}

	}


	Office.copyCell = function( cell, space ){

		var newCell = new Cell({

			index: cell.getIndex(),
			context: space.getContext(),
			x: cell.getX(),
			y: cell.getY(),
			size: cell.getSize(),
			background: cell.getBackground(),
			type: "copy"

		});

		return newCell;

	}

	Office.copyBox = function( box, parent ){

		var newBox = new Box({

			index: box.getIndex(),
			space: parent,
			startIndex: box.getStartIndex(),
			width: box.getWidth(),
			height: box.getHeight(),
			type: box.getType(),
			cells: parent.getCells()	

		});

		newBox.setAttribute( box.getAttribute() );

		var tag = box.getTag();

		if( tag ){

			for( var i = 0, max = tag.getContents().length; i < max; i++ ){
				
				newBox.getTag().setContents( i, tag.getContents()[ i ] );
				
			}

		}


		return newBox;

	}

	Office.copySpace = function( _space, _row ){

		var row;

		if( _row ){

			row = _row

		}else{

			row = _space.getRow();
		}

		var newSpace = new Space({

			index: _space.getIndex(),
			row:   row,
			at:    _space.getIndex() 

		});		

		newSpace.setAttribute( _space.getAttribute().spaceId, _space.getAttribute().spaceClass );		

		for( var i = 0, max = _space.getCells().length; i < max; i++ ){

			var cell = _space.getCells()[ i ];

			newSpace.getCells()[ i ] = this.copyCell( cell, newSpace );			

		}

		return newSpace;

	}

	Office.duplicateSpace = function( space ){


		var temp    = this.copySpace( space ),
		input 	    = spaces.length, 
		ids 	    = this.getSpaceIds(),
		validate    = false,  
		input 	    = 0, 
		validatedId = 0,
		tempId 		= space.getAttribute().spaceId;    		

		spaces.splice( space.getIndex() + 1 , 0, temp );

		while( !Global.util.isItUnique( ids, space.getAttribute().spaceId + "-" + ( input ) ) ){
								
			validatedId = ++input;

		}
		
		temp.getAttribute().spaceId = tempId + "-"+ ( validatedId  );	

		for( var i = 0, max = space.getBoxes().length; i < max; i++ ){
			
			var box = this.copyBox( space.getBoxes()[ i ], temp );

			for( var j = 0; j < box.getHeight(); j++ ) {

				for( var k = 0; k < box.getWidth(); k++ ) {
					
					var cell = temp.getCells()[ ( box.getStartIndex() + j * 100 ) + k ];

					if( cell !== undefined ){

						cell.setReserved( true );				
						cell.setBox( box );
						box.addCell( cell );

					}
					
				}

			}
		
			temp.addBox( box );
			
			this.updateSpaceOffset();

			Controller.updateBoxView({ 

				boxIndex: box.getIndex(), 
				spaceIndex: temp.getIndex() 

			});			

		}		

		temp.updateCells();
		temp.setType( "default" );

		this.updateSpaceIndex();
		this.updateSpaceBackground();

		StyleSet.duplicateDefinition( "#office", "#" + spaces[ space.getIndex() ].getAttribute().spaceId,  "#" + spaces[ space.getIndex() + 1 ].getAttribute().spaceId );

		Controller.updateBibleList( 0 );
		

	}

	Office.resizeSpace = function( spaceIndex, row ){

		var space   = spaces[ spaceIndex ],
		temp    	= this.copySpace( space, row ),
		input 	    = spaces.length, 
		ids 	    = this.getSpaceIds(),
		validate    = false,  
		input 	    = 0, 
		validatedId = 0,
		tempId 		= space.getAttribute().spaceId,
		boxIndex    = 0;

		for( var i = 0, max = space.getBoxes().length; i < max; i++ ){
			
			var box = this.copyBox( space.getBoxes()[ i ], temp );

			if( parseInt( box.getStartIndex() / 100 ) + box.getHeight() <= row ){

				for( var j = 0; j < box.getHeight(); j++ ) {

					for( var k = 0; k < box.getWidth(); k++ ) {
						
						var cell = temp.getCells()[ ( box.getStartIndex() + j * 100 ) + k ];

						if( cell !== undefined ){

							cell.setReserved( true );				
							cell.setBox( box );
							box.addCell( cell );

						}
						
					}

				}
				
				box.setIndex( boxIndex++ );
				temp.addBox( box );

				Controller.updateBoxView({ 

					boxIndex: box.getIndex(), 
					spaceIndex: temp.getIndex() 

				});	

			}

		}		

		this.deleteSpace( spaceIndex );		
		spaces.splice( spaceIndex, 0, temp );

		temp.updateCells();
		temp.setType( "default" );
		
		this.updateSpaceBackground();
		this.updateSpaceIndex()		
		this.updateSpaceOffset();

		Controller.updateBibleList({ type : "space", index: temp.getIndex() });
		Buffer.setCurrentSpace( temp );
	}

	Office.swapSpace = function( a, b ){

		var temp = spaces[ a ];
		spaces[ a ] = spaces[ b ];
		spaces[ b ] = temp; 

		this.updateSpaceIndex();
		this.updateSpaceBackground();

		Controller.updateSpaceView( spaces[ a ].getIndex() );

	}

	Office.updateSpaceBackground = function(){

		var background;

		for( var i = 0, max = spaces.length; i < max; i++ ){

			
			if( i % 2 == 0 ){

				background = Global.colors.cellOddNumbered;

			}else{

				background = Global.colors.cellEvenNumbered;

			}

			spaces[ i ].setBackground( background );	

		}

	}

	Office.updateSpaceOffset = function(){

		spaces.forEach( function( element ){

			element.updateOffset();

		});

	}

	/**
	*	Delete a Space object.
	*/
	Office.deleteSpace = function( index ){
		
		// Indicator.addIndication( "Deleting Space: " + spaces[ index ].getIndex() );
		var spaceToDelete = spaces[ index ],
		spaceNode = spaceToDelete.getNode();

		spaceNode.delete();

		spaces.splice( index, 1 );
		
		this.updateSpaceIndex();
		this.updateSpaceOffset();
		this.updateSpaceBackground();

	}

	/**
	*	Create a Cell object. A color of the cell varies by it's parent object's, a Space, index.  
	*/
	Office.createCell = function( index, parent ){

		var background, cell, evenOdd = parent.getIndex();

		if( evenOdd % 2 == 0 ){

			background = Global._colors.cellOddNumbered;

		}else{

			background = Global._colors.cellEvenNumbered;

		}

		cell = new Cell({ 

			index: index,
			parent: parent, 
			background: background

		});

		return cell;

	}

	/**
	*	Create a Space object
	*	@returns {Space}
	*/
	Office.createSpace = function( param ){

		var index = 0,
		space = new Space({

			row:   param.row, 
			index: spaces.length, 
			at:    param.at, 
			type:  param.type 

		});		

		this.addSpace( space, param.at );

		Office.updateSpaceOffset();
		
		return space;

	}

	/**
	* @returns {string} XML tag set of a Office object
	*/
	Office.toXml = function(){
		
		var xml = '<office title = "' + meta.title + '" author= "' + meta.author + '" description= "' + meta.description + '" keywords= "' + meta.keywords + '">';
		xml += "<head><![CDATA[" + this.getHead() + "]]></head>";
		xml += "<spaces>";
		
		for( var i = 0, max = spaces.length; i < max; i++ ){
			
			xml += spaces[i].toXml();

		}

		xml += "</spaces>" + "</office>";
		
		return xml;

	}

	return Office.init();

}