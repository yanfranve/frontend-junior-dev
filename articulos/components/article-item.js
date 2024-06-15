class ArticleItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data({ article, author }) {
        this.render(article, author);
    }

    render(article, author) {
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: transform 0.2s;
                    cursor: pointer;
                }
                .card:hover {
                    transform: scale(1.05);
                }
                .image {
                    height: 200px;
                    background-size: cover;
                    background-position: center;
                }
                .content {
                    padding: 16px;
                }
                .title {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .author {
                    color: #1e90ff;
                    cursor: pointer;
                }
            </style>
            <div class="card">
                <div class="image" style="background-image: url('${article.image}')"></div>
                <div class="content">
                    <div class="title">${article.title}</div>
                    <div class="author">${author.name}</div>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.card').addEventListener('click', () => {
            window.location.href = `details.html?articleId=${article.id}`;
        });
    }
}

customElements.define('article-item', ArticleItem);
