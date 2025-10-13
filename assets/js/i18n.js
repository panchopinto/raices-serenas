
window.I18N=(function(){
  const key="lang";
  let lang = localStorage.getItem(key) || "es";
  async function load(){
    const res = await fetch(`assets/i18n/${lang}.json`);
    const dict = await res.json();
    document.querySelectorAll("[data-i18n]").forEach(node=>{
      const k=node.getAttribute("data-i18n");
      if(dict[k]) node.textContent = dict[k];
    });
    document.documentElement.lang = lang;
    document.title = dict["app.title"] || document.title;
  }
  function set(newLang){
    lang=newLang; localStorage.setItem(key,newLang); load();
  }
  return {load,set,get:()=>lang};
})();
document.addEventListener("DOMContentLoaded",()=>I18N.load());
