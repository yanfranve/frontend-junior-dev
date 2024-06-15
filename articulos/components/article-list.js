class ArticleList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._articles = []; // Inicializar con un array vacío de artículos
    }

    connectedCallback() {
        this.render(); // Renderizar la lista inicialmente
    }

    set articles(value) {
        this._articles = value; // Actualizar el array de artículos cuando se establece la propiedad articles
        this.render(); // Volver a renderizar con los nuevos artículos
    }

    get articles() {
        return this._articles; // Getter para obtener los artículos actuales
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
            </style>
            <div class="list">
                ${this.articles.map(article => `
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
