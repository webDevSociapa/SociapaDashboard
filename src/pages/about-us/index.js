import Loading from "@/app/components/loading";

export default function About() {
    return (
      <Suspense fallback={<Loading />}>
        <div>
        <p>Welcome to the About Us page. Here you can learn more about our company.</p>
        </div>
        </Suspense>
    );
  }
  