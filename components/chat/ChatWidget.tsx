
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { db, ref, push, onValue, serverTimestamp, listenToChat } from '@/lib/firebase';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { useAuthStore } from '@/lib/store/useAuthStore';

export function ChatWidget() {
  const { activeTrip } = useBookingStore();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeTrip?.id) return;

    const unsub = listenToChat(activeTrip.id.toString(), (msgs) => {
      setMessages(msgs.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => unsub();
  }, [activeTrip?.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeTrip?.id || !user) return;

    setIsLoading(true);
    try {
      const chatRef = ref(db, `chats/trip_${activeTrip.id.toString()}/messages`);
      await push(chatRef, {
        text: newMessage,
        senderId: user.ID,
        senderName: user.first_name,
        timestamp: serverTimestamp(),
        type: 'customer'
      });
      setNewMessage("");
    } catch (error) {
       console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeTrip) return null;

  return (
    <div className="flex flex-col h-[400px] bg-dark-charcoal border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
               <User className="w-4 h-4 text-primary" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-grey-pastel">Chat with Driver</h4>
               <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Online</p>
            </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <Bot className="w-8 h-8 mb-2" />
            <p className="text-xs text-grey-medium">No messages yet.<br/>Say hi to your driver!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.type === 'customer' 
                  ? 'bg-primary text-black rounded-tr-none' 
                  : 'bg-white/5 text-grey-pastel border border-white/10 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/5 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-dark-lighter border border-white/10 rounded-xl px-4 py-2 text-sm text-grey-pastel focus:outline-none focus:border-primary/50 transition-all"
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim() || isLoading}
          className="p-2.5 bg-primary text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
