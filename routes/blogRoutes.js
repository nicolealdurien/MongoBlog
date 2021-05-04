const express = require('express')
const router = express.Router()
// const BlogEntry = require('../models/blogEntry')
const blogController = require('../controllers/blogController')


router.get('/', blogController.blog_index)

router.get('/nicolealdurienwouldliketocreateablogpostnow', blogController.blog_create_get)

router.post('/', blogController.blog_create_post)

router.get('/:id', blogController.blog_details)

router.delete('/:id', blogController.blog_delete)

module.exports = router