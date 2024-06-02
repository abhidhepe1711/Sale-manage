import React, { useState } from "react";
import {
  Container,
  Text,
  Center,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const USERNAME = "admin";
    const PASSWORD = "password123";

    if (username === USERNAME && password === PASSWORD) {
      toast({
        title: "Login successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/operations");
    } else {
      toast({
        title: "Login failed.",
        description: "Invalid credentials, please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Text fontSize="4xl" mt="5">
        Welcome to
      </Text>
      <Text fontSize="80px" color="teal" as="b">
        SaleManage
      </Text>
      <Text fontSize="xl">Your one stop solution to manage sale orders...</Text>
      <FormControl isRequired mt="3" onSubmit={handleLogin}>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Center>
        <Button colorScheme="teal" mt="5" onClick={handleLogin}>
          Login
        </Button>
      </Center>
    </Container>
  );
};

export default Login;
