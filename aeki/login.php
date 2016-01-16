<?php 
	
	session_start();

	require_once( "AccountManager.php" );

	if( isset( $_POST[ 'id' ] ) && isset( $_POST[ 'pw' ] ) ){

		$id = $_POST[ 'id' ];
		$pw = $_POST[ 'pw' ];

		if( !AccountManager::doesDatabaseExist() ){

			
			header('Location: ./adminSignup.php');

		}else{

			
			if( AccountManager::verifyIdandPw( $_POST[ "id" ], $_POST[ "pw" ] ) ){

				$_SESSION[ "loggedIn" ] = true;
				$_SESSION[ "id" ] = $_POST[ 'id' ];
            	header('Location: ./aeki.php');

            }else{

            	$_SESSION[ "errorCode" ] = 0;
				header('Location: ./index.php');

            }


		}



	}else{

		header('Location: ./index.php');
		
	}

?>