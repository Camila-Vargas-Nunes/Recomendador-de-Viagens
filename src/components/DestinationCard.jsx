import { useState } from "react";

function DestinationCard({ name, description, image }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showItinerary, setShowItinerary] = useState(false);
    const [showPrices, setShowPrices] = useState(false);

    const handleShowDetails = () => {
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    const handleShowItinerary = () => {
        setShowItinerary(true);
        setShowDetails(false);
    };

    const handleCloseItinerary = () => {
        setShowItinerary(false);
    };

    const handleShowPrices = () => {
        setShowPrices(true);
        setShowDetails(false);
    };

    const handleClosePrices = () => {
        setShowPrices(false);
    };

    const generateItinerary = () => {
        const itineraries = {
            "Paris": [
                { day: "Dia 1", activities: ["Chegada e check-in no hotel", "Passeio pela Torre Eiffel", "Jantar no Quartier Latin"] },
                { day: "Dia 2", activities: ["Visita ao Louvre", "Passeio pelos Champs-Élysées", "Cruzeiro no Rio Sena"] },
                { day: "Dia 3", activities: ["Visita à Notre-Dame", "Explorar Montmartre", "Jantar em bistrô tradicional"] }
            ],
            "Tóquio": [
                { day: "Dia 1", activities: ["Chegada e check-in", "Visita ao Templo Senso-ji", "Explorar Asakusa"] },
                { day: "Dia 2", activities: ["Visita ao Palácio Imperial", "Passeio por Shibuya", "Jantar em ramen tradicional"] },
                { day: "Dia 3", activities: ["Visita ao Monte Fuji", "Explorar Harajuku", "Experiência em onsen"] }
            ],
            "Nova York": [
                { day: "Dia 1", activities: ["Chegada e check-in", "Visita à Estátua da Liberdade", "Passeio por Manhattan"] },
                { day: "Dia 2", activities: ["Visita ao MoMA", "Passeio pelo Central Park", "Broadway à noite"] },
                { day: "Dia 3", activities: ["Explorar Brooklyn", "Visita ao Empire State", "Jantar em Little Italy"] }
            ]
        };

        const cityName = name.split(',')[0].trim();
        return itineraries[cityName] || [
            { day: "Dia 1", activities: ["Chegada e acomodação", "Exploração do centro histórico", "Jantar local tradicional"] },
            { day: "Dia 2", activities: ["Visita aos principais pontos turísticos", "Experiência gastronômica local", "Passeio noturno"] },
            { day: "Dia 3", activities: ["Atividades ao ar livre", "Compras e souvenirs", "Despedida da cidade"] }
        ];
    };

    const generatePrices = () => {
        const priceRanges = {
            "Paris": { hotel: "€150-300", food: "€50-100", activities: "€30-80", total: "€800-1500" },
            "Tóquio": { hotel: "¥15,000-30,000", food: "¥5,000-10,000", activities: "¥3,000-8,000", total: "¥80,000-150,000" },
            "Nova York": { hotel: "$200-400", food: "$60-120", activities: "$40-100", total: "$1000-2000" }
        };

        const cityName = name.split(',')[0].trim();
        return priceRanges[cityName] || {
            hotel: "$150-300",
            food: "$50-100",
            activities: "$30-80",
            total: "$800-1500"
        };
    };

    return (
        <>
            <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white text-4xl">🌍</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            ⭐
                        </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-1">{name}</h2>
                        <div className="flex items-center text-white/90 text-sm">
                            <span className="mr-2">📍</span>
                            <span>Destino Recomendado</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                🏖️ Turismo
                            </span>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                🌴 Natureza
                            </span>
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                                🎭 Cultura
                            </span>
                        </div>

                        <div className="prose prose-sm">
                            <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
                                {description}
                            </p>
                        </div>

                        <div className="pt-2 space-y-2">
                            <button
                                onClick={handleShowDetails}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                🗺️ Ver Detalhes
                            </button>
                            <button
                                onClick={handleShowItinerary}
                                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                            >
                                📋 Ver Roteiro Completo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            {showDetails && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9998] p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="relative">
                            {image && (
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-48 object-cover rounded-t-2xl"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
                                <div className="flex items-center text-white/90">
                                    <span className="mr-2">🌟</span>
                                    <span>Destino Recomendado</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseDetails}
                                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🏖️ Turismo
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🌴 Natureza
                                    </span>
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🎭 Cultura
                                    </span>
                                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                        🍽️ Gastronomia
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">📖 Sobre o Destino</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-blue-800 mb-2">🌡️ Clima Ideal</h4>
                                        <p className="text-blue-600 text-sm">Perfeito para sua preferência climática</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-green-800 mb-2">🎯 Melhor Época</h4>
                                        <p className="text-green-600 text-sm">Baseado na data da sua viagem</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleShowItinerary}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                                    >
                                        🗺️ Ver Roteiro Completo
                                    </button>
                                    <button
                                        onClick={handleShowPrices}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                                    >
                                        💰 Ver Preços
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showItinerary && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">🗺️ Roteiro Completo - {name}</h2>
                                <button
                                    onClick={handleCloseItinerary}
                                    className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                {generateItinerary().map((day, index) => (
                                    <div key={index} className="bg-blue-50 p-4 rounded-xl">
                                        <h3 className="font-semibold text-blue-800 mb-2">{day.day}</h3>
                                        <ul className="space-y-1">
                                            {day.activities.map((activity, actIndex) => (
                                                <li key={actIndex} className="text-blue-600 text-sm flex items-center">
                                                    <span className="mr-2">•</span>
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-green-50 rounded-xl">
                                <h4 className="font-semibold text-green-800 mb-2">💡 Dica de Viagem</h4>
                                <p className="text-green-600 text-sm">
                                    Este roteiro foi personalizado com base nas suas preferências.
                                    Recomendamos reservar com antecedência para garantir os melhores preços!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPrices && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">💰 Preços - {name}</h2>
                                <button
                                    onClick={handleClosePrices}
                                    className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-blue-800 mb-2">🏨 Hospedagem</h4>
                                        <p className="text-blue-600 text-lg font-bold">{generatePrices().hotel}</p>
                                        <p className="text-blue-500 text-sm">por noite</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-green-800 mb-2">🍽️ Alimentação</h4>
                                        <p className="text-green-600 text-lg font-bold">{generatePrices().food}</p>
                                        <p className="text-green-500 text-sm">por dia</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-purple-800 mb-2">🎯 Atividades</h4>
                                        <p className="text-purple-600 text-lg font-bold">{generatePrices().activities}</p>
                                        <p className="text-purple-500 text-sm">por dia</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-orange-800 mb-2">💳 Total Estimado</h4>
                                        <p className="text-orange-600 text-lg font-bold">{generatePrices().total}</p>
                                        <p className="text-orange-500 text-sm">para 3 dias</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante</h4>
                                <p className="text-yellow-600 text-sm">
                                    Estes são preços estimados baseados em pesquisas de mercado.
                                    Os valores podem variar dependendo da época do ano e disponibilidade.
                                    Use estas informações como referência para planejar sua viagem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DestinationCard;