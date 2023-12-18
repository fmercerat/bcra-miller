import { LitElement, html, css } from 'lit';
import '../graficos/reservas-bcra.js';

export class InicioBcra extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            h1 {
                font-family: var(--miller-font);
                font-weight: var(--miller-weight-black);
                font-size: 3rem;
                text-align: center;
                margin-top: 0%;
            }
        `
    ];

    render() {
        return html`
            <h1>Reservas del BCRA de Miller</h1>
            <reservas-bcra></reservas-bcra>
        `;
    }
}
customElements.define('inicio-bcra', InicioBcra);
