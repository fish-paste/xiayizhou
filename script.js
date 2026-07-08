const mainBooks = [
    {
        id: 'crime',
        title: '罪与罚',
        author: '— 陀思妥耶夫斯基',
        excerpt: '我当时只想弄明白一件事：我是一只虱子，像所有的人一样，还是一个人？我能不能跨过去？我是一个战栗的生物，还是有权利的人……痛苦和疼痛对于智力广博和内心深沉的人来说总是不可避免的。我想那些真正伟大的人一定会在这个世界上感到巨大的悲伤。',
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80'
    },
    {
        id: 'noroad',
        title: '无路之地',
        author: '',
        excerpt: '窗外仍在下着雨。新生的雏鸟在檐下的巢穴中，能看到它们在料峭的风中竖起的细小羽毛。\n也许等这个雨季后，那些屋檐下的雏鸟们就会长出坚韧的新羽，飞出巢穴。\n人类对爱也会有雏鸟情节吗？他不知道。也许他是那只被困住的鸟。可窗外在下雨，雨又总是下个不停，那就等天晴后，他们再飞往不同的方向吧。',
        image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&q=80'
    },
    {
        id: 'karamazov',
        title: '卡拉马佐夫兄弟',
        author: '— 陀思妥耶夫斯基',
        excerpt: '如果上帝不存在，那么一切都是被允许的。魔鬼和上帝在斗争，而斗争的战场就是人心。人类的秘密并不在于仅仅活着，而在于为什么活着。如果对自己为什么活着没有一个坚定的信念，人就不愿意活着，宁可毁灭自己，也不愿留在世上，尽管他的四周摆满了面包。',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80'
    },
    {
        id: 'stranger',
        title: '局外人',
        author: '— 加缪',
        excerpt: '我觉得我打开了幸福的闸门。在那一刻，这片寂静的海湾和其中升起的香气向我涌来，仿佛第一次浸入了我的灵魂。这片大地的奇妙安宁，仿佛是从世界尽头传来的。我那时第一次想到，原来世界上存在着一种善良的冷漠，它与我竟如此相近，简直就像兄弟。',
        image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8b03?w=600&q=80'
    },
    {
        id: 'trial',
        title: '审判',
        author: '— 卡夫卡',
        excerpt: '一定是有人诬陷了约瑟夫·K，因为一天早晨，他没有做什么坏事，就被逮捕了。……逻辑固然是不可动摇的，但它抵不住一个想要活命的人。假如有这么一个审判官，而我从没见过他：假如有一个更高级的法庭，而我永远也不可能到达——那我怎么可能被赦免呢？',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80'
    }
];

// Modal
const modal = document.getElementById('modal');

function openModal(book) {
    // Not used in carousel version
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (modal) {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // 3D Carousel
    const cards = document.querySelectorAll('.book3d-card');
    const prevBtn = document.getElementById('books3d-prev');
    const nextBtn = document.getElementById('books3d-next');
    const counter = document.getElementById('books3d-counter');
    let current = 0;
    const total = cards.length;

    function updateCarousel() {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            if (i === current) {
                card.classList.add('active');
            } else if (i === (current - 1 + total) % total) {
                card.classList.add('prev');
            } else if (i === (current + 1) % total) {
                card.classList.add('next');
            }
        });
        counter.textContent = `${current + 1} / ${total}`;
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + total) % total;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % total;
        updateCarousel();
    });

    updateCarousel();

    // Typewriter effect
    const typewriterEl = document.getElementById('typewriter');
    const text = '假如我的心略大于整个宇宙...';
    let charIndex = 0;

    function type() {
        if (charIndex <= text.length) {
            typewriterEl.innerHTML = text.slice(0, charIndex) + '<span class="cursor"></span>';
            charIndex++;
            setTimeout(type, 150);
        }
    }
    setTimeout(type, 800);

    // Section 2 - 3D Constellation Globe
    const globeCanvas = document.getElementById('globe-canvas');
    if (globeCanvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        const camera = new THREE.PerspectiveCamera(50, globeCanvas.clientWidth / globeCanvas.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ canvas: globeCanvas, antialias: true });
        renderer.setSize(globeCanvas.clientWidth, globeCanvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const controls = new THREE.OrbitControls(camera, globeCanvas);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Globe wireframe
        const globeGeo = new THREE.SphereGeometry(2, 32, 32);
        const globeMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true, transparent: true, opacity: 0.25 });
        scene.add(new THREE.Mesh(globeGeo, globeMat));

        // Constellation data
        const constellations = [
            { name: '白羊座', symbol: '♈', lat: 20, lng: 30 },
            { name: '金牛座', symbol: '♉', lat: 15, lng: 60 },
            { name: '双子座', symbol: '♊', lat: 25, lng: 90 },
            { name: '巨蟹座', symbol: '♋', lat: 10, lng: 120 },
            { name: '狮子座', symbol: '♌', lat: 20, lng: 150 },
            { name: '处女座', symbol: '♍', lat: -5, lng: 180 },
            { name: '天秤座', symbol: '♎', lat: -15, lng: 210 },
            { name: '天蝎座', symbol: '♏', lat: -25, lng: 240 },
            { name: '射手座', symbol: '♐', lat: -20, lng: 270 },
            { name: '摩羯座', symbol: '♑', lat: -15, lng: 300 },
            { name: '水瓶座', symbol: '♒', lat: -5, lng: 330 },
            { name: '双鱼座', symbol: '♓', lat: 10, lng: 360 }
        ];

        // Inline SVG data for constellation icons (avoids file:// CORS issues)
        const svgSources = [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M50 85 L50 40"/><path d="M50 40 C50 25 35 15 25 20 C15 25 15 40 25 45 C35 50 45 40 50 40"/><path d="M50 40 C50 25 65 15 75 20 C85 25 85 40 75 45 C65 50 55 40 50 40"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="60" r="22"/><path d="M28 55 C20 40 15 25 20 18"/><path d="M72 55 C80 40 85 25 80 18"/><path d="M28 55 C32 48 40 45 50 45 C60 45 68 48 72 55"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M30 20 C40 25 60 25 70 20"/><path d="M30 80 C40 75 60 75 70 80"/><line x1="38" y1="23" x2="38" y2="77"/><line x1="62" y1="23" x2="62" y2="77"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="35" cy="45" r="10"/><circle cx="65" cy="55" r="10"/><path d="M45 45 C55 45 70 40 75 30 C80 20 70 15 60 20"/><path d="M55 55 C45 55 30 60 25 70 C20 80 30 85 40 80"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="35" cy="65" r="12"/><path d="M47 65 C55 65 60 55 60 48 C60 38 50 35 45 40 C40 45 45 55 55 55 C65 55 70 48 70 40 C70 32 65 28 60 28"/><path d="M60 28 C70 20 80 25 80 35 C80 45 75 50 70 55"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20 L20 70 C20 80 30 80 30 70 L30 35"/><path d="M30 35 C30 25 40 25 40 35 L40 70 C40 80 50 80 50 70 L50 35"/><path d="M50 35 C50 25 60 25 60 35 L60 70 C60 80 70 75 72 68"/><path d="M72 68 C78 55 85 60 80 72 C75 84 65 85 60 80"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="75" x2="80" y2="75"/><path d="M25 55 C25 35 50 25 50 25 C50 25 75 35 75 55"/><line x1="20" y1="55" x2="80" y2="55"/><line x1="50" y1="25" x2="50" y2="15"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 20 L15 70 C15 80 25 80 25 70 L25 35"/><path d="M25 35 C25 25 35 25 35 35 L35 70 C35 80 45 80 45 70 L45 35"/><path d="M45 35 C45 25 55 25 55 35 L55 70 C55 80 65 80 70 75 L78 68"/><path d="M78 68 L72 62 M78 68 L84 62"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="25" y1="75" x2="75" y2="25"/><path d="M55 25 L75 25 L75 45"/><line x1="30" y1="50" x2="60" y2="80"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 25 C20 25 25 15 35 20 C40 23 35 35 30 45 L30 65 C30 75 40 75 45 70 C50 65 55 55 55 50"/><path d="M55 50 C55 40 65 35 70 40 C75 45 75 55 70 65 C65 75 55 80 50 75"/><circle cx="55" cy="72" r="8"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 40 L30 32 L40 40 L50 32 L60 40 L70 32 L80 40"/><path d="M20 58 L30 50 L40 58 L50 50 L60 58 L70 50 L80 58"/></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M25 20 C10 35 10 65 25 80"/><path d="M75 20 C90 35 90 65 75 80"/><line x1="15" y1="50" x2="85" y2="50"/></svg>'
        ];

        function loadSVGTexture(idx) {
            const svg = svgSources[idx];
            const img = new Image();
            img.src = 'data:image/svg+xml;base64,' + btoa(svg);
            const tex = new THREE.Texture(img);
            img.onload = () => { tex.needsUpdate = true; };
            return tex;
        }

        // Place constellation markers on sphere
        const markers = [];
        constellations.forEach((c, idx) => {
            const phi = (90 - c.lat) * Math.PI / 180;
            const theta = c.lng * Math.PI / 180;
            const r = 2.05;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            // Dot marker
            const dotGeo = new THREE.SphereGeometry(0.05, 8, 8);
            const dotMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
            const dot = new THREE.Mesh(dotGeo, dotMat);
            dot.position.set(x, y, z);
            dot.userData = { name: c.name, symbol: c.symbol };
            scene.add(dot);
            markers.push(dot);

            // Icon sprite above the dot
            const iconTex = loadSVGTexture(idx);
            const spriteMat = new THREE.SpriteMaterial({ map: iconTex, transparent: true, opacity: 0.9 });
            const sprite = new THREE.Sprite(spriteMat);
            const iconR = 2.25;
            sprite.position.set(
                iconR * Math.sin(phi) * Math.cos(theta),
                iconR * Math.cos(phi),
                iconR * Math.sin(phi) * Math.sin(theta)
            );
            sprite.scale.set(0.2, 0.2, 1);
            scene.add(sprite);

            // Small connecting lines
            const lineGeo = new THREE.BufferGeometry();
            const inner = 1.95;
            const ix = inner * Math.sin(phi) * Math.cos(theta);
            const iy = inner * Math.cos(phi);
            const iz = inner * Math.sin(phi) * Math.sin(theta);
            lineGeo.setFromPoints([new THREE.Vector3(ix, iy, iz), new THREE.Vector3(x, y, z)]);
            const lineMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.4 });
            scene.add(new THREE.Line(lineGeo, lineMat));
        });

        // Stars scattered
        const starCount = 500;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            const r = 1.6 + Math.random() * 0.3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.cos(phi);
            starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({ color: 0x999999, size: 0.015, sizeAttenuation: true });
        scene.add(new THREE.Points(starGeo, starMat));

        // Click detection
        const raycaster = new THREE.Raycaster();
        raycaster.params.Mesh = { threshold: 0.1 };
        const mouse = new THREE.Vector2();
        const infoEl = document.getElementById('globe-info');

        globeCanvas.addEventListener('click', (e) => {
            const rect = globeCanvas.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const hits = raycaster.intersectObjects(markers);
            if (hits.length > 0) {
                const data = hits[0].object.userData;
                infoEl.innerHTML = `<div class="globe-detail"><div class="constellation-name">${data.symbol} ${data.name}</div></div>`;
            }
        });

        function animateGlobe() {
            requestAnimationFrame(animateGlobe);
            controls.update();
            renderer.render(scene, camera);
        }
        animateGlobe();

        window.addEventListener('resize', () => {
            const w = globeCanvas.clientWidth;
            const h = globeCanvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    }

    // CD Player
    const cdPlayer = document.getElementById('cd-player');
    const cdDisc = document.getElementById('cd-disc');
    const cdArm = document.getElementById('cd-arm');
    const cdStatus = document.getElementById('cd-status');
    const audio = document.getElementById('audio-player');
    let isPlaying = false;

    cdPlayer.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            cdDisc.classList.remove('spinning');
            cdArm.classList.remove('playing');
            cdStatus.textContent = 'CLICK TO PLAY';
            isPlaying = false;
        } else {
            cdDisc.classList.add('spinning');
            cdArm.classList.add('playing');
            cdStatus.textContent = 'NOW PLAYING';
            isPlaying = true;
            audio.play().catch(() => {
                cdStatus.textContent = '♪ PLAYING';
            });
        }
    });
});
