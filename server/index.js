const express = require('express');
const app = express();
const cors = require('cors');

//middleware
app.use(express.json()) //req.body
app.use(cors())

//Routes

//register and login routes and verify
app.use('/auth', require('./routes/jwtAuth'));

//dashboard route
app.use('/dashboard', require('./routes/dashboard'));

//settings route
app.use('/settings', require('./routes/settings'));

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});