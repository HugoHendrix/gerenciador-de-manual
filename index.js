   // Elementos DOM
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const manualCards = document.querySelectorAll('.manual-card');
        const manualsGrid = document.getElementById('manualsGrid');
        const noResults = document.getElementById('noResults');

        // Estado atual dos filtros
        let currentCategory = 'all';
        let currentSearch = '';

        // Função para filtrar manuais
        function filterManuals() {
            let visibleCount = 0;

            manualCards.forEach(card => {
                const category = card.dataset.category;
                const title = card.dataset.title.toLowerCase();
                
                const matchesCategory = currentCategory === 'all' || category === currentCategory;
                const matchesSearch = currentSearch === '' || title.includes(currentSearch.toLowerCase());
                
                if (matchesCategory && matchesSearch) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Mostrar/ocultar mensagem de "nenhum resultado"
            if (visibleCount === 0) {
                noResults.classList.add('show');
            } else {
                noResults.classList.remove('show');
            }
        }

        // Event listener para busca
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            filterManuals();
        });

        // Event listeners para filtros de categoria
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Adiciona active ao botão clicado
                btn.classList.add('active');
                
                // Atualiza categoria atual
                currentCategory = btn.dataset.category;
                
                // Aplica filtros
                filterManuals();
            });
        });

        // Adicionar efeito de digitação suave
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                e.target.blur();
            }
        });

        // Animação de entrada dos cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Aplicar animação inicial aos cards
        manualCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

     