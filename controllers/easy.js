const path = require('path');
// const viewsDir = path.join(__dirname, '../views');

const easyControllers = {
    index: ((req, res) => {
        console.log({ m: 'Hello World!' })
        // sending the object hw
        // res.json('Hello World!');
        res.redirect('/intro');
    }),
    intro: ((req, res) => {
        res.json('hello there');
    }),
    // outro: ((req, res) => {
    //     res.sendFile(path.join(viewsDir, 'index.html'));
    // }),
    create: ((req, res) => {
        res.send(req.params)
    })
}
module.exports = easyControllers;