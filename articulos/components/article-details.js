class ArticleDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set article(article) {
        this._article = article;
        this.render();
    }

    get article() {
        return this._article;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .details {
                    background: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .title {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
                .content {
                    margin-bottom: 1rem;
                }
                .author {
                    color: #2b6cb0;
                    cursor: pointer;
                }
            </style>
            <div class="details">
                <h2 class="title">${this._article.title}</h2>
                <img src="${this._article.image}" alt="${this._article.title}" class="mb-4">
                <div class="content">${this._article.content}</div>
                <div>
                    Published by <span class="author" id="author">${this._article.authorName}</span>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('author').addEventListener('click', () => {
            window.location.href = `author-details.html?authorId=${this._article.author}`;
        });
    }
}

customElements.define('article-details', ArticleDetails);
