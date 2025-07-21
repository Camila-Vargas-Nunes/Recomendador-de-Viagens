#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Função para ler variáveis do arquivo .env
function readEnvFile() {
    const envPath = path.join(process.cwd(), '.env');

    if (!fs.existsSync(envPath)) {
        console.log('❌ Arquivo .env não encontrado!');
        console.log('📝 Crie um arquivo .env com as seguintes variáveis:');
        console.log('VITE_OPENAI_API_KEY=sua_chave_openai_aqui');
        console.log('VITE_UNSPLASH_API_KEY=sua_chave_unsplash_aqui');
        console.log('VITE_USE_MOCK=false');
        process.exit(1);
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [key, ...valueParts] = trimmedLine.split('=');
            if (key && valueParts.length > 0) {
                envVars[key.trim()] = valueParts.join('=').trim();
            }
        }
    });

    return envVars;
}

// Função para configurar variáveis no Vercel
function setVercelEnvVars(envVars) {
    console.log('🚀 Configurando variáveis de ambiente no Vercel...\n');

    for (const [key, value] of Object.entries(envVars)) {
        if (value && value !== 'your_openai_api_key_here' && value !== 'your_unsplash_api_key_here') {
            try {
                console.log(`📝 Configurando ${key}...`);
                execSync(`vercel env add ${key} production`, {
                    input: value,
                    stdio: ['pipe', 'pipe', 'pipe']
                });
                console.log(`✅ ${key} configurado com sucesso!`);
            } catch (error) {
                console.log(`⚠️  ${key} já existe ou houve um erro: ${error.message}`);
            }
        } else {
            console.log(`⚠️  ${key} não configurado (valor padrão detectado)`);
        }
    }
}

// Função para fazer deploy
function deploy() {
    console.log('\n🚀 Fazendo deploy para o Vercel...');
    try {
        execSync('vercel --prod', { stdio: 'inherit' });
        console.log('✅ Deploy concluído com sucesso!');
    } catch (error) {
        console.log('❌ Erro no deploy:', error.message);
    }
}

// Função principal
function main() {
    console.log('🔧 Configurador de Variáveis de Ambiente do Vercel\n');

    // Verificar se está logado no Vercel
    try {
        execSync('vercel whoami', { stdio: 'pipe' });
    } catch (error) {
        console.log('❌ Você precisa estar logado no Vercel!');
        console.log('🔐 Execute: vercel login');
        process.exit(1);
    }

    // Ler variáveis do .env
    const envVars = readEnvFile();
    console.log('📋 Variáveis encontradas:', Object.keys(envVars).join(', '));

    // Configurar variáveis no Vercel
    setVercelEnvVars(envVars);

    // Perguntar se quer fazer deploy
    console.log('\n🤔 Deseja fazer deploy agora? (y/n)');
    process.stdin.once('data', (data) => {
        const answer = data.toString().trim().toLowerCase();
        if (answer === 'y' || answer === 'yes') {
            deploy();
        } else {
            console.log('👋 Deploy cancelado. Execute "vercel --prod" quando quiser fazer deploy.');
        }
        process.exit(0);
    });
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { readEnvFile, setVercelEnvVars, deploy }; 