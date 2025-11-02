import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientPreferencesPage from "~/components/client-pages/ClientPreferencesPage";

export default async function PreferencesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <ClientPreferencesPage />;
}
