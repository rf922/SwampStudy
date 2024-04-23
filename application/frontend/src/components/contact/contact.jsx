const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-purple-200 rounded-lg p-4 shadow-lg">
        <h1 className="text-xl font-bold mb-4 text-center">Contact Us!</h1>
        <div className="text-center mb-2">
          <p>
            Email:{" "}
            <a
              href="mailto:swampstudy@gmail.com"
              className="text-blue-600 hover:text-blue-800"
            >
              swampstudy@gmail.com
            </a>
          </p>
        </div>
        <div className="text-center mb-2">
          <p>
            Phone:{" "}
            <a
              href="tel:+14086410752"
              className="text-blue-600 hover:text-blue-800"
            >
              (408) 641-0752
            </a>
          </p>
        </div>
        <div className="text-center mb-2">
          <p>Business Hours: Monday to Friday, 9 AM to 5 PM (PST)</p>
        </div>
        <div className="text-center">
          <p>We will respond to your inquiries within one business day.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
