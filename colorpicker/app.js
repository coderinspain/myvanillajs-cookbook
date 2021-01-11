const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', function() {
    // get ramdom number between 0 - 3
    const ramdomNumber = getRandomNumber();
    console.log(ramdomNumber);

    document.body.style.backgroundColor = colors[ramdomNumber];
    color.textContent = colors[ramdomNumber];
});

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}
