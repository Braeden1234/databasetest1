document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dataInput = document.getElementById('dataInput').value;
    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dataInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('dataList').innerHTML += `<li>${data.data}</li>`;
        document.getElementById('dataInput').value = '';
    });
});
