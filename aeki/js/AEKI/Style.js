var StyleVariables = [ "position", 
					   "zIndex", 
					   "top", 
					   "right", 
					   "bottom", 
					   "left", 
					   "display", 
					   "width",
					   "height",
					   "overflow", 
					   "margin",
					   "padding", 
					   "borderTop",
					   "borderRight",
					   "borderBottom",
					   "borderLeft",
					   "color", 
					   "bg", 
					   "bg-img", 
					   "bg-size",
					   "bg-position", 
					   "fontFamily", 
					   "fontSize", 
					   "textAlign", 
					   "fontWeight", 
					   "cursor" ];

var Style = function( _key, _parent ){

	var Style = {}, 
	styleDefinitions = {},	
	key,
	parent;
	
	Style.init = function(){

		this.setKey( _key );
		this.setParent( _parent );

		for( var i = 0; i < StyleVariables.length; i++ ){

			styleDefinitions[ StyleVariables[i] ] = "";

		}
		

		return Style;

	}

	Style.setKey = function( _key ){

		key = _key;

	}

	Style.getKey = function(){

		return key;

	}

	Style.setParent = function( _parent ){

		parent = _parent;

	}

	Style.getParent = function(){

		return parent;

	}

	Style.setStyleByObject = function( param ){

		for( var i = 0; i < StyleVariables.length; i++ ){

			if( param[ StyleVariables[ i ] ] !== undefined ){

				this[ StyleVariables[ i ] ] = param[ StyleVariables[ i ] ];

			}else{

				this[ StyleVariables[ i ] ] = "";

			}
			
		}

	}

	Style.setStyle = function(){

		for( var i = 0, max = StyleVariables.length; i < max; i++ ){

			this[ StyleVariables[ i ] ] = document.getElementsByClassName( "style" + Global.util.upperFirstCase( StyleVariables[ i ] ) )[ 0 ].value;

		}		

	}

	Style.getStyles = function(){

		return styleDefinitions;

	}

	Style.toXml = function(){

		var xml = "<style parent = \"" + this.getParent() + "\" "+  "name = \"" + this.getKey() + "\">";
		
		for( var i = 0, max = StyleVariables.length; i < max; i++ )
		{
			xml += "<" + StyleVariables[ i ] + ">" + this[ StyleVariables[ i ] ] +  "</" + StyleVariables[ i ] + ">";
		}

		xml += "</style>";
		
		return xml;

	}

	return Style.init();

}

var StyleSelector = function(){

	var StyleSelector = {},
	tagNeeds = [],
	currentStyle,
	currentStyleParent,
	node = document.getElementById( "styleSelector" ),
	callback;

	StyleSelector.init = function(){

		styleSelector.addEventListener( "change", function(){

			callback();

		});

		return StyleSelector;

	}

	
	StyleSelector.getNode = function(){

		return node;

	}

	StyleSelector.setCurrentStyle = function( _currentStyle ){

		currentStyle = _currentStyle;

	}

	StyleSelector.getCurrentStyle = function(){

		return currentStyle;

	}	

	StyleSelector.setCurrentStyleParent = function( _currentStyleParent ){

		currentStyleParent = _currentStyleParent;

	}

	StyleSelector.getCurrentStyleParent = function(){

		return currentStyleParent;

	}

	StyleSelector.createSpan = function( _title, styleSelector, parent, grandParent ){

		

	}


	/**
	*	Update Style Selector
	*/
	StyleSelector.updateStyleSelector = function( type, obj, selectedIndex ){				


		switch( type ){

			case "box":
				
				var box = obj,
				boxId   = "#" + box.getAttribute().boxId,
				space   = box.getSpace(),
				spaceId = "#" + space.getAttribute().spaceId;


				for( var i = 0; i < node.options.length; i++ ) {

				  node.options[ i ] = null;

				}

				/** Style for a box */
				node.options[ 0 ] = new Option( boxId, spaceId );
				/** Style for all children */
				node.options[ 1 ] = new Option( boxId + " *", spaceId );

				var index = 2, tagSources;

				if( StyleSet.getDefinition()[ spaceId ] ){
										

					if( obj.getTag() ){

						tagSources = TagSet.gatherAllTags( obj.getTag().getSource() );

						tagSources.forEach( function( element ){

							node.options[ index++ ] = new Option( boxId + " " + element, spaceId );

						});		


					}

					if( obj.getAttribute().boxClass ){

						var boxClass = "." + obj.getAttribute().boxClass;

						/** Style for a box */
						node.options[ index++ ] = new Option( boxClass, ".Global" );
						/** Style for all children */
						node.options[ index++ ] = new Option( boxClass + " *", ".Global" );

						if( obj.getTag() ){

							tagSources = TagSet.gatherAllTags( obj.getTag().getSource() );

							tagSources.forEach( function( element ){

								node.options[ index++ ] = new Option( boxClass + " " + element, ".Global" );

							});		


						}

					}
									
					var styleObj = StyleSet.getDefinition()[ spaceId ][ boxId ];


					if( styleObj ){


						StyleSet.setStyle( styleObj );

					}else{

						StyleSet.setDefaultStyle();

					}

				}else{

					StyleSet.setDefaultStyle();

				}

				callback = function(){

					var parent  = node.options[ node.selectedIndex ].value,
					key         = node.options[ node.selectedIndex ].text,
					styleParent = StyleSet.getDefinition()[ parent ];					

					if( styleParent ){

						StyleSet.setStyle( styleParent[ key ] );

					}else{

						StyleSet.setDefaultStyle();

					}

				}

				if( selectedIndex ){
						
					node.selectedIndex = selectedIndex;
					callback();

				}				

				break;

			case "space":

				var space = obj,
				spaceId = "#" + space.getAttribute().spaceId;

				for( var i = 0; i < node.options.length; i++ ) {

				  node.options[ i ] = null;

				}

				var styleObj = StyleSet.getDefinition()[ "#office" ][ spaceId ];

				if( styleObj ){

					StyleSet.setStyle( styleObj );

				}else{

					StyleSet.setDefaultStyle();

				}


				node.options[ 0 ] = new Option( spaceId, "#office" );

				callback = function(){

					var parent = node.options[ node.selectedIndex ].value,
					key        = node.options[ node.selectedIndex ].text,
					styleObj   = StyleSet.getDefinition()[ parent ][ key ];

					if( styleObj ){

						StyleSet.setStyle( styleObj );

					}

				}

				break;

		}
	
	}

	StyleSelector.highlightSpan = function( span ){

		if( span ){

			span.style.background = Global.colors.listHighlight;

		}
		
	}

	StyleSelector.updateLook = function(){


	}

	return StyleSelector.init();

}();

var StyleSet = function(){

	var StyleSet = {},  
	styleDefinitions = {},
	imports = "";


	StyleSet.init = function(){		

		styleDefinitions[ "#office" ] = [];
		styleDefinitions[ ".Global" ] = [];

		return StyleSet;

	}

	StyleSet.addDefinition = function( parent, key, obj ){

		if(styleDefinitions[ parent ] === undefined ){

			styleDefinitions[ parent ] = {};

		}

		styleDefinitions[ parent ][ key ] = obj;		



	}

	StyleSet.getDefinition = function( parent, key ){

		if( parent !== undefined && key === undefined ){

			return styleDefinitions[ parent ];

		}else if( parent !== undefined && key !== undefined  ){
			
			return styleDefinitions[ parent ][ key ];			
		}

		return styleDefinitions;
		

	}

	StyleSet.duplicateDefinition = function( parent, key, newKey ){

		var original = styleDefinitions[ parent ][ key ],		
		temp 		 = new Style( newKey, parent )

		if( original ){

			temp.setStyleByObject( original );
			StyleSet.addDefinition( parent, newKey, temp );
			
		}

		

		for( var childKey in styleDefinitions[ key ] ){

			var originalChild = styleDefinitions[ key ][ childKey ],
			childTemp 		  = new Style( originalChild.getKey(), newKey );

			childTemp.setStyleByObject( originalChild );

			StyleSet.addDefinition( newKey, originalChild.getKey(), childTemp );


		}

		return temp;

	}

	StyleSet.setStyle = function( obj ){

		if( obj !== undefined ){

			for( var i = 0, max = StyleVariables.length; i < max; i++ ){
				
				document.getElementsByClassName( "style" + Global.util.upperFirstCase( StyleVariables[ i ] ) )[ 0 ].value = obj[ StyleVariables[ i ] ];
				

			}		
		}

	}

	StyleSet.setDefaultStyle = function(){


		for( var i = 0, max = StyleVariables.length; i < max; i++ ){

			if( StyleVariables[ i ] == "position" ){

				document.getElementsByClassName( "style" + Global.util.upperFirstCase( StyleVariables[ i ] ) )[ 0 ].value = "static";

			}else{

				document.getElementsByClassName( "style" + Global.util.upperFirstCase( StyleVariables[ i ] ) )[ 0 ].value = "" ;

			}
			
		}		

	}

	StyleSet.addStyleImport = function( styleImport ){
		
		styleImport.push( styleImport );	

	}

	StyleSet.loadDefinition = function( parent, key ){

		var objStyle; 
				

		if( parent !== undefined && key !== undefined ){

			objStyle = this.getDefinition( parent );

		}
				
		if( objStyle !== undefined ){

			

			if( objStyle[ key ] === undefined ){

				this.setDefaultStyle();



			}else{
				

				this.setStyle( objStyle[ key ] );

			}
			

		}else{

			

		}

		return objStyle;


	}

	/**
	*	Delete style
	*/
	StyleSet.deleteStyle = function( parent, target ){

		var parentStyle = this.getDefinition()[ parent ];

		for( var key in parentStyle ){

			if( parentStyle[ key ].getKey() == target || parentStyle[ key ].getKey().indexOf( target + " " ) > -1){

				delete parentStyle[ key ];

			}
			
		}
		
		if( parent == "#office" ){

			delete this.getDefinition()[ target ];
			delete this.getDefinition()[ "#office" ][ target ];

		}
				
		
	}

	/**
	*	Delete unused styles
	*/
	StyleSet.cleanStyleSet = function(){

		// var spaces = Controller.getOffice().getSpaces(),
		// count 	   = 0,
		// ids 	   = {};

		// for( var i = 0; i < spaces.length; i++ ){

		// 	ids[ "#" + spaces[ i ].getAttribute().spaceId ] = {};

		// }		

		// for( var key in StyleSet.getDefinition() ){			

		// 	if( key != ".Global" && key != "#office"){


		// 		if( !ids[ key ] ){

		// 			StyleSet.deleteStyle( key );

		// 		}

		// 	}

		// }

		// for( var key in StyleSet.getDefinition()[ "#office" ] ){			

		// 	if( !ids[ key ] ){

		// 		StyleSet.deleteStyle( key );

		// 	}			

		// }


		for( var key in StyleSet.getDefinition() ){			

			
			if( key == ".Global" ){

				for( var key2 in StyleSet.getDefinition()[ ".Global" ] ){

					console.log( key2 );

				}


			}else if( key == "#office" ){

				for( var key2 in StyleSet.getDefinition()[ "#office" ] ){

					console.log( key2 );

				}


			}else{

				console.log( key );

			}


		}


		

	}

	StyleSet.setImports = function( _imports ){

		imports = _imports.replace( "+", "%2B");
		

	}

	StyleSet.getImports = function(){

		return imports;

	}

	StyleSet.toXml = function(){


		var xml = "<styleSet>";
		xml += "<imports><![CDATA[";
		xml += this.getImports();
		xml += "]]></imports>";

		for( var parent in this.getDefinition() ){

			for( var key in this.getDefinition( parent ) ){

				xml += this.getDefinition( parent , key ).toXml();

			}
			

		}


		xml += "</styleSet>";

		return xml;

	}

	return StyleSet.init();

}();

