class ArticleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expanded = false;
    }

    connectedCallback() {
        this.render();
        if (this.hasAttribute('article-id')) {
            this.fetchArticleData(this.getAttribute('article-id'));
        }
    }

    static get observedAttributes() {
        return ['article-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'article-id' && oldValue !== newValue) {
            this.fetchArticleData(newValue);
        }
    }

    set articleId(value) {
        this.setAttribute('article-id', value);
    }

    get articleId() {
        return this.getAttribute('article-id');
    }

    set expanded(value) {
        this._expanded = value;
        this.render();
    }

    get expanded() {
        return this._expanded;
    }

    set articleData(data) {
        this._articleData = data;
        this.render();
    }

    get articleData() {
        return this._articleData;
    }

    async fetchArticleData(articleId) {
        try {
            const response = await fetch(`https://mockapi.io/api/v1/articles/${articleId}`);
            const data = await response.json();
            this.articleData = data;
        } catch (error) {
            console.error('Error fetching article data:', error);
        }
    }

    toggleContent() {
        this.expanded = !this.expanded;
    }

    async fetchAuthorData(authorId) {
        try {
            const response = await fetch(`https://mockapi.io/api/v1/users/${authorId}`);
            const authorData = await response.json();
            alert(`Author: ${authorData.name}\nBio: ${authorData.bio}`);
        } catch (error) {
            console.error('Error fetching author data:', error);
        }
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
                }
                .article-title {
                    font-size: 24px;
                    font-weight: bold;
                }
                .article-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }
                .article-content {
                    display: ${this.expanded ? 'block' : 'none'};
                    margin-top: 16px;
                }
                .author-link {
                    color: blue;
                    cursor: pointer;
                }
            </style>
            <div class="article-card" id="article-card">
                ${this._articleData ? `
                    <div class="article-header" id="article-header">
                        <div class="article-title">${this._articleData.title}</div>
                        <img class="article-image" src="${this._articleData.image}" alt="${this._articleData.title}">
                        <p class="article-company">${this._articleData.company}</p>
                        <p class="article-description">${this._articleData.description}</p>
                    </div>
                    <div class="article-content">${this._articleData.content}</div>
                    <div class="article-author">
                        <span class="author-link" id="author-link">${this._articleData.author}</span>
                    </div>
                ` : '<div class="loading">Loading...</div>'}
            </div>
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        if (this._articleData) {
            this.shadowRoot.getElementById('article-header').addEventListener('click', () => this.toggleContent());
            this.shadowRoot.getElementById('author-link').addEventListener('click', (event) => {
                event.stopPropagation();
                this.fetchAuthorData(this._articleData.author);
            });
        }
    }
}

customElements.define('article-card', ArticleCard);
