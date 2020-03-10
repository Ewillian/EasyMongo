const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express();

const port = process.env.PORT || 6060

//Middleware

app.use(bodyparser.json)
app.use(cors())

app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server Started on port ${port}.`))