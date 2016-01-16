<?php

	$location 	 = $_POST[ "directory" ];
	$listingType = $_POST[ "listingType" ];

	$dir = scandir( $location );

	switch( $listingType ){

		case 0:

			$files = array();

			foreach( $dir as $file ){

				if( !in_array( $file, [".", "..", ".DS_Store"] ) ){

				$fullDirectory = $location.$file;

					$fileInfo = ( object ) [ 

						'name' => $file,
						'date' =>  date ("m/d/y H:i:s", filemtime( $fullDirectory ) ),
						'size' =>  round( filesize( $fullDirectory ) / 1000000 , 2 ) . "MB",
						'type' =>  pathinfo( $fullDirectory, PATHINFO_EXTENSION)

					];

					array_push( $files, $fileInfo );
					
				}

			}

			echo json_encode( $files );

			break;

		case 1:
			$directory = array();

			foreach( $dir as $d ){

				if( !in_array( $d, [".", "..", ".DS_Store"] ) ){

					$files = array();
					
					foreach( scandir( $location . $d ) as $file ){

						if( !in_array( $file, [".", "..", ".DS_Store"] ) )
						{
							$fullDirectory = $location.$d.'/'.$file;

							$fileInfo = ( object ) [ 

								'name' => $file,
								'date' =>  date ("m/d/y H:i:s", filemtime( $fullDirectory ) ),
								'size' =>  round( filesize( $fullDirectory ) / 1000000 , 2 ) . "MB",
								'type' =>  pathinfo( $fullDirectory, PATHINFO_EXTENSION)

							];

							 array_push( $files, $fileInfo );

						}

					}
					
					$directory[ $d ] = $files;

				}

			}

			echo json_encode( $directory );
		break;

	}

	
?>