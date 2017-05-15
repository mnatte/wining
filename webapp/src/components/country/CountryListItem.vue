	<template>
	  <div>
		{{ this.item.name }}
		<button type="button" @click="onEdit">Edit</button>
		<button type="button" @click="onDelete">X</button>
		<button type="button" @click="onAddChild">Regio toevoegen</button>
		<li v-for="child in children" v-if="filterChildren(child)">
			 <region-list-item :item="child" :country="item"></region-list-item>
		</li>
		<modal v-show="showForm" @close="showForm = false">
			<component :is="this.currentComponent" :country="item"></component>
		</modal>
		<!-- 
		this simply doesn't work. maybe too many mixins, abstractions, whatever. 
		anyways, we're talking about 3 bloody lines of reduction here. so just leave it

		<list-item>
			{{ this.item.name}}
			<template slot="addChildName">Regio toevoegen</template>
			<template slot="childItem">
				Hi!
			</template>
		</list-item> -->
	  </div>
	  
	</template>

	<script>
		// import ListItem from './ListItem.vue'
		import mixin from "./../ListItemMixin.js";
		import Form from "./../forms/Form.js";
		
		import CountryForm from "./CountryForm.vue";
		import RegionForm from "./../region/RegionForm.vue";
		import RegionListItem from "./../region/RegionListItem.vue";

		export default {
			mixins: [mixin],
			name: "CountryListItem",
			components: { CountryForm, RegionForm, RegionListItem },
			// name: 'CountryListItem',
			// components: { Modal, CountryForm, RegionForm },
			// props: ['item'],
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {}),
					axios: require("axios")
					// showForm: false,
					// currentComponent: null,
					// children: []
				};
			},
			methods: {
				getChildren() {
					this.form.get("regions")
					.then(response => { this.children = response; });
				},
				filterChildren(child) {
					// console.log(child.country_id);
					return child.country_id == this.item.id;
				},
				setEditFormActive() {
					this.currentComponent = CountryForm;
				},
				setChildFormActive() {
					this.currentComponent = RegionForm;
				},
				// onEdit() {
				// 	// this.$emit('element-edit');
				// 	this.setEditFormActive();
				// 	this.showForm = true;
				// },
				onDelete() {
					// this.$emit('element-remove');
					this.form.delete("countries/" + this.item.id)
						.then(() => this.refreshCountries());
				},
				refreshCountries() {
					this.form.get("countries")
						.then(response => Event.fire("countries-changed", response))
						.catch(error => console.log(error)
					);
				}
				// onAddChild() {
				// 	// this.$emit('element-add-child');
				// 	this.setChildFormActive();
				// 	this.showForm = true;
				// },
				// clearForm() {
				// 	this.showForm = false;
				// 	this.currentComponent = null;
				// }
			},
			// mounted() {

			// },

			created() {
				Event.listen("countries-changed", () => {
					this.clearForm();
				});
				Event.listen("regions-changed", (regions) => {
					this.clearForm();
					this.children = regions;
				});
			}
		};
	</script>

	<style>
		
	</style>