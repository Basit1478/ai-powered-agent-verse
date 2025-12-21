import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Check, Star, Zap, Crown } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const creditOptions = [
  { credits: 100, price: 9, pricePerCredit: 0.09 },
  { credits: 250, price: 19, pricePerCredit: 0.076 },
  { credits: 500, price: 35, pricePerCredit: 0.07 },
  { credits: 1000, price: 59, pricePerCredit: 0.059 },
  { credits: 2500, price: 129, pricePerCredit: 0.052 },
  { credits: 5000, price: 229, pricePerCredit: 0.046 },
]

export default function Pricing() {
  const { toast } = useToast()
  const [selectedCredits, setSelectedCredits] = useState(2)

  const currentOption = creditOptions[selectedCredits]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const handleGetStarted = async (planName: string, credits?: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planName: planName,
          credits: credits
        }
      })

      if (error) {
        throw error
      }

      if (data.url) {
        window.open(data.url, '_blank')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive"
      })
    }
  }

  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individuals getting started",
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      features: [
        "3 AI Agents",
        "100 conversations/month",
        "Basic voice synthesis",
        "5 languages supported",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      features: [
        "10 AI Agents",
        "1,000 conversations/month",
        "Advanced voice synthesis",
        "25+ languages supported",
        "Priority support",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        "Unlimited AI Agents",
        "Unlimited conversations",
        "Premium voice synthesis",
        "50+ languages supported",
        "24/7 dedicated support",
        "Custom integrations"
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4">
              Pricing Plans
            </Badge>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold gradient-text mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Unlock multilingual AI agents with voice capabilities. Scale globally.
          </motion.p>
        </motion.div>

        {/* Credit-Based Pricing */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="max-w-3xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="text-center pb-4">
                <Badge className="w-fit mx-auto mb-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  Pay As You Go
                </Badge>
                <CardTitle className="text-2xl font-bold">Credit Packages</CardTitle>
                <p className="text-muted-foreground">Buy credits and use them anytime. No monthly commitment.</p>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Credit Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Select credits:</span>
                    <span className="text-lg font-semibold text-primary">{currentOption.credits.toLocaleString()} Credits</span>
                  </div>
                  
                  <Slider
                    value={[selectedCredits]}
                    onValueChange={(value) => setSelectedCredits(value[0])}
                    max={creditOptions.length - 1}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    {creditOptions.map((opt, i) => (
                      <span key={i} className={selectedCredits === i ? "text-primary font-semibold" : ""}>
                        {opt.credits}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-background/50 rounded-xl p-6 text-center border">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold text-primary">${currentOption.price}</span>
                    <span className="text-muted-foreground">one-time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${currentOption.pricePerCredit.toFixed(3)} per credit
                    {selectedCredits > 0 && (
                      <span className="ml-2 text-green-500 font-medium">
                        Save {Math.round((1 - currentOption.pricePerCredit / creditOptions[0].pricePerCredit) * 100)}%
                      </span>
                    )}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Never expires</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>All AI agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Voice synthesis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>All languages</span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  onClick={() => handleGetStarted('credits', currentOption.credits)}
                >
                  Buy {currentOption.credits.toLocaleString()} Credits for ${currentOption.price}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 max-w-3xl mx-auto mb-12">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-muted-foreground text-sm font-medium">Or choose a subscription</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Subscription Plans */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-primary text-white px-3 py-0.5 text-xs">
                    Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-md' : ''
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} mx-auto mb-3 flex items-center justify-center`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-4 ${
                      plan.popular 
                        ? 'bg-gradient-primary hover:bg-gradient-primary/90' 
                        : ''
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleGetStarted(plan.name)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-16 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-left">
              <h3 className="font-semibold mb-1">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">Yes, upgrade or downgrade anytime. Changes take effect immediately.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold mb-1">Do credits expire?</h3>
              <p className="text-sm text-muted-foreground">No, credits never expire. Use them whenever you need.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold mb-1">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">Yes! All plans come with a 14-day free trial.</p>
            </div>
            
            <div className="text-left">
              <h3 className="font-semibold mb-1">What languages are supported?</h3>
              <p className="text-sm text-muted-foreground">We support 50+ languages including English, Spanish, French, German, and more.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
