import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { fetchCurrencyRates } from './api';

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref('RUB');
  const rates = ref<{ [key: string]: number }>({});
  const formatedRates = ref<{ [key: string]: number }>({});

  const fetchRates = async () => {
    try {
      const data = await fetchCurrencyRates(baseCurrency.value);
      rates.value = {...data};
      formatedRates.value = getRatesAgainstBaseCurrency({...data});
    } catch (error) {
      console.error('Ошибка при загрузке курсов валют:', error);
    }
  };

  const convertCurrency = (amount: number, from: string, to: string): number => {
    if (from === to) return amount;
    
    const fromToKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const rate = rates.value[fromToKey];

    if (rate) {
      return +(amount * rate).toFixed(2);
    } else {
      console.error(`Не найден курс для пары: ${fromToKey}`);
      return 0;
    }
  };

  const getRatesAgainstBaseCurrency = (data: {[key: string]: number}) => {
    const base = baseCurrency.value.toLowerCase();
    const formattedRates: { [key: string]: number } = {};

    for (const [pair, rate] of Object.entries(data)) {
      const [from, to] = pair.split('-');
      if (to === base) {
        formattedRates[from.toUpperCase()] = rate;
      }
    }

    return formattedRates;
  };

  // Следим за изменением baseCurrency и вызываем fetchRates
  watch(baseCurrency, () => {
    fetchRates();
  });

  return {
    baseCurrency,
    rates,
    formatedRates,
    fetchRates,
    convertCurrency,
    getRatesAgainstBaseCurrency,
  };
});
