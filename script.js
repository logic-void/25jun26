const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const startBtn = document.querySelector("#start-screen button");
const startGameBtn = document.querySelector(".instructions button");
const starContainer = document.querySelector(".star-container");
const updatesDiv = document.querySelector(".updates");
const collectedTextDiv = document.querySelector(".collected-text");

const totalStars = 7;
const STAR_SIZE = 50; // must match .star's width/height in style.css
let nextNeeded = 1; // the lowest-numbered star left to collect
let collectedCount = 0;
let animationId = null;

// Edit these lines to whatever you want each ichtar to unlock 🥺🎀
const starMessages = {
    1: "look phol 2nd ichtar🥺",
    2: "look phol 3rd ichtar🥺",
    3: "look phol 4th ichtar🥺",
    4: "look phol 5th ichtar🥺",
    5: "look phol 6th ichtar🥺",
    6: "look phol 7th ichtar🥺"
};

startBtn.addEventListener("click", e => {
    Array.from(document.querySelector("#start-screen").children).forEach(
        elem => {
            elem.classList.add("r");
        }
    );
    setTimeout(startIntruc, 1500);
});
startGameBtn.addEventListener("click", startGame);

function startIntruc() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
}

function initStars() {
    const containerWidth = starContainer.clientWidth;
    const containerHeight = starContainer.clientHeight;

    document.querySelectorAll(".star").forEach(star => {
        const size = STAR_SIZE;

        // random starting position inside the black screen
        const startX = Math.random() * Math.max(containerWidth - size, 0);
        const startY = Math.random() * Math.max(containerHeight - size, 0);

        // random x/y velocity, random direction, min speed so a star never goes still
        const velx =
            (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1);
        const vely =
            (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1);

        star.dataset.x = startX;
        star.dataset.y = startY;
        star.dataset.velx = velx;
        star.dataset.vely = vely;

        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        star.addEventListener("click", () => handleStarClick(star));
    });

    startStars();
}

function startStars() {
    function animate() {
        const containerWidth = starContainer.clientWidth;
        const containerHeight = starContainer.clientHeight;

        document.querySelectorAll(".star").forEach(star => {
            let x = parseFloat(star.dataset.x);
            let y = parseFloat(star.dataset.y);
            let velx = parseFloat(star.dataset.velx);
            let vely = parseFloat(star.dataset.vely);
            const size = STAR_SIZE;

            x += velx;
            y += vely;

            // bounce off the edges of the black screen
            if (x <= 0) {
                x = 0;
                velx = Math.abs(velx);
            } else if (x + size >= containerWidth) {
                x = containerWidth - size;
                velx = -Math.abs(velx);
            }

            if (y <= 0) {
                y = 0;
                vely = Math.abs(vely);
            } else if (y + size >= containerHeight) {
                y = containerHeight - size;
                vely = -Math.abs(vely);
            }

            star.dataset.x = x;
            star.dataset.y = y;
            star.dataset.velx = velx;
            star.dataset.vely = vely;

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
        });

        animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
}

function handleStarClick(star) {
    if (star.classList.contains("collected")) return;

    const number = parseInt(star.dataset.number, 10);

    if (number === nextNeeded) {
        // correct star (lowest number left) -> collect & remove it
        star.classList.add("collected");
        setTimeout(() => star.remove(), 400);

        collectedCount++;
        updatesDiv.textContent = starMessages[number] || `bhoww saare hogye🥹`;
        collectedTextDiv.textContent = `${collectedCount}/${totalStars} done hogye maaltin🥺🎀`;
        nextNeeded++;

        if (collectedCount === totalStars) {
            cancelAnimationFrame(animationId);
            setTimeout(showEndScreen, 1000);
        }
    } else {
        // wrong star clicked -> just update the updates div, nothing is removed
        updatesDiv.textContent = "Galar ichtar tha vo maaltin🥺😞";
    }
}

function showEndScreen() {
    document.querySelector(".actual-game").classList.add("fade-out-game");
    setTimeout(() => {
        gameScreen.style.display = "none";
        endScreen.style.display = "flex";
        endScreen.innerHTML = `
            <p>Konsi lines chahiye? kuch nhi h idhar🐐☝🏻</p>
            <p>bait billa leke aaya vo lines🥺 mwahh🥺💋💋</p>
            <p>mah own words btw🥺😞(hasna mat😞💔)</p>
        `;
        setTimeout(() => {
            endScreen.innerHTML = `<ul class="last-lines">
              <li class="last-line">Dont know how to ichtart so me gonna do it bithout any intro chollyy🐐💔</li>
              <li class="last-line">Ai dont think she realizes how mash she means to me🥺☝🏻</li>
              <li class="last-line">How often her name bisit mah thoughts🥹🎀</li>
              <li class="last-line">How mah heart grows softer beneber she appears🫠</li>
              <li class="last-line">The bay she cares.. the bay she lobs.. the bay she borries about the smallest things🥹🙌🏻 those things neber eber go unnoticed🐐🎀</li>
              <li class="last-line">Sometimes ai just sit and think bhat did ai eben do to deserbe a soul like hers..🫠</li>
              <li class="last-line">For eberyday, mah heart phinds nye nye bahane to be gratephul, bahane to make her smile, bahane to lob her more than this damn heart did yesterday😚🙌🏻</li>
              <li class="last-line">And iph there is ban thing this billa is certain oph, it's that meeting her bas genuinely the kindest thing mah life mah luck has eber done phol me... and i mean it🥺👉🏻👈🏻</li>
              <p>And.. at the end, ai lob yu🫠</p>
            </ul>`;
        }, 6000);
    }, 800);
}

function startGame() {
    document.querySelector(".instructions").classList.add("slide-out");
    document.querySelector(".actual-game").classList.add("slide-in");
    initStars();
}
