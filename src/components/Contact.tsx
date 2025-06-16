'use client';

const Contact = () => {
  return (
    <section className="bg-zinc-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-zinc-400 mb-6">
            Have questions about our candles or your order? We'd love to hear from you.
          </p>

          <div className="space-y-4 text-sm">
            <div>
              <span className="block text-yellow-400 font-medium">Email:</span>
              <span>support@candlux.in</span>
            </div>
            <div>
              <span className="block text-yellow-400 font-medium">Phone:</span>
              <span>+91 9876543210</span>
            </div>
            <div>
              <span className="block text-yellow-400 font-medium">Address:</span>
              <span>Lalkuan, Uttarakhand, India</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-96">
          <iframe
            title="Candlux Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.5036989601674!2d79.51289617496191!3d29.02821507542925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0b5e68eaa07d5%3A0xa8c83f336b6b0a04!2sLalkuan%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1718092346906!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded-xl border-none"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
