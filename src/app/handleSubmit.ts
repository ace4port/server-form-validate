'use server'
import { z } from 'zod'

export const handleSubmit = async (data) => {
    // const name = data.get('name')
    const formDataObj = Object.fromEntries(data)
    console.log(formDataObj)

    const schema = z.object({
        name: z.string().min(3).max(255),
        email: z.string().email(),
        subject: z.string().min(3).max(255),
        message: z.string().min(3).max(255),
    })
    const result = schema.safeParse(formDataObj)

    if (!result.success) {
        console.log(result.error.errors, result.error.issues)
        return { err: result.error.errors, issues: result.error.issues }
    }

    // else save / do sth
}
