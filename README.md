# APAE Angatuba - Website

Site oficial da APAE (Associação de Pais e Amigos dos Excepcionais) de Angatuba, desenvolvido com foco na acessibilidade e experiência do usuário.

## 🎯 Características

- **Design Responsivo**: Adaptável a todos os dispositivos
- **Modo Escuro/Claro**: Toggle para alternar entre temas
- **Acessibilidade**: Desenvolvido seguindo as melhores práticas de acessibilidade
- **Performance Otimizada**: Carregamento rápido e eficiente
- **Interface Moderna**: Design limpo e profissional

## 🌟 Funcionalidades

### Toggle de Tema
- Botão para alternar entre modo claro e escuro
- Preferência salva no navegador
- Detecção automática da preferência do sistema

### Seções Principais
- **Hero Section**: Apresentação da APAE de Angatuba
- **Sobre**: História e missão da instituição
- **Impacto**: Números e resultados alcançados
- **Doações**: Sistema de doação via PIX
- **Depoimentos**: Histórias de transformação
- **Contato**: Informações de contato e localização

### Recursos Interativos
- Menu de navegação responsivo
- Smooth scroll para links internos
- Animações suaves
- Notificações de feedback
- Copiar chave PIX com um clique

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis CSS
- **JavaScript**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 📁 Estrutura do Projeto

```
apae-website/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── server.ps1          # Script para servidor local (PowerShell)
└── README.md           # Documentação
```

## 🚀 Como Executar

### Opção 1: Servidor Python
```bash
python -m http.server 8000
```

### Opção 2: Servidor Node.js
```bash
npx serve .
```

### Opção 3: PowerShell (Windows)
```powershell
.\server.ps1
```

Após executar um dos comandos acima, acesse `http://localhost:8000` no seu navegador.

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas editando as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #fbbf24;
    --accent-color: #10b981;
}
```

### Conteúdo
- Edite o arquivo `index.html` para modificar textos e informações
- Atualize imagens substituindo os links do Unsplash
- Modifique a chave PIX na seção de doações

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## ♿ Acessibilidade

- Navegação por teclado
- Contraste adequado
- Textos alternativos em imagens
- Estrutura semântica
- Suporte a leitores de tela

## 🔧 Funcionalidades JavaScript

### Toggle de Tema
```javascript
// Salva preferência no localStorage
localStorage.setItem('theme', 'dark');

// Detecta preferência do sistema
window.matchMedia('(prefers-color-scheme: dark)')
```

### Smooth Scroll
```javascript
// Navegação suave para links internos
window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
});
```

### Copiar PIX
```javascript
// Copia chave PIX para área de transferência
await navigator.clipboard.writeText(pixKey);
```

## 📞 Informações de Contato

**APAE Angatuba**
- **Telefone**: (15) 3333-4444
- **Email**: contato@apaeangatuba.org.br
- **Endereço**: Angatuba, SP - Brasil
- **Horário**: Segunda a Sexta: 8h às 17h

## 🤝 Como Ajudar

### Doação via PIX
- **Chave**: apae.angatuba@email.com
- **Valores sugeridos**: R$ 25, R$ 50, R$ 100, R$ 200

### Voluntariado
Entre em contato para saber como se tornar voluntário.

## 📄 Licença

Este projeto foi desenvolvido para a APAE de Angatuba. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a inclusão** 