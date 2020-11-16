const proxy = [
	{
		context: ['/api'],
		target: 'http://localhost:57743',
		secure: false,
		logLevel: 'debug',
		//pathRewrite: {'^/api' : ''}
	}
];
module.exports = proxy;