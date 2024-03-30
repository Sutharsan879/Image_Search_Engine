const formcont=document.querySelector("form");
const inputcont=document.getElementById("search-input");
const searchresult=document.querySelector(".search-results");
const showmore=document.getElementById("show-more");

let inputdata='';
let page=1;

async function searchimages()
{
    inputdata=inputcont.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=oyoyAHTwHUKJfpg0WZPgzcKlyalqOTA40QdN2jq1Rhw`;
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;
    if(page===1)
    {
        searchresult.innerHTML="";
    }
    results.map((result)=>{
        const imagewrapper=document.createElement("div");
        imagewrapper.classList.add('search-result');
        const img=document.createElement("img");
        img.src=result.urls.small;
        img.alt=result.alt_description;
        const imagelink=document.createElement("a");
        imagelink.href=result.links.html;
        imagelink.target="_blank";
        imagelink.textContent=result.alt_description;
        
        imagewrapper.appendChild(img);
        imagewrapper.appendChild(imagelink);
        searchresult.appendChild(imagewrapper);
    });
    page++;
    if(page>1)
    {
        showmore.style.display="block";
    }
}
formcont.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchimages();
})

showmore.addEventListener("click",()=>{
    searchimages();
})