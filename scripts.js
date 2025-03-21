// 图片画廊功能实现
const LOCAL_IMAGES = [
  { imgurl: '/image/1.png', width: 800, height: 600 },
  { imgurl: '/image/2.png', width: 1024, height: 768 },
  { imgurl: '/image/3.png', width: 1920, height: 1080 }
];

window.addEventListener('DOMContentLoaded', () => {
    initGallery();
    loadMoreImages();
});

function fetchImages(page = 1) {
    return new Promise(resolve => {
        const startIndex = (page - 1) * 1;
        const endIndex = startIndex + 1;
        resolve({
            code: '200',
            ...LOCAL_IMAGES.slice(startIndex, endIndex)[0]
        });
    });
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
        if (currentPage >= LOCAL_IMAGES.length) {
            document.getElementById('load-more').disabled = true;
        }
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