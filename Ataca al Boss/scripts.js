document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("battleSection").classList.remove("d-none");
  currentBoss = generarBossAleatorio();
  mostrarBoss(currentBoss);
});

function Boss() {
  return {
    vida: 1000,
    resistencia_t0: 0,
    resistencia_t1: 40,
    resistencia_t2: 60
  };
}

function Dragon() {
  const b = Boss();
  return {
    nombre: "Dragón",
    vida: b.vida,
    resistencia: { espada: b.resistencia_t0, magia: b.resistencia_t1, arco: b.resistencia_t2 }
  };
}

function Orco() {
  const b = Boss();
  return {
    nombre: "Orco",
    vida: b.vida,
    resistencia: { magia: b.resistencia_t0, espada: b.resistencia_t1, arco: b.resistencia_t2 }
  };
}

function Hechicero() {
  const b = Boss();
  return {
    nombre: "Hechicero",
    vida: b.vida,
    resistencia: { espada: b.resistencia_t0, arco: b.resistencia_t1, magia: b.resistencia_t2 }
  };
}

function generarBossAleatorio() {
  const opciones = [Dragon, Orco, Hechicero];
  return opciones[Math.floor(Math.random() * opciones.length)]();
}

function mostrarBoss(boss) {
  document.getElementById("bossName").textContent = boss.nombre;
  document.getElementById("bossHealth").textContent = boss.vida;
  document.getElementById("bossResist").textContent =
    `Espada: ${boss.resistencia.espada}, Arco: ${boss.resistencia.arco}, Magia: ${boss.resistencia.magia}`;
}

function calcularDaño(tipo, boss) {
  const ataques = { espada: 100, arco: 100, magia: 100 };
  const daño = Math.max(ataques[tipo] - boss.resistencia[tipo], 0);
  boss.vida = Math.max(boss.vida - daño, 0);
  return daño;
}

let currentBoss = null;

document.getElementById("attackBtn").addEventListener("click", () => {
  if (!currentBoss) return;

  const tipo = document.getElementById("attackSelect").value;
  const daño = calcularDaño(tipo, currentBoss);

  document.getElementById("bossHealth").textContent = currentBoss.vida;

  let log = document.getElementById("battleLog");
  if (!log) {
    log = document.createElement("p");
    log.id = "battleLog";
    document.querySelector("#battleSection").appendChild(log);
  }

  log.textContent = `Usaste ${tipo}. Daño: ${daño}. Vida restante: ${currentBoss.vida}`;
  if (currentBoss.vida <= 0) log.textContent += ` ¡Has derrotado al ${currentBoss.nombre}!`;
});
