<?php

ini_set('memory_limit','256M');

class Preference{

	static $projectName = null;
	static $buildName   = null;

	public static function getProjectName(){

		if( self::$projectName !== null ){

			return self::$projectName;

		}else if( isset( $_POST[ 'filename'] ) ){
			
			self::$projectName .= "./project/" . $_POST[ 'filename' ] . ".xml";

			return self::$projectName;

		}

	}

	public static function getBuildName(){

		if( self::$buildName !== null ){

			return self::$buildName;

		}else if( isset( $_POST[ 'filename'] ) ){

			// self::$projectName = "./project/".$_POST[ 'filename' ].".xml";
			self::$buildName = $_POST[ 'filename' ];

			return self::$buildName;

		}

	}

}

class Space{

	private $id;
	private $class;
	private $row;
	private $boxes = array();
	
	public function __construct( $id , $class , $row ){
		
		$this->setId( $id ); 
		$this->setClass( $class ); 
		$this->setRow( $row );

	}

	public function getId(){

		return $this->id; 

	}

	public function setId( $id ){

		$this->id = $id;

	}

	public function getClass(){

		return $this->class;

	}

	public function setClass( $class ){

		$this->class = $class;

	}

	public function getRow(){

		return $this->row;
	}

	public function setRow( $row ){

		$this->row = $row;
	}

	public function getBoxes(){

		return $this->boxes;
	}

	public function addBox( $box ){

		array_push( $this->boxes, $box );
	}

	public function toString(){

		echo "Space Id: ".$this->getId()."<br>";
		echo "Space Class: ".$this->getClass()."<br>";
		echo "Space Row: ".$this->getRow()."<br>";
		echo "Space Boxes: <br>";

		foreach( $this->boxes as $box ){

			$box->toString();

		}	

	}

}

class Tag{

	private $tagName;
	private $source;
	private $contents;

	public function __construct( $tagName, $contents ){

		$this->setTagName( $tagName );
		$this->contents = $contents;
		
	}


	public function getTagName(){

		return $this->tagName;

	}

	public function setTagName( $tagName ){

		$this->tagName = trim( $tagName );

		$xml = simplexml_load_file( Preference::getProjectName() );

		foreach( $xml->tagSet->definition as $d ){

			
			if( $this->tagName == trim( $d[ "name" ] ) ){

				$this->setSource( $d->source );

			}


		}		

	}

	public function getSource(){

		return $this->source;

	}

	public function setSource( $source ){

		$this->source = $source;

	}

	public function getContents(){

		return $this->contents;

	}

	public function toHtml(){
	

		$sources = explode( '#CONTENT#', $this->getSource() );
		$html = "";

		for( $i = 0; $i < count( $this->contents ); $i++ ){

			$html .= $sources[ $i ] . " " . $this->contents[ $i ]; 
		}

		$html .= $sources[ count( $sources ) - 1 ] ;

		return $html;

	}

	public function setContents( $contents ){

		$this->$contents = $contents;

	}


}

class Box{

	private $start;
	private $row;
	private $col;
	private $width;
	private $height;
	private $id;
	private $class;	
	private $tag;

	public function __construct( $start, $width, $height, $id, $class, $tag ){

		$this->setStart( $start );
		$this->setWidth( $width );
		$this->setHeight( $height );
		$this->setId( $id );
		$this->setClass( $class );
		$this->setTag( $tag ); 

	}

	public function getStart(){

		return $this->start;

	}

	public function setStart( $start ){

		$this->start = $start;

		$this->setRow( intval( $start / 100 ) + 1 );
		$this->setCol( $start % 100 );

	}

	public function getRow(){

		return $this->row;

	}

	public function setRow( $row ){

		$this->row = $row;

	}

	public function getCol(){

		return $this->col;

	}

	public function setCol( $col ){

		$this->col = $col;
	}

	public function getWidth(){

		return $this->width;

	}

	public function setWidth( $width ){

		$this->width = $width;

	}

	public function getHeight(){

		return $this->height;

	}

	public function setHeight( $height ){

		$this->height = $height;

	}

	public function getId(){

		return $this->id;

	}

	public function setId( $id ){

		$this->id = $id;

	}

	public function getClass(){

		return $this->class;

	}

	public function setClass( $class ){

		$this->class = $class;

	}

	public function getTag(){

		return $this->tag;

	}

	public function setTag( $tag ){

		$this->tag = $tag;

	}

	public function toHtml(){



	}

	public function toString(){

		echo "Box Id: ".$this->getId()."<br>";
		echo "Box Class: ".$this->getClass()."<br>";
		echo "Box Row: " . $this->getRow() . "<br>";
		echo "Box Col: " . $this->getCol() . "<br>";
		echo "Box Start: ".$this->getStart()."<br>";
		echo "Box Width: ".$this->getWidth()."<br>";;
		echo "Box Height: ".$this->getHeight()."<br>";;
		echo "Box Contents: ";

		foreach( $this->getTag() as $tag ){

			echo $tag->getContents."<br>";

		}

	}


}

class Style{

	private $identifier;
	private $source;
	public static $attributeNames = array();

	public static function setAttributeNames() {

		// echo "hello";
		// $xml = simplexml_load_file("styleAttributes.xml") or die("Error: Cannot create object Style Attributes");

		$xml = new DOMDocument();
		$xml->load('./pref/styleAttributes.xml');

		$allAttributes = $xml->getElementsByTagName( "attribute" );

		foreach( $allAttributes as $attr){

			Style::$attributeNames[ $attr->getAttribute( 'name' ) ] = $attr->getAttribute( 'build-name' ) ;
			
		}

        
    }
	
	public function __construct( $identifier, $source ){
		
		$this->setIdentifier( $identifier ); 
		$this->setSource( $source ); 
		
		
	}

	public function getIdentifier(){

		return $this->identifier;

	}

	public function setIdentifier( $identifier ){

		$this->identifier = $identifier;

	}

	public function getSource(){

		return $this->source;

	}

	public function setSource( $source ){

		$this->source = $source;

	}

	

}

class Meta{

	private $title;
	private $author;
	private $description;
	private $keywords;

	public function __construct( $title, $author, $description, $keywords ){

		$this->title 	   = $title;
		$this->author 	   = $author;
		$this->description = $description;
		$this->keywords    = $keywords;

	}

	public function toHtml(){

		$html = "";

		if( $this->title != null ){

			$html .= "<title>" . $this->title . "</title>";

		}

		if( $this->author != null ){

			$html .= "<meta name='author' content='" . $this->author . "'>";

		}

		if( $this->description != null ){
			
			$html .= "<meta name='description' content='" . $this->description . "'>";

		}

		if( $this->keywords != null ){
			
			$html .= "<meta name='keywords' content='" . $this->keywords . "'>";

		}		

		return $html;
		
	}

}

class Script{

	private $name;
	private $directory;
	private $importIndex;


	public function __construct( $name, $directory, $importIndex ){
		
		$this->name = $name;
		$this->directory = $directory;
		$this->importIndex = intval( $importIndex );

	}

	public function getName(){

		return $this->name;
	}

	public function getDirectory(){


		return substr( $this->directory, 2,  strlen( $this->directory ) );

	}

	public function getImportIndex(){

		return $this->importIndex;

	}

	public static function compare( $a , $b ){

		return $a->getImportIndex() > $b->getImportIndex();

	}

}

class Creator{
	
	private $meta;
	private $head;
	private $spaces;
	private $scripts;
	private $styles;

	public function __construct(){


		$xml = simplexml_load_file( Preference::getProjectName() ) or die("Error: Cannot create object office");
		$this->spaces = array();

		$this->meta = new Meta( $xml->office["title"], $xml->office["author"], $xml->office["description"], $xml->office["keywords"] );

		$i = 0;

		$this->head = $xml->office->head;

		foreach( $xml->office->spaces->space as $space ){

			$this->spaces[ $i ] = new Space( $space->attr->spaceId, $space->attr->spaceClass, $space->row );

			foreach( $space->boxes->box as $box ){

				if( $box['type'] == "default" ){

					$contents = array();

					foreach( $box->attr->boxTagContents->boxTagContent as $content){

						array_push( $contents, $content );

					}

					$tag = null;

					if( $box->attr->boxTag != "" && $box->attr->boxTag != null ){

						$tag = new Tag( $box->attr->boxTag, $contents );
						
					}

					$this->spaces[$i]->addBox( new Box(

						$box->start,
						$box->width,
						$box->height,
						$box->attr->boxId,
						$box->attr->boxClass,
						$tag

					));
				}

			}

			

			$i++;

		}

		$xml2 = simplexml_load_file( Preference::getProjectName() ) or die("Error: Cannot create object styleset");
		$this->styles = array();
		$this->scripts = array();

		$i = 0;

		foreach ($xml2->scriptSet->script as $script ) {
			
			if( $script->importIndex > 0 ){

				array_push( $this->scripts, new Script( $script->name, $script->directory, $script->importIndex ) );

			}
			
			
		}

		
		usort( $this->scripts, array( "Script", "compare"));
		
		foreach( $xml2->styleSet->style as $style ){
			
			$identifier = "";

			if( $style['parent'] != "#office" ){
				
				$identifier =  "#office " .$style['parent']." ". $style['name'].""; 

			}else{

				$identifier = $style['parent']." ".$style['name']."";

			}

			
			$source = "";
			

			foreach( $style->children() as $attr ){

				if( $attr != null && $attr != ""){

					if( $attr->getName() === "bg-img" ){

						$source .= "\t".Style::$attributeNames[ $attr->getName() ]. ": url('" . $attr. "');\n";						
						
					}else{

						$source .= "\t".Style::$attributeNames[ $attr->getName() ]. ": " . $attr. ";\n";

					}

					

				}
				
			}

			//background-repeat: no-repeat;
			
			
			$this->styles[ $i ] = new Style( $identifier, $source );	

			$i++;

		}
		
		
		$this->createStylesheet( $xml2->styleSet->imports );
		$this->createHtml();

	}

	public function getSpaces(){

		return $this->spaces;

	}

	public function createStylesheet( $imports ){

		$file = "../".Preference::getBuildName() . ".css";
		$content .= $imports;
		$content .= "\nbody {\n\tmargin: auto;\n\theight: 100%;\n\tzoom: 1;\n}\n";
		$content .=	"* { \n". "\tmargin: 0;\n\tpadding: 0;\n\tbackground-repeat: no-repeat;\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-o-user-select: none;\n\tuser-select: none;\n}\n";
		$content .= "input:focus, select:focus, textarea:focus, button:focus {\n\toutline: none; \n}\n";
		$content .=	"::-webkit-scrollbar { display: none; }\n";
		$content .= ".global { \n\tpadding: 0;\n\tmargin: 0;\n\tdisplay:table-cell;\n\tvertical-align: middle;\n\theight: 100%;\n\tdisplay:block;\n\twidth: 100%;\n}"; 
		
		for( $i = 0; $i < count( $this->styles ); $i++ ){

			$content .= "\n" . ($this->styles[ $i ]->getIdentifier()) . " {\n";
			$content .= $this->styles[ $i ]->getSource();
			$content .= "}";

		} 

		file_put_contents( $file, $content );

	}

	public function createHtml(){

		$html = "";
		$html .= "<html>";
		$html .= "<head>";
		$html .= $this->meta->toHtml();
		$html .= $this->head;
		$html .= "<link rel='stylesheet' type='text/css' href='" . Preference::getBuildName() . ".css'>";
		$html .= "</head>";
		$html .= "<body id  = 'office'>";
		$html .= "<div class  = 'global'>";

		$i = 0;
		foreach( $this->spaces as $space ){
			
			if(  $space->getClass() != null ){

				if( $i == 0 ){


					$html .= "<article id = " . $space->getId() . " class = '" . $space->getClass() . "' data-row = " . $space->getRow() .">";

					foreach( $space->getBoxes() as $box ){

						$html .= "<section id = " . $box->getId() . " class = '" . $box->getClass() . "' data-row = '" . $box->getRow() . "' data-col = '" . $box->getCol() . "' data-width = '". $box->getWidth(). "' data-height = '". $box->getHeight() ."' >\n";
						
						if( $box->getTag() != null ){

							$html .=  $box->getTag()->toHtml();

						}						

						$html .= "</section>";

					}


					$html .= "</article>";

				}else{

					$html .= "<article id = " . $space->getId() . " class = '" . $space->getClass() . "' data-row = " . $space->getRow() .">";

					foreach( $space->getBoxes() as $box ){

						$html .= "<section id = " . $box->getId() . " class = '" . $box->getClass() . "' data-row = '" . $box->getRow() . "' data-col = '" . $box->getCol() . "' data-width = '". $box->getWidth(). "' data-height = '". $box->getHeight() ."' >\n";
						
						if( $box->getTag() != null ){

							$html .=  $box->getTag()->toHtml();

						}

						$html .= "</section>";

					}

					$html .= "</article>";

				}

			}
			
			$i++;

		}
		
		$html .= "</div>";

		$html .= "<script src = './aeki/js/AEKI/Creator.js' ></script>";
		foreach( $this->scripts as $script ){

			$html.= "<script src = './aeki/".$script->getDirectory()."'></script>";

		}

		$html .= "</body>";
		$html .= "</html>";

		file_put_contents( "../".Preference::getBuildName() . ".html", $html );

	}

}

Style::setAttributeNames();
$creator1 = new Creator();


?>