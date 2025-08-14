// Dados do menu - Carregados do localStorage ou dados padrão
let menuData = {};

// Função para carregar dados do menu
function loadMenuData() {
    const savedData = localStorage.getItem('restaurantMenu');
    if (savedData) {
        menuData = JSON.parse(savedData);
    } else {
        // Dados padrão iniciais
        menuData = {
            entradas: [
                {
                    id: 'pasta-1',
                    name: 'Pasta de Azeitona',
                    description: 'Pasta cremosa de azeitonas pretas e verdes com ervas frescas',
                    price: 18.90,
                    category: 'entradas',
                    icon: '🥑'
                },
                {
                    id: 'bruschetta-1',
                    name: 'Bruschetta de Tomate',
                    description: 'Pão italiano torrado com tomate, manjericão e azeite de oliva',
                    price: 16.90,
                    category: 'entradas',
                    icon: '🍅'
                },
                {
                    id: 'salada-1',
                    name: 'Salada Caprese',
                    description: 'Salada fresca com tomate, mussarela de búfala e manjericão',
                    price: 22.90,
                    category: 'entradas',
                    icon: '🥗'
                }
            ],
            'pratos-principais': [
                {
                    id: 'pasta-2',
                    name: 'Espaguete à Carbonara',
                    description: 'Massa italiana com ovos, queijo parmesão, bacon e pimenta preta',
                    price: 32.90,
                    category: 'pratos-principais',
                    icon: '🍝'
                },
                {
                    id: 'risotto-1',
                    name: 'Risotto de Funghi',
                    description: 'Arroz arbóreo com cogumelos porcini e queijo parmesão',
                    price: 38.90,
                    category: 'pratos-principais',
                    icon: '🍚'
                },
                {
                    id: 'carne-1',
                    name: 'Bife à Parmegiana',
                    description: 'Bife empanado com molho de tomate e queijo mussarela gratinado',
                    price: 42.90,
                    category: 'pratos-principais',
                    icon: '🥩'
                },
                {
                    id: 'frango-1',
                    name: 'Frango ao Molho Branco',
                    description: 'Peito de frango grelhado com molho cremoso e ervas finas',
                    price: 36.90,
                    category: 'pratos-principais',
                    icon: '🍗'
                }
            ],
            sobremesas: [
                {
                    id: 'sobremesa-1',
                    name: 'Tiramisu',
                    description: 'Sobremesa italiana com café, mascarpone e cacau em pó',
                    price: 24.90,
                    category: 'sobremesas',
                    icon: '🍰'
                },
                {
                    id: 'sobremesa-2',
                    name: 'Panna Cotta',
                    description: 'Creme italiano com baunilha e calda de frutas vermelhas',
                    price: 21.90,
                    category: 'sobremesas',
                    icon: '🍮'
                }
            ],
            bebidas: [
                {
                    id: 'bebida-1',
                    name: 'Limonada Natural',
                    description: 'Limonada fresca com hortelã e adoçada naturalmente',
                    price: 12.90,
                    category: 'bebidas',
                    icon: '🍋'
                },
                {
                    id: 'bebida-2',
                    name: 'Suco de Laranja',
                    description: 'Suco natural de laranja prensada na hora',
                    price: 10.90,
                    category: 'bebidas',
                    icon: '🍊'
                },
                {
                    id: 'bebida-3',
                    name: 'Água com Gás',
                    description: 'Água mineral com gás e limão',
                    price: 6.90,
                    category: 'bebidas',
                    icon: '🥤'
                }
            ]
        };
        // Salvar dados padrão no localStorage
        localStorage.setItem('restaurantMenu', JSON.stringify(menuData));
    }
}

// Verificar se o menu foi atualizado no painel admin
function checkMenuUpdates() {
    const lastUpdate = localStorage.getItem('restaurantMenuUpdated');
    if (lastUpdate) {
        loadMenuData();
        renderMenu();
        localStorage.removeItem('restaurantMenuUpdated');
    }
}

// Carrinho de compras
let cart = [];
let currentCategory = 'todos';

// Elementos DOM
const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const cartSection = document.getElementById('cartSection');
const cartToggle = document.getElementById('cartToggle');
const clearCartBtn = document.getElementById('clearCart');
const orderWhatsAppBtn = document.getElementById('orderWhatsApp');
const categoryBtns = document.querySelectorAll('.category-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();
    renderMenu();
    setupEventListeners();
    updateCartDisplay();
    
    // Verificar atualizações do menu a cada 2 segundos
    setInterval(checkMenuUpdates, 2000);
});

// Configurar event listeners
function setupEventListeners() {
    cartToggle.addEventListener('click', toggleCart);
    clearCartBtn.addEventListener('click', clearCart);
    orderWhatsAppBtn.addEventListener('click', sendToWhatsApp);
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveCategory(btn.dataset.category);
        });
    });
}

// Renderizar menu
function renderMenu() {
    menuGrid.innerHTML = '';
    
    let itemsToShow = [];
    
    if (currentCategory === 'todos') {
        Object.values(menuData).forEach(category => {
            itemsToShow = itemsToShow.concat(category);
        });
    } else {
        itemsToShow = menuData[currentCategory] || [];
    }
    
    itemsToShow.forEach(item => {
        const menuItem = createMenuItem(item);
        menuGrid.appendChild(menuItem);
    });
}

// Criar item do menu
function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <div class="menu-item-image">
            <span style="font-size: 4rem;">${item.icon}</span>
        </div>
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-item-footer">
                <span class="menu-item-price">R$ ${item.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart('${item.id}')">
                    Adicionar
                </button>
            </div>
        </div>
    `;
    return div;
}

// Definir categoria ativa
function setActiveCategory(category) {
    currentCategory = category;
    
    // Atualizar botões
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    renderMenu();
}

// Adicionar ao carrinho
function addToCart(itemId) {
    let item = null;
    
    // Encontrar o item no menu
    Object.values(menuData).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });
    
    if (!item) return;
    
    // Verificar se já existe no carrinho
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${item.name} adicionado ao carrinho!`);
}

// Remover do carrinho
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }
}

// Limpar carrinho
function clearCart() {
    cart = [];
    updateCartDisplay();
    showNotification('Carrinho limpo!');
}

// Atualizar exibição do carrinho
function updateCartDisplay() {
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar itens do carrinho
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Seu carrinho está vazio</p>';
        subtotal.textContent = 'R$ 0,00';
        total.textContent = 'R$ 5,00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="cart-item-price">R$ ${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="removeFromCart('${item.id}')">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="addToCart('${item.id}')">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar totais
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 5.00;
    const totalValue = subtotalValue + deliveryFee;
    
    subtotal.textContent = `R$ ${subtotalValue.toFixed(2)}`;
    total.textContent = `R$ ${totalValue.toFixed(2)}`;
}

// Alternar carrinho
function toggleCart() {
    cartSection.classList.toggle('open');
}

// Enviar para WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Adicione itens ao carrinho primeiro!');
        return;
    }
    
    // Formatar mensagem
    let message = '🍽️ *NOVO PEDIDO - Restaurante Delícias* 🍽️\n\n';
    message += '📋 *ITENS DO PEDIDO:*\n';
    
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += '\n💰 *RESUMO:*\n';
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 5.00;
    const totalValue = subtotalValue + deliveryFee;
    
    message += `Subtotal: R$ ${subtotalValue.toFixed(2)}\n`;
    message += `Taxa de entrega: R$ ${deliveryFee.toFixed(2)}\n`;
    message += `*TOTAL: R$ ${totalValue.toFixed(2)}*\n\n`;
    
    message += '📍 *INFORMAÇÕES DE ENTREGA:*\n';
    message += 'Por favor, informe:\n';
    message += '• Nome completo\n';
    message += '• Endereço completo\n';
    message += '• Telefone para contato\n';
    message += '• Forma de pagamento\n\n';
    
    message += '⏰ *HORÁRIO DE FUNCIONAMENTO:*\n';
    message += 'Segunda a Sexta: 11h às 22h\n';
    message += 'Sábado e Domingo: 12h às 23h\n\n';
    
    message += '📞 *CONTATO:* (11) 99999-9999';
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
            // Número do WhatsApp (substitua pelo número real do restaurante)
        const whatsappNumber = '5592984618663';
    
    // Criar link do WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover notificação
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fechar carrinho ao clicar fora
document.addEventListener('click', function(event) {
    if (!cartSection.contains(event.target) && 
        !cartToggle.contains(event.target) && 
        cartSection.classList.contains('open')) {
        cartSection.classList.remove('open');
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de scroll para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .contact-item, .about-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Aplicar estilos de animação inicial
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.menu-item, .contact-item, .about-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s, transform 0.6s';
    });
    
    // Animar elementos visíveis
    setTimeout(animateOnScroll, 100);
});

// Adicionar listener de scroll para animações
window.addEventListener('scroll', animateOnScroll);
