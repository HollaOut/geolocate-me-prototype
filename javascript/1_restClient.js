var config = {
  apiKey: "AIzaSyBQ3bsbfog8AvGiPLKMqD5EP6ozdDe8X3U",
  authDomain: "geolocateme-74c18.firebaseapp.com",
  databaseURL: "https://geolocateme-74c18.firebaseio.com",
  storageBucket: "geolocateme-74c18.appspot.com",
  messagingSenderId: "376854950200"
};
firebase.initializeApp(config);

var Rest = {
  authenticate: function(fields){
    firebase.auth()
      .signInWithEmailAndPassword(fields.email, fields.password)
      .catch(Rest.authenticationErrorHandler);
  },
  authenticationErrorHandler: function(error){
    switch(error.code){
      case 'auth/user-not-found':
        alert('This user is not registered!');
        break;
      case 'auth/wrong-password':
        alert('Invalid password!');
        break;
    }
  },
  useToken: function(){
    firebase.auth()
      .onAuthStateChanged(function(user) {
        if (user) {
          Ajax.page('profile', function(){
            globalWrapper.innerHTML = this;
          });
        } else {
          Ajax.page('login', function(){
            globalWrapper.innerHTML = this;
          });
        }
      });
  },
  getUser: function(){
    return firebase.auth().currentUser;
  },
  signOut: function(callback){
    firebase.auth()
      .signOut()
      .then(function() {
        callback.call();
      }).catch(function(error) {
        console.log(error);
    });
  },
  createNewUser: function(obj, callback){
    firebase.auth()
      .createUserWithEmailAndPassword(obj.email, obj.password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode + ' :: ' + errorMessage);
        callback.call();
      });
  }
};
