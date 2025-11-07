import { useMemo, useState } from "react";
import "./App.css";
import Contact from "./components/Contact/Contact.jsx";

// Contacts List (may be subject to changes).
const Contactos = [
  {
      id: 1,
      name: "Keiichi Tsuchiya",
      car: "Toyota AE86 Sprinter Trueno",
      phone: "(555) 010-0101",
      email: "keiichi@email.com",
      photo: "./Images/Keiichi.jpg",
      alt: "Photo of Keiichi Tsuchiya and his Toyota AE86",
  },
  {
      id: 2,
      name: "Kazuhiko Nagata",
      car: "Top Secret Toyota Supra GT-300",
      phone: "(555) 010-0102",
      email: "kazuhiko@email.com",
      photo: "./Images/KazuhikoNagata.jpg",
      alt: "Photo of Kazuhiko Nagata after crashing his old Nissan Skyline GT-R R32",
  },
  {
      id: 3,
      name: "Takumi Fujiwara",
      car: "Toyota Sprinter Trueno AE86 GT-APEX",
      phone: "(555) 010-0103",
      email: "takumi@email.com",
      photo: "./Images/Takumi.jpg",
      alt: "Photo of Takumi Fujiwara",
  },
  {
      id: 4,
      name: "Ken Nomura",
      car: "Nissan Skyline ER34",
      phone: "(555) 010-0104",
      email: "ken@email.com",
      photo: "./Images/Nomuken.jpg",
      alt: "Photo of Ken Nomura driving his Nissan Skyline",
  },
  {
      id: 5,
      name: "Ryosuke Takahashi",
      car: "Mazda Savanna RX-7 (FC3S)",
      phone: "(555) 010-0105",
      email: "ryosuke@email.com",
      photo: "./Images/Ryo.jpg",
      alt: "Photo of Ryosuke Takahashi and his Mazda RX-7",
  },
  {
      id: 6,
      name: "Mako Sato",
      car: "Nissan SilEighty (RPS13)",
      phone: "(555) 010-0106",
      email: "mako@email.com",
      photo: "./Images/Mako.jpg",
      alt: "Photo of Mako Sato's Nissan SilEighty",
  },
  {
      id: 7,
      name: "Reina Akikawa",
      car: "Nissan Skyline GT-R R32",
      phone: "(555) 010-0107",
      email: "reina@email.com",
      photo: "./Images/Reina.jpg",
      alt: "Photo of Reina Akikawa and her Nissan Skyline GT-R R32",
  },
  {
      id: 8,
      name: "Akio Asakura",
      car: "Nissan Fairlady Z (S30)",
      phone: "(555) 010-0108",
      email: "akio@email.com",
      photo: "./Images/Akio.jpg",
      alt: "Photo of Akio Asakura",
  },
  {
      id: 9,
      name: "Tatsuya Shima",
      car: "Porsche 934",
      phone: "(555) 010-0109",
      email: "tatsuya@email.com",
      photo: "./Images/Tatsuya.jpg",
      alt: "Photo of Tatsuya Shima with his girlfriend, Eriko, and his Porsche 934",
  },
  {
      id: 10,
      name: "Yoshiaki Ishida",
      car: "Ferrari Testarossa (F110)",
      phone: "(555) 010-0110",
      email: "ishida@email.com",
      photo: "./Images/Ishida.jpg",
      alt: "Photo of Yoshiaki Ishida driving his Ferrari",
  },
];


const App = () => {
    const [contacts] = useState(Contactos);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState("");

    // This makes a copy of contacts where each photo path is turned into a real URL.
    // Allows the contact list to show the images instead of broken ones / 404s.
    const resolvedContacts = useMemo(
        () =>
            contacts.map((c) => ({
                ...c,
                photo: new URL(c.photo, import.meta.url).href,
            })),
        [contacts]
    );


  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  function handleSubmit(e) {
      e.preventDefault();
      // Add contact submission logic here
  }


  return (
      <main className="page" data-testid="page-root">
           <header className="page__header">
               <div className="page__header-left">
                   <h1 className="page__title">Hashiriya Book</h1>
               </div>


          </header>
            <Contact
                contacts={resolvedContacts}
                query={query}
                onQueryChange={setQuery}
                loading={loading}
                error={error}
            />


          <section className="form" aria-labelledby="form-heading">
              <div className="form__header">
                  <h2 id="form-heading">Add a Contact</h2>
                  <button className="btn" type="submit" form="add-contact-form" data-testid="btn-add">
                      Add Contact
                  </button>
              </div>
              <form id="add-contact-form" className="form__body" onSubmit={handleSubmit} noValidate>
                  <div className="field">
                      <label htmlFor="name">Name</label>
                      <input
                          id="name"
                          name="name"
                          value={form.name}
                          placeholder="Enter your first and last name"
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          minLength={2}
                      />
                  </div>
                  <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <input
                          id="phone"
                          name="phone"
                          inputMode="tel"
                          placeholder="(000) 000-0000"
                          value={form.phone}
                          onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                          }
                          required
                      />
                  </div>
                  <div className="field">
                      <label htmlFor="email">Email</label>
                      <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="username@email.com"
                          value={form.email}
                          onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                          }
                      />
                    
                    
                  </div>
                  <div className="form__actions">
                      {/* submit moved to header */}
                  </div>
              </form>
          </section>


          <footer className="page__footer">
              <small>
                  &copy; 2025 <strong>Hashiriya Book</strong>. 走り屋をつなぐネットワーク
              </small>
          </footer>
      </main>
  );
};

export default App;