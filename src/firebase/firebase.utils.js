import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
  databaseURL: process.env.REACT_APP_databaseURL,
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};
console.log(config);
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCCypOLupsEa-ornSTH6LQzhUJQGh5iFOI",
//   authDomain: "test-50de2.firebaseapp.com",
//   projectId: "test-50de2",
//   storageBucket: "test-50de2.appspot.com",
//   messagingSenderId: "42680808603",
//   appId: "1:42680808603:web:38b3428c7b02d80d37c23e",
//   measurementId: "G-KMX0VLDLD0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const levelRef = userRef.collection('level');
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    let hint=[false,false,false,false,false,false];
    let showAnswer=[false,false,false,false,false,false];
    let submitAnswer=[false,false,false,false,false,false];
    const score=0;
    
    let finalStory='';
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        score,
        hint,
        showAnswer,
        submitAnswer,
        finalStory,
        ...additionalData
      });
      await levelRef.doc("level1").set({
        score,
        hint,
        showAnswer,
        submitAnswer,
      })
      await levelRef.doc("level2").set({
        score,
        hint,
        showAnswer,
        submitAnswer,
      })
      await levelRef.doc("level3").set({
        score,
        hint,
        showAnswer,
        submitAnswer,
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return {userRef,levelRef};
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);



export default firebase;
