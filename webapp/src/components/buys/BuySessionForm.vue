<template>
		<div>
		  <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
	          <div class="control">
	                <label for="location" class="label">Locatie:</label>
	                
	                <input type="text" id="location" name="location" class="input" v-model="form.location"> 

	                <span class="help is-danger" v-if="form.errors.has('location')" v-text="form.errors.get('location')"></span>
	            </div>
	            <div class="control">
		  			<label for="date" class="label">Datum:</label>
	              	<input type="text" id="date" name="date" class="input" v-model="form.date"> 

	                <span class="help is-danger" v-if="form.errors.has('date')" v-text="form.errors.get('date')"></span>
	            </div>
	            <div class="control">
                	<button type="button" class="button is-primary" @click="addEntry()">Aankoop toevoegen</button>
            	</div>
	            <div id="buy-entries">
	            	<buy-entry-form v-for="entry in form.buyEntries" :formData="entry"></buy-entry-form>
	            </div>
	            <div class="control">
		  			<label for="discount" class="label">Korting:</label>
	              	<input type="text" id="discount" name="discount" class="input" v-model="form.discount"> 

	                <span class="help is-danger" v-if="form.errors.has('discount')" v-text="form.errors.get('discount')"></span>
	            </div>
	             <!-- <div class="control">
	                <label for="name" class="label">Cuvee naam:</label>
	                
	                <input type="text" id="name" name="name" class="input" v-model="form.name"> 

	                <span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
	            </div>
	            <div class="control">
	                <label for="color" class="label">Kleur:</label>
	                
	                <input type="text" id="color" name="color" class="input" v-model="form.color"> 

	                <span class="help is-danger" v-if="form.errors.has('color')" v-text="form.errors.get('color')"></span>
	            </div> -->
	            <div class="control">
	                <button class="button is-primary" :disabled="form.errors.any()">{{ this.buttonText }}</button>
	            </div>
	        </form>
        </div>
	</template>

	<script>
		import Form from './../forms/Form.js'
		import BuyEntryForm from './BuyEntryForm.vue'
		// import Datepicker from 'vue-bulma-datepicker'

		export default {
			name: 'BuySessionForm',
			props: ['session'],
			components: { BuyEntryForm },
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
				  form: new Form('http://192.168.60:5000/api', {
				      location: this.session ? this.session.location : '',
				      date: this.session ? this.session.date : '',
				      discount: this.session ? this.session.discount : 0,
				      buyEntries: []
				      // domain_id: this.cuvee ? this.cuvee.domain_id : this.domain.id,
				      // color: this.cuvee ? this.cuvee.color : 'Rood'
					}),
					// axios: require('axios'),
					// appellations: [],
					domains: []
				}
			},
			methods: {
			  onSubmit() {
			  	console.log(this.form.buyEntries);
			    // use my new Form interface with Promise!
			    var self = this;
		        // use my new Form interface with Promise!
		        if(! this.session || this.session.id == 0) {
			        this.form.post('buys')
			        	.then(response => this.refreshWines())
			          	.catch(error => console.log(error));
			      } else {
			      	this.form.put('buys/' + this.session.id)
			          .then(response => this.refreshWines())
			          .catch(error => console.log(error));
			      }
			  },
			  addEntry() {
				  	this.form.buyEntries.push({ wine_id: 0, amount: 0, price: 0});
			  	},
				// getAppellations() {
				// 	this.form.get('appellations')
				// 		.then(response => { this.appellations = response.sort((a,b) => { return a.name.localeCompare(b.name); })});
				// },
				getDomaines() {
					this.form.get('domaines')
						.then(response => { this.domains = response.sort((a,b) => { return a.name.localeCompare(b.name); })});
				},
				refreshWines() {
					this.form.get('wines')
		        		.then(response => Event.fire('wines-changed', response))
	          			.catch(error => console.log(error)
      				)
				},
				refreshForm() {
					// console.log(this.domain);
					// console.log(this.cuvee);
					this.form.location = this.session ? this.session.location : '',
					this.form.date = this.session ? this.session.date : '',
					this.form.discount = this.session ? this.session.discount : 0
				}
			},
			mounted() {
			  // this.getRegions();
			  // this.getAppellations();
			  this.getDomaines();
			},
			created() {
				// Event.listen('cuvees-changed', (cuvees) => 
				// 	this.cuvees = cuvees
				// );
				// Event.listen('domaines-changed', (domaines) => 
				// 	this.domains = domaines
				// );
				// Event.listen('appellations-changed', (appellations) => 
				// 	this.appellations = appellations
				// );
				// Event.listen('cuvee-form-loaded', () => 
				// 	{
				// 		// console.log('cuvee-form-loaded');
				// 		this.refreshForm();
				// 	}
				// );
			}
		}
	</script>

	<style>
		
	</style>