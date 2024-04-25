const PrivacyPolicy = () => {
  return (
    <div>
      <div className="text-center underline m-2">
        <h1>
          <b>Privacy Policy as of 4/22/2024</b>
        </h1>
      </div>
      <div className="m-5">
        <p>
          SwampStudy respects your privacy. We will not share your personal
          information with third parties without your consent. However, by using
          SwampStudy, you agree to allow other registered users to view your
          profile information for the purpose of finding a study buddy. Here at
          Swamp Study, we want to be transparent with our user base.
        </p>

        <p>
          <b>1. Information We Collect</b>
          <br />
          We collect information that you provide directly to us when you:
          <ul>
            <li>Register an account (e.g., name, email address, student ID)</li>
            <li>
              Fill out your profile (e.g., classes, availability, study
              preferences)
            </li>
            <li>Use the communication features within the app</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          We also collect certain information automatically when you use our
          app:
          <ul>
            <li>Log data and device information</li>
            <li>Usage data and preferences</li>
            <li>Location data (only if you give us permission)</li>
          </ul>
        </p>

        <p>
          <b>2. How We Use Your Information</b>
          <br />
          We use the information we collect to:
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>
              Facilitate the matching process with potential study buddies
            </li>
            <li>
              Communicate with you about products, services, and promotional
              offers
            </li>
            <li>Enhance the security and safety of our app</li>
            <li>Comply with legal obligations</li>
          </ul>
          Your privacy is our priority, and we&apos;re committed to protecting
          it while providing you with the best study collaboration platform.
        </p>

        <p>
          <b>Sharing of Information</b>
          <br />
          We may share your information with:
          <ul>
            <li>
              Other users of the app for the purpose of matching potential study
              buddies
            </li>
            <li>Service providers who perform services on our behalf</li>
            <li>
              Law enforcement or other authorities if required by law or in a
              good faith belief that such access is reasonably necessary to
              respond to claims, or protect the rights, property or safety of
              our company, employees, customers, or the public
            </li>
          </ul>
        </p>

        <p>
          <b>Your Choices and Control over Your Information</b>
          <br />
          You may review, update, or delete your account information at any time
          through the app settings. You also have the option to manage your
          privacy settings, such as location sharing.
        </p>

        <p>
          <b>Security</b>
          <br />
          We take reasonable measures to help protect information about you from
          loss, theft, misuse, and unauthorized access, disclosure, alteration,
          and destruction.
        </p>

        <p>
          <b>Changes to Our Privacy Policy</b>
          <br />
          We may modify this privacy policy from time to time. If we make
          material changes to it, we will provide notice through the app or by
          other means to provide you the opportunity to review the changes
          before they become effective.
        </p>

        <p>
          If you have any questions or concerns about our Privacy Policy, please
          do not hesitate to{" "}
          <a href="/contact" className="text-purple-600 hover:text-purple-900">
            Contact Us
          </a>
          . We are here to help.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
