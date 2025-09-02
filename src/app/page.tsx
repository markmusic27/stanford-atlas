import Peripherals from "~/components/peripherals/Peripherals";
import SearchBar from "~/components/search-bar/SearchBar";

export default function HomePage() {
  async function submitAction(formData: FormData) {
    "use server";
    const query = String(formData.get("query") ?? "").trim();
    // TODO: implement your server-side logic with `query`
    console.log("Search submitted:", query);
  }
  return (
    <main className="relative h-screen w-full">
      {/* Chat Window */}
      <div className="mx-auto flex h-full w-full max-w-[800px] flex-col px-[16px]">
        <div className="h-[200px]" /> {/* TEMPORARY */}
        <SearchBar action={submitAction} />
        <div className="h-[32px]" />
        <Peripherals />
      </div>
    </main>
  );
}
