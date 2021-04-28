// Node, Express, MongoDB, EJS project using MVC structure

const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')

mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost:27017/blogdb', { useNewURLParser: true }, (error) => {
    if(error) {
        console.log('unable to connect to db')
    } else {
        console.log('connected to blogdb')
    }
})

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use('/blogs', blogRoutes)

// ROUTES
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})


app.listen(3000, (req, res) => {
    console.log('Lay it on me...')
})