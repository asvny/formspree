const koa    = require('koa');
const _      = require('koa-route');
const parse  = require('co-body');
const app    = koa();

const mailer = require('nodemailer').createTransport();


const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

function* middleware(email) {

	let data = yield parse(this);
	let { _replyto:from , _next:next, _subject:subject = 'Formspree', _cc:cc , _gotcha:gotcha , ...text } = data;

	if(!isEmail(email) || !!gotcha ) return;

	if(isEmail(from)) {

		let opts = {
			from,
			subject,
			text: JSON.stringify(text),
			to: ( isEmail(cc) ? `${email} , ${cc}` : `${email}` )
		}

		mailer.sendMail(opts,(err,info)=>{
			if(err) throw new Error('Problem in Mail Sender :(');

			!!(_next) && this.redirect(_next);	
		});	
	}

}

app.use(_.post(`/:email`,middleware));
app.listen(1337);

