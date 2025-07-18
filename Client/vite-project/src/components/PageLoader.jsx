import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10 h-10 text-primary" />
    </div>
  );
}

export default PageLoader;
