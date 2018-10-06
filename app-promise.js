console.log('basic promise concept review');

const users = [{

	id : 1,
	name: 'Mike',
	schoolId : 101

}, {

	id : 2,
	name: 'Jess',
	schoolId : 999

}];

const grades = [{

	id: 1,
	schoolId: 101,
	grade: 85

}, {

	id: 2,
	schoolId: 103,
	grade: 99
	
}, {

	id: 3,
	schoolId: 101,
	grade: 78
	
}];

const getUser = id => {

	return new Promise((resolve, reject) => {

		// array and its method, "find()""
		// value of the first element in the array that satisfies the provided testing function. 
		const user = users.find((user) =>  user.id === id);
		
		// resolve / reject : kinds of callback function.
		if(user) {

			// ***** We can make callback functions as many as we want
			//  	by using resolve(user) callback.
			resolve(user);
		
		} else {

			reject(`Unable to find the user with ${id}`);
		}

	});

};

// normally caller details callback's behavior.
// getUser(2).then((user) => {

 // 	callback: resolve(user)
// 		console.log(user);
		
// 	// callback: reject('Unable to......')

// }).catch((e) => {

// 	console.log(e);

// });

// Mike's average grade
// returns a string along with this line.
const getStatus = userId => {

	let user;

	console.log('getUser: ', getUser(userId))

	// return Promise((resolve) = > { resove(userId); })
	// 		same as caller => then((tempUser))
	return getUser(userId).then((tempUser) => {

		user = tempUser;

		console.log('user: ', tempUser.schoolId)

		// if it is successes, go to chaning function down below
		// callback
		console.log('getGrade(tempUser)', getGrade(tempUser.schoolId));
		return getGrade(tempUser.schoolId); //.then((grade) => console.log('grade: ', grade));  

	// callback (Resolve) for the function inside of getGrade
	// function return promise return promise => then().then()
	}).then(grades => {

		console.log('grades: ', grades)
		
		let average = 0;
		
		console.log('grades', grades);

		if(grades.length > 0) {

			// reduce ==> a += b....
			average = grades.map(grade => grade.grade).reduce((a, b) => a + b)/grades.length;

			return `${user.name} has average ${average} during the classes`
			// console.log(average);
		
		}		

	});

};

// =========================================
// It is exactly same thing as the one down below with "anync"
/*
() => {

	return new Promise((resolve, reject) => {

		resolve('Mike')
	
	});

}
*/

// Just Bear in mind that Promise() => return an object.
// Therefor, prefix "async" means that it is including promise!!!!
// Making async await
const getStatusAlt = async (userId) => {

	// ************ 1)
	// throw new Error('This is an error') // Promise((reject) => {})
	// return 'Mike'; // Promise((resolve) => { resolve('Mike')})
				   // it is {'Mike'} 
	// ************ 2)
	// instead of return, 
	//		the returning value will be stored in user constant.
	const user = await getUser(userId);
	const grades = await getGrade(user.schoolId);
	
	let average = 0;
		
	console.log('grades', grades);

	if(grades.length > 0) {

		//****************8
		average = grades.map(grade => grade.grade).reduce((a, b) => a + b)/grades.length;

		// "return" itself a promise!!!!!!!!!!!!!!
		// like return chaining. Therefor it is the return resolve(value) for "getStatusAlt"
		return `${user.name} has average ${average} during the classes`
			
	}		


}

// console.log(getStatusAlt('whatever'));
getStatusAlt(1).then((status) => {

	console.log(status);

}).catch((e)=> { console.log(e); });


// getStatus(1).then((status) => {

// 	// when schoolId is not valid
// 	// 	"resolve" callback is going to return [].
// 	//  because there is not caller for the "reject()""
// 	// console.log('ddde');
	
// 	console.log('status: ', status);
		
// // unnecessary from this point because no "reject()"
// });

// Without explicitly defining "reject()",
// 		we can define the reject in the caller
const getGrade = schoolId => {

	return new Promise((resolve, reject) => {

		resolve(grades.filter(school => school.schoolId === schoolId));
	
	});

}

// getGrade(1).then((grades) => {

// 	// when schoolId is not valid
// 	// 	"resolve" callback is going to return [].
// 	//  because there is not caller for the "reject()""
// 	console.log('ddde');
// 	console.log(grades);
		
// // unnecessary from this point because no "reject()"
// })//.catch((e) => {

// 	console.log(e);


// });