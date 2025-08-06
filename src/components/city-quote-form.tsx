import { QuoteForm } from "./quote-form"

interface CityQuoteFormProps {
  cityName: string
}

export function CityQuoteForm({ cityName }: CityQuoteFormProps) {
  return (
    <div id="offerte" className="bg-gray-100 rounded-lg p-6 mb-8 sticky top-24">
      <h3 className="text-xl font-bold mb-4 text-blue-800">Ontvang vandaag nog een bod op uw sloopauto in {cityName}!</h3>
      <p className="text-gray-700 mb-6">
        Waarom wachten? Laat uw oude auto geld opleveren in plaats van stof verzamelen. Bij Van Velzen Autorecycling
        regelen wij alles snel, eerlijk en milieuvriendelijk.
      </p>
      <QuoteForm />
    </div>
  )
}
export { CityQuoteForm as default }
