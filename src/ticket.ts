// ticket.ts

document.addEventListener('DOMContentLoaded', function() {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]');
    const floorNamePlaceholder = document.getElementById('floorNamePlaceholder');
    
    modalToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const floorName = button.getAttribute('data-floor-name');
            floorNamePlaceholder.textContent = floorName; 
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]');
    const timePlaceholder = document.getElementById('timePlaceholder');
    
    modalToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const time = button.getAttribute('date-time');
            timePlaceholder.textContent = time;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]');
    const datePlaceholder = document.getElementById('datePlaceholder');
    
    modalToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const date = button.getAttribute('data-date');
            datePlaceholder.textContent = date;
        });
    });
});
