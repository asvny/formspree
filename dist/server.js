'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var koa = require('koa');
var _ = require('koa-route');
var parse = require('co-body');
var app = koa();

var mailer = require('nodemailer').createTransport();

var isEmail = function isEmail(value) {
	return (/\S+@\S+\.\S+/.test(value)
	);
};

function* process(email) {
	var _this = this;

	var data = yield parse(this);
	var from = data._replyto;
	var next = data._next;
	var subject = data._subject;
	var cc = data._cc;
	var gotcha = data._gotcha;

	var text = _objectWithoutProperties(data, ['_replyto', '_next', '_subject', '_cc', '_gotcha']);

	if (!isEmail(email) || !!gotcha ) return;

	var opts = {
		from: from,
		subject: subject,
		text: JSON.stringify(text),
		to: email + ' , ' + cc
	};

	mailer.sendMail(opts, function (err, info) {
		if (err) throw new Error('Problem in Mail Sender :(');

		!!_next && _this.redirect(_next);
	});
   console.log(JSON.stringify(opts));
   this.body=JSON.stringify(opts);
}

app.use(_.post('/:email', process));
app.listen(1337);
