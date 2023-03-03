import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "../../utils/api";

const PostPage: NextPage = () => {
  const router = useRouter();
  const session = useSession();
  const id = router.query.id;
  const {data: post, isLoading} = api.post.getPost.useQuery({id: id as string})
  console.log(post)

  if(isLoading) return <div>Loading...</div>

  let msg;

  if (session.data?.user) {
    msg = (
      <div>
        <h1>Logged in as {session.data.user.name}</h1>
        <button
          onClick={() => {
            signOut().catch(console.log);
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    msg = (
      <div>
        <h1>Not logged in</h1>
        <button
          onClick={() => {
            signIn("discord").catch(console.log);
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>T3 Forum</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {msg}
      {post?.title}
      <br />
      {post?.content}
      <br />
      {post?.comments?.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.content}
          </div>
        );
      })
      }
    </>
  );
};

export default PostPage;