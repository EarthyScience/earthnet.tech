// helper function to convert LaTeX to Unicode
export default function latexToUnicode(str: string): string {
    if (!str) return '';
  
    // Direct replacement for common LaTeX accent patterns
    const directMap: Record<string, string> = {
      "{\\'a}": "á", "{\\'e}": "é", "{\\'i}": "í", "{\\'o}": "ó", "{\\'u}": "ú",
      "{\\'A}": "Á", "{\\'E}": "É", "{\\'I}": "Í", "{\\'O}": "Ó", "{\\'U}": "Ú",
      "{\\\"a}": "ä", "{\\\"o}": "ö", "{\\\"u}": "ü", "{\\\"A}": "Ä", "{\\\"O}": "Ö", "{\\\"U}": "Ü",
      "{\\ss}": "ß"
    };
  
    for (const [pattern, replacement] of Object.entries(directMap)) {
      str = str.replace(new RegExp(pattern, "g"), replacement);
    }
  
    // Combining accent replacements
    const accentCombining: Record<string, string> = {
      "'": "\u0301", "`": "\u0300", "^": "\u0302", '"': "\u0308", "~": "\u0303",
      "=": "\u0304", ".": "\u0307", "u": "\u0306", "v": "\u030C", "H": "\u030B",
      "c": "\u0327", "k": "\u0328", "b": "\u0331", "d": "\u0323", "r": "\u030A", "t": "\u0361"
    };
  
    // Generic escaped accents: \'{e}, \"{o}, etc.
    str = str.replace(/\\([`'"^~=.uvHckdrt])\{?([a-zA-Z])\}?/g, (_, accent, letter) => {
      const comb = accentCombining[accent];
      return comb ? (letter + comb).normalize("NFC") : letter;
    });
  
    // Handle brace-wrapped groups like {Sch{\"o}lkopf}
    str = str.replace(/\{\\([`'"^~=.uvHckdrt])([a-zA-Z])\}/g, (_, accent, letter) => {
      const comb = accentCombining[accent];
      return comb ? (letter + comb).normalize("NFC") : letter;
    });
  
    // Replace escaped symbols like \& \% etc.
    str = str.replace(/\\([&%$#_{}~^])/g, '$1');
  
    // Final cleanup: remove remaining stray braces
    str = str.replace(/[{}]/g, '');
  
    return str.trim();
  }