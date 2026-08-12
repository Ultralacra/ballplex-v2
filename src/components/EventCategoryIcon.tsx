import {
  EmojiEvents,
  Groups,
  School,
  TipsAndUpdates,
  Visibility,
  Whatshot,
  TrackChanges,
  Star,
} from "@mui/icons-material";

type Props = {
  name?: string;
};

export default function EventCategoryIcon({ name }: Props) {
  const key = (name || "").toLowerCase();
  const Icon = key.includes("school")
    ? School
    : key.includes("emoji") || key.includes("trophy")
      ? EmojiEvents
      : key.includes("tips") || key.includes("target")
        ? TipsAndUpdates
        : key.includes("visibility") || key.includes("showcase")
          ? Visibility
          : key.includes("group") ||
              key.includes("user") ||
              key.includes("community")
            ? Groups
            : key.includes("flame")
              ? Whatshot
              : key.includes("star")
                ? Star
                : TrackChanges;

  return <Icon fontSize="inherit" aria-hidden="true" />;
}
