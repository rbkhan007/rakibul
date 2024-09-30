// Load Font and Create Floating Texts with Enhanced Features
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const texts = ['HTML', 'CSS', 'JavaScript', 'Three.js', 'Web Development', 'Database', 'React', 'Node.js', 'UI/UX', 'Backend'];
    const textMeshes = [];
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00acc1 });

    texts.forEach(text => {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        // Optimize geometry by computing bounding box once
        textGeometry.computeBoundingBox();
        textGeometry.center(); // Center the geometry

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Random position within a defined range
        textMesh.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            -Math.random() * 100
        );

        // Random rotation
        textMesh.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            0
        );

        // Add user data for interactivity
        textMesh.userData = { text: text };

        scene.add(textMesh);
        textMeshes.push(textMesh);
    });

    // Raycaster for detecting mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Event listener for mouse movement
    window.addEventListener('mousemove', (event) => {
        // Normalize mouse coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }, false);

    // Animation for floating and interactive texts
    function animateTexts() {
        textMeshes.forEach(mesh => {
            // Rotation
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.001;

            // Floating Effect with Sinusoidal Motion
            mesh.position.y += 0.01 * Math.sin(Date.now() * 0.001);

            // Reset position if necessary
            if (mesh.position.y > 50) {
                mesh.position.y = -50;
            }
        });

        // Interactivity: Highlight texts on hover
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(textMeshes);

        textMeshes.forEach(mesh => {
            if (intersects.find(intersect => intersect.object === mesh)) {
                mesh.material.color.set(0xffa500); // Highlight color
            } else {
                mesh.material.color.set(0x00acc1); // Original color
            }
        });
    }

    // Update animation loop to include enhanced floating texts
    function animate() {
        requestAnimationFrame(animate);
        donut.rotation.x += 0.01;
        donut.rotation.y += 0.01;
        stars.rotation.y += 0.0002;
        animateTexts();
        renderer.render(scene, camera);
    }
    animate();
});
