const cloudinary = require('cloudinary').v2;

const cloudinaryConnect=()=>{
    try{
        const {CLOUD_NAME,CLOUD_API_KEY,CLOUD_API_SECRET} = process.env;
        if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
            console.error("Missing Cloudinary Environment Variables.");
            return;
          }
        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: CLOUD_API_KEY,
            api_secret: CLOUD_API_SECRET
        })

        console.log('Connected to cloudinary.');
    }catch(e){
        console.log("An error is occured while connecting to cloudinary ",e);
    }
};

module.exports = cloudinaryConnect;        
