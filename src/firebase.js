import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAFje7j9HI1_H15QGMNT_aSxhZBKKucZi4",
    authDomain: "reva-health-admin.firebaseapp.com",
    projectId: "reva-health-admin",
    storageBucket: "reva-health-admin.appspot.com",
    messagingSenderId: "972760604938",
    appId: "1:972760604938:web:08841594110c60c2649af3"
})

export const auth = app.auth()
export default app