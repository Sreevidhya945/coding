//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyC6ISIsOs1a0Yh1ABM781P4dIYPk_OTwsU",
      authDomain: "kwitter-project-2c8dd.firebaseapp.com",
      databaseURL: "https://kwitter-project-2c8dd-default-rtdb.firebaseio.com",
      projectId: "kwitter-project-2c8dd",
      storageBucket: "kwitter-project-2c8dd.appspot.com",
      messagingSenderId: "990092996774",
      appId: "1:990092996774:web:bd0ddccc68ecbb92d8c467"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name=localStorage.getitem("user_name");
room_name=localStorage.getItem("room_name");

function send() {
msg=document.getElementById("msg").value;
firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
});
document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
namr=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'>"; 
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"; 
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; 
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
row= name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();


function updateLike(message_id){
      console.log("clicked on like button - "+ messade_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);

      fierbase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}