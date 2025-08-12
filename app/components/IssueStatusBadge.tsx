import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'voilet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  CLOSED: { label: 'Closed', color: 'green' },
  IN_PROGRESS: { label: 'In Progress', color: 'voilet' },
};
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
