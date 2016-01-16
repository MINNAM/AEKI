<?php

	$fileName = $_FILES[ "file" ][ "name" ];
	$fileType = $_FILES[ "file" ][ "type" ];

	if( $fileType == "application/zip" ){

		$fileContent = file_get_contents( $_FILES[ "file" ][ "tmp_name" ] );
	
		$directory = "./tmp/" . $fileName;

		file_put_contents( $directory, $fileContent );

		$path = $directory;

		$zip = new ZipArchive;

		$finfo = finfo_open( FILEINFO_MIME_TYPE );

		if( $zip->open( $path ) === true ){

		    for( $i = 0; $i < $zip->numFiles; $i++ ) {

		        $filename = $zip->getNameIndex($i);
		        $fileinfo = pathinfo( $filename );
		        $fileDir  = "";
		        
		        if( strpos( $fileinfo[ "dirname" ], 'asset') !== false) {

					$fileType = finfo_file( $finfo, "zip://".$path."#".$filename );
					
					if( stristr($fileType, "audio") ){

						$fileDir = "asset/audio/" . $fileinfo[ "basename" ];

					}else if( stristr($fileType, "text") ){

						$ext = $fileinfo[ 'extension' ];

						if( $ext === "js" || $ext === "php" ){

							$fileDir = "asset/script/" . $fileinfo[ "basename" ];

						}else{

							$fileDir = "asset/doc/" . $fileinfo[ "basename" ];

						}


					}else if( stristr($fileType, "video") ){

						$fileDir = "asset/video/" . $fileinfo[ "basename" ];

					}else if( stristr($fileType, "image") ){

						$fileDir = "asset/img/" . $fileinfo[ "basename" ];

					}else{

						$fileDir = "asset/etc/" . $fileinfo[ "basename" ];

					}					

					echo $fileDir."<br>";

				    copy( "zip://".$path."#".$filename, $fileDir );

				}else{

					$fileDir = "project/" . $fileinfo[ "basename" ];

					copy( "zip://".$path."#".$filename, $fileDir );

					echo 'to project<br>';
				}
		       		        
		    }

		    $zip->close();

		}

	}
	
?>