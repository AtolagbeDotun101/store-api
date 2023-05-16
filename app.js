require('dotenv').config();


const notFound = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const store = require('./routes/products.js')


app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>STORE API </h1> <a href= "/api/v1/products">products</a>')
})


app.use('/api/v1/products', store)

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`port is listening at ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()