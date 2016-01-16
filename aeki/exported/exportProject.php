<?php
	
	ini_set( "max_execution_time", 300 );

	if( isset( $_POST[ "projectName" ] ) ){

		function findAsset( $string ){

			$pattern = '/\/asset\/[a-z]+\/([A-Za-z_\-+0-9. ]+)/';

			preg_match_all( $pattern, $string, $matches );

			return $matches[ 0 ];
		}

		function Delete( $path ){

		    if ( is_dir( $path ) === true)
		    {
		        $files = array_diff( scandir($path), array('.', '..') );

		        foreach ( $files as $file ){

		            Delete(realpath($path) . '/' . $file);
		        }

		        return rmdir($path);
		    } else if (is_file($path) === true)
		    {
		        return unlink($path);
		    }

		    return false;

		}

		$projectName = $_POST[ "projectName" ];
		
		/* Create dir fir exported projects */
		if( !is_dir( "./project-$projectName" ) ){

			mkdir( "./project-$projectName" , 0777, true );
			mkdir( "./project-$projectName/asset/" , 0777, true );

		}

		/* Copy project xml to the exported dir */
		copy( "../project/$projectName.xml", "./project-$projectName/$projectName.xml" );


		/* Find '.asset/*' in project xml file */
		$file		 = fopen( "./project-$projectName/$projectName.xml", "r+" );
		$xmlToString = "";

		while( ! feof( $file ) ){

			$xmlToString .= htmlspecialchars( fgets( $file ) ) ;

		}
		
		fclose( $file );

		foreach( findAsset( $xmlToString ) as $path ){

			copy( ".." . $path, "./project-$projectName/asset/" . pathinfo( "$path" )[ "basename" ] );

		}

		/* Find '.asset/*' in project all sripts */
		$dir = "../asset/script/";
		$dh  = opendir( $dir );
		while( false !== ( $filename = readdir( $dh ) ) ) {

			if( $filename != '.' && $filename != '..' && $filename != ".DS_Store"){
		    	
		    	$file		 = fopen( "../asset/script/$filename", "r" );
				$xmlToString = "";

				while( ! feof( $file ) ){

					$xmlToString .= fgets( $file );

				}

				foreach( findAsset( $xmlToString ) as $path ){
					
					copy( ".." . $path, "./project-$projectName/asset/" . pathinfo( "$path" )[ "basename" ] );

				}

				fclose( $file );

		    }

		}
		
		$zip = new ZipArchive();
		$zip->open( "./project-$projectName.zip", ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE);

		$iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( "./project-$projectName/", RecursiveDirectoryIterator::SKIP_DOTS )  );
		
		foreach( $iterator as $key=>$value ){

			echo realpath( $key )." $key<br>";
			
			$zip->addFile( realpath( $key ), $key ) or die ("ERROR: Could not add file: $key");

		}

		

		// delete( "./project-$projectName/" );

		
		
			

	} 

	


?>