let sketch1 = (p) => {
  let imagenes = []
  let cantidad = 5
  let expandido = false

  p.preload = () => {
    for (let i = 0; i < cantidad; i++) {
      imagenes[i] = {
        img: p.loadImage(`/public/img${i + 1}.png`), // desde carpeta public
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        opacity: 0,
        wiggleOffset: p.random(1000), // valor inicial aleatorio para animación senoidal
      }
    }
  }

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.parent('canvas-container')
    p.imageMode(p.CENTER)

    for (let i = 0; i < cantidad; i++) {
      imagenes[i].x = p.width / 2
      imagenes[i].y = p.height / 2
      imagenes[i].targetX = p.width / 2
      imagenes[i].targetY = p.height / 2
    }

    const boton = document.getElementById('animarBtn')
    boton.addEventListener('click', () => {
      expandido = !expandido
      const spacing = 270
      const centerX = p.width / 2
      const centerY = (p.height / 4) * 3

      for (let i = 0; i < cantidad; i++) {
        if (expandido) {
          imagenes[i].targetX = centerX + (i - (cantidad - 1) / 2) * spacing
          imagenes[i].targetY = centerY - Math.abs(i - (cantidad - 1) / 2) * 20
        } else {
          imagenes[i].targetX = centerX
          imagenes[i].targetY = centerY
        }
      }
    })
  }

  p.draw = () => {
    p.background(240)

    for (let i = 0; i < cantidad; i++) {
      let img = imagenes[i]

      img.x = p.lerp(img.x, img.targetX, 0.1)
      img.y = p.lerp(img.y, img.targetY, 0.1)
      img.opacity = expandido
        ? Math.min(img.opacity + 10, 255)
        : Math.max(img.opacity - 10, 0)

      let wiggleY = expandido
        ? 5 * p.sin(p.frameCount * 0.05 + img.wiggleOffset)
        : 0

      // Hover effect
      let d = p.dist(p.mouseX, p.mouseY, img.x, img.y)
      let hoverOffsetX = 0
      let hoverOffsetY = 0
      if (d < 90) {
        hoverOffsetX = (p.mouseX - img.x) * 0.05
        hoverOffsetY = (p.mouseY - img.y) * 0.05
      }

      p.push()
      p.translate(img.x + hoverOffsetX, img.y + hoverOffsetY + wiggleY)
      p.tint(255, img.opacity)
      p.image(img.img, 0, 0, p.width * 0.3, (p.width * 0.3) * 0.6)
      p.pop()
    }
  }
}

new p5(sketch1)
