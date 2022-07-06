/**
 * Alert function
 */

const alertFunction = (message, type = 'danger') => {
	return `<p class="alert alert-${type} d-flex justify-content-between">${message}<button data-bs-dismiss="alert" class="btn-close btn-sm"></button></p>`;
};

/**
 * Email validation
 */

const isEmail = (email) => {
	let pattern = /^[a-z0-9\.-_]{1,}@[a-z0-9]{1,}\.[a-z0-9]{2,4}$/;
	return pattern.test(email);
};

/**
 * US cell validation
 */

const isCell = (cell) => {
	let pattern = /^(\+1|1)[0-9]{10}$/;
	return pattern.test(cell);
};

/**
 * age validation
 */

const isAge = (age) => {
	let pattern = /^[0-9]{1,3}$/;
	return pattern.test(age);
};

/**
 * read ls data
 */

const readLsData = (key) => {
	if (localStorage.getItem(key)) {
		// returning data after converting
		return JSON.parse(localStorage.getItem(key));
	} else {
		return false;
	}
};

/**
 * updata ls data
 */

const updataLsData = (key, array) => {
	// returning data after converting
	localStorage.setItem(key, JSON.stringify(array));
};

/**
 * Clock
 */
const clock = () => {
	const display = document.getElementById('time');

	// interval set for Clock
	setInterval(() => {
		// store clock in time from date constructor
		const time = new Date();
		let hr = time.getHours();
		let min = time.getMinutes();
		let sec = time.getSeconds();

		// function for 0 before time
		const zero = (time) => {
			return (time = time < 10 ? '0' + time : time);
		};

		return (display.innerHTML = `<h4 class=" mt-2 mb-0"> ${zero(hr)}:${zero(min)}:${zero(
			sec
		)}</h4>`);
	}, 1000);
	clearInterval();
};

/**
 * value set LS
 */
function createLsData(key, value) {
	// init empty data
	let data = [];

	if (localStorage.getItem(key)) {
		// passing value by making array
		data = JSON.parse(localStorage.getItem(key));
	}

	// push data to value and passing data to json stringify
	data.push(value);

	// converting value by json.stringify
	localStorage.setItem(key, JSON.stringify(data));
}
