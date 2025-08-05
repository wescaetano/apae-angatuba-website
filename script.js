// Funcionalidades JavaScript para a página da APAE

document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidade do toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Verificar se há preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar tema inicial
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Função para atualizar ícone do tema
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
    
    // Event listener para toggle de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Feedback visual
            showNotification(`Modo ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado!`, 'info');
        });
    }
    
    // Função para copiar chave PIX
    const copyPixBtn = document.getElementById('copyPixBtn');
    const pixKey = document.getElementById('pixKey');
    
    if (copyPixBtn && pixKey) {
        copyPixBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(pixKey.textContent);
                
                // Feedback visual
                const originalText = copyPixBtn.innerHTML;
                copyPixBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                copyPixBtn.style.background = '#10b981';
                
                // Restaurar texto original após 2 segundos
                setTimeout(() => {
                    copyPixBtn.innerHTML = originalText;
                    copyPixBtn.style.background = '';
                }, 2000);
                
                // Mostrar notificação
                showNotification('Chave PIX copiada com sucesso!', 'success');
                
            } catch (err) {
                console.error('Erro ao copiar: ', err);
                showNotification('Erro ao copiar chave PIX', 'error');
            }
        });
    }
    
    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Adicionar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de contadores na seção de impacto
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.impact-card h3');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const impactSection = document.querySelector('.impact-grid');
    if (impactSection) {
        observer.observe(impactSection);
    }
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isYears = target.includes('+');
        
        let numericValue = parseInt(target.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPlus) displayValue = '+' + displayValue;
            if (isPercentage) displayValue += '%';
            if (isYears) displayValue += '+';
            
            element.textContent = displayValue;
        }, 30);
    }
    
    // Valores sugeridos para doação
    const amountButtons = document.querySelectorAll('.amount-btn');
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover seleção anterior
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Selecionar botão atual
            this.classList.add('selected');
            
            const amount = this.getAttribute('data-amount');
            showNotification(`Valor sugerido: R$ ${amount} selecionado!`, 'info');
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simular envio
                showNotification('Inscrição realizada com sucesso!', 'success');
                this.reset();
            } else {
                showNotification('Por favor, insira um e-mail válido.', 'error');
            }
        });
    }
    
    // Efeito parallax suave no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[src^="https://images.unsplash.com"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Adicionar classe ativa ao menu baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Adicionar estilos para menu ativo
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--primary-color) !important;
        }
        
        .nav-menu a.active::after {
            width: 100% !important;
        }
        
        .amount-btn.selected {
            background: var(--primary-color) !important;
            color: var(--white) !important;
            border-color: var(--primary-color) !important;
        }
        
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                padding: 1rem;
                border-bottom: 1px solid var(--gray-200);
                box-shadow: var(--shadow-lg);
            }
            
            [data-theme="dark"] .nav-menu.active {
                background: rgba(15, 23, 42, 0.95);
                border-bottom: 1px solid var(--gray-700);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar loading state aos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
    
    // Adicionar estilos para loading state
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .btn.loading {
            pointer-events: none;
            opacity: 0.7;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .fa-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(loadingStyle);
    
    console.log('APAE Angatuba Website carregado com sucesso! 💙');
}); 