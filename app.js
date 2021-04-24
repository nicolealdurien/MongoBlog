const express = require('express')
const app = express()
const morgan = require('morgan')


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(morgan('dev'))



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