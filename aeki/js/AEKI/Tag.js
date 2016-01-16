var Tag = function( tagType, box, source, titles, inputType ){
	
	var Tag = {};
	
	Tag.init = function(){

		this.setTagType( tagType );

		if( TagSet.getDefinitions()[ tagType ] ){

			this.setSource( TagSet.getDefinitions()[ tagType ].source );
			this.setTitles( TagSet.getDefinitions()[ tagType ].titles ); 
			this.setInputType( TagSet.getDefinitions()[ tagType ].inputType );

		}
			
		this.contents = [];

		return Tag;

	}

	Tag.isItDefaultTag = function( tagType ){
		
		if( Global.defaultTags[ tagType ] ){

			return true;

		}

		return false;
		
	}

	Tag.getTagType = function(){

		return this.tagType;

	}

	Tag.setTagType = function( tagType ){

		this.tagType = tagType;

	}

	Tag.getSource = function(){

		return this.source;

	}

	Tag.setSource = function( source ){

		this.source = source;

	}


	Tag.getTitles = function(){

		return this.titles;
		
	}

	Tag.setTitles = function( titles ){

		this.titles = titles; 

	}

	Tag.getInputType = function(){

		return this.inputType;

	}

	Tag.setInputType = function( inputType ){

		this.inputType = inputType;

	}

	Tag.setContents = function( index, content ){

		this.contents[ index ] = content;
		
	}

	Tag.getContents = function(){

		return this.contents;

	}

	Tag.getNumberOfContents = function(){

		return this.getTitles().length;

	}


	Tag.outputTag = function(){

		var source = this.getSource().replace("#id#", this.box.getAttribute().boxId);
		source = source.replace("#class#", this.box.getAttribute().boxClass)

		return source;

	}

	Tag.contentsToXml = function(){

		var xml = "";

		for( var i = 0, max = this.getContents().length; i < max; i++ ){

			xml += "<boxTagContent>";
			xml += "<![CDATA[";  
			xml += this.getContents()[ i ] ;
			xml += "]]>"; 
			xml += "</boxTagContent>";

		}

		return xml;

	}

	return Tag.init();

},

TagSet = function(){

	var TagSet = {},
	tagDefinitions = {};

	TagSet.INDENT = Global.textarea.getIndent();

	TagSet.init = function(){

		return TagSet;

	}

	TagSet.getDefinitions = function(){

		return tagDefinitions;

	}

	TagSet.validateSource = function( _source ){

		var validator 		   = View.get( "#validator" ),
		tagOpenPattern 	   	   = new RegExp( "[<][a-z0-9#=\'\" -]*[/]?[>]", "gi" ),
		tagClosurePattern 	   = new RegExp( "[<][/][a-z0-9 ]*[>]", "gi" ),
		tagOpenClosurePattern  = new RegExp( "[<][a-z0-9#=\'\" ]*[/]?[>]", "gi" ),
		tagOpenResult 	   	   = _source.split( tagOpenPattern ).length-1,
		tagClosureResult       = _source.split( tagClosurePattern ).length-1,
		tagOpenClosureResult   = _source.split( tagOpenClosurePattern ).length-1;


		if( tagOpenResult > tagClosureResult ){

			validator.setInnerHTML( "MISSING CLOSURE TAG." );

			return false;

		}else if( tagOpenResult > tagClosureResult ){
			
			validator.setInnerHTML( "MISSING OPEN TAG." );

			return false;

		}else if( tagOpenResult == 0 || tagClosureResult == 0) {

			validator.setInnerHTML( "NO TAG" );

			return false;

		}else{

			var contentPattern = new RegExp( "#CONTENT#", "gi" );

			validator.setInnerHTML( "VALIDATED" );

			return _source.split( contentPattern ).length - 1;

		}

	}

	/**
	*	@returns {int} number of tags used in a source code
	*/
	TagSet.evaluateTotalTags = function( source ){

		var tags 	= new RegExp( "[<][a-z#=\'\" ]*[/]?[>]", "gi" ),		
		tagsResult 	= source.split( tags ).length-1;

		return tagsResult;

	}

	/**
	*	@returns {array} Array of tags used in a source code
	*/
	TagSet.gatherAllTags = function( source ){

		var pattern  = new RegExp( "[ ]?[<][-a-z#=\'\" ]*[0-9]*[/]?[>]", "gi" ),		
		tagsResult 	 = source.match( pattern ),
		cleanPattern = new RegExp( "[<][a-z#=\'\"]*[0-9]*[ />]?", "gi" ),
		cleanTags	 = [];
		
		// Clean tags
		for( var i = 0, max = tagsResult.length; i < max; i++ ){

			var cleanTag = tagsResult[ i ].match( cleanPattern );

			cleanTag = cleanTag[ 0 ].replace("<", "");			
			cleanTag = cleanTag.replace("/", "");
			cleanTag = cleanTag.replace(">", "");

			cleanTags[ i ] = cleanTag.trim();

		}
		
		return cleanTags;

	}


	TagSet.addDefinition = function( _definition ){

		var definition = _definition.split( '\n' ),

		getTitle = function( str ){

			var pattern = /.*:{/i,
			result = str.match( pattern );

			pattern = /'.*'/;
			result = result[ 0 ].match( pattern );

			if( result !== null ){

				result = result[ 0 ].substring( 1, result[ 0 ].length - 1 );
				return result;

			}

		},

		getKey = function( str ){

			var pattern = /[a-z]*:/i,
			result = str.match( pattern );

			if( result !== null ){

				result = result[0].replace(	':', '');

				return '\"' + result + '\"';

			}

		},

		getValue = function( str ){

			var pattern = /[ ]*[a-z ]*:/i,

			result = str.replace( pattern, "" );
			

			if( result !== null ){

				result = result.replace( ',', "" );
				return result;

			}



		}

		var key,
		obj = "{";

		for( var i = 0, max = definition.length - 1; i < max; i++ ){

			switch( i ){
				case 0:

					key = getTitle( definition[ i ] );

					break;

				default:

					obj += ( getKey( definition[ i ] ) + ":" );

					if( i != max-1 ){

						obj += ( getValue( definition[ i ] ) + "," );

					}else{

						obj += ( getValue( definition[ i ] ) );
						obj += "}";

						var tempTag = JSON.parse( obj );

						this.createTag( key, tempTag );

					}
					
					break;

			}			

		}
		
	}

	TagSet.createTag = function( key, obj ){
		

		this.getDefinitions()[key] = obj;

		AttributeMenu.updateTagList();

	}

	TagSet.toXml = function(){

		var xml = "<tagSet>";

		for (var key in this.getDefinitions() ) {

		  	if ( this.getDefinitions().hasOwnProperty( key ) ){

		    	var definition = this.getDefinitions()[ key ];
		    	xml += "<definition name = \""+ key + "\">" ;
	          	xml += "<source><![CDATA[ " + definition.source + "]]></source>"; 

	          	// TITLES
	          	xml += "<titles>";
	          	for( var i = 0, max = definition.titles.length; i < max; i++ ){

	          		xml += "<title>" + definition.titles[ i ] + "</title>";

	          	}
	          	xml += "</titles>";

	          	// DESCRIPTIONS
	          	xml += "<descriptions>";
	          	for( var i = 0, max = definition.descriptions.length; i < max; i++ ){

	          		xml += "<description>" + definition.descriptions[ i ] + "</description>";

	          	}
	          	xml += "</descriptions>";

	          	// INPUT TYPES
	          	xml += "<inputTypes>";
	          	for( var i = 0, max = definition.inputType.length; i < max; i++ ){

	          		xml += "<inputType>" + definition.inputType[ i ] + "</inputType>";

	          	}
	          	xml += "</inputTypes>";

	          	// USED TAGS
	          	xml += "<usedTags>";
	          	for( var i = 0, max = definition.usedTags.length; i < max; i++ ){

	          		xml += "<usedTag>" + "<![CDATA[ " + definition.usedTags[ i ] + "]]></usedTag>";

	          	}
	          	xml += "</usedTags>";

	          	xml += "</definition>";
	          	
		    }

		}

		xml += "</tagSet>";

		return xml;

	}

	return TagSet.init();

}();