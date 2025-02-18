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
    if (contestants.length < 2) { alert("Enter at least two contestants."); return; }
    
    document.getElementById("contestantInput").style.display = "none";
    document.getElementById("fileInput").style.display = "none";
    document.getElementById("loadButton").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("sorting").style.display = "block";
    document.getElementById("restartButton").style.display = "block"; // Show restart button immediately
    
    results = Object.fromEntries(contestants.map(c => [c, 0]));
    comparisons = generatePairs(contestants);
    index = 0;
    showNextComparison();
}

function resetSorter() {
    document.getElementById("contestantInput").style.display = "block";
    document.getElementById("fileInput").style.display = "block";
    document.getElementById("loadButton").style.display = "block";
    document.getElementById("startButton").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("restartButton").style.display = "none"; // Hide restart button
    document.getElementById("contestantInput").value = "";
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
    console.log("Showing comparison:", a, b); // Debugging line
    document.getElementById("option1").innerText = a;
    document.getElementById("option2").innerText = b;
}

function choose(choice) {
    console.log("Chosen option:", choice); // Debugging line
    let [a, b] = comparisons[index];
    results[choice === 1 ? a : b]++;
    index++;
    showNextComparison();
}

