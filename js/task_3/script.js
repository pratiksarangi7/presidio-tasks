const modal = document.getElementById("modal")

function openModal(url) {
    modal.style.visibility = "visible";
    var img = document.createElement('img');
    img.src = url;
    modal.appendChild(img);
}

function closeModal() {
    const image = modal.querySelector("img");
    modal.removeChild(image);
    modal.style.visibility = "hidden";
}