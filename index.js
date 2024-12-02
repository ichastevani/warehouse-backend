// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const userRoutes = require('./routes/userRoutes');
const pusatdataRoutes = require('./routes/pusatdataRoutes');
const stockHistory = require('./routes/stockHistoryRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Menggunakan route untuk produk
app.use('/api/products', productRoutes);

app.use('/api/stock', stockHistory);

// Menggunakan route untuk user (Sign Up)
app.use('/api/users', userRoutes); // Tambahkan route user

app.use('/api/gudang', warehouseRoutes);

app.use(pusatdataRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
