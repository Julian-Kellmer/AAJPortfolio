const scratch4 = (p) => {
  let cover
  let hiddenText = '2399$ / MES'

  p.setup = () => {
    let container = p.select('#scratch-container4')
    let w = container.elt.offsetWidth
    let h = container.elt.offsetHeight

    let canvas = p.createCanvas(w, h)
    canvas.parent(container)

    // Fondo de cobertura gris
    cover = p.createGraphics(w, h)
    cover.background(180)

    // Estilo de texto escondido
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(36)
  }

  p.draw = () => {
    p.clear()

    // Dibuja el texto oculto directamente sobre el canvas
    p.fill(0)
    p.text(hiddenText, p.width / 2, p.height / 2)

    // Mostrar la capa gris encima
    p.image(cover, 0, 0)

    // Si se hace clic, borrar parte de la capa gris
    if (
      p.mouseIsPressed &&
      p.mouseX > 0 &&
      p.mouseY > 0 &&
      p.mouseX < p.width &&
      p.mouseY < p.height
    ) {
      cover.erase()
      cover.circle(p.mouseX, p.mouseY, 40)
      cover.noErase()
    }
  }
}

new p5(scratch4)
