<template>
<div>
	  <div class="card">
		  <header class="card-header">
			<p class="card-header-title">
			  {{ wine.name }} {{ wine.vintage }}
			</p>
			<wine-bottle width="30" height="30" :color="wine.color" class="card-header-icon"></wine-bottle>
			<a class="card-header-icon" @click="showDetails = !showDetails">
			  <i class="fa fa-angle-down"></i>
			</a>
		  </header>
		  <div class="card-content" v-show="showDetails">
			<div class="content">
			  {{ wine.domaine }}<br/>
			  {{ wine.color }} | {{ wine.ml }}ml | {{ wine.alcoholpercentage }}%
			  <br>
			  <small>op voorraad: {{ wine.stock }}</small>
			</div>
		  </div>
		  <footer class="card-footer" v-show="showDetails">
			<!-- <a class="card-footer-item" @click="increaseStock">+ 1</a> -->
			<!-- <a class="card-footer-item" @click="decreaseStock">- 1</a> -->
			<div class="card-footer-item">
				<a class="card-header-icon" @click="increaseStock">
				  <i class="fa fa-plus"></i>
				</a>
				<wine-bottle v-for="w in wine.stock" width="30" height="30" :color="wine.color" class="card-header-icon" @click="decreaseStock"></wine-bottle>
			</div> 
		  </footer>
		</div>
	</div>
</template>

<script>
	import WineBottle from "./WineBottle.vue";

	export default {
		props: ["wine"],
		components: {WineBottle},
		name: "WineDetails",
		data () {
			return {
				axios: require("axios"),
				showDetails: false
			};
		},
		methods: {
			increaseStock () {
				this.axios.put("http://192.168.60:5000/api/stock/increase/" + this.wine.id)
					.then(() => { 
						this.wine.stock += 1; 
						Event.fire("stock-changed");
					});
			},
			decreaseStock () {
				this.axios.put("http://192.168.60:5000/api/stock/decrease/" + this.wine.id)
					.then(() => { 
						this.wine.stock -= 1; 
						Event.fire("stock-changed");
					});
			}
		},
		mounted() {
			// console.log(this.wine);
		}
	};
</script>

<style>
	
</style>