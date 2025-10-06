import ClientPersonalizationPage from "~/components/client-pages/ClientPersonalizationPage";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PersonalizationPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <ClientPersonalizationPage />;
}
