const mongoose = require('mongoose')

const blogEntrySchema = new mongoose.Schema({
    title: String,
    snippet: String,
    body: String
})

const BlogEntry = mongoose.model('BlogEntry', blogEntrySchema)

module.exports = BlogEntry