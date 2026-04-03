import { 
  UserPlus, Search, FileText, DollarSign, 
  CheckCircle, MessageSquare, Star, Shield,
  Briefcase, Users, Clock, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Create Your Account',
      description: 'Sign up in minutes and set up your profile. You can be both a client and a freelancer on the same account.',
      icon: UserPlus,
      color: 'text-blue-400',
    },
    {
      id: 2,
      title: 'Post or Browse Gigs',
      description: 'Clients post projects with clear budgets and deadlines. Freelancers browse and apply to opportunities that match their skills.',
      icon: Search,
      color: 'text-green-400',
    },
    {
      id: 3,
      title: 'Review & Hire',
      description: 'Clients review applications and select the best candidate. Freelancers get notified when they\'re hired.',
      icon: Users,
      color: 'text-purple-400',
    },
    {
      id: 4,
      title: 'Secure Escrow Payment',
      description: 'Client pays the full amount upfront. Money is held securely in escrow until work is completed and approved.',
      icon: DollarSign,
      color: 'text-gold-300',
    },
    {
      id: 5,
      title: 'Work & Deliver',
      description: 'Freelancer completes the work according to project phases. Submit deliverables through the platform.',
      icon: Briefcase,
      color: 'text-orange-400',
    },
    {
      id: 6,
      title: 'Review & Release Payment',
      description: 'Client reviews the work and approves. Payment is released from escrow. Auto-approval after 5 days protects freelancers.',
      icon: CheckCircle,
      color: 'text-green-400',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Escrow Protection',
      description: 'All payments are held in secure escrow until work is completed and approved by both parties.',
    },
    {
      icon: Clock,
      title: 'Auto-Approval',
      description: 'Work is automatically approved after 5 days if client doesn\'t respond, protecting freelancers from delays.',
    },
    {
      icon: FileText,
      title: 'Clear Contracts',
      description: 'Auto-generated contracts with project phases, deadlines, and payment terms that both parties sign.',
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Build your reputation with reviews from clients and freelancers. Ratings visible on your profile.',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Communicate directly with clients or freelancers through our built-in messaging system.',
    },
    {
      icon: Award,
      title: 'Verified Users',
      description: 'Identity verification and payment verification ensure you\'re working with trusted professionals.',
    },
  ];

  const roles = [
    {
      title: 'As a Client',
      subtitle: 'Post projects and hire talent',
      benefits: [
        'Post unlimited gigs with clear budgets',
        'Review applications from qualified freelancers',
        'Track project progress with milestone-based phases',
        'Only pay when you approve the work',
        'Protected by escrow until completion',
        'Leave reviews to help the community',
      ],
      cta: 'Post Your First Gig',
      link: '/post-gig',
    },
    {
      title: 'As a Freelancer',
      subtitle: 'Find work and get paid',
      benefits: [
        'Browse thousands of opportunities',
        'Apply with your portfolio and experience',
        'Get paid through secure escrow',
        'Protected by auto-approval system',
        'Build your reputation with reviews',
        'Work on your own schedule',
      ],
      cta: 'Find Your Next Gig',
      link: '/explore',
    },
  ];

  const faqs = [
    {
      question: 'How does the escrow system work?',
      answer: 'When a client hires you, they pay the full project amount upfront. This money is held securely by FreelanceHub in escrow. Once you complete the work and the client approves it, the payment is released to you. If the client doesn\'t respond within 5 days, the payment is automatically approved and released.',
    },
    {
      question: 'What is auto-approval?',
      answer: 'Auto-approval protects freelancers from clients who disappear after work is delivered. If a client doesn\'t review your submitted work within 5 days (120 hours), the system automatically approves it and releases the payment from escrow to you.',
    },
    {
      question: 'Can I be both a client and freelancer?',
      answer: 'Yes! Your account supports both roles. You can post gigs as a client and apply for gigs as a freelancer. Your profile shows separate ratings and stats for each role.',
    },
    {
      question: 'How are project phases used?',
      answer: 'Projects are broken into phases for better tracking and organization. While payment is released at the end, phases help both parties track progress and ensure work is completed on schedule.',
    },
    {
      question: 'What if I\'m not satisfied with the work?',
      answer: 'You can request revisions before approving. The freelancer has 3 days to make changes. If you still can\'t reach an agreement, contact our support team for dispute resolution.',
    },
    {
      question: 'How do I get paid?',
      answer: 'Once your work is approved (or auto-approved after 5 days), the payment is released from escrow to your FreelanceHub wallet. You can then withdraw it to your bank account.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-200">
      {/* Hero Section */}
      <section className="bg-linear-to-brom-dark-100 to-dark-200 border-b border-dark-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gold-300 mb-4">How FreelanceHub Works</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A simple, secure platform connecting clients with freelancers. Protected by escrow and designed for trust.
          </p>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gold-300 text-center mb-12">6 Simple Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="bg-dark-100 border border-dark-50 rounded-lg p-6 hover:border-gold-400 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold-300 flex items-center justify-center text-dark-200 font-bold text-xl shrink-0">
                    {step.id}
                  </div>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-dark-100 border-y border-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gold-300 text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-dark-200 border border-dark-50 rounded-lg p-6">
                <feature.icon className="h-10 w-10 text-gold-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gold-300 text-center mb-12">Choose Your Role (or Both!)</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {roles.map((role) => (
              <div key={role.title} className="bg-dark-100 border border-dark-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gold-300 mb-2">{role.title}</h3>
                <p className="text-gray-400 mb-6">{role.subtitle}</p>
                
                <ul className="space-y-3 mb-8">
                  {role.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={role.link}>
                  <Button className="w-full">{role.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-dark-100 border-t border-dark-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gold-300 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-dark-200 border border-dark-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gold-300 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of clients and freelancers using FreelanceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button className="px-8 py-3 text-lg">Sign Up Free</Button>
            </Link>
            <Link to="/explore">
              <Button variant="secondary" className="px-8 py-3 text-lg">Browse Gigs</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;