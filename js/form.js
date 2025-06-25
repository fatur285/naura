document.getElementById("balasanForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      window.location.href = "form.html";
    } else {
      alert("Gagal mengirim pesan.");
    }
  });
});
