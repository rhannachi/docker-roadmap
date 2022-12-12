const express = require('express')
const util = require('util')
const app = express()

app.get('/', (req, res) => {
    res.end(util.format('%s - %s', new Date(), 'Got HTTP Get Request'))
})

app.listen(80)

