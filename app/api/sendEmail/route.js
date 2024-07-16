import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){

    const response=await req.json()
    const result=response.data;
    try{

        const data=await resend.emails.send({
            from: 'test<delivered@resend.dev>',
            to: [response.data.Email],
            subject: 'Confirmation',
            react: EmailTemplate({result})
          });
        return NextResponse.json({data})
    }
    catch(error)
    {
        return NextResponse.json({error})
    }
}