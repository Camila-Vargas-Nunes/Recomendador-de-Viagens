import { useState } from "react";
import FormPreferences from "./components/FormPreferences";
import DestinationCard from "./components/DestinationCard";
import { getDestinations } from "./services/openaiService";
import { getCityImage } from "./services/unsplashService";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [currentCity, setCurrentCity] = useState('');

  const handleGenerate = async (preferences) => {
    setLoading(true);
    try {
      const responseText = await getDestinations(preferences);
      const destinationList = parseDestinations(responseText);

      const enriched = await Promise.all(destinationList.map(async (dest) => {
        const image = await getCityImage(dest.name);
        return { ...dest, image };
      }));

      const comparison = generateComparison(enriched, preferences);
      setDestinations(enriched);
      setComparison(comparison);
    } catch (err) {
      console.error("Erro ao gerar destinos:", err);
      alert("Erro ao gerar destinos: " + err.message);
    }
    setLoading(false);
  };

  const generateComparison = (destinations, preferences) => {
    if (destinations.length < 3) return null;

    if (!preferences || !preferences.interests || !Array.isArray(preferences.interests)) {
      return null;
    }

    const criteria = {
      clima: preferences.climate || 'temperado',
      interests: preferences.interests,
      data: preferences.date
    };

    const analysis = destinations.map((dest, index) => {
      const score = calculateScore(dest, criteria);
      return {
        ...dest,
        score,
        rank: index + 1,
        strengths: analyzeStrengths(dest, criteria),
        weaknesses: analyzeWeaknesses(dest, criteria)
      };
    });

    analysis.sort((a, b) => b.score - a.score);
    const bestDestination = analysis[0];
    bestDestination.isRecommended = true;

    return {
      destinations: analysis,
      bestDestination,
      comparisonCriteria: getComparisonCriteria(criteria),
      finalRecommendation: generateFinalRecommendation(bestDestination, criteria)
    };
  };

  const calculateScore = (destination, criteria) => {
    let score = 0;

    if (!criteria || !criteria.interests || !Array.isArray(criteria.interests)) {
      return 50;
    }

    const climateScores = {
      quente: { 'praia': 10, 'natureza': 8, 'cultura': 6, 'gastronomia': 7, 'aventura': 8 },
      frio: { 'cultura': 10, 'natureza': 8, 'gastronomia': 7, 'aventura': 9, 'praia': 2 },
      temperado: { 'cultura': 9, 'natureza': 9, 'gastronomia': 8, 'aventura': 7, 'praia': 6 }
    };

    criteria.interests.forEach(interest => {
      const climateScore = climateScores[criteria.clima]?.[interest] || 5;
      score += climateScore;
    });

    if (destination.description.toLowerCase().includes('cultura') && criteria.interests.includes('cultura')) score += 3;
    if (destination.description.toLowerCase().includes('praia') && criteria.interests.includes('praia')) score += 3;
    if (destination.description.toLowerCase().includes('natureza') && criteria.interests.includes('natureza')) score += 3;
    if (destination.description.toLowerCase().includes('gastronomia') && criteria.interests.includes('gastronomia')) score += 3;
    if (destination.description.toLowerCase().includes('aventura') && criteria.interests.includes('aventura')) score += 3;

    return Math.min(score, 100);
  };

  const analyzeStrengths = (destination, criteria) => {
    const strengths = [];
    const desc = destination.description.toLowerCase();

    if (!criteria || !criteria.interests || !Array.isArray(criteria.interests)) {
      return ['Destino versátil e atrativo'];
    }

    if (criteria.interests.includes('cultura') && desc.includes('cultura')) strengths.push('Rica herança cultural');
    if (criteria.interests.includes('praia') && desc.includes('praia')) strengths.push('Praias deslumbrantes');
    if (criteria.interests.includes('natureza') && desc.includes('natureza')) strengths.push('Natureza exuberante');
    if (criteria.interests.includes('gastronomia') && desc.includes('gastronomia')) strengths.push('Gastronomia excepcional');
    if (criteria.interests.includes('aventura') && desc.includes('aventura')) strengths.push('Atividades de aventura');

    return strengths.length > 0 ? strengths : ['Destino versátil e atrativo'];
  };

  const analyzeWeaknesses = (destination, criteria) => {
    const weaknesses = [];
    const desc = destination.description.toLowerCase();

    if (!criteria || !criteria.interests || !Array.isArray(criteria.interests)) {
      return ['Nenhum ponto fraco significativo'];
    }

    if (criteria.interests.includes('praia') && !desc.includes('praia')) weaknesses.push('Poucas opções de praia');
    if (criteria.interests.includes('cultura') && !desc.includes('cultura')) weaknesses.push('Herança cultural limitada');

    return weaknesses.length > 0 ? weaknesses : ['Nenhum ponto fraco significativo'];
  };

  const getComparisonCriteria = (criteria) => {
    return {
      clima: criteria.clima,
      interesses: criteria.interests,
      data: criteria.date,
      pesoClima: 30,
      pesoInteresses: 50,
      pesoData: 20
    };
  };

  const generateFinalRecommendation = (bestDestination, criteria) => {
    const interests = criteria?.interests && Array.isArray(criteria.interests) ? criteria.interests : [];
    const climate = criteria?.climate || criteria?.clima || 'temperado';

    return {
      destino: bestDestination.name,
      score: bestDestination.score,
      justificativa: `Com base na sua preferência por clima ${climate} e interesse em ${interests.join(', ')}, ${bestDestination.name} se destaca como a melhor opção.`,
      criterios: [
        `Alinhamento climático: ${climate}`,
        `Interesses atendidos: ${interests.join(', ')}`,
        `Score de compatibilidade: ${bestDestination.score}/100`,
        `Pontos fortes: ${bestDestination.strengths?.join(', ') || 'Destino atrativo'}`
      ],
      proximosPassos: [
        'Pesquisar passagens para o período escolhido',
        'Verificar documentação necessária',
        'Reservar hospedagem com antecedência',
        'Planejar roteiro detalhado'
      ]
    };
  };

  const generateItineraryForCity = (cityName) => {
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

    return itineraries[cityName] || [
      { day: "Dia 1", activities: ["Chegada e acomodação", "Exploração do centro histórico", "Jantar local tradicional"] },
      { day: "Dia 2", activities: ["Visita aos principais pontos turísticos", "Experiência gastronômica local", "Passeio noturno"] },
      { day: "Dia 3", activities: ["Atividades ao ar livre", "Compras e souvenirs", "Despedida da cidade"] }
    ];
  };

  const openItineraryModal = (cityName, itinerary) => {
    setCurrentCity(cityName);
    setCurrentItinerary(itinerary);
    setShowItineraryModal(true);
  };

  const closeItineraryModal = () => {
    setShowItineraryModal(false);
    setCurrentItinerary(null);
    setCurrentCity('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 font-sans">
      <div className="text-center mb-12 pt-20 pb-4 relative z-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
          Recomendador de Viagens Inteligente
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Descubra destinos perfeitos para sua próxima aventura com a ajuda da inteligência artificial
        </p>
      </div>

      <FormPreferences onSubmit={handleGenerate} />

      {loading && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700 font-medium">✨ Gerando recomendações personalizadas...</span>
          </div>
        </div>
      )}

      {destinations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🎯 Seus Destinos Recomendados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <DestinationCard {...dest} />
              </div>
            ))}
          </div>
        </div>
      )}

      {comparison && (
        <div className="mt-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            📊 Comparativo e Recomendação Final
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Análise Comparativa</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Destino</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pontos Fortes</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pontos Fracos</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.destinations.map((dest, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${dest.isRecommended ? 'bg-blue-50' : ''}`}>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-800">{dest.name}</span>
                          {dest.isRecommended && (
                            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              ⭐ Recomendado
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center">
                          <span className="font-bold text-lg text-blue-600">{dest.score}</span>
                          <span className="text-gray-500 text-sm ml-1">/100</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <ul className="text-sm text-gray-600">
                          {dest.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-center mb-1">
                              <span className="text-green-500 mr-2">✓</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-4">
                        <ul className="text-sm text-gray-600">
                          {dest.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="flex items-center mb-1">
                              <span className="text-orange-500 mr-2">⚠</span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">🏆 Nossa Recomendação</h3>
              <p className="text-blue-100">Com base na análise dos critérios, recomendamos:</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold mb-3">🎯 {comparison.finalRecommendation.destino}</h4>
              <p className="text-blue-100 mb-4">{comparison.finalRecommendation.justificativa}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold mb-2">📋 Critérios Utilizados:</h5>
                  <ul className="text-sm text-blue-100 space-y-1">
                    {comparison.finalRecommendation.criterios.map((criterio, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="mr-2">•</span>
                        {criterio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">📝 Próximos Passos:</h5>
                  <ul className="text-sm text-blue-100 space-y-1">
                    {comparison.finalRecommendation.proximosPassos.map((passo, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="mr-2">→</span>
                        {passo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  const recommendedCity = comparison.finalRecommendation.destino.split(',')[0].trim();
                  const itinerary = generateItineraryForCity(recommendedCity);
                  openItineraryModal(recommendedCity, itinerary);
                }}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                ✅ Ver Roteiro Completo
              </button>
            </div>
          </div>
        </div>
      )}

      {showItineraryModal && currentItinerary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🗺️ Roteiro Completo - {currentCity}</h2>
                <button
                  onClick={closeItineraryModal}
                  className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {currentItinerary.map((day, index) => (
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
    </div>
  );
}

function parseDestinations(responseText) {
  const lines = responseText.split('\n');
  const destinations = [];
  let currentDestination = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (/^\d+\./.test(trimmedLine)) {
      if (currentDestination && currentDestination.name && currentDestination.description) {
        destinations.push(currentDestination);
      }

      const name = trimmedLine.replace(/^\d+\.\s*/, "").trim();
      currentDestination = { name, description: "" };
    } else if (currentDestination && trimmedLine) {
      currentDestination.description += (currentDestination.description ? " " : "") + trimmedLine;
    }
  });

  if (currentDestination && currentDestination.name && currentDestination.description) {
    destinations.push(currentDestination);
  }

  if (destinations.length === 0) {
    destinations.push(
      { name: "Paris, França", description: "Cidade icônica com rica história cultural, museus renomados e gastronomia de classe mundial." },
      { name: "Tóquio, Japão", description: "Mistura fascinante de tradição e modernidade, com templos antigos e tecnologia de ponta." },
      { name: "Nova York, EUA", description: "A cidade que nunca dorme, oferecendo cultura, arte e entretenimento 24 horas por dia." }
    );
  }

  return destinations.slice(0, 3);
}

export default App;
