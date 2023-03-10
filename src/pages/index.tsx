import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import NewCategoryForm from "../components/newCategoryForm"

import { api } from "../utils/api";

const Home: NextPage = () => {
  const {data: categories, isLoading } = api.category.getCategories.useQuery();

  const session = useSession();

  let msg

  if(isLoading) return <div>Loading...</div>

  if(session.data?.user){
    msg = (
      <div>
        <h1>Logged in as {session.data.user.name}</h1>
        <button onClick={() => {signOut().catch(console.log)}}>
          Sign Out
        </button>
        <NewCategoryForm />
      </div>
    );
  }else{
    msg = (
      <div>
        <h1>Not logged in</h1>
        <button 
          onClick={() => {signIn('discord').catch(console.log)}}
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>T3 Forum</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {msg}
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

};

export default Home;
