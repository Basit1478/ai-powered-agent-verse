import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RAGChatbot } from "@/components/RAGChatbot"
import { 
  ArrowRight, 
  Utensils, 
  Factory, 
  Shirt, 
  Building2, 
  Stethoscope, 
  Cpu,
  Bot,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2
} from "lucide-react"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const industries = [
    {
      icon: Utensils,
      title: "Food Industry",
      description: "Smart solutions for recipe management, safety compliance, and customer insights.",
      agentCount: 10,
      gradient: "from-orange-500 to-red-500",
      bgGlow: "bg-orange-500/20",
    },
    {
      icon: Factory,
      title: "Machine Industry",
      description: "Predictive maintenance, production optimization, and supply chain automation.",
      agentCount: 10,
      gradient: "from-slate-500 to-zinc-600",
      bgGlow: "bg-slate-500/20",
    },
    {
      icon: Shirt,
      title: "Textile Industry",
      description: "Trend analysis, quality control, and sustainable sourcing intelligence.",
      agentCount: 10,
      gradient: "from-pink-500 to-purple-500",
      bgGlow: "bg-pink-500/20",
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Property valuation, market insights, and automated lead management.",
      agentCount: 10,
      gradient: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-500/20",
    },
    {
      icon: Stethoscope,
      title: "Medical Industry",
      description: "Patient care optimization, scheduling, and healthcare compliance.",
      agentCount: 10,
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/20",
    },
    {
      icon: Cpu,
      title: "Tech Industry",
      description: "Code review, DevOps automation, and security analysis tools.",
      agentCount: 10,
      gradient: "from-violet-500 to-indigo-500",
      bgGlow: "bg-violet-500/20",
    },
  ]

  const stats = [
    { value: "60+", label: "AI Agents", icon: Bot },
    { value: "6", label: "Industries", icon: Globe },
    { value: "24/7", label: "Availability", icon: Clock },
    { value: "99.9%", label: "Uptime", icon: Shield },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Get your AI agents up and running in minutes, not months. No complex setup required.",
    },
    {
      icon: TrendingUp,
      title: "Boost Productivity",
      description: "Automate repetitive tasks and let your team focus on high-value strategic work.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with GDPR, HIPAA, and industry standards.",
    },
    {
      icon: Users,
      title: "Seamless Collaboration",
      description: "AI agents work alongside your team, learning and adapting to your workflows.",
    },
  ]

  const trustedBy = [
    "Fortune 500 Companies",
    "Healthcare Networks",
    "Manufacturing Giants",
    "Tech Startups",
    "Real Estate Firms",
    "Retail Chains",
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        
        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              60+ AI Agents | 6 Industries
            </span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight"
          >
            AI-Powered{" "}
            <span className="gradient-text">Industry Solutions</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto"
          >
            Intelligent AI agents for Food, Manufacturing, Textile, Real Estate, Medical, and Tech industries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button variant="gradient" size="lg" asChild className="group">
              <Link to="/agents">
                Explore Agents
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card/50 border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-all">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Industries Section */}
      <section className="py-12 px-4 relative">
        <div className="absolute inset-0 bg-muted/30" />
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">Industry Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              10 specialized AI agents per industry, trained on domain-specific knowledge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => (
              <motion.div
                key={industry.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <Link to="/agents" className="block h-full">
                  <Card className="h-full bg-card/80 border border-border/50 hover:border-primary/40 transition-all group">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${industry.gradient} group-hover:scale-105 transition-transform`}>
                          <industry.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                            {industry.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {industry.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                            <Bot className="w-3 h-3" />
                            {industry.agentCount} Agents
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-8">
            <Button variant="gradient" size="default" asChild className="group">
              <Link to="/agents">
                View All Agents
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-muted-foreground">Enterprise-grade AI that scales with your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={itemVariants} className="group">
                <div className="flex gap-4 p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors h-fit">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-8 px-4 border-y border-border/50 bg-muted/20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground mb-4">
            Trusted by industry leaders
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {trustedBy.map((company) => (
              <div key={company} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
                <CheckCircle2 className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">{company}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        
        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-3">
            Ready to <span className="gradient-text">Get Started?</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join companies using AI agents to streamline operations and drive innovation.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gradient" size="lg" asChild className="group">
              <Link to="/agents">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* RAG Chatbot */}
      <RAGChatbot />
    </div>
  )
}
