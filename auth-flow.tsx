"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { persistUserRole, recallUserRole, UserRole } from "@/ai/flows/persist-user-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wallet, Briefcase, Laptop, CheckCircle2, XCircle, ArrowRight, ArrowLeft } from "lucide-react";

type Step = "CONNECT" | "ROLE_SELECT" | "FREELANCER_INVITE";
const MOCK_WALLET_ADDRESS = "addr1qylmztmn3s95rljg6g2nfxn4n2k6dy7w4axdnv3dd2v4p4x0f4";
const VALID_INVITE_TOKEN = "FREELANCER-2024";

const ConnectWalletStep = ({ onConnect, isLoading }: { onConnect: () => void; isLoading: boolean }) => (
  <div className="flex flex-col items-center text-center">
    <CardHeader>
      <CardTitle className="font-headline text-3xl font-bold tracking-tight">Welcome to CardanoFlow</CardTitle>
      <CardDescription className="pt-2 text-base">Secure. Fair. Decentralized.</CardDescription>
    </CardHeader>
    <CardContent className="w-full">
      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground transition-all hover:shadow-lg hover:brightness-110"
        onClick={onConnect}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-5 w-5" />}
        Connect Wallet
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">Supports Nami, Lace, Eternl, and Flint wallets.</p>
    </CardContent>
  </div>
);

const RoleSelectionStep = ({ onSelectRole, walletAddress }: { onSelectRole: (role: UserRole) => void; walletAddress: string }) => {
  const shortAddress = `${walletAddress.substring(0, 10)}...${walletAddress.substring(walletAddress.length - 4)}`;

  return (
    <div className="text-center">
      <CardHeader>
        <div className="flex items-center justify-center gap-2 text-green-500">
          <CheckCircle2 size={20} />
          <p className="font-medium">Wallet Connected</p>
        </div>
        <p className="pt-1 text-sm text-muted-foreground font-mono">{shortAddress}</p>
        <CardTitle className="font-headline pt-6 text-2xl font-bold">One final step...</CardTitle>
        <CardDescription>To personalize your experience, please select your role.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          onClick={() => onSelectRole("client")}
          className="group cursor-pointer rounded-lg border-2 border-transparent bg-background/50 p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-xl"
        >
          <Briefcase className="mx-auto h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
          <h3 className="mt-4 text-lg font-semibold">I'm a Client</h3>
          <p className="mt-1 text-sm text-muted-foreground">I want to hire and pay freelancers.</p>
        </div>
        <div
          onClick={() => onSelectRole("freelancer")}
          className="group cursor-pointer rounded-lg border-2 border-transparent bg-background/50 p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-xl"
        >
          <Laptop className="mx-auto h-12 w-12 text-accent transition-transform duration-300 group-hover:scale-110" />
          <h3 className="mt-4 text-lg font-semibold">I'm a Freelancer</h3>
          <p className="mt-1 text-sm text-muted-foreground">I want to get paid for my work.</p>
        </div>
      </CardContent>
    </div>
  );
};

const FreelancerInviteStep = ({ onValidateToken, isLoading, error, onBack }: { onValidateToken: (token: string) => void; isLoading: boolean; error: string | null; onBack: () => void; }) => {
  const [token, setToken] = useState("");
  return (
    <div className="text-center">
      <CardHeader>
        <CardTitle className="font-headline text-2xl font-bold">Freelancer Verification</CardTitle>
        <CardDescription>Please enter your invite token to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); onValidateToken(token); }} className="space-y-4">
          <Input
            placeholder="Enter invite token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="text-center text-base"
          />
          {error && <p className="text-sm font-medium text-destructive flex items-center justify-center gap-2"><XCircle size={16}/> {error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading || !token}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
            Verify & Continue
          </Button>
          <Button variant="ghost" className="w-full" onClick={onBack} disabled={isLoading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Role Selection
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default function AuthFlow() {
  const [step, setStep] = useState<Step>("CONNECT");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleConnectWallet = async () => {
    setIsLoading(true);
    setError(null);
    setTimeout(async () => {
      const address = MOCK_WALLET_ADDRESS;
      setWalletAddress(address);
      
      const { role } = await recallUserRole({ walletAddress: address });

      if (role) {
        if (role === 'client') {
          router.push('/client/dashboard');
        } else {
          router.push('/freelancer/dashboard');
        }
      } else {
        setStep("ROLE_SELECT");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectRole = (role: UserRole) => {
    if (role === "client") {
      if(walletAddress) persistUserRole({ walletAddress, role: "client" });
      router.push('/client/dashboard');
    } else {
      setStep("FREELANCER_INVITE");
    }
  };

  const handleValidateToken = (token: string) => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      if (token) {
        if(walletAddress) persistUserRole({ walletAddress, role: "freelancer" });
        router.push('/freelancer/dashboard');
      } else {
        setError("Invalid or expired token.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToRoleSelect = () => {
    setStep("ROLE_SELECT");
    setError(null);
  };

  const renderStep = () => {
    switch (step) {
      case "CONNECT":
        return <ConnectWalletStep onConnect={handleConnectWallet} isLoading={isLoading} />;
      case "ROLE_SELECT":
        return walletAddress && <RoleSelectionStep onSelectRole={handleSelectRole} walletAddress={walletAddress} />;
      case "FREELANCER_INVITE":
        return <FreelancerInviteStep onValidateToken={handleValidateToken} isLoading={isLoading} error={error} onBack={handleBackToRoleSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="overflow-hidden transition-all duration-500 bg-card/80 backdrop-blur-xl border shadow-2xl shadow-primary/10 rounded-2xl">
        <div key={step} className="animate-in fade-in duration-500">
          {renderStep()}
        </div>
      </Card>
    </div>
  );
}
