	<template>
		<div>
		  <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
	          <div class="control">
	              <select v-model="form.country_id">
	                <option v-for="country in countries" :value="country.id">{{ country.name }}</option>
	              </select>
	            </div>
	             <div class="control">
	                <label for="name" class="label">Regio:</label>
	                
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
		import Form from './../forms/Form.js'

		export default {
			name: 'RegionForm',
			props: ['country', 'region'],
			components: { },
			computed: {
		  		buttonText() {
			  		if(!this.region || this.region.id == 0) {
			  			return "Aanmaken";
			  		} else {
			  			return "Wijzigen";
			  		}
		  	}

		  },
			data () {
				return {
				  form: new Form('http://192.168.60:5000/api', {
				      name: this.region ? this.region.name : '',
				      country_id: this.country.id
					}),
					axios: require('axios'),
					countries: []
				}
			},
			methods: {
			  onSubmit() {
			    // use my new Form interface with Promise!
			    var self = this;
		        // use my new Form interface with Promise!
		        if(! this.region || this.region.id == 0) {
			        this.form.post('regions')
			        	.then(response => this.refreshRegions())
			          	.catch(error => console.log(error));
			      } else {
			      	this.form.put('regions/' + this.region.id)
			          .then(response => this.refreshRegions())
			          .catch(error => console.log(error));
			      }
			  },
			 //  getRegions() {
				// this.axios.get('http://192.168.60:4000/api/regions')
				// 	.then(response => { this.regions = response.data });
				// },
				getCountries() {
					this.form.get('countries')
						.then(response => { this.countries = response });
				},
				handleEdit(regionId) {
					console.log(regionId);
				},
				refreshRegions() {
					this.form.get('regions')
		        		.then(response => Event.fire('regions-changed', response))
	          			.catch(error => console.log(error)
      				)
				}
			},
			mounted() {
			  // this.getRegions();
			  this.getCountries();
			  // console.log(this.country);
			  // console.log(this.item);
			  // console.log(this.region);
			},
			created() {
				Event.listen('countries-changed', (countries) => 
					this.countries = countries
				);
			}
		}
	</script>

	<style>
		
	</style>