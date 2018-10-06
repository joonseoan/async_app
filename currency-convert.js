const axios = require('axios');

// http://data.fixer.io/api/latest?access_key=7b8a258a1ba23b8e8cf37ec80ac0d1f6&format=1

// const getExchangeRate = (from, to) => {

// 	return axios.get('http://data.fixer.io/api/latest?access_key=7b8a258a1ba23b8e8cf37ec80ac0d1f6&format=1')
		
// 		// callback defined by axios
// 		.then((response) => {

// 			const euro = 1 / response.data.rates[from]
// 			const rate = euro * response.data.rates[to];
		
// 			return rate;

// 		});

// }

// const getExchangeRate = async (from, to) => {

// 		const response = await axios.get('http://data.fixer.io/api/latest?access_key=7b8a258a1ba23b8e8cf37ec80ac0d1f6&format=1');
// 		const euro = 1 / response.data.rates[from];
// 		const rate = euro * response.data.rates[to];

// 		return rate;

// }

// // http://restcountries.eu/rest/v2/currency/usd
// const getCountries = async (country) => {

// 		const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${country}`);
// 		const country_name = await response.data.map((country => country.name));

// 		return country_name;

// }
								// callback
/*const getCurrency = (from, to, amount) => {

	let total;

	// ***********callback!!!
	// callback(total);
	// ***********if it callback is defined, we should not use "return"
	// Also, we need callback args

	// The first "return" to "getCurrency();"" 
	return getExchangeRate(from, to).then((rate) => {

		// **********Based on javascript lexical environment,
		// it is not possible to be used in then((country) => {}) down below.
		// const total = (amount * rate).toFixed(2);

		// toFixed() : define the number of decimal.
		total = (amount * rate).toFixed(2);

		return getCountries(to);

		// ***** array.join(' , ') it is mapping elements int the array
		//			 and listing them with ', ' of defined delimiter.
		
		// ********It returns value to getCurrency() 
		//		becuase it is a chaining function attached to the first "return" up and above.
		// That's why the last promise callback attached here, "not getCountries()""
	}).then((country) => `$${amount} ${from} is $${total} of ${country.join(', ')}`);
    
};
*/

// const getCurrency = (from, to, amount) => {

// 	let total;

// 	return getExchangeRate(from, to).then((rate) => {

// 		total = (amount * rate).toFixed(2);

// 		return getCountries(to);

// 	}).then((country) => `$${amount} ${from} is $${total} of ${country.join(', ')}`);
    
// };

// const getCurrency = async (from, to, amount) => {

// 	const rate = await getExchangeRate(from, to);
// 	const total = (amount * rate).toFixed();
// 	const country = await getCountries(to);

// 	return `$${amount} ${from} is $${total} of ${country.join(', ')}`;

// }



// ******* The stuffs down below are fully separate one from caller in "getCurrency()"
// 		In other words, callback function can be flexibly defined whenever callers are placed
// getExchangeRate('USD', 'CAD').then((rate) => {

// 		console.log(rate);

// });

// getCountries('CAD').then((countries) => {

// 		console.log(countries);

// });


// ***************callback!!!!
// getCurrency ('USD', 'CAD', 20, (a) => {

// 		console.log(a);

// });

// // Promise < Callback
// getCurrency('USD', 'CAD', 20).then((country) => {

// 	console.log(country);

// }).catch((e) => {

	// ***** e.message
// 	console.log(e.message);

// });

// =========================================== Error Handling =================================

// ****************[Shortest Form]
// const add = async (a, b) => a + b;

// const doWork = async () => await add(5, 20);

// doWork().then((a) => {

// 	console.log(a);

// // first error handling
// }).catch((e) => {

// 	console.log(e.message);

// });

// When we have an error herer
// We can use try ~ catch in the callback!!!!
const add = async (a, b) => a + b // + c;

const doWork = async () => {

	try {

		return await add(5, 20);

	} catch (e) {

		//console.log('Something is wrong.!!!');

		return 'error';
	
	}
	
}

doWork().then((a) => {

	console.log(a);

// first error handling
}).catch((e) => {

	console.log(e); // error!!!!

});

// ============================ Error Handling =====================

const getExchangeRate = async (from, to) => {

	try {

		const response = await axios.get('http://data.fixer.io/api/latest?access_key=7b8a258a1ba23b8e8cf37ec80ac0d1f6&format=1');
		const euro = 1 / response.data.rates[from];
		const rate = euro * response.data.rates[to];


		// **********It is to control and manage error caused by a number.
		// *********If it is not a number
		if(isNaN(rate)) {

			throw new Error(); // (`Unable to run this async function with arguments ${from} and ${to}`);

		}

		return rate;

	} catch(e) {

		throw new Error(`Unable to run this async function with arguments ${from} and ${to}`);

	}

}

// http://restcountries.eu/rest/v2/currency/usd
const getCountries = async (country) => {

	try {

		const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${country}`);
		const country_name = await response.data.map((country => country.name));

		return country_name;

	} catch(e) {

		throw new Error(`Unable to run this function with argument, ${country}`);

	}
	
}

const getCurrency = async (from, to, amount) => {
	
	// try {

		const rate = await getExchangeRate(from, to);
		const total = (amount * rate).toFixed();
		const country = await getCountries(to);

		return `$${amount} ${from} is $${total} of ${country.join(', ')}`;

	// } catch(e) {

	// 	return 'something is wrong';

	// }

}

// Promise < Callback
getCurrency('USD', 'CAD', 20).then((country) => {

	console.log(country);

}).catch((e) => {

	console.log(e.message);

});
