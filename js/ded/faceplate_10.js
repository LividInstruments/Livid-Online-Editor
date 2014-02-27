
window.onload = function () {
	//get the url parameters if any. We can use these to color and select items. The "mode" var MUST be first in the list.
	//For example, 
	//ending with ?mode=warn&btn=5 will blink btn_5 with warn color
	//ending with ?mode=on&enc=10 will turn enc_10 on with on color
	var urlparams = {};
	if (location.search) {
		var parts = location.search.substring(1).split('&');
		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
			if (!nv[0]) continue;
			urlparams[nv[0]] = nv[1] || true;
		}
	}
	
	//setup the Rafael graphics:
	var R = Raphael("paper", 740, 630);
	var color_off="#FFF";//white
	var color_stroke="#000";//black
	var color_over="#3198CB";//blue
	var color_on="#40BD48";//green
	//var color_warn="#F2D113";//yellow
	var color_warn="#E8300C";//red
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
	var controller={

"B_0": R.path("M75,72.481c0,0.562-0.456,1.019-1.019,1.019H21.019C20.456,73.5,20,73.044,20,72.481V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_1": R.path("M155,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_2": R.path("M235,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_3": R.path("M315,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_4": R.path("M395,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_5": R.path("M475,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_6": R.path("M555,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
"B_7": R.path("M635,72.481c0,0.562-0.456,1.019-1.019,1.019h-52.963c-0.562,0-1.019-0.456-1.019-1.019V19.519c0-0.562,0.456-1.019,1.019-1.019h52.963c0.562,0,1.019,0.456,1.019,1.019V72.481z").attr(attr),
		//sliders
"S_0" : R.path("M75,274.5c0,0.552-0.448,1-1,1H21c-0.552,0-1-0.448-1-1v-178c0-0.552,0.448-1,1-1h53c0.552,0,1,0.448,1,1V274.5z").attr(attr),
"S_1" : R.path("M155,274.5c0,0.552-0.448,1-1,1h-53c-0.552,0-1-0.448-1-1v-178c0-0.552,0.448-1,1-1h53c0.552,0,1,0.448,1,1V274.5z").attr(attr),
"S_2" : R.path("M235,274.5c0,0.552-0.448,1-1,1h-53c-0.552,0-1-0.448-1-1v-178c0-0.552,0.448-1,1-1h53c0.552,0,1,0.448,1,1V274.5z").attr(attr),
"S_3" : R.path("M315,274.5c0,0.552-0.448,1-1,1h-53c-0.552,0-1-0.448-1-1v-178c0-0.552,0.448-1,1-1h53c0.552,0,1,0.448,1,1V274.5z").attr(attr),
"S_4" : R.path("M395,274.5c0,0.552-0.447,1-1,1h-53c-0.552,0-1-0.448-1-1v-178c0-0.552,0.448-1,1-1h53c0.553,0,1,0.448,1,1V274.5z").attr(attr),
"S_5" : R.path("M475,274.5c0,0.552-0.447,1-1,1h-53c-0.553,0-1-0.448-1-1v-178c0-0.552,0.447-1,1-1h53c0.553,0,1,0.448,1,1V274.5z").attr(attr),
"S_6" : R.path("M555,274.5c0,0.552-0.447,1-1,1h-53c-0.553,0-1-0.448-1-1v-178c0-0.552,0.447-1,1-1h53c0.553,0,1,0.448,1,1V274.5z").attr(attr),
"S_7" : R.path("M635,274.5c0,0.552-0.447,1-1,1h-53c-0.553,0-1-0.448-1-1v-178c0-0.552,0.447-1,1-1h53c0.553,0,1,0.448,1,1V274.5z").attr(attr),
		//fcn
"F_0" : R.path("M722.5,325c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V325z").attr(attr),
"F1_" : R.path("M722.5,366c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V366z").attr(attr),
"F_2" : R.path("M722.5,407c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V407z").attr(attr),
"F_3" : R.path("M722.5,448c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V448z").attr(attr),
"F_4" : R.path("M722.5,489c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V489z").attr(attr),
"F_5" : R.path("M722.5,530c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V530z").attr(attr),
"F_6" : R.path("M722.5,571c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V571z").attr(attr),
"F_7" : R.path("M722.5,612c0,1.656-1.343,3-3,3h-49c-1.657,0-3-1.344-3-3v-22c0-1.657,1.343-3,3-3h49c1.657,0,3,1.343,3,3V612z").attr(attr),
		//other
"master" : R.path("M722.5,197.5c0,0.552-0.447,1-1,1h-53c-0.553,0-1-0.448-1-1v-178c0-0.552,0.447-1,1-1h53c0.553,0,1,0.448,1,1V197.5z").attr(attr),
"LCD" : R.path("M726.5,278.5c0,0.552-0.447,1-1,1h-61c-0.553,0-1-0.448-1-1v-53c0-0.552,0.447-1,1-1h61c0.553,0,1,0.448,1,1V278.5z").attr(attr),
		//pads
"P_00" : R.path("M10,310.135L20.135,300L75.878,300L85,310.135L85,365.878L75.878,375L20.135,375L10,365.878z").attr(attr),
"P_01" : R.path("M10,390.135L20.135,380L75.878,380L85,390.135L85,445.878L75.878,455L20.135,455L10,445.878z").attr(attr),
"P_02" : R.path("M10,470.135L20.135,460L75.878,460L85,470.135L85,525.878L75.878,535L20.135,535L10,525.878z").attr(attr),
"P_03" : R.path("M10,550.135L20.135,540L75.878,540L85,550.135L85,605.878L75.878,615L20.135,615L10,605.878z").attr(attr),
"P_04" : R.path("M90,310.135L100.135,300L155.878,300L165,310.135L165,365.878L155.878,375L100.135,375L90,365.878z").attr(attr),
"P_05" : R.path("M90,390.135L100.135,380L155.878,380L165,390.135L165,445.878L155.878,455L100.135,455L90,445.878z").attr(attr),
"P_06" : R.path("M90,470.135L100.135,460L155.878,460L165,470.135L165,525.878L155.878,535L100.135,535L90,525.878z").attr(attr),
"P_07" : R.path("M90,550.135L100.135,540L155.878,540L165,550.135L165,605.878L155.878,615L100.135,615L90,605.878z").attr(attr),
"P_08" : R.path("M170,310.135L180.135,300L235.878,300L245,310.135L245,365.878L235.878,375L180.135,375L170,365.878z").attr(attr),
"P_09" : R.path("M170,390.135L180.135,380L235.878,380L245,390.135L245,445.878L235.878,455L180.135,455L170,445.878z").attr(attr),
"P_10" : R.path("M170,470.135L180.135,460L235.878,460L245,470.135L245,525.878L235.878,535L180.135,535L170,525.878z").attr(attr),
"P_11" : R.path("M170,550.135L180.135,540L235.878,540L245,550.135L245,605.878L235.878,615L180.135,615L170,605.878z").attr(attr),
"P_12" : R.path("M250,310.135L260.135,300L315.878,300L325,310.135L325,365.878L315.878,375L260.135,375L250,365.878z").attr(attr),
"P_13" : R.path("M250,390.135L260.135,380L315.878,380L325,390.135L325,445.878L315.878,455L260.135,455L250,445.878z").attr(attr),
"P_14" : R.path("M250,470.135L260.135,460L315.878,460L325,470.135L325,525.878L315.878,535L260.135,535L250,525.878z").attr(attr),
"P_15" : R.path("M250,550.135L260.135,540L315.878,540L325,550.135L325,605.878L315.878,615L260.135,615L250,605.878z").attr(attr),
"P_16" : R.path("M330,310.135L340.135,300L395.879,300L405,310.135L405,365.878L395.879,375L340.135,375L330,365.878z").attr(attr),
"P_17" : R.path("M330,390.135L340.135,380L395.879,380L405,390.135L405,445.878L395.879,455L340.135,455L330,445.878z").attr(attr),
"P_18" : R.path("M330,470.135L340.135,460L395.879,460L405,470.135L405,525.878L395.879,535L340.135,535L330,525.878z").attr(attr),
"P_19" : R.path("M330,550.135L340.135,540L395.879,540L405,550.135L405,605.878L395.879,615L340.135,615L330,605.878z").attr(attr),
"P_20" : R.path("M410,310.135L420.135,300L475.879,300L485,310.135L485,365.878L475.879,375L420.135,375L410,365.878z").attr(attr),
"P_21" : R.path("M410,390.135L420.135,380L475.879,380L485,390.135L485,445.878L475.879,455L420.135,455L410,445.878z").attr(attr),
"P_22" : R.path("M410,470.135L420.135,460L475.879,460L485,470.135L485,525.878L475.879,535L420.135,535L410,525.878z").attr(attr),
"P_23" : R.path("M410,550.135L420.135,540L475.879,540L485,550.135L485,605.878L475.879,615L420.135,615L410,605.878z").attr(attr),
"P_24" : R.path("M490,310.135L500.135,300L555.879,300L565,310.135L565,365.878L555.879,375L500.135,375L490,365.878z").attr(attr),
"P_25" : R.path("M490,390.135L500.135,380L555.879,380L565,390.135L565,445.878L555.879,455L500.135,455L490,445.878z").attr(attr),
"P_26" : R.path("M490,470.135L500.135,460L555.879,460L565,470.135L565,525.878L555.879,535L500.135,535L490,525.878z").attr(attr),
"P_27" : R.path("M490,550.135L500.135,540L555.879,540L565,550.135L565,605.878L555.879,615L500.135,615L490,605.878z").attr(attr),
"P_28" : R.path("M570,310.135L580.135,300L635.879,300L645,310.135L645,365.878L635.879,375L580.135,375L570,365.878z").attr(attr),
"P_29" : R.path("M570,390.135L580.135,380L635.879,380L645,390.135L645,445.878L635.879,455L580.135,455L570,445.878z").attr(attr),
"P_30" : R.path("M570,470.135L580.135,460L635.879,460L645,470.135L645,525.878L635.879,535L580.135,535L570,525.878z").attr(attr),
"P_31" : R.path("M570,550.135L580.135,540L635.879,540L645,550.135L645,605.878L635.879,615L580.135,615L570,605.878z").attr(attr)		
	}

	var selected = "";
	var current = null;
	var previous = null;
	var last = null;
	
	//draw any warnings or selections dictated by URL variables:
	var mode = "";
	for(var ctl in urlparams){
		var val = urlparams[ctl];
		//log("<br>01ctl: "+ctl+" is "+val);
		if(ctl=="mode"){
			mode=urlparams[ctl];
		}else{
			if(ctl=="led") ctl="btn"; //translate - there's no "led" in the controller object, but they are synonymous in this case.
			var ctlname = ctl+"_"+val;
			if(mode=="warn"){
				controller[ctlname].animate({fill: color_warn, stroke: color_stroke, "fill-opacity": 0.5, "stroke-opacity": 0.5}, 500, function(){
					//hold, then fadeout on callback
					controller[ctlname].animate({fill: color_warn, stroke: color_stroke, "fill-opacity": 1, "stroke-opacity": 1}, 4000, function(){
						controller[ctlname].animate({fill: color_warn, stroke: color_stroke, "fill-opacity": 0., "stroke-opacity": 0.}, 200)
					})			
				});
			}
			if(mode=="on"){
				controller[ctlname].animate({fill: color_on, stroke: color_stroke, "fill-opacity": 0.5, "stroke-opacity": 0.5}, 5);
				selected=ctlname;
				previous = controller[ctlname];
			}
		}
	}
	
	var fadeout;
	//mouse event detection for each control item graphic:
	for (var item in controller) {
		//controller[item].color = Raphael.getColor();
		//controller[item].color = color_over;
		(function (st, item) {
			st[0].style.cursor = "pointer";
			st.translate(0,0);
			st.mousedown(function () {
				if(previous){
					previous.animate({fill: color_off, stroke: color_stroke,"fill-opacity": 0.0, "stroke-opacity": 0.0}, 5);
				}
				st.animate({fill: color_on, stroke: color_stroke, "fill-opacity": 0.5, "stroke-opacity": 0.5}, 5);
				st.toFront();
				selected=item;//the symbol
				previous=st;//the object
				clearTimeout(fadeout); //cancel fadeout
				//log(item);                        
				//$.post("../toserver.jsp", "getid " + item); //this goes to Max/msp
				$.post("../editor_4.html", "getid " + item); //this goes to Max/msp
				//R.safari();
			});
			
			st.mouseover(function () {
				if(current!=selected && item!=last){ //mouseout doesn't work in IE because it SUCKS so I have to clear the one we highlighted before:
					clearTimeout(fadeout);
					current && controller[current].animate({fill: color_off, "fill-opacity": 0.0, "stroke-opacity": 0.0, stroke: color_stroke}, 400);
					//log(" | clear: curr "+current+" sel "+selected);
				}
				if(item!=selected){
					st.animate({fill: color_over, stroke: color_stroke,"fill-opacity": 0.5, "stroke-opacity": 0.5}, 5);
					st.toFront();
					//R.safari();
					current = item;
					//fade out the over after 5 secs
					fadeout = setTimeout(function(){st.animate({fill: color_over, stroke: color_stroke,"fill-opacity": 0, "stroke-opacity": 0}, 500);},4000);
					//log("selected "+selected);
				}
				last=item;//for filter 
				//log(" last "+last+"<br>");
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
		})(controller[item], item);
	}
	
};