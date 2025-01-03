document.getElementById('onButton').addEventListener('click', () => {
  fetch('/led/on')
    .then(response => response.text())
    .then(data => alert(data))
    .catch(err => console.error('Error:', err));
});

document.getElementById('offButton').addEventListener('click', () => {
  fetch('/led/off')
    .then(response => response.text())
    .then(data => alert(data))
    .catch(err => console.error('Error:', err));
});
