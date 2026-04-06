// Password Configuration
const PASSWORD = "premium123"; // Default password, you can change this
const PASSWORD_STORAGE_KEY = "site_access_granted";

// Password Protection System - SIMPLIFIED VERSION
function initPasswordProtection() {
    const body = document.body;
    
    // Check if access was previously granted
    const accessGranted = localStorage.getItem(PASSWORD_STORAGE_KEY);
    
    if (accessGranted === 'true') {
        // Site already unlocked from previous session
        body.classList.remove('password-protected');
        body.classList.add('password-unlocked');
    } else {
        // Show password protection
        body.classList.add('password-protected');
        body.classList.remove('password-unlocked');
    }
    
    // NOTE: Password validation is now handled by inline JavaScript in index.html
    // This ensures the button always works
}

// Add shake animation - will be added when DOM is loaded

// Internationalization (i18n) System
const LANG_STORAGE_KEY = "site_language";
const SUPPORTED_LANGS = ['en', 'zh', 'es', 'fr', 'ar', 'vi'];
let currentLang = 'en';
let translations = {};

// Load translation file for a language
async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Language file not found: ${lang}`);
        }
        translations[lang] = await response.json();
        return translations[lang];
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
        // Fallback to English if the requested language fails
        if (lang !== 'en') {
            return loadTranslations('en');
        }
        return {};
    }
}

// Update all text elements on the page
function updatePageTexts(langData) {
    // Update meta title and description
    document.title = langData.site.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', langData.site.description);
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length >= 4) {
        navLinks[0].textContent = langData.nav.home;
        navLinks[1].textContent = langData.nav.products;
        navLinks[2].textContent = langData.nav.about;
        navLinks[3].textContent = langData.nav.contact;
    }
    
    // Update hero section
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButton = document.querySelector('.hero .btn-primary');
    if (heroTitle) heroTitle.textContent = langData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = langData.hero.subtitle;
    if (heroButton) heroButton.textContent = langData.hero.button;
    
    // Update products section
    const productsTitle = document.querySelector('.products .section-title');
    const productsSubtitle = document.querySelector('.products .section-subtitle');
    if (productsTitle) productsTitle.textContent = langData.products.title;
    if (productsSubtitle) productsSubtitle.textContent = langData.products.subtitle;
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length >= 7) {
        filterButtons[0].textContent = langData.products.filterAll;
        filterButtons[1].textContent = langData.products.filterCat1;
        filterButtons[2].textContent = langData.products.filterCat2;
        filterButtons[3].textContent = langData.products.filterCat3;
        filterButtons[4].textContent = langData.products.filterCat4;
        filterButtons[5].textContent = langData.products.filterCat5;
        filterButtons[6].textContent = langData.products.filterCat6;
    }
    
    // Update about section
    const aboutTitle = document.querySelector('.about .section-title');
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    if (aboutTitle) aboutTitle.textContent = langData.about.title;
    if (aboutParagraphs.length >= 3) {
        aboutParagraphs[0].textContent = langData.about.text1;
        aboutParagraphs[1].textContent = langData.about.text2;
        aboutParagraphs[2].textContent = langData.about.text3;
    }
    
    // Update contact section
    const contactTitle = document.querySelector('.contact .section-title');
    const contactSubtitle = document.querySelector('.contact .section-subtitle');
    if (contactTitle) contactTitle.textContent = langData.contact.title;
    if (contactSubtitle) contactSubtitle.textContent = langData.contact.subtitle;
    
    // Update contact items
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems.length >= 2) {
        // Instant consultation
        const instantTitle = contactItems[0].querySelector('h3');
        const instantText = contactItems[0].querySelector('p');
        const wechatBtn = contactItems[0].querySelector('.btn-wechat');
        if (instantTitle) instantTitle.textContent = langData.contact.instantTitle;
        if (instantText) instantText.textContent = langData.contact.instantText;
        if (wechatBtn) wechatBtn.innerHTML = `<i class="fab fa-weixin"></i> ${langData.contact.wechat}`;
        
        // Email inquiry
        const emailTitle = contactItems[1].querySelector('h3');
        const emailText = contactItems[1].querySelector('p');
        const emailBtn = contactItems[1].querySelector('.btn-email');
        if (emailTitle) emailTitle.textContent = langData.contact.emailTitle;
        if (emailText) emailText.textContent = langData.contact.emailText;
        if (emailBtn) emailBtn.innerHTML = `<i class="fas fa-envelope"></i> ${langData.contact.sendEmail}`;
    }
    
    // Update contact form
    const formTitle = document.querySelector('.contact-form h3');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const productInput = document.getElementById('product');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.btn-submit');
    
    if (formTitle) formTitle.textContent = langData.contact.formTitle;
    if (nameInput) nameInput.placeholder = langData.contact.namePlaceholder;
    if (emailInput) emailInput.placeholder = langData.contact.emailPlaceholder;
    if (productInput) productInput.placeholder = langData.contact.productPlaceholder;
    if (messageInput) messageInput.placeholder = langData.contact.messagePlaceholder;
    if (submitBtn) submitBtn.textContent = langData.contact.submit;
    
    // Update footer
    const footerBrand = document.querySelector('.footer-section h3');
    const footerBrandDesc = document.querySelector('.footer-section p');
    const footerQuickLinks = document.querySelectorAll('.footer-section h3')[1];
    const footerContactMethods = document.querySelectorAll('.footer-section h3')[2];
    const footerContactText = document.querySelectorAll('.footer-section p')[1];
    const footerCopyright = document.querySelector('.footer-bottom p');
    
    if (footerBrand) footerBrand.textContent = langData.footer.brand;
    if (footerBrandDesc) footerBrandDesc.textContent = langData.footer.brandDesc;
    if (footerQuickLinks) footerQuickLinks.textContent = langData.footer.quickLinks;
    if (footerContactMethods) footerContactMethods.textContent = langData.footer.contactMethods;
    if (footerContactText) footerContactText.textContent = langData.footer.contactText;
    if (footerCopyright) {
        const year = new Date().getFullYear();
        footerCopyright.innerHTML = `&copy; ${year} ${langData.footer.brand}. ${langData.footer.copyright}`;
    }
    
    // Update password protection text
    const passwordTitle = document.querySelector('.password-box h2');
    const passwordText = document.querySelector('.password-box p');
    const passwordNote = document.querySelector('.password-note');
    if (passwordTitle) passwordTitle.textContent = 'Protected Access';
    if (passwordText) passwordText.textContent = 'This website is password protected. Please enter the access password.';
    if (passwordNote) passwordNote.textContent = 'Contact the owner for access credentials.';
}

// Change language
async function changeLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
        console.warn(`Language ${lang} is not supported. Falling back to English.`);
        lang = 'en';
    }
    
    // Load translations if not already loaded
    if (!translations[lang]) {
        await loadTranslations(lang);
    }
    
    // Update current language
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    
    // Update active language button
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update page texts
    updatePageTexts(translations[lang]);
    
    // Reload products data for the new language
    await loadProductsDataByLang(lang);
}

// Initialize language
async function initLanguage() {
    // Get saved language from localStorage, default to English
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    const initialLang = savedLang && SUPPORTED_LANGS.includes(savedLang) ? savedLang : 'en';
    
    // Load translations for the selected language
    await loadTranslations(initialLang);
    
    // Set active language button
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.dataset.lang === initialLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update page texts
    updatePageTexts(translations[initialLang]);
    
    // Load products data for the selected language
    await loadProductsDataByLang(initialLang);
    
    // Set up language button event listeners
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });
}

// 产品数据 - 将从data/products.json文件加载（现在支持多语言）
let productsData = [];

// 加载产品数据（基于语言）
async function loadProductsDataByLang(lang = 'en') {
    try {
        const response = await fetch(`data/products-${lang}.json`);
        if (!response.ok) {
            // Fallback to English if language-specific file not found
            if (lang !== 'en') {
                console.warn(`Product data for ${lang} not found, falling back to English.`);
                return loadProductsDataByLang('en');
            }
            throw new Error('无法加载产品数据');
        }
        productsData = await response.json();
        renderProducts(); // Re-render products with new data
        return productsData;
    } catch (error) {
        console.error('加载产品数据失败:', error);
        // 使用示例数据作为后备
        productsData = [
            {
                id: 1,
                title: "Exquisite Sports Shoes",
                description: "High-quality sports shoe design, focusing on details and craftsmanship, providing multi-angle detail display.",
                images: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ],
                category: "category1"
            },
            {
                id: 2,
                title: "Fashion Handbag",
                description: "Handmade with selected materials, paying attention to every stitching detail and hardware accessories.",
                images: [
                    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ],
                category: "category2"
            }
        ];
        renderProducts();
        return productsData;
    }
}

// Legacy function for compatibility
async function loadProductsData() {
    return loadProductsDataByLang(currentLang);
}
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('无法加载产品数据');
        }
        productsData = await response.json();
        return productsData;
    } catch (error) {
        console.error('加载产品数据失败:', error);
        // 使用示例数据作为后备
        productsData = [
            {
                id: 1,
                title: "精致运动鞋款",
                description: "高品质运动鞋设计，注重细节与工艺，提供多角度细节展示。",
                images: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ],
                category: "category1"
            },
            {
                id: 2,
                title: "时尚手提包",
                description: "精选材质手工制作，注重每一个缝线细节和五金配件。",
                images: [
                    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                ],
                category: "category2"
            }
        ];
        return productsData;
    }
}

// DOM元素
document.addEventListener('DOMContentLoaded', function() {
    // Add shake animation for password input
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // 初始化密码保护
    initPasswordProtection();
    
    // 获取元素
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productModal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const modalContactBtn = document.getElementById('modalContactBtn');
    const inquiryForm = document.getElementById('inquiryForm');
    const wechatModal = document.getElementById('wechatModal');
    const closeWechatModal = document.getElementById('closeWechatModal');
    const wechatBtn = document.getElementById('wechatBtn');
    const floatingWechatBtn = document.getElementById('floatingWechatBtn');
    const footerWechatBtn = document.getElementById('footerWechatBtn');
    const telegramBtn = document.getElementById('telegramBtn');
    const emailBtn = document.getElementById('emailBtn');
    
    // 设置当前年份
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // 移动端菜单切换
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // 点击外部关闭菜单
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // 初始化产品网格
    async function initProducts() {
        await loadProductsData();
        renderProducts();
    }
    
    function renderProducts(filter = 'all') {
        productGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? productsData 
            : productsData.filter(product => product.category === filter);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <a href="#" class="view-details">${translations[currentLang]?.products?.viewDetails || 'View details'} <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            productCard.addEventListener('click', function(e) {
                e.preventDefault();
                openProductModal(product.id);
            });
            
            productGrid.appendChild(productCard);
        });
        
        // 如果没有产品
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `
                <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                    <i class="fas fa-box-open" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 20px;"></i>
                    <h3 style="color: #4a5568;">No Products</h3>
                    <p style="color: #a0aec0;">There are no products in this category at the moment.</p>
                </div>
            `;
        }
    }
    
    // 产品筛选
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 渲染筛选后的产品
            renderProducts(this.dataset.filter);
        });
    });
    
    // 打开产品模态框
    function openProductModal(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        
        // 设置模态框内容
        modalProductTitle.textContent = product.title;
        modalProductDescription.textContent = product.description;
        modalMainImage.src = product.images[0];
        modalMainImage.alt = product.title;
        
        // 设置联系按钮
        modalContactBtn.href = '#contact';
        
        // 创建缩略图
        thumbnailContainer.innerHTML = '';
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="${product.title} 细节图 ${index + 1}">`;
            
            thumbnail.addEventListener('click', function() {
                // 更新主图
                modalMainImage.src = image;
                
                // 更新活动缩略图
                thumbnailContainer.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
        
        // 显示模态框
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭产品模态框
    closeModal.addEventListener('click', function() {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === wechatModal) {
            wechatModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 微信模态框控制
    function openWechatModal() {
        wechatModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    closeWechatModal.addEventListener('click', function() {
        wechatModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 绑定微信按钮点击事件
    if (wechatBtn) wechatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openWechatModal();
    });
    
    if (floatingWechatBtn) floatingWechatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openWechatModal();
    });
    
    if (footerWechatBtn) footerWechatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openWechatModal();
    });
    
    // 联系按钮设置（需要用户自己更新）
    function updateContactButtons() {
        // 这里可以添加代码从配置文件读取联系方式
        // 暂时使用占位符
        const telegramUsername = ''; // 用户需要提供
        const emailAddress = ''; // 用户需要提供
        const wechatQR = ''; // 用户需要提供二维码图片URL
        
        if (telegramUsername) {
            const telegramUrl = `https://t.me/${telegramUsername}`;
            if (telegramBtn) telegramBtn.href = telegramUrl;
            document.querySelectorAll('.telegram-float').forEach(btn => {
                btn.href = telegramUrl;
            });
        }
        
        if (emailAddress) {
            if (emailBtn) emailBtn.href = `mailto:${emailAddress}`;
        }
    }
    
    // 表单提交处理
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                product: document.getElementById('product').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // 这里应该发送到服务器或邮件服务
            // 目前只是显示成功消息
            alert('询盘已发送！我们会尽快回复您。');
            
            // 重置表单
            inquiryForm.reset();
        });
    }
    
    // 初始化
    initLanguage();
    updateContactButtons();
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});