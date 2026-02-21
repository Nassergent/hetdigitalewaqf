import { useState } from 'react';

const presetAmounts = [5, 10, 25, 50, 100];

export default function DonationForm() {
  const [frequency, setFrequency] = useState<'eenmalig' | 'maandelijks'>('maandelijks');
  const [amount, setAmount] = useState<number | 'custom'>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Hier komt de Stripe/Mollie integratie
    setTimeout(() => {
      alert(
        `Bedankt! Je wordt nu doorgestuurd naar de betaalpagina voor €${amount === 'custom' ? customAmount : amount} (${frequency}).`
      );
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
      {/* Frequency Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full mb-8">
        <button
          type="button"
          onClick={() => setFrequency('eenmalig')}
          className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${
            frequency === 'eenmalig'
              ? 'bg-white dark:bg-gray-700 text-[#081C15] dark:text-white shadow-md'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Eenmalig
        </button>
        <button
          type="button"
          onClick={() => setFrequency('maandelijks')}
          className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${
            frequency === 'maandelijks'
              ? 'bg-[#1B4332] text-white shadow-md'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Maandelijks
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Grid */}
        <div className="grid grid-cols-3 gap-3">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setAmount(preset);
                setCustomAmount('');
              }}
              className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${
                amount === preset
                  ? 'border-[#D4A017] bg-[#D4A017]/10 text-[#081C15] dark:text-[#D4A017]'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#D4A017]/50'
              }`}
            >
              &euro;{preset}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount('custom')}
            className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${
              amount === 'custom'
                ? 'border-[#D4A017] bg-[#D4A017]/10 text-[#081C15] dark:text-[#D4A017]'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#D4A017]/50'
            }`}
          >
            Ander
          </button>
        </div>

        {/* Custom Amount Input */}
        {amount === 'custom' && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
              &euro;
            </span>
            <input
              type="number"
              min="1"
              required
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Vrij bedrag"
              className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-[#D4A017] focus:outline-none focus:ring-2 focus:ring-[#D4A017]/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-lg"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#D4A017] hover:bg-[#FDB833] text-[#081C15] py-4 rounded-full font-extrabold text-lg transition-all shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isSubmitting
            ? 'Bezig met verwerken...'
            : `Doneer \u20AC${amount === 'custom' ? customAmount || '0' : amount} ${frequency === 'maandelijks' ? 'per maand' : ''}`}
        </button>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Beveiligde betaling via Bancontact/iDEAL
        </p>
      </form>
    </div>
  );
}
