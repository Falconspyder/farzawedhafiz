(() => {
"use strict";

/* Production: automatic date mode.
   Testing: change DEV_MODE to "before", "during", or "after". */
const DEV_MODE = null;

const WEDDING_MODE_START = new Date("2026-10-14T12:00:00+05:30").getTime();
const WEDDING_TIME = new Date("2026-10-14T16:30:00+05:30").getTime();
const WEDDING_END = new Date("2026-10-15T00:00:00+05:30").getTime();

const UPLOAD_URL = "https://drive.google.com/drive/folders/1RLUhVNywTM_xt7Akq1UmPFKLVFGR0nD1?usp=drive_link";
const GALLERY_URL = UPLOAD_URL;

const $ = id => document.getElementById(id);

function setText(id,value){
  const el=$(id);
  if(el) el.textContent=value;
}

function updateCountdown(){
  const difference=Math.max(0,WEDDING_TIME-Date.now());
  const totalSeconds=Math.floor(difference/1000);

  const days=Math.floor(totalSeconds/86400);
  const hours=Math.floor((totalSeconds%86400)/3600);
  const minutes=Math.floor((totalSeconds%3600)/60);
  const seconds=totalSeconds%60;

  setText("days",String(days).padStart(2,"0"));
  setText("hours",String(hours).padStart(2,"0"));
  setText("minutes",String(minutes).padStart(2,"0"));
  setText("seconds",String(seconds).padStart(2,"0"));
}

function showMode(mode){
  const before=$("beforeMode"),during=$("duringMode"),after=$("afterMode");
  const beforeDesignerCredit=$("beforeDesignerCredit");
  if(!before||!during||!after) return;

  before.classList.add("hidden");
  during.classList.add("hidden");
  after.classList.add("hidden");

  if(mode==="before") before.classList.remove("hidden");
  if(mode==="during") during.classList.remove("hidden");
  if(mode==="after") after.classList.remove("hidden");
  if(beforeDesignerCredit) beforeDesignerCredit.classList.toggle("hidden",mode!=="before");
}

function updateWeddingMode(){
  if(DEV_MODE){showMode(DEV_MODE);return;}

  const now=Date.now();
  if(now<WEDDING_MODE_START) showMode("before");
  else if(now<WEDDING_END) showMode("during");
  else showMode("after");
}

function setLinks(){
  document.querySelectorAll("[data-upload-link]").forEach(link=>link.href=UPLOAD_URL);
  document.querySelectorAll("[data-gallery-link]").forEach(link=>link.href=GALLERY_URL);
}

function init(){
  setLinks();
  updateCountdown();
  updateWeddingMode();

  window.setInterval(updateCountdown,1000);
  window.setInterval(updateWeddingMode,10000);
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init,{once:true});
}else{
  init();
}
})();
