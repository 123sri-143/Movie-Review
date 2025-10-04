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
// Real-time search functionality (fixed)
document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const movies = document.querySelectorAll('.movie-card');
    let found = false;

    movies.forEach(movie => {
        const title = movie.querySelector('h2').innerText.toLowerCase();
        if (title.includes(query)) {
            movie.style.display = 'block';
            found = true;
        } else {
            movie.style.display = 'none';
        }
    });

    // Optional: show a "No movies found" message if nothing matches
    let noResult = document.getElementById('no-result');
    const gallery = document.getElementById('movie-gallery');
    if (!found) {
        if (!noResult) {
            noResult = document.createElement('div');
            noResult.id = 'no-result';
            noResult.textContent = '❌ No movies found';
            noResult.style.textAlign = 'center';
            noResult.style.padding = '2rem';
            noResult.style.fontSize = '1.2rem';
            noResult.style.color = '#ff3d00';
            gallery.appendChild(noResult);
        }
    } else if (noResult) {
        noResult.remove();
    }
});


