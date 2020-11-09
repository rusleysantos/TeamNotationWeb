const proxy = [
	{
		context: ['/api'],
		target: 'http://localhost:56843',
		secure: false,
		logLevel: 'debug',
		//pathRewrite: {'^/api' : ''}
	}
];
module.exports = proxy;