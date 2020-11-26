var firebaseConfig = {
    apiKey: "AIzaSyDA6_Q_Gkt5R7kIxANF9jqIosc5z7cjSrY",
    authDomain: "chat-room-2e3fc.firebaseapp.com",
    databaseURL: "https://chat-room-2e3fc.firebaseio.com",
    projectId: "chat-room-2e3fc",
    storageBucket: "chat-room-2e3fc.appspot.com",
    messagingSenderId: "761708758472",
    appId: "1:761708758472:web:0c31e645224e74864b2cfd",
    measurementId: "G-8JEVL651VS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var sessionID = "";
var name = "";