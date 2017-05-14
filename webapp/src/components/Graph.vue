<template>
	<div id="graph">
		<canvas id="cvGraph" :width="width" :height="height" ref="canvas"></canvas>
		<!-- <div class="legend" :v-html="legend"></div> -->
	</div>
</template>

<script>
	import Chart from "chart.js";

	export default {
		props: ["url", "color", "graphData", "groupBy", "title", "width", "height"],
		name: "Graph",
		data() {
			return {
				axios: require("axios"),
				ld: require("lodash"),
				graphContext: {},
				chart: {}
			};
		},
		watch: {
		// whenever url changes, this function will run
		/* eslint-disable no-unused-vars */
			url: function (newUrl) {
				this.chart.clear();
				this.load();
			},
			title: function (newTitle) {
				console.log(newTitle);
				this.chart.options.title.text = newTitle;
			}
		},
		methods: {
			getData(url) {
				return this.axios.get(url);
			},
			render(data) {
				this.chart.config.data = data;
				this.chart.update();
			},
			initializeChart() {
				this.chart = new Chart(this.graphContext, {
					type: "bar",
					options: {
						responsive: false,
						title: {
							display: true,
							text: this.title
						},
						scales: {
							xAxes: [{
								gridLines: {
									display: false
								},
								ticks: {
									min: 0,
									stepSize: 1
								}
							}],

							yAxes: [{
								gridLines: {
									display: false
								},
								ticks: {
									min: 0,
									stepSize: 1
								}
							}]
						},
						onClick: evt => {
							//  	console.log(chart);
							var activeElement = this.chart.getElementAtEvent(evt);
							// console.log(activeElement);
							if (activeElement.length > 0) {
								var selected = activeElement[0]._model.label;
								this.$emit("bar-selected", selected);
							}
						}
					},
					data: []
				});
			},
			getColorAmount(color, groupedByCollection) {
			/* eslint-disable no-mixed-spaces-and-tabs */
      		return this.ld.chain(groupedByCollection)
	      		.sort((a, b) => {
		        	return a.grp.localeCompare(b.grp);
	    		})
	      		.map(c => c.amountColor)
	      		.map(c => c.map(col => col.color === color ? col.amount : 0)
	      					.reduce((sum, item) => {
						  		sum += item;
						  		return sum;
						}, 0))
				.value();
			},
			load() {
				var self = this;
				this.getData(this.url).then(response => {
					const data = response.data;
					console.log(data);
					const groupedBy = data.reduce(function (groups, currentValue) {
						if (groups.indexOf(currentValue[self.groupBy]) === -1) {
							groups.push(currentValue[self.groupBy]);
						}
						return groups;
					}, []).map(function (group) {
						return {
							grp: group,
							amountColor: data.filter(function (_el) {
								return _el[self.groupBy] === group;
							}).map(function (_el) {
								return {color: _el.color, amount: _el.amount};
							})
						};
					});
					this.render({
						labels: groupedBy
					.map(c => c.grp)
					.sort((a, b) => {
						return a.localeCompare(b);
					}),
						datasets: [
							{
								label: "# Rood",
								data: this.getColorAmount("Rood", groupedBy),
					// data: this.ld.chain(groupedBy)
					// 	.sort((a, b) => {
					// 		return a.grp.localeCompare(b.grp);
					// 	}).map(c => c.amountColor)
					// 	.map(c => c
					// 		.map(col => col.color === 'Rood' ? col.amount : 0)
					// 		.reduce((sum, item) => {
					// 			sum += item; return sum;
					// 		}, 0))
					// 	.value(),
								backgroundColor: "rgba(255,10,10,0.7)"
							},
							{
								label: "# Wit",
								data: this.getColorAmount("Wit", groupedBy),
					// data: this.ld.chain(groupedBy)
					// 	.sort((a, b) => {
					// 		return a.grp.localeCompare(b.grp);
					// 	}).map(c => c.amountColor)
					// 		.map(c => c
					// 		.map(col => col.color === 'Wit' ? col.amount : 0)
					// 		.reduce((sum, item) => {
					// 			sum += item; return sum;
					// 		}, 0))
					// 	.value(),
								backgroundColor: "rgba(255, 206, 86, 0.2)"
							}
						]
					});
				});
			}
		},
		mounted() {
			this.graphContext = this.$refs.canvas.getContext("2d"); // Vue way of getting element
			this.initializeChart();
			this.load();
		},
		created() {
			// console.log('created');
			Event.listen("wines-changed", () => {
				this.load();
			});
			Event.listen("stock-changed", () => {
				this.load();
			});
		}
	};
</script>

<style>

</style>
