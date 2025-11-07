import "./Contact.css";

const Contact = ({ contacts = [], query = "", onQueryChange, loading, error }) => {
  return (
    <>
      <section className="search" aria-labelledby="search-heading">
        <h2 id="contacts-heading" className="contacts__subtitle">Contacts</h2>
        <div className="search-bar search-bar--fixed-width">
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
            aria-label="Search contacts"
          />
        </div>
        <p className="search__results" data-testid="results-count">
          Showing {contacts.length} {contacts.length === 1 ? "result" : "results"}
          {loading ? " (loading...)" : ""}
          {error ? ` (error: ${error})` : ""}
        </p>
      </section>

      <section className="contacts" aria-labelledby="contacts-heading">
        <ul className="contacts__list" data-testid="contacts-list">
          {contacts.map((c) => (
            <li className="contact-card" key={c.id}>
              <div className="contact-card__left">
                <img className="contact-card__photo" src={c.photo} alt={c.alt || c.name} />
              </div>

              <div className="contact-card__center">
                <div className="contact-card__meta">
                  <h3 className="contact-card__name">{c.name}</h3>
                </div>
              </div>

              <div className="contact-card__right">
                <button
                  className="icon-btn"
                  aria-label={`email ${c.name}`}
                  title={c.email}
                  data-tooltip={c.email}
                >
                  ✉️
                </button>
                <button
                  className="icon-btn"
                  aria-label={`call ${c.name}`}
                  title={c.phone}
                  data-tooltip={c.phone}
                >
                  📞
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Contact;
