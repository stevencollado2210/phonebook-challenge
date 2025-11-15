
// Import styles and the Pagination component
import "./Contact.css";
import Pagination from "../Pagination/Pagination.jsx";


// Component: shows a search bar, the selected contact card, and pagination controls
const Contact = ({
  contacts = [],
  query = "",
  onQueryChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  loading = false,
  error = "",
}) => {


  // Computes the currently selected contact based on the current page (1-based)
  const count = contacts.length;
  const index = Math.max(0, Math.min(count - 1, currentPage - 1));
  const selectedContact = count > 0 ? contacts[index] : null;


  // Highlight bonus: wraps matching query text in <mark class="hl"> … </mark>
  // It’s like using a highlighter pen on a page.
  const highlight = (text, q) => {
    if (!q) return text;
    try {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(escaped, "ig");
      return text.replace(re, (m) => `<mark class=\"hl\">${m}</mark>`);
    } catch { return text; }
  };


  // Precomputes highlighted name markup for the selected contact
  const nameHtml = selectedContact ? highlight(selectedContact.name, query) : "";


  // Search input + results count, contact card (if any), and pagination
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
          {loading ? "Loading contacts…" : (
            <>Showing {count} {count === 1 ? "result" : "results"}</>
          )}
        </p>
      </section>

      <section className="contacts" aria-labelledby="contacts-heading">
        {error && !loading && (
          <p className="field__error" role="alert">{error}</p>
        )}
        {loading ? (
          <p className="search__results">Please wait…</p>
        ) : count === 0 ? (
          <p className="search__results">No results found.</p>
        ) : (
          <ul className="contacts__list" data-testid="contacts-list">
            <li className="contact-card" key={selectedContact.id}>
              <div className="contact-card__left">
                <img className="contact-card__photo" src={selectedContact.photo} alt={selectedContact.alt || selectedContact.name} />
              </div>

              <div className="contact-card__center">
                <div className="contact-card__meta">
                  <h3 className="contact-card__name" dangerouslySetInnerHTML={{ __html: nameHtml }} />
                  {selectedContact.car && (
                    <p className="contact-card__role"><strong>Car:</strong> <em>{selectedContact.car}</em></p>
                  )}
                </div>
              </div>

              <div className="contact-card__right">
                <button
                  className="icon-btn"
                  aria-label={`email ${selectedContact.name}`}
                  title={selectedContact.email || "No email"}
                  data-tooltip={selectedContact.email || "No email"}
                >
                  ✉️
                </button>
                <button
                  className="icon-btn"
                  aria-label={`call ${selectedContact.name}`}
                  title={selectedContact.phone || "No phone"}
                  data-tooltip={selectedContact.phone || "No phone"}
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