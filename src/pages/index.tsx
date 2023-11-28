/* eslint-disable react/no-unescaped-entities */
import { signIn, useSession,  } from "next-auth/react";
import Head from "next/head";
import Dashboard from "@/components/dashboard";
import { api } from "@/utils/api";
import React from "react";
import type { FormData } from "@/types/types";
import Navbar from "@/components/navbar";

export default function Home() {

  const { data: sessionData } = useSession();
  const { data: formData }  = api.form.getAllForms.useQuery()
  

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      {sessionData ? (
        <>
        <Navbar user={sessionData.user} />
        <AuthenticatedContent data={formData}/>
        </>
      ) : ( 
        <LoginPrompt />
      )}
    </>
  );
}

function AuthenticatedContent({data} : {data: FormData[]}) {

  return (
    <>
      <div className="flex relative items-center">
        <Dashboard data={data} />
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
      </div>
    </div>
  );
}
