function addClass(t,e){t.classList.add(e)}function removeClass(t,e){t.classList.remove(e)}function getStyles(t,e){var n=getComputedStyle(t)[e];return+n.substr(0,n.length-2)}function removeElement(t){t.parentNode.removeChild(t)}function isEmptyObject(t){for(key in t)if(t.hasOwnProperty(key))return!1;return!0}var EventHandler={on:function(t,e){document.addEventListener(t.action,function(n){for(var a=n.target;a!=document;){if(a.getAttribute(t.attr))return void e.call(this,n,a,t.attr);a=a.parentNode}},!1)}},Ajax={getXHR:function(){var t;try{t=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{t=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){t=!1}}return t||"undefined"==typeof XMLHttpRequest||(t=new XMLHttpRequest),t},post:function(t,e,n){var a=this.getXHR(),e=JSON.stringify(e);a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/json;charset=UTF-8"),a.send(e),a.onreadystatechange=function(){4==a.readyState&&200==a.status&&n.call(a.responseText)}},get:function(t,e){var n=this.getXHR();n.open("GET",options.url,!0),n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(null),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e.call(n.responseText)}},page:function(t,e){var n=this.getXHR();globalMenuIsActive=!1,n.open("GET","pages/"+t+".html",!0),n.send(null),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e.call(n.responseText)}}};
var config={apiKey:"AIzaSyBQ3bsbfog8AvGiPLKMqD5EP6ozdDe8X3U",authDomain:"geolocateme-74c18.firebaseapp.com",databaseURL:"https://geolocateme-74c18.firebaseio.com",storageBucket:"geolocateme-74c18.appspot.com",messagingSenderId:"376854950200"};firebase.initializeApp(config);var Rest={authenticate:function(e){firebase.auth().signInWithEmailAndPassword(e.email,e.password).catch(Rest.authenticationErrorHandler)},authenticationErrorHandler:function(e){switch(e.code){case"auth/user-not-found":alert("This user is not registered!");break;case"auth/wrong-password":alert("Invalid password!")}},useToken:function(){firebase.auth().onAuthStateChanged(function(e){e?Ajax.page("profile",function(){globalWrapper.innerHTML=this}):Ajax.page("login",function(){globalWrapper.innerHTML=this})})},getUser:function(){return firebase.auth().currentUser},signOut:function(e){firebase.auth().signOut().then(function(){e.call()}).catch(function(e){console.log(e)})},createNewUser:function(e,a){firebase.auth().createUserWithEmailAndPassword(e.email,e.password).catch(function(e){var t=e.code,n=e.message;console.log(t+" :: "+n),a.call()})}};
var Account={login:function(){var e=Account.getLoginValues();""!==e.email.trim()&&""!==e.password.trim()?Rest.authenticate(e):alert("Please, fill all fields.")},registration:function(){var e=Account.getRegistrationValues();Account.validateTextFields(e)&&(Account.emailValidation(e.email)?Account.passwordValidation(e.password)&&Account.passwordsEquals(e)?Rest.createNewUser(e,function(){Ajax.page("login",function(){globalWrapper.innerHTML=this})}):alert("Incorrect password. \n Assert a string has at least one number\nAssert a string has at least one special character\n Length: 8-30"):alert("Enter correct email!"))},getRegistrationValues:function(){return{firstName:document.getElementById("REGISTRATION_fname").value,lastName:document.getElementById("REGISTRATION_lname").value,email:document.getElementById("REGISTRATION_email").value,password:document.getElementById("REGISTRATION_password").value,repeatPassword:document.getElementById("REGISTRATION_password_r").value}},getLoginValues:function(){return{email:document.getElementById("LOGIN_email").value,password:document.getElementById("LOGIN_password").value}},validateTextFields:function(e){for(var t in e)if(""==e[t].replace(/\s/g,""))return alert("Please, fill all fields."),!1;return!0},emailValidation:function(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},passwordValidation:function(e){return/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(e)},passwordsEquals:function(e){return e.password.trim()===e.repeatPassword.trim()},signOut:function(){Rest.signOut(function(){Ajax.page("login",function(){var e=document.getElementById("menu");removeClass(e,"show"),addClass(e,"hide"),e.style.left="-81vw",globalMenuIsActive=!1,globalWrapper.innerHTML=this})})}};
EventHandler.on({action:"click",attr:"data-load-page"},function(t,n,a){var e=n.getAttribute(a);document.getElementById("mapScript");Ajax.page(n.getAttribute(a),function(){globalMenuIsActive||(removeClass(menu,"show"),addClass(menu,"hide"),menu.style.left="-81vw",globalMenuIsActive=!1),globalWrapper.innerHTML=this,"map"==e&&initMap()})}),EventHandler.on({action:"click",attr:"data-login"},Account.login),EventHandler.on({action:"click",attr:"data-registration"},Account.registration),EventHandler.on({action:"click",attr:"data-logout"},Account.signOut),EventHandler.on({action:"click",attr:"data-get-position"},getUserPosition),EventHandler.on({action:"click",attr:"data-route"},function(t,n,a){setRoute(t,n,a),Friends.toggle()}),EventHandler.on({action:"click",attr:"data-friends"},function(){Friends.toggle(),dataChannel.send("Hello World!")});
function initMap(){directionsService=new google.maps.DirectionsService,directionsDisplay=new google.maps.DirectionsRenderer,map=new google.maps.Map(document.getElementById("map"),{center:{lat:49.840197,lng:24.02837},zoom:12,gestureHandling:"cooperative",draggable:!0,mapTypeControlOptions:{mapTypeIds:[]},streetViewControl:!1}),bounds=new google.maps.LatLngBounds,directionsDisplay.setMap(map)}function getCoordinates(o){var e=navigator.geolocation;e?e.getCurrentPosition(function(e){o.call(e)},function(){alert("Error: The Geolocation service failed.")}):alert("Error: Your browser doesn't support geolocation.")}function setRoute(o,e,t){getCoordinates(function(){var o=this;drawRoute({x:o.coords.latitude,y:o.coords.longitude},{x:49.817048,y:24.033152})})}function getUserPosition(){getCoordinates(function(){var o=this,e={lat:o.coords.latitude,lng:o.coords.longitude},t=setMarkerOnMap(e,"Your location","origin"),n=new google.maps.LatLng(t.lat,t.lng);bounds.extend(n),map.fitBounds(bounds),map.setZoom(17)})}function setMarkerOnMap(o,e,t){void 0!==routePoints[t]&&routePoints[t].setMap(null);var n=new google.maps.Marker({position:o,map:map,title:e});return routePoints[t]=n,markerCoordinates[t]={lat:n.getPosition().lat(),lng:n.getPosition().lng()},markerCoordinates[t]}function drawRoute(o,e){var o=new google.maps.LatLng(o.x,o.y),e=new google.maps.LatLng(e.x,e.y),t={origin:o,destination:e,travelMode:google.maps.TravelMode.WALKING};directionsService.route(t,function(t,n){n==google.maps.DirectionsStatus.OK?(directionsDisplay.setMap(null),directionsDisplay.setDirections(t),directionsDisplay.setMap(map)):alert("Directions Request from "+o.toUrlValue(6)+" to "+e.toUrlValue(6)+" failed: "+n)})}var map,bounds,routePoints={},markerCoordinates={},directionsService,directionsDisplay;
var globalMenuIsActive=!1,CURRENT_USER_ID=1,globalWrapper=document.getElementById("wrapper");window.addEventListener("load",Rest.useToken(),!1),document.addEventListener("click",function(e){for(var t=e.target,n=document.getElementById("menu");t!=document;){if(t.getAttribute("data-toggle-menu")||t==n&&globalMenuIsActive)return removeClass(n,"hide"),addClass(n,"show"),n.style.left=0,void(globalMenuIsActive=!0);t=t.parentNode}globalMenuIsActive&&(removeClass(n,"show"),addClass(n,"hide"),n.style.left="-81vw",globalMenuIsActive=!1)},!1);var Friends={active:!1,toggle:function(){document.getElementById("friends");Friends.active?(friends.style.display="none",Friends.active=!1):(friends.style.display="block",Friends.active=!0)}};