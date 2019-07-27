const app = require('express')();
const bodyParser = require('body-parser');

async function express(){
    try{
        const PORT = process.env.PORT || '8080';
        
        // DATABASE
        const dbConnect = require('./database');
        await dbConnect();
        
        // MIDDLEWARES
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        
        // API ROUTES
        require('../controllers/authController')(app);

        // OPEN API
        app.listen(PORT, () => {
            console.log(`Api cloudfix running on http://localhost:${PORT}`);
        });
    }catch (error) {
        throw error;
    }
}

module.exports = express;