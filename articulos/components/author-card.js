class AuthorCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loading = true; // Propiedad para el estado de carga
    }

    // Conectado al DOM
    connectedCallback() {
        this.render();
        if (this.hasAttribute('author-id')) {
            this.fetchAuthorData(this.getAttribute('author-id'));
        }
    }

    // Observando cambios en los atributos
    static get observedAttributes() {
        return ['author-id'];
    }

    // Manejar cambios en los atributos
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'author-id' && oldValue !== newValue) {
            this.fetchAuthorData(newValue);
        }
    }

    // Setters y getters para las propiedades del componente
    set authorId(value) {
        this.setAttribute('author-id', value);
    }

    get authorId() {
        return this.getAttribute('author-id');
    }

    set loading(value) {
        this._loading = value;
        this.setAttribute('loading', value);
        this.render();
    }

    get loading() {
        return this._loading;
    }

    set authorData(data) {
        this._authorData = data;
        this.render();
    }

    get authorData() {
        return this._authorData;
    }

    // Fetching author data
    async fetchAuthorData(authorId) {
        this.loading = true;
        try {
            const response = await fetch(`https://mockapi.io/api/v1/users/${authorId}`);
            const data = await response.json();
            this.authorData = data;
        } catch (error) {
            console.error('Error fetching author data:', error);
        } finally {
            this.loading = false;
        }
    }

    // Render the component
    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }
                .author-card {
                    border: 1px solid #ccc;
                    padding: 16px;
                    border-radius: 8px;
                    text-align: center;
                }
                .author-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .loading {
                    font-size: 16px;
                    color: #888;
                }
            </style>
            <div class="author-card">
                ${this.loading ? '<div class="loading">Loading...</div>' : `
                    <img class="author-avatar" src="${this._authorData.avatar}" alt="${this._authorData.name}">
                    <h2>${this._authorData.name}</h2>
                    <p><strong>Birthdate:</strong> ${new Date(this._authorData.birthdate).toLocaleDateString()}</p>
                    <p>${this._authorData.bio}</p>
                `}
            </div>
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('author-card', AuthorCard);
