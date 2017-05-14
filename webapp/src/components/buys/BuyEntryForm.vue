<template>
		<div>
			<hr />
	             <div class="control">
	  				<label for="domain" class="label">Domaine / Producent:</label>
		              <select v-model="domain_id">
		                <option v-for="domain in domains" :value="domain.id">{{ domain.name }}</option>
		              </select>
		            </div>
		          <div class="control">
		          	<label for="wine" class="label">Wijn:</label>
		              <select v-model="formData.wine_id">
		                <option v-for="wine in wines" v-if="filterWines(wine)" :value="wine.id">{{ wine.name }} - {{ wine.color }} - {{ wine.vintage }}- {{ wine.ml }}ml</option>
		              </select>
            	</div>
            	<div class="control">
	                <label for="amount" class="label">Aantal:</label>
	                
	                <input type="text" id="amount" name="amount" class="input" v-model="formData.amount"> 

	                <!-- <span class="help is-danger" v-if="form.errors.has('amount')" v-text="form.errors.get('amount')"></span> -->
	            </div>
	            <div class="control">
		  			<label for="price" class="label">Prijs:</label>
	              	<input type="text" id="price" name="price" class="input" v-model="formData.price"> 

	                <!-- <span class="help is-danger" v-if="form.errors.has('price')" v-text="form.errors.get('price')"></span> -->
	            </div>
	            <!-- <div class="control">
	                <button class="button is-primary" :disabled="form.errors.any()">{{ this.buttonText }}</button>
	            </div> -->
	        <hr />
        </div>
	</template>

	<script>
		import Form from './../forms/Form.js'

		export default {
			name: 'BuyEntryForm',
			props: ['appellation', 'domain', 'formData'],
			components: { },
			data () {
				return {
					domain_id: 0,
					wines: [],
					domains: [],
					form: new Form('http://192.168.0.60:5000/api', {})
				}
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
			    var self = this;
		        // use my new Form interface with Promise!
		        if(! this.domain || this.domain.id == 0) {
			        this.form.post('domaines')
			        	.then(response => this.refreshDomaines())
			          	.catch(error => console.log(error));
			      } else {
			      	this.form.put('domaines/' + this.domain.id)
			          .then(response => this.refreshDomaines())
			          .catch(error => console.log(error));
			      }
			  },
			  filterWines(wine) {
			  		// console.log(child.country_id);
			  		return wine.domaine_id == this.domain_id;
			  	},
				getWines() {
					this.form.get('wines')
						.then(response => { this.wines = response.sort((a,b) => { return a.name.localeCompare(b.name); })});
				},
				getDomaines() {
					this.form.get('domaines')
		        		.then(response => Event.fire('domaines-changed', response))
	          			.catch(error => console.log(error)
      				)
				},
				refreshForm() {
					this.domain_id = 0,
				      this.wines = [],
				      this.domains = []
				}
			},
			mounted() {
			  this.getDomaines();
			  // console.log('mounted');
			  this.getWines();
			},
			created() {
				Event.listen('domaines-changed', (domaines) => 
					this.domains = domaines
				);
				Event.listen('wines-changed', (wines) => 
					this.wines = wines.sort((a,b) => { return a.name.localeCompare(b.name); })
				);
				Event.listen('domain-form-loaded', () => 
					this.refreshForm()
				);
			}
		}
	</script>

	<style>
		
	</style>