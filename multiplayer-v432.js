import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://vrugwznymkyggijwpprd.supabase.co";
const SUPABASE_KEY = "sb_publishable_hPmeWT0ZKpJ-H__ZU5FcAA_gptC6L1E";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOCAL_PLAYER_ID=(()=>{const k='luxcity_player_id';let id=localStorage.getItem(k);if(!id){id=crypto.randomUUID();localStorage.setItem(k,id)}return id})();
function getPlayerId(){return window.LuxAccount?.session?.user?.id||LOCAL_PLAYER_ID}
function getName(){return window.LuxAccount?.profile?.player_name||document.querySelector('#who')?.textContent?.trim()||'Spieler'}


function waitLuxWorld() {
  return new Promise(r => {
    if (window.LuxWorld) return r();
    const i = setInterval(() => {
      if (window.LuxWorld) {
        clearInterval(i);
        r();
      }
    }, 100);
  });
}

await waitLuxWorld();
const { THREE, scene } = LuxWorld;

// ---------- AVATAR HANDLING ----------
const avatars = new Map(); // player_id -> mesh

function playerColor(id){let h=0;for(let i=0;i<String(id).length;i++)h=(h*31+String(id).charCodeAt(i))>>>0;return 0x335577+(h%0x887777)}
function createAvatar(p){const g=new THREE.Group(),skin=new THREE.MeshStandardMaterial({color:0xd5a27c,roughness:.7}),cloth=new THREE.MeshStandardMaterial({color:playerColor(p.id),roughness:.8}),dark=new THREE.MeshStandardMaterial({color:0x252a31,roughness:.9});const head=new THREE.Mesh(new THREE.SphereGeometry(.3,14,10),skin);head.position.y=1.82;g.add(head);const body=new THREE.Mesh(new THREE.BoxGeometry(.72,.9,.38),cloth);body.position.y=1.15;g.add(body);for(const x of [-.46,.46]){let arm=new THREE.Mesh(new THREE.BoxGeometry(.18,.78,.2),skin);arm.position.set(x,1.16,0);g.add(arm)}for(const x of [-.2,.2]){let leg=new THREE.Mesh(new THREE.BoxGeometry(.24,.78,.28),dark);leg.position.set(x,.4,0);g.add(leg)}g.position.set(p.x,p.y,p.z);g.rotation.y=p.rot||0;scene.add(g);avatars.set(p.id,g)}
function updateAvatar(p) {
  const m = avatars.get(p.id);
  if (m) {
    m.position.set(p.x, p.y, p.z);
    m.rotation.y = p.rot;
  } else createAvatar(p);
}
function pruneAvatars(validIds) {
  for (const [id, mesh] of avatars) {
    if (!validIds.has(id)) {
      scene.remove(mesh);
      avatars.delete(id);
    }
  }
}

// ---------- POSITION UPDATES ----------
function getLocalPos() {
  const p = LuxWorld.player?.position ?? { x: 0, y: 0, z: 0 };
  const r = LuxWorld.player?.rotation?.y ?? 0;
  return { x: p.x, y: p.y, z: p.z, rot: r };
}
async function upsertSelf() {
  const { x, y, z, rot } = getLocalPos();
  try {
    await supabase.from("players").upsert({
      id: getPlayerId(),
      name: getName(),
      x,
      y,
      z,
      rot,
      updated_at: new Date().toISOString(),
    });
  } catch (_) {}
}
setInterval(upsertSelf, 750);

// ---------- REMOTE PLAYERS ----------
async function pollPlayers() {
  const since = new Date(Date.now() - 20_000).toISOString();
  try {
    const { data } = await supabase
      .from("players")
      .select("id,name,x,y,z,rot")
      .gt("updated_at", since)
      .order("updated_at", { ascending: false })
      .limit(30);
    if (!data) return;
    const valid = new Set();
    for (const p of data) {
      if (p.id === getPlayerId()) continue;
      valid.add(p.id);
      updateAvatar(p);
    }
    pruneAvatars(valid);
  } catch (_) {}
}
setInterval(pollPlayers, 2000);

// ---------- ONLINE BUTTON & CHAT ----------
function buildChatUI() {
  const modal = document.querySelector("#modal");
  const body = document.querySelector("#modalBody");
  if (!modal || !body) return;

  // clear previous
  body.innerHTML = "";

  const container = document.createElement("div");
  container.style.maxHeight = "400px";
  container.style.overflowY = "auto";
  container.style.padding = "8px";
  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.margin = "0";
  list.style.padding = "0";
  container.appendChild(list);
  body.appendChild(container);

  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.marginTop = "8px";
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 180;
  input.style.flex = "1";
  input.required = true;
  const send = document.createElement("button");
  send.type = "submit";
  send.textContent = "SENDEN";
  form.appendChild(input);
  form.appendChild(send);
  body.appendChild(form);

  let pollId = null;
  async function loadChat() {
    try {
      const { data } = await supabase
        .from("chat_messages")
        .select("id,player_id,name,message,created_at")
        .order("created_at", { ascending: false })
        .limit(30);
      if (!data) return;
      list.innerHTML = "";
      const msgs = [...data].reverse();
      for (const m of msgs) {
        const li = document.createElement("li");
        li.textContent = `${m.name}: ${m.message}`;
        list.appendChild(li);
      }
      container.scrollTop = container.scrollHeight;
    } catch (_) {}
  }
  loadChat();
  pollId = setInterval(loadChat, 2000);

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const txt = input.value.trim();
    if (!txt) return;
    try {
      await supabase.from("chat_messages").insert({
        player_id: getPlayerId(),
        name: getName(),
        message: txt,
        created_at: new Date().toISOString(),
      });
      input.value = "";
      loadChat();
    } catch (_) {}
  });

  // stop polling when modal closed
  const observer = new MutationObserver(() => {
    if (!document.body.contains(list) || modal.hidden) {
      clearInterval(pollId);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// add button
function addOnlineBtn() {
  const hud = document.querySelector("#hud");
  if (!hud) return;
  if(document.getElementById('online432'))return;const btn = document.createElement('button');btn.id='online432';
  btn.textContent = 'CHAT ONLINE';
  btn.style.margin = "4px";
  btn.addEventListener("click", () => {
    const modal = document.querySelector("#modal");
    if (modal) { modal.hidden=false; modal.style.display = "block"; }
    buildChatUI();
  });
  hud.appendChild(btn);
}
addOnlineBtn();
window.LuxMultiplayer432={get playerId(){return getPlayerId()},get onlinePlayers(){return avatars.size}};
