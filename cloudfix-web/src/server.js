require('dotenv').config();
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port =  process.env.PORT || '3000';
const app = next({dev, dir: './src'});
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`--> Server running on localhost:${port}`);
        })
    })
    .catch( ex => {
        console.log(ex.stack);
        process.exit(1);
    })