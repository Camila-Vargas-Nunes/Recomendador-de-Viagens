export async function getDestinations(preferences) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.includes('your_openai_api_key_here')) {
        return getMockDestinations(preferences);
    }

    if (import.meta.env.VITE_USE_MOCK === 'true') {
        return getMockDestinations(preferences);
    }

    const prompt = `
  Considere o seguinte perfil de viajante:
  
  - Data da viagem: ${preferences.date}
  - Clima preferido: ${preferences.climate}
  - Interesses: ${preferences.interests.join(", ")}
  
  Sugira 3 cidades ao redor do mundo que combinem com esse perfil.
  Para cada cidade:
  1. Dê o nome
  2. Liste os principais atrativos relacionados ao perfil informado
  3. Justifique a escolha
  
  Ao final, recomende uma das três como a mais indicada, explicando o porquê.
  Responda com títulos numerados para cada cidade.
  `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 429 || response.status === 401) {
            return getMockDestinations(preferences);
        }

        throw new Error(`Erro da API: ${response.status} - ${data.error?.message || 'Erro desconhecido'}`);
    }

    if (!data.choices || !data.choices[0]) {
        throw new Error("Resposta inválida da OpenAI");
    }

    return data.choices[0].message.content;
}

function getMockDestinations(preferences) {
    const mockData = {
        quente: {
            praia: `1. Bali, Indonésia
            Bali é um paraíso tropical perfeito para quem busca praias deslumbrantes e clima quente. Com suas praias de areia branca, águas cristalinas e resorts luxuosos, Bali oferece a combinação perfeita de relaxamento e aventura. Principais atrativos incluem as praias de Nusa Dua, Seminyak e Uluwatu, além de templos sagrados e cultura local rica.

            2. Cancún, México
            Cancún é o destino ideal para quem quer praias caribenhas com clima quente e muita diversão. Suas praias de areia branca e águas azul-turquesa são famosas mundialmente. Além das praias, você pode explorar ruínas maias, fazer snorkeling nos recifes de coral e desfrutar da vibrante vida noturna.

            3. Phuket, Tailândia
            Phuket oferece praias paradisíacas com clima tropical quente durante todo o ano. As praias de Patong, Kata e Karon são perfeitas para banho de sol e esportes aquáticos. A ilha também oferece templos budistas, mercados locais e a famosa gastronomia tailandesa.

            Recomendação: Bali é a escolha mais indicada para sua viagem, pois combina perfeitamente clima quente com interesse por praia, oferecendo uma experiência cultural única além das praias deslumbrantes.`,

            natureza: `1. Costa Rica
            Costa Rica é um paraíso natural com clima quente e úmido, perfeito para quem ama natureza. Com suas florestas tropicais, vulcões ativos e praias selvagens, oferece experiências únicas de ecoturismo. Principais atrativos incluem o Parque Nacional Tortuguero, Monteverde Cloud Forest e as praias do Pacífico.

            2. Madagascar
            Madagascar oferece clima quente e uma biodiversidade única no mundo. Com suas florestas de baobás, praias intocadas e vida selvagem endêmica, é um destino perfeito para amantes da natureza. Explore o Parque Nacional de Isalo, as praias de Nosy Be e a capital Antananarivo.

            3. Galápagos, Equador
            As Ilhas Galápagos oferecem clima quente e uma experiência natural incomparável. Com sua fauna única e paisagens vulcânicas, é um destino de sonho para observação de vida selvagem. Visite as ilhas Isabela, San Cristóbal e Santa Cruz para ver tartarugas gigantes, iguanas marinhas e aves exóticas.

            Recomendação: Costa Rica é a escolha mais indicada, pois oferece a combinação perfeita de clima quente e natureza exuberante, com excelente infraestrutura turística e muitas atividades ao ar livre.`,

            cultura: `1. Marrakech, Marrocos
            Marrakech oferece clima quente e uma rica herança cultural árabe-berbere. Com suas medinas labirínticas, palácios ornamentados e souks vibrantes, é um destino cultural fascinante. Explore a Medina, o Palácio Bahia e os Jardins Majorelle.

            2. Istambul, Turquia
            Istambul combina clima quente com uma história cultural milenar. Com suas mesquitas imponentes, palácios otomanos e mercados históricos, oferece uma experiência cultural única. Visite a Hagia Sophia, o Palácio Topkapi e o Grande Bazar.

            3. Cairo, Egito
            Cairo oferece clima quente e uma das civilizações mais antigas do mundo. Com suas pirâmides, museus de antiguidades e cultura faraônica, é um destino cultural imperdível. Explore as Pirâmides de Gizé, o Museu Egípcio e a Cidadela.

            Recomendação: Marrakech é a escolha mais indicada, pois oferece a combinação perfeita de clima quente e cultura rica, com uma experiência sensorial única através de cores, aromas e tradições.`,

            gastronomia: `1. Bangkok, Tailândia
            Bangkok oferece clima quente e uma das gastronomias mais vibrantes do mundo. Com seus mercados de rua, restaurantes tradicionais e sabores exóticos, é um paraíso para foodies. Experimente o Pad Thai, Tom Yum e os mercados flutuantes.

            2. Cidade do México, México
            A Cidade do México combina clima quente com uma gastronomia rica e diversificada. Com seus tacos autênticos, mole tradicional e mercados coloridos, oferece uma experiência culinária única. Visite o Mercado de San Juan e experimente a cozinha local.

            3. Ho Chi Minh, Vietnã
            Ho Chi Minh oferece clima quente e uma gastronomia vietnamita autêntica. Com seus pho tradicionais, banh mi e mercados de rua, é um destino gastronômico fascinante. Explore o Mercado Ben Thanh e experimente a culinária local.

            Recomendação: Bangkok é a escolha mais indicada, pois oferece a combinação perfeita de clima quente e gastronomia exótica, com uma experiência culinária que vai além dos sabores tradicionais.`,

            aventura: `1. Queenstown, Nova Zelândia
            Queenstown oferece clima quente no verão e é a capital mundial da aventura. Com bungee jumping, paraquedismo, rafting e trilhas espetaculares, é o destino perfeito para aventureiros. Explore o Milford Sound e as trilhas do Parque Nacional.

            2. Moab, EUA
            Moab combina clima quente com aventuras ao ar livre espetaculares. Com seus parques nacionais, trilhas de mountain bike e escaladas, oferece experiências únicas. Visite o Arches National Park e o Canyonlands.

            3. Interlaken, Suíça
            Interlaken oferece clima quente no verão e aventuras alpinas emocionantes. Com parapente, escalada, trilhas e esportes aquáticos, é um destino de aventura de classe mundial. Explore os Alpes suíços e o Lago Thun.

            Recomendação: Queenstown é a escolha mais indicada, pois oferece a combinação perfeita de clima quente e aventuras extremas, com paisagens deslumbrantes e infraestrutura turística de qualidade.`
        },

        frio: {
            cultura: `1. Viena, Áustria
            Viena é uma cidade imperial com clima frio e rica herança cultural. Com seus palácios barrocos, museus de arte renomados e tradição musical centenária, oferece uma experiência cultural única. Principais atrativos incluem o Palácio de Schönbrunn, a Ópera de Viena e os museus do MuseumsQuartier.

            2. São Petersburgo, Rússia
            São Petersburgo oferece clima frio e uma das maiores concentrações de arte e cultura do mundo. Com seus palácios czaristas, museus como o Hermitage e canais que lhe renderam o apelido de "Veneza do Norte", é um destino cultural imperdível. Explore o Palácio de Inverno, a Catedral de São Isaac e o Teatro Mariinsky.

            3. Praga, República Tcheca
            Praga combina clima frio com uma história cultural rica e arquitetura medieval deslumbrante. Com seu centro histórico preservado, castelos góticos e tradição musical, oferece uma experiência cultural autêntica. Visite o Castelo de Praga, a Ponte Carlos e a Praça da Cidade Velha.

            Recomendação: Viena é a escolha mais indicada para sua viagem, pois oferece a combinação perfeita de clima frio e interesse cultural, com uma das mais ricas tradições musicais e artísticas da Europa.`,

            natureza: `1. Reykjavik, Islândia
            Reykjavik oferece clima frio e paisagens naturais únicas no mundo. Com suas auroras boreais, geysers, cachoeiras e vulcões, é um destino natural espetacular. Explore o Círculo Dourado, a Lagoa Azul e os campos de lava.

            2. Banff, Canadá
            Banff combina clima frio com paisagens montanhosas deslumbrantes. Com seus lagos turquesa, montanhas nevadas e vida selvagem, oferece experiências naturais únicas. Visite o Lago Louise, o Parque Nacional Banff e as Montanhas Rochosas.

            3. Tromsø, Noruega
            Tromsø oferece clima frio e uma experiência ártica única. Com suas auroras boreais, fiordes espetaculares e cultura sami, é um destino natural fascinante. Explore os fiordes noruegueses e a cultura local.

            Recomendação: Reykjavik é a escolha mais indicada, pois oferece a combinação perfeita de clima frio e natureza única, com paisagens que parecem de outro planeta.`,

            gastronomia: `1. Tóquio, Japão
            Tóquio oferece clima frio no inverno e uma das gastronomias mais sofisticadas do mundo. Com seus restaurantes estrelados, mercados tradicionais e sabores únicos, é um paraíso gastronômico. Experimente sushi, ramen e tempura autênticos.

            2. Seul, Coreia do Sul
            Seul combina clima frio com uma gastronomia coreana vibrante. Com seus mercados de rua, barbecue tradicional e kimchi, oferece uma experiência culinária única. Visite o Mercado Gwangjang e experimente a culinária local.

            3. Estocolmo, Suécia
            Estocolmo oferece clima frio e uma gastronomia nórdica moderna. Com seus restaurantes inovadores, mercados locais e tradições culinárias, é um destino gastronômico sofisticado. Explore o Mercado Östermalmshallen.

            Recomendação: Tóquio é a escolha mais indicada, pois oferece a combinação perfeita de clima frio e gastronomia de classe mundial, com uma experiência culinária que vai do tradicional ao vanguardista.`,

            aventura: `1. Tromsø, Noruega
            Tromsø oferece clima frio e aventuras árticas únicas. Com caça à aurora boreal, passeios de trenó puxado por cães e esqui nórdico, é um destino de aventura espetacular. Explore os fiordes e a cultura sami.

            2. Chamonix, França
            Chamonix combina clima frio com aventuras alpinas de classe mundial. Com esqui, snowboard, escalada no gelo e trilhas de montanha, oferece experiências únicas. Visite o Monte Branco e as trilhas alpinas.

            3. Jasper, Canadá
            Jasper oferece clima frio e aventuras na natureza selvagem. Com observação de vida selvagem, trilhas de montanha e esportes de inverno, é um destino de aventura fascinante. Explore o Parque Nacional Jasper.

            Recomendação: Tromsø é a escolha mais indicada, pois oferece a combinação perfeita de clima frio e aventuras árticas únicas, com experiências que só são possíveis no extremo norte.`
        },

        temperado: {
            cultura: `1. Paris, França
            Paris oferece clima temperado e uma das mais ricas heranças culturais do mundo. Com seus museus renomados, monumentos icônicos e tradição artística, é um destino cultural imperdível. Visite o Louvre, a Torre Eiffel e o Museu d'Orsay.

            2. Londres, Inglaterra
            Londres combina clima temperado com história cultural rica e diversidade moderna. Com seus museus gratuitos, teatros de West End e tradição real, oferece uma experiência cultural única. Explore o British Museum, a National Gallery e o Palácio de Buckingham.

            3. Berlim, Alemanha
            Berlim oferece clima temperado e uma história cultural complexa e fascinante. Com seus museus de história, galerias de arte contemporânea e vida noturna vibrante, é um destino cultural dinâmico. Visite o Museu Pergamon, a Ilha dos Museus e o Muro de Berlim.

            Recomendação: Paris é a escolha mais indicada, pois oferece a combinação perfeita de clima temperado e cultura de classe mundial, com uma experiência artística e histórica incomparável.`,

            natureza: `1. Vancouver, Canadá
            Vancouver oferece clima temperado e paisagens naturais espetaculares. Com suas montanhas, oceanos e florestas temperadas, é um destino natural único. Explore o Stanley Park, as Montanhas Grouse e as ilhas do Pacífico.

            2. Portland, EUA
            Portland combina clima temperado com natureza urbana e rural. Com seus parques, jardins botânicos e proximidade com a natureza, oferece experiências ao ar livre únicas. Visite o Forest Park, o Jardim Japonês e o Monte Hood.

            3. Melbourne, Austrália
            Melbourne oferece clima temperado e uma mistura única de natureza urbana e selvagem. Com seus parques, praias e proximidade com a Grande Barreira de Corais, é um destino natural diversificado. Explore o Royal Botanic Gardens e a Península Mornington.

            Recomendação: Vancouver é a escolha mais indicada, pois oferece a combinação perfeita de clima temperado e natureza espetacular, com paisagens que mudam dramaticamente com as estações.`
        }
    };

    const climate = preferences.climate;
    const interest = preferences.interests[0];

    if (mockData[climate] && mockData[climate][interest]) {
        return mockData[climate][interest];
    }

    return `1. Paris, França
    Paris é uma cidade icônica que combina perfeitamente com suas preferências. Com sua rica história cultural, museus renomados como o Louvre e a Torre Eiffel, oferece uma experiência única. A cidade tem excelente gastronomia, moda e arte, além de parques encantadores como o Luxemburgo e o Tuileries.

    2. Tóquio, Japão
    Tóquio oferece uma mistura fascinante de tradição e modernidade. Com templos antigos, jardins zen e tecnologia de ponta, é um destino que surpreende a cada esquina. Explore o Templo Senso-ji, o Palácio Imperial e os bairros modernos como Shibuya. A gastronomia local é excepcional, desde sushi tradicional até ramen de rua.

    3. Nova York, EUA
    Nova York é a cidade que nunca dorme, oferecendo cultura, arte e entretenimento 24 horas por dia. Com museus como o MoMA, Broadway e Central Park, há sempre algo para fazer. A diversidade cultural e gastronômica é impressionante, com bairros únicos como Chinatown, Little Italy e Harlem.

    Recomendação: Paris é a escolha mais indicada, pois oferece uma experiência cultural rica e diversificada, com história, arte e gastronomia de classe mundial, além de ser facilmente acessível e oferecer experiências para todos os tipos de viajantes.`;
}
