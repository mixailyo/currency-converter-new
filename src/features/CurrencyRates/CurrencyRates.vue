<template>
  <DataTable :value="currencyRows">
    <Column field="currency" header="Валюта"></Column>
    <Column field="rate" header="Курс"></Column>
  </DataTable>
</template>

<script setup>
import { computed } from 'vue';
import { useCurrencyStore } from '@/entities/Currency/store';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const currencyStore = useCurrencyStore();

const currencyRows = computed(() => {
  return Object.keys(currencyStore.formatedRates).map((currency) => ({
    currency,
    rate: currencyStore.formatedRates[currency],
  }));
});
</script>
