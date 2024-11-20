let sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function disableScroll() {
    const html = document.documentElement;
    html.style.overflow = 'hidden';
}

function enableScroll() {
    const html = document.documentElement;
    html.style.overflow = '';
}

window.onload = () => {
    let images = Array.from(document.querySelectorAll(".imagen-escultura"));
    let cartelExposicion = document.getElementById("imagen-exposicion");
    images.push(cartelExposicion);
    for (let image of images) {
        image.addEventListener("click", async () => {
            let overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = "100vw";
            overlay.style.height = "100vh";
            overlay.style.opacity = "0";
            overlay.style.zIndex = "1000";
            overlay.style.background = "rgba(0, 0, 0, 0.5)";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.transition = "all 0.3s ease";

            let im = document.createElement("img");
            im.setAttribute("src", image.getAttribute("src"));
            im.style.width = "60vmin";
            im.style.height = "90vmin";
            im.style.userSelect = "none";
            overlay.appendChild(im);

            let main = document.getElementsByTagName("main")[0];
            main.appendChild(overlay);
            await sleep(1);
            overlay.style.opacity = 1;
            disableScroll();

            // Cierra el overlay solo si se hace clic fuera de la imagen
            overlay.addEventListener("click", async (event) => {
                if (event.target === overlay) { // Verifica que el clic fue en el overlay
                    overlay.style.background = "transparent";
                    im.style.display = "none";
                    await sleep(300);
                    main.removeChild(overlay);
                    enableScroll();
                }
            });
        });
    }
};
