import style from "./Contact.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Contact() {
  return (
    <div className={style.container}>
      <div className={style.contact_info}>
        <div className={style.info_box}>
          <div className={style.icon}>
            <FaPhoneAlt />
          </div>

          <div>
            <h3>Call To Us</h3>

            <p>We are available 24/7, 7 days a week.</p>

            <span>Phone: +998990903740</span>
          </div>
        </div>

        <div className={style.line}></div>

        <div className={style.info_box}>
          <div className={style.icon}>
            <MdEmail />
          </div>

          <div>
            <h3>Write To US</h3>

            <p>Fill out our form and we will contact you within 24 hours.</p>

            <span>Emails: customer@exclusive.com</span>
            <span>Emails: support@exclusive.com</span>
          </div>
        </div>
      </div>

      <form className={style.contact_form}>
        <div className={style.input_row}>
          <input type="text" placeholder="Your Name *" />
          <input type="email" placeholder="Your Email *" />
          <input type="text" placeholder="Your Phone *" />
        </div>

        <textarea placeholder="Your Message"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
