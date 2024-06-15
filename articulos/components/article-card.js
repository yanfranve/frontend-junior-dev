class ArticleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'image', 'company', 'description', 'content', 'author', 'article-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    navigateToArticleDetails(articleId) {
        window.location.href = `details.html?articleId=${articleId}`;
    }

    navigateToAuthorDetails(authorId) {
        window.location.href = `author-details.html?authorId=${authorId}`;
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                .article-card {
                    border: 1px solid #ccc;
                    padding: 16px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .article-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 8px;
                }
                .article-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-bottom: 8px;
                }
                .article-content {
                    display: none; /* Ocultar inicialmente el contenido */
                    margin-top: 16px;
                }
                .author-link {
                    color: blue;
                    cursor: pointer;
                    text-decoration: underline;
                }
            </style>
            <div class="article-card">
                <div class="article-header">
                    <div class="article-title">${this.getAttribute('title')}</div>
                    <img class="article-image" src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}">
                    <p class="article-company">${this.getAttribute('company')}</p>
                    <p class="article-description">${this.getAttribute('description')}</p>
                </div>
                <div class="article-content">${this.getAttribute('content')}</div>
                <div class="article-author">
                    <span class="author-link">${this.getAttribute('author')}</span>
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Event listener para mostrar/ocultar contenido del artículo al hacer clic en el header
        this.shadowRoot.querySelector('.article-header').addEventListener('click', () => {
            const articleId = this.getAttribute('article-id');
            this.navigateToArticleDetails(articleId);
        });

        // Event listener para mostrar detalles del autor al hacer clic en el nombre del autor
        this.shadowRoot.querySelector('.author-link').addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que el clic se propague al contenedor principal
            const authorId = this.getAttribute('author');
            this.navigateToAuthorDetails(authorId);
        });
    }
}

customElements.define('article-card', ArticleCard);
