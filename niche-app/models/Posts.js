/**
 * Created by tapan on 2/25/16.
 */
var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: [{type: Number, default : 0}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Post', PostSchema);
