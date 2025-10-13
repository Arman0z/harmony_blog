// Blog Application JavaScript
// Main functionality for rendering and managing blog posts

// Configuration
const POSTS_PER_PAGE = 6;
let currentPage = 1;
let filteredPosts = [...blogPosts];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeScrollNav();
});

function initializeApp() {
    // Render initial blog posts
    renderBlogPosts();

    // Setup event listeners
    setupEventListeners();
}

function initializeScrollNav() {
    const scrollNav = document.getElementById('scrollNav');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Show nav when scrolled down more than 100px
        if (currentScrollPosition > 100) {
            scrollNav.classList.add('visible');
        } else {
            scrollNav.classList.remove('visible');
        }

        lastScrollPosition = currentScrollPosition;
    });
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();

    // Filter posts based on search
    filteredPosts = blogPosts.filter(post => {
        return post.title.toLowerCase().includes(searchTerm) ||
               post.excerpt.toLowerCase().includes(searchTerm) ||
               post.content.toLowerCase().includes(searchTerm);
    });

    currentPage = 1;
    renderBlogPosts();
}

function renderBlogPosts() {
    const container = document.getElementById('blogPostsContainer');

    // Calculate pagination
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    // Clear container
    container.innerHTML = '';

    // Check if there are posts to display
    if (postsToShow.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No posts found</h3>
                <p>Try adjusting your search</p>
            </div>
        `;
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    // Render each post
    postsToShow.forEach(post => {
        const postCard = createPostCard(post);
        container.appendChild(postCard);
    });

    // Render pagination
    renderPagination();
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';

    // Format date
    const formattedDate = formatDate(post.date);

    // Create image element or placeholder with promotion banner for specific posts
    let imageHTML;
    if (post.image) {
        // Check if this post should have a promotion banner (NYC post has id: 1)
        if (post.id === 1) {
            imageHTML = `
                <div class="blog-card-image-container">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-image">
                    <div class="promotion-banner">PROMOTION</div>
                </div>
            `;
        } else {
            imageHTML = `<img src="${post.image}" alt="${post.title}" class="blog-card-image">`;
        }
    } else {
        imageHTML = `<div class="blog-card-image"></div>`;
    }

    card.innerHTML = `
        ${imageHTML}
        <div class="blog-card-content">
            <div class="blog-card-meta">
                <span class="blog-card-date">${formattedDate}</span>
            </div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
        </div>
        <button class="blog-card-button">Read Full Article</button>
    `;

    // Add click handler to navigate to individual post page
    card.onclick = () => {
        window.location.href = `post.html?id=${post.id}`;
    };

    return card;
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    // Don't show pagination if only one page
    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(currentPage - 1);
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.onclick = () => changePage(i);
        paginationContainer.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => changePage(currentPage + 1);
    paginationContainer.appendChild(nextBtn);
}

function changePage(page) {
    currentPage = page;
    renderBlogPosts();

    // Scroll to top of blog posts
    document.getElementById('blogPostsContainer').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Utility function to add a new blog post programmatically
// This can be useful for future integrations or admin panels
function addBlogPost(postData) {
    const newPost = {
        id: blogPosts.length + 1,
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        date: postData.date || new Date().toISOString().split('T')[0],
        image: postData.image || ''
    };

    blogPosts.unshift(newPost); // Add to beginning of array
    filteredPosts = [...blogPosts];
    currentPage = 1;
    renderBlogPosts();

    return newPost;
}
