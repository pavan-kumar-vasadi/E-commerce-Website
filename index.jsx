// your code goes here
const { useState, useEffect } = React;

const accessories = [
  "Shoes",
  "Chains",
  "Rings",
  "Bag",
  "Watch",
  "Sunglasses",
  "cap"
];

function AccessoriesSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (results.length > 0) {
      const sectionId = results[0].toLowerCase();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = accessories.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div id="search-container">
      <form onSubmit={handleSubmit}>
        <input
          id="search-input"
          type="search"
          placeholder="Search your item 🔍"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div id="results">
        {results.length > 0 ? (
          results.map(item => (
            <p
              key={item}
              className="result-item"
              onClick={() => {
                const section = document.getElementById(item.toLowerCase());
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {item}
            </p>
          ))
        ) : (
          query && <p>No results found</p>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AccessoriesSearch />
);
