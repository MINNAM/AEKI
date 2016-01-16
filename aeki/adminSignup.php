<?php 
	
	session_start();

?>

<html>
<head>
	<title>AEKI</title>
	<link rel='stylesheet' type='text/css' href='css/login.css'>
</head>
<body>

<div id = 'loginContainer'>
	<img src = "./img/logo2.png" id = "logo" />
	<form id = 'signupForm' action = 'login.php' method = 'post' autocomplete="off" onfocus="this.removeAttribute('readonly');" >
		<ul>
			<li>
				<label>ID</label>
				<input id = "textId" type='text' name = 'id' readonly ></input>
			</li>
			<li>
				<label>PASSWORD</label>
				<input id = "textPw" type='password' name = 'pw' ></input>
			</li>

			<li>
				<label>VERIFY PASSWORD</label>
				<input id = "textRePw" type='password' name = 'repw' ></input>
			</li>
			
			<li>
				<label>EMAIL</label>
				<input id = "textEmail" type='text' name = 'email' ></input>
			</li>
			<li>
				<label>VERIFY EMAIL</label>
				<input id = "textReEmail" type='text' name = 'reemail' ></input>
			</li>

			<li>
				<button type= 'submit' id = 'loginButton'>SIGN UP</button>

			</li>

		</ul>
	</form>
	<p>
		<?php 

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

		?>

	</p>
	
</div>
<script>
	
	document.getElementById( "textId" ).value = "admin";

	var xmlhttp;

    try{

        xmlhttp = new XMLHttpRequest();

     }catch( e ){

        try{

            xmlhttp = new ActiveXObject( "Msxml2.XMLHTTP" );

        }catch( e ) {

            try{

                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

            }catch( e ){
                
            	xmlhttp = null;

            }

        }

    }

    var displayData = function( xmlhttp, callback ){

        if( xmlhttp.readyState == 1 ) {}
        if( xmlhttp.readyState == 2 ) {}
        if( xmlhttp.readyState == 3 ) {}
        if( xmlhttp.readyState == 4 ) {

            if( xmlhttp.status == 200 ) {

                callback();

            }

        }

    }


	document.getElementById( "signupForm" ).addEventListener( "submit", function( e ){


		var pw   = document.getElementById( "textPw" ).value,
		rePw     = document.getElementById( "textRePw" ).value,
		email    = document.getElementById( "textEmail" ).value,
		reEmail  = document.getElementById( "textReEmail" ).value,
		pwReg    = (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*()]{8,}$/),
		emailReg = (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

		if( pw == "" || rePw == "" || email == "" || reEmail == "" ){

			

		}else{

			if( pw != rePw ){

				
			}else if( !pwReg.exec( pw ) ){


			}else if( email != reEmail ){


			}else if( !emailReg.exec( email ) ){


			}else{

				xmlhttp.open( "POST", "./AccountManager.php" , true );
				
			    xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
			    xmlhttp.send( "action=createDefaultAccount&pw=" + pw + "&email=" + email );  
			    xmlhttp.onreadystatechange = displayData( xmlhttp, function(){
			  
					// console.log( xmlhttp.responseText );

				});
			    
			}

		}
		

		e.preventDefault();

		
	})

</script>

</body>
</html>