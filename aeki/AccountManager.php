<?php
	
class AccountManager{

    static $host     = "localhost";
	static $user     = "root";
	static $password = "****";
	static $database = "aeki";

	static $errorMessage = "database not connected";

	public static function doesDatabaseExist(){

		$con      = mysqli_connect( self::$host, self::$user, self::$password ) or die( $errorMessage );
	    $query    = mysqli_query( $con, "SHOW DATABASES LIKE 'AEKI'" );
		$result   = array();

		while( $row = mysqli_fetch_array( $query ) )
		{
			array_push( $result,$row );
		}

		if( count( $result ) > 0 ){	

			return true;
			
		}else{

			return false;

		}

	}

	public static function createDatabase(){

		$con = mysqli_connect( self::$host, self::$user, self::$password ) or die( $errorMessage );
		
		if( $con->query( "CREATE DATABASE ".self::$database ) === true ){

			echo "database was created.<br>";

		}else{

			echo "error creating database.<br>";
		}

	}

	public static function deleteTable( $table ){

		$con = mysqli_connect( self::$host, self::$user, self::$password, self::$database ) or die( errorMessage );

		if( $con->query( "DROP TABLE $table" ) === true ){

			echo "Table $table deleted.<br>";
		
		}else{

			echo $con->error;

		} 

	}

	public static function createTable(){

		$con = mysqli_connect( self::$host, self::$user, self::$password, self::$database ) or die( $errorMessage );
		$sql = "CREATE TABLE Accounts(

			accountNumber   INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            accountLevel    INT(1),
			id        	    VARCHAR(20),
			password  	    BINARY(32),    			
			email     	    VARCHAR(50),
			regDate	  	    TIMESTAMP,
			activation	    TINYINT(1) DEFAULT 0,
			hash            BINARY(32),
			loggedIn	    TINYINT(1) DEFAULT 0,
			UNIQUE( id ),
			UNIQUE( email )

		)";
		
		if( $con->query( $sql ) === true ){

			echo "table created<br>";

		}else{

			echo $con->error;
		}

	}

	public static function sendInvitation( $email, $hash ){

		$subject = "Invitation from AEKI: " + "jabuem.co";
		$headers = "From: nsm12889@gmail.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$message = "<p>Hello there you.</p>";

		echo "<a href = http://localhost/~minnam/aeki/validation.php?email=$email&key=$hash> Validation </a>";


	}

	public static function inviteAccount( $email ){

		$con   = mysqli_connect( self::$host, self::$user, self::$password, self::$database );
		$query = mysqli_query( $con, "SELECT * FROM Accounts WHERE email = '$email'" );
		$result = array();

		while( $row = mysqli_fetch_array( $query ) ){

			array_push( $result, $row );

		}

		if( count( $result ) > 0 ){

			echo "Email already registered.<br>";
			return false;

		}else{

			$hash = md5(uniqid( rand(), true ) );
			$sql = "INSERT INTO Accounts( email, hash ) VALUES( '$email', '$hash' )";
			
			if( $con->query( $sql ) === true ){

				self::sendInvitation( urlencode($email), $hash );
				echo "Email registered<br>";

			}else{

				echo $con->error;

			}

		}
		
	}

	public static function createAccount( $id, $firstName, $lastName, $password, $email){

		$con = mysqli_connect( self::$host, self::$user, self::$password, self::$database );
		$sql = "UPDATE Accounts SET id = '$id', firstName = '$firstName', lastName = '$lastName', password = '$password' WHERE email = '$email'";

		if( $con->query( $sql ) == true ){

			echo "account created.<br>";

		}else{

			echo $con->error;
		}

	}

    public static function createDefaultAccount( $email, $password ){

        $con = mysqli_connect( self::$host, self::$user, self::$password, self::$database );
        $pw  = md5( $password );
        $sql = "INSERT INTO Accounts( accountLevel, id, password, email ) VALUES( '0', 'admin', '$pw', '$email' )";

        if( $con->query( $sql ) == true ){

            echo "account created.<br>";

        }else{

            echo $con->error;
        }

    }

    public static function verifyIdandPw( $id, $password ){

        $con    = mysqli_connect( self::$host, self::$user, self::$password, self::$database );
        $pw     = md5( $password );
        $query  = mysqli_query( $con, "SELECT * FROM Accounts WHERE id = '$id' and password = '$pw'" );
        $result = array();

        while( $row = mysqli_fetch_array( $query ) ){

            array_push( $result, $row );

        }

        if( count( $result ) == 1 ){

            return true;

        }else{

            return false;

        }


    }

	public static function deleteAccount( $id ){

		$con = mysqli_connect( self::$host, self::$user, self::$password, self::$database );
		$sql = "DELETE FROM Accounts WHERE id = '$id'";

		if( $con->query( $sql ) == true ){

			echo "account '$id' deleted <br>";

		}else{

			echo $con->error;
		}

	}

	public static function changePassword( $id, $newPassword ){

		$con = mysqli_connect( self::$host, self::$user, self::$password, self::$database );
        $pw  = md5( $newPassword );
		$sql = "UPDATE Accounts SET password = '$pw' WHERE id = '$id'";

		if( $con->query( $sql ) == true ){

			echo "password changed.<br>";

		}else{

			echo $con->error;
		}

	}

	public static function logout( $id ){

		session_destroy();

	}

}

if( isset( $_POST[ "action" ] ) ){

    if( $_POST[ "action" ] == "createDefaultAccount" ){

        AccountManager::createDatabase();
        AccountManager::createTable();
        AccountManager::createDefaultAccount( $_POST[ "email" ], $_POST[ "pw" ] );

    }else if( $_POST[ "action" ] == "changePassword" ){

        AccountManager::changePassword( $_POST[ "id" ], $_POST[ "pw" ] );

    }

}

?>