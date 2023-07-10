import { openai } from "../utils/openai"
import { type ChatCompletionRequestMessage } from 'openai'
 
export async function createQuestions({
    prompt,
}:{
    prompt: string
}

) {


    let response

    const setup: ChatCompletionRequestMessage = {
        role: 'system',
        content: `You have just receieved a problem a developer is trying to solve. This developer only understands javascript arrays, so everything you return must be in Javascript format. Give the developer 6 questions they should ask themselves to better understand the problem. The questions should be in an array of objects, like this:
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

        Always leave the answer blank. This is for the user to fill out. Do not label the questions, you will return only the array. Do not return anything else. The questions should be specific to any technologies the user mentioned. These should not be yes or no questions, they should be open ended and make the developer think. Also, try not to reference the user. Instead of asking how will you do this, ask what is the best way to do this.
        
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
    try {
         return JSON.parse(response.data.choices[0].message.content)
    } catch (e) {
        throw new Error('Error parsing response from OpenAI')
        return
    }

}

}