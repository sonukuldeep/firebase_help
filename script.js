import {addtoDatabase,addToRealTimeDB, updateRealTimeDB, signUp, logIn, logout} from './Assets/firebaseConfig.js'

//signup signin and logout
document.getElementById("SignUpForm").addEventListener("submit", signUp_Form)
function signUp_Form(e) {
  e.preventDefault()
  let email = e.target.elements.email.value
  let passwd = e.target.elements.passwd.value
  signUp(email,passwd)
}

document.getElementById("SigninForm").addEventListener("submit", signoutForm)
function signoutForm(e) {
  e.preventDefault()
  let email = e.target.elements.email.value
  let passwd = e.target.elements.passwd.value
  logIn(email,passwd)
}

document.getElementById("signout-btn-1").addEventListener("click", ()=>{logout()})
document.getElementById("signout-btn-2").addEventListener("click", ()=>{logout()})
//xxxx

//RTDBAdd
document.getElementById("RTDBFormAdd").addEventListener("submit", RTDBAdd)
function RTDBAdd(e) {
  e.preventDefault()
  const name = e.target.elements.name.value
  const msg = e.target.elements.msg.value
  const data = {"name": name, "msg": msg}
  addToRealTimeDB(data)
}

//RTDBupdate
document.getElementById("RTDBFormUpdate").addEventListener("submit", RTDBUpdate)
function RTDBUpdate(e) {
  e.preventDefault()
  const name = e.target.elements.name.value
  const msg = e.target.elements.msg.value
  const data = {"name": name, "msg": msg}
  updateRealTimeDB(data)
}

//RTDBupdate
document.getElementById("RTDBFormDelete").addEventListener("submit", RTDBDeleteNode)
function RTDBDeleteNode(e) {
  e.preventDefault()
  updateRealTimeDB(null)
}

const lis = document.querySelectorAll('.trigger')
const forms = ["SignUpForm", "SigninForm", "RTDBFormAdd", "RTDBFormRead", "RTDBFormUpdate", "RTDBFormDelete", "CDBFormAdd", "CDBFormRead", "CDBFormUpdate", "CDBFormDelete"]
lis.forEach((li, index)=>{li.addEventListener("click", ()=>{invokeComponent(forms[index])})})

function invokeComponent(id) {
  let count = 0
  while(count < 10)
  {
    const form = document.getElementById(forms[count])
    form.style.display = "none"
    count +=1
  }
  const form = document.getElementById(id)
  form.style.display = 'flex'
}
