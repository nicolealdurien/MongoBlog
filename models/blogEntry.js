const mongoose = require('mongoose')


const blogEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const BlogEntry = mongoose.model('BlogEntry', blogEntrySchema)

module.exports = BlogEntry