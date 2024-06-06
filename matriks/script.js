function showOperation(operation) {
    document.getElementById('matrix-input').style.display = 'block';
    document.getElementById('matrices-container').innerHTML = '';
    document.getElementById('result-container').innerHTML = '';
    currentOperation = operation;
}

function generateMatrices() {
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;

    const matricesContainer = document.getElementById('matrices-container');
    matricesContainer.innerHTML = '';

    for (let i = 0; i < 2; i++) {
        const matrix = document.createElement('div');
        matrix.className = 'matrix';
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `matrix${i+1}_r${r}_c${c}`;
                matrix.appendChild(input);
            }
            matrix.appendChild(document.createElement('br'));
        }
        matricesContainer.appendChild(matrix);
    }

    const button = document.createElement('button');
    button.innerText = 'Hitung';
    button.onclick = calculateResult;
    matricesContainer.appendChild(button);
}

function calculateResult() {
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;
    const resultContainer = document.getElementById('result-container');

    const matrix1 = [];
    const matrix2 = [];

    for (let r = 0; r < rows; r++) {
        const row1 = [];
        const row2 = [];
        for (let c = 0; c < cols; c++) {
            row1.push(Number(document.getElementById(`matrix1_r${r}_c${c}`).value));
            row2.push(Number(document.getElementById(`matrix2_r${r}_c${c}`).value));
        }
        matrix1.push(row1);
        matrix2.push(row2);
    }

    let result = [];
    if (currentOperation === 'add' || currentOperation === 'subtract') {
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                if (currentOperation === 'add') {
                    row.push(matrix1[r][c] + matrix2[r][c]);
                } else {
                    row.push(matrix1[r][c] - matrix2[r][c]);
                }
            }
            result.push(row);
        }
    } else if (currentOperation === 'multiply') {
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                let sum = 0;
                for (let k = 0; k < cols; k++) {
                    sum += matrix1[r][k] * matrix2[k][c];
                }
                row.push(sum);
            }
            result.push(row);
        }
    }

    resultContainer.innerHTML = 'Hasil:<br>';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            resultContainer.innerHTML += result[r][c] + ' ';
        }
        resultContainer.innerHTML += '<br>';
    }
}

let currentOperation = '';
