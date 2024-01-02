export type CurrencyConverterState = {
  isCallingAPI: boolean
  fromCurrency: string
  toCurrency: string
  amount: number
  conversionRequested: boolean
  conversionResult: ConversionResult | undefined
  currencies: Record<string, string>
}

export type ConversionResult = {
  amount: number
  rate: number
}

export type CurrencyConverterAction =
  | AmountSetAction
  | ChangedCurrencyAction
  | CurrenciesFetchedAction
  | ConversionSubmittedAction
  | ConversionFetchedAction

type AmountSetAction = {
  type: "amount-set"
  newAmount: number
}

type ChangedCurrencyAction = {
  type: "currency-changed"
  target: "to" | "from"
  newCurrency: string
}

type CurrenciesFetchedAction = {
  type: "currencies-fetched"
  currencies: Record<string, string>
}

type ConversionSubmittedAction = {
  type: "conversion-submitted"
}

type ConversionFetchedAction = {
  type: "conversion-fetched"
  result: ConversionResult
}

export async function fetchAvailableCurrencies() {
  const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY
  const response = await fetch(
    `https://api.getgeoapi.com/v2/currency/list?api_key=${CURRENCY_API_KEY}`
  )
  await waitSeconds(1)
  if (!response.ok) {
    throw new Error("Failed to get currencies.")
  } else {
    const data = await response.json()
    return data.currencies as Record<string, string>
  }
}

export async function fetchConversion(
  from: string,
  to: string,
  amount: number
): Promise<ConversionResult> {
  const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY
  const response = await fetch(
    `https://api.getgeoapi.com/v2/currency/convert?api_key=${CURRENCY_API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`
  )
  await waitSeconds(1)
  if (!response.ok) {
    throw new Error("Failed to get currencies.")
  } else {
    const data = await response.json()
    const result: ConversionResult = {
      amount: parseFloat(data.rates[to].rate_for_amount),
      rate: parseFloat(data.rates[to].rate),
    }
    return result
  }
}

async function waitSeconds(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}