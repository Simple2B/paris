/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/ticket.ts ***!
  \***********************/
// ticket.ts
document.addEventListener('DOMContentLoaded', function () {
    var modalToggleButtons = document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]');
    var floorNamePlaceholder = document.getElementById('floorNamePlaceholder');
    var timePlaceholder = document.getElementById('timePlaceholder');
    var timeHiddenInput = document.getElementById('timeHiddenInput');
    var dateHiddenInput = document.getElementById('dateHiddenInput');
    modalToggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var ticket = button.getAttribute('data-target');
            var dateId = button.getAttribute('data-target-date-id');
            var ticketData = JSON.parse(ticket);
            var _a = ticketData.clock.split(':'), hours = _a[0], minutes = _a[1];
            floorNamePlaceholder.textContent = ticketData.floor;
            timePlaceholder.textContent = "".concat(hours, ":").concat(minutes);
            timeHiddenInput.value = ticketData.id;
            dateHiddenInput.value = dateId;
        });
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdGlja2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsWUFBWTtBQUNaLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUMxQyxJQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQy9GLElBQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzdFLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNuRSxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFxQixDQUFDO0lBQ3ZGLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7SUFFdkYsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGdCQUFNO1FBQzdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDN0IsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsRCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDMUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxTQUFtQixVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBN0MsS0FBSyxVQUFFLE9BQU8sUUFBK0IsQ0FBQztZQUNyRCxvQkFBb0IsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNwRCxlQUFlLENBQUMsV0FBVyxHQUFHLFVBQUcsS0FBSyxjQUFJLE9BQU8sQ0FBRSxDQUFDO1lBQ3BELGVBQWUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxlQUFlLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJpcy5zaW1wbGUyYi8uL3NyYy90aWNrZXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gdGlja2V0LnRzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbW9kYWxUb2dnbGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtdG9nZ2xlPVwiYWRkLXRpY2tldC1tb2RhbFwiXScpO1xuICAgIGNvbnN0IGZsb29yTmFtZVBsYWNlaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zsb29yTmFtZVBsYWNlaG9sZGVyJyk7XG4gICAgY29uc3QgdGltZVBsYWNlaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVQbGFjZWhvbGRlcicpOyAgICBcbiAgICBjb25zdCB0aW1lSGlkZGVuSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZUhpZGRlbklucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBkYXRlSGlkZGVuSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZUhpZGRlbklucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgXG4gICAgbW9kYWxUb2dnbGVCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB0aWNrZXQgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZUlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtZGF0ZS1pZCcpO1xuICAgICAgICAgICAgY29uc3QgdGlja2V0RGF0YSA9IEpTT04ucGFyc2UodGlja2V0KTtcbiAgICAgICAgICAgIGNvbnN0IFtob3VycywgbWludXRlc10gPSB0aWNrZXREYXRhLmNsb2NrLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBmbG9vck5hbWVQbGFjZWhvbGRlci50ZXh0Q29udGVudCA9IHRpY2tldERhdGEuZmxvb3I7XG4gICAgICAgICAgICB0aW1lUGxhY2Vob2xkZXIudGV4dENvbnRlbnQgPSBgJHtob3Vyc306JHttaW51dGVzfWA7XG4gICAgICAgICAgICB0aW1lSGlkZGVuSW5wdXQudmFsdWUgPSB0aWNrZXREYXRhLmlkO1xuICAgICAgICAgICAgZGF0ZUhpZGRlbklucHV0LnZhbHVlID0gZGF0ZUlkO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=