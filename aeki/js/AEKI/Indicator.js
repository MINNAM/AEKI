var Indicator = function(){

	var Indicator = {},
	node,
	nodeIndex = 0;

	Indicator.init = function(){

		node = document.createElement( "div" );
		return Indicator;

	}
	

	Indicator.addIndication = function( message ){

		if( Global.preference.indicator ){

			var indication = document.createElement( "span" ),
			textNode = document.createTextNode( message );

			node.setAttribute( "id", "indicator" );

			indication.appendChild( textNode );
			node.appendChild( indication );

			document.body.appendChild( node );

			this.animate( indication );

		}
		
	}

	Indicator.animate = function( indication ){

		var i = 0,
		show = setInterval( function(){

			if( i < 100 ){

				indication.style.opacity = i/100;
				
			}else{

				clearInterval( show );
				var j = 0,				
				wait = setInterval( function(){

					if( j > 300){

						var h = 100,
						hide = setInterval( function(){

							indication.style.opacity = h/100;

							if( h < 0){

								indication.parentNode.removeChild( indication );
								clearInterval( hide );
							}

							h--;

						}, 5 );
						
						clearInterval( wait );

					}


					j++;

				}, 5 );

			}

			i++;
		}, 5 );
		

	}

	return Indicator.init();

}();