const filterButtons = document.querySelectorAll(".filter-btn");
const images = document.querySelectorAll(".image");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".filter-btn.active").classList.remove("active");

        button.classList.add("active");

        const filter = button.dataset.filter;

        images.forEach(image => {

            if (filter === "all" || image.classList.contains(filter)) {

                image.style.display = "block";

            } else {

                image.style.display = "none";

            }

        });

    });

});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");

    }

});

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";

}

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const deleteBtn = document.getElementById("deleteImage");

const current = document.getElementById("current");
const total = document.getElementById("total");

let currentIndex = 0;

total.textContent = galleryImages.length;

function showImage(index){

    lightboxImg.src = galleryImages[index].src;

    current.textContent = index + 1;

}

galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        lightbox.style.display = "flex";

        currentIndex = index;

        showImage(currentIndex);

    });

});

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= galleryImages.length){

        currentIndex = 0;

    }

    showImage(currentIndex);

});

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = galleryImages.length - 1;

    }

    showImage(currentIndex);

});

closeBtn.addEventListener("click",()=>{

    lightbox.style.display = "none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display === "flex"){

        if(e.key === "ArrowRight"){

            nextBtn.click();

        }

        if(e.key === "ArrowLeft"){

            prevBtn.click();

        }

        if(e.key === "Escape"){

            lightbox.style.display = "none";

        }

    }

}
);
const imageUpload = document.getElementById("imageUpload");
const gallery = document.querySelector(".gallery");

imageUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const imageDiv = document.createElement("div");
        imageDiv.className = "image";

        const img = document.createElement("img");

        img.src = e.target.result;
        img.alt = "Uploaded Image";
        img.loading = "lazy";

        imageDiv.appendChild(img);
        gallery.appendChild(imageDiv);

        total.textContent = gallery.querySelectorAll("img").length;

        const allImages = gallery.querySelectorAll("img");

        img.addEventListener("click", () => {

            currentIndex = allImages.length - 1;

            lightbox.style.display = "flex";

            lightboxImg.src = img.src;

            current.textContent = currentIndex + 1;

        });

    };

    reader.readAsDataURL(file);

});
deleteBtn.addEventListener("click", () => {

    if(confirm("Are you sure you want to delete this image?")){

        document.querySelectorAll(".gallery .image")[currentIndex].remove();

        lightbox.style.display = "none";

        total.textContent = document.querySelectorAll(".gallery img").length;

    }

});