import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { HttpFunction } from '@google-cloud/functions-framework';
import { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";

export const testFunction: HttpFunction = async (req: Request, res: Response) => {
    const API_KEY = process.env.GEMINI_API_KEY;
    //console.log("API Key: " + API_KEY);
    const ai = new GoogleGenAI({ vertexai: false, apiKey: API_KEY });
    const resp = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'why is the sky blue?',
    });
    console.log(resp.text);
    console.log("After response");
    
    // It's good practice to send a response back to the client
    res.status(200).send(resp.text);
};