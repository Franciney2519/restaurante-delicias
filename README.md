# 🍽️ Restaurante Delícias - Página Web

Uma página web moderna e responsiva para restaurantes, permitindo que clientes façam pedidos online e os direcionem para o WhatsApp.

## ✨ Funcionalidades

- **Menu Categorizado**: Organizado por entradas, pratos principais, sobremesas e bebidas
- **Carrinho de Compras**: Sistema completo de adição/remoção de itens
- **Integração WhatsApp**: Envio automático de pedidos formatados para o WhatsApp
- **Design Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Animações**: Transições suaves e efeitos visuais modernos
- **Filtros de Categoria**: Navegação fácil entre diferentes tipos de pratos

## 🚀 Como Usar

### 1. Abrir a Página
- Abra o arquivo `index.html` em qualquer navegador web moderno
- A página funcionará localmente sem necessidade de servidor

### 2. Navegar pelo Menu
- Use os botões de categoria para filtrar os pratos
- Clique em "Adicionar" para incluir itens no carrinho
- Visualize descrições e preços de cada prato

### 3. Gerenciar o Carrinho
- Clique no ícone do carrinho (canto inferior direito) para abrir
- Use os botões +/- para ajustar quantidades
- Clique em "Limpar" para esvaziar o carrinho

### 4. Fazer o Pedido
- Com itens no carrinho, clique em "Fazer Pedido no WhatsApp"
- O WhatsApp será aberto com uma mensagem formatada
- Complete as informações de entrega diretamente no WhatsApp

## 🛠️ Personalização

### **Painel Administrativo** ⭐ NOVO!

Agora você tem um painel administrativo completo para gerenciar o cardápio sem mexer no código!

#### **Como Acessar**:
- Clique no botão "Admin" no menu de navegação
- Ou acesse diretamente: `admin.html`

#### **Credenciais de Acesso**:
- **Usuário**: `admin`
- **Senha**: `delicias2024`

#### **Funcionalidades**:
- ✅ **Adicionar/Editar/Excluir** itens do menu
- ✅ **Criar novas categorias** de pratos
- ✅ **Dashboard** com estatísticas em tempo real
- ✅ **Interface intuitiva** com formulários
- ✅ **Sincronização automática** com a página principal
- ✅ **Persistência de dados** no navegador

#### **Como Usar o Painel Admin**:
1. **Adicionar Item**: Clique em "Adicionar Item" e preencha o formulário
2. **Editar Item**: Clique no botão "Editar" de qualquer item
3. **Excluir Item**: Clique em "Excluir" e confirme a ação
4. **Nova Categoria**: Clique em "Nova Categoria" para criar categorias personalizadas

### Alterar Informações do Restaurante

#### No arquivo `index.html`:
```html
<!-- Nome do restaurante -->
<h1>Restaurante Delícias</h1>

<!-- Telefone de contato -->
<p>(11) 99999-9999</p>

<!-- Endereço -->
<p>Rua das Flores, 123 - Centro</p>
<p>São Paulo - SP</p>

<!-- Horário de funcionamento -->
<p>Segunda a Sexta: 11h às 22h</p>
<p>Sábado e Domingo: 12h às 23h</p>
```

#### No arquivo `script.js`:
```javascript
// Número do WhatsApp (substitua pelo número real)
const whatsappNumber = '5592984618663';

// Taxa de entrega
const deliveryFee = 5.00;
```

### Modificar o Menu

Edite o objeto `menuData` no arquivo `script.js`:

```javascript
const menuData = {
    entradas: [
        {
            id: 'novo-item',
            name: 'Nome do Prato',
            description: 'Descrição detalhada',
            price: 25.90,
            category: 'entradas',
            icon: '🍽️'
        }
    ],
    // ... outras categorias
};
```

### Alterar Cores e Estilo

Edite o arquivo `styles.css`:

```css
/* Cor principal do restaurante */
:root {
    --primary-color: #e74c3c;
    --secondary-color: #c0392b;
    --accent-color: #f39c12;
}

/* Aplicar em elementos */
.logo i { color: var(--primary-color); }
.btn-primary { background: var(--primary-color); }
```

## 📱 Recursos Responsivos

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação automática para diferentes tamanhos de tela
- **Touch Friendly**: Botões e interações otimizados para toque
- **Navegação Intuitiva**: Menu hambúrguer e carrinho flutuante

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Flexbox, Grid, animações e media queries
- **JavaScript ES6+**: Funcionalidades interativas e gerenciamento de estado
- **Font Awesome**: Ícones vetoriais de alta qualidade
- **Google Fonts**: Tipografia moderna e legível

## 📋 Estrutura de Arquivos

```
restaurante/
├── index.html          # Página principal
├── styles.css          # Estilos e layout
├── script.js           # Funcionalidades JavaScript
├── admin.html          # Painel administrativo
├── admin-styles.css    # Estilos do painel admin
├── admin-script.js     # Funcionalidades do painel admin
└── README.md           # Este arquivo
```

## 🎨 Personalização Avançada

### Adicionar Imagens Reais

Substitua os emojis por imagens reais:

```html
<div class="menu-item-image">
    <img src="caminho/para/imagem.jpg" alt="Nome do Prato">
</div>
```

### Adicionar Mais Categorias

```javascript
const menuData = {
    // ... categorias existentes
    'bebidas-alcoolicas': [
        {
            id: 'cerveja-1',
            name: 'Cerveja Artesanal',
            description: 'Cerveja local da região',
            price: 15.90,
            category: 'bebidas-alcoolicas',
            icon: '🍺'
        }
    ]
};
```

### Modificar Taxa de Entrega

```javascript
// Taxa fixa
const deliveryFee = 8.00;

// Ou taxa baseada no valor do pedido
function calculateDeliveryFee(subtotal) {
    if (subtotal > 50) return 0; // Grátis para pedidos acima de R$ 50
    return 5.00;
}
```

## 🚀 Deploy

### Hospedagem Local
- Simplesmente abra o arquivo `index.html` no navegador
- Funciona offline sem necessidade de servidor

### Hospedagem Web
- Faça upload dos arquivos para qualquer serviço de hospedagem
- Recomendado: Netlify, Vercel, GitHub Pages ou servidor tradicional

### Domínio Personalizado
- Configure um domínio personalizado na sua hospedagem
- Exemplo: `www.seudorestaurante.com.br`

## 📞 Suporte

Para dúvidas ou personalizações específicas:
- Verifique se todos os arquivos estão na mesma pasta
- Teste em diferentes navegadores
- Verifique o console do navegador para erros JavaScript

## 📄 Licença

Este projeto é de uso livre para restaurantes e estabelecimentos comerciais.

---

**Desenvolvido com ❤️ para facilitar pedidos online de restaurantes**
