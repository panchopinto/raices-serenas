
(function(){
  const qs = (k)=>new URLSearchParams(location.search).get(k)||"";
  const es = document.querySelectorAll(".es");
  const en = document.querySelectorAll(".en");
  function setLang(lang){
    localStorage.setItem("lang", lang);
    if(lang==="en"){
      es.forEach(n=>n.classList.add("hidden"));
      en.forEach(n=>n.classList.remove("hidden"));
    }else{
      en.forEach(n=>n.classList.add("hidden"));
      es.forEach(n=>n.classList.remove("hidden"));
    }
  }
  const saved = localStorage.getItem("lang")||"es";
  setLang(saved);
  const btnES = document.getElementById("btnES");
  const btnEN = document.getElementById("btnEN");
  if(btnES) btnES.addEventListener("click",()=>setLang("es"));
  if(btnEN) btnEN.addEventListener("click",()=>setLang("en"));

  // Simple narration for main content
  function speak(text){
    try{
      const u = new SpeechSynthesisUtterance(text);
      u.lang = saved==="en" ? "en-US" : "es-ES";
      speechSynthesis.speak(u);
    }catch(e){}
  }
  const narrBtn = document.getElementById("btnNarrar");
  if(narrBtn){
    narrBtn.addEventListener("click", ()=>{
      const main = document.getElementById("main");
      if(main) speak(main.innerText.trim().slice(0, 2000));
    });
  }

  // Zoom cursor toggle
  const btnZoom = document.getElementById("btnZoom");
  if(btnZoom){
    btnZoom.addEventListener("click", ()=>{
      document.body.style.cursor = document.body.style.cursor ? "" : "zoom-in";
    });
  }
})();
