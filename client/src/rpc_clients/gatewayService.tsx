import { GenerateFromPromptRequest, GenerateFromPromptResponse } from "@nenaddedic-github-io/shared_types";
import { withMainPrompt, stripToJSON } from "./prompt.js";

const url_base = import.meta.env.VITE_GATEWAY_SERVICE_URL;

export async function generate(desc: string): Promise<string> {
    //console.log(withMainPrompt(desc));
    const req:GenerateFromPromptRequest = {prompt: withMainPrompt(desc)};
    //console.log("generate:" + JSON.stringify(req));
    var res;
    try {
         res = await fetch(url_base + "/generateFromPrompt", {
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
    //console.log(resp);
    return stripToJSON(resp.text);
}