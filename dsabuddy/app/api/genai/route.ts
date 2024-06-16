import { StreamingTextResponse, GoogleGenerativeAIStream, Message } from "ai";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import Json from '@/app/chat/strivers_leet.json'
// IMPORTANT! Set the runtime to edge

export const runtime = "edge";
export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const images: string[] = JSON.parse(reqBody.data.images);
  const imageParts = filesArrayToGenerativeParts(images);
  const messages: Message[] = reqBody.messages;
  
  // if imageparts exist then take the last user message as prompt


  // const customMessage: Message = {
  //   id: "1", // add the id property
  //   role: "assistant", // or "assistant" depending on the context
  //   content: "You are a singer who writes song on any word or sentence given by user"
  // };

  // Append the custom message to the messages array
  // messages.push(customMessage);
  
  let modelName: string;
  let promptWithParts: any;
  if (imageParts.length > 0) {
    modelName = "gemini-pro-vision";
    const prompt = 
    [...messages]
      .filter((message) => message.role === "user")
      .pop()?.content;
    console.log(prompt);
    promptWithParts = [prompt, ...imageParts];
  } else {
    // else build the multi-turn chat prompt
    modelName = "gemini-pro";
    const userQuery = messages.find(msg => msg.role === "user")?.content;
    const matchedProblem = findMatchingProblem(Json, userQuery);
    promptWithParts = buildGoogleGenAIPrompt(messages, matchedProblem);
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: modelName,
  });

  console.log("MODELNAME: " + modelName);
  console.log("PROMPT WITH PARTS: ");
  console.log(promptWithParts);
  const streamingResponse = await model.generateContentStream(promptWithParts);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}

function findMatchingProblem(jsonData: any, query: string | undefined) {
  if (!query) return null;
  for (const problem of jsonData) {
    if (problem[0]?.title.toLowerCase() === query.toLowerCase()) {
      return problem;
    }
  }
  return null;
}

function buildGoogleGenAIPrompt(messages: Message[], matchedProblem: any) {
  const problemDescription = matchedProblem ? JSON.stringify(matchedProblem, null, 2) : "No matching problem found.";
  
  const customMessageFormatted = `You are a senior software engineer who is very good in Data Structure and Algorithm.
You explain complex questions of DSA to students in simple terms and also provide code if they ask for it, 
ensuring it is the best and most optimal code in C++. Here is the problem description you should refer to:\n${problemDescription}`;

  const userAndAssistantMessages = messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`)
    .join("\n");

  return `${userAndAssistantMessages}\n\n${customMessageFormatted}`;
}


function filesArrayToGenerativeParts(images: string[]) {
  return images.map((imageData) => ({
    inlineData: {
      data: imageData.split(",")[1],
      mimeType: imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.lastIndexOf(";")
      ),
    },
  }));
}