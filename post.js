// Individual Blog Post Page JavaScript
// Handles loading and displaying a single blog post

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Show loading state
        const postContent = document.getElementById('postContent');
        if (postContent) {
            postContent.innerHTML = '<div class="loading">Loading post...</div>';
        }

        // Load data from JSON files
        await loadAllData();

        // Load post and related content
        loadPost();
        loadRelatedArticles();
        loadSidebarPromotion();
        initializeScrollNav();
    } catch (error) {
        // Error already handled by data-loader.js
        console.error('Failed to load post:', error);
    }
});

function loadPost() {
    // Get post ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));

    // Find the post
    const post = blogPosts.find(p => p.id === postId);

    const postContent = document.getElementById('postContent');
    const postHeroImage = document.getElementById('postHeroImage');

    // Handle post not found
    if (!post) {
        postContent.innerHTML = `
            <div class="empty-state">
                <h3>Post Not Found</h3>
                <p>The blog post you're looking for doesn't exist.</p>
                <a href="index.html" class="hero-button">Back to Blog</a>
            </div>
        `;
        return;
    }

    // Update page title
    document.getElementById('pageTitle').textContent = `${post.title} - Harmony Apartments`;

    // Format date
    const formattedDate = formatDate(post.date);

    // Load hero image if available
    if (post.image) {
        postHeroImage.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-hero-img">
            <a href="index.html" class="back-button-overlay">← Back to Blog</a>
        `;
    } else {
        postHeroImage.style.display = 'none';
    }

    // Render post content (without image, as it's now in the hero section)
    postContent.innerHTML = `
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
            <span class="post-date">Published ${formattedDate}</span>
        </div>
        <div class="post-content">
            ${post.content}
        </div>
        ${generateEndOfPostPromotion()}
        <div class="post-bottom-navigation">
            <a href="index.html" class="back-button">← Back to Blog</a>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function initializeScrollNav() {
    const scrollNav = document.getElementById('scrollNav');

    // On article pages, always show the nav bar
    scrollNav.classList.add('visible');
}

function loadRelatedArticles() {
    // Get post ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const currentPostId = parseInt(urlParams.get('id'));

    // Get related articles (all posts except current one, limited to 5 most recent)
    const relatedPosts = blogPosts
        .filter(post => post.id !== currentPostId)
        .slice(0, 5);

    const relatedArticlesContainer = document.getElementById('relatedArticles');

    // Check if there are related articles
    if (relatedPosts.length === 0) {
        relatedArticlesContainer.innerHTML = '<p style="color: #999;">No related articles available.</p>';
        return;
    }

    // Clear container
    relatedArticlesContainer.innerHTML = '';

    // Render each related article
    relatedPosts.forEach(post => {
        const relatedCard = createRelatedArticleCard(post);
        relatedArticlesContainer.appendChild(relatedCard);
    });
}

function createRelatedArticleCard(post) {
    const card = document.createElement('a');
    card.className = 'related-article-card';
    card.href = `post.html?id=${post.id}`;

    // Format date
    const formattedDate = formatDate(post.date);

    // Create image element or placeholder
    const imageHTML = post.image
        ? `<img src="${post.image}" alt="${post.title}" class="related-article-image">`
        : `<div class="related-article-image"></div>`;

    card.innerHTML = `
        ${imageHTML}
        <div class="related-article-info">
            <div class="related-article-title">${post.title}</div>
            <div class="related-article-date">${formattedDate}</div>
        </div>
    `;

    return card;
}

function loadSidebarPromotion() {
    const promotionContainer = document.getElementById('promotionContainer');

    if (!promotionContainer) {
        return;
    }

    // Generate and insert promotion HTML
    const promotionHTML = generateSidebarPromotion();
    promotionContainer.innerHTML = promotionHTML;
}
