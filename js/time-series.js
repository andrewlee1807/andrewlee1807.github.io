/**
 * Time Series Analysis Effect
 * Spawns various "Deep Learning Task" visualizations on click.
 * Styles: Forecasting, Anomaly Detection, Denoising.
 */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let graphs = [];

// Resize handling
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

// Click Event
window.addEventListener('click', (e) => {
    const safeMargin = 50;
    const centerX = width / 2;
    const exclusionHalf = 250;
    let spawnX;

    if (Math.random() > 0.5) {
        const minX = centerX + exclusionHalf + safeMargin;
        const maxX = width - safeMargin;
        spawnX = (maxX > minX) ? Math.random() * (maxX - minX) + minX : width - 100;
    } else {
        const minX = safeMargin;
        const maxX = centerX - exclusionHalf - safeMargin;
        spawnX = (maxX > minX) ? Math.random() * (maxX - minX) + minX : 100;
    }

    const spawnY = Math.random() * 120 + 40;
    spawnGraph(spawnX, spawnY);
});

class AnalysisGraph {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 180;
        this.height = 80;
        this.age = 0;
        this.lifetime = 240;
        this.active = true;

        // Randomly select style
        const styles = ['FORECAST', 'ANOMALY', 'DENOISE'];
        this.style = styles[Math.floor(Math.random() * styles.length)];

        this.data = [];
        this.secondaryData = []; // For predictions/smoothing
        this.generateData();

        this.drawProgress = 0;

        // Random metrics
        this.loss = (Math.random() * 0.05).toFixed(4);
        this.confidence = (0.85 + Math.random() * 0.14).toFixed(2);
    }

    generateData() {
        let v = 0.5;
        const steps = 30;

        // Base Random Walk
        for (let i = 0; i < steps; i++) {
            v += (Math.random() - 0.5) * 0.4;
            v = Math.max(0.2, Math.min(0.8, v));
            this.data.push(v);
        }

        // Apply Style Logic
        if (this.style === 'FORECAST') {
            // Data is history, secondary is forecast
            // (Handled in draw, just keeping standard data)
        }
        else if (this.style === 'ANOMALY') {
            // Create a spike
            const spikeIdx = Math.floor(steps * 0.7);
            this.data[spikeIdx] = (Math.random() > 0.5) ? 0.95 : 0.05; // Extreme value
            this.anomalyIdx = spikeIdx;
        }
        else if (this.style === 'DENOISE') {
            // Secondary is smooth trend, Data is noisy
            // Simple moving average for secondary
            for (let i = 0; i < steps; i++) {
                // Add noise to primary data
                this.data[i] += (Math.random() - 0.5) * 0.2;

                // Calculate smooth (moving average of original base walk)
                let sum = 0;
                let count = 0;
                for (let j = Math.max(0, i - 2); j <= Math.min(steps - 1, i + 2); j++) {
                    sum += this.data[j]; // Using the noisy data to smooth
                    count++;
                }
                this.secondaryData.push(sum / count);
            }
        }
    }

    update() {
        this.age++;
        if (this.age < 50) {
            this.drawProgress = this.age / 50;
        } else {
            this.drawProgress = 1;
        }
        if (this.age > this.lifetime) {
            this.active = false;
        }
    }

    draw(ctx) {
        const opacity = this.age > (this.lifetime - 30)
            ? 1 - ((this.age - (this.lifetime - 30)) / 30)
            : Math.min(1, this.age / 15);

        const cx = this.x;
        const cy = this.y;
        const w = this.width;
        const h = this.height;
        const left = cx - w / 2;
        const top = cy - h / 2;
        const bottom = cy + h / 2;

        ctx.lineWidth = 1;

        // --- Common Elements: Grid ---
        if (this.drawProgress > 0.1) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
            ctx.beginPath();
            // grid lines
            for (let i = 0; i <= 4; i++) {
                let gx = left + (w * i / 4);
                ctx.moveTo(gx, top); ctx.lineTo(gx, bottom);
            }
            for (let i = 0; i <= 2; i++) {
                let gy = top + (h * i / 2);
                ctx.moveTo(left, gy); ctx.lineTo(left + w, gy);
            }
            ctx.stroke();

            // Axes
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(left, top); ctx.lineTo(left, bottom); ctx.lineTo(left + w, bottom);
            ctx.stroke();
        }

        const stepX = w / (this.data.length - 1);
        const currentLen = Math.floor(this.data.length * this.drawProgress);

        // --- STYLE: FORECAST ---
        if (this.style === 'FORECAST') {
            const splitIndex = Math.floor(this.data.length * 0.6);

            // History
            ctx.strokeStyle = `rgba(224, 224, 224, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i < Math.min(currentLen, splitIndex + 1); i++) {
                const px = left + (i * stepX);
                const py = bottom - (this.data[i] * h);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();

            // Prediction
            if (currentLen > splitIndex) {
                // Confidence Fill
                ctx.fillStyle = `rgba(212, 175, 55, ${opacity * 0.1})`;
                ctx.beginPath();
                for (let i = splitIndex; i < currentLen; i++) {
                    const px = left + (i * stepX);
                    const py = bottom - (this.data[i] * h);
                    const offset = (i - splitIndex) * 2 + 5;
                    if (i === splitIndex) ctx.moveTo(px, py - offset); else ctx.lineTo(px, py - offset);
                }
                for (let i = currentLen - 1; i >= splitIndex; i--) {
                    const px = left + (i * stepX);
                    const py = bottom - (this.data[i] * h);
                    const offset = (i - splitIndex) * 2 + 5;
                    ctx.lineTo(px, py + offset);
                }
                ctx.fill();

                // Dashed Line
                ctx.beginPath();
                ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                ctx.setLineDash([3, 3]);
                for (let i = splitIndex; i < currentLen; i++) {
                    const px = left + (i * stepX);
                    const py = bottom - (this.data[i] * h);
                    if (i === splitIndex) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                }
                ctx.stroke();
                ctx.setLineDash([]);

                // Label
                if (this.age > 40) {
                    ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.font = '10px "Courier New", monospace';
                    ctx.fillText(`FORECAST (MSE:${this.loss})`, left, top - 5);
                }
            }
        }

        // --- STYLE: ANOMALY ---
        else if (this.style === 'ANOMALY') {
            ctx.strokeStyle = `rgba(224, 224, 224, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i < currentLen; i++) {
                const px = left + (i * stepX);
                const py = bottom - (this.data[i] * h);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();

            // Highlight Anomaly
            if (currentLen > this.anomalyIdx) {
                const ax = left + (this.anomalyIdx * stepX);
                const ay = bottom - (this.data[this.anomalyIdx] * h);

                ctx.strokeStyle = `rgba(255, 80, 80, ${opacity})`; // Reddish
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(ax, ay, 6, 0, Math.PI * 2);
                ctx.stroke();

                if (this.age > 40) {
                    ctx.fillStyle = `rgba(255, 80, 80, ${opacity})`;
                    ctx.font = '10px "Courier New", monospace';
                    ctx.fillText(`ANOMALY DETECTED`, left, top - 5);
                    ctx.fillText(`conf: ${this.confidence}`, left + w - 60, top - 5);
                }
            }
        }

        // --- STYLE: DENOISE ---
        else if (this.style === 'DENOISE') {
            // Draw Noisy (Faint)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < currentLen; i++) {
                const px = left + (i * stepX);
                const py = bottom - (this.data[i] * h);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();

            // Draw Smooth (Gold, Bold)
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < currentLen; i++) {
                const px = left + (i * stepX);
                const py = bottom - (this.secondaryData[i] * h);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();

            if (this.age > 40) {
                ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
                ctx.font = '10px "Courier New", monospace';
                ctx.fillText(`DENOISING AUTOENCODER`, left, top - 5);
            }
        }
    }
}

function spawnGraph(x, y) {
    if (graphs.length > 5) graphs.shift();
    graphs.push(new AnalysisGraph(x, y));
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    graphs = graphs.filter(g => g.active);
    graphs.forEach(g => {
        g.update();
        g.draw(ctx);
    });

    requestAnimationFrame(animate);
}

animate();
