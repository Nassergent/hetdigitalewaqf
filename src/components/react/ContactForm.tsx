import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: 'website',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#1B4332]/10 dark:bg-[#081C15] p-8 rounded-3xl border border-[#1B4332] text-center">
        <div className="w-16 h-16 bg-[#1B4332] text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold text-[#081C15] dark:text-white mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Bericht succesvol verzonden!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Dankjewel voor je interesse, {formData.name}. We nemen in-sha-Allah zo spoedig mogelijk
          contact met je op.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 text-[#1B4332] dark:text-[#D4A017] font-bold hover:underline"
        >
          Stuur nog een bericht
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Naam
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-colors"
            placeholder="Jouw naam"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            E-mailadres
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-colors"
            placeholder="jouw@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organization" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Organisatie / Moskee (Optioneel)
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-colors"
            placeholder="Naam van moskee"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Onderwerp
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-colors appearance-none"
          >
            <option value="website">Wij willen een website aanvragen</option>
            <option value="donate">Vraag over doneren</option>
            <option value="volunteer">Ik wil vrijwilliger worden</option>
            <option value="other">Overige vragen</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Je bericht
        </label>
        <textarea
          required
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] transition-colors resize-none"
          placeholder="Hoe kunnen we je helpen?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
      >
        Verstuur Bericht
      </button>
    </form>
  );
}
