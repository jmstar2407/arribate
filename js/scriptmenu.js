const box = document.getElementById('boxjm1');
const openBoxBtn = document.getElementById('openBoxJmBtn'); 
const closeBox = document.querySelector('.close2');
const lines = document.querySelectorAll('.line');

openBoxBtn.onclick = () => {
    if (box.style.display === 'flex') { 
        box.style.animation = 'background-out-boxjm1 0.3s forwards';
        box.querySelector('.boxjm1-content').style.animation = 'fadeOut 0.3s forwards';

        // Quita la clase 'active' de inmediato
        lines.forEach(line => line.classList.remove('active')); 

        setTimeout(() => {
            box.style.display = 'none';
            box.style.animation = '';
            box.querySelector('.boxjm1-content').style.animation = '';
        }, 300); 
    } else { 
        box.style.display = 'flex';
        box.style.animation = 'background-in-boxjm1 0.3s forwards';
        box.querySelector('.boxjm1-content').style.animation = 'fadeIn 0.3s forwards';
        lines.forEach(line => line.classList.add('active'));
    }
};

closeBox.onclick = () => {
    box.style.animation = 'background-out-boxjm1 0.3s forwards';
    box.querySelector('.boxjm1-content').style.animation = 'fadeOut 0.3s forwards';

    // Quita la clase 'active' de inmediato
    lines.forEach(line => line.classList.remove('active')); 

    setTimeout(() => {
        box.style.display = 'none';
        box.style.animation = '';
        box.querySelector('.boxjm1-content').style.animation = '';
    }, 300); 
};












