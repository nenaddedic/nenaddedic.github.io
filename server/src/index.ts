import { Request, Response} from 'express';
import { GatewayService } from './gateway-service.ts';
import cors from 'cors';

const gatewayService = new GatewayService();

export async function gatewayRpcEndpoint(req: Request, resp: Response) {
    console.log(req.path);
    console.log(req.body);
    console.log('-----------------------');

    const corsHandler = cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    });

    corsHandler(req, resp, async () => {
        if (req.method != 'POST') {
            resp.status(405).send('Method Not Allowed');
            return;
        }

        switch (req.path) {
            case '/generateFromPrompt':
                const r = await gatewayService.generateFromPrompt(req.body);
                resp.status(200).send(r);
                console.log("+++");
                console.log(r.text);
                return;
            default:
                resp.status(404).send('Not Found');
                return;
        }
    });
}