import { openai } from "../utils/openai"
import { type ChatCompletionRequestMessage } from 'openai'
 
export async function useAI({
    prompt,
    promptType,
}:{
    prompt: string
    promptType: string
}

) {

    if(promptType === 'getQuestions') {

    let response

    const setup: ChatCompletionRequestMessage = {
        role: 'system',
        content: `You have just receieved a problem a developer is trying to solve. This developer only understands javascript arrays, so everything you return must be in Javascript format. Give the developer 5 questions they should ask themselves to better understand the problem. The questions should be in an array of objects, like this:
        [
            {
                "id": "1",
                "question": "What is the problem?",
                "answer": ""
            },
            {
                "id": "2",
                "question": "What parts of the codebase will this feature affect?",
                "answer": ""
            }
        ]

        Always leave the answer blank. This is for the user to fill out. Do not label the questions, you will return only the array. Do not return anything else.
        
        `
    }

    const input: ChatCompletionRequestMessage = {
        role: 'user',
        content: prompt
    }

   response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.9,
    messages: [input, setup],
  })
  if(response.data.choices[0]?.message?.content){
    console.log(response.data.choices[0].message.content)
    const firstQuestion = JSON.parse(response.data.choices[0].message.content)[0].question
  return firstQuestion

}

}

if(promptType === 'askQuestionByIndex'){
    
}


}