<?php 

	$dir   = "./project/";
	$files = array();

	foreach( scandir( $dir ) as $fileName ){

		$fileInfo = pathinfo( $fileName );
		
		if( $fileInfo[ "extension" ] === "xml" ){

			$files[ $fileName ] = date("F d Y H:i:s.", filemtime( $dir . '/' . $fileName ) ) ;

		}
		
	}


?>