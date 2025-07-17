"use client"
import { useState, useEffect, useRef, useCallback } from "react";

interface BibEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
  year: string;
  searchText: string;
}

interface BibliographySearchProps {
  bibData: string;
}

const BibliographySearch: React.FC<BibliographySearchProps> = ({ bibData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEntries, setFilteredEntries] = useState<BibEntry[]>([]);
  const [allEntries, setAllEntries] = useState<BibEntry[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parse BibTeX data
  const parseBibTeX = useCallback((bibText: string): BibEntry[] => {
    const entries: BibEntry[] = [];
    const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
    let match: RegExpExecArray | null;

    while ((match = entryRegex.exec(bibText)) !== null) {
      const [, type, key, fieldsText] = match;
      const fields: Record<string, string> = {};
      
      // Parse fields
      const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
      let fieldMatch: RegExpExecArray | null;
      
      while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
        const [, fieldName, fieldValue] = fieldMatch;
        fields[fieldName] = fieldValue;
      }

      // Handle string values with quotes
      const stringFieldRegex = /(\w+)\s*=\s*"([^"]*)"/g;
      let stringMatch: RegExpExecArray | null;
      
      while ((stringMatch = stringFieldRegex.exec(fieldsText)) !== null) {
        const [, fieldName, fieldValue] = stringMatch;
        fields[fieldName] = fieldValue;
      }

      entries.push({
        type,
        key,
        fields,
        year: fields.year || 'Unknown',
        searchText: `${key} ${Object.values(fields).join(' ')}`.toLowerCase()
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
    const { type, key, fields } = entry;
    const title = fields.title || 'Untitled';
    const authors = formatAuthors(fields.author);
    const year = fields.year || '';
    const journal = fields.journal || fields.booktitle || '';
    const publisher = fields.publisher || '';

    return (
      <li key={key} className="mb-4 p-4 border-l-4 rounded-r-lg">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-lg">
            {highlightText(title, searchTerm)}
          </h3>
          
          {/* Authors */}
          {authors && (
            <div className="">
              <span className="font-medium">Authors: </span>
              {highlightText(authors, searchTerm)}
            </div>
          )}
          
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
                {highlightText(fields.abstract, searchTerm)}
              </span>
            </div>
          )}
          
          {/* Entry type and key */}
          <div className="text-xs text-gray-400 mt-2">
            Type: {type} | Key: {key}
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
    </div>
  );
};

export default BibliographySearch;