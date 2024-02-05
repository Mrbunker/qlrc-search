import { Suspense } from "react";
import MusicSearch from "./components/MusicSearch";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MusicSearch />
    </Suspense>
  );
}
