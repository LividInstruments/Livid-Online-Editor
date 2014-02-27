var FDUR = 100;
function user(){
	$(".close_modal").click(function() {
		var id = $(this).closest("div").attr("id")
		$("#"+id).fadeOut(FDUR);
	});
	
	$("#login_btn").click(function() {
		//need database connection here
		$("#loginlink").css("display","none");
		$("#login").fadeOut(FDUR);
		$("#presets_private").fadeIn(FDUR);
		//$("#righttabs").fadeIn(FDUR);
		//$("#midimonitor").css("display","none");
		$("#logoutlink").fadeIn(FDUR);
	});
	
	$(".do_logout").click(function() {
		$("#logoutlink").css("display","none");
		$("#presets_private").fadeOut(FDUR);
		//$("#righttabs").fadeOut(FDUR);
		//$("#midimonitor").fadeIn(FDUR);
		$("#loginlink").fadeIn(FDUR);
		
	});
	
	$("#reg_btn").click(function() {
		//need database connection here
		$("#register").fadeOut(FDUR);
		$("#register_thanks").fadeIn(FDUR);
	});
	
	$("#save_btn").click(function() {
		//store JSON to database
		//show a confirmation popup that times out
	});
	
	$("#search_btn").click(function() {
		//store JSON to database
		//show a confirmation popup that times out
		$("#searchresults_div").fadeIn(FDUR);
	});
	
	$("#recoverpwd").click(function() {
		//send email to user with new password
		//show confirmation
		$("#recoverpwd_note").fadeIn(FDUR);
		$("#login").fadeOut(FDUR);
	});
	
	$("#loadpst_btn").click(function() {
		//retrieve JSON from database, send to controller, show confirmation
	});
	
	$(".results").click(function() {
		selected = $('#searchresults').val();
		log("results "+selected);
		//$("#result_details").fadeOut(FDUR);
		//get description and tags from database and print them to $("#results_desc") and $("#results_tags")
		//position #result_details
		//$("#result_details").fadeIn(FDUR);
	});
		
	$(".show_register").click(function(){
		$("#login").fadeOut(FDUR);
		$("#register").fadeIn(FDUR);
	});
	
	$(".show_login").click(function() {
		$("#register").fadeOut(FDUR);
		$("#login").fadeIn(FDUR);
	});
	
}