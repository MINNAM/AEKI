/**
*   XmlRequest is responsible for handling xml requests including saving, 
*   loading saved projects and uploading assets.
*/
var XmlRequest = function(){

    var XmlRequest = {}, 
    projectXml     = Global.preference.defaultProjectDir;

    XmlRequest.init = function(){

        this.loadStyleAttribute();
        this.loadEventAttribute();
        
        if( Global.preference.loadOnStart ){
            
            this.loadProject( Global.util.getQueryString.project );
            
        }

        return XmlRequest;

    }

    /**
    *   Create XML Request
    *   @return {XMLHttpRequest}
    */
    XmlRequest.createRequest = function(){

        var xmlhttp;

        try{

            xmlhttp = new XMLHttpRequest();

         }catch( e ){

            try{

                xmlhttp = new ActiveXObject( "Msxml2.XMLHTTP" );

            }catch( e ) {

                try{

                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

                }catch( e ){

                    return false;

                }

            }

        }

        return xmlhttp;

    }

    /**
    *   Check if file exists.
    *   @param {string} url - The url of the file to be checked.
    */
    XmlRequest.doesFileExist = function( url ){

        var http = new XMLHttpRequest();

        http.open( 'HEAD', url, false );
        http.send();
        
        return http.status != 404;

    }

    XmlRequest.getTextData = function( _directory, callback ){

        var xmlhttp = this.createRequest()

        xmlhttp.open( "GET", _directory );
        xmlhttp.onreadystatechange = function() {

          callback( xmlhttp.responseText );

        }

        xmlhttp.send();

    }

    XmlRequest.accountManagerActions = function( action, params ){

        var xmlhttp = this.createRequest(),
        paramToString = function(){

            var temp = "";

            for( var key in params ){

                temp += key + "=" + params[ key ] + "&";

            }

            return temp;

        }();

        xmlhttp.open( "POST", "./AccountManager.php" , true );
        xmlhttp.onreadystatechange = this.displayData( xmlhttp );
        xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        xmlhttp.send( paramToString + "action=" + action );   
        
        console.log( paramToString + "action=" + action );
        
    }

    /**
    *   Send XML Document to save or build project.
    *   @param {string} _destination - Either "project" or "build".
    */
    XmlRequest.sendXMLDoc = function( _destination, _fileName ) {

        var xmlhttp = this.createRequest(), fileName, destination, data;

        if( _destination === "project" ){ 
            
            if( !_fileName ){

                fileName = Global.projectName;
                
            }else{

                fileName = _fileName; 

            }
            
            destination = "./saveProject.php";
            data        = "<project>" + Controller.getOffice().toXml() + TagSet.toXml() + StyleSet.toXml() + ScriptSet.toXml() + Ruler.toXml() + "</project>" ;

            xmlhttp.open( "POST", destination , true );
            xmlhttp.onreadystatechange = this.displayData( xmlhttp );
            xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
            xmlhttp.send( "data=" + data + "&filename=" + fileName );

            if( _fileName ){

                Global.util.loadProject( _fileName );

            }

        }else if( _destination === "create"){

            fileName = _fileName;
            destination = "./saveProject.php";
            data        = "<project></project>" ;

            xmlhttp.open( "POST", destination , true );
            xmlhttp.onreadystatechange = this.displayData( xmlhttp );
            xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
            xmlhttp.send( "data=" + data + "&filename=" + fileName );

            if( _fileName ){

                Global.util.loadProject( _fileName );

            }



        }else if( _destination === "build" ){

            fileName    = Global.projectName;
            destination = "./build.php";

            xmlhttp.open( "POST", destination , true );
            xmlhttp.onreadystatechange = this.displayData( xmlhttp );
            xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
            xmlhttp.send( "filename=" + fileName );            

        }

        Buffer.getSaveIndicators()[ 0 ].animate() // Blink save indicator when saved.
        Buffer.getSaveIndicators()[ 1 ].animate() // Blink save indicator when saved.
        Buffer.getSaveIndicators()[ 2 ].animate() // Blink save indicator when saved.

    }

    /**
    *   Load style attribute templates for inputs in AttributeMenu.
    */
    XmlRequest.loadStyleAttribute = function(){
        
        var xmlhttp = this.createRequest(),
        load        = function(){

            var xml   = xmlhttp.responseXML,
            styleType = xml.getElementsByTagName( "StyleType" );

            for( var i = 0, max = styleType.length; i < max; i++ ){
                
                var container = AttributeMenu.createStyleAttributeContainer( styleType[ i ].getAttribute( "name" ) ),
                attributes    = styleType[ i ].getElementsByTagName( "attribute" );

                for( var j = 0, maxx = attributes.length; j < maxx; j++ ){
                    
                    var name = attributes[ j ].getAttribute( "name" ),
                    type     = attributes[ j ].getElementsByTagName( "inputType")[ 0 ].childNodes[ 0 ].nodeValue;

                    if( type == "select" ){

                        var options = attributes[ j ].getElementsByTagName( "inputOption")[ 0 ].getElementsByTagName( "option" );
                        AttributeMenu.createStyleAttributeChild( container, name, type, options );

                    }else{

                        AttributeMenu.createStyleAttributeChild( container, name, type );

                    }                    

                }                

            }

            AttributeMenu.setInputState();
            View.handleDropdownList( "styleAttributeContainer" );

        }
        
        xmlhttp.open( "GET", Global.preference.styleAttrDir , false );
        xmlhttp.send();
        xmlhttp.onreadystatechange = this.displayData( xmlhttp, load );

    }    

    XmlRequest.loadEventAttribute = function(){
        
        var xmlhttp = this.createRequest(),
        load        = function(){

            var xml        = xmlhttp.responseXML,
            eventType      = xml.getElementsByTagName( "eventType" ),
            eventTypeNames = [];

            for( var i = 0, max = eventType.length; i < max; i++ ){
                
               eventTypeNames.push( eventType[ i ].getAttribute( "name" ) );

            }

            AttributeMenu.createEventAttributes( eventTypeNames );
            
            

        }
        
        xmlhttp.open( "GET", Global.preference.eventAttrDir , false );
        xmlhttp.send();
        xmlhttp.onreadystatechange = this.displayData( xmlhttp, load );

    }

    XmlRequest.exportProject = function(){
        
        var xmlhttp = this.createRequest();
    
        xmlhttp.open( "POST", "./exported/exportProject.php" , false );  
        xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        xmlhttp.send( "projectName=" + Global.projectName );      

    }

    XmlRequest.loadProject = function( projectName ){

        var xmlhttp = this.createRequest(),
        loadAll     = function(){

            var response = JSON.parse( xmlhttp.responseText ),
            parser       = new DOMParser(),
            xml          = parser.parseFromString( response.xml, "text/xml" );

            Global.projectName = response.name;

            XmlRequest.loadRuler( xml );
            XmlRequest.loadScriptSet( xml );
            XmlRequest.loadTagSet( xml );
            XmlRequest.loadStyleSet( xml );
            XmlRequest.loadOffice( xml );

            View.get( "#projectName").setInnerHTML( Global.projectName + ".xml" );

              
        }

        xmlhttp.open( "POST", "./openProject.php" , false );

        if( projectName ){

            xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
            xmlhttp.send( "projectName=" + projectName + ".xml");


        }else{ 
            
            xmlhttp.send();

        }
        
        xmlhttp.onreadystatechange = this.displayData( xmlhttp, loadAll );

    }

    XmlRequest.loadScriptSet = function( xml ){

        var scriptSet = xml.getElementsByTagName( "scriptSet")[ 0 ], scripts;

        if( scriptSet ){

            scripts = scriptSet.getElementsByTagName( "script" );
        
            for( var i = 0, max = scripts.length; i < max; i++ ){
    
                var name    = scripts[ i ].getElementsByTagName( "name" )[ 0 ].childNodes[ 0 ].nodeValue,
                directory   = scripts[ i ].getElementsByTagName( "directory" )[ 0 ].childNodes[ 0 ].nodeValue,            
                isItCreator = scripts[ i ].getElementsByTagName( "isItCreator" )[ 0 ].childNodes[ 0 ].nodeValue,
                importIndex = ""; 
    
                if( scripts[ i ].getElementsByTagName( "importIndex" )[ 0 ].childNodes[ 0 ] != undefined ){
    
                    importIndex = scripts[ i ].getElementsByTagName( "importIndex" )[ 0 ].childNodes[ 0 ].nodeValue;
    
                }
                    
    
                ScriptSet.addScript( name, directory.replace( name, "" ), importIndex, isItCreator );
                
    
            }

        }

    }

    /**
    *   Callback function for loading Ruler Class.
    */
    XmlRequest.loadRuler = function( xml ){
        
        var ruler = xml.getElementsByTagName( "ruler" )[ 0 ], clickedIndex;

        if( ruler ){

            clickedIndex = ruler.getElementsByTagName( "index" );

            for( var i = 0, max = clickedIndex.length; i < max; i++ ){

                Ruler.getCell( clickedIndex[ i ].childNodes[ 0 ].nodeValue ).incrementClick();

            }

            Ruler.updateCells();

        }
        
    }

    /**
    *   Callback function for loading TagSet Class.
    */
    XmlRequest.loadTagSet = function( xml ){

            
        var definitions = xml.getElementsByTagName( "definition" );

        for( var i = 0, max = definitions.length; i < max; i++ ){

            if( definitions[ i ] ){

                var key = definitions[ i ].getAttribute( "name" ),
                source  = definitions[ i ].getElementsByTagName( "source" )[ 0 ].childNodes[ 0 ].nodeValue,
                titles  = function(){

                    var _titles = [];

                    for( var j = 0, max = definitions[ i ].getElementsByTagName( "title" ).length; j < max; j++ ){

                        if( definitions[ i ].getElementsByTagName( "title" )[ j ].childNodes[ 0 ] !== undefined ){

                            _titles.push( definitions[ i ].getElementsByTagName( "title" )[ j ].childNodes[ 0 ].nodeValue );

                        }else{

                            _titles.push("");

                        }
                        
                    }

                    return _titles;

                }(), 
                descriptions = function(){

                    var _descriptions = [];

                    for( var j = 0, max = definitions[ i ].getElementsByTagName( "description" ).length; j < max; j++ ){

                        if( definitions[ i ].getElementsByTagName( "description" )[ j ].childNodes[ 0 ] !== undefined ){

                            _descriptions.push( definitions[ i ].getElementsByTagName( "description" )[ j ].childNodes[ 0 ].nodeValue );

                        }
                        
                    }

                    return _descriptions;

                }(),
                inputTypes = function(){

                    var _inputTypes = [];

                    for( var j= 0, max = definitions[ i ].getElementsByTagName( "inputType" ).length; j < max; j++ ){

                        if( definitions[ i ].getElementsByTagName( "inputType" )[ j ].childNodes[ 0 ] !== undefined ){

                            _inputTypes.push( definitions[ i ].getElementsByTagName( "inputType" )[ j ].childNodes[ 0 ].nodeValue );

                        }

                    }

                    return _inputTypes;

                }(),
                usedTags = function(){

                    var _usedTags = [];

                    for( var j= 0, max = definitions[ i ].getElementsByTagName( "usedTag" ).length; j < max; j++ ){

                        if( definitions[ i ].getElementsByTagName( "usedTag" )[ j ].childNodes[ 0 ] !== undefined ){

                            _usedTags.push( definitions[ i ].getElementsByTagName( "usedTag" )[ j ].childNodes[ 0 ].nodeValue );

                        }

                    }

                    return _usedTags;

                }();

                TagSet.createTag( key, { 

                    source: source,
                    titles: titles,
                    descriptions: descriptions,
                    inputType: inputTypes,
                    usedTags: usedTags

                });

            }

        }

    }

    /**
    *   Callback function for loading StyleSet Class.
    */
    XmlRequest.loadStyleSet = function( xml ){
            
        var imports = xml.getElementsByTagName( "imports" ),
        definitions = xml.getElementsByTagName( "style" );

        if( imports[ 0 ] != null ){

            if( imports[ 0 ].childNodes[ 0 ] ){

                StyleSet.setImports( imports[ 0 ].childNodes[ 0 ].nodeValue );
                
            }

        }

        
        for( var i = 0, max = definitions.length; i < max; i++ ){

            if( definitions[ i ] ){

                var parent = definitions[ i ].getAttribute( "parent" ),
                key        = definitions[ i ].getAttribute( "name" ),                    
                styleObj   = new Style( key, parent );

                for( var j = 0, maxx = StyleVariables.length; j < maxx; j++ ){
                    

                    styleObj[ StyleVariables[ j ] ] = ( definitions[ i ].getElementsByTagName( StyleVariables[ j ] )[ 0 ].childNodes[ 0 ] ) ? definitions[ i ].getElementsByTagName( StyleVariables[ j ] )[ 0 ].childNodes[ 0 ].nodeValue : "";

                }     

                StyleSet.addDefinition( parent, key , styleObj );

            }
            
        }   

        StyleSet.loadDefinition( StyleSelector.getCurrentStyleParent(), StyleSelector.getCurrentStyle() );

    }

    XmlRequest.loadOffice = function( xml ){

        var office  = xml.getElementsByTagName( "office" ),
        spaces      = xml.getElementsByTagName( "space" );

        /** Setting Office*/

        if( office[ 0 ] ){

            Controller.getOffice().setMeta( office[ 0 ].getAttribute( "title" ), office[ 0 ].getAttribute( "author" ), office[ 0 ].getAttribute( "description" ), office[ 0 ].getAttribute( "keywords" ) ); 

            if( office[ 0 ].getElementsByTagName( "head" )[ 0 ].childNodes[ 0 ] !== undefined ){

                Controller.getOffice().setHead( office[ 0 ].getElementsByTagName( "head" )[ 0 ].childNodes[ 0 ].nodeValue ); 

            }
            
            /** Setting Spaces*/
            for( var i = 0, max = spaces.length; i < max; i++ ){

                if( spaces[ i ] !== undefined && spaces[i].nodeName == "space" ){

                    var row    = spaces[i].getElementsByTagName( "row" )[0].childNodes[0].nodeValue,
                    spaceId    = spaces[i].getElementsByTagName( "spaceId" )[0].childNodes[0].nodeValue,
                    spaceType  = spaces[i].getElementsByTagName( "type" )[0].childNodes[0].nodeValue,
                    spaceClass = "";

                    if( spaces[i].getElementsByTagName( "spaceClass" )[0].childNodes[0] !== undefined ){

                        spaceClass = spaces[i].getElementsByTagName( "spaceClass" )[0].childNodes[0].nodeValue;

                    }
                    
                    Controller.createSpace({ 

                        row: row , 
                        spaceId: spaceId, 
                        spaceClass: spaceClass,
                        type: spaceType

                    });

                    var boxes = spaces[ i ].getElementsByTagName( "boxes" )[0].getElementsByTagName( "box" );

                    for( var j = 0, maxx = boxes.length; j < maxx; j++ ){                        

                        var boxStart = parseInt( boxes[ j ].getElementsByTagName( "start" )[0].childNodes[0].nodeValue ),
                        boxWidth     = parseInt( boxes[ j ].getElementsByTagName( "width" )[0].childNodes[0].nodeValue ),
                        boxHeight    = parseInt( boxes[ j ].getElementsByTagName( "height" )[0].childNodes[0].nodeValue ),
                        boxType      = boxes[ j ].getAttribute('type'),
                        boxAttribute = boxes[ j ].getElementsByTagName( "attr" )[0],
                        boxId        = boxAttribute.getElementsByTagName( "boxId" )[0].childNodes[0].nodeValue,
                        boxClass     = "",
                        boxTag       = "";

                        if( boxAttribute.getElementsByTagName( "boxClass" )[0].childNodes[0] !== undefined ){

                            boxClass = boxAttribute.getElementsByTagName( "boxClass" )[0].childNodes[0].nodeValue;

                        }

                        if( boxAttribute.getElementsByTagName( "boxTag" )[0].childNodes[0] !== undefined ){

                            boxTag = boxAttribute.getElementsByTagName( "boxTag" )[0].childNodes[0].nodeValue;

                        }  
                        
                        var tempBox = Controller.createBoxByCoordinate({ 

                            start: boxStart, 
                            width: boxWidth, 
                            height: boxHeight, 
                            type: boxType,
                            attr: {

                                boxId: boxId,
                                boxClass: boxClass,
                                boxTag: boxTag

                            }

                        });
                        


                        for( var k = 0, maxxx = boxes[j].getElementsByTagName( "boxTagContent" ).length; k < maxxx; k++ ){

                            if( tempBox.getTag() !== undefined ){

                                tempBox.getTag().setContents( k,  boxes[j].getElementsByTagName( "boxTagContent" )[k].textContent );

                            }
                            
                        }

                    }

                }
              
            }

            if( Controller.getOffice().getSpaces()[ 0 ] !== undefined ){

                var firstSpace = Controller.getOffice().getSpaces()[ 0 ];

                if( firstSpace.getBoxes()[ 0 ] !== undefined ){

                    var firstBox = Controller.getOffice().getSpaces()[ 0 ].getBoxes()[ 0 ];

                    Buffer.setCurrentBox( firstBox );

                    Controller.updateBibleList({

                        index: firstBox.getIndex(),
                        type: "box",
                        parentIndex: firstBox.getSpaceIndex()

                    });

                    Controller.updateBoxView({

                        boxIndex: firstBox.getIndex(),
                        spaceIndex: firstBox.getSpaceIndex()

                    }); 

                    StyleSelector.setCurrentStyleParent( "#" + firstSpace.getAttribute().spaceId );                                      
                    StyleSelector.updateStyleSelector( "box", firstBox );

                }else{

                    Controller.updateSpaceView( 0 );

                    Buffer.setCurrentBox( null );
                    Buffer.setCurrentSpace( firstSpace );

                    StyleSelector.setCurrentStyleParent( ".Global" );               
                    StyleSelector.updateStyleSelector( "space", firstSpace );                            

                    KeyEvent.index = 0;

                }
                
                
            }
        }

    }

    XmlRequest.uploadFile = function( files ){

        var xmlhttp   = this.createRequest(),
        formData      = new FormData(),
        numberOfFiles = files.length;

        for( var i = 0; i < numberOfFiles; i++ ){

            formData.append( "file" + i , files[ i ] );

        }

        formData.append( "numberOfFiles", numberOfFiles );
        
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
        
        xmlhttp.open( "POST", "upload.php" , true );
        xmlhttp.send( formData );        
        this.updateAssetList();

    }

    XmlRequest.getFileListing = function( directory, callback ){

        var xmlhttp = this.createRequest();

        // Upload Finish
        xmlhttp.onload = function(){
            
            if( callback ){

                callback( JSON.parse( this.response ) );

            }      

        }
        
        xmlhttp.open( "POST", "getFile.php" , true );
        xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        xmlhttp.send( "directory=" + directory + "&listingType=0" );

    }

    
    XmlRequest.updateAssetList = function( callback ){

        var xmlhttp = this.createRequest();

        // Upload Finish
        xmlhttp.onload = function(){

            if( callback ){

                callback( JSON.parse( this.response ) );

            }      

        }
        
        xmlhttp.open( "POST", "getFile.php" , true );
        xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        xmlhttp.send( "directory=./asset/&listingType=1" );

    }

    XmlRequest.logout = function(){

        var xmlhttp = this.createRequest();

        // Upload Finish
        xmlhttp.onload = function(){

            window.location = "./index.php";

        }
        
        xmlhttp.open( "POST", "logout.php" , true );        
        xmlhttp.send();


    }

    XmlRequest.displayData = function( xmlhttp, callback ){

        if( xmlhttp.readyState == 1 ) {}
        if( xmlhttp.readyState == 2 ) {}
        if( xmlhttp.readyState == 3 ) {}
        if( xmlhttp.readyState == 4 ) {

            if( xmlhttp.status == 200 ) {

                callback();

            }

        }

    }

    return XmlRequest.init();

}();