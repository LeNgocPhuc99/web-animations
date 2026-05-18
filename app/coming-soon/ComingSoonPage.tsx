import { Link } from "react-router";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-10 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 sm:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Link
          to="/"
          className="w-fit text-sm font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
        >
          Back to roadmap
        </Link>
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold uppercase tracking-normal text-teal-700 dark:text-teal-300">
            Coming soon
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            {title}
          </h1>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ComingSoonPage;
