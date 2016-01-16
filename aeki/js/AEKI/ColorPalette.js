/**
*   Color Palette Class provides conversion between rgb to hsv and vice verca.
*/
var ColorPalette = function(){

	var ColorPalette = {};

    /**
    *   Default color to white.
    */
	ColorPalette.init = function(){

        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.h = 0;
        this.s = 0;
        this.v = 1;

		return ColorPalette;

	}

    ColorPalette.drawColor = function( context, width, color ){

        context.clearRect( 0, 0, width, 30 );
        context.beginPath();

        for( var i = 0; i < 30; i++){

            context.moveTo( 0, i * 7 + 0.5 );
            context.lineTo( width, i * 7 + 0.5  );
            context.strokeStyle = color;
            context.lineWidth   = 1;
            context.stroke();            

        }

        context.closePath();

    }

    ColorPalette.drawSlider = function(){

        var headSize = 10,
        height = headSize * ( Math.sqrt( 3 ) / 2 );

        context.clearRect( 0, 0, width, 50 );

        /* Draw slider bar */
        context.beginPath();
        context.moveTo( 10, 10.5 );
        context.lineTo( width - 10, 10.5 );
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.stroke();
        context.closePath();
    
        context.save();

        /* Draw slider head */
        context.beginPath();

        var position = ( _position * ( width - headSize ) ) + 1 ;

        if( position <= 10.5){

            position = 10.5;

        }else if( position >= width - 10 ){

            position = width - 10;

        }

        context.translate( position , 10.5 );        
        context.rotate( _position  * Math.PI );
        context.moveTo( 0, -height / 2);
        context.lineTo( -headSize / 2, height / 2 );
        context.lineTo( headSize / 2, height / 2 );
        context.lineTo( 0, -height / 2);            
        context.fillStyle = "rgb(80,80,80)";
        context.lineWidth = 2;
        context.stroke();           
        context.fill();
        context.closePath();

        context.restore();

    }

    /**
    *   After recivied string is valid rgb, calls RGBtoHSB function. 
    *   @param {string} rgb - A string formatted in rgb(xxx,xxx,xxx)
    */
    ColorPalette.RGBtoIndividual = function( rgb ){

        var regex = /[1-2]?[0-9]?[0-9]?,[1-2]?[0-9]?[0-9],[1-2]?[0-9]?[0-9]/g,
        test      = regex.exec( rgb );

        if( test != null ){

            rgbInString = rgb.replace( / /g, '' );

            var split = test[ 0 ].split( "," );

            if( split.length == 3 ){

                this.r = split[ 0 ];
                this.g = split[ 1 ];
                this.b = split[ 2 ];

                this.RGBtoHSB();

            }

        }
        
    }    

    /**
    *   Converts RGB to HSV
    */
    ColorPalette.RGBtoHSB = function() {
    	
    	var r = ( this.r / 255 ),
        g     = ( this.g / 255 ),
        b     = ( this.b / 255 );

    	var max = Math.max( r, g, b ),
        min     = Math.min( r, g, b ),
		theta   = max - min;
		
		this.v = max;
		
		if( max == 0 ){

			this.s = 0;

		}else{

			this.s = theta / max;

			if( theta == 0 ){

				this.h = 0;

			}else if( max == r ){
		   		
		   		this.h = 60 * ( ( g - b ) / theta  % 6 );

		   	}else if( max == g ){

		   		this.h = 60 * ( ( b - r ) / theta + 2 );

		   	}else if( max == b ){

		   		this.h = 60 * ( ( r - g ) / theta + 4 );
		   	}

		}

        if( this.h < 0 ){

            this.h = 360 + this.h;

        }

        this.h = parseInt( this.h );
        this.s = Math.round( this.s * 100 ) / 100;
        this.v = Math.round( this.v * 100 ) / 100;

    }

    /**
    *   Converts HSV to RGB
    */
    ColorPalette.HSBtoRGB = function(){

     	this.r = 0; 
        this.g = 0; 
        this.b = 0;

     	var c = this.v * this.s,
     	x     = c * ( 1 - Math.abs(  ( this.h / 60 ) % 2 - 1 ) ),
     	m     = this.v - c;

     	if( this.h >= 0 && this.h < 60 ){

     		this.r = c;
     		this.g = x;
     		this.b = 0;

     	}else if( this.h >= 60 && this.h < 120 ){

     		this.r = x;
     		this.g = c;
     		this.b = 0;

     	}else if( this.h >= 120 && this.h < 180 ){

     		this.r = 0;
     		this.g = c;
     		this.b = x;

     	}else if( this.h >= 180 && this.h < 240 ){

     		this.r = 0;
     		this.g = x;
     		this.b = c;

     	}else if( this.h >= 240 && this.h < 300 ){

     		this.r = x;
     		this.g = 0;
     		this.b = c;

     	}else if( this.h >= 300 && this.h < 360 ){

     		this.r = c;
     		this.g = 0;
     		this.b = x;

     	}

        this.r = Math.ceil( ( this.r + m ) * 255 );
        this.g = Math.ceil( ( this.g + m ) * 255 );
        this.b = Math.ceil( ( this.b + m ) * 255 );

    }

    /**
    *   @return {string} - rgb(xxx,xxx,xxx)
    */
    ColorPalette.toRGB = function(){
        
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";

    }

	return ColorPalette.init();

}()