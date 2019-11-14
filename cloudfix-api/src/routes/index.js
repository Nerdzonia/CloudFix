module.exports = app => {

    // path Auth
    require('../controllers/authController')(app);

    //path Client
    require('../controllers/clientController')(app);

    //path projects
    require('../controllers/ticketController')(app);

    //path system
    require('../controllers/systemController')(app);
};