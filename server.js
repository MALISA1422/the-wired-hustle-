require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const Project = require('./models/Project');

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
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Catch-all route for frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Seed Data
async function seedDatabase() {
    try {
        const count = await Project.countDocuments();
        if (count === 0) {
            const seedData = [
                {
                    id: 'fintech',
                    category: 'Latest Work',
                    title: 'Fintech App Redesign',
                    description: 'A complete overhaul of a mobile banking application focusing on accessibility and financial clarity.',
                    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Simplified transaction history view', 'Dark mode support', 'Biometric authentication flow', 'Spending analysis charts'],
                    isFeatured: true
                },
                {
                    id: 'ecommerce',
                    category: 'Case Study',
                    title: 'E-Commerce Dashboard',
                    description: 'An internal tool for shop administrators to manage inventory, track sales in real-time, and process orders.',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Real-time sales graph', 'Drag-and-drop inventory management', 'Multi-user permission system', 'Automated reporting'],
                    isFeatured: true
                },
                {
                    id: 'designsystem',
                    category: 'Process',
                    title: 'Enterprise Design System',
                    description: 'A comprehensive design language created to unify products across multiple platforms.',
                    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['50+ reusable components', 'Dark/Light theme tokens', 'Accessibility (WCAG 2.1) compliant', 'Figma plugin for designers'],
                    isFeatured: true
                },
                {
                    id: 'ai',
                    category: 'SaaS Product',
                    title: 'AI Analytics Dashboard',
                    description: 'Visualizing predictive models for big data companies.',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Interactive scatter plots', 'Model training timeline', 'GPU usage monitoring', 'Export to Jupyter Notebooks'],
                    isFeatured: true
                },
                {
                    id: 'crypto',
                    category: 'Mobile App',
                    title: 'Defi Crypto Wallet',
                    description: 'A non-custodial wallet for the next generation of crypto users.',
                    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Multi-chain support (ETH, SOL, BTC)', 'NFT Gallery view', 'One-tap staking', 'Social recovery backup'],
                    isFeatured: true
                },
                {
                    id: 'health',
                    category: 'Mobile App',
                    title: 'Vitality Health Tracker',
                    description: 'A holistic health application integrating wearable data with nutritional tracking.',
                    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Apple HealthKit Integration', 'Sleep pattern analysis', 'Calorie scanning via Camera', 'Social challenges'],
                    isFeatured: false
                },
                {
                    id: 'smarthome',
                    category: 'IoT Product',
                    title: 'Nest Control Hub',
                    description: 'Centralized control system for smart home devices.',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Drag-and-drop routine builder', 'Energy usage heatmaps', 'Voice assistant config', 'Guest access management'],
                    isFeatured: false
                },
                {
                    id: 'travel',
                    category: 'Web Platform',
                    title: 'Wanderlust Booking',
                    description: 'An immersive travel booking experience.',
                    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000',
                    highlights: ['Video destination guides', 'Split-payment for groups', 'AI Itinerary generator', 'Offline map support'],
                    isFeatured: false
                }
            ];
            await Project.insertMany(seedData);
            console.log('Database seeded with projects');
        }
    } catch (err) {
        console.error('Error seeding database', err);
    }
}

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

