	<template>
	  <div id="stock">
	  	<div style="display: inline-block;">
		  	<graph 
		  		url="http://192.168.60:5000/api/stockByCountry" 
		  		color="lightblue" 
		  		groupBy="country" 
		  		@bar-selected="showRegions"
		  		title="Voorraad per land"
		  		width="400"
		  		height="250"
		  		>
		  	</graph>
	  	</div>
	  	<div style="display: inline-block;">
		  	<graph 
		  		:url="regionUrl"
		  		groupBy="region" 
		  		@bar-selected="showAppellations"
		  		:title="selectedCountry"
		  		v-if="showRegionsGraph"
				width="400"
		  		height="250"
		  		>
		  	</graph>
	  	</div>
	  	<div>
		  	<graph 
		  		:url="appellationUrl"
		  		groupBy="appellation" 
		  		@bar-selected="filterWinesByAppellation"
		  		:title="selectedRegion"
		  		v-if="showAppellationsGraph"
				width="800"
		  		height="250"
		  		>
		  	</graph>
	  	</div>
	  	<ul v-show="showAppellationWines">
	    	<li v-for="wine in winesByAppellation">
              <wine-details :wine="wine" key="wine.id"></wine-details>
        	</li>
	    </ul>
	  	<div>
		  	<graph 
		  		:url="domaineUrl"
		  		groupBy="domaine" 
		  		@bar-selected="filterWinesByDomaine"
		  		:title="selectedRegion"
		  		v-if="showDomainesGraph"
				width="1000"
		  		height="300"
		  		>
		  	</graph>
	  	</div>
	    <ul v-show="showDomaineWines">
	    	<li v-for="wine in winesByDomaine">
              <wine-details :wine="wine" key="wine.id"></wine-details>
        	</li>
	    </ul>
	  </div>
	</template>

	<script>
		import WineDetails from './Wine.vue'
		import Graph from './../Graph.vue'
		import Form from './../forms/Form.js'

		export default {
		components: { WineDetails, Graph },
		  name: 'app',
		  data () {
		    return {
		      wines: [],
		      axios: require('axios'),
		      ld: require('lodash'),
		      showRegionsGraph: false,
		      showAppellationsGraph: false,
		      showDomainesGraph: false,
		      showAppellationWines: false,
		      showDomaineWines: false,
		      regionUrl: '',
		      appellationUrl: '',
		      domaineUrl: '',
		      selectedCountry: '',
		      selectedRegion: '',
		      selectedAppellation: '',
		      selectedDomaine: '',
		      form: new Form('http://192.168.60:5000/api', {}),
		    }
		  },
		  computed: {
		  	winesByAppellation: function() {
		  		return this.wines.filter(w=>w.appellation == this.selectedAppellation);
		  	},
		  	winesByDomaine: function() {
		  		return this.wines.filter(w=>w.domaine == this.selectedDomaine);
		  	}
		  },
		  methods: {
			getStock() {
				this.form.get('stock')
					.then(response => { 
						this.wines = response.sort((a,b) => { return a.appellation.localeCompare(b.appellation); });
						// console.log(this.wines);
						// var countries = this.wines.map(wine => { return { country: wine.country, stock: wine.stock }});
						// var sum = this.ld.reduce(countries, (sum, country) => { return sum + country.stock; }, 0)
						// Event.fire('stock-loaded', this.ld.groupBy(countries, 'country')this.ld.sumBy(countries, 'stock'));
					});
				},
				showRegions(country) {
					// this.showRegionsGraph = false;
					this.regionUrl = "http://192.168.60:5000/api/stockByCountry/" + encodeURIComponent(country);
					this.selectedCountry = country;
					this.showRegionsGraph = true;
					this.showAppellationsGraph = false;
					this.showWines = false;
					console.log(this.regionUrl);
				},
				showAppellations(region) {
					this.appellationUrl = "http://192.168.60:5000/api/stockByRegion/" + encodeURIComponent(region);
					this.selectedRegion = region;
					this.showAppellationsGraph = true;
					this.showAppellationWines = false;
					console.log(this.appellationUrl);
					this.showDomaines(region);
				},
				showDomaines(region) {
					this.domaineUrl = "http://192.168.60:5000/api/stock/domaines/" + encodeURIComponent(region);
					this.selectedRegion = region;
					this.showDomainesGraph = true;
					this.showDomaineWines = false;
					console.log(this.domaineUrl);
				},
				filterWinesByAppellation(appellation) {
					this.selectedAppellation = appellation;
					//this.winesByAppellation = this.wines.filter(w=>w.appellation == appellation);
					this.showAppellationWines = true;
					// console.log(appellation);
				},
				filterWinesByDomaine(domaine) {
					this.selectedDomaine = domaine;
					//this.winesByAppellation = this.wines.filter(w=>w.appellation == appellation);
					this.showDomaineWines = true;
					// console.log(appellation);
				}
			},
		  mounted() {
		  	// console.log('mounted');
		  	this.getStock();
		  	// this.groupedWines = this.ld.groupBy(this.wines, 'country');
		  },
		  created() {
		  	// console.log('created');
		      Event.listen('wines-changed', (data) => {
		      	// console.log('wines-changed from Stock.vue');
		      		this.wines = data;
		   //      this.axios.get('http://192.168.60:4000/api/stock')
					// .then(response => { this.wines = response.data.sort((a,b) => { return a.appellation.localeCompare(b.appellation); })
					// })
					// this.getStock();
				});
		      Event.listen('domaines-changed', (data) => {
		      	console.log('domaines-changed from Stock.vue');
		      	this.getStock();
				});
		  }
		}
	</script>

	<style>
		
	</style>