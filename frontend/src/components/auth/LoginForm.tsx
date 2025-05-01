import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { redirect, useNavigate } from "react-router"

const formSchema = z.object({
    email: z.string().email({message: "Enter a valid email address"}),
    password: z.string().min(10).max(255)
})


export function LoginForm() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "email": ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {"Content-Type": "application/json"}
        })
        const json = await response.json()
        if ('errors' in json) {
            form.setError("password", {type: "custom", message: json.errors})
        } 
        else {
            navigate("/newsletter")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className="mb-2">
                            <FormLabel>Email</FormLabel>
                            <FormDescription>
                                Enter your email address.
                            </FormDescription>
                            <FormControl>
                                <Input className="w-full" {...field}></Input>
                            </FormControl>

                            <FormMessage />

                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="mb-2">
                            <FormLabel>Password</FormLabel>
                            <FormDescription>
                                Enter your password.
                            </FormDescription>
                            <FormControl>
                                <Input type="password" className="w-full" {...field}></Input>
                            </FormControl>

                            <FormMessage />

                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full cursor-pointer">Submit</Button>
            </form>
        </Form>
    )
}