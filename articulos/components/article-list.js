class ArticleList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._articles = [];
    }

    connectedCallback() {
        this.render();
    }

    set articles(value) {
        this._articles = value;
        this.render();
    }

    get articles() {
        return this._articles;
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
            </style>
            <div class="article-list">
                ${this._articles.map(article => `
                    <article-item
                        title="${article.title}"
                        image="${article.image}"
                        company="${article.company}"
                        description="${article.description}">
                    </article-item>
                `).join('')}
            </div>
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('article-list', ArticleList);
