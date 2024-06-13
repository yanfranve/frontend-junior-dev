class ArticleList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.articles = [];
        this.filteredArticles = [];
    }

    set articles(data) {
        this._articles = data;
        this.filteredArticles = data;
        this.render();
    }

    get articles() {
        return this._articles;
    }

    search(query) {
        this.filteredArticles = this._articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.description.toLowerCase().includes(query.toLowerCase())
        );
        this.render();
    }

    sort(criteria) {
        if (criteria === 'date') {
            this.filteredArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else if (criteria === 'title') {
            this.filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
        }
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = '';
        this.filteredArticles.forEach(article => {
            const articleItem = document.createElement('article-item');
            articleItem.data = article;
            this.shadowRoot.appendChild(articleItem);
        });
    }
}

customElements.define('article-list', ArticleList);
