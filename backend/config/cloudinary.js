import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })


const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      console.log("Starting Cloudinary upload..."); // Debugging log
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error); // Debugging log
            reject(error);
          } else {
            console.log("Cloudinary Upload Result:", result); // Debugging log
            resolve(result);
          }
        }
      );
  
      uploadStream.end(fileBuffer);
    }); 
  };


export default uploadToCloudinary