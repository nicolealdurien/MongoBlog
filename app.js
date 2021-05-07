// Node, Express, MongoDB, EJS project

require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const BlogEntry = require('./models/blogEntry')
const Admin = require('./models/admin')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('./authMiddleware')
// const Comment = require('./models/comment')

mongoose.set('useFindAndModify', false)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }, (error) => {
        if(error) {
            console.log('Unable to connect to blogdb')
        } else {
            console.log('Connected to blogdb on Atlas!')
        }
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
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

app.use(authRoutes)

app.get('/add-admin', authenticate, (req, res) => {
    res.render('add-admin', { title: 'Add Admin' })
})


// Admin Login Page
app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin Login' })
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body

    const admin = await Admin.findOne({username}).lean()
    
    if(!admin) {
        return res.json({ status: 'error', error: 'Invalid username/password'})
    }
    
    if(await bcrypt.compare(password, admin.password)) {
        
        const token = jwt.sign({
            id: admin._id, 
            username: admin.username,
        }, process.env.JWT_SECRET)
        
        return res.json({ status: 'ok', data: token})
    }

    res.json({ status: 'error', error: 'Invalid username/password'})
})


// Change Password Page
 app.get('/change-password', (req, res) => {
    res.render('change-password', { title: 'Change Password' })
})

app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body
    
    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error:'Invalid password.'})
    }
    
    if(plainTextPassword.length < 6) {
        return res.json({status: 'error', error: 'Password cannot be shorter than 6 characters.'})
    }
    
    try {
        const admin = jwt.verify(token, process.env.JWT_SECRET)
        const _id = admin.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await Admin.updateOne({ _id },
            {
                $set: { password }
            }
        )
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: ';)'})
    }
})

app.post('/api/register', async (req, res) => {

    const { username, password: plainTextPassword } = req.body
    if(!username || typeof username !== 'string') {
        return res.json({status: 'error', error:'Invalid username.'})
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error:'Invalid password.'})
    }
    if(plainTextPassword.length < 6) {
        return res.json({status: 'error', error: 'Password cannot be shorter than 6 characters.'})
    }

    let password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await Admin.create({
            username,
            password
        })
        console.log('Admin added successfully: ', response)
    } catch (error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error: 'Username already in use.'})
        }
        throw error
    }
    res.json({status: 'ok'})
})





// 404 page...needs to be above everything but the listener
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
}) 

app.listen(3000, (req, res) => {
    console.log('Server is running...')
})