import "./Contact.css";

const Contact = (props) => {

/*
  props: {
    id: string,
    photo: string,
    alt: string,
    name: string,
    phone: string,
    email: string
  }
*/

    const { name, phone, email } = props;
    return (
        <div className="contact-card">
            <img src={photo} alt={name} />
            <h3>{name}</h3>
            <p>{phone}</p>
            <p>{email}</p>
        </div>
    );
};

export default Contact;
