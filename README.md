# Harmony Apartments Blog

A clean, maintainable blog website for Harmony Apartments short-term rentals in Hoboken, NJ. Built with vanilla HTML, CSS, and JavaScript for simplicity and ease of content management.

`python3 -m http.server 8000`

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Getting Started](#getting-started)
3. [File Structure](#file-structure)
4. [Content Management](#content-management)
   - [Adding a New Blog Post](#adding-a-new-blog-post)
   - [Updating an Existing Post](#updating-an-existing-post)
   - [Deleting a Post](#deleting-a-post)
5. [Promotion Management](#promotion-management)
6. [Image Management](#image-management)
7. [Validation Before Deployment](#validation-before-deployment)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Technical Details](#technical-details)

---

## System Overview

### What This Is

This is a blog website designed to showcase content about Harmony Apartments and the NYC/Hoboken area. It includes:
- Blog post listing page with search and pagination
- Individual blog post pages with related articles
- Dynamic promotion system
- Mobile-responsive design
- Content validation before deployment

### Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Content Storage**: JSON files (blog-posts.json, promotions.json)
- **Validation**: Node.js script
- **No Build System**: Simple, direct file structure
- **No Dependencies**: Pure vanilla JavaScript

### Key Features

✅ **Content Separated from Code** - Non-developers can edit JSON files safely
✅ **Flexible Promotions** - Each post can have unique, customized promotions
✅ **Pre-Deployment Validation** - Catch errors before they go live
✅ **Clear Templates** - Easy to copy and create new posts
✅ **Search & Pagination** - User-friendly blog browsing
✅ **Mobile Responsive** - Works on all devices

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - Only needed for validation script
- **Web Server** - For local testing (Python SimpleHTTPServer, VS Code Live Server, etc.)
- **Text Editor** - Any editor (VS Code, Sublime, Notepad++, etc.)

### Local Development Setup

1. **Clone or download this repository**

2. **Start a local web server** (required for JSON file loading)

   Using Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   Or using Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   Or using npm:
   ```bash
   npm run serve
   ```

   Or using VS Code: Install "Live Server" extension and click "Go Live"

3. **Open in browser**

   Navigate to `http://localhost:8000`

4. **You're ready!** The blog should load with the existing content.

---

## File Structure

```
harmony_blog/
│
├── index.html              # Blog listing page
├── post.html               # Individual blog post page
├── style.css               # All styling (1200+ lines)
│
├── blog-posts.json         # 📝 BLOG CONTENT (edit this to add posts)
├── promotions.json         # 🎟️ PROMOTIONS (multi-promotion configuration)
├── post-template.json      # Template for new posts (reference only)
│
├── data-loader.js          # Utility to load JSON data
├── script.js               # Blog listing page logic
├── post.js                 # Individual post page logic
│
├── validate.js             # Content validation script
├── package.json            # Project metadata and scripts
├── README.md               # This file
│
└── public/                 # Images and assets
    ├── logo.png
    ├── trans_logo.png
    ├── favicon.ico
    ├── banner1.jpeg
    ├── banner2.jpeg
    ├── banner3.jpeg
    └── blog1.jpg           # Blog post images
```

### Files You'll Edit Regularly

- **blog-posts.json** - Add, update, or remove blog posts (including promotions)
- **public/** - Add new images for blog posts

### Files You'll Rarely Edit

- **HTML files** - Only if changing page structure
- **CSS files** - Only if changing design/styling
- **JS files** - Only if adding new features

---

## Content Management

### Adding a New Blog Post

**Step-by-step guide:**

#### 1. Prepare Your Content

Before editing any files, have ready:
- ✅ Post title (under 100 characters recommended)
- ✅ Short excerpt (2-3 sentences, under 200 characters)
- ✅ Main content (written or drafted)
- ✅ Featured image (optional, but recommended)
- ✅ Category (e.g., "Travel & Local", "Events", "Guides")

#### 2. Upload Your Image (if using one)

1. Optimize your image:
   - **Recommended size**: 1200x600px minimum
   - **Format**: JPG (best for photos)
   - **File size**: Under 500KB (compress if needed)
   - **Naming**: Use descriptive names (e.g., `summer-hoboken-2025.jpg`)

2. Upload to the `public/` folder

3. Note the path: `public/your-image-name.jpg`

#### 3. Open post-template.json

This file shows you the structure and explains each field. Use it as a reference.

#### 4. Open blog-posts.json

This file contains all blog posts. It looks like this:

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Existing Post Title",
      "excerpt": "...",
      "content": "...",
      ...
    }
  ]
}
```

#### 5. Add Your New Post

**IMPORTANT**: Add new posts at the **beginning** of the array (after the opening `[` bracket) so they appear first.

```json
{
  "posts": [
    {
      "id": 2,
      "title": "Your New Post Title",
      "excerpt": "A brief 2-3 sentence summary that appears on the listing page.",
      "content": "\n            <h3>Introduction</h3>\n            <p>Your introduction paragraph here...</p>\n\n            <h2>Main Section</h2>\n\n            <h3>Subsection 1</h3>\n            <p>Content for subsection 1...</p>\n\n            <h3>Subsection 2</h3>\n            <p>Content for subsection 2...</p>\n        ",
      "author": "Harmony Apartments",
      "date": "2025-10-15",
      "category": "Travel & Local",
      "image": "public/your-image.jpg"
    },
    {
      "id": 1,
      "title": "Existing Post Title",
      ...
    }
  ]
}
```

#### 6. Fill in the Fields

**Required Fields:**

- **id**: Use the next available number (look at existing posts and use highest ID + 1)
- **title**: Your post title
- **excerpt**: Brief summary (shows on listing page)
- **content**: Main post content (see formatting tips below)
- **date**: Publication date in YYYY-MM-DD format (e.g., "2025-10-15")
- **category**: Choose from existing or create new (e.g., "Travel & Local")

**Optional Fields:**

- **author**: Default is "Harmony Apartments", change if needed
- **image**: Path to featured image (e.g., "public/blog2.jpg")

#### 7. Content Formatting Tips

Your content should be HTML. Here's a template:

```html
<h3>Catchy Opening Headline</h3>
<p>Introduction paragraph that hooks the reader...</p>

<h2>Main Topic Section</h2>

<h3>1. First Point</h3>
<p>Explanation of first point with details...</p>

<h3>2. Second Point</h3>
<p>Explanation of second point...</p>

<h3>3. Third Point</h3>
<p>You get the idea...</p>

<h2>Conclusion</h2>
<p>Wrap up paragraph that ties everything together and includes a call to action.</p>
```

**HTML you can use:**
- `<h2>` for major sections
- `<h3>` for subsections
- `<p>` for paragraphs
- `<strong>text</strong>` for bold
- `<em>text</em>` for italics
- `<a href="URL">link text</a>` for links
- `<ul><li>item</li></ul>` for bullet lists
- `<ol><li>item</li></ol>` for numbered lists

**Special note on quotes in JSON:**
- Your content is inside double quotes: `"content": "..."`
- If you need quotes inside your content, use single quotes: `<a href='URL'>`
- Or escape double quotes: `<a href=\"URL\">`

#### 8. Save the File

Make sure your JSON is valid:
- All quotes are closed
- All braces `{}` and brackets `[]` are matched
- Commas between objects (but NOT after the last one)

#### 9. Validate Your Changes

**ALWAYS run validation before deploying:**

```bash
node validate.js
```

This will check for:
- ✅ Valid JSON syntax
- ✅ Required fields present
- ✅ Unique IDs
- ✅ Valid date formats
- ✅ Image files exist
- ✅ No duplicate titles

#### 10. Test Locally

1. Start your local server (if not already running)
2. Refresh the page
3. Check that your post appears
4. Click through to read it
5. Verify images load
6. Test on mobile (resize browser window)

#### 11. Deploy

Once validated and tested, deploy your changes (see [Deployment](#deployment) section).

---

### Complete Example: Adding a New Post

```json
{
  "posts": [
    {
      "id": 2,
      "title": "Top 10 Summer Activities in Hoboken",
      "excerpt": "Beat the heat with these amazing summer activities in Hoboken. From waterfront festivals to rooftop dining, discover the best of summer in our neighborhood.",
      "content": "\n            <h3>Summer in Hoboken</h3>\n            <p>Summer transforms Hoboken into a vibrant hub of outdoor activities, waterfront events, and al fresco dining. Here are our top 10 picks for making the most of the season.</p>\n\n            <h2>Top 10 Summer Activities</h2>\n\n            <h3>1. Pier A Park Concerts</h3>\n            <p>Free outdoor concerts every Thursday evening with stunning Manhattan skyline views. Bring a blanket and enjoy live music as the sun sets over the Hudson.</p>\n\n            <h3>2. Hoboken Farmers Market</h3>\n            <p>Every Tuesday and Saturday, local farmers bring fresh produce, artisanal goods, and prepared foods. Perfect for stocking your Harmony Apartments kitchen!</p>\n\n            <h3>3. Kayaking on the Hudson</h3>\n            <p>Rent kayaks at the waterfront and paddle along the Hudson River. An unforgettable perspective of the NYC skyline.</p>\n\n            <h2>Stay Cool at Harmony Apartments</h2>\n            <p>After a day of summer adventures, return to your air-conditioned apartment with full kitchen, comfortable living space, and all the amenities of home. Book your summer stay today!</p>\n        ",
      "author": "Harmony Apartments",
      "date": "2025-06-01",
      "category": "Seasonal",
      "image": "public/summer-hoboken-2025.jpg"
    },
    {
      "id": 1,
      "title": "5 Reasons to Visit NYC in the Fall",
      ...existing post...
    }
  ]
}
```

---

### Updating an Existing Post

**To update a post:**

1. Open `blog-posts.json`
2. Find the post by ID or title
3. Edit the fields you want to change
4. Save the file
5. Run validation: `node validate.js`
6. Test locally
7. Deploy

**Common updates:**
- Fixing typos: Edit `title`, `excerpt`, or `content`
- Updating dates: Change `date` field
- Replacing image: Upload new image, update `image` field
- Changing category: Update `category` field

---

### Deleting a Post

**To remove a post:**

1. Open `blog-posts.json`
2. Find the post object
3. Delete the entire object (from `{` to `}`)
4. Make sure commas are correct (objects should be separated by commas, but no comma after the last one)
5. Save the file
6. Run validation: `node validate.js`
7. Deploy

**Example:**

```json
// BEFORE (3 posts):
{
  "posts": [
    { "id": 3, "title": "Post 3" },
    { "id": 2, "title": "Post 2" },  ← We want to delete this
    { "id": 1, "title": "Post 1" }
  ]
}

// AFTER (2 posts):
{
  "posts": [
    { "id": 3, "title": "Post 3" },
    { "id": 1, "title": "Post 1" }
  ]
}
```

---

## Promotion Management

### How the Multi-Promotion System Works

The blog uses a **multi-promotion system** that allows you to:
- ✅ Create unlimited promotions in `promotions.json`
- ✅ Assign different promotions to different blog posts
- ✅ Display promotions in 3 locations: listing page banner, sidebar, and end-of-post
- ✅ Enable/disable promotions individually
- ✅ Manage all promotions from one central file

**Architecture:**
1. **promotions.json** - Contains all available promotions
2. **blog-posts.json** - Each post references a promotion via `promotionId`
3. **data-loader.js** - Dynamically generates promotion HTML based on references
4. **Validation** - Ensures promotionIds reference existing, valid promotions

### Promotion Display Locations

Each promotion can appear in three places:

1. **Listing Page Banner** - "PROMOTION" badge on blog card (controlled by `showBannerOnListing`)
2. **Sidebar Box** - Promotion details in right sidebar on post page
3. **End of Post** - Promotion box at the end of article content

### Creating a New Promotion

#### Step 1: Add Promotion to promotions.json

Open `promotions.json` and add your promotion to the `promotions` object:

```json
{
  "_comment": "Multi-Promotion System...",
  "promotions": {
    "WELCOMEBACK": {
      "enabled": true,
      "code": "WELCOMEBACK",
      "discount": "15% OFF",
      "title": "Limited Time Offer:",
      "returnGuestTitle": "Returning Guest Exclusive:",
      "validUntil": "2025-12-15",
      "validUntilFormatted": "December 15, 2025",
      "blackoutDates": [
        {
          "date": "2025-11-27",
          "name": "Thanksgiving",
          "formatted": "November 27"
        }
      ],
      "bookingUrl": "https://reserve.hobokenvacationrentals.com/",
      "restrictions": "Cannot be combined with other offers. Subject to availability.",
      "showBannerOnListing": true
    },
    "YOURNEWPROMO": {
      "enabled": true,
      "code": "YOURNEWPROMO",
      "discount": "20% OFF",
      "title": "Special Offer:",
      "returnGuestTitle": "Exclusive Deal:",
      "validUntil": "2026-03-31",
      "validUntilFormatted": "March 31, 2026",
      "blackoutDates": [],
      "bookingUrl": "https://reserve.hobokenvacationrentals.com/",
      "restrictions": "Terms and conditions apply.",
      "showBannerOnListing": false
    }
  }
}
```

#### Step 2: Assign Promotion to Blog Post

In `blog-posts.json`, add the `promotionId` field to your post:

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Your Blog Post",
      "excerpt": "...",
      "content": "...",
      "date": "2025-10-15",
      "category": "Travel & Local",
      "image": "public/image.jpg",
      "promotionId": "YOURNEWPROMO"
    }
  ]
}
```

#### Step 3: Validate and Deploy

```bash
node validate.js
```

The validation script will:
- ✅ Check that `YOURNEWPROMO` exists in promotions.json
- ✅ Verify all required promotion fields are present
- ✅ Warn if promotion is disabled
- ✅ Validate dates and URLs

### Promotion Field Reference

**Required Fields:**

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `enabled` | boolean | Whether promotion is active | `true` |
| `code` | string | Promotion code (should match key) | `"FALL15"` |
| `discount` | string | Discount amount/description | `"15% OFF"` |
| `title` | string | Title shown in sidebar | `"Limited Time Offer:"` |
| `returnGuestTitle` | string | Title shown at end of post | `"Returning Guest Exclusive:"` |
| `validUntil` | string | Expiration date (YYYY-MM-DD) | `"2025-12-31"` |
| `validUntilFormatted` | string | Human-readable expiration | `"December 31, 2025"` |
| `blackoutDates` | array | Dates when promotion doesn't apply | See example below |
| `bookingUrl` | string | Full URL to booking page | `"https://..."` |
| `restrictions` | string | Terms and conditions text | `"Cannot be combined..."` |
| `showBannerOnListing` | boolean | Show "PROMOTION" badge on blog listing | `true` |

**Blackout Dates Format:**

```json
"blackoutDates": [
  {
    "date": "2025-12-25",
    "name": "Christmas",
    "formatted": "December 25"
  },
  {
    "date": "2025-12-31",
    "name": "New Year's Eve",
    "formatted": "December 31"
  }
]
```

### Assigning Promotions to Posts

**Option 1: Assign a promotion**
```json
{
  "id": 1,
  "title": "Blog Post Title",
  "promotionId": "FALL15"
}
```

**Option 2: No promotion**
```json
{
  "id": 2,
  "title": "Blog Post Title"
}
```
Simply omit the `promotionId` field and no promotion will display.

### Updating an Existing Promotion

**To change promotion details across all posts using it:**

1. Open `promotions.json`
2. Find the promotion by its key (e.g., `"FALL15"`)
3. Update the fields you want to change
4. Save the file
5. Run `node validate.js`
6. Deploy

**All posts with `"promotionId": "FALL15"` will automatically show the updated promotion.**

### Disabling a Promotion

**To temporarily disable without deleting:**

```json
"FALL15": {
  "enabled": false,
  ...
}
```

Posts referencing this promotion won't show any promotion content. The validation script will warn you about posts referencing disabled promotions.

### Deleting a Promotion

1. Remove the promotion from `promotions.json`
2. Find all posts with that `promotionId` in `blog-posts.json`
3. Either:
   - Remove the `promotionId` field (no promotion)
   - Change to a different `promotionId` (different promotion)
4. Run `node validate.js` - it will error if posts reference non-existent promotions
5. Deploy

### Common Promotion Workflows

**Scenario 1: Seasonal Promotion**
```json
// Create summer promotion
"SUMMER25": {
  "enabled": true,
  "code": "SUMMER25",
  "validUntil": "2025-08-31",
  ...
}

// Assign to summer-related posts
{
  "id": 5,
  "title": "Best Summer Activities in NYC",
  "promotionId": "SUMMER25"
}
```

**Scenario 2: Different Promotions for New vs. Returning Guests**
```json
// In promotions.json:
"WELCOME15": { ... },
"WELCOMEBACK": { ... }

// In blog-posts.json:
{
  "id": 1,
  "title": "First Time Visiting NYC?",
  "promotionId": "WELCOME15"
},
{
  "id": 2,
  "title": "5 Reasons to Return to NYC",
  "promotionId": "WELCOMEBACK"
}
```

**Scenario 3: Flash Sale**
```json
// Quickly enable a flash sale
"FLASH48": {
  "enabled": true,
  "code": "FLASH48",
  "discount": "25% OFF",
  "validUntil": "2025-10-20",
  ...
}

// Assign to all current posts
// Later, just set "enabled": false to end sale
```

### Best Practices

1. **Promotion Keys**: Use uppercase, descriptive names (e.g., `FALL15`, `WELCOMEBACK`)
2. **Consistency**: Keep `code` field matching the promotion key
3. **Expiration**: Always set realistic `validUntil` dates
4. **Testing**: Run validation after any promotion changes
5. **Documentation**: Use the `_comment` field in promotions.json for notes
6. **Cleanup**: Periodically remove expired promotions
7. **Banner Control**: Use `showBannerOnListing: true` sparingly to highlight special offers

### Troubleshooting Promotions

**Promotion not showing on post:**
- Check `enabled: true` in promotions.json
- Verify `promotionId` in blog post matches promotion key exactly (case-sensitive)
- Run `node validate.js` to check for errors

**Validation error "references non-existent promotion":**
- The promotionId in your blog post doesn't exist in promotions.json
- Check spelling and capitalization
- Add the promotion to promotions.json or fix the typo

**Validation warning "references disabled promotion":**
- The promotion exists but has `enabled: false`
- Either enable the promotion or remove promotionId from the post

**"PROMOTION" banner not showing on listing page:**
- Check `showBannerOnListing: true` in the promotion configuration
- Verify promotion is enabled

---

## Image Management

### Image Requirements

**For best results:**
- **Minimum size**: 1200x600px (2:1 aspect ratio)
- **Format**: JPG for photos, PNG for graphics with transparency
- **File size**: Under 500KB (compress if larger)
- **Quality**: High enough for retina displays

### Naming Conventions

Use descriptive, lowercase names with hyphens:

✅ Good:
- `summer-activities-hoboken-2025.jpg`
- `fall-foliage-central-park.jpg`
- `holiday-events-nyc.jpg`

❌ Avoid:
- `IMG_1234.jpg`
- `Screen Shot 2025-10-15.png`
- `blog post image.jpg` (spaces)

### Optimizing Images

Before uploading, compress images:

**Online tools:**
- [TinyPNG](https://tinypng.com/) - Excellent compression
- [Squoosh](https://squoosh.app/) - More control
- [Compressor.io](https://compressor.io/) - Simple interface

**Command line (macOS/Linux):**
```bash
# Install ImageMagick
brew install imagemagick

# Resize and compress
convert input.jpg -resize 1200x600^ -quality 85 output.jpg
```

### Adding Images

1. **Optimize image** (see above)
2. **Upload to** `public/` folder
3. **Reference in blog post**:
   ```json
   "image": "public/your-image-name.jpg"
   ```

### Image Placement

Images appear as:
- **Hero image** at top of post page (full width)
- **Card thumbnail** on listing page
- Images are automatically cropped/resized via CSS

---

## Validation Before Deployment

**ALWAYS validate before deploying** to catch errors early.

### Running Validation

```bash
node validate.js
```

### What It Checks

✅ Valid JSON syntax
✅ Required fields present
✅ Unique post IDs
✅ Valid date formats (YYYY-MM-DD)
✅ Image files exist
✅ No empty content
✅ Promotion configuration complete
✅ Referenced post IDs exist
✅ Valid URLs

### Understanding Output

**Success:**
```
✅ Validated 2 blog post(s)
✅ Promotions configuration validated
✅ Public directory validated

✅ All validation checks passed! ✨
Your content is ready to deploy.
```

**Errors:**
```
❌ ERROR: Post #2 (ID: 2): Invalid date format "2025-13-45"
❌ ERROR: Post #2 (ID: 2): Referenced image "public/missing.jpg" does not exist

❌ Validation FAILED - Please fix the errors before deploying.
```

**Warnings:**
```
⚠️  WARNING: Post #1 (ID: 1): Title is very long (127 chars)
⚠️  WARNING: Post #2 (ID: 2): Image "public/blog2.jpg" is large (2.45 MB)

⚠️ Validation passed with warnings - Review warnings before deploying.
```

### Common Validation Errors

**"Failed to parse blog-posts.json"**
- Syntax error in JSON (missing quote, comma, bracket)
- Use a JSON validator: [JSONLint](https://jsonlint.com/)

**"Duplicate ID detected"**
- Two posts have the same ID
- Change one post's ID to a unique number

**"Invalid date format"**
- Date must be YYYY-MM-DD (e.g., "2025-10-15")
- Check month and day are valid

**"Referenced image does not exist"**
- Image path in `image` field doesn't match actual file
- Check spelling and make sure image is in `public/` folder

---

## Deployment

### Pre-Deployment Checklist

- [ ] All changes saved
- [ ] Validation passed (`node validate.js`)
- [ ] Tested locally in browser
- [ ] Checked on mobile/responsive view
- [ ] Images load correctly
- [ ] Links work
- [ ] Spelling/grammar checked

### Deployment Steps

**Method depends on your hosting:**

#### Option 1: GitHub Pages (if applicable)

```bash
git add .
git commit -m "Add new blog post: [Post Title]"
git push origin main
```

#### Option 2: FTP/SFTP Upload

1. Connect to your server via FTP client (FileZilla, Cyberduck, etc.)
2. Upload these files:
   - `blog-posts.json`
   - `promotions.json`
   - Any new images in `public/`
   - (Only if modified): HTML, CSS, JS files
3. Verify upload completed successfully

#### Option 3: Hosting Platform Deploy

Follow your hosting platform's deployment process (Netlify, Vercel, etc.)

### Post-Deployment Verification

After deploying:

1. **Visit live site**
2. **Check new post appears** on listing page
3. **Click through** to read full post
4. **Verify images load**
5. **Test promotions** display correctly
6. **Check on mobile device**

---

## Troubleshooting

### Blog posts not loading

**Symptoms:** Blank page or "Loading posts..." stuck

**Possible causes:**
1. **JSON syntax error**
   - Run `node validate.js` to check
   - Use [JSONLint](https://jsonlint.com/) to find syntax errors

2. **Not using a web server**
   - Can't open HTML file directly (file://)
   - Must use local server (see [Getting Started](#getting-started))

3. **JSON file path incorrect**
   - Check `data-loader.js` loads from correct location
   - Verify `blog-posts.json` exists in root directory

### Images not displaying

**Possible causes:**
1. **Image path wrong**
   - Check path in JSON matches actual file location
   - Should be `"public/filename.jpg"` (with public/ prefix)

2. **Image file missing**
   - Verify image exists in `public/` folder
   - Check spelling matches exactly (case-sensitive)

3. **Image too large**
   - Large images may load slowly
   - Compress to under 500KB

### Promotion not showing

**Check:**
1. **Is promotion enabled?**
   ```json
   "enabled": true
   ```

2. **Is post ID in applicablePosts?**
   ```json
   "applicablePosts": [1, 2]
   ```

3. **Valid dates?**
   - Check `validUntil` hasn't passed
   - Validate JSON structure

### Validation script errors

**"node: command not found"**
- Node.js not installed
- Install from [nodejs.org](https://nodejs.org/)

**"Cannot find module"**
- Run from project root directory
- Verify `validate.js` exists

### JSON syntax errors

**Common mistakes:**

❌ **Missing comma between objects:**
```json
{
  "id": 1,
  "title": "Post 1"
}
{
  "id": 2,
  "title": "Post 2"
}
```

✅ **Correct:**
```json
{
  "id": 1,
  "title": "Post 1"
},
{
  "id": 2,
  "title": "Post 2"
}
```

❌ **Trailing comma:**
```json
{
  "posts": [
    {"id": 1},
    {"id": 2},  ← Remove this comma
  ]
}
```

✅ **Correct:**
```json
{
  "posts": [
    {"id": 1},
    {"id": 2}
  ]
}
```

❌ **Unescaped quotes in content:**
```json
"content": "He said "hello" to me"
```

✅ **Correct (use single quotes inside):**
```json
"content": "He said 'hello' to me"
```

---

## Technical Details

### Architecture

**Data Flow:**
1. User visits page → HTML loads
2. Browser loads `data-loader.js`
3. `data-loader.js` fetches JSON files (blog-posts.json, promotions.json)
4. Page-specific JS (script.js or post.js) renders content
5. Promotions generated dynamically from config

**Why JSON files?**
- Separation of content and code
- Non-developers can safely edit
- No risk of breaking JavaScript
- Easy to validate
- Version control friendly

### Browser Compatibility

**Supported:**
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

**Uses modern JavaScript:**
- async/await
- fetch API
- Template literals
- Arrow functions

**Note:** Does not support IE11 or older browsers

### Performance Considerations

**Current limitations:**
- All posts load at once (client-side pagination)
- No lazy loading
- No image optimization pipeline

**Acceptable for:**
- Up to ~50 blog posts
- Images under 500KB each
- Most hosting scenarios

**If you exceed 50 posts**, consider:
- Static site generator (11ty, Hugo)
- Backend pagination
- Image CDN (Cloudinary)

### Security

**Safe practices:**
- Content is static (no user input)
- No database (no SQL injection)
- No server-side code (no code execution risks)
- JSON files have no executable code

**When editing JSON:**
- Don't copy/paste from untrusted sources
- Validate before deploying
- Use version control (git) for rollback

### Accessibility

**Current features:**
- Semantic HTML
- Alt text on images
- Keyboard navigation
- Color contrast meets WCAG AA

**Could be improved:**
- Add ARIA labels
- Add skip navigation links
- Improve heading hierarchy

---

## FAQ

**Q: Can I write posts in Markdown instead of HTML?**
A: Currently no, but you can add a Markdown parser library (marked.js) to convert Markdown to HTML. This would be a medium complexity enhancement.

**Q: Can multiple people edit posts at the same time?**
A: Not recommended. Use version control (git) and communicate with your team to avoid conflicts.

**Q: How do I schedule posts for future publication?**
A: Set the `date` field to a future date. The validation script will note it. However, the post will appear immediately when deployed. For true scheduling, you'd need a build system or CMS.

**Q: Can I add video or audio to posts?**
A: Yes! Use HTML5 video/audio tags in the `content` field:
```html
<video controls width='100%'>
  <source src='public/video.mp4' type='video/mp4'>
</video>
```

**Q: How do I add multiple authors?**
A: Just use different values in the `author` field for each post. To display author bios, you'd need to enhance the system with an authors configuration file.

**Q: Can I have different promotion codes for different posts?**
A: Yes! The multi-promotion system supports unlimited promotions. Create promotions in `promotions.json` and assign them to posts using the `promotionId` field. See the [Promotion Management](#promotion-management) section for details.

---

## Need Help?

**For technical issues:**
- Check the [Troubleshooting](#troubleshooting) section
- Verify your JSON syntax at [JSONLint](https://jsonlint.com/)
- Run `node validate.js` to find specific errors

**For content questions:**
- Reference the [Adding a New Blog Post](#adding-a-new-blog-post) guide
- Look at existing posts in `blog-posts.json` as examples
- Use `post-template.json` as a reference

**For development:**
- Review the [Technical Details](#technical-details) section
- Check inline code comments in JavaScript files
- Consider the architecture before making changes

---

## Changelog

### Version 3.0.0 (Current)
- 🎉 **NEW**: Multi-promotion system architecture
- ✨ Support unlimited simultaneous promotions in `promotions.json`
- ✨ Posts reference promotions via `promotionId` field
- ✨ Promotions display in 3 locations: banner, sidebar, end-of-post
- 🔧 Refactored data-loader.js with promotion-specific functions
- ✅ Enhanced validation for multi-promotion structure
- 📚 Comprehensive promotion management documentation
- 🚀 Scalable, bulletproof promotion system
- ⚡ Easy to add/edit/delete promotions without code changes

### Version 2.1.0
- 🔄 **BREAKING CHANGE**: Migrated promotions to hardcoded content in blog posts
- ⚠️ Deprecated centralized promotions.json system
- ✨ Each blog post can now have unique, customized promotions
- 📚 Updated documentation to reflect new promotion approach
- 🐛 Removed unused promotion rendering functions
- 💡 Added promotion styling examples and templates

### Version 2.0.0
- ✨ Migrated from JavaScript to JSON for content
- ✨ Added centralized promotion configuration
- ✨ Created validation script
- ✨ Added post template and comprehensive documentation
- 🐛 Fixed hardcoded promotion issues
- 🐛 Improved error handling
- 📚 Complete README with step-by-step guides

### Version 1.0.0
- Initial release
- Basic blog functionality
- Hardcoded content in JavaScript

---

**Last Updated:** October 2025
**Maintainer:** Harmony Apartments Team
**Version:** 3.0.0
