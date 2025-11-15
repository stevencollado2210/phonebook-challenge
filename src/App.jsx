
// Imports: React hooks, global styles, and the Contact component
import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Contact from "./components/Contact/Contact.jsx";

// Error message shown when a duplicate phone or email is detected during Add Contact.
const DUPLICATE_MSG = "A contact with that phone or email already exists.";

// Contact List (used if fetch to /data/contacts.json fails).
const Contactos = [
  {
      id: 1,
      name: "Keiichi Tsuchiya",
      car: "Toyota AE86 Sprinter Trueno",
      phone: "(555) 010-0101",
      email: "keiichi@email.com",
      photo: "/Images/Keiichi.jpg",
      alt: "Photo of Keiichi Tsuchiya and his Toyota AE86",
  },
  {
      id: 2,
      name: "Kazuhiko Nagata",
      car: "Top Secret Toyota Supra GT-300",
      phone: "(555) 010-0102",
      email: "kazuhiko@email.com",
      photo: "/Images/KazuhikoNagata.jpg",
      alt: "Photo of Kazuhiko Nagata after crashing his old Nissan Skyline GT-R R32",
  },
  {
      id: 3,
      name: "Takumi Fujiwara",
      car: "Toyota Sprinter Trueno AE86 GT-APEX",
      phone: "(555) 010-0103",
      email: "takumi@email.com",
      photo: "/Images/Takumi.jpg",
      alt: "Photo of Takumi Fujiwara",
  },
  {
      id: 4,
      name: "Ken Nomura",
      car: "Nissan Skyline ER34",
      phone: "(555) 010-0104",
      email: "ken@email.com",
      photo: "/Images/Nomuken.jpg",
      alt: "Photo of Ken Nomura driving his Nissan Skyline",
  },
  {
      id: 5,
      name: "Ryosuke Takahashi",
      car: "Mazda Savanna RX-7 (FC3S)",
      phone: "(555) 010-0105",
      email: "ryosuke@email.com",
      photo: "/Images/Ryo.jpg",
      alt: "Photo of Ryosuke Takahashi and his Mazda RX-7",
  },
  {
      id: 6,
      name: "Mako Sato",
      car: "Nissan SilEighty (RPS13)",
      phone: "(555) 010-0106",
      email: "mako@email.com",
      photo: "/Images/Mako.jpg",
      alt: "Photo of Mako Sato's Nissan SilEighty",
  },
  {
      id: 7,
      name: "Reina Akikawa",
      car: "Nissan Skyline GT-R R32",
      phone: "(555) 010-0107",
      email: "reina@email.com",
      photo: "/Images/Reina.jpg",
      alt: "Photo of Reina Akikawa and her Nissan Skyline GT-R R32",
  },
  {
      id: 8,
      name: "Akio Asakura",
      car: "Nissan Fairlady Z (S30)",
      phone: "(555) 010-0108",
      email: "akio@email.com",
      photo: "/Images/Akio.jpg",
      alt: "Photo of Akio Asakura",
  },
  {
      id: 9,
      name: "Tatsuya Shima",
      car: "Porsche 934",
      phone: "(555) 010-0109",
      email: "tatsuya@email.com",
      photo: "/Images/Tatsuya.jpg",
      alt: "Photo of Tatsuya Shima with his girlfriend, Eriko, and his Porsche 934",
  },
  {
      id: 10,
      name: "Yoshiaki Ishida",
      car: "Ferrari Testarossa (F110)",
      phone: "(555) 010-0110",
      email: "ishida@email.com",
      photo: "/Images/Ishida.jpg",
      alt: "Photo of Yoshiaki Ishida driving his Ferrari",
  },
];


// Root App component: holds remote data, search, pagination, and form logic
const App = () => {
        // Data state: fetched contacts (or fallback), loading flag, and error message
        const [contacts, setContacts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");


        // UI state: raw query, debounced query, and current page
        const [query, setQuery] = useState("");
        const [debouncedQuery, setDebouncedQuery] = useState("");
        const [currentPage, setCurrentPage] = useState(1);


        // Effect: fetches contacts from /data/contacts.json with fallback to local list
        useEffect(() => {
            let cancelled = false;
            (async () => {
                try {
                    setLoading(true);
                    const res = await fetch("/data/contacts.json", { cache: "no-store" });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data = await res.json();
                    if (!cancelled) setContacts(Array.isArray(data) ? data : Contactos);
                } catch (e) {
                    if (!cancelled) {
                        setError("Could not load contacts. Showing local list.");
                        setContacts(Contactos);
                    }
                } finally {
                    if (!cancelled) setLoading(false);
                }
            })();
            return () => { cancelled = true; };
        }, []);


        // Effect: debounces query to reduce filtering frequency
        useEffect(() => {
            const id = setTimeout(() => setDebouncedQuery(query), 200);
            return () => clearTimeout(id);
        }, [query]);


        // Effect: resets to first page whenever debounced query changes
        useEffect(() => { setCurrentPage(1); }, [debouncedQuery]);


        // Strips non-digit characters (for phone matching)
        const digits = (s = "") => s.replace(/\D+/g, "");


        // Handler: updates the form field and clears duplicate error message if shown
        const handleFieldChange = (field, value) => {
                    if (error === DUPLICATE_MSG) setError("");
                    setForm(prev => ({ ...prev, [field]: value }));
                };


        // Memo: filters contacts by name OR phone (case-insensitive, digits-only phone)
        const filteredContacts = useMemo(() => {
                const q = debouncedQuery.trim();
                if (!q) return contacts;
                const qLower = q.toLowerCase();
                const qDigits = digits(q);
                return contacts.filter(c => {
                    const nameMatch = c.name.toLowerCase().includes(qLower);
                    const phoneMatch = qDigits ? digits(c.phone).includes(qDigits) : false;
                    return nameMatch || phoneMatch;
                });
        }, [contacts, debouncedQuery]);


    // Memo: resolve photos; use public absolute paths as-is, transform only relative paths
    const resolvedContacts = useMemo(() => filteredContacts.map(c => ({
        ...c,
        photo: c.photo?.startsWith('/') ? c.photo : (c.photo ? new URL(c.photo, import.meta.url).href : c.photo),
    })), [filteredContacts]);


    // Total pages equals number of contacts (one contact per page)
    const totalPages = resolvedContacts.length;


        // Form state: field values + validation error messages
        const [form, setForm] = useState({ name: "", phone: "", email: "" });
        const [errors, setErrors] = useState({ name: "", phone: "", email: "" });


            // Validation: returns error messages for each invalid field
            const validate = (f) => {
                const next = { name: "", phone: "", email: "" };
                if (!f.name || f.name.trim().length < 2) next.name = "Name must be at least 2 characters";
                if (!f.phone || f.phone.trim().length === 0) next.phone = "Phone is required";
                if (!f.email || f.email.trim().length === 0) next.email = "Email is required";
                else if (!f.email.includes("@")) next.email = "Email must include @";
                return next;
            };


        // Submit: validates, checks duplicates, prepends new contacts, and resets form
        // Just discovered the word "prepend" whilst doing Section 4 :)
        function handleSubmit(e) {
            e.preventDefault();
            const v = validate(form);
            setErrors(v);
            const hasError = Object.values(v).some(Boolean);
            if (hasError) return;


            // Prevents duplicates by email or phone
            const emailKey = form.email?.trim().toLowerCase();
            const phoneKey = digits(form.phone);
            const dup = contacts.some(c => (emailKey && c.email?.toLowerCase() === emailKey) || (phoneKey && digits(c.phone) === phoneKey));
            if (dup) {
                setError(DUPLICATE_MSG);
                return;
            }

            // Create new contact and insert at top
            const newContact = {
                id: Date.now(),
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                car: "",
                photo: "",
                alt: form.name.trim(),
            };

            setContacts([newContact, ...contacts]);
            setForm({ name: "", phone: "", email: "" });
            setErrors({ name: "", phone: "", email: "" });
            setCurrentPage(1); // keeps the latest added contact at top visible
        }


    // Below is the page layout with header, contact viewer, add-contact form, and footer
    return (
      <main className="page" data-testid="page-root">
           {/* Header: title of the app*/}
           <header className="page__header">
               <div className="page__header-left">
                   <h1 className="page__title">Hashiriya Book</h1>
               </div>


          </header>
            {/* Contact viewer: search + single contact pagination */}
            <Contact
                contacts={resolvedContacts}
                query={query}
                onQueryChange={setQuery}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                loading={loading}
                error={error}
            />


          {/* Add-contact form section */}
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
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          required
                          minLength={2}
                      />
                      {errors.name && <small className="field__error">{errors.name}</small>}
                  </div>
                  <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <input
                          id="phone"
                          name="phone"
                          inputMode="tel"
                          placeholder="(000) 000-0000"
                          value={form.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          required
                      />
                      {errors.phone && <small className="field__error">{errors.phone}</small>}
                  </div>
                  <div className="field">
                      <label htmlFor="email">Email</label>
                      <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="username@email.com"
                          value={form.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          required
                      />
                      {errors.email && <small className="field__error">{errors.email}</small>}
                  </div>
              </form>
          </section>


          {/* Footer */}
          <footer className="page__footer">
              <small>
                  &copy; 2025 <strong>Hashiriya Book</strong>. 走り屋をつなぐネットワーク
              </small>
          </footer>
      </main>
  );
};

export default App;