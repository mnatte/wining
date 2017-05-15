<template>
	  <div class="r-item">
		{{ this.item.name }}
		<button type="button" @click="onEdit">Edit</button>
		<button type="button" @click="onDelete">X</button>
		<button type="button" @click="onAddChild">Subregio toevoegen</button>
		<li v-for="child in children" v-if="filterChildren(child)">
			  <sub-region-list-item :item="child" :region="item"></sub-region-list-item>
		</li>
		<modal v-show="showForm" @close="showForm = false">
			<component :is="this.currentComponent" :region="item" :country="country"></component>
		</modal>
	  </div>
	  
	</template>

	<script>
		import mixin from "./../ListItemMixin.js";
		
		import SubRegionListItem from "./SubRegionListItem.vue";
		import RegionForm from "./RegionForm.vue";
		import SubRegionForm from "./SubRegionForm.vue";
		import Form from "./../forms/Form.js";

		export default {
			mixins: [mixin],
			name: "RegionListItem",
			components: { RegionForm, SubRegionForm, SubRegionListItem },
			props: ["country"],
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {}),
					axios: require("axios")
				};
			},
			methods: {
				getChildren() {
					this.form.get("subregions")
					.then(response => this.children = response);
				},
				filterChildren(child) {
					// console.log(child.country_id);
					return child.region_id == this.item.id;
				},
				setEditFormActive() {
					this.currentComponent = RegionForm;
				},
				setChildFormActive() {
					this.currentComponent = SubRegionForm;
				},
				onDelete() {
					// this.$emit('element-remove');
					this.form.delete("regions/" + this.item.id)
					.then(() => this.refreshRegions());
				},
				refreshRegions() {
					this.form.get("regions")
					.then(response => Event.fire("regions-changed", response))
					.catch(error => console.log(error));
				}
			},
			created() {
				Event.listen("regions-changed", () => {
					this.clearForm();
				});
				Event.listen("subregions-changed", (subregions) => {
					this.clearForm();
					this.children = subregions;
				});
			}
		};
	</script>

	<style>
		.r-item: { background-color: yellow; }
		
	</style>