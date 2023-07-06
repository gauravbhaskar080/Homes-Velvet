const prevButton = document.querySelector('.display-left');
        const nextButton = document.querySelector('.display-right');
        const smallImagesContainer = document.querySelector('.smlpic');
        const mainImage = document.querySelector('.dispbig');
        const smallImages = document.querySelectorAll('.smlpic img');
        let currentImageIndex = 0;
        prevButton.addEventListener('click', () => {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = smallImages.length - 1;
            }
            mainImage.src = smallImages[currentImageIndex].src;
        });

        nextButton.addEventListener('click', () => {
            currentImageIndex++;
            if (currentImageIndex >= smallImages.length) {
                currentImageIndex = 0;
            }
            mainImage.src = smallImages[currentImageIndex].src;
        });
        smallImages.forEach((smallImage, index) => {
            smallImage.addEventListener('click', () => {
                currentImageIndex = index;
                mainImage.src = smallImage.src;
            });
        });