// Configurações de Login
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'q1w2e3r4t5@'
};

// Estado da aplicação
let isAuthenticated = false;
let currentUser = '';
let menuData = {};
let currentCategory = 'todos';
let editingItemId = null;

// Elementos DOM
const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const currentUserSpan = document.getElementById('currentUser');
const btnLogout = document.getElementById('btnLogout');

// Verificar se já está logado
function checkAuthStatus() {
    console.log('🔐 Verificando status de autenticação...');
    
    const authToken = localStorage.getItem('adminAuthToken');
    console.log('Token encontrado:', authToken);
    
    if (authToken) {
        try {
            const authData = JSON.parse(authToken);
            console.log('Dados de autenticação:', authData);
            
            if (authData.username && authData.timestamp) {
                // Verificar se o token não expirou (24 horas)
                const now = Date.now();
                const tokenAge = now - authData.timestamp;
                const maxAge = 24 * 60 * 60 * 1000; // 24 horas
                
                console.log('Idade do token:', tokenAge, 'ms');
                console.log('Token válido por:', maxAge, 'ms');
                
                if (tokenAge < maxAge) {
                    console.log('✅ Token válido, mostrando painel admin');
                    isAuthenticated = true;
                    currentUser = authData.username;
                    showAdminPanel();
                    return;
                } else {
                    console.log('⏰ Token expirado, removendo...');
                    localStorage.removeItem('adminAuthToken');
                }
            }
        } catch (error) {
            console.error('❌ Erro ao processar token:', error);
            localStorage.removeItem('adminAuthToken');
        }
    }
    
    // Se não estiver autenticado, mostrar tela de login
    console.log('🔒 Mostrando tela de login');
    showLoginScreen();
}

// Mostrar tela de login
function showLoginScreen() {
    console.log('🔒 Mostrando tela de login');
    console.log('Elemento loginScreen:', loginScreen);
    console.log('Elemento adminPanel:', adminPanel);
    
    if (loginScreen && adminPanel) {
        loginScreen.style.display = 'flex';
        adminPanel.style.display = 'none';
        isAuthenticated = false;
        currentUser = '';
        console.log('✅ Tela de login exibida');
        console.log('loginScreen.display:', loginScreen.style.display);
        console.log('adminPanel.display:', adminPanel.style.display);
        
        // Verificar se a tela está realmente visível
        setTimeout(() => {
            const isLoginVisible = loginScreen.style.display === 'flex';
            const isAdminHidden = adminPanel.style.display === 'none';
            console.log('Verificação de visibilidade:');
            console.log('Login visível?', isLoginVisible);
            console.log('Admin oculto?', isAdminHidden);
        }, 100);
    } else {
        console.error('❌ Elementos DOM não encontrados');
    }
}

// Mostrar painel administrativo
function showAdminPanel() {
    console.log('🖥️ Mostrando painel administrativo');
    console.log('Elemento loginScreen:', loginScreen);
    console.log('Elemento adminPanel:', adminPanel);
    
    if (loginScreen && adminPanel) {
        loginScreen.style.display = 'none';
        adminPanel.style.display = 'block';
        currentUserSpan.textContent = `Bem-vindo, ${currentUser}!`;
        
        // Inicializar o painel
        initializeAdminPanel();
        console.log('✅ Painel admin exibido');
    } else {
        console.error('❌ Elementos DOM não encontrados');
    }
}

// Autenticar usuário
function authenticateUser(username, password) {
    console.log('🔐 Tentativa de autenticação...');
    console.log('Usuário digitado:', username);
    console.log('Senha digitada:', password);
    console.log('Usuário esperado:', ADMIN_CREDENTIALS.username);
    console.log('Senha esperada:', ADMIN_CREDENTIALS.password);
    console.log('Usuário correto?', username === ADMIN_CREDENTIALS.username);
    console.log('Senha correta?', password === ADMIN_CREDENTIALS.password);
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        console.log('✅ Autenticação bem-sucedida!');
        isAuthenticated = true;
        currentUser = username;
        
        // Salvar token de autenticação
        const authToken = {
            username: username,
            timestamp: Date.now()
        };
        localStorage.setItem('adminAuthToken', JSON.stringify(authToken));
        console.log('💾 Token salvo no localStorage');
        
        showAdminPanel();
        return true;
    } else {
        console.log('❌ Autenticação falhou!');
        return false;
    }
}

// Fazer logout
function logout() {
    isAuthenticated = false;
    currentUser = '';
    localStorage.removeItem('adminAuthToken');
    showLoginScreen();
}

// Inicializar painel administrativo
function initializeAdminPanel() {
    menuManager.loadMenuData();
    renderDashboard();
    renderCategoryTabs();
    renderMenuTable();
    setupEventListeners();
}

// Gerenciador de Menu
class MenuManager {
    constructor() {
        this.menuData = {};
    }

    loadMenuData() {
        const savedData = localStorage.getItem('restaurantMenu');
        if (savedData) {
            this.menuData = JSON.parse(savedData);
        } else {
            // Dados padrão iniciais
            this.menuData = {
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
            this.saveMenuData();
        }
        menuData = this.menuData;
    }

    saveMenuData() {
        localStorage.setItem('restaurantMenu', JSON.stringify(this.menuData));
        this.updateMainPage();
    }

    updateMainPage() {
        // Marcar que o menu foi atualizado
        localStorage.setItem('restaurantMenuUpdated', Date.now());
    }

    addItem(itemData) {
        const newItem = {
            id: this.generateId(),
            ...itemData
        };

        if (!this.menuData[itemData.category]) {
            this.menuData[itemData.category] = [];
        }

        this.menuData[itemData.category].push(newItem);
        this.saveMenuData();
        return newItem;
    }

    updateItem(itemId, itemData) {
        let itemFound = false;
        
        Object.keys(this.menuData).forEach(category => {
            const itemIndex = this.menuData[category].findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                // Se a categoria mudou, remover da categoria antiga
                if (this.menuData[category][itemIndex].category !== itemData.category) {
                    this.menuData[category].splice(itemIndex, 1);
                    
                    // Adicionar na nova categoria
                    if (!this.menuData[itemData.category]) {
                        this.menuData[itemData.category] = [];
                    }
                    this.menuData[itemData.category].push({
                        ...itemData,
                        id: itemId
                    });
                } else {
                    // Atualizar na mesma categoria
                    this.menuData[category][itemIndex] = {
                        ...this.menuData[category][itemIndex],
                        ...itemData
                    };
                }
                itemFound = true;
            }
        });

        if (itemFound) {
            this.saveMenuData();
        }
        return itemFound;
    }

    deleteItem(itemId) {
        let itemFound = false;
        
        Object.keys(this.menuData).forEach(category => {
            const itemIndex = this.menuData[category].findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                this.menuData[category].splice(itemIndex, 1);
                itemFound = true;
            }
        });

        if (itemFound) {
            this.saveMenuData();
        }
        return itemFound;
    }

    addCategory(categoryData) {
        const categoryKey = this.generateCategoryKey(categoryData.name);
        if (!this.menuData[categoryKey]) {
            this.menuData[categoryKey] = [];
            this.saveMenuData();
            return categoryKey;
        }
        return null;
    }

    generateId() {
        return 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    generateCategoryKey(name) {
        return name.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    getTotalItems() {
        return Object.values(this.menuData).reduce((total, category) => total + category.length, 0);
    }

    getTotalCategories() {
        return Object.keys(this.menuData).length;
    }

    getTotalValue() {
        let total = 0;
        Object.values(this.menuData).forEach(category => {
            category.forEach(item => {
                total += item.price;
            });
        });
        return total;
    }
}

// Instanciar gerenciador de menu
const menuManager = new MenuManager();

// Funções de renderização
function renderDashboard() {
    document.getElementById('totalItems').textContent = menuManager.getTotalItems();
    document.getElementById('totalCategories').textContent = menuManager.getTotalCategories();
    document.getElementById('totalValue').textContent = `R$ ${menuManager.getTotalValue().toFixed(2)}`;
}

function renderCategoryTabs() {
    const categoryTabs = document.getElementById('categoryTabs');
    categoryTabs.innerHTML = '';

    // Botão "Todos"
    const allTab = document.createElement('button');
    allTab.className = `tab-btn ${currentCategory === 'todos' ? 'active' : ''}`;
    allTab.textContent = 'Todos';
    allTab.dataset.category = 'todos';
    allTab.addEventListener('click', () => setActiveCategory('todos'));
    categoryTabs.appendChild(allTab);

    // Botões para cada categoria
    Object.keys(menuData).forEach(category => {
        const tab = document.createElement('button');
        tab.className = `tab-btn ${currentCategory === category ? 'active' : ''}`;
        tab.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        tab.dataset.category = category;
        tab.addEventListener('click', () => setActiveCategory(category));
        categoryTabs.appendChild(tab);
    });
}

function renderMenuTable() {
    const tableBody = document.getElementById('menuTableBody');
    tableBody.innerHTML = '';

    let itemsToShow = [];
    
    if (currentCategory === 'todos') {
        Object.values(menuData).forEach(category => {
            itemsToShow = itemsToShow.concat(category);
        });
    } else {
        itemsToShow = menuData[currentCategory] || [];
    }

    itemsToShow.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="menu-item-icon">${item.icon}</td>
            <td class="menu-item-name">${item.name}</td>
            <td class="menu-item-description">${item.description}</td>
            <td class="menu-item-price">R$ ${item.price.toFixed(2)}</td>
            <td class="menu-item-category">${item.category}</td>
            <td class="menu-item-actions">
                <button class="btn-edit" onclick="editItem('${item.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="deleteItem('${item.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function setActiveCategory(category) {
    currentCategory = category;
    renderCategoryTabs();
    renderMenuTable();
}

// Funções de gerenciamento
function addItem() {
    editingItemId = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Item';
    document.getElementById('itemForm').reset();
    
    // Preencher opções de categoria
    const categorySelect = document.getElementById('itemCategory');
    categorySelect.innerHTML = '';
    Object.keys(menuData).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        categorySelect.appendChild(option);
    });
    
    showModal('itemModal');
}

function editItem(itemId) {
    editingItemId = itemId;
    
    // Encontrar o item
    let item = null;
    Object.values(menuData).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });
    
    if (!item) return;
    
    // Preencher o formulário
    document.getElementById('modalTitle').textContent = 'Editar Item';
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemIcon').value = item.icon;
    
    // Preencher opções de categoria
    const categorySelect = document.getElementById('itemCategory');
    categorySelect.innerHTML = '';
    Object.keys(menuData).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        if (category === item.category) option.selected = true;
        categorySelect.appendChild(option);
    });
    
    showModal('itemModal');
}

function deleteItem(itemId) {
    // Encontrar o nome do item
    let itemName = '';
    Object.values(menuData).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) itemName = found.name;
    });
    
    document.getElementById('deleteItemName').textContent = itemName;
    showModal('deleteModal');
}

function addCategory() {
    document.getElementById('categoryForm').reset();
    showModal('categoryModal');
}

// Funções de modal
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
}

// Event Listeners
function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', function(e) {
        console.log('📝 Formulário de login submetido');
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        console.log('Valores do formulário:');
        console.log('Username (trimmed):', username);
        console.log('Password (trimmed):', password);
        console.log('Username length:', username.length);
        console.log('Password length:', password.length);
        
        if (authenticateUser(username, password)) {
            console.log('🎉 Login bem-sucedido, limpando campos');
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            console.log('💥 Login falhou, mostrando alerta');
            alert('Usuário ou senha incorretos!');
        }
    });

    // Logout button
    btnLogout.addEventListener('click', logout);

    // Add item button
    document.getElementById('addItemBtn').addEventListener('click', addItem);

    // Add category button
    document.getElementById('addCategoryBtn').addEventListener('click', addCategory);

    // Item form
    document.getElementById('itemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const itemData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            icon: formData.get('icon')
        };

        if (editingItemId) {
            menuManager.updateItem(editingItemId, itemData);
        } else {
            menuManager.addItem(itemData);
        }

        hideModal('itemModal');
        renderDashboard();
        renderCategoryTabs();
        renderMenuTable();
    });

    // Category form
    document.getElementById('categoryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const categoryData = {
            name: formData.get('name'),
            icon: formData.get('icon')
        };

        const newCategoryKey = menuManager.addCategory(categoryData);
        if (newCategoryKey) {
            hideModal('categoryModal');
            renderDashboard();
            renderCategoryTabs();
            renderMenuTable();
        } else {
            alert('Categoria já existe!');
        }
    });

    // Delete confirmation
    document.getElementById('confirmDelete').addEventListener('click', function() {
        if (editingItemId) {
            menuManager.deleteItem(editingItemId);
            editingItemId = null;
            hideModal('deleteModal');
            renderDashboard();
            renderCategoryTabs();
            renderMenuTable();
        }
    });

    // Modal close buttons
    document.getElementById('closeItemModal').addEventListener('click', () => hideModal('itemModal'));
    document.getElementById('closeCategoryModal').addEventListener('click', () => hideModal('categoryModal'));
    document.getElementById('closeDeleteModal').addEventListener('click', () => hideModal('deleteModal'));

    // Cancel buttons
    document.getElementById('cancelItem').addEventListener('click', () => hideModal('itemModal'));
    document.getElementById('cancelCategory').addEventListener('click', () => hideModal('categoryModal'));
    document.getElementById('cancelDelete').addEventListener('click', () => hideModal('deleteModal'));

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this.id);
            }
        });
    });
}

// Funções globais para onclick
window.editItem = editItem;
window.deleteItem = deleteItem;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM carregado, verificando elementos...');
    
    // Verificar se todos os elementos necessários estão presentes
    const elements = {
        loginScreen: document.getElementById('loginScreen'),
        adminPanel: document.getElementById('adminPanel'),
        loginForm: document.getElementById('loginForm'),
        usernameInput: document.getElementById('username'),
        passwordInput: document.getElementById('password'),
        currentUserSpan: document.getElementById('currentUser'),
        btnLogout: document.getElementById('btnLogout')
    };
    
    console.log('Elementos encontrados:', elements);
    
    // Verificar se algum elemento está faltando
    const missingElements = Object.entries(elements).filter(([name, element]) => !element);
    if (missingElements.length > 0) {
        console.error('❌ Elementos faltando:', missingElements.map(([name]) => name));
        alert('Erro: Alguns elementos da página não foram encontrados. Verifique o console.');
        return;
    }
    
    console.log('✅ Todos os elementos foram encontrados');
    
    // Limpar localStorage para debug
    console.log('🧹 Limpando localStorage para debug...');
    localStorage.removeItem('adminAuthToken');
    
    // Verificar se as credenciais estão definidas
    console.log('🔑 Credenciais configuradas:', ADMIN_CREDENTIALS);
    
    checkAuthStatus();
});
