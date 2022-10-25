import { addToRealTimeDB, readDataOnce, updateRealTimeDB, deleteNodeRealTimeDB, addtoDatabaseWithRandomId,readFromDatabase,readPerticularIDFromDB, updateId, signUp, logIn, logout} from './Assets/firebaseConfig.js'

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

//ReadDataOnce
document.getElementById("RTDBFormRead").addEventListener("submit", readData_Once)
function readData_Once(e){
  e.preventDefault()
  readDataOnce()
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

//RTDBDelete
document.getElementById("RTDBFormDelete").addEventListener("submit", RTDBDeleteNode)
function RTDBDeleteNode(e) {
  e.preventDefault()
  deleteNodeRealTimeDB()
}

//CDB Add
document.getElementById("CDBFormAdd").addEventListener("submit", CloudDBAdd)
function CloudDBAdd(e) {
  e.preventDefault()
  const name = e.target.elements.name.value
  const msg = e.target.elements.msg.value
  const data = {"name": name, "msg": msg}
  addtoDatabaseWithRandomId(data)
}

//Read CDB
document.getElementById("CDBFormRead").addEventListener("submit", readCDB)
function readCDB(e){
  e.preventDefault()
  readPerticularIDFromDB()
}

//CDB update
document.getElementById("CDBFormUpdate").addEventListener("submit", CloudDBUpdate)
function CloudDBUpdate(e) {
  e.preventDefault()
  const name = e.target.elements.name.value
  const msg = e.target.elements.msg.value
  const data = {"name": name, "msg": msg}
  updateId(data)
}

//Delete CDB node
document.getElementById("CDBFormDelete").addEventListener("submit", CloudDBDelete)
function CloudDBDelete(e) {
  e.preventDefault()
  updateId(data)
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
