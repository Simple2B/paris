// ticket.ts
document.addEventListener('DOMContentLoaded', function() {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]');
    const floorNamePlaceholder = document.getElementById('floorNamePlaceholder');
    const timePlaceholder = document.getElementById('timePlaceholder');    
        
    modalToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticket = button.getAttribute('data-target');
            const ticketData = JSON.parse(ticket);
            const [hours, minutes] = ticketData.clock.split(':');
            floorNamePlaceholder.textContent = ticketData.floor;
            timePlaceholder.textContent = `${hours}:${minutes}`;
        });
    });
});

