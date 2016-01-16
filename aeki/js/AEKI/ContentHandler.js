/**
* 	ContentHandler is responsible for populating content inputs on the content view.
*/
var ContentHandler = function(){
	
	var ContentHandler = {}, tags = [];
	
	/**
	* ContentHandler
	* @constructs
	*/
	ContentHandler.init = function(){

		this.createContentHandler();

		return ContentHandler;

	}

	/**
	*	Create Content Handler
	*/
	ContentHandler.createContentHandler = function(){
	
		var self 		= this,
		contentMenu		= document.getElementById( "contentMenu" ),
		table 			= document.createElement( "table" ),
		row 			= table.insertRow(),
		saveButton 		= document.createElement("button"),
		saveButtonTitle = document.createTextNode( "SAVE CONTENT" );

		row.insertCell().setAttribute("class", "contentSpace");
		row.insertCell().setAttribute("class", "contentBox");
		row.insertCell().setAttribute("class", "contentTag");

		saveButton.setAttribute("id", "saveContent");
		saveButton.appendChild( saveButtonTitle );

		saveButton.addEventListener("click", function( event ){

			self.saveContent();

			event.preventDefault();

		});

		var data = row.insertCell();
		data.setAttribute("class", "contentTagInput");
		data.appendChild( saveButton );
		contentMenu.appendChild( table );

	}

	ContentHandler.getTags = function(){

		return tags;

	}

	/**
	*	Create Content Handler
	*/
	ContentHandler.saveContent = function(){

		var contentTagInputs = document.getElementsByClassName( "contentTagInput" ),
		contentTagInputIndex = 0,
		spaces 				 = Controller.getOffice().getSpaces();

		for( var i = 0, max = spaces.length; i < max; i++ ){
			
			for( var j = 0, maxx = spaces[ i ].getBoxes().length; j < maxx; j++ ){
				
				if( spaces[ i ].getBoxes()[ j ].getTag() !== undefined){

					for( var k = 0, maxxx = spaces[ i ].getBoxes()[ j ].getTag().getNumberOfContents(); k < maxxx; k++ ){
							
						if( contentTagInputs[ contentTagInputIndex ].childNodes[ 0 ] !== undefined ){

							spaces[ i ].getBoxes()[ j ].getTag().setContents( k , contentTagInputs[contentTagInputIndex].childNodes[0].value );								
							contentTagInputIndex++;

						}
																	
					}
					
				}
				
			}

		}

	}

	ContentHandler.createInput = function( boxRow, value ){

		var tagInputData = boxRow.insertCell(),
		tagInput 		 = document.createElement( "input" );

		tagInputData.setAttribute( "class", "contentTagInput" );

		if( value !== undefined ){

			tagInput.value = value;

		}

		tagInput.addEventListener( "focus", function(){				

			KeyEvent.setEnterCallback( ContentHandler.saveContent  );	

		});
		
		tagInputData.appendChild( tagInput )		

	}

	ContentHandler.createDescription = function( boxRow, value ){

		var tagInputData = boxRow.insertCell(),
		tagInput 		 = document.createElement( "div" );

		tagInputData.setAttribute( "class", "contentTagInput" );

		if( value !== undefined ){

			tagInput.value = value;

		}


		
		tagInputData.appendChild( tagInput )		

	}

	ContentHandler.createTextarea = function( boxRow, value ){

		var tagInputData = boxRow.insertCell(),
		tagInput 		 = document.createElement( "textarea" );


		tagInputData.setAttribute( "class", "contentTagInput" );

		if( value !== undefined ){

			tagInput.value = value;

		}

		tagInputData.addEventListener( "mousedown", function(){				
			
			KeyEvent.setEnterCallback( function(){} );	
		});

		tagInputData.appendChild( tagInput )		

	}

	ContentHandler.createFileInput = function( boxRow, value ){

		var tagInputData = boxRow.insertCell(),
		tagInput 		 = document.createElement( "input" ),
		fileButton		 = document.createElement( "button" ),
		fileButtonTitle  = document.createTextNode( "ASSET" );


		tagInputData.setAttribute( "class", "contentTagInput" );
		tagInput.setAttribute(     "class", "file");
		fileButton.setAttribute(   "class", "fileButton");

		if( value !== undefined ){

			tagInput.value = value;

		}

		fileButton.appendChild( fileButtonTitle );
		fileButton.addEventListener( "click", function( event ){

			KeyEvent.setEnterCallback( ContentHandler.saveContent  );	

			AssetList.updateAssetList();
	    				  
			Dialog.popUpDialogBox( 1 );

			Dialog.manageAsset();
			Dialog.setOkFunction( function(){

				tagInput.value = Buffer.getCurrentAsset();
				AssetList.addAssetsInUse( Buffer.getCurrentAsset() );
				
			});	

			Dialog.setCancelFunction();

		})

		tagInputData.appendChild( tagInput );
		tagInputData.appendChild( fileButton );

	}

	ContentHandler.updateEditor = function( ) {

		var contentEditor = document.getElementById( "content" ),
		tagCounter = 0;
		spaces = Controller.getOffice().getSpaces();

		contentEditor.innerHTML = "";

		// Reset tags
		tags = [];

		var table = document.createElement( "table" );


		for( var i = 0, max = spaces.length; i < max; i++ ){

			var spaceRow = table.insertRow(),
			spaceData = spaceRow.insertCell();

			spaceData.setAttribute( "class", "contentSpace" );
			spaceTitleNode = document.createElement( "h1" );
			spaceTitleTextNode = document.createTextNode( spaces[ i ].getAttribute().spaceId );

			spaceTitleNode.appendChild( spaceTitleTextNode );
			spaceData.appendChild( spaceTitleNode );

			// empty td
			this.insertDumbCell({ row: spaceRow, repeat: 4 });

			var boxes = spaces[ i ].getBoxes();

			for( j = 0, maxx = boxes.length; j < maxx; j++ ){

				if( boxes[ j ].getTag() !== undefined ){

				var boxRow = table.insertRow();				

				// empty td
				boxRow.insertCell();

				var boxData  = boxRow.insertCell();
				boxData.setAttribute( "class", "contentBox" );


				var boxTitleNode = document.createElement( "h1" ),
				boxTitleTextNode = document.createTextNode( boxes[ j ].getAttribute().boxId );

				boxTitleNode.appendChild( boxTitleTextNode );
				boxData.appendChild( boxTitleNode )

				if( boxes[ j ].getTag().getTitles() ){

					for( k = 0, maxxx = boxes[ j ].getTag().getTitles().length; k < maxxx; k++ ){

						if( k == 0 ){

							var tagData = boxRow.insertCell();
							tagData.setAttribute( "class", "contentTag" );

							var tagTitle 	 = document.createElement( "h3" ),
							tagTitleTextNode = document.createTextNode( boxes[ j ].getTag().getTitles()[ k ] );

							tagTitle.appendChild( tagTitleTextNode );
							tagData.appendChild( tagTitle );

							if( boxes[ j ].getTag().getInputType()[ k ] === "line" ){

								ContentHandler.createInput( boxRow, boxes[ j ].getTag().getContents()[ k ] );

							}else if( boxes[ j ].getTag().getInputType()[ k ] === "paragraph" ) {

								ContentHandler.createTextarea( boxRow, boxes[ j ].getTag().getContents()[ k ] );

							}else {

								ContentHandler.createFileInput( boxRow, boxes[ j ].getTag().getContents()[ k ] );								

							}
							
							var description = TagSet.getDefinitions()[ boxes[ j ].getTag().getTagType() ].descriptions[k];

							if( TagSet.getDefinitions()[ boxes[ j ].getTag().getTagType() ].descriptions ){

								var descriptionCell = boxRow.insertCell();
								tagData.setAttribute( "class", "contentTag" );

								var infoIcon = document.createElement( "img" );
								infoIcon.setAttribute( "src", "./img/infoIcon.png" );

								descriptionCell.appendChild( infoIcon );

							}

						}else{

							var tagRow = table.insertRow();							
							this.insertDumbCell({ row: tagRow, repeat: 2 });

							var tagData 	 = tagRow.insertCell(),
							tagTitle 		 = document.createElement( "h3" ),
							tagTitleTextNode = document.createTextNode( boxes[ j ].getTag().getTitles()[ k ] );

							tagTitle.appendChild( tagTitleTextNode );
							tagData.appendChild( tagTitle );

							if( boxes[ j ].getTag().getInputType()[ k ] === "line" ){

								ContentHandler.createInput( tagRow, boxes[ j ].getTag().getContents()[ k ] );

							}else if( boxes[ j ].getTag().getInputType()[ k ] === "paragraph" ) {

								ContentHandler.createTextarea( tagRow, boxes[ j ].getTag().getContents()[ k ]);

							}else {

								ContentHandler.createFileInput( boxRow, boxes[ j ].getTag().getContents()[ k ] );								

							}

							if( k ==  maxxx - 1){

								tagRow.style.marginBottom = "10px";
							}

						}

						tags.push( boxes[ j ].getTag() );
						
					}

				}else{

					// console.log( boxRow )
					// boxRow.insertCell().setAttribute( "class", "contentTag" );
					// boxRow.insertCell().setAttribute( "class", "contentTagInput" );


				}
			}

			}

		}
		
		contentEditor.appendChild( table );		
		
	}

	ContentHandler.insertDumbCell = function( param ){

		for( var i = 0, max = param.repeat; i < max; i++ ){

			param.row.insertCell();
			
		}
		
	}	

	return ContentHandler.init();

}();

