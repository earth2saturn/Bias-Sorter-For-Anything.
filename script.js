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
    contestants = document.getElementById("contestantInput").value.trim().split("\n").map(s => s.trim()).filter(Boolean);
    if (contestants.length < 2) { alert("Enter at least two items!"); return; }
    
    document.getElementById("contestantInput").style.display = "none";
    document.getElementById("fileInput").style.display = "none";
    document.querySelector("button").style.display = "none";
    document.getElementById("sorting").style.display = "block";
    
    results = Object.fromEntries(contestants.map(c => [c, 0]));
    comparisons = generatePairs(contestants);
    index = 0;
    showNextComparison();
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
    document.getElementById("sorting").style.display = "none";
    document.getElementById("result").style.display = "block";
    let sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    let rankingList = document.getElementById("ranking");
    rankingList.innerHTML = sorted.map(([name], i) => `<li>${i + 1}. ${name}</li>`).join('');
}
