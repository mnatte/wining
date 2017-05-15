	<template>
		<div class="sr-item">
			{{ this.domain.name }}
			<button type="button" @click="onEdit">Edit</button>
			<button type="button" @click="onDelete">X</button>
			<button type="button" @click="onAddChild">Cuvee toevoegen</button>
			<li v-for="child in children" v-if="filterChildren(child)">
				<cuvee-list-item :cuvee="child"></cuvee-list-item>
			</li>
			<modal v-show="showForm" @close="showForm = false">
				<component :is="this.currentComponent" :domain="domain"></component>
			</modal>
		</div>
	  
	</template>

	<script>
		import mixin from "./../ListItemMixin.js";
		
		import DomainForm from "./DomainForm.vue";
		import Modal from "./../Modal.vue";
		import Form from "./../forms/Form.js";
		import CuveeForm from "./../cuvee/CuveeForm.vue";
		import CuveeListItem from "./../cuvee/CuveeListItem.vue";

		export default {
			mixins: [mixin],
			name: "DomainListItem",
			components: { DomainForm, Modal, CuveeForm, CuveeListItem },
			props: ["domain"],
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {}),
					// axios: require('axios'),
					showForm: false
				};
			},
			methods: {
				getChildren() {
					this.form.get("cuvees")
					.then(response => this.children = response);
				},
				filterChildren(child) {
					// console.log(child.country_id);
					return child.domaine_id == this.domain.id;
				},
				setEditFormActive() {
					this.currentComponent = DomainForm;
					Event.fire("domain-form-loaded");
					console.log(this.currentComponent);
				},
				setChildFormActive() {
					this.currentComponent = CuveeForm;
					Event.fire("cuvee-form-loaded");
					console.log(this.currentComponent);
				},
				onDelete() {
					// this.$emit('element-remove');
					this.form.delete("domaines/" + this.domain.id)
					.then(() => this.refreshDomains());
				},
				refreshDomains() {
					this.form.get("domaines")
					.then(response => Event.fire("domaines-changed", response))
					.catch(error => console.log(error));
				},
				clearForm() {
					this.showForm = false;
				}
			// , onEdit is already defined in mixin, don't overwrite
			// onEdit() {
			// 	this.showForm = true;
			// 	Event.fire('domain-form-loaded');
			// }
			},
			created() {
				Event.listen("domaines-changed", () => {
					this.clearForm();
				});
				Event.listen("cuvees-changed", (cuvees) => {
					this.clearForm();
					this.children = cuvees;
				});
			}
		};
	</script>

	<style>
		.sr-item: {background-color: light-green}
		
	</style>