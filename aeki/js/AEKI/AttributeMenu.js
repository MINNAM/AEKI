/**
*	AttributeMenu is responsible for handling Attribute Menu for Office, Space, and Box objects.
*/
var AttributeMenu = function(){

	var AttributeMenu = {},	
	inputState        = 0; // 0 = container( office , space, box ), 1 = style

	/**
	*	AttributeMenu
	*	@constructs
	*/
	AttributeMenu.init = function(){
		
		this.switchAttribute( 0 );
		this.updateTagList();

		return AttributeMenu;

	}

	/**
	*	Create container for style attribute inputs.
	*	@param {string} name - A name for style categories such as "Positioning", "Display & Box Model", etc.
	*/
	AttributeMenu.createStyleAttributeContainer = function( name ){

		var styleAttributeContainer = View.get( "#styleAttributeContainer" ),		
		styleTypeContainer 		    = View.createElement({ 

			type:      "li", 
			parent:    styleAttributeContainer,
			innerHTML: "<div class = 'styleAttributeIcon'><img src = 'img/icon_side.png'/><img style = 'display:none;'src = 'img/icon_down.png'/></div>"

		}),
		styleTypeLegend = View.createElement({ 

			type:      "legend", 
			parent:    styleTypeContainer, 
			name:      name.toUpperCase(), 
			className: "styleLegend" 

		}),
		childContainer	= View.createElement({
		
			type: "ol",
			parent: styleTypeContainer

		});					
		
		return childContainer;

	}

	/**
	*	Create style attribute inputs in a style attribute container.
	*	@param {HTMLElement} parent - A style attribute container
	*	@param {string} name - A name for specific style attributes such as "Width", "Background", "Margin", etc.
	*	@param {string} type - A type of an input
	*	@param {string} options - Options if input type is a select input
	*/
	AttributeMenu.createStyleAttributeChild = function( parent, name, type , options ){

		var container = View.createElement({ 

				type: "li", 
				parent: parent 

		}),		
		label         = View.createElement({ 

				type: "label", 
				name: name.toUpperCase(), 
				parent: container 

		}),
		classNames = "style" + Global.util.upperFirstCase( name ) + " styleInput ",
		input,
		button;

		if( type == "text" ){

			input = View.createElement({ 

				type: "input", 
				parent: container 

			});

			classNames += "styleTextInput";

		}else if( type == "select") {

			input = View.createElement({ 

				type: "select", 
				parent: container 

			});

			for( var i = 0, max = options.length; i < max; i++ ){
				
				var value = options[ i ].childNodes[ 0 ].nodeValue;
				input.node.options[ i ] = new Option( value, value );

			}
			
			classNames += "styleSelectInput";
			
		}else if( type == "asset" ) {
			
			var button = View.createElement({ 

				type: "button", 
				parent: container,
				name: "A"

			}),
			input      = View.createElement({ 

				type: "input", 
				parent: container 

			});			

			button.addEventListener( "click", function(){

				AssetList.updateAssetList();
	    				  
				Dialog.popUpDialogBox( 1 );
				Dialog.manageAsset();
				Dialog.setOkFunction( function(){

					input.node.value = Buffer.getCurrentAsset();
					AssetList.addAssetsInUse( Buffer.getCurrentAsset() );

					if( Buffer.getCurrentBox() != null ){

						AttributeMenu.saveStyle();
						AttributeMenu.saveBox();

					}else{

						AttributeMenu.saveStyle();
						AttributeMenu.saveSpace();
						
					}

				});

				Dialog.setCancelFunction();

			});			

			classNames += "styleSpecialInput";
			
		}else if( type == "color" ){

			var button = View.createElement({ 

				type: "button", 
				parent: container,
				name: "C"

			}),
			input = View.createElement({ 

				type: "input", 
				parent: container 

			});

			button.addEventListener( "click", function(){				

				ColorPalette.RGBtoIndividual( input.value() );

				Dialog.popUpDialogBox();			    		
				Dialog.setOkFunction( Dialog.colorPalette( input ) );
				Dialog.setCancelFunction();

			});	
			
			classNames += "styleSpecialInput";

		}

		input.set({ class: classNames });		
		
		if( button ){

			button.set({ class: "styleSpecialbutton" });
			button = undefined;

		}

	}

	AttributeMenu.createEventAttributes = function( eventAttributes ){
		
		var eventAttributeContainer = View.get( "#eventAttributes" ),
		attributeContainer 			= View.createElement({ type: "ol", parent:  eventAttributeContainer }),
		createAttributeInput        = function( _name ){

			var itemContainer 			= View.createElement({ type: "li", parent: attributeContainer }),
			itemLabel 					= View.createElement({ type: "label", name: _name.toUpperCase(), parent: itemContainer }),
			item     					= View.createElement({ type: "select", id: "event" + Global.util.upperFirstCase( _name ), class: "containerInput", parent: itemContainer });

		}

		for( var i = 0, max = eventAttributes.length; i < max; i++ ){

			createAttributeInput( eventAttributes[ i ] );

		}

	}

	/**
	*	A flag for key command to pass
	*/
	AttributeMenu.isInputOnFocus = false;

	/**
	*	Method that sets AttributeMenu.isInputOnFocus.
	*	If any of style inputs are focused, KeyEvent.enterState 
	*	is set to method that corresponds with style attribute. In this case, 
	*	save style on enter.
	*/
	AttributeMenu.setInputState = function(){

		var containerInputs = View.get( ".containerInput" ),
		styleInputs 		= View.get( ".styleInput" ),
		self 				= this;

		for( var i = 0; i < containerInputs.length; i++ ){

			containerInputs[ i ].addEventListener( "focus", function(){				


				if( Buffer.getCurrentBox() != null ){

					KeyEvent.setEnterCallback( function(){

						AttributeMenu.saveStyle();
						AttributeMenu.saveBox();

					})

				}else{

					KeyEvent.setEnterCallback( function(){

						AttributeMenu.saveStyle();
						AttributeMenu.saveSpace();

					})

				}
				
				AttributeMenu.isInputOnFocus = true;

			});

			containerInputs[ i ].addEventListener( "blur", function(){				

				AttributeMenu.isInputOnFocus = false;

			});			

		}

		for( var i = 0; i < styleInputs.length; i++ ){
			

			styleInputs[ i ].addEventListener( "focus", function(){



				if( Buffer.getCurrentBox() != null ){

					console.log( Buffer.getCurrentBox() );
					
					KeyEvent.setEnterCallback( function saveBox(){

						AttributeMenu.saveStyle();
						AttributeMenu.saveBox();

					})

				}else{

					KeyEvent.setEnterCallback( function saveSpace(){

						AttributeMenu.saveStyle();
						AttributeMenu.saveSpace();

					})

				}

				AttributeMenu.isInputOnFocus = true;

			});

			styleInputs[ i ].addEventListener( "blur", function(){				

				AttributeMenu.isInputOnFocus = false;

			});

		}

	}

	/**
	*	@returns {int} inputState
	*/
	AttributeMenu.getInputState = function(){

		return inputState;

	}

	/**
	*	Save attribute for a Space object.
	*/
	AttributeMenu.saveSpace = function(){		

		var spaceId          = View.get( "#spaceId" ).value(),
		spaceClass           = View.get( "#spaceClass" ).value(),
		spaces               = Controller.getOffice().getSpaces(),
		space 		         = Buffer.getCurrentSpace(),
		tempSpaceStyle       = StyleSet.getDefinition()[ "#" + space.getAttribute().spaceId ],
		spaceStyleFromParent = StyleSet.getDefinition()[ "#office" ][ "#" + space.getAttribute().spaceId ];		

		if( space.getAttribute().spaceId != spaceId ){

			for( var i = 0, max = spaces.length; i < max; i++ ){

				if( spaces[ i ].getAttribute().spaceId == spaceId ){

					Dialog.popUpDialogBox();			    		
		    		Dialog.setOkFunction();
					Dialog.setCancelFunction();
					Dialog.error( "Space ID must be unique. '" + spaceId + "' already exists. ");

					View.get( "#spaceId" ).val( space.getAttribute().spaceId );

					return;
				}

			}

		}



		/* Check if style is already defined and if it is delete previous style. */
		if( ( tempSpaceStyle || spaceStyleFromParent ) && ( space.getAttribute().spaceId != spaceId ) ){
			
			spaceStyleFromParent.setKey( "#" + spaceId );
			StyleSet.addDefinition( "#office", "#" + spaceId, spaceStyleFromParent );
						
			for( var key in tempSpaceStyle ){

				tempSpaceStyle[ key ].setParent( "#" + spaceId );
				StyleSet.addDefinition( "#" + spaceId, tempSpaceStyle[ key ].getKey(), tempSpaceStyle[ key ] );

			}

			StyleSet.deleteStyle( "#office",  "#" + space.getAttribute().spaceId );

		}
		
		space.setAttribute( spaceId, spaceClass );

		Controller.updateBibleList({

			index: space.getIndex(), 
			type: "space" 

		});

		ContentHandler.updateEditor();				
		StyleSelector.updateStyleSelector( "space", space );
		Buffer.getSaveIndicators()[ 2 ].animate() // Blink save indicator when saved.
		
	}

	/**
	*	Save attribute for a Box object.
	*/
	AttributeMenu.saveBox = function(){

		var boxId 	 = View.get( "#boxId" ).value(),
		boxClass	 = View.get( "#boxClass" ).value(),
		boxType		 = View.get( "#boxType" ).value(),
		boxTag		 = View.get( "#boxTag" ).value(),
		currentSpace = Buffer.getCurrentSpace(),
		box          = Buffer.getCurrentBox();
		
		/*
		*	If there is a same id for the box, renames it.
		*/
		if( ( box.getSpace().getBoxIds().indexOf( boxId ) > -1 ) && boxId != box.getAttribute().boxId ) {

			var input   = 0, 
			ids 	    = box.getSpace().getBoxIds(),
			validate    = false,  
			input 	    = 0, 
			validatedId = 0;	    		

			while( !Global.util.isItUnique( ids, boxId + input ) ){
									
				validatedId = ++input;
				
			}
			
			boxId = boxId + "-" + validatedId;
			document.getElementById( "boxId" ).value = boxId;

		}

		if( boxId != box.getAttribute().boxId ){

			var spaceId =  box.getSpace().getAttribute().spaceId,
			previousBoxId = box.getAttribute().boxId;

			StyleSet.duplicateDefinition( "#" + spaceId, "#" + previousBoxId, "#" + boxId );

			for( var key in StyleSet.getDefinition()[ "#" + spaceId ] ){

				if( key.indexOf( previousBoxId + " " ) > -1 ){

					StyleSet.duplicateDefinition( "#" + spaceId, key, key.replace( previousBoxId + " ", boxId + " " ) );					

				}
				
			}

			StyleSet.deleteStyle( "#" + spaceId, "#" + previousBoxId );
			
		}
				
		box.setType( boxType );
		box.setAttribute({ 

			boxId: boxId, 
			boxClass: boxClass, 
			boxTag: boxTag

		});

		Controller.updateBibleList({ 

			index: box.getIndex(), 
			type: "box", 
			parentIndex: currentSpace.getIndex() 

		});
	
		ContentHandler.updateEditor();		
		StyleSelector.updateStyleSelector( "box", box, StyleSelector.getNode().selectedIndex );
		Buffer.getSaveIndicators()[ 1 ].animate() // Blink save indicator when saved.
		
		
	}

	/**
	*	Save style attribute
	*/
	AttributeMenu.saveStyle = function(){

		var styleSelector = StyleSelector.getNode(),
		parent            = styleSelector.options[ styleSelector.selectedIndex ].value,
		key   		      = styleSelector.options[ styleSelector.selectedIndex ].text,
		styleObj 		  = new Style( key , parent );

		styleObj.setStyle(); /* setStyle() sets all inputs to default or to it's style object attributes. */
		StyleSet.addDefinition( parent, styleObj.getKey(), styleObj );

	}

	/**
	*	Update tag list
	*/
	AttributeMenu.updateTagList = function(){

		var dropdownList = View.get( "#boxTag" ),
		defaultOption    = View.createElement({ type: "option" });

		if( dropdownList !== null ){

			for( var i = dropdownList.node.options.length; i >= 0; i-- ){

				dropdownList.remove( i );			
				
			}		

			defaultOption.set({

				text: "none",
				value: ""

			})		

			dropdownList.add( defaultOption );

			for( var key in TagSet.getDefinitions() ) {

				var option = View.createElement({ type: "option" });

				option.set({

					text:  key,
					value: key

				});

				dropdownList.add( option );
			  
			}

		}
		
	}

	/**
	*	Update space attribute.
	*/
	AttributeMenu.updateSpaceAttribute = function( index ){		

		var space 	   = Controller.getOffice().getSpaces()[ index ],
		spaceAttribute = space.getAttribute();		

		if( spaceAttribute != undefined){

			View.get( "#spaceId" ).value( spaceAttribute.spaceId );
			View.get( "#spaceClass" ).value( spaceAttribute.spaceClass );
			
		}else{

			View.get( "#spaceId" ).value( "" );
			View.get( "#spaceClass" ).value( "" );

		}

	}

	/**
	*	Update box attribute.
	*/
	AttributeMenu.updateBoxAttribute = function(){

		var boxAttribute = Buffer.getCurrentBox().getAttribute();
		
		if( boxAttribute !== undefined){

			View.get( "#boxId" ).value( boxAttribute.boxId );
			View.get( "#boxClass" ).value( boxAttribute.boxClass );
			View.get( "#boxType" ).value( boxAttribute.boxType );
			View.get( "#boxTag" ).value( boxAttribute.boxTag );

		}else{

			View.get( "#boxId" ).value( "" );
			View.get( "#boxClass" ).value( "" );
			View.get( "#boxType" ).value( 0 );
			View.get( "#boxTag" ).value( "" );

		}

	}

	/**
	*	Switch Attribute View.
	*	@param {int} index - 0 = Office View, 1 = Space View, 2 = Box View
	*/
	AttributeMenu.switchAttribute = function( index ){

		var spaceAttr = View.get( "#spaceAttributes" ),
		boxAttr   	  = View.get( "#boxAttributes" );


		if( index === 0 ){
			
			spaceAttr.style({ display: "inline" });
			boxAttr.style({ display: "none" });
			
			KeyEvent.setEnterCallback( function(){

				AttributeMenu.saveStyle();
				AttributeMenu.saveSpace();

			});
			
		}else{
			
			spaceAttr.style({ display: "none" });
			boxAttr.style({ display: "inline" });

			KeyEvent.setEnterCallback( function(){

				AttributeMenu.saveStyle();
				AttributeMenu.saveBox();		

			});

		}		

	}

	return AttributeMenu.init();

}();