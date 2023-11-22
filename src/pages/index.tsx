/* eslint-disable react/no-unescaped-entities */
import { signIn, signOut, useSession,  } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/navbar";
import Dashboard from "@/components/dashboard";
import type { SessionData } from "@/types/types";  

export default function Home() {

  const { data: sessionData }  = useSession();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      {sessionData ? (
        <AuthenticatedContent sessionData={sessionData} />
      ) : ( 
        <LoginPrompt />
      )}
    </>
  );
}

function AuthenticatedContent({ sessionData }: { sessionData: SessionData}) {

  const user = sessionData.user;
  return (
    <>
      <div className="flex relative">
        <Navbar user={user}/>
        <Dashboard />
      </div>
    </>
  );
}

function LoginPrompt() {
  return (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative z-10 w-96 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
        <p className="mb-6 text-center text-3xl font-extrabold text-gray-800 dark:text-white">
          Welcome Back!
        </p>
        <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Please log in to access the full website.
        </p>
        <button
          className="w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 py-3 font-semibold text-white transition hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 dark:text-gray-800"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
        <button
          className="bg-grladient-to-r w-full rounded-full from-blue-500 via-blue-600 to-blue-700 py-3 font-semibold text-white transition hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 dark:text-gray-800"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
