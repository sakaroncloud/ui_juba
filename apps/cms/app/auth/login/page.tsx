
"use client"
import AuthWrapper from "@/components/auth/auth-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from "@/components/form/submit-button";
import toast from "react-hot-toast";
import { signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@repo/ui/components/passwordInput";
import { FcGoogle } from "react-icons/fc";
import { Mail } from "lucide-react";
import { loginSchema, TLogin } from "@repo/ui/schemas/auth.schema";
import { Form, FormControl, FormField, FormItem } from "@repo/ui/components/form";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";

const LoginPage = () => {
  const router = useRouter()

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })



  const onSubmit = async (values: TLogin) => {
    const response = await signIn(values);

    if (response?.errors) {
      console.log(response.errors, "error")
    }
    if (response?.message) {
      toast.error(response?.message);
    }

    if (response?.success) {
      form.reset();
      toast.success(response?.success);
      router.replace("/")
    }
  };


  return (

    <AuthWrapper cardTitle="Log in" cardDescription="Welcome back! please enter your details
">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="bg-slate-200 shadow-sm h-12 w-full" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <PasswordInput placeholder="****" {...field} className="bg-slate-200 shadow-sm h-12" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-6 !mt-6">
            <SubmitButton
              className=" w-64 px-10 py-6 rounded-3xl"
              type="submit"
              label="Login"
              pending={form.formState.isSubmitting}
            />
            <button type="button" className="rounded-full shadow-md p-2 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all" >
              <FcGoogle className="size-8" />
            </button>
          </div>
        </form>
      </Form>
      <div className="flex items-center justify-end text-sm text-gray-600 mt-6">
        <div className="flex items-center">  <Mail className="size-5" />
          <span className="mx-2">Email:</span> <span>support@jubahospitality.com</span>
        </div>
      </div>
    </AuthWrapper>

  )
}

export default LoginPage