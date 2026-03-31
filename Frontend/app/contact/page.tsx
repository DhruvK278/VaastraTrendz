import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <Navbar />
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-support-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-6xl font-normal mb-6 font-['Bourbon_Street'] tracking-wide">
            Get in <span className="gold-text">Touch</span>
          </h1>
          <div className="gold-underline mx-auto mb-8"></div>
          <p className="text-lg text-[#888888] max-w-2xl mx-auto font-light tracking-wide">
            We'd love to hear from you. Whether you have a question about our collections, need assistance with your order, or seek styling advice, our concierge team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="space-y-12 animate-support-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-3xl font-normal mb-8 font-['Bourbon_Street'] gold-text">Contact Information</h2>
              <p className="text-[#888888] leading-relaxed mb-10 font-light">
                Reach out to us directly through any of our dedicated channels. We strive to process all inquiries as swiftly as possible with the utmost care.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="p-3 luxury-card rounded-full mt-1">
                  <MapPin className="w-6 h-6 gold-text" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 tracking-wide">Visit Our Boutique</h3>
                  <p className="text-[#888888] font-light">123 Fashion Avenue<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-3 luxury-card rounded-full mt-1">
                  <Mail className="w-6 h-6 gold-text" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 tracking-wide">Email Inquiries</h3>
                  <p className="text-[#888888] font-light">concierge@vaastratrendz.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-3 luxury-card rounded-full mt-1">
                  <Phone className="w-6 h-6 gold-text" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 tracking-wide">Private Consultations</h3>
                  <p className="text-[#888888] font-light">+1 (800) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-3 luxury-card rounded-full mt-1">
                  <Clock className="w-6 h-6 gold-text" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 tracking-wide">Boutique Hours</h3>
                  <p className="text-[#888888] font-light">Monday - Friday: 10:00 AM - 7:00 PM<br />Saturday: 11:00 AM - 5:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="luxury-card p-8 md:p-12 rounded-sm animate-support-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-normal mb-8 font-['Bourbon_Street'] tracking-widest text-[#F5F0E8]">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#888888] uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full bg-[#111111] border border-[#222] rounded-sm p-3 text-[#F5F0E8] focus:border-[#C9A96E] focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#888888] uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full bg-[#111111] border border-[#222] rounded-sm p-3 text-[#F5F0E8] focus:border-[#C9A96E] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#888888] uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[#111111] border border-[#222] rounded-sm p-3 text-[#F5F0E8] focus:border-[#C9A96E] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-[#888888] uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-[#111111] border border-[#222] rounded-sm p-3 text-[#F5F0E8] focus:border-[#C9A96E] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-[#888888] uppercase tracking-wider">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-[#111111] border border-[#222] rounded-sm p-3 text-[#F5F0E8] focus:border-[#C9A96E] focus:outline-none transition-colors resize-none gold-scrollbar"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full btn-gold-filled py-4 mt-4"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      </div>
    </main>
  );
}