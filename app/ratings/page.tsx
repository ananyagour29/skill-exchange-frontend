import { Suspense } from "react";
import GiveRatingPage from "./GiveRatingPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GiveRatingPage />
    </Suspense>
  );
}