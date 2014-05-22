//these functions are used to turn UI interactions into sysex commands.
//the functions in the lividToSx objs relate to command numbers in the "sx_send" arrays
var prm;
var bitlist = [];

var lividToSx={}; //container for all the mapping functions for each product
//ohm64
lividToSx[2]={
	4: function(){
		CNO=4;
		cntl="led";
		prm="onoff";
		bitlist=[];
		//cycle thru all leds and get the onoff flag
		var j=0;
		var ledcount=82;
		var bitscount=14;
		var pos = [	0, 6 ,12,18,24,30,36,42,48,54,-1 ,60,66,72,
					1, 7 ,13,19,25,31,37,43,49,55,-1 ,61,67,73,
					2, 8 ,14,20,26,32,38,44,50,56,-1 ,62,68,74,
					3, 9 ,15,21,27,33,39,45,51,57,-1 ,63,69,-1,
					4, 10,16,22,28,34,40,46,52,58,-1 ,64,70,-1,
					5, 11,17,23,29,35,41,47,53,59,-1 ,65,71,-1]
				
		for (var i=0;i<(ledcount+1);i++){ 
			var val;
			var id = pos[i];
			if(id>=0){
				//clog("---- "+livid[cntl][id][prm]);
				val = 1-livid[cntl][id][prm]; //remember: OHM64 is such that 0 is on, 1 is off. Ugh
			}else{
				val = 0;
			}
			//clog("bit "+i+" id "+id);
			//clog("val "+val);
			bitlist[i%bitscount]=val;
			if(i%bitscount==13 && i!=0 || i==ledcount){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("first"+" i "+i+" j "+j+" - "+firstbyte+" "+"byte"+" "+sx[CNO][j]);
				j++;
				var secbyte = bitlist.slice(7,bitscount+1);
				//secbyte.splice(3,0,0); //this bit is skipped in the command.
				sx[CNO][j]=btod(secbyte.reverse());
				//clog("secd"+" i "+i+" j "+j+" "+"-"+" "+secbyte+" "+"byte"+" "+sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
				//clog("sx so far "+sx[CNO]);
			}
		}
		sx[CNO].length=12; //a hack correction - somewhere there might be a bug where extra undef. bytes are added.
	},
	
	8: function(){	//[1]
		CNO=8; //various global control info
	},
	
	9: function(){	//[1]
		CNO=9; //map single LED indicator
	},
	
	10: function(){
		CNO=10; //
		bytemaps(CNO,"pot"); //map
	},
	11: function(){	
		CNO=11;
		bytemaps(CNO,"btn"); //map
	},
	12: function(){
		CNO=12; //all bank chs
		cntl="globl";
		prm="onech";
		//clog("MIDI CH "+livid[cntl][prm]+" type of "+typeof(livid[cntl][prm])+" - "+(livid[cntl][prm]-1));
		sx[CNO]=livid[cntl][prm]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15		
	},
	13: function(){	
		CNO=13; //midi out merge
		getone(CNO,"merge");
	},
	15: function(){
		CNO=15; //crossfader flip
		getone(CNO,"xfadeflip");
	},
	33: function(){
		CNO=33; //map expansion analogs
		bytemaps(CNO,"exp"); //map
	},
	35: function(){
		CNO=35; //led note map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	36: function(){	
		CNO=36; //led cc map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	}
}; 
//block
lividToSx[3]={
	4: function(){
		CNO=4;
		cntl="led";
		prm="onoff";
		bitlist=[];
		//cycle thru all leds and get the onoff flag
		var j=0;
		var ledcount=64;
		var bitscount=14;
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
		//for ohm64, block
		for (var i=0;i<(ledcount+1);i++){ 
			var val;
			var id = pos[i];
			if(id>=0){
				//clog("---- "+livid[cntl][id][prm]);
				val = livid[cntl][id][prm]; //on or off
			}else{
				val = 0;
			}
			//clog("bit "+i+" id "+id);
			//clog("val "+val);
			bitlist[i%bitscount]=val;
			if(i%bitscount==13 && i!=0 || i==ledcount){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("first"+" i "+i+" j "+j+" - "+firstbyte+" "+"byte"+" "+sx[CNO][j]);
				j++;
				var secbyte = bitlist.slice(7,bitscount+1);
				//secbyte.splice(3,0,0); //this bit is skipped in the command.
				sx[CNO][j]=btod(secbyte.reverse());
				//clog("secd"+" i "+i+" j "+j+" "+"-"+" "+secbyte+" "+"byte"+" "+sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
				//clog("sx so far "+sx[CNO]);
			}
		}
		sx[CNO].length=10; //a hack correction - somewhere there might be a bug where extra undef. bytes are added.
	},
	
	8: function(){	//[1]
		CNO=8; //various global control info
	},
	
	9: function(){	//[1]
		CNO=9; //map single LED indicator
	},
	
	10: function(){
		CNO=10; //
		bytemaps(CNO,"pot"); //map
	},
	11: function(){	
		CNO=11;
		bytemaps(CNO,"btn"); //map
	},
	12: function(){
		CNO=12; //all bank chs
		cntl="globl";
		prm="onech";
		//clog("MIDI CH "+livid[cntl][prm]+" type of "+typeof(livid[cntl][prm])+" - "+(livid[cntl][prm]-1));
		sx[CNO]=livid[cntl][prm]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15		
	},
	13: function(){	
		CNO=13; //midi out merge
		getone(CNO,"merge");
	},
	35: function(){
		CNO=35; //led note map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	36: function(){	
		CNO=36; //led cc map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	}
};
//code v2
lividToSx[4]={

	4: function(){
		CNO=4;
		cntl="led";
		prm="onoff";
		bitlist=[];
		clog("LED states");
		//cycle thru all leds and get the onoff flag
		var j=0;
		var ledcount = 45;
		var bitscount = 13;
		var pos = [	
      0, 8 ,16,24,
      1, 9 ,17,25,
      2, 10,18,26,
      3, 11,19,27,
      4, 12,20,28,
      5, 13,21,29,
      6, 14,22,30,
      7, 15,23,31,
      32,33,34,35,
      36,37,38,39, 
      40,41,42,43,44
    ];
		for (var i=0;i<(ledcount);i++){ 
			var val;
			var id = pos[i];
			if(id>=0){
				//clog("---- "+livid[cntl][id][prm]);
				val = livid[cntl][id][prm]; //on or off
			}else{
				val = 0;
			}
			clog("bit "+i+" id "+id);
			clog("val "+val);
			bitlist[i%bitscount]=val;
			if(i%bitscount==12 && i!=0 || i==(ledcount-1)){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("first"+" i "+i+" j "+j+" - "+firstbyte+" "+"byte"+" "+sx[CNO][j]);
				j++;
				var secbyte = bitlist.slice(7,bitscount+1);
				secbyte.splice(3,0,0); //this bit is skipped in the command.
				sx[CNO][j]=btod(secbyte.reverse());
				//clog("secd"+" i "+i+" j "+j+" "+"-"+" "+secbyte+" "+"byte"+" "+sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
				//clog("sx so far "+sx[CNO]);
			}
		}
		
		sx[CNO].length=8; //a hack correction - somewhere there might be a bug where extra undef. bytes are added.
	},
	11: function(){	
		CNO=11;
		bytemaps(CNO,"btn"); //map
	},
	12: function(){	
		CNO=12; //midi settings ch
		getone(CNO,"settingsch",1);
	},
	13: function(){	
		CNO=13; //midi out merge
		getone(CNO,"merge");
	},
	16: function(){	
		CNO=16; //encoder map
		bytemaps(CNO,"enc"); //map
	},
	17: function(){	
		CNO=17; //abs or relative
		cntl="enc";
		prm="type";
		var pos = [	
      0, 8 ,16,24,
      1, 9 ,17,25,
      2, 10,18,26,
      3, 11,19,27,
      4, 12,20,28,
      5, 13,21,29,
      6, 14,22,30,
      7, 15,23,31,
      32,33,34,35,
      36,37,38,39, 
      40,41,42,43,44
    ];
		bitlist=[];
		var j=0;
		var enc_max=31;
		//cycle thru all encoders and get the encoder type flag
		for(var i=0;i<32;i++){
		//for (var id in livid[cntl]){ 
			bitlist[i%8]=livid[cntl][pos[i]][prm];
			if(i%8==7 && i!=0 || i==enc_max){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("\nenc type",j,sx[CNO][j],"..",firstbyte);
				j++;
				sx[CNO][j]=bitlist.pop(); //the 2nd byte only uses 1 bit
				//clog("\nenc type",j,sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
		clog("\nenc type sx (17)",sx[CNO]);
	},
	22: function(){
		CNO=22; //bank ch
		getone(CNO,"bankch",1);
	},
	23: function(){
		CNO=23; //all bank chs
		cntl="globl";
		prm="bankchs";
		//cycle thru all four bank chs.
		for(var i in livid[cntl][prm]){
			sx[CNO][i]=livid[cntl][prm][i]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15
		}
	},
	26: function(){	
		CNO=26; //current bank number
		getone(CNO,"bank",1);
	},
	29: function(){
		CNO=29; //ringmode 
		//(29 deprecated for code v2)
	},
	30: function(){	
		CNO=30; //encoder speed
		cntl = "globl";
		var speedA=livid[cntl]["encspeedA"];
		var speedB=livid[cntl]["encspeedB"];
		sx[CNO]=[speedA,speedB];
	},
	32: function(){
		CNO=32; //ledring local - need to invert the value in UI because we are "enabling" in UI, but the command is a "disabler". That is, 0 means Local Control is on.
		cntl="globl";
		prm="ringlocal";
		sx[CNO][0]=1-livid[cntl][prm];
	},
	35: function(){
		CNO=35; //led note map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
		cntl="ledring";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	36: function(){	
		CNO=36; //led cc map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
		cntl="ledring";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	50: function(){	
		CNO=50; //led ring style (walk,fill,eq,spread)
		cntl="ledring";
		prm="style";
		var maxring = 32;
		var pos = [	
      0, 4 ,8 ,12,16,20,24,28,
      1, 5 ,9 ,13,17,21,25,29,
      2, 6 ,10,14,18,22,26,30,
      3, 7 ,11,15,19,23,27,31
    ];
		for(var id in livid[cntl]){ //livid.ledring[id].style
			if(id<maxring){ //shouldn't have to do this, but...
				sx[CNO][pos[id]]=livid[cntl][id][prm];
				//clog("\n",CNO,id,cntl,p,livid[cntl][id][prm],"..",sx[CNO]);
			}
		}
	},
	54: function(){
		CNO=54; //toggle map
		cntl="btn";
		prm="toggle";
		bitlist=[];
		//cycle thru all buttons and get the toggle flag 
		var j=0;
		var lastid=44;
		for (var id in livid[cntl]){
			var bitpos = posi[pid].btn[id];
			//clog("\nbtn tog",id,bitpos,"   ",livid[cntl][id][prm]);
			bitlist[id%4]=livid[cntl][bitpos][prm];
			if(id%4==3 && id!=0 || id==lastid){
				sx[CNO][j]=btod(bitlist.reverse()); //need to reverse the bitlist - easier than creating a new "posi" table!
				 //clog("\ntog bitlist",j,sx[CNO][j],"from list",bitlist);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
	}
}; 
//ohmRGB
lividToSx[7]={
	4: function(){
		var pos=[ 28,24,20,16,12, 8, 4, 0,
              30,26,22,18,14,10, 6, 2,
              28,24,20,16,12,8,4,0,30,
              26,22,18,14,10, 6, 2,29,
              25,21,17,13, 9, 5, 1,31,
              27,23,19,15,11, 7, 3,29,
              25,21,17,13, 9, 5, 1,31,
              27,23,19,15,11, 7, 3,37,
              37,33,33,35,35,39,39,38,
              38,32,34,36,32,34,36,40];
		CNO=4;
		cntl="led";
		var p_arr = ["red","green","blue"];
		var rgb_i=0;
		bitlist=[];
		//cycle thru all leds and get the onoff flags. Two ids get packed into 1 byte
		var j=0;
		//need to step thru ids in a weird order so the right halves of the bytes can be joined. 
 		var idorder = [  7,23,39,55,15,31,47,63, 
                     6,22,38,54,14,30,46,62, 
                     5,21,37,53,13,29,45,61, 
                     4,20,36,52,12,28,44,60, 
                     3,19,35,51,11,27,43,59, 
                     2,18,34,50,10,26,42,58, 
                     1,17,33,49, 9,25,41,57, 
                     0,16,32,48, 8,24,40,56,
                    74,77,66,67,75,78,68,69,
                    76,79,64,65,73,72,71,70,
                    80];
		var btnct=81;
		for (var i=0;i<btnct;i++){
			var id = idorder[i];
			var odd_id = id%2;
			var odd_i = i%2;
			//even id's will fill first 3 slots in bitlist, odd id's will fill next 3 slots in bitlist
			for(var c in p_arr){
				var clr = p_arr[c];
				//clog(">>>>rgb "+rgb_i+" cntl,id,clr "+cntl+" "+id+" "+clr+" val "+livid[cntl][id][clr]);
				bitlist[rgb_i]=livid[cntl][id][clr];
				rgb_i++;
			}
			//clog("LED "+i+" id: "+id+" , "+pos[id]+" - "+bitlist)
			if(odd_i || i==80){
				sx[CNO][pos[id]]=btod(bitlist.reverse());
				j++;
				bitlist=[]; //clear it for the next round
				rgb_i=0;
			}
		}
	},
	
	10: function(){
		CNO=10; //
		bytemaps(CNO,"pot"); //map
	},
	11: function(){	
		CNO=11;
		bytemaps(CNO,"btn"); //map
	},
	12: function(){	
		CNO=12; //midi settings ch
		getone(CNO,"settingsch",1);
	},
	13: function(){	
		CNO=13; //midi out merge
		getone(CNO,"merge");
	},
	22: function(){
		CNO=22; //bank ch
		getone(CNO,"bankch",1);
	},
	23: function(){
		CNO=23; //all bank chs
		cntl="globl";
		prm="bankchs";
		//cycle thru all four bank chs.
		for(var i in livid[cntl][prm]){
			sx[CNO][i]=livid[cntl][prm][i]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15
		}
	},
	26: function(){	
		CNO=26; //current bank number
		getone(CNO,"bank",1);
	},
	33: function(){
		CNO=33; //map expansion analogs
		bytemaps(CNO,"exp"); //map
	},
	34: function(){
		CNO=34; //map led color scheme
	},
	37: function(){
		CNO=37; //LEDs All banks
	},
	54: function(){
		CNO=54; //toggle map
		cntl="btn";
		prm="toggle";
		bitlist=[];
		if(!firmware_old){ //older firmware of OhmRGB doesn't use this command. This is defined in uitocontroller.js in procSysex()
			//cycle thru all buttons and get the toggle flag 
			var j=0;
			var lastid=80;
			for (var id in livid[cntl]){
				if(id<999){ //we may have something with an id of 999, created in sysexToLivid. This isn't a bug, really, but could be avoided
					var bitpos = posi[pid].btn[id];
					log("54- id: "+id+" pos: "+bitpos+" val: "+livid[cntl][id][prm]);
					bitlist[id%4]=livid[cntl][bitpos][prm];
					if(id%4==3 && id!=0 || id==lastid){
						if(id==lastid){ //for various weird reasons, the 2nd to last byte in the string doesn't do anything, so we need to advance to the next byte
							j++; //to position 21
						}
						sx[CNO][j]=btod(bitlist.reverse()); //need to reverse the bitlist - easier than creating a new "posi" table!
						if(sx[CNO][j]>0) sx[CNO][j]=127; //again, weirdness for the Gary button, due to unused positions in the bitlist.
						log("\ntog bitlist"+" "+j+" "+sx[CNO][j]+" from list "+bitlist);
						j++;
						bitlist=[]; //clear it for the next round
					}
				}
			}
		}
	}
};
//cntrl:r
lividToSx[8]={
	4: function(){
		var pos=[0,2,4,6,0,2,4,6,1,3,5,7,1,3,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24,25,25,26,26,27,27,28,28,29,29];
		CNO=4;
		cntl="led";
		var p_arr = ["red","green","blue"];
		var rgb_i=0;
		bitlist=[];
		//cycle thru all leds and get the onoff flags. Two ids get packed into 1 byte
		var j=0;
		//need to step thru ids in a weird order so the right halves of the bytes can be joined. 
		var idorder = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15,16,32,17,33,18,34,19,35,20,36,21,37,22,38,23,39,24,40,25,41,26,42,27,43,28,44,29,45,30,46,31,47,32,48,48,49,50,51,52,53,54,55,56,57,58,59]
		for (var i=0;i<62;i++){
			var id = idorder[i];
			var odd_id = id%2;
			var odd_i = i%2;
			//even id's will fill first 3 slots in bitlist, odd id's will fill next 3 slots in bitlist
			for(var c in p_arr){
				var clr = p_arr[c];
				//clog("rgb "+rgb_i+" cntl,id,clr "+cntl+" "+id+" "+clr+" val "+livid[cntl][id][clr]);
				bitlist[rgb_i]=livid[cntl][id][clr];
				rgb_i++;
			}
			if(odd_i){
				sx[CNO][pos[id]]=btod(bitlist.reverse());
				j++;
				bitlist=[]; //clear it for the next round
				rgb_i=0;
			}
		}
	},
	
	10: function(){
		CNO=10; //
		bytemaps(CNO,"pot"); //map
	},
	11: function(){	
		CNO=11;
		bytemaps(CNO,"btn"); //map
	},
	12: function(){	
		CNO=12; //midi settings ch
		getone(CNO,"settingsch",1);
	},
	13: function(){	
		CNO=13; //midi out merge
		getone(CNO,"merge");
	},
	16: function(){	
		CNO=16; //encoder map
		bytemaps(CNO,"enc"); //map
	},
	17: function(){	
		CNO=17; //abs or relative
		cntl="enc";
		prm="type";
		bitlist=[];
		var j=0;
		var max_enc = 12;
		//cycle thru all encoders and get the encoder type flag
		for (var id in livid[cntl]){ 
			bitlist[id%8]=livid[cntl][id][prm];
			if(id%8==7 && id!=0 || id==(max_enc-1) ){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("\nenc type",j,sx[CNO][j],"..",firstbyte);
				j++;
				sx[CNO][j]=bitlist.pop(); //the 2nd byte only uses 1 bit
				//clog("\nenc type",j,sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
		//clog("\nenc type sx",sx[CNO]);
	},
	22: function(){
		CNO=22; //bank ch
		getone(CNO,"bankch",1);
	},
	23: function(){
		CNO=23; //all bank chs
		cntl="globl";
		prm="bankchs";
		//cycle thru all four bank chs.
		for(var i in livid[cntl][prm]){
			sx[CNO][i]=livid[cntl][prm][i]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15
		}
	},
	26: function(){	
		CNO=26; //current bank number
		getone(CNO,"bank",1);
	},
	29: function(){
		CNO=29; //ringmode for CNTRL:R and Code v1
		cntl="enc";
		prm="style";
		bitlist=[];
		var j=0;
		var max_enc = 12;
		//cycle thru all encoders and get the encoder style flag
		for (var id in livid[cntl]){ 
			bitlist[id%8]=livid[cntl][id][prm];
			if(id%8==7 && id!=0 || id==(max_enc-1) ){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("\nenc style",j,sx[CNO][j],"..",firstbyte);
				j++;
				sx[CNO][j]=bitlist.pop(); //the 2nd byte only uses 1 bit
				//clog("\nenc style",j,sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
		//clog("\nenc type sx",sx[CNO]);
	},
	30: function(){	
		CNO=30; //encoder speed
		cntl = "globl";
		var speedA=livid[cntl]["encspeedA"];
		var speedB=livid[cntl]["encspeedB"];
		sx[CNO]=[speedA,speedB];
	},
	31: function(){
		CNO=31; //set led ring indicators
	},
	32: function(){
		CNO=32; //ledring local - need to invert the value in UI because we are "enabling" in UI, but the command is a "disabler". That is, 0 means Local Control is on.
		cntl="globl";
		prm="ringlocal";
		sx[CNO][0]=1-livid[cntl][prm];
	},
	33: function(){
		CNO=33; //map expansion analogs
		bytemaps(CNO,"exp"); //map
	},
	34: function(){
		CNO=34; //map led color scheme
	},
	35: function(){
		CNO=35; //led note map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);/*
		cntl="ledring"; //will need this when LED rings are added to cntrlr editor
		prm="nn";
		ledmapper(CNO,cntl,prm);*/
	},
	36: function(){	
		CNO=36; //led cc map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
		cntl="ledring";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	37: function(){
		CNO=37; //LEDs All banks
	},
	38: function(){
		CNO=38; //encoder values
	},
	39: function(){
		CNO=39; //encoder values all banks
	},
	50: function(){	
		CNO=50; //led ring style (walk,fill,eq,spread)
		cntl="ledring";
		prm="style";
		var maxring = 12;
		for(var id in livid[cntl]){ //livid.ledring[id].style
			if(id<maxring){ //shouldn't have to do this, but...
				sx[CNO][id]=livid[cntl][id][prm];
				//clog("\n",CNO,id,cntl,p,livid[cntl][id][prm],"..",sx[CNO]);
			}
		}
	},
	54: function(){
		CNO=54; //toggle map
		cntl="btn";
		prm="toggle";
		bitlist=[];
		//cycle thru all buttons and get the toggle flag 
		var j=0;
		var lastid=59;
		for (var id in livid[cntl]){
			var bitpos = posi[pid].btn[id];
			//clog("\nbtn tog",id,bitpos,"   ",livid[cntl][id][prm]);
			bitlist[id%4]=livid[cntl][bitpos][prm];
			if(id%4==3 && id!=0 || id==lastid){
				sx[CNO][j]=btod(bitlist.reverse()); //need to reverse the bitlist - easier than creating a new "posi" table!
				 //clog("\ntog bitlist",j,sx[CNO][j],"from list",bitlist);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
	}
}; 
//alias8
lividToSx[11]={
	4: function(){ //[8]
		var pos=[0,2,0,2,1,3,1,3,4,6,4,6,5,7,5,7];
		CNO=4;
		cntl="led";
		var p_arr = ["red","green","blue"];
		var rgb_i=0;
		bitlist=[];
		//cycle thru all leds and get the onoff flags. Two ids get packed into 1 byte
		var j=0;
		//need to step thru ids in a weird order so the right halves of the bytes can be joined. 
		var idorder = [0,2,4,6,1,3,5,7,8,10,12,14,9,11,13,15];
		for (var i=0;i<16;i++){
			var id = idorder[i];
			var odd_id = id%2;
			var odd_i = i%2;
			//even id's will fill first 3 slots in bitlist, odd id's will fill next 3 slots in bitlist
			for(var c in p_arr){
				var clr = p_arr[c];
				//clog("rgb "+rgb_i+" cntl,id,clr "+cntl+" "+id+" "+clr+" val "+livid[cntl][id][clr]);
				bitlist[rgb_i]=livid[cntl][id][clr];
				rgb_i++;
			}
			if(odd_i){
				sx[CNO][pos[id]]=btod(bitlist.reverse());
				j++;
				bitlist=[]; //clear it for the next round
				rgb_i=0;
			}
		}
	},
	8: function(){	//[1]
		CNO=8; //various global control info
	},
	10: function(){	//[84]
		CNO=10; // analogs
		bytemaps(CNO,"pot"); //map
	},
	11: function(){	//[32]
		CNO=11; //buttons
		bytemaps(CNO,"btn"); //map
	},
	12: function(){	//[1]
		CNO=12; //midi settings ch
		getone(CNO,"settingsch",1);
	},
	16: function(){	//[8]	
		CNO=16; //encoder map
		bytemaps(CNO,"enc"); //map
	},
	17: function(){	//[2]
		CNO=17; //abs or relative
		cntl="enc";
		prm="type";
		bitlist=[];
		var j=0;
		var max_enc = 12;
		//cycle thru all encoders and get the encoder type flag
		for (var id in livid[cntl]){ 
			bitlist[id%8]=livid[cntl][id][prm];
			if(id%8==7 && id!=0 || id==(max_enc-1) ){
				var firstbyte = bitlist.slice(0,7);
				sx[CNO][j]=btod(firstbyte.reverse());
				//clog("\nenc type",j,sx[CNO][j],"..",firstbyte);
				j++;
				sx[CNO][j]=bitlist.pop(); //the 2nd byte only uses 1 bit
				//clog("\nenc type",j,sx[CNO][j]);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
		//clog("\nenc type sx",sx[CNO]);
	},
	22: function(){	//[1]
		CNO=22; //bank ch
		getone(CNO,"bankch",1);
	},
	23: function(){	//[15]
		CNO=23; //all bank chs
		cntl="globl";
		prm="bankchs";
		//cycle thru all four bank chs.
		for(var i in livid[cntl][prm]){
			sx[CNO][i]=livid[cntl][prm][i]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15
		}
	},
	26: function(){	//[1]
		CNO=26; //current bank number
		getone(CNO,"bank",1);
	},
	30: function(){	//[30]
		CNO=30; //encoder speed
		cntl = "globl";
		var speedA=livid[cntl]["encspeedA"];
		var speedB=livid[cntl]["encspeedB"];
		//very hacked correction here:
		if(!speedA) speedA=1;
		if(!speedB) speedB=1;
		//for some reason there are 30 bytes. Perhaps we can set speed per bank? dunno. there are oddities in A8 firmware!
		for (var i=0;i<15;i++){
			var j=i*2;
			sx[CNO][j]=speedA;
			sx[CNO][j+1]=speedB;
		}
	},
	33: function(){	//[] //not yet implemented on alias fw
		CNO=33; //map expansion analogs
	},
	34: function(){	//[8]
		CNO=34; //map led color scheme
	},
	35: function(){	//[128]
		CNO=35; //led note map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	36: function(){	//[129]
		CNO=36; //led cc map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	37: function(){	//[120]
		CNO=37; //LEDs All banks
	},
	38: function(){ //[4]
		CNO=38; //encoder values
	},
	39: function(){	//[60]
		CNO=39; //encoder values all banks
	},
	54: function(){	//[6]
		CNO=54; //button toggle mode
		cntl="btn";
		prm="toggle";
		bitlist=[];
		//cycle thru all buttons and get the toggle flag 
		var j=0;
		var lastid=15;
		for (var id in livid[cntl]){
			var bitpos = posi[pid].btn[id];
			log("\nbtn tog"+" "+id+" "+bitpos+" "+"   "+" "+livid[cntl][id][prm]);
			bitlist[id%4]=livid[cntl][bitpos][prm];
			if(id%4==3 && id!=0 || id==lastid){
				sx[CNO][j]=btod(bitlist.reverse()); //need to reverse the bitlist - easier than creating a new "posi" table!
				log("\ntog bitlist"+" "+j+" "+sx[CNO][j]+" "+"from list"+" "+bitlist);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
	},
	55: function(){	//[2]
		CNO=55; //encoder flip
		cntl="global";
		prm="encflip";
	},
	56: function(){	//[15]
		CNO=54; //local control color
		cntl="globl";
		prm="localcolor";
	}
}; 
//Base
lividToSx[12]={ //[4,8,10,11,12,22,23,26,34,35,36,41,49,50,54,56,57,58,59,60,61,65,66]
	4: function(){ //[72]
		CNO=4;
		cntl="led";
		var p_arr = ["red","green","blue"];
		var rgb_i=0;
		bitlist=[];
		//cycle thru all leds and get the onoff flags. Two ids get packed into 1 byte
		var j=0;
		//need to step thru ids in a weird order so the right halves of the bytes can be joined. 
		//buttons:
		for (var i=0;i<64;i++){
			var id = i;
			var odd_i = i%2;
			//even id's will fill first 3 slots in bitlist, odd id's will fill next 3 slots in bitlist
			for(var c in p_arr){
				var clr = p_arr[c];
				//clog("rgb "+rgb_i+" cntl,id,clr "+cntl+" "+id+" "+clr+" val "+livid[cntl][id][clr]);
				bitlist[rgb_i]=livid[cntl][id][clr];
				rgb_i++;
			}
			if(odd_i){
				var pos = (i-1)/2;
				var val = btod(bitlist.reverse());
				sx[CNO][pos]=val;
				j++;
				bitlist=[]; //clear it for the next round
				rgb_i=0;
			}
		}
	},
	8: function(){	//[1]
		CNO=8; //various global control info
		var flags = [];
		flags[1] = livid.globl.btnlocal_mom;  //btn momentary
		flags[2] = livid.globl.btnlocal_tog;  //btn toggle 
		flags[3] = livid.globl.ringlocal_slide; //cap slider
		flags[4] = livid.globl.btnlocal_cbtn;  //cap button (deprecated - merged w/ regular btns)
		flags[5] = livid.globl.agslocal_fsr;  //drumpad
		sx[CNO] = btod(flags);
	},
	10: function(){	//[84]
		CNO=10; // analogs
		bytemaps(CNO,"fsr","cc"); //map
	},
	11: function(){	//[32]
		CNO=11; //buttons
		//we appended the info in CNO 65 to CNO 11, so we have to split that out now:
		var len = sx[CNO].length;
		if(len>16){
			//do 65 first, cuz we're going to destructively modify 11 after this:
			sx[65] = sx[CNO].slice(len/2,len);
			sx[CNO] = sx[CNO].slice(0,len/2);
		}
		bytemaps(CNO,"btn"); //map
	},
	12: function(){	//[1]
		CNO=12; //midi settings ch
		getone(CNO,"settingsch",1);
	},
	22: function(){	//[1]
		CNO=22; //bank ch
		getone(CNO,"bankch",1);
	},
	23: function(){	//[15]
		CNO=23; //all bank chs
		cntl="globl";
		prm="bankchs";
		//cycle thru all four bank chs.
		for(var i in livid[cntl][prm]){
			sx[CNO][i]=livid[cntl][prm][i]-1; //offset by one, since ui shows chs. as 1-16, but sysex wants 0-15
		}
	},
	26: function(){	//[1]
		CNO=26; //current bank number
		getone(CNO,"bank",1);
	},
	34: function(){	//[8]
		CNO=34; //map led color scheme
		cntl="colormap";
		colormapper(CNO);
	},
	35: function(){	//[128]
		CNO=35; //led note map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	36: function(){	//[128]
		CNO=36; //led cc map
		cntl="led";
		prm="nn";
		ledmapper(CNO,cntl,prm);
	},
	41: function(){
		CNO=41; //analog filter mode 1 byte per fsr
		cntl="fsr";
		prm="filter";
		for(var i in livid[cntl]){
			sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
	},
	49: function(){ //Analog Note Assignment
		CNO=49;
		cntl="fsr";
		prm="nn";
		for(var i in livid[cntl]){
			sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
	},
	50: function(){ //LED Ring Style //redundant with 61?
		CNO=50;
		cntl="slide";
		prm="style";
		var maxring = 9;
		for(var id in livid[cntl]){ //livid.ledring[id].style
			if(id<maxring){ //shouldn't have to do this, but...
				sx[CNO][id]=livid[cntl][id][prm];
			}
		}
	},
	54: function(){	//[2*BANKS]
		CNO=54; //button toggle mode
		cntl="btn";
		prm="toggle";
		bitlist=[];
		//cycle thru all buttons and get the toggle flag 
		var j=0;
		var lastid=55; //button ids are somewhat strange on base, so the last id is a higher number than count of buttons
		for (var id in livid[cntl]){
			//var bitpos = posi[pid].btn[id];
			var bitpos = id;
			//clog("btn tog"+" "+id+" "+bitpos+" "+"   "+" "+livid[cntl][id][prm]);
			bitlist[id%4]=livid[cntl][bitpos][prm];
			if(id%4==3 && id!=0 || id==lastid){
				sx[CNO][j]=btod(bitlist.reverse()); //need to reverse the bitlist - easier than creating a new "posi" table!
				//clog("tog bitlist"+" "+j+" "+sx[CNO][j]+" "+"from list"+" "+bitlist);
				j++;
				bitlist=[]; //clear it for the next round
			}
		}
	},
	56: function(){	//[]
		CNO=56; //local control color
		cntl="globl";
		prm="localcolor";
	},
	57: function(){	//[9]
		CNO=57; //Capacitive Fader Map Notes
		cntl="slide";
		prm="nn";
		//clog("touch fader notes 57 "+livid[cntl][0][prm]);
		for(var i in livid[cntl]){
			//clog("TF notes "+i+" "+livid[cntl][i][prm]);
			if(livid[cntl][i][prm]!=undefined)
				sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
	},
	58: function(){	//[9]
		CNO=58; // analogs
		cntl="slide";
		prm="cc";
		bytemaps(CNO,cntl,prm); //map
	},/*
	58: function(){	//[9]
		CNO=58; //Capacitive Fader Map cc
		cntl="slide";
		prm="cc";
		//clog("touch fader cc 58 "+livid[cntl][0][prm]);
		for(var i in livid[cntl]){
			//clog("TF ccs "+i+" "+livid[cntl][i][prm]);
			if(livid[cntl][i][prm]!=undefined)
				sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
	},*/
	59: function(){	//[9]
		CNO=59; //Capacitive Fader values
		cntl="slide";
		prm="val";
		for(var i in livid[cntl]){
			sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
	},
	60: function(){	//[9]
		CNO=60; //Capacitive Fader mode
		cntl="slide";
		//collect all the flags for each fader's byte:
		for (var i=0; i<sx[CNO].length; i++){ //all 9 bytes
			var flags = [];
			prm="output"; 
			var mode = livid[cntl][i][prm];
			flags = flags.concat( dtob(mode,2).reverse() );
			prm = "sendnote";
			flags[2] = livid[cntl][i][prm];
			prm = "fixvel";
			flags[3] = livid[cntl][i][prm];
			//wrap the flags into a byte:
			sx[CNO][i] = btod(flags.reverse());
		}
	},
	//LED Ring Color Map (all banks)
	61: function(){	//[9]
		CNO=61; 
		cntl="slide";
		prm="color";
		//clog("touch fader cc 58 "+livid[cntl][0][prm]);
		for(var i in livid[cntl]){
			//clog("TF ccs "+i+" "+livid[cntl][i][prm]);
			if(livid[cntl][i][prm]!=undefined)
				sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
		
	},
	//Touch Button Sensitivity
	63: function(){	//[8]
		CNO=62; 
		cntl="btn";
		prm="sens";
		for(var i in livid[cntl]){
			sx[CNO][i]=livid[cntl][i][prm]; //pretty straightforward
		}
	},
	//cap btn notes
	65: function(){
		//We appended the info in 65 to CMD 11, and we split that out above in CMD 11
		CNO=65; // cap touch buttons
		bytemaps(CNO,"btn"); //map
	},
		//analog flags
		// 	[0] = Output Note Messages?	
		// 	[1] = Output Retrigger Messages (CC/Pitchbend)?	
		// 	[2] = Button Mode? (note messages have constant velocity of 127)	
		// 	[3] = Button Toggle Mode?
	66: function(){
		var CNO=66;
		cntl="fsr";
		var flags = [];
		for (var i=0; i<sx[CNO].length; i++){ //all 32 bytes
			prm = "nn_enable"; //output cc (afterpressure)
			flags[0] = livid[cntl][i][prm];
			prm = "cc_enable"; //output note (afterpressure)
			flags[1] = livid[cntl][i][prm];
			prm = "nvel_enable"; //fixed velocity note
			flags[2] = livid[cntl][i][prm];
			prm = "ntog_enable"; //button toggle mode
			flags[3] = livid[cntl][i][prm];
			//wrap the flags into a byte:
			sx[CNO][i] = btod(flags.reverse());
		}
	},
	//7 segment display
	67: function(){
		CNO=67;
		cntl = "7seg";
		prm = "state";
	},
	//link function button leds
	68: function(){
		CNO=68;
		cntl = "globl";
		prm = "linkfbleds";
	},
	//touch slider sends note
	69: function(){
		CNO=69;
		cntl = "globl";
		prm = "slidenote";
		sx[CNO][0]=livid[cntl][prm];
	},
	//touch slider sends note
	70: function(){
		CNO=70;
		cntl = "globl";
		prm = "atouchspeed";
		sx[CNO][0]=Number(livid[cntl][prm])-1; //menu in UI starts at 1, but CMD 70 setting starts at 0
	}
}; 