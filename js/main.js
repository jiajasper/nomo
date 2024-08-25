document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blog-grid');
    const blogContent = document.getElementById('blog-content');
    const courseSection = document.querySelector('section:first-of-type div');

    if (courseSection) {
        // Add course cards
        const courses = [
            { 
                title: 'No-code 101', 
                description: 'Free 3-part intro course to no-code and learn all the essential fundamentals!', 
                link: 'https://www.youtube.com/watch?v=eP7WTFnYJc4&list=PLo6zuODywwnN3zgAQmTF_diaHqWkOyhyG', 
                image: '/images/nocode-intro.png' 
            },
            { 
                title: 'Thread Clone w/ Flutterflow', 
                description: 'Build Threads/Twitter-like social media apps with Flutterflow. A 3-hour course with project template provided!', 
                link: 'https://portal.nomo.codes/flutterflow-workshop/', 
                image: '/images/thread-clone.png' 
            },
            { 
                title: 'No-code Langchain AI App', 
                description: 'Free crash course for non-techies to learn the fundamentals of building a Langchain AI app with zero code needed!', 
                link: 'https://aichat.nomo.codes/', 
                image: '/images/langchainapp.jpg' 
            },
        ];

        courses.forEach(course => {
            const courseCard = createCourseCard(course);
            courseSection.appendChild(courseCard);
        });
    }

    if (blogGrid) {
        // Fetch and display blog posts for the home page
        fetch(`blogs/index.json?_=${new Date().getTime()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(blogs => {
                if (blogs.length === 0) {
                    throw new Error('No blog posts found');
                }
                blogs.forEach(blog => {
                    const blogCard = createBlogCard(blog);
                    blogGrid.appendChild(blogCard);
                });
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
                blogGrid.innerHTML = `<p class="text-red-500 col-span-full">Error loading blog posts: ${error.message}. Please check the console for more details.</p>`;
            });
    }

    if (blogContent) {
        // Handle individual blog post display
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        if (slug) {
            console.log('Fetching blog post:', slug);
            fetch(`blogs/${slug}.md?_=${new Date().getTime()}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(markdown => {
                    console.log('Markdown content:', markdown);
                    const { metadata, content } = parseMarkdown(markdown);
                    console.log('Parsed metadata:', metadata);
                    console.log('Parsed content:', content);
                    updateMetadata(metadata);
                    
                    // Configure marked options
                    marked.setOptions({
                        breaks: true,
                        gfm: true,
                        baseUrl: metadata.baseUrl || '',
                    });

                    // Custom image renderer
                    const renderer = new marked.Renderer();
                    renderer.image = function(href, title, text) {
                        console.log('Image renderer called:', { href, title, text });
                        // Check if the href is a full URL
                        if (href && !/^https?:\/\//i.test(href)) {
                            // If not, prepend the baseUrl if it exists
                            href = (metadata.baseUrl || '') + href;
                        }
                        console.log('Final image href:', href);
                        return `<img src="${href}" alt="${text || ''}" title="${title || ''}" class="markdown-image">`;
                    };

                    marked.use({ renderer });

                    // Render the content
                    const renderedContent = marked.parse(content);
                    console.log('Rendered content:', renderedContent);
                    blogContent.innerHTML = renderedContent;
                    blogContent.classList.add('markdown-content');

                    // Log image elements for debugging
                    console.log('Image elements:', blogContent.querySelectorAll('img'));
                })
                .catch(error => {
                    console.error('Error fetching blog post:', error);
                    blogContent.innerHTML = `<p class="text-red-500">Error loading blog post: ${error.message}. Please check the console for more details.</p>`;
                });
        }
    }
});

function createCourseCard(course) {
    const article = document.createElement('article');
    article.className = 'course-card';
    article.innerHTML = `
        <a href="${course.link}" target="_blank" rel="noopener noreferrer" class="block h-full">
            <img class="course-card-image" src="${course.image}" alt="${course.title}">
            <div class="course-card-content">
                <h3 class="course-card-title">${course.title}</h3>
                <p class="course-card-description">${course.description}</p>
            </div>
        </a>
    `;
    return article;
}

function createBlogCard(blog) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.innerHTML = `
        <a href="blog.html?slug=${blog.slug}" class="block h-full">
            <img class="blog-card-image" src="${blog.image || 'https://via.placeholder.com/400x200'}" alt="${blog.title}">
            <div class="blog-card-content">
                <h3 class="blog-card-title">${blog.title}</h3>
                <p class="blog-card-preview">${blog.preview}</p>
            </div>
        </a>
    `;
    return article;
}

function parseMarkdown(markdown) {
    const metadataRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(metadataRegex);
    
    if (match) {
        const metadata = parseYAML(match[1]);
        const content = match[2];
        return { metadata, content };
    }
    
    return { metadata: {}, content: markdown };
}

function parseYAML(yaml) {
    const result = {};
    const lines = yaml.split('\n');
    for (const line of lines) {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
            result[key] = value;
        }
    }
    return result;
}

function updateMetadata(metadata) {
    document.title = metadata.title || 'Blog Post';
    
    updateMetaTag('description', metadata.description);
    updateMetaTag('keywords', metadata.keywords);
    
    updateMetaTag('og:title', metadata.title);
    updateMetaTag('og:description', metadata.description);
    updateMetaTag('og:image', metadata.image);
}

function updateMetaTag(name, content) {
    if (content) {
        let meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }
}