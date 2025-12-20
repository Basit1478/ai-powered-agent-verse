import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, TrendingUp, Target, MessageSquare, Bot, Sparkles, Zap, 
  BrainCircuit, Shield, BarChart3, Briefcase, HeadphonesIcon, 
  Code, Lightbulb, Scale, ArrowRight, CheckCircle2, Globe
} from "lucide-react"
import { ChatInterface } from "@/components/ChatInterface"
import { Link } from "react-router-dom"

export default function Agents() {
  const [chatAgent, setChatAgent] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const categories = [
    { id: "all", label: "All Agents", icon: Bot },
    { id: "leadership", label: "Leadership", icon: Target },
    { id: "operations", label: "Operations", icon: Briefcase },
    { id: "growth", label: "Growth", icon: TrendingUp },
    { id: "support", label: "Support", icon: HeadphonesIcon },
  ]

  const agents = [
    {
      id: "ceo",
      name: "CEO Agent",
      title: "Chief Executive AI",
      icon: Target,
      category: "leadership",
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      bgGlow: "bg-violet-500/20",
      description: "Strategic visionary driving company direction and high-stakes decisions",
      specialties: ["Strategic Planning", "Leadership", "Decision Making", "Vision Setting"],
      metrics: { users: "12K+", rating: "4.9", responses: "500K+" },
      systemPrompt: `You are a seasoned CEO with 20+ years of experience leading successful companies across multiple industries. You provide strategic guidance, leadership insights, and help with high-level business decisions.

EXPERTISE AREAS:
• Strategic Planning: Long-term vision, strategic roadmaps, competitive analysis, market positioning
• Leadership: Team building, executive coaching, organizational culture, change management
• Decision Making: Risk assessment, data-driven decisions, scenario planning, crisis management
• Vision Setting: Company mission, values alignment, innovation strategy, future planning
• Financial Strategy: Capital allocation, fundraising, M&A, investor relations, financial planning

INSTRUCTIONS:
- Think strategically and consider long-term implications
- Provide frameworks for complex business decisions
- Ask probing questions to understand the full context

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Strategic business planning", "Leadership guidance", "Market expansion strategies", "Investment decisions", "Company vision development"]
    },
    {
      id: "hunarbot",
      name: "HR Agent",
      title: "Human Resources AI",
      icon: Users,
      category: "operations",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      bgGlow: "bg-blue-500/20",
      description: "Talent acquisition and employee success optimization specialist",
      specialties: ["Talent Acquisition", "Employee Development", "Performance Management", "HR Policies"],
      metrics: { users: "8K+", rating: "4.8", responses: "320K+" },
      systemPrompt: `You are an expert HR professional with 15+ years of experience in human resources, talent management, and organizational development. 

EXPERTISE AREAS:
• Talent Acquisition: Recruitment strategies, candidate screening, interview techniques, employer branding
• Employee Development: Training programs, career planning, skill assessment, succession planning
• Performance Management: Goal setting, performance reviews, KPIs, feedback systems, improvement plans
• HR Policies: Employee handbooks, compliance, workplace policies, grievance procedures

INSTRUCTIONS:
- Provide practical, actionable HR advice based on industry best practices
- Reference current HR trends and legal requirements when relevant

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Recruitment strategies", "Employee onboarding", "Performance evaluation", "HR policy development", "Team building"]
    },
    {
      id: "buzzbot",
      name: "Marketing Agent",
      title: "Growth Marketing AI",
      icon: TrendingUp,
      category: "growth",
      gradient: "from-emerald-600 via-green-600 to-teal-600",
      bgGlow: "bg-emerald-500/20",
      description: "Creative marketing mastermind for campaigns and explosive brand growth",
      specialties: ["Digital Marketing", "Brand Strategy", "Campaign Management", "Social Media"],
      metrics: { users: "15K+", rating: "4.9", responses: "620K+" },
      systemPrompt: `You are a creative marketing expert with 12+ years of experience in digital marketing, brand building, and growth strategies. 

EXPERTISE AREAS:
• Digital Marketing: SEO/SEM, social media marketing, email campaigns, content marketing, PPC advertising
• Brand Strategy: Brand positioning, messaging, visual identity, brand guidelines, rebranding
• Campaign Management: Multi-channel campaigns, launch strategies, A/B testing, performance optimization

INSTRUCTIONS:
- Provide creative and data-driven marketing solutions
- Suggest specific tools, platforms, and tactics for implementation

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Marketing campaigns", "Social media strategies", "Content marketing", "Brand positioning", "Customer acquisition"]
    },
    {
      id: "financebot",
      name: "Finance Agent",
      title: "CFO Intelligence AI",
      icon: BarChart3,
      category: "leadership",
      gradient: "from-amber-600 via-orange-600 to-red-600",
      bgGlow: "bg-amber-500/20",
      description: "Financial strategy and analytics expert for data-driven decisions",
      specialties: ["Financial Planning", "Budgeting", "Investment Analysis", "Risk Management"],
      metrics: { users: "6K+", rating: "4.7", responses: "180K+" },
      systemPrompt: `You are a seasoned CFO with expertise in financial planning, analysis, and strategic financial management.

EXPERTISE AREAS:
• Financial Planning: Budgeting, forecasting, cash flow management, financial modeling
• Investment Analysis: ROI calculations, capital allocation, portfolio optimization, due diligence
• Risk Management: Financial risk assessment, hedging strategies, compliance, internal controls

INSTRUCTIONS:
- Provide data-driven financial insights and recommendations
- Explain complex financial concepts in accessible terms

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Financial planning", "Budget optimization", "Investment analysis", "Risk assessment", "Financial reporting"]
    },
    {
      id: "legalbot",
      name: "Legal Agent",
      title: "Legal Counsel AI",
      icon: Scale,
      category: "operations",
      gradient: "from-slate-600 via-gray-600 to-zinc-600",
      bgGlow: "bg-slate-500/20",
      description: "Business law and compliance guidance for risk mitigation",
      specialties: ["Contract Review", "Compliance", "Corporate Law", "IP Protection"],
      metrics: { users: "4K+", rating: "4.8", responses: "95K+" },
      systemPrompt: `You are a legal advisor specializing in business law, contracts, and regulatory compliance.

EXPERTISE AREAS:
• Contract Review: Agreement analysis, term negotiation, risk identification, contract drafting
• Compliance: Regulatory requirements, industry standards, audit preparation, policy development
• Corporate Law: Business formation, governance, shareholder agreements, M&A legal aspects

INSTRUCTIONS:
- Provide general legal guidance (not legal advice)
- Always recommend consulting with a licensed attorney for specific legal matters

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Contract review", "Compliance guidance", "Legal risk assessment", "IP protection", "Policy development"]
    },
    {
      id: "techbot",
      name: "Tech Agent",
      title: "CTO Intelligence AI",
      icon: Code,
      category: "operations",
      gradient: "from-pink-600 via-rose-600 to-red-600",
      bgGlow: "bg-pink-500/20",
      description: "Technology strategy and digital transformation architect",
      specialties: ["Tech Strategy", "Architecture", "AI/ML", "Digital Transformation"],
      metrics: { users: "10K+", rating: "4.9", responses: "420K+" },
      systemPrompt: `You are a technology strategist and CTO advisor with expertise in digital transformation and tech architecture.

EXPERTISE AREAS:
• Tech Strategy: Technology roadmaps, vendor selection, build vs buy decisions, tech stack optimization
• Architecture: System design, scalability planning, microservices, cloud infrastructure
• AI/ML: AI integration opportunities, ML use cases, automation strategies

INSTRUCTIONS:
- Provide practical technology recommendations based on business needs
- Explain technical concepts in accessible terms for non-technical stakeholders

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Tech strategy planning", "System architecture", "AI integration", "Digital transformation", "Security assessment"]
    },
    {
      id: "salesbot",
      name: "Sales Agent",
      title: "Sales Commander AI",
      icon: Briefcase,
      category: "growth",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      bgGlow: "bg-cyan-500/20",
      description: "Sales optimization and revenue acceleration specialist",
      specialties: ["Sales Strategy", "Pipeline Management", "Negotiation", "CRM"],
      metrics: { users: "9K+", rating: "4.8", responses: "380K+" },
      systemPrompt: `You are a sales expert with extensive experience in B2B and B2C sales strategies, pipeline management, and revenue optimization.

EXPERTISE AREAS:
• Sales Strategy: Go-to-market planning, territory management, quota setting, sales playbooks
• Pipeline Management: Lead qualification, opportunity tracking, forecasting, deal acceleration
• Negotiation: Pricing strategies, objection handling, closing techniques

INSTRUCTIONS:
- Provide actionable sales tactics and strategies
- Focus on metrics-driven approaches to sales improvement

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Sales strategy", "Pipeline optimization", "Negotiation tactics", "CRM setup", "Revenue forecasting"]
    },
    {
      id: "supportbot",
      name: "Support Agent",
      title: "Customer Success AI",
      icon: HeadphonesIcon,
      category: "support",
      gradient: "from-teal-600 via-emerald-600 to-green-600",
      bgGlow: "bg-teal-500/20",
      description: "Customer experience and support excellence champion",
      specialties: ["Customer Support", "Experience Design", "Retention", "Feedback Analysis"],
      metrics: { users: "20K+", rating: "4.9", responses: "1M+" },
      systemPrompt: `You are a customer success expert focused on delivering exceptional customer experiences and building lasting relationships.

EXPERTISE AREAS:
• Customer Support: Ticket resolution, escalation handling, support team training, SLA management
• Experience Design: Customer journey mapping, touchpoint optimization, satisfaction improvement
• Retention: Churn prevention, loyalty programs, customer feedback loops

INSTRUCTIONS:
- Prioritize customer satisfaction in all recommendations
- Focus on both reactive support and proactive customer success

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Support optimization", "Customer journey design", "Retention strategies", "Feedback systems", "Team training"]
    },
    {
      id: "innovationbot",
      name: "Innovation Agent",
      title: "Innovation Catalyst AI",
      icon: Lightbulb,
      category: "growth",
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      bgGlow: "bg-yellow-500/20",
      description: "Product innovation and creative ideation powerhouse",
      specialties: ["Product Innovation", "Design Thinking", "R&D", "Trend Analysis"],
      metrics: { users: "5K+", rating: "4.7", responses: "120K+" },
      systemPrompt: `You are a product innovation specialist focused on driving creativity, new product development, and market disruption.

EXPERTISE AREAS:
• Product Innovation: Ideation frameworks, product roadmapping, MVP development, feature prioritization
• Design Thinking: User research, prototyping, iteration cycles, human-centered design
• R&D: Research methodologies, patent strategies, technology scouting

INSTRUCTIONS:
- Encourage creative thinking and unconventional approaches
- Balance creativity with practical business considerations

Auto-detect the user's language and respond in the same language. Support: English, Urdu, Hindi, Arabic, French, Spanish, Chinese.`,
      tasks: ["Product ideation", "Design thinking workshops", "Innovation strategy", "Trend analysis", "R&D planning"]
    }
  ]

  const filteredAgents = activeCategory === "all" 
    ? agents 
    : agents.filter(agent => agent.category === activeCategory)

  const handleAgentSelect = (agent: any) => {
    setChatAgent(agent)
  }

  const closeChatInterface = () => {
    setChatAgent(null)
  }

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "3M+", label: "Conversations" },
    { value: "98%", label: "Satisfaction" },
    { value: "24/7", label: "Availability" },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
                <BrainCircuit className="w-4 h-4 mr-2 inline" />
                Enterprise AI Agents Platform
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Transform Your Business
              <span className="block gradient-text">Through AI Agents</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Deploy intelligent AI agents across every department. From strategy to support, 
              our specialized agents work 24/7 to accelerate your business growth.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-6">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Globe className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-border/50 bg-muted/30 sticky top-16 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "gradient" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="transition-all duration-300"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet Your <span className="gradient-text">AI Workforce</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each agent is trained on industry best practices and ready to transform your operations
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <Card className="h-full relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 ${agent.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`} />
                  
                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`p-3 bg-gradient-to-br ${agent.gradient} rounded-xl shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <agent.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <Badge variant="outline" className="text-xs bg-background/50">
                        {agent.category}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
                      {agent.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{agent.title}</p>
                  </CardHeader>

                  <CardContent className="relative space-y-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs bg-muted/50">
                          {specialty}
                        </Badge>
                      ))}
                      {agent.specialties.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-muted/50">
                          +{agent.specialties.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-foreground">{agent.metrics.users}</div>
                        <div className="text-xs text-muted-foreground">Users</div>
                      </div>
                      <div className="text-center border-x border-border/50">
                        <div className="text-sm font-semibold text-foreground">⭐ {agent.metrics.rating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-foreground">{agent.metrics.responses}</div>
                        <div className="text-xs text-muted-foreground">Responses</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link to={`/agents/${agent.id}`} className="flex-1">
                        <Button variant="gradient" className="w-full group/btn">
                          <span>Launch Agent</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAgentSelect(agent)}
                        className="shrink-0"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Enterprise-Grade <span className="gradient-text">AI Capabilities</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for scale, security, and seamless integration with your existing workflows
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BrainCircuit,
                title: "Domain Expertise",
                description: "Each agent is trained on industry-specific knowledge and best practices",
                gradient: "from-violet-500 to-purple-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "SOC 2 compliant with end-to-end encryption and data privacy controls",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                description: "15+ languages including English, Urdu, Arabic, Spanish, and Chinese",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: Zap,
                title: "Real-time Responses",
                description: "Voice and text interactions with instant AI-powered responses 24/7",
                gradient: "from-amber-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className={`mx-auto mb-4 p-3 bg-gradient-to-br ${feature.gradient} rounded-xl w-fit`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of companies using our AI agents to automate operations, 
              accelerate growth, and deliver exceptional experiences.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-6">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface Modal */}
      <AnimatePresence>
        {chatAgent && (
          <ChatInterface
            agent={chatAgent}
            onClose={closeChatInterface}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
