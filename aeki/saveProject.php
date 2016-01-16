<?php


	$filename = $_POST[ 'filename' ];
	$file     = './project/' . $_POST['filename'] . '.xml';

	$content = "<?xml version='1.0' encoding='UTF-8'?>\n".$_POST['data'];

	file_put_contents( $file, $content );


?>