let currentMovie = '';
const reviews = {};

function openModal(movie) {
    currentMovie = movie;
    document.getElementById('modal-title').innerText = movie;
    document.getElementById('modal').style.display = 'block';
    loadReviews();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function submitReview() {
    const name = document.getElementById('reviewer').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const rating = document.getElementById('rating').value;

    if(!name || !text) {
        alert('Please enter your name and review!');
        return;
    }

    if(!reviews[currentMovie]) {
        reviews[currentMovie] = [];
    }

    reviews[currentMovie].push({name, text, rating});
    document.getElementById('reviewer').value = '';
    document.getElementById('review-text').value = '';
    document.getElementById('rating').value = '1';
    loadReviews();
}

function loadReviews() {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    if(reviews[currentMovie]) {
        reviews[currentMovie].forEach(r => {
            const li = document.createElement('li');
            li.innerText = `${r.name} (${r.rating}/5): ${r.text}`;
            reviewList.appendChild(li);
        });
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if(event.target == document.getElementById('modal')) {
        closeModal();
    }
}

// Search functionality
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const movies = document.querySelectorAll('.movie-card');
    movies.forEach(movie => {
        const title = movie.querySelector('h3').innerText.toLowerCase();
        movie.style.display = title.includes(query) ? 'block' : 'none';
    });
});
