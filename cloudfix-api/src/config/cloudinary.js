const cloudinary = require('cloudinary').v2
const {unlinkSync} = require('fs')
const path = require('path')

cloudinary.config()


const uploadImage = async (image, email) => {
  try{
    
    return await cloudinary.uploader.upload(image.path, {folder: `Cloudfix/Cliente/${email}/`, use_filename: true}, function(err, res){
      
      if(err){
      unlinkSync(path.resolve(`./${image.path}`))
       
        return err
      } 
     
      unlinkSync(path.resolve(`./${image.path}`))
      

      return res
  
    })
  }catch(err){
    unlinkSync(path.resolve(`./${image.path}`))
   
    return err
  }
  
}
module.exports = {uploadImage}
