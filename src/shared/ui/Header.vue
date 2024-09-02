<template>
  <Toolbar Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
      <div class="flex items-center gap-2">
        <Button as="router-link" to="/" icon="pi pi-home" label="Главная" rounded />
        <Button as="router-link" to="/convert" icon="pi pi-calculator" label="Конвертация" rounded />
      </div>
    </template>

    <template #end>
      <Select 
        v-model="selectedBaseCurrency"
        :options="currencies"
        :placeholder="'Выберите валюту'"
        style="border-radius: var(--p-button-rounded-border-radius);"
      />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/entities/Currency/store';
import { computed } from 'vue';

const currencyStore = useCurrencyStore();
const selectedBaseCurrency = computed({
  get: () => currencyStore.baseCurrency,
  set: (value: string) => {
    currencyStore.baseCurrency = value
    currencyStore.fetchRates()
  },
});

const currencies = ['USD', 'EUR', 'RUB'];
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;

  nav {
    display: flex;
    gap: 1rem;
  }
}
</style>
