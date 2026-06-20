console.log("index.js loaded")

const input = document.querySelector(".img-input");

input.addEventListener("change", async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    console.log(data);
});