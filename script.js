let contestants = [];
let comparisons = [];
let results = {};
let index = 0;

function loadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById("contestantInput").value = event.target.result;
    };
    reader.readAsText(file);
}

function startSorting() {
    contestants = sanitizeInput(document.getElementById("contestantInput").value);
    if (contestants.length < 2) { alert("Enter at least two contestants."); return; }
    
    showSortingPage();
    results = Object.fromEntries(contestants.map(c => [c, 0]));
    comparisons = generatePairs(contestants);
    index = 0;
    showNextComparison();
}

function sanitizeInput(input) {
    return input.trim().split("\n").map(s => s.trim()).filter(Boolean);
}

function showSortingPage() {
    document.getElementById("contestantInput").classList.add("hidden");
    document.getElementById("fileInput").classList.add("hidden");
    document.getElementById("loadButton").classList.add("hidden");
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("sorting").classList.remove("hidden");
    document.getElementById("restartButton").classList.remove("hidden");
}

function generatePairs(arr) {
    let pairs = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs.sort(() => Math.random() - 0.5);
}

function showNextComparison() {
    if (index >= comparisons.length) {
        showResults();
        return;
    }
    let [a, b] = comparisons[index];
    document.getElementById("option1").innerText = a;
    document.getElementById("option2").innerText = b;
}

function choose(choice) {
    let [a, b] = comparisons[index];
    results[choice === 1 ? a : b]++;
    index++;
    showNextComparison();
}

function showResults() {
    document.getElementById("sorting").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    let sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    let rankingList = document.getElementById("ranking");
    rankingList.innerHTML = sorted.map(([name], i) => `<li>${i + 1}. ${name}</li>`).join('');
}

function resetSorter() {
    document.getElementById("contestantInput").classList.remove("hidden");
    document.getElementById("fileInput").classList.remove("hidden");
    document.getElementById("loadButton").classList.remove("hidden");
    document.getElementById("startButton").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("restartButton").classList.add("hidden");
    document.getElementById("contestantInput").value = "";
}

