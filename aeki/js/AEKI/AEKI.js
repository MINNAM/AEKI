/**
*	Global variables and functions for AEKI.
* 
*	@author Min Nam mnam@jabuem.co
*	@version 1.0.0
*	@copyright Min Nam 2015 
*	@constructor
*/
var Global = {

	/**
	*	Title of the project
	*	@memberof Global
	*/
	title: "AEKI",

	projectName : "", 

	/**
	*	Preference for Global GUI	
	*	@namespace preference
	*	@memberof Global
	*/
	preference : {

		/** The max length of a space. */
		column : 100,
		/** Display cell index or not. */
		nodeIndex: false,
		/** Load XML data on start or not. */
		loadOnStart: true,
		/** Activate an indicator which logs user's actions on screen */
		indicator: false,
		defaultProjectDir: "./project/project.xml",
		styleAttrDir: "./pref/styleAttributes.xml",
		eventAttrDir: "./pref/eventAttributes.xml"

	},

	/**
	*	A description of each account levels.
	*	@memberof Global 
	*	@namespace accountLevel
	*/
	accountLevel: {

		/** Admin - access to all */
		0: "admin - access to all",
		/** User1 - access to all except managing accounts */
		1: "user1 - access to all except managing accounts",
		/** User2 - only allowed to contents */
		2: "user2 - only allowed to contents",
		/** Participant - only allowed to view */
		3: "participant - only allowed to view",

	},

	/** @memberof Global */
	dir: {

		script: "./asset/script/"

	},

	/** @memberof Global */
	mainContainer : {

		node:   "",
		width:  "",
		height: "",

	},

	/**
	*	General problems
	*	@memberof Global
	*	@namespace util
	*/
	util: { 

		/**
		*	Modify the first case of a string to uppercase.
		*	@param  {string} s - A string that needs it's first case to be uppercase.
		*	@return {string}
		*/ 
		upperFirstCase: function( s ){ 

			return s.charAt( 0 ).toUpperCase() + s.slice( 1 );

		},

		/**
		*	Find a hole in a sequence of integers	
		*	@param  {array} arr - A sequence that may have a hole.
		*	@param  {int} target - An index of item in a sequence that is needed to be checked.
		*	@return {boolean}
		*/
		isItUnique: function( arr, target, key ){ 

			if( key ){

				for( var i = 0, max = arr.length; i < max; i++ ){			

					if( target == arr[ i ][ key ] ){

						return false;

					}

				}

				return true;

			}else{

				for( var i = 0, max = arr.length; i < max; i++ ){			

					if( target == arr[ i ] ){

						return false;

					}

				}

				return true;

			}
			
		},

		/**
		*	Truncate string to given size n.
		*	@param  {string} s - A string that needs to be truncated.
		*	@param  {int} n - String that needs it's first case to be uppercase
		*	@return {string}
		*/ 
		truncate: function( s, n ){

		   	if ( s.length > n ){

		   		return s.substring( 0, n ) + '...';

		   	}else{

		   		return s;

		   	}

		    	

		},
		
		getQueryString: function( a ) {

                if ( a == "" ){

                    return {};

                } 

                var b = {};

                for ( var i = 0, max = a.length; i < max; ++i ){

                    var p = a[ i ].split( '=' , 2 );

                    if ( p.length == 1 ){

                        b[ p[ 0 ] ] = "";

                    }else{

                        b[ p[ 0 ] ] = decodeURIComponent( p[ 1 ].replace( /\+/g, " " ) );

                    }

                }

                return b;

         }( window.location.search.substr( 1 ).split( '&' ) ),

        /**
		*	@param  {string}
		*	@return {string}
		*/ 
        loadProject: function( projectName ){

        	if( window.location.href.indexOf( '?' ) > 0 ){

        		window.location.href = window.location.href.substring( 0, window.location.href.indexOf( '?' ) + 1 ) + "project=" + projectName;

        	}else{

        		window.location.href = window.location.href.substring( 0, window.location.href.indexOf( '?' ) + 1 ) + "?project=" + projectName;

        	}
        	

        }               

	},

	/**
	*	Style variables which are populated and filled by XmlRequest.loadStyleAttribute()
	*	@memberof Global
	*	@see XmlRequest
	*/
	styleVariables : [],

	/**
	*	Settings and function for textarea
	*	@memberof Global
	*/
	textarea: {

		indent: 10, 
		getIndent: function(){

			var space = "";

			for( var i = 0, max = this.indent; i < max; i++ ){

				space += " ";

			}

			return space;
		}

	},

	/**
	*	A list of color codes for AEKI's user interface.
	*	@memberof Global
	*/
	colors: {

		cellOddNumbered :  "rgb(220,220,220)", 
		cellEvenNumbered : "rgb(190,190,190)",
		cellSelected:      "rgb(227,137,146)",
		cellGuide:         "rgb(100, 207, 168)",
		cellTrigger:       "rgb(227,137,146)",
		cellReserved:      "rgb(150,150,150)",
		cellRearrange: 	   "purple",
		cellDefault:       "white",
		cellHover: 		   "white",
		cellSample:		   "white",
		cellErrorFill:	   "white",
		cellErrorStroke:   "rgb(220,100,100)",
		cellAllowed: 	   "white",
		cellAllowedStroke: "rgb(100,100,220)",
		box: 			   "rgb(170,170,170)",
		boxHighlight: 	   "rgba(227,137,146,0.9)",
		guideBox: 		   "rgba(100, 207, 168, 0.9)",
		guideBoxHighlight: "rgba(227,137,146,0.75)",
		boxTempHighlight:  "rgb(247,166,157)",
		spaceHighlight:    "rgb(254,194,103)",
		listHighlight: 	   "rgb(227,137,146)",
		audioLevel: 	   "rgb(100, 207, 168)",
		validatorTrue:     "rgb(100, 207, 168 )",
		validatorFalse:    "#ED4545",
		saveIndicator:     "rgb(100, 207, 168 )"       

	},

}