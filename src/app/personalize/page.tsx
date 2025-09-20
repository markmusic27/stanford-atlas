import Link from "next/link";
import ClientPersonalizationPage from "~/components/client-pages/ClientPersonalizationPage";
import PersonalizationField from "~/components/personalization-field/PersonalizationField";
import Card from "~/components/ui/card/Card";
import Logo from "~/components/ui/Logo";
import SaveButton from "~/components/ui/SaveButton";
import { usePageTransitionStore } from "~/store/pageTransition.store";

export default function PersonalizationPage() {
  return <ClientPersonalizationPage />;
}
