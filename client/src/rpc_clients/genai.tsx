import { ServicesClient } from "@google-cloud/run";
import { GenAIRequest, GenAIResponse } from "@nenaddedic-github-io/shared_types/src/service";

const client = new ServicesClient();


export async function generate(prompt: string) {
}