const express = require('express')
const app = express()
const port = 80

const router = require('./router/routes')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router)

app.set('views', 'views');

app.listen(port, () => console.log(`Example app listening on port ${port}`))