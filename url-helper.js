// Decides whether input text looks like a bare domain (e.g. "github.com/you")
// that's missing a protocol, so we can prepend "https://" before encoding it.
function looksLikeBareDomain(text) {
  const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(text);
  if (hasProtocol) return false;

  // matches things like "github.com/you" or "example.co.uk" but not plain sentences
  const domainPattern = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/\S*)?$/;
  return domainPattern.test(text) && !text.includes(" ");
}

// Works as a plain <script> global in the browser, and as a module in Node for tests.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { looksLikeBareDomain };
}
