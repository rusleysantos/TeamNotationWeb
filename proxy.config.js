const proxy = [
	{
		context: ['/api'],
		//target: 'http://localhost:57743',
		target: 'https://apiteamnotation.azurewebsites.net',
		secure: false,
		logLevel: 'debug',
        //pathRewrite: {'^/api' : ''}
    }
]