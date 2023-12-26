import { auth } from "@/app/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    // const { email, password} = body.data;
    console.log(body)
    createUserWithEmailAndPassword(auth, body.email, body.password);
    return Response.json({message:'hello from API'})
    // if (!name || !email || !password) {
    //     return new NextResponse('Missing Fields', {status: 400})
    // }

    // const exist = 
}