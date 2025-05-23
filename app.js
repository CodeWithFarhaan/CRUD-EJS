const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/userModel.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.render('read', { users });
});

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid })
    res.render('edit', { user });
});

app.post('/update/:userid', async (req, res) => {
    let { image, name, email } = req.body;
    let user = await userModel.findOneAndUpdate({ _id: req.params.userid }, { image, name, email }, { new: true })
    res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({ _id: req.params.id })
    res.redirect('/read');
});

app.post('/create', async (req, res) => {
    let { image, name, email } = req.body;
    console.log(req.body);
    let userCreated = await userModel.create({
        image: image,
        name: name,
        email: email
    });
    res.redirect('/read');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
