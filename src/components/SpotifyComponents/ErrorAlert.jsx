import React from "react";
import { RefreshCw, AlertCircle, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorAlert = ({ error, onTokenRefresh }) => {
  if (!error) return null;

  const errorIcons = {
    token_expired: <RefreshCw className="h-5 w-5 mr-2" />,
    permission_error: <AlertCircle className="h-5 w-5 mr-2" />,
    rate_limit: <ServerCrash className="h-5 w-5 mr-2" />,
    fetch_error: <ServerCrash className="h-5 w-5 mr-2" />,
  };

  return (
    <div className="mb-4 bg-red-50 border-red-200 p-4 rounded-lg">
      <div className="flex items-center">
        {errorIcons[error.type] || <ServerCrash className="h-5 w-5 mr-2" />}
        <h3 className="font-semibold">{error.message}</h3>
      </div>
      {error.type === "token_expired" && (
        <Button onClick={onTokenRefresh} size="sm" variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Token
        </Button>
      )}
    </div>
  );
};

export default ErrorAlert;
