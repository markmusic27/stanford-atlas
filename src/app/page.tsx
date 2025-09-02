import SearchBar from "~/components/ui/search-bar/SearchBar";

export default function HomePage() {
  async function submitAction(formData: FormData) {
    "use server";
    const query = String(formData.get("query") ?? "").trim();
    // TODO: implement your server-side logic with `query`
    console.log("Search submitted:", query);
  }
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SearchBar action={submitAction} />
    </main>
  );
}
