// Transição entre páginas
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => window.location.href = href, 500);
    }
  });
});

// THREE.JS – Cubos futuristas
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg"), alpha:true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 8;

const cubes = [];
for (let i = 0; i < 20; i++) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.25
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );

  scene.add(cube);
  cubes.push(cube);
}

const light = new THREE.PointLight(0x7dd3fc, 1);
light.position.set(10,10,10);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  cubes.forEach(cube => {
    cube.rotation.x += 0.002;
    cube.rotation.y += 0.002;
  });
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
