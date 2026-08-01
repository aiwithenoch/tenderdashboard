import { useState, useMemo } from "react";
import { Search as SearchIcon } from 'lucide-react';
import SimpleBar from "simplebar-react";
import SidebarContent from "../../vertical/sidebar/sidebaritems";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

function Search() {
  const [query, setQuery] = useState("");

  const searchItems = (items: any[], q: string, parentPath = "") => {
    let results: any[] = [];

    items.forEach((item) => {
      const currentPath = parentPath ? `${parentPath} → ${item.name}` : item.name;

      if (item.name && item.url && item.name.toLowerCase().includes(q.toLowerCase())) {
        results.push({
          name: item.name,
          url: item.url,
          path: currentPath,
          icon: item.icon,
        });
      }

      if (item.items) {
        results = [...results, ...searchItems(item.items, q, currentPath)];
      }
    });

    return results;
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems(SidebarContent, query);
  }, [query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center relative w-xs mx-auto">
        <SearchIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search tender workspace..."
          className="rounded-lg pl-10!"
          required
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div
        className={`absolute w-full bg-card rounded-md top-11 z-10 start-0 shadow-md border border-border ${Boolean(query) ? "block" : "hidden"}`}
      >
        <SimpleBar className="h-72 p-4 custom-scroll">
          {Boolean(results.length) ? (
            results.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={`${item.url}-${index}`}
                  to={item.url}
                  onClick={() => setQuery("")}
                  className="p-2 mb-1.5 last:mb-0 flex items-center bg-input/30 gap-2 text-sm font-medium rounded-md hover:bg-primary/5 hover:text-primary w-full overflow-hidden"
                >
                  <div className="flex items-center">
                    {ItemIcon ? <ItemIcon width={18} height={18} /> : <SearchIcon width={18} height={18} />}
                    <div className="ps-3">
                      <h5 className="mb-1 text-sm group-hover/link:text-primary">{item.name}</h5>
                      <span className="text-xs block truncate max-w-60">{item.path}</span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-medium font-medium">No tender workspace item found</h1>
            </div>
          )}
        </SimpleBar>
      </div>
    </div>
  );
}

export default Search;
