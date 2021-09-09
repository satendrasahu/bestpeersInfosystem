const express = require('express');
require("./Db/Conn")
const ProductRouter = require("./Routers/ProductRouter")
const CartRouter = require("./Routers/CartRouter")

const cors = require('cors')
const app = express();
const port = process.env.PORT || 6000

app.use(cors())
app.use(express.json())
    // app.use('/api/product', (req, res) => {
    //         try {
    //             console.log(req.body)
    //         } catch (e) {

//         }
//     })
app.use('/api', ProductRouter)
app.use('/api/cart', CartRouter)


// app.use(ProductRouter)




app.listen(port, () => {
    console.log(`connection is successfull at port ${port}`);
})