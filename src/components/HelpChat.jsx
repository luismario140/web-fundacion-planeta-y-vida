import { FaWhatsapp } from "react-icons/fa";
import "../styles/helpChat.css";

const whatsappUrl =
  "https://wa.me/573122567365?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20la%20Fundaci%C3%B3n%20Social%20Integral%20Planeta%20y%20Vida.";

function HelpChat() {
  return (
    <aside className="help-chat" aria-label="Contacto por WhatsApp">
      <a
        className="help-chat__trigger"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar con la Fundación por WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
        <span>Canal de Atención</span>
      </a>
    </aside>
  );
}

export default HelpChat;
