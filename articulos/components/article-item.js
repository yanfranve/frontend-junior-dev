class ArticleItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'image', 'company', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get title() {
        return this.getAttribute('title');
    }

    set image(value) {
        this.setAttribute('image', value);
    }

    get image() {
        return this.getAttribute('image');
    }

    set company(value) {
        this.setAttribute('company', value);
    }

    get company() {
        return this.getAttribute('company');
    }

    set description(value) {
        this.setAttribute('description', value);
    }

    get description() {
        return this.getAttribute('description');
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    padding: 16px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                    font-family: Arial, sans-serif;
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
                .article-company {
                    font-size: 18px;
                    color: #555;
                }
                .article-description {
                    margin-top: 8px;
                    font-size: 16px;
                    color: #333;
                }
            </style>
            <div class="article-item">
                <div class="article-title">${this.title}</div>
                <img class="article-image" src="${this.image}" alt="${this.title}">
                <div class="article-company">${this.company}</div>
                <div class="article-description">${this.description}</div>
            </div>
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('article-item', ArticleItem);
