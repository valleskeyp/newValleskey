//Peter Valleskey
//ASD 2/2012
//Project 4

$( '#home' ).live( 'pageinit',function(event){
function makeDate() {
	var mydate=new Date()
	var theyear=mydate.getYear()
	if (theyear < 1000)
		theyear+=1900
		var theday=mydate.getDay()
		var themonth=mydate.getMonth()+1
		if (themonth<10)
			themonth="0"+themonth
			var theday=mydate.getDate()
			if (theday<10)
				theday="0"+theday
				var displayfirst=themonth
				var displaysecond=theday
				var displaythird=theyear
				return displayfirst+"/"+displaysecond+"/"+displaythird
}   
$('#date').val(makeDate()); // function to create formatted date - then jquery call to populate it

jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	'dateFormat': 'dd.mm.YYYY',
	'headerFormat': 'dd.mm.YYYY'
});

var advForm = $('#advForm');
advForm.validate({
	error: function(result){ console.log(result); },
	submitHandler: function(e) {
		var data = advForm.serializeArray();
		var keyID = $("#submit").attr("key");
		if (keyID) {
			$.couch.db("adventure2").openDoc(keyID, {
				error: function(result){ console.log(result); },
				success: function(doc) {
					doc.age        = ["Age: ",                 data[0].value];
					doc.sex        = ["Sex: ",                 data[1].value];
					doc.group      = ["Class: ",               data[2].value];
					doc.date       = ["Date joined: ",         data[3].value];
					doc.guild      = ["Guild member status: ", data[4].value];
					doc.comments   = ["Comments: ",            data[5].value];
					$.couch.db('adventure2').saveDoc(doc);
					//alert("Adventurer saved sucessfully!");
					postListing(doc, "edit");
					//$.mobile.changePage("#postPage");
				}
			});
		} else {
			var ID = "key:"+data[0].value;
			var item        = {};
			item._id        = ID;
			item.name       = ["Name: ",                data[0].value];
			item.age        = ["Age: ",                 data[1].value];
			item.sex        = ["Sex: ",                 data[2].value];
			item.group      = ["Class: ",               data[3].value];
			item.date       = ["Date joined: ",         data[4].value];
			item.guild      = ["Guild member status: ", data[5].value];
			item.comments   = ["Comments: ",            data[6].value];
		
			$.couch.db('adventure2').saveDoc(item);
			//alert("Adventurer saved sucessfully!");
			postListing(item, "new");
		}
		
		$('#name').attr('value', "");
		$('#age').attr('value', 26);
		$('#sex').attr('value', "Male");
		$('#guild').attr('value', "Not in the guild");
		$('#groups').attr('value', "");
		$('#date').val(makeDate());
		$('#comments').attr('value', "");
		
		$('#name').textinput('enable');
		$("#submit").removeAttr('key');
		$("#delete").html("");
		$('#groups').selectmenu('refresh');
		$('#age').slider('refresh');
		$('#sex').slider('refresh');
		$('#guild').slider('refresh');
	}
});
var postListing = function(doc, type) {
			$("#postList").append('<li data-role="list-divider"></li>');
			$("#postList").append('<li data-theme=d></li>');
			$("#postList li:last-child").append('<h3>' + doc.name[0] + ' ' + doc.name[1] + '</h3>');
			$("#postList li:last-child").append('<p>' + doc.age[0] + ' ' + doc.age[1] + '</p>');
			$("#postList li:last-child").append('<p>' + doc.sex[0] + ' ' + doc.sex[1] + '</p>');
			$("#postList li:last-child").append('<p>' + doc.group[0] + ' ' + doc.group[1] + '</p>');
			$("#postList li:last-child").append('<p>' + doc.date[0] + ' ' + doc.date[1] + '</p>');
			$("#postList li:last-child").append('<p>' + doc.guild[0] + ' ' + doc.guild[1] + '</p>');
			$("#postList li:last-child").append('<p>' + doc.comments[0] + ' ' + doc.comments[1] + '</p>');
			$("#postList").append('<li data-role="list-divider"></li>');
			$("#postList").append('<li data-theme=d></li>');
			if(type === "edit") {
				$("#postList li:last-child").append('<h3>You successfully edited this entry!</h3>');
				$("#postList li:last-child").append('<p>Revision: '+doc._rev+'');
			} else if(type === "delete") {
				$("#postList li:last-child").append('<h3>You successfully deleted this entry!</h3>');
			} else if(type === "new") {
				$("#postList li:last-child").append('<h3>You successfully created this entry!</h3>');
			} else {
				console.log("There was an error with the type.");
			} 
			$("#postList li:last-child").append('<div><a href="index.html" data-icon="home" data-role="button" data-theme="c" data-inline="true" data-ajax="false">Home</a></div>');
	$
	$.mobile.changePage("#postPage");
}
// JQuery Couch call to READ the database and output to my list-view list pages
$.couch.db("adventure2").view("adv/adventurers", {
	success: function(data) {
		for(i=0; i<data.rows.length; i++){
			var key = data.rows[i].id;
			if(data.rows[i].value.group[1] === "Warrior") {
				$("#warriorList").append('<li data-role="list-divider"></li>');
				$("#warriorList").append('<li data-theme=d></li>');
				for(var n in data.rows[i].value){
					var cat = ""+n+"";
					$("#warriorList li:last-child").attr("id", key);
					if(data.rows[i].value[cat][0] === "Name: ") {
						$("#warriorList li:last-child").append('<h3>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</h3>');
					} else {
						$("#warriorList li:last-child").append('<p>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</p>');
					}
				}
				$("#warriorList li:last-child").append('<div><a href="#formPage" data-icon="gear" class="edit" data-role="button" data-theme="a" data-inline="true" data-ajax="false">Edit</a></div>');
				$("#warriorList li:last-child div:last-child a:first-child").attr("key", key);
			}
			if(data.rows[i].value.group[1] === "Rogue") {
				$("#rogueList").append('<li data-role="list-divider"></li>');
				$("#rogueList").append('<li data-theme=d></li>');
				for(var n in data.rows[i].value){
					var cat = ""+n+"";
					$("#rogueList li:last-child").attr("id", key);
					if(data.rows[i].value[cat][0] === "Name: ") {
						$("#rogueList li:last-child").append('<h3>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</h3>');
					} else {
						$("#rogueList li:last-child").append('<p>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</p>');
					}
				}
				$("#rogueList li:last-child").append('<div><a href="#formPage" data-icon="gear" class="edit" data-role="button" data-theme="a" data-inline="true" data-ajax="false">Edit</a></div>');
				$("#rogueList li:last-child div:last-child a").attr("key", key);
			}
			if(data.rows[i].value.group[1] === "Hunter") {
				$("#hunterList").append('<li data-role="list-divider"></li>');
				$("#hunterList").append('<li data-theme=d></li>');
				for(var n in data.rows[i].value){
					var cat = ""+n+"";
					$("#hunterList li:last-child").attr("id", key);
					if(data.rows[i].value[cat][0] === "Name: ") {
						$("#hunterList li:last-child").append('<h3>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</h3>');
					} else {
						$("#hunterList li:last-child").append('<p>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</p>');
					}
				}
				$("#hunterList li:last-child").append('<div><a href="#formPage" data-icon="gear" class="edit" data-role="button" data-theme="a" data-inline="true" data-ajax="false">Edit</a></div>');
				$("#hunterList li:last-child div:last-child a").attr("key", key);
			}
			if(data.rows[i].value.group[1] === "Mage") {
				$("#mageList").append('<li data-role="list-divider"></li>');
				$("#mageList").append('<li data-theme=d></li>');
				for(var n in data.rows[i].value){
					var cat = ""+n+"";
					$("#mageList li:last-child").attr("id", key);
					if(data.rows[i].value[cat][0] === "Name: ") {
						$("#mageList li:last-child").append('<h3>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</h3>');
					} else {
						$("#mageList li:last-child").append('<p>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</p>');
					}
				}
				$("#mageList li:last-child").append('<div><a href="#formPage" data-icon="gear" class="edit" data-role="button" data-theme="a" data-inline="true" data-ajax="false">Edit</a></div>');
				$("#mageList li:last-child div:last-child a").attr("key", key);
			}
			if(data.rows[i].value.group[1] === "Priest") {
				$("#priestList").append('<li data-role="list-divider"></li>');
				$("#priestList").append('<li data-theme=d></li>');
				for(var n in data.rows[i].value){
					var cat = ""+n+"";
					$("#priestList li:last-child").attr("id", key);
					if(data.rows[i].value[cat][0] === "Name: ") {
						$("#priestList li:last-child").append('<h3>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</h3>');
					} else {
						$("#priestList li:last-child").append('<p>' + data.rows[i].value[cat][0] + ' ' + data.rows[i].value[cat][1] + '</p>');
					}
				}
				$("#priestList li:last-child").append('<div><a href="#formPage" data-icon="gear" class="edit" data-role="button" data-theme="a" data-inline="true" data-ajax="false">Edit</a></div>');
				$("#priestList li:last-child div:last-child a").attr("key", key);
			}
		}$('a.edit').bind("click", editButton);// edits an entry
		 
	} 
});

var editButton = function() {
	keyID = $(this).attr("key");
	$.couch.db("adventure2").openDoc(keyID, {
		success: function(data) {
			$('#name').attr('value', data.name[1]);
			$('#age').attr('value', data.age[1]);
			$('#sex').attr('value', data.sex[1]);
			$('#guild').attr('value', data.guild[1]);
			$('#groups').attr('value', data.group[1]);
			$('#date').attr('value', data.date[1]);
			$('#comments').attr('value', data.comments[1]);
			
			$("#submit").attr('key', keyID);
			$('#name').textinput('disable');
			$("#delete").append('<a href="#" data-icon="delete" id="deleteBtn" data-role="button" data-theme="a" data-inline="true" data-ajax="false">Delete</a>');
			$('#deleteBtn').bind("click", deleteButton);// deletes an entry
			$('#deleteBtn').button();
			$('#deleteBtn').button('refresh');
			$("#deleteBtn").attr('key', keyID);
			$('#age').slider('refresh');
			$('#sex').slider('refresh');
			$('#guild').slider('refresh');
			$('#groups').selectmenu('refresh');
		}
	});
};


var deleteButton = function() {
	var ask = confirm("Are you sure you want to delete this adventurer?");
	keyID = $("#deleteBtn").attr("key");
	if(ask) {
		$.couch.db("adventure2").openDoc(keyID, {
			success: function(data) {
				var delData = {};
				delData._id = data._id;
				delData._rev = data._rev;
				$.couch.db("adventure2").removeDoc(delData);
				//alert("Adventurer was deleted!");
				
				$('#name').attr('value', "");
				$('#age').attr('value', 26);
				$('#sex').attr('value', "Male");
				$('#guild').attr('value', "Not in the guild");
				$('#groups').attr('value', "");
				$('#date').val(makeDate());
				$('#comments').attr('value', "");
				
				$("#submit").removeAttr('key');
				$("#delete").html("");
				$('#age').slider('refresh');
				$('#sex').slider('refresh');
				$('#guild').slider('refresh');
				$('#groups').selectmenu('refresh');
				$('#name').textinput('enable');
				
				postListing(data, "delete");
				//$.mobile.changePage("#postPage");
			}
		});
	} else {
		alert("Adventurer was not deleted.");
	}
};
});