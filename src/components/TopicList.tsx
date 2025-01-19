import Link from "next/link";

type Topic = {
  id: number;
  title: string;
  description: string;
};

interface TopicListProps {
  topics: Topic[];
}

export const TopicList: React.FC<TopicListProps> = ({ topics }) => (
  <ul className="space-y-4">
    {topics.map((topic) => (
      <li key={topic.id} className="p-4 border rounded shadow-sm">
        <h3 className="text-xl font-bold">{topic.title}</h3>
        <p className="text-gray-600">{topic.description}</p>
        <Link
          href={`/topics/${topic.id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Join Discussion
        </Link>
      </li>
    ))}
  </ul>
);
