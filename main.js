let db = firebase.database();
let event = null;

db.ref().child("event").on("value", (snap) => {
  event = snap.val();
  
  if (event.active == true)
    document.getElementById("join-btn").classList.remove("disabled");
  else
    document.getElementById("join-btn").classList.add("disabled");
});

callModal();

function callModal() {
  if (!checkStudent())
  {
    $("#detailModal").modal({
      backdrop: "static",
      keyboard: false
    });
  }
}

$("#detailModal").on("hide.bs.modal", (evt) => {
  window.localStorage.setItem("name", document.getElementById("full-name").value);
  window.localStorage.setItem("matric", document.getElementById("matric-no").value);
  window.localStorage.setItem("email", document.getElementById("email").value);
});

$("#detailModal").on("hidden.bs.modal", (evt) => {
    callModal();
});

$("#detailModal").on("show.bs.modal", (evt) => {
  document.getElementById("full-name").value = window.localStorage.getItem("name");
  document.getElementById("matric-no").value = window.localStorage.getItem("matric");
  document.getElementById("email").value = window.localStorage.getItem("email");
});

function checkStudent() {
  let student = window.localStorage.matric && window.localStorage.name && window.localStorage.email;
  
  return student;
}

function redirect() {
  if (checkStudent()) {
    let userData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      timestamp: new Date().toUTCString()
    }
    
    db.ref("attendance/" + window.localStorage.getItem("matric")).update(userData);
    window.location.href = event.url;
  }
}