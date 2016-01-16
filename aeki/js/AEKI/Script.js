var Script = function( name, directory ){

	var Script = {},
	directory,
	isItCreator = 0,
	importIndex = "";

	Script.init = function(){

		this.setName( name );
		this.setDirectory( directory );

		return Script;

	}

	Script.getName = function(){

		return name;

	}

	Script.setName = function( _name ){

		name = _name;

	}

	Script.getDirectory = function(){

		return directory;

	}

	Script.setDirectory = function( _directory ){

		directory = _directory + name;

	}

	Script.getIsItCreator = function(){

		return isItCreator;

	}

	Script.setIsItCreator = function( _isItCreator ){

		isItCreator = _isItCreator;
		
	}

	Script.getImportIndex = function(){

		return importIndex;

	}

	Script.setImportIndex = function( _importIndex ){

		importIndex = _importIndex;

	}

	Script.toXml = function(){

		var xml = "<script>";
		xml 	+= "<name>" 	   + name        + "</name>";
		xml 	+= "<directory>"   + directory   + "</directory>";
		xml 	+= "<isItCreator>" + isItCreator + "</isItCreator>";
		xml 	+= "<importIndex>" + importIndex + "</importIndex>";
		xml 	+= "</script>";

		return xml;

	}

	return Script.init();
}

var ScriptSet = function(){

	var ScriptSet = {},
	scripts 	  = [];

	ScriptSet.init = function(){

		this.importIndex = 1;

		return ScriptSet;

	}

	ScriptSet.addScript = function( _name, _directory, _importIndex, _isItCreator ){

		scripts[ _name ] = new Script( _name, _directory );

		if( _importIndex ){

			scripts[ _name ].setImportIndex( _importIndex );
			this.importIndex++;

		}

		if( _isItCreator ){

			scripts[ _name ].setIsItCreator( _isItCreator );

		}

	}

	ScriptSet.getScripts = function(){

		return scripts;

	}

	ScriptSet.get = function( key ){

		return scripts[ key ];

	}

	ScriptSet.whoIsCreator = function(){

		var creators = [];

		for( var key in scripts ){

			if( scripts[ key ].getIsItCreator() ){

				creators.push( scripts[ key ] );

			}
			
		}

		return creators;
	}

	ScriptSet.size = function(){

		var size = 0;

		for( var key in scripts ){

			size++;

		}

		return size;

	}

	ScriptSet.toXml = function(){

		var xml = "<scriptSet>";

		for( var key in scripts ){

			xml += scripts[ key ].toXml();
			
		}

		xml += "</scriptSet>";

		return xml;

	}

	return ScriptSet.init();

}();

var Creator = {

};