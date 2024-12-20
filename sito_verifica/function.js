function goToPage(page) {
    window.location.href = page;
}

// Caricamento domande aperte
const openQuestions = [
    "Descrivi il tuo giorno ideale.",
    "Qual è la tua opinione su un argomento attuale?",
    "Spiega il significato di un termine a tua scelta."
];
let currentOpenIndex = 0;

document.getElementById('start')?.addEventListener('click', () => {
    document.getElementById('domande').innerHTML = `
            <div class="mb-3">
                <label>${openQuestions[currentOpenIndex]}</label>
                <textarea class="form-control"></textarea>
            </div>
        `;
        currentOpenIndex++;
})

document.getElementById('next')?.addEventListener('click', () => {
    if (currentOpenIndex < openQuestions.length) {
        document.getElementById('domande').innerHTML = `
            <div class="mb-3">
                <label>${openQuestions[currentOpenIndex]}</label>
                <textarea class="form-control"></textarea>
            </div>
        `;
        currentOpenIndex++;
    } else {
        alert("Hai completato tutte le domande aperte!");
    }
});

// Caricamento domande a scelta multipla
const multipleChoiceQuestions = [
    {
        question: "Qual è la capitale d'Italia?",
        options: ["Roma", "Milano", "Napoli", "Torino"],
        answer: 0
    },
    {
        question: "Qual è il risultato di 5+3?",
        options: ["5", "8", "10", "15"],
        answer: 1
    },
    {
        question: "Quando è finita la prima guerra mondiale?",
        options: ["1852", "1536", "1918", "1945"],
        answer: 2
    },
    {
        question: "Quanti mondiali di calcio ha vinto la nazionale italiana?",
        options: ["3", "2", "6", "4"],
        answer: 3
    },
    {
        question: "Qual'è l'attuale presidente degli U.S.A.?",
        options: ["B.Obama", "G.Bush", "J.Biden", "D.Trump"],
        answer: 2
    }
];
let currentMultipleIndex = 0;

// Array per salvare le risposte dell'utente
let userAnswers = [];

document.getElementById('start-multipla')?.addEventListener('click', () => {
    currentMultipleIndex++;
        const q = multipleChoiceQuestions[currentMultipleIndex];
        const optionsHtml = q.options.map((opt, i) => `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="answer" id="option${i}" value="${i}">
                <label class="form-check-label" for="option${i}">${opt}</label>
            </div>
        `).join('');
        document.getElementById('domande-multipla').innerHTML = `
                    <p>${q.question}</p>
                    ${optionsHtml}
                `;
    })

// Gestore per le domande a scelta multipla
document.getElementById('next-multipla')?.addEventListener('click', () => {
    if (currentMultipleIndex < multipleChoiceQuestions.length) {
        // Recupera la risposta selezionata
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            userAnswers.push(userAnswer);

            // Carica la prossima domanda
            currentMultipleIndex++;
            if (currentMultipleIndex < multipleChoiceQuestions.length) {
                const q = multipleChoiceQuestions[currentMultipleIndex];
                const optionsHtml = q.options.map((opt, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="answer" id="option${i}" value="${i}">
                        <label class="form-check-label" for="option${i}">${opt}</label>
                    </div>
                `).join('');

                document.getElementById('domande-multipla').innerHTML = `
                    <p>${q.question}</p>
                    ${optionsHtml}
                `;
            } else {
                // Calcola il punteggio
                const score = userAnswers.reduce((acc, answer, index) => {
                    return acc + (answer === multipleChoiceQuestions[index].answer ? 1 : 0);
                }, 0);

                // Mostra il punteggio
                alert(`Hai completato il quiz! Il tuo punteggio è ${score}/${multipleChoiceQuestions.length}.`);
            }
        } else {
            alert("Seleziona una risposta prima di procedere!");
        }
    }
});
