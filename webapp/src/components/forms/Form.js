class Errors {

	constructor() {
		this.errors = {};
	}

	has(field) {
    // return this.errors.hasOwnProperty(field);
		return Object.prototype.hasOwnProperty.call(this.errors, field);
	}

	any() {
		return Object.keys(this.errors).length > 0;
	}

	get(field) {
		if (this.error[field]) {
			return this.errors[field][0];
		}
	}

	record(errors) {
		this.errors = errors;
	}

	clear(field) {
		if (field) {
			delete this.errors[field];
			return;
		}
		this.errors = {};
	}
}

class Form {

	constructor(baseUrl, data) {
		this.axios = require("axios");

		this.originalData = data;

		for (let field in data) {
			this[field] = data[field];
		}

		this.errors = new Errors();
		this.baseUrl = baseUrl;
	}

	data() {
		let data = {};

		for (let property in this.originalData) {
			// here data[property] is bound to the form input since the v-model of the control is set to form.propName, which is this[property]
			data[property] = this[property];
		}

		return data;
	}

	reset() {
		for (let field in this.originalData) {
			this[field] = "";
		}

		this.errors.clear();
	}

	post(url) {
		return this.submit("post", url);
	}

	put(url) {
		return this.submit("put", url);
	}

	delete(url) {
		return this.submit("delete", url);
	}

	get(url) {
		return new Promise((resolve, reject) => {
			this.axios.get(this.baseUrl + "/" + url) // make sure we keep the form as context within the callback
			.then(response => {
				// this.onSuccess(response.data);
				// console.log(response);
				resolve(response.data); // trigger all Promise-subscribers
			})
			.catch(error => {
				console.log(error);
				this.onFail(error.response.data);

				reject(error.response.data); // trigger all Promise-subscribers when error
			});
		});
	}

	submit(httpMethod, url) {
		return new Promise((resolve, reject) => {
			this.axios[httpMethod](this.baseUrl + "/" + url, this.data()) // make sure we keep the form as context within the callback
			.then(response => {
				this.onSuccess(response.data);

				resolve(response.data); // trigger all Promise-subscribers
			})
			.catch(error => {
				console.log(error);
				this.onFail(error.response.data);

				reject(error.response.data); // trigger all Promise-subscribers when error
			});
		});
	}

	onSuccess() {
		this.reset();
	}

	onFail(error) {
		console.log(error);
		this.errors.record(error.response.data);
	}

}
export default Form;
