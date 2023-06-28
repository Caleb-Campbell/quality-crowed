import { openai } from "../utils/openai"
import { ChatCompletionRequestMessage } from 'openai'
 
export async function useAI(prompt: string) {
    let response
    const setup: ChatCompletionRequestMessage = {
        role: 'system',
        content: `You have just receieved a problem a developer is trying to solve. This developer only understands javascript arrays, so everything you return must be in Javascript format. Give the developer 5 questions they should ask themselves to better understand the problem. The questions should be in an array of objects, like this:
        [
            {
                id: 1,
                question: "What is the problem?",
                answer: ""
            },
            {
                id: 2,
                question: "What parts of the codebase will this feature affect?",
                answer: ""
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
    temperature: 0.6,
    messages: [input, setup],
  })
  if(response.data.choices[0]?.message?.content){
    const questions = JSON.parse(response.data.choices[0].message.content)
    
    const askQuestion: ChatCompletionRequestMessage = {
        role: 'system',
        content: `You will receieve an object containing a question. You must ask the user/developer this question.`,
  }

  return response.data.choices[0].message.content

}
}