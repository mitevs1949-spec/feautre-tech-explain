const fs = require('fs');
const path = require('path');

/*
 * ========================================
 * 🤖 AUTOMATED BLOG MAINTENANCE
 * ========================================
 * 
 * I run this to add new posts to your site.
 */

async function addPost(title, category, excerpt, content) {
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const filePath = path.join(__dirname, 'posts', `${slug}.html`);

    // 1. Create the Post HTML (using a simplified template logic)
    const template = fs.readFileSync(path.join(__dirname, 'post-template.html'), 'utf8');
    const finalHtml = template
        .replace(/{{TITLE}}/g, title)
        .replace(/{{DATE}}/g, date)
        .replace(/{{CATEGORY}}/g, category)
        .replace(/{{CONTENT}}/g, content);

    fs.writeFileSync(filePath, finalHtml);
    console.log(`✅ Post created: ${filePath}`);

    // 2. Update index.html
    let indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const newEntry = `
            <a href="posts/${slug}.html" class="post-card">
                <div class="post-date">${date}</div>
                <h2 class="post-title">${title}</h2>
                <p class="post-excerpt">${excerpt}</p>
            </a>`;

    // Inject after the first <div class="post-list" id="post-list">
    indexHtml = indexHtml.replace('id="post-list">', `id="post-list">\n${newEntry}`);
    fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
    console.log(`✅ index.html updated.`);

    console.log(`🚀 READY FOR DEPLOYMENT!`);
}

// Example usage when OLi triggers a new post:
// addPost("6G Networks: The Internet of Senses", "Tech", "Exploring the 2026 shift to sub-terahertz frequencies...", "<p>Long content here...</p>");

module.exports = { addPost };
