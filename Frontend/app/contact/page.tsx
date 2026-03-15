export default function Contact() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600 mb-6 text-center">
            We'd love to hear from you. Get in touch with us for any inquiries or feedback.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
              <p className="text-gray-600">123 Fashion Street</p>
              <p className="text-gray-600">New York, NY 10001</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p className="text-gray-600">info@fashionstore.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Phone</h2>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Hours</h2>
              <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
              <p className="text-gray-600">Saturday: 10am - 5pm</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}