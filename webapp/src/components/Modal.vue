	<template>
	  <div class="modal is-active">
		  <div class="modal-background"></div>
		  <div class="modal-card">
		    <header class="modal-card-head">
		      <p class="modal-card-title">
		      	<slot name="header"></slot>
		      </p>
		      <button class="delete" @click="onClose"></button>
		    </header>
		    <section class="modal-card-body">
		      <slot>
		      	<!--  component form comes here-->
		      </slot>
		    </section>
		    <footer class="modal-card-foot">
		    	<slot name="footer">
		    		<!-- <a class="button is-primary">Default Button</a>		 -->
		    	</slot>		      
		    </footer>
		  </div>
		</div>
	</template>

	<script>
		export default {
			name: "modal",
			data() {
				return {
		
				};
			},
			methods: {
				onClose() {
					this.$emit("close");
				}
			}
};
	</script>

	<style>
		
	</style>
