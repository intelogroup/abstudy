import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to read the system prompt content from the file
const getSystemPromptContent = (): { content: string; error?: string } => {
  try {
    const filePath = path.join(process.cwd(), 'systemprompt.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (!fileContent.trim()) {
      console.warn("Warning: systemprompt.txt is empty. Using fallback prompt.");
      return { content: "You are a helpful AI assistant. The primary system prompt was found empty.", error: "System prompt file is empty." };
    }
    return { content: fileContent };
  } catch (error: any) {
    console.error("Error reading systemprompt.txt:", error.message);
    // Provide more details if it's a common error like ENOENT (file not found)
    let specificError = "Failed to read system prompt file.";
    if (error.code === 'ENOENT') {
      specificError = `System prompt file not found at ${path.join(process.cwd(), 'systemprompt.txt')}.`;
    }
    console.warn(`Using fallback system prompt due to error: ${specificError}`);
    return { content: "You are a helpful AI assistant.", error: specificError };
  }
};

// Function to read all files from the 'sources' directory, but only include those relevant to the user query
const getSourceDocumentsContent = (userQuery: string): { content: string; error?: string } => {
  const sourcesDir = path.join(process.cwd(), 'sources');
  let combinedContent = '';
  let filesRead = 0;
  let errorsEncountered: string[] = [];
  let relevantFiles: string[] = [];
  let fallbackToAll = false;

  try {
    if (!fs.existsSync(sourcesDir)) {
      const errMsg = `Sources directory not found at ${sourcesDir}. No source documents will be loaded.`;
      console.warn(errMsg);
      return { content: '', error: errMsg };
    }

    const files = fs.readdirSync(sourcesDir);
    if (files.length === 0) {
      const warnMsg = `No files found in the sources directory: ${sourcesDir}.`;
      console.warn(warnMsg);
      return { content: '', error: warnMsg };
    }

    // First pass: find relevant files
    files.forEach(file => {
      const filePath = path.join(sourcesDir, file);
      try {
        if (fs.statSync(filePath).isDirectory()) return;
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if (fileContent.toLowerCase().includes(userQuery.toLowerCase())) {
          relevantFiles.push(file);
        }
      } catch (readError: any) {
        const errMsg = `Error reading source file ${file}: ${readError.message}`;
        console.error(errMsg);
        errorsEncountered.push(errMsg);
      }
    });

    // If no relevant files, fallback to all files
    const filesToInclude = relevantFiles.length > 0 ? relevantFiles : files;
    if (relevantFiles.length === 0) fallbackToAll = true;

    filesToInclude.forEach(file => {
      const filePath = path.join(sourcesDir, file);
      try {
        if (fs.statSync(filePath).isDirectory()) return;
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        combinedContent += `--- Start of content from ${file} ---\n${fileContent}\n--- End of content from ${file} ---\n\n`;
        filesRead++;
      } catch (readError: any) {
        const errMsg = `Error reading source file ${file}: ${readError.message}`;
        console.error(errMsg);
        errorsEncountered.push(errMsg);
      }
    });

    if (errorsEncountered.length > 0) {
      return { content: combinedContent, error: `Encountered errors reading some source files: ${errorsEncountered.join('; ')}` };
    }
    if (fallbackToAll) {
      console.log('No relevant source files found for query; included all files as fallback.');
    } else {
      console.log(`Included ${filesRead} relevant source file(s) for query.`);
    }
    return { content: combinedContent };

  } catch (error: any) {
    const errMsg = `Error accessing sources directory ${sourcesDir}: ${error.message}`;
    console.error(errMsg);
    return { content: '', error: errMsg };
  }
};

// IMPORTANT: Replace with the correct Gemini API endpoint for the model you are using
// e.g., for Gemini 1.0 Pro: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
// e.g., for Gemini 1.5 Flash: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent';


export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/study-agent");
  try {
    const { query: userQuery } = await req.json();

    if (!userQuery) {
      console.log("Query is missing from request body");
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }
    console.log("User query:", userQuery);

    // Log the test variable
    console.log("Attempting to read TEST_VAR:", process.env.TEST_VAR);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL: GEMINI_API_KEY is not set in environment variables.');
      return NextResponse.json({ error: 'API key not configured. Please set GEMINI_API_KEY.' }, { status: 500 });
    }

    const { content: systemPromptText, error: systemPromptError } = getSystemPromptContent();
    
    if (systemPromptError) {
      // Log the error, but we'll proceed with the fallback prompt. 
      // If the system prompt is absolutely critical, you might choose to return an error here.
      console.warn(`Continuing with fallback system prompt. Original error: ${systemPromptError}`);
      // Optionally, you could decide to stop if the prompt is critical:
      // if (systemPromptError.includes("not found")) { // Or a more specific check
      //   return NextResponse.json({ error: 'Critical system prompt file not found.' }, { status: 500 });
      // }
    }

    // Get content from source documents
    const { content: sourceDocsText, error: sourceDocsError } = getSourceDocumentsContent(userQuery);

    if (sourceDocsError) {
      // Log the error. Depending on requirements, you might want to:
      // 1. Proceed without source docs (as implemented here, sourceDocsText will be empty or partial).
      // 2. Return an error to the client if source docs are critical.
      console.warn(`Warning/Error loading source documents: ${sourceDocsError}. Proceeding with available content.`);
      // Example: If source docs are critical and none were loaded (or a fatal error occurred)
      // if (sourceDocsError.includes("not found at") || !sourceDocsText) {
      //   return NextResponse.json({ error: "Critical source documents could not be loaded." }, { status: 500 });
      // }
    }

    // Construct the full prompt for Gemini
    const fullPrompt = `${systemPromptText}

--- Provided Source Documents Start ---
${sourceDocsText}
--- Provided Source Documents End ---

User Query:
${userQuery}

Agent Response:
`;
    console.log("Constructed full prompt for Gemini."); // Avoid logging the full prompt if it's too long or sensitive
    console.log(`Length of fullPrompt: ${fullPrompt.length} characters`); // Log the length

    const requestBody = {
      contents: [
        {
          parts: [
            { text: fullPrompt }
          ]
        }
      ],
      // Add any generationConfig if needed, e.g., temperature, maxOutputTokens
      // generationConfig: {
      //   temperature: 0.7,
      //   maxOutputTokens: 1000,
      // },
    };

    console.log(`Sending request to Gemini API: ${GEMINI_API_ENDPOINT}`);
    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`Gemini API response status: ${response.status}`);

    if (!response.ok) {
      const errorBody = await response.text(); // Use .text() first to avoid JSON parsing errors if not JSON
      console.error('Gemini API request failed. Status:', response.status, 'Body:', errorBody);
      let displayError = 'Failed to fetch response from AI.';
      try {
        const parsedError = JSON.parse(errorBody);
        if (parsedError && parsedError.error && parsedError.error.message) {
          displayError = parsedError.error.message;
        }
      } catch (e) {
        // If errorBody is not JSON, use it as is (or part of it)
        displayError = errorBody.substring(0, 200); // Truncate if too long
      }
      return NextResponse.json({ error: 'Failed to communicate with AI model', details: displayError }, { status: response.status || 500 });
    }

    const data = await response.json();
    
    let agentResponseText = 'Error: Could not parse response from AI.'; 
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
        agentResponseText = data.candidates[0].content.parts[0].text;
        console.log("Successfully extracted response from Gemini API.");
    } else {
        console.error('Unexpected response structure from Gemini API after successful call:', JSON.stringify(data, null, 2));
    }

    return NextResponse.json({ response: agentResponseText });

  } catch (error: any) {
    console.error('Unhandled error in /api/study-agent POST handler:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message || "An unknown error occurred" }, { status: 500 });
  }
}

// Optional: Basic GET handler for testing the route
export async function GET() {
  return NextResponse.json({ message: 'Study Agent API is running. Use POST to send queries.' });
} 