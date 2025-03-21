// 图片画廊功能实现
const GALLERY_API = 'https://api.hn/api.php?zd=pc&fl=suiji&gs=json';

window.addEventListener('DOMContentLoaded', () => {
    initGallery();
    loadMoreImages();
});

async function fetchImages(page = 1) {
    try {
        const response = await fetch(`${GALLERY_API}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('图片加载失败:', error);
        showError('图片加载失败，请稍后重试');
    }
}

function createGalleryItem(imgData) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="gallery-item">
            <img src="${imgData.imgurl}" 
                 class="img-fluid rounded-3"
                 alt="动态图片"
                 loading="lazy"
                 style="height: 300px; object-fit: cover">
            <div class="p-3 bg-light">
                <p class="text-muted mb-0">分辨率：${imgData.width}x${imgData.height}</p>
            </div>
        </div>
    `;
    return col;
}

let currentPage = 1;

async function loadMoreImages() {
    const loader = document.getElementById('gallery-loader');
    loader.classList.remove('d-none');
    
    const data = await fetchImages(currentPage);
    if (data && data.code === '200') {
        const gallery = document.getElementById('gallery-container');
        const item = createGalleryItem(data);
        gallery.appendChild(item);
        currentPage++;
    }
    
    loader.classList.add('d-none');
}

function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger mt-4';
    alert.textContent = message;
    document.getElementById('gallery').appendChild(alert);
}

// 分页按钮事件绑定
document.getElementById('load-more').addEventListener('click', loadMoreImages);