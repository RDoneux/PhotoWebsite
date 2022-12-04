function testing() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const privilages = document.getElementById("privilages").value.split(":");
  const title = document.getElementById("title").value;
  const expiresIn = document.getElementById("expiry").value;

  fetch("http://localhost:3000/issue-token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      privilages: privilages,
      expiresIn: expiresIn,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      document.getElementById("output").textContent = response.data;
    });
}
