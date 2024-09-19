// Mengambil nilai history dari elemen
function getHistory() {
    return document.getElementById('history-value').innerText;
}

// Menampilkan nilai history ke elemen
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

// Mengambil nilai output dari elemen
function getOutput() {
    return document.getElementById("output-value").innerText;
}

// Menampilkan nilai output ke elemen dengan format angka
function printOutput(num) {
    if (num === "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

// Memformat angka dengan koma sebagai pemisah ribuan
function getFormattedNumber(num) {
    if (num === "-") {
        return "";
    }
    let n = Number(num);
    return n.toLocaleString("en");
}

// Menghapus format angka (menghilangkan koma)
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

// Event listener untuk tombol operator
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        var output = getOutput();
        var history = getHistory();

        if (this.id === "clear") {
            // Menghapus history dan output
            printHistory("");
            printOutput("");
        } else if (this.id === "backspace") {
            // Menghapus satu karakter terakhir dari output
            output = reverseNumberFormat(output).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            // Menangani operasi selain clear dan backspace
            if (output === "" && history !== "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }

            if (output !== "" || history !== "") {
                output = output === "" ? output : reverseNumberFormat(output);
                history = history + output;

                if (this.id === "=") {
                    try {
                        // Evaluasi ekspresi dan tampilkan hasil
                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    } catch (e) {
                        printOutput("Error");
                    }
                } else if (this.id === "%") {
                    // Menghitung persentase
                    var n = reverseNumberFormat(output);
                    var percent = n / 100;
                    printOutput(percent.toFixed(4));
                } else {
                    // Menambahkan operator ke history
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

// Event listener untuk tombol angka
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = getOutput();
        if (output !== "Error") {
            output = reverseNumberFormat(output);
            if (!isNaN(output)) {
                output = output + this.id;
                printOutput(output);
            }
        }
    });
}

// Event listener untuk pengubahan tema (gelap/terang)
let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
