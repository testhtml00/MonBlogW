// Mode sombre
document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️ Mode clair' : '🌙 Mode sombre';
});

// Recherche
document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.accordion-title').forEach((title) => {
        const article = title.closest('article');
        if (title.textContent.toLowerCase().includes(query)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});

// Likes
document.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
        const postId = this.dataset.id;
        const likeCount = document.getElementById('like-count-' + postId);
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });
});

// Dislikes
document.querySelectorAll('.dislike-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
        const postId = this.dataset.id;
        const dislikeCount = document.getElementById('dislike-count-' + postId);
        dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
    });
});

// Commentaires
document.querySelectorAll('.comment-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
        const postId = this.dataset.id;
        const nameInput = document.getElementById('name-input-' + postId);
        const commentInput = document.getElementById('comment-input-' + postId);
        const commentsList = document.getElementById('comments-list-' + postId);

        const name = nameInput.value;
        const comment = commentInput.value;

        if (name && comment) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${name}</strong>: ${comment}`;
            commentsList.appendChild(li);
            nameInput.value = '';
            commentInput.value = '';
        }
    });
});

// Partage générique du blog
document.getElementById('share-btn').addEventListener('click', function () {
    if (navigator.share) {
        navigator.share({
            title: 'Mon Blog',
            text: 'Découvrez mon blog avec des articles intéressants.',
            url: window.location.href,
        }).catch(console.error);
    } else {
        alert('Le partage n\'est pas supporté sur ce navigateur.');
    }
});
