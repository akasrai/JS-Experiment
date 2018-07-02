const gaetVal = () => new Promise((resolve, reject) => {

	setTimeout(() => {
		resolve(100);
		// reject(0);
	},5000);
})

gaetVal()
	.then(value => console.log('value',value))
	.catch(error => console.log('error',error));