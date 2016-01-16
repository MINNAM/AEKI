var ViewSegmentHelper = {

	createObject: function( param){

		return new ViewSegment( param );
	}
}

var ViewSegment = function( param ){

	var ViewSegment = {};

	ViewSegment.node      = "";
	ViewSegment.className = "";
	ViewSegment.id        = "";

	ViewSegment.init = function(){

		if( param.node !== undefined ){

			this.node = param.node;

			if( param.className !== undefined ){

				this.className = param.className;
			}

			if( param.id !== undefined ){

				this.id = param.id;

			}			


		}

		return ViewSegment;

	}

	ViewSegment.value = function( _value ){

		if( _value !== undefined ){

			this.node.value = _value;
		}else{

			return this.node.value;

		}

	}

	ViewSegment.directParent = function(){

		console.log( this.node.parentNode );
	}

	ViewSegment.parent = function(){		

		var node  = this.node.parentNode,
		className = node.getAttribute( "class" ),
		id        = node.getAttribute( "id" );

		return ViewSegmentHelper.createObject({

			node:      node,
			className: className,
			id:        id

		});

	}

	ViewSegment.child = function(){

		var children = this.node.childNodes,
		viewSegments = [];

		for( var i = 0, max = children.length; i < max; i++ ){

			if( children[ i ].nodeType === 1 ){

				var className = children[ i ].getAttribute( "class" ),
				id            = children[ i ].getAttribute( "id" );

				viewSegments[ i ] = ViewSegmentHelper.createObject({

					node:      children[ i ],
					className: className,
					id:        id

				});

			}else{

				viewSegments[ i ] =  children[ i ];

			}

		}

		return viewSegments;
		

	}

	ViewSegment.style = function( param ){


		if( typeof param === "string" ){

			return this.node.style[ param ];

		}

		for( var key in param ){

			this.node.style[ key ] = param[ key ];			

		}

	}

	ViewSegment.clear = function(){

		this.node.innerHTML = "";
		return this;

	}

	ViewSegment.getInnerHTML = function(){

		return this.node.innerHTML;

	}


	ViewSegment.setInnerHTML = function( innerHTML ){

		this.node.innerHTML = innerHTML;

	}

	ViewSegment.appendInnerHTML = function( innerHTML ){

		this.node.innerHTML += innerHTML;

	}

	ViewSegment.set = function( param ){

		if( this.node ){

			for( var key in param ){

				switch( key ){

					case "class":

						this.className = param[ key ];
						break;

					case "id":

						this.id = param[ key ];
						break;				


				}

				switch( key ){

					case "offsetLeft":

						this.node[ key ] = param[ key ];
						break;

					case "offsetTop":

						this.node[ key ] = param[ key ];
						break;

					default:

						if( this.node[ key ] !== undefined ){

							this.node[ key ] = param[ key ];

						}else{

							this.node.setAttribute( key, param[ key ] );

						}
						

				}

			}

		}	

	}

	ViewSegment.get = function( param ){

		if( typeof param === "string" ){

			if( this.node.getAttribute( param ) == null){

				return this.node[ param ];

			}

			return this.node.getAttribute( param );

		}
		
	}

	ViewSegment.insertBefore = function( a, b ){

		this.node.insertBefore( a.node, b.node );

	}
	
	ViewSegment.appendChild = function( child ){

		this.node.appendChild( child.node );

	}

	ViewSegment.delete = function(){

		if( this.node.parentNode !== null)
			this.node.parentNode.removeChild( this.node );
	}

	ViewSegment.add = function( child ){

		this.node.add( child.node );

	}

	ViewSegment.remove = function( child ){

		this.node.remove( child.node );
	}

	ViewSegment.addEventListener = function( type, callback ){

		this.node.addEventListener( type, callback );

	}

	ViewSegment.removeEventListener = function( type, callback ){

		this.node.removeEventListener( type, callback );
		
	}

	return ViewSegment.init();

}

var ViewTable = function( param, parent ){

	var ViewTable = {},
	table,
	elements = [];

	ViewTable.init = function(){
		
		if( param.table ){

			table = param.table;

		}else{


			table = View.createElement({ type: "table", parent: param.parent });

			if( param.tableData ){

				param.tableData.forEach( function( element, index ){

					var row = ViewTable.insertRow();

					elements[ index ] = [];

					element.forEach( function( childElement ){

						ViewTable.insertCell( index, row, childElement );

					});				
					
				})
			}

		}

		return ViewTable;

	}

	ViewTable.getTable = function(){

		return table;

	}

	ViewTable.insertHeader = function( id, rowData ){

		var row = new ViewSegment({ node: table.node.createTHead().insertRow(), id: id });

		rowData.forEach( function( element ){
			
			if( element.type == "custom" ){

				ViewTable.insertCellNode( row, element.node, element.width );

			}else{

				ViewTable.insertCell( row, element.name, element.width );

			}				

		});

	}

	ViewTable.insertRow = function( rowData ){		

		
		if( rowData ){

			var index = table.node.rows.length,
			row 	  = new ViewSegment({ node: table.node.insertRow() });

			elements[ index ] = [];

			rowData.forEach( function( element ){
				
				if( element.type == "custom" ){

					ViewTable.insertCellNode( index, row, element.node, element.width );

				}else{

					ViewTable.insertCell( index, row, element.name, element.width );

				}				

			});


			return row;

		}else{

			return new ViewSegment({ node: table.node.insertRow() });

		}

	}

	ViewTable.insertCell = function( index, row, name, width ){

		var cell = new ViewSegment({

			node: row.node.insertCell()

		});

		if( width ){

			cell.style({

				display: "inline-block",
				width: ( 100 * width ) + "%",
				overflow: "hidden",

			})

		}

		if( index ){

			elements[ index ].push( cell );

		}

		
		
		cell.node.appendChild( document.createTextNode( name ) );

	}

	ViewTable.insertCellNode = function( index, row, viewSegment, width ){

		var cell = new ViewSegment({

			node: row.node.insertCell()

		});

		if( width ){

			cell.style({

				display: "inline-block",
				width: ( 100 * width ) + "%",
				overflow: "hidden"

			})

		}
		
		if( index ){

			elements[ index ].push( cell );
			
		}

		cell.appendChild( viewSegment );

	}

	ViewTable.get = function( row, col ){

		if( col ){

			return ViewSegmentHelper.createObject({ node: table.node.rows[ row ].cells[ col ] });

		}else{

			return ViewSegmentHelper.createObject({ node: table.node.rows[ row ] });

		}
		

	}

	ViewTable.clear = function(){

		table.clear();
		elements = [];

	}

	ViewTable.length = function(){

		return table.node.rows.length;
	}


	return ViewTable.init();
}


var View = function(){

	var View = {};

	this.numberOfMenuItem = 5;
	
	View.init = function(){

		Global.mainContainer = {

			node:   View.get("#mainContainer"),
			width:  View.get("#mainContainer").node.clientWidth,
			height: View.get("#mainContainer").node.clientHeight,

		}

		this.handleDropdownList( "styleAttributeContainer" );
		// this.handleTextareaLineNumber();
		// this.handleTextareaTabIndent();

		this.addToggle( "itemTitle", 0 );
		this.addToggle( "itemTitle", 1 );
		this.addToggle( "itemTitle", 2 );
		this.addToggle( "itemTitle", 3 );
		this.addToggle( "itemTitle", 4 );
		this.addToggle( "itemTitle", 5 );
		this.addToggle( "itemTitle", 6 );
		this.addToggle( "itemTitle", 7 );

		var   ratio = ( Global.mainContainer.width / 100 ),
		itemHolders = this.get( ".itemHolder" );

		itemHolders[ 0 ].style({ width: ( ratio * 6 - 1 ) + "px" });
		itemHolders[ 1 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 2 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 3 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 4 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 5 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 6 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 7 ].style({ width: ( ratio * 11.75 ) + "px" });
		itemHolders[ 8 ].style({ width: ( ratio * 11.75 ) + "px" });

		View.initSaveIndicators();

		return View;

	}

	View.handleDropdownList = function( id ){

		var dropdownList = document.getElementById( id );		
			
		for( j = 0, maxx = dropdownList.childNodes.length; j < maxx; j++){

			var li = dropdownList.childNodes[ j ];			

			if( li.nodeName === "LI"){

				// dropdownList.childNodes[ j ].childNodes[ 0 ] == legend tag
				dropdownList.childNodes[ j ].childNodes[ 1 ].addEventListener( "click", function( event ){					
					
					if( this.parentNode.childNodes[ 0 ].childNodes[ 0 ].style.display == "none" ){

						this.parentNode.childNodes[ 0 ].childNodes[ 0 ].style.display = "inline-block";
						this.parentNode.childNodes[ 0 ].childNodes[ 1 ].style.display = "none";

					}else{

						this.parentNode.childNodes[ 0 ].childNodes[ 0 ].style.display = "none";
						this.parentNode.childNodes[ 0 ].childNodes[ 1 ].style.display = "inline-block";

					}

					if( this.parentNode.childNodes[ 2 ].style.display == "none" || this.parentNode.childNodes[ 2 ].style.display == "" ){

						this.parentNode.childNodes[ 2 ].style.display = "inline-block";

					}else{

						this.parentNode.childNodes[ 2 ].style.display = "none";	

					}

				});

			}

		}

	}

	View.initSaveIndicators = function(){

		var Timer = function( _callback, _stopCallback, _time, _totalSequence ){

			var Timer = {},
			interval,
			callback,
			stopCallback,
			time,
			totalSequence,
			currentSequence = 0;
			
			Timer.init = function(){

				callback      = _callback;
				stopCallback  = _stopCallback;
				time          = _time;
				totalSequence = _totalSequence;					

				return Timer;

			}

			Timer.start = function(){

				Timer.stop();

				interval = setInterval( function(){

					if( totalSequence <= currentSequence ){

						Timer.stop();

					}else{

						callback();

					}
					
					currentSequence++;

				}, time );

			}

			Timer.stop = function(){

				currentSequence = 0;
				stopCallback();
				clearInterval( interval );

			}

			return Timer.init();

		},
		SaveIndicator = function( _canvas ){

			var SaveIndicator = {},
			canvas,
			context,
			height,
			width,
			timer;
			
			SaveIndicator.init = function(){

				canvas = _canvas;

				this.setCanvas();
				this.drawBase( "white" );

				timer = new Timer( this.blink, function(){ SaveIndicator.drawBase( "white" ); }, 90, 6 );

				return SaveIndicator;

			}

			SaveIndicator.setCanvas = function(){

				height = canvas.get( "offsetHeight" );
				width  = canvas.get( "offsetWidth" );
				canvas.set({ height: height, width: width });
				context = canvas.node.getContext( "2d" );

			}

			SaveIndicator.drawBase = function( color ){

				context.clearRect( 0, 0, width, height );
				context.beginPath();
				context.arc( height / 2, height / 2, height / 4, 0, Math.PI * 2 );
				context.fillStyle = color;
				context.fill();
				context.closePath();

			}

			SaveIndicator.animate = function(){

				timer.start();
			}

			SaveIndicator.blinkCount = 0;
			SaveIndicator.blink = function(){
				
				if( SaveIndicator.blinkCount ){

					SaveIndicator.drawBase( "white" );

				}else{

					SaveIndicator.drawBase( Global.colors.saveIndicator );

				}	

				SaveIndicator.blinkCount++ ;
				SaveIndicator.blinkCount = SaveIndicator.blinkCount % 2;
				

			}

			return SaveIndicator.init();

		}

		var indicators = View.get( ".saveIndicator" ),
		saveIndicators = [];

		for( var i = 0, max = indicators.length; i < max; i++ ){

			saveIndicators[ i ] = new SaveIndicator( indicators[ i ] );

		}

		return saveIndicators;

	}

	View.handleTextareaTabIndent = function( textarea ){

		if( textarea === undefined || textareas === null ){

			var textareas = document.getElementsByTagName("textarea");

			for( var i = 0, max = textareas.length; i < max; i++ ){

				textareas[ i ].addEventListener( "keydown", function( event ){

					if( event.keyCode === 9 ){

						var start = this.selectionStart,
						end       = this.selectionEnd;

						this.value = ( this.value.substring( 0, start ) + Global.textarea.getIndent() + this.value.substring( end ) ); 

						this.selectionStart = this.selectionEnd = start + 1;
						// alert(start);

						event.preventDefault();

					}

				})

			}

		}else{

			textarea.addEventListener( "keydown", function( event ){

				if( event.keyCode === 9 ){

					var start = this.selectionStart,
					end       = this.selectionEnd;

					this.value = ( this.value.substring( 0, start ) + Global.textarea.getIndent() + this.value.substring( end ) ); 

					this.selectionStart = this.selectionEnd = start + 1;
					// alert(start);

					event.preventDefault();

				}

			});

		}
		
	}

	View.handleTextareaLineNumber = function( _textarea, _lineNumber ){

		var editor = _textarea,
		lineNumber = _lineNumber;
		
		editor.value = "";
		lineNumber.innerHTML = "1";		

		editor.addEventListener( "click", function(){
			
			lineNumber.innerHTML = "";

			if( editor.value == "" || editor.value.match( /\n/g ) == null ){

				lineNumber.innerHTML = 1 + "<br>";

			}else{

				for( var i = 0; i <= editor.value.match( /\n/g ).length; i++ ){

					lineNumber.innerHTML += i + 1 + "<br>";

				}

			}

			lineNumber.scrollTop = editor.scrollHeight;
			
		})
		
	}

	View.blurFromAll = function(){

		for( var i = 0; i < document.getElementsByTagName( "input" ).length; i++ ){ 

			document.getElementsByTagName( "input" )[ i ].blur();

		}

		for( var i = 0; i < document.getElementsByTagName( "select" ).length; i++ ){ 

			document.getElementsByTagName( "select" )[ i ].blur();

		}

		for( var i = 0; i < document.getElementsByTagName( "textarea" ).length; i++ ){ 

			document.getElementsByTagName( "textarea" )[ i ].blur();

		}

	}

	View.addToggle = function( name, index ){

		var self = this,
		target;

		if( index === undefined || index === null){

			target = document.getElementById( name );

		}else{

			target = document.getElementsByClassName( name )[ index ];

		}	

		target.addEventListener("click", function(){
			
			self.closeToggle( index );

			for( var i = 0, max = this.parentNode.childNodes.length; i < max; i++){

				if( this.parentNode.childNodes[ i ].className == 'item' || this.parentNode.childNodes[ i ].className == 'item-button'){
					
					if( this.parentNode.childNodes[ i ].style.display == "" || this.parentNode.childNodes[ i ].style.display == "none" ){

						this.parentNode.childNodes[ i ].style.display = "inline-block";

					}else{

						this.parentNode.childNodes[ i ].style.display = "none";

					}

				}else if( this.parentNode.childNodes[ i ].className == 'item-break' ){

					if( this.parentNode.childNodes[ i ].style.display == "" || this.parentNode.childNodes[ i ].style.display == "none" ){

						this.parentNode.childNodes[ i ].style.display = "inherit";

					}else{

						this.parentNode.childNodes[ i ].style.display = "none";

					}

				}


			}

		});
		
	}

	View.closeToggle = function( index ){

		var toggles = document.getElementsByClassName( "itemTitle" );

		for( var i = 0, max = toggles.length; i < max; i++ ){
			
			if( index != i ){

				for( var j = 0, maxx = toggles[ i ].parentNode.childNodes.length; j < maxx; j++){

					if( toggles[ i ].parentNode.childNodes[ j ].className == 'item' || toggles[ i ].parentNode.childNodes[ j ].className == 'item-button' ||  toggles[ i ].parentNode.childNodes[ j ].className == 'item-break'){

						toggles[ i ].parentNode.childNodes[ j ].style.display = "none";

					}

				}

			}			
			
		}

	}

	/**
	*
	*	@param {string} param.name - The name of a form.
	*	@param {Object} param.inputs - An array that contains object literals describing the input fields for the form.
	*	@param {string} param.inputs.name - The name of the input.
	*	@param {string} param.inputs.type - The type of the input.
	*	@param {string} param.inputs.id   - The id of the input.
	*	@param {ViewSegment} param.parent - The parent View Segment of the form.
	*/
	View.makeFormForDialog = function( param ){

		var form 	   = View.createElement({ type: "form", parent: param.parent }),
		name 		   = View.createElement({ type: "legend", name: param.name, parent: form }),
		inputContainer = View.createElement({ type: "li", parent: form });

		param.inputs.forEach( function( element, index ){

			var type;

			if( element.type == "custom" ){

				inputContainer.appendChild( element.node );

			}else{

				if( element.type == "text" || element.type == "password" ){

					type = "input";

				}else if( element.type == "textarea" ){

					type = "textarea";

				}else if( element.type == "select" ){

					type = "select";

				}

				View.createElement({

					type: "label",
					name: element.name,
					parent: inputContainer

				})

				var input = View.createElement({

					type: type,
					id: element.id,
					parent: inputContainer 

				})

				if( element.type == "password" ){

					input.set({ "type": "password" });

				}

			}
			
		});
		
	}

	View.combineToArray = function( a, b ){

		return [].concat( Array.prototype.slice.call( a ), Array.prototype.slice.call( b ) );
	}

	View.getBody = function(){

		return new ViewSegment({

			node: document.body

		});

	}

	/**	
	*	@param {string} A name of node id or class with their identifier.
	*	@return {HTMLElement}
	*/
	View.get = function( name ){

		if( name[ 0 ] == '.' ){

			var className = name.substring( 1, name.length ),
			nodes         = document.getElementsByClassName( className ),
			viewSegments  = [];

			for( var i = 0, max = nodes.length; i < max; i++ ){

				viewSegments[ i ] = new ViewSegment({ 

					node:      nodes[ i ], 
					id:        nodes[ i ].getAttribute( "id" ),
					className: className

				});

			}

			return viewSegments;


		}else if( name[ 0 ] == '#' ){

			var id = name.substring( 1, name.length ),
			node   = document.getElementById( id );
			
			if( node ){

				return new ViewSegment({ 

					node:      node, 
					id:        id,
					className: node.getAttribute( "class" )

				});

			}else{

				return null;

			}		

			

		}else{

			var nodes    = document.getElementsByTagName( name ),
			viewSegments = [];

			for( var i = 0, max = nodes.length; i < max; i++ ){

				viewSegments[ i ] = new ViewSegment({ 

					node:      nodes[ i ], 
					id:        nodes[ i ].getAttribute( "id" ),
					className: nodes[ i ].getAttribute( "class" )

				});

			}

			return viewSegments;

		}
		

	}

	View.createTable = function( param ){

		if( param.table ){

			return new ViewTable({

				table: param.table

			})

		}

		return new ViewTable({

			tableData: param.tableData,
			parent: param.parent

		});

	}

	View.createElement = function( param ){

		var node = document.createElement( param.type );


		if( param.name !== undefined ){

			node.appendChild( document.createTextNode( param.name ) );

		}

		if( param.parent !== undefined ){

			param.parent.node.appendChild( node );

		}

		if( param.innerHTML !== undefined ){

			node.innerHTML = param.innerHTML;

		}

		if( param.id !== undefined ){

			node.setAttribute( "id", param.id );

		}

		if( param.class !== undefined ){

			node.setAttribute( "class", param.class );

		}

		return new ViewSegment({

			node: node,
			className: node.getAttribute( "class" ),
			id: node.getAttribute( "id" )

		});

	}

	return View.init();

}()



