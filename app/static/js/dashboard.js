/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/dashboard.ts ***!
  \**************************/
// dashboard.ts
var urlInput = document.getElementById("url-input");
document.getElementById("url-button").addEventListener("click", function (e) {
    e.preventDefault();
    var url = urlInput.value;
    var formData = new FormData();
    formData.append('url', url);
    fetch('/dashboard/go', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.error(error);
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvZGFzaGJvYXJkLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZUFBZTtBQUVmLElBQU0sUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztBQUU1RixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFDO0lBQzdELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQixJQUFNLEdBQUcsR0FBVyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ25DLElBQU0sUUFBUSxHQUFJLElBQUksUUFBUSxFQUFFLENBQUM7SUFFakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFNUIsS0FBSyxDQUFDLGVBQWUsRUFBRTtRQUNyQixNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBUTtRQUNaLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFJO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBSztRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUNBLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmlzLnNpbXBsZTJiLy4vc3JjL2Rhc2hib2FyZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkYXNoYm9hcmQudHNcblxuY29uc3QgdXJsSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVybC1pbnB1dFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVybC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHVybElucHV0LnZhbHVlO1xuICAgIGNvbnN0IGZvcm1EYXRhICA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgXG4gICAgZm9ybURhdGEuYXBwZW5kKCd1cmwnLCB1cmwpO1xuICBcbiAgICBmZXRjaCgnL2Rhc2hib2FyZC9nbycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keTogZm9ybURhdGFcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICApOyAgXG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=