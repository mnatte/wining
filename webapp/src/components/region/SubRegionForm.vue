	<template>
		<div>
			<form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
				<div class="control">
					<select v-model="form.region_id">
					<option v-for="region in regions" :value="region.id">{{ region.name }}</option>
					</select>
				</div>
				<div class="control">
					<label for="name" class="label">Subregio:</label>

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
		import Form from "./../forms/Form.js";

		export default {
			name: "SubRegionForm",
			props: ["region", "subregion"],
			components: { },
			computed: {
				buttonText() {
					if(!this.subregion || this.subregion.id == 0) {
						return "Aanmaken";
					} else {
						return "Wijzigen";
					}
				}
			},
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {
						name: this.subregion ? this.subregion.name : "",
						region_id: this.region.id
					}),
					axios: require("axios"),
					regions: {}
				};
			},
			methods: {
				onSubmit() {
					// use my new Form interface with Promise!
					// var self = this;
					// use my new Form interface with Promise!
					if(! this.subregion || this.subregion.id == 0) {
						this.form.post("subregions")
						.then(() => this.refreshSubRegions())
						.catch(error => console.log(error));
					} else {
						this.form.put("subregions/" + this.subregion.id)
						.then(() => this.refreshSubRegions())
						.catch(error => console.log(error));
					}
				},
				getRegions() {
					this.form.get("regions")
						.then(response => { this.regions = response; });
				},
				refreshSubRegions() {
					this.form.get("subregions")
						.then(response => Event.fire("subregions-changed", response))
						.catch(error => console.log(error)
					);
				}
			},
			mounted() {
				// this.getRegions();
				this.getRegions();
			},
			created() {
				Event.listen("regions-changed", (regions) => 
					this.regions = regions
				);
			}
		};
	</script>

	<style>
		
	</style>