import { useEffect, useState } from "react"
import LoadingAnimation from "../loading-animation"

export default function CurrencyConverter2() {
  const [currencies, setCurrencies] = useState<
    Record<string, string> | undefined
  >(undefined)
  const [isCallingAPI, setIsCallingAPI] = useState(false)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("TRY")
  const [amount, setAmount] = useState(100)
  const [conversionResult, setConversionResult] = useState<
    ConversionResult | undefined
  >(undefined)
  const [conversionRequested, setConversionRequested] = useState(false)

  const handleConvertClick = () => {
    if (!isCallingAPI && !conversionRequested) {
      setConversionRequested(true)
    }
  }

  useEffect(() => {
    async function loadCurrencies() {
      const allCurrencies = await fetchAvailableCurrencies()
      await waitSeconds(3)
      setCurrencies(allCurrencies)
      setIsCallingAPI(false)
    }

    if (!currencies && !isCallingAPI) {
      loadCurrencies()
      setIsCallingAPI(true)
    }
  })

  useEffect(() => {
    async function convert() {
      setIsCallingAPI(true)
      const conversionResult = await fetchConversion(
        fromCurrency,
        toCurrency,
        amount
      )
      await waitSeconds(1)
      setConversionResult(conversionResult)
      setIsCallingAPI(false)
      setConversionRequested(false)
    }

    if (conversionRequested && !isCallingAPI) {
      setConversionResult(undefined)
      convert()
    }
  }, [conversionRequested])

  useEffect(() => {
    setConversionResult(undefined)
  }, [fromCurrency, toCurrency, amount])

  if (!currencies || isCallingAPI) {
    return (
      <div className="bg-neutral-100 rounded">
        <LoadingAnimation />
      </div>
    )
  }

  return (
    <div className="bg-neutral-100 rounded text-black p-8">
      <div className="flex flex-col gap-3">
        <div>
          <div>From:</div>
          <select
            className="border border-black p-2"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {Object.keys(currencies)
              .sort()
              .map((currencySymbol) => (
                <option key={currencySymbol} value={currencySymbol}>
                  {currencySymbol}: {currencies[currencySymbol]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <div>To:</div>
          <select
            className="border border-black p-2"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {Object.keys(currencies)
              .sort()
              .map((currencySymbol) => (
                <option key={currencySymbol} value={currencySymbol}>
                  {currencySymbol}: {currencies[currencySymbol]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <div>Amount:</div>
          <input
            className="border border-black p-2"
            step=".01"
            min={0}
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <button onClick={handleConvertClick}>Convert</button>
        </div>
      </div>
      {conversionResult && (
        <div className="mt-5 border-2 border-neutral-400 border-dashed bg-slate-200 rounded p-4">
          {amount} {fromCurrency} = {conversionResult.amount} {toCurrency} (rate
          is {conversionResult.rate})
        </div>
      )}
    </div>
  )
}

async function fetchAvailableCurrencies() {
  const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY
  const response = await fetch(
    `https://api.getgeoapi.com/v2/currency/list?api_key=${CURRENCY_API_KEY}`
  )
  if (!response.ok) {
    throw new Error("Failed to get currencies.")
  } else {
    const data = await response.json()
    return data.currencies as Record<string, string>
  }
}

async function fetchConversion(
  from: string,
  to: string,
  amount: number
): Promise<ConversionResult> {
  const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY
  const response = await fetch(
    `https://api.getgeoapi.com/v2/currency/convert?api_key=${CURRENCY_API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`
  )
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

type ConversionResult = {
  amount: number
  rate: number
}
