fetch("./../../assets/images/svg.html")
    .then((response) => response.text())
    .then((data) => (document.querySelector(".svg").innerHTML = data));
