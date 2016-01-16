<?php 
	
	session_start();

	require_once( "AccountManager.php" );

?>

<html>
<head>
	<title>AEKI</title>
	<link rel='stylesheet' type='text/css' href='css/login.css'>
</head>
<body>

<div id = 'loginContainer'>
	<img src = "./img/logo2.png" id = "logo" />
	<form id = 'loginForm' action = 'login.php' method = 'post' autocomplete="off" onfocus="this.removeAttribute('readonly');" >
		<ul>
			<li>
				<input type='text' name = 'id' ></input>
			</li>

			<li>
				<input type='password' name = 'pw' ></input>
			</li>

			<li>
				<button type= 'submit' id = 'loginButton'>LOGIN</button>

			</li>

		</ul>
	</form>
	<p>
		<?php 

			if( !AccountManager::doesDatabaseExist() ){

				header( "Location: ./adminSignUp.php" ); 
			
			}else{

				if( isset( $_SESSION[ "loggedIn" ]) ){

				}
				else if( isset( $_SESSION[ "errorCode" ] ) ){

					switch( $_SESSION[ "errorCode" ] ){

						case 0:

							echo "<br>Invalid id or password.";
							break;

						case 1: 
							echo "<br>Please login to view this page.";
							break;

					}
					
					$_SESSION[ "errorCode" ] = null;

				}

			}

		?>

	</p>
	
</div>


</body>
</html>