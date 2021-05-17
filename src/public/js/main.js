const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const categoryTags = document.querySelectorAll('.tags-container .tag');
const slider = document.getElementById('slider');

searchForm.addEventListener('submit', handleSearch);

noUiSlider.create(slider, {
    start: [0, 20000],
    connect: true,
    steps: 500,
    range: {
        'min': 0,
        'max': 20000,
    },
    pips: {
        mode: 'values',
        values: [1000, 10000, 20000],
        density: 5,
    },
});

slider.noUiSlider.on('change', values => {
    const [minPrice, maxPrice] = values;

    getProducts(searchInput.value, 0, minPrice, maxPrice);
});

async function getProducts(name = '', category, minPrice, maxPrice) {
    const productList = document.getElementById('product-list');
    try {
        let url = `/api/products?name=${name}`;

        if (category) {
            url += `&category=${category}`;
        }

        if (minPrice) {
            url += `&minPrice=${minPrice}`;
        }

        if (maxPrice) {
            url += `&maxPrice=${maxPrice}`;
        }

        productList.classList.add('loading');
        const response = await fetch(url);
        const results = await response.json();

        let html = '';
        if (results.length > 0) {
            results.forEach(item => {
                html += `
                <div class="product-list-item">
                    
                    <img src="${item.url_image || '/assets/placeholder.jpg'}" />
                    <h3>${item.name}</h3>
                    <h4>$ ${item.price} 
                    ${item.discount ? `<span class="badge">-${item.discount}%</span>` : ''}
                    </h4>
                </div>`;
            });
        } else {
            html = `
            <div class="empty">
                <p>No se encontraron resultados para tu búsqueda</p>
                <img src="/assets/box.png" />
            </div>`;
        }

        productList.innerHTML = html;
    } catch (error) {
        productList.innerHTML =
            '<div class="has-error">Ooops! Parece que algo no está bien. Vuelve a intentar más tarde</div>';
        console.log(error);
    } finally {
        productList.classList.remove('loading');
    }
}

async function getCategories() {
    const tagsContainer = document.getElementById('tags-container');
    try {
        const url = '/api/categories';

        const response = await fetch(url);
        const results = await response.json();
        results.unshift({ id: '', name: 'Todas ' });

        results.forEach(item => {
            const tag = document.createElement('a');

            tag.innerHTML = item.name;
            tag.className = 'tag';
            tag.dataset['category'] = item.id;

            tag.addEventListener('click', handleClickOnTag);

            tagsContainer.appendChild(tag);

            tagsContainer.childNodes[0].classList.add('active');
        });
    } catch (error) {
        console.log(error);
    }
}

function handleSearch(e) {
    e.preventDefault();
    const name = searchInput.value;
    const [minPrice, maxPrice] = slider.noUiSlider.get('values');
    const { category } = document.querySelector('.tag.active').dataset;

    getProducts(name, category, minPrice, maxPrice);
}

function handleClickOnTag() {
    const activeTag = document.querySelector('.tag.active');
    activeTag.classList.remove('active');

    this.classList.add('active');
    const category = this.dataset['category'] || 0;
    const name = searchInput.value;
    const [minPrice, maxPrice] = slider.noUiSlider.get('values');

    getProducts(name, category, minPrice, maxPrice);
}

getProducts();
getCategories();

// los cristianos son mejores?
// o se creen mejores?
