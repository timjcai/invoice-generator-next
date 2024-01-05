import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body
    await generateInvoice(data);
    return res.status(200).json({message: 'postrequest complete'});
}