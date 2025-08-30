
"use client";

import { cn } from "@/lib/utils";
import type { Message, Patient } from "@/lib/types";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

interface MessagingPanelProps {
  patient: Patient;
  currentUser: "patient" | "doctor";
}

export function MessagingPanel({ patient, currentUser }: MessagingPanelProps) {
  // In a real app, this would be managed globally and updated via API calls
  const [messages, setMessages] = useState<Message[]>(patient.messages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  const doctorAvatar = "https://picsum.photos/100"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation with {currentUser === 'doctor' ? patient.name : 'Dr. Angelica'}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUserSender = message.sender === currentUser;
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    isCurrentUserSender && "justify-end"
                  )}
                >
                  {!isCurrentUserSender && (
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender === 'patient' ? patient.avatarUrl : doctorAvatar } />
                        <AvatarFallback>
                        {message.sender === 'patient' ? patient.name.charAt(0) : 'DR'}
                        </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xs rounded-lg p-3 text-sm",
                      isCurrentUserSender
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p>{message.content}</p>
                     <p className={cn("text-xs mt-1", isCurrentUserSender ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                   {isCurrentUserSender && (
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser === 'patient' ? patient.avatarUrl : doctorAvatar} />
                        <AvatarFallback>
                            {currentUser === 'patient' ? patient.name.charAt(0) : 'DR'}
                        </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-start space-x-2"
        >
          <Textarea
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
             onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
