import { Suspense } from "react";
import MusicSearch from "./components/MusicSearch";
import PageContainer from "./components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <MusicSearch />
      </Suspense>
    </PageContainer>
  );
}
