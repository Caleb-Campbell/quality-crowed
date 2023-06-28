import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import { Textarea } from "~/src/components/ui/textarea";
import { Button } from "~/src/components/ui/button";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-foreground">
       <SloganGenerator />
      </main>
    </>
  );
}

 
 
function SloganGenerator() {
  const [completion, setCompletion] = useState<string>("")
  const [input, setInput] = useState<string>("")

  const ai = api.ai.create.useMutation()

  const getResponse = async (input: string) => {
    await ai.mutateAsync({prompt: input})
  }

  const submit = (e: any ) =>{
    e.preventDefault()
    getResponse(input)
}

useEffect(() => {
  if(ai.data && ai.isSuccess){
    setCompletion(ai.data)
  }
}, [ai.isSuccess])

useEffect
 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={submit}>
        <Textarea
          className="fixed w-full text-white max-w-md bottom-0 rounded mb-8 shadow-xl p-2 ouline:none focus:outline-0"
          value={input}
          placeholder="Describe your business..."
          onChange={(e) => setInput(e.target.value)}
        />
      <Button type="submit">Thingy</Button>
      </form>
      <div className="text-white whitespace-pre-wrap my-6">{completion}</div>
    </div>
  );
}