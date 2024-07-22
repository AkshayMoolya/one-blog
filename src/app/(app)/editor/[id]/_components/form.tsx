"use client";

import { Post, Visibility } from "@prisma/client";

import { Loader2Icon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { savePost, saveVisibility } from "@/actions";
import Back from "@/components/back";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Editor from "./editor";

type FormProps = {
  post: Post;
};

const Form = (props: FormProps) => {
  const { post } = props;
  const [title, setTitle] = React.useState(post.title);
  const [description, setDescription] = React.useState(post.description);
  const [content, setContent] = React.useState(post.content);
  const [visibility, setVisibility] = React.useState<Visibility>(
    post.visibility
  );
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: (published: boolean) =>
      savePost(post.id, title, content, description, published),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast({
        title: "Post saved",
        description: "Your changes have been saved",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    },
  });

  const visibilityMutation = useMutation({
    mutationFn: () => saveVisibility(post.id, visibility),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      toast({
        title: "Settings saved",
        description: "Your changes have been saved",
      });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    },
  });

  const handleSave = async () => {
    if (!title) {
      return toast({
        title: "Title cannot be empty",
        description: "Please enter a title",
      });
    }

    saveMutation.mutate(false);
  };

  const handleSaveSettingsIcon = async () => {
    visibilityMutation.mutate();
  };

  const handlePublish = async () => {
    if (!title) {
      return toast({
        title: "Title cannot be empty",
        description: "Please enter a title",
      });
    }

    saveMutation.mutate(true, {
      onSuccess: () => {
        router.push(`/posts/${post.id}`);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Back />
        {post.published && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="px-2.5">
                <SettingsIcon size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="mb-1.5 text-sm font-medium leading-none">
                Visibility
              </div>
              <Select
                value={visibility}
                onValueChange={(value) => setVisibility(value as Visibility)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
                  <SelectItem value={Visibility.PRIVATE}>Private</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end">
                <Button onClick={handleSaveSettingsIcon}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="my-8 space-y-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Description"
            id="description"
            value={description ?? undefined}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        {/* <Editor
          options={{
            content,
          }}
          onChange={(editor: any) => {
            setContent(editor.storage.markdown.getMarkdown() as string);
          }}
        /> */}
        <Editor
          value={content}
          onChange={(value: string) => setContent(value)}
        />
        <div
          className={cn(
            "flex",
            post.published ? "justify-end" : "justify-between"
          )}
        >
          {!post.published && (
            <Button
              variant={"custom"}
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="bg-primary"
            >
              {saveMutation.isPending && (
                <Loader2Icon size={16} className="mr-2 animate-spin" />
              )}
              Save as draft
            </Button>
          )}
          <Button
            variant={"custom"}
            onClick={handlePublish}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending && (
              <Loader2Icon size={16} className="mr-2 animate-spin" />
            )}
            Publish
          </Button>
        </div>
      </div>
    </>
  );
};

export default Form;
