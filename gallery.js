// Interactive Gallery Script
class Gallery {
  constructor() {
    this.images = []
    this.currentIndex = 0
    this.modal = null
    this.modalImg = null
    this.caption = null
    this.init()
  }

  init() {
    // Create modal structure
    this.createModal()

    // Get all gallery images
    this.images = document.querySelectorAll(".gallery-item")

    // Add click handlers to all images
    this.images.forEach((img, index) => {
      img.addEventListener("click", () => this.openModal(index))
      img.style.cursor = "pointer"
    })

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => this.handleKeyboard(e))
  }

  createModal() {
    // Create modal HTML
    const modalHTML = `
      <div id="imageModal" class="modal">
        <span class="modal-close">&times;</span>
        <span class="modal-prev">&#10094;</span>
        <span class="modal-next">&#10095;</span>
        <img class="modal-content" id="modalImage" alt="Gallery Image">
        <div class="modal-caption" id="modalCaption"></div>
        <div class="modal-counter" id="modalCounter"></div>
      </div>
    `

    document.body.insertAdjacentHTML("beforeend", modalHTML)

    // Get modal elements
    this.modal = document.getElementById("imageModal")
    this.modalImg = document.getElementById("modalImage")
    this.caption = document.getElementById("modalCaption")
    this.counter = document.getElementById("modalCounter")

    // Add event listeners
    document.querySelector(".modal-close").addEventListener("click", () => this.closeModal())
    document.querySelector(".modal-prev").addEventListener("click", () => this.prevImage())
    document.querySelector(".modal-next").addEventListener("click", () => this.nextImage())

    // Close on background click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal()
      }
    })
  }

  openModal(index) {
    this.currentIndex = index
    const item = this.images[index]
    const imgElement = item.querySelector(".gallery-image")
    const captionText = item.querySelector("h3, h4").textContent
    const description = item.querySelector("p").textContent

    // Set modal content
    this.modalImg.src = imgElement.style.backgroundImage
      ? imgElement.style.backgroundImage.slice(5, -2)
      : "/placeholder.svg?height=600&width=800&query=" + encodeURIComponent(captionText)
    this.modalImg.alt = captionText
    this.caption.innerHTML = `<strong>${captionText}</strong><br>${description}`
    this.counter.textContent = `${index + 1} / ${this.images.length}`

    // Show modal
    this.modal.classList.add("modal-show")
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    this.modal.classList.remove("modal-show")
    document.body.style.overflow = "auto"
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length
    this.openModal(this.currentIndex)
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    this.openModal(this.currentIndex)
  }

  handleKeyboard(e) {
    if (!this.modal.classList.contains("modal-show")) return

    switch (e.key) {
      case "Escape":
        this.closeModal()
        break
      case "ArrowRight":
        this.nextImage()
        break
      case "ArrowLeft":
        this.prevImage()
        break
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Gallery()
})
