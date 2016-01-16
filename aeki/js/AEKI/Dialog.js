/**
*	Dialog class is responsible for behaviour of items in the menu bar.
*/
var Dialog = function(){

	var Dialog = {};
	Dialog.isDialogOpen = false;

	/**
	*	Dialog
	*	@constructs
	*/
	Dialog.init = function(){

		var self    = this,
		itemButtons = View.get( ".item-button" );


		this.switchView( 0 );

	    for( var i = 0, max = itemButtons.length; i < max; i++ ){

	    	var dataFunction = itemButtons[ i ].get( "data-function" );

	    	switch( dataFunction ){

	    		/** Global Container */

	    		case "newProject":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				XmlRequest.getFileListing( "./project/", function( response ){

							self.popUpDialogBox();			    		
				    		self.setOkFunction( self.newProject( response ) );
							self.setCancelFunction();

						});
			    		

			    	});

	    			break;

	    		case "openProject":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				XmlRequest.getFileListing( "./project/", function( response ){

							self.popUpDialogBox();			    		
				    		self.setOkFunction( self.openProject( response ) );
							self.setCancelFunction();

						});
			    		

			    	});

	    			break;

	    		case "importProject":

	    			itemButtons[ i ].addEventListener( 'click' , function(){	    				

						self.popUpDialogBox();			    		
			    		self.setOkFunction( self.importProject() );
						self.setCancelFunction();
									    		

			    	});

	    			break;

	    		case "saveProject":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();			    		
			    		self.setOkFunction( self.saveProject() );
						self.setCancelFunction();

			    	});

	    			break;

	    		case "saveProjectAs":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				XmlRequest.getFileListing( "./project/", function( response ){

							self.popUpDialogBox();			    		
				    		self.setOkFunction( self.saveProjectAs( response ) );
							self.setCancelFunction();

						});			    		

			    	});

	    			break;

	    		case "exportProject":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				
						self.popUpDialogBox();			    		
			    		self.setOkFunction( self.exportProject() );
						self.setCancelFunction();

						
			    	});

			    	break;


	    		case "buildProject":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();			    		
			    		self.setOkFunction( self.buildProject() );
						self.setCancelFunction();

			    	});

	    			break;

	    		case "buildProjectAs":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();			    		
			    		self.setOkFunction( self.buildProjectAs() );
						self.setCancelFunction();

			    	});

	    			break;

	    		case "manageOffice":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.switchView( 0 );
			    		
			    	});
			    	
	    			break;

	    		case "manageContent":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				ContentHandler.updateEditor();
			    		self.switchView( 1 );
			    		
			    	});
			    	
	    			break;

	    		/** OFFICE Container */
	    		case "editMeta": 

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.editMeta() );
						self.setCancelFunction();

			    	});

	    			break;


	    		case "editHead": 

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();

			    		self.setOkFunction( self.editHead() );
						self.setCancelFunction();

			    	});

	    			break;


	    		/** SPACE Container */
	    		case "addSpace":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.addSpace() );
						self.setCancelFunction();

			    	});

	    			break;

	    		case "duplicateSpace":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.duplicateSpace() );
						self.setCancelFunction();

			    	});

	    			break;

	    		case "resizeSpace":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.resizeSpace() );
						self.setCancelFunction();

			    	});

	    			break;

	    		case "deleteSpace":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.deleteSpace() );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    		case "deleteAllSpace":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.deleteAllSpace() );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    		case "editStyleImport":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.editStyleImport() );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    		case "deleteAllStyle":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.deleteAllStyle() );
						self.setCancelFunction();

			    	});
			    	
	    			break;


	    		/** BOX Container */

	    		case "addTag":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.addTag() );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    		case "manageTag":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.manageTag() );
						self.setCancelFunction();

			    	});
			    	
	    			break;


	    		case "rearrangeBox":

	    			itemButtons[ i ].addEventListener( 'click' , function(){
						
						Buffer.getCurrentBox().rearrange();
						Buffer.setBoxToRearrange();

						View.closeToggle( 2 );
						
			    	});

	    			break

	    		case "deleteBox":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.deleteBox() );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    		case "deleteAllBox":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.deleteAllBox() );
						self.setCancelFunction();

			    	});
			    	
	    			break;
	    		/** ASSET */

	    		case "uploadAsset":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();
			    		self.setOkFunction( self.uploadAsset() );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    		case "manageAsset":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				AssetList.updateAssetList( function(){

	    					Dialog.popUpDialogBox( 1 );
							Dialog.setOkFunction( Dialog.manageAsset() );
							Dialog.setCancelFunction();

	    				});	    						

			    	});
			    	
	    			break;


	    		/** SCRIPT */

	    		case "editScript":

	    			itemButtons[ i ].addEventListener( 'click' , function(){



	    					Dialog.popUpDialogBox( 0 );
							Dialog.setOkFunction( Dialog.editScript() );
							Dialog.setCancelFunction();

			    	});
			    	
	    			break;


	    		/** USER */


	    		case "changePassword":

	    			itemButtons[ i ].addEventListener( 'click' , function(){


	    					Dialog.popUpDialogBox( 0 );
							Dialog.setOkFunction( Dialog.changePassword() );
							Dialog.setCancelFunction();
 						

			    	});
			    	
	    			break;

	    		case "sendInvitation":

	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    					Dialog.popUpDialogBox( 0 );
							Dialog.setOkFunction( Dialog.sendInvitation() );
							Dialog.setCancelFunction();

			    	});
			    	
	    			break;


	    		case "logout":


	    			itemButtons[ i ].addEventListener( 'click' , function(){

	    				AssetList.updateAssetList( function(){

	    					XmlRequest.logout();

	    				});	    						

			    	});
			    	
	    			break;	    			


	    		default:

	    			itemButtons[ i ].addEventListener( 'click' , function(){

			    		self.popUpDialogBox();

			    		var callback = self.error();
			    		self.setOkFunction( callback );
						self.setCancelFunction();

			    	});
			    	
	    			break;

	    	}
	    	
	    	
	    }

	    return Dialog;

	}

	/**
	*	Add event for dragging a dialog box.
	*/
	Dialog.onDrag = function( bar ){
		
		var container = this.dialogContainer, x1, y1, x2, y2, 
		selected 	  = null;

		bar.node.onmousedown = function( event ){

			selected = container;
			x1 = x2 - container.get( "offsetLeft" );
			y1 = y2 - container.get( "offsetTop" );

		}

		document.onmouseup = function( event ){		

			selected = null;

		}

		document.onmousemove = function( event ){

			x2 = document.all ? window.event.clientX : event.pageX;		
	    	y2 = document.all ? window.event.clientY : event.pageY;

			if( selected != null ){

				var posX = x2 - x1,
					posY = y2 - y1;

				if(  posX >= 0){

					container.style({ left : ( x2 - x1 ) + 'px' });

				}else{

					container.style({ left : '0px' });
					

				}
		    	
		    	if(  posY >= 0 ){

		    		container.style({ top : ( y2 - y1 ) + 'px' });
					

				}else{

					containerstyle({ top : '0px' });					

				}		    	
		        
			}

		}

	}
	

	/**
	*	Pop up a dialog box. This is a fundamental method for all items in the menu bar.
	*	@param {string} boxType - A type of a dialogBox. Currently "Medium" or "Large".
	*/
    Dialog.popUpDialogBox = function( boxType ){

    	/* For blocking shortcuts in KeyEvent class */
    	Dialog.isDialogOpen = true;    	

    	/* If there is an opened dialog box, close that box. */
		if( this.dialogBox != undefined){

			this.closeDialogBox();

		}		

		this.dialogContainer = View.createElement({ type: "div", id: "dialogBoxContainer" });		
		
		var boxSize = "Small";

		this.dialogContainer.style({ width: "500px" });

		if( boxType == 1){
			
			this.dialogContainer.style({ width: "900px", height: "385px" });
			boxSize = "Medium";

		}else if( boxType == 2 ){

			this.dialogContainer.style({ width: "900px" });
			boxSize = "Large";

		}

		/* A window bar for a dialog box.*/
		var bar = View.createElement({ type: "div", id: "dialogBar", parent: this.dialogContainer });
		this.onDrag( bar );

		this.dialogBox     = View.createElement({ type: "div", id: "dialogBox" + boxSize, parent: this.dialogContainer });
		this.dialogContent = View.createElement({ type: "div", id: "dialogContent", parent: this.dialogBox });
		
		/* OK & Cancel button.*/
		var buttonList    = View.createElement({ type: "li", class: "dialogButtonHolder", parent: this.dialogBox });		
 
		this.dialogOk     = View.createElement({ type: "button", id: "dialogOk", name: "OK", parent: buttonList }); 
		this.dialogCancel = View.createElement({ type: "button", id: "dialogCancel", name: "CANCEL", parent: buttonList }); 		

		View.getBody().appendChild( this.dialogContainer);

		this.dialogContainer.style({ left: ( Global.mainContainer.width / 2 ) - ( this.dialogContainer.get( "offsetWidth" ) / 2 ) + "px" });
		this.dialogContainer.style({ top  : ( (  window.innerHeight / 4 ) ) + "px" });
		
				
	}

	/**
	*	Close a dialog box.
	*/
	Dialog.closeDialogBox = function(){

		if( this.dialogContainer.node.parentNode !== null ){

			this.dialogContainer.delete();
			Dialog.isDialogOpen = false;

		}
			
	}

	/**
	*	Assign a callback function to the OK button.
	*/
	Dialog.setOkFunction = function( callback ){
		
		try{
			var self = this,
			confirmCallback = function(){

				if( callback ){

					if( callback() == false ){

					}else{

						self.closeDialogBox();
						View.closeToggle( -1 );	

					}

				}

				
				
			}

			/** To confirm by enter key */
			KeyEvent.setEnterCallback( confirmCallback );

			this.dialogOk.addEventListener( 'click', function( event ){
				
				confirmCallback();

			});

		}catch( error ){

			console.log( error );

		}
		
	}

	/**
	*	Assign a callback function to the Cancel button.
	*/
	Dialog.setCancelFunction = function(){

		var self = this;

		this.dialogCancel.addEventListener( 'click', function( event ){

			self.closeDialogBox();
			event.preventDefault();

		});

	}

	Dialog.addValidator = function(){

		var validateHolder = View.createElement({ type: "div", id: "validateHolder", parent: this.dialogContent }),
		validator 		   = View.createElement({ type: "div", id: "validator",      parent: validateHolder });

		validator.style({ "margin": 0, "width": "73%", "padding": "0 0.5% 0 .5%" });

		return validator;

	}

	/** Callback methods for items*/

	Dialog.newProject = function( fileList ) {	

		View.makeFormForDialog({

			name: "NEW PROJECT",
			inputs: [
				{
					name: "PROJECT NAME",
					type: "text",
					id: "textProjectName"
				}

			],

			parent: this.dialogContent

		});

		var validator = this.addValidator();


		return function(){

			var projectName = View.get( "#textProjectName" ).value();

			if( Global.util.isItUnique( fileList, projectName + ".xml", "name" ) ){

				XmlRequest.sendXMLDoc( "create", projectName + ".xml" );
				return true;

			}else{

				validator.setInnerHTML( "'" + projectName + ".xml' exists." );
				return false;

			}
			

		}

	};

	Dialog.openProject = function( response ) {

		this.dialogContent.setInnerHTML( "OPEN PROJECT" );

		/* Sorting by modified date */
		response.sort( function( a, b ){

			return a.date < b.date;

		});		

		var fileContainerHeader = View.createElement({ type: "div", parent: this.dialogContent, id: "fileContainerHeader" }),
		headerTable 		    = View.createTable({ parent: fileContainerHeader }),
		/* Inserting headers */
		header 					= headerTable.insertRow(

			[
				{ 
					name: "FILE NAME",
					width: 0.5
				},
				{ 
					name: "DATE MODIFIED",
					width: 0.4,
				},
				{ 
					name: "DELETE",
					width: 0.1
				}
			]

		);

		fileContainerHeader.style({ "width": "100%" });	

		var fileTableContainer = View.createElement({ type: "div", parent: this.dialogContent }),
		fileTable 			   = View.createTable({ parent: fileTableContainer }),
		drawDeleteButton	   = function( context, isHover ){

	    	context.clearRect( 0, 0, 50, 50 );

	    	if( isHover ){

				context.beginPath();
				context.moveTo( 5, 5 );
				context.lineTo( 15, 15);
				context.moveTo( 15, 5 );
				context.lineTo( 5, 15);
				context.lineWidth = "2";
				context.strokeStyle = "#ED4545";
				context.stroke();
				context.closePath();

			}else{

				context.beginPath();
				context.moveTo( 5, 5 );
				context.lineTo( 15, 15);
				context.moveTo( 15, 5 );
				context.lineTo( 5, 15);
				context.lineWidth = "2";
				context.strokeStyle = "white";				
				context.stroke();
				context.closePath();
			}

	    }

	    fileTableContainer.style({ display: "inline-block", width: "100%", height: "300px", overflow: "scroll" });

	    var index = 0, /* Index for counting files */
	    selectedFile = "";

		for( var key in response ){
			
			if( response[ key ].name.indexOf(".xml") > -1 ){

				var deleteButton  = View.createElement({ type: "canvas" });

		    	deleteButton.style({ 

		    		margin: 0,
		    		width:  "20px",
		    		height: "20px"

		    	});

		    	deleteButton.set({ 

		    		height: 20,
		    		width: 20,
		    		"data-name": response[ key ].name

		    	});
		    	

				var row = fileTable.insertRow( 

					[
						{
							name: response[ key ].name,
							width: 0.5
						},
						{
							name: response[ key ].date,
							width: 0.4
						},
						{
							type: "custom",
							node: deleteButton,
							width: 0.1
						}
					]
				)

				row.style({ width: "100%" });
				row.set({ "class": "fileProjectName" });
				row.set({ "data-name": response[ key ].name });
				row.set({ "data-index": index });

				row.addEventListener( "click", function(){

					for( var i = 0; i < fileTable.length(); i++ ){

						if( i == this.getAttribute( "data-index" ) ){

							fileTable.get( i ).style({ "background": Global.colors.listHighlight });
							selectedFile = fileTable.get( i, 0 ).get( "data-name" ); /* File name */

						}else{
							
							fileTable.get( i ).style({ "background": "transparent"});

						}

					}
					
				});

				fileTable.get( index, 2 ).child()[ 0 ].addEventListener( "mouseenter", function(){

		    		drawDeleteButton( this.getContext( "2d" ), true );

		    	});

				fileTable.get( index++, 2 ).child()[ 0 ].addEventListener( "mouseleave", function(){

		    		drawDeleteButton( this.getContext( "2d" ), false );

		    	});

		    	drawDeleteButton( deleteButton.node.getContext( "2d" ), false );

			}

		}

		return function(){

			Global.util.loadProject( selectedFile.replace( ".xml", "" ) );
			

		}

	};

	Dialog.importProject = function(){

		Dialog.dialogContent.setInnerHTML( "Import " );

		var fileToImport = document.createElement( "input" );
		fileToImport.setAttribute( "type", "file" );
		fileToImport.click();

		fileToImport.addEventListener( 'change', function() { 

				var projectName = fileToImport.files[ 0 ].name.replace( "project-", "" );
				projectName.replace( ".zip" , "" );
		     	
		     	Dialog.dialogContent.setInnerHTML( "Import " + projectName + "?" );


		});

		return function(){

			  	var xmlhttp   = XmlRequest.createRequest(),
		        formData      = new FormData();

		        formData.append( "file" , fileToImport.files[ 0 ] );		    
		        
		        // Loading.show();

		        // Upload Progress
		        xmlhttp.upload.addEventListener( "progress", function( event ) {

		            var progress = parseInt( ( event.loaded / event.total * 100 ) );

		            // Loading.setProgress( progress );

		            
		        }, false);
		        

		        // Upload Finish
		        xmlhttp.onload = function(){

		            // Loading.hide();

		        }
		        
		        xmlhttp.open( "POST", "importProject.php" , true );
		        xmlhttp.send( formData );        

		}

	}

	Dialog.saveProject = function() {	

		this.dialogContent.setInnerHTML( "Project Saved" );

		return function(){

			XmlRequest.sendXMLDoc( "project" );

		}

	};

	Dialog.saveProjectAs = function( fileList ) {	

		View.makeFormForDialog({

			name: "SAVE PROJECT AS",
			inputs: [
				{
					name: "PROJECT NAME",
					type: "text",
					id: "textProjectName"
				}

			],

			parent: this.dialogContent

		});

		var validator = this.addValidator();

		return function(){

			var projectName = View.get( "#textProjectName" ).value();

			if( Global.util.isItUnique( fileList, projectName + ".xml", "name" ) ){

				XmlRequest.sendXMLDoc( "project", projectName );
				return true;

			}else{

				validator.setInnerHTML( "'" + projectName + ".xml' exists." );
				return false;

			}			

		}

	};

	Dialog.exportProject = function() {	

		this.dialogContent.setInnerHTML( "Project Exported" );
		XmlRequest.exportProject();

		

		window.open( "./exported/project-" + Global.projectName + ".zip"  );

		return function(){

		}

	};

	Dialog.buildProject = function() {	

		this.dialogContent.setInnerHTML( "Project Built" );

		return function(){

			XmlRequest.sendXMLDoc( "build" );

		}

	};

	Dialog.buildProjectAs = function( fileList ) {	

		View.makeFormForDialog({

			name: "BUILD PROJECT AS",
			inputs: [
				{
					name: "PROJECT NAME",
					type: "text",
					id: "textBuildName"
				}

			],

			parent: this.dialogContent

		});

		var validator = this.addValidator();

		return function(){

			XmlRequest.sendXMLDoc( "build" );

		}

	};

	Dialog.editMeta = function(){

		View.makeFormForDialog({

			name: "EDIT META",
			inputs: [
				{
					name: "TITLE",
					type: "text",
					id: "textTitle"
				},
				{
					name: "AUTHOR",
					type: "text",
					id: "textAuthor"
				},
				{
					name: "DESCRIPTION",
					type: "textarea",
					id: "textDesc"
				},
				{
					name: "KEYWORDS",
					type: "text",
					id: "textKeywords"
				},

			],
			parent: this.dialogContent

		});

		if( Controller.getOffice().getMeta() != "" ){

			var meta = Controller.getOffice().getMeta();

			View.get( "#textTitle" ).value( meta.title );
			View.get( "#textAuthor" ).value( meta.author );
			View.get( "#textDesc" ).value( meta.description );
			View.get( "#textKeywords" ).value( meta.keywords );

		}

		return function(){

			var title 	= View.get( "#textTitle" ).value(),
			author  	= View.get( "#textAuthor" ).value(),
			description = View.get( "#textDesc" ).value(),
			keywords    = View.get( "#textKeywords" ).value();

			Controller.getOffice().setMeta( title, author, description, keywords );

		}

	}

	Dialog.editHead = function(){

		View.makeFormForDialog({

			name: "EDIT HEAD",
			inputs: [

				{
					name: "HEAD",
					type: "textarea",
					id: "textHead"
				}

			],
			parent: this.dialogContent

		});

		if( Controller.getOffice().getHead() != "" ){

			View.get( "#textHead" ).value( Controller.getOffice().getHead() );
			
		}

		return function(){
			
			Controller.getOffice().setHead( View.get( "#textHead" ).value() );

		}
		
	}


	Dialog.addSpace = function() {	

		View.makeFormForDialog({

			name: "ADD SPACE",
			inputs: [

				{
					name: "SIZE",
					type: "text",
					id: "spaceSize"
				},
				{
					name: "AT (OPT.)",
					type: "text",
					id: "afterRow"
				}

			],
			parent: this.dialogContent

		});

		var validator = this.addValidator();

		return function(){

			var size = View.get( "#spaceSize" ).value(),
			at 		 = View.get( "#afterRow" ).value();

			if( size < 1 ){

				validator.setInnerHTML( "Size is too small. Must be in a range of 1 - 128" );
				return false;

			}else if( size > 128 ){

				validator.setInnerHTML( "Size is too large. Must be in a range of 1 - 128" );
				return false;				

			}else{

				if( Controller.getOffice().getSpaces().length != 0 && ( at < 0 || at > Controller.getOffice().getSpaces().length - 1 ) ){

					validator.setInnerHTML( "Must be 'at' in between Spaces. Available values are 0 - " + ( Controller.getOffice().getSpaces().length - 1 ) );
					return false;				

				}else{

					Controller.createSpace({ row: size, at: at });

				}

			}

		}

	};

	Dialog.resizeSpace = function() {	

		View.makeFormForDialog({

			name: "RESIZE SPACE",
			inputs: [

				{
					name: "SIZE",
					type: "text",
					id: "spaceSize"
				}

			],
			parent: this.dialogContent

		});

		View.get( "#spaceSize" ).value( Buffer.getCurrentSpace().getRow() );

		var validator = this.addValidator();

		return function(){

			
			var size = View.get( "#spaceSize" ).value();

			if( size < 1 ){				

				validator.setInnerHTML( "Size is too small. Must be in a range of 1 - 128" );
				return false;
			
			}else if( size > 128 ){

				validator.setInnerHTML( "Size is too large. Must be in a range of 1 - 128" );
				return false;				

			}else{

				var currentSpace = Buffer.getCurrentSpace().getIndex();

				Controller.getOffice().resizeSpace( currentSpace, size );
				Controller.updateBibleList({

					type: "space",
					index: currentSpace

				});

			}

		}

	};

	Dialog.duplicateSpace = function() {	

		var currentSpace = Buffer.getCurrentSpace();

		this.dialogContent.setInnerHTML(

			"<form>" +
			"<legend>DUPLICATE SPACE</legend>" +
			" duplicated space: " + currentSpace.getAttribute().spaceId + " ?" +
			"</form>"

		)

		return function(){		

			Controller.getOffice().duplicateSpace( currentSpace );		

		}

	};

	Dialog.deleteSpace = function() {	

		var office   = Controller.getOffice(),
		spaces       = office.getSpaces(),
		currentSpace = Buffer.getCurrentSpace();

		if( spaces.length === 0 ){

			this.dialogContent.setInnerHTML( "There is no SPACE to delete." );

			return function(){}

		}

		this.dialogContent.setInnerHTML( "Delete Space: " + currentSpace.getAttribute().spaceId + "?" );

		return function(){		

			for( var i = 0, max = spaces.length; i < max; i++ ){

				if( i == currentSpace.getIndex() ){			
					
					currentSpace.deleteAllBox();
					office.deleteSpace( currentSpace.getIndex() );

				}

			}

			Controller.updateBibleList({

				index: currentSpace.getIndex(),
				type: "space"

			});

			Dialog.setOkFunction( null );

		}

	}

	Dialog.deleteAllSpace = function() {	

		var office 	 = Controller.getOffice(),
		spaces 	  	 = office.getSpaces();
			
		if( spaces.length === 0 ){

			this.dialogContent.setInnerHTML( "There is no SPACE to delete." );

			return function(){}

		}

		this.dialogContent.setInnerHTML( "Delete all spaces?" );

		return function(){

			for( var i = 0, max = Controller.getOffice().getSpaces().length; i < max; i++ ){
				
				spaces[ 0 ].deleteAllBox();				
				office.deleteSpace( 0 );	
				
			}

			StyleSet.cleanStyleSet();
			Controller.updateBibleList( 0 );				

		}

	}

	Dialog.editStyleImport = function(){

		View.makeFormForDialog({

			name: "EDIT STYLE IMPORTS",
			inputs: [

				{
					name: "STYLE IMPORTS",
					type: "textarea",
					id: "textStyleImport"
				}

			],
			parent: this.dialogContent

		});

		if( StyleSet.getImports() != "" ){

			View.get( "#textStyleImport" ).value( StyleSet.getImports() );

		}

		return function(){

			var value = View.get( "#textStyleImport" ).value();

			StyleSet.setImports( value );

		}

	}

	Dialog.deleteAllStyle = function(){

		this.dialogContent.setInnerHTML( "Delete all style?" );
		
		return function(){

			StyleSet.cleanStyleSet();			

		}		

	}

	Dialog.addTag = function() {	

		var validateHolder = View.createElement({ type: "div", id: "validateHolder" }),
		validateButton     = View.createElement({ type: "button", name: "VALIDATE", parent: validateHolder }),
		validator 		   = View.createElement({ type: "div", id: "validator", parent: validateHolder }),
		inputContainer 	   = View.createElement({ type: "div" }),
		mainInputContainer = View.makeFormForDialog({

			name: "ADD TAG",
			inputs: [

				{
					name: "NAME",
					type: "text",
					id: "tagName"
				},
				{
					name: "SOURCE",
					type: "textarea",
					id: "tagSource"
				},
				{
					type: "custom",
					node: validateHolder
				}

			],
			parent: this.dialogContent

		});
		
		this.dialogContent.appendChild( inputContainer );

		var totalContent = 0;

		validateButton.addEventListener("click", function( event ){

			totalContent = TagSet.validateSource( View.get( "#tagSource" ).value() );			

			if( totalContent ){

				createInputs( totalContent );
				
			}

			event.preventDefault();			

		});		

		var inputNames = [ "tagTitle", "tagDescription", "tagInputType" ],
		inputTypes     = [ "line", "paragraph", "asset" ],
		table;

		createInputs = function( max ){

			table = View.createTable({ parent: inputContainer.clear() });

			/* Inserting headers */
			table.insertRow(

				[
					{ 
						name: "TITLE"
					},
					{ 
						name: "DESCRIPTION (OPT.)"
					},
					{ 
						name: "INPUT TYPE" 
					}
				]

			);

			/* Inserting inputs */
			for( var i = 0; i < max; i++ ){

				var tagTitle   = View.createElement({ type: "input",  id: inputNames[ 0 ] + i, class: "tagInput" }),
				tagDescription = View.createElement({ type: "input",  id: inputNames[ 1 ] + i, class: "tagInput" }),
				tagType        = View.createElement({ type: "select", id: inputNames[ 2 ] + i, class: "tagInput" });

				for( var j = 0; j < inputTypes.length; j++ ) {

				    var option   = document.createElement( "option" );
				    option.value = inputTypes[ j ];
				    option.text  = inputTypes[ j ];
				    tagType.node.appendChild( option );

				}

				table.insertRow(

					[
						{ 
							type: "custom",
							node: tagTitle
						},
						{ 
							type: "custom",
							node: tagDescription
						},
						{ 
							type: "custom",
							node: tagType
						}
					]

				);

			}			

		}

		return function(){

			var name     = View.get( "#tagName" ).value(),
			source   	 = View.get( "#tagSource" ).value(),
			titles 		 = [],
			descriptions = [],
			inputTypes 	 = [],
			usedTags	 = TagSet.gatherAllTags( source );
			totalTag	 = usedTags.length;

			for( var i = 0; i < totalContent; i++ ){

				titles.push(       View.get( "#" + inputNames[ 0 ] + i ).value() );
				descriptions.push( View.get( "#" + inputNames[ 1 ] + i ).value() );
				inputTypes.push(   View.get( "#" + inputNames[ 2 ] + i ).value() );

			}

			TagSet.createTag( name, {

				source: source, 
				titles: titles,
				descriptions: descriptions,
				inputType: inputTypes,
				usedTags: usedTags,
				totalTag: totalTag

			});
			
		}

	}

	Dialog.manageTag = function( _target ){

		var validateHolder = View.createElement({ type: "div", id: "validateHolder" }),
		validateButton     = View.createElement({ type: "button", name: "VALIDATE", parent: validateHolder }),
		validator 		   = View.createElement({ type: "div", id: "validator", parent: validateHolder }),
		inputContainer 	   = View.createElement({ type: "div" }),
		mainInputContainer = View.makeFormForDialog({

			name: "ADD TAG",
			inputs: [

				{
					name: "NAME",
					type: "select",
					id: "tagName"
				},
				{
					name: "SOURCE",
					type: "textarea",
					id: "tagSource"
				},
				{
					type: "custom",
					node: validateHolder
				}

			],
			parent: this.dialogContent

		});
		
		this.dialogContent.appendChild( inputContainer );
		
		for ( var key in TagSet.getDefinitions() ) {

    		var option   = document.createElement("option"),
    		tag          = TagSet.getDefinitions()[ key ];

    		option.value = tag;
    		option.text  = key;

    		View.get( "#tagName" ).node.appendChild( option );

		}

		var changeOption = function(){

			var  tagName = View.get( "#tagName" ).node,
			tag 		 = TagSet.getDefinitions()[ tagName.options[ tagName.selectedIndex ].text ],
			source 		 = tag.source;

			while( source[ 0 ] == " " ){
				
				source = source.substring( 1, tag.length );  

			}

			View.get( "#tagSource" ).value( source );

			var definitions = [];

			for( var i = 0, max = tag.titles.length; i < max; i++ ){

				definitions[ i ] = { titles: tag.titles[ i ], descriptions: tag.descriptions[ i ], inputTypes: tag.inputType[ i ] }

			}

			createInputs( tag.titles.length, definitions );

		}

		View.get( "#tagName" ).addEventListener( "change", function( event ){

			changeOption();

		});

		var totalContent = 0;

		validateButton.addEventListener( "click", function( event ){

			totalContent = TagSet.validateSource( View.get( "#tagSource" ).value() );			

			if( totalContent ){

				createInputs( totalContent );
				
			}

			event.preventDefault();			

		});	


		var inputNames = [ "tagTitle", "tagDescription", "tagInputType" ],
		inputTypes     = [ "line", "paragraph", "asset" ],
		table;

		createInputs = function( max, definitions ){

			table = View.createTable({ parent: inputContainer.clear() });

			/* Inserting headers */
			table.insertRow(

				[
					{ 
						name: "TITLE"
					},
					{ 
						name: "DESCRIPTION (OPT.)"
					},
					{ 
						name: "INPUT TYPE" 
					}
				]

			);

			/* Inserting inputs */
			for( var i = 0; i < max; i++ ){

				var tagTitle   = View.createElement({ type: "input",  id: inputNames[ 0 ] + i, class: "tagInput" }),
				tagDescription = View.createElement({ type: "input",  id: inputNames[ 1 ] + i, class: "tagInput" }),
				tagType        = View.createElement({ type: "select", id: inputNames[ 2 ] + i, class: "tagInput" });

				for( var j = 0; j < inputTypes.length; j++ ) {

				    var option   = document.createElement( "option" );
				    option.value = inputTypes[ j ];
				    option.text  = inputTypes[ j ];
				    tagType.node.appendChild( option );

				}

				if( definitions ){

					/* Set Tag attributes to the input fields. */
					tagTitle.value( definitions[ i ].titles );
					tagDescription.value( definitions[ i ].descriptions );
					tagType.value( definitions[ i ].inputTypes );

				}
				
				table.insertRow(

					[
						{ 
							type: "custom",
							node: tagTitle
						},
						{ 
							type: "custom",
							node: tagDescription
						},
						{ 
							type: "custom",
							node: tagType
						}
					]

				);

			}			

		}

		/* Select the first Tag when the dialog is created. */
		View.get( "#tagName" ).node.selectedIndex = 0;
		changeOption();

		return function(){

			var tagName  = View.get( "#tagName" ).node,
			name         = tagName.options[ tagName.selectedIndex ].text,
			source   	 = View.get( "#tagSource" ).value(),
			titles 		 = [],
			descriptions = [],
			inputTypes 	 = [],
			usedTags	 = TagSet.gatherAllTags( source ),
			totalTag	 = usedTags.length,
			totalContent = TagSet.validateSource( source );

			for( var i = 0; i < totalContent; i++ ){

				titles.push( document.getElementById( inputNames[ 0 ] + i ).value );

				if( document.getElementById( inputNames[ 1 ] + i ).value == null ){

					descriptions.push( "" );

				}else{

					descriptions.push( document.getElementById( inputNames[ 1 ] + i ).value );

				}
				
				inputTypes.push( document.getElementById( inputNames[ 2 ] + i ).value );

			}
			
			var tag = TagSet.getDefinitions()[ name ];

			tag.source 		 = source;
			tag.titles 		 = titles;
			tag.descriptions = descriptions;
			tag.inputType 	 = inputTypes;
			tag.usedTags 	 = usedTags;
			tag.totalTag 	 = totalTag;
			
		}

	}

	Dialog.deleteBox = function() {	

		var currentBox = Buffer.getCurrentBox();
		
		if( !currentBox ){

			this.dialogContent.setInnerHTML( "There is no BOX to delete" );

			return function(){}

		}
		
		this.dialogContent.setInnerHTML( "Delete BOX: " + currentBox.getAttribute().boxId + "?" );

		return function(){

			currentBox.getSpace().deleteBox( currentBox );

			// StyleSet.cleanStyleSet();

			Controller.updateBibleList( 0 );

		}

	}

	Dialog.deleteAllBox = function() {	

		var currentSpace = Buffer.getCurrentSpace(),
		boxes = currentSpace.getBoxes();
		
		if( boxes.length == 0 ){

			this.dialogContent.setInnerHTML( "There is no BOX to delete" );

			return function(){}

		}
		
		this.dialogContent.setInnerHTML( "Delete all Box(s)?" );

		return function(){

			currentSpace.deleteAllBox();
			Controller.updateBibleList({

				type: "space",
				index: currentSpace

			});

		}

	}

	Dialog.uploadAsset = function(){

		var uploadFileContainer = View.createElement({ type: "div", id: "uploadFileContainer" });

		View.makeFormForDialog({

			name: "UPLOAD ASSET",
			inputs: [

				{
					type: "custom",
					node:  uploadFileContainer
				}

			],
			parent: this.dialogContent

		});

		var dropZone = View.createElement({ type: "canvas", id: "uploadDropZone", parent:  this.dialogContent }),
		files = [];

		dropZone.style({

			display: "inline-block",
			width: "100%",
			height: "120px",
			boxSizing: "border-box"

		});

		dropZone.set({

			width: dropZone.get( "offsetWidth" ),
			height: dropZone.get( "offsetHeight" )

		});

		// console.log( dropZone.get( "offsetWidth" ) );
		var context = dropZone.node.getContext( "2d" );
		
		for( var i = 0; i < 30; i++){

			context.beginPath();
			context.moveTo( 0, i * 7 + 0.5 );
			context.lineTo( dropZone.get( "offsetWidth" ), i * 7 + 0.5  );
			context.strokeStyle = "white";
			context.stroke();
			context.closePath();

		}

		context.beginPath();		
		context.rect( dropZone.get( "offsetWidth" )/2 - 50, ( 7 * 7) + 1, 100, ( 3 * 7 ) );
		context.fillStyle = "rgb(80,80,80)";
		context.fill();
		context.font = "11px OpenSans";
		context.textAlign = 'center';
		context.fillStyle = "white";
		context.fillText( "DROP FILES HERE" , dropZone.get( "offsetWidth" )/2, ( 10 * 6.7) );
		context.closePath();

		
		var fileList = View.createTable({ parent: this.dialogContent });

		fileList.getTable().style({ 

			display: "inline-block",
			width:  "100%",
			height: "150px",
			overflow: "scroll"

		});

		
		dropZone.addEventListener( "dragover", function( event ) {

		    event.stopPropagation();
		    event.preventDefault();
		    event.dataTransfer.dropEffect = "copy";

		    for( var i = 0; i < 30; i++){

				context.beginPath();
				context.moveTo( 0, i * 7 + 0.5 );
				context.lineTo( dropZone.get( "offsetWidth" ), i * 7 + 0.5  );
				context.strokeStyle = Global.colors.validatorTrue;
				context.stroke();
				context.closePath();

			}


		});

		dropZone.addEventListener( "drop", function( event ) {
		    
		    event.stopPropagation();
		    event.preventDefault();
		    tempFiles = event.dataTransfer.files;

		    for( var i = 0, max = tempFiles.length; i < max; i++ ){

		    	files.push( tempFiles[ i ] );
		    }

		    for( var i = 0; i < 30; i++){

				context.beginPath();
				context.moveTo( 0, i * 7 + 0.5 );
				context.lineTo( dropZone.get( "offsetWidth" ), i * 7 + 0.5  );
				context.strokeStyle = "white";
				context.stroke();
				context.closePath();

			}

			context.beginPath();		
			context.rect( dropZone.get( "offsetWidth" )/2 - 50, ( 7 * 7) + 1, 100, ( 3 * 7 ) );
			context.fillStyle = "rgb(80,80,80)";
			context.fill();
			context.font = "11px OpenSans";
			context.textAlign = 'center';
			context.fillStyle = "white";
			context.fillText( "DROP FILES HERE" , dropZone.get( "offsetWidth" )/2, ( 10 * 6.7) );
			context.closePath();

		    populateFileList( files );

		});

		var populateFileList = function( _files ){

			fileList.clear();

			var drawValidator = function( context ){

		    	if( /\.[a-z]*/.test( _files[ i ].name ) ){

		    		context.beginPath();
					context.arc( 10, 12, 6, 0, 2 *Math.PI );				
					context.lineWidth = "1";
					context.strokeStyle = Global.colors.validatorTrue;				
					context.stroke();
					context.closePath();

		    	}else{

		    		context.beginPath();
					context.moveTo( 10, 6 );
					context.lineTo( 16, 16);
					context.lineTo( 4, 16 );
					context.lineTo( 10, 6 );
					context.lineWidth = "1";
					context.strokeStyle = "#ED4545";				
					context.stroke();
					context.closePath();

		    	}

		    }, drawDeleteButton = function( context, isHover ){

		    	context.clearRect( 0, 0, 50, 50 );

		    	if( isHover ){

					context.beginPath();
					context.moveTo( 5, 5 );
					context.lineTo( 15, 15);
					context.moveTo( 15, 5 );
					context.lineTo( 5, 15);
					context.lineWidth = "2";
					context.strokeStyle = "#ED4545";
					context.stroke();
					context.closePath();

				}else{

					context.beginPath();
					context.moveTo( 5, 5 );
					context.lineTo( 15, 15);
					context.moveTo( 15, 5 );
					context.lineTo( 5, 15);
					context.lineWidth = "2";
					context.strokeStyle = "white";				
					context.stroke();
					context.closePath();
				}

		    }
		      
		    for( var i = 0, max = _files.length; i < max; i++ ){

		    	var validator = View.createElement({ type: "canvas" }),
		    	deleteButton  = View.createElement({ type: "canvas" });

		    	validator.style({ 

		    		margin: 0,
		    		width:  "20px",
		    		height: "20px"

		    	});

		    	validator.set({ 

		    		height: 20,
		    		width: 20

		    	});

		    	deleteButton.style({ 

		    		margin: 0,
		    		float: "right",
		    		width:  "20px",
		    		height: "20px"

		    	});

		    	deleteButton.set({ 

		    		height: 20,
		    		width: 20,
		    		"data-name": _files[ i ].name

		    	});

		    	drawValidator( validator.node.getContext( "2d" ) );
		    	drawDeleteButton( deleteButton.node.getContext( "2d" ), false );

		    	var row = fileList.insertRow(

					[

						{ 

							type: "custom",
							node: validator,
							width: 0.1

						},
						{ 

							name: Global.util.truncate( _files[ i ].name ),
							width: 0.8

						},
						{ 

							type: "custom",
							node: deleteButton,
							width: 0.1

						}
						
					]

				);

				row.parent().style({

					display: "inline-block",
					width: "100%"

				})

				row.style({

					display: "inline-block",
					width: "100%"

				})
				
				fileList.get( i, 2 ).child()[ 0 ].addEventListener( "mousemove", function(){

		    		drawDeleteButton( this.getContext( "2d" ), true );

		    	});

		    	fileList.get( i, 2 ).child()[ 0 ].addEventListener( "mouseout", function(){

		    		drawDeleteButton( this.getContext( "2d" ), false );

		    	});

		    	fileList.get( i, 2 ).child()[ 0 ].addEventListener( "click", function(){

		    		for( var i = 0, max = files.length; i < max; i++ ){

					    if( files[ i ].name == this.getAttribute( "data-name" ) ) {

					        files.splice( i, 1 );
					        break;
					    }

					}

		    		populateFileList( files );
		    		

		    	});
				
		    }

		}		
		
		return function(){

			XmlRequest.uploadFile( files );			

		}

	}

	Dialog.updateAssetPreview = function( directory, type ){

		var preview = document.getElementById( "preview" ),
		previewTest = View.get( "#preview" ),
		self        = this;

		switch( type ){

			case "none":

				previewTest.clear();
			
				var message = View.createElement({ type: "div", parent: previewTest, name: "NONE SELECTED" });

				message.style({

					position:  "relative",
					textAlign: "center",
					fontSize:  "13px",
					top: 	   "50%",
					width:     previewTest.get( "offsetWidth" ),
					height:    "15px",
					display:   "block",
					margin:    "auto"

				});				

				break;

			case "img":

				try{

					preview.innerHTML = "<img src = '" + directory+"' />";
					preview.childNodes[ 0 ].onload = function(){
									
						var width  = preview.childNodes[ 0 ].clientWidth,
						height     = preview.childNodes[ 0 ].clientHeight,
						ratioX	   = 0,
						ratioY	   = 0,
						marginTop  = 0,
						marginLeft = 0;

						if( width > height){

							ratioX    = 1;
							ratioY    = height/width;
							marginTop = ( 1 - ratioY ) / 2;
							
							// console.log( marginTop );

						}else if( width == height ){

							ratioX = 1;
							ratioY = 1;

						}else{

							ratioX = width/height;
							ratioY = 1;
							marginLeft = ( 1 - ( width/height ) ) / 2;

						}

						preview.childNodes[ 0 ].style.width = ( ratioX * 100 ) + "%";
						preview.childNodes[ 0 ].style.height = ( ratioY * 100 ) + "%";				
						preview.childNodes[ 0 ].style.marginTop = ( marginTop * 75 ) + "%";
						preview.childNodes[ 0 ].style.marginLeft = ( marginLeft * 100 ) + "%";
						preview.childNodes[ 0 ].style.display = "";

					
					}

				}catch( e ){}

				break;

			case "audio":

				try{

					preview.innerHTML = "";


					
					var audio = AudioPlayer.loadAudio({ 

						url: directory, 
						parent: preview,
						grandParent: this.dialogContainer.node,
						x: ( preview.offsetWidth / 2),
						y: ( preview.offsetHeight / 2),
						size: 50


					});

					console.log( preview.offsetWidth / 2 );		


					audio.clear();
					audio.drawBase();
					audio.drawPlayhead();
					
					preview.appendChild( audio.getCanvas() );


				}catch(e){

					console.log( e );
				
				}

				break;

			case "video":

				try{

					preview.innerHTML = "";
					
					var video = document.createElement( "video" );
					video.style.width  = "100%";
					video.style.height = "100%";					
					video.style.margin = 0;
					video.src = directory;

					video.addEventListener( "click", function(){

						if( this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2 ){

							this.pause();

						}else{

							video.play();

						}
						

					});
												
					preview.appendChild( video );
					
				}catch( e ){}

				break;

			default:

				previewTest.clear();
			
				var message = View.createElement({ type: "div", parent: previewTest, name: "NO PREVIEW FOR THIS FORMAT" });

				message.style({

					position:  "relative",
					textAlign: "center",
					fontSize:  "13px",
					top: 	   "50%",
					width:     previewTest.get( "offsetWidth" ),
					height:    "15px",
					display:   "block",
					margin:    "auto"

				});

				break;

		}

	}

	Dialog.updateAssetPreviewInfo = function( file ){		

		View.createTable({ 

			tableData: [

				[ "NAME", file.getName() ],
				[ "DATE", file.getDate() ],
				[ "SIZE", file.getSize() ],
				[ "TYPE", file.getType() ]

			], 

			parent: View.get( "#previewInfo" ).clear()

		});

	}
	

	Dialog.manageAsset = function(){

		FolderFullPath = "";
		this.dialogContent.setInnerHTML( "<legend>ASSET LIST</legend>" );

		var assetManagerContainer = View.createElement({ type: "div", class: "assetManagerContainer", parent: this.dialogContent }),
		folderContainerHeader     = View.createElement({ type: "div", id: "folderContainerHeader",    parent: assetManagerContainer, name: "FOLDERS" }),
		fileContainerHeader       = View.createElement({ type: "div", id: "fileContainerHeader",      parent: assetManagerContainer }),
		previewContainerHeader    = View.createElement({ type: "div", id: "previewContainerHeader",   parent: assetManagerContainer, name: "PREVIEW" }),
		folderContainer 		  = View.createElement({ type: "div", id: "folderContainer", 		  parent: assetManagerContainer }),
		fileContainer 			  = View.createElement({ type: "div", id: "fileContainer",    		  parent: assetManagerContainer }),
		previewContainer 		  = View.createElement({ type: "div", id: "previewContainer", 	      parent: assetManagerContainer }),
		
		createFileTable = function(){

			fileContainer.clear();

			return View.createElement({ type: "table", parent: fileContainer });

		},
		createFileTableHeader = function( sort ){

			var fileTable = View.createTable({ parent: fileContainer.clear() }),
			fileNameCell   = View.createElement({ type: "span", name: "FILE NAME", class: "fileNameCell", parent: fileContainerHeader  });
			fileDateCell   = View.createElement({ type: "span", name: "DATE", 	   class: "fileDateCell", parent: fileContainerHeader  });
			fileSizeCell   = View.createElement({ type: "span", name: "SIZE", 	   class: "fileSizeCell", parent: fileContainerHeader  });
			fileTypeCell   = View.createElement({ type: "span", name: "TYPE", 	   class: "fileTypeCell", parent: fileContainerHeader  });

			fileTable.getTable().style({ height: "15px" });

			/* Set Sort State */
			fileNameCell.set({ "data-sort": 0 });
			fileDateCell.set({ "data-sort": 1 });
			fileSizeCell.set({ "data-sort": 0 });
			fileTypeCell.set({ "data-sort": 0 });

			fileNameCell.appendInnerHTML( "<img class = 'fileSortIcon' src = 'img/icon_none.png'></img>" );
			fileDateCell.appendInnerHTML( "<img class = 'fileSortIcon' src = 'img/icon_none.png'></img>" );
			fileSizeCell.appendInnerHTML( "<img class = 'fileSortIcon' src = 'img/icon_none.png'></img>" );
			fileTypeCell.appendInnerHTML( "<img class = 'fileSortIcon' src = 'img/icon_none.png'></img>" );

			/* Inserting headers */
			fileTable.insertRow(

				[
					{
						type: "custom",
						node: fileNameCell,
						width: 0.5

					},
					{ 
						type: "custom",
						node: fileDateCell,
						width: 0.2
					},
					{ 
						type: "custom",
						node: fileSizeCell,
						width: 0.2
					},
					{ 
						type: "custom",
						node: fileTypeCell,
						width: 0.1
					}
				]

			).set({ id: "fileListHeader" });			

			var headerChildren = [

				{ 
					node: fileNameCell,
					text: document.createTextNode( "FILE NAME" )

				},
				{ 
					node: fileDateCell,
					text: document.createTextNode( "DATE" )
				},
				{ 
					node: fileSizeCell,
					text: document.createTextNode( "SIZE" )
				},
				{ 
					node: fileTypeCell,
					text: document.createTextNode( "TYPE" )
				}

			];		


			for( var i = 0, max = headerChildren.length; i < max; i++ ){				

				fileContainer.clear();

				headerChildren[ i ].node.set({ "data-index": i });

				headerChildren[ i ].node.addEventListener( "click", function(){
				
					var sortState = parseInt( this.getAttribute( "data-sort" ) ) + 1;
					sortState %= 2;
					this.setAttribute( "data-sort", sortState );

					switch( sortState ){

						case 0:

							this.innerHTML = "";
							this.innerHTML += "<img class = 'fileSortIcon' src = 'img/icon_down.png'></img>";
							this.appendChild(  headerChildren[ this.getAttribute( "data-index") ].text );
							AssetList.getFolders()[ Buffer.getCurrentFolder().getName() ].createFileList( createFileTable, this.getAttribute( "data-index"), 0 );							

							break;

						case 1: 

							this.innerHTML = "";
							this.innerHTML += "<img class = 'fileSortIcon' src = 'img/icon_up.png'></img>";
							this.appendChild(  headerChildren[ this.getAttribute( "data-index") ].text );
							AssetList.getFolders()[ Buffer.getCurrentFolder().getName() ].createFileList( createFileTable, this.getAttribute( "data-index"), 1 );

							break;


					}
					
					for( var j = 0, maxx = headerChildren.length; j < maxx; j++ ){

						if( this != headerChildren[ j ].node.node ){

							headerChildren[ j ].node.set({ "data-sort": 0 });
							headerChildren[ j ].node.setInnerHTML( "<img class = 'fileSortIcon' src = 'img/icon_none.png'></img>" );
							headerChildren[ j ].node.node.appendChild( headerChildren[ j ].text );

						}


					}
					


				});

					

			}
			
			return fileTable;

		}		

		
		fileContainerHeader.appendChild( createFileTableHeader().getTable() );


		var preview = document.createElement( "div" ),
		previewInfo = document.createElement( "div" );

		preview.setAttribute( "id", "preview" );
		previewInfo.setAttribute( "id", "previewInfo" );

		previewContainer.node.appendChild( preview );
		previewContainer.node.appendChild( previewInfo );

		
		this.dialogContent.appendChild( assetManagerContainer );		
		
		for( var key in AssetList.getFolders() ){

			var span = AssetList.getFolders()[ key ].createSpan( createFileTable );

			span.setAttribute( "data-name", key );
			
			span.addEventListener( "click", function(){
				

				var allSpans = this.parentNode.childNodes;

				Buffer.setCurrentFolder( AssetList.getFolders()[ this.getAttribute( "data-name" )  ] );

					
				for( var i = 0, max = allSpans.length; i < max; i++ ){

					if( this == allSpans[ i ] ){

						allSpans[ i ].style.background = Global.colors.listHighlight;

					}else{

						allSpans[ i ].style.background = "none";

					}
					
				}


			})

			folderContainer.node.appendChild( span );

		}		

	}

	Dialog.editScript = function(){

		this.dialogContent.setInnerHTML( "<legend>MANAGE SCRIPT</legend>" );

		var scriptTableContainer = View.createElement({ type: "div", parent: this.dialogContent }),
		scriptTable 			 = View.createTable({ parent: scriptTableContainer }),
		scriptMenu				 = View.createElement({ type: "div", parent: this.dialogContent }),
		scriptMenuTable 		 = View.createTable({ parent: scriptMenu }),
		importOrderResetButton   = View.createElement({ type: "button", name: "RESET", id: "importOrderResetButton" });

		scriptTableContainer.style({

			height: "300px",
			overflow: "scroll"
		});

		scriptMenu.style({

			height: "40px",
			overflow: "scroll"
		})

		importOrderResetButton.style({ 

    		margin: "1px 1px 1px 1px",
    		width:  "44px",
    		height: "20px"

    	});

		scriptMenuTable.insertRow([
			
			{
				type: "custom",
				node: importOrderResetButton,
				width: 0.1

			},

			{
				name: "",				
				width: 0.9

			}			

		]);

		View.get( "#importOrderResetButton" ).addEventListener( "click", function(){

			var scripts = ScriptSet.getScripts();

			ScriptSet.importIndex = 1;

			for( var key in scripts ){

				scripts[ key ].setImportIndex( "" );				

			}

			View.get( ".importOrderButton" ).forEach( function( element ){

				element.set({ "data-index": 0 });

				drawImportOrderButton( element.node.getContext( "2d" ), "" );

			});

		});

		var drawImportOrderButton = function( context, index ){

			context.clearRect(0, 0, 30, 30 );
			context.beginPath();
			context.strokeStyle = "white";
			context.fillStyle = "white";
			context.rect( 0.5, 0.5, 18, 18 );
			context.font = "12px OpenSans";
			context.textAlign = 'center';
			context.fillText( index , 9.5, 13.5 );
			context.lineWidth = "1";

			context.stroke();
			
			context.closePath();

		},
		createRowForScriptTable = function( scriptName, importIndex, isItCreator ){

			var importOrderButton = View.createElement({ type: "canvas", class: "importOrderButton" }),
		    	creatorButton  	  = View.createElement({ type: "canvas" });

		    importOrderButton.style({ 

	    		margin: "1px",
	    		width:  "20px",
	    		height: "20px"

	    	});

	    	importOrderButton.set({ 

	    		height: 20,
	    		width: 20,
	    		"data-name": scriptName

	    	});

	    	creatorButton.style({ 

	    		margin: "1px",	    		
	    		width:  "20px",
	    		height: "20px"

	    	});

	    	creatorButton.set({ 

	    		height: 20,
	    		width:  20,
	    		"data-clicked": isItCreator,
	    		"data-name":    scriptName

	    	});

	    	

	    	importOrderButton.addEventListener( "click", function(){

	    		if( !importOrderButton.get( "data-index" ) || importOrderButton.get( "data-index" ) == 0 ){

	    			importOrderButton.set({ "data-index": ScriptSet.importIndex });

	    			ScriptSet.get( importOrderButton.get( "data-name" ) ).setImportIndex( ScriptSet.importIndex );

	    			ScriptSet.importIndex++;

	    		}	    		

	    		drawImportOrderButton( importOrderButton.node.getContext( "2d" ), importOrderButton.get( "data-index" ) );

	    	});


	    	creatorButton.addEventListener( "click", function(){

	    		if( creatorButton.get( "data-clicked") == 1){


	    			ScriptSet.get( creatorButton.get( "data-name") ).setIsItCreator( 0 );

	    		}else{

	    			ScriptSet.get( creatorButton.get( "data-name") ).setIsItCreator( 1 );

	    		}	    		


	    	});

	    	drawImportOrderButton( importOrderButton.node.getContext( "2d" ), importIndex );
	    	

	    	scriptTable.insertRow(

				[
					{
						type: "custom",
						node: importOrderButton,
						width: 0.05

					},
					{ 
						type: "custom",
						node: creatorButton,
						width: 0.05
					},
					{
						name: scriptName,
						width: 0.9

					}
					
				]

			);

		}	
		
		var scripts = AssetList.sortFolder( "script", 0, 0 );
			
		if( scripts.length != ScriptSet.size() ){

			if( ScriptSet.size() == 0 ){

				scripts.forEach( function( element ){

					ScriptSet.addScript( element.getName(), Global.dir.script );

				});

			}else{

				scripts.forEach( function( element ){

					if( !ScriptSet.get( element.getName() ) ){

						ScriptSet.addScript( element.getName(), Global.dir.script );

					}

				});
				

			}
			
		}

		scripts.forEach( function( element ){
			
			var importIndex = "",
			isItCreator = 0;


			if( ScriptSet.get( element.getName() ) ){

				if( ScriptSet.get( element.getName() ).getImportIndex() ){

					importIndex = ScriptSet.get( element.getName() ).getImportIndex();

				}

				isItCreator = ScriptSet.get( element.getName() ).getIsItCreator();			

			}else{

				isItCreator = 0;

			}

			createRowForScriptTable( element.getName(), importIndex, isItCreator );

		});		

		return function(){

			var scripts = ScriptSet.getScripts();

			for( var key in scripts ){

				if( scripts[ key ].getIsItCreator() > 0 ){

					XmlRequest.getTextData( scripts[ key ].getDirectory() + scripts[ key ].getName(), function( text ){
						
						eval( text.replace(/(?:\r\n|\r|\n)/g, ' ') );

						for( var key1 in Creator ){

							for( var key2 in Creator[ key1 ]){

								var option = document.createElement( "option" );
								option.text = key1 + "." + key2 + "()"; 
								View.get( "#eventOnClick" ).node.add( option );
								

							}
							

						}

					});
					

				}

			}

		}

	}

	Dialog.changePassword = function(){

		View.makeFormForDialog({

			name: "CHANGE PASSWORD",
			inputs: [

				{
					name: "OLD PASSWORD",
					type: "password",
					id: "textOldPassword"
				},
				{
					name: "NEW PASSWORD",
					type: "password",
					id: "textNewPassword"
				},
				{
					name: "VERIFY PASSWORD",
					type: "password",
					id: "textReenterPassword"
				}

			],

			parent: this.dialogContent

		});

		var validator = this.addValidator(),
		passwordReg   = (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*()]{8,}$/);

		return function(){

			var password    = View.get( "#textNewPassword" ).value(),
			reenterPassword = View.get( "#textReenterPassword" ).value();

			if( ( password == "" || password == null ) || ( reenterPassword == "" || reenterPassword == null ) ){

				return false;

			}else if( !passwordReg.exec( password ) ){ /* If password does not meet requirement */

				validator.setInnerHTML( "Error: does not meet requirment. ( 8 chars [0-9a-zA-Z!@#$%^&*()] )" );
				validator.style({ "color": Global.colors.validatorFalse });

				return false;

			}else if( password != reenterPassword) { /* If password reentered does not match */ 

				validator.setInnerHTML( "Error: password reentered does not match" );
				validator.style({ "color": Global.colors.validatorFalse });

				return false;

			}else{

				XmlRequest.accountManagerActions( "changePassword", {

					id: View.get("#userId").node.innerHTML, 
					pw: password

				});
				  

				return true;

			}

		}

	}

	Dialog.sendInvitation = function(){

		View.makeFormForDialog({

			name: "SEND INVITATION",
			inputs: [

				{
					name: "EMAIL",
					type: "text",
					id: "textEmail"
				},
				{
					name: "ACCOUNT LEVEL",
					type: "select",
					id: "selectAccountLevel"
				}

			],

			parent: this.dialogContent

		});

		var validator = this.addValidator(),
		emailReg 	   = (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

		validator.style({ "margin": 0, "width": "73%", "padding": "0 0.5% 0 .5%" });

		var selectAccountLevel = View.get( "#selectAccountLevel" ).node;

		for( var key in Global.accountLevel ){

			var option   = document.createElement( "option" );
			option.text  = Global.accountLevel[ key ];
			option.value = key;

			selectAccountLevel.add( option );

		}
		
		return function(){

			var email    = View.get( "#textEmail").value(),
			accountLevel = View.get( "#selectAccountLevel").value();

			if( !emailReg.exec( email ) ){

				validator.setInnerHTML( "Error: email is not valid." );
				validator.style({ "color": Global.colors.validatorFalse });

				return false;

			}else if( emailReg.exec( email ) && ( accountLevel != "" && accountLevel != null ) ){

				return true;

			}
			

		}

	}

	Dialog.colorPalette = function( input ){

		this.dialogContent.setInnerHTML( "COLOR PALETTE" );

		var self   = this,
		drawColor  = function( context, width, _color ){

			context.clearRect( 0, 0, width, 30 );
			for( var i = 0; i < 30; i++){

				context.beginPath();
				context.moveTo( 0, i * 7 + 0.5 );
				context.lineTo( width, i * 7 + 0.5  );
				context.strokeStyle = _color;
				context.lineWidth = 1;
				context.stroke();
				context.closePath();

			}

		},
		drawSlider = function( context, width, _position ){			

			var headSize = 10,
			height 		 = headSize * (Math.sqrt(3)/2);

			context.clearRect( 0, 0, width, 50 );

			/* Draw slider bar */
			context.beginPath();
			context.moveTo( 10, 10.5 );
			context.lineTo( width - 10, 10.5 );
			context.strokeStyle = "white";
			context.lineWidth = 1;
			context.stroke();
			context.closePath();
		
			context.save();

			/* Draw slider head */
			context.beginPath();

			var position = ( _position * ( width - headSize ) ) + 1 ;

			if( position <= 10.5){

				position = 10.5;

			}else if( position >= width - 10 ){

				position = width - 10;

			}

			context.translate( position , 10.5 );
			context.rotate( _position  * Math.PI );
	

			context.moveTo( 0, -height / 2);
	        context.lineTo( -headSize / 2, height / 2 );
	        context.lineTo( headSize / 2, height / 2 );
	        context.lineTo( 0, -height / 2);			
			context.fillStyle = "rgb(80,80,80)";
			context.lineWidth = 2;
			context.stroke();			
			context.fill();
	
			context.closePath();
			context.restore();

		},

		setInputOnChange = function( input, slider, type ){

			input.addEventListener( "keyup", function(){

				if( type == "r" || type == "g" || type == "b"  ){

					if( input.value() < 0 ){

						drawSlider( slider.node.getContext( "2d" ), slider.get( "offsetWidth" ), 0 );
						input.value( 0 );

					}else if( input.value() > 255 ){

						drawSlider( slider.node.getContext( "2d" ), slider.get( "offsetWidth" ), 1 );
						input.value( 255 );

					}else{

						drawSlider( slider.node.getContext( "2d" ), slider.get( "offsetWidth" ), parseInt( input.value() )/255 );

						if( type == "r" ){

							ColorPalette.r = input.value();

						}else if( type == "g" ){

							ColorPalette.g = input.value();

						}else if( type == "b" ){

							ColorPalette.b = input.value();

						}						

						drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

						ColorPalette.RGBtoHSB();

						drawSlider( View.get( "#hueCanvas" ).node.getContext( "2d"), width, ColorPalette.h / 360 );
						drawSlider( View.get( "#saturationCanvas" ).node.getContext( "2d" ), width, ColorPalette.s );
						drawSlider( View.get( "#brightnessCanvas" ).node.getContext( "2d" ), width, ColorPalette.v );

						View.get( "#hueCanvasInput" ).value( ColorPalette.h );
						View.get( "#saturationCanvasInput" ).value( ColorPalette.s );
						View.get( "#brightnessCanvasInput" ).value( ColorPalette.v );

					}

				}
				
			});

		},		
		addEventListeners = function( canvas, width, type ){			

			canvas.addEventListener( "mousedown", function( event ){			

				if( type == "rgb" ){

					var clickFlag = false;

					clickFlag = true;

					var position = ( event.clientX - self.dialogContainer.node.offsetLeft - self.dialogContent.node.offsetLeft - canvas.parent().node.offsetLeft ) / width;

					if( clickFlag && ( position >= 0 && position <= 1 ) ){

						drawSlider( canvas.node.getContext( "2d" ), width, position );

						View.get( "#" + canvas.get( "id" ) + "Input" ).value( Math.ceil( position * 255 ) );

						ColorPalette.r = View.get( "#redCanvasInput" ).value(),
						ColorPalette.g = View.get( "#greenCanvasInput" ).value(), 
						ColorPalette.b = View.get( "#blueCanvasInput" ).value();

						drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

						ColorPalette.RGBtoHSB();

						drawSlider( View.get( "#hueCanvas" ).node.getContext( "2d"), width, ColorPalette.h / 360 );
						drawSlider( View.get( "#saturationCanvas" ).node.getContext( "2d" ), width, ColorPalette.s );
						drawSlider( View.get( "#brightnessCanvas" ).node.getContext( "2d" ), width, ColorPalette.v );

						View.get( "#hueCanvasInput" ).value( ColorPalette.h );
						View.get( "#saturationCanvasInput" ).value( ColorPalette.s );
						View.get( "#brightnessCanvasInput" ).value( ColorPalette.v );						

					}

					document.addEventListener( "mouseup", function( event ){

						clickFlag = false;

					})

					document.addEventListener( "mousemove", function( event ){

					position = ( event.clientX - self.dialogContainer.node.offsetLeft - self.dialogContent.node.offsetLeft - canvas.parent().node.offsetLeft ) / width;

					if( clickFlag && ( position >= 0 && position <= 1 ) ){

							drawSlider( canvas.node.getContext( "2d" ), width, position );

							View.get( "#" + canvas.get( "id" ) + "Input" ).value( Math.ceil( position * 255 ) );

							ColorPalette.r = View.get( "#redCanvasInput"   ).value(),
							ColorPalette.g = View.get( "#greenCanvasInput" ).value(), 
							ColorPalette.b = View.get( "#blueCanvasInput"  ).value();

							drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

							ColorPalette.RGBtoHSB();

							drawSlider( View.get( "#hueCanvas"        ).node.getContext( "2d" ), width, ColorPalette.h / 360 );
							drawSlider( View.get( "#saturationCanvas" ).node.getContext( "2d" ), width, ColorPalette.s );
							drawSlider( View.get( "#brightnessCanvas" ).node.getContext( "2d" ), width, ColorPalette.v );

							View.get( "#hueCanvasInput"        ).value( ColorPalette.h );
							View.get( "#saturationCanvasInput" ).value( ColorPalette.s );
							View.get( "#brightnessCanvasInput" ).value( ColorPalette.v );

						}


					});

				}else if( type == "hue" ){

					var clickFlag = false;

					clickFlag = true;

					var position = ( event.clientX - self.dialogContainer.node.offsetLeft - self.dialogContent.node.offsetLeft - canvas.parent().node.offsetLeft ) / width;

					if( clickFlag && ( position >= 0 && position <= 1 ) ){

						drawSlider( canvas.node.getContext( "2d" ), width, position );

						View.get( "#" + canvas.get( "id" ) + "Input" ).value( Math.ceil( position * 360 ) );

						ColorPalette.h = View.get( "#hueCanvasInput" ).value(),
						ColorPalette.s = View.get( "#saturationCanvasInput" ).value(), 
						ColorPalette.v = View.get( "#brightnessCanvasInput" ).value();

						ColorPalette.HSBtoRGB();

						drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

						drawSlider( View.get( "#redCanvas" ).node.getContext( "2d"), width, ColorPalette.r / 255 );
						drawSlider( View.get( "#greenCanvas" ).node.getContext( "2d" ), width, ColorPalette.g / 255 );
						drawSlider( View.get( "#blueCanvas" ).node.getContext( "2d" ), width, ColorPalette.b / 255 );

						View.get( "#redCanvasInput" ).value( ColorPalette.r );
						View.get( "#greenCanvasInput" ).value( ColorPalette.g );
						View.get( "#blueCanvasInput" ).value( ColorPalette.b );						

					}

					document.addEventListener( "mouseup", function( event ){

						clickFlag = false;

					})

					document.addEventListener( "mousemove", function( event ){

					position = ( event.clientX - self.dialogContainer.node.offsetLeft - self.dialogContent.node.offsetLeft - canvas.parent().node.offsetLeft ) / width;

						if( clickFlag && ( position >= 0 && position <= 1 ) ){

							drawSlider( canvas.node.getContext( "2d" ), width, position );

							View.get( "#" + canvas.get( "id" ) + "Input" ).value( Math.ceil( position * 360  ) );

							ColorPalette.h = View.get( "#hueCanvasInput" ).value(),
							ColorPalette.s = View.get( "#saturationCanvasInput" ).value(), 
							ColorPalette.v = View.get( "#brightnessCanvasInput" ).value();

							ColorPalette.HSBtoRGB();

							drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

							drawSlider( View.get( "#redCanvas" ).node.getContext( "2d"), width, ColorPalette.r / 255 );
							drawSlider( View.get( "#greenCanvas" ).node.getContext( "2d" ), width, ColorPalette.g / 255 );
							drawSlider( View.get( "#blueCanvas" ).node.getContext( "2d" ), width, ColorPalette.b / 255 );

							View.get( "#redCanvasInput" ).value( ColorPalette.r );
							View.get( "#greenCanvasInput" ).value( ColorPalette.g );
							View.get( "#blueCanvasInput" ).value( ColorPalette.b );		

						}

					});

				}else{

					var clickFlag = false;

					clickFlag = true;

					var position = ( event.clientX - self.dialogContainer.node.offsetLeft - self.dialogContent.node.offsetLeft - canvas.parent().node.offsetLeft ) / width;

					if( clickFlag && ( position >= 0 && position <= 1 ) ){

						drawSlider( canvas.node.getContext( "2d" ), width, position );

						View.get( "#" + canvas.get( "id" ) + "Input" ).value( Math.round( position * 100 ) / 100 );

						ColorPalette.h = View.get( "#hueCanvasInput" ).value(),
						ColorPalette.s = View.get( "#saturationCanvasInput" ).value(), 
						ColorPalette.v = View.get( "#brightnessCanvasInput" ).value();

						ColorPalette.HSBtoRGB();

						drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

						drawSlider( View.get( "#redCanvas" ).node.getContext( "2d"), width, ColorPalette.r / 255 );
						drawSlider( View.get( "#greenCanvas" ).node.getContext( "2d" ), width, ColorPalette.g / 255 );
						drawSlider( View.get( "#blueCanvas" ).node.getContext( "2d" ), width, ColorPalette.b / 255 );

						View.get( "#redCanvasInput" ).value( ColorPalette.r );
						View.get( "#greenCanvasInput" ).value( ColorPalette.g );
						View.get( "#blueCanvasInput" ).value( ColorPalette.b );						

					}

					document.addEventListener( "mouseup", function( event ){

						clickFlag = false;

					})

					document.addEventListener( "mousemove", function( event ){

					position = ( event.clientX - self.dialogContainer.node.offsetLeft - self.dialogContent.node.offsetLeft - canvas.parent().node.offsetLeft ) / width;

						if( clickFlag && ( position >= 0 && position <= 1 ) ){

							drawSlider( canvas.node.getContext( "2d" ), width, position );

							View.get( "#" + canvas.get( "id" ) + "Input" ).value( Math.round( position * 100 ) / 100 );

							ColorPalette.h = View.get( "#hueCanvasInput" ).value(),
							ColorPalette.s = View.get( "#saturationCanvasInput" ).value(), 
							ColorPalette.v = View.get( "#brightnessCanvasInput" ).value();

							ColorPalette.HSBtoRGB();

							drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );

							drawSlider( View.get( "#redCanvas" ).node.getContext( "2d"), width, ColorPalette.r / 255 );
							drawSlider( View.get( "#greenCanvas" ).node.getContext( "2d" ), width, ColorPalette.g / 255 );
							drawSlider( View.get( "#blueCanvas" ).node.getContext( "2d" ), width, ColorPalette.b / 255 );

							View.get( "#redCanvasInput" ).value( ColorPalette.r );
							View.get( "#greenCanvasInput" ).value( ColorPalette.g );
							View.get( "#blueCanvasInput" ).value( ColorPalette.b );		

						}

					});


				}
				

			})

		};

		var colorContainer = View.createElement({ type: "div", parent: this.dialogContent });
		color 			   = View.createElement({ type: "canvas", parent: colorContainer });

		color.style({ height: "100px", width: "100%", margin: "1% 0 1% 0" });
		color.set({ height: 100 });

		drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), "white" );		
		
		var table   		= View.createTable({ parent: this.dialogContent }),
		redCanvas   		= View.createElement({ type: "canvas", class: "colorCanvas", id: "redCanvas" }),
		greenCanvas 		= View.createElement({ type: "canvas", class: "colorCanvas", id: "greenCanvas" }),
		blueCanvas 		    = View.createElement({ type: "canvas", class: "colorCanvas", id: "blueCanvas" }),
		hueCanvas           = View.createElement({ type: "canvas", class: "colorCanvas", id: "hueCanvas" }),
		saturationCanvas    = View.createElement({ type: "canvas", class: "colorCanvas", id: "saturationCanvas" }),
		brightnessCanvas 	= View.createElement({ type: "canvas", class: "colorCanvas", id: "brightnessCanvas" }),
		redInput 			= View.createElement({ type: "input", class: "colorInput", id: "redCanvasInput" }),
		hueInput 			= View.createElement({ type: "input", class: "colorInput", id: "hueCanvasInput" }),
		greenInput			= View.createElement({ type: "input", class: "colorInput", id: "greenCanvasInput" }),
		saturationInput 	= View.createElement({ type: "input", class: "colorInput", id: "saturationCanvasInput" }),
		blueInput 			= View.createElement({ type: "input", class: "colorInput", id: "blueCanvasInput" }),
		brightnessInput 	= View.createElement({ type: "input", class: "colorInput", id: "brightnessCanvasInput" });

		for( var i = 0; i < View.get( ".colorInput" ).length; i++ ){

			View.get( ".colorInput" )[ i ].style({ width: "100%" });

		}	

		/* Inserting headers */
		
		table.insertRow( [ 

			{ name: "R", width: 0.03 }, 
			{ type: "custom", node: redCanvas, width: 0.35 },
			{ type: "custom", node: redInput, width: 0.09 },
			{ name: "", width: 0.02 },  /* Blank cell */
			{ name: "H", width: 0.03 }, 
			{ type: "custom", node: hueCanvas, width: 0.35 },
			{ type: "custom", node: hueInput, width: 0.09 }

		]);

		table.insertRow( [ 

			{ name: "G", width: 0.03 }, 
			{ type: "custom", node: greenCanvas, width: 0.35 },
			{ type: "custom", node: greenInput, width: 0.09 },
			{ name: "", width: 0.02 },  /* Blank cell */
			{ name: "S", width: 0.03 }, 
			{ type: "custom", node: saturationCanvas, width: 0.35 },
			{ type: "custom", node: saturationInput, width: 0.09 }

		]);

		table.insertRow( [ 

			{ name: "B", width: 0.03 }, 
			{ type: "custom", node: blueCanvas, width: 0.35 },
			{ type: "custom", node: blueInput, width: 0.09 },
			{ name: "", width: 0.02 },  /* Blank cell */
			{ name: "V", width: 0.03 }, 
			{ type: "custom", node: brightnessCanvas, width: 0.35 },
			{ type: "custom", node: brightnessInput, width: 0.09 }

		]);
		

		for( var i = 0; i < View.get( ".colorCanvas" ).length; i++ ){

			View.get( ".colorCanvas" )[ i ].style({ width: "100%", height: "20px" });
		}

		var width = redCanvas.get( "offsetWidth" ); /* The width of sliders will be identical so just chose one. */
	
		for( var i = 0; i < View.get( ".colorCanvas" ).length; i++ ){

			var slider = View.get( ".colorCanvas" )[ i ];

			slider.set({ width: width, height: "20" });

		}

		setInputOnChange( redInput,   redCanvas,   "r" );
		setInputOnChange( greenInput, greenCanvas, "g" );
		setInputOnChange( blueInput,  blueCanvas,  "b" );

		redInput.value(        ColorPalette.r );
		greenInput.value(      ColorPalette.g );
		blueInput.value(       ColorPalette.b );
		hueInput.value(        ColorPalette.h );
		saturationInput.value( ColorPalette.s );
		brightnessInput.value( ColorPalette.v );

		drawSlider( View.get( "#redCanvas"        ).node.getContext( "2d" ), width, ColorPalette.r / 255 );
		drawSlider( View.get( "#greenCanvas"      ).node.getContext( "2d" ), width, ColorPalette.g / 255 );
		drawSlider( View.get( "#blueCanvas"       ).node.getContext( "2d" ), width, ColorPalette.b / 255 );
		drawSlider( View.get( "#hueCanvas"        ).node.getContext( "2d" ), width, ColorPalette.h / 360 );
		drawSlider( View.get( "#saturationCanvas" ).node.getContext( "2d" ), width, ColorPalette.s );
		drawSlider( View.get( "#brightnessCanvas" ).node.getContext( "2d" ), width, ColorPalette.v );

		addEventListeners( View.get( "#redCanvas"        ), width, "rgb" );	
		addEventListeners( View.get( "#greenCanvas"      ), width, "rgb" );	
		addEventListeners( View.get( "#blueCanvas"       ), width, "rgb" );
		addEventListeners( View.get( "#hueCanvas"        ), width, "hue" );
		addEventListeners( View.get( "#saturationCanvas" ), width, "percentage" );
		addEventListeners( View.get( "#brightnessCanvas" ), width, "percentage" );	

		drawColor( color.node.getContext( "2d" ), color.get( "offsetWidth" ), ColorPalette.toRGB() );


		return function(){

			if( input ){

				input.value( ColorPalette.toRGB() );

				if( Buffer.getCurrentBox() != null ){

					AttributeMenu.saveStyle();
					AttributeMenu.saveBox();

				}else{

					AttributeMenu.saveStyle();
					AttributeMenu.saveSpace();
					
				}

			}

		}

	}


	Dialog.switchView = function( index ){

		switch( index ){

			case 0:

				document.getElementById( "mainContainer" ).style.display = "" ;
				document.getElementById( "contentEditor" ).style.display = "none" ;
				document.getElementById( "scriptContainer" ).style.display = "none" ;

				break;

			case 1:
			
				document.getElementById( "mainContainer" ).style.display = "none" ;
				document.getElementById( "contentEditor" ).style.display = "block" ;
				document.getElementById( "scriptContainer" ).style.display = "none" ;

				break;

			case 2:
			
				document.getElementById( "mainContainer" ).style.display = "none" ;
				document.getElementById( "contentEditor" ).style.display = "none" ;
				document.getElementById( "scriptContainer" ).style.display = "block" ;

				break;

		}

	}

	Dialog.error = function( msg ){

		if( !msg ){

			this.dialogContent.innerHTML = "";
			this.dialogContent.innerHTML += "SORRY, CURRENTLY NOT IMPLEMENTED.";

		}else{

			this.dialogContent.innerHTML = msg;

		}

		return function(){}
	}

	return Dialog.init();

}();
