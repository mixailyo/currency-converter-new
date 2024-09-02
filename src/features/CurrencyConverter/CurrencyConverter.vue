<template>
  <div class="currency-converter flex flex-column gap-3">
    <div class="row flex gap-3">
      <Select 
        v-model="selectedCurrency1"
        :options="availableCurrencies1"
        placeholder="Выберите валюту"
      />
      <InputNumber 
        v-model="amount1"
        placeholder="Введите сумму"
      />
    </div>
    <div class="row flex gap-3">
      <Select 
        v-model="selectedCurrency2"
        :options="availableCurrencies2"
        placeholder="Выберите валюту"
      />
      <InputNumber 
        v-model="amount2"
        placeholder="Введите сумму"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCurrencyStore } from '@/entities/Currency/store';

const currencyStore = useCurrencyStore();

const selectedCurrency1 = ref('RUB');
const selectedCurrency2 = ref('USD');
const amount1 = ref<number | null>(null);
const amount2 = ref<number | null>(null);

const currencies = ['RUB', 'USD', 'EUR'];

const availableCurrencies1 = computed(() => 
  currencies.filter(currency => currency !== selectedCurrency2.value)
);

const availableCurrencies2 = computed(() => 
  currencies.filter(currency => currency !== selectedCurrency1.value)
);

const selectedCurrencyName1 = computed(() => selectedCurrency1.value.toLowerCase())
const selectedCurrencyName2 = computed(() => selectedCurrency2.value.toLowerCase())

watch([amount2, selectedCurrency1, selectedCurrency2], () => {
  if (amount2.value !== null) {
    amount1.value = Number((currencyStore.rates[`${selectedCurrencyName2.value}-${selectedCurrencyName1.value}`] * amount2.value).toFixed(2));
  }
});

watch([amount1, selectedCurrency1, selectedCurrency2], () => {
  if (amount1.value !== null) {
    amount2.value = Number((1 / currencyStore.rates[`${selectedCurrencyName2.value}-${selectedCurrencyName1.value}`] * amount1.value).toFixed(2));
  }
});
</script>