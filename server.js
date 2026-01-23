require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
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

// Catch-all route for frontend
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Seed Data
async function seedDatabase() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const seedData = [
                {
                    id: 'luxury-suit',
                    category: 'Formal Wear',
                    title: 'Bespoke Midnight Suit',
                    description: 'A masterfully tailored midnight blue suit crafted from the finest Italian wool. Perfect for high-profile galas and business events.',
                    price: 1200,
                    image: 'https://images.unsplash.com/photo-1594932224456-75a779401e07?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['100% Virgin Wool', 'Silk lining', 'Slim fit silhouette', 'Hand-finished details'],
                    isFeatured: true
                },
                {
                    id: 'silk-dress',
                    category: 'Evening Wear',
                    title: 'Emerald Silk Gown',
                    description: 'An elegant floor-length gown made from premium mulberry silk. Features a sophisticated drape and a subtle side slit.',
                    price: 850,
                    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Pure Mulberry Silk', 'Bias cut', 'Adjustable straps', 'Hidden back zipper'],
                    isFeatured: true
                },
                {
                    id: 'leather-jacket',
                    category: 'Outerwear',
                    title: 'Vintage Biker Jacket',
                    description: 'Authentic top-grain leather jacket with a distressed finish. A timeless piece that adds edge to any outfit.',
                    price: 450,
                    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Top-grain Leather', 'Quilted lining', 'Heavy-duty YKK zippers', 'Functional pockets'],
                    isFeatured: true
                },
                {
                    id: 'streetwear-hoodie',
                    category: 'Casual',
                    title: 'Urban Oversized Hoodie',
                    description: 'Heavyweight cotton hoodie with a modern oversized fit and minimalist branding.',
                    price: 120,
                    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['400GSM Cotton', 'Dropped shoulders', 'Brushed interior', 'Sustainability sourced'],
                    isFeatured: true
                },
                {
                    id: 'designer-sneakers',
                    category: 'Footwear',
                    title: 'Aero-Step Sneakers',
                    description: 'Cutting-edge footwear combining futuristic design with exceptional comfort. Lightweight and durable.',
                    price: 320,
                    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Breathable mesh upper', 'Responsive foam sole', 'Reflective accents', 'Ergonomic fit'],
                    isFeatured: true
                },
                {
                    id: 'trench-coat',
                    category: 'Outerwear',
                    title: 'Classic Camel Trench',
                    description: 'The quintessential trench coat in a versatile camel shade. Water-resistant and perfect for layering.',
                    price: 580,
                    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Cotton Gabardine', 'Double-breasted', 'Removable belt', 'Storm flaps'],
                    isFeatured: false
                }
            ];
            await Product.insertMany(seedData);
            console.log('Database seeded with products');
        }
    } catch (err) {
        console.error('Error seeding database', err);
    }
}

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

