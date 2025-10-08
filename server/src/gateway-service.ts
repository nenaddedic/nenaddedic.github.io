import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { HttpFunction } from '@google-cloud/functions-framework';
import { Request, Response } from 'express';
import { GoogleGenAI } from "@google/genai";
import { Gateway, GenerateFromPromptRequest, GenerateFromPromptResponse } from "@nenaddedic-github-io/shared_types";
 
export class GatewayService implements Gateway {
    ai: GoogleGenAI;

    constructor() {
        this.ai = new GoogleGenAI({ vertexai: false, apiKey: process.env.GEMINI_API_KEY });
    }

    public async generateFromPrompt(req: GenerateFromPromptRequest): Promise<GenerateFromPromptResponse> {
        const aireq = {
            model: 'gemini-2.0-flash',
            contents: req.prompt,
        }
        const airesp = await this.ai.models.generateContent(aireq);
        if (airesp.text === undefined) {
            throw new Error("airesp.text is undefined");
        }
        const resp: GenerateFromPromptResponse = {
            text: airesp.text
        };
        return resp;
    }
}
