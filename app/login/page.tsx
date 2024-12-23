import { SignInForm } from '../../components/ui/sign-in-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="mt-2 text-gray-600">
            Enter your credentials to access the CMS
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

