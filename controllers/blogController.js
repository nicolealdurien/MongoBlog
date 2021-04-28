// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete


const BlogEntry = require('../models/blogEntry')

const blog_index = (req, res) => {
    BlogEntry.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
    }).catch((err) => {
        console.log(err)
    })
}

const blog_details = (req, res) => {
    const id = req.params.id
    BlogEntry.findById(id)
    .then(result => {
        res.render('blogs/details', {blog: result, title: 'Blog Details'})
    }).catch(err => {
        res.status(404).render('404', { title: 'Blog not found.' })
    })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' })
}

const blog_create_post = (req, res) => {
    const blogEntry = new BlogEntry(req.body)

    blogEntry.save()
    .then((result) => {
        res.redirect('/blogs')
    }).catch((err) => {
    console.log(err)
    })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    BlogEntry.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    blog_index,
    blog_details, 
    blog_create_get,
    blog_create_post,
    blog_delete
}