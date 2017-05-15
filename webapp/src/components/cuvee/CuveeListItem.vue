<template>
	  <div class="sr-item">
		{{ this.cuvee.appellation_name }} - {{ this.cuvee.name }}
		<button type="button" @click="onEdit">Edit</button>
		<button type="button" @click="onDelete">X</button>
		<button type="button" @click="onAddChild">Wijn toevoegen</button>
		<li v-for="child in children" v-if="filterChildren(child)">
			  <wine-list-item :wine="child"></wine-list-item>
		</li>
		<modal v-show="showForm" @close="showForm = false">
			<component :is="this.currentComponent" :cuvee="cuvee"></component>
		</modal>
		<!-- <modal v-show="showForm" @close="showForm = false">
			<cuvee-form :cuvee="cuvee"></cuvee-form>
		</modal> -->
	  </div>
	  
	</template>

	<script>
		import mixin from "./../ListItemMixin.js";
		
		import CuveeForm from "./CuveeForm.vue";
		import WineForm from "./../wine/WineForm.vue";
		import WineListItem from "./../wine/WineListItem.vue";
		import Modal from "./../Modal.vue";
		import Form from "./../forms/Form.js";

		export default {
			mixins: [mixin],
			name: "CuveeListItem",
			components: { CuveeForm, WineForm, WineListItem, Modal },
			props: ["cuvee"],
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {}),
					//axios: require('axios'),
					showForm: false
				};
			},
			methods: {
				getChildren() {
					this.form.get("wines")
					.then(response => this.children = response);
				},
				filterChildren(child) {
					// console.log(child.country_id);
					return child.cuvee_id == this.cuvee.id;
				},
				setEditFormActive() {
					this.currentComponent = CuveeForm;
					Event.fire("cuvee-form-loaded");
					// console.log(this.currentComponent);
				},
				setChildFormActive() {
					this.currentComponent = WineForm;
					Event.fire("wine-form-loaded");
					// console.log(this.currentComponent);
				},
				onDelete() {
					// this.$emit('element-remove');
					this.form.delete("cuvees/" + this.cuvee.id)
						.then(() => this.refreshCuvees());
				},
				refreshCuvees() {
					this.form.get("cuvees")
						.then((response) => Event.fire("cuvees-changed", response))
						.catch(error => console.log(error)
					);
				},
				clearForm() {
					this.showForm = false;
				}
				// ,
				// onEdit() {
				// 	this.showForm = true;
				// 	Event.fire('cuvee-form-loaded');
				// }
			},
			created() {
				Event.listen("cuvees-changed", () => {
					this.clearForm();
				});
				Event.listen("wines-changed", (wines) => {
					this.clearForm();
					this.children = wines;
				});
			}
		};
	</script>

	<style>
		.sr-item: {background-color: light-green}
		
	</style>