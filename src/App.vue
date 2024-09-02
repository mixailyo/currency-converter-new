<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Header from '@/shared/ui/Header.vue';
import { useCurrencyStore } from '@/entities/Currency/store';

const currencyStore = useCurrencyStore();

onMounted(() => {
  currencyStore.fetchRates();
});
</script>

<style lang="scss">
@import '@/shared/styles/global.scss';
</style>