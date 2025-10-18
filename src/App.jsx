import { useEffect, useMemo, useState } from "react";
import "./App.css";

// Contacts List (may be subject to changes).
const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Keiichi Tsuchiya",
        car: "Toyota AE86 Sprinter Trueno",
        phone: "(555) 010-0101",
        email: "keiichi@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Keiichi Tsuchiya",
    },
    {
        id: 2,
        name: "Kazuhiko Nagata",
        car: "Top Secret Toyota Supra GT-300",
        phone: "(555) 010-0102",
        email: "kazuhiko@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Kazuhiko Nagata",
    },
    {
        id: 3,
        name: "Takumi Fujiwara",
        car: "Toyota Sprinter Trueno AE86 GT-APEX",
        phone: "(555) 010-0103",
        email: "takumi@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Takumi Fujiwara",
    },
    {
        id: 4,
        name: "Ken Nomura",
        car: "Nissan Skyline ER34",
        phone: "(555) 010-0104",
        email: "ken@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Ken Nomura"
    },
    {
        id: 5,
        name: "Ryosuke Takahashi",
        car: "Mazda Savanna RX-7 (FC3S)",
        phone: "(555) 010-0105",
        email: "ryosuke@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Ryosuke Takahashi"
    },
    {
        id: 6,
        name: "Mako Sato",
        car: "Nissan SilEighty (RPS13)",
        phone: "(555) 010-0106",
        email: "mako@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Mako Sato",
    },
    {
        id: 7,
        name: "Reina Akikawa",
        car: "Nissan Skyline GT-R R32",
        phone: "(555) 010-0107",
        email: "reina@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Reina Akikawa",
    },
    {
        id: 8,
        name: "Akio Asakura",
        car: "Nissan Fairlady Z (S30)",
        phone: "(555) 010-0108",
        email: "akio@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Akio Asakura",
    },
    {
        id: 9,
        name: "Tatsuya Shima",
        car: "Porsche 934",
        phone: "(555) 010-0109",
        email: "tatsuya@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Tatsuya Shima",
    },
    {
        id: 10,
        name: "Yoshiaki Ishida",
        car: "Ferrari Testarossa (F110)",
        phone: "(555) 010-0110",
        email: "ishida@email.com",
        photo: "src/assets/photo.png",
        alt: "Photo of Yoshiaki Ishida",
    },
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Hashiriya Book</h1>
                <p className="page__subtitle">Contact Directory</p>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name, phone number or email address"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
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
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>
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
