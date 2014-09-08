//the functions in the sxToObj objs generally relate to command numbers 
//in the "request" arrays

//setup all the functions for processing sysex into the livid object in an array:
var sxToObj={};

//ohm64
sxToObj[2]={
	4: function(){ //button LED indicators	ohm:[12]
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p = "onoff";
		var id_=0;
		//position in bitstream (l-r) to ID map:
		var pos = [	0, 6 ,12,18,24,30,36,42,48,54,-1 ,60,66,72,
					1, 7 ,13,19,25,31,37,43,49,55,-1 ,61,67,73,
					2, 8 ,14,20,26,32,38,44,50,56,-1 ,62,68,74,
					3, 9 ,15,21,27,33,39,45,51,57,-1 ,63,69,-1,
					4, 10,16,22,28,34,40,46,52,58,-1 ,64,70,-1,
					5, 11,17,23,29,35,41,47,53,59,-1 ,65,71,-1]
		//for ohm64, block,  (monochrome)
		for (var i in sx[CNO]){
			var val = sx[CNO][i]; 
			for(var k=0;k<7;k++){ //there are 7 LED on/offs in each byte
				//var skipit = (i%2 && k==3); //the 4th element of the odd bytes is not used
				//if(!skipit){
					var ID = pos[id_];
					if(ID>=0){
						if(!livid[ctl][ID]) livid[ctl][ID]={}; //make the object if it's not here
						livid[ctl][ID][p]=1-flagger(val,k); //check if a bit is 1 or 0. remember: OHM64 is such that 0 is on, 1 is off. Ugh.
						//clog("LEDS "+i+" "+ID+" val "+livid[ctl][ID][p]);
					}
					id_++;
				//}
			}
		}
	},
	
	8: function(){ //local control [1]
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	
	9: function(){
		CNO=9; //map single led
	},
	
	10: function(){ //map analogs	[64]
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	11: function(){ //map buttons	[120]
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	12: function(){ //chs - we need to squeeze the ohm ch. into the bank channel system, even tho ohm64 has no banks
		CNO=12;
		var ctl = "globl";
		var p = "onech";
		var val = sx[CNO][0]+1;
		//if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
		livid[ctl][p] = val;
		//set the current channel, too. It's not editable, but used elsewhere:
		p="bankch";
		//if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
		livid[ctl][p] = val;
	},
	
	13: function(){ //midi out merge	[1]
		CNO=13;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"merge",sx[CNO][0]); //cmd,p,val
	},	
	
	15: function(){ //Crossfader flip
		CNO = 15;
		var p = "xfadeflip";
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		log("\nsxToObj"+" "+CNO+" "+ctl+" "+p+" "+val);
		livid[ctl][p] = val>0;
	},
	//35 and 36 are not actually part of Ohm64 sysex, but we create them for convenience's sake in procSysex
	35: function(){ //LED note map	[128]
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+sx[CNO]);
		var mode = 0; //note
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
			if(val!=127){ 
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
				//clog("note id "+id_+" nn "+nn+" mode "+mode);
			}
		}
	},
	36: function(){ //LED cc map	[128]
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+sx[CNO]);
		var mode = 1; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val!=127 && nn<121){//unique to block and Ohm64
				id_=crtoID[pid][val]; 
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
				//clog("cc id "+id_+" nn "+nn+" mode "+mode);
			}		
		};
		
	}
};
//block
sxToObj[3]={
	4: function(){ //button LED indicators	block:[10]
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p = "onoff";
		var id_=0;
		//clog("sxToObj"+CNO+ctl+p);
		//position in bitstream (l-r) to ID map:
		var pos = [	0, 8 ,16,24,32,40,48,
					56,5 ,13,-1,21,29,37,
					1 ,9 ,17,25,33,41,49,
					57,6 ,14,-1,22,30,38,
					2 ,10,18,26,34,42,50,
					58,7 ,15,-1,23,31,39,
					3 ,11,19,27,35,43,51,
					59,45,53,-1,61,47,55,
					4 ,12,20,28,36,44,52,
					60,46,54,-1,62,63
					]
		//for ohm64, block,  (monochrome)
		for (var i in sx[CNO]){
			var val = sx[CNO][i]; 
			for(var k=0;k<7;k++){ //there are 7 LED on/offs in each byte
				//var skipit = (i%2 && k==3); //the 4th element of the odd bytes is not used
				//if(!skipit){
					var ID = pos[id_];
					if(ID>=0){
						if(!livid[ctl][ID]) livid[ctl][ID]={}; //make the object if it's not here
						livid[ctl][ID][p]=flagger(val,k); //check if a bit is 1 or 0.
						//clog("LEDS "+i+" "+ID+" val "+livid[ctl][ID][p]);
					}
					id_++;
				//}
			}
		}
	},
	
	8: function(){ //local control [1]
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	
	9: function(){
		CNO=9; //map single led
	},
	
	10: function(){ //map analogs	[64]
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	11: function(){ //map buttons	[120]
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	12: function(){ //chs - we need to squeeze the ohm ch. into the bank channel system, even tho ohm64 has no banks
		CNO=12;
		var ctl = "globl";
		var p = "onech";
		var val = sx[CNO][0]+1;
		//if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
		livid[ctl][p] = val;
		//set the current channel, too. It's not editable, but used elsewhere:
		p="bankch";
		//if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
		livid[ctl][p] = val;
	},
	
	13: function(){ //midi out merge	[1]
		CNO=13;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"merge",sx[CNO][0]); //cmd,p,val
	},
	33: function(){ //Expansion analogs	[20] //240 0 1 97 7 33 25 0 26 0 27 0 28 0 29 0 30 0 31 0 32 0 33 0 34 0 247
		CNO=33;
		var ctl = "exp";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
		//clog("sxToObj"+" "+CNO);
		
	},
	//35 and 36 are not actually part of Ohm64 sysex, but we create them for convenience's sake in procSysex
	35: function(){ //LED note map	[128]
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+sx[CNO]);
		var mode = 0; //note
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
			if(val!=127){ 
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
				log("note: id "+id_+" cr "+val+" nn "+nn+" mode "+mode);
			}
		}
	},
	36: function(){ //LED cc map	[128]
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+sx[CNO]);
		var mode = 1; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val!=127 && nn<121){//unique to block and Ohm64
				id_=crtoID[pid][val]; 
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
				//clog("cc id "+id_+" nn "+nn+" mode "+mode);
			}		
		};
		
	}
};
//code v2
sxToObj[4]={
	//button LED indicators	code:[7]
	4: function(){ 
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p = "onoff";
		var id_=0;
		var idcount=0
		clog("sxToObj LEDs"+CNO+ctl+p);
		//for code (monochrome)
    var pos = [	0, 8 ,16,24,
          1, 9 ,17,25,
          2, 10,18,26,
          3, 11,19,27,
          4, 12,20,28,
          5, 13,21,29,
          6, 14,22,30,
          7, 15,23,31,
          32,33,34,35,
          36,37,38,39, 40,41,42,43,44];
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 LED on/offs in each byte
        var id_ = pos[idcount];
				var skipit = (i%2 && k==3); //the 3nth element of the odd bytes is not used
				if(!skipit){
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					idcount++;
				}
			}
		}
	},
	//local control [1]
	8: function(){ 
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	//map analogs	code:[0]
	10: function(){ 
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	//map buttons	code:[90]
	11: function(){ 
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	//midi settings ch	[1]
	12: function(){ 
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	//midi out merge	[1]
	13: function(){ 
		CNO=13;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"merge",sx[CNO][0]); //cmd,p,val
	},
	//Controller Option Flags
	15: function(){ 
		CNO = 15;
		var p = "omni";
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p+" "+val);
		livid[ctl][p] = Math.floor((val/2)%2);		
	},
	//map encs	code:[64] (mode 1 is cc, 0 is note!). for CNTRLR, 1 is note, 0 is cc
	16: function(){ 
		CNO=16; 
		var ctl = "enc";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	//encoder style	code:[8]
	17: function(){ 
		CNO=17;
		var flags = [];
		var ctl = "enc";
		var p = "type";
		var pos = [	0, 8 ,16,24,
          1, 9 ,17,25,
          2, 10,18,26,
          3, 11,19,27,
          4, 12,20,28,
          5, 13,21,29,
          6, 14,22,30,
          7, 15,23,31];
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var id_=0;
		var max_id=32; //32 encoders on code
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k>0); //only the first bit in odd bytes is used
				if(!skipit && id_<max_id){
					if(!livid[ctl][pos[id_]]) livid[ctl][pos[id_]]={}; //make the object if it's not here
					livid[ctl][pos[id_]][p]=flagger(val,k); //check if a bit is 1 or 0.
					id_++;
				}
			}
		}
	},
	//bank ch	[1]
	22: function(){ 
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	//bank chs	[4]
	23: function(){ 
		CNO=23;
		var ctl = "globl";
		var p = "bankchs";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i]+1;
			if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
			livid[ctl][p][i] = val;
		}
	},
	//current bank	[1]
	26: function(){ 
		CNO=26;
		var p = "bank";
		var val = 1+sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,p,val); //cmd,p,val
	},
	//ring mode (walk or fill)	[8]
	29: function(){ 
		CNO=29;
		var flags = [];
		var ctl = "ledring";
		var p = "style";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var id_=0;
		//for code and cntrlr, not for code v2?
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k>0); //only the first bit in odd bytes is used
				if(!skipit){
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					id_++;
				}
			}
		};
			
	},
	//enc speed	[2]
	30: function(){ 
		CNO=30;
		var ctl = "globl";
		var p = "encspeedA";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		var val = sx[CNO][0];
		livid[ctl][p] = e_speedtoUI[val]; //eg, so a val of 66 returns 15 for ui widget
		p = "encspeedB";
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		val = sx[CNO][1];
		livid[ctl][p] = e_speedtoUI[val];
	},
	//LED ring indicators	code:[64]
	31: function(){ 
		CNO=31;
		var flags = [];
		var ctl = "ledring";
		var p = "eachled";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var id_=0;
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k==6); //skip the last bit in odd bytes
				if(!skipit){
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					//clog("\nID?",id_);
				}
			}
			if(i%2) id_++; //only inc on the odd bytes.
		}
	},
	//LED ring local	[1]
	32: function(){ 
		CNO=32;
		var val = 1-sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"ringlocal",val); //cmd,p,val -Note the value is inverted. The command is to Disable local ctl, but the UI is an "enabler"
	},
	//LED note map	[128]
	35: function(){ 
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 0; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(pid==4){ //code
				if(val<54){ //54+ are LED rings, the others are for button leds
					ctl = "led";
					//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
					id_=crtoID[pid][val];
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}else{ //led rings
					ctl = "ledring";
					mode = 0; //note
					id_=crtoID[pid][val];
					if(id_ != "undefined"){
            if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
            livid[ctl][id_][p]=nn;
            livid[ctl][id_].mode=mode;
					}
				}
			}
		}
	},
	//LED cc map	[128]
	36: function(){ 
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 1; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(pid==4){ //code
				if(val<54){ //54+ are LED rings, the others are for button leds
					//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
					ctl = "led";
					id_=crtoID[pid][val];
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}else{ //led rings
					ctl = "ledring";
					mode = 1; //cc
					//id_=val-54; //simple conversion for led ring ids
					id_=crtoID[pid][val];
					if(id_ != "undefined"){
            if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
            livid[ctl][id_][p]=nn;
            livid[ctl][id_].mode=mode;
					}
				}
			}
		}
	},
	//enc values	[32]
	38: function(){ 
		CNO=38;
		var ctl = "enc";
		var p = "value";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={};
			livid[ctl][i][p] = val;
		}
	},
	//enc values all banks	[128]
	39: function(){ 
		CNO=39;
		var ctl = "encvalues"; //no "p" because this is just a regular array. probably not used.
		//clog("sxToObj"+" "+CNO+" "+ctl);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i] = val;
		}
	},
	//LED ring style (walk,fill,eq,spread)	code:[32]
	50: function(){ 
		CNO=50;
		var ctl = "ledring";
		var p = "style";
    var pos = [	
      0,8 ,16,24,
      1,9 ,17,25,
      2,10,18,26,
      3,11,19,27,
      4,12,20,28,
      5,13,21,29,
      6,14,22,30,
      7,15,23,31
      ];
		for (var i in sx[CNO]){
		  var id_ = pos[i];
			var val = sx[CNO][i];
			if(!livid[ctl][id_]) livid[ctl][id_]={}; 
			livid[ctl][id_][p] = val;
		  //clog(">>sxToObj"+" LEDRING style ctl "+ctl+" i "+i+" id "+id_+" val "+val);
		}
		
	},
	//button toggle mode	code:[12]
	54: function(){ 
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+" "+"string:"+" "+sx[CNO]);
		var id_=0;
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	},
	55: function(){	//global encoder flip [2]
		CNO=55;
		var ctl = "globl";
		var p = "encflip";
		var val = sx[CNO][0];
		livid[ctl][p] = val;
	},
	75: function(){	//global encoder flip [2]
		CNO=75;
		var ctl = "globl";
	  var p = "encdet_abs";
	  var i = 0;
	  clog("FRench 75");
	  if(sx[CNO]){
      val = sx[CNO][i];
      livid[ctl][p] = val;
      //clog("CMD 75 "+livid[ctl][p]+" ctl "+ctl+" val "+val);
      p = "encdet_rel";
      i = 1;
      val = sx[CNO][i];
      livid[ctl][p] = val;
      //clog("CMD 75 "+livid[ctl][p]+" ctl "+ctl+" val "+val);
		}
	}
};
//ohmrgb
sxToObj[7]={
	4: function(){ //button LED indicators	[30]
		//what ID does a byte half correspond to?
		var pos=[7,23,39,55,15,31,47,63,
             6,22,38,54,14,30,46,62,
             5,21,37,53,13,29,45,61,
             4,20,36,52,12,28,44,60,
             3,19,35,51,11,27,43,59, 
             2,18,34,50,10,26,42,58, 
             1,17,33,49, 9,25,41,57, 
             0,16,32,48, 8,24,40,56,
            74,78,64,65,75,79,66,67,
            76,80,68,69,73,72,71,70,
            77];
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		var id_=-1;
		//log("sxToObj"+CNO+ctl+p);
		//unravel the bytes into RGB on/off states:
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			clog("SX "+val);
			for(var k=0;k<6;k++){ //there are 2 RGB LEDs in each byte, each LED uses 1 bit
				if(k%3==0) {
					id_++;
				}
				if(!livid[ctl][pos[id_]]) {
					livid[ctl][pos[id_]]={}; //make the object if it's not here
				}
				p=p_arr[k%3]; //red,green,or blue
				livid[ctl][pos[id_]][p]=flagger(val,k); //check if a bit is 1 or 0.
				if(id_==46){
          //clog(".........OhmRGB color at id: "+id_+" "+livid[ctl][pos[id_]][p]);
				}
			}
		};
	},
	
	8: function(){ //local control [1]
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	
	10: function(){ //map analogs	[64]
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	11: function(){ //map buttons	[120]
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	12: function(){ //midi settings ch	[1]
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	
	13: function(){ //midi out merge	[1]
		CNO=13;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"merge",sx[CNO][0]); //cmd,p,val
	},	
	
	15: function(){ //Controller Option Flags
		CNO = 15;
		var p = "omni";
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p+" "+val);
		livid[ctl][p] = Math.floor((val/2)%2);		
	},
		
	22: function(){ //bank ch	[1]
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	
	23: function(){ //bank chs	[4]
		CNO=23;
		var ctl = "globl";
		var p = "bankchs";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i]+1;
			if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
			livid[ctl][p][i] = val;
		}
	},
	
	26: function(){ //current bank	[1]
		CNO=26;
		var p = "bank";
		var val = 1+sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,p,val); //cmd,p,val
	},
	
	33: function(){ //Expansion analogs	[20] //240 0 1 97 7 33 25 0 26 0 27 0 28 0 29 0 30 0 31 0 32 0 33 0 34 0 247
		CNO=33;
		var ctl = "exp";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
		//clog("sxToObj"+" "+CNO);
		
	},	
	
	34: function(){ //Color map	[8]
		CNO=34;
		var ctl = "colormap";
		color_map(CNO); //somewhat gratuitous argument
	},
	
	35: function(){ //LED note map	[128]
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 0; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
			if(val!=127){ 
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}
		}
	},
	
	36: function(){ //LED cc map	[128]
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 1; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val!=127){
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}		
		};
		
	},
		/*
	37: function(){ //LEDS all banks	[120]
		CNO=37;
		var val = 1-sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		
	},	
	*/
	54: function(){ //button toggle mode	[60]
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+" "+"string:"+" "+sx[CNO]);
		var id_=0;
		//for code, cntrlr and ohmrgb
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined && id_<999){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	}
};
//cntrl:r
sxToObj[8]={
	4: function(){ //button LED indicators	[30]
		//what ID does a byte half correspond to?
		var pos=[0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15,16,32,17,33,18,34,19,35,20,36,21,37,22,38,23,39,24,40,25,41,26,42,27,43,28,44,29,45,30,46,31,47,48,49,50,51,52,53,54,55,56,57,58,59];
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		var id_=-1;
		//clog("sxToObj"+CNO+ctl+p);
		//unravel the bytes into RGB on/off states:
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<6;k++){ //there are 2 RGB LEDs in each byte, each LED uses 1 bit
				if(k%3==0) {
					id_++;
				}
				if(!livid[ctl][pos[id_]]) {
					livid[ctl][pos[id_]]={}; //make the object if it's not here
				}
				p=p_arr[k%3]; //red,green,or blue
				livid[ctl][pos[id_]][p]=flagger(val,k); //check if a bit is 1 or 0.
			}
		};
	},
	
	8: function(){ //local control [1]
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	
	10: function(){ //map analogs	[64]
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	11: function(){ //map buttons	[120]
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	12: function(){ //midi settings ch	[1]
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	
	13: function(){ //midi out merge	[1]
		CNO=13;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"merge",sx[CNO][0]); //cmd,p,val
	},
	
	16: function(){ //map encs	[24] for CNTRLR, 1 is note, 0 is cc
		CNO=16; 
		var ctl = "enc";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	17: function(){ //encoder style	[4]
		CNO=17;
		var flags = [];
		var ctl = "enc";
		var p = "type";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+"<b> "+livid["enc"].length+"<b/>");
		var id_=0;
		var max_id=12; //12 encoders on CNTRL:R
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k>0); //only the first bit in odd bytes is used
				var limit = id_<max_id;
				if(!skipit && limit){
					if(!livid[ctl][id_]){
						livid[ctl][id_]={}; //make the object if it's not here
					}
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					id_++;
				}
			}
		}
	},
	
	22: function(){ //bank ch	[1]
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	
	23: function(){ //bank chs	[4]
		CNO=23;
		var ctl = "globl";
		var p = "bankchs";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i]+1;
			if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
			livid[ctl][p][i] = val;
		}
	},
	
	26: function(){ //current bank	[1]
		CNO=26;
		var p = "bank";
		var val = 1+sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,p,val); //cmd,p,val
	},
	
	29: function(){ //ring mode (walk or fill)	[4]
		CNO=29;
		var flags = [];
		var ctl = "enc";
		var p = "style";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var id_=0;
		var max_id=12; //12 encoders on CNTRL:R
		//for code and cntrlr, not for code v2?
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k>0); //only the first bit in odd bytes is used
				var limit = id_<max_id;
				if(!skipit && limit){
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					id_++;
				}
			}
		};
			
	},
	
	30: function(){ //enc speed	[2]
		CNO=30;
		var ctl = "globl";
		var p = "encspeedA";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		var val = sx[CNO][0];
		livid[ctl][p] = e_speedtoUI[val]; //eg, so a val of 66 returns 15 for ui widget
		p = "encspeedB";
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		val = sx[CNO][1];
		livid[ctl][p] = e_speedtoUI[val];
	},
	/*
	31: function(){ //LED ring indicators	code:[24]
		CNO=31;
		var flags = [];
		var ctl = "ledring";
		var p = "eachled";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var id_=0;
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k==6); //skip the last bit in odd bytes
				if(!skipit){
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					//clog("\nID?",id_);
				}
			}
			if(i%2) id_++; //only inc on the odd bytes.
		}
	},
	*/
	32: function(){ //LED ring local	[1]
		CNO=32;
		var val = 1-sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"ringlocal",val); //cmd,p,val -Note the value is inverted. The command is to Disable local ctl, but the UI is an "enabler"
	},
	
	33: function(){ //Expansion analogs	[20] //240 0 1 97 7 33 25 0 26 0 27 0 28 0 29 0 30 0 31 0 32 0 33 0 34 0 247
		CNO=33;
		var ctl = "exp";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
		//clog("sxToObj"+" "+CNO);
	},		
	
	34: function(){ //Color map	[8]
		CNO=34;
		var ctl = "colormap";
		color_map(CNO); //somewhat gratuitous argument
	},	
	
	35: function(){ //LED note map	[128]
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 0; //note
		var id_=0;
		var ledring = 60;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			if(val!=127){ 
				if(val<ledring){ //60+ are LED rings, the others are for button leds
					//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
					ctl = "led";
					id_=crtoID[pid][val];
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}else{ //led rings
					ctl = "ledring";
					mode = 1; //cc
					id_=val-ledring; //simple conversion for led ring ids
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}
			}
		}
	},
	
	36: function(){ //LED cc map	[128]
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 1; //cc
		var id_=0;//in this command, position is related to note number
		var ledring = 60;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			if(val!=127){ 
				if(val<ledring){ //60+ are LED rings, the others are for button leds
					//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
					ctl = "led";
					id_=crtoID[pid][val];
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}else{ //led rings
					ctl = "ledring";
					mode = 1; //cc
					id_=val-ledring; //simple conversion for led ring ids
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}
			}
		}
	},
	/*	
	37: function(){ //LEDS all banks	[120]
		CNO=37;
		var val = 1-sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		
	},	
	*/
	38: function(){ //enc values	[12]
		CNO=38;
		var ctl = "enc";
		var p = "value";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={};
			livid[ctl][i][p] = val;
		}
	},
	
	39: function(){ //enc values all banks	[48]
		CNO=39;
		var ctl = "encvalues"; //no "p" because this is just a regular array. probably not used.
		//clog("sxToObj"+" "+CNO+" "+ctl);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i] = val;
		}
	},
	
	50: function(){ //LED ring style (walk,fill,eq,spread)	[12]
		CNO=50;
		var ctl = "ledring";
		var p = "style";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+" len "+sx[CNO].length);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	54: function(){ //button toggle mode	[60]
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+" "+"string:"+" "+sx[CNO]);
		var id_=0;
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	},
	55: function(){	//global encoder flip [2]
		CNO=55;
		var ctl = "globl";
		var p = "encflip";
		var val = sx[CNO][0];
		livid[ctl][p] = val;
	}
};
//alias8
sxToObj[11]={
	4: function(){ //button LED indicators	[8]
		var pos=[0,2,4,6,1,3,5,7, 8,10,12,14,9,11,13,15];
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		var id_=-1;
		//clog("sxToObj"+CNO+' '+ctl+' '+p+'sx: '+sx[CNO]);
		//unravel the bytes into RGB on/off states:
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<6;k++){ //there are 2 RGB LEDs in each byte, each LED uses 1 bit
				if(k%3==0) {
					id_++;
				}
				if(!livid[ctl][pos[id_]]) {
					livid[ctl][pos[id_]]={}; //make the object if it's not here
				}
				p=p_arr[k%3]; //red,green,or blue
				livid[ctl][pos[id_]][p]=flagger(val,k); //check if a bit is 1 or 0.
				//clog("rbg "+pos[id_]+" v "+livid[ctl][pos[id_]][p]);
			}
		};
		//clog("sxToObj"+CNO+' sx: '+sx[CNO]+' len '+sx[CNO].length);
	},
	
	8: function(){ //local control [1]
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	
	10: function(){ //map analogs	[84]
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	11: function(){ //map buttons	[32]
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	12: function(){ //midi settings ch	[1]
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	
	16: function(){ //map encs	[8] (mode 1 is cc, 0 is note!)
		CNO=16; 
		var ctl = "enc";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	
	17: function(){ //encoder style	[2]
		CNO=17;
		var flags = [];
		var ctl = "enc";
		var p = "type";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+"<b> "+livid["enc"].length+"<b/>");
		var id_=0;
		var max_id=12; //12 encoders on CNTRL:R
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k>0); //only the first bit in odd bytes is used
				var limit = id_<max_id;
				if(!skipit && limit){
					if(!livid[ctl][id_]){
						livid[ctl][id_]={}; //make the object if it's not here
					}
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					id_++;
				}
			}
		}
	},
	
	22: function(){ //bank ch	[1]
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	
	23: function(){ //bank chs	[15]
		CNO=23;
		var ctl = "globl";
		var p = "bankchs";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i]+1;
			if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
			livid[ctl][p][i] = val;
		}
	},
	
	26: function(){ //current bank	[1]
		CNO=26;
		var p = "bank";
		var val = 1+sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,p,val); //cmd,p,val
	},
	
	30: function(){ //enc speed	[30]
		CNO=30;
		var ctl = "globl";
		var p = "encspeedA";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		var val = sx[CNO][0];
		livid[ctl][p] = e_speedtoUI[val]; //eg, so a val of 66 returns 15 for ui widget
		p = "encspeedB";
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		val = sx[CNO][1];
		livid[ctl][p] = e_speedtoUI[val];
	},
	
	33: function(){ //Expansion analogs	[20]
		CNO=33;
		//clog("sxToObj"+" "+CNO);
		
	},	
	
	34: function(){ //Color map	[8]
		CNO=34;
		var ctl = "colormap";
		color_map(CNO); //somewhat gratuitous argument
	},	
	
	35: function(){ //LED note map	[128]
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 0; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
			if(val!=127){ 
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}
		}
	},
	
	36: function(){ //LED cc map	[129]
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 1; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val!=127){
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}		
		};
		
	},
	/*	
	37: function(){ //LEDS all banks	[120]
		CNO=37;
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		//clog("sxToObj"+" "+CNO);
		
	},	
	*/
	38: function(){ //enc values	[4]
		CNO=38;
		var ctl = "enc";
		var p = "value";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={};
			livid[ctl][i][p] = val;
		}
	},
	
	39: function(){ //enc values all banks	[60]
		CNO=39;
		var ctl = "encvalues"; //no "p" because this is just a regular array. probably not used.
		//clog("sxToObj"+" "+CNO+" "+ctl);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i] = val;
		}
	},
	54: function(){ //button toggle mode	[6]
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+" "+"len:"+" "+sx[CNO].length);
		var id_=0;
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	},
	55: function(){	//global encoder flip [2]
		CNO=55;
		var ctl = "globl";
		var p = "encflip";
		var val = sx[CNO][0];
		livid[ctl][p] = val;
	},
	56: function(){	//local control color	[15]
		CNO=56;
		var ctl = "globl";
		var p = "localcolor";
	}
};
//BASE
sxToObj[12]={
	//button and fsr LED indicators
	4: function(){
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		var id_=-1;
		//clog("sxToObj"+CNO+' '+ctl+' '+p+'sx: '+sx[CNO]);
		//unravel the bytes into RGB on/off states:
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<6;k++){ //there are 2 RGB LEDs in each byte, each LED uses 1 bit
				if(k%3==0) {
					id_++;
				}
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				p=p_arr[k%3]; //red,green,or blue
				livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				//clog("rbg "+id_+" v "+livid[ctl][id_][p]);
			}
		};
		//temp: flesh out to length 72
		for(var i=sx[CNO].length;i<72;i++){
			sx[CNO][i]=0;
		}
		//clog("sxToObj"+CNO+' sx: '+sx[CNO]+' len '+sx[CNO].length);
	},
	 //local control
	8: function(){
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		livid.globl.btnlocal_mom = flags[1]; //btn momentary
		livid.globl.btnlocal_tog = flags[2]; //btn toggle 
		livid.globl.ringlocal_slide = flags[3]; //cap slider
		livid.globl.btnlocal_cbtn = flags[4]; //cap button (deprecated - merged w/ regular btns)
		livid.globl.agslocal_fsr = flags[5]; //drumpad
	},
	//map analogs
	10: function(){ 
		CNO=10;
		var ctl = "fsr";
		var p = "cc";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl,p);
	},
	//map buttons
	11: function(){ 
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	//midi settings ch
	12: function(){
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	//bank ch
	22: function(){ 
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	//bank chs
	23: function(){ 
		CNO=23;
		var ctl = "globl";
		var p = "bankchs";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i]+1;
			if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
			livid[ctl][p][i] = val;
		}
	},
	//current bank
	26: function(){ 
		CNO=26;
		var p = "bank";
		var val = 1+sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,p,val); //cmd,p,val
	},
	
	//Color map	[8]
	34: function(){ 
		CNO=34;
		var ctl = "colormap";
		color_map(CNO); //somewhat gratuitous argument
	},
	//LED note map	[128]
	35: function(){ 
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 0; //note
		var id_=0;
		var ledring = 64;//64+ are LED rings (strips) on Base, the others are for button leds
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
				if(val<ledring){ 
					ctl = "led";
					//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
					id_=crtoID[pid][val];
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}else{ //led rings
					ctl = "ledring";
					mode = 0; //note
					id_=val-ledring //simple conversion for led ring ids
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}
			
		}
	},
	//LED cc map	[128]
	36: function(){ 
		CNO=36;
		var ctl = "led";
		var p = "nn";
		var mode = 1; //cc
		var id_=0;
		var ledring = 64;//64+ are LED rings, the others are for button leds
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val<ledring){ 
				//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
				ctl = "led";
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}else{ //led rings
				ctl = "ledring";
				mode = 1; //cc
				id_=val-ledring; //simple conversion for led ring ids
				if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}
		}
	},
	/*
	//LEDS all banks	[120]
	37: function(){ //not really important for editor
		CNO=37;
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		//clog("sxToObj"+" "+CNO);
		
	},
	*/
	//analog filter mode (sensitivity)	[32]
	41: function(){ 
		CNO=41;
		var ctl = "fsr";
		var p= "filter";
		//clog("sxToObj"+" "+CNO);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//analog note assignment	[32]
	49: function(){ 
		CNO=49;
		var ctl = "fsr";
		var p = "nn"
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
			//clog("FSR NN "+ctl+" "+i+" "+p+" val: "+val);
		}
	},
	//LED ring style (walk,fill,eq,spread) for slider code:[32]
	50: function(){ 
		CNO=50;
		var ctl = "slide";
		var p = "style";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
		
	},
	//button toggle mode	[6]
	54: function(){ 
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		var id_=32; //buttons start at function buttons, ID 32
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_] = {}; //make the object if it's not here
					livid[ctl][id_][p] = flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	},
	//local control color	[15]
	56: function(){	
		CNO=56;
		var ctl = "globl";
		var p = "localcolor";
	},
	//Capacitive Fader Map Notes	[9]
	57: function(){	
		CNO=57;
		var ctl = "slide";
		var p = "nn";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//Capacitive Fader Map CC	[9]
	/*58: function(){	
		CNO=58;
		var ctl = "slide";
		var p = "cc";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},*/
	//coming soon, map Capacitive Fader Map CC like button and analog[18]
	58: function(){ 
		CNO=58;
		var ctl = "slide";
		var p = "cc";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl,p);
	},
	//Capacitive Fader Values	[9*BANKS]
	59: function(){	
		CNO=59;
		var ctl = "slide";
		var p = "val";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//Capacitive Fader Output mode	[9]
	//each byte has 5 bits
	//[0:1] = Output Mode -> 0=Absolute+Fine, 1=Absolute, 2=Bounded Relative, 3=Unbounded Relative
	//[2] = Send Note On when Touched?
	//[3] = Note On Fixed Velocity?
	60: function(){	
		CNO=60;
		var ctl,p;
		var flags = [];
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			//there are 5 flags in each byte
			for(var k=0;k<5;k++){ 
				//first 2 desc. mode, so we collect them.
				if (k<2){		
					flags[k]=flagger(val,k);
				}
				switch(k){
					//on the 3rd iteration, we decode the first 2 bytes into the output mode
					case 2:
						ctl = "slide";
						p = "output";	
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = btod(flags.reverse());
					break;
					case 3:
						var ctl = "slide";
						var p = "sendnote";					
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 4:
						var ctl = "slide";
						var p = "fixvel";					
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
				}
			}
		}
	},
	//LED Ring Color Map (all banks)	[11]
	61: function(){	
		//LED Ring Color 0 = Inverted White, 1 = Red, 2 = Green, 3 = Yellow, 4 = Blue, 5 = Magenta, 6 = Cyan, 7 = White
		CNO=61;
		var ctl = "slide";
		var p = "color";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//touch button sensitivity
	63: function(){	
		CNO=63;
		var ctl = "btn";
		var p = "sens";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	/*
	//map cap touch buttons
	65: function(){ 
		CNO=65;
		var ctl = "btn";
		//for now, just append this stuff to CMD11
		sx[11] = sx[11].concat(sx[CNO]);
		mapbytes(11,ctl);
	},
	*/
	//analog flags
// 	[0] = Output Note Messages?	
// 	[1] = Output Retrigger Messages (CC/Pitchbend)?	
// 	[2] = Button Mode? (note messages have constant velocity of 127)	
// 	[3] = Button Toggle Mode?
	66: function (){
		CNO=66;
		var ctl = "fsr";
		var p = "flag"; //placeholder - actual p defined in switch() statement below.
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			//there are 4 flags in each byte
			for(var k=0;k<4;k++){ 
				switch(k){
					case 0:
						p = "nn_enable"; //output note
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 1:
						p = "cc_enable"; //output cc/aftertouch  (afterpressure)
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 2:
						p = "nvel_enable"; //fixed velocity
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 3:
						//p = "cvel_enable"; //fixed velocity for cc output - good for Reason
						p = "ntog_enable"; //button toggle mode
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
				}
			}
		}
	},
	//7 segment display
	67: function(){
		CNO=67;
		var ctl = "7seg";
		var p = "state";
	},
	/*
	//link function button leds
	68: function(){
		CNO=68;
		var ctl = "globl";
		var p = "linkfbleds";
	},
	*/
	//touch slider sends note
	69: function(){
		CNO=69;
		var ctl = "globl";
		var p = "slidenote";
		if(!livid[ctl][p]) livid[ctl][p] = {}; //make the object if it's not here
		livid[ctl][p] = sx[CNO][0];
	},
	//cc retrigger scaling
	70: function(){
		CNO=70;
		var ctl = "globl";
		var p = "atouchspeed";
		if(!livid[ctl][p]) livid[ctl][p] = {}; //make the object if it's not here
		livid[ctl][p] = 1+sx[CNO][0]; //menu starts at 1, not 0, so add an offset.
	}
	
	
};
//ds1
sxToObj[16]={
	4: function(){ //button LED indicators	[8]
		var pos=[0,2,4,6,1,3,5,7, 8,10,12,14,9,11,13,15];
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		var id_=-1;
		//clog("sxToObj"+CNO+' '+ctl+' '+p+'sx: '+sx[CNO]);
		//unravel the bytes into RGB on/off states:
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<6;k++){ //there are 2 RGB LEDs in each byte, each LED uses 1 bit
				if(k%3==0) {
					id_++;
				}
				if(!livid[ctl][pos[id_]]) {
					livid[ctl][pos[id_]]={}; //make the object if it's not here
				}
				p=p_arr[k%3]; //red,green,or blue
				livid[ctl][pos[id_]][p]=flagger(val,k); //check if a bit is 1 or 0.
				//clog("rbg "+pos[id_]+" v "+livid[ctl][pos[id_]][p]);
			}
		};
		//clog("sxToObj"+CNO+' sx: '+sx[CNO]+' len '+sx[CNO].length);
	},
	8: function(){ //local control [1]
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//clog("sxToObj"+CNO+ctl+"local"+val);
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		//post("\nlocal","sec",flags[0],"btn_mom",flags[1],"btn_tog",flags[2],"abs",flags[3],"rel",flags[4],"pot",flags[5],"fsr",flags[6]);
		livid.globl.btnlocal_mom = flags[1] //btn momentary
		livid.globl.btnlocal_tog = flags[2] //btn toggle 
		livid.globl.ringlocal_abs = flags[3]; //enc absolute
		livid.globl.ringlocal_rel = flags[4]; //enc relative (+/-)
		livid.globl.agslocal_pot = flags[5]; 	//analog local pots
		livid.globl.agslocal_fsr = flags[6]; 	//analog local fsr
	},
	10: function(){ //map analogs	[84]
		CNO=10;
		var ctl = "pot";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	11: function(){ //map buttons	[32]
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	12: function(){ //midi settings ch	[1]
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	16: function(){ //map encs	[8] (mode 1 is cc, 0 is note!)
		CNO=16; 
		var ctl = "enc";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	17: function(){ //encoder style	[2]
		CNO=17;
		var flags = [];
		var ctl = "enc";
		var p = "type";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+"<b> "+livid["enc"].length+"<b/>");
		var id_=0;
		var max_id=12; //12 encoders on CNTRL:R
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<7;k++){ //there are 7 flags in each byte
				var skipit = (i%2 && k>0); //only the first bit in odd bytes is used
				var limit = id_<max_id;
				if(!skipit && limit){
					if(!livid[ctl][id_]){
						livid[ctl][id_]={}; //make the object if it's not here
					}
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
					id_++;
				}
			}
		}
	},
	22: function(){ //bank ch	[1]
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	30: function(){ //enc speed	[30]
		CNO=30;
		var ctl = "globl";
		var p = "encspeedA";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		var val = sx[CNO][0];
		livid[ctl][p] = e_speedtoUI[val]; //eg, so a val of 66 returns 15 for ui widget
		p = "encspeedB";
		if(!livid[ctl][p]) livid[ctl][p]={}; 
		val = sx[CNO][1];
		livid[ctl][p] = e_speedtoUI[val];
	},	
	34: function(){ //Color map	[8]
		CNO=34;
		var ctl = "colormap";
		color_map(CNO); //somewhat gratuitous argument
	},	
	35: function(){ //LED note map	[128]
		CNO=35;
		var ctl = "led";
		var p = "nn";
		//clog("\nsxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 0; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn]; //val is a "CR" code. In the case of the controller, it's quite straightforward: CR is same as ID
			//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
			if(val!=127){ 
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}
		}
	},
	36: function(){ //LED cc map	[129]
		CNO=36;
		var ctl = "led";
		var p = "nn";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		var mode = 1; //cc
		var id_=0;
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val!=127){
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}		
		};
		
	},
	38: function(){ //enc values	[4]
		CNO=38;
		var ctl = "enc";
		var p = "value";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={};
			livid[ctl][i][p] = val;
		}
	},
	54: function(){ //button toggle mode	[6]
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p+" "+"len:"+" "+sx[CNO].length);
		var id_=0;
		//for code and cntrlr
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	},
	55: function(){	//global encoder flip [2]
		CNO=55;
		var ctl = "globl";
		var p = "encflip";
		var val = sx[CNO][0];
		livid[ctl][p] = val;
	},
	76: function(){	//local control color map
		CNO=76;
		var ctl = "globl";
		var p = "localcolormap";
	}
};
//BASEII
sxToObj[17]={
	//button and fsr LED indicators
	4: function(){
		CNO=4;
		var flags = [];
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		var id_=-1;
		//clog("sxToObj"+CNO+' '+ctl+' '+p+'sx: '+sx[CNO]);
		//unravel the bytes into RGB on/off states:
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<6;k++){ //there are 2 RGB LEDs in each byte, each LED uses 1 bit
				if(k%3==0) {
					id_++;
				}
				if(!livid[ctl][id_]) {
					livid[ctl][id_]={}; //make the object if it's not here
				}
				p=p_arr[k%3]; //red,green,or blue
				livid[ctl][id_][p]=flagger(val,k); //check if a bit is 1 or 0.
				//clog("rbg "+id_+" v "+livid[ctl][id_][p]);
			}
		};
		//temp: flesh out to length 72
		for(var i=sx[CNO].length;i<72;i++){
			sx[CNO][i]=0;
		}
		//clog("sxToObj"+CNO+' sx: '+sx[CNO]+' len '+sx[CNO].length);
	},
	 //local control
	8: function(){
		CNO=8;
		var ctl = "globl";
		var val = sx[CNO][0]; //only one byte is of interest
		//turn the byte into flags. each flag turns on/off a specific local control
		var flags = dtob(val,7);
		livid.globl.btnlocal_mom = flags[1]; //btn momentary
		livid.globl.btnlocal_tog = flags[2]; //btn toggle 
		livid.globl.ringlocal_slide = flags[3]; //cap slider
		livid.globl.btnlocal_cbtn = flags[4]; //cap button (deprecated - merged w/ regular btns)
		livid.globl.agslocal_fsr = flags[5]; //drumpad
    //[6] is 'security bit'
	},
	//map analogs
	10: function(){ 
		CNO=10;
		var ctl = "fsr";
		var p = "cc";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl,p);
	},
	//map buttons
	11: function(){ 
		CNO=11;
		var ctl = "btn";
		//clog("sxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl);
	},
	//midi settings ch
	12: function(){
		CNO=12;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"settingsch",sx[CNO][0],1); //cmd,p,val
	},
	//bank ch
	22: function(){ 
		CNO=22;
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,"bankch",sx[CNO][0],1); //cmd,p,val,dosub
	},
	//bank chs
	23: function(){ 
		CNO=23;
		var ctl = "globl";
		var p = "bankchs";
		//clog("sxToObj"+" "+CNO+" "+ctl+" "+p);
		for (var i in sx[CNO]){
			var val = sx[CNO][i]+1;
			if(!livid[ctl][p]) livid[ctl][p]={}; //make the object if it's not here
			livid[ctl][p][i] = val;
		}
	},
	//current bank
	26: function(){ 
		CNO=26;
		var p = "bank";
		var val = 1+sx[CNO][0];
		//clog("sxToObj"+" "+CNO);
		mapone(CNO,p,val); //cmd,p,val
	},
	
	//Color map	[8]
	34: function(){ 
		CNO=34;
		var ctl = "colormap";
		color_map(CNO); //somewhat gratuitous argument
	},
	//LED note map	[128]
	35: function(){ 
		CNO=35;
		var ctl = "led";
		var p = "nn";
		var mode = 0; //note
		var id_=0;
		var ledring = 64;//64+ are LED rings (strips) on Base, the others are for button leds
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
				if(val<ledring){ 
					ctl = "led";
					//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:					clog("CR TO ID "+pid);
					id_=crtoID[pid][val];
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}else{ //led rings
					ctl = "ledring";
					mode = 0; //note
					id_=val-ledring //simple conversion for led ring ids
					if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
					livid[ctl][id_][p]=nn;
					livid[ctl][id_].mode=mode;
				}
			
		}
	},
	//LED cc map	[128]
	36: function(){ 
		CNO=36;
		var ctl = "led";
		var p = "nn";
		var mode = 1; //cc
		var id_=0;
		var ledring = 64;//64+ are LED rings, the others are for button leds
		for (var nn in sx[CNO]){ //in this command, position is related to note number
			var val = sx[CNO][nn];
			if(val<ledring){ 
				//the sysex message has "CR" values at note positions, so we need to convert those to ID use the map for this product:
				ctl = "led";
				id_=crtoID[pid][val];
				if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}else{ //led rings
				ctl = "ledring";
				mode = 1; //cc
				id_=val-ledring; //simple conversion for led ring ids
				if(!livid[ctl][id_]) livid[ctl][id_]={}; //make the object if it's not here
				livid[ctl][id_][p]=nn;
				livid[ctl][id_].mode=mode;
			}
		}
	},
	/*
	//LEDS all banks	[120]
	37: function(){ //not really important for editor
		CNO=37;
		var ctl = "led";
		var p; //filled by red,green,blue
		var p_arr = ["red","green","blue"];
		//clog("sxToObj"+" "+CNO);
		
	},
	*/
	//analog filter mode (sensitivity)	[32]
	41: function(){ 
		CNO=41;
		var ctl = "fsr";
		var p= "filter";
		//clog("sxToObj"+" "+CNO);
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//analog note assignment	[32]
	49: function(){ 
		CNO=49;
		var ctl = "fsr";
		var p = "nn"
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
			//clog("FSR NN "+ctl+" "+i+" "+p+" val: "+val);
		}
	},
	//LED ring style (walk,fill,eq,spread) for slider code:[32]
	50: function(){ 
		CNO=50;
		var ctl = "slide";
		var p = "style";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
		
	},
	//button toggle mode	[6]
	54: function(){ 
		CNO=54;
		var flags = [];
		var ctl = "btn";
		var p = "toggle";
		var id_=32; //buttons start at function buttons, ID 32
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			for(var k=0;k<4;k++){ //there are 4 flags in each byte
				var bitcount=(i*4)+k;
				id_=posi[pid].btn[bitcount];
				if(id_!=undefined){ //because we're iterating through a number of bits that may be out of bounds, eg, the code only has 45 buttons, not a multiple of 4.
					if(!livid[ctl][id_]) livid[ctl][id_] = {}; //make the object if it's not here
					livid[ctl][id_][p] = flagger(val,k); //check if a bit is 1 or 0.
				}
			}
		}
	},
	//local control color	[15]
	56: function(){	
		CNO=56;
		var ctl = "globl";
		var p = "localcolor";
	},
	//Capacitive Fader Map Notes	[9]
	57: function(){	
		CNO=57;
		var ctl = "slide";
		var p = "nn";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//Capacitive Fader Map CC	[9]
	/*58: function(){	
		CNO=58;
		var ctl = "slide";
		var p = "cc";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},*/
	//coming soon, map Capacitive Fader Map CC like button and analog[18]
	58: function(){ 
		CNO=58;
		var ctl = "slide";
		var p = "cc";
		//clog("\nsxToObj"+" "+CNO+" "+ctl);
		mapbytes(CNO,ctl,p);
	},
	//Capacitive Fader Values	[9*BANKS]
	59: function(){	
		CNO=59;
		var ctl = "slide";
		var p = "val";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//Capacitive Fader Output mode	[9]
	//each byte has 5 bits
	//[0:1] = Output Mode -> 0=Absolute+Fine, 1=Absolute, 2=Bounded Relative, 3=Unbounded Relative
	//[2] = Send Note On when Touched?
	//[3] = Note On Fixed Velocity?
	60: function(){	
		CNO=60;
		var ctl,p;
		var flags = [];
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			//there are 5 flags in each byte
			for(var k=0;k<5;k++){ 
				//first 2 desc. mode, so we collect them.
				if (k<2){		
					flags[k]=flagger(val,k);
				}
				switch(k){
					//on the 3rd iteration, we decode the first 2 bytes into the output mode
					case 2:
						ctl = "slide";
						p = "output";	
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = btod(flags.reverse());
					break;
					case 3:
						var ctl = "slide";
						var p = "sendnote";					
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 4:
						var ctl = "slide";
						var p = "fixvel";					
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
				}
			}
		}
	},
	//LED Ring Color Map (all banks)	[11]
	61: function(){	
		//LED Ring Color 0 = Inverted White, 1 = Red, 2 = Green, 3 = Yellow, 4 = Blue, 5 = Magenta, 6 = Cyan, 7 = White
		CNO=61;
		var ctl = "slide";
		var p = "color";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	//touch button sensitivity
	63: function(){	
		CNO=63;
		var ctl = "btn";
		var p = "sens";
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			if(!livid[ctl][i]) livid[ctl][i]={}; 
			livid[ctl][i][p] = val;
		}
	},
	/*
	//map cap touch buttons
	65: function(){ 
		CNO=65;
		var ctl = "btn";
		//for now, just append this stuff to CMD11
		sx[11] = sx[11].concat(sx[CNO]);
		mapbytes(11,ctl);
	},
	*/
	//analog flags
// 	[0] = Output Note Messages?	
// 	[1] = Output Retrigger Messages (CC/Pitchbend)?	
// 	[2] = Button Mode? (note messages have constant velocity of 127)	
// 	[3] = Button Toggle Mode?
	66: function (){
		CNO=66;
		var ctl = "fsr";
		var p = "flag"; //placeholder - actual p defined in switch() statement below.
		for (var i in sx[CNO]){
			var val = sx[CNO][i];
			//there are 4 flags in each byte
			for(var k=0;k<4;k++){ 
				switch(k){
					case 0:
						p = "nn_enable"; //output note
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 1:
						p = "cc_enable"; //output cc/aftertouch  (afterpressure)
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 2:
						p = "nvel_enable"; //fixed velocity
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
					case 3:
						//p = "cvel_enable"; //fixed velocity for cc output - good for Reason
						p = "ntog_enable"; //button toggle mode
						if(!livid[ctl][i]) livid[ctl][i] = {}; //make the object if it's not here
						livid[ctl][i][p] = flagger(val,k); //check if a bit is 1 or 0.
					break;
				}
			}
		}
	},
	//7 segment display
	67: function(){
		CNO=67;
		var ctl = "7seg";
		var p = "state";
	},
	/*
	//link function button leds
	68: function(){
		CNO=68;
		var ctl = "globl";
		var p = "linkfbleds";
	},
	*/
	//touch slider sends note
	69: function(){
		CNO=69;
		var ctl = "globl";
		var p = "slidenote";
		if(!livid[ctl][p]) livid[ctl][p] = {}; //make the object if it's not here
		livid[ctl][p] = sx[CNO][0];
	},
	//cc retrigger scaling
	70: function(){
		CNO=70;
		var ctl = "globl";
		var p = "atouchspeed";
		if(!livid[ctl][p]) livid[ctl][p] = {}; //make the object if it's not here
		livid[ctl][p] = 1+sx[CNO][0]; //menu starts at 1, not 0, so add an offset.
	}
	
	
};
