import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://vrugwznymkyggijwpprd.supabase.co";
const SUPABASE_KEY = "sb_publishable_hPmeWT0ZKpJ-H__ZU5FcAA_gptC6L1E";
const fallbackClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const CHANNEL_NAME = "lux-city-world-v500";
const avatars = new Map();
const remoteState = new Map();

let W = null;
let THREE = null;
let scene = null;
let client = null;
let channel = null;
let selfId = null;
let started = false;
let realtimeStatus = "WAITING";
let lastNetError = "";
let lastSent = null;
let lastSentAt = 0;
let lastLocalSample = null;
let chatPollId = null;

const now = () => Date.now();
const finite = (v, d = 0) => Number.isFinite(Number(v)) ? Number(v) : d;

function accountReady() {
  return !!(
    window.LuxWorld?.scene &&
    window.LuxWorld?.player &&
    window.LuxAccount?.session?.user?.id &&
    document.body.classList.contains("game-ready")
  );
}

function getPlayerId() {
  return String(window.LuxAccount?.session?.user?.id || selfId || "");
}

function getName() {
  return String(
    window.LuxAccount?.profile?.full_name ||
    window.LuxAccount?.profile?.player_name ||
    document.querySelector("#who")?.textContent?.trim() ||
    "Spieler"
  ).slice(0, 48);
}

function colorFor(id) {
  let h = 2166136261;
  for (const ch of String(id)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  const r = 70 + (h & 95);
  const g = 75 + ((h >>> 8) & 95);
  const b = 85 + ((h >>> 16) & 95);
  return (r << 16) | (g << 8) | b;
}

function makeNameTexture(name) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(7,12,18,.78)";
  ctx.beginPath();
  ctx.roundRect(8, 16, 496, 96, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 46px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(name || "Spieler").slice(0, 22), 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createRemoteAvatar(p) {
  if (!THREE || !scene || !p?.id) return null;

  const root = new THREE.Group();
  root.name = `LuxRemotePlayer:${p.id}`;
  root.userData.remotePlayer = true;
  root.userData.playerId = String(p.id);
  root.userData.playerName = String(p.name || "Spieler");
  root.userData.targetPos = new THREE.Vector3(finite(p.x), finite(p.y), finite(p.z));
  root.userData.targetRot = finite(p.rot);
  root.userData.lastSeen = now();
  root.userData.movePhase = Math.random() * Math.PI * 2;
  root.userData.moving = !!p.moving;

  const bodyColor = colorFor(p.id);
  const skin = new THREE.MeshPhysicalMaterial({ color: 0xc58c66, roughness: .56, metalness: 0, clearcoat: .015 });
  const shirt = new THREE.MeshPhysicalMaterial({ color: bodyColor, roughness: .72, metalness: .015, clearcoat: .02 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x263746, roughness: .84 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x332219, roughness: .78 });
  const shoes = new THREE.MeshStandardMaterial({ color: 0x17191c, roughness: .63 });
  const eye = new THREE.MeshStandardMaterial({ color: 0x111821, roughness: .35 });

  const add = (geo, mat, x, y, z, parent = root) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const shadow = add(
    new THREE.CircleGeometry(.34, 22),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .18, depthWrite: false }),
    0, .01, 0
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.castShadow = false;
  shadow.receiveShadow = false;

  add(new THREE.CapsuleGeometry(.18, .44, 7, 14), shirt, 0, 1.28, 0);
  add(new THREE.CapsuleGeometry(.15, .12, 6, 12), pants, 0, .89, 0);

  const head = add(new THREE.SphereGeometry(.155, 24, 18), skin, 0, 1.82, 0);
  head.scale.set(.92, 1.08, .94);
  const hairTop = add(new THREE.SphereGeometry(.16, 22, 14, 0, Math.PI * 2, 0, Math.PI * .56), hair, 0, 1.935, -.006);
  hairTop.scale.set(.98, .72, .98);

  for (const sx of [-1, 1]) {
    add(new THREE.SphereGeometry(.017, 12, 8), eye, sx * .052, 1.845, .143);
  }

  const limbs = { arms: [], legs: [] };

  for (const sx of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(sx * .255, 1.47, 0);
    add(new THREE.CapsuleGeometry(.048, .42, 5, 10), shirt, 0, -.20, 0, arm);
    add(new THREE.SphereGeometry(.055, 12, 10), skin, 0, -.47, .015, arm);
    root.add(arm);
    limbs.arms.push(arm);

    const leg = new THREE.Group();
    leg.position.set(sx * .105, .83, 0);
    add(new THREE.CapsuleGeometry(.065, .50, 5, 10), pants, 0, -.235, 0, leg);
    add(new THREE.BoxGeometry(.145, .085, .30), shoes, 0, -.56, .065, leg);
    root.add(leg);
    limbs.legs.push(leg);
  }

  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeNameTexture(root.userData.playerName),
    transparent: true,
    depthWrite: false,
    depthTest: true
  }));
  sprite.position.set(0, 2.34, 0);
  sprite.scale.set(2.7, .67, 1);
  sprite.userData.nameplate = true;
  root.add(sprite);
  root.userData.nameplate = sprite;
  root.userData.limbs = limbs;

  root.position.copy(root.userData.targetPos);
  root.rotation.y = root.userData.targetRot;
  scene.add(root);
  avatars.set(String(p.id), root);
  updateOnlineButton();
  return root;
}

function updateRemoteAvatar(p) {
  if (!p?.id) return;
  const id = String(p.id);
  if (!id || id === getPlayerId()) return;

  let avatar = avatars.get(id);
  if (!avatar) avatar = createRemoteAvatar(p);
  if (!avatar) return;

  const x = finite(p.x, avatar.position.x);
  const y = finite(p.y, avatar.position.y);
  const z = finite(p.z, avatar.position.z);
  avatar.userData.targetPos.set(x, y, z);
  avatar.userData.targetRot = finite(p.rot, avatar.rotation.y);
  avatar.userData.lastSeen = now();
  avatar.userData.moving = !!p.moving;

  const newName = String(p.name || avatar.userData.playerName || "Spieler").slice(0, 48);
  if (newName !== avatar.userData.playerName) {
    avatar.userData.playerName = newName;
    const plate = avatar.userData.nameplate;
    if (plate?.material?.map) {
      plate.material.map.dispose?.();
      plate.material.map = makeNameTexture(newName);
      plate.material.needsUpdate = true;
    }
  }

  remoteState.set(id, {
    id,
    name: newName,
    x, y, z,
    rot: avatar.userData.targetRot,
    seenAt: now()
  });
}

function removeRemote(id) {
  const key = String(id);
  const avatar = avatars.get(key);
  if (avatar) {
    avatar.traverse?.(obj => {
      if (obj.geometry?.dispose) obj.geometry.dispose();
      if (obj.material?.map?.dispose) obj.material.map.dispose();
      if (obj.material?.dispose) obj.material.dispose();
    });
    scene?.remove(avatar);
    avatars.delete(key);
  }
  remoteState.delete(key);
  updateOnlineButton();
}

function pruneRemotePlayers(maxAgeMs = 12000) {
  const t = now();
  for (const [id, avatar] of avatars) {
    if (t - finite(avatar.userData.lastSeen, 0) > maxAgeMs) removeRemote(id);
  }
}

function snapshotLocal() {
  const p = W?.player?.position;
  if (!p) return null;

  const sample = {
    id: getPlayerId(),
    name: getName(),
    x: finite(p.x),
    y: finite(p.y),
    z: finite(p.z),
    rot: finite(W.player?.rotation?.y),
    moving: false,
    sent_at: new Date().toISOString()
  };

  if (lastLocalSample) {
    sample.moving = Math.hypot(sample.x - lastLocalSample.x, sample.z - lastLocalSample.z) > .012;
  }
  lastLocalSample = { x: sample.x, z: sample.z };
  return sample;
}

function stateChanged(a, b) {
  if (!a || !b) return true;
  return (
    Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) > .015 ||
    Math.abs(Math.atan2(Math.sin(a.rot - b.rot), Math.cos(a.rot - b.rot))) > .012 ||
    a.name !== b.name ||
    a.moving !== b.moving
  );
}

function noteError(scope, error) {
  if (!error) return;
  const msg = `${scope}: ${error.message || error}`;
  if (msg === lastNetError) return;
  lastNetError = msg;
  console.warn("[LuxCity Multiplayer]", msg);
}

async function writeDatabaseState() {
  if (!started || !client || !getPlayerId()) return;
  const s = snapshotLocal();
  if (!s) return;
  const { error } = await client.from("players").upsert({
    id: s.id,
    name: s.name,
    x: s.x,
    y: s.y,
    z: s.z,
    rot: s.rot,
    updated_at: s.sent_at
  }, { onConflict: "id" });
  if (error) noteError("players upsert", error);
}

async function pollDatabasePlayers() {
  if (!started || !client || !getPlayerId()) return;
  const since = new Date(now() - 20000).toISOString();
  const { data, error } = await client
    .from("players")
    .select("id,name,x,y,z,rot,updated_at")
    .gt("updated_at", since)
    .order("updated_at", { ascending: false })
    .limit(50);

  if (error) {
    noteError("players read", error);
    return;
  }

  for (const p of data || []) {
    if (String(p.id) === getPlayerId()) continue;
    updateRemoteAvatar({
      ...p,
      moving: remoteState.has(String(p.id))
        ? Math.hypot(
            finite(p.x) - finite(remoteState.get(String(p.id))?.x),
            finite(p.z) - finite(remoteState.get(String(p.id))?.z)
          ) > .02
        : false
    });
  }
  pruneRemotePlayers(14000);
}

function broadcastLocal(force = false) {
  if (!started || !channel || realtimeStatus !== "SUBSCRIBED") return;
  const s = snapshotLocal();
  if (!s) return;
  const t = now();
  if (!force && !stateChanged(s, lastSent) && t - lastSentAt < 1500) return;
  lastSent = { ...s };
  lastSentAt = t;
  channel.send({
    type: "broadcast",
    event: "player_state",
    payload: s
  }).catch?.(e => noteError("broadcast send", e));
}

function startRealtime() {
  try {
    channel = client.channel(CHANNEL_NAME, {
      config: {
        broadcast: { self: false, ack: false },
        presence: { key: selfId }
      }
    });

    channel
      .on("broadcast", { event: "player_state" }, event => {
        const p = event?.payload || event;
        if (p && String(p.id) !== getPlayerId()) updateRemoteAvatar(p);
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState?.() || {};
        const present = new Set();
        for (const entries of Object.values(state)) {
          for (const entry of entries || []) {
            const id = String(entry?.id || entry?.user_id || "");
            if (id && id !== getPlayerId()) {
              present.add(id);
              const avatar = avatars.get(id);
              if (avatar) avatar.userData.lastSeen = now();
            }
          }
        }
        for (const id of avatars.keys()) {
          if (!present.has(id) && now() - finite(avatars.get(id)?.userData?.lastSeen, 0) > 5000) {
            removeRemote(id);
          }
        }
        updateOnlineButton();
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        for (const p of leftPresences || []) {
          const id = String(p?.id || p?.user_id || "");
          if (id && id !== getPlayerId()) removeRemote(id);
        }
      })
      .subscribe(async (status, err) => {
        realtimeStatus = status;
        updateOnlineButton();
        if (err) noteError("realtime", err);
        if (status === "SUBSCRIBED") {
          try {
            await channel.track({
              id: selfId,
              name: getName(),
              joined_at: new Date().toISOString()
            });
          } catch (e) {
            noteError("presence track", e);
          }
          broadcastLocal(true);
        }
      });
  } catch (e) {
    realtimeStatus = "ERROR";
    noteError("realtime init", e);
  }
}

function animateRemotePlayers(dt, t) {
  for (const avatar of avatars.values()) {
    const target = avatar.userData.targetPos;
    const alpha = 1 - Math.exp(-Math.min(.05, dt) * 12);
    avatar.position.lerp(target, alpha);

    const targetRot = finite(avatar.userData.targetRot, avatar.rotation.y);
    const diff = Math.atan2(Math.sin(targetRot - avatar.rotation.y), Math.cos(targetRot - avatar.rotation.y));
    avatar.rotation.y += diff * Math.min(1, dt * 12);

    const dist = avatar.position.distanceTo(target);
    const moving = avatar.userData.moving || dist > .025;
    const phase = t * .0075 + finite(avatar.userData.movePhase);
    const swing = moving ? Math.sin(phase) * .52 : 0;
    const limbs = avatar.userData.limbs;
    if (limbs) {
      limbs.arms[0].rotation.x += (swing - limbs.arms[0].rotation.x) * Math.min(1, dt * 10);
      limbs.arms[1].rotation.x += (-swing - limbs.arms[1].rotation.x) * Math.min(1, dt * 10);
      limbs.legs[0].rotation.x += (-swing - limbs.legs[0].rotation.x) * Math.min(1, dt * 10);
      limbs.legs[1].rotation.x += (swing - limbs.legs[1].rotation.x) * Math.min(1, dt * 10);
    }
  }
}

function updateOnlineButton() {
  const btn = document.getElementById("online432");
  if (!btn) return;
  const total = started ? avatars.size + 1 : 0;
  const live = realtimeStatus === "SUBSCRIBED" ? "LIVE" : "SYNC";
  btn.textContent = `${live} ${total} · CHAT`;
}

function buildChatUI() {
  const modal = document.querySelector("#modal");
  const body = document.querySelector("#modalBody");
  if (!modal || !body || !client) return;

  body.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `Online · ${avatars.size + 1} Spieler`;
  body.appendChild(title);

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
  form.style.gap = "8px";
  form.style.marginTop = "8px";

  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 180;
  input.placeholder = "Nachricht …";
  input.style.flex = "1";
  input.required = true;

  const send = document.createElement("button");
  send.type = "submit";
  send.textContent = "SENDEN";

  form.append(input, send);
  body.appendChild(form);

  async function loadChat() {
    const { data, error } = await client
      .from("chat_messages")
      .select("id,player_id,name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(40);

    if (error) {
      noteError("chat read", error);
      return;
    }

    list.innerHTML = "";
    for (const m of [...(data || [])].reverse()) {
      const li = document.createElement("li");
      li.style.padding = "5px 0";
      li.textContent = `${m.name}: ${m.message}`;
      list.appendChild(li);
    }
    container.scrollTop = container.scrollHeight;
  }

  loadChat();
  clearInterval(chatPollId);
  chatPollId = setInterval(loadChat, 1800);

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const txt = input.value.trim();
    if (!txt) return;

    const { error } = await client.from("chat_messages").insert({
      player_id: getPlayerId(),
      name: getName(),
      message: txt,
      created_at: new Date().toISOString()
    });

    if (error) {
      noteError("chat send", error);
      return;
    }

    input.value = "";
    loadChat();
  });

  const observer = new MutationObserver(() => {
    if (!document.body.contains(list) || modal.hidden) {
      clearInterval(chatPollId);
      chatPollId = null;
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
}

function addOnlineButton() {
  const hud = document.querySelector("#hud");
  if (!hud || document.getElementById("online432")) return;
  const btn = document.createElement("button");
  btn.id = "online432";
  btn.style.margin = "4px";
  btn.textContent = "SYNC 0 · CHAT";
  btn.addEventListener("click", () => {
    const modal = document.querySelector("#modal");
    if (modal) {
      modal.hidden = false;
      modal.style.display = "block";
    }
    buildChatUI();
  });
  hud.appendChild(btn);
}

function cleanup() {
  try { channel?.untrack?.(); } catch {}
  try { if (client && channel) client.removeChannel(channel); } catch {}
  channel = null;
  realtimeStatus = "CLOSED";
}

function start() {
  if (started || !accountReady()) return;
  W = window.LuxWorld;
  THREE = W.THREE;
  scene = W.scene;
  client = window.LuxAccount?.sb || fallbackClient;
  selfId = String(window.LuxAccount.session.user.id);
  if (!THREE || !scene || !client || !selfId) return;

  started = true;
  addOnlineButton();
  startRealtime();
  W.registerTick?.(animateRemotePlayers);

  writeDatabaseState();
  pollDatabasePlayers();

  setInterval(() => {
    if (!document.body.classList.contains("game-ready")) return;
    broadcastLocal(false);
  }, 160);

  setInterval(() => {
    if (!document.body.classList.contains("game-ready")) return;
    writeDatabaseState();
  }, 1200);

  setInterval(() => {
    if (!document.body.classList.contains("game-ready")) return;
    pollDatabasePlayers();
  }, 1100);

  setInterval(() => pruneRemotePlayers(14000), 3000);

  window.addEventListener("pagehide", cleanup, { once: true });
  updateOnlineButton();
}

addOnlineButton();

const boot = setInterval(() => {
  if (!started) start();
  if (started) clearInterval(boot);
}, 200);

window.addEventListener("luxcity:manual-login", () => setTimeout(start, 0));

window.LuxMultiplayer432 = window.LuxMultiplayer500 = {
  version: "5.0.0",
  get playerId() { return getPlayerId(); },
  get onlinePlayers() { return avatars.size + (started ? 1 : 0); },
  get remotePlayers() { return avatars; },
  get realtimeStatus() { return realtimeStatus; },
  get lastError() { return lastNetError; },
  forceSync() {
    broadcastLocal(true);
    writeDatabaseState();
    pollDatabasePlayers();
  }
};
