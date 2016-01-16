<?php
	
	session_start();

	require_once( "AccountManager.php" );

	if( !isset( $_SESSION["loggedIn"] ) ){

		$_SESSION[ "errorCode" ] = 1;
		header('Location: ./login.php');
		
	}

?>

<!DOCTYPE html>
<html>
<head>
	<title>AEKI</title>
	<link rel='stylesheet' type='text/css' href='css/main.css'>		
</head>
<body>	

	<!-- Blank -->
	<div id = 'topBlank'></div>
	<!-- SubMenu -->
	<div id = 'subMenu' ></div>
	<!-- MENU CONTAINER -->
	<div class = 'menu' >
		<!-- LOGO -->
		<div class = 'itemHolder' id = "logoContainer" >
			<img id = "aekiLogo" src = "./img/logo2.png" />
		</div>
		<!-- AEKI -->
		<div class = 'itemHolder' id = 'officeItemHolder'>
			
			<div class = 'itemTitle'>									
				<legend>PROJECT</legend>				  						   		 				
			</div>	

			<div class = 'item-button' data-function = 'newProject'>				
				<span>NEW PROJECT</span>
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- OPEN PROJECT -->
			<div class = 'item-button' data-function = 'openProject'>				
				<span>OPEN PROJECT</span>
				<span class = "keyCommand">&#8984;O</span>
			</div>

			<!-- IMPORT PROJECT -->
			<div class = 'item-button' data-function = 'importProject'>				
				<span>IMPORT PROJECT</span>				
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- SAVE PROJECT -->
			<div class = 'item-button' data-function = 'saveProject'>				
				<span>SAVE PROJECT</span>
				<span class = "keyCommand">&#8984;S</span>
			</div>	

			<!-- SAVE PROJECT AS-->
			<div class = 'item-button' data-function = 'saveProjectAs'>				
				<span>SAVE PROJECT AS</span>
				<span class = "keyCommand">&#8984;&#8679;S</span>
			</div>

			<!-- EXPORT PROJECT -->
			<div class = 'item-button' data-function = 'exportProject'>				
				<span>EXPORT PROJECT</span>
				<!-- <span class = "keyCommand">&#8984;&#8679;S</span> -->
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- BUILD PROJECT -->
			<div class = 'item-button' data-function = 'buildProject'>				
				<span>BUILD PROJECT</span>
				<span class = "keyCommand">&#8984;R</span>				
			</div>

			<!-- BUILD PROJECT AS-->
			<div class = 'item-button' data-function = 'buildProjectAs'>				
				<span>BUILD PROJECT AS</span>
				<span class = "keyCommand">&#8984;&#8679;R</span>
			</div>	

		</div>


		<!-- OFFICE -->
		<div class = 'itemHolder' id = 'officeItemHolder'>

			<div class = 'itemTitle'>					
				<legend>OFFICE</legend>		  						   		 				
			</div>	
			
			<!-- EDIT META -->
			<div class = 'item-button' data-function = 'editMeta'>				
				<span>EDIT META</span>
			</div>

			<!-- EDIT HEAD -->
			<div class = 'item-button' data-function = 'editHead'>				
				<span>EDIT HEAD</span>
			</div>

			<!-- EDIT STYLE IMPORT -->
			<div class = 'item-button' data-function = 'editStyleImport'>				
				<span>EDIT STYLE IMPORT</span>				
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- DELETE ALL STYLE -->
			<div class = 'item-button' data-function = 'deleteAllStyle'>				
				<span>DELETE ALL STYLE</span>
			</div>	

		</div>

		<!-- SPACE -->
		<div class = 'itemHolder'>

			<div class = 'itemTitle'>									
				<legend>SPACE</legend>				  						   		 				
			</div>	
		
			<!-- ADD SPACE -->			
			<div class = 'item-button' data-function = 'addSpace'>
				<span>ADD SPACE</span>
				<span class = "keyCommand">&#8679;N</span>
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- ADD GUIDE SPACE -->			
			<div class = 'item-button' data-function = 'duplicateSpace'>
				<span>DUPLICATE SPACE</span>
				<span class = "keyCommand">&#8984;D</span>				
			</div>

			

			<!-- RESIZE SPACE -->			
			<div class = 'item-button' data-function = 'resizeSpace'>
				<span>RESIZE SPACE</span>
				<span class = "keyCommand">&#8679;E</span>
			</div>

			<div class = "item-break">
				<span></span>
			</div>
			<!-- DELETE SPACE -->
			<div class = 'item-button' data-function = 'deleteSpace'>				
				<span>DELETE SPACE</span>
				<span class = "keyCommand">&#9003;</span>
			</div>

			<!-- DELETE ALL SPACE -->
			<div class = 'item-button' data-function = 'deleteAllSpace'>				
				<span>DELETE ALL SPACE</span>
			</div>

		</div>
		
		<!-- BOX -->
		<div class = 'itemHolder'>

			<div class = 'itemTitle'>									
				<legend>BOX</legend>				  						   		 				
			</div>	
			
			<!-- ADD TAG -->
			<div class = 'item-button' data-function = 'addTag'>				
				<span>ADD TAG</span>
				<span class = "keyCommand">&#8679;&#8997;N</span>				
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- ADD TAG -->
			<div class = 'item-button' data-function = 'manageTag'>				
				<span>MANAGE TAG</span>
			</div>

			<!-- REARRANGE BOX -->
			<div class = 'item-button' data-function = 'rearrangeBox'>				
				<span>REARRANGE BOX</span>
				<span class = "keyCommand">&#8679;&#8997;E</span>		
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- DELETE BOX -->
			<div class = 'item-button' data-function = 'deleteBox'>				
				<span>DELETE BOX</span>
				<span class = "keyCommand">&#9003;</span>
			</div>
			<!-- DELETE BOX -->
			<div class = 'item-button' data-function = 'deleteAllBox'>				
				<span>DELETE All BOX</span>				
			</div>

		</div>	

		<!-- ASSETS -->
		<div class = 'itemHolder'>

			<div class = 'itemTitle'>									
				<legend>ASSET</legend>				  						   		 				
			</div>

			<!-- UPLOAD ASSET -->
			<div class = 'item-button' data-function = 'uploadAsset'>				
				<span>UPLOAD ASSET<span>
				<span class = "keyCommand">&#8984U</span>
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- MANAGE ASSET -->
			<div class = 'item-button' data-function = 'manageAsset'>				
				<span>MANAGE ASSET<span>
			</div>

		</div>

		<!-- SCRIPT -->
		<div class = 'itemHolder'>

			<div class = 'itemTitle'>									
				<legend>SCRIPT</legend>				  						   		 				
			</div>

			<!-- DELETE BOX -->
			<div class = 'item-button' data-function = 'editScript'>				
				<span>MANAGE SCRIPT<span>
			</div>	

		</div>

		<!-- VIEW -->
		<div class = 'itemHolder'>

			<div class = 'itemTitle'>									
				<legend>VIEW</legend>				  						   		 				
			</div>
			
			<!-- MANAGE OFFICE -->
			<div class = 'item-button' data-function = 'manageOffice'>				
				<span>MANAGE OFFICE</span>
				<span class = "keyCommand">F1</span>
			</div>		

			<!-- MANAGE CONTENT -->
			<div class = 'item-button' data-function = 'manageContent'>				
				<span>MANAGE CONTENT</span>
				<span class = "keyCommand">F2</span>
			</div>		

			<!-- PREVIEW PROJECT -->
			<div class = 'item-button'>				
				<span>PREVIEW PROJECT</span>
				<span class = "keyCommand">F3</span>
			</div>

		</div>

		<!-- USER -->
		<div class = 'itemHolder'>

			<div class = 'itemTitle'>									
				<legend>USER</legend>				  						   		 				
			</div>

			<!-- CHANGE PASSWORD -->
			<div class = 'item-button' data-function = 'changePassword'>				
				<span>CHANGE PASSWORD<span>
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- ADD ACCOUNT -->
			<div class = 'item-button' data-function = 'sendInvitation'>				
				<span>SEND INVITATION<span>
			</div>

			<!-- DELETE ACCOUNT -->
			<div class = 'item-button' data-function = 'deleteAccount'>				
				<span>DELETE ACCOUNT<span>
			</div>

			<div class = "item-break">
				<span></span>
			</div>

			<!-- DELETE BOX -->
			<div class = 'item-button' data-function = 'logout'>				
				<span>LOGOUT<span>
			</div>	

		</div>	

	</div>

	<!-- ATTRIBUTE MENU -->
	<div id = 'attributeMenu'>
					
		<!-- BIBLE LIST -->
		<div class = 'item-alt'>	
			<div class = "titleHolder">
				<canvas class = "saveIndicator" ></canvas>
				<legend class = 'legendTitle'>BIBLE // <span id = "projectName"></span> // <span id = "userId"><?php echo $_SESSION[ "id" ] ?></span></legend>
			</div>
			<div class = 'item-alt-content' >
				<div id = "bibleListContainer">
					<div id = 'bibleList' class = 'selectbox'></div>
					<div id = 'elementInfo' class = 'selectbox'></div>
				</div>
			</div>
			
		</div>	

		<div class = 'item-alt'>

			<!-- BOX ATTRIBUTES -->
			<form id = 'boxAttributes'>
				<div class = "titleHolder">
					<canvas class = "saveIndicator" ></canvas>
					<legend class = 'legendTitle'>BOX ATTRIBUTES</legend>
				</div>
				<div class = 'item-alt-content' >				  
					<ol>						
					 	
					  	<li >
					    	<label class = "labelId" for='boxId'>NAME</label>
					      	<input class = 'containerInput' id='boxId' />
					   	</li>
					   	<li>
					    	<label class = "labelClass" for='boxClass'>CLASS</label>
					      	<input class = 'containerInput' id='boxClass' />
					   	</li>
					   	<li>
					    	<label for='boxType'>TYPE</label>
					      	<select class = 'containerInput' id = 'boxType'>
					      		<option>default</option>
					      		<option>guide</option>
					      	</select>								
					   	</li>
					   	<li>
					    	<label for='boxTag'>TAG</label>
					      	<select class = 'containerInput' id = 'boxTag'></select>								
					   	</li>	

					 </ol>
				</div>
			</form>	

			<!--  ATTRIBUTES -->
			<form id = 'spaceAttributes'>
				<div class = "titleHolder">
					<canvas class = "saveIndicator" ></canvas>
					<legend class = 'legendTitle'>SPACE ATTRIBUTES</legend>
				</div>
				<div class = 'item-alt-content' >
					<ol>								 	
					  	<li>
					    	<label for='spaceId'>NAME</label>
					      	<input class = 'containerInput' id='spaceId' />
					   	</li>

					   	<li>
					    	<label for='spaceClass'>CLASS</label>
					      	<input class = 'containerInput' id='spaceClass' />
					   	</li>

					 </ol>	
				 </div>		
			<form>
		</div>
	

		<div class = 'item-alt'>
			<div class = "titleHolder">				
				<legend class = 'legendTitle'>STYLE</legend>
			</div>
			<div class = 'item-alt-content' >
				<form class = ''>
					<ol class = 'dropdownList'>						
						<select id = "styleSelector" ></select>
						<div id = "styleAttributeContainer"></div>
					</ol>
				</form>
			</div>		
		</div>

		<div class = 'item-alt' style = 'display: none'>
			<div class = "titleHolder">
				<img src = "./img/downIcon.png" />
				<legend class = 'legendTitle'>EVENT</legend>
			</div>
			<div class = 'item-alt-content' >
				<div id = "eventAttributes"></div>
			 </div>					
		</div>
	</div>

	<!-- MAIN CONTAINER-->
	<div id = 'mainContainer'></div>
	<div id = 'contentEditor'>
		<div id = 'content'></div>
		<div id = 'contentMenu'></div>
	</div>
	<div id = 'scriptContainer'>
		<h1>hello</h1>
		<!-- <iframe id = "buildView" src="./build.php" style = " "></iframe> -->
	</div>	
	<div id = 'buildContainer'>
		<!-- <iframe id = "buildView" src="./build.php" style = " "></iframe> -->
	</div>	
	
	<script src = 'js/AEKI/AEKI.js'></script>
	<script src = 'js/AEKI/View.js'></script>
	<script src = 'js/AEKI/CanvasHandler.js'></script>	
	<script src = 'js/AEKI/Ruler.js'></script>
	<script src = 'js/AEKI/Loading.js'></script>
	<script src = 'js/AEKI/Office.js'></script>
	<script src = 'js/AEKI/Space.js'></script>
	<script src = 'js/AEKI/Box.js'></script>
	<script src = 'js/AEKI/Cell.js'></script>
	<script src = 'js/AEKI/Tag.js'></script>
	<script src = 'js/AEKI/Style.js'></script>	
	<script src = 'js/AEKI/Script.js'></script>	
	<script src = 'js/AEKI/Buffer.js'></script>
	<script src = 'js/AEKI/Controller.js'></script>
	<script src = 'js/AEKI/ColorPalette.js'></script>
	<script src = "js/AEKI/KeyEvent.js"></script>
	<script src = 'js/AEKI/ContentHandler.js'></script>	
	<script src = 'js/AEKI/Indicator.js'></script>	
	<script src = 'js/AEKI/Dialog.js'></script>
	<script src = 'js/AEKI/AttributeMenu.js'></script>	
	<script src = 'js/AEKI/XmlRequest.js'></script>	
	<script src = 'js/AEKI/AudioPlayer.js'></script>	
	<script src = 'js/AEKI/Asset.js'></script>	

</body>
</html>