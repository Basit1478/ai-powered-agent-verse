import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
      description: "Recipe optimization, food safety compliance, inventory management, and customer preference analysis.",
      agentCount: 10,
      gradient: "from-orange-500 to-red-500",
      bgGlow: "bg-orange-500/20",
    },
    {
      icon: Factory,
      title: "Machine Industry",
      description: "Predictive maintenance, production optimization, quality control, and supply chain automation.",
      agentCount: 10,
      gradient: "from-slate-500 to-zinc-600",
      bgGlow: "bg-slate-500/20",
    },
    {
      icon: Shirt,
      title: "Textile Industry",
      description: "Design trend analysis, fabric quality control, sustainable sourcing, and fashion forecasting.",
      agentCount: 10,
      gradient: "from-pink-500 to-purple-500",
      bgGlow: "bg-pink-500/20",
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Property valuation, market analysis, lead generation, and virtual tour coordination.",
      agentCount: 10,
      gradient: "from-emerald-500 to-teal-500",
      bgGlow: "bg-emerald-500/20",
    },
    {
      icon: Stethoscope,
      title: "Medical Industry",
      description: "Patient triage, appointment scheduling, medical research, and healthcare compliance.",
      agentCount: 10,
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/20",
    },
    {
      icon: Cpu,
      title: "Tech Industry",
      description: "Code review, DevOps automation, technical documentation, and security analysis.",
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
      <section className="relative pt-32 pb-24 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              60+ Specialized AI Agents Across 6 Industries
            </span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            The Future of{" "}
            <span className="relative">
              <span className="gradient-text">Industry</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
            <br />
            <span className="text-muted-foreground">is AI-Powered</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Transform your business with intelligent AI agents designed for 
            <span className="text-foreground font-medium"> Food, Manufacturing, Textile, Real Estate, Medical, </span>
            and <span className="text-foreground font-medium">Tech</span> industries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="gradient" size="xl" asChild className="group text-lg px-8">
              <Link to="/agents">
                Explore All Agents
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="text-lg px-8">
              <Link to="/pricing">See Pricing</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Industries Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-muted/30" />
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              AI Agents for{" "}
              <span className="gradient-text">Every Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each industry has 10 specialized AI agents trained on domain-specific knowledge 
              and best practices to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/agents" className="block h-full">
                  <Card className="h-full bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/40 transition-all duration-300 overflow-hidden group">
                    <CardContent className="p-8 relative">
                      {/* Background Glow */}
                      <div className={`absolute top-0 right-0 w-32 h-32 ${industry.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${industry.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <industry.icon className="h-8 w-8 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {industry.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {industry.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                            <Bot className="w-4 h-4" />
                            {industry.agentCount} AI Agents
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button variant="gradient" size="lg" asChild className="group">
              <Link to="/agents">
                View All 60+ Agents
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Businesses{" "}
              <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade AI solutions that scale with your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group"
              >
                <div className="flex gap-6 p-8 rounded-3xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 border-y border-border/50 bg-muted/20">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="text-center text-muted-foreground mb-8">
            Trusted by industry leaders worldwide
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {trustedBy.map((company) => (
              <div 
                key={company}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{company}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              Start Your AI Journey Today
            </span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Ready to Transform{" "}
            <span className="gradient-text">Your Industry?</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Join thousands of forward-thinking companies using our AI agents 
            to streamline operations, reduce costs, and drive innovation.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" asChild className="group text-lg px-10">
              <Link to="/agents">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="text-lg px-10">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
