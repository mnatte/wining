<template>
		<div>
		  <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
				<div class="control">
					<label for="domain" class="label">Domaine / Producent:</label>
					<select v-model="form.domain_id">
						<option v-for="domain in domains" :value="domain.id">{{ domain.name }}</option>
					</select>
				</div>
			  <div class="control">
				<label for="appellation" class="label">Appellation:</label>
				<select v-model="form.appellation_id">
					<option v-for="appellation in appellations" :value="appellation.id">{{ appellation.name }}</option>
				</select>
				</div>
				<div class="control">
					<label for="name" class="label">Cuvee naam:</label>
					
					<input type="text" id="name" name="name" class="input" v-model="form.name"> 

					<span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
				</div>
				<div class="control">
					<label for="color" class="label">Kleur:</label>
					
					<input type="text" id="color" name="color" class="input" v-model="form.color"> 

					<span class="help is-danger" v-if="form.errors.has('color')" v-text="form.errors.get('color')"></span>
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
			name: "CuveeForm",
			props: ["appellation", "cuvee", "domain"],
			components: { },
			computed: {
				buttonText() {
					if(!this.cuvee || this.cuvee.id == 0) {
						return "Aanmaken";
					} else {
						return "Wijzigen";
					}
				}
			},
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {
						name: this.cuvee ? this.cuvee.name : "",
						appellation_id: this.cuvee ? this.cuvee.appellation_id : this.domain.main_appellation_id,
						domain_id: this.cuvee ? this.cuvee.domaine_id : this.domain.id,
						color: this.cuvee ? this.cuvee.color : "Rood"
					}),
					axios: require("axios"),
					appellations: [],
					domains: []
				};
			},
			methods: {
				onSubmit() {
					// use my new Form interface with Promise!
					// var self = this;
					// use my new Form interface with Promise!
					if(! this.cuvee || this.cuvee.id == 0) {
						this.form.post("cuvees")
						.then(() => this.refreshCuvees())
						.catch(error => console.log(error));
					} else {
						this.form.put("cuvees/" + this.cuvee.id)
						.then(() => this.refreshCuvees())
						.catch(error => console.log(error));
					}
				},
				getAppellations() {
					this.form.get("appellations")
						.then(response => { this.appellations = response.sort((a,b) => { return a.name.localeCompare(b.name); });});
				},
				getDomaines() {
					this.form.get("domaines")
						.then(response => { this.domains = response.sort((a,b) => { return a.name.localeCompare(b.name); });});
				},
				refreshCuvees() {
					this.form.get("cuvees")
						.then(response => Event.fire("cuvees-changed", response))
						.catch(error => console.log(error)
					);
				},
				refreshForm() {
					// console.log(this.domain);
					// console.log(this.cuvee);
					this.form.name = this.cuvee ? this.cuvee.name : "",
					this.form.appellation_id = this.cuvee ? this.cuvee.appellation_id : this.domain.main_appellation_id,
					this.form.domain_id = this.cuvee ? this.cuvee.domaine_id : this.domain.id,
					this.form.color = this.cuvee ? this.cuvee.color : "Rood";
				}
			},
			mounted() {
				// this.getRegions();
				this.getAppellations();
				this.getDomaines();
			},
			created() {
				Event.listen("cuvees-changed", (cuvees) => 
					this.cuvees = cuvees
				);
				Event.listen("domaines-changed", (domaines) => 
					this.domains = domaines
				);
				Event.listen("appellations-changed", (appellations) => 
					this.appellations = appellations
				);
				Event.listen("cuvee-form-loaded", () => 
						// console.log('cuvee-form-loaded');
					this.refreshForm()
				);
			}
		};
	</script>

	<style>
		
	</style>