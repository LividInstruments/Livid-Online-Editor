//use an argument to the URL to set the product ID, such as "editor.html?id=12"
var id = 4;

//container for Rafael graphics descriptions
var controller={};

var color_off="#FFF";//white
var color_stroke="#000";//black
var color_over="#3198CB";//blue
var color_on="#40BD48";//green
//var color_warn="#F2D113";//yellow
var color_warn="#E8300C";//red
var strokewidth=4;

var tabon = "#E1E1E1";
var taboff = "#BFBFBF";

var selected = "";
var current = null;
var previous = null;
var last = null;
//convert notenames to ints:
var notehash = {"C-2":"0", "C#-2":"1", "D-2":"2", "D#-2":"3", "E-2":"4", "F-2":"5", "F#-2":"6", "G-2":"7", "G#-2":"8", "A-2":"9", "A#-2":"10", "B-2":"11", "C-1":"12", "C#-1":"13", "D-1":"14", "D#-1":"15", "E-1":"16", "F-1":"17", "F#-1":"18", "G-1":"19", "G#-1":"20", "A-1":"21", "A#-1":"22", "B-1":"23", "C0":"24", "C#0":"25", "D0":"26", "D#0":"27", "E0":"28", "F0":"29", "F#0":"30", "G0":"31", "G#0":"32", "A0":"33", "A#0":"34", "B0":"35", "C1":"36", "C#1":"37", "D1":"38", "D#1":"39", "E1":"40", "F1":"41", "F#1":"42", "G1":"43", "G#1":"44", "A1":"45", "A#1":"46", "B1":"47", "C2":"48", "C#2":"49", "D2":"50", "D#2":"51", "E2":"52", "F2":"53", "F#2":"54", "G2":"55", "G#2":"56", "A2":"57", "A#2":"58", "B2":"59", "C3":"60", "C#3":"61", "D3":"62", "D#3":"63", "E3":"64", "F3":"65", "F#3":"66", "G3":"67", "G#3":"68", "A3":"69", "A#3":"70", "B3":"71", "C4":"72", "C#4":"73", "D4":"74", "D#4":"75", "E4":"76", "F4":"77", "F#4":"78", "G4":"79", "G#4":"80", "A4":"81", "A#4":"82", "B4":"83", "C5":"84", "C#5":"85", "D5":"86", "D#5":"87", "E5":"88", "F5":"89", "F#5":"90", "G5":"91", "G#5":"92", "A5":"93", "A#5":"94", "B5":"95", "C6":"96", "C#6":"97", "D6":"98", "D#6":"99", "E6":"100", "F6":"101", "F#6":"102", "G6":"103", "G#6":"104", "A6":"105", "A#6":"106", "B6":"107", "C7":"108", "C#7":"109", "D7":"110", "D#7":"111", "E7":"112", "F7":"113", "F#7":"114", "G7":"115", "G#7":"116", "A7":"117", "A#7":"118", "B7":"119", "C8":"120", "C#8":"121", "D8":"122", "D#8":"123", "E8":"124", "F8":"125", "F#8":"126", "G8":"127"};
//used to highlight and select a control from midi in
function selctl(pid,ctlname){
	if(previous){
		previous.animate({fill: color_off, stroke: color_stroke, "fill-opacity": 0, "stroke-opacity": 0}, 5);
	}
	//clog('sel '+ctlname);
	//use if to protect from fsr cc's causing an error, or anything else that would cause an undefined error, really.
	if(controller[pid][ctlname]){
		controller[pid][ctlname].animate({fill: color_on,"stroke-width": strokewidth,  stroke: color_on, "fill-opacity": 0.5, "stroke-opacity": 0.5}, 5);
		var typeid=ctlname.split("_");
		//clog("selected type"+typeid[0]+" id "+typeid[1]);
		updatectlinspector(typeid[0],parseInt(typeid[1])); //in uitocontroller.js
		selected=ctlname;
		previous = controller[pid][ctlname];
	}
}
//highlights a control for warning.
function warnctl(pid,cname){
	var ctlname = cname;
	clog("warning "+pid+" "+ctlname);
	var typeid=ctlname.split("_");
	//leds and buttons highlight the same graphic, so change the name for LEDs.
	if(typeid[0]=="led"){
		ctlname="btn_"+typeid[1];
		//however, the Base has some independent LEDs and FSRs that we need to consider, so let's make sure there's a button there:
		if(!controller[pid][ctlname]){ //if no button...
			ctlname="fsr_"+typeid[1]; // we'll use "fsr" as the prefix
			if(!controller[pid][ctlname]){ //if no fsr...
				ctlname="led_"+typeid[1]; //we'll use "led" as the prefix
			}
		}
	}
	
	controller[pid][ctlname].animate({fill: color_warn, stroke: color_stroke, "fill-opacity": 0.5, "stroke-opacity": 0.5}, 500, function(){
		//hold, then fadeout on callback
		controller[pid][ctlname].animate({fill: color_warn, stroke: color_stroke, "fill-opacity": 1, "stroke-opacity": 1}, 4000, function(){
			controller[pid][ctlname].animate({fill: color_warn, stroke: color_stroke, "fill-opacity": 0., "stroke-opacity": 0.}, 200)
		})			
	});
}
//for entire form, a result of a submit button. probably will not be used.
/*function submitter(obj){
	var ctltype = $(obj).attr('id'); //get the id name, like "btns" or "pots"
	//need to get ctl index - usually referred to as "id"
	var ctlindex,ctlvalue,ctlparam;
	log("--- "+ctltype+" submit all---");
	if(ctltype!="testbutton"){ //exclude certain buttons in the HTML from calling this
		var theform=document.getElementById(ctltype).elements;
		var i;
		for(i in theform){
			ctlvalue = theform[i].value;
			ctlparam = theform[i].name; //nn, mode, style etc.
			//hidden needs to come first!
			if(theform[i].type=="hidden"){
				ctlindex = parseInt(theform[i].value);
			}
			if(ctlparam!="special" || ctlparam!="ctlid"){
				if(theform[i].value !== undefined && theform[i].type !== "submit" && theform[i].type !== "hidden"){
					if(theform[i].type=="checkbox"){
						log("type: "+theform[i].type+" name: "+ctltype+" value: "+theform[i].checked);
						ctlvalue = theform[i].checked; //an exception for what sets value
					}else{
						log("type: "+theform[i].type+" name: "+ctltype+" value: "+theform[i].value);
					}
					//fix up the ctlvalue
					if( !isNaN( parseInt(ctlvalue) ) ){
						ctlvalue=parseInt(ctlvalue);
					}
					//SET THE VALUE IN livid object and stringify the midi so it can be sent:
					if(ctltype=="globl"){
						globl_set(ctlparam,ctlvalue);
					}else{
						UI(ctlindex,ctltype,ctlparam,ctlvalue); //in uitocontroller.js
					}
				}
			}
		}
	}
} */
//get values from individual form elements, using jquery ( search for "$(':input').change(function()" in this code) , and put into livid object by calling UI()
function submit_one(ctlindex,ctltype,ctlparam,ctlvalue,formtype){ 
	var valid = true;
	var nnmax = 127;
	clog("---submit one element--- i-"+ctlindex+" t-"+ctltype+" p-"+ctlparam+" v-"+ctlvalue+" form "+formtype);
	//clog(ctlindex+" "+ctltype+" "+ctlparam+" "+ctlvalue+" "+formtype)
	if(ctltype!="testbutton"){ //exclude certain buttons in the HTML from calling this
		if(ctlparam!="special" && ctlparam!="lock_led"){ //special is a sort of macro that changes 2 elements, so we ignore that.
			if(ctlvalue !== undefined && formtype !== "submit" && formtype !== "hidden"){
				//fix up the ctlvalue
				if(notehash[ctlvalue]){
					ctlvalue = notehash[ctlvalue];
				}
				if( !isNaN( parseInt(ctlvalue) ) && (ctlparam!="encspeedA" && ctlparam!="encspeedB") ){ //make sure numerical values get passed as numbers, leave others alone
					ctlvalue=parseInt(ctlvalue);
				}
				if(typeof ctlvalue=="boolean"){
					ctlvalue=Number(ctlvalue); //convert to 1,0
				}
				
				//Validate the value
				if( isNaN( parseInt(ctlvalue) ) && (formtype!="select-one" && formtype!="select-multiple") ){ //select menus will provide a symbol, so we don't want to error that
					valid = false;
				}
				if(ctltype == "nn"){
					if( ((ctltype=="pot" || ctltype=="slide" || ctltype=="exp" || ctltype=="fsr") && livid[ctltype].mode==0) || ctltype=="ledring" ){ //mode menu is set to cc
						nnmax = 120;
					}
					if((ctlvalue<0 || ctlvalue>nnmax)){
						valid = false;
					}
				}	
				if(ctltype == "cc"){
					nnmax = 120;
					if((ctlvalue<0 || ctlvalue>nnmax)){
						valid=false;
					}
				}
				if(!valid){
					alertbox("Value must be in the range of 0 to "+nnmax);	
				}
				if(ctltype=="fsr" && ctlparam=="mode" && ctlvalue=="bend"){
					alertbox("The </i>bend</i> mode is a weird one! If you want bend, set cc# field to 96-109. There's actually a lot more to this. <a href='http://wiki.lividinstruments.com/wiki/Online_Editor#mode_2'>Read more in the wiki</a>");
				}
			  //clog("CHECK "+livid["led"][0].nn+" mode "+livid["led"][0].mode+" onoff "+livid["led"][0].onoff);
				//SET THE VALUE IN livid object and stringify the midi so it can be sent:
				if(ctltype=="globl"){
					if(ctlparam != "encflip" && ctlparam != "encdet_abs" && ctlparam != "encdet_rel"){
						globl_set(ctlparam,ctlvalue);
					}else{			
            var CMD = cmds.globl.encdet; //75
            var curr_abs = sx[CMD][0];
            var curr_rel = sx[CMD][1];
					  clog("need confirmation");		
            var words = ["detented","smooth"];
					  switch(ctlparam){
              case "encflip":
                confirmbox("Are you sure you want to reverse the function of the encoders?","encflip")
              break;
              case "encdet_abs":
                confirmbox("This will optimize the speed of encoders for <em>"+words[curr_abs]+"</em> encoders in absolute mode. Are you sure?","encdet_abs")
              break;
              case "encdet_rel":
                confirmbox("This will optimize the speed of encoders for <em>"+words[curr_rel]+"</em> encoders in relative mode. Are you sure?","encdet_rel")
              break;
					  }
					}
				}else{//check here
          if(valid){
              UI(ctlindex,ctltype,ctlparam,ctlvalue); //in uitocontroller.js
              //if LEDs inspector is locked, we sync the LED to the button or fsr note
              if(lock && (ctltype=="btn" || ctltype=="fsr") && (ctlparam=="nn" || ctlparam=="mode") ){ //lock var is declared in uitocontroller.js
                if(ctlparam=="nn"){
                  $("#ledsmidi").val(ctlvalue); //set the text element in UI to the same value as the button's nn:
                }
                if(ctlparam=="mode"){
                  //clog("LEDS menu "+ctltype+" "+ctlparam+" "+ctlvalue);
                  if(ctltype=="fsr") ctlvalue="note"; //fsr modes are for the afterpressure, so we don't want those affecting the LED. Just set it to note.
                  $("#ledsmode").val(ctlvalue); //set the mwenu element in UI to the same value as the button's nn:
                }
                //clog("LOCK");
                UI(ctlindex,"led",ctlparam,ctlvalue); //now set value in the "livid" object and sysex
              }
            }
				}
			}
		}else if(ctlparam=="special"){ //special menu
			var menuval=$("#btnsspecial").val();
			ctltype="btn";
			switch(menuval){
				case "bank":
				ctlparam="nn";
				ctlvalue=126;
				$('#btn :input[name=nn]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				ctlparam="mode";
				ctlvalue="cc";
				$('#btn :input[name=mode]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				break;
				
				case "indiv. bank":
				ctlparam="nn";
				ctlvalue=125;
				$('#btn :input[name=nn]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				ctlparam="mode";
				ctlvalue="cc";
				$('#btn :input[name=mode]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				break;
				
				case "enc. speed":
				ctlparam="nn";
				ctlvalue=127;
				$('#btn :input[name=nn]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				ctlparam="mode";
				ctlvalue="cc";
				$('#btn :input[name=mode]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				break;
				
				case "mmc-start":
				ctlparam="nn";
				ctlvalue=122;
				$('#btn :input[name=nn]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				ctlparam="mode";
				ctlvalue="cc";
				$('#btn :input[name=mode]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				break;
				
				case "mmc-continue":
				ctlparam="nn";
				ctlvalue=123;
				$('#btn :input[name=nn]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				ctlparam="mode";
				ctlvalue="cc";
				$('#btn :input[name=mode]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				break;
				
				case "mmc-stop":
				ctlparam="nn";
				ctlvalue=124;
				$('#btn :input[name=nn]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				ctlparam="mode";
				ctlvalue="cc";
				$('#btn :input[name=mode]').val(ctlvalue);
				UI(ctlindex,ctltype,ctlparam,ctlvalue);
				break;
				
			}
		}else if(ctlparam=="lock_led"){
			var lockval=$("#lockled").is(":checked");
			ledlock(lockval);
		}
	}
}

function hidetabs(side){
	if(side=="L"){
		$("#global_div").css("display","none");
		$("#midimonitor").css("display","none");
		$("#color_map").css("display","none");
		$("#sendsysex_div").css("display","none");
		//change color of button:
		$("#global_tab").css("background",taboff);
		$("#colormap_tab").css("background",taboff);
		$("#midimon_tab").css("background",taboff);
		$("#global_tab").css("border-bottom-color","black");
		$("#colormap_tab").css("border-bottom-color","black");
		$("#midimon_tab").css("border-bottom-color","black");
	}
	if(side=="R"){
		$("#inspectors_container").css("display","none");
		$("#presets").css("display","none");
		//change btn color
		$("#preset_tab").css("background",taboff);
		$("#inspector_tab").css("background",taboff);
		$("#preset_tab").css("border-bottom-color","black");
		$("#inspector_tab").css("border-bottom-color","black");
	}
}
function inittabs(){
	hidetabs("R");
	$("#inspectors_container").fadeIn(FDUR);
	hidetabs("L");
	$("#global_div").fadeIn(FDUR);
	//INITIALIZE on tabs:
	$("#global_tab").css("background",tabon);
	$("#global_tab").css("border-bottom-color",tabon);
	$("#inspector_tab").css("background",tabon);
	$("#inspector_tab").css("border-bottom-color",tabon);
}
var hideconfirm = 0;
var confirm_what = "";
function confirmbox(s,f){
	clog("comfirm "+f+" "+s);
	confirm_what = f;
	if(hideconfirm) clearTimeout(hideconfirm);
	$("#confirm").css({"z-index": 99})
	$("#confirm").fadeTo(100,1);	
	$("#midiioscrim").fadeTo(100,1); //bring the scrim back.
	//$("#confirm").css({visibility: "visible"})
	//$("#confirm").css({display: "inline"})
	var d = document.getElementById("confirmspan");
	d.innerHTML = s;
		

} 

	
//beginfaceplate() is called from the product() function in uitocontroller.js - inits the Raphael graphics and activates the form handlers.
function beginfaceplate(){
	//getsx(); //load default livid object from JSON file in uitocontroller.js
	if(SAFARI){
		//$('*').css({'font-size': '97%'});
		$('.inspector').css('width', '100%');
		//safarialert();
	}
	//setup the Rafael graphics:
	var R = Raphael("paper", '100%', '100%');
	//var R = Raphael("paper", 647, 359);
	var attr = {
		alpha: 0.5,
		fill: color_off,
		"fill-opacity": 0.0,
		stroke: color_stroke,
		"stroke-opacity": 0.0,
		"stroke-width": 1,
		"stroke-linejoin": "round"
	};
	//paths and properties for each control item:
	//(the switch statement was a later addition. I originally thought I could do it as controller[pid], but
	//that didn't quite work - having things the same name (eg "btn_0") I think screwed w/ Rafael. So now having
	//the "pid" node is kind of a vestige, but it is easier to leave unchanged.
	switch(pid){
	case 2: //OHM64
	controller[2]={
		"btn_66" : R.rect(14 , 343 , 36 , 36, 5).attr(attr),
		"btn_67" : R.rect(61 , 343 , 36 , 36, 5).attr(attr),
		"btn_68" : R.rect(108 , 343 , 36 , 36, 5).attr(attr),
		"btn_69" : R.rect(155 , 343 , 36 , 36, 5).attr(attr),
		"btn_64" : R.rect(220 , 323 , 36 , 36, 5).attr(attr),
		"btn_65" : R.rect(454 , 323 , 36 , 36, 5).attr(attr),
		"btn_70" : R.rect(520 , 343 , 36 , 36, 5).attr(attr),
		"btn_71" : R.rect(567 , 343 , 36 , 36, 5).attr(attr),
		"btn_72" : R.rect(614 , 343 , 36 , 36, 5).attr(attr),
		"btn_73" : R.rect(661 , 343 , 36 , 36, 5).attr(attr),
		"btn_80" : R.rect(661 , 18.5 , 36 , 36, 5).attr(attr),
		"pot_0" : R.circle(32 , 34.5 , 11).attr(attr),
		"pot_1" : R.circle(79 , 34.5 , 11).attr(attr),
		"pot_2" : R.circle(126 , 34.5 , 11).attr(attr),
		"pot_3" : R.circle(173 , 34.5 , 11).attr(attr),
		"pot_4" : R.circle(32 , 82.5 , 11).attr(attr),
		"pot_5" : R.circle(79 , 82.5 , 11).attr(attr),
		"pot_6" : R.circle(126 , 82.5 , 11).attr(attr),
		"pot_7" : R.circle(173 , 82.5 , 11).attr(attr),
		"pot_8" : R.circle(32 , 130.5 , 11).attr(attr),
		"pot_9" : R.circle(79 , 130.5 , 11).attr(attr),
		"pot_10" : R.circle(126 , 130.5 , 11).attr(attr),
		"pot_11" : R.circle(173 , 130.5 , 11).attr(attr),
		"pot_12" : R.circle(538 , 130.5 , 11).attr(attr),
		"pot_13" : R.circle(585 , 130.5 , 11).attr(attr),
		"pot_14" : R.circle(632 , 130.5 , 11).attr(attr),
		"pot_15" : R.circle(679 , 130.5 , 11).attr(attr),
		"pot_16" : R.path("M42.095,230H36v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H28v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C42.5,230.828,42.319,230,42.095,230z").attr(attr),
		"pot_17" : R.path("M89.095,230H83v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H75v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C89.5,230.828,89.319,230,89.095,230z").attr(attr),
		"pot_18" : R.path("M135.095,229H129v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H121v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C135.5,229.828,135.319,229,135.095,229z").attr(attr),
		"pot_19" : R.path("M182.095,229H176v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H168v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C182.5,229.828,182.319,229,182.095,229z").attr(attr),
		"pot_20" : R.path("M547.096,229H541v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H533v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C547.5,229.828,547.318,229,547.096,229z").attr(attr),
		"pot_21" : R.path("M594.096,229H588v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H580v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C594.5,229.828,594.318,229,594.096,229z").attr(attr),
		"pot_22" : R.path("M641.096,229H635v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H627v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C641.5,229.828,641.318,229,641.096,229z").attr(attr),
		"pot_23" : R.path("M688.096,229H682v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H674v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C688.5,229.828,688.318,229,688.096,229z").attr(attr),
		"pot_24" : R.path("M420,337h-59.5v-8.019c0-0.266-0.254-0.481-0.566-0.481h-9.868c-0.312,0-0.565,0.217-0.565,0.481V337H290v8h59.5v8.018c0,0.266,0.253,0.482,0.565,0.482h9.868c0.312,0,0.566-0.217,0.566-0.482V345H420V337z").attr(attr),
		"btn_74" : R.rect(521.5 , 18.5 , 35 , 21, 5).attr(attr),
		"btn_75" : R.rect(568.5 , 18.5 , 35 , 21, 5).attr(attr),
		"btn_76" : R.rect(615.5 , 18.5 , 35 , 21, 5).attr(attr),
		"btn_77" : R.rect(521.5 , 50.5 , 35 , 21, 5).attr(attr),
		"btn_78" : R.rect(568.5 , 50.5 , 35 , 21, 5).attr(attr),
		"btn_79" : R.rect(615.5 , 50.5 , 35 , 21, 5).attr(attr),
		"btn_0" : R.rect(208 , 17 , 30 , 30, 10).attr(attr),
		"btn_1" : R.rect(246 , 17 , 30 , 30, 10).attr(attr),
		"btn_2" : R.rect(284 , 17 , 30 , 30, 10).attr(attr),
		"btn_3" : R.rect(322 , 17 , 30 , 30, 10).attr(attr),
		"btn_4" : R.rect(360 , 17 , 30 , 30, 10).attr(attr),
		"btn_5" : R.rect(398 , 17 , 30 , 30, 10).attr(attr),
		"btn_6" : R.rect(436 , 17 , 30 , 30, 10).attr(attr),
		"btn_7" : R.rect(474 , 17 , 30 , 30, 10).attr(attr),
		"btn_8" : R.rect(208 , 55 , 30 , 30, 10).attr(attr),
		"btn_9" : R.rect(246 , 55 , 30 , 30, 10).attr(attr),
		"btn_10" : R.rect(284 , 55 , 30 , 30, 10).attr(attr),
		"btn_11" : R.rect(322 , 55 , 30 , 30, 10).attr(attr),
		"btn_12" : R.rect(360 , 55 , 30 , 30, 10).attr(attr),
		"btn_13" : R.rect(398 , 55 , 30 , 30, 10).attr(attr),
		"btn_14" : R.rect(436 , 55 , 30 , 30, 10).attr(attr),
		"btn_15" : R.rect(474 , 55 , 30 , 30, 10).attr(attr),
		"btn_16" : R.rect(208 , 93 , 30 , 30, 10).attr(attr),
		"btn_17" : R.rect(246 , 93 , 30 , 30, 10).attr(attr),
		"btn_18" : R.rect(284 , 93 , 30 , 30, 10).attr(attr),
		"btn_19" : R.rect(322 , 93 , 30 , 30, 10).attr(attr),
		"btn_20" : R.rect(360 , 93 , 30 , 30, 10).attr(attr),
		"btn_21" : R.rect(398 , 93 , 30 , 30, 10).attr(attr),
		"btn_22" : R.rect(436 , 93 , 30 , 30, 10).attr(attr),
		"btn_23" : R.rect(474 , 93 , 30 , 30, 10).attr(attr),
		"btn_24" : R.rect(208 , 131 , 30 , 30, 10).attr(attr),
		"btn_25" : R.rect(246 , 131 , 30 , 30, 10).attr(attr),
		"btn_26" : R.rect(284 , 131 , 30 , 30, 10).attr(attr),
		"btn_27" : R.rect(322 , 131 , 30 , 30, 10).attr(attr),
		"btn_28" : R.rect(360 , 131 , 30 , 30, 10).attr(attr),
		"btn_29" : R.rect(398 , 131 , 30 , 30, 10).attr(attr),
		"btn_30" : R.rect(436 , 131 , 30 , 30, 10).attr(attr),
		"btn_31" : R.rect(474 , 131 , 30 , 30, 10).attr(attr),
		"btn_32" : R.rect(208 , 169 , 30 , 30, 10).attr(attr),
		"btn_33" : R.rect(246 , 169 , 30 , 30, 10).attr(attr),
		"btn_34" : R.rect(284 , 169 , 30 , 30, 10).attr(attr),
		"btn_35" : R.rect(322 , 169 , 30 , 30, 10).attr(attr),
		"btn_36" : R.rect(360 , 169 , 30 , 30, 10).attr(attr),
		"btn_37" : R.rect(398 , 169 , 30 , 30, 10).attr(attr),
		"btn_38" : R.rect(436 , 169 , 30 , 30, 10).attr(attr),
		"btn_39" : R.rect(474 , 169 , 30 , 30, 10).attr(attr),
		"btn_40" : R.rect(208 , 207 , 30 , 30, 10).attr(attr),
		"btn_41" : R.rect(246 , 207 , 30 , 30, 10).attr(attr),
		"btn_42" : R.rect(284 , 207 , 30 , 30, 10).attr(attr),
		"btn_43" : R.rect(322 , 207 , 30 , 30, 10).attr(attr),
		"btn_44" : R.rect(360 , 207 , 30 , 30, 10).attr(attr),
		"btn_45" : R.rect(398 , 207 , 30 , 30, 10).attr(attr),
		"btn_46" : R.rect(436 , 207 , 30 , 30, 10).attr(attr),
		"btn_47" : R.rect(474 , 207 , 30 , 30, 10).attr(attr),
		"btn_48" : R.rect(208 , 245 , 30 , 30, 10).attr(attr),
		"btn_49" : R.rect(246 , 245 , 30 , 30, 10).attr(attr),
		"btn_50" : R.rect(284 , 245 , 30 , 30, 10).attr(attr),
		"btn_51" : R.rect(322 , 245 , 30 , 30, 10).attr(attr),
		"btn_52" : R.rect(360 , 245 , 30 , 30, 10).attr(attr),
		"btn_53" : R.rect(398 , 245 , 30 , 30, 10).attr(attr),
		"btn_54" : R.rect(436 , 245 , 30 , 30, 10).attr(attr),
		"btn_55" : R.rect(474 , 245 , 30 , 30, 10).attr(attr),
		"btn_56" : R.rect(208 , 283 , 30 , 30, 10).attr(attr),
		"btn_57" : R.rect(246 , 283 , 30 , 30, 10).attr(attr),
		"btn_58" : R.rect(284 , 283 , 30 , 30, 10).attr(attr),
		"btn_59" : R.rect(322 , 283 , 30 , 30, 10).attr(attr),
		"btn_60" : R.rect(360 , 283 , 30 , 30, 10).attr(attr),
		"btn_61" : R.rect(398 , 283 , 30 , 30, 10).attr(attr),
		"btn_62" : R.rect(436 , 283 , 30 , 30, 10).attr(attr),
		"btn_63" : R.rect(474 , 283 , 30 , 30, 10).attr(attr)
	};
	break;
	case 3: //block
	controller[3]={
	"exp_0" : R.circle(31 , 387 , 20).attr(attr),
	"exp_1" : R.circle(78 , 387 , 20).attr(attr),
	"exp_2" : R.rect(112 , 368 , 17 , 17, 2).attr(attr),			
	"exp_3" : R.rect(132 , 368 , 17 , 17, 2).attr(attr),
	"exp_4" : R.rect(152 , 368 , 17 , 17, 2).attr(attr),
	"exp_5" : R.rect(172 , 368 , 17 , 17, 2).attr(attr),
	"exp_6" : R.rect(112 , 388 , 17 , 17, 2).attr(attr),
	"exp_7" : R.rect(132 , 388 , 17 , 17, 2).attr(attr),
	"exp_8" : R.rect(152 , 388 , 17 , 17, 2).attr(attr),
	"exp_9" : R.rect(172 , 388 , 17 , 17, 2).attr(attr),
	"pot_0" : R.circle(50 , 24.5 , 11).attr(attr),
	"pot_1" : R.circle(97 , 24.5 , 11).attr(attr),
	"pot_2" : R.circle(144 , 24.5 , 11).attr(attr),
	"pot_3" : R.circle(191 , 24.5 , 11).attr(attr),
	"pot_4" : R.circle(235 , 24.5 , 11).attr(attr),
	"pot_5" : R.circle(282 , 24.5 , 11).attr(attr),
	"pot_6" : R.circle(329 , 24.5 , 11).attr(attr),
	"pot_7" : R.circle(376 , 24.5 , 11).attr(attr),
	"pot_8" : R.path("M36.592,266.996h-6.095v-45.999h-8v45.999h-6.096c-0.224,0-0.404,0.83-0.404,1.85v32.301c0,1.02,0.181,1.85,0.404,1.85h6.096v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.85v-32.301C36.997,267.824,36.815,266.996,36.592,266.996z").attr(attr),
	"pot_9" : R.path("M83.592,266.996h-6.095v-45.999h-8v45.999h-6.096c-0.224,0-0.404,0.83-0.404,1.85v32.301c0,1.02,0.181,1.85,0.404,1.85h6.096v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.85v-32.301C83.997,267.824,83.815,266.996,83.592,266.996z").attr(attr),
	"btn_70" : R.rect(56 , 118 , 36 , 36, 5).attr(attr),
	"btn_69" : R.rect(10 , 150 , 35 , 21, 5).attr(attr),
	"btn_68" : R.rect(10 , 118 , 35 , 21, 5).attr(attr),
	"btn_67" : R.rect(57 , 86 , 35 , 21, 5).attr(attr),
	"btn_66" : R.rect(10 , 86 , 35 , 21, 5).attr(attr),
	"btn_65" : R.rect(57 , 54 , 35 , 21, 5).attr(attr),
	"btn_64" : R.rect(10 , 54 , 35 , 21, 5).attr(attr),
	"btn_0" : R.rect(108.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_1" : R.rect(146.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_2" : R.rect(184.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_3" : R.rect(222.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_4" : R.rect(260.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_5" : R.rect(298.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_6" : R.rect(336.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_7" : R.rect(374.5 , 54 , 30 , 30, 10).attr(attr),
	"btn_8" : R.rect(108.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_9" : R.rect(146.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_10" : R.rect(184.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_11" : R.rect(222.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_12" : R.rect(260.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_13" : R.rect(298.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_14" : R.rect(336.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_15" : R.rect(374.5 , 92 , 30 , 30, 10).attr(attr),
	"btn_16" : R.rect(108.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_17" : R.rect(146.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_18" : R.rect(184.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_19" : R.rect(222.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_20" : R.rect(260.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_21" : R.rect(298.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_22" : R.rect(336.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_23" : R.rect(374.5 , 130 , 30 , 30, 10).attr(attr),
	"btn_24" : R.rect(108.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_25" : R.rect(146.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_26" : R.rect(184.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_27" : R.rect(222.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_28" : R.rect(260.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_29" : R.rect(298.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_30" : R.rect(336.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_31" : R.rect(374.5 , 168 , 30 , 30, 10).attr(attr),
	"btn_32" : R.rect(108.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_33" : R.rect(146.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_34" : R.rect(184.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_35" : R.rect(222.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_36" : R.rect(260.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_37" : R.rect(298.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_38" : R.rect(336.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_39" : R.rect(374.5 , 206 , 30 , 30, 10).attr(attr),
	"btn_40" : R.rect(108.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_41" : R.rect(146.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_42" : R.rect(184.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_43" : R.rect(222.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_44" : R.rect(260.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_45" : R.rect(298.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_46" : R.rect(336.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_47" : R.rect(374.5 , 244 , 30 , 30, 10).attr(attr),
	"btn_48" : R.rect(108.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_49" : R.rect(146.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_50" : R.rect(184.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_51" : R.rect(222.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_52" : R.rect(260.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_53" : R.rect(298.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_54" : R.rect(336.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_55" : R.rect(374.5 , 282 , 30 , 30, 10).attr(attr),
	"btn_56" : R.rect(108.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_57" : R.rect(146.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_58" : R.rect(184.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_59" : R.rect(222.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_60" : R.rect(260.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_61" : R.rect(298.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_62" : R.rect(336.5 , 320 , 30 , 30, 10).attr(attr),
	"btn_63" : R.rect(374.5 , 320 , 30 , 30, 10).attr(attr),

	
	}
	break;
	case 4://Code
	controller[4]={
	"enc_24" : R.circle(133 , 251.5 , 12).attr(attr),
	"enc_25" : R.circle(197 , 251.5 , 12).attr(attr),
	"enc_26" : R.circle(261 , 251.5 , 12).attr(attr),
	"enc_27" : R.circle(325 , 251.5 , 12).attr(attr),
	"enc_28" : R.circle(389 , 251.5 , 12).attr(attr),
	"enc_29" : R.circle(453 , 251.5 , 12).attr(attr),
	"enc_30" : R.circle(517 , 251.5 , 12).attr(attr),
	"enc_31" : R.circle(581 , 251.5 , 12).attr(attr),
	"enc_16" : R.circle(133 , 187.5 , 12).attr(attr),
	"enc_17" : R.circle(197 , 187.5 , 12).attr(attr),
	"enc_18" : R.circle(261 , 187.5 , 12).attr(attr),
	"enc_19" : R.circle(325 , 187.5 , 12).attr(attr),
	"enc_20" : R.circle(389 , 187.5 , 12).attr(attr),
	"enc_21" : R.circle(453 , 187.5 , 12).attr(attr),
	"enc_22" : R.circle(517 , 187.5 , 12).attr(attr),
	"enc_23" : R.circle(581 , 187.5 , 12).attr(attr),
	"enc_8" : R.circle(133 , 123.5 , 12).attr(attr),
	"enc_9" : R.circle(197 , 123.5 , 12).attr(attr),
	"enc_10" : R.circle(261 , 123.5 , 12).attr(attr),
	"enc_11" : R.circle(325 , 123.5 , 12).attr(attr),
	"enc_12" : R.circle(389 , 123.5 , 12).attr(attr),
	"enc_13" : R.circle(453 , 123.5 , 12).attr(attr),
	"enc_14" : R.circle(517 , 123.5 , 12).attr(attr),
	"enc_15" : R.circle(581 , 123.5 , 12).attr(attr),
	"enc_0" : R.circle(133 , 59.5 , 12).attr(attr),
	"enc_1" : R.circle(197 , 59.5 , 12).attr(attr),
	"enc_2" : R.circle(261 , 59.5 , 12).attr(attr),
	"enc_3" : R.circle(325 , 59.5 , 12).attr(attr),
	"enc_4" : R.circle(389 , 59.5 , 12).attr(attr),
	"enc_5" : R.circle(453 , 59.5 , 12).attr(attr),
	"enc_6" : R.circle(517 , 59.5 , 12).attr(attr),
	"enc_7" : R.circle(581 , 59.5 , 12).attr(attr),

	"btn_0" : R.circle(133 , 77.5 , 7).attr(attr),
	"btn_1" : R.circle(197 , 77.5 , 7).attr(attr),
	"btn_2" : R.circle(261 , 77.5 , 7).attr(attr),
	"btn_3" : R.circle(325 , 77.5 , 7).attr(attr),
	"btn_4" : R.circle(389 , 77.5 , 7).attr(attr),
	"btn_5" : R.circle(453 , 77.5 , 7).attr(attr),
	"btn_6" : R.circle(517 , 77.5 , 7).attr(attr),
	"btn_7" : R.circle(581 , 77.5 , 7).attr(attr),
	"btn_8" : R.circle(133 , 141.5 , 7).attr(attr),
	"btn_9" : R.circle(197 , 141.5 , 7).attr(attr),
	"btn_10" : R.circle(261 , 141.5 , 7).attr(attr),
	"btn_11" : R.circle(325 , 141.5 , 7).attr(attr),
	"btn_12" : R.circle(389 , 141.5 , 7).attr(attr),
	"btn_13" : R.circle(453 , 141.5 , 7).attr(attr),
	"btn_14" : R.circle(517 , 141.5 , 7).attr(attr),
	"btn_15" : R.circle(581 , 141.5 , 7).attr(attr),
	"btn_16" : R.circle(133 , 205.5 , 7).attr(attr),
	"btn_17" : R.circle(197 , 205.5 , 7).attr(attr),
	"btn_18" : R.circle(261 , 205.5 , 7).attr(attr),
	"btn_19" : R.circle(325 , 205.5 , 7).attr(attr),
	"btn_20" : R.circle(389 , 205.5 , 7).attr(attr),
	"btn_21" : R.circle(453 , 205.5 , 7).attr(attr),
	"btn_22" : R.circle(517 , 205.5 , 7).attr(attr),
	"btn_23" : R.circle(581 , 205.5 , 7).attr(attr),
	"btn_24" : R.circle(133 , 269.5 , 7).attr(attr),
	"btn_25" : R.circle(197 , 269.5 , 7).attr(attr),
	"btn_26" : R.circle(261 , 269.5 , 7).attr(attr),
	"btn_27" : R.circle(325 , 269.5 , 7).attr(attr),
	"btn_28" : R.circle(389 , 269.5 , 7).attr(attr),
	"btn_29" : R.circle(453 , 269.5 , 7).attr(attr),
	"btn_30" : R.circle(517 , 269.5 , 7).attr(attr),
	"btn_31" : R.circle(581 , 269.5 , 7).attr(attr),

	"ledring_24" : R.path("M125.089,267.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C122.273,269.466,124.039,269.183,125.089,267.757z").attr(attr),
	"ledring_25" : R.path("M189.089,267.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C186.273,269.466,188.039,269.183,189.089,267.757z").attr(attr),
	"ledring_26" : R.path("M253.089,267.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C250.273,269.466,252.039,269.183,253.089,267.757z").attr(attr),
	"ledring_27" : R.path("M317.089,267.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C314.273,269.466,316.039,269.183,317.089,267.757z").attr(attr),
	"ledring_28" : R.path("M381.089,267.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C378.272,269.466,380.038,269.183,381.089,267.757z").attr(attr),
	"ledring_29" : R.path("M445.089,267.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C442.272,269.466,444.038,269.183,445.089,267.757z").attr(attr),
	"ledring_30" : R.path("M509.089,267.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C506.272,269.466,508.038,269.183,509.089,267.757z").attr(attr),
	"ledring_31" : R.path("M573.089,267.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.246,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C570.272,269.466,572.038,269.183,573.089,267.757z").attr(attr),
	"ledring_16" : R.path("M125.089,203.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C122.273,205.466,124.039,205.183,125.089,203.757z").attr(attr),
	"ledring_17" : R.path("M189.089,203.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C186.273,205.466,188.039,205.183,189.089,203.757z").attr(attr),
	"ledring_18" : R.path("M253.089,203.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C250.273,205.466,252.039,205.183,253.089,203.757z").attr(attr),
	"ledring_19" : R.path("M317.089,203.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.222,9.053-6.172,11.844c-1.462,1.031-1.756,2.781-0.709,4.221c1.048,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.915,14.314s0.075,17.66,7.733,23.07C314.273,205.466,316.039,205.183,317.089,203.757z").attr(attr),
	"ledring_20" : R.path("M381.089,203.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C378.272,205.466,380.038,205.183,381.089,203.757z").attr(attr),
	"ledring_21" : R.path("M445.089,203.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C442.272,205.466,444.038,205.183,445.089,203.757z").attr(attr),
	"ledring_22" : R.path("M509.089,203.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C506.272,205.466,508.038,205.183,509.089,203.757z").attr(attr),
	"ledring_23" : R.path("M573.089,203.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.053-5.465-16.301c2.035-6.245,7.414-10.111,14.07-10.111c3.996-0.072,7.703,1.402,10.529,4.189c2.826,2.785,4.322,6.439,4.25,10.379c0,4.791-2.221,9.053-6.172,11.844c-1.461,1.031-1.756,2.781-0.709,4.221c1.049,1.441,2.822,1.73,4.283,0.699c7.66-5.41,10.617-14.229,7.732-23.07c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.473-19.914,14.314c-2.883,8.842,0.074,17.66,7.732,23.07C570.272,205.466,572.038,205.183,573.089,203.757z").attr(attr),
	"ledring_8" : R.path("M125.089,139.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C122.273,141.466,124.039,141.184,125.089,139.757z").attr(attr),
	"ledring_9" : R.path("M189.089,139.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C186.273,141.466,188.039,141.184,189.089,139.757z").attr(attr),
	"ledring_10" : R.path("M253.089,139.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C250.273,141.466,252.039,141.184,253.089,139.757z").attr(attr),
	"ledring_11" : R.path("M317.089,139.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C314.273,141.466,316.039,141.184,317.089,139.757z").attr(attr),
	"ledring_12" : R.path("M381.089,139.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C378.272,141.466,380.038,141.184,381.089,139.757z").attr(attr),
	"ledring_13" : R.path("M445.089,139.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C442.272,141.466,444.038,141.184,445.089,139.757z").attr(attr),
	"ledring_14" : R.path("M509.089,139.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C506.272,141.466,508.038,141.184,509.089,139.757z").attr(attr),
	"ledring_15" : R.path("M573.089,139.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C570.272,141.466,572.038,141.184,573.089,139.757z").attr(attr),
	"ledring_0" : R.path("M125.089,75.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C122.273,77.466,124.039,77.184,125.089,75.757z").attr(attr),
	"ledring_1" : R.path("M189.089,75.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C186.273,77.466,188.039,77.184,189.089,75.757z").attr(attr),
	"ledring_2" : R.path("M253.089,75.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C250.273,77.466,252.039,77.184,253.089,75.757z").attr(attr),
	"ledring_3" : R.path("M317.089,75.757c1.032-1.445,0.747-3.189-0.694-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.031-1.756,2.781-0.709,4.222c1.048,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.493-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.842,0.075,17.661,7.733,23.071C314.273,77.466,316.039,77.184,317.089,75.757z").attr(attr),
	"ledring_4" : R.path("M381.089,75.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C378.272,77.466,380.038,77.184,381.089,75.757z").attr(attr),
	"ledring_5" : R.path("M445.089,75.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C442.272,77.466,444.038,77.184,445.089,75.757z").attr(attr),
	"ledring_6" : R.path("M509.089,75.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C506.272,77.466,508.038,77.184,509.089,75.757z").attr(attr),
	"ledring_7" : R.path("M573.089,75.757c1.031-1.445,0.746-3.189-0.695-4.238c-5.412-3.822-7.5-10.052-5.465-16.3c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.221,9.052-6.172,11.843c-1.461,1.031-1.756,2.781-0.709,4.222c1.049,1.44,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.229,7.732-23.071c-2.879-8.842-10.492-14.314-19.914-14.314c-9.42,0-17.033,5.472-19.914,14.314c-2.883,8.842,0.074,17.661,7.732,23.071C570.272,77.466,572.038,77.184,573.089,75.757z").attr(attr),

	"btn_32" : R.rect(46.5 , 37 , 45 , 45, 15).attr(attr),
	"btn_33" : R.rect(46.5 , 101 , 45 , 45, 15).attr(attr),
	"btn_34" : R.rect(46.5 , 165 , 45 , 45, 15).attr(attr),
	"btn_35" : R.rect(46.5 , 229 , 45 , 45, 15).attr(attr),
	"btn_36" : R.rect(46.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_37" : R.rect(110.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_38" : R.rect(174.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_39" : R.rect(238.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_40" : R.rect(302.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_41" : R.rect(366.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_42" : R.rect(430.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_43" : R.rect(494.5 , 293 , 45 , 45, 15).attr(attr),
	"btn_44" : R.rect(558.5 , 293 , 45 , 45, 15).attr(attr),

	
	};
	break;
	case 7://OHM RGB
	controller[7]={
		"exp_0" : R.circle(32 , 427 , 20).attr(attr),
		"exp_1" : R.circle(79 , 427 , 20).attr(attr),
		"exp_2" : R.rect(113 , 408 , 17 , 17, 2).attr(attr),
		"exp_3" : R.rect(133 , 408 , 17 , 17, 2).attr(attr),
		"exp_4" : R.rect(153 , 408 , 17 , 17, 2).attr(attr),
		"exp_5" : R.rect(173 , 408 , 17 , 17, 2).attr(attr),
		"exp_6" : R.rect(113 , 428 , 17 , 17, 2).attr(attr),
		"exp_7" : R.rect(133 , 428 , 17 , 17, 2).attr(attr),
		"exp_8" : R.rect(153 , 428 , 17 , 17, 2).attr(attr),
		"exp_9" : R.rect(173 , 428 , 17 , 17, 2).attr(attr),
		"btn_66" : R.rect(14 , 343 , 36 , 36, 5).attr(attr),
		"btn_67" : R.rect(61 , 343 , 36 , 36, 5).attr(attr),
		"btn_68" : R.rect(108 , 343 , 36 , 36, 5).attr(attr),
		"btn_69" : R.rect(155 , 343 , 36 , 36, 5).attr(attr),
		"btn_64" : R.rect(220 , 323 , 36 , 36, 5).attr(attr),
		"btn_65" : R.rect(454 , 323 , 36 , 36, 5).attr(attr),
		"btn_70" : R.rect(520 , 343 , 36 , 36, 5).attr(attr),
		"btn_71" : R.rect(567 , 343 , 36 , 36, 5).attr(attr),
		"btn_72" : R.rect(614 , 343 , 36 , 36, 5).attr(attr),
		"btn_73" : R.rect(661 , 343 , 36 , 36, 5).attr(attr),
		"btn_80" : R.rect(661 , 18.5 , 36 , 36, 5).attr(attr),
		"pot_0" : R.circle(32 , 34.5 , 11).attr(attr),
		"pot_1" : R.circle(79 , 34.5 , 11).attr(attr),
		"pot_2" : R.circle(126 , 34.5 , 11).attr(attr),
		"pot_3" : R.circle(173 , 34.5 , 11).attr(attr),
		"pot_4" : R.circle(32 , 82.5 , 11).attr(attr),
		"pot_5" : R.circle(79 , 82.5 , 11).attr(attr),
		"pot_6" : R.circle(126 , 82.5 , 11).attr(attr),
		"pot_7" : R.circle(173 , 82.5 , 11).attr(attr),
		"pot_8" : R.circle(32 , 130.5 , 11).attr(attr),
		"pot_9" : R.circle(79 , 130.5 , 11).attr(attr),
		"pot_10" : R.circle(126 , 130.5 , 11).attr(attr),
		"pot_11" : R.circle(173 , 130.5 , 11).attr(attr),
		"pot_12" : R.circle(538 , 130.5 , 11).attr(attr),
		"pot_13" : R.circle(585 , 130.5 , 11).attr(attr),
		"pot_14" : R.circle(632 , 130.5 , 11).attr(attr),
		"pot_15" : R.circle(679 , 130.5 , 11).attr(attr),
		"pot_16" : R.path("M42.095,230H36v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H28v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C42.5,230.828,42.319,230,42.095,230z").attr(attr),
		"pot_17" : R.path("M89.095,230H83v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H75v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C89.5,230.828,89.319,230,89.095,230z").attr(attr),
		"pot_18" : R.path("M135.095,229H129v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H121v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C135.5,229.828,135.319,229,135.095,229z").attr(attr),
		"pot_19" : R.path("M182.095,229H176v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H168v48h8v-48h6.095c0.224,0,0.405-0.83,0.405-1.851v-32.3C182.5,229.828,182.319,229,182.095,229z").attr(attr),
		"pot_20" : R.path("M547.096,229H541v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H533v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C547.5,229.828,547.318,229,547.096,229z").attr(attr),
		"pot_21" : R.path("M594.096,229H588v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H580v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C594.5,229.828,594.318,229,594.096,229z").attr(attr),
		"pot_22" : R.path("M641.096,229H635v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H627v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C641.5,229.828,641.318,229,641.096,229z").attr(attr),
		"pot_23" : R.path("M688.096,229H682v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H674v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C688.5,229.828,688.318,229,688.096,229z").attr(attr),
		"pot_24" : R.path("M420,337h-59.5v-8.019c0-0.266-0.254-0.481-0.566-0.481h-9.868c-0.312,0-0.565,0.217-0.565,0.481V337H290v8h59.5v8.018c0,0.266,0.253,0.482,0.565,0.482h9.868c0.312,0,0.566-0.217,0.566-0.482V345H420V337z").attr(attr),
		"btn_74" : R.rect(521.5 , 18.5 , 35 , 21, 5).attr(attr),
		"btn_75" : R.rect(568.5 , 18.5 , 35 , 21, 5).attr(attr),
		"btn_76" : R.rect(615.5 , 18.5 , 35 , 21, 5).attr(attr),
		"btn_77" : R.rect(521.5 , 50.5 , 35 , 21, 5).attr(attr),
		"btn_78" : R.rect(568.5 , 50.5 , 35 , 21, 5).attr(attr),
		"btn_79" : R.rect(615.5 , 50.5 , 35 , 21, 5).attr(attr),
		"btn_0" : R.rect(208 , 17 , 30 , 30, 10).attr(attr),
		"btn_1" : R.rect(246 , 17 , 30 , 30, 10).attr(attr),
		"btn_2" : R.rect(284 , 17 , 30 , 30, 10).attr(attr),
		"btn_3" : R.rect(322 , 17 , 30 , 30, 10).attr(attr),
		"btn_4" : R.rect(360 , 17 , 30 , 30, 10).attr(attr),
		"btn_5" : R.rect(398 , 17 , 30 , 30, 10).attr(attr),
		"btn_6" : R.rect(436 , 17 , 30 , 30, 10).attr(attr),
		"btn_7" : R.rect(474 , 17 , 30 , 30, 10).attr(attr),
		"btn_8" : R.rect(208 , 55 , 30 , 30, 10).attr(attr),
		"btn_9" : R.rect(246 , 55 , 30 , 30, 10).attr(attr),
		"btn_10" : R.rect(284 , 55 , 30 , 30, 10).attr(attr),
		"btn_11" : R.rect(322 , 55 , 30 , 30, 10).attr(attr),
		"btn_12" : R.rect(360 , 55 , 30 , 30, 10).attr(attr),
		"btn_13" : R.rect(398 , 55 , 30 , 30, 10).attr(attr),
		"btn_14" : R.rect(436 , 55 , 30 , 30, 10).attr(attr),
		"btn_15" : R.rect(474 , 55 , 30 , 30, 10).attr(attr),
		"btn_16" : R.rect(208 , 93 , 30 , 30, 10).attr(attr),
		"btn_17" : R.rect(246 , 93 , 30 , 30, 10).attr(attr),
		"btn_18" : R.rect(284 , 93 , 30 , 30, 10).attr(attr),
		"btn_19" : R.rect(322 , 93 , 30 , 30, 10).attr(attr),
		"btn_20" : R.rect(360 , 93 , 30 , 30, 10).attr(attr),
		"btn_21" : R.rect(398 , 93 , 30 , 30, 10).attr(attr),
		"btn_22" : R.rect(436 , 93 , 30 , 30, 10).attr(attr),
		"btn_23" : R.rect(474 , 93 , 30 , 30, 10).attr(attr),
		"btn_24" : R.rect(208 , 131 , 30 , 30, 10).attr(attr),
		"btn_25" : R.rect(246 , 131 , 30 , 30, 10).attr(attr),
		"btn_26" : R.rect(284 , 131 , 30 , 30, 10).attr(attr),
		"btn_27" : R.rect(322 , 131 , 30 , 30, 10).attr(attr),
		"btn_28" : R.rect(360 , 131 , 30 , 30, 10).attr(attr),
		"btn_29" : R.rect(398 , 131 , 30 , 30, 10).attr(attr),
		"btn_30" : R.rect(436 , 131 , 30 , 30, 10).attr(attr),
		"btn_31" : R.rect(474 , 131 , 30 , 30, 10).attr(attr),
		"btn_32" : R.rect(208 , 169 , 30 , 30, 10).attr(attr),
		"btn_33" : R.rect(246 , 169 , 30 , 30, 10).attr(attr),
		"btn_34" : R.rect(284 , 169 , 30 , 30, 10).attr(attr),
		"btn_35" : R.rect(322 , 169 , 30 , 30, 10).attr(attr),
		"btn_36" : R.rect(360 , 169 , 30 , 30, 10).attr(attr),
		"btn_37" : R.rect(398 , 169 , 30 , 30, 10).attr(attr),
		"btn_38" : R.rect(436 , 169 , 30 , 30, 10).attr(attr),
		"btn_39" : R.rect(474 , 169 , 30 , 30, 10).attr(attr),
		"btn_40" : R.rect(208 , 207 , 30 , 30, 10).attr(attr),
		"btn_41" : R.rect(246 , 207 , 30 , 30, 10).attr(attr),
		"btn_42" : R.rect(284 , 207 , 30 , 30, 10).attr(attr),
		"btn_43" : R.rect(322 , 207 , 30 , 30, 10).attr(attr),
		"btn_44" : R.rect(360 , 207 , 30 , 30, 10).attr(attr),
		"btn_45" : R.rect(398 , 207 , 30 , 30, 10).attr(attr),
		"btn_46" : R.rect(436 , 207 , 30 , 30, 10).attr(attr),
		"btn_47" : R.rect(474 , 207 , 30 , 30, 10).attr(attr),
		"btn_48" : R.rect(208 , 245 , 30 , 30, 10).attr(attr),
		"btn_49" : R.rect(246 , 245 , 30 , 30, 10).attr(attr),
		"btn_50" : R.rect(284 , 245 , 30 , 30, 10).attr(attr),
		"btn_51" : R.rect(322 , 245 , 30 , 30, 10).attr(attr),
		"btn_52" : R.rect(360 , 245 , 30 , 30, 10).attr(attr),
		"btn_53" : R.rect(398 , 245 , 30 , 30, 10).attr(attr),
		"btn_54" : R.rect(436 , 245 , 30 , 30, 10).attr(attr),
		"btn_55" : R.rect(474 , 245 , 30 , 30, 10).attr(attr),
		"btn_56" : R.rect(208 , 283 , 30 , 30, 10).attr(attr),
		"btn_57" : R.rect(246 , 283 , 30 , 30, 10).attr(attr),
		"btn_58" : R.rect(284 , 283 , 30 , 30, 10).attr(attr),
		"btn_59" : R.rect(322 , 283 , 30 , 30, 10).attr(attr),
		"btn_60" : R.rect(360 , 283 , 30 , 30, 10).attr(attr),
		"btn_61" : R.rect(398 , 283 , 30 , 30, 10).attr(attr),
		"btn_62" : R.rect(436 , 283 , 30 , 30, 10).attr(attr),
		"btn_63" : R.rect(474 , 283 , 30 , 30, 10).attr(attr)
	};
	break;
	case 8: //CNTRL:R
	controller[8]={
"pot_24" : R.path("M41.596,225.997H35.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H27.5v48h8v-48h6.096c0.224,0,0.404-0.83,0.404-1.851v-32.3C42,226.825,41.819,225.997,41.596,225.997z").attr(attr),
"pot_25" : R.path("M88.596,225.997H82.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851H74.5v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C89,226.825,88.818,225.997,88.596,225.997z").attr(attr),
"pot_26" : R.path("M135.596,225.997H129.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851h6.096v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C136,226.825,135.818,225.997,135.596,225.997z").attr(attr),
"pot_27" : R.path("M182.596,225.997H176.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851h6.096v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C183,226.825,182.818,225.997,182.596,225.997z").attr(attr),
"pot_28" : R.path("M521.596,225.997H515.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851h6.096v48h8v-48h6.096c0.224,0,0.404-0.83,0.404-1.851v-32.3C522,226.825,521.819,225.997,521.596,225.997z").attr(attr),
"pot_29" : R.path("M568.596,225.997H562.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851h6.096v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C569,226.825,568.818,225.997,568.596,225.997z").attr(attr),
"pot_30" : R.path("M615.596,225.997H609.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851h6.096v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C616,226.825,615.818,225.997,615.596,225.997z").attr(attr),
"pot_31" : R.path("M662.596,225.997H656.5v-46h-8v46h-6.096c-0.224,0-0.404,0.829-0.404,1.85v32.3c0,1.021,0.181,1.851,0.404,1.851h6.096v48h8v-48h6.096c0.223,0,0.404-0.83,0.404-1.851v-32.3C663,226.825,662.818,225.997,662.596,225.997z").attr(attr),
"pot_0" : R.circle(31.5 , 27.5 , 11.5).attr(attr),
"pot_1" : R.circle(78.5 , 27.5 , 11.5).attr(attr),
"pot_2" : R.circle(125.5 , 27.5 , 11.5).attr(attr),
"pot_3" : R.circle(172.5 , 27.5 , 11.5).attr(attr),
"pot_4" : R.circle(511.501 , 27.5 , 11.5).attr(attr),
"pot_5" : R.circle(558.5 , 27.5 , 11.5).attr(attr),
"pot_6" : R.circle(605.5 , 27.5 , 11.5).attr(attr),
"pot_7" : R.circle(652.5 , 27.5 , 11.5).attr(attr),
"pot_8" : R.circle(31.5 , 75.5 , 11.5).attr(attr),
"pot_9" : R.circle(78.5 , 75.5 , 11.5).attr(attr),
"pot_10" : R.circle(125.5 , 75.5 , 11.5).attr(attr),
"pot_11" : R.circle(172.5 , 75.5 , 11.5).attr(attr),
"pot_12" : R.circle(511.501 , 75.5 , 11.5).attr(attr),
"pot_13" : R.circle(558.5 , 75.5 , 11.5).attr(attr),
"pot_14" : R.circle(605.5 , 75.5 , 11.5).attr(attr),
"pot_15" : R.circle(652.5 , 75.5 , 11.5).attr(attr),
"pot_16" : R.circle(31.5 , 123.5 , 11.5).attr(attr),
"pot_17" : R.circle(78.5 , 123.5 , 11.5).attr(attr),
"pot_18" : R.circle(125.5 , 123.5 , 11.5).attr(attr),
"pot_19" : R.circle(172.5 , 123.5 , 11.5).attr(attr),
"pot_20" : R.circle(511.501 , 123.5 , 11.5).attr(attr),
"pot_21" : R.circle(558.5 , 123.5 , 11.5).attr(attr),
"pot_22" : R.circle(605.5 , 123.5 , 11.5).attr(attr),
"pot_23" : R.circle(652.5 , 123.5 , 11.5).attr(attr),

"exp_0" : R.circle(20 , 470 , 20).attr(attr),
"exp_1" : R.circle(68 , 470 , 20).attr(attr),
"exp_2" : R.rect(100.5 , 450.5 , 17 , 17, 2).attr(attr),
"exp_3" : R.rect(120.5 , 450.5 , 17 , 17, 2).attr(attr),
"exp_4" : R.rect(140.5 , 450.5 , 17 , 17, 2).attr(attr),
"exp_5" : R.rect(160.5 , 450.5 , 17 , 17, 2).attr(attr),
"exp_6" : R.rect(100.5 , 470.5 , 17 , 17, 2).attr(attr),
"exp_7" : R.rect(120.5 , 470.5 , 17 , 17, 2).attr(attr),
"exp_8" : R.rect(140.5 , 470.5 , 17 , 17, 2).attr(attr),
"exp_9" : R.rect(160.5 , 470.5 , 17 , 17, 2).attr(attr),

"ledring_0" : R.path("M259.089,37.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C284.035,5.972,276.421,0.5,267,0.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C256.273,38.912,258.039,38.63,259.089,37.203z").attr(attr),
"ledring_1" : R.path("M309.089,37.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C334.035,5.972,326.421,0.5,317,0.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C306.273,38.912,308.039,38.63,309.089,37.203z").attr(attr),
"ledring_2" : R.path("M359.089,37.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C384.035,5.972,376.421,0.5,367,0.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C356.273,38.912,358.039,38.63,359.089,37.203z").attr(attr),
"ledring_3" : R.path("M409.089,37.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C434.035,5.972,426.421,0.5,417,0.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C406.273,38.912,408.039,38.63,409.089,37.203z").attr(attr),
"ledring_4" : R.path("M259.089,85.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C284.035,53.972,276.421,48.5,267,48.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C256.273,86.912,258.039,86.63,259.089,85.203z").attr(attr),
"ledring_5" : R.path("M309.089,85.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C334.035,53.972,326.421,48.5,317,48.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C306.273,86.912,308.039,86.63,309.089,85.203z").attr(attr),
"ledring_6" : R.path("M359.089,85.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C384.035,53.972,376.421,48.5,367,48.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C356.273,86.912,358.039,86.63,359.089,85.203z").attr(attr),
"ledring_7" : R.path("M409.089,85.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C434.035,53.972,426.421,48.5,417,48.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C406.273,86.912,408.039,86.63,409.089,85.203z").attr(attr),
"ledring_8" : R.path("M259.089,133.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C284.035,101.972,276.421,96.5,267,96.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C256.273,134.912,258.039,134.63,259.089,133.203z").attr(attr),
"ledring_9" : R.path("M309.089,133.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C334.035,101.972,326.421,96.5,317,96.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C306.273,134.912,308.039,134.63,309.089,133.203z").attr(attr),
"ledring_10" : R.path("M359.089,133.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C384.035,101.972,376.421,96.5,367,96.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C356.273,134.912,358.039,134.63,359.089,133.203z").attr(attr),
"ledring_11" : R.path("M409.089,133.203c1.032-1.445,0.747-3.189-0.694-4.239c-5.412-3.822-7.5-10.051-5.465-16.299c2.035-6.246,7.414-10.113,14.07-10.113c3.996-0.072,7.703,1.403,10.529,4.189c2.826,2.786,4.322,6.44,4.25,10.38c0,4.791-2.222,9.052-6.172,11.843c-1.462,1.032-1.756,2.782-0.709,4.222c1.048,1.441,2.822,1.73,4.283,0.698c7.66-5.41,10.617-14.228,7.732-23.071C434.035,101.972,426.421,96.5,417,96.5c-9.42,0-17.033,5.472-19.915,14.314c-2.882,8.843,0.075,17.661,7.733,23.071C406.273,134.912,408.039,134.63,409.089,133.203z").attr(attr),

"btn_48" : R.circle(267 , 39 , 8).attr(attr),
"btn_49" : R.circle(317 , 39 , 8).attr(attr),
"btn_50" : R.circle(367 , 39 , 8).attr(attr),
"btn_51" : R.circle(417 , 39 , 8).attr(attr),
"enc_0" : R.circle(267 , 21 , 11).attr(attr),
"enc_1" : R.circle(317 , 21 , 11).attr(attr),
"enc_2" : R.circle(367 , 21 , 11).attr(attr),
"enc_3" : R.circle(417 , 21 , 11).attr(attr),
"btn_52" : R.circle(267 , 87 , 8).attr(attr),
"btn_53" : R.circle(317 , 87 , 8).attr(attr),
"btn_54" : R.circle(367 , 87 , 8).attr(attr),
"btn_55" : R.circle(417 , 87 , 8).attr(attr),
"enc_4" : R.circle(267 , 69 , 11).attr(attr),
"enc_5" : R.circle(317 , 69 , 11).attr(attr),
"enc_6" : R.circle(367 , 69 , 11).attr(attr),
"enc_7" : R.circle(417 , 69 , 11).attr(attr),
"btn_56" : R.circle(267 , 135 , 8).attr(attr),
"btn_57" : R.circle(317 , 135 , 8).attr(attr),
"btn_58" : R.circle(367 , 135 , 8).attr(attr),
"btn_59" : R.circle(417 , 135 , 8).attr(attr),
"enc_8" : R.circle(267 , 117 , 11).attr(attr),
"enc_9" : R.circle(317 , 117 , 11).attr(attr),
"enc_10" : R.circle(367 , 117 , 11).attr(attr),
"enc_11" : R.circle(417 , 117 , 11).attr(attr),

"btn_0" : R.rect(248 , 148 , 38 , 38, 5).attr(attr),
"btn_1" : R.rect(298 , 148 , 38 , 38, 5).attr(attr),
"btn_2" : R.rect(348 , 148 , 38 , 38, 5).attr(attr),
"btn_3" : R.rect(398 , 148 , 38 , 38, 5).attr(attr),
"btn_4" : R.rect(248 , 198 , 38 , 38, 5).attr(attr),
"btn_5" : R.rect(298 , 198 , 38 , 38, 5).attr(attr),
"btn_6" : R.rect(348 , 198 , 38 , 38, 5).attr(attr),
"btn_7" : R.rect(398 , 198 , 38 , 38, 5).attr(attr),
"btn_8" : R.rect(248 , 248 , 38 , 38, 5).attr(attr),
"btn_9" : R.rect(298 , 248 , 38 , 38, 5).attr(attr),
"btn_10" : R.rect(348 , 248 , 38 , 38, 5).attr(attr),
"btn_11" : R.rect(398 , 248 , 38 , 38, 5).attr(attr),
"btn_12" : R.rect(248 , 298 , 38 , 38, 5).attr(attr),
"btn_13" : R.rect(298 , 298 , 38 , 38, 5).attr(attr),
"btn_14" : R.rect(348 , 298 , 38 , 38, 5).attr(attr),
"btn_15" : R.rect(398 , 298 , 38 , 38, 5).attr(attr),

"btn_32" : R.rect(18.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_33" : R.rect(59.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_34" : R.rect(100.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_35" : R.rect(141.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_36" : R.rect(182.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_37" : R.rect(223.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_38" : R.rect(264.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_39" : R.rect(305.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_40" : R.rect(346.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_41" : R.rect(387.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_42" : R.rect(428.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_43" : R.rect(469.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_44" : R.rect(510.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_45" : R.rect(551.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_46" : R.rect(592.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_47" : R.rect(633.5 , 391.5 , 32 , 32, 10).attr(attr),
"btn_16" : R.rect(18.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_17" : R.rect(59.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_18" : R.rect(100.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_19" : R.rect(141.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_20" : R.rect(182.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_21" : R.rect(223.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_22" : R.rect(264.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_23" : R.rect(305.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_24" : R.rect(346.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_25" : R.rect(387.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_26" : R.rect(428.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_27" : R.rect(469.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_28" : R.rect(510.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_29" : R.rect(551.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_30" : R.rect(592.5 , 350.5 , 32 , 32, 10).attr(attr),
"btn_31" : R.rect(633.5 , 350.5 , 32 , 32, 10).attr(attr)
};
	break;
	case 11: //alias8
	controller[11]={
			//pots
			"pot_0" : R.circle(64 , 77.001 , 16).attr(attr),
			"pot_1" : R.circle(133 , 77.001 , 16).attr(attr),
			"pot_2" : R.circle(202 , 77.001 , 16).attr(attr),
			"pot_3" : R.circle(271 , 77.001 , 16).attr(attr),
			"pot_4" : R.circle(340 , 77.001 , 16).attr(attr),
			"pot_5" : R.circle(409 , 77.001 , 16).attr(attr),
			"pot_6" : R.circle(478 , 77.001 , 16).attr(attr),
			"pot_7" : R.circle(547 , 77.001 , 16).attr(attr),
			"pot_8" : R.circle(64 , 143.001 , 16).attr(attr),
			"pot_9" : R.circle(133 , 143.001 , 16).attr(attr),
			"pot_10" : R.circle(202 , 143.001 , 16).attr(attr),
			"pot_11" : R.circle(271 , 143.001 , 16).attr(attr),
			"pot_12" : R.circle(340 , 143.001 , 16).attr(attr),
			"pot_13" : R.circle(409 , 143.001 , 16).attr(attr),
			"pot_14" : R.circle(478 , 143.001 , 16).attr(attr),
			"pot_15" : R.circle(547 , 143.001 , 16).attr(attr),

		//faders
			"pot_16" : R.path("M80.824,237.524H68.455V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C81.5,237.893,81.197,237.524,80.824,237.524z"),
			"pot_17" : R.path("M149.824,237.524h-12.369V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C150.5,237.893,150.197,237.524,149.824,237.524z"),
			"pot_18" : R.path("M218.824,237.524h-12.369V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C219.5,237.893,219.197,237.524,218.824,237.524z"),
			"pot_19" : R.path("M287.824,237.524h-12.369V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C288.5,237.893,288.197,237.524,287.824,237.524z"),
			"pot_20" : R.path("M356.825,237.524h-12.37V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.675-0.369,0.675-0.823v-14.355C357.5,237.893,357.198,237.524,356.825,237.524z"),
			"pot_21" : R.path("M425.824,237.524h-12.369V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C426.5,237.893,426.197,237.524,425.824,237.524z"),
			"pot_22" : R.path("M494.824,237.524h-12.369V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C495.5,237.893,495.197,237.524,494.824,237.524z"),
			"pot_23" : R.path("M563.824,237.524h-12.369V196h-9v41.524h-12.28c-0.374,0-0.675,0.369-0.675,0.822v14.355c0,0.454,0.301,0.823,0.675,0.823h12.28V296h9v-42.475h12.369c0.373,0,0.676-0.369,0.676-0.823v-14.355C564.5,237.893,564.197,237.524,563.824,237.524z"),
			"pot_24" : R.path("M631.383,310.024h-10.928V228.5h-9v81.524h-10.838c-0.342,0-0.617,0.3-0.617,0.668v11.663c0,0.369,0.275,0.669,0.617,0.669h10.838V405.5h9v-82.476h10.928c0.341,0,0.617-0.3,0.617-0.669v-11.663C632,310.324,631.724,310.024,631.383,310.024z"),
		//encoder
			"enc_1" : R.circle(616,143,16),
			"enc_0" : R.circle(0,0,1), //dummy encoder
		//RectButtons
			"btn_0" : R.rect(42.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_1" : R.rect(111.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_2" : R.rect(180.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_3" : R.rect(249.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_4" : R.rect(318.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_5" : R.rect(387.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_6" : R.rect(456.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_7" : R.rect(525.5 , 327.5 , 43 , 43, 15).attr(attr),
			"btn_8" : R.rect(42.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_9" : R.rect(111.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_10" : R.rect(180.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_11" : R.rect(249.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_12" : R.rect(318.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_13" : R.rect(387.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_14" : R.rect(456.5 , 393.5 , 43 , 43, 15).attr(attr),
			"btn_15" : R.rect(525.5 , 393.5 , 43 , 43, 15).attr(attr)

	}
	break;
	case 12: //Base
	controller[12]={
			//top cap touch buttons
			"btn_48" : R.path("M96,79 96,106 42,106 42,52 69,52z").attr(attr),
			"btn_49" : R.path("M177,79 177,106 123,106 123,52 150,52z").attr(attr),
			"btn_50" : R.path("M256,79 256,106 202,106 202,52 229,52z").attr(attr),
			"btn_51" : R.path("M336,79 336,106 282,106 282,52 309,52z").attr(attr),
			"btn_52" : R.path("M416,79 416,106 362,106 362,52 389,52z").attr(attr),
			"btn_53" : R.path("M496,79 496,106 442,106 442,52 469,52z").attr(attr),
			"btn_54" : R.path("M576,79 576,106 522,106 522,52 549,52z").attr(attr),
			"btn_55" : R.path("M656,79 656,106 602,106 602,52 629,52z").attr(attr),
			//top right corner leds in cap btns
			"led_56" : R.path("M69,52 96,52 96,79z").attr(attr),
			"led_57" : R.path("M150,52 177,52 177,79z").attr(attr),
			"led_58" : R.path("M229,52 256,52 256,79z").attr(attr),
			"led_59" : R.path("M309,52 336,52 336,79z").attr(attr),
			"led_60" : R.path("M389,52 416,52 416,79z").attr(attr),
			"led_61" : R.path("M469,52 496,52 496,79z").attr(attr),
			"led_62" : R.path("M549,52 576,52 576,79z").attr(attr),
			"led_63" : R.path("M629,52 656,52 656,79z").attr(attr),
			//cap sliders
			"slide_0" : R.rect(42 , 130 , 54 , 180, 5).attr(attr),
			"slide_1" : R.rect(122 , 130 , 54 , 180, 5).attr(attr),
			"slide_2" : R.rect(202 , 130 , 54 , 180, 5).attr(attr),
			"slide_3" : R.rect(282 , 130 , 54 , 180, 5).attr(attr),
			"slide_4" : R.rect(362 , 130 , 54 , 180, 5).attr(attr),
			"slide_5" : R.rect(442 , 130 , 54 , 180, 5).attr(attr),
			"slide_6" : R.rect(522 , 130 , 54 , 180, 5).attr(attr),
			"slide_7" : R.rect(602 , 130 , 54 , 180, 5).attr(attr),
			"slide_8" : R.rect(692 , 52 , 54 , 180, 5).attr(attr),
			//fcn btns
			"btn_32" : R.path("M746,347 746,361 692,361 692,334 719,334z").attr(attr),
			"btn_33" : R.path("M746,387 746,401 692,401 692,374 719,374z").attr(attr),
			"btn_34" : R.path("M746,427 746,441 692,441 692,414 719,414z").attr(attr),
			"btn_35" : R.path("M746,467 746,481 692,481 692,454 719,454z").attr(attr),
			"btn_36" : R.path("M746,507 746,521 692,521 692,494 719,494z").attr(attr),
			"btn_37" : R.path("M746,547 746,561 692,561 692,534 719,534z").attr(attr),
			"btn_38" : R.path("M746,587 746,601 692,601 692,574 719,574z").attr(attr),
			"btn_39" : R.path("M746,627 746,641 692,641 692,614 719,614z").attr(attr),
			//fcn btns right side LEDs
			"led_47" : R.path("M719,614 746,614 746,626.999z").attr(attr),
			"led_46" : R.path("M719,574 746,574 746,586.999z").attr(attr),
			"led_45" : R.path("M719,534 746,534 746,546.999z").attr(attr),
			"led_44" : R.path("M719,494 746,494 746,506.999z").attr(attr),
			"led_43" : R.path("M719,454 746,454 746,466.999z").attr(attr),
			"led_42" : R.path("M719,414 746,414 746,426.999z").attr(attr),
			"led_41" : R.path("M719,374 746,374 746,386.999z").attr(attr),
			"led_40" : R.path("M719,334 746,334 746,346.999z").attr(attr),
			//fsr, duh.
			"fsr_24" : R.path("M32,398.374 41.626,408 96.374,408 106,398.374 106,343.627 96.374,334 41.626,334 32,343.627z").attr(attr),
			"fsr_25" : R.path("M112,398.374 121.626,408 176.374,408 186,398.374 186,343.627 176.374,334 121.626,334 112,343.627z").attr(attr),
			"fsr_26" : R.path("M192,398.374 201.626,408 256.374,408 266,398.374 266,343.627 256.374,334 201.626,334 192,343.627z").attr(attr),
			"fsr_27" : R.path("M272,398.374 281.626,408 336.374,408 346,398.374 346,343.627 336.374,334 281.626,334 272,343.627z").attr(attr),
			"fsr_28" : R.path("M352,398.374 361.626,408 416.374,408 426,398.374 426,343.627 416.374,334 361.626,334 352,343.627z").attr(attr),
			"fsr_29" : R.path("M432,398.374 441.627,408 496.374,408 506,398.374 506,343.627 496.374,334 441.627,334 432,343.627z").attr(attr),
			"fsr_30" : R.path("M512,398.374 521.627,408 576.374,408 586,398.374 586,343.627 576.374,334 521.627,334 512,343.627z").attr(attr),
			"fsr_31" : R.path("M592,398.374 601.627,408 656.374,408 666,398.374 666,343.627 656.374,334 601.627,334 592,343.627z").attr(attr),
			"fsr_16" : R.path("M32,478.374 41.626,488 96.374,488 106,478.374 106,423.626 96.374,414 41.626,414 32,423.626z").attr(attr),
			"fsr_17" : R.path("M112,478.374 121.626,488 176.374,488 186,478.374 186,423.626 176.374,414 121.626,414 112,423.626z").attr(attr),
			"fsr_18" : R.path("M192,478.374 201.626,488 256.374,488 266,478.374 266,423.626 256.374,414 201.626,414 192,423.626z").attr(attr),
			"fsr_19" : R.path("M272,478.374 281.626,488 336.374,488 346,478.374 346,423.626 336.374,414 281.626,414 272,423.626z").attr(attr),
			"fsr_20" : R.path("M352,478.374 361.626,488 416.374,488 426,478.374 426,423.626 416.374,414 361.626,414 352,423.626z").attr(attr),
			"fsr_21" : R.path("M432,478.374 441.627,488 496.374,488 506,478.374 506,423.626 496.374,414 441.627,414 432,423.626z").attr(attr),
			"fsr_22" : R.path("M512,478.374 521.627,488 576.374,488 586,478.374 586,423.626 576.374,414 521.627,414 512,423.626z").attr(attr),
			"fsr_23" : R.path("M592,478.374 601.627,488 656.374,488 666,478.374 666,423.626 656.374,414 601.627,414 592,423.626z").attr(attr),
			"fsr_8" : R.path("M32,558.374 41.626,568 96.374,568 106,558.374 106,503.626 96.374,494 41.626,494 32,503.626z").attr(attr),
			"fsr_9" : R.path("M112,558.374 121.626,568 176.374,568 186,558.374 186,503.626 176.374,494 121.626,494 112,503.626z").attr(attr),
			"fsr_10" : R.path("M192,558.374 201.626,568 256.374,568 266,558.374 266,503.626 256.374,494 201.626,494 192,503.626z").attr(attr),
			"fsr_11" : R.path("M272,558.374 281.626,568 336.374,568 346,558.374 346,503.626 336.374,494 281.626,494 272,503.626z").attr(attr),
			"fsr_12" : R.path("M352,558.374 361.626,568 416.374,568 426,558.374 426,503.626 416.374,494 361.626,494 352,503.626z").attr(attr),
			"fsr_13" : R.path("M432,558.374 441.627,568 496.374,568 506,558.374 506,503.626 496.374,494 441.627,494 432,503.626z").attr(attr),
			"fsr_14" : R.path("M512,558.374 521.627,568 576.374,568 586,558.374 586,503.626 576.374,494 521.627,494 512,503.626z").attr(attr),
			"fsr_15" : R.path("M592,558.374 601.627,568 656.374,568 666,558.374 666,503.626 656.374,494 601.627,494 592,503.626").attr(attr),
			"fsr_0" : R.path("M32,638.374 41.626,648 96.374,648 106,638.374 106,583.626 96.374,574 41.626,574 32,583.626z").attr(attr),
			"fsr_1" : R.path("M112,638.374 121.626,648 176.374,648 186,638.374 186,583.626 176.374,574 121.626,574 112,583.626z").attr(attr),
			"fsr_2" : R.path("M192,638.374 201.626,648 256.374,648 266,638.374 266,583.626 256.374,574 201.626,574 192,583.626z").attr(attr),
			"fsr_3" : R.path("M272,638.374 281.626,648 336.374,648 346,638.374 346,583.626 336.374,574 281.626,574 272,583.626z").attr(attr),
			"fsr_4" : R.path("M352,638.374 361.626,648 416.374,648 426,638.374 426,583.626 416.374,574 361.626,574 352,583.626z").attr(attr),
			"fsr_5" : R.path("M432,638.374 441.627,648 496.374,648 506,638.374 506,583.626 496.374,574 441.627,574 432,583.626z").attr(attr),
			"fsr_6" : R.path("M512,638.374 521.627,648 576.374,648 586,638.374 586,583.626 576.374,574 521.627,574 512,583.626z").attr(attr),
			"fsr_7" : R.path("M592,638.374 601.627,648 656.374,648 666,638.374 666,583.626 656.374,574 601.627,574 592,583.626").attr(attr)
	}
	break;
	case 14: //Brain CV
	controller[14] = {
	  
	}
	break;
	case 15: //Guitar Wing
	controller[15]={
    "fsr_4" : R.circle(607.333 , 239.358 , 31.5).attr(attr),
    "fsr_3" : R.circle(149.487 , 197.048 , 36).attr(attr),
    "fsr_2" : R.circle(244.78 , 187.509 , 36).attr(attr),
    "fsr_1" : R.circle(339.5 , 153 , 36).attr(attr),
    "fsr_0" : R.circle(385.225 , 64.314 , 36).attr(attr),
    "slide_3" : R.path("M520.167,283.705c-1.78,1.288-4.32,0.817-5.676-1.055L396.112,119.201c-1.355-1.871-1.013-4.432,0.769-5.721l39.473-28.589c1.78-1.289,4.321-0.817,5.677,1.054l118.379,163.451c1.356,1.872,1.012,4.433-0.77,5.72L520.167,283.705z").attr(attr),
    "slide_2" : R.path("M251.835,114.764l-83.367,43.023c-1.909,0.985-4.286,0.179-5.31-1.808l-22.708-44c-1.023-1.985-0.307-4.391,1.603-5.376l83.213-42.944L251.835,114.764z").attr(attr),
    "slide_1" : R.path("M225.266,63.659l83.553-43.12c1.91-0.986,4.287-0.177,5.31,1.809l22.708,44c1.023,1.985,0.307,4.391-1.603,5.376l-83.4,43.041L225.266,63.659z").attr(attr),
    "btn_4" : R.path("M177.845,263.05c0.109,2.02-1.594,3.754-3.803,3.873l-39.933,2.156c-2.209,0.119-4.088-1.422-4.197-3.441l-0.603-11.153c-0.109-2.02,1.593-3.754,3.802-3.873l39.933-2.156c2.209-0.119,4.088,1.422,4.197,3.441L177.845,263.05z").attr(attr),
    "btn_3" : R.path("M247.52,254.401c0.212,2.012-1.398,3.831-3.598,4.063l-39.77,4.206c-2.2,0.232-4.156-1.209-4.368-3.222l-1.175-11.107c-0.213-2.012,1.398-3.831,3.598-4.063l39.77-4.206c2.2-0.232,4.156,1.211,4.369,3.222L247.52,254.401z").attr(attr),
    "btn_2" : R.path("M315.22,244.015c0.329,1.996-1.174,3.905-3.356,4.265l-39.459,6.504c-2.183,0.359-4.219-0.967-4.547-2.964l-1.817-11.021c-0.329-1.996,1.173-3.905,3.356-4.265l39.459-6.504c2.183-0.359,4.219,0.969,4.548,2.964L315.22,244.015z").attr(attr),
    "btn_1" : R.path("M385.59,231.579c0.329,1.996-1.174,3.905-3.355,4.265l-39.459,6.504c-2.183,0.359-4.219-0.967-4.547-2.964l-1.817-11.021c-0.329-1.996,1.173-3.905,3.356-4.265l39.46-6.504c2.182-0.359,4.219,0.969,4.548,2.964L385.59,231.579z").attr(attr),
    "btn_6" : R.path("M452.799,240.854c1.647-1.097,3.109-0.379,3.248,1.596l2.252,32.134c0.139,1.975-1.195,2.863-2.965,1.974l-28.779-14.466c-1.77-0.89-1.868-2.516-0.221-3.612L452.799,240.854z").attr(attr),
    "btn_5" : R.path("M413.411,239.834c-1.647,1.097-3.109,0.379-3.248-1.596l-2.252-32.134c-0.139-1.975,1.195-2.863,2.965-1.974l28.779,14.466c1.77,0.89,1.868,2.516,0.221,3.612L413.411,239.834z").attr(attr),
    "btn_10" : R.path("M473.215,82.727c-1.129,0.386-2.358-0.215-2.744-1.344l-4.433-12.941c-0.386-1.129,0.215-2.356,1.344-2.744l4.425-1.517c1.13-0.387,2.358,0.214,2.745,1.344l4.433,12.941c0.388,1.13-0.215,2.357-1.344,2.745L473.215,82.727z").attr(attr),
    "btn_9" : R.path("M494.382,123.686c-0.989,0.667-2.333,0.406-2.999-0.584l-7.647-11.342c-0.667-0.99-0.405-2.332,0.584-2.999l3.879-2.616c0.989-0.667,2.333-0.406,2.999,0.583l7.647,11.342c0.668,0.99,0.405,2.332-0.584,3L494.382,123.686z").attr(attr),
    "btn_8" : R.path("M530.626,152.727c-0.651,0.998-1.991,1.279-2.989,0.627l-11.453-7.481c-0.998-0.653-1.279-1.992-0.627-2.99l2.56-3.918c0.651-0.999,1.991-1.28,2.989-0.627l11.453,7.482c0.999,0.652,1.279,1.991,0.627,2.99L530.626,152.727z").attr(attr),
    "btn_7" : R.path("M574.86,172.742c-0.448,1.104-1.709,1.636-2.813,1.187l-12.674-5.147c-1.105-0.452-1.638-1.711-1.188-2.814l1.762-4.337c0.448-1.105,1.709-1.639,2.813-1.188l12.674,5.148c1.105,0.45,1.638,1.711,1.188,2.815L574.86,172.742z").attr(attr),
    "acc_2" : R.path("549.277,52.936 540.313,44.046 531.351,52.936 536.579,52.936 536.579,66.177 544.049,66.177 544.049,52.936").attr(attr),
    "acc_1" : R.path("596.896,91.881 600.112,79.674 587.933,76.356 590.547,80.885 579.079,87.505 582.814,93.974 594.281,87.354").attr(attr),
    "acc_0" : R.path("587.932,152.5 600.112,149.182 596.895,136.974 594.28,141.502 582.813,134.881 579.079,141.35 590.546,147.97").attr(attr),
	}
	break;
	case 16: //DS1
	controller[16] = {
	  
	}
	break;
	}
	//with some of the graphics, coordinates are a bit off or too large, so we use a transform to shift everything.
	if(pid==4){
		var tfm = 'T-0.5,0';
		R.forEach(function(obj){
			obj.transform(tfm);
		});
	}
	if(pid==7 || pid==2){
		var tfm = 'T-1,-1';
		R.forEach(function(obj){
			obj.transform(tfm);
		});
	}
	if(pid==8){
		var tfm = 'T12,18';
		R.forEach(function(obj){
			obj.transform(tfm);
		});
	}
	if(pid==3){
		var tfm = 's1.3, 1.3, 0, 0T1.5, 1.5';
		R.forEach(function(obj){
			obj.transform(tfm);
		});
	}
	if(pid==12){
		var tfm = 's0.89, 0.89, 0, 0T1,1';
		R.forEach(function(obj){
			obj.transform(tfm);
		});
	}

	//**PROBABLY NOT NEEDED, but a good example**
	//get the url parameters (url variables) if any. We can use these to color and select items. The "mode" var MUST be first in the list.
	//For example, 
	//ending with ?mode=warn&btn=5 will blink btn_5 with warn color
	//ending with ?mode=on&enc=10 will turn enc_10 on with on color
	//end with ?id=4 to set for code, ?id=10 for base
	var urlparams = {};
	if (location.search) {
		var parts = location.search.substring(1).split('&');
		log("parsing url: "+parts);
		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
			if (!nv[0]) continue;
			urlparams[nv[0]] = nv[1] || true;
		}
		//perform actions based on URL variables:
		var mode = "";
		for(var ctl in urlparams){
			var val = urlparams[ctl];
			//CHANGE UI FOR DIFFERENT CONTROLLERS HERE::::
			if(ctl=="id"){
				pid=val;
				/*
				product(id); //in uitocontroller.js
				$('#canvas').width(dim[pid][0]);
				$('#canvas').height(dim[pid][1]);
				$('#paper').width(dim[pid][0]);
				$('#paper').height(dim[pid][1]);
				$('#paper').css({background : 'url(faceplate_'+pid+'.gif)  no-repeat'});
				*/
				log("ID: "+pid);
			}
			if(ctl=="port"){
				//do something based on midiport
			}
			if(ctl=="newsysex"){
				getsx(1); //the arguments tells it which sx file to retrieve
			}
			if(ctl=="mode"){
				mode=val;
			}else{
				if(ctl=="led") ctl="btn"; //translate - there's no "led" in the controller object, but led and btn are synonymous in this case, because buttons and LEDs are always shared.
				var ctlname = ctl+"_"+val;
				if(mode=="warn"){
					warnctl(pid,ctlname);
				}
				if(mode=="on"){
					selctl(pid,ctlname);
				}
			}
		}		
	}
	//**END NOT NEEDED**

	var fadeout;
	//mouse event detection for each control item graphic:
	for (var item in controller[pid]) {
		//controller[pid][item].color = Raphael.getColor();
		//controller[pid][item].color = color_over;
		(function (st, item) { //st is graphic object, item is the name like "btn_0"
			st[0].style.cursor = "pointer";
			st.translate(0,0);
			st.mousedown(function () {
				if(previous){
					previous.animate({fill: color_off, stroke: color_stroke,"fill-opacity": 0.0, "stroke-opacity": 0.0}, 5);
				}
				st.animate({fill: color_on, stroke: color_on, "fill-opacity": 0.5, "stroke-opacity": 0.5}, 5);
				st.toFront();
				selected=item;//the symbol
				previous=st;//the object
				clearTimeout(fadeout); //cancel fadeout
				var typeid=item.split("_");
				//clog("clicked type"+typeid[0]+" id "+typeid[1]);
				updatectlinspector(typeid[0],parseInt(typeid[1]))    //in uitocontroller.js                    
				//$.post("../editor_"+id+".html", "getid " + item); //this goes to Max/msp
				//R.safari();
			});
			
			st.mouseover(function () {
				if(current!=selected && item!=last){ //mouseout doesn't work in IE because it SUCKS so I have to clear the one we highlighted before:
					clearTimeout(fadeout);
					current && controller[pid][current].animate({fill: color_off, "fill-opacity": 0.0, "stroke-opacity": 0.0, stroke: color_stroke}, 400);
				}
				if(item!=selected){
					st.animate({fill: color_over, "stroke-width": strokewidth, stroke: color_over,"fill-opacity": 0.6, "stroke-opacity": 0.9}, 5);
					st.toFront();
					//R.safari();
					current = item;
					//fade out the over after 5 secs
					fadeout = setTimeout(function(){st.animate({fill: color_over, stroke: color_stroke,"fill-opacity": 0, "stroke-opacity": 0}, 500);},4000);
					//clog(" selected "+item);
				}
				last=item;//for filter 
				//clog(" last "+last+"<br>");
			});
			/* IE SUCKS. 
			st.mouseout(function () {
				if(item!=selected){
					st.animate({fill: color_off, stroke: color_stroke}, 20);
					st.toFront();
					log("out "+item);
					//R.safari();
				};
			});*/
		})(controller[pid][item], item);
	}
	
//handle all the forms for inspectors - get data from inspectors and put it in livid object
	//submit button or return key for ALL forms. Simply used to supress reload of page.
	$("form").submit(function() {		
	return false;
	});
	
	
//button presses	
	$(".group_btn").click(function() {
		var theid = this.id.split("_");
		var thediv=$(this).closest("div"); //get the div parent of the button that was clicked. could also do $(this).parent() I guess.
		var index=thediv.find(":input[type=hidden]").val(); //get the control ID by traversing through the div for the hidden element
		log('GROUP- index: '+index+' type '+theid[0]+' id '+this.id);
		group(theid[0],index);
	});
	
	$("#save").submit(function() {
		saveclicked=1;
		savetobrain();
	});
	$("#defaults").submit(function() {
		//factory_reset();
		//request();
		confirmbox("Are you sure you want to reset the controller to default settings?","defaults")
	});
	$("#encflip").click(function() {
		//factory_reset();
		//request();
		confirmbox("Are you sure you want to reverse the function of the encoders?","encflip")
	});
	/*
	$("#encdet_)abs").click(function() {
		//factory_reset();
		//request();
		var CMD = 75;
    var curr_abs = sx[CMD][0];
    var curr_rel = sx[CMD][1];
    var words = ["detented","smooth"];
		confirmbox("This will optimize the speed of encoders for "+words[curr_abs]+" encoders in absolute mode. Are you sure?","encdet_abs")
	});
	$("#encdet_rel").click(function() {
		var CMD = 75;
    var curr_abs = sx[CMD][0];
    var curr_rel = sx[CMD][1];
    var words = ["detented","smooth"];
		//factory_reset();
		//request();
		confirmbox("This will optimize the speed of encoders for "+words[curr_abs]+" encoders in relative mode. Are you sure?","encdet_rel")
	});
	*/
	$("#sendmidi").submit(function() {
	 var a = $('#sendmidi').serializeArray();
	 var nn=a[0].value;
	 var vel=a[1].value;
	 var ch=a[2].value;
	 var mode=a[3].value;
	 var nnvalid = (nn>-1 && nn<128);
	 var velvalid = (vel>=0 && vel<128);
	 var chvalid = (ch>0 && ch<17);
	 clog("SEND MIDI");
	 if( (nnvalid && velvalid) && chvalid){
	 	var status = {'note':144,'cc':176};
	 	var st_int = parseInt(status[mode])+parseInt(ch)-1;
	 	var mout = [st_int,nn,vel];
	 	midi_o(mout);
	 	var reqout = [];
	 	//request leds to update stored sysex
	 	var reqleds = reqout.concat(head,7,4,eom);
	 	midi_o(reqleds);
	 	//request LED rings:
	 	if(has_ledring){
      reqleds = reqout.concat(head,7,31,eom);
      midi_o(reqleds);
	 	}
	 	
	 }
	});
	
  $("#sendsysex").submit(function() {
    var sysexstr = $('#sysexvalue').val();
    var sysex = sysexstr.split(" ");
    for(var i=0; i<sysex.length; i++) { sysex[i] = parseInt(sysex[i]); } 
    if(sysex[0] != 240 && sysex[sysex.length-1] != 247 && sysex[4] != pid){
      alert_panel("The values are not valid sysex for this controller");
    }else{
      midi_o(sysex);
    }
  });
	
	$("#product").submit(function() {
		product(12);
		return false;
	});
	$("#request").submit(function() {
		//req_sched();
		request();
	});
	$("#testalert").submit(function() {
		alert_panel("ALERT");
	});
	$("#printsx").submit(function() {
		log();
		printsx();
	});
	$("#printlivid").submit(function() {
		log();
		printlivid();
	});
	$("#delspan").submit(function() {
		$('#label_14').remove();
		$('#testy').remove();
	});
	
	$("#writefile").submit(function() {
	  writejson();
	});

//any click in a form:
	$('form').click(function(){
		//clog('form klik'+' '+this.name);
	});
	
	$(':input').change(function(){
		//We need to get the control ID from the hidden form element, the type of control (btn, led, ledring, etc), 
		//parameter name (nn, onoff, mode, etc), value entered, and we need to know if there's a checkbox involved.
		//So we dig around the html elements using jquery to get all this data so we can use submit_one() to change the value
		//in the stored values in the livid object and send sysex to the controller to make it so.
		var theform=$(this).closest("form");
		var type=$(this).closest("form").attr('id'); //type, like "btn" or "ledring"
		clog("you are using form id "+type);
		if(type!="sendmidi" && type!="sendsysex" && type!="colormap"){
			var index=theform.find(":input[type=hidden]").val(); //control ID
			var test=theform.find(":input[type=hidden]").attr('name'); //control ID
			//clog("INDEX "+index+" N "+test);
			//var index=$("#ctlid").val(); //the hidden form element that holds the control ID
			var param=this.name;
			var value=this.value;
			log("input value "+param+" "+value);
			var formtype=this.type;
			if(formtype=="checkbox"){
				value=this.checked;
			}
			//clog('form>>'+' '+this.name+' parent: '+$(this).closest("form").attr('id')+' name: '+$(this).attr('name')+" i-"+index+" t-"+this.type+" v-"+value);
			if(type){ //excludes inputs that don't have a type - currently the MIDI menus are the only ones.
				submit_one(index,type,param,value,formtype);
			}
		}
		if(type=="colormap"){
			colormap_set(); //in uitocontroller.js
		}
	});
	
	//for uploading file to replace settings.
	$('#fileInput').change(function(e){
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    clog("file input...");
      var file = fileInput.files[0];
      var filename = $('#fileInput').val().split('\\').pop()
      var textType = /text.*/;
      clog("file type "+file.type+" or "+!file.type);
      if ( file.type.match(textType) || file.type.match("application/json") || file.type.match("") || !file.type) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var temp; 
          //see if it's actually JSON:       
          try {
            temp = JSON.parse(reader.result);
          } catch (exception) {
            temp = null;
          }
          if(temp){
            //validate the contents to see if it's something like sysex.
            var temp = JSON.parse(reader.result);
            var truthy = false;
            for (i in temp){
              if(i!="name" && i!="mfg" && i!="id"){
                truthy = parseInt(i)<128;
                //clog('key type '+i+' is '+truthy+" test: "+(i!="name" || i!="mfg" || i!="id"))
                for (j in temp[i]){
                  truthy = parseInt(j)<256;
                  //clog('index type '+j+' is '+truthy)
                }
              }
            }
            if(parseInt(temp.id)!=pid){
              truthy = false;
              clog('same product '+j+' is '+truthy)
            }
            clog("Valid preset file: "+truthy);
            if(truthy==true){
              sx = JSON.parse(reader.result);
              clog("Btns "+sx[11]);
              clog("LEDs "+sx[4]);
              toobj();
              //scheduling this because Mark reported some odd behavior where the new settings wouldn't appear on controller until there was a change made in an inspector:
              var schedsysexsend = setTimeout( somesysex(requests[pid]),100 );
              //somesysex(requests[pid]); //unshceduled here for posterity
              alertbox("Read preset file "+filename);
              fileDisplayArea.innerText = "preset loaded";
            }else{
              alertbox("This is not a valid preset file");
              fileDisplayArea.innerText = "data error";
            }
          }else{
            alertbox("This is not a valid preset file");
            fileDisplayArea.innerText = "json error";
          }
        }//end onload
        reader.readAsText(file);
      } else {
        fileDisplayArea.innerText = "File "+file.type+" not supported!"
      }
  });
	//TABS	
	$("#preset_tab").click(function() {
		hidetabs("R")
		$("#presets").fadeIn(FDUR);
		$(this).css("background",tabon);
		$(this).css("border-bottom-color",tabon);
	});
	$("#inspector_tab").click(function() {
		hidetabs("R")
		$("#inspectors_container").fadeIn(FDUR);
		$(this).css("background",tabon);
		$(this).css("border-bottom-color",tabon);
	});
	$("#global_tab").click(function() {
		hidetabs("L")
		$("#global_div").fadeIn(FDUR);
		$(this).css("background",tabon);
		$(this).css("border-bottom-color",tabon);
	});
	$("#colormap_tab").click(function() {
		hidetabs("L")
		$("#color_map").fadeIn(FDUR);
		$(this).css("background",tabon);
		$(this).css("border-bottom-color",tabon);
	});
	$("#midimon_tab").click(function() {
		hidetabs("L");
		$("#midimonitor").fadeIn(FDUR);
		$("#sendsysex_div").fadeIn(FDUR);
		$(this).css("background",tabon);
		$(this).css("border-bottom-color",tabon);
	});	
	
	$("#confirmyes").click(function(event) {
		event.stopPropagation();
    event.preventDefault();
      clog("CONFIRM YES");
      switch(confirm_what){
        case "defaults":
          //sx[49] = [];
          clog("RESET");
          resetting_defaults = true;
          $("#sendnote").focus();
          //need to delay this in the case that the cursor is in an inspector field when we do a reset:
          var schedreset = setTimeout(factory_reset(),200);
          //the request() function is called in procSysex when the ACK is rec'd from the defaults reset. We leave it here commented out for posterity:
          //request();
        break;
        case "encflip":
          enc_flip();
        break;
        case "encdet_abs":
            enc_det("abs");          
        break;
        case "encdet_rel":
            enc_det("rel");
        break;
      }
      $("#confirm").fadeTo(500,0,function() { $("#confirm").css({"z-index": -9}) });
      $("#midiioscrim").fadeOut(100);
	});
	$("#confirmno").click(function() {
	  clog("CONFIRM NO");
		$("#confirm").fadeTo(500,0);
    $("#midiioscrim").fadeOut(100);
    //change checkvalue for the smooth/detented checkboxes:
    if(confirm_what == "encdet_abs" ||  confirm_what == "encdet_rel" ){
      var checkvalue=$("#"+confirm_what).is(":checked");
      $("#"+confirm_what).prop("checked",!checkvalue);
    }
	});
};
