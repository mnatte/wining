	<template>
		<div>
		  <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
			  <div class="control">
				  <select v-model="form.subregion_id">
					<option v-for="subregion in subregions" :value="subregion.id">{{ subregion.name }}</option>
				  </select>
				</div>
				 <div class="control">
					<label for="name" class="label">Appellation:</label>
					
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
			name: "AppellationForm",
			props: ["subregion", "appellation"],
			components: { },
			computed: {
				buttonText() {
					if(!this.appellation || this.appellation.id == 0) {
						return "Aanmaken";
					} else {
						return "Wijzigen";
					}
				}
			},
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {
						name: this.appellation ? this.appellation.name : "",
						subregion_id: this.subregion.id
					}),
					axios: require("axios"),
					subregions: {}
				};
			},
			methods: {
				onSubmit() {
					// use my new Form interface with Promise!
					// var self = this;
					// use my new Form interface with Promise!
					if(! this.appellation || this.appellation.id == 0) {
						this.form.post("appellations")
						.then(() => this.refreshAppellations())
						.catch(error => console.log(error));
					} else {
						this.form.put("appellations/" + this.appellation.id)
						.then(() => this.refreshAppellations())
						.catch(error => console.log(error));
					}
				},
				getSubRegions() {
					this.form.get("subregions")
						.then(response => { this.subregions = response; });
				},
				refreshAppellations() {
					this.form.get("appellations")
						.then(response => Event.fire("appellations-changed", response))
						.catch(error => console.log(error)
					);
				}
			},
			mounted() {
				// this.getRegions();
				this.getSubRegions();
			},
			created() {
				Event.listen("appellations-changed", (appellations) => 
					this.appellations = appellations
				);
			}
		};
	</script>

	<style>
		
	</style>