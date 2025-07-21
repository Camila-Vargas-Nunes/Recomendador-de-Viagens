#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function main() {
    console.log('🚀 Inicializador de Variáveis de Ambiente\n');

    const envPath = path.join(process.cwd(), '.env');
    const envExamplePath = path.join(process.cwd(), '.env.example');

    // Verificar se .env já existe
    if (fs.existsSync(envPath)) {
        console.log('✅ Arquivo .env já existe!');
        console.log('📝 Verifique se suas chaves de API estão configuradas corretamente.');
        return;
    }

    // Verificar se .env.example existe
    if (!fs.existsSync(envExamplePath)) {
        console.log('❌ Arquivo .env.example não encontrado!');
        console.log('📝 Crie o arquivo .env.example primeiro.');
        return;
    }

    // Copiar .env.example para .env
    try {
        execSync(`cp .env.example .env`);
        console.log('✅ Arquivo .env criado com sucesso!');
        console.log('📝 Agora edite o arquivo .env e adicione suas chaves de API:');
        console.log('   - VITE_OPENAI_API_KEY=sua_chave_openai_aqui');
        console.log('   - VITE_UNSPLASH_API_KEY=sua_chave_unsplash_aqui');
        console.log('\n💡 Depois execute: npm run setup-env');
    } catch (error) {
        console.log('❌ Erro ao criar arquivo .env:', error.message);
    }
}

if (require.main === module) {
    main();
} 