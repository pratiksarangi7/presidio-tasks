let page = 1;
let isFetching = false;

async function getMoreContent() {
    if (isFetching) return;

    isFetching = true;
    document.getElementById('loader').style.display = 'block';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
        const data = await response.json();
        renderContent(data);
        page++;
    } catch (error) {
        console.error("Error loading content:", error);
    } finally {
        isFetching = false;
        document.getElementById('loader').style.display = 'none';
    }
}

function renderContent(posts) {
    const contentContainer = document.getElementById('content-container');
    posts.forEach(post => {
        console.log(post);
        const postCard = document.createElement('div');
        postCard.innerHTML = `<h1>${post.title}</h1><p>${post.body}</p>`
        contentContainer.appendChild(postCard);
    });
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        getMoreContent();
    }
})

getMoreContent();