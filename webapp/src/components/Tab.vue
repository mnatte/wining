	<template>
	  <div v-show="isActive"><slot></slot></div>
	</template>

	<script>
		export default {
			props: {
				name: {required: true},
				selected: {default: false}
			},
			name: "tab",
			data() {
				return {
					isActive: false
				};
			},
			computed: {
				href() {
				// about-me
					return "#" + this.name.toLowerCase().replace(/ /g, "-");
				}

			},
			mounted() {
				this.isActive = this.selected;
			}
		};
	</script>

	<style>
		
	</style>
