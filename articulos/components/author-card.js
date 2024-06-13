class AuthorCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        if (this.hasAttribute('author-id')) {
            this.fetchAuthorData(this.getAttribute('author-id'));
        }
    }

    static get observedAttributes() {
        return ['author-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'author-id' && oldValue !== newValue) {
            this.fetchAuthorData(newValue);
        }
    }

    set authorId(value) {
        this.setAttribute('author-id', value);
    }

    get authorId() {
        return this.getAttribute('author-id');
    }

    async fetchAuthorData(authorId) {
        try {
            const response = await fetch(`https://mockapi.io/api/v1/users/${authorId}`);
            const data = await response.json();
            this.authorData = data;
        } catch (error) {
            console.error('Error fetching author data:', error);
        }
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                .author-card {
                    border: 1px solid #e5e7eb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    background-color: #fff;
                }
                .author-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 1rem;
                }
                .author-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                }
                .author-bio {
                    margin-top: 0.5rem;
                    color: #4b5563;
                }
            </style>
            <div class="author-card">
                ${this.authorData ? `
                    <img class="author-avatar" src="${this.authorData.avatar}" alt="${this.authorData.name}">
                    <div class="author-name">${this.authorData.name}</div>
                    <div class="author-bio">${this.authorData.bio}</div>
                ` : '<div class="loading">Loading...</div>'}
            </div>
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.author-name').addEventListener('click', () => {
            window.location.href = `author-details.html?authorId=${this.authorId}`;
        });
    }
}

customElements.define('author-card', AuthorCard);
