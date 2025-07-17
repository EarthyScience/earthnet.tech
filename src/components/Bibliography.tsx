"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import latexToUnicode from "@/utils/latexToUnicode";
import Image from "next/image";

interface BibEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
  year: string;
  searchText: string;
  raw?: string; // Add raw BibTeX
}

interface BibliographySearchProps {
  bibData: string;
}

const BibliographySearch: React.FC<BibliographySearchProps> = ({ bibData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEntries, setFilteredEntries] = useState<BibEntry[]>([]);
  const [allEntries, setAllEntries] = useState<BibEntry[]>([]);
  const [openBibtexKey, setOpenBibtexKey] = useState<string | null>(null); // Track open modal
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parse BibTeX data
  const parseBibTeX = useCallback((bibText: string): BibEntry[] => {
    const entries: BibEntry[] = [];
    const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
    let match: RegExpExecArray | null;

    // Helper to extract a field value with nested braces
    function extractFieldValue(text: string, startIdx: number): [string, number] {
      let value = '';
      let braceCount = 0;
      let i = startIdx;
      let started = false;
      while (i < text.length) {
        const char = text[i];
        if (char === '{') {
          braceCount++;
          started = true;
          if (braceCount > 1) value += char;
        } else if (char === '}') {
          braceCount--;
          if (braceCount === 0 && started) {
            i++; // move past closing brace
            break;
          }
          if (braceCount >= 1) value += char;
        } else {
          value += char;
        }
        i++;
      }
      return [value, i];
    }

    while ((match = entryRegex.exec(bibText)) !== null) {
      const [, type, key, fieldsText] = match;
      const fields: Record<string, string> = {};
      let i = 0;
      while (i < fieldsText.length) {
        // Skip whitespace and commas
        while (i < fieldsText.length && /[\s,]/.test(fieldsText[i])) i++;
        // Find field name
        const nameStart = i;
        while (i < fieldsText.length && /[\w]/.test(fieldsText[i])) i++;
        const fieldName = fieldsText.slice(nameStart, i).trim();
        if (!fieldName) break;
        // Skip whitespace and '='
        while (i < fieldsText.length && /[\s=]/.test(fieldsText[i])) i++;
        // Field value can be in braces or quotes
        let fieldValue = '';
        if (fieldsText[i] === '{') {
          const [value, nextIdx] = extractFieldValue(fieldsText, i);
          fieldValue = value;
          i = nextIdx;
        } else if (fieldsText[i] === '"') {
          i++;
          let value = '';
          while (i < fieldsText.length && fieldsText[i] !== '"') {
            value += fieldsText[i++];
          }
          i++; // skip closing quote
          fieldValue = value;
        } else {
          // Unbraced value (rare)
          let value = '';
          while (i < fieldsText.length && /[^,\n]/.test(fieldsText[i])) {
            value += fieldsText[i++];
          }
          fieldValue = value.trim();
        }
        fields[fieldName] = fieldValue;
      }
      // Store the raw BibTeX for this entry
      const raw = bibText.slice(match.index, entryRegex.lastIndex).trim();
      entries.push({
        type,
        key,
        fields,
        year: fields.year || 'Unknown',
        searchText: `${key} ${Object.values(fields).join(' ')}`.toLowerCase(),
        raw,
      });
    }

    return entries.sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
  }, []);

  // Initialize entries from bibData
  useEffect(() => {
    if (bibData) {
      const parsed = parseBibTeX(bibData);
      setAllEntries(parsed);
      setFilteredEntries(parsed);
    }
  }, [bibData, parseBibTeX]);

  // Filter entries based on search term
  const filterEntries = useCallback((searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredEntries(allEntries);
      return;
    }

    const filtered = allEntries.filter((entry: BibEntry) => 
      entry.searchText.includes(searchValue.toLowerCase())
    );
    
    setFilteredEntries(filtered);
  }, [allEntries]);

  // Handle hash changes
  useEffect(() => {
    const updateFromHash = () => {
      const hashValue = decodeURIComponent(window.location.hash.substring(1));
      setSearchTerm(hashValue);
      filterEntries(hashValue);
    };

    const handleHashChange = () => {
      updateFromHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    updateFromHash(); // Initial load

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [filterEntries]);

  // Handle input changes with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      filterEntries(value);
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Highlight search term in text
  const highlightText = (text: string, search: string): React.ReactNode => {
    if (!search.trim()) return text;
    
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  // Format author names
  const formatAuthors = (authors: string | undefined): string => {
    if (!authors) return '';
    return authors.split(' and ').map(author => {
      // Handle "Last, First" format
      if (author.includes(',')) {
        const [last, first] = author.split(',').map(s => s.trim());
        return `${first} ${last}`;
      }
      return author;
    }).join(', ');
  };

  // Render a single bibliography entry
  const renderEntry = (entry: BibEntry): React.ReactElement => {
    const { type, key, fields, raw } = entry;
    const title = latexToUnicode(fields.title || 'Untitled');
    const authors = latexToUnicode(formatAuthors(fields.author));
    const year = fields.year || '';
    const journal = latexToUnicode(fields.journal || fields.booktitle || '');
    const publisher = latexToUnicode(fields.publisher || '');
    const abbr = fields.abbr ? latexToUnicode(fields.abbr) : null;
    const previewSrc = fields.preview ? `/${fields.preview.replace(/^\/+/, '')}` : null;

    return (
      <li key={key} className="mb-4 p-4 border-l-4 rounded-r-lg">
        {/* Top: Title and Authors only */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg">
            {highlightText(title, searchTerm)}
          </h3>
          {authors && (
            <div className="">
              <span className="font-medium">Authors: </span>
              {highlightText(authors, searchTerm)}
            </div>
          )}
        </div>
        {/* Responsive: All other fields left, abbr/thumbnail right (md: row, base: col) */}
        <div className="flex flex-col md:flex-row gap-4 items-start py-2">
          {/* left: Abbr and Thumbnail Preview only (responsive, on top for small screens) */}
          {(abbr || previewSrc) && (
            <div className="flex flex-col items-start justify-start min-w-[96px] max-w-[128px] gap-2 flex-shrink-0 w-full md:w-auto mb-4 md:mb-0 order-first md:order-none">
              {abbr && (
                <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded align-middle mb-1">
                  {abbr}
                </span>
              )}
              {previewSrc && (
                <Image
                  src={`/publication_preview${previewSrc}`}
                  alt={abbr ? `${abbr} preview` : 'Preview'}
                  className="rounded-lg shadow max-h-40 object-contain -mt-2"
                  width={128}
                  height={160}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.endsWith('/publication_preview/placeholder.jpg')) {
                      target.src = '/publication_preview/placeholder.jpg';
                    }
                  }}
                />
              )}
            </div>
          )}
          {/* Left: All other fields */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Publication info */}
            <div className="text-sm text-gray-500 space-y-1">
              {journal && (
                <div>
                  <span className="font-medium">Published in: </span>
                  {highlightText(journal, searchTerm)}
                </div>
              )}
              {publisher && (
                <div>
                  <span className="font-medium">Publisher: </span>
                  {highlightText(publisher, searchTerm)}
                </div>
              )}
              {year && (
                <div>
                  <span className="font-medium">Year: </span>
                  {highlightText(year, searchTerm)}
                </div>
              )}
              {fields.volume && (
                <div>
                  <span className="font-medium">Volume: </span>
                  {fields.volume}
                  {fields.number && ` (${fields.number})`}
                  {fields.pages && `, pages ${fields.pages}`}
                </div>
              )}
            </div>
            {/* Abstract */}
            {fields.abstract && (
              <div className="mt-3 p-3 bg-white rounded border-l-2 border-gray-300">
                <span className="font-medium text-gray-700">Abstract: </span>
                <span className="text-gray-600 text-sm">
                  {highlightText(latexToUnicode(fields.abstract), searchTerm)}
                </span>
              </div>
            )}
            {/* Resource Buttons */}
            {(fields.pdf || fields.code || fields.bibtex_show) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {fields.pdf && (
                  <a
                    href={fields.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-[var(--sh-class)] text-white rounded hover:bg-[var(--accent-3)] transition-colors text-sm font-medium shadow"
                  >
                    PDF
                  </a>
                )}
                {fields.code && (
                  <a
                    href={fields.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-[var(--sh-property)] text-white rounded hover:bg-[var(--sh-sign)] transition-colors text-sm font-medium shadow"
                  >
                    Code
                  </a>
                )}
                {fields.bibtex_show && raw && (
                  <button
                    type="button"
                    onClick={() => setOpenBibtexKey(key)}
                    className="inline-block px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium shadow"
                  >
                    BibTeX
                  </button>
                )}
              </div>
            )}
            {/* Entry type and key */}
            <div className="text-xs text-gray-400 mt-2">
              Type: {type} | Key: {key}
            </div>
          </div>
        </div>
      </li>
    );
  };

  // Group entries by year
  const groupedEntries: Record<string, BibEntry[]> = filteredEntries.reduce((groups, entry) => {
    const year = entry.year || 'Unknown';
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(entry);
    return groups;
  }, {} as Record<string, BibEntry[]>);

  const years = Object.keys(groupedEntries).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return b.localeCompare(a);
  });

  // BibTeX Modal
  const openEntry = allEntries.find(e => e.key === openBibtexKey);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          id="bibsearch"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search bibliography (authors, titles, keywords...)..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredEntries.length} of {allEntries.length} entries
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Bibliography Entries */}
      <div className="space-y-6">
        {years.map(year => (
          <div key={year} className="bibliography-section">
            <h2 className="text-2xl font-bold mb-4 border-b-1 border-gray-300 pb-2">
              {year}
            </h2>
            <ol className="space-y-4">
              {groupedEntries[year].map(renderEntry)}
            </ol>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredEntries.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            No entries found for `{searchTerm}`
          </div>
          <div className="text-gray-500 text-sm mt-2">
            Try different keywords or check your spelling
          </div>
        </div>
      )}
      {/* BibTeX Modal */}
      {openEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--navbar-bg)]">
          <div className="bg-[var(--background)] rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setOpenBibtexKey(null)}
              aria-label="Close BibTeX modal"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2">BibTeX Entry</h3>
            <pre className="bg-gray-100 rounded p-3 overflow-x-auto text-xs whitespace-pre-wrap">
              {openEntry.raw}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibliographySearch;