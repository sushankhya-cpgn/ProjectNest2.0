function Feed() {
  return (
    <div className="flex gap-3 flex-col overflow-y-scroll h-4/5">
      <FeedContent />
    </div>
  );
}

function FeedContent() {
  return (
    <div className="bg-background p-5 rounded-md text-sm sm:text-base text-gray-400 ">
      <h1 className="text-3xl font-bold mb-6">
        Guide to Using the Project Proposal Platform
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          1. Viewing Project Details
        </h2>
        <p className="">
          When you first access the platform, you will see a list of projects.
          Click on a project to view detailed information, including:
        </p>
        <ul className="list-disc list-inside mt-2 ">
          <li>
            <strong>Project Title</strong>
          </li>
          <li>
            <strong>Created By</strong>: The person who initiated the project.
          </li>
          <li>
            <strong>Technology Tags</strong>: Key technologies related to the
            project.
          </li>
          <li>
            <strong>Problem Statement</strong>: The issue or challenge the
            project aims to address.
          </li>
          <li>
            <strong>Possible Solution</strong>: Proposed solutions to the
            problem (if available).
          </li>
          <li>
            <strong>Team Members</strong>: Current members involved in the
            project.
          </li>
          <li>
            <strong>Resources</strong>: Any additional resources or requirements
            for the project.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          2. Submitting a Proposal
        </h2>
        <p className="">
          If you have a proposal (e.g., a PDF document) that outlines your ideas
          or plans for the project, follow these steps:
        </p>
        <ol className="list-decimal list-inside mt-2 ">
          <li>
            <strong>Upload Proposal</strong>:
            <ul className="list-disc list-inside ml-6">
              <li>Locate the Proposal section.</li>
              <li>
                Click the Choose File button to select your proposal file.
              </li>
              <li>Once selected, the file will be displayed.</li>
            </ul>
          </li>
          <li className="mt-2">
            <strong>Send Proposal</strong>:
            <ul className="list-disc list-inside ml-6">
              <li>
                Click the Send Proposal button to upload your proposal to the
                project.
              </li>
              <li>
                You will see a notification indicating whether your proposal was
                successfully sent or if there was an error.
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          3. Handling Join Requests
        </h2>
        <p className="">
          If you are a project owner, you may receive join requests from other
          users interested in participating in your project. Manage these
          requests as follows:
        </p>
        <ol className="list-decimal list-inside mt-2 ">
          <li>
            <strong>View Join Requests</strong>:
            <ul className="list-disc list-inside ml-6">
              <li>
                Scroll to the section titled These people are interested in the
                project.
              </li>
              <li>
                Here you will find a list of users who have requested to join
                your project.
              </li>
            </ul>
          </li>
          <li className="mt-2">
            <strong>Accept or Reject Requests</strong>:
            <ul className="list-disc list-inside ml-6">
              <li>Each request has Accept and Reject buttons.</li>
              <li>Click Accept to add the person to your team.</li>
              <li>Click Reject to decline the request.</li>
              <li>
                The list will update to reflect the current status of join
                requests.
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Important Features</h2>
        <ul className="list-disc list-inside mt-2 ">
          <li>
            <strong>Loading Indicator</strong>: A spinner will appear while data
            is being fetched or actions are being processed. This helps you know
            that your request is being handled.
          </li>
          <li>
            <strong>Notifications</strong>: Pay attention to notifications that
            appear after actions like sending proposals or managing requests.
            They provide important feedback on the success or failure of the
            action.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          5. Troubleshooting and Support
        </h2>
        <ul className="list-disc list-inside mt-2 ">
          <li>
            <strong>Error Messages</strong>: If you encounter any errors (e.g.,
            while fetching projects or sending proposals), error messages will
            appear in the console. Ensure you are logged in and have a valid
            token.
          </li>
          <li>
            <strong>Contact Support</strong>: If you need further assistance,
            reach out to the support team via the contact information provided
            on the platform.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Additional Tips</h2>
        <ul className="list-disc list-inside mt-2 ">
          <li>
            <strong>Keep Information Up-to-Date</strong>: Regularly update your
            project details to reflect the latest status and requirements.
          </li>
          <li>
            <strong>Engage with Interested Users</strong>: Actively manage join
            requests to build a strong team for your project.
          </li>
          <li>
            <strong>Provide Clear Proposals</strong>: When submitting proposals,
            ensure they are clear, concise, and address the key aspects of the
            project.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Feed;
