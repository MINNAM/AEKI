<?php
	
	$numberOfFiles = 0;
	$type = "";

	if( isset( $_REQUEST[ "numberOfFiles" ] ) ){

		$numberOfFiles = $_REQUEST[ "numberOfFiles" ];

	}
	
	for( $i = 0; $i < $numberOfFiles; $i++ ){

		$fileName = $_FILES[ "file".$i ][ "name" ];
		$fileType = $_FILES[ "file".$i ][ "type" ];
		$fileContent = file_get_contents( $_FILES[ "file".$i ][ "tmp_name" ] );
		$directory = "";

		if( stristr($fileType, "audio") ){

			$directory = "asset/audio/" . $fileName;
			file_put_contents( $directory, $fileContent );

		}else if( stristr($fileType, "text") ){

			$ext = pathinfo( $fileName )[ 'extension' ];

			if( $ext === "js" || $ext === "php" ){

				$directory = "asset/script/" . $fileName;

			}else{

				$directory = "asset/doc/" . $fileName;

			}

			
			file_put_contents( $directory, $fileContent );

		}else if( stristr($fileType, "video") ){

			$directory = "asset/video/" . $fileName;
			file_put_contents( $directory, $fileContent );

		}else if( stristr($fileType, "image") ){

			$directory = "asset/img/" . $fileName;
			file_put_contents( $directory, $fileContent );

		}else{

			$directory = "asset/etc/" . $fileName;
			file_put_contents( $directory, $fileContent );

		}

		echo $fileType;
		
	}

?>