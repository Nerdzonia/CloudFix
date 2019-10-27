const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
//const {teste} = require('./cloudinary')
async function express(){
    try{
        // MIDDLEWARES
        app.use(cors({
            exposedHeaders: ['Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizarion'],
            methods: ['GET', 'POST', 'PUT',]
        }));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        
        const PORT = process.env.PORT || '8080';
        
        // DATABASE
        const { dbConnect } = require('./database');
        await dbConnect();
        
        //teste
        //await teste();

        // API ROUTES
        require('../routes')(app);

        // OPEN API
        app.listen(PORT, () => {
            console.log(`Api cloudfix running on http://localhost:${PORT}`);
        });
    }catch (error) {
        throw error;
    }
}

module.exports = express;