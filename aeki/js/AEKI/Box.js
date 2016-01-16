/**
*	Box class is resposible for containing a Tag and Cell objects. 
*	In a built project, Box is a div container that contains defined Tag object.
*
*	@param {int} param.start - Start index of Cell objects to create Box.
*	@param {int} param.width - Width of Box
*	@param {int} param.height - Height of Box
*	@param {string} param.boxId - Box Id
*	@param {string} param.boxClass - Box Class
*	@param {string} param.boxTag - Box Tag
*/
var Box = function( param ){

	var Box = {}, 
	index,
	space,
	spaceIndex, 
	start, 
	width, 
	height,
	context,
	type, 
	attr, 
	tag,	
	cells;

	/**
	* Box
	* @constructs
	*/
	Box.init = function(){

		this.setIndex( param.index );
		this.setSpace( param.space );
		this.setContext();
		this.setStartIndex( param.startIndex );
		this.setWidth( param.width );
		this.setHeight( param.height);
		this.setType( param.type );
		this.setCells( param.cells );		
		
		return Box;

	}

	/**
	* Getter for index.
	* @returns {int}
	*/
	Box.getIndex = function(){

		return index;

	}

	/**
	*	Setter for index.
	*	@param {int} _index 
	*/
	Box.setIndex = function( _index ){

		index = _index;

	}

	Box.getSpace = function(){

		return space;
	}

	Box.setSpace = function( _space ){

		space = _space;
		this.setSpaceIndex( _space.getIndex() );

	}


	Box.getContext = function(){

		return context;
	}

	Box.setContext = function(){

		context = space.getContext();
	}

	/**
	*	Getter for spaceIndex.
	*	@returns {int}
	*/
	Box.getSpaceIndex = function(){

		return spaceIndex;

	}

	/**
	*	Setter for spaceIndex.
	*	@param {int} _spaceIndex 
	*/
	Box.setSpaceIndex = function( _spaceIndex ){

		spaceIndex = _spaceIndex;

	}

	/**
	*	Getter for start.
	*	@returns {int}
	*/
	Box.getStartIndex = function(){

		return start;

	}

	/**
	*	Setter for start.
	*	@param {int} _start
	*/
	Box.setStartIndex = function( _start ){

		start = _start;
	}

	/**
	*	Getter for width.
	*	@returns {int}
	*/
	Box.getWidth = function(){

		return width;

	}

	/**
	*	Setter for width.
	*	@param {int} _width
	*/
	Box.setWidth = function( _width ){

		width = _width;

	}

	/**
	*	Getter for height.
	*	@returns {int}
	*/
	Box.getHeight = function(){

		return height;

	}

	/**
	*	Setter for height.
	*	@param {int} _height
	*/
	Box.setHeight = function( _height ){

		height = _height;

	}

	/**
	*	Getter for height.
	*	@returns {int}
	*/
	Box.getType = function(){

		return type;

	}

	/**
	*	Setter for height.
	*	@param {int} _height
	*/
	Box.setType = function( _type ){

		if( _type === undefined ){

			type = "default";

		}else{

			type = _type;
		}
		
	}

	/**
	*	Getter for attr.
	*	@returns {Object}
	*/
	Box.getAttribute = function(){

		return attr;

	}

	/**
	*	Setter for attr.
	*	@param {string} param.boxId
	*	@param {string} param.boxClass
	*	@param {string} param.boxTag
	*/
	Box.setAttribute = function( param ){

		var boxId, boxClass, boxTag;

		attr = {

			boxId: param.boxId,
			boxClass: param.boxClass,
			boxTag: param.boxTag		

		}

		if( attr.boxTag !== "" ){
		
			if( this.getTag() ){

				if( this.getTag().getTagType() != attr.boxTag ){

					this.setTag( new Tag( attr.boxTag, this ) );

				}

			}else
			{
				
				this.setTag( new Tag( attr.boxTag, this ) );

			}			
			
		}

	}

	/**
	*	Getter for tag.
	*	@returns {Tag}
	*/
	Box.getTag = function(){

		return tag;

	}

	/**
	*	Setter for tag.
	*	@param {Tag} tag
	*/
	Box.setTag = function( _tag ){

		tag = _tag
			
	}

	/**
	*	Getter for cells.
	*	@returns {Array}
	*/
	Box.getCells = function(){

		return cells;

	}

	/**
	*	Setter for cells.
	*	@param {Array} _cells
	*/
	Box.setCells = function( _cells ){

		if( _cells === undefined || _cells === null || typeof _cells !== "Array" ){

			cells = []	

		}else{

			cells = _cells;

		}

	}

	/**
	*	Add Cell object to cells array.
	*	@param {Cell} cell
	*/
	Box.addCell = function( cell ){

		cells.push( cell );

	}

	/**
	*	Delete all Cell objects within this Box.
	*/
	Box.deleteBox = function(){

		for( var i = 0, max = cells.length; i < max; i++ ){

			cells[ i ].deleteCell();

		}		

	}

	/**
	*	Delete all Cell objects within this Box.
	*/
	Box.deleteCells = function(){

		cells.forEach(function( element ){

			element.setBox( null );
			element.deleteCell();			

		})

		cells = [];

	}

	Box.rearrange = function(){

		cells.forEach( function( element ){

			element.setRearrange( true );
			element.setReserved( false );

		});

	}

	/**
	*	Change color of the box.
	*/
	Box.changeColor = function( color ){

		for( var i = 0, max = cells.length; i < max; i++ ){

			var node = cells[ i ].getNode();

			if( color === undefined ){

				node.style.background = Global.colors.boxTempHighlight;

			}else{

				node.style.background = color;
			}
			

		}

	}

	/**
	*	Highlight the box.
	*/
	Box.highlight = function(){
		
		
		cells.forEach( function( element ){

			element.setSelected( true );
			element.drawCell();

		});

	}

	/**
	*	Dehighlight the box.
	*/
	Box.dehighlight = function(){
		
		
		cells.forEach( function( element ){

			element.setSelected( false );
			element.drawCell();

		});

	}

	/**
	*	Delete all Cell objects within this Box object
	*	@param {string} color - a color code for Box object to be changed to.
	*/
	Box.changeBackground = function( color ){

		for( var i = 0, max = this.getCells().length; i < max; i++ ){

			var cell = this.getCells()[i],
			node = cell.getNode();

			cell.setBackground( color );
			node.style.background = color;
			

		}

	}

	/**
	*	Sets cells selected attribute to false
	*/
	Box.unselectCells = function(){

		for( var i = 0, max = this.getCells().length; i < max; i++ ){

			this.getCells()[i].setSelected( false );

		}

	}

	Box.drawCells = function(){

		var self = this;
		cells.forEach( function( element ){

			element.setReserved( true );							
			element.setBox( self );
			element.drawCell();
			

		});
	}

	/**
	* @returns {string} XML tag set of a Box object
	*/
	Box.toXml = function(){

		var xml, boxTagContents = "";

		if( this.getTag() ){

			boxTagContents = this.getTag().contentsToXml();
			
		}
				
		xml = "<box type = '" + this.getType() + "'>" +
		"<index>" + this.getIndex() + "</index>" +
		"<start>" + this.getStartIndex() + "</start>" +
		"<width>" + this.getWidth() +"</width>" +
		"<height>" + this.getHeight() +"</height>" +
		"<attr>" +
		"<boxId>" + this.getAttribute().boxId + "</boxId>" +
		"<boxClass>" + this.getAttribute().boxClass + "</boxClass>" +
		"<boxTag>" + this.getAttribute().boxTag + "</boxTag>" +
		"<boxTagContents>" + boxTagContents + "</boxTagContents>" + 		
		"</attr>" +
		"</box>";

		return xml;
	}	

	return Box.init();

}