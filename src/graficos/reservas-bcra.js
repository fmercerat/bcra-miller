import { LitElement, html, css } from 'lit';
import { createChart } from 'lightweight-charts';
import { obtenerReservas } from '../res/reservas.js';

export class ReservasBcra extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }

            #chart {
                width: 100%;
                height: 60vh;
            }

            h3 {
                font-family: var(--miller-font);
                font-weight: var(--miller-weight-black);
                font-size: var(--miller-h3-size);
                text-align: center;
                margin-top: 0%;
            }

            .acc  {
                color: var(--miller-primary-color);
            }
        `
    ];

    render() {
        return html`
            <div id="chart"></div>
            <h3>Reservas actuales: ${this.reservasHoy} | Reservas iniciales: ${this.reservasIniciales}</h3>
            <h3 class="acc">Resultado de Miller: ${this.diferenciaReservas}</h3>
        `;
    }

    firstUpdated() {
        this.cargar();
    }

    async cargar() {
        let reservas = await obtenerReservas();
        // const reservasData = reservas.slice(0, 10);
        const reservasData = reservas;
        const formateador = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format;
        const options = {
            layout: { textColor: 'rgba(255,255,255,0.5)', background: { type: 'solid', color: '#191821FF' } },
            grid: { vertLines: { color: '#FFFFFF00'}, horzLines: { color: '#FFFFFF05'} },
            timeScale: { timeVisible: true, secondsVisible: false },
            localization: { priceFormatter: formateador },
            autoSize: true,
        };
        
        const chart = createChart(this.shadowRoot.getElementById('chart'), options);
        const areaSeries = chart.addAreaSeries({ lineColor: '#8a74eb', topColor: '#8a74ebFF', bottomColor: '#8a74eb11', lineWidth: 2, handleScale: true});
        areaSeries.setData( reservasData.map( (reserva) => {
            return { time: reserva.d, value: reserva.v };
        }));
        var reservasMasa = {
            price: 21209,
            color: '#FF00AA',
            axisLabelVisible: true,
            title: 'Reservas del hombre masa',
        };

        areaSeries.createPriceLine(reservasMasa);
        
        chart.timeScale().fitContent();

        const rH = reservasData.pop().v;
        const rI = 21209;

        this.reservasHoy = formateador(rH);
        this.reservasIniciales = formateador(rI);
        this.diferenciaReservas = `${(rH - rI) > 0 ? '+' : '' }${formateador(rH - rI)}`;

        this.requestUpdate();
    }
}
customElements.define('reservas-bcra', ReservasBcra);
