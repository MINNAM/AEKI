<?php 

	$dir = "./project/";

	if( isset( $_POST[ "projectName" ] ) ){

		$projectData = array( "name" => str_replace( ".xml", "", $_POST[ "projectName" ] ), "xml" => file_get_contents( $dir . '/' . $_POST[ "projectName" ] ) );

		echo json_encode( $projectData );

	}else{

		$files = array();

		foreach( scandir( $dir ) as $fileName ){

			$fileInfo = pathinfo( $fileName );
			
			if( $fileInfo[ "extension" ] === "xml" ){

				$files[ $fileName ] = filemtime( $dir . '/' . $fileName ) ;

			}
			
		}

		arsort( $files );	
		
		$latestModified = key( $files );

		$projectData = array( "name" => str_replace( ".xml", "", $latestModified ), "xml" => file_get_contents( $dir . '/' . $latestModified ) );

		echo json_encode( $projectData, JSON_PRETTY_PRINT );

	}

	
	

?>