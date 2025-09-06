import ClientHomePage from "~/components/client-pages/ClientHomePage";

export default function HomePage() {
  async function submitAction(formData: FormData) {
    "use server";
    const queryValue = formData.get("query");
    const query = (typeof queryValue === "string" ? queryValue : "").trim();
    // TODO: implement your server-side logic with `query`
    console.log("Search submitted:", query);
  }
  return <ClientHomePage />;
}
