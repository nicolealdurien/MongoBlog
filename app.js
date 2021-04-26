const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const BlogEntry = require('./models/blogEntry')

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
app.use(morgan('dev'))

// ADD NEW ENTRY
// const blogEntry = new BlogEntry({
//     title: 'Is this the real life?',
//     snippet: 'Is this just fantasy?',
//     body: 'Caught in a landslide / no escape from reality'
// })

// blogEntry.save((error, newBlogEntry) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(newBlogEntry)
//     }
// })

// VIEW ALL
// BlogEntry.find({}, (error, blogentries) => {
//     console.log(blogentries)
// })

// VIEW ONE IN VARIOUS WAYS
// BlogEntry.findById('60839a230c274a712470bdf4', (error, blogEntry) => {
//     console.log(blogEntry)
// })

// BlogEntry.findOne({_id: '60839a230c274a712470bdf4'}, (error, blogEntry) => {
//     console.log(blogEntry)
// })

// BlogEntry.findOne({title: 'Is this the real life?'}, (error, blogEntry) => {
//     console.log(blogEntry)
// })

// UPDATE
// const updatedDoc = {
//     title: 'Open your eyes',
//     snippet: 'Look up to the skies and see',
//     body: 'I am just a poor boy / I need no sympathy'
// }

// BlogEntry.findOneAndUpdate({_id: '608397122f8a32705f929ea8'}, updatedDoc, (error, result) => {
//     console.log(result)
// })


// DELETE
// BlogEntry.findOneAndDelete({_id: '608397122f8a32705f929ea8'}, (error, result) => {
//     console.log(result)
// })



app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit yada yada'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit yada yada'},
        {title: 'Peach finds mushrooms', snippet: 'Lorem ipsum dolor sit yada yada'}
    ]
    res.render('index', { title: 'Home', blogs: blogs})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' })
})


// redirect for old url
// app.get('/about-us', (req, res) => {
//   res.redirect('/about')
// })

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})


app.listen(3000, (req, res) => {
    console.log('Lay it on me...')
})