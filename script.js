const tasks = [
    { question: "Die Jacke passt ___ gut.", answer: "dir / Ihnen" },
    { question: "Wie geht es ___?", answer: "dir / Ihnen" },
    { question: "Passen ___ die Schuhe?", answer: "dir / Ihnen" },
    { question: "Ich möchte ___ gern etwas erzählen.", answer: "dir / Ihnen" },
    { question: "Gehören die Schlüssel ___?", answer: "dir / Ihnen" },
    { question: "Ich möchte ___ einladen.", answer: "dich / Sie" },
    { question: "Am Sonntag kann ich ___ besuchen.", answer: "dich / Sie" },
    { question: "Ich gebe ___ Bescheid.", answer: "dir / Ihnen" },
    { question: "Ich rufe ___ morgen an.", answer: "dich / Sie" },
    { question: "Kann ich ___ etwas fragen?", answer: "dich / Sie" },
    { question: "Gefallen ___ die Schuhe?", answer: "dir / Ihnen" },
    { question: "Ich habe ___ nicht gesehen.", answer: "dich / Sie" },
    { question: "Ich habe ___ nicht verstanden.", answer: "dich / Sie" },
    { question: "Ich finde ___ total nett.", answer: "dich / Sie" },
    { question: "Ich kenne ___, oder?", answer: "dich / Sie" },
    { question: "Soll ich ___ helfen?", answer: "dir / Ihnen" },
    { question: "Hat es ___ geschmeckt?", answer: "dir / Ihnen" },
    { question: "Wie hat ___ der Film gefallen?", answer: "dir / Ihnen" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);