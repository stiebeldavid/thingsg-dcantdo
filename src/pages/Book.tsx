
import React, { useState } from "react";
import { Book as BookIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

const Book = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = (values: any) => {
    setIsProcessing(true);
    console.log("Order submitted:", values);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Placed",
        description: "Thank you for your order! We'll ship your book soon.",
      });
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 md:pt-28 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Things G-d <span className="text-purple-600">Can't</span> Do
              </h1>
              <p className="text-xl text-slate-700 mb-8">
                An exploration of the divine paradox: what are the limits of an unlimited being?
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => {
                  document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <ShoppingCart className="mr-2" />
                  Order Now - $10
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Preview Pages
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img 
                  src="/lovable-uploads/5e6b937b-a1ba-4db0-bde6-46bee398b72f.png"
                  alt="Things G-d Can't Do Book Cover" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg shadow-md">
                  <p className="font-semibold">By David Stiebel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">About the Book</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-slate-700 mb-4">
              <span className="font-semibold text-xl text-slate-900">Things G-d Can't Do</span> explores the fascinating 
              theological paradoxes that arise when we consider the nature of an omnipotent being. Can G-d create a rock 
              so heavy He can't lift it? Can G-d make 2+2=5? These questions lead us into deep contemplation about the 
              nature of divine power and logic itself.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              Through accessible language and thought-provoking examples, David Stiebel guides readers through these 
              philosophical quandaries that have puzzled theologians and philosophers for centuries.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              Whether you're a religious scholar, a philosophy enthusiast, or simply curious about the limits of divine 
              capability, this book offers fascinating insights that will transform how you think about G-d and existence.
            </p>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview-section" className="py-12 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8">Preview Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* These would be actual book pages - placeholder for now */}
            {[1, 2, 3].map((page) => (
              <div key={page} className="bg-white p-6 rounded-lg shadow-md">
                <div className="aspect-w-4 aspect-h-5 bg-slate-100 mb-4 p-4">
                  <div className="flex flex-col h-full justify-center items-center text-slate-500">
                    <BookIcon size={48} />
                    <p className="mt-2 text-center">Preview page {page}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">Page {page} excerpt</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials/Quotes */}
      <section className="py-12 px-4 bg-purple-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Praise for the Book</h2>
          <div className="grid gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-slate-700">"A fascinating exploration of divine paradoxes that challenged my understanding of theology. Stiebel presents complex philosophical ideas in an accessible and engaging manner."</p>
                <div className="mt-4 font-semibold">
                  <p>— Rabbi Jonathan Cohen, Ph.D</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="italic text-slate-700">"This book fundamentally changed how I think about the concept of omnipotence. The careful reasoning and clear examples make difficult concepts accessible to anyone."</p>
                <div className="mt-4 font-semibold">
                  <p>— Sarah Williams, Philosophical Quarterly</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="italic text-slate-700">"A brilliantly conceived exploration of theological paradoxes. 'Things G-d Can't Do' is that rare book that is simultaneously intellectually rigorous and spiritually enriching."</p>
                <div className="mt-4 font-semibold">
                  <p>— Professor Michael Sandler, University of Theology</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-section" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Order Your Copy</h2>
              <p className="text-lg text-slate-700 mb-4">
                Get your physical copy of "Things G-d Can't Do" delivered to your doorstep.
              </p>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                  <CardDescription>Your copy costs $10 plus $5 shipping.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Book</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>$15.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Please enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="johndoe@example.com" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Place Order - $15.00"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Book;
