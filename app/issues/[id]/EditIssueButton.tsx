import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({id}:{id:number}) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
