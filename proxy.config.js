const proxy = [
	{
		context: ['/api'],
		target: 'https://apiteamnotation.azurewebsites.net',
		secure: false,
		logLevel: 'debug',
		//pathRewrite: {'^/api' : ''}
	}
];
module.exports = proxy;