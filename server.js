const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const { Server } = require('http');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
 
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports =  server;