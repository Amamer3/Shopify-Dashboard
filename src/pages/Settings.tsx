import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";

export default function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings - Admin Panel</title>
      </Helmet>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <p className="text-muted-foreground">
              Configure your application settings here.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
            <p className="text-muted-foreground">
              Configure your email notification settings.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <p className="text-muted-foreground">
              Configure your security and access settings.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}