// Live currency exchange rate API
const EXCHANGE_API = "https://api.exchangerate-api.com/v4/latest/USD";

interface ExchangeRates {
  [key: string]: number;
}

let cachedRates: ExchangeRates | null = null;
let lastFetch = 0;
const CACHE_DURATION = 3600000; // 1 hour

export async function getExchangeRates(): Promise<ExchangeRates> {
  const now = Date.now();
  
  if (cachedRates && now - lastFetch < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const response = await fetch(EXCHANGE_API);
    const data = await response.json();
    cachedRates = data.rates;
    lastFetch = now;
    return cachedRates;
  } catch (error) {
    console.error("Currency API error:", error);
    // Fallback rates
    return {
      USD: 1,
      KES: 129.5,
      GBP: 0.79,
      EUR: 0.92,
      AED: 3.67,
      ZAR: 18.5,
    };
  }
}

export function convertCurrency(amount: number, fromRate: number, toRate: number): number {
  return (amount / fromRate) * toRate;
}
