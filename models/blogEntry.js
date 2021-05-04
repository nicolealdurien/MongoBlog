const mongoose = require('mongoose')
// const Comment = require('./comment')

const blogEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    // comments: [Comment.schema]
}, {collection: 'blogentries', timestamps: true})

const BlogEntry = mongoose.model('BlogEntry', blogEntrySchema)

module.exports = BlogEntry