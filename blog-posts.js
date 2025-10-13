// Blog Posts Data Structure
// To add a new blog post, simply add a new object to this array following the same structure

const blogPosts = [
    {
        id: 1,
        title: "5 Reasons to Visit NYC in the Fall",
        excerpt: "Experience NYC's fall colors, culture, and markets while staying minutes away at Harmony Apartments Hoboken — your calm, family-friendly base near Manhattan.",
        content: `
            <h3>The City During it's Most Beautiful Time</h3>
            <p>Autumn flips New York into high gear. Golden parks. Brisk waterfront walks. New seasons for Broadway and museums. Stay just across the Hudson at Harmony Apartments Hoboken to enjoy it all without Manhattan noise or prices.</p>

            <h2>5 Reasons to Visit NYC in the Fall</h2>

            <h3>1. Central Park Foliage</h3>
            <p>Peak color late Oct–mid Nov; easy photo spots and lake views. The fall foliage transforms Central Park into a breathtaking canvas of gold, orange, and red hues.</p>

            <h3>2. Cultural Openings</h3>
            <p>Opera, orchestras, new museum exhibitions, Broadway premieres. Fall marks the beginning of a new cultural season in New York City, with world-class performances and exhibitions opening throughout the city.</p>

            <h3>3. Outdoor Markets</h3>
            <p>The official NYC fall listings highlight festivals and artisan fairs. From Union Square to Brooklyn, autumn markets showcase local crafts, seasonal produce, and unique finds.</p>

            <h3>4. Comfort-Food Season</h3>
            <p>Rooftop brunches, warm pastries, cozy dinners; Hoboken has skyline-view options. As temperatures cool, NYC's culinary scene shines with seasonal menus and warm, comforting dishes.</p>

            <h3>5. Waterfront Walks</h3>
            <p>Hoboken's Pier A to Jersey City's Liberty State Park for crisp, crowd-light strolls. Enjoy spectacular views of the Manhattan skyline with fewer tourists and perfect fall weather.</p>

            <h2>Your Best Home Base</h2>
            <p>Spacious apartments with full kitchens and living rooms. PATH and ferry get you to Midtown or Downtown in minutes. Quiet nights. Skyline mornings.</p>

            <p>Harmony Apartments Hoboken offers the perfect combination of luxury, comfort, and convenience. Experience all that NYC has to offer in the fall, then return to your peaceful retreat just across the river.</p>
        `,
        author: "Harmony Apartments",
        date: "2025-10-11",
        category: "Travel & Local",
        image: "public/blog1.jpg"
    }
];

// Get all unique categories from blog posts
function getAllCategories() {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    return categories.sort();
}
