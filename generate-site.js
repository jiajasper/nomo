const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'blogs');
const indexOutputFile = path.join(__dirname, 'blogs', 'index.json');
const sitemapOutputFile = path.join(__dirname, 'sitemap.xml');
const baseUrl = 'https://blog.nomo.codes'; // Replace with your actual domain

function parseMarkdown(content) {
    const metadataRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(metadataRegex);
    
    if (match) {
        const metadata = {};
        const metadataLines = match[1].split('\n');
        metadataLines.forEach(line => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) {
                metadata[key] = value;
            }
        });
        return { metadata, content: match[2] };
    }
    
    return { metadata: {}, content };
}

function generateIndex() {
    const blogFiles = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));
    const blogPosts = blogFiles.map(file => {
        const content = fs.readFileSync(path.join(blogsDir, file), 'utf-8');
        const { metadata } = parseMarkdown(content);
        return {
            slug: path.basename(file, '.md'),
            title: metadata.title || 'Untitled',
            date: metadata.date || 'No date',
            preview: metadata.preview || 'No preview available'
        };
    });

    fs.writeFileSync(indexOutputFile, JSON.stringify(blogPosts, null, 2));
    console.log(`index.json generated with ${blogPosts.length} blog posts.`);
    return blogPosts;
}

function generateSitemap(blogPosts) {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add home page
    sitemap += `  <url>\n    <loc>${baseUrl}/</loc>\n  </url>\n`;

    // Add blog posts
    blogPosts.forEach(post => {
        sitemap += `  <url>\n    <loc>${baseUrl}/blog.html?slug=${post.slug}</loc>\n  </url>\n`;
    });

    sitemap += '</urlset>';

    fs.writeFileSync(sitemapOutputFile, sitemap);
    console.log(`Sitemap generated at ${sitemapOutputFile}`);
}

const blogPosts = generateIndex();
generateSitemap(blogPosts);