// Node, Express, MongoDB, EJS project using MVC structure

const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')
const BlogEntry = require('./models/blogEntry')
// const Comment = require('./models/comment')

mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb+srv://DBtestuser:DBtestuser@cluster0.nijve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewURLParser: true, useUnifiedTopology: true}, (error) => {
    if(error) {
        console.log('unable to connect to db')
    } else {
        console.log('connected to database')
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






//sandbox routes
// app.get('/add-blog', (req, res) => {
//    const blogEntry = new BlogEntry({
//        title: 'newer blog',
//        body: 'even more about my new blog',
//        comments:[]
//    })
//    blogEntry.save()
//    .then((result) => {
//        console.log(result)
//        res.send(result)
//    }).catch((err) => {
//        console.log(err)
//    })
// })

// app.get('/all-blogs', (req, res) => {
//     BlogEntry.find()
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/single-blog', (req, res) => {
//     BlogEntry.findById('6089c71ab3c5562bea69b1f7')
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err)
//     })
// })

// app.post('/comments', (req, res) => {
//     const blogEntryId = req.body.blogEntryId
//     const name = req.body.name
//     const subject = req.body.subject
//     const body = req.body.body
    
//     const comment = new Comment({
//         name: name,
//         subject: subject,
//         body: body,
//     })

//     BlogEntry.findById(blogEntryId, (error, blogEntry) => {
//         if(error) {
//             res.json({error: 'Unable to find blog entry.'})
//         } else {
//             blogEntry.comments.push(comment)
//             blogEntry.save(error => {
//                 if(error) {
//                     res.json({error: 'Unable to save comment.'})
//                 } else {
//                     res.json({success: true, message: 'Comment has been saved!'})
//                 }
//             })
//         }
//     })
// })



// 404 page...needs to be above everything but the listener
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
}) 

app.listen(3000, (req, res) => {
    console.log('Server is running...')
})