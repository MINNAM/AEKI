/**
*	KeyEvent class is resposible for assigning key commands to events in the application.
*/
var KeyEvent = function(){

	var KeyEvent     = {},
	inputEventExist  = false,
	preventBackSpace = false,
	isInputOnFocus   = false,
	enterExceptions  = [],
	enterCallback,	
	inputs;
	
	/**
	*	Controller
	*	@constructs
	*/
	KeyEvent.init = function(){

		
		this.updateInputs();
		this.addEventListeners();

		return KeyEvent;

	}

	/**
	*	Callback function to trigger when input is focused 
	*	which indicates that input is reserved for event handler and also 
	*	prevents back space.
	*/
	KeyEvent.onInputFocus = function(){

		inputEventExist = true;
		preventBackSpace = true;
		
	}

	/**
	*	Callback function to trigger when input is on blurred.
	*/
	KeyEvent.onInputBlur = function(){

		preventBackSpace = false;

	}

	KeyEvent.getInputEventExist = function(){

		return inputEventExist;

	}

	/**
	*	Returns preventBackSpace flag.
	*	@returns {boolean}
	*/
	KeyEvent.getPreventBackSpace = function(){

		return preventBackSpace;

	}

	/**
	*	Assign event listener to all input tags that are associated with key events.
	*/
	KeyEvent.updateInputs = function(){

		var inputs = View.get( "input" ),
		textareas  = View.get( "textarea" ),
		allInputs  = View.combineToArray( inputs, textareas );

		

		for( var i = 0, max = allInputs.length; i < max; i++ ){

			allInputs[ i ].removeEventListener( "focus", this.onInputFocus );
			allInputs[ i ].removeEventListener( "blur", this.onInputBlur );
			
		}

		

		for( var i = 0, max = allInputs.length; i < max; i++ ){

			allInputs[ i ].addEventListener( "focus", this.onInputFocus );
			allInputs[ i ].addEventListener( "blur", this.onInputBlur );
			
		}

	}

	/**
	*	Sets enterCallback function.
	*/
	KeyEvent.setEnterCallback = function( _enterCallback ){

		enterCallback = _enterCallback;
		
	}

	/**
	*	Returns enterCallback function.
	*/
	KeyEvent.getEnterCallback = function(){

		return enterCallback;

	}

	/**
	*	Add event Listners for various key commands.
	*/
	KeyEvent.addEventListeners = function(){
		
		document.onkeydown = function( event ){
				
			/*
			*	Shift + alt
			*	Key commands are usually associated with Box.
			*/
			if ( event.shiftKey && event.altKey ) {
				
				if( ( event.target.nodeName != "INPUT" && event.target.nodeName != "TEXTAREA" ) ){

					switch( event.keyCode ){

						case 69: /** Shift + Alt + E to rearrange Box */					
							
							Buffer.getCurrentBox().rearrange();
							Buffer.setBoxToRearrange();

							View.closeToggle( 2 );

							break;

						case 78: /** Shift + N to create Tag */					

							event.preventDefault();
							Dialog.popUpDialogBox();
				    		Dialog.setOkFunction( Dialog.addTag() );
							Dialog.setCancelFunction();

							break;

					}

				}	

			/* 
			*	Shift
			*	Key commands are usually associated with Space.
			*/
			}else if ( event.shiftKey ) {
				
				if( ( event.target.nodeName != "INPUT" && event.target.nodeName != "TEXTAREA" ) ){

					switch( event.keyCode ){

						case 69: /** Shift + Alt + E to resize Space */					
							
							event.preventDefault();
							Dialog.popUpDialogBox();
				    		Dialog.setOkFunction( Dialog.resizeSpace() );
							Dialog.setCancelFunction();

							break;

						case 78: /** Shift + N to save the project */					

							event.preventDefault();
							Dialog.popUpDialogBox();
				    		Dialog.setOkFunction( Dialog.addSpace() );
							Dialog.setCancelFunction();

							break;

					}

				}

			/** Cmd */
			}else if ( ( navigator.platform.match( "Mac" ) ? event.metaKey : event.ctrlKey ) ) {
			    
			    switch( event.keyCode ){

			    	/** backspace */
					case 8:

						if( Buffer.getCurrentBox() != null ){

							Dialog.popUpDialogBox();
				    		Dialog.setOkFunction( Dialog.deleteBox() );
							Dialog.setCancelFunction();

						}else{

							Dialog.popUpDialogBox();
				    		Dialog.setOkFunction( Dialog.deleteSpace() );
							Dialog.setCancelFunction();

						}
						
						break;	
		        	
		        	case 68: /** Ctrl/Cmd + D to build project */
		        		
		        		event.preventDefault();

		        		Dialog.popUpDialogBox();
			    		Dialog.setOkFunction( Dialog.duplicateSpace() );
						Dialog.setCancelFunction();						

		        		break;

		        	case 82: /** Ctrl/Cmd + R to build project */
		        		
		        		event.preventDefault();

		        		Dialog.popUpDialogBox();			    		
			    		Dialog.setOkFunction( Dialog.buildProject() );
						Dialog.setCancelFunction();						

		        		break;

		        	case 83: /** Ctrl/Cmd + S to save project */
		        		
		        		event.preventDefault();

		        		Dialog.popUpDialogBox();			    		
			    		Dialog.setOkFunction( Dialog.saveProject() );
						Dialog.setCancelFunction();						
						
		        		break;

		        }

			 }else{ 

				switch( event.keyCode ){					

					/* Backspace */
					case 8:

						if( ( event.target.nodeName != "INPUT" && event.target.nodeName != "TEXTAREA" ) ){

							if( Buffer.getCurrentBox() != null ){

								Dialog.popUpDialogBox();
					    		Dialog.setOkFunction( Dialog.deleteBox() );
								Dialog.setCancelFunction();

							}else{

								Dialog.popUpDialogBox();
					    		Dialog.setOkFunction( Dialog.deleteSpace() );
								Dialog.setCancelFunction();

							}

							event.preventDefault();

						}						
						
						break;

					/* Save Attributes by enter */
					case 13:

						if( event.target.nodeName != "TEXTAREA" ){

							enterCallback();
							event.preventDefault();							
							
						}
						
						break;

					/* On Shift !!NOT IMPLEMENTED */
					case 16:

						Buffer.setShiftOn( true );

						break;

					/* Escape */
					case 27:

						for( var i = -1, max = 4 ; i < max; i++ ){

							View.closeToggle( i );
							
						}

						if( Buffer.getTempCurrentSpace() ){

							Buffer.getTempCurrentSpace().clicked = false;
							Buffer.getTempCurrentSpace().clickedIndex = 0;
							Buffer.getTempCurrentSpace().updateCells();
						}
						

						if( Dialog.isDialogOpen ){

							Dialog.closeDialogBox();
							Dialog.setOkFunction( null );

						}

						View.blurFromAll();		
					
						break;

					/* Up arrow to nagivate Biblelist */
					case 38:
						
						if( !Dialog.isDialogOpen && ( event.target.nodeName != "INPUT" && event.target.nodeName != "TEXTAREA" ) ){						

							KeyEvent.index--;
							
							if( KeyEvent.index < 0 ){

								KeyEvent.index = Controller.bibleListToArray.length - 1;

							}

							if( Controller.bibleListToArray[ KeyEvent.index ].type == "space" ){

								var spaceIndex = Controller.bibleListToArray[ KeyEvent.index ].index;
								
								Controller.updateSpaceView( spaceIndex );
								Buffer.setCurrentSpace( Controller.getOffice().getSpaces()[ spaceIndex ] );
								Buffer.setCurrentBox( null );
								StyleSelector.updateStyleSelector( "space", Controller.getOffice().getSpaces()[ Controller.bibleListToArray[ KeyEvent.index ].index ] );

							}else if( Controller.bibleListToArray[ KeyEvent.index ].type == "box" ){

								var child = Controller.bibleListToArray[ KeyEvent.index ].index,
								parent    = Controller.bibleListToArray[ KeyEvent.index ].parentIndex;

								Controller.updateBoxView({

									boxIndex: child,
									spaceIndex: parent 

								});

								StyleSelector.setCurrentStyleParent( "#" + Controller.getOffice().getSpaces()[ parent ].getAttribute().spaceId );										
								StyleSelector.updateStyleSelector( "box", Controller.getOffice().getSpaces()[ parent ].getBoxes()[ child ] );

							}

							event.preventDefault();

						}
						
						break;

					/* Down arrow to nagivate Biblelist */
					case 40: 

						if( !Dialog.isDialogOpen && ( event.target.nodeName != "INPUT" && event.target.nodeName != "TEXTAREA" ) ){						

							var bibleListToArray = Controller.bibleListToArray;

							KeyEvent.index++;
							KeyEvent.index %= bibleListToArray.length;
							
							Controller.updateBibleList( bibleListToArray[ KeyEvent.index ] );

							if( bibleListToArray[ KeyEvent.index ].type == "space" ){

								var spaceIndex = bibleListToArray[ KeyEvent.index ].index;
								Controller.updateSpaceView( spaceIndex );
								Buffer.setCurrentSpace( Controller.getOffice().getSpaces()[ spaceIndex ] );
								Buffer.setCurrentBox( null );
								StyleSelector.updateStyleSelector( "space", Controller.getOffice().getSpaces()[ bibleListToArray[ KeyEvent.index ].index ] );

							}else if( bibleListToArray[ KeyEvent.index ].type == "box" ){

								var child = Controller.bibleListToArray[ KeyEvent.index ].index,
								parent    = Controller.bibleListToArray[ KeyEvent.index ].parentIndex;

								Controller.updateBoxView({

									boxIndex: child,
									spaceIndex: parent 

								});

								StyleSelector.updateStyleSelector( "box", Controller.getOffice().getSpaces()[ parent ].getBoxes()[ child ] );

							}						

							event.preventDefault();

						}						
						
						break;

					case 112: /* F1 to change to Office View */

		        		event.preventDefault();
		        		Dialog.switchView( 0 );

		        		break;

		        	case 113: /* F2 to change to Content View */

		        		event.preventDefault();
		        		ContentHandler.updateEditor();
		        		Dialog.switchView( 1 );

		        		break;

		        	case 114: /* F3 to change to Build View */

		        		event.preventDefault();
		        		// document.getElementById( "buildView" ).contentWindow.location.reload();
		        		Dialog.switchView( 2 );

		        		break;
	

				}
			}

		}

		document.onkeyup = function( event ){

			if( event.ctrlKey || event.keyCode == 224 || event.keyCode == 17 || event.keyCode == 91 ){				

				event.preventDefault();


		    }

			switch( event.keyCode ){

				case 16:
					
					Buffer.setShiftOn( false );
					break;

			}

		}

	}


	return KeyEvent.init();

}();