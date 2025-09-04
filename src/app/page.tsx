import Peripherals from "~/components/peripherals/Peripherals";
import SearchBar from "~/components/search-bar/SearchBar";
import Logo from "~/components/ui/Logo";

export default function HomePage() {
  async function submitAction(formData: FormData) {
    "use server";
    const queryValue = formData.get("query");
    const query = (typeof queryValue === "string" ? queryValue : "").trim();
    // TODO: implement your server-side logic with `query`
    console.log("Search submitted:", query);
  }
  return (
    <main className="relative h-[100dvh] w-full">
      {/* Chat Window */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[800px] flex-col px-[8px] md:px-[16px]">
        <div className="flex-1" />
        <Logo />
        <div className="h-[10dvh] max-h-[95px] min-h-[40px]" />
        <SearchBar action={submitAction} />
        <div className="h-[32px]" />
        <Peripherals />
        <div className="flex-2" />
      </div>
      {/* ADD COURSES LAST UPDATED... */}
    </main>
  );
}
