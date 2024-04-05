import { Button } from "@/components/ui/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";
import { Input } from "@/components/ui/common/input";
import { Label } from "@/components/ui/common/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/common/tabs";
import { setUser } from "@/store/userSlice";
import { joinChat } from "@/store/chatsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/connections/axiosInstance";
import { useToast } from "@/components/ui/common/use-toast";

export function Authentication() {
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    axiosInstance
      .request({
        method: "POST",
        url: "/v1/register",
        params: signupData,
      })
      .then((response) => {
        dispatch(setUser({
          id: response?.data?.data?.id,
          firstName: response?.data?.data?.firstName,
          lastName: response?.data?.data?.lastName,
          phoneNumber: response?.data?.data?.phone,
          email: response?.data?.data?.email,
          profilePhoto: response?.data?.data?.profilePhoto,
          createdAt: response?.data?.data?.createdAt,
        }));
        dispatch(
          joinChat({
            id: response?.data?.data?.id,
            lastMessage: null,
            lastMessageTime: null,
            name: response?.data?.data?.firstName + " " + response?.data?.data?.lastName,
            profilePhoto: response?.data?.data?.profilePhoto,
            phoneNumber: response?.data?.data?.phone,
          })
        );
        navigate("/home")
      })
      .catch((error) => {
        console.log(error, "error!");
        toast({
          title: `Signup Failed! ${error?.response?.data?.message}`,
          description: `Please try again with a different phone number`,
          variant: "destructive",
        });
      });
  };
  const handleLogin = async () => {
    axiosInstance
      .request({
        method: "POST",
        url: "/v1/login",
        params: loginData,
      })
      .then((response) => {
        dispatch(setUser({
          id: response?.data?.data?.id,
          firstName: response?.data?.data?.firstName,
          lastName: response?.data?.data?.lastName,
          phoneNumber: response?.data?.data?.phoneNumber,
          email: response?.data?.data?.email,
          profilePhoto: response?.data?.data?.profilePhoto,
          createdAt: response?.data?.data?.createdAt,
        }));
        // dispatch(
        //   joinChat({
        //     lastMessage: null,
        //     lastMessageTime: null,
        //     name: response?.data?.data?.firstName + " " + response?.data?.data?.lastName,
        //     profilePhoto: response?.data?.data?.profilePhoto,
        //     phoneNumber: response?.data?.data?.phone,
        //   })
        // );
        navigate("/home")
        toast({
          title: response?.data?.message || "Login Successfull!",
        });
      })
      .catch((error) => {
        console.log(error, "error!");
        toast({
          title: error?.response?.data?.message || "Login Failed!",
          description: `Please try again with a different phone number`,
          variant: "destructive",
        });
      });
  };
  return (
    <div className="flex items-center justify-center h-screen overflow-y-hidden">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={loginData?.phone || ""}
                  onChange={(event) =>
                    setLoginData((prevLoginData) => {
                      return { ...prevLoginData, phone: event?.target?.value };
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData?.password || ""}
                  onChange={(event) =>
                    setLoginData((prevLoginData) => {
                      return {
                        ...prevLoginData,
                        password: event?.target?.value,
                      };
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Enter your details to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={signupData?.name || ""}
                  onChange={(event) =>
                    setSignupData((prevSignupData) => {
                      return { ...prevSignupData, name: event?.target?.value };
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={signupData?.phone || ""}
                  onChange={(event) =>
                    setSignupData((prevSignupData) => {
                      return { ...prevSignupData, phone: event?.target?.value };
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signupData?.password || ""}
                  onChange={(event) =>
                    setSignupData((prevSignupData) => {
                      return {
                        ...prevSignupData,
                        password: event?.target?.value,
                      };
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
