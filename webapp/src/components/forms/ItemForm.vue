<template>
	<div id="frm">

		<form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
			<div class="control">
				<label for="name" class="label">{{ this.item ? 'Item id: ' + this.item.id : 'Item naam:' }}</label>

				<input type="text" id="name" name="name" class="input" v-model="form.name"> 

				<span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
			</div>
			<div class="control">
				<button class="button is-primary" :disabled="form.errors.any()">{{ this.buttonText }}</button>
			</div>
		</form>
	</div>
</template>

<script>
	import Form from "./Form.js";
	export default {
		props: ["item"],
		components: { },
		name: "ItemForm",
		data() {
			return {
				form: new Form({
					name: this.item ? this.item.name : "",
					id: this.item ? this.item.id : 0
				}),
				axios: require("axios")
			};
		},
		computed: {
			buttonText() {
				if (!this.item || this.item.id === 0) {
					return "Aanmaken";
				}
				return "Wijzigen";
			}
		},
		methods: {
			onSubmit() {
			// var self = this;
			// use my new Form interface with Promise!
				if (!this.item || this.item.id === 0) {
					this.form.post("http://192.168.60:4000/api/items")
				.then(() => this.refreshItems())
				.catch(error => console.log(error));
				} else {
					this.form.put("http://192.168.60:4000/api/items/" + this.item.id)
				.then(() => this.refreshItems())
				.catch(error => console.log(error));
				}
			},
			handleEdit(data) {
				console.log(data);
			},
			refreshItems() {
				this.axios.get("http://192.168.60:4000/api/items")
				.then(response => Event.fire("items-changed", response.data))
				.catch(error => console.log(error)
				);
			}
		},
		mounted() {
		// this.getCountries();
		}
	};
</script>

<style>

</style>
