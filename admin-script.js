// Sistema de Gerenciamento do Cardápio
class MenuManager {
    constructor() {
        this.menuData = {};
        this.currentCategory = 'todos';
        this.editingItem = null;
        this.init();
    }

    init() {
        this.loadMenuData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderMenuTable();
        this.updateCategoryTabs();
    }

    // Carregar dados do menu do localStorage ou usar dados padrão
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
                        id: 'carne-1',
                        name: 'Bife à Parmegiana',
                        description: 'Bife empanado com molho de tomate e queijo mussarela gratinado',
                        price: 42.90,
                        category: 'pratos-principais',
                        icon: '🥩'
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
                    }
                ]
            };
            this.saveMenuData();
        }
    }

    // Salvar dados no localStorage
    saveMenuData() {
        localStorage.setItem('restaurantMenu', JSON.stringify(this.menuData));
        // Atualizar também a página principal
        this.updateMainPage();
    }

    // Atualizar a página principal com os novos dados
    updateMainPage() {
        // Enviar dados para a página principal via localStorage
        localStorage.setItem('restaurantMenuUpdated', Date.now().toString());
    }

    // Configurar event listeners
    setupEventListeners() {
        // Botões principais
        document.getElementById('addItemBtn').addEventListener('click', () => this.showItemModal());
        document.getElementById('addCategoryBtn').addEventListener('click', () => this.showCategoryModal());
        
        // Modais
        document.getElementById('closeModal').addEventListener('click', () => this.hideItemModal());
        document.getElementById('closeCategoryModal').addEventListener('click', () => this.hideCategoryModal());
        document.getElementById('closeDeleteModal').addEventListener('click', () => this.hideDeleteModal());
        
        // Formulários
        document.getElementById('itemForm').addEventListener('submit', (e) => this.handleItemSubmit(e));
        document.getElementById('categoryForm').addEventListener('submit', (e) => this.handleCategorySubmit(e));
        
        // Botões de cancelar
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideItemModal());
        document.getElementById('cancelCategoryBtn').addEventListener('click', () => this.hideCategoryModal());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.hideDeleteModal());
        
        // Fechar modais ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAllModals();
            }
        });
    }

    // Renderizar dashboard
    renderDashboard() {
        const totalItems = this.getTotalItems();
        const totalCategories = Object.keys(this.menuData).length;
        const avgPrice = this.getAveragePrice();

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalCategories').textContent = totalCategories;
        document.getElementById('avgPrice').textContent = `R$ ${avgPrice.toFixed(2)}`;
    }

    // Obter total de itens
    getTotalItems() {
        return Object.values(this.menuData).reduce((total, category) => total + category.length, 0);
    }

    // Obter preço médio
    getAveragePrice() {
        const allItems = Object.values(this.menuData).flat();
        if (allItems.length === 0) return 0;
        const totalPrice = allItems.reduce((sum, item) => sum + item.price, 0);
        return totalPrice / allItems.length;
    }

    // Renderizar tabela do menu
    renderMenuTable() {
        const tbody = document.getElementById('menuTableBody');
        tbody.innerHTML = '';

        let itemsToShow = [];
        if (this.currentCategory === 'todos') {
            Object.values(this.menuData).forEach(category => {
                itemsToShow = itemsToShow.concat(category);
            });
        } else {
            itemsToShow = this.menuData[this.currentCategory] || [];
        }

        itemsToShow.forEach(item => {
            const row = this.createTableRow(item);
            tbody.appendChild(row);
        });
    }

    // Criar linha da tabela
    createTableRow(item) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="item-icon">${item.icon}</td>
            <td class="item-name">${item.name}</td>
            <td class="item-description">${item.description}</td>
            <td><span class="item-category">${this.formatCategoryName(item.category)}</span></td>
            <td class="item-price">R$ ${item.price.toFixed(2)}</td>
            <td class="item-actions">
                <button class="btn-edit" onclick="menuManager.editItem('${item.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="menuManager.deleteItem('${item.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </td>
        `;
        return row;
    }

    // Formatar nome da categoria
    formatCategoryName(category) {
        const names = {
            'entradas': 'Entradas',
            'pratos-principais': 'Pratos Principais',
            'sobremesas': 'Sobremesas',
            'bebidas': 'Bebidas'
        };
        return names[category] || category;
    }

    // Atualizar abas de categoria
    updateCategoryTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.setActiveCategory(tab.dataset.category);
            });
        });
    }

    // Definir categoria ativa
    setActiveCategory(category) {
        this.currentCategory = category;
        
        // Atualizar botões
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        this.renderMenuTable();
    }

    // Mostrar modal de item
    showItemModal(item = null) {
        this.editingItem = item;
        const modal = document.getElementById('itemModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('itemForm');

        if (item) {
            title.textContent = 'Editar Item';
            this.populateItemForm(item);
        } else {
            title.textContent = 'Adicionar Item';
            form.reset();
        }

        modal.classList.add('show');
    }

    // Ocultar modal de item
    hideItemModal() {
        document.getElementById('itemModal').classList.remove('show');
        this.editingItem = null;
    }

    // Preencher formulário com dados do item
    populateItemForm(item) {
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemDescription').value = item.description;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemIcon').value = item.icon;
    }

    // Mostrar modal de categoria
    showCategoryModal() {
        document.getElementById('categoryModal').classList.add('show');
    }

    // Ocultar modal de categoria
    hideCategoryModal() {
        document.getElementById('categoryModal').classList.remove('show');
    }

    // Ocultar modal de exclusão
    hideDeleteModal() {
        document.getElementById('deleteModal').classList.remove('show');
    }

    // Ocultar todos os modais
    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    // Manipular envio do formulário de item
    handleItemSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('itemName').value,
            description: document.getElementById('itemDescription').value,
            category: document.getElementById('itemCategory').value,
            price: parseFloat(document.getElementById('itemPrice').value),
            icon: document.getElementById('itemIcon').value
        };

        if (this.editingItem) {
            this.updateItem(this.editingItem.id, formData);
        } else {
            this.addItem(formData);
        }

        this.hideItemModal();
    }

    // Manipular envio do formulário de categoria
    handleCategorySubmit(e) {
        e.preventDefault();
        
        const categoryName = document.getElementById('categoryName').value;
        const categorySlug = document.getElementById('categorySlug').value;

        if (this.menuData[categorySlug]) {
            this.showNotification('Categoria já existe!', 'error');
            return;
        }

        this.addCategory(categorySlug, categoryName);
        this.hideCategoryModal();
        document.getElementById('categoryForm').reset();
    }

    // Adicionar item
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
        this.renderDashboard();
        this.renderMenuTable();
        this.showNotification('Item adicionado com sucesso!', 'success');
    }

    // Atualizar item
    updateItem(itemId, itemData) {
        let itemFound = false;
        
        Object.values(this.menuData).forEach(category => {
            const itemIndex = category.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                // Se a categoria mudou, remover da categoria antiga
                if (category[itemIndex].category !== itemData.category) {
                    category.splice(itemIndex, 1);
                    if (!this.menuData[itemData.category]) {
                        this.menuData[itemData.category] = [];
                    }
                    this.menuData[itemData.category].push({
                        ...category[itemIndex],
                        ...itemData
                    });
                } else {
                    // Atualizar na mesma categoria
                    category[itemIndex] = { ...category[itemIndex], ...itemData };
                }
                itemFound = true;
            }
        });

        if (itemFound) {
            this.saveMenuData();
            this.renderDashboard();
            this.renderMenuTable();
            this.showNotification('Item atualizado com sucesso!', 'success');
        }
    }

    // Excluir item
    deleteItem(itemId) {
        let itemToDelete = null;
        
        Object.values(this.menuData).forEach(category => {
            const itemIndex = category.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                itemToDelete = category[itemIndex];
                category.splice(itemIndex, 1);
            }
        });

        if (itemToDelete) {
            this.showDeleteConfirmation(itemToDelete);
        }
    }

    // Mostrar confirmação de exclusão
    showDeleteConfirmation(item) {
        document.getElementById('deleteItemName').textContent = item.name;
        document.getElementById('deleteModal').classList.add('show');
        
        document.getElementById('confirmDeleteBtn').onclick = () => {
            this.confirmDelete(item.id);
        };
    }

    // Confirmar exclusão
    confirmDelete(itemId) {
        Object.values(this.menuData).forEach(category => {
            const itemIndex = category.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                category.splice(itemIndex, 1);
            }
        });

        this.saveMenuData();
        this.renderDashboard();
        this.renderMenuTable();
        this.hideDeleteModal();
        this.showNotification('Item excluído com sucesso!', 'success');
    }

    // Adicionar categoria
    addCategory(slug, name) {
        this.menuData[slug] = [];
        
        // Adicionar nova aba
        const tabsContainer = document.querySelector('.categories-tabs');
        const newTab = document.createElement('button');
        newTab.className = 'tab-btn';
        newTab.dataset.category = slug;
        newTab.textContent = name;
        newTab.addEventListener('click', () => this.setActiveCategory(slug));
        
        // Inserir antes do botão de adicionar categoria
        const addCategoryBtn = document.getElementById('addCategoryBtn');
        tabsContainer.insertBefore(newTab, addCategoryBtn);
        
        this.saveMenuData();
        this.renderDashboard();
        this.showNotification('Categoria criada com sucesso!', 'success');
    }

    // Editar item
    editItem(itemId) {
        let itemToEdit = null;
        
        Object.values(this.menuData).forEach(category => {
            const item = category.find(item => item.id === itemId);
            if (item) itemToEdit = item;
        });

        if (itemToEdit) {
            this.showItemModal(itemToEdit);
        }
    }

    // Gerar ID único
    generateId() {
        return 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // Mostrar notificação
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Inicializar quando a página carregar
let menuManager;
document.addEventListener('DOMContentLoaded', function() {
    menuManager = new MenuManager();
});

// Função global para acessar o menuManager
window.menuManager = menuManager;
