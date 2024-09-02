export async function fetchCurrencyRates(baseCurrency: string) {
  const response = await fetch(`https://status.neuralgeneration.com/api/currency?base=${baseCurrency}`);
  const data = await response.json();
  return data;
}
