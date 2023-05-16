require('dotenv').config();

const product = require('./models/product');
const jsonProduct = require('./products.json')
const connectDB = require('./db/connect')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await product.deleteMany()
        await product.create(jsonProduct)
        console.log('succesful!!!')
    } catch (error) {
        console.log(error);
    }
}

start()