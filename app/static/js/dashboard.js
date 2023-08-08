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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvZGFzaGJvYXJkLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZUFBZTtBQUVmLElBQU0sUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztBQUU1RixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFDO0lBQzdELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQixJQUFNLEdBQUcsR0FBVyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ25DLElBQU0sUUFBUSxHQUFJLElBQUksUUFBUSxFQUFFLENBQUM7SUFFakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFNUIsS0FBSyxDQUFDLGVBQWUsRUFBRTtRQUNyQixNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxRQUFRO0tBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBUTtRQUNaLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFJO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBSztRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUNBLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YXRpYy8uL3NyYy9kYXNoYm9hcmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZGFzaGJvYXJkLnRzXG5cbmNvbnN0IHVybElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cmwtaW5wdXRcIikgYXMgSFRNTElucHV0RWxlbWVudDtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cmwtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB1cmxJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBmb3JtRGF0YSAgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIFxuICAgIGZvcm1EYXRhLmFwcGVuZCgndXJsJywgdXJsKTtcbiAgXG4gICAgZmV0Y2goJy9kYXNoYm9hcmQvZ28nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgKTsgIFxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9