// Data Loader Utility
// Centralized data loading for blog posts and promotions
// This file provides functions to load JSON data with error handling
// Multi-Promotion System: Posts reference promotions via the 'promotionId' field

// Global variables to store loaded data
let blogPosts = [];
let promotionsData = {};
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
 * Loads all promotions from promotions.json
 * Multi-Promotion System: Loads all available promotions
 * @returns {Promise<Object>} Object containing all promotions keyed by promotion ID
 */
async function loadPromotions() {
    try {
        const response = await fetch('promotions.json');
        if (!response.ok) {
            throw new Error(`Failed to load promotions: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        promotionsData = data.promotions || {};
        return promotionsData;
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
 * Gets the promotion object for a given post
 * @param {Object} post - The blog post object
 * @returns {Object|null} The promotion object or null if none found
 */
function getPromotionForPost(post) {
    // Check if post has a promotionId
    if (!post.promotionId) {
        return null;
    }

    // Get the promotion from promotionsData
    const promotion = promotionsData[post.promotionId];

    // Check if promotion exists and is enabled
    if (!promotion || !promotion.enabled) {
        return null;
    }

    return promotion;
}

/**
 * Checks if a post should display a promotion banner
 * @param {Object} post - The blog post object
 * @returns {boolean} True if post should show promotion
 */
function shouldShowPromotion(post) {
    const promotion = getPromotionForPost(post);
    if (!promotion) {
        return false;
    }

    // Check if promotion has showBannerOnListing enabled
    return promotion.showBannerOnListing === true;
}

/**
 * Generates HTML for the sidebar promotion box
 * @param {string} promotionId - The ID of the promotion to display
 * @returns {string} HTML string for sidebar promotion
 */
function generateSidebarPromotion(promotionId) {
    // Get promotion by ID
    const promotion = promotionsData[promotionId];

    if (!promotion || !promotion.enabled) {
        return '';
    }

    const blackoutList = promotion.blackoutDates
        .map(date => `<li>${date.name} (${date.formatted})</li>`)
        .join('');

    return `
        <div class="sidebar-section promotion-box">
            <h3 class="promotion-box-title">${promotion.title}</h3>
            <div class="promotion-box-discount">${promotion.discount}</div>
            <div class="promotion-box-code">Code: <strong>${promotion.code}</strong></div>
            <div class="promotion-box-validity">
                <p>Promotion applies to arrivals before ${promotion.validUntilFormatted}. Available for a limited time. Excludes:</p>
                <ul>
                    ${blackoutList}
                </ul>
            </div>
            <a href="${promotion.bookingUrl}" class="promotion-box-button" target="_blank">Book with ${promotion.code}</a>
            <p class="promotion-box-terms">${promotion.restrictions}</p>
        </div>
    `;
}

/**
 * Generates HTML for the end-of-post promotion box
 * @param {string} promotionId - The ID of the promotion to display
 * @returns {string} HTML string for end-of-post promotion
 */
function generateEndOfPostPromotion(promotionId) {
    // Get promotion by ID
    const promotion = promotionsData[promotionId];

    if (!promotion || !promotion.enabled) {
        return '';
    }

    const blackoutList = promotion.blackoutDates
        .map(date => `${date.name} (${date.formatted})`)
        .join(', ');

    return `
        <div class="post-end-promotion">
            <h3 class="post-end-promotion-title">${promotion.returnGuestTitle}</h3>
            <div class="post-end-promotion-discount">${promotion.discount} YOUR STAY</div>
            <div class="post-end-promotion-code">Code: <strong>${promotion.code}</strong></div>
            <div class="post-end-promotion-validity">
                <p>Promotion applies to arrivals before ${promotion.validUntilFormatted}. Available for a limited time.<br>Excludes: ${blackoutList}.</p>
            </div>
            <a href="${promotion.bookingUrl}" class="post-end-promotion-button" target="_blank">Book with ${promotion.code}</a>
            <p class="post-end-promotion-terms">${promotion.restrictions}</p>
        </div>
    `;
}

/**
 * Generates HTML for the mobile promotion banner (shown above content on mobile)
 * @param {string} promotionId - The ID of the promotion to display
 * @returns {string} HTML string for mobile promotion banner
 */
function generateMobilePromotionBanner(promotionId) {
    // Get promotion by ID
    const promotion = promotionsData[promotionId];

    if (!promotion || !promotion.enabled) {
        return '';
    }

    return `
        <div class="mobile-promotion-banner">
            <div class="mobile-promotion-title">${promotion.title}</div>
            <div class="mobile-promotion-discount">${promotion.discount}</div>
            <a href="${promotion.bookingUrl}" class="mobile-promotion-button" target="_blank">Code: ${promotion.code}</a>
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
