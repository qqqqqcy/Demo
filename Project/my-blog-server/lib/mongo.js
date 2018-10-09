const config = require('config-lite')(__dirname)
const mongoose = require('mongoose');
mongoose.connect(config.mongodb, {
	useNewUrlParser: true
});


const articleSchema = new mongoose.Schema({
	title: String,
	tag: String,
	sec: String,
	content: String,
	createTime: Date,
	updateTime: Date,
})
// const userSchema = new mongoose.Schema({
// 	name: String,
// 	pwd: String,
// })

// const tagSchema = new mongoose.Schema({
//     tagName: String,
//     tagNumber: Number,
// })

// const personalInformationSchema = new mongoose.Schema({
//     name: String,
//     individualitySignature: String,
//     introduce: String,
// })

const Models = {
	// User: mongoose.model('User', userSchema),
	Article: mongoose.model('Article', articleSchema),
	// TagList: mongoose.model('TagList', tagSchema),
	// PersonalInformation: mongoose.model('PersonalInformation', personalInformationSchema),
}

module.exports = Models
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("we're connected!")

//     let articleSchema = new mongoose.Schema({
//         title: String,
//         content: String,
//     });

//     exports.Article = mongoose.model('Article', articleSchema);
// });