(() => {
    const hideAllCss = document.getElementById("hide-all-css");
    hideAllCss.remove();
    const sideWidget = document.querySelectorAll(".sticky-area .widget");
    sideWidget.forEach(element => {
        element.classList.add("animate__animated", "animate__fadeIn");
    });
    const animateArticle = () => {
        const articleCard = document.querySelectorAll("article");
        articleCard.forEach(element => {
            if (element.classList.contains("kratos-hentry"))
                element.classList.add("animate__animated", "animate__zoomIn");
            else
                element.classList.add("animate__animated", "animate__fadeIn");
        });
    };
    window.addEventListener('pjax:complete', animateArticle);
    animateArticle();
})();