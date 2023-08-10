// ticket.ts
document.addEventListener('DOMContentLoaded', function() {
    const modalToggleButtons = document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]');
    const floorNamePlaceholder = document.getElementById('floorNamePlaceholder');
    const timePlaceholder = document.getElementById('timePlaceholder');    
    const timeHiddenInput = document.getElementById('timeHiddenInput') as HTMLInputElement;
    const dateHiddenInput = document.getElementById('dateHiddenInput') as HTMLInputElement;
        
    modalToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticket = button.getAttribute('data-target');
            const dateId = button.getAttribute('data-target-date-id');
            const ticketData = JSON.parse(ticket);
            const [hours, minutes] = ticketData.clock.split(':');
            floorNamePlaceholder.textContent = ticketData.floor;
            timePlaceholder.textContent = `${hours}:${minutes}`;
            timeHiddenInput.value = ticketData.id;
            dateHiddenInput.value = dateId;
        });
    });
});

