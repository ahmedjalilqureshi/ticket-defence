import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAOCtHy01QPqMuh-uajNd6OQOxm8WAGIwA",
  authDomain: "ticketdefense-e9c29.firebaseapp.com",
  databaseURL: "https://ticketdefense-e9c29-default-rtdb.firebaseio.com",
  projectId: "ticketdefense-e9c29",
  storageBucket: "ticketdefense-e9c29.appspot.com",
  messagingSenderId: "775296187799",
  appId: "1:775296187799:web:7d535a32df48548f2f98d2",
};
// var firebaseConfig = {
//   apiKey: "AIzaSyAKIQVxbNhqktNWCccEMlDcv5sr75fuHJo",
//   authDomain: "ticket-defence.firebaseapp.com",
//   databaseURL: "https://ticket-defence-default-rtdb.firebaseio.com/",
//   projectId: "ticket-defence",
//   storageBucket: "ticket-defence.appspot.com",
//   messagingSenderId: "485765165563",
//   appId: "1:485765165563:android:69a591982d5884d82b5b5e",
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
