// script.js
document.getElementById('freightForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const cep = document.getElementById('cep').value;
    const volumes = document.getElementById('volumes').value;
    const peso = document.getElementById('peso').value;
    const comprimento = document.getElementById('comprimento').value;
    const largura = document.getElementById('largura').value;
    const altura = document.getElementById('altura').value;
    const valor = document.getElementById('valor').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const dados = {
        cep,
        volumes,
        peso,
        comprimento,
        largura,
        altura,
        valor,
        telefone,
        email
    };

    try {
        const response = await fetch('URL_DA_API_AQUI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const resultado = await response.json();
        document.getElementById('resultado').innerText = `Valor do frete: R$ ${resultado.valor_frete}`;
        
        // Enviar dados para o e-mail configurado
        await fetch('URL_DO_BACKEND_AQUI/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

    } catch (error) {
        document.getElementById('resultado').innerText = 'Erro ao calcular o frete. Tente novamente mais tarde.';
    }
});
