import { useState } from "react";

function FormPreferences({ onSubmit }) {
    const [climate, setClimate] = useState("quente");
    const [interests, setInterests] = useState([]);
    const [date, setDate] = useState("");

    const allInterests = ["natureza", "cultura", "gastronomia", "aventura", "praia"];

    const toggleInterest = (interest) => {
        setInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = () => {
        if (!date || interests.length === 0) {
            return alert("Preencha todos os campos!");
        }

        onSubmit({ climate, interests, date });
    };

    return (
        <form className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-xl mx-auto space-y-6 border border-white/20">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ✨ Suas Preferências
                </h3>
                <p className="text-gray-600 mt-2">Conte-nos sobre sua viagem dos sonhos</p>
            </div>

            <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">📅 Data da viagem:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
            </div>

            <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">🌡️ Clima preferido:</label>
                <select
                    value={climate}
                    onChange={(e) => setClimate(e.target.value)}
                    className="border border-gray-300 w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                    <option value="quente">☀️ Quente</option>
                    <option value="frio">❄️ Frio</option>
                    <option value="temperado">🌤️ Temperado</option>
                    <option value="tropical">🌴 Tropical</option>
                    <option value="seco">🏜️ Seco</option>
                </select>
            </div>

            <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">🎯 Interesses:</label>
                <div className="flex flex-wrap gap-3">
                    {allInterests.map((interest) => (
                        <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full border-2 transition-all duration-300 transform hover:scale-105 ${interests.includes(interest)
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500 shadow-lg"
                                : "bg-white/50 text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                                }`}
                        >
                            {interest === "natureza" && "🌿"}
                            {interest === "cultura" && "🎭"}
                            {interest === "gastronomia" && "🍽️"}
                            {interest === "aventura" && "🏔️"}
                            {interest === "praia" && "🏖️"}
                            {interest}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl mt-8"
            >
                ✨ Descobrir Destinos Mágicos
            </button>
        </form>
    );
}

export default FormPreferences;