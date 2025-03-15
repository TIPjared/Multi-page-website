const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for different pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

app.get('/api/posts', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'posts.json');

    if (!fs.existsSync(filePath)) {
        console.error('❌ posts.json file not found!');
        return res.status(500).json({ error: 'posts.json file not found' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading posts.json:', err.message);
            return res.status(500).json({ error: 'Failed to load posts' });
        }

        try {
            const posts = JSON.parse(data);
            res.json(posts);
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', parseError.message);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
