
//const OpenAI = require('openai');
import OpenAI from "openai";
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from "path";
import Module from "module";

dotenv.config()

const openai = new OpenAI(
  {
    apiKey:process.env.OPENAI_API_KEY,
  }

);

  async function openAIcall(prompt) {
  const myAssistant = await openai.beta.assistants.retrieve(
    process.env.ASSISTANT_ID
  )

  //console.log(myAssistant);
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(
    
    thread.id,
    {
      role: "user",
      content: prompt,
    }
  );

  let run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    { 
      assistant_id: myAssistant.id,
    }
  );

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );
    //console.log(messages.data.reverse()[1].content[0].text.value);
    let message = await messages.data.reverse()[1].content[0].text.value
    return message

  } else {
    console.log(run.status);
  }
  console.log(run.status);
}

export default openAIcall;
//openAIcall('life is good')