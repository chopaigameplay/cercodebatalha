// 1º - Funções auxiliares
function formatName(filename) {
    return filename
        .replace(/_/g, ' ')
        .replace(/\d+/g, '')
        .replace(/\.[^/.]+$/, "");
}

// Sistema de Modal para Cartas
const setupCardsModal = () => {
    const modal = document.getElementById('cards-modal');
    const closeBtn = document.querySelector('.close-modal');
    const cardsTabBtn = document.querySelector('[data-tab="cartas"]');

    // Abrir modal
    cardsTabBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Fechar ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
};

// Sistema de Abas (exceto a aba de cartas)
document.querySelectorAll('.tab-btn:not([data-tab="cartas"])').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove classe ativa de todos
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Adiciona classe ativa no selecionado
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Zoom na imagem do tabuleiro
document.querySelector('.board-container img')?.addEventListener('click', function() {
    this.classList.toggle('zoomed');
});

// Carregamento das Cartas
document.addEventListener('DOMContentLoaded', async () => {
    // Configura o modal
    setupCardsModal();

    const cardContainer = document.getElementById('cardContainer');
    const cardImages = [
        "Aberrante_das_Mares_Negras_9269.png",
        "Afogado_das_profundezas_1276.png",
        "Automato_Profanado_3516.png",
        "Azergron_Forja_Sombria_4763.png",
        "Carniçal_das_Fendas_Negras_4885.png",
        "Devoto_das_Chamas_Profundas_6281.png",
        "Drakzhar_Furia_Abissal_4087.png",
        "Engrenagem_Profana_7628.png",
        "Ferrugem_Profana_6650.png",
        "Forjadraco_Rubro_3648.png",
        "Gorvaxx_das_Fossas_Profundas_1705.png",
        "Krathun_o_Escamarrocha_5095.png",
        "Maltheron_o_Trono_Quebrado_7640.png",
        "Naulmor_o_Submerso_Eterno_4290.png",
        "Olho_de_Forja_Profana_1848.png",
        "Putreflexo_da_Selva_Sombria_1321.png",
        "Ruina_Escarlate_8533.png",
        "Sentinela_Abissomarinha_3525.png",
        "Servical_do_Abismo_de_Cinzas_1031.png",
        "Sulvagar_o_Abissal_Escamado_8443.png",
        "Sussurro_Abissal_7789.png",
        "Uimorrath_o_Horror_Abissal_1149.png",
        "Varnak_o_Tirano_das_Fendas_9418.png",
        "Verzakar_Engrenagem_Primal_5196.png",
        "Vortice_de_Basalto_5028.png",
        "Zuraak_o_Flagelo_Verde-Abissal_9874.png",
    ];

    const checkImage = async (url) => {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    // Processamento das cartas
    for (const image of cardImages) {
        const imagePath = `cards/${image}`;
        const exists = await checkImage(imagePath);
        
        const card = document.createElement('div');
        card.className = 'card';
        
        if (exists) {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = formatName(image);
            card.appendChild(img);

            // Adiciona zoom na carta ao clicar
            img.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
        } else {
            card.innerHTML = `
                <div class="error-card">
                    <p>Arquivo existente mas não carregado:</p>
                    <strong>${image}</strong>
                    <p>Verifique:</p>
                    <ul>
                        <li>Caminho: ${imagePath}</li>
                        <li>Extensão exata</li>
                        <li>Caracteres especiais</li>
                    </ul>
                </div>
            `;
        }
        
        cardContainer.appendChild(card);
    }
});