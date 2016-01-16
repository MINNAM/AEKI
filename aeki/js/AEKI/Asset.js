/**
*	AssetList is a container for asset(s) and displays their info. 
*	@constructor
*/
var AssetList = function(){

	var AssetList = {},
	folders 	  = {},
	assetsInUse   = [];

	AssetList.init = function(){		

		AssetList.updateAssetList();

		return AssetList;

	}

	/**
	*	Updates AssetList and run a callback method when updating is finished.
	*	@memberof AssetList
	*/
	AssetList.updateAssetList = function( callback ){

		XmlRequest.updateAssetList( function( list ){

			for( var key in list ){

				folders[ key ] = new Folder( key, list[ key ] );

			}

			if( callback){

				callback();

			}
			
		});

	}

	/**
	*	Add folder to the AssetList.
	*	@param {Folder} folder
	*	@memberof AssetList
	*/
	AssetList.addFolder = function( folder ){

		folders[ folder.getName() ] = folder ;
		
	}

	/**
	*	Sort folder.
	*	@param {string} key - The name of the folder to be sorted.
	*	@param {int} by - 0: Name, 1: Date, 2: Size, 3: Type
	*	@param {int} direction - 0: desc, 1: asc
	*	@memberof AssetList
	*/
	AssetList.sortFolder = function( key, by, direction ){

		var folder = folders[ key ],
		test 	   = [],
		sortBy	   = [],
		temp;
		

		for( var i = 0, max = folder.getFiles().length; i < max; i++ ){

			sortBy[ i ] = folder.getFiles()[ i ];

		}

		if( by != 2 ){
		
			if( direction == 0 ){

				sortBy.sort( function( a, b ){

					return a.getVariable( by ).localeCompare( b.getVariable( by ) );

				})

			}else{			

				sortBy.sort( function( a, b ){
		
					return b.getVariable( by ).localeCompare( a.getVariable( by ) );

				})

			}

		}else{

			if( direction == 0 ){

				sortBy.sort( function( a, b ){

					if( parseFloat( a.getVariable( by ).replace( "MB", "") ) < b.getVariable( by ).replace( "MB", "" ) ) return -1;
					if( parseFloat( a.getVariable( by ).replace( "MB", "") ) > b.getVariable( by ).replace( "MB", "" ) ) return 1;

					return 0;

				})

			}else{			

				sortBy.sort( function( a, b ){
		
					if( parseFloat( a.getVariable( by ).replace( "MB", "") ) < b.getVariable( by ).replace( "MB", "" ) ) return 1;
					if( parseFloat( a.getVariable( by ).replace( "MB", "") ) > b.getVariable( by ).replace( "MB", "" ) ) return -1;

					return 0;

				})

			}


		}

		return sortBy;
		
	}

	/**
	*	@return {Folder}
	*	@memberof AssetList
	*/
	AssetList.getFolder = function( key ){

		return folders[ key ];

	}

	/**
	*	@return {Folder[]}
	*	@memberof AssetList
	*/
	AssetList.getFolders = function(){

		return folders;

	}

	AssetList.addAssetsInUse = function( _asset ){

		assetsInUse.push( _asset );
		
	}

	AssetList.getAssetsInUse = function(){

		return assetsInUse;

	}

	return AssetList.init();

}();

/**
*	Folder class is a container for File class and child of AssetList class.
*	@constructor
*	@param {string} _name - The name of the folder
*	@param {Array.<File>} _files - Files 
*/
var Folder = function( _name, _files ){
	
	var Folder = {},
	name,
	span,
	files = [];

	Folder.init = function(){

		this.setName( _name );		 
		this.arrangeFiles( _files );

		return Folder;

	}

	/**
	*	Populate File objects.
	*	@memberof Folder
	*/
	Folder.arrangeFiles = function( _files ){

		for( var i = 0, max = _files.length; i < max; i++ ){

			files[i] = new File( _files[ i ].name, _files[ i ].date, _files[ i ].size, _files[ i ].type );

		}

	}

	/**
	*	@return {Array.<File>}
	*	@memberof Folder
	*/
	Folder.getFiles = function(){

		return files;

	}

	/**
	*	@param {string} _name - A name of the folder.
	*	@memberof Folder
	*/
	Folder.setName = function( _name ){

		name = _name;

	}

	/**
	*	@return {string} name
	*	@memberof Folder
	*/
	Folder.getName = function(){

		return name;

	}

	/**
	*	@return {string} "./asset/" + the name of the file = "/".
	*	@memberof Folder
	*/
	Folder.getPath = function(){

		return "./asset/" + name + "/";

	}

	Folder.createFileList = function( _fileTable, by, direction ){

		var fileTable = View.createTable({ table: _fileTable() });


		Dialog.updateAssetPreview( "", "none" );			
				
		var sortedFolder;

		if( direction !== undefined ){

			sortedFolder = AssetList.sortFolder( Folder.getName(), by, direction );


		}else{

			sortedFolder = AssetList.sortFolder( Folder.getName(), 1, 1 );

		}

		for( var key in sortedFolder ){				
			
			var row = fileTable.insertRow(

				[
					{
						type: "custom",
						node: View.createElement({ type: "span", name: Global.util.truncate( sortedFolder[ key ].getName(), 30 ), class: "fileNameCell" }),
						width: 0.5
					},
					{ 
						type: "custom",
						node: View.createElement({ type: "span", name: sortedFolder[ key ].getDate(), class: "fileDateCell" }),
						width: 0.2
					},
					{ 
						type: "custom",
						node: View.createElement({ type: "span", name: sortedFolder[ key ].getSize(), class: "fileSizeCell" }),
						width: 0.2
					},
					{ 
						type: "custom",
						node: View.createElement({ type: "span", name: sortedFolder[ key ].getType(), class: "fileTypeCell" }),
						width: 0.1
					}
				]

			);
			
			row.set({ 

				id: "fileListHeader",
				"data-key": key,
				"data-path": Folder.getPath() + sortedFolder[ key ].getName(),
				"data-type": sortedFolder[ key ].getType()

			});

			row.addEventListener( "click", function(){

				var dataPath = this.getAttribute( "data-path" );
				Buffer.setCurrentAsset(  "./aeki"+ dataPath.replace( dataPath[ 0 ], "" ) );				
				Dialog.updateAssetPreview( dataPath, dataPath.split("/")[ 2 ] );
				Dialog.updateAssetPreviewInfo( sortedFolder[ this.getAttribute( "data-key" ) ] );

				var allSpans = row.parent().child();

				
				
				for( var i = 0, max = allSpans.length; i < max; i++ ){

					if( dataPath  == allSpans[ i ].get( "data-path" ) ){

						allSpans[ i ].style({ background: Global.colors.listHighlight });

					}else{

						allSpans[ i ].style({ background: "none" });

					}
					
				}
				
			});

		}
		
	}
	/**
	*	Create entries for AssetList 
	*	@param {} _fileTable
	*/
	Folder.createSpan = function( _fileTable ){

		var self = this, 
		title    = document.createTextNode( name ),
		span     = document.createElement( "span" );

		span.appendChild( title );
		span.addEventListener( "click", function(){

			
			self.createFileList( _fileTable );

		});

		return span;

	}

	return Folder.init();

}

/**
*	File Class
*/
var File = function( _name, _date, _size, _type){

	var File = {},
	name,
	date,
	size,
	type;

	File.init = function(){

		name = _name;
		date = _date;
		size = _size;
		type = _type;

		return File;

	}

	/**
	*	@return {string} name - The name of the file.
	*/
	File.getName = function(){

		return name;

	}

	/**
	*	@return {string} date - The date when file was created.
	*/
	File.getDate = function(){

		return date;

	}

	/**
	*	@return {string} date - The size of the file in KB.
	*/
	File.getSize = function(){

		return size;

	}

	/**
	*	@return {string} type - The type of the file.
	*/
	File.getType = function(){

		return type;

	}

	File.getVariable = function( index ){

		switch( parseInt( index ) ){

			case 0:

				return this.getName();
				break;

			case 1:

				return this.getDate();
				break;

			case 2:

				return this.getSize();
				break;

			case 3:

				return this.getType();
				break;

		}

	}


	return File.init();

}