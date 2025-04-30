import { LoginForm } from "./auth/LoginForm";
import { SignupForm } from "./auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function Auth() {
    return (
        <div className="mt-7 flex flex-col items-center-safe px-5">

            <Tabs defaultValue="login" className="w-full lg:w-100">
                <TabsList className="mb-2">
                    <TabsTrigger value="login">Log in</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><LoginForm/></TabsContent>
                <TabsContent value="signup"><SignupForm/></TabsContent>
            </Tabs>     
        </div>
    )
}