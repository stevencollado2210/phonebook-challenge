
import "./Contact.css";
import Pagination from "../Pagination/Pagination.jsx";

const Contact = ({
  contacts = [],
  query = "",
  onQueryChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const count = contacts.length;
  const index = Math.max(0, Math.min(count - 1, currentPage - 1));
  const selectedContact = count > 0 ? contacts[index] : null;

  return (
    <>
      <section className="search" aria-labelledby="contacts-heading">
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
          Showing {count} {count === 1 ? "result" : "results"}
        </p>
      </section>

      <section className="contacts" aria-labelledby="contacts-heading">
        {count === 0 ? (
          <p className="search__results">No results found.</p>
        ) : (
          <ul className="contacts__list" data-testid="contacts-list">
            <li className="contact-card" key={selectedContact.id}>
              <div className="contact-card__left">
                <img className="contact-card__photo" src={selectedContact.photo} alt={selectedContact.alt || selectedContact.name} />
              </div>

              <div className="contact-card__center">
                <div className="contact-card__meta">
                  <h3 className="contact-card__name">{selectedContact.name}</h3>
                  <p className="contact-card__role"><strong>Car:</strong> <em>{selectedContact.car}</em></p>
                </div>
              </div>

              <div className="contact-card__right">
                <button
                  className="icon-btn"
                  aria-label={`email ${selectedContact.name}`}
                  title={selectedContact.email}
                  data-tooltip={selectedContact.email}
                >
                  ✉️
                </button>
                <button
                  className="icon-btn"
                  aria-label={`call ${selectedContact.name}`}
                  title={selectedContact.phone}
                  data-tooltip={selectedContact.phone}
                >
                  📞
                </button>
              </div>
            </li>
          </ul>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </section>
    </>
  );
};

export default Contact;
