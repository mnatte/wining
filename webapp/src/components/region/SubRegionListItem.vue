	<template>
	  <div class="sr-item">
		{{ this.item.name }}
		<button type="button" @click="onEdit">Edit</button>
		<button type="button" @click="onDelete">X</button>
		<button type="button" @click="onAddChild">Appellation toevoegen</button>
		<li v-for="child in children" v-if="filterChildren(child)">
			  <appellation-list-item :item="child" :subregion="item"></appellation-list-item>
		</li>
		<modal v-show="showForm" @close="showForm = false">
			<component :is="this.currentComponent" :subregion="item" :region="region"></component>
		</modal>
	  </div>
	  
	</template>

	<script>
		import mixin from "./../ListItemMixin.js";
		import Form from "./../forms/Form.js";
		import SubRegionForm from "./SubRegionForm.vue";
		import AppellationForm from "./../appellation/AppellationForm.vue";
		import AppellationListItem from "./../appellation/AppellationListItem.vue";

		export default {
			mixins: [mixin],
			name: "SubRegionListItem",
			components: { SubRegionForm, AppellationForm, AppellationListItem },
			props: ["region"],
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {}),
					axios: require("axios")
				};
			},
			methods: {
				getChildren() {
					this.form.get("appellations")
					.then(response => this.children = response);
				},
				filterChildren(child) {
					// console.log(child.country_id);
					return child.subregion_id == this.item.id;
				},
				setEditFormActive() {
					this.currentComponent = SubRegionForm;
				},
				setChildFormActive() {
					this.currentComponent = AppellationForm;
				},
				onDelete() {
					// this.$emit('element-remove');
					this.form.delete("subregions/" + this.item.id)
						.then(() => this.refreshSubRegions());
				},
				refreshSubRegions() {
					this.form.get("subregions")
						.then(response => Event.fire("subregions-changed", response))
						.catch(error => console.log(error));
				},
				created() {
					Event.listen("subregions-changed", () => {
						this.clearForm();
					});
					Event.listen("appellations-changed", (appellations) => {
						this.clearForm();
						this.children = appellations;
					});
				}
			}
		};
	</script>

	<style>
		.sr-item: {background-color: light-green}

	</style>