import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import Calendar from "../components/calendar/Calendar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bookit</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        <div className="flex flex-col gap-2 text-2xl font-bold text-light">
          <Link href="/auth/signin">Zaloguj</Link>
          <Link href="/new-service">Nowy serwis</Link>
          <Calendar />
        </div>
      </main>
    </>
  );
};

export default Home;
