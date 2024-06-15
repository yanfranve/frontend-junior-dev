document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('articleId');

    if (!articleId) {
        document.getElementById('articleDetails').innerText = 'Article ID is missing!';
        return;
    }

    try {
        const articleResponse = await fetch(`https://5fb46367e473ab0016a1654d.mockapi.io/articles/${articleId}`);
        const article = await articleResponse.json();
        
        const authorResponse = await fetch(`https://5fb46367e473ab0016a1654d.mockapi.io/users/${article.author}`);
        const author = await authorResponse.json();
        
        displayArticleDetails(article, author);
    } catch (error) {
        console.error('Error fetching article details:', error);
        document.getElementById('articleDetails').innerText = 'Failed to load article details.';
    }
});

function displayArticleDetails(article, author) {
    document.getElementById('articleDetails').innerHTML = `
        <h1 class="text-3xl font-bold mb-4">${article.title}</h1>
        <img src="${article.image}" alt="${article.title}" class="w-full h-auto mb-4">
        <p class="text-gray-700 mb-4">${article.content}</p>
        <p class="text-gray-500">Published by: 
            <span class="text-blue-500 cursor-pointer" id="authorName">${author.name}</span>
        </p>
    `;

    document.getElementById('authorName').addEventListener('click', () => {
        window.location.href = `author-details.html?authorId=${author.id}`;
    });
}
