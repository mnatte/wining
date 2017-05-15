	<template>
	  <div class="sr-item">
		{{ this.wine.name }} - {{ this.wine.color }} - {{ this.wine.vintage }} - {{ this.wine.ml }}ml
		<button type="button" @click="onEdit">Edit</button>
		<button type="button" @click="onDelete">X</button>
		<modal v-show="showForm" @close="showForm = false">
			<wine-form :wine="wine"></wine-form>
		</modal>
	  </div>
	  
	</template>

	<script>
		// import mixin from './ListItemMixin.js'
		
		import WineForm from "./WineForm.vue";
		import Modal from "./../Modal.vue";
		import Form from "./../forms/Form.js";

		export default {
			// mixins: [mixin],
			name: "WineListItem",
			components: { WineForm, Modal },
			props: ["wine"],
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {}),
					axios: require("axios"),
					showForm: false
				};
			},
			methods: {
				onDelete() {
					// this.$emit('element-remove');
					this.form.delete("wines/" + this.wine.id)
						.then(() => this.refreshWines());
				},
				refreshWines() {
					this.form.get("wines")
						.then(response => Event.fire("wines-changed", response))
						.catch(error => console.log(error)
					);
				},
				clearForm() {
					this.showForm = false;
				},
				onEdit() {
					this.showForm = true;
					Event.fire("wine-form-loaded");
				}
			},
			created() {
				Event.listen("wines-changed", () => {
					this.clearForm();
				});
			}
		};
	</script>

	<style>
		.sr-item: {background-color: light-green}
		
	</style>