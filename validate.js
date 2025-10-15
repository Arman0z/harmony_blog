#!/usr/bin/env node

/**
 * Content Validation Script for Harmony Apartments Blog
 *
 * This script validates blog-posts.json to catch errors before deployment.
 * Also validates promotions.json for backwards compatibility (now deprecated).
 * Run this before pushing changes to production.
 *
 * Usage: node validate.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

let errors = [];
let warnings = [];

function error(message) {
    errors.push(message);
    console.error(`${colors.red}❌ ERROR: ${message}${colors.reset}`);
}

function warn(message) {
    warnings.push(message);
    console.warn(`${colors.yellow}⚠️  WARNING: ${message}${colors.reset}`);
}

function success(message) {
    console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function info(message) {
    console.log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
}

/**
 * Validates blog posts
 */
function validateBlogPosts() {
    info('Validating blog-posts.json...');

    // Check if file exists
    const filePath = path.join(__dirname, 'blog-posts.json');
    if (!fs.existsSync(filePath)) {
        error('blog-posts.json file not found');
        return;
    }

    // Read and parse JSON
    let data;
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(content);
    } catch (err) {
        error(`Failed to parse blog-posts.json: ${err.message}`);
        return;
    }

    // Check if posts array exists
    if (!data.posts || !Array.isArray(data.posts)) {
        error('blog-posts.json must contain a "posts" array');
        return;
    }

    if (data.posts.length === 0) {
        warn('No blog posts found in blog-posts.json');
        return;
    }

    const seenIds = new Set();
    const seenTitles = new Set();

    data.posts.forEach((post, index) => {
        const postLabel = `Post #${index + 1} (ID: ${post.id || 'missing'})`;

        // Required fields validation
        if (!post.id && post.id !== 0) {
            error(`${postLabel}: Missing required field "id"`);
        } else if (typeof post.id !== 'number') {
            error(`${postLabel}: Field "id" must be a number`);
        } else if (seenIds.has(post.id)) {
            error(`${postLabel}: Duplicate ID ${post.id} detected`);
        } else {
            seenIds.add(post.id);
        }

        if (!post.title) {
            error(`${postLabel}: Missing required field "title"`);
        } else {
            if (post.title.length > 100) {
                warn(`${postLabel}: Title is very long (${post.title.length} chars). Consider shortening for better display.`);
            }
            if (seenTitles.has(post.title.toLowerCase())) {
                warn(`${postLabel}: Duplicate title detected: "${post.title}"`);
            }
            seenTitles.add(post.title.toLowerCase());
        }

        if (!post.excerpt) {
            error(`${postLabel}: Missing required field "excerpt"`);
        } else if (post.excerpt.length > 250) {
            warn(`${postLabel}: Excerpt is very long (${post.excerpt.length} chars). Consider shortening to 200 chars or less.`);
        }

        if (!post.content) {
            error(`${postLabel}: Missing required field "content"`);
        } else if (post.content.trim().length < 50) {
            warn(`${postLabel}: Content is very short (${post.content.trim().length} chars). Consider adding more content.`);
        }

        if (!post.date) {
            error(`${postLabel}: Missing required field "date"`);
        } else {
            // Validate date format (YYYY-MM-DD)
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(post.date)) {
                error(`${postLabel}: Invalid date format "${post.date}". Must be YYYY-MM-DD (e.g., 2025-10-15)`);
            } else {
                const postDate = new Date(post.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (isNaN(postDate.getTime())) {
                    error(`${postLabel}: Invalid date "${post.date}"`);
                } else if (postDate > today) {
                    info(`${postLabel}: Post is scheduled for future publication (${post.date})`);
                }
            }
        }

        if (!post.category) {
            error(`${postLabel}: Missing required field "category"`);
        } else if (post.category.trim().length === 0) {
            error(`${postLabel}: Field "category" cannot be empty`);
        }

        // Optional fields validation
        if (post.image) {
            const imagePath = path.join(__dirname, post.image);
            if (!fs.existsSync(imagePath)) {
                error(`${postLabel}: Referenced image "${post.image}" does not exist`);
            } else {
                // Check file size
                const stats = fs.statSync(imagePath);
                const fileSizeInMB = stats.size / (1024 * 1024);
                if (fileSizeInMB > 1) {
                    warn(`${postLabel}: Image "${post.image}" is large (${fileSizeInMB.toFixed(2)} MB). Consider optimizing for web.`);
                }
            }
        }

        if (post.author && post.author.trim().length === 0) {
            warn(`${postLabel}: Field "author" is empty, consider removing or filling it`);
        }

        // Validate promotionId (optional field in multi-promotion system)
        if (post.promotionId) {
            if (typeof post.promotionId !== 'string') {
                error(`${postLabel}: Field "promotionId" must be a string`);
            } else if (post.promotionId.trim().length === 0) {
                warn(`${postLabel}: Field "promotionId" is empty, consider removing it`);
            }
            // Note: Cross-check with promotions.json is done in validatePromotions()
        }
    });

    success(`Validated ${data.posts.length} blog post(s)`);
}

/**
 * Validates promotions configuration
 * Multi-Promotion System: Validates all promotions in the promotions object
 */
function validatePromotions() {
    info('Validating promotions.json...');

    // Check if file exists
    const filePath = path.join(__dirname, 'promotions.json');
    if (!fs.existsSync(filePath)) {
        error('promotions.json file not found');
        return;
    }

    // Read and parse JSON
    let data;
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(content);
    } catch (err) {
        error(`Failed to parse promotions.json: ${err.message}`);
        return;
    }

    // Check if promotions object exists
    if (!data.promotions) {
        error('promotions.json must contain a "promotions" object');
        return;
    }

    if (typeof data.promotions !== 'object' || Array.isArray(data.promotions)) {
        error('promotions.json "promotions" must be an object (not an array)');
        return;
    }

    const promotionIds = Object.keys(data.promotions);

    if (promotionIds.length === 0) {
        warn('No promotions found in promotions.json');
        return;
    }

    // Required fields for each promotion
    const requiredFields = ['enabled', 'code', 'discount', 'title', 'returnGuestTitle',
                           'validUntil', 'validUntilFormatted', 'blackoutDates',
                           'bookingUrl', 'restrictions', 'showBannerOnListing'];

    // Validate each promotion
    promotionIds.forEach(promoId => {
        const promo = data.promotions[promoId];
        const promoLabel = `Promotion "${promoId}"`;

        // Check if promotion is an object
        if (typeof promo !== 'object' || Array.isArray(promo)) {
            error(`${promoLabel}: Must be an object`);
            return;
        }

        // Validate required fields
        requiredFields.forEach(field => {
            if (!(field in promo)) {
                error(`${promoLabel}: Missing required field "${field}"`);
            }
        });

        // Validate enabled
        if (typeof promo.enabled !== 'boolean') {
            error(`${promoLabel}: Field "enabled" must be true or false`);
        }

        // Validate code
        if (promo.code && promo.code !== promoId) {
            warn(`${promoLabel}: Promotion code "${promo.code}" doesn't match key "${promoId}". Consider using the same value.`);
        }

        // Validate showBannerOnListing
        if (typeof promo.showBannerOnListing !== 'boolean') {
            error(`${promoLabel}: Field "showBannerOnListing" must be true or false`);
        }

        // Validate dates
        if (promo.validUntil) {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(promo.validUntil)) {
                error(`${promoLabel}: Invalid validUntil format "${promo.validUntil}". Must be YYYY-MM-DD`);
            } else {
                const validDate = new Date(promo.validUntil);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (validDate < today && promo.enabled) {
                    warn(`${promoLabel}: validUntil date has passed, but promotion is still enabled`);
                }
            }
        }

        // Validate blackout dates
        if (promo.blackoutDates) {
            if (!Array.isArray(promo.blackoutDates)) {
                error(`${promoLabel}: Field "blackoutDates" must be an array`);
            } else {
                promo.blackoutDates.forEach((blackout, index) => {
                    if (!blackout.date || !blackout.name || !blackout.formatted) {
                        error(`${promoLabel}: Blackout date #${index + 1} is missing required fields (date, name, formatted)`);
                    }
                });
            }
        }

        // Validate URL
        if (promo.bookingUrl) {
            try {
                new URL(promo.bookingUrl);
            } catch (err) {
                error(`${promoLabel}: Invalid bookingUrl "${promo.bookingUrl}"`);
            }
        }
    });

    // Cross-reference with blog posts to check for orphaned promotionIds
    try {
        const postsContent = fs.readFileSync(path.join(__dirname, 'blog-posts.json'), 'utf8');
        const postsData = JSON.parse(postsContent);
        const referencedPromotions = new Set();

        postsData.posts.forEach(post => {
            if (post.promotionId) {
                referencedPromotions.add(post.promotionId);

                // Check if referenced promotion exists
                if (!data.promotions[post.promotionId]) {
                    error(`Post #${post.id} references non-existent promotion "${post.promotionId}"`);
                } else if (!data.promotions[post.promotionId].enabled) {
                    warn(`Post #${post.id} references disabled promotion "${post.promotionId}"`);
                }
            }
        });

        // Check for unused promotions
        promotionIds.forEach(promoId => {
            if (!referencedPromotions.has(promoId) && data.promotions[promoId].enabled) {
                info(`Promotion "${promoId}" is enabled but not referenced by any blog post`);
            }
        });
    } catch (err) {
        // Already reported in blog posts validation
    }

    success(`Validated ${promotionIds.length} promotion(s)`);
}

/**
 * Validates that the public directory exists and contains expected files
 */
function validatePublicDirectory() {
    info('Validating public directory...');

    const publicDir = path.join(__dirname, 'public');

    if (!fs.existsSync(publicDir)) {
        error('public directory not found');
        return;
    }

    const requiredFiles = ['logo.png', 'trans_logo.png', 'favicon.ico'];
    requiredFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        if (!fs.existsSync(filePath)) {
            warn(`Expected file "public/${file}" not found`);
        }
    });

    success('Public directory validated');
}

/**
 * Main validation function
 */
function main() {
    console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.blue}   Harmony Apartments Blog - Content Validation${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

    validateBlogPosts();
    console.log();
    validatePromotions();
    console.log();
    validatePublicDirectory();

    // Summary
    console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.blue}   Validation Summary${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

    if (errors.length === 0 && warnings.length === 0) {
        success('All validation checks passed! ✨');
        console.log(`${colors.green}Your content is ready to deploy.${colors.reset}\n`);
        process.exit(0);
    } else {
        if (errors.length > 0) {
            console.log(`${colors.red}Found ${errors.length} error(s)${colors.reset}`);
        }
        if (warnings.length > 0) {
            console.log(`${colors.yellow}Found ${warnings.length} warning(s)${colors.reset}`);
        }

        if (errors.length > 0) {
            console.log(`\n${colors.red}❌ Validation FAILED - Please fix the errors before deploying.${colors.reset}\n`);
            process.exit(1);
        } else {
            console.log(`\n${colors.yellow}⚠️  Validation passed with warnings - Review warnings before deploying.${colors.reset}\n`);
            process.exit(0);
        }
    }
}

// Run validation
main();
