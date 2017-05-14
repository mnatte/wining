	<template>
		<div>
		  <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
		  		<!-- <div class="control">
		  			<label for="domaine" class="label">Domaine / Producent:</label>
	              <select v-model="form.domaine_id">
	                <option v-for="domaine in domaines" :value="domaine.id">{{ domaine.name }}</option>
	              </select>
	            </div> -->
	          <div class="control">
	          	<label for="cuvee" class="label">Cuvee:</label>
	              <select v-model="form.cuvee_id">
	                <option v-for="cuvee in cuvees" :value="cuvee.id">{{ cuvee.name }} - {{ cuvee.color }}</option>
	              </select>
	            </div>
	             <!-- <div class="control">
	                <label for="name" class="label">Wijn naam:</label>
	                
	                <input type="text" id="name" name="name" class="input" v-model="form.name"> 

	                <span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
	            </div>
	            <div class="control">
	                <label for="color" class="label">Kleur:</label>
	                
	                <input type="text" id="color" name="color" class="input" v-model="form.color"> 

	                <span class="help is-danger" v-if="form.errors.has('color')" v-text="form.errors.get('color')"></span>
	            </div> -->
	            <div class="control">
	                <label for="vintage" class="label">Wijnjaar:</label>
	                
	                <input type="text" id="vintage" name="vintage" class="input" v-model="form.vintage"> 

	                <span class="help is-danger" v-if="form.errors.has('vintage')" v-text="form.errors.get('vintage')"></span>
	            </div>
	            <div class="control">
	                <label for="ml" class="label">Inhoud (ml):</label>
	                
	                <input type="text" id="ml" name="ml" class="input" v-model="form.ml"> 

	                <span class="help is-danger" v-if="form.errors.has('ml')" v-text="form.errors.get('ml')"></span>
	            </div>
	            <div class="control">
	                <label for="alcohol" class="label">Alcohol %:</label>
	                
	                <input type="text" id="alcohol" name="alcohol" class="input" v-model="form.alcohol"> 

	                <span class="help is-danger" v-if="form.errors.has('alcohol')" v-text="form.errors.get('alcohol')"></span>
	            </div>
	            <div class="control">
	                <label for="stock" class="label">Aantal op voorraad:</label>
	                
	                <input type="text" id="stock" name="stock" class="input" v-model="form.stock"> 

	                <span class="help is-danger" v-if="form.errors.has('stock')" v-text="form.errors.get('stock')"></span>
	            </div>
	            <div class="control">
	                <button class="button is-primary" :disabled="form.errors.any()">{{ this.buttonText }}</button>
	            </div>
	        </form>
        </div>
	</template>

	<script>
		import Form from './../forms/Form.js'

		export default {
			name: 'WineForm',
			props: ['cuvee', 'wine'],
			components: { },
			computed: {
		  		buttonText() {
			  		if(!this.wine || this.wine.id == 0) {
			  			return "Aanmaken";
			  		} else {
			  			return "Wijzigen";
			  		}
			  	}
		  	},
			data () {
				return {
				  form: new Form('http://192.168.60:5000/api', {
				      cuvee_id: this.wine ? this.wine.cuvee_id : this.cuvee.id,
				      // domaine_id: this.cuvee ? this.cuvee.domaine_id : 0,
				      // appellation_id: this.wine ? this.wine.cuvee.appellation_id : this.cuvee.appellation_id,
				      // color: this.wine ? this.wine.cuvee.color : this.cuvee.color,
				      vintage: this.wine ? this.wine.vintage : '',
				      alcohol: this.wine ? this.wine.alcoholpercentage : 13.5,
				      ml: this.wine ? this.wine.ml : 750,
				      stock: this.wine ? this.wine.stock : 1
					}),
					axios: require('axios'),
					cuvees: [],
					domaines: []
				}
			},
			methods: {
			  onSubmit() {
			    // use my new Form interface with Promise!
			    var self = this;
		        // use my new Form interface with Promise!
		        if(! this.wine || this.wine.id == 0) {
			        this.form.post('wines')
			        	.then(response => this.refreshWines())
			          	.catch(error => console.log(error));
			      } else {
			      	this.form.put('wines/' + this.wine.id)
			          .then(response => this.refreshWines())
			          .catch(error => console.log(error));
			      }
			  },
				getCuvees() {
					this.form.get('cuvees')
						.then(response => { this.cuvees = response.sort((a,b) => { return a.name.localeCompare(b.name); })});
				},
				getDomaines() {
					this.form.get('domaines')
						.then(response => { this.domaines = response.sort((a,b) => { return a.name.localeCompare(b.name); })});
				},
				refreshWines() {
					this.form.get('wines')
		        		.then(response => Event.fire('wines-changed', response))
	          			.catch(error => console.log(error)
      				)
				},
				refreshForm() {
						console.log(this.wine);
					  this.form.cuvee_id = this.wine ? this.wine.cuvee_id : this.cuvee.id,
				      // this.form.domaine_id = this.cuvee ? this.cuvee.domaine_id : 0,
				      // this.form.appellation_id = this.wine ? this.wine.cuvee.appellation_id : this.cuvee.appellation_id,
				      // this.form.color = this.wine ? this.wine.cuvee.color : this.cuvee.color,
				      this.form.vintage = this.wine ? this.wine.vintage : '',
				      this.form.alcohol = this.wine ? this.wine.alcoholpercentage : 13.5
				      this.form.ml = this.wine ? this.wine.ml : 750,
				      this.form.stock = this.wine ? this.wine.stock : 1
				}
			},
			mounted() {
			  // this.getRegions();
			  this.getCuvees();
			  this.getDomaines();
			},
			created() {
				Event.listen('wines-changed', (wines) => 
					this.wines = wines
				);
				Event.listen('domaines-changed', (domaines) => 
					this.domaines = domaines
				);
				Event.listen('appellations-changed', (appellations) => 
					this.appellations = appellations
				);
				Event.listen('wine-form-loaded', () => 
					this.refreshForm()
				);
			}
		}
	</script>

	<style>
		
	</style>