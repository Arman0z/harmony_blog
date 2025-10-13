// Data Loader Utility
// Centralized data loading for blog posts and promotions
// This file provides functions to load JSON data with error handling

// Global variables to store loaded data
let blogPosts = [];
let promotionConfig = null;
let dataLoadError = null;

/**
 * Loads blog posts from blog-posts.json
 * @returns {Promise<Array>} Array of blog post objects
 */
async function loadBlogPosts() {
    try {
        const response = await fetch('blog-posts.json');
        if (!response.ok) {
            throw new Error(`Failed to load blog posts: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        blogPosts = data.posts || [];
        return blogPosts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        throw error;
    }
}

/**
 * Loads promotion configuration from promotions.json
 * @returns {Promise<Object>} Promotion configuration object
 */
async function loadPromotions() {
    try {
        const response = await fetch('promotions.json');
        if (!response.ok) {
            throw new Error(`Failed to load promotions: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        promotionConfig = data.currentPromotion || null;
        return promotionConfig;
    } catch (error) {
        console.error('Error loading promotions:', error);
        throw error;
    }
}

/**
 * Loads all data (blog posts and promotions) in parallel
 * @returns {Promise<Object>} Object containing posts and promotions
 */
async function loadAllData() {
    try {
        const [posts, promotions] = await Promise.all([
            loadBlogPosts(),
            loadPromotions()
        ]);
        return { posts, promotions };
    } catch (error) {
        dataLoadError = error;
        displayLoadingError(error);
        throw error;
    }
}

/**
 * Displays a user-friendly error message when data fails to load
 * @param {Error} error - The error object
 */
function displayLoadingError(error) {
    const container = document.getElementById('blogPostsContainer') || document.getElementById('postContent');
    if (container) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 3rem; text-align: center;">
                <h3 style="color: #e74c3c; margin-bottom: 1rem;">⚠️ Unable to Load Content</h3>
                <p style="color: #666; margin-bottom: 1rem;">
                    We're having trouble loading the blog content. This might be a temporary issue.
                </p>
                <p style="color: #999; font-size: 0.9rem; margin-bottom: 1.5rem;">
                    Technical details: ${error.message}
                </p>
                <button onclick="location.reload()" class="hero-button" style="cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
}

/**
 * Checks if a post should display a promotion banner
 * @param {number} postId - The ID of the post to check
 * @returns {boolean} True if post should show promotion
 */
function shouldShowPromotion(postId) {
    if (!promotionConfig || !promotionConfig.enabled) {
        return false;
    }
    if (!promotionConfig.applicablePosts || !Array.isArray(promotionConfig.applicablePosts)) {
        return false;
    }
    return promotionConfig.applicablePosts.includes(postId);
}

/**
 * Generates HTML for the sidebar promotion box
 * @returns {string} HTML string for sidebar promotion
 */
function generateSidebarPromotion() {
    if (!promotionConfig || !promotionConfig.enabled) {
        return '';
    }

    const blackoutList = promotionConfig.blackoutDates
        .map(date => `<li>${date.name} (${date.formatted})</li>`)
        .join('');

    return `
        <div class="sidebar-section promotion-box">
            <h3 class="promotion-box-title">${promotionConfig.title}</h3>
            <div class="promotion-box-discount">${promotionConfig.discount}</div>
            <div class="promotion-box-code">Code: <strong>${promotionConfig.code}</strong></div>
            <div class="promotion-box-validity">
                <p>Promotion applies to arrivals before ${promotionConfig.validUntilFormatted}. Available for a limited time. Excludes:</p>
                <ul>
                    ${blackoutList}
                </ul>
            </div>
            <a href="${promotionConfig.bookingUrl}" class="promotion-box-button" target="_blank">Book with ${promotionConfig.code}</a>
            <p class="promotion-box-terms">${promotionConfig.restrictions}</p>
        </div>
    `;
}

/**
 * Generates HTML for the end-of-post promotion box
 * @returns {string} HTML string for end-of-post promotion
 */
function generateEndOfPostPromotion() {
    if (!promotionConfig || !promotionConfig.enabled) {
        return '';
    }

    const blackoutList = promotionConfig.blackoutDates
        .map(date => `${date.name} (${date.formatted})`)
        .join(', ');

    return `
        <div class="post-end-promotion">
            <h3 class="post-end-promotion-title">${promotionConfig.returnGuestTitle}</h3>
            <div class="post-end-promotion-discount">${promotionConfig.discount} YOUR STAY</div>
            <div class="post-end-promotion-code">Code: <strong>${promotionConfig.code}</strong></div>
            <div class="post-end-promotion-validity">
                <p>Promotion applies to arrivals before ${promotionConfig.validUntilFormatted}. Available for a limited time.<br>Excludes: ${blackoutList}.</p>
            </div>
            <a href="${promotionConfig.bookingUrl}" class="post-end-promotion-button" target="_blank">Book with ${promotionConfig.code}</a>
            <p class="post-end-promotion-terms">${promotionConfig.restrictions}</p>
        </div>
    `;
}

/**
 * Get all unique categories from blog posts
 * @returns {Array<string>} Sorted array of unique categories
 */
function getAllCategories() {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    return categories.sort();
}
