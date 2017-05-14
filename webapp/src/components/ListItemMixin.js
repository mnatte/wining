import Modal from './Modal.vue'

export default {
	name: 'ListItemMixin',
	components: { Modal },
	props: ['item'],
  data () {
    return {
      showForm: false,
      currentComponent: null,
      axios: require('axios'),
      children: []
      // client: new RESTclient()
    }
  },
  methods: {
    displayChild(child) {
      return 'displayChild not set';
    },
  	getChildren() {
  		// set children []  
  	},
  	filterChildren(child) {
  		// console.log(child.country_id);
  		// return child.country_id == this.item.id;
  		return true;
  	},
  	setEditFormActive() {
  		// this.currentComponent = CountryForm;
  	},
  	setChildFormActive() {
  		// this.currentComponent = RegionForm;
  	},
  	onEdit() {
  		// this.$emit('element-edit');
  		this.setEditFormActive();
  		this.showForm = true;
  	},
  	onDelete() {
  		// this.axios.delete(this.deleteUri + '/' + this.item.id)
  		// 	.then(data => Event.fire('countries-changed'));
  	},
  	onAddChild() {
  		// this.$emit('element-add-child');
  		this.setChildFormActive();
  		this.showForm = true;
  	},
  	clearForm() {
  		this.showForm = false;
  		this.currentComponent = null;
  	}
  },
  mounted() {
  	this.getChildren();
  },

  created() {
      // Event.listen('countries-changed', () => 
      //   this.clearForm()
      // );
      // Event.listen('regions-changed', () => 
      //   this.clearForm()
      // );
  }
}