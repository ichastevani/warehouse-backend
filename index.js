// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // Tambahkan route user

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Menggunakan route untuk produk
app.use('/api/products', productRoutes);

// Menggunakan route untuk user (Sign Up)
app.use('/api/users', userRoutes); // Tambahkan route user

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
