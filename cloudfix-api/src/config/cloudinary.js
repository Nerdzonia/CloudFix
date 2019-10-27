const cloudinary = require('cloudinary').v2

cloudinary.config()


const uploadImage = async (image) => {
  try{
    console.log(image)
    return await cloudinary.uploader.upload(image, {public_id: "Cloudfix/client"}, function(err, res){
      
      if(err){
        return err
      } 
      
      return res
  
    })
  }catch(err){
    return err
  }
  
}
module.exports = {uploadImage}
