document.addEventListener('DOMContentLoaded', () => {
    // Fonction d'accordéon
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            title.classList.toggle('active');
            const content = title.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Barre de progression de lecture
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Fonction de like et dislike avec stockage local
    const likeButtons = document.querySelectorAll('.like-btn');
    const dislikeButtons = document.querySelectorAll('.dislike-btn');

    likeButtons.forEach(button => {
        const articleId = button.getAttribute('data-id');
        const dislikeButton = document.querySelector(`.dislike-btn[data-id="${articleId}"]`);
        const likeCount = button.querySelector('.like-count');
        const dislikeCount = dislikeButton.querySelector('.dislike-count');
        
        let storedLike = localStorage.getItem(`like-count-${articleId}`);
        let storedDislike = localStorage.getItem(`dislike-count-${articleId}`);
        
        if (storedLike) likeCount.textContent = storedLike;
        if (storedDislike) dislikeCount.textContent = storedDislike;

        button.addEventListener('click', () => {
            let count = parseInt(likeCount.textContent);
            let dislikeCountValue = parseInt(dislikeCount.textContent);

            if (button.classList.contains('active')) {
                count--;
                button.classList.remove('active');
            } else {
                count++;
                button.classList.add('active');
                if (dislikeButton.classList.contains('active')) {
                    dislikeCountValue--;
                    dislikeButton.classList.remove('active');
                }
            }

            likeCount.textContent = count;
            localStorage.setItem(`like-count-${articleId}`, count);
            dislikeCount.textContent = dislikeCountValue;
            localStorage.setItem(`dislike-count-${articleId}`, dislikeCountValue);
        });

        dislikeButton.addEventListener('click', () => {
            let count = parseInt(dislikeCount.textContent);
            let likeCountValue = parseInt(likeCount.textContent);

            if (dislikeButton.classList.contains('active')) {
                count--;
                dislikeButton.classList.remove('active');
            } else {
                count++;
                dislikeButton.classList.add('active');
                if (button.classList.contains('active')) {
                    likeCountValue--;
                    button.classList.remove('active');
                }
            }

            dislikeCount.textContent = count;
            localStorage.setItem(`dislike-count-${articleId}`, count);
            likeCount.textContent = likeCountValue;
            localStorage.setItem(`like-count-${articleId}`, likeCountValue);
        });
    });
});
