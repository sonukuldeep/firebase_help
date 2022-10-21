import {addtoDatabase,addToRealTimeDB, updateRealTimeDB, signUp} from './Assets/firebaseConfig.js'

document.getElementById("myForm").addEventListener("submit", submitForm)
function submitForm(e){
    e.preventDefault()
    let name = e.target.elements.name.value
    let email = e.target.elements.email.value
    let msg = e.target.elements.msg.value

    const data = {"name": name,"email":email,"msg":msg}
    // console.log(data)
    // addtoDatabase(data)
    addToRealTimeDB(data)
    // updateRealTimeDB(data)
  }

document.getElementById("SigninForm").addEventListener("submit", signInForm)
function signInForm(e) {
  e.preventDefault()
  let email = e.target.elements.email.value
  let passwd = e.target.elements.passwd.value
  signUp(email,passwd)
}