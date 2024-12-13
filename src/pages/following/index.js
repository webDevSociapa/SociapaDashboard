import LoadingSpinner from "@/app/components/loading";
import { Suspense } from "react";

export default function Following() {
  const DataSet = [{}];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {/* Your component that's being loaded */}
      <h2>{DataSet.length > 0 ? <LoadingSpinner/>:""}</h2>
    </Suspense>
  );
}