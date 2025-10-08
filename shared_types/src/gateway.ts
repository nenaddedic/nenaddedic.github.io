export interface Gateway {
    generateFromPrompt(req: GenerateFromPromptRequest): Promise<GenerateFromPromptResponse>;
};

export interface GenerateFromPromptRequest {
    prompt: string;
}

export interface GenerateFromPromptResponse {
    text: string;
}
