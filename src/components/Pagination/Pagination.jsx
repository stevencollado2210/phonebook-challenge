
// Import styles for the pagination UI
import "./Pagination.css";


// Helper: clamps a number between min and max (inclusive)
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


// Component: renders Prev/Next controls and numbered page buttons
const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const safePage = clamp(currentPage, 1, Math.max(1, totalPages));   
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);

  
  // Navigate to a page safely and notify parent only if it changes
  const goTo = (p) => {
    if (!onPageChange) return;
    const next = clamp(p, 1, Math.max(1, totalPages));
    if (next !== safePage) onPageChange(next);
  };


  // Render the pagination navigation (Prev, page list, Next)
  return (
    <nav className="pagination" aria-label="Pagination">
      {/* Previous page button */}
      <button
        className="pagination__btn pagination__btn--nav"
        type="button"
        onClick={() => goTo(safePage - 1)}
        disabled={safePage <= 1}
        aria-label="Go to previous page"
      >
        <span aria-hidden>{"< Back"}</span>
      </button>


      {/* Page number buttons */}
      <ul className="pagination__list" role="list">
        {pages.map((p) => (
          <li key={p} className="pagination__item">
            <button
              type="button"
              className={
                "pagination__btn" + (p === safePage ? " pagination__btn--active" : "")
              }
              aria-current={p === safePage ? "page" : undefined}
              aria-label={`Go to page ${p}`}
              onClick={() => goTo(p)}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>


      {/* Next page button */}
      <button
        className="pagination__btn pagination__btn--nav"
        type="button"
        onClick={() => goTo(safePage + 1)}
        disabled={safePage >= totalPages}
        aria-label="Go to next page"
      >
        <span aria-hidden>{"Next >"}</span>
      </button>
    </nav>
  );
};

export default Pagination;