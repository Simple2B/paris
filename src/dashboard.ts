// dashboard.ts

const urlInput: HTMLInputElement = document.getElementById("url-input") as HTMLInputElement;

document.getElementById("url-button").addEventListener("click", e => {
    e.preventDefault();
    const url: string = urlInput.value;
    const formData  = new FormData();
      
    formData.append('url', url);
  
    fetch('/dashboard/go', {
      method: 'POST',
      body: formData
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error(error);
    }
    );  
});