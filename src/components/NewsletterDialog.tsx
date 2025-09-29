import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

interface NewsletterDialogProps {
  children: React.ReactNode;
}

export function NewsletterDialog({ children }: NewsletterDialogProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [open, setOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          'email': formData.get('email') as string,
        }).toString(),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        // Close dialog after 2 seconds on success
        setTimeout(() => {
          setOpen(false);
          setStatus('idle');
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setStatus('error');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to Newsletter</DialogTitle>
          <DialogDescription>
            Get notified about new articles and tech insights directly in your inbox.
          </DialogDescription>
        </DialogHeader>
        <form
          name="newsletter"
          method="POST"
          data-netlify="true"
          action="/success"
          onSubmit={handleSubscribe}
          className="space-y-4"
        >
          {/* Hidden fields required by Netlify */}
          <input type="hidden" name="form-name" value="newsletter" />
          <input type="hidden" name="subject" value="New Newsletter Subscription" />

          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
          </div>
          {status === 'success' && (
            <Alert>
              <AlertDescription className="text-sm text-green-600">
                Successfully subscribed! You'll receive updates about new articles.
              </AlertDescription>
            </Alert>
          )}
          {status === 'error' && (
            <Alert>
              <AlertDescription className="text-sm text-red-600">
                Subscription failed. Please try again or contact us if the problem persists.
              </AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}