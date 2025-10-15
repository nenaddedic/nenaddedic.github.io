import { GenerateFromPromptRequest, GenerateFromPromptResponse } from "@nenaddedic-github-io/shared_types";

export async function generate(prompt_: string): Promise<string> {
    const req:GenerateFromPromptRequest = {prompt: prompt_};
    console.log("generate:" + JSON.stringify(req));
    var res;
    try {
         res = await fetch("http://localhost:5566/generateFromPrompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        });
    } catch (error) {
        console.error(error);
        return "";
    }
    if (!res.ok) {
        console.error(res);
        return "";
    }
    const resp:GenerateFromPromptResponse = await res.json();
    console.log(resp);
    return resp.text
}