"use client";

import { Plus } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { teamMembers } from "@/lib/mock-data";

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Team"
        description={`${teamMembers.length} members`}
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-3.5" />
                Invite member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a member</DialogTitle>
                <DialogDescription>They&apos;ll receive an email invite to join this workspace.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-fg-secondary" htmlFor="invite-email">
                    Email
                  </label>
                  <Input id="invite-email" type="email" placeholder="teammate@company.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-fg-secondary">Role</label>
                  <Select defaultValue="member">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Send invite</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex flex-col gap-1.5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 rounded-lg border border-border-default bg-surface px-4 py-3"
          >
            <Avatar>
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-fg-primary">{member.name}</p>
              <p className="text-xs text-fg-tertiary">{member.email}</p>
            </div>
            <Badge variant="neutral">{member.role}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
