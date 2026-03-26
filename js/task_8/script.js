const routes = {
    "#home": "<h1>HOME PAGE</h1>",
    "#about": "<h1>This is a single page application</h1>",
    "#contact": "<h1>contact on sarangipratik7@gmail.com</h1>"
}

function router() {
    const app = document.getElementById('app');
    const currHash = window.location.hash || "#home";
    app.innerHTML = routes[currHash] || "<h2>ERROR 404!. NOT FOUND</h2>";
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);