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

const formSchema = z.object({
    email: z.string().email({message: "Enter a valid email address"}),
    name: z.string().min(2).max(50),
    password: z.string().min(10).max(255)
})

export function SignupForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "email": ""
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">

            <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="mb-2">
                            <FormLabel>Name</FormLabel>
                            <FormDescription>
                                Enter your name. You will be addressed by the name you choose.
                            </FormDescription>
                            <FormControl>
                                <Input className="w-100" {...field}></Input>
                            </FormControl>

                            <FormMessage />

                        </FormItem>
                    )}
                />


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
                                <Input className="w-100" {...field}></Input>
                            </FormControl>

                            <FormMessage />

                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="mb-5">
                            <FormLabel>Password</FormLabel>
                            <FormDescription>
                                Enter your password.
                            </FormDescription>
                            <FormControl>
                                <Input type="password" className="w-100" {...field}></Input>
                            </FormControl>

                            <FormMessage />

                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-100 cursor-pointer">Submit</Button>
            </form>
        </Form>
    )
}