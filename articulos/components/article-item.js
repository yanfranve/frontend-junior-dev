class ArticleItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(article) {
        this.article = article;
        this.render();
    }

    get data() {
        return this.article;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border-radius: 0.5rem;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    background: white;
                    transition: transform 0.2s;
                    cursor: pointer;
                }
                .card:hover {
                    transform: scale(1.02);
                }
                .image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .content {
                    padding: 1rem;
                }
                .title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                .description {
                    color: gray;
                    font-size: 0.875rem;
                    margin-bottom: 1rem;
                }
                .company {
                    font-size: 0.875rem;
                    color: #2b6cb0;
                }
            </style>
            <div class="card" id="card">
                <img class="image" src="${this.article.image}" alt="${this.article.title}">
                <div class="content">
                    <div class="title">${this.article.title}</div>
                    <div class="description">${this.article.description}</div>
                    <div class="company">${this.article.company}</div>
                </div>
            </div>
        `;

        // Add event listener for click event
        this.shadowRoot.getElementById('card').addEventListener('click', () => {
            window.location.href = `details.html?articleId=${this.article.id}`;
        });
    }
}

customElements.define('article-item', ArticleItem);
