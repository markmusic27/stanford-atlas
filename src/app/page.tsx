import Link from "next/link";
import SearchBar from "~/components/ui/search-bar/SearchBar";

export default function HomePage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SearchBar />
    </main>
  );
}
