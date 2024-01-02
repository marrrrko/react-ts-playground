import { useEffect, useReducer } from "react"
import LoadingAnimation from "../loading-animation"
import { fetchAvailableCurrencies, fetchConversion } from "./currency-tools"
import type {
  CurrencyConverterState,
  CurrencyConverterAction,
} from "./currency-tools"

const initialState: CurrencyConverterState = {
  isCallingAPI: true,
  fromCurrency: "USD",
  toCurrency: "TRY",
  amount: 100,
  conversionResult: undefined,
  conversionRequested: false,
  currencies: {},
}

export default function CurrencyConverter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleConvertClick = () => {
    if (!state.isCallingAPI && !state.conversionRequested) {
      dispatch({ type: "conversion-submitted" })
    }
  }

  useEffect(() => {
    async function loadCurrencies() {
      const allCurrencies = await fetchAvailableCurrencies()
      dispatch({ type: "currencies-fetched", currencies: allCurrencies })
    }
    loadCurrencies()
  }, [])

  useEffect(() => {
    async function convert() {
      const conversionResult = await fetchConversion(
        state.fromCurrency,
        state.toCurrency,
        state.amount
      )
      dispatch({ type: "conversion-fetched", result: conversionResult })
    }

    if (state.conversionRequested) {
      convert()
    }
  }, [state.conversionRequested])

  if (state.isCallingAPI) {
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
            value={state.fromCurrency}
            onChange={(e) =>
              dispatch({
                type: "currency-changed",
                target: "from",
                newCurrency: e.target.value,
              })
            }
          >
            {Object.keys(state.currencies)
              .sort()
              .map((currencySymbol) => (
                <option key={currencySymbol} value={currencySymbol}>
                  {currencySymbol}: {state.currencies[currencySymbol]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <div>To:</div>
          <select
            className="border border-black p-2"
            value={state.toCurrency}
            onChange={(e) =>
              dispatch({
                type: "currency-changed",
                target: "to",
                newCurrency: e.target.value,
              })
            }
          >
            {Object.keys(state.currencies)
              .sort()
              .map((currencySymbol) => (
                <option key={currencySymbol} value={currencySymbol}>
                  {currencySymbol}: {state.currencies[currencySymbol]}
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
            value={state.amount}
            onChange={(e) =>
              dispatch({
                type: "amount-set",
                newAmount: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <button onClick={handleConvertClick}>Convert</button>
        </div>
      </div>
      {state.conversionResult && (
        <div className="mt-5 border-2 border-neutral-400 border-dashed bg-slate-200 rounded p-4">
          {state.amount} {state.fromCurrency} = {state.conversionResult.amount}{" "}
          {state.toCurrency} (rate is {state.conversionResult.rate})
        </div>
      )}
    </div>
  )
}

function reducer(
  previousState: CurrencyConverterState,
  action: CurrencyConverterAction
) {
  let nextState: CurrencyConverterState
  if (action.type === "currencies-fetched") {
    nextState = {
      ...previousState,
      currencies: action.currencies,
      isCallingAPI: false,
    }
  } else if (action.type === "currency-changed" && action.target === "from") {
    nextState = {
      ...previousState,
      fromCurrency: action.newCurrency,
      conversionResult: undefined,
    }
  } else if (action.type === "currency-changed" && action.target === "to") {
    nextState = {
      ...previousState,
      toCurrency: action.newCurrency,
      conversionResult: undefined,
    }
  } else if (action.type === "amount-set") {
    nextState = {
      ...previousState,
      amount: action.newAmount,
      conversionResult: undefined,
    }
  } else if (action.type === "conversion-submitted") {
    nextState = {
      ...previousState,
      isCallingAPI: true,
      conversionRequested: true,
      conversionResult: undefined,
    }
  } else if (action.type === "conversion-fetched") {
    nextState = {
      ...previousState,
      isCallingAPI: false,
      conversionRequested: false,
      conversionResult: action.result,
    }
  } else {
    throw Error("Unknown action.")
  }
  return nextState
}
