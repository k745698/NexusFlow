"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ClientHeader from "@/components/client-header";
import { CheckCircle, XCircle } from "lucide-react";

const pastProjectsData = [
  {
    title: "DAO Governance Portal",
    description: "Frontend development for a decentralized autonomous organization's voting system.",
    agreedAda: "12,000",
    freelancer: "addr1...c4h5",
    status: "Completed",
    completedDate: "2024-05-15",
  },
  {
    title: "Tokenomics Whitepaper Design",
    description: "Professional layout and design for a new project's whitepaper.",
    agreedAda: "3,500",
    freelancer: "addr1...k9l1",
    status: "Completed",
    completedDate: "2024-04-22",
  },
  {
    title: "Yield Farming Dashboard",
    description: "Smart contract audit and frontend integration.",
    agreedAda: "18,000",
    freelancer: "addr1...m3n0",
    status: "Cancelled",
    completedDate: "2024-03-10",
  },
];

type Project = typeof pastProjectsData[0] & { formattedDate?: string };

export default function PastProjectsPage() {
  const [pastProjects, setPastProjects] = useState<Project[]>(pastProjectsData);

  useEffect(() => {
    setPastProjects(pastProjectsData.map(p => ({ ...p, formattedDate: new Date(p.completedDate).toLocaleDateString() })));
  }, []);

  return (
    <>
      <ClientHeader />
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Past Projects</h1>
            <p className="text-muted-foreground mt-2">A record of your completed and cancelled projects.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pastProjects.map((project, index) => (
            <Card key={index} className="flex flex-col bg-card/60 backdrop-blur-xl border-border/80 shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="truncate">{project.title}</CardTitle>
                <CardDescription className="text-xs font-mono pt-1">Freelancer: {project.freelancer}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                 <p className="text-xs text-muted-foreground mt-4">Completed: {project.formattedDate}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-muted/30 p-4">
                  <div className="text-lg font-bold text-muted-foreground">{new Intl.NumberFormat().format(parseInt(project.agreedAda))} ADA</div>
                  <Badge variant={project.status === "Completed" ? "outline" : "destructive"} className="capitalize flex items-center gap-1.5">
                    {project.status === "Completed" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {project.status}
                  </Badge>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
