const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const database = require('./config/database.js');
const userRoutes = require('./routes/user.js');
const providerDetailRoutes = require('./routes/providerDetails.js')
const { cloudinaryConnect } = require('./config/cloudinary.js')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());


require('dotenv').config()

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/provides',providerDetailRoutes);

database.dbConnect();

cloudinaryConnect();

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})