const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express ();
const port = 3000;

 const userRouters = require('./routes/users');
 const taskRouters = require('./routes/tasks');
 const statusRouters = require('./routes/status');

app.use(cors());
app.use(bodyParser.json());



app.use('/api/users',userRouters);
app.use('/api/tasks',taskRouters);
app.use('/api/status',statusRouters);

 app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
 })
 