var json = {};
function createGroup(){
	var params ={
		//name, Data, etc.
	};
	var myID = document.getElementById("myID_create").value;			
	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myID,
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "PUT",
		data:'{"name":"myGroup", "userData":"first try"}',
	})
	.done(function(data){
		// alert("success");
		$("#createdGroup").val(myID + "\nGroup Created");

	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function createPerson(){
	var params ={
		//name, Data, etc.
	};
	var myName = document.getElementById("newPName").value;
	var myUserData = document.getElementById("newPUserData").value;
	var myGroupID = document.getElementById("myGroupID").value;

	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myGroupID +"/persons",
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "POST",
		data:'{"name": "'+ myName + '", "userData":"' + myUserData + '"}',
	})
	.done(function(data){
		// alert("success");
		$("#createdPeople").val(JSON.stringify(data, null, 2));

	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function addFace(){
	var params ={
		//name, Data, etc.
	};
	var myPeopleID = document.getElementById("add_face_PID").value;
	var myGroupID = document.getElementById("add_face_GID").value;
	var myURL = document.getElementById("add_face_URL").value;

	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myGroupID +"/persons/" + myPeopleID + "/persistedFaces",
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "POST",
		data: '{"url": "' + myURL +'"}',
	})
	.done(function(data){
		// alert("success");
		$("#addedFace").val(JSON.stringify(data));
	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function trainGroup(){
	var params ={
		//name, Data, etc.
	};
	var myID = document.getElementById("train_GID").value;			
	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myID +"/train",
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "POST",
	})
	.done(function(data){
		// alert("success");
		$("#trainedGroup").val("Trained Success");

	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function detect_Face(myURL,cb){
	json.face = [];
	var params ={
		"returnFaceId": "true",
    	"returnFaceLandmarks": "false",
    	"returnFaceAttributes": "age,gender",
	};
	myURL = (typeof myURL !== 'undefined') ? myURL : document.getElementById("detect_URL").value;
	$.ajax({
		url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "POST",
		data: '{"url": "' + myURL +'"}',
	})
	.done(function(data){
		// alert("success");
		json.face.push(JSON.stringify(data, null,2));
		$("#detectedFace").val(json.face);
		cb(data[0].faceId);
	})
	.error(function(data){
		alert("fail\n" + $.message);
	})
}
function identify_Face(myFaceID, myGroupID,cb){
	var params ={
	};
	myGroupID = (typeof myGroupID !== 'undefined') ? myGroupID : document.getElementById("identify_GID").value;
	myFaceID = (typeof myFaceID !== 'undefined') ? myFaceID : document.getElementById("identify_FID").value;
	var numCandidates = 1;
	var conLevel = 0.5;
	$.ajax({
		url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "POST",
		data: '{"personGroupId": "' + myGroupID +'", "faceIDs" :["'+ myFaceID + '"], "maxNumOfCandidatesReturned" : ' + numCandidates + ', "confidenceThreshold" : '+ conLevel +'}',
	})
	.done(function(data){
		// alert("success");
		$("#identifiedFace").val(JSON.stringify(data, null,2));
		cb(data[0].candidates[0].personId);
		//alert(data[0].candidates[0].personId);
	})
	.error(function(data){
		alert("fail\n" + $.message);
	})
}
function getPerson(myPeopleID, myGroupID,cb){
	var params ={
		//name, Data, etc.
	};
	myPeopleID = (typeof myPeopleID !== 'undefined') ? myPeopleID : document.getElementById("getPID").value;
	myGroupID = (typeof myGroupID !== 'undefined') ? myGroupID : document.getElementById("getGroupID").value;

	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myGroupID +"/persons/" + myPeopleID,
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "GET",
	})
	.done(function(data){
		// alert("success");
		$("#getPeople").val(JSON.stringify(data, null, 2));
		cb(data);
	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function delFace(){
	var params ={
		//name, Data, etc.
	};
	var myPeopleID = document.getElementById("del_face_PID").value;
	var myGroupID = document.getElementById("del_face_GID").value;
	var myFaceID = document.getElementById("del_face_ID").value;

	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myGroupID +"/persons/" + myPeopleID + "/persistedFaces/" + myFaceID,
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "DELETE",
	})
	.done(function(data){
		// alert("success");
		$("#deletedFace").val("Face Deleted");
	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function deletePerson(){
	var params ={
		//name, Data, etc.
	};
	var myPeopleID = document.getElementById("delPID").value;
	var myGroupID = document.getElementById("delGroupID").value;

	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myGroupID +"/persons/" + myPeopleID,
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "DELETE",
	})
	.done(function(data){
		// alert("success");
		$("#deletedPeople").val("People Deleted");
	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function deleteGroup(){
	var params ={
		//name, Data, etc.
	};
	var myID = document.getElementById("myID_delete").value;			
	$.ajax({
		url : "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + myID,
		beforeSend: function(obj){
			obj.setRequestHeader("Content-Type", "application/json");
        	obj.setRequestHeader("Ocp-Apim-Subscription-Key","******Face key input******");
		},
		type: "DELETE",
	})
	.done(function(data){
		// alert("success");
		$("#deletedGroup").val(myID + "\nGroup Deleted");
	})
	.error(function(){
		alert("fail\n" + $.message);
	})
}
function myAI(myURL, myGroup){
	myURL = (typeof myURL !== 'undefined') ? myURL : document.getElementById("myAI_URL").value;
	detect_Face(myURL, function(x){
		myGroup = (typeof myGroup !== 'undefined') ? myGroup : document.getElementById("myAI_Group").value;
		identify_Face(x, myGroup, function(y){
			getPerson(y, myGroup, function(z){
				//alert(z.name);
				document.getElementById("outcome_AI").value += "Name: " + z.name + "\nData:" + z.userData + "\n";
			});
		})
	});

}

