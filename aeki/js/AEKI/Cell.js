/**
*	Cell is a fundamental element of Office, Space, and Box object. It is responsible 
*	for visualizing mentioned objects.
*
*	@param {int} param.index - Cell index.
*	@param {Space} param.parent - Space object as Cell's container.
*	@param {string} param.background - Default color code for Cell Node.
*	@param {HTMLElement} param.backgroundRepeat - Style attribute for background-repeat.
*	@param {boolean} param.selected - Boolean that indicates if Cell is reserved for box or not.
*	@param {HTMLElement} param.node - Div for Cell.
*	@param {Box} param.box - Box object.
*/
var Cell = function( param ){

	var Cell = {},
	index,
	box,
	context,
	x,
    y,
    size,
    reserved = false,
    selected = false,
    rearrange = false,
    background,  
    progressId,       
    progress = 0;

	Cell.init = function(){

		this.setIndex(      param.index      );
		this.setContext(    param.context    );
		this.setX(          param.x          );
		this.setY(          param.y          );
		this.setSize(       param.size       );		
		this.setBackground( param.background );

		this.drawCell();

		return Cell;
	}

	/**
	*	@param {int} _index - An index of a Cell.
	*/
	Cell.setIndex = function( _index ){

		index = _index;

	}

	/**
	*	@return {int} 
	*/
	Cell.getIndex = function(){

		return index;

	}

	/**
	*	@returns {Box}
	*/
	Cell.getBox = function(){

		return box;

	}

	/**
	*	@param {Box} _box
	*/
	Cell.setBox = function( _box ){

		box = _box;
	}
	
	/**
	*	@param {CanvasRenderingContext2D} _context - The context of canvas of the Cell's Space.
	*/
	Cell.setContext = function( _context ){

		context = _context;

	}

	/**
	*	@return {CanvasRenderingContext2D} 
	*/
	Cell.getContext = function(){

		return context;

	}

	/**
	*	@param {int} _x - The position x of the Cell
	*/
	Cell.setX = function( _x ){

		x = _x;

	}

	/**
	*	@return {int} x
	*/
	Cell.getX = function(){

		return x;
	}

	/**
	*	@param {int} _y - The position y of the Cell
	*/	
	Cell.setY = function( _y ){

		y = _y;

	}

	/**
	*	@return {int} y
	*/
	Cell.getY = function(){

		return y;
	}

	/**
	*	@param {int} _size - The size of the Cell.
	*/
	Cell.setSize = function( _size ){

		size = _size;

	}

	/**
	*	@return {int} size
	*/
	Cell.getSize = function(){

		return size;

	}

	/**
	*	@param {Boolean} _reserved - If the Cell is reserved for the box.
	*/
	Cell.setReserved = function( _reserved ){

		reserved = _reserved;

	}

	/**
	*	@return {Boolean}
	*/
	Cell.getReserved = function(){

		return reserved;

	}

	/**
	*	@param {Boolean} _rearrange - If the Cell is being rearranged.
	*/
	Cell.setRearrange = function( _rearrange ){

		rearrange = _rearrange;
	}

	/**
	*	@return {Boolean}
	*/
	Cell.getRearrange = function(){

		return rearrange;
	}

	/**
	*	@param {Boolean} _selected - If the Cell is selected.
	*/
	Cell.setSelected = function( _selected ){

		selected = _selected;

	}

	/**
	*	@return {Boolean}
	*/
	Cell.getSelected = function(){

		return selected;

	}

	/**
	*	@param {string} _background - The background of the Cell.
	*/
	Cell.setBackground = function( _background ){

		background = _background;
	}

	/**
	*	@return {string}
	*/
	Cell.getBackground = function(){

		return background;

	}

	Cell.drawDefault = function(){

		if( selected ){

	    	CellHelper.drawWhenSelected( context );	
	    
	    }else if( reserved ){
	    	
	    	CellHelper.drawWhenReserved( context );	
	    		
	    }else{

			CellHelper.drawWhenDefault( context );		    	

	    }

	}

	Cell.drawRearrange = function(){

		if( !rearrange ){

			Cell.drawDefault();

		}else{

			CellHelper.drawWhenRearrange( context );		    	
		}

	}

	Cell.beginPath = function(){

		context.beginPath();
	    context.rect( x, y, size, size );

	}

	Cell.drawCell = function( hover ){
		
		Cell.beginPath();	    
	    this.drawDefault();
	    	    
	}
	
	Cell.highlight = function(){

		Cell.beginPath();
	    CellHelper.highlight( context );

	}

	Cell.drawGuide = function(){
		
		CellHelper.drawWhenGuide( context, x, y, size );

	}

	Cell.error = function(){

		Cell.beginPath();
	    CellHelper.error( context, x, y, size );

	}

	Cell.allowed = function(){

		Cell.beginPath();
		CellHelper.allowed( context, x, y, size )

	}

	Cell.blink = function(){

		Cell.beginPath();
	    CellHelper.blink( context );

	}

	Cell.deleteCell = function(){

		this.setRearrange( false );
		this.setSelected( false );
		this.setReserved( false );
		this.drawCell();

	}

	Cell.toJson = function(){

		var json = ({

			index: index,
			context: context,
			x: x,
			y: y,
			size: size

		});

		return json;

	}

	return Cell.init();

}

/**
*	CellHelper class contains drawing methods for Cell class.
*/
var CellHelper = function(){

	var CellHelper = {};

	CellHelper.init = function(){

		return CellHelper;

	}

	CellHelper.drawWhenSelected = function( context ){

		context.fillStyle   = Global.colors.cellSelected;
    	context.strokeStyle = Global.colors.cellSelected;
    	context.fill();	    
    	context.stroke();

	}

	CellHelper.drawWhenGuide = function( context, x, y, size ){

		context.beginPath();
		context.rect( x, y, size, size );
		context.fillStyle = Global.colors.cellGuide;
		// context.strokeStyle = "white";
		// context.fill();
		// context.stroke();
		// context.closePath();

		// context.beginPath();
	 //    context.moveTo( x + size/4 * 1, y );
	 //    context.lineTo( x + size/4 * 1, y + size );

	 //    context.moveTo( x + size/4 * 2, y );
	 //    context.lineTo( x + size/4 * 2, y + size );

	 //    context.moveTo( x + size/4 * 3, y );
	 //    context.lineTo( x + size/4 * 3, y + size );

	 //    context.moveTo( x + size/4 * 4, y );
	 //    context.lineTo( x + size/4 * 4, y + size );
	    
		
    	context.strokeStyle = Global.colors.cellGuide;
    	context.stroke();
    	context.fill();

    	context.closePath();

	}

	CellHelper.drawWhenTrigger = function( context ){

		context.fillStyle   = Global.colors.cellTrigger;
    	context.strokeStyle = Global.colors.cellTrigger;
    	context.fill();	    
    	context.stroke();

	}

	CellHelper.drawWhenReserved = function( context ){

		context.fillStyle   = Global.colors.cellReserved;
    	context.strokeStyle = Global.colors.cellReserved;
    	context.fill();	    
    	context.stroke();

	}

	CellHelper.drawWhenDefault = function( context ){

		context.fillStyle   = Global.colors.cellDefault;	 
		context.strokeStyle = Global.colors.cellDefault;

	}

	CellHelper.drawWhenRearrange = function( context ){

		context.fillStyle   = Global.colors.cellRearrange;	 
	    context.strokeStyle = Global.colors.cellRearrange;
	    context.fill();	    
	    context.stroke();

	}

	CellHelper.highlight = function( context ){

	    context.fillStyle   = Global.colors.cellSample;
	    context.fill();
		context.strokeStyle = Global.colors.cellSample;
		context.stroke();

	}

	CellHelper.error = function( context, x, y, size ){

	    context.fillStyle = Global.colors.cellErrorFill;
	    context.fill();	    
		context.beginPath();
	    context.moveTo( x, y );
		context.lineTo( x + size, y + size );
		context.moveTo( x + size, y );
		context.lineTo( x, y + size );
		context.lineWidth = 2;
		context.strokeStyle = Global.colors.cellErrorStroke;		
		context.stroke();

	}

	CellHelper.allowed = function( context, x, y, size ){

	    context.fillStyle   = Global.colors.cellAllowed;
	    context.fill();
	    context.strokeStyle = Global.colors.cellAllowed;
		context.stroke();	    
		context.beginPath();
	    context.moveTo( x, y );
		context.lineTo( x + size, y + size );
		context.moveTo( x + size, y );
		context.lineTo( x, y + size );
		context.lineWidth = 2;
		context.strokeStyle = Global.colors.cellAllowedStroke;
		context.stroke();

	}

	CellHelper.blink = function( context ){

	    context.fillStyle   = 'white';	 
	    context.strokeStyle = 'white';
	    context.fill();
	    context.stroke();

	}

	return CellHelper.init();	

}()