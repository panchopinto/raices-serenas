
(function(){
  // Buttons
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>document.querySelectorAll(s);
  // language
  const btnES = $("#btnES"), btnEN = $("#btnEN");
  if(btnES) btnES.addEventListener("click",()=>I18N.set("es"));
  if(btnEN) btnEN.addEventListener("click",()=>I18N.set("en"));

  // Narrator
  function speak(text, lang){
    try{
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang==="en" ? "en-US" : "es-ES";
      speechSynthesis.speak(u);
    }catch(e){}
  }
  const narrBtn = $("#btnNarrar");
  if(narrBtn){
    narrBtn.addEventListener("click", ()=>{
      const lang = I18N.get();
      const main = $("#main");
      if(main) speak(main.innerText.slice(0,2000), lang);
    });
  }

  // Zoom cursor
  const btnZoom = $("#btnZoom");
  if(btnZoom){
    btnZoom.addEventListener("click", ()=>{
      document.body.classList.toggle("zoomed");
      document.body.style.cursor = document.body.style.cursor ? "" : "zoom-in";
    });
  }

  // Expo mode
  const btnExpo = $("#btnExpo");
  if(btnExpo){
    btnExpo.addEventListener("click", ()=>{
      document.body.classList.toggle("expo");
      document.querySelectorAll(".card").forEach(c=>c.style.fontSize = document.body.classList.contains("expo") ? "1.15rem" : "");
      if(document.fullscreenElement){
        document.exitFullscreen();
      }else{
        document.documentElement.requestFullscreen().catch(()=>{});
      }
    });
  }

  // PWA install
  let deferredPrompt=null;
  window.addEventListener("beforeinstallprompt", (e)=>{ e.preventDefault(); deferredPrompt = e; $(".install-btn")?.classList.remove("hidden"); });
  const btnInstall = $(".install-btn");
  if(btnInstall) btnInstall.addEventListener("click", async ()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice; deferredPrompt=null;
    btnInstall.classList.add("hidden");
  });

  // Metrics (localStorage-based)
  function track(ev, data={}){
    const storeKey="metrics";
    const arr = JSON.parse(localStorage.getItem(storeKey)||"[]");
    arr.push({ev, t:Date.now(), data});
    localStorage.setItem(storeKey, JSON.stringify(arr));
  }
  $$("[data-track]").forEach(el=>{
    el.addEventListener("click",()=>track(el.getAttribute("data-track")));
  });

  // Register service worker
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  }
})();
