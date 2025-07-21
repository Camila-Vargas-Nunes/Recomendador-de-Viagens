#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Importar funções do setup-vercel-env.js
import { readEnvFile, setVercelEnvVars } from './setup-vercel-env.js';

function main() {
    console.log('🔧 Verificando variáveis de ambiente antes do push...\n');

    // Verificar se existe arquivo .env
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.log('⚠️  Arquivo .env não encontrado!');
        console.log('📝 Crie um arquivo .env com suas chaves de API antes de fazer push.');
        console.log('💡 Execute: cp .env.example .env e adicione suas chaves');
        process.exit(1);
    }

    // Ler variáveis do .env
    const envVars = readEnvFile();

    // Verificar se as chaves estão configuradas
    const missingKeys = [];
    for (const [key, value] of Object.entries(envVars)) {
        if (value === 'your_openai_api_key_here' || value === 'your_unsplash_api_key_here') {
            missingKeys.push(key);
        }
    }

    if (missingKeys.length > 0) {
        console.log('❌ As seguintes chaves de API não estão configuradas:');
        missingKeys.forEach(key => console.log(`   - ${key}`));
        console.log('\n📝 Configure suas chaves no arquivo .env antes de fazer push.');
        process.exit(1);
    }

    console.log('✅ Todas as variáveis de ambiente estão configuradas!');
    console.log('🚀 Atualizando variáveis no Vercel...\n');

    // Configurar variáveis no Vercel
    setVercelEnvVars(envVars);

    console.log('✅ Push pode continuar!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
} 