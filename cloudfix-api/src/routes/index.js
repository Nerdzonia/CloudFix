module.exports = app => {

    // path Auth
    require('../controllers/authController')(app);

    //path Client
    require('../controllers/clientController')(app);


};