const Licensing = () => {
  const lastModifiedDate = "April 22, 2024"; // Update this as needed

  return (
    <div className="licensing-page-container m-4">
      <h1 className="text-xl font-bold mb-4">Licensing Information</h1>

      <h2 className="text-lg font-semibold mb-2">Copyright Notice</h2>
      <p className="mb-4">
        Unless otherwise noted, all materials contained on this website
        including but not limited to text, graphics, website name, code, images
        and logos are the intellectual property of SwampStudy, and are protected
        by applicable copyright laws. Any misuse of the materials on this
        website, including reproduction, modification, distribution, or
        replication, any form of data extraction or data mining, or other
        commercial exploitation of any kind, without prior written permission of
        an authorized officer of SwampStudy is strictly prohibited. You are also
        advised that SwampStudy will aggressively enforce its intellectual
        property rights to the fullest extent of the law, including the seeking
        of criminal prosecution.
      </p>

      <p className="text-sm">
        <i>Last Modified: {lastModifiedDate}</i>
      </p>
    </div>
  );
};

export default Licensing;
