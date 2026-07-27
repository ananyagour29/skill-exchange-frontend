import { Suspense } from "react";
import EditSkillPage from "./EditSkillPage";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditSkillPage />
    </Suspense>
  );
}