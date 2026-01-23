require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);

// Catch-all route for frontend
app.get('*any', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Seed Data
async function seedDatabase() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const seedData = [
                {
                    id: 'royal-velvet-suit',
                    category: 'Exquisite Suits',
                    title: 'Royal Velvet Suit',
                    description: 'Handcrafted with premium velvet, this suit embodies the elegance of Kings Willy Fashion.',
                    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f6ee?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['100% Premium Velvet', 'Silk inner lining', 'Tailored fit', 'Available in Royal Blue and Emerald'],
                    isFeatured: true
                },
                {
                    id: 'golden-silk-scarf',
                    category: 'Accessories',
                    title: 'Golden Silk Scarf',
                    description: 'A luxurious silk scarf with intricate golden patterns, perfect for adding a touch of royalty to any outfit.',
                    image: 'https://images.unsplash.com/photo-1584917469896-33d0adee63e0?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Pure Mulberry Silk', 'Hand-rolled edges', '24k gold leaf patterns', 'Limited edition'],
                    isFeatured: true
                },
                {
                    id: 'imperial-leather-boots',
                    category: 'Footwear',
                    title: 'Imperial Leather Boots',
                    description: 'Durable and stylish boots made from the finest Italian leather.',
                    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Italian Calfskin Leather', 'Goodyear welted sole', 'Hand-burnished finish', 'Extreme comfort'],
                    isFeatured: true
                },
                {
                    id: 'majestic-evening-gown',
                    category: 'Gowns',
                    title: 'Majestic Evening Gown',
                    description: 'A breathtaking gown designed for the most prestigious occasions.',
                    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Delicate lace detailing', 'Satin finish', 'Floor-length silhouette', 'Custom sizing available'],
                    isFeatured: true
                },
                {
                    id: 'sovereign-tweed-jacket',
                    category: 'Outerwear',
                    title: 'Sovereign Tweed Jacket',
                    description: 'A timeless classic with a modern twist, perfect for the refined gentleman.',
                    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Authentic Harris Tweed', 'Modern slim cut', 'Reinforced stitching', 'Elegant horn buttons'],
                    isFeatured: true
                },
                {
                    id: 'noble-linen-shirt',
                    category: 'Casual Wear',
                    title: 'Noble Linen Shirt',
                    description: 'Breathable and sophisticated linen shirt for effortless style.',
                    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['100% Organic Linen', 'Mother of Pearl buttons', 'Pre-washed for softness', 'Cool and breathable'],
                    isFeatured: false
                }
            ];
            await Product.insertMany(seedData);
            console.log('Database seeded with fashion products');
        }
    } catch (err) {
        console.error('Error seeding database', err);
    }
}

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
