document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('periodic-table');
    const legendContainer = document.getElementById('legend');
    const modalOverlay = document.getElementById('info-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Modal Elements
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalLink = document.getElementById('modal-link');
    const modalPreview = document.getElementById('modal-symbol-preview');

    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            renderLegend(data.categories);
            renderTable(data.elements, data.categories);
        })
        .catch(error => console.error('Error loading config:', error));

    function renderLegend(categories) {
        for (const [key, value] of Object.entries(categories)) {
            const item = document.createElement('div');
            item.className = 'legend-item';

            const colorBox = document.createElement('div');
            colorBox.className = 'legend-color';
            colorBox.style.backgroundColor = value.color;

            const label = document.createElement('span');
            label.textContent = key;

            item.appendChild(colorBox);
            item.appendChild(label);
            legendContainer.appendChild(item);
        }
    }

    function renderTable(elements, categories) {
        elements.forEach(element => {
            const elDiv = document.createElement('div');
            elDiv.className = 'element';

            // Positioning
            elDiv.style.gridColumn = element.col;
            elDiv.style.gridRow = element.row;

            // Styling based on category
            const categoryData = categories[element.category];
            const color = categoryData ? categoryData.color : '#ffffff';
            elDiv.style.setProperty('--element-color', color);
            elDiv.style.borderTop = `2px solid ${color}`;
            // Optional: Background tint
            // elDiv.style.background = `linear-gradient(135deg, ${color}22 0%, rgba(255,255,255,0.05) 100%)`;

            // Content
            elDiv.innerHTML = `
                <div class="element-number">${element.number}</div>
                <div class="element-symbol" style="color: ${color}; text-shadow: 0 0 10px ${color}80;">${element.symbol}</div>
                <div class="element-name">${element.name}</div>
                
                <!-- Hover Tooltip -->
                <div class="tooltip">
                    <strong>${element.name}</strong><br>
                    <span style="color: #aaa; font-size: 0.7em">${element.category}</span><br>
                    ${element.description}
                </div>
            `;

            // Interactions
            elDiv.addEventListener('click', () => openModal(element, color));

            tableContainer.appendChild(elDiv);
        });
    }

    function openModal(element, color) {
        modalTitle.textContent = element.name;
        modalCategory.textContent = element.category;
        modalCategory.style.backgroundColor = color;
        modalCategory.style.color = '#000'; // Assume dark bg, light text usually, but badge bg is color

        // Check contrast for text color on badge? Or just keep it simple white text on dark badge with border?
        // Let's use the badge style from CSS but override border/color
        modalCategory.style.background = `${color}40`; // 25% opacity
        modalCategory.style.color = '#fff';
        modalCategory.style.border = `1px solid ${color}`;

        modalDesc.textContent = element.description;
        modalLink.href = element.url;

        modalPreview.style.backgroundColor = `${color}20`;
        modalPreview.style.border = `2px solid ${color}`;
        modalPreview.style.color = color;
        modalPreview.style.textShadow = `0 0 15px ${color}`;
        modalPreview.textContent = element.symbol;

        modalOverlay.classList.remove('hidden');
        // Small delay to allow display:flex to apply before adding active class for opacity transition
        requestAnimationFrame(() => {
            modalOverlay.classList.add('active');
        });
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
        }, 300); // Wait for transition
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});
