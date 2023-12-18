const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const userRouters = require('./routers/users');
const taskRouters = require('./routers/task');
const statusRouters = require('./routers/status')

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouters);
app.use('/api/Task', taskRouters);
app.use('/api/Status', statusRouters)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
