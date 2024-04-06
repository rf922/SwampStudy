const TermsAndConditions = () => {
  return (
    <div>
      <div className="flex-wrap text-center underline m-2">
        <h1>
          <b>Terms and Conditions</b>
        </h1>
      </div>
      <div className="flex-wrap m-5">
        <br></br>

        <p>
          <b>Registration:</b> You must be a registered student to use
          SwampStudy. By registering, you agree to provide accurate and complete
          information about yourself.
        </p>
        <br></br>
        <p>
          <b>Profile:</b> Your SwampStudy profile is your responsibility. You
          agree to keep your profile information up to date, including your
          class schedule and study preferences.
        </p>
        <br></br>
        <p>
          <b>Privacy:</b> SwampStudy respects your privacy. We will not share
          your personal information with third parties without your consent.
          However, by using SwampStudy, you agree to allow other registered
          users to view your profile information for the purpose of finding a
          study buddy.
        </p>
        <br></br>
        <p>
          <b>Safety:</b> SwampStudy prioritizes your safety. We recommend that
          you verify the identity of potential study buddies before meeting in
          person. SwampStudy is not responsible for any interactions or meetings
          that occur between users.
        </p>
        <br></br>
        <p>
          <b>Code of Conduct:</b> SwampStudy is a community of students looking
          to enhance their academic experience. By using SwampStudy, you agree
          to treat other users with respect and refrain from engaging in any
          form of harassment or discrimination.
        </p>
        <br></br>
        <p>
          <b>Usage:</b> SwampStudy is intended for academic purposes only. Any
          use of SwampStudy for commercial or non-academic purposes is strictly
          prohibited.
        </p>
        <br></br>
        <p>
          <b>Termination:</b> SwampStudy reserves the right to terminate your
          account if you violate any of these terms and conditions.
        </p>
        <br></br>
        <p>
          <b>Changes:</b> SwampStudy may update these terms and conditions. You
          will be notified of any changes, and your continued use of SwampStudy
          will constitute acceptance of the new terms.
        </p>
        <br></br>
        <a href="register" className="text-purple-600 hover:text-purple-900 ">
          Go Back to Registration
        </a>
      </div>
    </div>
  );
};

export default TermsAndConditions;
