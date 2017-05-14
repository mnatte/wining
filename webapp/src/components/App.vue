<template>
  <div id="app">
    <!-- <wine></wine> -->
    <tabs>
          <tab name="Data entry" selected="true">
            <div class="control">
                <button class="button is-primary" @click="countryForm = true">Land toevoegen</button>
            </div>
            <modal v-show="countryForm" @close="countryForm = false">
              <country-form></country-form>
            </modal>
            <ul>
              <li v-for="country in countries">
                  <country-list-item @element-edit="" :item="country"></country-list-item>
                </li>
           </ul>
          </tab>
          <tab name="Domaines / Producenten">
          <div class="control">
                <button class="button is-primary" @click="newForm = true">Domaine toevoegen</button>
            </div>
            <modal v-show="newForm" @close="newForm = false">
              <domain-form></domain-form>
            </modal>
            <ul>
              <li v-for="domain in domaines">
                  <domain-list-item :domain="domain"></domain-list-item>
                  <modal v-show="showForm" @close="showForm = false">
                    <domain-form :domain="domain"></domain-form>
                  </modal>
              </li>
           </ul>
          </tab>
          <tab name="Voorraad">
            <stock></stock>
          </tab>
          <tab name="Aankopen">
            <div class="control">
                <button class="button is-primary" @click="buyForm = true">Aankoop toevoegen</button>
            </div>
            <modal v-show="buyForm" @close="buyForm = false">
              <buy-session-form></buy-session-form>
            </modal>
          </tab>
       </tabs>
  </div>
</template>

<script>
  // import Wine from './Wine.vue'
  import CountryListItem from './country/CountryListItem.vue'
  import DomainListItem from './domain/DomainListItem.vue'
  import Tabs from './Tabs.vue'
  import Tab from './Tab.vue'
  import Modal from './Modal.vue'
  import DomainForm from './domain/DomainForm.vue'
  import CountryForm from './country/CountryForm.vue'
  import Stock from './wine/Stock.vue'
  import BuySessionForm from './buys/BuySessionForm.vue'
  

  export default {
    components: { CountryListItem, DomainListItem, Tabs, Tab, Modal, DomainForm, CountryForm, Stock, BuySessionForm },
    name: 'app',
    data () {
      return {
        countries: [],
        domaines: [],
        // regions: [],
        axios: require('axios'),
        showForm: false,
        newForm: false,
        countryForm: false,
        buyForm: false
      }
    },
    computed: { 
    },
    methods: {
      getCountries() {
            this.axios.get('http://192.168.60:5000/api/countries')
              .then(response => { this.countries = response.data });
      },
      getDomaines() {
            this.axios.get('http://192.168.60:5000/api/domaines')
              .then(response => { this.domaines = response.data });
      }
    },
    mounted() {
      this.getCountries();
      this.getDomaines();
    },
    created() {
      Event.listen('countries-changed', (countries) => 
        this.countries = countries
      );
      Event.listen('domaines-changed', (domaines) => 
        this.domaines = domaines
      );
      Event.listen('wines-changed', (wines) => 
        this.buyForm = false
      );
    }
    
  }
</script>

<style>

</style>
