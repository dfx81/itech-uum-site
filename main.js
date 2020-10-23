let db = firebase.database();

if (!window.localStorage.getItem("visited")) {
  $("#detailModal").modal("show")
}

$("#detailModal").on("hide.bs.modal", (evt) => {
  window.localStorage.setItem("visited", "true");
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
  let student = window.localStorage.matric;
  if (!student) {
    alert("Warning: No matric number entered. No merit points will be given");
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
  }
  
  window.location.href = "https://meetingsapac14.webex.com/meet/nizam.yuseri";
}