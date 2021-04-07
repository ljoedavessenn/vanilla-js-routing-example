const express = require('express')
const app = express()
const port = 3333

app.use(express.static('public'));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});