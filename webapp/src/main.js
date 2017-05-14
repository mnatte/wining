import Vue from "vue";
import App from "./components/App.vue";

// let's build a wrapper around Vue's event stuff $emit and $on at the global level
  // now all components can fire an event and listen to an event globally
window.Event = new class {
	constructor() {
		this.vue = new Vue();
	}

	fire(event, data = null) {
		this.vue.$emit(event, data);
	}

	listen(event, callback) {
		this.vue.$on(event, callback);
	}
  }();

new Vue({
	el: "#app",
	render: h => h(App)
});
