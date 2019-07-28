const mongoose = require('mongoose');

async function dbConnect(){
    try{
        const connection = process.env.DATABASE_CONNECTION_URI || 'mongodb://localhost:27017/Cloudfix';
        
        mongoose.Promise = global.Promise;
        await mongoose.connect(
            connection, 
            {
                useNewUrlParser: true,
                useCreateIndex: true
            }, 
            () => console.log(`Database connected sucessfully!`)
        );
        
        return mongoose;
    }catch (error){
        throw error
    }
}

module.exports = {
    mongoose,
    dbConnect
};