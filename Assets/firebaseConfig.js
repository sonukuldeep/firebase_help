require("dotenv").config()

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js'
import { getFirestore, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc, deleteField } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js"
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
const rdb = getDatabase() //"app" may or maynot be passed as parameter
const id = 2
const dataRef = ref(rdb, 'myData/' + id)


// SIGNIN SIGNUP AND SIGNIN STATUS
//signup
export async function signUp(email, passwd) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, passwd)
        console.log("signed up & logged in as ", userCredentials.user)
    } catch (error) {
        console.error("could not sign up ", error)
    }
}

//logout
export async function logout(){
    try {
        await signOut(auth)
        console.log("logged in successfully")
    } catch (error) {
        console.error("could not logout ", error)
    }
}

//login
export async function logIn(email,passwd){
    try {
        await signInWithEmailAndPassword(auth, email, passwd)
        console.log("successfully logged in")
        
    } catch (error) {
        console.error("could not login ",error)
    }
}

// check authentiucation status(runs on every render so caution while using on react)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("login successful")
    } else {
        console.log("log out successful")
    }
})

// X-X-X-X-X-X-X
// REALTIME DATABASE
//add data to RDB
export async function addToRealTimeDB(data) {
    try {
        await set(dataRef, data) //pass null as data to delete node or use delete(dataRef)
        console.log("added to RDB")
    } catch (error) {
        console.error(error)
    }
}

// update RDB
export async function updateRealTimeDB(data) {

    try {
        await update(dataRef, data) //pass null as data to delete node or use delete(dataRef)
        console.log("added to RDB")
    } catch (error) {
        console.error(error)
    }
}

// delete data
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#updating_or_deleting_data

//autometically read data from RDB when change occurs(advisable to listen child nodes instead of parents)
onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    console.log("data change in RDB ", data)
})
// ref(rdb, path to data that you wish to get updates from)
// const customDataWithInDataTree = ref(rdb, 'myData/' + id + '/starCount'...);
// onValue(customDataWithInDataTree, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data)
// })

// detach listener with "off()" method
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#detach_listeners

// read data once
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// server side increment to prevent data overlap
// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#atomic_server-side_increments


// X-X-X-X-X-X-X
// CLOUD STORAGE
//add data to cloud database with random id
export async function addtoDatabaseWithRandomId(data) {
    try {
        const dataRef = collection(db, "myData")
        const docRef = await addDoc(dataRef, data)
        console.log(data, " added to database with id ", docRef.id)
    } catch (error) {
        console.error("Encountered an error ",error)
    }
}

//add data to cloud database with random id
export async function addtoDatabase(data, id) {
    try {
        const dataRef = doc(db, "myData", id)
        await setDoc(dataRef, data, {merge: true})  //merge true to overright data at id
        console.log(data, " added to database with id ", id)
    } catch (error) {
        console.error("Encountered an error ",error)
    }
}

// read full collection
export async function readFromDatabase(){
    try {
        const dataRef = collection(db, "myData")
        const snapshot = await getDocs(dataRef)
        snapshot.forEach(doc=>{console.log(doc.id, doc.data())})
    } catch (error) {
        console.error("error encounted while reading ", error)
    }
}

//update Node
export async function updateId(data, idToUpdate){
    try {
        const userDoc = doc(db,"myData", idToUpdate)
        await updateDoc(userDoc, data)
        console.log(idToUpdate," successfully updated")
        
    } catch (error) {
        console.error("Error encounted while update", error)
    }
}

//delete Node
export async function deleteId(idToDelete){
    try {
        const userDoc = doc(db,"myData", idToDelete)
        await deleteDoc(userDoc)
        console.log(idToDelete," successfully deleted")
        
    } catch (error) {
        console.error("Error encounted ", error)
    }
}

//delete field
export async function deleteField(idOfField){
    try {
        const userDoc = doc(db,"myData", idOfField)
        const fieldToDelete = {"nameOfFieldHere" : deleteField()}
        await updateDoc(userDoc, fieldToDelete)  //update is not typo here
        console.log(idOfField," successfully updated")
        
    } catch (error) {
        console.error("Error encounted ", error)
    }
}

//delete Document
export async function deleteDocument(idOfDocument){
    try {
        const userDoc = doc(db,"myData", idOfDocument)
        await deleteDoc(userDoc)
        console.log(idOfDocument," successfully updated")
        
    } catch (error) {
        console.error("Error encounted ", error)
    }
}

// custom datatypes supported 
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0#data_types

// server timestamp can be used to create server timestamp on server
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0#server_timestamp

//complex datatype
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0#update_elements_in_an_array

//increment decrement operation within server
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0#increment_a_numeric_value