	<template>
	  <div class="sr-item">
	    {{ this.item.name }}
	    <button type="button" @click="onEdit">Edit</button>
	    <button type="button" @click="onDelete">X</button>
	    <button type="button" @click="onAddChild">Wijn toevoegen</button>
	    <li v-for="child in children" v-if="filterChildren(child)">
              <wine-list-item :wine="child"></wine-list-item>
        </li>
	    <modal v-show="showForm" @close="showForm = false">
	    	<component :is="this.currentComponent" :appellation="item" :subregion="subregion"></component>
	    </modal>
	  </div>
	  
	</template>

	<script>
		import mixin from './../ListItemMixin.js'
		import Form from './../forms/Form.js'
		
  		import AppellationForm from './AppellationForm.vue'
  		import WineForm from './../wine/WineForm.vue'
  		import WineListItem from './../wine/WineListItem.vue'

		export default {
			mixins: [mixin],
			name: 'AppellationListItem',
			components: { AppellationForm, WineForm, WineListItem },
			props: ['subregion'],
			  data () {
			    return {
			    	form: new Form('http://192.168.60:5000/api', {}),
			    	axios: require('axios')
			    }
			  },
			  methods: {
			  	getChildren() {
			  		this.form.get('wines')
			  		.then(response => this.children = response);
			  	},
			  	filterChildren(child) {
			  		// console.log(child.country_id);
			  		return child.appellation_id == this.item.id;
			  	},
			  	setEditFormActive() {
			  		this.currentComponent = AppellationForm;
			  	},
			  	setChildFormActive() {
			  		this.currentComponent = WineForm;
			  	},
			  	onDelete() {
			  		// this.$emit('element-remove');
			  		this.form.delete('appellations/' + this.item.id)
			  			.then(respose => this.refreshAppellations());
			  	},
			  	refreshAppellations() {
					this.form.get('appellations')
		        		.then(response => Event.fire('appellations-changed', response))
	          			.catch(error => console.log(error)
	  				)
				}
			  },
			  created() {
			      Event.listen('appellations-changed', () => {
			        this.clearForm();
			    	});
			      Event.listen('wines-changed', (wines) => {
			        this.clearForm();
			        this.children = wines;
			      });
			  }
		}
	</script>

	<style>
		.sr-item: {background-color: light-green}
		
	</style>