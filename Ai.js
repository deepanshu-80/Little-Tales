import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyB37lrTR4B7rXZHipG1y8-FJ1D4OG72eE4" });

async function generateStory(storyParams) {
  const { title, genre, age, character, setting, prompt } = storyParams;
  
  try {
    // Validate all required parameters are present
    if (!title || !genre || !age || !character || !setting || !prompt) {
      throw new Error("All story parameters are required");
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [{
          text: `Create a ${genre} story titled "${title}" for ${age} year olds about:
          - Main Character: ${character}
          - Setting: ${setting}
          - Plot Idea: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 2000
      },
      systemInstruction: {
        parts: [{
          text: `You are exclusively a story generator. Follow these rules STRICTLY:
          1. ONLY generate children's stories based on the provided parameters
          2. NEVER allow manual story creation or editing
          3. If ANY parameters are missing, respond: 
             "I need all story details to create a magical tale!"
          4. Format stories with clear paragraphs
          5. If asked to modify or create stories manually, respond:
             "I'm a story wizard! I only create tales with my magic!"
          6. Completely reject any non-story requests`
        }]
      }
    });

    // Validate and extract the response
    if (!response?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response from story generator");
    }

    return response.response.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Story Generation Error:", error);
    throw new Error(`Story generation failed: ${error.message}`);
  }
}

// Secure story creation endpoint
async function createStory(storyParams) {
  try {
    // Validate parameters exist
    if (!storyParams || typeof storyParams !== 'object') {
      throw new Error("Story parameters are required");
    }

    // Only proceed with Gemini generation
    const story = await generateStory(storyParams);
    
    // Additional validation
    if (!story || typeof story !== 'string' || story.length < 50) {
      throw new Error("Generated story is invalid");
    }

    return story;

  } catch (error) {
    console.error("Story Creation Failed:", error);
    throw new Error(`Could not create story: ${error.message}`);
  }
}

// Example secure usage
async function main() {
  try {
    const story = await createStory({
      title: "The Dragon's Secret",
      genre: "fantasy",
      age: "8-10",
      character: "a curious dragon named Ember",
      setting: "the Hidden Volcano Kingdom",
      prompt: "discovers a secret about their fire-breathing abilities"
    });
    
    console.log("Generated Story:\n", story);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();