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
  <ul className="space-y-6">
    {topics.map((topic) => (
      <li
        key={topic.id}
        className="p-6 border rounded shadow-md bg-white transition-shadow hover:shadow-lg hover:bg-gray-50"
      >
        <h3 className="text-2xl font-bold text-gray-800">{topic.title}</h3>
        <p className="text-gray-600 mt-2">{topic.description}</p>
        <Link className="font-bold text-blue-500 hover:text-blue-700 mt-4 inline-block transition-colors" href={`/topics/${topic.id}`}> 
            Join Discussion &rarr;

        </Link>
      </li>
    ))}
  </ul>
);
