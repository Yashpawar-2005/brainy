"use client"
import { useState } from "react"
import AuthLeft from "../../ui/AuthLeft"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { login, signup } from "../../connection/connection"
import { useNavigate } from "react-router-dom"

const Auth = () => {
 const router=useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  
 
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    agreeToTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  
  
  const handleLoginChange = (e:any) => {
    // <e className="prevenet defa"></e>
    // e.preventdefault();
    const { name, value, type, checked } = e.target
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value
    })
  }
  
  
  const handleSignupChange = (e:any) => {
    const { name, value, type, checked } = e.target
    setSignupData({
      ...signupData,
      [name]: type === "checkbox" ? checked : value
    })
  }
  
  
  const handleLoginSubmit = async (e:any) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      console.log("Login submitted:", loginData)
      const res= await login(loginData);
      console.log(res);
      router("/")
    } catch (err:any) {
      setError(err.message || "An error occurred during login")
    }
    finally{
        setIsSubmitting(false)

    }
  }
  
 
  const handleSignupSubmit = async (e:any) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    try {
      console.log("Signup submitted:", signupData)
        const res=await signup(signupData)
        router("/")
        console.log(res)
    } catch (err:any) {
      setError(err.message || "An error occurred during signup")
    
    }
    finally{
  setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-black min-h-screen w-full text-white items-center flex justify-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-11 h-auto md:h-[60.5vh] w-full md:w-[90vw] lg:w-[80vw] xl:w-[60vw] border border-purple-800/30 rounded-lg overflow-hidden">
        <div className="w-full h-[40vh] md:h-full hidden md:block">
          <AuthLeft />
        </div>
        
        <div className="w-full h-full md:p-8 flex items-center justify-center text-white">
          <Card className="w-full h-full px-6 bg-black border border-purple-800/30 shadow-lg flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 text-4xl font-extrabold tracking-tight">
                Brainy
              </div>
              <div className="text-purple-500 text-xl">✦</div>
            </div>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-b border-purple-800/20 ">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-black data-[state=active]:text-purple-500 data-[state=active]:font-medium data-[state=active]:shadow-none text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-black data-[state=active]:text-purple-500 data-[state=active]:font-medium data-[state=active]:shadow-none text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

        
              <TabsContent value="login" className="mt-0">
                <CardContent className="space-y-5 pt-6">
                  <div className="text-center space-y-2 mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-zinc-400 text-sm">Enter your credentials to access your account</p>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-2 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                        <Input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="Email"
                          className="bg-zinc-900 border-zinc-700 text-white pl-10 placeholder:text-zinc-500 focus-visible:ring-purple-600 focus-visible:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          placeholder="Password"
                          className="bg-zinc-900 border-zinc-700 text-white pl-10 pr-10 placeholder:text-zinc-500 focus-visible:ring-purple-600 focus-visible:border-purple-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-zinc-500 hover:text-zinc-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-zinc-500 hover:text-zinc-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          name="rememberMe"
                          checked={loginData.rememberMe}
                          onCheckedChange={(checked) => 
                            setLoginData({...loginData, rememberMe: checked  as boolean})
                          }
                          className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <label htmlFor="remember" className="text-sm text-zinc-400">
                          Remember me
                        </label>
                      </div>
                      <button type="button" className="text-sm text-purple-500 hover:text-purple-400 font-medium">
                        Forgot password?
                      </button>
                    </div>
                    <Button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-5 mt-2"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

             
              <TabsContent value="signup" className="mt-0">
                <CardContent className="space-y-5 pt-6">
                  <div className="text-center space-y-2 mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="text-zinc-400 text-sm">Enter your details to sign up for an account</p>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-2 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                        <Input
                          type="text"
                          name="username"
                          value={signupData.username}
                          onChange={handleSignupChange}
                          placeholder="Username"
                          className="bg-zinc-900 border-zinc-700 text-white pl-10 placeholder:text-zinc-500 focus-visible:ring-purple-600 focus-visible:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                        <Input
                          type="email"
                          name="email"
                          value={signupData.email}
                          onChange={handleSignupChange}
                          placeholder="Email"
                          className="bg-zinc-900 border-zinc-700 text-white pl-10 placeholder:text-zinc-500 focus-visible:ring-purple-600 focus-visible:border-purple-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={signupData.password}
                          onChange={handleSignupChange}
                          placeholder="Password"
                          className="bg-zinc-900 border-zinc-700 text-white pl-10 pr-10 placeholder:text-zinc-500 focus-visible:ring-purple-600 focus-visible:border-purple-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-zinc-500 hover:text-zinc-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-zinc-500 hover:text-zinc-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        name="agreeToTerms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setSignupData({...signupData, agreeToTerms: checked as boolean})
                        }
                        className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-0.5"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-zinc-400">
                        I agree to the{" "}
                        <button type="button" className="text-purple-500 hover:text-purple-400 font-medium">
                          Terms of Service
                        </button> and{" "}
                        <button type="button" className="text-purple-500 hover:text-purple-400 font-medium">
                          Privacy Policy
                        </button>
                      </label>
                    </div>
                    <Button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-5 mt-2"
                    >
                      {isSubmitting ? "Signing up..." : "Sign up"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Auth