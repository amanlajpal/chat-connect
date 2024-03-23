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
import { setConnectionStatus } from "@/store/connectionStatusSlice";
import { setUsername } from "@/store/usernameSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  initializeStompClient,
} from "@/connections/stompClient";
import axiosInstance from "@/connections/axiosInstance";

export function Authentication() {
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const username = useSelector((state: any) => state?.username?.value);
  console.log(username, "username - changed!")
  const handleSubmit = async () => {
    axiosInstance
      .request({
        method: "POST",
        url: "/v1/register",
        params: signupData,
      })
      .then((response) => {
        console.log(response, "response!");
      })
      .catch((error) => {
        console.log(error, "error!");
      });
    // dispatch(setConnectionStatus("connecting"));
    // let username = signupData?.name.trim();
    // dispatch(setUsername(username));
    // if (username) {
    //   const initializedClient = await initializeStompClient(username);
    //   console.log(initializedClient, "initialized client!");
    //   dispatch(setConnectionStatus("connected"));
    // }
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
                <Input id="phone" defaultValue="" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" defaultValue="" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Link to={"/home"}>Login</Link>
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
              <Button asChild onClick={handleSubmit}>
                <Link to={"/home"}>Signup</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
