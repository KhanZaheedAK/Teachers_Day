// =========================
// ELEMENTS
// =========================

const openGiftBtn = document.getElementById("openGiftBtn");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");

const giftLid = document.querySelector(".gift-lid");
const giftBox = document.querySelector(".gift-box");

const nextShayariBtn = document.getElementById("nextShayariBtn");
const bgMusic = document.getElementById("bgMusic");


// =========================
// PAGE TRANSITION
// =========================

function showPage(page) {

    page.style.display = "flex";

    // Start slightly zoomed out
    page.style.opacity = "0";
    page.style.visibility = "visible";
    page.style.transform =
        "scale(1.04) translateY(15px)";

    // Force browser to register starting state
    void page.offsetWidth;

    // Cinematic reveal
    requestAnimationFrame(() => {

        page.style.transition =
            "opacity 1s ease, transform 1.2s cubic-bezier(.22,1,.36,1)";

        page.style.opacity = "1";
        page.style.transform =
            "scale(1) translateY(0)";

    });

    // Start particles immediately
    fallingParticles(page, 35);

    // Small center burst
    setTimeout(() => {

        particleBurst(
            page,
            window.innerWidth / 2,
            window.innerHeight / 2,
            25
        );

    }, 250);
}


// =========================
// FALLING PARTICLES
// =========================

function fallingParticles(page, amount = 30) {

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "falling-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        particle.style.animationDelay =
            Math.random() * 1.5 + "s";

        page.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 8500);
    }
}


// =========================
// PARTICLE BURST
// =========================

function particleBurst(page, x, y, amount = 50) {

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 200;

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        particle.style.animation =
            "burst 1.2s ease-out forwards";

        page.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 1300);
    }
}


// =========================
// PAGE 1 → PAGE 2
// =========================

openGiftBtn.addEventListener("click", function () {

    // Start background music
    bgMusic.volume = 0;

bgMusic.play().then(() => {

    let volume = 0;

    const fadeIn = setInterval(() => {

        volume += 0.01;

        bgMusic.volume = volume;

        if (volume >= 0.50) {
            clearInterval(fadeIn);
        }

    }, 100);

});
    // Stop floating animation
    giftBox.style.animation = "none";

    // =========================
    // GIFT BURST
    // =========================

    const box =
        giftBox.getBoundingClientRect();

    particleBurst(
        page1,
        box.left + box.width / 2,
        box.top + box.height / 2,
        80
    );


    // =========================
    // OPEN GIFT
    // =========================

    giftLid.style.transition =
        "transform 1s cubic-bezier(.22,1,.36,1)";

    giftLid.style.transform =
        "translateY(-120px) rotate(-8deg)";


    // Hide button
    openGiftBtn.style.transition =
        "opacity .5s ease";

    openGiftBtn.style.opacity = "0";
    openGiftBtn.style.pointerEvents =
        "none";


    // =========================
    // PAGE 2
    // =========================

    setTimeout(() => {

        page1.style.opacity = "0";

        setTimeout(() => {

            page1.style.display = "none";

            showPage(page2);

        }, 450);

    }, 900);


    // =========================
    // PAGE 3
    // =========================

    setTimeout(() => {

        page2.style.opacity = "0";
        page2.style.transform =
            "scale(.97) translateY(-10px)";

        setTimeout(() => {

            page2.style.display = "none";

            showPage(page3);

        }, 500);

    }, 7000);

});


// =========================
// SHAYARIS
// =========================

const shayaris = [

    {
        number: "SHAYARI 01",

        text: `
            Har ilm ke peeche ek Ustaad ka haath hai,<br>
            Har kamyaabi ke peeche unka saath hai.<br>
            Hum chahe jitna bhi aage nikal jaayein,<br>
            Dil mein hamesha unka hi maqam khaas hai.
        `
    },

    {
        number: "SHAYARI 02",

        text: `
            Kuch log sirf kitaabein padhaate hain,<br>
            Aur kuch zindagi ka matlab samjhaate hain.<br>
            Kuch log waqt ke saath bhool jaate hain,<br>
            Magar Ustaad dil mein hamesha reh jaate hain.
        `
    },

    {
        number: "SHAYARI 03",

        text: `
            Kal jab hum apni manzil tak jaayenge,<br>
            Aapke diye sabaq yaad aayenge.<br>
            Duniya humein kisi bhi naam se bulaaye,<br>
            Hum hamesha aapko apna Ustaad keh paayenge.
        `
    }

];

let currentShayari = 0;


// =========================
// SHAYARI NEXT BUTTON
// =========================

nextShayariBtn.addEventListener("click", function () {

    currentShayari++;


    // =========================
    // NEXT SHAYARI
    // =========================

    if (currentShayari < shayaris.length) {

        const text =
            document.getElementById("shayariText");

        const number =
            document.getElementById("shayariNumber");


        // Fade out
        text.style.opacity = "0";
        text.style.transform =
            "translateY(15px) scale(.98)";


        setTimeout(() => {

            number.textContent =
                shayaris[currentShayari].number;

            text.innerHTML =
                shayaris[currentShayari].text;


            // Fade in
            text.style.opacity = "1";
            text.style.transform =
                "translateY(0) scale(1)";


            // Small golden burst
            particleBurst(
                page3,
                window.innerWidth / 2,
                window.innerHeight / 2,
                20
            );

        }, 400);

    }


    // =========================
    // SHAYARI 3 → FINAL
    // =========================

    else {

        nextShayariBtn.textContent =
            "CONTINUE →";


        nextShayariBtn.onclick =
            function () {

                // Fade Page 3 out
                page3.style.opacity = "0";

                page3.style.transform =
                    "scale(.96) translateY(-15px)";


                setTimeout(() => {

                    page3.style.display =
                        "none";


                    // Show final page
                    showPage(page4);


                    // =========================
                    // FINAL CELEBRATION
                    // =========================

                    setTimeout(() => {

                        particleBurst(
                            page4,
                            window.innerWidth / 2,
                            window.innerHeight / 2,
                            70
                        );

                    }, 500);

                }, 600);

            };

    }

});