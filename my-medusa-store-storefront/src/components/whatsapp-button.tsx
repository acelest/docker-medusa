import { FaWhatsapp } from "react-icons/fa"

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=237656404052"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center text-2xl text-white transition-all duration-300 bg-green-500 rounded-full shadow-lg bottom-5 right-5 w-14 h-14 hover:bg-white hover:text-green-500 animate-fade-in"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  )
}

// Animation pour l'apparition du bouton
const styles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease forwards;
  }
`

// Ajout du style à la page
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style")
  styleElement.innerHTML = styles
  document.head.appendChild(styleElement)
}

export default WhatsAppButton
