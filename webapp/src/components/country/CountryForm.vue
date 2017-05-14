	<template>
	  <div id="frm">
	    
	    <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
            <div class="control">
                <label for="name" class="label">{{ this.country ? 'Land id: ' + this.country.id : 'Land naam:' }}</label>
                
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
			props: ['country'],
			components: { },
			name: 'CountryForm',
		  data () {
		    return {
		     form: new Form('http://192.168.60:5000/api', {
		          name: this.country ? this.country.name : '',
		          id: this.country ? this.country.id : 0
		        }),
		     axios: require('axios')
		    }
		  },
		  computed: {
		  	buttonText() {
		  		if(!this.country || this.country.id == 0) {
		  			return "Aanmaken";
		  		} else {
		  			return "Wijzigen";
		  		}
		  	}

		  },
		  methods: {
		      onSubmit() {
		      	var self = this;
		        // use my new Form interface with Promise!
		        if(!this.country || this.country.id == 0) {
			        this.form.post('countries')
			        	.then(response => this.refreshCountries())
			          	.catch(error => console.log(error));
			      } else {
			      	this.form.put('countries/' + this.country.id)
			          	.then(response => this.refreshCountries())
			          	.catch(error => console.log(error));
			      }
		    },
		    handleEdit(data) {
		    	console.log(data);
		    },
		    refreshCountries() {
				this.form.get('countries')
	        		.then(response => Event.fire('countries-changed', response.data))
          			.catch(error => console.log(error)
  				)
			}
		},
	    mounted() {
	      // this.getCountries();
	    }
	}	
	</script>

	<style>
		
	</style>