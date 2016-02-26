var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/niche');
require('./models/Posts');
require('./models/Comments');
