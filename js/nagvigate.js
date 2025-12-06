// Minimalist Luxury Content Injection

// Helper: Generate HTML List from Data
function generateListHTML(dataItem) {
    if (!dataItem || dataItem.length === 0) return '<p class="welcome-text">No content available.</p>';

    let html = '<ul class="content-list">';
    dataItem.forEach(item => {
        html += `
        <li>
            <a href="${item.link}" target="_blank">${item.title}</a>
            <span>${item.description}</span>
        </li>`;
    });
    html += '</ul>';
    return html;
}

var html_insert_home = `
<div class="welcome-section">
    <h2>Welcome</h2>
    <p class="welcome-text">
        I am Andrew, a passionate researcher exploring the frontiers of AI.<br>
        Currently a PhD student specializing in Time Series Forecasting and Machine Learning Ops.<br>
        My goal is bridging advanced neural networks with real-world challenges,<br>
        transforming complex data into intelligent insights.
    </p>

    <div class="social-links">
        <a href="https://github.com/andrewlee1807" class="social-icon" target="_blank" title="GitHub"><i class="fa fa-github"></i></a>
        <a href="#" class="social-icon" title="Facebook"><i class="fa fa-facebook"></i></a>
        <a href="https://www.instagram.com/blackhole.large/" class="social-icon" target="_blank" title="Instagram"><i class="fa fa-instagram"></i></a>
        <a href="https://www.flickr.com/photos/192362930@N04/albums" class="social-icon" target="_blank" title="Flickr"><i class="fa fa-flickr"></i></a>
        <a href="https://www.linkedin.com/in/anh-l%C3%AA-93b46b189/" class="social-icon" target="_blank" title="LinkedIn"><i class="fa fa-linkedin"></i></a>
    </div>
</div>
`;

function updateContent(content) {
    var contentArea = document.getElementById("content-area");
    // Simple fade out/in effect
    contentArea.style.opacity = 0;
    setTimeout(function () {
        contentArea.innerHTML = content;
        contentArea.style.opacity = 1;

        // Attach Horizontal Scroll via Wheel
        const list = contentArea.querySelector('.content-list');
        if (list) {
            list.addEventListener('wheel', (evt) => {
                evt.preventDefault();
                list.scrollLeft += evt.deltaY;
            });
        }
    }, 300);
}

function home() {
    updateContent(html_insert_home);
}

function blog() {
    // Uses global BLOGS_DATA from data/blogs.js
    const content = generateListHTML(typeof BLOGS_DATA !== 'undefined' ? BLOGS_DATA : []);
    updateContent(content);
}

function book() {
    // Uses global BOOKS_DATA from data/books.js
    const content = generateListHTML(typeof BOOKS_DATA !== 'undefined' ? BOOKS_DATA : []);
    updateContent(content);
}

function project() {
    // Uses global PROJECTS_DATA from data/projects.js
    const content = generateListHTML(typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : []);
    updateContent(content);
}
