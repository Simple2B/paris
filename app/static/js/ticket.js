document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelectorAll('[data-modal-toggle="add-ticket-modal"]'),e=document.getElementById("floorNamePlaceholder"),o=document.getElementById("timePlaceholder");t.forEach((function(t){t.addEventListener("click",(function(){var n=t.getAttribute("data-target"),a=JSON.parse(n),c=a.clock.split(":"),d=c[0],l=c[1];e.textContent=a.floor,o.textContent="".concat(d,":").concat(l)}))}))}));