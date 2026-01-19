// Blog Post Data
const posts = [
    {
        id: 1,
        title: "The Principles of Modern UI Design",
        category: "UI Design",
        author: "Alex Rivers",
        date: "Jan 15, 2026",
        image: "https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?q=80&w=800&auto=format&fit=crop",
        excerpt: "Learn the core principles that make a user interface visually appealing and easy to use. We dive into hierarchy, spacing, and color theory.",
        content: `
            <p>Modern UI design is more than just making things look "pretty." it's about creating a functional, intuitive, and enjoyable experience for the user. In this post, we'll explore the fundamental principles that every designer should master.</p>
            
            <h2>1. Visual Hierarchy</h2>
            <p>Visual hierarchy is the arrangement of elements in a way that implies importance. By using size, color, and placement, you can guide the user's eye to the most critical information first. For example, a primary Call-to-Action (CTA) button should stand out more than a secondary one.</p>
            
            <h2>2. White Space (Negative Space)</h2>
            <p>White space is the breathing room between elements. It helps reduce cognitive load and makes the content more readable. A clean, minimal layout often relies heavily on generous spacing to create a sense of elegance and focus.</p>
            
            <h2>3. Typography Matters</h2>
            <p>Choosing the right font is crucial for readability and brand identity. Sans-serif fonts like Inter or Roboto are popular for digital interfaces because they are legible at various sizes. Use consistent font weights and sizes to establish a clear structure.</p>
            
            <h2>4. Color Theory</h2>
            <p>Colors evoke emotions and can influence user behavior. Use a primary color for your main actions and neutral colors for backgrounds. Ensure there's enough contrast between text and background to meet accessibility standards (WCAG).</p>
        `,
        comments: [
            { name: "Sarah Chen", date: "Jan 16, 2026", text: "Great overview! I especially agree with the point about white space." }
        ]
    },
    {
        id: 2,
        title: "The Importance of User Research in UX",
        category: "UX Research",
        author: "Jordan Smith",
        date: "Jan 12, 2026",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
        excerpt: "Understanding your users is the foundation of great design. Discover how research helps in building products people actually need.",
        content: `
            <p>UX research is the systematic study of target users and their requirements, to add realistic contexts and insights to design processes. Without research, we are just guessing what the user wants.</p>
            
            <h2>Empathy is Key</h2>
            <p>The goal of UX research is to understand the "why" behind user behavior. By conducting interviews and surveys, designers can step into the users' shoes and identify pain points that might not be obvious at first glance.</p>
            
            <h2>User Personas</h2>
            <p>Creating personas helps the team stay focused on the user. A persona is a fictional character that represents a segment of your audience. It includes their goals, frustrations, and behaviors, serving as a reference point throughout the design cycle.</p>
            
            <h2>Usability Testing</h2>
            <p>Testing your designs with real users is the best way to validate your assumptions. Watch how they interact with your prototype. Where do they get stuck? What is confusing to them? This feedback is invaluable for iterative design.</p>
        `,
        comments: []
    },
    {
        id: 3,
        title: "Building Responsive and Accessible Interfaces",
        category: "Development",
        author: "Maria Garcia",
        date: "Jan 10, 2026",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
        excerpt: "In today's world, your website must work everywhere. Learn the best practices for responsiveness and digital accessibility.",
        content: `
            <p>With the variety of devices available today, from smartphones to large desktop monitors, responsive design is no longer optional. Furthermore, accessibility ensures that everyone, including people with disabilities, can use your site.</p>
            
            <h2>Mobile-First Approach</h2>
            <p>Starting with the smallest screen size forces you to prioritize the most important content. As the screen gets larger, you can introduce more complex layouts and additional elements using CSS media queries.</p>
            
            <h2>Flexible Grids and Layouts</h2>
            <p>Using CSS Grid and Flexbox allows you to create layouts that adapt fluidly to different screen widths. Avoid fixed widths; instead, use percentages or relative units like 'rem' and 'em'.</p>
            
            <h2>Accessibility (a11y)</h2>
            <p>Accessibility means making your site usable by everyone. This includes using semantic HTML (like <header>, <main>, <nav>), providing alt text for images, and ensuring your site is navigable via keyboard. Remember, accessibility is a right, not a feature.</p>
        `,
        comments: [
            { name: "Tom Baker", date: "Jan 11, 2026", text: "Mobile-first is definitely the way to go. Thanks for the tips on accessibility!" }
        ]
    }
];

// DOM Elements
const blogList = document.getElementById('blog-list');
const singlePostView = document.getElementById('single-post');
const postContent = document.getElementById('post-content');
const backBtn = document.getElementById('back-to-list');
const searchInput = document.getElementById('search-input');
const navLinks = document.querySelectorAll('.nav-link');
const commentForm = document.getElementById('comment-form');
const commentsDisplay = document.getElementById('comments-display');
const commentCount = document.getElementById('comment-count');
const homeLink = document.getElementById('home-link');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

let currentPostId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts(posts);
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.excerpt.toLowerCase().includes(searchTerm)
        );
        renderPosts(filteredPosts);
    });

    // Navigation links (Categories)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Filter posts
            if (category === 'all') {
                renderPosts(posts);
            } else {
                const filteredPosts = posts.filter(post => post.category === category);
                renderPosts(filteredPosts);
            }
            
            // Go back to list if in single post view
            showListView();
        });
    });

    // Back button
    backBtn.addEventListener('click', showListView);

    // Home link
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        renderPosts(posts);
        showListView();
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('active');
        }
    });

    // Comment submission
    commentForm.addEventListener('submit', handleCommentSubmit);
}

function renderPosts(postsToRender) {
    blogList.innerHTML = '';
    
    if (postsToRender.length === 0) {
        blogList.innerHTML = '<p class="no-results">No posts found matching your search.</p>';
        return;
    }

    postsToRender.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-img" loading="lazy" crossorigin="anonymous">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <i class="far fa-calendar"></i>
                    <span>${post.date}</span>
                    <span class="dot">•</span>
                    <i class="far fa-user"></i>
                    <span>${post.author}</span>
                </div>
            </div>
        `;
        postCard.addEventListener('click', () => showSinglePost(post.id));
        blogList.appendChild(postCard);
    });
}

function showSinglePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    currentPostId = postId;
    
    postContent.innerHTML = `
        <div class="single-post-header">
            <span class="post-category">${post.category}</span>
            <h1>${post.title}</h1>
            <div class="single-post-meta">
                <span>By <strong>${post.author}</strong></span>
                <span class="dot">•</span>
                <span>${post.date}</span>
            </div>
        </div>
        <img src="${post.image}" alt="${post.title}" class="single-post-img" crossorigin="anonymous">
        <div class="post-body">
            ${post.content}
        </div>
    `;

    renderComments(post.comments);
    
    blogList.classList.add('hidden');
    singlePostView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showListView() {
    blogList.classList.remove('hidden');
    singlePostView.classList.add('hidden');
    currentPostId = null;
}

function renderComments(comments) {
    commentsDisplay.innerHTML = '';
    commentCount.textContent = comments.length;

    if (comments.length === 0) {
        commentsDisplay.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
        return;
    }

    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
        `;
        commentsDisplay.appendChild(commentEl);
    });
}

function handleCommentSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('comment-name');
    const messageInput = document.getElementById('comment-message');
    
    const newComment = {
        name: nameInput.value,
        text: messageInput.value,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Find the post and add comment
    const postIndex = posts.findIndex(p => p.id === currentPostId);
    if (postIndex !== -1) {
        posts[postIndex].comments.push(newComment);
        renderComments(posts[postIndex].comments);
        
        // Clear form
        nameInput.value = '';
        messageInput.value = '';
    }
}
