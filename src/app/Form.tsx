'use client'

import { useRef } from 'react'
import { handleSubmit } from './handleSubmit'

const Form = () => {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                const res = await handleSubmit(formData)
                const formEntries = Object.fromEntries(formData)
                console.log(formEntries)
                res?.issues?.map((issue, index) => {
                    if (Object.keys(formEntries).includes(issue.path[0] as string)) {
                        const field = formRef.current?.elements.namedItem(issue.path[0] as string) as HTMLInputElement
                        field.setCustomValidity(issue.path[0] + ' field ' + issue.message)
                        // focus only the first field with error
                        index === 0 && field.reportValidity()
                        index === 0 && field.focus()
                    }
                })
            }}
            className='flex flex-col gap-2 [&>input]:p-2  [&>input]:rounded-sm  [&>input]:text-purple-400'>
            <input
                type='text'
                name='name'
                placeholder='Name'
                onError={(e) => {
                    console.log('error occured')
                    console.log(e)
                }}
            />
            <input type='email' name='email' placeholder='Email' />
            <input type='text' name='subject' placeholder='Subject' />
            <textarea name='message' placeholder='Message' />
            <button type='submit'>Send</button>
        </form>
    )
}

export default Form
