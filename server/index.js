const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const userRoutes = require('./routes/user.js');
const cloudinaryConnect = require('./config/cloudinary.js');


dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/temp',
    })
)

cloudinaryConnect();

app.use('/v1',userRoutes);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

