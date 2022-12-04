<template>
  <div class="toast-container position-fixed top-1 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto text-danger">Erro!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body text-danger">Selecione um local no mapa</div>
    </div>
  </div>
  <div class="card mb-5">
    <div class="card-body">
      <h5 class="card-title">Cadastrar empresa</h5>
      <form @submit.prevent="createCompany">
        <div class="mb-3">
          <label class="form-label">Razão social</label>
          <input class="form-control" type="text" placeholder="Razão social" v-model="company.companyName" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Nome fantasia</label>
          <input class="form-control" type="text" placeholder="Nome fantasia" v-model="company.tradingName" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Descrição</label>
          <textarea class="form-control textareaElement" type="text" placeholder="Descrição da empresa"
            v-model="company.description" required></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">CNPJ</label>
          <input class="form-control" type="text" placeholder="CNPJ" v-model="company.cnpj" v-mask="['##.###.###/####-##']" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Selecione a localização da empresa</label>
          <MapForm :latitude="-27.091766" :longitude="-52.668297" @changedCoordinates="onCoordinatesChange" />
        </div>
        <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Company from '../../services/company'
import MapForm from '../map/MapForm.vue'
export default {

  data() {
    return {
      userRole: '',
      company: {
        companyName: '',
        tradingName: '',
        description: '',
        cnpj: '',
        mapCoordinates: '',
      },
    }
  },

  mounted() {
    this.userRole = localStorage.getItem('userRole')
  },

  name: 'CompanyForm',
  components: {
    MapForm
  },

  methods: {
    async createCompany() {

      try {


        if (!this.company.mapCoordinates) {
          this.showError()
          return
        }


        const companyCreated = await Company.create(this.company)

        if (!companyCreated.data)
          return;

        window.location.reload()

      } catch (error) {
        console.log("An error has occurred: " + error);
      }

    },

    showError() {
      const toastLiveExample = document.getElementById('liveToast')
      // eslint-disable-next-line no-undef
      const toast = new bootstrap.Toast(toastLiveExample)
      toast.show()
    },

    redirectToCompany() {
      this.$router.push('/Company')
    },

    onCoordinatesChange(value) {
      this.company.mapCoordinates = JSON.stringify(value.latlng);
    }
  }

}
</script>

<style>
.textareaElement {
  height: 150px;
}

#map {
  height: 300px;
  width: 50%;
}
</style>