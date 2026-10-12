import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const canvas = document.getElementById("bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 0, 7);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;


/* =========================
   LIGHTING
========================= */

scene.add(
    new THREE.AmbientLight(
        0x4466aa,
        1.5
    )
);

const blueLight =
    new THREE.PointLight(
        0x168cff,
        30,
        20
    );

blueLight.position.set(
    2,
    3,
    4
);

scene.add(blueLight);


const whiteLight =
    new THREE.PointLight(
        0xffffff,
        15,
        15
    );

whiteLight.position.set(
    -3,
    2,
    3
);

scene.add(whiteLight);


/* =========================
   STAR FIELD
========================= */

const starCount = 2500;

const starGeometry =
    new THREE.BufferGeometry();

const starPositions =
    new Float32Array(
        starCount * 3
    );

for (let i = 0; i < starCount; i++) {

    const radius =
        8 + Math.random() * 20;

    const theta =
        Math.random() * Math.PI * 2;

    const phi =
        Math.acos(
            2 * Math.random() - 1
        );

    starPositions[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

    starPositions[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

    starPositions[i * 3 + 2] =
        radius *
        Math.cos(phi);
}

starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        starPositions,
        3
    )
);

const starMaterial =
    new THREE.PointsMaterial({
        color: 0x8fc7ff,
        size: 0.025,
        transparent: true,
        opacity: 0.8
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);


/* =========================
   MAIN CRYSTAL
========================= */

const crystalGroup =
    new THREE.Group();

scene.add(crystalGroup);


const crystalGeometry =
    new THREE.IcosahedronGeometry(
        1.45,
        2
    );


const crystalMaterial =
    new THREE.MeshPhysicalMaterial({

        color: 0x9bc8ff,

        metalness: 0.65,

        roughness: 0.12,

        transparent: true,

        opacity: 0.88,

        flatShading: true

    });


const crystal =
    new THREE.Mesh(
        crystalGeometry,
        crystalMaterial
    );

crystalGroup.add(crystal);


/* =========================
   CRYSTAL WIREFRAME
========================= */

const wireGeometry =
    new THREE.IcosahedronGeometry(
        1.52,
        2
    );

const wireMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x58aaff,

        wireframe: true,

        transparent: true,

        opacity: 0.35

    });

const crystalWire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

crystalGroup.add(crystalWire);


/* =========================
   ORBITAL RINGS
========================= */

function createRing(
    radius,
    rotation,
    opacity
) {

    const geometry =
        new THREE.TorusGeometry(
            radius,
            0.012,
            16,
            160
        );

    const material =
        new THREE.MeshBasicMaterial({

            color: 0x4ba7ff,

            transparent: true,

            opacity

        });

    const ring =
        new THREE.Mesh(
            geometry,
            material
        );

    ring.rotation.set(
        rotation.x,
        rotation.y,
        rotation.z
    );

    crystalGroup.add(ring);

    return ring;
}


const ring1 =
    createRing(
        2.0,
        {
            x: Math.PI / 2,
            y: 0,
            z: 0
        },
        0.8
    );


const ring2 =
    createRing(
        2.25,
        {
            x: 0.7,
            y: 0.5,
            z: 0
        },
        0.6
    );


const ring3 =
    createRing(
        2.5,
        {
            x: 1.2,
            y: 0,
            z: 0.7
        },
        0.4
    );


/* =========================
   ORBITING BALLS
========================= */

const ballGeometry =
    new THREE.SphereGeometry(
        0.07,
        16,
        16
    );

const ballMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffffff
    });


const ball1 =
    new THREE.Mesh(
        ballGeometry,
        ballMaterial
    );

const ball2 =
    new THREE.Mesh(
        ballGeometry,
        ballMaterial
    );

const ball3 =
    new THREE.Mesh(
        ballGeometry,
        ballMaterial
    );

crystalGroup.add(
    ball1,
    ball2,
    ball3
);


/* =========================
   FUTURISTIC PLATFORM
========================= */

const platformGroup =
    new THREE.Group();

platformGroup.position.y = -2.6;

scene.add(platformGroup);


/* Main platform */

const platformGeometry =
    new THREE.CylinderGeometry(
        2.6,
        2.8,
        0.25,
        64
    );

const platformMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x080d16,

        metalness: 0.9,

        roughness: 0.2

    });

const platform =
    new THREE.Mesh(
        platformGeometry,
        platformMaterial
    );

platformGroup.add(platform);


/* Neon ring */

const platformRing =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            2.45,
            0.035,
            16,
            120
        ),

        new THREE.MeshBasicMaterial({
            color: 0x168cff
        })

    );

platformRing.position.y =
    0.15;

platformGroup.add(
    platformRing
);


/* Inner ring */

const innerRing =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            1.7,
            0.018,
            16,
            120
        ),

        new THREE.MeshBasicMaterial({
            color: 0x65b9ff
        })

    );

innerRing.position.y =
    0.16;

platformGroup.add(
    innerRing
);


/* =========================
   FLOOR GRID
========================= */

const grid =
    new THREE.GridHelper(
        30,
        40,
        0x164c80,
        0x0b2035
    );

grid.position.y = -2.75;

grid.material.transparent = true;
grid.material.opacity = 0.15;

scene.add(grid);


/* =========================
   MOUSE MOVEMENT
========================= */

let mouseX = 0;
let mouseY = 0;

let smoothX = 0;
let smoothY = 0;

window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            (event.clientX /
                window.innerWidth) *
            2 - 1;

        mouseY =
            (event.clientY /
                window.innerHeight) *
            2 - 1;

    }
);


/* =========================
   ANIMATION
========================= */

const clock =
    new THREE.Clock();

function animate() {

    requestAnimationFrame(
        animate
    );

    const time =
        clock.getElapsedTime();


    /* Smooth mouse */

    smoothX +=
        (mouseX - smoothX) *
        0.03;

    smoothY +=
        (mouseY - smoothY) *
        0.03;


    /* Crystal rotation */

    crystal.rotation.x =
        time * 0.18;

    crystal.rotation.y =
        time * 0.3;


    crystalWire.rotation.x =
        -time * 0.12;

    crystalWire.rotation.y =
        -time * 0.2;


    /* Floating */

    crystalGroup.position.y =
        Math.sin(time * 1.2) *
        0.15;


    /* Mouse interaction */

    crystalGroup.rotation.y +=
        (smoothX * 0.35 -
        crystalGroup.rotation.y)
        * 0.025;

    crystalGroup.rotation.x +=
        (-smoothY * 0.25 -
        crystalGroup.rotation.x)
        * 0.025;


    /* Rings */

    ring1.rotation.z =
        time * 0.25;

    ring2.rotation.z =
        -time * 0.18;

    ring3.rotation.x =
        time * 0.15;


    /* Orbiting balls */

    const orbit =
        time * 0.8;

    ball1.position.set(
        Math.cos(orbit) * 2,
        Math.sin(orbit) * 0.5,
        Math.sin(orbit) * 2
    );

    ball2.position.set(
        Math.cos(orbit + 2) * 2.25,
        Math.sin(orbit + 2) * 0.5,
        Math.sin(orbit + 2) * 2.25
    );

    ball3.position.set(
        Math.cos(orbit + 4) * 2.5,
        Math.sin(orbit + 4) * 0.5,
        Math.sin(orbit + 4) * 2.5
    );


    /* Platform animation */

    platformRing.rotation.z =
        time * 0.3;

    innerRing.rotation.z =
        -time * 0.5;


    /* Stars */

    stars.rotation.y =
        time * 0.008;


    /* Camera */

    camera.position.x +=
        (smoothX * 0.35 -
        camera.position.x) *
        0.02;

    camera.position.y +=
        (-smoothY * 0.2 -
        camera.position.y) *
        0.02;

    camera.lookAt(
        0,
        -0.2,
        0
    );


    renderer.render(
        scene,
        camera
    );
}

animate();


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);