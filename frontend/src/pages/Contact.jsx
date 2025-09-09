export default function Contact() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Have questions, feedback, or just want to say hello? Fill out the form
        below and we’ll get back to you soon.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            rows="4"
            placeholder="Your message..."
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"></textarea>
        </div>

        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
