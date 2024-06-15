class ArticleList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('https://5fb46367e473ab0016a1654d.mockapi.io/articles');
            const articles = await response.json();
            this.render(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    render(articles) {
        this.shadowRoot.innerHTML = `
            <style>
                .list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
            </style>
            <div class="list">
                ${articles.map(article => `
                    <article-card
                        title="${article.title}"
                        image="${article.image}"
                        company="${article.company}"
                        description="${article.description}"
                        content="${article.content}"
                        author="${article.author}"
                        article-id="${article.id}"
                    ></article-card>
                `).join('')}
            </div>
        `;
    }
}

customElements.define('article-list', ArticleList);
