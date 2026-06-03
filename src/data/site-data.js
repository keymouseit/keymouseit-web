const BLUE = "#2563FF", GREEN = "#16A34A";

/* ---- Industries (hero uses first 5; Industry Solutions uses all 6) ---- */
export const INDUSTRIES = [
  {
    id: "ai", tab: "AI Automation", icon: "Sparkles", accent: BLUE, accent2: "#4F46E5",
    core: { label: "AI Engine", line: "Understand, decide, and act across your stack." },
    flow: { core: "AI Processing Layer", coreIcon: "BrainCircuit,Brain",
      inputs: [{t:"CRM",i:"Users"},{t:"ERP",i:"Layers"},{t:"Documents",i:"FileText"},{t:"Inventory",i:"Package"},{t:"Orders",i:"ShoppingCart"}],
      outputs: [{t:"Automation",i:"Zap"},{t:"Forecasting",i:"TrendingUp"},{t:"Recommendations",i:"Sparkles"},{t:"Notifications",i:"Bell"},{t:"Insights",i:"BarChart3"}] },
    headline: "Automate the work that slows your teams down.",
    summary: "Agents and workflow automation that connect your tools, read your data, and take action — with humans in the loop where it matters.",
    workflow: [
      { label: "Trigger / intake", icon: "Inbox" },
      { label: "AI reasoning layer", icon: "BrainCircuit,Brain" },
      { label: "Action across tools", icon: "Workflow" },
      { label: "Audit & handoff", icon: "ClipboardCheck" },
    ],
    modules: [
      { title: "Workflow Orchestration", desc: "Multi-step automations across your stack", icon: "Workflow" },
      { title: "AI Agents", desc: "Task-specific agents with guardrails", icon: "Bot,Cpu" },
      { title: "Document Intelligence", desc: "Extract, classify, route documents", icon: "FileText" },
      { title: "Human-in-the-Loop", desc: "Review queues for sensitive actions", icon: "UserCheck,Users" },
    ],
    metrics: [
      { value: "70%", label: "Manual work removed" },
      { value: "4.2x", label: "Faster cycle time" },
      { value: "24/7", label: "Always-on execution" },
    ],
    outcomes: [
      { title: "Less manual work", desc: "Reclaim hours lost to copy-paste and swivel-chair tasks.", icon: "Zap" },
      { title: "Fewer errors", desc: "Consistent, auditable execution every run.", icon: "ShieldCheck" },
      { title: "Faster decisions", desc: "Insights surfaced the moment data changes.", icon: "Gauge" },
    ],
  },
  {
    id: "logistics", tab: "Logistics", icon: "Truck", accent: BLUE, accent2: "#3B82F6",
    core: { label: "Control Tower", line: "Unified data. Smarter routes. On-time deliveries." },
    flow: { core: "Logistics Intelligence", coreIcon: "TowerControl,RadioTower",
      inputs: [{t:"Orders",i:"ShoppingCart"},{t:"Inventory",i:"Package"},{t:"Fleet",i:"Truck"},{t:"Warehouses",i:"Warehouse,Building2"},{t:"Carriers",i:"Ship"}],
      outputs: [{t:"Route Plans",i:"Route"},{t:"ETA Forecasts",i:"Clock"},{t:"Exception Alerts",i:"Bell"},{t:"Load Plans",i:"Boxes,Box"},{t:"Live Tracking",i:"MapPin"}] },
    headline: "One control tower for inventory, dispatch, and delivery.",
    summary: "Real-time visibility across your supply chain, with forecasting and routing that keep promises to customers.",
    workflow: [
      { label: "Demand signal", icon: "TrendingUp" },
      { label: "Inventory & planning", icon: "Package" },
      { label: "Dispatch optimization", icon: "Truck" },
      { label: "Live delivery tracking", icon: "MapPin" },
    ],
    modules: [
      { title: "Control Tower", desc: "Unified view of every shipment & SKU", icon: "TowerControl,RadioTower" },
      { title: "Demand Forecasting", desc: "AI-driven demand and replenishment", icon: "TrendingUp" },
      { title: "Route & Load Optimization", desc: "Lower cost per delivery", icon: "Route,Truck" },
      { title: "Exception Alerts", desc: "Flag delays before they cascade", icon: "Bell" },
    ],
    metrics: [
      { value: "98.4%", label: "On-time delivery" },
      { value: "−22%", label: "Logistics cost" },
      { value: "Real-time", label: "Shipment visibility" },
    ],
    outcomes: [
      { title: "On-time deliveries", desc: "Hit delivery windows and protect SLAs.", icon: "Clock" },
      { title: "Lower carrying cost", desc: "Right inventory, right place, right time.", icon: "DollarSign" },
      { title: "End-to-end visibility", desc: "See the whole chain on one screen.", icon: "Eye" },
    ],
  },
  {
    id: "manufacturing", tab: "Manufacturing", icon: "Factory", accent: BLUE, accent2: "#1D4ED8",
    core: { label: "Factory Intelligence", line: "Live data from the line to the boardroom." },
    flow: { core: "Factory Intelligence", coreIcon: "Factory",
      inputs: [{t:"Machines",i:"Cog,Settings"},{t:"Sensors",i:"Activity"},{t:"Quality",i:"ClipboardCheck"},{t:"Materials",i:"Package"},{t:"Work Orders",i:"FileText"}],
      outputs: [{t:"OEE Insights",i:"BarChart3"},{t:"Maintenance",i:"Wrench"},{t:"Defect Alerts",i:"TriangleAlert,AlertTriangle"},{t:"Throughput",i:"TrendingUp"},{t:"Reports",i:"FileText"}] },
    headline: "Factory intelligence from the line to the boardroom.",
    summary: "Connect production, quality, and maintenance data into one live picture that lifts output and uptime.",
    workflow: [
      { label: "Line telemetry", icon: "Activity" },
      { label: "Quality checks", icon: "ClipboardCheck" },
      { label: "Predictive maintenance", icon: "Wrench" },
      { label: "OEE & reporting", icon: "BarChart3" },
    ],
    modules: [
      { title: "Production Monitoring", desc: "OEE, throughput, downtime live", icon: "Activity" },
      { title: "Quality Management", desc: "Catch defects at every stage", icon: "ClipboardCheck" },
      { title: "Predictive Maintenance", desc: "Asset health and early warnings", icon: "Wrench" },
      { title: "Supply Chain Link", desc: "Materials and supplier visibility", icon: "Package" },
    ],
    metrics: [
      { value: "+18%", label: "OEE improvement" },
      { value: "−31%", label: "Unplanned downtime" },
      { value: "1 view", label: "Across all plants" },
    ],
    outcomes: [
      { title: "Higher output", desc: "Improve OEE and reduce line downtime.", icon: "TrendingUp" },
      { title: "Better quality", desc: "Fewer defects, consistent standards.", icon: "CircleCheck,CheckCircle" },
      { title: "Lower waste", desc: "Optimize material and energy usage.", icon: "Recycle,Leaf" },
    ],
  },
  {
    id: "identity", tab: "Identity & Security", icon: "ShieldCheck,Shield", accent: BLUE, accent2: "#1E40AF",
    core: { label: "Identity Engine", line: "Zero-trust access. Complete protection." },
    flow: { core: "Identity Engine", coreIcon: "ShieldCheck,Shield",
      inputs: [{t:"Users",i:"Users"},{t:"Devices",i:"Smartphone"},{t:"Credentials",i:"KeyRound"},{t:"Requests",i:"Inbox"},{t:"Logs",i:"ScrollText"}],
      outputs: [{t:"Authentication",i:"Lock"},{t:"Access Control",i:"ShieldCheck"},{t:"Threat Alerts",i:"TriangleAlert,AlertTriangle"},{t:"Audit Trails",i:"FileCheck"},{t:"Compliance",i:"ClipboardCheck"}] },
    headline: "Zero-trust identity, access, and compliance — built in.",
    summary: "Secure every user and request with authentication, governance, and audit trails that satisfy regulators.",
    workflow: [
      { label: "Verify identity", icon: "Fingerprint" },
      { label: "Enforce access policy", icon: "Lock,KeyRound" },
      { label: "Detect anomalies", icon: "ShieldAlert,AlertTriangle" },
      { label: "Log & audit", icon: "ScrollText,FileCheck" },
    ],
    modules: [
      { title: "Authentication & SSO", desc: "MFA, SSO, passwordless", icon: "KeyRound,Lock" },
      { title: "Access Governance", desc: "Role-based, least-privilege access", icon: "ShieldCheck" },
      { title: "Threat Detection", desc: "Anomaly monitoring in real time", icon: "ShieldAlert,AlertTriangle" },
      { title: "Compliance & Audit", desc: "Policies, logging, audit trails", icon: "ClipboardCheck" },
    ],
    metrics: [
      { value: "Zero", label: "Trust by default" },
      { value: "SOC 2", label: "Compliance-ready" },
      { value: "<1s", label: "Auth response" },
    ],
    outcomes: [
      { title: "Stronger security", desc: "Reduce breaches and protect data.", icon: "ShieldCheck" },
      { title: "Seamless access", desc: "Secure sign-in across apps and devices.", icon: "UserCheck,Users" },
      { title: "Audit-ready", desc: "Meet standards with automated logs.", icon: "FileCheck,ClipboardCheck" },
    ],
  },
  {
    id: "energy", tab: "Energy & Sustainability", icon: "Leaf", accent: GREEN, accent2: "#22C55E",
    core: { label: "Decision Intelligence", line: "Lower cost. Lower emissions. Full visibility." },
    flow: { core: "Decision Intelligence", coreIcon: "Leaf",
      inputs: [{t:"Meters",i:"Gauge"},{t:"IoT Sensors",i:"Activity"},{t:"Assets",i:"Zap"},{t:"Grid Data",i:"Network"},{t:"Weather",i:"Cloud"}],
      outputs: [{t:"Optimization",i:"Zap"},{t:"Emission Reports",i:"Leaf"},{t:"Cost Savings",i:"DollarSign"},{t:"Alerts",i:"Bell"},{t:"Forecasts",i:"TrendingUp"}] },
    headline: "Monitor, optimize, and report on energy and emissions.",
    summary: "Turn meter, asset, and IoT data into lower costs, higher reliability, and credible sustainability reporting.",
    workflow: [
      { label: "Meter & IoT data", icon: "Gauge" },
      { label: "Usage analytics", icon: "Activity" },
      { label: "Optimization", icon: "Zap" },
      { label: "ESG reporting", icon: "FileText" },
    ],
    modules: [
      { title: "Energy Monitoring", desc: "Real-time usage and performance", icon: "Gauge,Activity" },
      { title: "Asset Management", desc: "Health and lifecycle tracking", icon: "Zap" },
      { title: "Emissions Tracking", desc: "Scope 1–3 and waste metrics", icon: "Leaf" },
      { title: "Compliance Reporting", desc: "Automated regulatory reporting", icon: "FileText" },
    ],
    metrics: [
      { value: "−27%", label: "Energy cost" },
      { value: "Scope 1–3", label: "Emissions tracked" },
      { value: "99.9%", label: "Asset uptime" },
    ],
    outcomes: [
      { title: "Lower energy cost", desc: "Optimize consumption across sites.", icon: "DollarSign" },
      { title: "Reduced emissions", desc: "Data-driven cuts to your footprint.", icon: "Leaf" },
      { title: "Stay compliant", desc: "Keep pace with evolving regulation.", icon: "ShieldCheck" },
    ],
  },
  {
    id: "retail", tab: "Retail & Commerce", icon: "ShoppingBag,Store", accent: BLUE, accent2: "#4F46E5",
    core: { label: "Commerce Core", line: "One operational view across every channel." },
    flow: { core: "Commerce Core", coreIcon: "ShoppingBag,Store",
      inputs: [{t:"Orders",i:"ShoppingCart"},{t:"Inventory",i:"Package"},{t:"Customers",i:"Users"},{t:"Channels",i:"Store"},{t:"Payments",i:"CreditCard"}],
      outputs: [{t:"Demand Forecasts",i:"TrendingUp"},{t:"Restock Alerts",i:"Bell"},{t:"Personalization",i:"Sparkles"},{t:"Fulfillment",i:"Truck"},{t:"Insights",i:"BarChart3"}] },
    headline: "Unify storefront, inventory, and fulfillment operations.",
    summary: "Connect commerce, stock, and back-office into one operational system that scales across channels.",
    workflow: [
      { label: "Omnichannel orders", icon: "ShoppingCart" },
      { label: "Inventory sync", icon: "Package" },
      { label: "Fulfillment routing", icon: "Truck" },
      { label: "Insights & loyalty", icon: "BarChart3" },
    ],
    modules: [
      { title: "Unified Commerce", desc: "Orders across web, app, and store", icon: "ShoppingCart" },
      { title: "Inventory Sync", desc: "Live stock across all channels", icon: "Package" },
      { title: "Fulfillment Engine", desc: "Smart routing and ship-from-store", icon: "Truck" },
      { title: "Customer Analytics", desc: "Behavior, loyalty, and lifetime value", icon: "BarChart3" },
    ],
    metrics: [
      { value: "+24%", label: "Conversion lift" },
      { value: "1 stock", label: "Single source of truth" },
      { value: "−40%", label: "Stockouts" },
    ],
    outcomes: [
      { title: "Fewer stockouts", desc: "Accurate inventory across channels.", icon: "Package" },
      { title: "Faster fulfillment", desc: "Route orders to the optimal location.", icon: "Truck" },
      { title: "Higher retention", desc: "Personalized, data-driven experiences.", icon: "Repeat,RefreshCw" },
    ],
  },
];

/* ---- Trust ---- */
export const TRUST_METRICS = [
  { value: "250+", label: "Projects delivered", icon: "Boxes,Box" },
  { value: "10+", label: "Years experience", icon: "Award" },
  { value: "100%", label: "Client retention", icon: "HeartHandshake" },
  { value: "5/5", label: "Client satisfaction", icon: "Star" },
];
export const CLIENT_LOGOS = ["SEforALL", "Private ID", "Outlier", "Passenger Coffee", "Penny Profit"];

/* ---- Problem ---- */
export const PROBLEMS = [
  { title: "Manual workflows slow teams down", icon: "Hand,MousePointerClick" },
  { title: "Data scattered across tools", icon: "Shuffle,Network" },
  { title: "Spreadsheet-driven decisions", icon: "Table,Sheet" },
  { title: "No real-time visibility", icon: "EyeOff" },
  { title: "AI discussed, never implemented", icon: "CloudOff,Cloud" },
  { title: "Systems that don't scale", icon: "TriangleAlert,AlertTriangle" },
];

/* ---- Case studies ---- */
export const CASES = [
  {
    industry: "Logistics & Supply Chain", tag: "Control Tower", icon: "TowerControl,RadioTower", accent: BLUE,
    title: "Logistics Control Tower",
    challenge: "Shipment data lived in five disconnected systems; delays were found after the fact.",
    solution: "A unified control tower with live tracking, forecasting, and exception alerts.",
    impact: [{ v: "30%", l: "faster delivery" }, { v: "25%", l: "lower cost" }, { v: "95%", l: "data accuracy" }],
  },
  {
    industry: "Manufacturing", tag: "Intelligence Platform", icon: "Factory", accent: BLUE,
    title: "Manufacturing Intelligence Platform",
    challenge: "Plant managers lacked a live view of OEE, quality, and downtime across lines.",
    solution: "A factory intelligence platform connecting MES, quality, and maintenance data.",
    impact: [{ v: "+18%", l: "OEE" }, { v: "−31%", l: "downtime" }],
  },
  {
    industry: "AI Automation", tag: "Workflow Automation", icon: "Sparkles", accent: BLUE,
    title: "AI Workflow Automation",
    challenge: "Operations teams spent days on manual document handling and data entry.",
    solution: "Document intelligence plus agents that route, validate, and act — with review queues.",
    impact: [{ v: "70%", l: "manual work cut" }, { v: "4.2x", l: "faster" }],
  },
  {
    industry: "Identity & Security", tag: "Identity Platform", icon: "ShieldCheck,Shield", accent: BLUE,
    title: "Identity & Security Platform",
    challenge: "Fragmented access control made audits painful and risky.",
    solution: "Zero-trust identity with SSO, governance, anomaly detection, and audit trails.",
    impact: [{ v: "Zero", l: "trust default" }, { v: "SOC 2", l: "ready" }],
  },
];

/* ---- Solutions We Build ---- */
export const SOLUTIONS = [
  { title: "Operational Intelligence", desc: "Control towers, dashboards, and decision intelligence that turn live data into action.", icon: "TowerControl,RadioTower", flow: "Data → Dashboard → Decision", use: "A live control tower for operations leaders." },
  { title: "AI Workflow Automation", desc: "Automate repetitive work and connect the processes scattered across your tools.", icon: "Workflow", flow: "Input → AI Agent → Action", use: "Auto-route, validate, and act on incoming work." },
  { title: "Enterprise Platforms", desc: "Mission-critical software engineered for performance, reliability, and scale.", icon: "Boxes,Box", flow: "Systems → Platform → Scale", use: "A mission-critical internal platform built to last." },
  { title: "Identity & Security", desc: "Authentication, access management, verification, and compliance — built in.", icon: "ShieldCheck,Shield", flow: "User → Verification → Access", use: "Zero-trust access across all your apps." },
  { title: "Mobile Applications", desc: "Consumer and enterprise mobile experiences that feel effortless.", icon: "Smartphone", flow: "Idea → App → Adoption", use: "A field-ops app your team actually adopts." },
  { title: "Data & Analytics", desc: "Transform operational data into clear, actionable insight.", icon: "BarChart3", flow: "Raw Data → Insight → Action", use: "Operational data turned into daily decisions." },
];

/* ---- Services ---- */
export const SERVICES = [
  { title: "Strategy & Architecture", desc: "Requirements, discovery, and architecture planning.", icon: "Compass,Map" },
  { title: "Product Design", desc: "UX, UI, workflows, and prototyping.", icon: "PenTool,Figma" },
  { title: "Engineering & Development", desc: "Frontend, backend, mobile, and integrations.", icon: "Code2,Code" },
  { title: "AI & Automation", desc: "Agents, workflow automation, and AI integrations.", icon: "Sparkles" },
  { title: "QA & Testing", desc: "Manual and automated quality assurance.", icon: "CircleCheck,CheckCircle" },
  { title: "Cloud & DevOps", desc: "Infrastructure, CI/CD, and monitoring.", icon: "Cloud" },
  { title: "Maintenance & Support", desc: "Post-launch support and optimization.", icon: "LifeBuoy,Headphones" },
];

/* ---- Engagement models ---- */
export const MODELS = [
  { title: "Dedicated Product Team", desc: "A full team that owns long-term development and delivery.", icon: "Users", best: "Ongoing products" },
  { title: "Fixed Scope Delivery", desc: "Well-defined projects executed to a clear scope and timeline.", icon: "Target", best: "Defined builds" },
  { title: "Staff Augmentation", desc: "Senior engineers embedded directly into your team.", icon: "UserPlus", best: "Extra capacity" },
  { title: "Strategic Technology Partner", desc: "Ongoing architecture and delivery leadership.", icon: "Handshake,Compass", best: "Long-term scale" },
];

/* ---- Delivery process ---- */
export const PROCESS = [
  { n: "01", title: "Discovery", desc: "Clear scope, risks, users, and business goals.", icon: "Search" },
  { n: "02", title: "Architecture", desc: "A scalable technical foundation before writing code.", icon: "Boxes,Box" },
  { n: "03", title: "Design", desc: "Usable workflows built around real users.", icon: "PenTool,Figma" },
  { n: "04", title: "Engineering", desc: "Transparent sprints, demos, and measurable progress.", icon: "Code2,Code" },
  { n: "05", title: "QA & Release", desc: "Quality assurance and stable, confident deployment.", icon: "CircleCheck,CheckCircle" },
  { n: "06", title: "Scale & Optimize", desc: "Monitor, improve, automate, and extend.", icon: "TrendingUp" },
];

/* ---- Why choose us ---- */
export const WHY = [
  { title: "Business-First Thinking", desc: "We start with outcomes, not features. Every system maps to a business result.", icon: "Target" },
  { title: "Senior Engineering", desc: "Senior engineers on every project — no hand-offs to junior teams.", icon: "Award,Star" },
  { title: "Transparent Communication", desc: "Clear timelines, honest trade-offs, and no surprises.", icon: "MessageSquare,MessagesSquare" },
  { title: "AI-Ready Architecture", desc: "Systems designed to adopt AI safely as you grow.", icon: "BrainCircuit,Brain" },
  { title: "Security-First Development", desc: "Security and compliance considered from day one.", icon: "ShieldCheck,Shield" },
  { title: "Long-Term Partnership", desc: "We stay invested well beyond launch.", icon: "Handshake,Heart" },
];

/* ---- FAQ ---- */
export const FAQS = [
  { q: "Can you modernize an existing platform?", a: "Yes. We routinely re-architect and modernize legacy platforms incrementally — improving performance, security, and maintainability without a risky big-bang rewrite." },
  { q: "Can you integrate AI into our systems?", a: "Absolutely. We add AI where it creates measurable value: workflow automation, document intelligence, and task-specific agents — always with the right guardrails and human oversight." },
  { q: "Do you work with startups and enterprises?", a: "Both. We scale our engagement model to fit — from a focused build for an early-stage team to a long-term partnership with an enterprise organization." },
  { q: "Can you provide a dedicated team?", a: "Yes. A dedicated product team with senior engineers, design, and delivery leadership can own your roadmap end to end." },
  { q: "Do you handle design, development, and deployment?", a: "Yes — full-cycle. Strategy, design, engineering, QA, cloud, and DevOps are all delivered in-house and tightly integrated." },
  { q: "Do you provide post-launch support?", a: "We do. Maintenance, monitoring, and ongoing optimization keep your systems healthy and improving after release." },
  { q: "How do you estimate timelines and cost?", a: "After a short discovery, we scope the work into clear milestones with a transparent estimate. You'll know the plan, the cost, and the trade-offs before we write a line of code." },
];

/* ---- Why KeyMouse IT comparison ---- */
export const WHY_COMPARE = [
  { agency: "Builds features", us: "Solves business problems", icon: "Target" },
  { agency: "Junior-heavy teams", us: "Senior-led engineering", icon: "Award,Star" },
  { agency: "Static software", us: "AI-ready systems", icon: "BrainCircuit,Brain" },
  { agency: "Project mindset", us: "Product mindset", icon: "Boxes,Box" },
  { agency: "Development only", us: "End-to-end ownership", icon: "GitBranch,Workflow" },
  { agency: "Short-term engagement", us: "Long-term partnership", icon: "Handshake,Heart" },
];
