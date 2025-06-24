const bar=document.getElementById("bars");
const sidebar=document.querySelector(".side-bar");
sidebar.style.display = 'none'; // Ensure sidebar is hidden on page load
bar.addEventListener("click",()=>{
  if (sidebar.style.display === 'none') {
    sidebar.style.display = 'block';
  }
    else {
        sidebar.style.display = 'none';
    }
})