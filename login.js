const studentForm = document.getElementById('studentForm');
const resultForm = document.getElementById('resultForm');
const searchRollNo = document.getElementById('search_roll_no');
const resultList = document.getElementById('resultList');
const resultChart = document.getElementById('resultChart').getContext('2d');

let studentData = [];

studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const rollNo = document.getElementById('roll_no').value;
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const marks = parseFloat(document.getElementById('marks').value);

    // Check if student already exists
    const student = studentData.find(student => student.rollNo === rollNo);
    if (student) {
        student.results.push({ subject, marks });
    } else {
        studentData.push({
            rollNo,
            name,
            results: [{ subject, marks }]
        });
    }

    studentForm.reset();
});

function getGrade(marks) {
    if (marks >= 90) return 'A';
    if (marks >= 75) return 'B';
    if (marks >= 50) return 'C';
    return 'F';
}

function getStudentResults() {
    const rollNo = searchRollNo.value;
    const student = studentData.find(student => student.rollNo === rollNo);
    
    if (student) {
        // Display results with grades
        resultList.innerHTML = '';
        student.results.forEach(result => {
            const grade = getGrade(result.marks);
            const li = document.createElement('li');
            li.innerHTML = `${student.name} - ${result.subject}: ${result.marks} marks (Grade: ${grade})`;
            resultList.appendChild(li);
        });

        // Generate Pie Chart
        const labels = student.results.map(result => result.subject);
        const data = student.results.map(result => result.marks);

        const chart = new Chart(resultChart, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' marks';
                            }
                        }
                    }
                }
            }
        });
    } else {
        alert('Student not found!');
    }
}
