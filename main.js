let db = firebase.database();

let event = db.ref("event/").on("value", (snap) => {
  return snap.val();
});

window.requestAnimationFrame(callModal);

function callModal() {
  if (!checkStudent())
  {
    $("#detailModal").modal({
      backdrop: "static",
      keyboard: false
    });
    
    window.requestAnimationFrame(callModal);
  }
}

$("#detailModal").on("hide.bs.modal", (evt) => {
  window.localStorage.setItem("name", document.getElementById("full-name").value);
  window.localStorage.setItem("matric", document.getElementById("matric-no").value);
  window.localStorage.setItem("email", document.getElementById("email").value);
});

$("#detailModal").on("show.bs.modal", (evt) => {
  document.getElementById("full-name").value = window.localStorage.getItem("name");
  document.getElementById("matric-no").value = window.localStorage.getItem("matric");
  document.getElementById("email").value = window.localStorage.getItem("email");
});

function checkStudent() {
  let student = window.localStorage.matric && window.localStorage.name && window.localStorage.email;
  
  if (!student) {
    alert("Warning: Please enter all details");
  }
  
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