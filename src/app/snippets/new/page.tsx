import { db } from '@/db'
import { redirect } from 'next/navigation';
import React from 'react'

export default function SnippetCreatePage() {
    async function createSnippet(formData: FormData) {
        // this needs to be a server action
        // directive used by nextjs 
        'use server';

        // validate input
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        // Create new record in the database
        const snippet = await db.snippet.create({
            data: {
                title: title,
                code: code
            }
        })
        console.log(snippet);

        // redirect to homepage
        redirect('/');
    }
    return (
        <form action={createSnippet}>
            <h3 className='font-bold m-3'>Create a Snippet</h3>
            <div className='flex flex-col gap-4'>
                <div className="flex gap-4">
                    <label htmlFor="title" className='w-12'>Title</label>
                    <input type="text" className="border rounded p-2 w-full" name="title" id="title" />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="code" className='w-12'>Code</label>
                    <textarea className="border rounded p-2 w-full" name="code" id='code' />
                </div>
                <button type='submit' className='rounded p-2 bg-blue-200'>Create</button>
            </div>
        </form>
    )
}
