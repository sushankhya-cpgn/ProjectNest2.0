import File from "./File";
import { useProject } from "../../contexts/ProjectContext";

export default function StdDocuments() {
  const { projectDetails } = useProject();
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-full h-full rounded-lg p-6 relative overflow-scroll flex flex-col gap-3">
        <div className="heading text-text font-semibold text-xl">Documents</div>
        <div className="w-full border-[0.5px] border-gray-300 "></div>
        <div className="buttons flex gap-6 mt-3"></div>
        <div className="folders flex flex-col gap-3 mt-5">
          <span className="text-text font-semibold text-xl">Files</span>
          <div className="boxes flex gap-5 overflow-y-scroll whitespace-nowrap">
            {projectDetails.project.proposalFile && (
              <File
                fileName={projectDetails.project.proposalFile}
                fileTitle={`Proposal`}
                projectTitle={projectDetails.project.title}
              />
            )}

            {projectDetails.project.reportFile && (
              <File
                fileName={projectDetails.project.reportFile}
                fileTitle={`Report`}
                projectTitle={projectDetails.project.title}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
