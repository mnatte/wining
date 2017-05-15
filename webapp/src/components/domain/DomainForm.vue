	<template>
		<div>
		  <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
			  <div class="control">
				<label for="main_appellation_id" class="label">Voornaamste appellation:</label>
				  <select v-model="form.main_appellation_id">
					<option v-for="appellation in appellations" :value="appellation.id">{{ appellation.name }}</option>
				  </select>
				</div>
				 <div class="control">
					<label for="name" class="label">Domaine / Producent:</label>
					
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
			name: "DomainForm",
			props: ["appellation", "domain"],
			components: { },
			data () {
				return {
					form: new Form("http://192.168.60:5000/api", {
						name: this.domain ? this.domain.name : "",
						main_appellation_id: this.domain ? this.domain.main_appellation_id : 0
					}),
					axios: require("axios"),
					appellations: [],
					domaines: []
				};
			},
			computed: {
				buttonText() {
					if(!this.domain || this.domain.id == 0) {
						return "Aanmaken";
					} else {
						return "Wijzigen";
					}
				}
			},
			methods: {
				onSubmit() {
					// use my new Form interface with Promise!
					// var self = this;
					// use my new Form interface with Promise!
					if(! this.domain || this.domain.id == 0) {
						this.form.post("domaines")
						.then(() => this.refreshDomaines())
						.catch(error => console.log(error));
					} else {
						this.form.put("domaines/" + this.domain.id)
						.then(() => this.refreshDomaines())
						.catch(error => console.log(error));
					}
				},
				getAppellations() {
					this.form.get("appellations")
						.then(response => { this.appellations = response.sort((a,b) => { return a.name.localeCompare(b.name); });});
				},
				refreshDomaines() {
					this.form.get("domaines")
						.then(response => Event.fire("domaines-changed", response))
						.catch(error => console.log(error)
					);
				},
				refreshForm() {
					this.form.name = this.domain ? this.domain.name : "";
					this.form.main_appellation_id = this.domain ? this.domain.main_appellation_id : 0;
				}
			},
			mounted() {
				// this.getRegions();
				// console.log('mounted');
				this.getAppellations();
			},
			created() {
				Event.listen("domaines-changed", (domaines) => 
					this.domaines = domaines
				);
				Event.listen("appellations-changed", (appellations) => 
					this.appellations = appellations.sort((a,b) => { return a.name.localeCompare(b.name); })
				);
				Event.listen("domain-form-loaded", () => 
					this.refreshForm()
				);
			}
		};
	</script>

	<style>
		
	</style>